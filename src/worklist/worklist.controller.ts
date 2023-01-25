import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { WorkList } from 'src/entities/workList.entity';
import { CreateWorklistDTO } from './validation';
import { WorklistService } from './worklist.service';

@Controller('worklists')
export class WorklistController {
  constructor(private readonly service: WorklistService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Descarga Worklist en formato CSV',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  downloadWorklist(@Body() body: CreateWorklistDTO): Promise<WorkList> {
    return this.service.createFromOrdenTrabajo(body);
    // worklist.items.map(item => ())
  }
}
