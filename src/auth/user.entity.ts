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
import { Faculty } from 'src/faculty/faculty.entity';
import { Coordinator } from 'src/coordinator/coordinator.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: false })
  role: UserRole;

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

  @OneToOne(() => Faculty, (faculty) => faculty.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  faculty: Faculty;

  @OneToOne(() => Coordinator, (coordinator) => coordinator.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  coordinator: Coordinator;

  @OneToMany(() => Internship, (internship) => internship.user, {
    eager: true,
  })
  internships: Internship[];
}
