import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Faculty extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  IDno: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  facultyName: string;

  @OneToOne(() => User, (user) => user.faculty, { eager: false })
  user: User;
}
