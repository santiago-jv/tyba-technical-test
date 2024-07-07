import { UserRepositoryImpl } from '../../infrastructure/adapters/postgres/user-repository-impl';
import { User } from '../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { FindUserUseCase } from '../../domain/ports/in/find-user-use-case.interface';

@Injectable()
export class FindUserUseCaseImpl implements FindUserUseCase {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  async findUser(data: Partial<User>): Promise<User | null> {
    return await this.userRepository.findOne(data);
  }
}
