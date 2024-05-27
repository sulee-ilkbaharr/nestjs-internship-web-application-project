import { DataSource, Repository } from 'typeorm';
import { Assessment } from './assessment.entity';
import { Injectable } from '@nestjs/common';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { Internship } from 'src/internship/Internship.entity';
import { Department } from 'src/department/department.entity';

@Injectable()
export class AssessmentRepository extends Repository<Assessment> {
  constructor(private datasource: DataSource) {
    super(Assessment, datasource.createEntityManager());
  }

  async createAssessment(
    createAssessmentDto: CreateAssessmentDto,
    internship: Internship,
    department: Department,
  ): Promise<Assessment> {
    const assessment = this.create({
      ...createAssessmentDto,
      internship,
      department,
    });

    await this.save(assessment);
    return assessment;
  }

  async getAssessmentsByInternship(
    internship: Internship,
  ): Promise<Assessment[]> {
    const assessments = await this.find({ where: { internship } });
    console.log(assessments);
    return assessments;
  }
}
