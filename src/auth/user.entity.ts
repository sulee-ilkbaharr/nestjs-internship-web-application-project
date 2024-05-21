import { Internship } from 'src/internship/Internship.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: false })
  role: UserRole; // 'student', 'department', 'academic dean', 'internship coordinator'

  //
  @OneToMany((_type) => Internship, (internship) => internship.user, {
    eager: true,
  })
  internship: Internship[]; //her bir user bir tane internshipe sahip olabilir.
}
