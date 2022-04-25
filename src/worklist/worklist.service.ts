import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WorklistService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    console.log(this.configService);
    return `Hola desde worklist ${this.configService.get<string>(
      'MSSQL_HOST',
    )}`;
  }
}
