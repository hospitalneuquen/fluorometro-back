import { Module } from '@nestjs/common';
import { PruebasLaboratorioController } from './pruebas-laboratorio.controller';
import { PruebasLaboratorioService } from './pruebas-laboratorio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PruebaLaboratorio } from 'src/entities/pruebaLaboratorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PruebaLaboratorio], 'fluorometro')],
  controllers: [PruebasLaboratorioController],
  providers: [PruebasLaboratorioService],
})
export class PruebasLaboratorioModule {}
