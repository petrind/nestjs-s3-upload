import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { FileUploadStatus } from './../src/constants';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should fail upload to S3', async () => {
    return request(app.getHttpServer())
      .post('/aws/file-upload')
      .attach('file', './package.json')
      .field('name', 'test')
      .expect(201)
      .expect({
        filename: 'test',
        status: FileUploadStatus.ERROR_IN_PROCESS,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
