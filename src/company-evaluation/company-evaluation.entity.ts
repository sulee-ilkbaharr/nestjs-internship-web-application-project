import { Company } from 'src/company/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CompanyEvaluation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('int')
  score: number;

  @Column()
  notes: string;

  @OneToOne(() => Company, (company) => company.companyEvaluation)
  @JoinColumn()
  company: Company;
}
