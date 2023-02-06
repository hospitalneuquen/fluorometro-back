import { Builder } from 'builder-pattern';
import { OrdenTrabajo } from './ordenTrabajo.entity';
import { Protocolo, ProtocoloItem } from './protocolo.entity';
import { WorkList } from './workList.entity';
import * as mongoose from 'mongoose';
import { ObjectID } from 'typeorm';

describe('WorkList Entity', () => {
  it('copyFromOrdenTrabajo', () => {
    const ot = new OrdenTrabajo();
    ot.fecha_desde = '2023-01-01';
    ot.fecha_hasta = '2023-01-30';

    const prot1 = Builder(Protocolo)
      .idprotocolo(300)
      .paciente('P101')
      .items([
        Builder(ProtocoloItem)
          .disabled(false)
          .item('TSH')
          .cantidad(null)
          .build(),
        Builder(ProtocoloItem)
          .disabled(false)
          .item('ABC')
          .cantidad(null)
          .build(),
        Builder(ProtocoloItem)
          .disabled(false)
          .item('CDE')
          .cantidad(null)
          .build(),
      ])
      .build();
    const prot2 = Builder(Protocolo)
      .idprotocolo(301)
      .paciente('P102')
      .items([
        Builder(ProtocoloItem)
          .disabled(true)
          .item('TSH')
          .cantidad(null)
          .build(),
        Builder(ProtocoloItem)
          .disabled(false)
          .item('ABC')
          .cantidad(null)
          .build(),
        Builder(ProtocoloItem)
          .disabled(false)
          .item('CDE')
          .cantidad(null)
          .build(),
      ])
      .build();
    const prot3 = Builder(Protocolo)
      .idprotocolo(302)
      .paciente('P103')
      .items([
        Builder(ProtocoloItem)
          .disabled(true)
          .item('ABC')
          .cantidad(null)
          .build(),
        Builder(ProtocoloItem)
          .disabled(false)
          .item('TSH')
          .cantidad(null)
          .build(),
        Builder(ProtocoloItem)
          .disabled(false)
          .item('CDE')
          .cantidad(null)
          .build(),
      ])
      .build();
    const prot4 = Builder(Protocolo)
      .idprotocolo(303)
      .paciente('P103')
      .items([
        Builder(ProtocoloItem)
          .disabled(true)
          .item('ABC')
          .cantidad(null)
          .build(),
        Builder(ProtocoloItem)
          .disabled(false)
          .item('CDE')
          .cantidad(null)
          .build(),
        Builder(ProtocoloItem)
          .disabled(false)
          .item('TSH')
          .cantidad(null)
          .build(),
      ])
      .build();
    const prot5 = Builder(Protocolo)
      .idprotocolo(304)
      .paciente('P104')
      .items([
        Builder(ProtocoloItem)
          .disabled(true)
          .item('ABC')
          .cantidad(null)
          .build(),
        Builder(ProtocoloItem)
          .disabled(false)
          .item('CDE')
          .cantidad(null)
          .build(),
        Builder(ProtocoloItem)
          .disabled(false)
          .item('FGH')
          .cantidad(null)
          .build(),
      ])
      .build();
    ot.protocolos = [prot1, prot2, prot3, prot4, prot5];
    const wl: WorkList = new WorkList();
    wl.copyFromOrdenTrabajo(ot, 'TSH');

    expect(wl.withResults).toBe(false);
    expect(wl.ordenTrabajoId).not.toBeNull();
    expect(wl.itemCode).toBe('TSH');
    expect(wl.items.length).toBe(3);
    expect(wl.items[0].target).toBe(300);
    expect(wl.items[1].target).toBe(302);
    expect(wl.items[2].target).toBe(303);
  });
});
