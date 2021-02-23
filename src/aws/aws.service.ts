import { Inject, Injectable } from '@nestjs/common';
import {
  FileUploadStatus,
  S3_ENDPOINT
} from '../constants';
import { S3Service } from './s3/s3.service';
import { getS3ServiceToken } from './s3/s3.utils';

@Injectable()
export class AwsService {

  constructor(@Inject(getS3ServiceToken(S3_ENDPOINT)) private s3Service: S3Service) {
  }

  async uploadS3(name: string, file: any) {
    let status: string;

    try {
      status = await this.s3Service.executeUploadS3(name, file);
    } catch (error) {
      // TODO use logger
      status = FileUploadStatus.ERROR_IN_PROCESS;
    }

    return {
      filename: name,
      status,
    };
  }

  async downloadS3(name: string) {
    let status: boolean;
    try {
      status = await this.s3Service.executeDownloadS3(name);
    } catch(err) {
      throw err;
    }
    return status;
  }

}
