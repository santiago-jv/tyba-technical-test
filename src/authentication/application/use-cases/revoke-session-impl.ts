import { Injectable } from '@nestjs/common';
import { RevokeSessionUseCase } from '../../../authentication/domain/ports/in/revoke-session-use-case.interface';
import { UserSessionRepositoryImpl } from '../../../authentication/infrastructure/adapters/postgres/user-session-repository-impl';

@Injectable()
export class RevokeSessionUseCaseImpl implements RevokeSessionUseCase {
  constructor(
    private readonly userSessionRepository: UserSessionRepositoryImpl,
  ) {}

  async revokeSession(sessionId: string): Promise<void> {
    await this.userSessionRepository.revokeSession({ id: sessionId });
  }
}
