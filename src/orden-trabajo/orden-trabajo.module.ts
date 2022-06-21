import { Module } from '@nestjs/common';
import { ProtocoloModule } from 'src/protocolo/protocolo.module';
import { ProtocoloService } from 'src/protocolo/protocolo.service';
import { OrdenTrabajoController } from './orden-trabajo.controller';
import { OrdenTrabajoService } from './orden-trabajo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';

@Module({
  imports: [
    ProtocoloModule,
    TypeOrmModule.forFeature([OrdenTrabajo], 'fluorometro'),
  ],
  controllers: [OrdenTrabajoController],
  providers: [OrdenTrabajoService, ProtocoloService],
})
export class OrdenTrabajoModule {}
