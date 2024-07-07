import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/ports/out/user-repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async save(user: Partial<User>): Promise<User> {
    const entity = this.userRepository.create(user);
    return this.userRepository.save(entity);
  }

  async findOne(data: Partial<User>): Promise<User|null> {
    return this.userRepository.findOne({
      where: data,
    });
  }
}
