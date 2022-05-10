import { Injectable } from '@nestjs/common';
import { WorkOrder, WorkOrderItem } from 'src/entities/workOrder';
import { WorkOrderEntity } from 'src/entities/workOrderEntity';
import { Connection } from 'typeorm';
import { FindWorkOrdersParams } from './validations';
import * as R from 'ramda';

@Injectable()
export class WorkorderService {
  constructor(private readonly connection: Connection) {}

  convertWorkOrderEntityToWorkOrder(order: WorkOrderEntity): WorkOrder {
    const response: WorkOrder = {
      ...R.omit(['item', 'cantidad'], order),
      items: [{ item: order.item, cantidad: order.cantidad }],
    };
    return response;
  }

  groupOrdersByNumber(orders: WorkOrderEntity[]): WorkOrder[] {
    return orders.reduce((acc, aOrder) => {
      const workOrder: WorkOrder = acc.find(
        (item: WorkOrder) => item.numero == aOrder.numero,
      );
      workOrder
        ? workOrder.items.push({ item: aOrder.item, cantidad: aOrder.cantidad })
        : acc.push(this.convertWorkOrderEntityToWorkOrder(aOrder));
      return acc;
    }, []);
  }

  prioritizeGroupedOrders(groupedOrders: WorkOrder[]): WorkOrder[] {
    const isPrioritized = (items: Array<WorkOrderItem>) =>
      R.includes(
        'xxx',
        items.map((item: WorkOrderItem) => item.cantidad),
      );
    const excludeMonitoreoPKU = (items: Array<WorkOrderItem>) =>
      R.slice(0, -1, items);
    const fnCompareByPriority = (a: WorkOrder, b: WorkOrder) => {
      const isAPriritized = isPrioritized(excludeMonitoreoPKU(a.items));
      const isBPriritized = isPrioritized(excludeMonitoreoPKU(b.items));
      if (isAPriritized && isBPriritized) return 0;
      if (!isAPriritized && !isBPriritized) return 0;
      if (isBPriritized) return 1;
      return -1;
    };
    return R.sort(fnCompareByPriority, groupedOrders);
  }

  processWorkOrderList(orders: WorkOrderEntity[]): WorkOrder[] {
    const groupedOrders = this.groupOrdersByNumber(orders);
    return this.prioritizeGroupedOrders(groupedOrders);
  }

  async getWorkOrders(params: FindWorkOrdersParams): Promise<WorkOrder[]> {
    //LAB_GeneraHT(:@fechaDesde, :@fechaHasta, :@idHojaTrabajo, :@idEfectorSolicitante, :@idOrigen, :@idPrioridad, :@idSector, :@estado, :@numeroDesde, :@numeroHasta, :@desdeUltimoNumero)
    const PESQUISA_CODE = 72;
    const workOrders: WorkOrderEntity[] = await this.connection.query(
      'EXEC LAB_GeneraHT @0, @1, @2, null, null, null, null, null, @3, @4, @5',
      [
        params.dateFrom,
        params.dateTo,
        PESQUISA_CODE,
        params.numberFrom || null,
        params.numberTo || null,
        params.sinceNumber || null,
      ],
    );
    return this.processWorkOrderList(workOrders);
  }
}
