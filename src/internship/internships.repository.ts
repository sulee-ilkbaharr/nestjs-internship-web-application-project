import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
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

  // async createInternship(
  //   {
  //     departmentName,
  //     internshipNumber,
  //     sameDepartmentGraduate, // boolean olarak alınabilir.
  //     startDate,
  //     finishDate,
  //     internshipDays,
  //     correspondingPerson,
  //   }: CreateInternshipDto,
  //   user: User,
  //   company: Company,
  // ): Promise<Internship> {
  //   const internship = this.create({
  //     departmentName,
  //     internshipNumber,
  //     sameDepartmentGraduate,
  //     startDate,
  //     finishDate,
  //     internshipDays,
  //     correspondingPerson,
  //     status: InternshipStatus.PREPARING,
  //     user,
  //     company,
  //   });
  //   await this.save(internship);
  //   return internship;
  // }
}
