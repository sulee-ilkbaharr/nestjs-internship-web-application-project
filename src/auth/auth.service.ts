import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { StudentService } from 'src/student/student.service';
import { UserRole } from './user-role.enum';
import { DepartmentService } from 'src/department/department.service';
import { AuthSigninDto } from './dto/auth-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private jwtService: JwtService,
    private studentService: StudentService,
    private departmentService: DepartmentService,
  ) {}

  async signUp(authCredentialsDto: AuthCreadentialsDto): Promise<User> {
    const {
      email,
      password,
      role,
      IDno,
      name,
      surname,
      studentId,
      studentPhoneNumber,
      studentAddress,
      departmentName,
      facultyName,
      departmentId,
    } = authCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      role,
    });

    if (role === UserRole.STUDENT) {
      const student = await this.studentService.createStudent({
        IDno,
        name,
        surname,
        studentId,
        studentPhoneNumber,
        studentAddress,
        departmentName,
        facultyName,
      });
      user.student = student;
    } else if (role == UserRole.DEPARTMENT) {
      const deparment = await this.departmentService.createDeparment({
        IDno,
        name,
        surname,
        departmentName,
        facultyName,
        departmentId,
      });
      user.deparment = deparment;
    }

    return this.usersRepository.save(user);
  }
  // async signUp(authCredentialsDto: AuthCreadentialsDto): Promise<User> {
  //   const {
  //     email,
  //     password,
  //     role,
  //     IDno,
  //     studentName,
  //     studentSurname,
  //     studentId,
  //     studentPhoneNumber,
  //     studentAddress,
  //     departmentName,
  //     facultyName,
  //   } = authCredentialsDto;

  //   const createStudentDto = {
  //     IDno,
  //     studentName,
  //     studentSurname,
  //     studentId,
  //     studentPhoneNumber,
  //     studentAddress,
  //     departmentName,
  //     facultyName,
  //   };

  //   const student = await this.studentService.createStudent(createStudentDto);

  //   const user = {
  //     email,
  //     password,
  //     role,
  //     IDno,
  //     studentName,
  //     studentSurname,
  //     studentId,
  //     studentPhoneNumber,
  //     studentAddress,
  //     departmentName,
  //     facultyName,
  //     student,
  //   };
  //   return await this.usersRepository.save(user);
  // }

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

  async signIn(authSigninDto: AuthSigninDto): Promise<{ accessToken: string }> {
    const { email, password } = authSigninDto;
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
