import { CompanyEvaluation } from 'src/company-evaluation/company-evaluation.entity';
import { Internship } from 'src/internship/Internship.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  companyName: string;

  @Column()
  productionArea: string;

  @Column()
  companyPhoneNumber: string;

  @Column()
  companyEmailAddress: string;

  @Column()
  companyAddress: string;

  @OneToMany((_type) => Internship, (internship) => internship.company, {
    eager: false,
  })
  internships: Internship[];

  @OneToOne(
    () => CompanyEvaluation,
    (companyEvaluation) => companyEvaluation.company,
    { cascade: true },
  )
  @JoinColumn()
  companyEvaluation: CompanyEvaluation;
}
