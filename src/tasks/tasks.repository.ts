import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private datasource: DataSource) {
    super(Task, datasource.createEntityManager());
  }

  async createTask({ title, description }: CreateTaskDto): Promise<Task> {
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }
}
