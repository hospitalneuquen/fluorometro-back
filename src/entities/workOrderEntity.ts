import { WorkOrderBase } from './workOrderBase';

export interface WorkOrderEntity extends WorkOrderBase {
  item: string;
  cantidad: string;
}
