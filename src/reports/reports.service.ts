import { InternshipRepository } from 'src/internship/internships.repository';
import { ReportRepository } from './report.repository';
import { Reports } from './report.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReportStatus } from './report-status.enum';
import { User } from 'src/auth/user.entity';
import { UserRole } from 'src/auth/user-role.enum';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly internshipRepository: InternshipRepository,
  ) {}

  async uploadReports(
    reports: {
      Internship_Report: Express.Multer.File;
    },
    internshipId: string,
  ): Promise<Reports> {
    const internship = await this.internshipRepository.findOne({
      where: { id: internshipId },
      relations: ['user'],
    });
    if (!internship) {
      throw new NotFoundException(
        `Internship with ID ${internshipId} not found`,
      );
    }
    const newFile = this.reportRepository.create({
      Internship_Report: reports.Internship_Report.filename, // Orijinal dosya adını kaydediyoruz
      internship: internship,
    });

    await this.reportRepository.save(newFile);
    internship.reports = newFile;
    await this.internshipRepository.save(internship);

    return newFile;
  }

  async getReportsByInternship(internshipId: string): Promise<Reports[]> {
    return this.reportRepository.find({
      where: { internship: { id: internshipId } },
      relations: ['internship'],
    });
  }

  async updateReportStatus(
    reportId: string,
    status: ReportStatus,
    user: User,
  ): Promise<Reports> {
    const report = await this.reportRepository.findOne({
      where: { id: reportId },
      relations: ['internship', 'internship.user'],
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${reportId} not found`);
    }

    if (user.role !== UserRole.DEPARTMENT) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }

    report.Evaluation = status;
    await this.reportRepository.save(report);
    return report;
  }
}
