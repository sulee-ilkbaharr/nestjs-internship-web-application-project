import { Module } from '@nestjs/common';
import { CompanyEvaluationController } from './company-evaluation.controller';
import { CompanyEvaluationService } from './company-evaluation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEvaluation } from './company-evaluation.entity';
import { CompanyEvaluationRepository } from './company-evaluation.repository';
import { Company } from 'src/company/company.entity';
import { CompanyRepository } from 'src/company/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEvaluation, Company])],
  controllers: [CompanyEvaluationController],
  providers: [
    CompanyEvaluationService,
    CompanyEvaluationRepository,
    CompanyRepository,
  ],
  exports: [CompanyEvaluationService],
})
export class CompanyEvaluationModule {}
