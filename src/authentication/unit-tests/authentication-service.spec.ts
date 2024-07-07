import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { LoginUserRequestDto } from '../application/data-transfer-objects/login/login-user-request.dto';
import { RegisterUserRequestDto } from '../application/data-transfer-objects/register/register-user-request.dto';
import { RegisterUserResponseDto } from '../application/data-transfer-objects/register/register-user-response.dto';
import { AuthenticationService } from '../application/services/authentication.service';
import { CreateUserUseCaseImpl } from '../application/use-cases/create-user-use-case-impl';
import { FindUserUseCaseImpl } from '../application/use-cases/find-user-use-case-impl';
import { RevokeSessionUseCaseImpl } from '../application/use-cases/revoke-session-impl';
import { User } from '../domain/entities/user.entity';
import { JwtService } from '../../shared/authentication/services/jwt.service';
import { EncryptionService } from '../../shared/encryption/encryption.service';
import { LoginUserResponseDto } from '../application/data-transfer-objects/login/login-user-response.dto';
import { UserSessionRepositoryImpl } from '../infrastructure/adapters/postgres/user-session-repository-impl';
import { UserRepositoryImpl } from '../infrastructure/adapters/postgres/user-repository-impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from '../domain/entities/user-session.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getAppConfiguration } from '../../shared/configuration/app-config';
import typeormConfig from '../../shared/configuration/typeorm-config';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User, UserSession]),
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
          load: [getAppConfiguration, typeormConfig],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            return configService.get('typeorm');
          },
          inject: [ConfigService],
        }),
      ],
      providers: [
        AuthenticationService,
        CreateUserUseCaseImpl,
        FindUserUseCaseImpl,
        UserRepositoryImpl,
        JwtService,
        EncryptionService,
        UserSessionRepositoryImpl,
        RevokeSessionUseCaseImpl,
      ],
    }).compile();

    service = moduleRef.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    it('should register a new user and return RegisterUserResponseDto', async () => {
      const userData: RegisterUserRequestDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        phoneNumber: '123456789',
      };

       jest
        .spyOn(service['createUserUseCase'], 'createUser')
        .mockResolvedValue(
          new User(userData.name, userData.email, userData.phoneNumber, '1234'),
        );

      const result = await service.registerUser(userData);

      expect(result).toBeInstanceOf(RegisterUserResponseDto);
      expect(result.email).toEqual(userData.email);
    });
  });

  describe('login', () => {
    it('should login a user and return LoginUserResponseDto', async () => {
      const userData: LoginUserRequestDto = {
        email: 'test@example.com',
        password: 'password',
      };

      jest
        .spyOn(service['findUserUseCase'], 'findUser')
        .mockResolvedValue(
          new User('Test User', userData.email, '123456789', 'hashedPassword'),
        );

      jest
        .spyOn(service['encryptionService'], 'comparePassword')
        .mockResolvedValue(true);

      const result = await service.login(userData);

      expect(result).toBeInstanceOf(LoginUserResponseDto);
      expect(result.email).toEqual(userData.email);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const userData: LoginUserRequestDto = {
        email: 'nonexistent@example.com',
        password: 'password',
      };

      jest
        .spyOn(service['findUserUseCase'], 'findUser')
        .mockResolvedValue(null);

      await expect(service.login(userData)).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      const userData: LoginUserRequestDto = {
        email: 'test@example.com',
        password: 'wrongPassword',
      };

      jest
        .spyOn(service['findUserUseCase'], 'findUser')
        .mockResolvedValue(
          new User('Test User', userData.email, '123456789', 'hashedPassword'),
        );

      jest
        .spyOn(service['encryptionService'], 'comparePassword')
        .mockResolvedValue(false);

      await expect(service.login(userData)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('logout', () => {
    it('should revoke the session', async () => {
      const sessionId = 'some-session-id';

      jest
        .spyOn(service['revokeSessionUseCase'], 'revokeSession')
        .mockResolvedValue();

      await expect(service.logout(sessionId)).resolves.not.toThrow();
    });
  });
});


