import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdenTrabajo } from 'src/entities/ordenTrabajo.entity';
import { WorkList } from 'src/entities/workList.entity';
import { OrdenTrabajoService } from 'src/orden-trabajo/orden-trabajo.service';
import { ValidationException } from 'src/shared/errors';
import { EntityNotFoundError, ObjectID, Repository } from 'typeorm';
import { CreateWorklistDTO } from './validation';

@Injectable()
export class WorklistService {
  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    @InjectRepository(WorkList, 'fluorometro')
    private repository: Repository<WorkList>,
  ) { }

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

  // async save(obj: CreateWorklistDTO): Promise<WorkList> { return  }
}
