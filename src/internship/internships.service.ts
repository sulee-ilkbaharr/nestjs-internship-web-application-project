import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { GetInternshipFilterDto } from './dto/get-internships-fiter.dto';
import { InternshipRepository } from './internships.repository';

import { Internship } from './Internship.entity';
import { InternshipStatus } from './internship-status.enum';
import { User } from 'src/auth/user.entity';
import { Company } from 'src/company/company.entity';

@Injectable()
export class InternshipsService {
  constructor(private readonly internshipsRepository: InternshipRepository) {}

  getInternships(
    filterDto: GetInternshipFilterDto,
    user: User,
  ): Promise<Internship[]> {
    //yetkili kişi get internship metodu ile internshipleri çekebilir
    return this.internshipsRepository.getInterships(filterDto, user);
  }

  async getIntershipById(id: string, user: User): Promise<Internship> {
    // Update metotunda ihtiyaç olacak.Udpate metodu statusün bölüm başkanı ve dekan tarafından update edilmesini sağlayacak!
    const found = await this.internshipsRepository.findOne({
      where: { id, user },
    });

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

  //create internship metotu ile öğrencinin internship oluşturulması sağlanır
  async createInternship(
    createInternshipDto: CreateInternshipDto,
    user: User,
    company: Company,
  ): Promise<Internship> {
    return this.internshipsRepository.createInternship(
      createInternshipDto,
      user,
      company,
    );
  }
  async deleteInternship(id: string, user: User): Promise<void> {
    const result = await this.internshipsRepository.delete({ id, user });
    if (result.affected == 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    console.log(result);
  }
  async updateInternshipStatus(
    //status bölüm başkanı ve dekan tarafından update edilir!
    id: string,
    status: InternshipStatus,
    user: User,
  ): Promise<Internship> {
    const task = await this.getIntershipById(id, user);
    task.status = status;
    await this.internshipsRepository.save(task);
    return task;
  }
}
