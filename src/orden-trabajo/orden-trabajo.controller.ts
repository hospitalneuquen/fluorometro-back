import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { Get, Query, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { OrdenTrabajoService } from '../orden-trabajo/orden-trabajo.service';
import { ListParams } from './validation';
import { Protocolo } from 'src/entities/protocolo.entity';
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';
import { BaseController } from 'src/shared/base.controller';

@Controller('workorders')
export class OrdenTrabajoController extends BaseController {
  constructor(private readonly service: OrdenTrabajoService) {
    super();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Protocolos ordenados por prioridad',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getProtocolos(@Query() params: ListParams): Promise<Protocolo[]> {
    try {
      return await this.service.getProtocols(params);
    } catch (e) {
      this.manageResponseError(e);
    }
  }

  @Post()
  @ApiResponse({
    status: 200,
    description:
      'Crea una orden de trabajo a partir de los protocolos disponibles',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async addOrdenTrabajo(@Query() params: ListParams): Promise<OrdenTrabajo> {
    try {
      return this.service.createWorkOrder(params);
    } catch (e) {
      this.manageResponseError(e);
    }
  }
}
