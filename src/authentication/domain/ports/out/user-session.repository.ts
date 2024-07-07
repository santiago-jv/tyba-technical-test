import { UserSession } from "../../entities/user-session.entity";

export interface UserSessionRepository {
  createSession(data: Partial<UserSession>): Promise<UserSession>;
  findSessionByToken(data: Partial<UserSession>): Promise<UserSession>;
  revokeSession(data: Partial<UserSession>): Promise<void>;
}
