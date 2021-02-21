import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileNamePayloadDto } from '../dto/file.dto';
import * as AWS from 'aws-sdk';
import {
  S3_BUCKET_NAME,
  AWS_API_VERSION,
  AWS_REGION,
  PATH_FILE_UPLOAD,
  PATH_AWS,
  FileUploadStatus,
} from 'src/constants';
import { AwsS3UploadParams } from 'src/dto/awsS3UploadParams.dto';

@Controller(PATH_AWS)
export class AwsController {
  constructor() {
    AWS.config.update({ region: AWS_REGION });
  }

  @UseInterceptors(FileInterceptor(FileNamePayloadDto.FILE_PARAM))
  @Post(PATH_FILE_UPLOAD)
  uploadFile(
    @Body() body: FileNamePayloadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const s3: AWS.S3 = new AWS.S3({ apiVersion: AWS_API_VERSION });
    const uploadParams: AwsS3UploadParams = {
      Bucket: S3_BUCKET_NAME,
      Key: body.name,
      Body: file.buffer,
    };

    let status: string = FileUploadStatus.WIP;

    s3.upload(uploadParams, (err, data) => {
      if (err) {
        status = FileUploadStatus.ERROR;
      }
      if (data) {
        status = FileUploadStatus.SUCCESS;
      }
    });

    return {
      filename: body.name,
      status,
    };
  }
}
