import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Coordinator extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  IDno: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @OneToOne(() => User, (user) => user.coordinator, { eager: false })
  user: User;
}
