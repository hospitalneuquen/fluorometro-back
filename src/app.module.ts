import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WorklistModule } from './worklist/worklist.module';
import { ResultsModule } from './results/results.module';
import { SharedModule } from './shared/shared.module';
import { HealthModule } from './health/health.module';
import { ProtocoloModule } from './protocolo/protocolo.module';
import { OrdenTrabajoModule } from './orden-trabajo/orden-trabajo.module';

@Module({
  imports: [
    WorklistModule,
    ProtocoloModule,
    ResultsModule,
    SharedModule,
    HealthModule,
    OrdenTrabajoModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
