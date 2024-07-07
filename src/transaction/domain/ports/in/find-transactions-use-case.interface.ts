import { Transaction } from '../../entities/transaction.entity';

export interface CountTransactionsUseCase {
  countTransactions(criteria: Partial<Transaction>): Promise<number>;
}
