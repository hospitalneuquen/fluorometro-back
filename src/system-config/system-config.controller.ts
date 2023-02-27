import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SystemConfig } from 'src/entities/systemConfig.entity';
import { SystemConfigService } from './system-config.service';
import { CreateSystemConfigDTO } from './validation';

@Controller('system_config')
export class SystemConfigController {
  constructor(private service: SystemConfigService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retorna la configuracion del sistema',
  })
  async list(): Promise<SystemConfig> {
    return this.service.get();
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: 'Actualiza la configuracion del sistema',
  })
  async update(
    @Body() body: CreateSystemConfigDTO,
  ): Promise<SystemConfig | undefined> {
    const data = await this.service.update(body);
    if (!data) throw new NotFoundException();
    return data;
  }
}
