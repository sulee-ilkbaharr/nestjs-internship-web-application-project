import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { InternshipStatus } from './internship-status.enum';
import { GetInternshipFilterDto } from './dto/get-internships-fiter.dto';
import { Internship } from './Internship.entity';

@Injectable()
export class InternshipRepository extends Repository<Internship> {
  constructor(private datasource: DataSource) {
    super(Internship, datasource.createEntityManager());
  }

  async getInterships(
    filterDto: GetInternshipFilterDto,
  ): Promise<Internship[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('intership');
    if (status) {
      query.andWhere('internship.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(intership.title) LIKE LOWER(:search) OR LOWER(internship.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const internships = await query.getMany();
    return internships;
  }

  async createInternship({ title }: CreateInternshipDto): Promise<Internship> {
    const internship = this.create({
      title,
      status: InternshipStatus.IN_PROGRESS,
    });
    await this.save(internship);
    return internship;
  }
}
