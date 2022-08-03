import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Protocolo } from './protocolo.entity';

class WorkListItem {
   ordenProtocolo: string;
   analito: string;
}

export class WorkList {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  item: string;

  @Column(() => Protocolo)
  protocolos: Protocolo[];
}
