import { IsNotEmpty } from 'class-validator';

export class CreateCompanyEvaluationDto {
  @IsNotEmpty()
  score: number;

  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  companyId: string;
}
