import { Module } from '@nestjs/common';
import { InternshipController } from './internship.controller';
import { InternshipsService } from './internships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyModule } from 'src/company/company.module';
import { CompanyRepository } from 'src/company/company.repository';
import { InternshipRepository } from './internships.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([InternshipRepository, CompanyRepository]),
    AuthModule,
    CompanyModule,
  ],
  controllers: [InternshipController],
  providers: [InternshipsService],
})
export class InternshipsModule {}
