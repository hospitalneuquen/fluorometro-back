import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { FindProtocolosParams } from './validations';
import * as R from 'ramda';
import { InjectConnection } from '@nestjs/typeorm';
import { ProtocoloLine } from 'src/entities/protocoloLine.entity';
import { Protocolo, ProtocoloItem } from 'src/entities/protocolo.entity';

@Injectable()
export class ProtocoloService {
  constructor(
    @InjectConnection('sips') private readonly connection: Connection,
  ) {}

  convertLaboratoryLineEntityToProtocolo(
    order: ProtocoloLine,
  ): Protocolo {
    const response: Protocolo = {
      ...R.omit(['item', 'cantidad'], order),
      items: [
        {
          item: order.item,
          cantidad: order.cantidad,
          disabled: order.cantidad == 'xxx',
        },
      ],
    };
    return response;
  }

  groupOrdersByNumber(orders: ProtocoloLine[]): Protocolo[] {
    return orders.reduce((acc, aOrder) => {
      const workOrder: Protocolo = acc.find(
        (item: Protocolo) => item.numero == aOrder.numero,
      );
      workOrder
        ? workOrder.items.push({
            item: aOrder.item,
            cantidad:
              aOrder.cantidad == '___' || aOrder.cantidad == 'xxx'
                ? '0'
                : aOrder.cantidad,
            disabled: aOrder.cantidad == 'xxx',
          })
        : acc.push(this.convertLaboratoryLineEntityToProtocolo(aOrder));
      return acc;
    }, []);
  }

  prioritizeGroupedOrders(groupedOrders: Protocolo[]): Protocolo[] {
    const isPrioritized = (items: Array<ProtocoloItem>) =>
      R.includes(
        true,
        items.map((item: ProtocoloItem) => item.disabled),
      );
    const excludeMonitoreoPKU = (items: Array<ProtocoloItem>) =>
      R.slice(0, -1, items);
    const fnCompareByPriority = (a: Protocolo, b: Protocolo) => {
      const isAPriritized = isPrioritized(excludeMonitoreoPKU(a.items));
      const isBPriritized = isPrioritized(excludeMonitoreoPKU(b.items));
      if (isAPriritized && isBPriritized) return 0;
      if (!isAPriritized && !isBPriritized) return 0;
      if (isBPriritized) return 1;
      return -1;
    };
    return R.sort(fnCompareByPriority, groupedOrders);
  }

  processWorkOrderList(orders: ProtocoloLine[]): Protocolo[] {
    const groupedOrders = this.groupOrdersByNumber(orders);
    return this.prioritizeGroupedOrders(groupedOrders);
  }

  async getProtocolos(params: FindProtocolosParams): Promise<Protocolo[]> {
    //LAB_GeneraHT(:@fechaDesde, :@fechaHasta, :@idHojaTrabajo, :@idEfectorSolicitante, :@idOrigen, :@idPrioridad, :@idSector, :@estado, :@numeroDesde, :@numeroHasta, :@desdeUltimoNumero)
    const PESQUISA_CODE = 72;
    const lines: ProtocoloLine[] = await this.connection.query(
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
    return this.processWorkOrderList(lines);
  }
}
