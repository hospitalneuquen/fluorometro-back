import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

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

  @Column()
  item: string;

  @Column()
  withResults: boolean;

  @Column(() => WorkListItem)
  workLists: WorkListItem[];
}
