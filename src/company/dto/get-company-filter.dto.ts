import { IsOptional, IsString } from 'class-validator';

export class GetCompanyFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
