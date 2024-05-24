import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/auth/user-role.enum';

export class CreateStudentDto {
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
}
