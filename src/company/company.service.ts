import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { GetCompanyFilterDto } from './dto/get-company-filter.dto';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from 'src/auth/user.entity';
// import * as fs from 'fs';
// import * as path from 'path';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  getCompanies(filterDto: GetCompanyFilterDto, user: User): Promise<Company[]> {
    return this.companyRepository.getCompanies(filterDto, user);
  }

  async createCompany(
    createCompanyDto: CreateCompanyDto,

    // internship: Internship,
  ): Promise<Company> {
    return this.companyRepository.createCompany(createCompanyDto); ////user mı yoksa internship mi create eder?
  }
}
