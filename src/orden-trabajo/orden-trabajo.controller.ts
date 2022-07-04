import { Controller } from '@nestjs/common';
import { Get, Query, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { OrdenTrabajoService } from '../orden-trabajo/orden-trabajo.service';
import { ListParams } from './validation';
import { Protocolo } from 'src/entities/protocolo.entity';
// aca
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
    return this.service.getProtocols(params);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description:
      'Crea una orden de trabajo a partir de los protocolos disponibles',
  })
  async addOrdenTrabajo(@Query() params: ListParams): Promise<OrdenTrabajo> {
    return this.service.createWorkOrder(params);
  }
}
