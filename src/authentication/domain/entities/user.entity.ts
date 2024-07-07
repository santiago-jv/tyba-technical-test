import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'email',
    unique: true,
  })
  email: string;

  @Column({
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    name: 'password',
    type: 'text',
  })
  password: string;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  constructor(name: string, email: string, phoneNumber: string, password: string) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
}
