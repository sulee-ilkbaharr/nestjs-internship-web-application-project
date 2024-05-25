import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { Internship } from 'src/internship/internship.entity';
import { InternshipRepository } from 'src/internship/internships.repository';
import { FileEntity } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, Internship])],
  providers: [FileRepository, FilesService, InternshipRepository],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
