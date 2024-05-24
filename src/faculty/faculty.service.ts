import { Injectable } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { Faculty } from './faculty.entity';
import { FacultyRepository } from './faculty.repository';

@Injectable()
export class FacultyService {
  constructor(private readonly facultyRepository: FacultyRepository) {}

  async createFaculty(createFacultyDto: CreateFacultyDto): Promise<Faculty> {
    console.log(createFacultyDto);
    const { IDno } = createFacultyDto;
    let faculty = await this.facultyRepository.findOne({
      where: { IDno },
    });

    if (!faculty) {
      faculty = await this.facultyRepository.createFaculty(createFacultyDto);
    } else {
    }
    return faculty;
  }
}
