import { BadRequestException, Injectable } from '@nestjs/common';
import { ProtocoloService } from '../protocolo/protocolo.service';
import { FindProtocolosParams } from 'src/protocolo/validations';
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class OrdenTrabajoService {
  constructor(
    private readonly protocoloService: ProtocoloService,
    @InjectRepository(OrdenTrabajo, 'fluorometro')
    private readonly repository: Repository<OrdenTrabajo>,
  ) {}

  async getProtocols(params: FindProtocolosParams) {
    return this.protocoloService.getProtocolos(params);
  }

  async save(ordenTrabajo: OrdenTrabajo): Promise<OrdenTrabajo> {
    return this.repository.save(ordenTrabajo);
  }

  findOverlapsWith(params: FindProtocolosParams): Promise<OrdenTrabajo[]> {
    const query = this.repository.createQueryBuilder('ordenTrabajo');
    query.where('fecha_desde >= :fechaDesde', { fechaDesde: params.dateFrom });
    query.where('fecha_hasta <= :fechaHasta', { fechaHasta: params.dateTo });
    if (params.numberFrom) {
      query.where('numero_desde >= :numeroDesde', {
        numeroDesde: params.numberFrom,
      });
    }
    return query.getMany();
  }

  async canCreateWorkOrder(params: FindProtocolosParams): Promise<void> {
    if (
      params.numberTo &&
      params.numberFrom &&
      params.numberTo < params.numberFrom
    )
      throw new BadRequestException(
        { statusCode: 400, message: 'numberFromMustBeLessThanNumberTo' },
        'El numero de protocolo desde no puede ser mayor al numero de protocolo hasta',
      );
    if (moment().isSame(params.dateTo, 'day'))
      throw new BadRequestException(
        { statusCode: 400, message: 'dateToCannotBeToday' },
        'La fecha hasta no puede ser la fecha de hoy (tiene que ser como maximo la fecha de ayer)',
      );
    if (moment(params.dateTo).isBefore(params.dateFrom))
      throw new BadRequestException(
        { statusCode: 400, message: 'dateFromCannotBeBeforeDateTo' },
        'La fecha desde no puede ser anterior a la fecha hasta',
      );
    const overlappedWorkOrders = await this.findOverlapsWith(params);
    if (overlappedWorkOrders.length > 0)
      throw new BadRequestException(
        { statusCode: 400, message: 'overlapped' },
        'Ya existen ordenes de trabajo generadas entre las fechas/numeros de protocolos indicados',
      );
  }

  async createWorkOrder(params: FindProtocolosParams): Promise<OrdenTrabajo> {
    try {
      const protocols = await this.getProtocols(params);
      // validar que ya no exista OT para estas fechas, numeros, protocolos
      this.canCreateWorkOrder(params);
      const wo = new OrdenTrabajo();
      wo.fecha_desde = params.dateFrom;
      wo.fecha_hasta = params.dateTo;
      wo.numero_desde = params.numberFrom;
      wo.numero_hasta = params.numberTo;
      wo.protocolos = protocols;
      return this.save(wo);
    } catch (e) {
      throw e;
    }
  }
}
