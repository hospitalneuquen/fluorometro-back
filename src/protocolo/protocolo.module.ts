import { Module } from '@nestjs/common';
import { ProtocoloController } from './protocolo.controller';
import { ProtocoloService } from './protocolo.service';

@Module({
  providers: [ProtocoloService],
  controllers: [ProtocoloController],
  exports: [ProtocoloService],
})
export class ProtocoloModule {}
