import { Module } from '@nestjs/common';
import { AssessmentController } from './assessment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assessment } from './assessment.entity';
import { InternshipsModule } from 'src/internship/internships.module';
import { DepartmentModule } from 'src/department/department.module';
import { AssessmentService } from './assessment.service';
import { AssessmentRepository } from './assessment.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assessment]),
    InternshipsModule,
    DepartmentModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService, AssessmentRepository],
})
export class AssessmentModule {}
