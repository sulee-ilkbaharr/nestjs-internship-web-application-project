import {
  ForbiddenException,
  Injectable,
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

@Injectable()
export class InternshipsService {
  constructor(
    private readonly internshipsRepository: InternshipRepository,
    private companyService: CompanyService,
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
    private readonly companyEvaluationRepository: CompanyEvaluationRepository,
  ) {}

  getInternshipswithfilter(
    filterDto: GetInternshipFilterDto,
    user: User,
  ): Promise<Internship[]> {
    return this.internshipsRepository.getInterships(filterDto, user);
  }

  async getIntershipById(id: string, user: User): Promise<Internship> {
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
    const internship = await this.getIntershipById(id, user);

    if (
      user.role !== UserRole.DEPARTMENT &&
      user.role !== UserRole.FACULTY_DEAN
    ) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }

    internship.status = status;
    await this.internshipsRepository.save(internship);
    return internship;
  }
}
