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
import { PruebaLaboratorio } from 'src/entities/pruebaLaboratorio.entity';
import { PruebasLaboratorioService } from './pruebas-laboratorio.service';
import { CreatePruebaLaboratorioDTO, FindOneParams } from './validation';

@Controller('laboratory_tests')
export class PruebasLaboratorioController {
  constructor(private service: PruebasLaboratorioService) { }

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
  async getOne(@Param() params: FindOneParams): Promise<PruebaLaboratorio> {
    const obj = await this.service.findById(params.id);
    if (!obj) {
      throw new NotFoundException();
    }
    return obj;
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
    @Param() params: FindOneParams,
    @Body() body: CreatePruebaLaboratorioDTO,
  ): Promise<PruebaLaboratorio | undefined> {
    const data = await this.service.update(params.id, body);
    if (!data) throw new NotFoundException();
    return data;
  }

  @Delete('/:id')
  @ApiResponse({
    status: 204,
    description: 'Borra la prueba de laboratorio',
  })
  async delete(@Param() params: FindOneParams, @Res() res): Promise<any> {
    const found = await this.service.deleteById(params.id);
    if (!found) {
      throw new NotFoundException();
    }
    res.status(204).send();
  }
}
