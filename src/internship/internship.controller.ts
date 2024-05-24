import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { AuthGuard } from '@nestjs/passport';
import { Internship } from './Internship.entity';
import { UpdateInternshipStatusDto } from './dto/update-internship-status.dto';
import { InternshipsService } from './internships.service';
import { GetUser } from 'src/auth/get-user.decorater';
import { User } from 'src/auth/user.entity';
import { CompanyService } from 'src/company/company.service';
import { UserRole } from 'src/auth/user-role.enum';

@Controller('internship')
@UseGuards(AuthGuard()) //Giriş yapıp yapmamdığını kontrol eder!!!!önemliiii
export class InternshipController {
  private readonly logger = new Logger(InternshipController.name);

  constructor(
    private internshipsService: InternshipsService,
    private companyService: CompanyService,
  ) {}

  // @Get()
  // getInternships(
  //   //ACADEMİC UNIT,FACULTY ADMINISTRATION
  //   @Query() filterDto: GetInternshipFilterDto,
  //   @GetUser() user: User,
  // ): Promise<Internship[]> {
  //   return this.internshipsService.getInternships(filterDto, user);
  // }

  // @Get('/:id')
  // getInternshipById(@Param('id') id: string, @GetUser() user: User) {
  //   return this.internshipsService.getIntershipById(id, user);
  // }

  @Get()
  async getAllInternships(@GetUser() user: User) {
    return await this.internshipsService.getAllInternshipsByUser(user);
  }

  @Get('details')
  async getInternshipDetails(@GetUser() user: User) {
    if (user.role === UserRole.DEPARTMENT) {
      return this.internshipsService.findAllWithStudentNames();
    } else {
      return { message: 'Unauthorized' };
    }
  }

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
  ) {
    const { status } = updateInternshipStatusDto;
    return this.internshipsService.updateInternshipStatus(id, status, user);
  }
}
