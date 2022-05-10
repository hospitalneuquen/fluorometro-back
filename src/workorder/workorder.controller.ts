import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { WorkOrder } from 'src/entities/workOrder';
import { FindWorkOrdersParams, ListParams } from './validations';
import { WorkorderService } from './workorder.service';

@Controller('workorders')
export class WorkorderController {
  constructor(private readonly service: WorkorderService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Ordenes de trabajo ordenadas por prioridad',
  })
  getWorkOrders(@Query() params: ListParams): Promise<WorkOrder[]> {
    const findParams: FindWorkOrdersParams = new FindWorkOrdersParams(params);
    return this.service.getWorkOrders(findParams);
  }
}
