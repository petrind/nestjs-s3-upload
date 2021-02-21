import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsController } from './aws/aws.controller';

@Module({
  imports: [],
  controllers: [AppController, AwsController],
  providers: [AppService],
})
export class AppModule {}
