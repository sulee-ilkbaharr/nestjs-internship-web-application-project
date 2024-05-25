import { IsEnum, IsOptional, IsString } from 'class-validator';
import { InternshipStatus } from '../internship-status.enum';

export class GetInternshipFilterDto {
  // HANGİ FİLTRELEME YÖNTEMİNE GÖRE FİLTRELEME OLACAKSA, IN_PROGRESSTE OLANLAR TABLO TARAFINDAN ÇEKİLİR
  @IsOptional()
  @IsEnum(InternshipStatus)
  status?: InternshipStatus; //

  @IsOptional()
  @IsEnum(InternshipStatus, { each: true })
  notStatus?: InternshipStatus[];

  @IsOptional() //Bunu Ekle hata almamak için
  @IsString()
  search?: string; //optinal
}
