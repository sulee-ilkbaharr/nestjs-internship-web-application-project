import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GetInternshipFilterDto } from './dto/get-internships-fiter.dto';
import { Internship } from './Internship.entity';
import { User } from 'src/auth/user.entity';
import { InternshipStatus } from './internship-status.enum';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { UserRole } from 'src/auth/user-role.enum';

@Injectable()
export class InternshipRepository extends Repository<Internship> {
  constructor(private datasource: DataSource) {
    super(Internship, datasource.createEntityManager());
  }

  async getInterships(
    filterDto: GetInternshipFilterDto,
    user: User,
  ): Promise<Internship[]> {
    const { status, notStatus, search } = filterDto;
    const query = this.createQueryBuilder('internship');

    if (user.role === UserRole.DEPARTMENT) {
      query
        .leftJoinAndSelect('internship.user', 'user')
        .leftJoinAndSelect('user.student', 'student');
    } else {
      query.where({ user });
    }

    if (status) {
      query.andWhere('internship.status = :status', { status });
    }

    if (notStatus && notStatus.length > 0) {
      query.andWhere('internship.status NOT IN (:...notStatus)', { notStatus });
    }

    if (search) {
      query.andWhere(
        '(LOWER(internship.title) LIKE LOWER(:search) OR LOWER(internship.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const internships = await query.getMany();
    return internships;
  }

  async createInternship(
    {
      companyName,
      departmentName,
      internshipNumber,
      sameDepartmentGraduate,
      startDate,
      finishDate,
      internshipDays,
      correspondingPerson,
    }: CreateInternshipDto,
    user: User,
  ): Promise<Internship> {
    const internship = this.create({
      companyName,
      departmentName,
      internshipNumber,
      sameDepartmentGraduate,
      startDate,
      finishDate,
      internshipDays,
      correspondingPerson,
      status: InternshipStatus.WAITING_IN_DEPARTMENT_HEAD,
      user,
    });
    await this.save(internship);
    return internship;
  }

  async findInternshipsByStatusAndDate(
    status: InternshipStatus,
    date: string,
  ): Promise<Internship[]> {
    return this.createQueryBuilder('internship')
      .where('internship.status = :status', { status })
      .andWhere('internship.finishDate = :date', { date })
      .getMany();
  }
}
