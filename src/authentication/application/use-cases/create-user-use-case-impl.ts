import { CreateUserUseCase } from '../../domain/ports/in/create-user-use-case.interface';
import { RegisterUserRequestDto } from '../data-transfer-objects/register/register-user-request.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FindUserUseCaseImpl } from './find-user-use-case-impl';
import { EncryptionService } from '../../../shared/encryption/encryption.service';
import { UserRepositoryImpl } from '../../infrastructure/adapters/postgres/user-repository-impl';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryImpl,
    private findUserUseCase: FindUserUseCaseImpl,
    private readonly encryptionService: EncryptionService,
  ) {}

  async createUser(request: RegisterUserRequestDto): Promise<User> {
    const user = new User(
      request.name,
      request.email,
      request.phoneNumber,
      request.password,
    );

    const userFound = await this.findUserUseCase.findUser({
      email: user.email,
    });

    if (userFound) {
      throw new BadRequestException('User already exists');
    }

    user.password = await this.encryptionService.hashPassword(user.password);

    const createdUser = await this.userRepository.save(user);

    return createdUser;
  }
}
