import { Module } from '@nestjs/common';
import { AuthenticationService } from './application/services/authentication.service';
import { AuthenticationV1Controller } from './infrastructure/controllers/v1/authentication-v1.controller';
import { CreateUserUseCaseImpl } from './application/use-cases/create-user-use-case-impl';
import { UserRepositoryImpl } from './infrastructure/adapters/postgres/user-repository-impl';
import { User } from './domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '../shared/authentication/services/jwt.service';
import { FindUserUseCaseImpl } from './application/use-cases/find-user-use-case-impl';
import { EncryptionService } from '../shared/encryption/encryption.service';
import { UserSessionRepositoryImpl } from './infrastructure/adapters/postgres/user-session-repository-impl';
import { UserSession } from './domain/entities/user-session.entity';
import { RevokeSessionUseCaseImpl } from './application/use-cases/revoke-session-impl';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSession])],
  controllers: [AuthenticationV1Controller],
  providers: [
    AuthenticationService,
    CreateUserUseCaseImpl,
    FindUserUseCaseImpl,
    UserRepositoryImpl,
    JwtService,
    EncryptionService,
    UserSessionRepositoryImpl,
    RevokeSessionUseCaseImpl
  ],
  exports:[JwtService]
})
export class AuthenticationModule {}
