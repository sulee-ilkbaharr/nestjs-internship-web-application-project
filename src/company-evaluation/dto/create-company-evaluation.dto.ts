import { IsNotEmpty } from 'class-validator';

export class CreateCompanyEvaluationDto {
  @IsNotEmpty()
  score: number;

  @IsNotEmpty()
  readonly notes: string;

  @IsNotEmpty()
  readonly companyId: string;
}
