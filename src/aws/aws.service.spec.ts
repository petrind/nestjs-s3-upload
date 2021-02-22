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
      promise: jest.fn(),
    }

    const app: TestingModule = await Test.createTestingModule({
      providers: [AwsService],
    }).compile();
    awsService = app.get<AwsService>(AwsService);
  });

  describe('uploadFile', () => {
    it('should success by mocking executeUploadS3', async () => {
      jest
        .spyOn(awsService, 'executeUploadS3')
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
      mockS3.promise = jest.fn().mockReturnThis();
      mockS3.then = jest.fn(() => Promise.resolve(FileUploadStatus.SUCCESS));
      jest
        .spyOn(awsService, 's3', 'get')
        .mockImplementation(() => mockS3);
      expect(await awsService.executeUploadS3('test', 'file')).toEqual(
        FileUploadStatus.SUCCESS
      )
    });

    it('should failed  by mocking S3', async () => {
      mockS3.promise = jest.fn().mockReturnThis();
      mockS3.then = jest.fn(() => Promise.resolve(FileUploadStatus.ERROR_AWS));
      jest
        .spyOn(awsService, 's3', 'get')
        .mockImplementation(() => mockS3);
      expect(await awsService.executeUploadS3('test', 'file')).toEqual(
        FileUploadStatus.ERROR_AWS
      )
      });
  });

  describe('downloadFile', () => {
    it('should failed by mocking executeDownloadS3', async () => {
      jest
        .spyOn(awsService, 'executeDownloadS3')
        .mockImplementation(() => Promise.resolve(false));

      expect(await awsService.downloadS3('test')).toEqual(
        false
      )
    });

    it('should failed by mocking executeDownloadS3', async () => {
      jest
        .spyOn(awsService, 'executeDownloadS3')
        .mockImplementation(() => Promise.resolve(false));

      expect(await awsService.downloadS3('test')).toEqual(
        false
      )
    });

    it('should success by mocking S3', async () => {
      mockS3.promise = jest.fn().mockReturnThis();
      mockS3.then = jest.fn(() => Promise.resolve(true));
      jest
        .spyOn(awsService, 's3', 'get')
        .mockImplementation(() => mockS3);

      expect(await awsService.downloadS3('test')).toEqual(
        true
      )
    });

    it('should failed by mocking S3', async () => {
      mockS3.promise = jest.fn().mockReturnThis();
      mockS3.then = jest.fn(() => Promise.resolve(false));
      jest
        .spyOn(awsService, 's3', 'get')
        .mockImplementation(() => mockS3);

      expect(await awsService.downloadS3('test')).toEqual(
        false
      )
    });
  });



});
