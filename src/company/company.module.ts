import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyEvaluation } from 'src/company-evaluation/company-evaluation.entity';
import { CompanyEvaluationModule } from 'src/company-evaluation/company-evaluation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, CompanyEvaluation]),
    CompanyEvaluationModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
  exports: [CompanyService],
})
export class CompanyModule {}
