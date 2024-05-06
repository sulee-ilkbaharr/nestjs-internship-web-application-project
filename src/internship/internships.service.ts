import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { GetInternshipFilterDto } from './dto/get-internships-fiter.dto';
import { InternshipRepository } from './internships.repository';

import { Internship } from './Internship.entity';
import { InternshipStatus } from './internship-status.enum';

@Injectable()
export class InternshipsService {
  constructor(private readonly internshipsRepository: InternshipRepository) {}

  getInternships(filterDto: GetInternshipFilterDto): Promise<Internship[]> {
    return this.internshipsRepository.getInterships(filterDto);
  }

  async getIntershipById(id: string): Promise<Internship> {
    const found = await this.internshipsRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException('Internship with ID "${id}" not found');
    }
    return found;
  }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException('Task with  ID "${id}" not found');
  //   }
  //   return found;
  // }

  async createInternship(
    createInternshipDto: CreateInternshipDto,
  ): Promise<Internship> {
    return this.internshipsRepository.createInternship(createInternshipDto);
    // const { title, description } = createTaskDto;
    // const task = this.tasksRepository.create({
    //   title,
    //   description,
    //   status: TaskStatus.OPEN,
    // });
    // await this.tasksRepository.save(task);
    // return task;
  }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   /// createTaskDto , parametresinin içinden parametre aldığı için const içinde süslü parantesled
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  async deleteInternship(id: string): Promise<void> {
    const result = await this.internshipsRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    console.log(result);
  }
  async updateInternshipStatus(
    id: string,
    status: InternshipStatus,
  ): Promise<Internship> {
    const task = await this.getIntershipById(id);
    task.status = status;
    await this.internshipsRepository.save(task);
    return task;
  }
}
