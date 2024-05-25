import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Reports } from './report.entity';

@Injectable()
export class ReportRepository extends Repository<Reports> {
  constructor(private dataSource: DataSource) {
    super(Reports, dataSource.createEntityManager());
  }
}
