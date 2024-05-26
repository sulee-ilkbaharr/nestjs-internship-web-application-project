import { IsEnum } from 'class-validator';
import { ReportStatus } from '../report-status.enum';

export class UpdateReportStatusDto {
  @IsEnum(ReportStatus)
  status: ReportStatus;
}
