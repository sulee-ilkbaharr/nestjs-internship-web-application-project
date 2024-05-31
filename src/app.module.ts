import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { InternshipsModule } from './internship/internships.module';
import { CompanyModule } from './company/company.module';
import { User } from './auth/user.entity';
import { Internship } from './internship/Internship.entity';
import { Company } from './company/company.entity';
import { StudentModule } from './student/student.module';
import { DepartmentModule } from './department/department.module';
import { FacultyModule } from './faculty/faculty.module';
import { CoordinatorModule } from './coordinator/coordinator.module';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { ReportsModule } from './reports/reports.module';
import { CompanyEvaluationModule } from './company-evaluation/company-evaluation.module';
import { AssessmentModule } from './assessment/assessment.module';
import { ScheduleModule } from '@nestjs/schedule';
import { InsuranceModule } from './insurance/insurance.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Nilhan1!.',
      database: 'internship-web-application',
      autoLoadEntities: true,
      entities: [User, Internship, Company],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    InternshipsModule,
    CompanyModule,
    StudentModule,
    DepartmentModule,
    FacultyModule,
    CoordinatorModule,
    FilesModule,
    ReportsModule,
    CompanyEvaluationModule,
    AssessmentModule,
    ScheduleModule.forRoot(),
    InsuranceModule,
  ],
})
export class AppModule {}
