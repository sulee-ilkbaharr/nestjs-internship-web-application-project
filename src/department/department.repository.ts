import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from './department.entity';

@Injectable()
export class DepartmentRepository extends Repository<Department> {
  constructor(private dataSource: DataSource) {
    super(Department, dataSource.createEntityManager());
  }

  async createDeparment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    const { IDno, name, surname, departmentName, facultyName } =
      createDepartmentDto;
    const departmet = this.create({
      IDno,
      name,
      surname,
      departmentName,
      facultyName,
    });
    await this.save(departmet);
    return departmet;
  }
}
