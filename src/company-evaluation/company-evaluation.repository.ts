import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CompanyEvaluation } from './company-evaluation.entity';

@Injectable()
export class CompanyEvaluationRepository extends Repository<CompanyEvaluation> {
  constructor(private dataSource: DataSource) {
    super(CompanyEvaluation, dataSource.createEntityManager());
  }
}
