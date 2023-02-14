import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { parse } from 'csv-parse';
import { WorkList } from 'src/entities/workList.entity';
import { ErrorResponse } from 'src/shared/ErrorResponse';
import { ValidationException } from 'src/shared/errors';
import { promisify } from 'util';
import { FluorometerInputResponse } from './responses';
import {
  CreateWorklistDTO,
  FindOneParams,
  FluorometerInputResultDTO,
  ListParams,
} from './validation';
import { WorklistService } from './worklist.service';

@Controller('worklists')
export class WorklistController {
  constructor(private readonly service: WorklistService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Crea una worklist',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body: CreateWorklistDTO): Promise<WorkList> {
    return await this.service.createFromOrdenTrabajo(body);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retorna las worklists',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async list(@Query() params: ListParams): Promise<WorkList[]> {
    return await this.service.getWorklistsByDateRange(params);
  }

  @Get('/:id/download')
  @Header('Cache-control', 'none')
  @ApiResponse({
    status: 200,
    description: 'Retorna worklist en formato que necesita el fluorometro',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async download(
    @Param() params: FindOneParams,
  ): Promise<FluorometerInputResponse | ErrorResponse> {
    return this.service.download(params.id);
  }

  @Put('/:id/upload')
  @Header('Cache-control', 'none')
  @ApiResponse({
    status: 200,
    description: 'Actualiza la worklist con la salida del fluorometro',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async upload(
    @Param() params: FindOneParams,
    @Body() body: string,
  ): Promise<WorkList | ErrorResponse> {
    return new Promise((resolve, reject) => {
      const cleanedBody = body.replace(/="/g, '"');
      parse(cleanedBody, { columns: true, delimiter: ',' }, (err, data) => {
        if (err) {
          throw new ValidationException('400', err.message);
        }
        err && reject(err);
        const results = data.filter((line: any) => line['Result Code']);
        const fluorometerLines: FluorometerInputResultDTO[] = results.map(
          (line: any) => ({
            resultCode: line['Result Code'],
            status: line['Status'],
            code: line['Code'],
            counts: line['Counts'],
            concentrationMgDl: line['Conc mg/dL'],
          }),
        );
        this.service
          .updateFromFluorometer(params.id, fluorometerLines)
          .then(resolve)
          .catch(reject);
      });
    });
  }
}
