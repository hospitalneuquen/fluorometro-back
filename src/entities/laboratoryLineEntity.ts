import { WorkOrderBase } from './workOrderBase';

export interface LaboratoryLineEntity extends WorkOrderBase {
  item: string;
  cantidad: string;
}
