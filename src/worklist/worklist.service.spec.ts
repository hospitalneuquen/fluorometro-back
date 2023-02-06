import { Test, TestingModule } from '@nestjs/testing';
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';
import { WorkList } from 'src/entities/workList.entity';
import { OrdenTrabajoService } from 'src/orden-trabajo/orden-trabajo.service';
import { ProtocoloModule } from 'src/protocolo/protocolo.module';
import { ProtocoloService } from 'src/protocolo/protocolo.service';
import { SharedModule } from 'src/shared/shared.module';
import { CreateWorklistDTO } from './validation';
import { WorklistService } from './worklist.service';
import { Protocolo, ProtocoloItem } from '../entities/protocolo.entity';
import { Builder } from 'builder-pattern';

const TOKEN_NAME = 'sipsConnection';
describe('WorklistService', () => {
  let service: WorklistService;

  const ITEM_CODE_EXISTS = 'IC_EXISTS';
  const ITEM_CODE_NOT_EXISTS = 'TSH';
  const WORKORDER_CODE_EXISTS = '123';

  async function init({ getManyResponse }: { getManyResponse?: Array<any> }) {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProtocoloModule, SharedModule],
      providers: [WorklistService, OrdenTrabajoService, ProtocoloService],
    })
      .useMocker((token) => {
        if (token == TOKEN_NAME) {
          return {};
        }
        if (token == WorklistService) {
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
            query: (_) => {
              return [];
            },
            findById: (id: string) => {
              try {
                const ot = new OrdenTrabajo();
                ot.id = id;
                ot.protocolos = [];
                return Promise.resolve(ot);
              } catch (e) {
                return Promise.reject(e);
              }
            },
            findOneOrFail: (query: any) => {
              const ot = new OrdenTrabajo();
              ot.fecha_desde = '2023-01-01';
              ot.fecha_hasta = '2023-01-30';
              ot.id = query?.where?.id;

              const prot1 = Builder(Protocolo)
                .idprotocolo(300)
                .paciente('P101')
                .items([
                  Builder(ProtocoloItem)
                    .disabled(false)
                    .item('TSH')
                    .cantidad(null)
                    .build(),
                  Builder(ProtocoloItem)
                    .disabled(false)
                    .item('ABC')
                    .cantidad(null)
                    .build(),
                  Builder(ProtocoloItem)
                    .disabled(false)
                    .item('CDE')
                    .cantidad(null)
                    .build(),
                ])
                .build();
              const prot2 = Builder(Protocolo)
                .idprotocolo(301)
                .paciente('P102')
                .items([
                  Builder(ProtocoloItem)
                    .disabled(true)
                    .item('TSH')
                    .cantidad(null)
                    .build(),
                  Builder(ProtocoloItem)
                    .disabled(false)
                    .item('ABC')
                    .cantidad(null)
                    .build(),
                  Builder(ProtocoloItem)
                    .disabled(false)
                    .item('CDE')
                    .cantidad(null)
                    .build(),
                ])
                .build();
              const prot3 = Builder(Protocolo)
                .idprotocolo(302)
                .paciente('P103')
                .items([
                  Builder(ProtocoloItem)
                    .disabled(true)
                    .item('ABC')
                    .cantidad(null)
                    .build(),
                  Builder(ProtocoloItem)
                    .disabled(false)
                    .item('TSH')
                    .cantidad(null)
                    .build(),
                  Builder(ProtocoloItem)
                    .disabled(false)
                    .item('CDE')
                    .cantidad(null)
                    .build(),
                ])
                .build();
              const prot4 = Builder(Protocolo)
                .idprotocolo(303)
                .paciente('P103')
                .items([
                  Builder(ProtocoloItem)
                    .disabled(true)
                    .item('ABC')
                    .cantidad(null)
                    .build(),
                  Builder(ProtocoloItem)
                    .disabled(false)
                    .item('CDE')
                    .cantidad(null)
                    .build(),
                  Builder(ProtocoloItem)
                    .disabled(false)
                    .item('TSH')
                    .cantidad(null)
                    .build(),
                ])
                .build();
              const prot5 = Builder(Protocolo)
                .idprotocolo(304)
                .paciente('P104')
                .items([
                  Builder(ProtocoloItem)
                    .disabled(true)
                    .item('ABC')
                    .cantidad(null)
                    .build(),
                  Builder(ProtocoloItem)
                    .disabled(false)
                    .item('CDE')
                    .cantidad(null)
                    .build(),
                  Builder(ProtocoloItem)
                    .disabled(false)
                    .item('FGH')
                    .cantidad(null)
                    .build(),
                ])
                .build();
              ot.protocolos = [prot1, prot2, prot3, prot4, prot5];
              return Promise.resolve(ot);
            },
            createQueryBuilder: () => createQueryBuilder,
          };
        }
        if (token == 'fluorometro_WorkListRepository') {
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
            findOneBy: (...params) => {
              if (
                params.length == 1 &&
                params[0].itemCode == ITEM_CODE_EXISTS &&
                params[0].ordenTrabajoId == WORKORDER_CODE_EXISTS
              ) {
                // return Promise.resolve();
                const obj = new WorkList();
                obj.itemCode = params[0].itemCode;
                return Promise.resolve(obj);
              }
              return Promise.resolve();
            },
            save: (a) => Promise.resolve(a),
            createQueryBuilder: () => createQueryBuilder,
          };
        }
      })
      .compile();
    service = module.get<WorklistService>(WorklistService);
  }

  it('should be defined', async () => {
    await init({});
    expect(service).toBeDefined();
  });
  it('createFromOrdenTrabajo - Rejects if already exists worklist', async () => {
    const dto = new CreateWorklistDTO();
    dto.study_code = ITEM_CODE_EXISTS;
    dto.work_order_id = WORKORDER_CODE_EXISTS;
    await expect(service.createFromOrdenTrabajo(dto)).rejects.toThrow(
      'La orden de trabajo ya tiene una worklist asociada',
    );
  });
  it('createFromOrdenTrabajo - Ok', async () => {
    const dto = new CreateWorklistDTO();
    dto.study_code = ITEM_CODE_NOT_EXISTS;
    dto.work_order_id = WORKORDER_CODE_EXISTS;
    const result = await service.createFromOrdenTrabajo(dto);
    expect(result).not.toBeNull();
    expect(result.ordenTrabajoId).toBe(WORKORDER_CODE_EXISTS);
    expect(result.itemCode).toBe(ITEM_CODE_NOT_EXISTS);
    expect(result.withResults).toBeFalsy();
    expect(result.items).toHaveLength(3);
  });
});
