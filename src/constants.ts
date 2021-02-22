// AWS
export const S3_BUCKET_NAME = 'bucket_name';
export const AWS_REGION = 'us-west-2';
export const AWS_API_VERSION = '2006-03-01';
export const S3_ENDPOINT = 'https://s3.test.com'

// PATH
export const PATH_AWS = 'aws';
export const PATH_FILE_UPLOAD = 'file-upload';

// STATUS
export enum FileUploadStatus {
  WIP = 'WIP',
  ERROR_IN_PROCESS = 'ERROR_IN_PROCESS',
  ERROR_AWS = 'ERROR_AWS',
  SUCCESS = 'SUCCESS',
}
