import { Test } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SharedModule } from 'src/shared/shared.module';
import { OrdenTrabajoService } from 'src/orden-trabajo/orden-trabajo.service';
import { ProtocoloModule } from 'src/protocolo/protocolo.module';
import { OrdenTrabajoController } from 'src/orden-trabajo/orden-trabajo.controller';
// import { GenericContainer } from 'testcontainers';

// jest.setTimeout(9000);

describe('OrdenTrabajoController', () => {
  let app: NestFastifyApplication;
  // let mongoContainer;

  beforeAll(async () => {
    /* mongoContainer = await new GenericContainer('mongo:4-focal')
      .withExposedPorts(27017)
      .withEnv('MONGO_INITDB_ROOT_USERNAME', 'user_fluorometro')
      .withEnv('MONGO_INITDB_ROOT_PASSWORD', 'pass_fluorometro')
      .withEnv('MONGO_INITDB_DATABASE', 'fluorometro')
      .start(); */
    const moduleRef = await Test.createTestingModule({
      imports: [ProtocoloModule, SharedModule],
      controllers: [OrdenTrabajoController],
      providers: [OrdenTrabajoService],
    })
      .useMocker((token) => {
        if (token == 'fluorometro_OrdenTrabajoRepository') {
          const createQueryBuilder: any = {
            select: () => createQueryBuilder,
            where: () => createQueryBuilder,
            getMany: jest.fn().mockReturnValueOnce(Promise.resolve([])),
          };
          return {
            query: () => {
              return [];
            },
            createQueryBuilder: () => createQueryBuilder,
          };
        }
      })
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`GET /workorders`, async () => {
    return app
      .inject({
        method: 'GET',
        url: '/workorders',
      })
      .then((result: any) => {
        expect(result.statusCode).toEqual(400);
        const payload = JSON.parse(result.payload);
        expect(payload.statusCode).toEqual(400);
        expect(payload.message).toContain('dateFrom should not be empty');
        expect(payload.message).toContain('dateTo should not be empty');
      });
  });

  afterAll(async () => {
    try {
      await app.close();
    } catch (e) {
      console.log(e);
    }
  });
});
