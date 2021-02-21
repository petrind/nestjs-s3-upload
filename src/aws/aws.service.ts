import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import {
  S3_BUCKET_NAME,
  AWS_API_VERSION,
  AWS_REGION,
  FileUploadStatus,
} from '../constants';
import { AwsS3UploadParams } from '../dto/awsS3UploadParams.dto';

@Injectable()
export class AwsService {
  constructor() {
    AWS.config.update({ region: AWS_REGION });
  }

  uploadS3(name, file) {
    const s3: AWS.S3 = new AWS.S3({ apiVersion: AWS_API_VERSION });
    const uploadParams: AwsS3UploadParams = {
      Bucket: S3_BUCKET_NAME,
      Key: name,
      Body: file.buffer,
    };

    let status: string;

    return Promise.resolve(
      s3
        .upload(uploadParams, (err, data) => {
          status = FileUploadStatus.WIP;
          if (err) {
            // TODO use logger
            console.log('error', err);
            status = FileUploadStatus.ERROR_AWS;
          }
          if (data) {
            status = FileUploadStatus.SUCCESS;
          }
        })
        .promise(),
    )
      .then(() => {
        return {
          filename: name,
          status,
        };
      })
      .catch((error) => {
        // TODO use logger
        console.log('error', error);
        status = FileUploadStatus.ERROR_IN_PROCESS;
        return {
          filename: name,
          status,
        };
      });
  }
}
