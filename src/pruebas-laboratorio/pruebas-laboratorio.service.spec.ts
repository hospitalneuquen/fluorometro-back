import { Test, TestingModule } from '@nestjs/testing';
import { PruebaLaboratorio } from 'src/entities/pruebaLaboratorio.entity';
import { ObjectID } from 'typeorm';
import { PruebasLaboratorioService } from './pruebas-laboratorio.service';

describe('PruebasLaboratorioService', () => {
  let service: PruebasLaboratorioService;
  const FIND_BY_ID_OBJ = {
    nombre: 'test findBy',
    codigo: 'codfb',
  };
  const IDS_TO_TEST = {
    exists: '1',
    not_exists: '2',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PruebasLaboratorioService],
    })
      .useMocker((token) => {
        if (token == PruebasLaboratorioService) {
          return {
            query: (params: any) => {
              return [];
            },
          };
        }
        if (token == 'fluorometro_PruebaLaboratorioRepository') {
          const createQueryBuilder: any = {
            select: () => createQueryBuilder,
            where: () => createQueryBuilder,
          };
          return {
            query: (params: any) => {
              return [];
            },
            find: (id: string) => {
              const obj = new PruebaLaboratorio();
              obj.nombre = FIND_BY_ID_OBJ.nombre;
              obj.codigo = FIND_BY_ID_OBJ.codigo;
              return Promise.resolve([obj]);
            },
            findOneOrFail: (id: any) => {
              if (id.where.id === IDS_TO_TEST.exists) {
                const obj = new PruebaLaboratorio();
                obj.nombre = FIND_BY_ID_OBJ.nombre;
                obj.codigo = FIND_BY_ID_OBJ.codigo;
                return Promise.resolve(obj);
              } else {
                return Promise.reject('not found');
              }
            },
            createQueryBuilder: () => createQueryBuilder,
          };
        }
      })
      .compile();
    service = module.get<PruebasLaboratorioService>(PruebasLaboratorioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAll should return', async () => {
    const r = await service.getPruebasLaboratorio();
    expect(r.length).toBe(1);
  });

  it('findById when found', async () => {
    const r = await service.findById(IDS_TO_TEST.exists);
    expect(r.codigo).toBe(FIND_BY_ID_OBJ.codigo);
    expect(r.nombre).toBe(FIND_BY_ID_OBJ.nombre);
  });

  it('findById when not found', async () => {
    try {
      await service.findById(IDS_TO_TEST.not_exists);
      fail();
    } catch (e) {
      expect(e).toContain('not found');
    }
  });
});
