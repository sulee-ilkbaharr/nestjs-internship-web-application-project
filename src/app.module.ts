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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Sule140400',
      database: 'internship-web-application',
      autoLoadEntities: true,
      entities: [User, Internship, Company],
      synchronize: true,
    }),
    AuthModule,
    InternshipsModule,
    CompanyModule,
    StudentModule,
    DepartmentModule,
  ],
})
export class AppModule {}
