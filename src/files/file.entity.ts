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
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  Internship_Application_Form: string;

  @Column()
  Employer_Information_Form: string;

  @Column()
  Declaration_Commitment_Document: string;

  @Column()
  ID_Card_Photocopy: string;

  @OneToOne(() => Internship, (internship) => internship.file, {
    cascade: true,
  })
  @JoinColumn()
  internship: Internship;
}
