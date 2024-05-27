import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Internship } from 'src/internship/Internship.entity';
import { Department } from 'src/department/department.entity';

@Entity()
export class Assessment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentName: string;

  @Column()
  companyName: string;

  @Column()
  internshipNumber: string;

  @Column()
  companyEmailAddress: string;

  @Column()
  startDate: string;

  @Column()
  finishDate: string;

  @Column()
  internshipDuration: string;

  @Column()
  reportSufficiency: number;

  @Column()
  achievementLevel: number;

  @Column()
  willingness: number;

  @Column()
  attendance: number;

  @Column()
  behavior: number;

  @Column()
  knowledgeApplication: number;

  @Column()
  professionalInterest: number;

  @Column({ nullable: true })
  additionalComments: string;

  @Column({ nullable: true })
  authorizedPersonInfo: string;

  @ManyToOne(() => Internship, (internship) => internship.assessments, {
    eager: false,
  })
  internship: Internship;

  @ManyToOne(() => Department, (department) => department.assessments, {
    eager: false,
  })
  department: Department;
}
