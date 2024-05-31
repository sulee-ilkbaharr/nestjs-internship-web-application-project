import { Module } from '@nestjs/common';
import { InternshipController } from './internship.controller';
import { InternshipsService } from './internships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyModule } from 'src/company/company.module';
import { Internship } from './Internship.entity';
import { InternshipRepository } from './internships.repository';
import { User } from 'src/auth/user.entity';
import { Student } from 'src/student/student.entity';
import { UserRepository } from 'src/auth/users.repository';
import { StudentRepository } from 'src/student/student.repository';
import { FilesModule } from 'src/files/files.module';
import { FileRepository } from 'src/files/file.repository';
import { ReportsModule } from 'src/reports/reports.module';
import { ReportRepository } from 'src/reports/report.repository';
import { CompanyEvaluationRepository } from 'src/company-evaluation/company-evaluation.repository';
import { PassportModule } from '@nestjs/passport';
import { InsuranceModule } from 'src/insurance/insurance.module';
import { InsuranceRepository } from 'src/insurance/insurance.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Internship, User, Student]),
    AuthModule,
    CompanyModule,
    FilesModule,
    ReportsModule,
    InsuranceModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [InternshipController],
  providers: [
    InternshipsService,
    InternshipRepository,
    UserRepository,
    StudentRepository,
    FileRepository,
    ReportRepository,
    InsuranceRepository,
    CompanyEvaluationRepository,
  ],
  exports: [InternshipsService],
})
export class InternshipsModule {}
