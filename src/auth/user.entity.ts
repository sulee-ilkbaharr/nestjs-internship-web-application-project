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
import { Department } from 'src/department/department.entity';

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

  @OneToOne(() => Student, (student) => student.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  student: Student;

  @OneToOne(() => Department, (deparment) => deparment.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  deparment: Department;

  @OneToMany(() => Internship, (internship) => internship.user, {
    eager: true,
  })
  internships: Internship[];
}
