import { IsEnum, IsOptional, IsString } from 'class-validator';
import { InternshipStatus } from '../internship-status.enum';

export class GetInternshipFilterDto {
  @IsOptional()
  @IsEnum(InternshipStatus)
  status?: InternshipStatus; //

  @IsOptional()
  @IsEnum(InternshipStatus, { each: true })
  notStatus?: InternshipStatus[];

  @IsOptional()
  @IsString()
  search?: string;
}
