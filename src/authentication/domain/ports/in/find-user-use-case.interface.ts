import { User } from "../../entities/user.entity";

export interface FindUserUseCase {
    findUser(data: Partial<User>): Promise<User|null>;
}