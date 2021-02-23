jest.mock('aws-sdk')
import { Test, TestingModule } from '@nestjs/testing';
import { S3 } from 'aws-sdk';
import { readFileSync } from 'fs';
import { FileUploadStatus, S3_ENDPOINT } from '../constants';
import { AwsService } from './aws.service';
import { S3Service } from './s3/s3.service';
import { getS3ServiceToken } from './s3/s3.utils';

describe('AwsService', () => {
  let mockS3: any;
  let awsService: AwsService;

  const mockS3Service: S3Service = {
    executeDownloadS3: jest.fn(),
    executeUploadS3: jest.fn(),
    setS3: jest.fn(),
    s3Obj: new S3(),
  }

  beforeEach(async () => {
    mockS3 = {
      upload: jest.fn().mockReturnThis(),
      getObject: jest.fn().mockReturnThis(),
      promise: jest.fn(),
    }

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AwsService,
        {
          provide: getS3ServiceToken(S3_ENDPOINT),
          useValue: mockS3Service
        }
      ],
    }).compile();
    awsService = app.get<AwsService>(AwsService);
  });

  describe('uploadFile', () => {
    it('should success by mocking executeUploadS3', async () => {
      jest
        .spyOn(mockS3Service, 'executeUploadS3')
        .mockImplementation(() => Promise.resolve(FileUploadStatus.SUCCESS));
      const fileToBeUploaded = readFileSync('./package.json');

      expect(await awsService.uploadS3('test', fileToBeUploaded)).toEqual(
        {
          filename: 'test',
          status: FileUploadStatus.SUCCESS,
        }
      )
    });

    it('should failed by mocking executeUploadS3', async () => {
        jest
          .spyOn(mockS3Service, 'executeUploadS3')
          .mockImplementation(() => { throw new Error() });

        expect(await awsService.uploadS3('test', 'file')).toEqual(
          {
            filename: 'test',
            status: FileUploadStatus.ERROR_IN_PROCESS,
          }
        )
      });
  });

  describe('downloadFile', () => {
    it('should failed by mocking executeDownloadS3', async () => {
      jest
        .spyOn(mockS3Service, 'executeDownloadS3')
        .mockImplementation(() => Promise.resolve(false));

      expect(await awsService.downloadS3('test')).toEqual(
        false
      )
    });

    it('should failed by mocking executeDownloadS3', async () => {
      jest
        .spyOn(mockS3Service, 'executeDownloadS3')
        .mockImplementation(() => Promise.resolve(false));

      expect(await awsService.downloadS3('test')).toEqual(
        false
      )
    });
  });



});
