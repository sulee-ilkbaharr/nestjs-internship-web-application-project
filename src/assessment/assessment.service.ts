import { Injectable } from '@nestjs/common';
import { AssessmentRepository } from './assessment.repository';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { Internship } from 'src/internship/Internship.entity';
import { Department } from 'src/department/department.entity';
import { Assessment } from './assessment.entity';

@Injectable()
export class AssessmentService {
  constructor(private readonly assessmentRepository: AssessmentRepository) {}

  async createAssessment(
    createAssessmentDto: CreateAssessmentDto,
    internship: Internship,
    department: Department,
  ): Promise<Assessment> {
    return this.assessmentRepository.createAssessment(
      createAssessmentDto,
      internship,
      department,
    );
  }

  async getAssessmentsByInternship(
    internship: Internship,
  ): Promise<Assessment[]> {
    return this.assessmentRepository.getAssessmentsByInternship(internship);
  }
}
