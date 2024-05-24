import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculty } from './faculty.entity';
import { FacultyRepository } from './faculty.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty])],
  providers: [FacultyService, FacultyRepository],
  controllers: [FacultyController],
  exports: [FacultyService],
})
export class FacultyModule {}
