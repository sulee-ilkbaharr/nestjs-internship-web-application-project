import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { InternshipStatus } from './internship-status.enum';
import { Company } from 'src/company/company.entity';

@Entity()
export class Internship extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  departmentName: string;

  @Column()
  internshipNumber: string;

  @Column()
  sameDepartmentGraduate: string;

  @Column()
  startDate: string;

  @Column()
  finishDate: string;

  @Column()
  correspondingPerson: string;

  @Column()
  status: InternshipStatus;

  @Column()
  internshipDays: string;

  @ManyToOne((_type) => User, (user) => user.internship, {
    eager: false,
  })
  user: User;

  //bir internshipin bir tane companye sahip olur ancak companynin birden fazla internship i olabilir

  @ManyToOne((_type) => Company, (company) => company.internships, {
    eager: false,
  })
  company: Company;
}
