import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { WorklistController } from './worklist.controller';
import { WorklistService } from './worklist.service';

@Module({
  imports: [SharedModule, SharedModule],
  controllers: [WorklistController],
  providers: [WorklistService],
})
export class WorklistModule {}
