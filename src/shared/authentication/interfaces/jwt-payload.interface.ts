export interface JWTPayload {
  userId: string;
  iat: number;
  exp: string;
  sessionId: string;
}
