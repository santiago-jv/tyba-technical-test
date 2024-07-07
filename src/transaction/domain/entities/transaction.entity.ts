import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'transactions',
})
export class Transaction {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @Column({
    name: 'results_found',
  })
  resultsFound: number;

  @Column({
    name: 'url',
  })
  url:string

  @Column({
    name: 'request',
    type: 'text',
  })
  request: string;

  @Column({
    name: 'response',
    type: 'text',
  })
  response: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  constructor(resultsFound: number, url: string, request: string, response: string) {
    this.resultsFound = resultsFound;
    this.url = url;
    this.request = request;
    this.response = response;
  }

}
