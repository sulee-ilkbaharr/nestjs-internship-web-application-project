import { Injectable, NotFoundException } from '@nestjs/common';
import { InsuranceRepository } from './insurance.repository';
import { InternshipRepository } from 'src/internship/internships.repository';
import { Insurance } from './insurance.entity';
import { InternshipStatus } from 'src/internship/internship-status.enum';

@Injectable()
export class InsuranceService {
  constructor(
    private readonly insuranceRepository: InsuranceRepository,
    private readonly internshipRepository: InternshipRepository,
  ) {}

  async uploadInsurance(
    insurance: {
      InsuranceForm: Express.Multer.File;
    },
    internshipId: string,
  ): Promise<Insurance> {
    const internship = await this.internshipRepository.findOne({
      where: { id: internshipId },
      relations: ['user'],
    });
    if (!internship) {
      throw new NotFoundException(
        `Internship with ID ${internshipId} not found`,
      );
    }
    const newFile = this.insuranceRepository.create({
      InsuranceForm: insurance.InsuranceForm.filename, // Orijinal dosya adını kaydediyoruz
      internship: internship,
    });

    await this.insuranceRepository.save(newFile);
    internship.status = InternshipStatus.INSURANCE_UPLOADED;
    internship.insurance = newFile;
    await this.internshipRepository.save(internship);

    return newFile;
  }

  async getInsuranceByInternship(internshipId: string): Promise<Insurance[]> {
    return this.insuranceRepository.find({
      where: { internship: { id: internshipId } },
      relations: ['internship'],
    });
  }
}
