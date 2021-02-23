import { Injectable } from '@nestjs/common';
import { Endpoint, S3 } from 'aws-sdk';
import {
  AWS_API_VERSION,
  AWS_REGION,
  FileUploadStatus,
  S3_BUCKET_NAME,
} from '../../constants';
import { AwsS3Params, AwsS3UploadParams } from '../../dto/awsS3UploadParams.dto';

@Injectable()
export class S3Service {
  s3?: S3;

  get s3Obj(): S3 {
    return this.s3 ;
  }

  setS3(endpoint: string) {
    this.s3 = new S3({
      apiVersion: AWS_API_VERSION,
      endpoint: new Endpoint(endpoint),
      region: AWS_REGION
    });
  }

  async executeUploadS3(name: string, file: any) {
    const uploadParams: AwsS3UploadParams = {
      Bucket: S3_BUCKET_NAME,
      Key: name,
      Body: file,
    };
    let status: string = FileUploadStatus.WIP;
    return await this.s3Obj.upload(uploadParams, (err, data) => {
      if (err) {
        // TODO use logger
      }
      if (data) {
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
    return await this.s3Obj.getObject(downloadParams, (err, data) => {
      if (err) {
        // TODO use logger
      }
      if (data) {
        status = true;
      }
    })
    .promise()
    .then(() => status);
  }

}
