import { Module } from '@nestjs/common';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [S3Module],
  providers: [AwsService],
  controllers: [AwsController],
  exports: [AwsService],
})
export class AwsModule {}