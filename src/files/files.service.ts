import { Injectable, NotFoundException } from '@nestjs/common';
import { Express } from 'express';
import { FileRepository } from './file.repository';
import { InternshipRepository } from 'src/internship/internships.repository';
import { FileEntity } from './file.entity';

@Injectable()
export class FilesService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly internshipRepository: InternshipRepository,
  ) {}

  async uploadFiles(
    files: {
      Internship_Application_Form: Express.Multer.File;
      Employer_Information_Form: Express.Multer.File;
      Declaration_Commitment_Document: Express.Multer.File;
      ID_Card_Photocopy: Express.Multer.File;
    },
    internshipId: string,
  ): Promise<FileEntity> {
    const internship = await this.internshipRepository.findOneBy({
      id: internshipId,
    });
    if (!internship) {
      throw new NotFoundException(
        `Internship with ID ${internshipId} not found`,
      );
    }

    const newFile = this.fileRepository.create({
      Internship_Application_Form: files.Internship_Application_Form.filename,
      Employer_Information_Form: files.Employer_Information_Form.filename,
      Declaration_Commitment_Document:
        files.Declaration_Commitment_Document.filename,
      ID_Card_Photocopy: files.ID_Card_Photocopy.filename,
      internship: internship,
    });

    await this.fileRepository.save(newFile);
    internship.file = newFile;
    await this.internshipRepository.save(internship);

    return newFile;
  }

  async getUploadedFiles(internshipId: string): Promise<FileEntity> {
    const internship = await this.internshipRepository.findOneBy({
      id: internshipId,
    });
    if (!internship) {
      throw new NotFoundException(
        `Internship with ID ${internshipId} not found`,
      );
    }

    const files = await this.fileRepository.findOneBy({
      internship: internship,
    });
    if (!files) {
      throw new NotFoundException(
        `Files for internship with ID ${internshipId} not found`,
      );
    }

    return files;
  }
}
