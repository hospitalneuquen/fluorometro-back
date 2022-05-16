import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
        username: configService.get('mongo.username'),
        password: configService.get('mongo.password'),
        database: configService.get('mongo.database'),
        authSource: configService.get('mongo.authDB'),
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class SharedModule {}
