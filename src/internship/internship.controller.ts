import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { GetInternshipFilterDto } from './dto/get-internships-fiter.dto';
import { AuthGuard } from '@nestjs/passport';
import { Internship } from './Internship.entity';
import { UpdateInternshipStatusDto } from './dto/update-internship-status.dto';
import { InternshipsService } from './internships.service';
import { GetUser } from 'src/auth/get-user.decorater';
import { User } from 'src/auth/user.entity';
import { CompanyService } from 'src/company/company.service';

@Controller('internship')
@UseGuards(AuthGuard()) //Giriş yapıp yapmamdığını kontrol eder!!!!önemliiii
export class InternshipController {
  private readonly logger = new Logger(InternshipController.name);

  constructor(
    private internshipsService: InternshipsService,
    private companyService: CompanyService,
  ) {}

  @Get()
  getInternships(
    //ACADEMİC UNIT,FACULTY ADMINISTRATION
    @Query() filterDto: GetInternshipFilterDto,
    @GetUser() user: User,
  ): Promise<Internship[]> {
    return this.internshipsService.getInternships(filterDto, user);
  }

  @Get('/:id')
  getInternshipById(@Param('id') id: string, @GetUser() user: User) {
    return this.internshipsService.getIntershipById(id, user);
  }

  //BİRİNCİ VE İKİNCİ ADIM İÇİN ÖĞRENCİ BU METOT İLE INTERNSHİP OLUŞTURUR.
  // @Post()
  // createInternship(
  //   //STUDENT İNTERNSHİP OLUŞTURABİLİR.
  //   @Body() createInternshipDto: CreateInternshipDto,
  //   @GetUser() user: User,
  //   @GetCompany() company: Company,
  // ): Promise<Internship> {
  //   return this.internshipsService.createInternship(
  //     createInternshipDto,
  //     user,
  //     company,
  //   );
  // }
  @Post()
  async createInternship(
    @Body() createInternshipDto: CreateInternshipDto, //company bilgileiyle birlikte burada verileri create ederiz
    @GetUser() user: User,
  ): Promise<Internship> {
    return this.internshipsService.createInternship(createInternshipDto, user);
  }

  @Delete('/:id')
  deleteInternship(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.internshipsService.deleteInternship(id, user);
  }

  @Patch('/:id/status')
  updateInternshipStatus(
    @Param('id') id: string,
    @Body() updateInternshipStatusDto: UpdateInternshipStatusDto,
    @GetUser() user: User,
  ): Promise<Internship> {
    const { status } = updateInternshipStatusDto;
    return this.internshipsService.updateInternshipStatus(id, status, user);
  }
}
