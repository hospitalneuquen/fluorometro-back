import { ProtocoloBase } from './protocoloBase.entity';

export interface ProtocoloLine extends ProtocoloBase {
  item: string;
  cantidad: string;
}
