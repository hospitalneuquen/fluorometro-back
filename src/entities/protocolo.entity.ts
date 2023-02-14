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

export class Protocolo {
  @Column()
  letra: string;
  @Column()
  numero: number;
  @Column()
  numeroOrigen: string;
  @Column()
  orden: number;
  @Column()
  antecedente: string;
  @Column()
  prioridad: string;
  @Column()
  origen: string;
  @Column()
  datosPaciente: number;
  @Column()
  edad: string;
  @Column()
  sexo: string;
  @Column()
  paciente: string;
  @Column()
  area: string;
  @Column()
  ordenProtocolo: number;
  @Column()
  fecha: string;
  @Column()
  responsable: string;
  @Column()
  idHojaTrabajo: number;
  @Column()
  codigoHT: string;
  @Column()
  textoInferiorDerecha: string;
  @Column()
  textoInferiorIzquierda: string;
  @Column()
  muestra: string;
  @Column()
  idprotocolo: number;
  @Column()
  medico: string;

  @Column(() => ProtocoloItem)
  items: ProtocoloItem[];
}
