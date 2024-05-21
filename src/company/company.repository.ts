import { DataSource, Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetCompanyFilterDto } from './dto/get-company-filter.dto';
import { User } from 'src/auth/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(private datasource: DataSource) {
    super(Company, datasource.createEntityManager());
  }

  async getCompanies(
    filterDto: GetCompanyFilterDto,
    user: User,
  ): Promise<Company[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('company');
    query.where({ user });
    if (search) {
      query.andWhere(
        '(LOWER(company.companyName) LIKE LOWER(:search) OR LOWER(company.productionArea) LIKE LOWER(:search))',
        { search: `%${search}` },
      );
    }
    const company = await query.getMany();
    return company;
  }

  async createCompany({
    companyName,
    productionArea,
    companyPhoneNumber,
    companyEmailAddress,
    companyAddress,
  }: CreateCompanyDto): Promise<Company> {
    const company = this.create({
      companyName,
      productionArea,
      companyPhoneNumber,
      companyEmailAddress,
      companyAddress,
    });
    await this.save(company);
    return company;
  }
}
