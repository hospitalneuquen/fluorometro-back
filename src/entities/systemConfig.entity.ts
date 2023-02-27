import { Column, Entity, ObjectIdColumn } from 'typeorm';

// Configuracion
@Entity()
export class SystemConfig {
  @ObjectIdColumn()
  id: string;

  @Column()
  espacios_totales: number;
}
