import { Column } from 'typeorm';
import { ProtocoloBase } from './protocoloBase.entity';

export class ProtocoloItem {
  @Column()
  item: string;

  @Column()
  cantidad: string;

  @Column()
  disabled: boolean;
}

export class Protocolo extends ProtocoloBase {
  @Column(() => ProtocoloItem)
  items: ProtocoloItem[];
}
