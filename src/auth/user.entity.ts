import { Internship } from 'src/internship/Internship.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user-role.enum';
import { Student } from 'src/student/student.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: false })
  role: UserRole; // 'student', 'department', 'academic dean', 'internship coordinator'

  @Column()
  IDno: string;

  @Column()
  studentName: string;

  @Column()
  studentSurname: string;

  @Column()
  studentId: string;

  @Column()
  studentPhoneNumber: string;

  @Column()
  studentAddress: string;

  @Column()
  departmentName: string;

  @Column()
  facultyName: string;

  @OneToOne(() => Student, (student) => student.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  student: Student;

  @OneToMany(() => Internship, (internship) => internship.user, {
    eager: true,
  })
  internships: Internship[];
}
