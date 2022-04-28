import { Controller, Get, Query } from '@nestjs/common';
import { WorkOrder } from 'src/entities/workOrder';
import { FindWorkOrdersParams, ListParams } from './validations';
import { WorkorderService } from './workorder.service';

@Controller('workorder')
export class WorkorderController {
  constructor(private readonly service: WorkorderService) {}

  @Get()
  getWorkOrders(@Query() params: ListParams): Promise<WorkOrder[]> {
    const findParams: FindWorkOrdersParams = params;
    return this.service.getWorkOrders(findParams);
  }
}
