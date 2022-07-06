import { Test, TestingModule } from '@nestjs/testing';
import { Protocolo } from 'src/entities/protocolo.entity';
import { ProtocoloLine } from 'src/entities/protocoloLine.entity';
import { ProtocoloService } from './protocolo.service';

const TOKEN_NAME = 'sipsConnection';

describe('Workorder service unit tests', () => {
  let service: ProtocoloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtocoloService],
    })
      .useMocker((token) => {
        if (token == TOKEN_NAME) {
          return {
            query: (params: any) => {
              return [];
            },
          };
        }
        return {};
      })
      .compile();
    service = module.get<ProtocoloService>(ProtocoloService);
  });

  it('test convertLaboratoryLineEntityToProtocolo', () => {
    const input: ProtocoloLine = {
      letra: 'a',
      numero: 1234,
      numeroOrigen: 'numeroOrigen',
      orden: 3344,
      antecedente: 'antecedente',
      prioridad: 'prioridad',
      origen: 'origen',
      datosPaciente: 7878,
      edad: '012',
      sexo: 'M',
      paciente: 'paciente',
      area: 'area',
      ordenProtocolo: 4678,
      fecha: '2022-01-01',
      responsable: 'responsable',
      idHojaTrabajo: 1145,
      codigoHT: 'codigoHT',
      textoInferiorDerecha: 'textoInferiorDerecha',
      textoInferiorIzquierda: 'textoInferiorIzquierda',
      muestra: 'muestra',
      idprotocolo: 9988,
      medico: 'medico',
      item: 'TSH',
      cantidad: '1',
    };

    const output: Protocolo =
      service.convertLaboratoryLineEntityToProtocolo(input);
    expect(output.letra).toEqual('a');
    expect(output.numero).toEqual(1234);
    expect(output.orden).toEqual(3344);
    expect(output.ordenProtocolo).toEqual(4678);
    expect(output.idprotocolo).toEqual(9988);
    expect(output.items.length).toEqual(1);
    expect(output.items[0].item).toEqual('TSH');
    expect(output.items[0].cantidad).toEqual('1');
  });

  it('test groupOrdersByNumber', () => {
    const input: Array<ProtocoloLine> = [
      {
        letra: 'a',
        numero: 1234,
        numeroOrigen: 'numeroOrigen',
        orden: 3344,
        antecedente: 'antecedente',
        prioridad: 'prioridad',
        origen: 'origen',
        datosPaciente: 7878,
        edad: '012',
        sexo: 'M',
        paciente: 'paciente',
        area: 'area',
        ordenProtocolo: 4678,
        fecha: '2022-01-01',
        responsable: 'responsable',
        idHojaTrabajo: 1145,
        codigoHT: 'codigoHT',
        textoInferiorDerecha: 'textoInferiorDerecha',
        textoInferiorIzquierda: 'textoInferiorIzquierda',
        muestra: 'muestra',
        idprotocolo: 9988,
        medico: 'medico',
        item: 'TSH',
        cantidad: '1',
      },
      {
        letra: 'a',
        numero: 1234,
        numeroOrigen: 'numeroOrigen',
        orden: 3344,
        antecedente: 'antecedente',
        prioridad: 'prioridad',
        origen: 'origen',
        datosPaciente: 7878,
        edad: '012',
        sexo: 'M',
        paciente: 'paciente',
        area: 'area',
        ordenProtocolo: 4678,
        fecha: '2022-01-01',
        responsable: 'responsable',
        idHojaTrabajo: 1145,
        codigoHT: 'codigoHT',
        textoInferiorDerecha: 'textoInferiorDerecha',
        textoInferiorIzquierda: 'textoInferiorIzquierda',
        muestra: 'muestra',
        idprotocolo: 9988,
        medico: 'medico',
        item: 'PKU',
        cantidad: '2',
      },

      {
        letra: 'a',
        numero: 1235,
        numeroOrigen: 'numeroOrigen',
        orden: 3344,
        antecedente: 'antecedente',
        prioridad: 'prioridad',
        origen: 'origen',
        datosPaciente: 7878,
        edad: '012',
        sexo: 'M',
        paciente: 'paciente',
        area: 'area',
        ordenProtocolo: 4678,
        fecha: '2022-01-01',
        responsable: 'responsable',
        idHojaTrabajo: 1145,
        codigoHT: 'codigoHT',
        textoInferiorDerecha: 'textoInferiorDerecha',
        textoInferiorIzquierda: 'textoInferiorIzquierda',
        muestra: 'muestra',
        idprotocolo: 9988,
        medico: 'medico',
        item: 'TSH',
        cantidad: '1',
      },
      {
        letra: 'a',
        numero: 1234,
        numeroOrigen: 'numeroOrigen',
        orden: 3344,
        antecedente: 'antecedente',
        prioridad: 'prioridad',
        origen: 'origen',
        datosPaciente: 7878,
        edad: '012',
        sexo: 'M',
        paciente: 'paciente',
        area: 'area',
        ordenProtocolo: 4678,
        fecha: '2022-01-01',
        responsable: 'responsable',
        idHojaTrabajo: 1145,
        codigoHT: 'codigoHT',
        textoInferiorDerecha: 'textoInferiorDerecha',
        textoInferiorIzquierda: 'textoInferiorIzquierda',
        muestra: 'muestra',
        idprotocolo: 9988,
        medico: 'medico',
        item: 'TIR',
        cantidad: '2',
      },
    ];

    const output: Array<Protocolo> = service.groupOrdersByNumber(input);
    expect(output.length).toEqual(2);
    expect(output[0].items.length).toEqual(3);
    expect(output[1].items.length).toEqual(1);
  });

  it('test prioritizeGroupedOrders', () => {
    const input: Array<Protocolo> = [
      {
        letra: 'A',
        numeroOrigen: '-57770',
        numero: 1353823,
        orden: 9687,
        antecedente: '0',
        prioridad: '',
        origen: '-ZA',
        datosPaciente: 1,
        edad: '',
        sexo: '-M',
        paciente: '-',
        area: 'PESQUISA NEONATAL',
        ordenProtocolo: 3,
        fecha: '26/04/2022',
        responsable: '',
        idHojaTrabajo: 72,
        codigoHT: 'PESQUISA NEONATAL',
        textoInferiorDerecha: 'Firma del responsable',
        textoInferiorIzquierda: 'Observaciones',
        muestra: '',
        idprotocolo: 1438132,
        medico: '',
        items: [
          { item: 'TSH', cantidad: '___', disabled: false },
          { item: 'PKU ', cantidad: '___', disabled: false },
          { item: 'TIR ', cantidad: '___', disabled: false },
          { item: '17-OH-P', cantidad: '___', disabled: false },
          { item: 'GAL', cantidad: '___', disabled: false },
          { item: 'BIOT', cantidad: '___', disabled: false },
          { item: 'MSUD', cantidad: '___', disabled: false },
          { item: 'Monitoreo PKU', cantidad: 'xxx', disabled: true },
        ],
      },
      {
        letra: 'A',
        numero: 1353816,
        numeroOrigen: '',
        orden: 9687,
        antecedente: '0',
        prioridad: '',
        origen: '-AL',
        datosPaciente: 1,
        edad: '',
        sexo: '-F',
        paciente: '-UNO',
        area: 'PESQUISA NEONATAL',
        ordenProtocolo: 1,
        fecha: '26/04/2022',
        responsable: '',
        idHojaTrabajo: 72,
        codigoHT: 'PESQUISA NEONATAL',
        textoInferiorDerecha: 'Firma del responsable',
        textoInferiorIzquierda: 'Observaciones',
        muestra: '',
        idprotocolo: 1438125,
        medico: '',
        items: [
          { item: 'TSH', cantidad: 'xxx', disabled: true },
          { item: 'PKU ', cantidad: 'xxx', disabled: true },
          { item: 'TIR ', cantidad: 'xxx', disabled: true },
          { item: '17-OH-P', cantidad: 'xxx', disabled: true },
          { item: 'GAL', cantidad: 'xxx', disabled: true },
          { item: 'BIOT', cantidad: 'xxx', disabled: true },
          { item: 'MSUD', cantidad: 'xxx', disabled: true },
          { item: 'Monitoreo PKU', cantidad: '___', disabled: false },
        ],
      },
      {
        letra: 'A',
        numero: 1353818,
        numeroOrigen: '',
        orden: 9687,
        antecedente: '0',
        prioridad: '',
        origen: '-A',
        datosPaciente: 1,
        edad: '',
        sexo: '-F',
        paciente: '-DOS',
        area: 'PESQUISA NEONATAL',
        ordenProtocolo: 2,
        fecha: '26/04/2022',
        responsable: '',
        idHojaTrabajo: 72,
        codigoHT: 'PESQUISA NEONATAL',
        textoInferiorDerecha: 'Firma del responsable',
        textoInferiorIzquierda: 'Observaciones',
        muestra: '',
        idprotocolo: 1438127,
        medico: '',
        items: [
          { item: 'TSH', cantidad: 'xxx', disabled: true },
          { item: 'PKU ', cantidad: 'xxx', disabled: true },
          { item: 'TIR ', cantidad: 'xxx', disabled: true },
          { item: '17-OH-P', cantidad: 'xxx', disabled: true },
          { item: 'GAL', cantidad: 'xxx', disabled: true },
          { item: 'BIOT', cantidad: 'xxx', disabled: true },
          { item: 'MSUD', cantidad: 'xxx', disabled: true },
          { item: 'Monitoreo PKU', cantidad: '___', disabled: false },
        ],
      },
      {
        letra: 'A',
        numero: 1353824,
        numeroOrigen: '-57771',
        orden: 9687,
        antecedente: '0',
        prioridad: '',
        origen: '-ZA',
        datosPaciente: 1,
        edad: '',
        sexo: '-F',
        paciente: '-',
        area: 'PESQUISA NEONATAL',
        ordenProtocolo: 4,
        fecha: '26/04/2022',
        responsable: '',
        idHojaTrabajo: 72,
        codigoHT: 'PESQUISA NEONATAL',
        textoInferiorDerecha: 'Firma del responsable',
        textoInferiorIzquierda: 'Observaciones',
        muestra: '',
        idprotocolo: 1438133,
        medico: '',
        items: [
          { item: 'TSH', cantidad: '___', disabled: false },
          { item: 'PKU ', cantidad: '___', disabled: false },
          { item: 'TIR ', cantidad: '___', disabled: false },
          { item: '17-OH-P', cantidad: '___', disabled: false },
          { item: 'GAL', cantidad: '___', disabled: false },
          { item: 'BIOT', cantidad: '___', disabled: false },
          { item: 'MSUD', cantidad: '___', disabled: false },
          { item: 'Monitoreo PKU', cantidad: 'xxx', disabled: true },
        ],
      },
    ];
    const output: Array<Protocolo> = service.prioritizeGroupedOrders(input);
    expect(output.length).toEqual(4);
    expect(output[0].numero).toEqual(1353816);
    expect(output[1].numero).toEqual(1353818);
    expect(output[2].numero).toEqual(1353823);
    expect(output[3].numero).toEqual(1353824);
  });
});

describe('Test from getProtocolos', () => {
  let service: ProtocoloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtocoloService],
    })
      .useMocker((token) => {
        if (token == TOKEN_NAME) {
          return {
            query: (params: any) => {
              return [];
            },
          };
        }
        return {};
      })
      .compile();
    service = module.get<ProtocoloService>(ProtocoloService);
  });

  it('Test getProtocolos', () => {
    service.getProtocolos({ dateFrom: '2022-01-01', dateTo: '2022-01-02' });
  });
});
