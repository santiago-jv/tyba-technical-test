import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { JwtService } from '../../src/shared/authentication/services/jwt.service';
import { LoginUserRequestDto } from '../../src/authentication/application/data-transfer-objects/login/login-user-request.dto';
import { RegisterUserRequestDto } from '../../src/authentication/application/data-transfer-objects/register/register-user-request.dto';

describe('AuthenticationV1Controller (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;
  let email:string = 'test' + Date.now() + '@example.com';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    token = await jwtService.generateToken({ userId: 'test-user-id' });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/auth/register (POST)', async () => {
   
    const registerData: RegisterUserRequestDto = {
      email: email,
      password: 'password',
      name: 'New User',
      phoneNumber: '123456789',
    };

    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send(registerData)
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('email', registerData.email);
    expect(response.body).toHaveProperty('name', registerData.name);
  });

  it('/api/v1/auth/login (POST)', async () => {
    const loginData: LoginUserRequestDto = {
      email: email,
      password: 'password',
    };

    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send(loginData)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('email', loginData.email);
    expect(response.body).toHaveProperty('id');
  });
  it('/api/v1/auth/logout (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.NO_CONTENT);

    expect(response.body).toEqual({});
  });
});
