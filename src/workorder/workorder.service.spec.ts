import { Test, TestingModule } from '@nestjs/testing';
import { WorkorderService } from './workorder.service';
import { LaboratoryLineEntity } from 'src/entities/laboratoryLineEntity';
import { WorkOrder } from 'src/entities/workOrder';

const TOKEN_NAME = 'sipsConnection';

describe('Workorder service unit tests', () => {
  let service: WorkorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkorderService],
    })
      .useMocker((token) => {
        if (token == TOKEN_NAME) {
          return {
            query: (params: any) => {
              return [];
            },
          };
        }
      })
      .compile();
    service = module.get<WorkorderService>(WorkorderService);
  });

  it('test convertLaboratoryLineEntityToWorkOrder', () => {
    const input: LaboratoryLineEntity = {
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

    const output: WorkOrder = service.convertLaboratoryLineEntityToWorkOrder(input);
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
    const input: Array<LaboratoryLineEntity> = [
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

    const output: Array<WorkOrder> = service.groupOrdersByNumber(input);
    expect(output.length).toEqual(2);
    expect(output[0].items.length).toEqual(3);
    expect(output[1].items.length).toEqual(1);
  });

  it('test prioritizeGroupedOrders', () => {
    const input: Array<WorkOrder> = [
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
          { item: 'TSH', cantidad: '___' },
          { item: 'PKU ', cantidad: '___' },
          { item: 'TIR ', cantidad: '___' },
          { item: '17-OH-P', cantidad: '___' },
          { item: 'GAL', cantidad: '___' },
          { item: 'BIOT', cantidad: '___' },
          { item: 'MSUD', cantidad: '___' },
          { item: 'Monitoreo PKU', cantidad: 'xxx' },
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
          { item: 'TSH', cantidad: 'xxx' },
          { item: 'PKU ', cantidad: 'xxx' },
          { item: 'TIR ', cantidad: 'xxx' },
          { item: '17-OH-P', cantidad: 'xxx' },
          { item: 'GAL', cantidad: 'xxx' },
          { item: 'BIOT', cantidad: 'xxx' },
          { item: 'MSUD', cantidad: 'xxx' },
          { item: 'Monitoreo PKU', cantidad: '___' },
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
          { item: 'TSH', cantidad: 'xxx' },
          { item: 'PKU ', cantidad: 'xxx' },
          { item: 'TIR ', cantidad: 'xxx' },
          { item: '17-OH-P', cantidad: 'xxx' },
          { item: 'GAL', cantidad: 'xxx' },
          { item: 'BIOT', cantidad: 'xxx' },
          { item: 'MSUD', cantidad: 'xxx' },
          { item: 'Monitoreo PKU', cantidad: '___' },
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
          { item: 'TSH', cantidad: '___' },
          { item: 'PKU ', cantidad: '___' },
          { item: 'TIR ', cantidad: '___' },
          { item: '17-OH-P', cantidad: '___' },
          { item: 'GAL', cantidad: '___' },
          { item: 'BIOT', cantidad: '___' },
          { item: 'MSUD', cantidad: '___' },
          { item: 'Monitoreo PKU', cantidad: 'xxx' },
        ],
      },
    ];
    const output: Array<WorkOrder> = service.prioritizeGroupedOrders(input);
    expect(output.length).toEqual(4);
    expect(output[0].numero).toEqual(1353816);
    expect(output[1].numero).toEqual(1353818);
    expect(output[2].numero).toEqual(1353823);
    expect(output[3].numero).toEqual(1353824);
  });
});

describe('Test from getWorkOrders', () => {
  let service: WorkorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkorderService],
    })
      .useMocker((token) => {
        if (token == TOKEN_NAME) {
          return {
            query: (params: any) => {
              return [];
            },
          };
        }
      })
      .compile();
    service = module.get<WorkorderService>(WorkorderService);
  });

  it('Test getWorkOrders', () => {
    service.getWorkOrders({ dateFrom: '2022-01-01', dateTo: '2022-01-02' });
  });
});
