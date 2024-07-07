import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

export function ApiResponseWithAuth(
  summary: string,
  apiResponseOptions: ApiResponseOptions,
) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary }),
    ApiResponse({
      status: HttpStatusCode.Unauthorized,
      description: 'Unauthorized',
    }),
    ApiResponse(apiResponseOptions),
  );
}
