import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';
import { WorkList } from 'src/entities/workList.entity';
import { OrdenTrabajoService } from 'src/orden-trabajo/orden-trabajo.service';
import { ProtocoloService } from 'src/protocolo/protocolo.service';
import { SharedModule } from 'src/shared/shared.module';
import { WorklistController } from './worklist.controller';
import { WorklistService } from './worklist.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([WorkList, OrdenTrabajo], 'fluorometro'),
  ],
  controllers: [WorklistController],
  providers: [WorklistService, OrdenTrabajoService, ProtocoloService],
})
export class WorklistModule {}
