import { Injectable, NotFoundException } from '@nestjs/common';
import { Express } from 'express';
import { ReportRepository } from './report.repository';
import { InternshipRepository } from 'src/internship/internships.repository';
import { Reports } from './report.entity';

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
      Internship_Report: reports.Internship_Report.filename,
      internship: internship,
    });

    await this.reportRepository.save(newFile);
    internship.reports = newFile; // Düzeltildi
    await this.internshipRepository.save(internship);

    return newFile;
  }
}
