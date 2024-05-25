import { InternshipRepository } from 'src/internship/internships.repository';
import { ReportRepository } from './report.repository';
import { Reports } from './report.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

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
    const internship = await this.internshipRepository.findOneBy({
      id: internshipId,
    });
    if (!internship) {
      throw new NotFoundException(
        `Internship with ID ${internshipId} not found`,
      );
    }
    const newFile = this.reportRepository.create({
      Internship_Report: reports.Internship_Report.originalname, // Orijinal dosya adını kaydediyoruz
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
}
