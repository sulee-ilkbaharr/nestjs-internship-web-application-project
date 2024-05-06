import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Internship {
  @PrimaryGeneratedColumn('uuid')
  id: string; //

  @Column()
  companyName: string; //atez, ziraat...

  @Column()
  departmentName: string; //arge, manufacturing, sibersecurity, sotfdev.

  @Column()
  internshipNo: string; // 4190,4290,4390

  @Column()
  companyEmail: string; //atez@gmail.com

  @Column()
  companyPhone: string; //...

  @Column()
  companyAdress: string;

  @Column()
  internshipStartDate: string;

  @Column()
  internshipFinishDate: string;

  @Column()
  status: string; //approved, rejected
}
