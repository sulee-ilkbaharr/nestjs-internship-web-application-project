import { Assessment } from 'src/assessment/assessment.entity';
import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
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
  departmentName: string;

  @Column()
  facultyName: string;

  @OneToOne(() => User, (user) => user.deparment, { eager: false })
  user: User;

  @OneToMany(() => Assessment, (assessment) => assessment.department, {
    eager: false,
  })
  assessments: Assessment[];
}
