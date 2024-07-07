export interface RevokeSessionUseCase {
  revokeSession(sessionId: string): Promise<void>;
}
