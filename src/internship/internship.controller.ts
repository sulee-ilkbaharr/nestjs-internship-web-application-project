import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('intership')
@UseGuards(AuthGuard()) //Giriş yapıp yapmamdığını kontrol eder!!!!önemliiii
export class InternshipController {
  constructor(private internshipsService: InternshipsService) {}

  @Get()
  getInterships(
    @Query() filterDto: GetInternshipFilterDto,
  ): Promise<Internship[]> {
    return this.internshipsService.getInternships(filterDto);
  }

  @Get('/:id')
  getInternshipById(@Param('id') id: string) {
    return this.internshipsService.getIntershipById(id);
  }

  @Post()
  createIntership(
    @Body() createInternshipDto: CreateInternshipDto,
  ): Promise<Internship> {
    return this.internshipsService.createInternship(createInternshipDto);
  }

  @Delete('/:id')
  deleteIntership(@Param('id') id: string): Promise<void> {
    return this.internshipsService.deleteInternship(id);
  }

  @Patch('/:id/status')
  updateInternshipStatus(
    @Param('id') id: string,
    @Body() updateInternshipStatusDto: UpdateInternshipStatusDto,
  ): Promise<Internship> {
    const { status } = updateInternshipStatusDto;
    return this.internshipsService.updateInternshipStatus(id, status);
  }
}
