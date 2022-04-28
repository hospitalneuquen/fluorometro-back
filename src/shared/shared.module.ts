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
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('sips.host'),
        username: configService.get('sips.username'),
        password: configService.get('sips.password'),
        database: configService.get('sips.database'),
        options: { encrypt: false },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class SharedModule {}
