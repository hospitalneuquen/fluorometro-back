import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class PruebaLaboratorio {
  @ObjectIdColumn()
  id: string;

  @Column()
  codigo: string;

  @Column()
  nombre: string;

  @Column()
  espacios_reservados: number;
}
