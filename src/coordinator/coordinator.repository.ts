import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { Coordinator } from './coordinator.entity';
import { CreateCoordinatorDto } from './dto/create-coordinator.dto';

@Injectable()
export class CoordinatorRepository extends Repository<Coordinator> {
  constructor(private dataSource: DataSource) {
    super(Coordinator, dataSource.createEntityManager());
  }

  async createCoordinator(
    createCoordinatorDto: CreateCoordinatorDto,
  ): Promise<Coordinator> {
    const { IDno, name, surname } = createCoordinatorDto;
    const faculty = this.create({ IDno, name, surname });
    await this.save(faculty);
    return faculty;
  }
}
