import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WorklistModule } from './worklist/worklist.module';
import { WorkorderModule } from './workorder/workorder.module';
import { ResultsModule } from './results/results.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [WorklistModule, WorkorderModule, ResultsModule, SharedModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
