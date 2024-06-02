import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../user-role.enum';
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

  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  IDno: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsOptional()
  studentId?: string;

  @IsOptional()
  studentPhoneNumber?: string;

  @IsOptional()
  studentAddress?: string;

  @IsOptional()
  departmentName?: string;

  @IsOptional()
  facultyName?: string;

  @IsOptional()
  departmentId?: string;

  // SIGNUP
  // @IsEnum(UserRole)
  // role: UserRole;
}
