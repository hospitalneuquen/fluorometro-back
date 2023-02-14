import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';
import { PruebaLaboratorio } from 'src/entities/pruebaLaboratorio.entity';
import { WorkList } from 'src/entities/workList.entity';
import { AllExceptionsFilter } from './CustomExceptionFilter';
import configuration from '../config/configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: 'sips',
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('sips.host'),
        username: configService.get('sips.username'),
        password: configService.get('sips.password'),
        database: configService.get('sips.database'),
        logging: true,
        options: { encrypt: false },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: 'fluorometro',
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('mongo.host'),
        port: configService.get('mongo.port') || 27017,
        username: configService.get('mongo.username'),
        password: configService.get('mongo.password'),
        database: configService.get('mongo.database'),
        authSource: configService.get('mongo.authDB'),
        logging: true,
        entities: [OrdenTrabajo, PruebaLaboratorio, WorkList],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [ConfigService],
})
export class SharedModule {}
