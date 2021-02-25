import { Test, TestingModule } from '@nestjs/testing';
import * as AWS from 'aws-sdk';
import { readFileSync } from 'fs';
import { FileUploadStatus } from '../constants';
import { AwsService } from './aws.service';

describe('AwsService', () => {
  let mockS3: any;

  let awsService: AwsService;

  beforeEach(async () => {
    mockS3 = {
      upload: jest.fn().mockReturnThis(),
      getObject: jest.fn().mockReturnThis(),
      promise: jest.fn().mockReturnThis(),
    }

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AwsService,
        {
          provide: 'S3',
          useValue: mockS3,
        }
      ],
    }).compile();
    awsService = app.get<AwsService>(AwsService);
  });

  describe('uploadFile', () => {
    it('should success by mocking executeUploadS3', async () => {
      jest
        .spyOn(awsService, 'executeUploadS3')
        .mockResolvedValue(FileUploadStatus.SUCCESS);
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
          .spyOn(awsService, 'executeUploadS3')
          .mockImplementation(() => { throw new Error() });

        expect(await awsService.uploadS3('test', 'file')).toEqual(
          {
            filename: 'test',
            status: FileUploadStatus.ERROR_IN_PROCESS,
          }
        )
      });
  });

  describe('executeUploadFile', () => {
    it('should success by mocking S3', async () => {
      mockS3.then = jest.fn().mockResolvedValueOnce(FileUploadStatus.SUCCESS);

      expect(await awsService.executeUploadS3('test', 'file')).toEqual(
        FileUploadStatus.SUCCESS
      )
    });

    it('should failed  by mocking S3', async () => {
      mockS3.then = jest.fn().mockResolvedValueOnce(FileUploadStatus.ERROR_AWS);

      expect(await awsService.executeUploadS3('test', 'file')).toEqual(
        FileUploadStatus.ERROR_AWS
      )
      });
  });

  describe('downloadFile', () => {
    it('should success by mocking executeDownloadS3', async () => {
      jest
        .spyOn(awsService, 'executeDownloadS3')
        .mockResolvedValue(true);

      expect(await awsService.downloadS3('test')).toEqual(
        true
      )
    });

    it('should failed by mocking executeDownloadS3', async () => {
      jest
        .spyOn(awsService, 'executeDownloadS3')
        .mockResolvedValue(false);

      expect(await awsService.downloadS3('test')).toEqual(
        false
      )
    });

    it('should success by mocking S3', async () => {
      mockS3.then = jest.fn().mockResolvedValueOnce(true);

      expect(await awsService.downloadS3('test')).toEqual(
        true
      )
    });

    it('should failed by mocking S3', async () => {
      mockS3.then = jest.fn().mockResolvedValueOnce(false);

      expect(await awsService.downloadS3('test')).toEqual(
        false
      )
    });
  });



});
