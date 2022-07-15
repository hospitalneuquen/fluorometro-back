import { Test } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SharedModule } from 'src/shared/shared.module';
import { OrdenTrabajoService } from 'src/orden-trabajo/orden-trabajo.service';
import { ProtocoloModule } from 'src/protocolo/protocolo.module';
import { OrdenTrabajoController } from 'src/orden-trabajo/orden-trabajo.controller';

jest.setTimeout(9000);

describe('OrdenTrabajoController', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
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

  it(`/GET workorders`, async () => {
    return app
      .inject({
        method: 'GET',
        url: '/workorders',
      })
      .then((result: any) => {
        // console.log(result.body);
        expect(result.statusCode).toEqual(400);
        const payload = JSON.parse(result.payload);
        expect(payload.statusCode).toEqual(400);
        expect(payload.messageCode).toEqual('dateFromAndDateToAreRequired');
      });
  });

  afterAll(async () => {
    try {
      await app.close();
    } catch(e) {
      console.log()
    }
  });
});
