import { Body, Controller, Post } from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.createStudent(createStudentDto);
  }
}
