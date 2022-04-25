import { Controller, Get } from '@nestjs/common';
import { WorklistService } from './worklist.service';

@Controller('worklists')
export class WorklistController {
  constructor(private readonly service: WorklistService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}
