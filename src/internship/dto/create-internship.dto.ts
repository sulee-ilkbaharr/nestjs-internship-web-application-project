import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInternshipDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  departmentName: string;

  @IsNotEmpty()
  @IsString()
  internshipNumber: string;

  @IsNotEmpty()
  @IsString()
  sameDepartmentGraduate: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  finishDate: string;

  @IsNotEmpty()
  @IsString()
  internshipDays: string;

  @IsNotEmpty()
  @IsString()
  correspondingPerson: string;

  @IsNotEmpty()
  @IsString()
  productionArea: string;

  @IsNotEmpty()
  @IsString()
  companyPhoneNumber: string;

  @IsNotEmpty()
  @IsString()
  companyEmailAddress: string;

  @IsNotEmpty()
  @IsString()
  companyAddress: string;
}
