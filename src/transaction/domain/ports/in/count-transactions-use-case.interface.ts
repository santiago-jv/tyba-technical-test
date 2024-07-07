import { Transaction } from "../../entities/transaction.entity";

export interface FindTransactionsUseCase {
    findTransactions(
        criteria: Partial<Transaction>,
        page: number,
        limit: number
    ): Promise<Transaction[]>;
}