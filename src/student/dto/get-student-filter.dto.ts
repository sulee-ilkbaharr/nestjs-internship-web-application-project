import { IsOptional, IsString } from 'class-validator';

export class GetStudentFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
