import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateAssessmentDto {
  @IsNotEmpty()
  @IsString()
  studentName: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  internshipNumber: string;

  @IsNotEmpty()
  @IsString()
  companyEmailAddress: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  finishDate: string;

  @IsNotEmpty()
  @IsString()
  internshipDuration: string;

  @IsNotEmpty()
  @IsNumber()
  reportSufficiency: number;

  @IsNotEmpty()
  @IsNumber()
  achievementLevel: number;

  @IsNotEmpty()
  @IsNumber()
  willingness: number;

  @IsNotEmpty()
  @IsNumber()
  attendance: number;

  @IsNotEmpty()
  @IsNumber()
  behavior: number;

  @IsNotEmpty()
  @IsNumber()
  knowledgeApplication: number;

  @IsNotEmpty()
  @IsNumber()
  professionalInterest: number;

  @IsString()
  additionalComments?: string;

  @IsString()
  authorizedPersonInfo?: string;
}
