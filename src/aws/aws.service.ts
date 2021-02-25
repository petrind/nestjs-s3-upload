import { Inject, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {
  FileUploadStatus,
  S3_BUCKET_NAME,
} from '../constants';
import { AwsS3Params, AwsS3UploadParams } from '../dto/awsS3UploadParams.dto';

@Injectable()
export class AwsService {

  constructor(@Inject('S3') private s3: S3) {
  }

  async uploadS3(name: string, file: any) {
    let status: string;

    try {
      status = await this.executeUploadS3(name, file);
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
      status = await this.executeDownloadS3(name);
    } catch(err) {
      throw err;
    }
    return status;
  }

  async executeUploadS3(name: string, file: any) {
    const uploadParams: AwsS3UploadParams = {
      Bucket: S3_BUCKET_NAME,
      Key: name,
      Body: file,
    };
    let status: string = FileUploadStatus.WIP;
    return await this.s3.upload(uploadParams, (err, data) => {
      if (err) {
        // TODO use logger
      }
      if (data) {
        // TODO save address
        status = FileUploadStatus.SUCCESS;
      }
    }).promise()
    .then(() => {
      return status !== FileUploadStatus.SUCCESS && FileUploadStatus.ERROR_AWS;
    })
  }

  async executeDownloadS3(name: string): Promise<boolean> {
    let status: boolean = false;
    const downloadParams: AwsS3Params = {
      Bucket: S3_BUCKET_NAME,
      Key: name,
    };
    return await this.s3.getObject(downloadParams, (err, data) => {
      if (err) {
        // TODO use logger
      }
      if (data) {
        // TODO save address
        status = true;
      }
    })
    .promise()
    .then(() => status);
  }

}
