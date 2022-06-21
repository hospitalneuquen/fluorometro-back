import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Protocolo } from 'src/entities/protocolo.entity';
import { ProtocoloService } from './protocolo.service';
import { FindProtocolosParams, ListParams } from './validations';

@Controller('protocols')
export class ProtocoloController {
  constructor(private readonly service: ProtocoloService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Protocolos ordenados por prioridad',
  })
  getProtocolos(@Query() params: ListParams): Promise<Protocolo[]> {
    const findParams: FindProtocolosParams = new FindProtocolosParams(params);
    return this.service.getProtocolos(findParams);
  }
}
