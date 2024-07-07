import { PaginationMetadata } from '../../../shared/pagination/pagination-metadata';
import { TransactionResponseDto } from './transaction-response-dto';
import { Transaction } from '../../../transaction/domain/entities/transaction.entity';

export class TransactionListResponseDto {
  transactions: TransactionResponseDto[];
  metadata: PaginationMetadata;

  constructor(
    transactions: TransactionResponseDto[],
    metadata: PaginationMetadata,
  ) {
    this.transactions = transactions;
    this.metadata = metadata;
  }

  static fromTransactions(
    transactions: Transaction[],
    metadata: PaginationMetadata,
  ): TransactionListResponseDto {
    return new TransactionListResponseDto(
      transactions.map(
        (transaction) => new TransactionResponseDto(transaction),
      ),
      metadata,
    );
  }
}
