import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] })],
  controllers: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class SharedModule {}
