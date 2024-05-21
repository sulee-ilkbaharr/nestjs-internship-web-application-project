import { IsNotEmpty } from 'class-validator';

export class CreateInternshipDto {
  @IsNotEmpty()
  departmentName: string; //arge, manufacturing, sibersecurity, sotfdev.

  @IsNotEmpty()
  internshipNumber: string;

  @IsNotEmpty()
  sameDepartmentGraduate: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  finishDate: string;

  @IsNotEmpty()
  internshipDays: string;

  @IsNotEmpty()
  correspondingPerson: string;
  // corresponding person -company
}
