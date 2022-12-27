import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';

@Injectable()
export class WorklistService {
  constructor(private configService: ConfigService) {}

  create(ordenTrabajo: OrdenTrabajo) {}

  getHello(): string {
    return `Hola desde worklist ${this.configService.get<string>(
      'MSSQL_HOST',
    )}`;
  }
}
