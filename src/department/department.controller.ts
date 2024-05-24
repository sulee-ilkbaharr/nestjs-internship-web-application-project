import { Body, Controller, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from './department.entity';

@Controller('department')
export class DepartmentController {
  constructor(private deparmentService: DepartmentService) {}

  @Post()
  createDepartment(
    @Body() createDeparmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.deparmentService.createDeparment(createDeparmentDto);
  }
}
