import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  companyName: string;
  @IsNotEmpty()
  productionArea: string;
  @IsNotEmpty()
  companyPhoneNumber: string;
  @IsNotEmpty()
  companyEmailAddress: string;
  @IsNotEmpty()
  companyAddress: string;
}
