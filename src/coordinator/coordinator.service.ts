import { Injectable } from '@nestjs/common';
import { CoordinatorRepository } from './coordinator.repository';
import { CreateCoordinatorDto } from './dto/create-coordinator.dto';
import { Coordinator } from './coordinator.entity';

@Injectable()
export class CoordinatorService {
  constructor(private readonly coordinatorRepository: CoordinatorRepository) {}

  async createCoordinaor(
    createCoordinatorDto: CreateCoordinatorDto,
  ): Promise<Coordinator> {
    console.log(createCoordinatorDto);
    const { IDno } = createCoordinatorDto;
    let coordinator = await this.coordinatorRepository.findOne({
      where: { IDno },
    });

    if (!coordinator) {
      coordinator =
        await this.coordinatorRepository.createCoordinator(
          createCoordinatorDto,
        );
    } else {
    }
    return coordinator;
  }
}
