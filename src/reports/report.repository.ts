import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Reports } from './report.entity';
import { UpdateInternshipStatusDto } from 'src/internship/dto/update-internship-status.dto';

@Injectable()
export class ReportRepository extends Repository<Reports> {
  constructor(private dataSource: DataSource) {
    super(Reports, dataSource.createEntityManager());
  }

  async getReportsFilter(
    filterDto: UpdateInternshipStatusDto,
  ): Promise<Reports[]> {
    const { status } = filterDto;
    const query = this.createQueryBuilder('report');

    if (status) {
      query.andWhere('report.status = :status', { status });
    }

    const reports = await query.getMany();
    return reports;
  }
}
