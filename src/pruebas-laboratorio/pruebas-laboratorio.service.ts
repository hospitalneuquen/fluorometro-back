import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PruebaLaboratorio } from 'src/entities/pruebaLaboratorio.entity';
import { Repository } from 'typeorm';
import { CreatePruebaLaboratorioDTO } from './validation';

@Injectable()
export class PruebasLaboratorioService {
  constructor(
    @InjectRepository(PruebaLaboratorio, 'fluorometro')
    private repository: Repository<PruebaLaboratorio>,
  ) {}

  async getPruebasLaboratorio(): Promise<PruebaLaboratorio[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<PruebaLaboratorio | undefined> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async save(obj: CreatePruebaLaboratorioDTO): Promise<PruebaLaboratorio> {
    const entity = new PruebaLaboratorio();
    entity.codigo = obj.codigo;
    entity.nombre = obj.nombre;
    return this.repository.save(entity);
  }

  async deleteById(id: string): Promise<any> {
    return this.repository.delete({ id });
  }

  async update(
    id: string,
    obj: CreatePruebaLaboratorioDTO,
  ): Promise<PruebaLaboratorio | undefined> {
    const entity = await this.findById(id);
    entity.codigo = obj.codigo;
    entity.nombre = obj.nombre;
    await this.repository.update({ id }, entity);
    return this.findById(id);
  }
}
