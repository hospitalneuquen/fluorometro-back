import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';
import { WorkList, WorkListItem } from 'src/entities/workList.entity';
import { OrdenTrabajoService } from 'src/orden-trabajo/orden-trabajo.service';
import { ValidationException } from 'src/shared/errors';
import { EntityNotFoundError, Repository } from 'typeorm';
import {
  CreateWorklistDTO,
  FluorometerInputResultDTO,
  ListParams,
} from './validation';
import { ObjectId } from 'bson';
import { FluorometerInputResponse } from './responses';

@Injectable()
export class WorklistService {
  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    @InjectRepository(WorkList, 'fluorometro')
    private repository: Repository<WorkList>,
  ) {}

  async createFromOrdenTrabajo(dto: CreateWorklistDTO): Promise<WorkList> {
    const ot: OrdenTrabajo = await this.ordenTrabajoService.findById(
      dto.work_order_id,
    );
    const alreadyExists = await this.existsForOrdenTrabajoAndCode(
      ot,
      dto.study_code,
    );
    if (alreadyExists) {
      throw new ValidationException(
        'ALREADY_EXISTS',
        'La orden de trabajo ya tiene una worklist asociada',
      );
    }
    const entity: WorkList = new WorkList();
    entity.copyFromOrdenTrabajo(ot, dto.study_code);
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<WorkList> {
    try {
      return this.repository.findOneOrFail({ where: { id } });
    } catch (e) {
      if (e instanceof EntityNotFoundError) throw new NotFoundException();
      throw e;
    }
  }

  async existsForOrdenTrabajoAndCode(
    ordenTrabajo: OrdenTrabajo,
    code: string,
  ): Promise<boolean> {
    const obj = await this.repository.findOneBy({
      itemCode: code,
      ordenTrabajoId: ordenTrabajo.id,
    });
    return !!obj;
  }

  async getWorklistsByDateRange(params: ListParams): Promise<WorkList[]> {
    const condition: any = {
      where: {
        ordenTrabajoId: new ObjectId(params.orden_trabajo_id),
      },
    };
    if (params.itemCode) {
      condition.where.itemCode = params.itemCode;
    }
    return this.repository.find(condition);
  }

  // @ToDo add limits per study type
  async download(id: string): Promise<FluorometerInputResponse> {
    const worklist: WorkList = await this.repository.findOneById(id);
    if (!worklist) throw new NotFoundException();
    return {
      filename: `${worklist.itemCode}.txt`,
      content: worklist.items
        // .filter((item: WorkListItem) => item.resultCode == studyCode)
        .map((item: WorkListItem) => item.target)
        .join('\n'),
    };
  }

  async updateFromFluorometer(
    id: string,
    results: FluorometerInputResultDTO[],
  ): Promise<WorkList> {
    if (results.length === 0) throw new NotFoundException();
    const worklist: WorkList = await this.repository.findOneById(id);
    if (!worklist) throw new NotFoundException();
    if (worklist.itemCode != results[0].resultCode)
      throw new ValidationException(
        'WRONG_CODE',
        'El codigo de estudio es incorrecto (no corresponde con el de la worklist)',
      );
    const hashed = results.reduce((acc, item) => {
      acc[item.code] = item;
      return acc;
    }, {});
    worklist.items.forEach((item) => {
      const key = item.target;
      if (hashed[key]) {
        item.withResults = true;
        item.exported = true;
        item.counts = hashed[key].counts;
        item.resultCode = hashed[key].resultCode;
        item.concentrationMgDl = hashed[key].concentrationMgDl;
      }
    });
    await this.repository.update(id, worklist);
    return this.repository.findOneById(id);
  }
}
