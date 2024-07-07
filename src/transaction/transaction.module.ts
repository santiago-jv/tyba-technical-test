import { Module } from '@nestjs/common';
import { TransactionRepositoryImpl } from './infrastructure/adapters/postgres/transaction-repository-impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './domain/entities/transaction.entity';
import { CreateTransactionUseCaseImpl } from './application/use-cases/create-transaction-use-case-impl';
import { TransactionService } from './application/services/transaction.service';
import { FindTransactionsUseCaseImpl } from './application/use-cases/find-transactions-use-case-impl';
import { TransactionV1Controller } from './infrastructure/controllers/v1/transaction-v1.controller';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CountTransactionsUseCaseImpl } from './application/use-cases/count-transactions-use-case-impl';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), AuthenticationModule],
  exports: [TransactionService],
  providers: [
    TransactionRepositoryImpl,
    CreateTransactionUseCaseImpl,
    FindTransactionsUseCaseImpl,
    CountTransactionsUseCaseImpl,
    TransactionService,
  ],
  controllers: [TransactionV1Controller],
})
export class TransactionModule {}
