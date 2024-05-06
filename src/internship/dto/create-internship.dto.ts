import { IsNotEmpty } from 'class-validator';

export class CreateInternshipDto {
  // @IsNotEmpty()
  // title: string;

  // // @IsNotEmpty()
  // // description: string;

  @IsNotEmpty()
  companyName: string; //atez, ziraat...

  @IsNotEmpty()
  departmentName: string; //arge, manufacturing, sibersecurity, sotfdev.

  @IsNotEmpty()
  internshipNo: string; // 4190,4290,4390

  @IsNotEmpty()
  companyEmail: string; //atez@gmail.com

  @IsNotEmpty()
  companyPhone: string; //...

  @IsNotEmpty()
  companyAdress: string;

  @IsNotEmpty()
  internshipStartDate: string;

  @IsNotEmpty()
  internshipFinishDate: string;
}
