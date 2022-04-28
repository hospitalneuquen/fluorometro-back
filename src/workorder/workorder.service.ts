import { Injectable } from '@nestjs/common';
import { WorkOrder } from 'src/entities/workOrder';
import { Connection, Repository } from 'typeorm';
import { FindWorkOrdersParams, ListParams } from './validations';

@Injectable()
export class WorkorderService {
  constructor(private readonly connection: Connection) {}

  async getWorkOrders(params: FindWorkOrdersParams): Promise<WorkOrder[]> {
    //LAB_GeneraHT(:@fechaDesde, :@fechaHasta, :@idHojaTrabajo, :@idEfectorSolicitante, :@idOrigen, :@idPrioridad, :@idSector, :@estado, :@numeroDesde, :@numeroHasta, :@desdeUltimoNumero)
    return await this.connection.query(
      'EXEC LAB_GeneraHT @0, @1, 72, null, null, null, null, null, @2, @3, @4',
      [
        params.dateFrom,
        params.dateTo,
        params.numberFrom || null,
        params.numberTo || null,
        params.sinceNumber || null,
      ],
    );
  }
}
