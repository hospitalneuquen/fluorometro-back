import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Protocolo } from './protocolo.entity';

@Entity()
export class OrdenTrabajo {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  fecha_desde: string;

  @Column()
  fecha_hasta: string;

  @Column()
  numero_desde: number;

  @Column()
  numero_hasta: number;

  @Column(() => Protocolo)
  protocolos: Protocolo[];
}
