import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToOne(() => User, (user) => user.student)
  user: User;
}
