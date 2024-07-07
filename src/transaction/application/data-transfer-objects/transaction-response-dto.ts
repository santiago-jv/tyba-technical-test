import { Transaction } from "../../../transaction/domain/entities/transaction.entity";

export class TransactionResponseDto {
    id: string;
    resultsFound: number;
    url: string;
    request: string;
    response: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(transaction: Transaction) {
      this.id = transaction.id;
      this.resultsFound = transaction.resultsFound;
      this.url = transaction.url;
      this.request = transaction.request;
      this.response = transaction.response;
      this.createdAt = transaction.createdAt;
      this.updatedAt = transaction.updatedAt;
    }
  }