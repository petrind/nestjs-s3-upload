import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsController } from './aws/aws.controller';
import { AwsService } from './aws/aws.service';

@Module({
  imports: [],
  controllers: [AppController, AwsController],
  providers: [AppService, AwsService],
})
export class AppModule {}
