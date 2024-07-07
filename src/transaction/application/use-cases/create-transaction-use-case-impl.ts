import { Injectable } from '@nestjs/common';
import { Transaction } from '../../../transaction/domain/entities/transaction.entity';
import { CreateTransactionUseCase } from '../../../transaction/domain/ports/in/create-transaction-use-case.interface';
import { TransactionRepositoryImpl } from '../../../transaction/infrastructure/adapters/postgres/transaction-repository-impl';

@Injectable()
export class CreateTransactionUseCaseImpl implements CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryImpl,
  ) {}

  async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
    return this.transactionRepository.createTransaction(data);
  }
  
}
