import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Protocolo } from 'src/entities/protocolo.entity';
import { BaseController } from 'src/shared/base.controller';
import { ProtocoloService } from './protocolo.service';
import { ListParams } from './validations';

@Controller('protocols')
export class ProtocoloController extends BaseController {
  constructor(private readonly service: ProtocoloService) {
    super();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Protocolos ordenados por prioridad',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  getProtocolos(@Query() params: ListParams): Promise<Protocolo[]> {
    return this.service.getProtocolos(params);
  }
}
