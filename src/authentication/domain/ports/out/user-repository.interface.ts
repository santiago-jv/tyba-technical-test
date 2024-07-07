import { User } from '../../entities/user.entity';

export interface UserRepository {
  save(user: Partial<User>): Promise<User>;

  findOne(data: Partial<User>): Promise<User>;
}
