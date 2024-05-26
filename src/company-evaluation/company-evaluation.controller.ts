// company-evaluation.controller.ts
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
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
    console.log(
      'Received request to create company evaluation:',
      createCompanyEvaluationDto,
    );
    return this.companyEvaluationService.createCompanyEvaluation(
      createCompanyEvaluationDto,
    );
  }

  @Patch(':id')
  updateCompanyEvaluation(
    @Param('id') id: string,
    @Body() updateCompanyEvaluationDto: UpdateCompanyEvaluationDto,
  ) {
    console.log(
      'Received request to update company evaluation with ID:',
      id,
      'Data:',
      updateCompanyEvaluationDto,
    );
    return this.companyEvaluationService.updateCompanyEvaluation(
      id,
      updateCompanyEvaluationDto,
    );
  }
}
