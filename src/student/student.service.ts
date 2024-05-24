import { Injectable } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentRepository.createStudent(createStudentDto);
  }
}
