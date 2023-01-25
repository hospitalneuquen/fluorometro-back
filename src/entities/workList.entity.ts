import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { OrdenTrabajo } from './ordenTrabajo.entity';
import { Protocolo } from './protocolo.entity';

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
  id: ObjectID;

  @Column(() => OrdenTrabajo)
  ordenTrabajoId: ObjectID;

  @Column()
  itemCode: string;

  @Column()
  withResults: boolean;

  @Column(() => WorkListItem)
  items: WorkListItem[];

  copyFromOrdenTrabajo(ot: OrdenTrabajo, itemCode: string) {
    this.ordenTrabajoId = ot.id;
    // @Todo add items

    // this.workLists = ot.protocolos.filter((protocolo: Protocolo) => protocolo.)

    /* this.workLists = ot.protocolos.map((protocolo: Protocolo) => {
      protocolo.
    }) */
  }
}
