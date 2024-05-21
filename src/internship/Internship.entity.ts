import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { InternshipStatus } from './internship-status.enum';

@Entity()
export class Internship extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string; 

  // @Column({ nullable: true })
  // otherCompanyName: string;

  @Column()
  departmentName: string; 

  // @Column({ nullable: true })
  // otherDepartmentName: string;

  @Column()
  productionArea: string;

  @Column()
  companyPhoneNumber: string;

  @Column()
  companyEmailAddress: string;

  @Column()
  companyAddress: string;

  @Column()
  internshipNumber: string;

  @Column()
  sameDepartmentGraduate: string;

  @Column()
  startDate: string;

  @Column()
  finishDate: string;

  // @Column()
  // dates: string;

  @Column()
  status: InternshipStatus;
  @ManyToOne((_type) => User, (user) => user.internship, {
    eager: false,
  })
  user: User;
}

// import { User } from 'src/auth/user.entity';
// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class Internship {

//   @PrimaryGeneratedColumn('uuid')
//   id: string; //

//   @Column()
//   companyName: string; //atez, ziraat...

//   @Column()
//   departmentName: string; //arge, manufacturing, sibersecurity, sotfdev.

//   @Column()
//   internshipNo: string; // 4190,4290,4390

//   @Column()
//   companyEmail: string; //atez@gmail.com

//   @Column()
//   companyPhone: string; //...

//   @Column()
//   companyAdress: string;

//   @Column()
//   internshipStartDate: string;

//   @Column()
//   internshipFinishDate: string;

//   @Column()
//   status: string; //approved, rejected
// @Column()
// status: InternshipStatus;
// @ManyToOne((_type) => User, (user) => user.internship, {
//   eager: false,
// }
// user: User;

// }
