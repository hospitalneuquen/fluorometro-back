import { Injectable, NotFoundException } from '@nestjs/common';
import { ProtocoloService } from '../protocolo/protocolo.service';
import { FindProtocolosParams } from 'src/protocolo/validations';
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, ObjectID, Repository } from 'typeorm';
import { ValidationException } from 'src/shared/errors';
import * as moment from 'moment';
import * as mongoose from 'mongoose';
import { ListParams } from './validation';

export enum ORDEN_VALIDATION_ERROR_CODES {
  numberFromMustBeLessThanNumberTo = 'numberFromMustBeLessThanNumberTo',
  dateFromCannotBeBeforeDateTo = 'dateFromCannotBeBeforeDateTo',
  dateToCannotBeToday = 'dateToCannotBeToday',
  overlapped = 'overlapped',
  dateFromAndDateToAreRequired = 'dateFromAndDateToAreRequired',
}

@Injectable()
export class OrdenTrabajoService {
  constructor(
    private readonly protocoloService: ProtocoloService,
    @InjectRepository(OrdenTrabajo, 'fluorometro')
    private readonly repository: Repository<OrdenTrabajo>,
  ) {}

  async getProtocols(params: FindProtocolosParams) {
    await this.canListProtocols(params);
    return this.protocoloService.getProtocolos(params);
  }

  async getOrdenesDeTrabajo(params: ListParams) {
    const query: any = { where: {} };
    if (params.numberFrom) {
      query.where.numero_desde = { $gte: params.numberFrom };
    }
    if (params.numberTo) {
      query.where.numero_hasta = { $lte: params.numberTo };
    }
    if (params.dateFrom) {
      query.where.fecha_desde = { $gte: params.dateFrom };
    }
    if (params.dateTo) {
      query.where.fecha_hasta = { $lte: params.dateTo };
    }
    return this.repository.find(query);
  }

  async save(ordenTrabajo: OrdenTrabajo): Promise<OrdenTrabajo> {
    return this.repository.save(ordenTrabajo);
  }

  async createWorkOrder(params: FindProtocolosParams): Promise<OrdenTrabajo> {
    const protocols = await this.getProtocols(params);
    await this.canCreateWorkOrder(params);
    const wo = new OrdenTrabajo();
    wo.fecha_desde = params.dateFrom;
    wo.fecha_hasta = params.dateTo;
    wo.numero_desde = params.numberFrom;
    wo.numero_hasta = params.numberTo;
    wo.protocolos = protocols;
    return this.save(wo);
  }

  findOverlapsWith(params: FindProtocolosParams): Promise<OrdenTrabajo[]> {
    const query: any = {
      where: {
        fecha_desde: { $gte: params.dateFrom },
        fecha_hasta: { $lte: params.dateTo },
      },
    };
    if (params.numberFrom) {
      query.where.numero_desde = { $gte: params.numberFrom };
    }
    if (params.numberTo) {
      query.where.numero_hasta = { $gte: params.numberTo };
    }
    return this.repository.find(query);
  }

  private isNumberFromLessThanNumberTo(params: FindProtocolosParams): boolean {
    return (
      params.numberTo &&
      params.numberFrom &&
      params.numberTo < params.numberFrom
    );
  }
  private isDateToToday(params: FindProtocolosParams): boolean {
    return moment().isSame(params.dateTo, 'day');
  }
  private isDateFromAfterDateTo(params: FindProtocolosParams): boolean {
    return moment(params.dateFrom).isAfter(moment(params.dateTo));
  }
  async canListProtocols(params: FindProtocolosParams): Promise<void> {
    if (!!!params.dateFrom || !!!params.dateTo)
      throw new ValidationException(
        ORDEN_VALIDATION_ERROR_CODES.dateFromAndDateToAreRequired,
        '',
      );
    if (this.isDateFromAfterDateTo(params))
      throw new ValidationException(
        ORDEN_VALIDATION_ERROR_CODES.dateFromCannotBeBeforeDateTo,
        '',
      );
  }

  async findById(id: string): Promise<OrdenTrabajo | undefined> {
    const data = await this.repository.findOneById(id);
    if (!data) throw new NotFoundException();
    return data;
  }

  async canCreateWorkOrder(params: FindProtocolosParams): Promise<void> {
    if (this.isNumberFromLessThanNumberTo(params))
      throw new ValidationException(
        ORDEN_VALIDATION_ERROR_CODES.numberFromMustBeLessThanNumberTo,
        '',
      );
    if (this.isDateToToday(params))
      throw new ValidationException(
        ORDEN_VALIDATION_ERROR_CODES.dateToCannotBeToday,
        '',
      );
    if (this.isDateFromAfterDateTo(params))
      throw new ValidationException(
        ORDEN_VALIDATION_ERROR_CODES.dateFromCannotBeBeforeDateTo,
        '',
      );
    const overlappedWorkOrders = await this.findOverlapsWith(params);
    if (overlappedWorkOrders.length > 0)
      throw new ValidationException(
        ORDEN_VALIDATION_ERROR_CODES.overlapped,
        '',
      );
  }
}
