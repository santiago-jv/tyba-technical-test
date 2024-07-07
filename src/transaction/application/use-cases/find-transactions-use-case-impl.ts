import { Injectable } from '@nestjs/common';
import { Transaction } from '../../../transaction/domain/entities/transaction.entity';
import { FindTransactionsUseCase } from '../../../transaction/domain/ports/in/count-transactions-use-case.interface';
import { TransactionRepositoryImpl } from '../../../transaction/infrastructure/adapters/postgres/transaction-repository-impl';

@Injectable()
export class FindTransactionsUseCaseImpl implements FindTransactionsUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryImpl,
  ) {}

    async findTransactions(
        criteria: Partial<Transaction>,
        page: number,
        limit: number,
    ): Promise<Transaction[]> {
        return this.transactionRepository.findTransactions(criteria, page, limit);
    }
}
