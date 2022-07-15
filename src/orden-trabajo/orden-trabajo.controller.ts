import { Controller } from '@nestjs/common';
import { Get, Query, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  OrdenTrabajoService,
  ORDEN_VALIDATION_ERROR_CODES,
} from '../orden-trabajo/orden-trabajo.service';
import { ListParams } from './validation';
import { Protocolo } from 'src/entities/protocolo.entity';
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';
import { BaseController } from 'src/shared/base.controller';

@Controller('workorders')
export class OrdenTrabajoController extends BaseController {
  constructor(private readonly service: OrdenTrabajoService) {
    super();
    this.setValidationMessageList([
      {
        code: ORDEN_VALIDATION_ERROR_CODES.numberFromMustBeLessThanNumberTo,
        message:
          'El numero de protocolo desde no puede ser mayor al numero de protocolo hasta',
      },
      {
        code: ORDEN_VALIDATION_ERROR_CODES.dateFromAndDateToAreRequired,
        message:
          'La fecha desde (dateFrom) y la fecha hasta (dateTo) son parametros requeridos',
      },
      {
        code: ORDEN_VALIDATION_ERROR_CODES.overlapped,
        message:
          'Ya existen ordenes de trabajo generadas entre las fechas/numeros de protocolos indicados',
      },
      {
        code: ORDEN_VALIDATION_ERROR_CODES.dateToCannotBeToday,
        message:
          'La fecha hasta no puede ser la fecha de hoy (tiene que ser como maximo la fecha de ayer)',
      },
      {
        code: ORDEN_VALIDATION_ERROR_CODES.dateFromCannotBeBeforeDateTo,
        message: 'La fecha desde no puede ser anterior a la fecha hasta',
      },
    ]);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Protocolos ordenados por prioridad',
  })
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
  async addOrdenTrabajo(@Query() params: ListParams): Promise<OrdenTrabajo> {
    try {
      return this.service.createWorkOrder(params);
    } catch (e) {
      this.manageResponseError(e);
    }
  }
}
