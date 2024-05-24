import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(private dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const {
      IDno,
      name,
      surname,
      studentId,
      studentPhoneNumber,
      studentAddress,
      departmentName,
      facultyName,
    } = createStudentDto;
    const student = this.create({
      IDno,
      name,
      surname,
      studentId,
      studentPhoneNumber,
      studentAddress,
      departmentName,
      facultyName,
    });
    await this.save(student);
    return student;
  }
}
