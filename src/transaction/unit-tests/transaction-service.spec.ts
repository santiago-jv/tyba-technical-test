import { Test, TestingModule } from '@nestjs/testing';
import { PaginationMetadata } from '../../shared/pagination/pagination-metadata';
import { TransactionListResponseDto } from '../application/data-transfer-objects/transaction-list-response.dto';
import { TransactionService } from '../application/services/transaction.service';
import { CountTransactionsUseCaseImpl } from '../application/use-cases/count-transactions-use-case-impl';
import { CreateTransactionUseCaseImpl } from '../application/use-cases/create-transaction-use-case-impl';
import { FindTransactionsUseCaseImpl } from '../application/use-cases/find-transactions-use-case-impl';
import { Transaction } from '../domain/entities/transaction.entity';

describe('TransactionService', () => {
  let service: TransactionService;
  let createTransactionUseCase: CreateTransactionUseCaseImpl;
  let findTransactionsUseCase: FindTransactionsUseCaseImpl;
  let countTransactionsUseCase: CountTransactionsUseCaseImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: CreateTransactionUseCaseImpl,
          useValue: {
            createTransaction: jest.fn(),
          },
        },
        {
          provide: FindTransactionsUseCaseImpl,
          useValue: {
            findTransactions: jest.fn(),
          },
        },
        {
          provide: CountTransactionsUseCaseImpl,
          useValue: {
            countTransactions: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    createTransactionUseCase = module.get<CreateTransactionUseCaseImpl>(
      CreateTransactionUseCaseImpl,
    );
    findTransactionsUseCase = module.get<FindTransactionsUseCaseImpl>(
      FindTransactionsUseCaseImpl,
    );
    countTransactionsUseCase = module.get<CountTransactionsUseCaseImpl>(
      CountTransactionsUseCaseImpl,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTransaction', () => {
    it('should create a transaction', async () => {
      const mockTransaction: Partial<Transaction> = {
        id: '1',
        resultsFound: 10,
        url: 'https://example.com',
        request: 'Test request',
        response: 'Test response',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(createTransactionUseCase, 'createTransaction')
        .mockResolvedValue(mockTransaction as Transaction);

      const result = await service.createTransaction(mockTransaction);

      expect(result).toEqual(mockTransaction as Transaction);
    });
  });

  describe('findTransactions', () => {
    it('should find transactions and return TransactionListResponseDto', async () => {
      const mockCriteria: Partial<Transaction> = undefined;
      const mockPage = 1;
      const mockLimit = 10;

      const mockTransactions: Transaction[] = [
        {
          id: '1',
          resultsFound: 10,
          url: 'https://example.com',
          request: 'Test request',
          response: 'Test response',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const mockCount = 1;

      jest
        .spyOn(findTransactionsUseCase, 'findTransactions')
        .mockResolvedValue(mockTransactions);
      jest
        .spyOn(countTransactionsUseCase, 'countTransactions')
        .mockResolvedValue(mockCount);

      const result = await service.findTransactions(
        mockCriteria,
        mockPage,
        mockLimit,
      );

      expect(result).toBeInstanceOf(TransactionListResponseDto);
      expect(result.transactions).toEqual(mockTransactions);
      expect(result.metadata).toBeInstanceOf(PaginationMetadata);
    });
  });
});
