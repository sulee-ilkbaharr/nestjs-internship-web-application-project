import { Injectable } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    console.log(createStudentDto);
    const { IDno } = createStudentDto;
    let student = await this.studentRepository.findOne({
      where: { IDno },
    });

    if (!student) {
      student = await this.studentRepository.createStudent(createStudentDto);
    } else {
    }
    return student;
  }
}
