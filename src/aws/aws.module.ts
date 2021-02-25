import { Module } from '@nestjs/common';
import { Endpoint, S3 } from 'aws-sdk';
import { AWS_API_VERSION, AWS_REGION, S3_ENDPOINT } from 'src/constants';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';

const s3ConnectionFactory = {
  provide: 'S3',
  useFactory: () => {
    return new S3({
      apiVersion: AWS_API_VERSION,
      endpoint: new Endpoint(S3_ENDPOINT),
      region: AWS_REGION
    });
  },
};

@Module({
  providers: [AwsService, s3ConnectionFactory],
  controllers: [AwsController],
  exports: [AwsService],
})
export class AwsModule {}