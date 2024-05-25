import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

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
    @UploadedFiles() reports: Array<Express.Multer.File>,
    @Param('internshipId') internshipId: string,
  ) {
    const fileMap = {
      Internship_Report: reports.find(
        (file) => file.fieldname === 'Internship_Report',
      ),
    };

    return this.reportsService.uploadReports(fileMap, internshipId);
  }

  @Get(':internshipId')
  getReportsByInternship(@Param('internshipId') internshipId: string) {
    return this.reportsService.getReportsByInternship(internshipId);
  }

  @Get('download/:filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<any> {
    res.sendFile(filename, { root: './uploads' });
  }
}
