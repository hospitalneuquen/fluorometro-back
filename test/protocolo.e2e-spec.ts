import { Test } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SharedModule } from 'src/shared/shared.module';
import { ProtocoloModule } from 'src/protocolo/protocolo.module';
import { ProtocoloService } from 'src/protocolo/protocolo.service';

function delay(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(null), ms));
}

describe('ProtocoloController', () => {
  let app: NestFastifyApplication;
  // let mongoContainer: StartedTestContainer;

  beforeAll(async () => {
    /* mongoContainer = await new GenericContainer('mongo:4-focal')
      .withExposedPorts(27017)
      .withEnv('MONGO_INITDB_ROOT_USERNAME', 'user_fluorometro')
      .withEnv('MONGO_INITDB_ROOT_PASSWORD', 'pass_fluorometro')
      .withEnv('MONGO_INITDB_DATABASE', 'fluorometro')
      .withBindMount(
        process.cwd() + '/docker/init-mongo/create-db.js',
        '/docker-entrypoint-initdb.d/init-mongo.js',
        'ro',
      )
      .withDefaultLogDriver()
      .start(); */
    /* const stream = await mongoContainer.logs();
    stream
      .on('data', (line) => console.log(line))
      .on('err', (err) => console.error(err))
      .on('end', () => console.log('-----')); */
    /* process.env.MONGO_PORT = mongoContainer.getMappedPort(27017).toString();
    process.env.MONGO_HOST = mongoContainer.getHost(); */
    // await delay(5000);
    // await ConfigModule.envVariablesLoade;
    /* console.log(
      '----------------PORT---------------',
      process.env.MONGO_HOST,
      process.env.MONGO_PORT,
    ); */
    // console.log('despues-----------------------', mongoContainer);
    const moduleRef = await Test.createTestingModule({
      imports: [ProtocoloModule, SharedModule],
      providers: [ProtocoloService],
    })
      .useMocker((token) => {})
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`/GET protocols without parameters should fail with 400`, async () => {
    return app
      .inject({
        method: 'GET',
        url: '/protocols',
      })
      .then((result: any) => {
        expect(result.statusCode).toEqual(400);
      });
  });

  it(`/GET protocols with dateFrom equals to dateTo should fail with 400`, async () => {
    return app
      .inject({
        method: 'GET',
        url: '/protocols?dateFrom=2022-05-05&dateTo=2022-05-05',
      })
      .then((result: any) => {
        expect(result.statusCode).toEqual(400);
      });
  });

  it(`/GET protocols with dateFrom later than dateTo should fail with 400`, async () => {
    return app
      .inject({
        method: 'GET',
        url: '/protocols?dateFrom=2022-05-07&dateTo=2022-05-05',
      })
      .then((result: any) => {
        expect(result.statusCode).toEqual(400);
      });
  });

  it(`/GET protocols with correct params should return an array`, async () => {
    return app
      .inject({
        method: 'GET',
        url: '/protocols?dateFrom=2022-05-05&dateTo=2022-05-07',
      })
      .then((result: any) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body).not.toBeNull();
        expect(JSON.parse(result.body)).toBeInstanceOf(Array);
      });
  });

  afterAll(async () => {
    try {
      // mongoContainer && mongoContainer.stop();
      await app.close();
    } catch (e) {
      // console.log(e);
    }
  });
});
