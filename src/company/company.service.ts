import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { GetCompanyFilterDto } from './dto/get-company-filter.dto';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  getCompanies(filterDto: GetCompanyFilterDto, user: User): Promise<Company[]> {
    return this.companyRepository.getCompanies(filterDto, user);
  }

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyRepository.createCompany(createCompanyDto); ////user mı yoksa internship mi create eder?
  }

  async createOrFindCompany(
    createCompanyDto: CreateCompanyDto, // company bilgileri
  ): Promise<Company> {
    console.log(createCompanyDto);
    const { companyName } = createCompanyDto;
    let company = await this.companyRepository.findOne({
      where: { companyName },
    });

    if (!company) {
      company = await this.companyRepository.createCompany(createCompanyDto);
    } else {
    }

    return company;
  }

  async findByName(companyName: string): Promise<Company> {
    return await this.companyRepository.findOne({ where: { companyName } });
  }
}
