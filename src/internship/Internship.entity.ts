import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
  // OneToMany,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { InternshipStatus } from './internship-status.enum';
import { Company } from 'src/company/company.entity';
import { FileEntity } from 'src/files/file.entity';
import { Reports } from 'src/reports/report.entity';
import { Assessment } from 'src/assessment/assessment.entity';
import { Insurance } from 'src/insurance/insurance.entity';
// import { File } from 'src/files/file.entity';

@Entity()
export class Internship extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string;

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

  @ManyToOne((_type) => User, (user) => user.internships, {
    eager: false,
  })
  user: User;

  @ManyToOne((_type) => Company, (company) => company.internships, {
    eager: true,
  })
  company: Company;

  @OneToOne(() => FileEntity, (file) => file.internship, { eager: true })
  @JoinColumn()
  file: FileEntity;

  @OneToOne(() => Reports, (reports) => reports.internship, { eager: true })
  @JoinColumn()
  reports: Reports;

  @OneToMany(() => Assessment, (assessment) => assessment.internship, {
    eager: false,
  })
  assessments: Assessment[];

  @OneToOne(() => Insurance, (insurace) => insurace.internship, { eager: true })
  @JoinColumn()
  insurance: Insurance;
}
