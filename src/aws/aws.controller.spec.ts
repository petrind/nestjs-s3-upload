jest.mock('aws-sdk')

import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { S3 } from 'aws-sdk';
import { S3_ENDPOINT } from '../constants';
import { FileNamePayloadDto } from '../dto/file.dto';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';
import { S3Service } from './s3/s3.service';
import { getS3ServiceToken } from './s3/s3.utils';

describe('AwsController', () => {
  let awsController: AwsController;
  const mockS3Service: S3Service = {
    executeDownloadS3: jest.fn(),
    executeUploadS3: jest.fn(),
    setS3: jest.fn(),
    s3Obj: new S3(),
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AwsController],
      providers: [
        AwsService,
        {
          provide: getS3ServiceToken(S3_ENDPOINT),
          useValue: mockS3Service
        }
      ],
    }).compile();

    awsController = app.get<AwsController>(AwsController);
  });

  describe('uploadFile', () => {
    it('failed should throw error', () => {
      const filenamePayload: FileNamePayloadDto = {
        name: 'test',
      };
      try {
        awsController.uploadFile(filenamePayload, null);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
