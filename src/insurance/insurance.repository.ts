import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Insurance } from './insurance.entity';

@Injectable()
export class InsuranceRepository extends Repository<Insurance> {
  constructor(private dataSource: DataSource) {
    super(Insurance, dataSource.createEntityManager());
  }
}
