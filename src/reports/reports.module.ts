import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Internship } from 'src/internship/Internship.entity';
import { ReportRepository } from './report.repository';
import { InternshipRepository } from 'src/internship/internships.repository';
import { Reports } from './report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reports, Internship])],
  providers: [ReportsService, ReportRepository, InternshipRepository],
  controllers: [ReportsController],
  exports: [ReportsService],
})
export class ReportsModule {}
