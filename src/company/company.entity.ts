import { Internship } from 'src/internship/Internship.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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
    eager: true,
  })
  internships: Internship[];

  //bir internship sadece bir tane company içerebilir ama company birden fazla internshipe sahip olabilir.
}
