import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserRequestDto } from '../data-transfer-objects/register/register-user-request.dto';
import { CreateUserUseCaseImpl } from '../use-cases/create-user-use-case-impl';
import { RegisterUserResponseDto } from '../data-transfer-objects/register/register-user-response.dto';
import { LoginUserRequestDto } from '../data-transfer-objects/login/login-user-request.dto';
import { LoginUserResponseDto } from '../data-transfer-objects/login/login-user-response.dto';
import { FindUserUseCaseImpl } from '../use-cases/find-user-use-case-impl';
import { EncryptionService } from '../../../shared/encryption/encryption.service';
import { RevokeSessionUseCaseImpl } from '../use-cases/revoke-session-impl';
import { JwtService } from '../../../shared/authentication/services/jwt.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCaseImpl,
    private readonly findUserUseCase: FindUserUseCaseImpl,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
    private readonly revokeSessionUseCase: RevokeSessionUseCaseImpl,
  ) {}

  async registerUser(
    userData: RegisterUserRequestDto,
  ): Promise<RegisterUserResponseDto> {
    const user = await this.createUserUseCase.createUser(userData);
    const token = await this.jwtService.generateToken({
      userId: user.id,
    });

    return new RegisterUserResponseDto(
      user.id,
      user.email,
      user.name,
      token,
      user.phoneNumber,
      user.createdAt,
      user.updatedAt,
    );
  }

  async login(userData: LoginUserRequestDto): Promise<LoginUserResponseDto> {
    const user = await this.findUserUseCase.findUser({
      email: userData.email,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await this.encryptionService.comparePassword(
      userData.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.jwtService.generateToken({
      userId: user.id,
    });

    return new LoginUserResponseDto(
      user.id,
      user.email,
      user.name,
      token,
      user.phoneNumber,
      user.createdAt,
      user.updatedAt,
    );
  }

  async logout(sessionId:string): Promise<void> {
    await this.revokeSessionUseCase.revokeSession(sessionId);
  }
}
