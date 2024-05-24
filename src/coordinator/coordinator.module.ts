import { Module } from '@nestjs/common';
import { CoordinatorService } from './coordinator.service';
import { CoordinatorController } from './coordinator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinator } from './coordinator.entity';
import { CoordinatorRepository } from './coordinator.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Coordinator])],
  providers: [CoordinatorService, CoordinatorRepository],
  controllers: [CoordinatorController],
  exports: [CoordinatorService],
})
export class CoordinatorModule {}
