import { Injectable } from '@nestjs/common';
import { CountTransactionsUseCase } from '../../../transaction/domain/ports/in/find-transactions-use-case.interface';
import { Transaction } from '../../../transaction/domain/entities/transaction.entity';
import { TransactionRepositoryImpl } from '../../../transaction/infrastructure/adapters/postgres/transaction-repository-impl';

@Injectable()
export class CountTransactionsUseCaseImpl implements CountTransactionsUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryImpl,
  ) {}

  async countTransactions(criteria:Partial<Transaction>): Promise<number> {
    return this.transactionRepository.countTransactions(criteria);
  }
}
