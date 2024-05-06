import { IsEnum, IsOptional, IsString } from 'class-validator';
import { InternshipStatus } from '../internship-status.enum';

export class GetInternshipFilterDto {
  @IsOptional()
  @IsEnum(InternshipStatus)
  status?: InternshipStatus; //

  @IsOptional() //Bunu Ekle hata almamak için
  @IsString()
  search?: string; //optinal
}
