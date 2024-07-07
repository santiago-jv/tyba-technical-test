import { Transaction } from '../../entities/transaction.entity';

export interface TransactionRepository {
  createTransaction(data: Partial<Transaction>): Promise<Transaction>;

  findTransactions(
    criteria: Partial<Transaction>,
    page: number,
    limit: number,
  ): Promise<Transaction[]>;

  countTransactions(criteria: Partial<Transaction>): Promise<number>;
}
