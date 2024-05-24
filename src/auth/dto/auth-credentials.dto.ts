import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
// import { UserRole } from '../user-role.enum';
export class AuthCreadentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsNotEmpty()
  IDno: string;
  @IsNotEmpty()
  studentName: string;
  @IsNotEmpty()
  studentSurname: string;
  @IsNotEmpty()
  studentId: string;
  @IsNotEmpty()
  studentPhoneNumber: string;
  @IsNotEmpty()
  studentAddress: string;
  @IsNotEmpty()
  departmentName: string;
  @IsNotEmpty()
  facultyName: string;

  // SIGNUP
  // @IsEnum(UserRole)
  // role: UserRole;
}
