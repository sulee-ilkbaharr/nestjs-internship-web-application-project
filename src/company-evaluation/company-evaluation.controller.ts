// company-evaluation.controller.ts
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CompanyEvaluationService } from './company-evaluation.service';
import { CreateCompanyEvaluationDto } from './dto/create-company-evaluation.dto';
import { UpdateCompanyEvaluationDto } from './dto/update-company-evaluation.dto';

@Controller('company-evaluation')
export class CompanyEvaluationController {
  constructor(
    private readonly companyEvaluationService: CompanyEvaluationService,
  ) {}

  @Post()
  createCompanyEvaluation(
    @Body() createCompanyEvaluationDto: CreateCompanyEvaluationDto,
  ) {
    return this.companyEvaluationService.createCompanyEvaluation(
      createCompanyEvaluationDto,
    );
  }

  @Put(':id')
  updateCompanyEvaluation(
    @Param('id') id: string,
    @Body() updateCompanyEvaluationDto: UpdateCompanyEvaluationDto,
  ) {
    return this.companyEvaluationService.updateCompanyEvaluation(
      id,
      updateCompanyEvaluationDto,
    );
  }
}
