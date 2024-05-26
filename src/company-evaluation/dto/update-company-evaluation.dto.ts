import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyEvaluationDto {
  @IsOptional()
  score?: number;

  @IsOptional() //Bunu Ekle hata almamak için
  @IsString()
  notes?: string;
}
