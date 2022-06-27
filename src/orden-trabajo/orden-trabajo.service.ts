import { Injectable } from '@nestjs/common';
import { ProtocoloService } from '../protocolo/protocolo.service';
import { FindProtocolosParams } from 'src/protocolo/validations';
// dos
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdenTrabajoService {
  constructor(
    private readonly protocoloService: ProtocoloService,
    @InjectRepository(OrdenTrabajo, 'fluorometro')
    private readonly repository: Repository<OrdenTrabajo>,
  ) {}

  async getProtocols(params: FindProtocolosParams) {
    return await this.protocoloService.getProtocolos(params);
  }

  async save(ordenTrabajo: OrdenTrabajo): Promise<OrdenTrabajo> {
    return this.repository.save(ordenTrabajo);
  }

  async createWorkOrder(params: FindProtocolosParams): Promise<OrdenTrabajo> {
    const protocols = await this.getProtocols(params);
    const wo = new OrdenTrabajo();
    wo.fecha_desde = params.dateFrom;
    wo.fecha_hasta = params.dateTo;
    wo.numero_desde = params.numberFrom;
    wo.numero_hasta = params.numberTo;
    wo.protocolos = protocols;
    return this.save(wo);
  }
}
