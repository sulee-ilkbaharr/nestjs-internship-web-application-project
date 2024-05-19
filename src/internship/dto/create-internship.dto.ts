import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateInternshipDto {
  // @IsNotEmpty()
  // title: string;

  // // @IsNotEmpty()
  // // description: string;

  @IsNotEmpty()
  @IsString()
  companyName: string; //atez, ziraat...

  @IsNotEmpty()
  @IsString()
  departmentName: string; //arge, manufacturing, sibersecurity, sotfdev.

  @IsNotEmpty()
  @IsString()
  internshipNo: string; // 4190,4290,4390

  @IsNotEmpty()
  @IsString()
  productionServiceArea: string;

  @IsNotEmpty()
  @IsString()
  companyEmail: string; //atez@gmail.com

  @IsNotEmpty()
  @IsString()
  companyPhone: string; //...

  @IsNotEmpty()
  @IsString()
  companyAdress: string;

  @IsNotEmpty()
  @IsDateString()
  internshipStartDate: string;

  @IsNotEmpty()
  @IsDateString()
  internshipFinishDate: string;
}
