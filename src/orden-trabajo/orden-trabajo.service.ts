import { BadRequestException, Injectable } from '@nestjs/common';
import { ProtocoloService } from '../protocolo/protocolo.service';
import { FindProtocolosParams } from 'src/protocolo/validations';
// dos
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  createQueryBuilder,
  LessThan,
  LessThanOrEqual,
  Repository,
} from 'typeorm';

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
    if (params.numberTo) {
      query.where('numera_hasta <= :numeroHasta', {
        numeroHasta: params.numberTo,
      });
    }
    return query.getMany();
  }

  async canCreateWorkOrder(
    params: FindProtocolosParams,
  ): Promise<void> {
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
