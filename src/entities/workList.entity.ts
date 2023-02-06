import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { OrdenTrabajo } from './ordenTrabajo.entity';
import { Protocolo, ProtocoloItem } from './protocolo.entity';
import * as mongoose from 'mongoose';

@Entity()
class WorkListItem {
  @Column()
  target: number;

  @Column()
  counts: number;

  @Column()
  concentrationMgDl: number;

  @Column()
  resultCode: string;

  @Column()
  withResults: boolean;
}

@Entity()
export class WorkList {
  @ObjectIdColumn()
  id: string;

  @Column(() => OrdenTrabajo)
  ordenTrabajoId: string;

  @Column()
  itemCode: string;

  @Column()
  withResults: boolean;

  @Column(() => WorkListItem)
  items: WorkListItem[];

  // @Todo test this fn
  copyFromOrdenTrabajo(ot: OrdenTrabajo, itemCode: string) {
    this.ordenTrabajoId = ot.id;
    this.itemCode = itemCode;
    this.withResults = false;
    this.items = ot.protocolos.reduce((acc, protocolo) => {
      const hasItemCode = protocolo.items.reduce(
        (acc2: boolean, item: ProtocoloItem) => {
          if (!acc2) return item.item == itemCode && !item.disabled;
          return acc2;
        },
        false,
      );
      if (hasItemCode) {
        return [
          ...acc,
          {
            target: protocolo.idprotocolo,
            counts: null,
            concentrationMgDl: null,
            resultCode: null,
            withResults: false,
          },
        ];
      } else {
        return acc;
      }
    }, []);
  }
}
