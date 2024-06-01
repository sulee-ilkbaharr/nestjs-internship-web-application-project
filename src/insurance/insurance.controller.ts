import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InsuranceService } from './insurance.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('insurance')
@UseGuards(AuthGuard('jwt'))
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Post(':internshipId/upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadFiles(
    @UploadedFiles() insurance: Array<Express.Multer.File>,
    @Param('internshipId') internshipId: string,
  ) {
    console.log('Upload files:', insurance);

    if (!insurance || insurance.length === 0) {
      throw new Error('No files uploaded');
    }

    const fileMap = {
      InsuranceForm: insurance.find(
        (file) => file.fieldname === 'InsuranceForm',
      ),
    };

    if (!fileMap.InsuranceForm) {
      throw new Error('Insurance form file not found');
    }

    return this.insuranceService.uploadInsurance(fileMap, internshipId);
  }

  @Get(':internshipId')
  @UseGuards(AuthGuard('jwt'))
  getInsuranceByInternship(@Param('internshipId') internshipId: string) {
    return this.insuranceService.getInsuranceByInternship(internshipId);
  }

  @Get('download/:filename')
  @UseGuards(AuthGuard('jwt'))
  async downloadFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<any> {
    res.sendFile(filename, { root: './uploads' });
  }
}
