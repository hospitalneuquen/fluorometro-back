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
import { FindProtocolosParams } from './validations';

@Controller('protocols')
export class ProtocoloController extends BaseController {
  constructor(private readonly service: ProtocoloService) {
    super();
    this.setValidationMessageList([]);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Protocolos ordenados por prioridad',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  getProtocolos(@Query() params: FindProtocolosParams): Promise<Protocolo[]> {
    return this.service.getProtocolos(params);
  }
}
