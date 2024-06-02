import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { GetInternshipFilterDto } from './dto/get-internships-fiter.dto';
import { InternshipRepository } from './internships.repository';

import { Internship } from './Internship.entity';
import { InternshipStatus } from './internship-status.enum';
import { User } from 'src/auth/user.entity';
import { CompanyService } from 'src/company/company.service';
import { UserRepository } from 'src/auth/users.repository';
import { StudentRepository } from 'src/student/student.repository';
import { UserRole } from 'src/auth/user-role.enum';
import { CompanyEvaluationRepository } from 'src/company-evaluation/company-evaluation.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';
import * as moment from 'moment';

@Injectable()
export class InternshipsService {
  constructor(
    private readonly internshipsRepository: InternshipRepository,
    private companyService: CompanyService,
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
    private readonly companyEvaluationRepository: CompanyEvaluationRepository,
  ) {}
  private readonly logger = new Logger(InternshipsService.name);

  @Cron('* * * * * *') // This runs every second
  async checkAndCompleteInternships() {
    // const today = moment().format('DD-MM-YYYY'); // Bugünün tarihini formatlayın
    // this.logger.debug(`Running cron job for date: ${today}`);

    const internshipsToUpdate = await this.internshipsRepository.find({
      where: { status: InternshipStatus.INSURANCE_UPLOADED },
    });

    for (const internship of internshipsToUpdate) {
      const finishDate = moment(internship.finishDate, 'DD-MM-YYYY'); // Tarih formatını belirtin
      if (finishDate.isSame(moment(), 'day')) {
        internship.status = InternshipStatus.COMPLETED;
        await this.internshipsRepository.save(internship);
        this.logger.debug(
          `Updated internship ID ${internship.id} to COMPLETED`,
        );
      }
    }
  }

  getInternshipswithfilter(
    filterDto: GetInternshipFilterDto,
    user: User,
  ): Promise<Internship[]> {
    return this.internshipsRepository.getInterships(filterDto, user);
  }

  async getIntershipById(id: string): Promise<Internship> {
    const found = await this.internshipsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!found) {
      throw new NotFoundException(`Internship with ID "${id}" not found`);
    }
    return found;
  }

  async getAllInternshipsByUser(user: User): Promise<Internship[]> {
    return await this.internshipsRepository.find({
      where: { user },
    });
  }

  async findAllWithStudentNames(): Promise<any[]> {
    try {
      const internships = await this.internshipsRepository.find({
        relations: ['user', 'user.student'],
      });
      const result = internships.map((internship) => ({
        ...internship,
        studentName: `${internship.user.student.name} ${internship.user.student.surname}`,
      }));
      return result;
    } catch (error) {
      console.error('Error fetching internship details:', error);
      throw error;
    }
  }

  async getAllInternshipsWithCompanyEvaluations(): Promise<any[]> {
    const internships = await this.internshipsRepository.find({
      relations: ['user', 'user.student', 'company'],
    });

    const result = await Promise.all(
      internships.map(async (internship) => {
        const companyEvaluation =
          await this.companyEvaluationRepository.findOne({
            where: { company: internship.company },
          });

        return {
          studentName: `${internship.user.student.name} ${internship.user.student.surname}`,
          studentDepartment: internship.user.student.departmentName,
          companyName: internship.company.companyName,
          companyDepartment: internship.departmentName,
          score: companyEvaluation?.score || null,
          notes: companyEvaluation?.notes || null,
          companyId: internship.company.id,
          companyEvaluationId: companyEvaluation?.id || null,
        };
      }),
    );

    return result;
  }

  async createInternship(
    createInternshipDto: CreateInternshipDto,
    user: User,
  ): Promise<Internship> {
    const {
      companyName,
      departmentName,
      productionArea,
      companyPhoneNumber,
      companyEmailAddress,
      companyAddress,
      internshipNumber,
      sameDepartmentGraduate,
      startDate,
      finishDate,
      internshipDays,
      correspondingPerson,
    } = createInternshipDto;

    const createCompanyDto = {
      companyName,
      productionArea,
      companyPhoneNumber,
      companyEmailAddress,
      companyAddress,
    };

    const company =
      await this.companyService.createOrFindCompany(createCompanyDto);

    const internship = {
      companyName,
      departmentName,
      productionArea,
      companyPhoneNumber,
      companyEmailAddress,
      companyAddress,
      internshipNumber,
      sameDepartmentGraduate,
      startDate,
      finishDate,
      internshipDays,
      correspondingPerson,
      status: InternshipStatus.WAITING_IN_DEPARTMENT_HEAD,
      company, // Şirket bilgisi ile birlikte
      user, // Kullanıcı bilgisi ile birlikte
    };
    try {
      console.log(internship);
    } catch (error) {
      console.log(error);
    }
    return await this.internshipsRepository.save(internship);
    console.log(internship);
    console.log(company);
  }

  async deleteInternship(id: string, user: User): Promise<void> {
    const result = await this.internshipsRepository.delete({ id, user });
    if (result.affected == 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    console.log(result);
  }
  async updateInternshipStatus(
    id: string,
    status: InternshipStatus,
    user: User,
  ): Promise<Internship> {
    const internship = await this.getIntershipById(id);

    if (
      user.role !== UserRole.DEPARTMENT &&
      user.role !== UserRole.FACULTY_DEAN &&
      user.role !== UserRole.INTERNSHIP_COORDINATOR
    ) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }

    internship.status = status;
    await this.internshipsRepository.save(internship);
    return internship;
  }

  @Cron(CronExpression.EVERY_MINUTE) // This runs every minute for testing purposes
  async handleCron() {
    const today = moment().format('DD-MM-YYYY');
    this.logger.debug(`Running cron job for date: ${today}`);

    const internships = await this.internshipsRepository.find({
      where: { finishDate: today, status: InternshipStatus.COMPLETED },
      relations: ['company', 'user'],
    });

    this.logger.debug(
      `Found ${internships.length} internships finishing today.`,
    );

    for (const internship of internships) {
      if (internship.company && internship.company.companyEmailAddress) {
        await this.sendAssessmentFormEmail(
          internship.company.companyEmailAddress,
          internship.id,
        );
        this.logger.debug(
          `Sent email to ${internship.company.companyEmailAddress}`,
        );
      }
      if (internship.user && internship.user.email) {
        await this.sendEmailForUser(internship.user.email, internship.id);
        this.logger.debug(`Sent email to user ${internship.user.email}`);
      }
    }
  }

  async sendEmailForUser(email: string, internshipId: string) {
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: 'your-email@hotmail.com', // Gerçek email ve şifreyi buraya girin
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@hotmail.com',
      to: email,
      subject: 'Internship Completion Notification',
      text: `Your internship with ID: ${internshipId} has been completed successfully.`,
    };

    await transporter.sendMail(mailOptions);
  }

  async sendAssessmentFormEmail(email: string, internshipId: string) {
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: 'nilhan.t@hotmail.com', // Gerçek email ve şifreyi buraya girin
        pass: 'Bilgen321.',
      },
    });

    const mailOptions = {
      from: 'nilhan.t@hotmail.com',
      to: email,
      subject: 'Assessment Form',
      text: `Please fill out the assessment form for the internship. Link: http://127.0.0.1:5502/view/internship_assesment_form/internship_assesment_form.html?internshipId=${internshipId}`,
    };

    await transporter.sendMail(mailOptions);
    return { message: 'Email sent successfully' };
  }
}
