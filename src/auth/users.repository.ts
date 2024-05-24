import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }

  async createUser({
    email,
    password,
    role,
    IDno,
    studentName,
    studentSurname,
    studentId,
    studentPhoneNumber,
    studentAddress,
    departmentName,
    facultyName,
  }: AuthCreadentialsDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      password: hashedPassword,
      role,
      IDno,
      studentName,
      studentSurname,
      studentId,
      studentPhoneNumber,
      studentAddress,
      departmentName,
      facultyName,
    });
    //hash

    //console.log('salt', salt);
    //console.log('hasshedPassword', hashedPassword);

    await this.save(user);
    return user;
  }
}
