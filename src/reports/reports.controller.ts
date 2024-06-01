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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response, Request } from 'express';
import { UpdateReportStatusDto } from './dto/update-report-status.dto';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('reports')
@UseGuards(AuthGuard('jwt'))
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post(':internshipId/upload')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  getReportsByInternship(@Param('internshipId') internshipId: string) {
    return this.reportsService.getReportsByInternship(internshipId);
  }

  @Get('download/:filename')
  @UseGuards(AuthGuard('jwt'))
  async downloadFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<any> {
    res.sendFile(filename, { root: './uploads' });
  }

  @Patch(':reportId/status')
  @UseGuards(AuthGuard('jwt'))
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
