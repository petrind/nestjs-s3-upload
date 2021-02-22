export interface AwsS3UploadParams extends AwsS3Params {
  Body: any;
}

export interface AwsS3Params {
  Bucket: string;
  Key: string;
}