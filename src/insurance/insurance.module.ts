import { Module } from '@nestjs/common';
import { InsuranceController } from './insurance.controller';
import { InsuranceService } from './insurance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insurance } from './insurance.entity';
import { Internship } from 'src/internship/Internship.entity';
import { InsuranceRepository } from './insurance.repository';
import { InternshipRepository } from 'src/internship/internships.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Insurance, Internship])],
  controllers: [InsuranceController],
  providers: [InsuranceService, InsuranceRepository, InternshipRepository],
  exports: [InsuranceService],
})
export class InsuranceModule {}
