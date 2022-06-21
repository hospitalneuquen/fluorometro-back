import { Controller } from '@nestjs/common';
import { Get, Query, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { OrdenTrabajoService } from '../orden-trabajo/orden-trabajo.service';
import { ListParams } from './validation';
import { Protocolo } from 'src/entities/protocolo.entity';
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';

@Controller('workorders')
export class OrdenTrabajoController {
  constructor(private readonly service: OrdenTrabajoService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Protocolos ordenados por prioridad',
  })
  async getProtocolos(@Query() params: ListParams): Promise<Protocolo[]> {
    const protocols = await this.service.getProtocols(params);
    return protocols;
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Protocolos ordenados por prioridad',
  })
  async addOrdenTrabajo(@Query() params: ListParams): Promise<OrdenTrabajo> {
    return this.service.createWorkOrder(params);
  }
}
