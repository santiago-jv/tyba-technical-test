import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSession } from '../../../domain/entities/user-session.entity';
import { UserSessionRepository } from '../../../domain/ports/out/user-session.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UserSessionRepositoryImpl implements UserSessionRepository {
  constructor(
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
  ) {}

  async createSession(data: Partial<UserSession>): Promise<UserSession> {
    const entity = this.userSessionRepository.create(data);
    return this.userSessionRepository.save(entity);
  }

  async findSessionByToken(
    data: Partial<UserSession>,
  ): Promise<UserSession | null> {
    return this.userSessionRepository.findOne({
      where: data,
    });
  }

  async revokeSession(where: Partial<UserSession>): Promise<void> {
    await this.userSessionRepository.update(where, { isRevoked: true });
  }
}
