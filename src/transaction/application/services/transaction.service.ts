import { Transaction } from '../../domain/entities/transaction.entity';
import { Injectable } from '@nestjs/common';
import { CreateTransactionUseCaseImpl } from '../use-cases/create-transaction-use-case-impl';
import { FindTransactionsUseCaseImpl } from '../use-cases/find-transactions-use-case-impl';
import { CountTransactionsUseCaseImpl } from '../use-cases/count-transactions-use-case-impl';
import { TransactionListResponseDto } from '../data-transfer-objects/transaction-list-response.dto';
import { PaginationMetadata } from '../../../shared/pagination/pagination-metadata';

@Injectable()
export class TransactionService {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCaseImpl,
    private readonly findTransactionsUseCase: FindTransactionsUseCaseImpl,
    private readonly countTransactionsUseCase: CountTransactionsUseCaseImpl,
  ) {}

  async createTransaction(
    transaction: Partial<Transaction>,
  ): Promise<Transaction> {
    return this.createTransactionUseCase.createTransaction(transaction);
  }

  async findTransactions(
    criteria: Partial<Transaction>,
    page: number,
    limit: number,
  ): Promise<TransactionListResponseDto> {
    const transactions = await this.findTransactionsUseCase.findTransactions(
      criteria,
      page,
      limit,
    );

    const count =
      await this.countTransactionsUseCase.countTransactions(criteria);
    
    const metadata = new PaginationMetadata(count, page, limit);

    return TransactionListResponseDto.fromTransactions(transactions, metadata);
  }
}
