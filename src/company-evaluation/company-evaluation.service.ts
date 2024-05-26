import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyEvaluationRepository } from './company-evaluation.repository';
import { CreateCompanyEvaluationDto } from './dto/create-company-evaluation.dto';
import { UpdateCompanyEvaluationDto } from './dto/update-company-evaluation.dto';
import { CompanyRepository } from 'src/company/company.repository';
import { CompanyEvaluation } from './company-evaluation.entity';

@Injectable()
export class CompanyEvaluationService {
  constructor(
    private readonly companyEvaluationRepository: CompanyEvaluationRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async createCompanyEvaluation(
    createCompanyEvaluationDto: CreateCompanyEvaluationDto,
  ): Promise<CompanyEvaluation> {
    const { score, notes, companyId } = createCompanyEvaluationDto;
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException(`Company with ID "${companyId}" not found`);
    }

    const companyEvaluation = this.companyEvaluationRepository.create({
      score,
      notes,
      company,
    });

    return this.companyEvaluationRepository.save(companyEvaluation);
  }

  async updateCompanyEvaluation(
    id: string,
    updateCompanyEvaluationDto: UpdateCompanyEvaluationDto,
  ): Promise<CompanyEvaluation> {
    const companyEvaluation = await this.companyEvaluationRepository.findOne({
      where: { id },
    });
    if (!companyEvaluation) {
      throw new NotFoundException(
        `Company Evaluation with ID "${id}" not found`,
      );
    }

    const { score, notes } = updateCompanyEvaluationDto;
    if (score !== undefined) companyEvaluation.score = score;
    if (notes !== undefined) companyEvaluation.notes = notes;

    return this.companyEvaluationRepository.save(companyEvaluation);
  }
}
