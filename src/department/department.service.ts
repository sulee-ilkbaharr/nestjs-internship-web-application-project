import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from './department.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async createDeparment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    console.log(createDepartmentDto);
    const { IDno } = createDepartmentDto;
    let department = await this.departmentRepository.findOne({
      where: { IDno },
    });

    if (!department) {
      department =
        await this.departmentRepository.createDeparment(createDepartmentDto);
    } else {
    }
    return department;
  }
  async getDepartmentByUser(user: User): Promise<Department> {
    return this.departmentRepository.findOne({ where: { user } });
  }
}
