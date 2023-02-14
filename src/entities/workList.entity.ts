import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { OrdenTrabajo } from './ordenTrabajo.entity';
import { ProtocoloItem } from './protocolo.entity';

@Entity()
export class WorkListItem {
  @Column()
  exported: boolean;

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
            exported: false,
          },
        ];
      } else {
        return acc;
      }
    }, []);
  }
}
