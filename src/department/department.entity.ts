import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  IDno: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  departmentId: string;

  @Column()
  departmentName: string;

  @Column()
  facultyName: string;

  @OneToOne(() => User, (user) => user.student, { eager: false })
  user: User;
}
