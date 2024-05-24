import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { GetInternshipFilterDto } from './dto/get-internships-fiter.dto';
import { InternshipRepository } from './internships.repository';

import { Internship } from './Internship.entity';
import { InternshipStatus } from './internship-status.enum';
import { User } from 'src/auth/user.entity';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class InternshipsService {
  constructor(
    private readonly internshipsRepository: InternshipRepository,
    private companyService: CompanyService,
  ) {}

  getInternships(
    filterDto: GetInternshipFilterDto,
    user: User,
  ): Promise<Internship[]> {
    //yetkili kişi get internship metodu ile internshipleri çekebilir
    return this.internshipsRepository.getInterships(filterDto, user);
  }

  async getIntershipById(id: string, user: User): Promise<Internship> {
    // Update metotunda ihtiyaç olacak.Udpate metodu statusün bölüm başkanı ve dekan tarafından update edilmesini sağlayacak!
    const found = await this.internshipsRepository.findOne({
      where: { id, user },
    });

    if (!found) {
      throw new NotFoundException('Internship with ID "${id}" not found');
    }
    return found;
  }

  async getAllInternshipsByUser(user: User): Promise<Internship[]> {
    return await this.internshipsRepository.find({
      where: { user },
    });
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
    //status bölüm başkanı ve dekan tarafından update edilir!
    id: string,
    status: InternshipStatus,
    user: User,
  ): Promise<Internship> {
    const task = await this.getIntershipById(id, user);
    task.status = status;
    await this.internshipsRepository.save(task);
    return task;
  }
}
