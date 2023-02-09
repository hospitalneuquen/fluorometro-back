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
import { ValidationException } from 'src/shared/errors';
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
  async downloadWorklist(@Body() body: CreateWorklistDTO): Promise<WorkList> {
    try {
      return await this.service.createFromOrdenTrabajo(body);
    } catch (e) {
      if (e instanceof ValidationException) {
        console.log(e);
      }
      throw e;
    }
  }
}
