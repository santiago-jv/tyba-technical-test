import { Transaction } from "../../entities/transaction.entity";

export interface CreateTransactionUseCase {
  createTransaction(data: Partial<Transaction>): Promise<Transaction>;
}
