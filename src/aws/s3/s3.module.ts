import { Module, Provider } from '@nestjs/common';
import { S3_ENDPOINT } from 'src/constants';
import { S3Service } from './s3.service';
import { getS3ServiceToken } from './s3.utils';

function s3Factory(s3: S3Service, endpoint: string) {
  s3.setS3(endpoint);
  return s3;
}

export function createS3Provider(endpoint: string): Provider<S3Service> {
  return {
    provide: getS3ServiceToken(endpoint),
    useFactory: s3 => s3Factory(s3, endpoint),
    inject: [S3Service],
  };
}

@Module({
  providers: [S3Service, createS3Provider(S3_ENDPOINT)],
  exports: [S3Service, createS3Provider(S3_ENDPOINT)],
})
export class S3Module {}