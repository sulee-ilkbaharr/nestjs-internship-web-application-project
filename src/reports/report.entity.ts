import { Internship } from 'src/internship/internship.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ReportStatus } from './report-status.enum';

@Entity()
export class Reports extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  Internship_Report: string;

  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.WAITING_FOR_EVALUATION,
  })
  Evaluation: ReportStatus;

  @OneToOne(() => Internship, (internship) => internship.reports, {
    cascade: true,
  })
  @JoinColumn()
  internship: Internship;
}
