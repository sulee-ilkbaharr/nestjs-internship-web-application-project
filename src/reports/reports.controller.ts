import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response, Request } from 'express';
import { UpdateReportStatusDto } from './dto/update-report-status.dto';
import { User } from 'src/auth/user.entity';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post(':internshipId/upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
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

  @Patch(':reportId/status')
  async updateReportStatus(
    @Param('reportId') reportId: string,
    @Body() updateReportStatusDto: UpdateReportStatusDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const { status } = updateReportStatusDto;
    const updatedReport = await this.reportsService.updateReportStatus(
      reportId,
      status,
      user,
    );
    return {
      message: 'Report status updated successfully',
      reportId: updatedReport.id,
      status: updatedReport.Evaluation,
    };
  }
}
