import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import { ConfigService } from '@nestjs/config';
import { JWTPayload } from '../interfaces/jwt-payload.interface';
import { v4 as uuidv4 } from 'uuid';
import { UserSessionRepositoryImpl } from '../../../authentication/infrastructure/adapters/postgres/user-session-repository-impl';

@Injectable()
export class JwtService {
  constructor(
    private readonly configService: ConfigService,
    private readonly UserSessionRepository: UserSessionRepositoryImpl,
  ) {}

  async generateToken(payload: Partial<JWTPayload>) {
    const dateNowInSeconds = Math.floor(Date.now() / 1000);
    const expirationDate =
      dateNowInSeconds + this.configService.get('jwt.expirationTime');

    payload = {
      ...payload,
      iat: dateNowInSeconds,
      exp: expirationDate,
      sessionId: uuidv4(),
    };

    const privateKey = await readFile('private_key.pem', 'utf8');

    const token = sign({ payload }, privateKey, {
      algorithm: 'RS256',
      expiresIn: expirationDate,
    });

    await this.UserSessionRepository.createSession({
      token,
      userId: payload.userId,
      id: payload.sessionId,
    });

    return token;
  }

  async verifyToken(token: string) {
    const publicKey = await readFile('public_key.pem', 'utf8');

    const payload = (verify(token, publicKey) as JwtPayload).payload as JWTPayload;

    const session = await this.UserSessionRepository.findSessionByToken({
      id: payload.sessionId,
      isRevoked: false,
    });

    if (!session) {
      throw new UnauthorizedException('Invalid session');
    }

    return payload;
  }
}
