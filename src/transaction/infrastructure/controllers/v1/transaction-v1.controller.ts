import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OpenApiTags } from '../../../../shared/open-api/api-tags';
import { HttpJwtGuard } from '../../../../shared/authentication/guards/http-jwt.guard';
import { TransactionService } from '../../../../transaction/application/services/transaction.service';
import { TransactionListResponseDto } from '../../../../transaction/application/data-transfer-objects/transaction-list-response.dto';

@ApiTags(OpenApiTags.Transactions)
@Controller('v1/transactions')
@UseGuards(HttpJwtGuard)
export class TransactionV1Controller {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('')
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async searchNearbyPlaces(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<TransactionListResponseDto> {
    return this.transactionService.findTransactions(
      undefined,
      Number(page ?? 1),
      Number(limit  ?? 10),
    );
  }
}
