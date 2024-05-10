import { IsEnum } from 'class-validator';
import { InternshipStatus } from '../internship-status.enum';

export class UpdateInternshipStatusDto {
  @IsEnum(InternshipStatus)
  status: InternshipStatus;
}
