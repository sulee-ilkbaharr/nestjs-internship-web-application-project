import { Internship } from 'src/internship/internship.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Insurance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  InsuranceForm: string;

  @OneToOne(() => Internship, (internship) => internship.insurance, {
    cascade: true,
  })
  @JoinColumn()
  internship: Internship;
}
