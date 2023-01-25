import { Column, Entity, ObjectIdColumn } from 'typeorm';

// Tipos de estudios que se pueden realizar
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
