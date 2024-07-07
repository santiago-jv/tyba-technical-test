import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module'; 
import { JwtService } from '../../src/shared/authentication/services/jwt.service'; 

describe('PlacesV1Controller (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;

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

  it('/v1/places/nearby (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/places/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({ city: 'Barranquilla' })
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('places');
    expect(response.body.places).toBeInstanceOf(Array);
  });

  it('/v1/places/nearby (GET) with all query params', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/places/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        coordinates: '40.7128,-74.0060',
        type: 'restaurant',
        search_radius: 500,
      })
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('places');
    expect(response.body.places).toBeInstanceOf(Array);
  });

  it('/v1/places/nearby (GET) with coordinates only', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/places/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        coordinates: '40.7128,-74.0060',
      })
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('places');
    expect(response.body.places).toBeInstanceOf(Array);
  });
});
