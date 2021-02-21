// AWS
export const S3_BUCKET_NAME = 'bucket_name';
export const AWS_REGION = 'aws_region';
export const AWS_API_VERSION = '2006-03-01';

// PATH
export const PATH_AWS = 'aws';
export const PATH_FILE_UPLOAD = 'file-upload';

// STATUS
export enum FileUploadStatus {
    WIP = 'WIP',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
}