import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PruebaLaboratorio } from 'src/entities/pruebaLaboratorio.entity';
import { PruebasLaboratorioService } from './pruebas-laboratorio.service';
import { CreatePruebaLaboratorioDTO } from './validation';

@Controller('laboratory_tests')
export class PruebasLaboratorioController {
  constructor(private service: PruebasLaboratorioService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retorna todas las pruebas de laboratorio',
  })
  async list(): Promise<PruebaLaboratorio[]> {
    return this.service.getPruebasLaboratorio();
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Retorna un prueba laboratorio (tsh, ...)',
  })
  async getOne(@Param('id') id: string): Promise<PruebaLaboratorio> {
    return this.service.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Agrega una prueba de laboratorio',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async save(
    @Body() body: CreatePruebaLaboratorioDTO,
  ): Promise<PruebaLaboratorio> {
    return this.service.create(body);
  }

  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Actualiza la prueba de laboratorio',
  })
  async update(
    @Param('id') id: string,
    @Body() body: CreatePruebaLaboratorioDTO,
  ): Promise<PruebaLaboratorio | undefined> {
    return this.service.update(id, body);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Borra la prueba de laboratorio',
  })
  async delete(@Param('id') id: string): Promise<any> {
    return this.service.deleteById(id);
  }
}
