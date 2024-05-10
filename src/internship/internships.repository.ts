import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { InternshipStatus } from './internship-status.enum';
import { GetInternshipFilterDto } from './dto/get-internships-fiter.dto';
import { Internship } from './Internship.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class InternshipRepository extends Repository<Internship> {
  constructor(private datasource: DataSource) {
    super(Internship, datasource.createEntityManager());
  }

  async getInterships(
    filterDto: GetInternshipFilterDto,
    user: User,
  ): Promise<Internship[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('intership');
    query.where({ user });
    if (status) {
      query.andWhere('internship.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(intership.title) LIKE LOWER(:search) OR LOWER(internship.description) LIKE LOWER(:search))',
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
      internshipNo,
      companyEmail,
      companyPhone,
      companyAdress,
      internshipStartDate,
      internshipFinishDate,
    }: CreateInternshipDto,
    user: User,
  ): Promise<Internship> {
    const internship = this.create({
      companyName,
      departmentName,
      internshipNo,
      companyEmail,
      companyPhone,
      companyAdress,
      internshipFinishDate,
      internshipStartDate,
      status: InternshipStatus.IN_PROGRESS,
      user,
    });
    await this.save(internship);
    return internship;
  }
}
