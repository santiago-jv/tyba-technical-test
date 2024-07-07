import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRepository } from '../../../../transaction/domain/ports/out/transaction-repository.interface';
import { Transaction } from '../../../../transaction/domain/entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
    const entity = this.transactionRepository.create(data);
    return this.transactionRepository.save(entity);
  }

  async findTransactions(
    criteria: Partial<Transaction>,
    page: number,
    limit: number,
  ): Promise<Transaction[]> {
    const skip = (page - 1) * limit;
    return this.transactionRepository.find({
      where: criteria,
      skip: skip,
      take: limit,
    });
  }

  async countTransactions(criteria: Partial<Transaction>): Promise<number> {
    return this.transactionRepository.count({
      where: criteria,
    });
  }
}
