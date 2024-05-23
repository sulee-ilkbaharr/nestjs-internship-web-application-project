import { Controller, Get, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { GetCompanyFilterDto } from './dto/get-company-filter.dto';
import { Company } from './company.entity';
import { GetUser } from 'src/auth/get-user.decorater';
import { User } from 'src/auth/user.entity';

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
  // @Post()
  // createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
  //   return this.companyService.createCompany(createCompanyDto);
  // }
}
