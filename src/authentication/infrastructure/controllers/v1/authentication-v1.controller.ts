import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserRequestDto } from '../../../../authentication/application/data-transfer-objects/login/login-user-request.dto';
import { LoginUserResponseDto } from '../../../../authentication/application/data-transfer-objects/login/login-user-response.dto';
import { RegisterUserRequestDto } from '../../../../authentication/application/data-transfer-objects/register/register-user-request.dto';
import { RegisterUserResponseDto } from '../../../../authentication/application/data-transfer-objects/register/register-user-response.dto';
import { AuthenticationService } from '../../../../authentication/application/services/authentication.service';
import { HttpJwtGuard } from '../../../../shared/authentication/guards/http-jwt.guard';
import { JWTPayload } from '../../../../shared/authentication/interfaces/jwt-payload.interface';
import { OpenApiTags } from '../../../../shared/open-api/api-tags';

@ApiTags(OpenApiTags.Authentication)
@Controller('v1/auth')
export class AuthenticationV1Controller {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginUserResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() data: LoginUserRequestDto,
  ): Promise<LoginUserResponseDto> {
    return this.authenticationService.login(data);
  }

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: RegisterUserResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() data: RegisterUserRequestDto,
  ): Promise<RegisterUserResponseDto> {
    return this.authenticationService.registerUser(data);
  }

  @Post('logout')
  @UseGuards(HttpJwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Request() request: { user: JWTPayload }): Promise<void> {
    await this.authenticationService.logout(request.user.sessionId);
  }
}
