import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FileNamePayloadDto } from '../dto/file.dto';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';

describe('AwsController', () => {
  let awsController: AwsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AwsController],
      providers: [AwsService],
    }).compile();

    awsController = app.get<AwsController>(AwsController);
  });

  describe('uploadFile', () => {
    it('failed should throw error', () => {
      const filenamePayload: FileNamePayloadDto = {
        name: 'test',
      }
      try {
        awsController.uploadFile(filenamePayload, null);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
