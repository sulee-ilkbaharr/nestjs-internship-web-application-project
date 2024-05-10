import { Module } from '@nestjs/common';
import { InternshipController } from './internship.controller';
import { InternshipsService } from './internships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Internship } from './Internship.entity';
import { InternshipRepository } from './internships.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Internship]), AuthModule],
  controllers: [InternshipController],
  providers: [InternshipRepository, InternshipsService],
})
export class InternshipsModule {}
