import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    @InjectConnection('sips')
    private sipsConnection: Connection,
    @InjectConnection('fluorometro')
    private fluorometroConnection: Connection,
  ) { }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('sips', { connection: this.sipsConnection }),
      () =>
        this.db.pingCheck('fluorometro', {
          connection: this.fluorometroConnection,
        }),
    ]);
  }
}
