import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemConfig } from 'src/entities/systemConfig.entity';
import { Repository } from 'typeorm';
import { CreateSystemConfigDTO } from './validation';

@Injectable()
export class SystemConfigService {
  constructor(
    @InjectRepository(SystemConfig, 'fluorometro')
    private repository: Repository<SystemConfig>,
  ) {}

  async get(): Promise<SystemConfig> {
    const list: SystemConfig[] = await this.repository.find();
    return list.length == 1 ? list[0] : new SystemConfig();
  }

  async create(obj: CreateSystemConfigDTO): Promise<SystemConfig> {
    const entity = new SystemConfig();
    entity.espacios_totales = obj.totalSpaces;
    return this.repository.save(entity);
  }

  async update(obj: CreateSystemConfigDTO): Promise<SystemConfig | undefined> {
    const entity = await this.get();
    if (!entity) return undefined;
    entity.espacios_totales = obj.totalSpaces;
    await this.repository.update(entity.id, entity);
    return this.get();
  }
}
