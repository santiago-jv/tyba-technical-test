import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { JWTPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class HttpJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization?.split(' ')[1] as string;

    if (!authToken) {
      throw new UnauthorizedException('Missing authorization token');
    }

    try {
      const payload: JWTPayload = (await this.jwtService.verifyToken(
        authToken,
      )) as JWTPayload;
      
      request.user = payload;

      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
