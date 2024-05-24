import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { GetCompanyFilterDto } from './dto/get-company-filter.dto';
import { Company } from './company.entity';
import { GetUser } from 'src/auth/get-user.decorater';
import { User } from 'src/auth/user.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  getCompanies(
    @Query() filterDto: GetCompanyFilterDto,
    @GetUser() user: User,
  ): Promise<Company[]> {
    return this.companyService.getCompanies(filterDto, user);
  }
  @Post()
  createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get('getByName')
  async getCompanyByName(
    @Query('companyName') companyName: string,
  ): Promise<Company> {
    return await this.companyService.findByName(companyName);
  }
}
