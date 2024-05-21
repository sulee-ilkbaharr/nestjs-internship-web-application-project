import { IsNotEmpty } from 'class-validator';

export class CreateInternshipDto {
  @IsNotEmpty()
  companyName: string; //atez, ziraat... .// foreign key

  // @Optional()
  // otherCompanyName?: string;

  @IsNotEmpty()
  departmentName: string; //arge, manufacturing, sibersecurity, sotfdev.

  // @Optional()
  // otherDepartmentName?: string;

  @IsNotEmpty()
  productionArea: string;

  @IsNotEmpty()
  companyPhoneNumber: string;

  @IsNotEmpty()
  companyEmailAddress: string;

  @IsNotEmpty()
  companyAddress: string;

  // step2 için alınan veriler

  @IsNotEmpty()
  internshipNumber: string;

  @IsNotEmpty()
  sameDepartmentGraduate: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  finishDate: string;

  // corresponding person -company
}
