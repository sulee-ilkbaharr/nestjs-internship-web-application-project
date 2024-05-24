import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private jwtService: JwtService,
    private studentService: StudentService,
  ) {}

  async signUp(authCredentialsDto: AuthCreadentialsDto): Promise<User> {
    const {
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
    } = authCredentialsDto;

    const createStudentDto = {
      IDno,
      studentName,
      studentSurname,
      studentId,
      studentPhoneNumber,
      studentAddress,
      departmentName,
      facultyName,
    };

    const student = await this.studentService.createStudent(createStudentDto);

    const user = {
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
      student,
    };
    return await this.usersRepository.save(user);
  }

  // async signIn(
  //   authCredentialDto: AuthCreadentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   const { email, password } = authCredentialDto;
  //   const user = await this.usersRepository.findOne({ where: { email } });

  //   // findOne({
  //   //   where: [{ email: user.email }],
  //   // });

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     //return ' success';
  //     const payload: JwtPayload = { email, role: user.role };
  //     const accessToken: string = await this.jwtService.sign(payload);
  //     return { accessToken };
  //   } else {
  //     throw new UnauthorizedException('Please check your login credentials');
  //   }
  // }

  async signIn(
    authCredentialsDto: AuthCreadentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email, role: user.role };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
