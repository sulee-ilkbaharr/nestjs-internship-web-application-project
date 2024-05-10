import { Internship } from 'src/internship/Internship.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany((_type) => Internship, (internship) => internship.user, {
    eager: true,
  })
  internship: Internship[];
}
