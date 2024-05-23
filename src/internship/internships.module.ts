import { Module } from '@nestjs/common';
import { InternshipController } from './internship.controller';
import { InternshipsService } from './internships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyModule } from 'src/company/company.module';
import { Internship } from './Internship.entity';
import { InternshipRepository } from './internships.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Internship]), AuthModule, CompanyModule],
  controllers: [InternshipController],
  providers: [InternshipsService, InternshipRepository],
  // exports: [InternshipsService],
})
export class InternshipsModule {}
