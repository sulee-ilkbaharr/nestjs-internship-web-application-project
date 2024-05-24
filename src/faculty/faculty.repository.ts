import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { Faculty } from './faculty.entity';

@Injectable()
export class FacultyRepository extends Repository<Faculty> {
  constructor(private dataSource: DataSource) {
    super(Faculty, dataSource.createEntityManager());
  }

  async createFaculty(createFacultyDto: CreateFacultyDto): Promise<Faculty> {
    const { IDno, name, surname, facultyName } = createFacultyDto;
    const faculty = this.create({ IDno, name, surname, facultyName });
    await this.save(faculty);
    return faculty;
  }
}
