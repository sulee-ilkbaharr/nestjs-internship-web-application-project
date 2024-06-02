import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Param,
  Get,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post(':internshipId/upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('internshipId') internshipId: string,
  ) {
    const fileMap = {
      Internship_Application_Form: files.find(
        (file) => file.fieldname === 'Internship_Application_Form',
      ),
      Employer_Information_Form: files.find(
        (file) => file.fieldname === 'Employer_Information_Form',
      ),
      Declaration_Commitment_Document: files.find(
        (file) => file.fieldname === 'Declaration_Commitment_Document',
      ),
      ID_Card_Photocopy: files.find(
        (file) => file.fieldname === 'ID_Card_Photocopy',
      ),
    };

    return this.filesService.uploadFiles(fileMap, internshipId);
  }

  @Get(':internshipId/uploaded')
  async getUploadedFiles(@Param('internshipId') internshipId: string) {
    return this.filesService.getUploadedFiles(internshipId);
  }
}
