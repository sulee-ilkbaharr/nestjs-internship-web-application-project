import { Body, Controller, Post } from '@nestjs/common';
import { CoordinatorService } from './coordinator.service';
import { CreateCoordinatorDto } from './dto/create-coordinator.dto';
import { Coordinator } from './coordinator.entity';

@Controller('coordinator')
export class CoordinatorController {
  constructor(private coordinatorService: CoordinatorService) {}

  @Post()
  createDepartment(
    @Body() createCoordinatorDto: CreateCoordinatorDto,
  ): Promise<Coordinator> {
    return this.coordinatorService.createCoordinaor(createCoordinatorDto);
  }
}
