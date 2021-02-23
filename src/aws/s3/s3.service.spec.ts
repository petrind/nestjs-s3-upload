import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadStatus, S3_ENDPOINT } from '../../constants';
import { S3Service } from './s3.service';
import { getS3ServiceToken } from './s3.utils';

describe('S3Service', () => {
  let mockS3: any;

  let s3Service: S3Service;

  beforeEach(async () => {
    mockS3 = {
      upload: jest.fn().mockReturnThis(),
      getObject: jest.fn().mockReturnThis(),
      promise: jest.fn(),
    }

    const app: TestingModule = await Test.createTestingModule({
      providers: [S3Service],
    }).compile();
    s3Service = app.get<S3Service>(S3Service);
  });


  describe('executeUploadFile', () => {
    it('should success by mocking S3', async () => {
      mockS3.promise = jest.fn().mockReturnThis();
      mockS3.then = jest.fn(() => Promise.resolve(FileUploadStatus.SUCCESS));
      jest
        .spyOn(s3Service, 's3Obj', 'get')
        .mockImplementation(() => mockS3);
      expect(await s3Service.executeUploadS3('test', 'file')).toEqual(
        FileUploadStatus.SUCCESS
      )
    });

    it('should failed  by mocking S3', async () => {
      mockS3.promise = jest.fn().mockReturnThis();
      mockS3.then = jest.fn(() => Promise.resolve(FileUploadStatus.ERROR_AWS));
      jest
        .spyOn(s3Service, 's3Obj', 'get')
        .mockImplementation(() => mockS3);
      expect(await s3Service.executeUploadS3('test', 'file')).toEqual(
        FileUploadStatus.ERROR_AWS
      )
      });
  });

  describe('downloadFile', () => {

    it('should success by mocking S3', async () => {
      mockS3.promise = jest.fn().mockReturnThis();
      mockS3.then = jest.fn(() => Promise.resolve(true));
      jest
        .spyOn(s3Service, 's3Obj', 'get')
        .mockImplementation(() => mockS3);

      expect(await s3Service.executeDownloadS3('test')).toEqual(
        true
      )
    });

    it('should failed by mocking S3', async () => {
      mockS3.promise = jest.fn().mockReturnThis();
      mockS3.then = jest.fn(() => Promise.resolve(false));
      jest
        .spyOn(s3Service, 's3Obj', 'get')
        .mockImplementation(() => mockS3);

      expect(await s3Service.executeDownloadS3('test')).toEqual(
        false
      )
    });
  });

});
