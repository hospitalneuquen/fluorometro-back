import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as moment from 'moment';
import { Protocolo } from 'src/entities/protocolo.entity';
import { FindProtocolosParams } from 'src/protocolo/validations';
import { ProtocoloModule } from '../protocolo/protocolo.module';
import { ProtocoloService } from '../protocolo/protocolo.service';
import { OrdenTrabajoService } from './orden-trabajo.service';

const TOKEN_NAME = 'sipsConnection';
describe('OrdenTrabajoService', () => {
  let service: OrdenTrabajoService;

  async function init({ getManyResponse }: { getManyResponse?: Array<any> }) {
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
        if (token == 'fluorometro_OrdenTrabajoRepository') {
          const createQueryBuilder: any = {
            select: () => createQueryBuilder,
            where: () => createQueryBuilder,
            getMany: jest
              .fn()
              .mockReturnValueOnce(Promise.resolve(getManyResponse || [])),
          };
          return {
            query: (params: any) => {
              return [];
            },
            createQueryBuilder: () => createQueryBuilder,
          };
        }
      })
      .compile();
    service = module.get<OrdenTrabajoService>(OrdenTrabajoService);
  }

  it('should be defined', async () => {
    await init({});
    expect(service).toBeDefined();
  });

  it('Create workorder using new protocols', async () => {
    await init({});
    const DATE_FROM = '2022-01-01';
    const DATE_TO = '2022-01-01';
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
      expect(workOrderToSave.fecha_desde).toEqual(DATE_FROM);
      expect(workOrderToSave.fecha_hasta).toEqual(DATE_TO);
      expect(workOrderToSave.protocolos).toBe(protocolListExpected);
      return Promise.resolve(workOrderToSave);
    });
    const input = { dateFrom: DATE_FROM, dateTo: DATE_TO };
    const output = await service.createWorkOrder(input);
    expect(output.protocolos.length).toEqual(4);
  });

  it('findOverlapsWith - without overlaps', async () => {
    await init({});
    const DATE_FROM = '2022-01-01';
    const DATE_TO = '2022-01-01';
    const NUMBER_FROM = 100;
    const NUMBER_TO = 150;
    const params: FindProtocolosParams = {
      dateFrom: DATE_FROM,
      dateTo: DATE_TO,
      numberFrom: NUMBER_FROM,
      numberTo: NUMBER_TO,
    };
    const response = await service.findOverlapsWith(params);
    expect(response.length).toBe(0);
  });

  it('findOverlapsWith - with overlaps', async () => {
    const DATE_FROM = '2022-01-01';
    const DATE_TO = '2022-01-01';
    const NUMBER_FROM = 100;
    const NUMBER_TO = 150;
    await init({ getManyResponse: [{ id: '123456', fecha_desde: DATE_FROM }] });
    const params: FindProtocolosParams = {
      dateFrom: DATE_FROM,
      dateTo: DATE_TO,
      numberFrom: NUMBER_FROM,
      numberTo: NUMBER_TO,
    };
    const response = await service.findOverlapsWith(params);
    expect(response.length).toBe(1);
  });

  it('canCreateWorkOrder - without overlaps', async () => {
    await init({});
    const DATE_FROM = '2022-01-01';
    const DATE_TO = '2022-01-01';
    const NUMBER_FROM = 100;
    const NUMBER_TO = 150;
    const params: FindProtocolosParams = {
      dateFrom: DATE_FROM,
      dateTo: DATE_TO,
      numberFrom: NUMBER_FROM,
      numberTo: NUMBER_TO,
    };
    await service.canCreateWorkOrder(params);
  });

  it('canCreateWorkOrder - with overlaps (it shouldnt create a work order)', async () => {
    const DATE_FROM = '2022-01-01';
    const DATE_TO = '2022-01-01';
    const NUMBER_FROM = 100;
    const NUMBER_TO = 150;
    await init({ getManyResponse: [{ id: '123456', fecha_desde: DATE_FROM }] });
    const params: FindProtocolosParams = {
      dateFrom: DATE_FROM,
      dateTo: DATE_TO,
      numberFrom: NUMBER_FROM,
      numberTo: NUMBER_TO,
    };
    service.canCreateWorkOrder(params).catch((err) => {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe('overlapped');
    });
  });

  it('canCreateWorkOrder - validate - must be at least 1 day back the date_to', async () => {
    const DATE_FROM = '2022-01-01';
    const DATE_TO = moment().format('YYYY-MM-DD');
    const NUMBER_FROM = 100;
    const NUMBER_TO = 150;
    await init({});
    const params: FindProtocolosParams = {
      dateFrom: DATE_FROM,
      dateTo: DATE_TO,
      numberFrom: NUMBER_FROM,
      numberTo: NUMBER_TO,
    };
    service.canCreateWorkOrder(params).catch((err) => {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe('dateToCannotBeToday');
    });
  });

  it('canCreateWorkOrder - validate - date_from must be before or equal date_to', async () => {
    const DATE_FROM = '2022-05-06';
    const DATE_TO = '2022-05-05';
    const NUMBER_FROM = 100;
    const NUMBER_TO = 150;
    await init({});
    const params: FindProtocolosParams = {
      dateFrom: DATE_FROM,
      dateTo: DATE_TO,
      numberFrom: NUMBER_FROM,
      numberTo: NUMBER_TO,
    };
    service.canCreateWorkOrder(params).catch((err) => {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe('dateFromCannotBeBeforeDateTo');
    });
  });

  it('canCreateWorkOrder - validate - numberFrom must be less or equal numberTo', async () => {
    const DATE_FROM = '2022-05-01';
    const DATE_TO = '2022-05-05';
    const NUMBER_FROM = 102;
    const NUMBER_TO = 101;
    await init({});
    const params: FindProtocolosParams = {
      dateFrom: DATE_FROM,
      dateTo: DATE_TO,
      numberFrom: NUMBER_FROM,
      numberTo: NUMBER_TO,
    };
    service.canCreateWorkOrder(params).catch((err) => {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe('numberFromMustBeLessThanNumberTo');
    });
  });
  it('canCreateWorkOrder - validate - date_from can be equal to date_to', async () => {
    const DATE_FROM = '2022-05-06';
    const DATE_TO = '2022-05-06';
    const NUMBER_FROM = 100;
    const NUMBER_TO = 150;
    await init({});
    const params: FindProtocolosParams = {
      dateFrom: DATE_FROM,
      dateTo: DATE_TO,
      numberFrom: NUMBER_FROM,
      numberTo: NUMBER_TO,
    };
    service.canCreateWorkOrder(params).then((_) => {
      expect(1).toBe(1);
    });
  });
});
