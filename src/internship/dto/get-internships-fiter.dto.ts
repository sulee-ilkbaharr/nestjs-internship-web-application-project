import { IsEnum, IsOptional, IsString } from 'class-validator';
import { InternshipStatus } from '../internship-status.enum';

export class GetInternshipFilterDto {
  @IsOptional()
  @IsEnum(InternshipStatus)
  status?: InternshipStatus; //optinal

  @IsOptional() //Bunu Ekle hata almamak için
  @IsString()
  search?: string; //optinal
}
