import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { JwtService } from '../../src/shared/authentication/services/jwt.service';

describe('TransactionV1Controller (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    token = await jwtService.generateToken({ userId: 'test-user-id' });

    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('api/v1/transactions (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/transactions')
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('transactions');
    expect(response.body).toHaveProperty('metadata');
    expect(response.body.transactions).toBeInstanceOf(Array);
    expect(response.body.metadata).toHaveProperty('totalItems');
    expect(response.body.metadata).toHaveProperty('currentPage');
    expect(response.body.metadata).toHaveProperty('pageSize');
  });

  it('api/v1/transactions (GET) with pagination', async () => {
    const page = 2;
    const limit = 5;

    const response = await request(app.getHttpServer())
      .get('/api/v1/transactions')
      .set('Authorization', `Bearer ${token}`)
      .query({ page, limit })
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('transactions');
    expect(response.body).toHaveProperty('metadata');
    expect(response.body.transactions).toBeInstanceOf(Array);
    expect(response.body.metadata).toHaveProperty('totalItems');
    expect(response.body.metadata).toHaveProperty('currentPage', page);
    expect(response.body.metadata).toHaveProperty('pageSize', limit);
  });
});
