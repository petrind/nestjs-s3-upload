import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { PATH_AWS, PATH_FILE_UPLOAD } from '../constants';
import { FileNamePayloadDto } from '../dto/file.dto';
import { AwsService } from './aws.service';

@Controller(PATH_AWS)
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @UseInterceptors(FileInterceptor(FileNamePayloadDto.FILE_PARAM))
  @Post(PATH_FILE_UPLOAD)
  uploadFile(
    @Body() body: FileNamePayloadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('No File', HttpStatus.BAD_REQUEST);
    }
    return this.awsService.uploadS3(body.name, file);
  }
}
