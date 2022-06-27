import { Test, TestingModule } from '@nestjs/testing';
import { Protocolo } from 'src/entities/protocolo.entity';
import { ProtocoloModule } from '../protocolo/protocolo.module';
import { ProtocoloService } from '../protocolo/protocolo.service';
import { OrdenTrabajoService } from './orden-trabajo.service';

const TOKEN_NAME = 'sipsConnection';
describe('OrdenTrabajoService', () => {
  let service: OrdenTrabajoService;
  let protocoloService: ProtocoloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenTrabajoService, ProtocoloModule],
    })
      .useMocker((token) => {
        if (token == TOKEN_NAME) {
          return {};
        }
        if (token == ProtocoloService) {
          return {
            query: (params: any) => {
              return [];
            },
          };
        }
        if (token == "fluorometro_OrdenTrabajoRepository") {
          return {
            query: (params: any) => {
              return [];
            },
          };
        }
      })
      .compile();
    service = module.get<OrdenTrabajoService>(OrdenTrabajoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create workorder with using new protocols', async () => {
    const protocolListExpected: Protocolo[] = [
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
    const expectedResult: Promise<Protocolo[]> =
      Promise.resolve(protocolListExpected);
    jest
      .spyOn(service, 'getProtocols')
      .mockImplementation(() => expectedResult);
    jest.spyOn(service, 'save').mockImplementation((workOrderToSave) => {
      expect(workOrderToSave.protocolos).toBe(protocolListExpected);
      return Promise.resolve(workOrderToSave);
    });
    const input = { dateFrom: '2022-01-01', dateTo: '2022-01-02' };
    const output = await service.createWorkOrder(input);
    expect(output.protocolos.length).toEqual(4);
  });
});
