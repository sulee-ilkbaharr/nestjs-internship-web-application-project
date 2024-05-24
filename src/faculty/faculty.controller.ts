import { Body, Controller, Post } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { Faculty } from './faculty.entity';

@Controller('faculty')
export class FacultyController {
  constructor(private facultyService: FacultyService) {}

  @Post()
  createDepartment(
    @Body() createFacultyDto: CreateFacultyDto,
  ): Promise<Faculty> {
    return this.facultyService.createFaculty(createFacultyDto);
  }
}
