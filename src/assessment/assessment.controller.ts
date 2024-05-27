import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorater';
import { User } from 'src/auth/user.entity';
import { DepartmentService } from 'src/department/department.service';
import { InternshipsService } from 'src/internship/internships.service';

@Controller('assessment')
@UseGuards(AuthGuard())
export class AssessmentController {
  constructor(
    private assessmentService: AssessmentService,
    private internshipService: InternshipsService,
    private departmentService: DepartmentService,
  ) {}

  @Post('/:internshipId')
  async createAssessment(
    @Param('internshipId') internshipId: string,
    @Body() createAssessmentDto: CreateAssessmentDto,
    @GetUser() user: User,
  ) {
    const internship =
      await this.internshipService.getIntershipById(internshipId);
    const department = await this.departmentService.getDepartmentByUser(user);
    return this.assessmentService.createAssessment(
      createAssessmentDto,
      internship,
      department,
    );
  }

  @Get('/:internshipId')
  async getAssessments(@Param('internshipId') internshipId: string) {
    const internship =
      await this.internshipService.getIntershipById(internshipId);
    const assessments =
      await this.assessmentService.getAssessmentsByInternship(internship);
    console.log(assessments);
    return assessments;
  }
}
