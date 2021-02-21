import { Module } from '@nestjs/common';
import { AwsController } from './aws/aws.controller';
import { AwsService } from './aws/aws.service';

@Module({
  imports: [],
  controllers: [AwsController],
  providers: [AwsService],
})
export class AppModule {}
