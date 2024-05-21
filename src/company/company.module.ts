import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Internship } from 'src/internship/Internship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Internship])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
