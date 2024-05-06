import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Internship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string; // 4190,4290,4390

  // @Column()
  // description: string;

  @Column()
  status: string; //approved, rejected
}
