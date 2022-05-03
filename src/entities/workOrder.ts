import { WorkOrderBase } from './workOrderBase';

export interface WorkOrderItem {
  item: string;
  cantidad: string;
}
export interface WorkOrder extends WorkOrderBase {
  items: Array<WorkOrderItem>;
}
