import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PruebaLaboratorio } from 'src/entities/pruebaLaboratorio.entity';
import { PruebasLaboratorioController } from './pruebas-laboratorio.controller';
import { PruebasLaboratorioService } from './pruebas-laboratorio.service';
import { CreatePruebaLaboratorioDTO } from './validation';

describe('PruebasLaboratorioController - validations', () => {
  let controller: PruebasLaboratorioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PruebasLaboratorioController],
      providers: [
        {
          provide: PruebasLaboratorioService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<PruebasLaboratorioController>(
      PruebasLaboratorioController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('validation - post must have codigo', async () => {
    const body = {
      nombre: 'nombre test 1',
      codigo: '',
    };
    const myDtoObject = plainToInstance(CreatePruebaLaboratorioDTO, body);
    const errors = await validate(myDtoObject, {});
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain('codigo should not be empty');
  });

  it('validation - post codigo must be at least 3 characters', async () => {
    const body = {
      nombre: 'nombre test 1',
      codigo: '12',
    };
    const myDtoObject = plainToInstance(CreatePruebaLaboratorioDTO, body);
    const errors = await validate(myDtoObject, {});
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(
      'codigo must be longer than or equal to 3 characters',
    );
  });

  it('validation - post must have nombre', async () => {
    const body = {
      nombre: '',
      codigo: 'nombre',
    };
    const myDtoObject = plainToInstance(CreatePruebaLaboratorioDTO, body);
    const errors = await validate(myDtoObject, {});
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain('nombre should not be empty');
  });

  it('validation - pass all validations test', async () => {
    const body = {
      nombre: 'test name',
      codigo: '123',
    };
    const myDtoObject = plainToInstance(CreatePruebaLaboratorioDTO, body);
    const errors = await validate(myDtoObject, {});
    expect(errors.length).toBe(0);
  });
});

describe('PruebasLaboratorioController', () => {
  let controller: PruebasLaboratorioController;
  const getObj1 = { codigo: 'TSH', nombre: 'Labo TSH' };
  const getObj2 = { codigo: 'KPU', nombre: 'Labo KPU' };
  const getObj3 = { codigo: 'ADD', nombre: 'Labo ADD' };
  const mockListResponse = [getObj1, getObj2];
  const UPDATE_ID_EXISTS = '3';
  const UPDATE_ID_NOT_EXISTS = '4';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PruebasLaboratorioController],
      providers: [
        {
          provide: PruebasLaboratorioService,
          useValue: {
            getPruebasLaboratorio: jest
              .fn()
              .mockReturnValue(Promise.resolve(mockListResponse)),
            findById: jest.fn().mockReturnValue(Promise.resolve(getObj1)),
            deleteById: jest.fn().mockReturnValue(Promise.resolve(null)),
            save: jest
              .fn()
              .mockImplementation((obj: CreatePruebaLaboratorioDTO) => {
                const r = new PruebaLaboratorio();
                r.nombre = obj.nombre;
                r.codigo = obj.codigo;
                return Promise.resolve(r);
              }),
            update: jest
              .fn()
              .mockImplementation(
                (id: string, body: CreatePruebaLaboratorioDTO) => {
                  if (id === UPDATE_ID_EXISTS) {
                    const r = new PruebaLaboratorio();
                    r.nombre = body.nombre;
                    r.codigo = body.codigo;
                    return Promise.resolve(r);
                  }
                  if (id === UPDATE_ID_NOT_EXISTS) {
                    return Promise.resolve(undefined);
                  }
                },
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<PruebasLaboratorioController>(
      PruebasLaboratorioController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET should return service response', async () => {
    const response = await controller.list();
    expect(response.length).toBe(2);
    expect(response[0]).toBe(getObj1);
    expect(response[1]).toBe(getObj2);
  });

  it('GET /1 should return service response', async () => {
    const response = await controller.getOne('1');
    expect(response).toBe(getObj1);
  });

  it('DELETE /1 should return ok', async () => {
    const response = await controller.delete('1');
    expect(response).toBe(null);
  });

  it('POST should return service response', async () => {
    const response = await controller.save(getObj3);
    expect(response).toBeInstanceOf(PruebaLaboratorio);
    expect(response.codigo).toStrictEqual(getObj3.codigo);
    expect(response.nombre).toStrictEqual(getObj3.nombre);
  });

  it('POST /:id_existente should return service response', async () => {
    const response = await controller.update(UPDATE_ID_EXISTS, getObj3);
    expect(response).toBeInstanceOf(PruebaLaboratorio);
    expect(response.codigo).toStrictEqual(getObj3.codigo);
    expect(response.nombre).toStrictEqual(getObj3.nombre);
  });

  it('POST /:id_no_existente should return service response', async () => {
    const response = await controller.update(UPDATE_ID_NOT_EXISTS, getObj3);
    expect(response).toBe(undefined);
  });
});
