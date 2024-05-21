import { Controller, Get, Post, Body } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company-names')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getCompanyNames() {
    return this.companyService.getCompanyNames();
  }

  @Post()
  async addCompanyName(@Body('name') name: string) {
    return this.companyService.addCompanyName(name);
  }
}
