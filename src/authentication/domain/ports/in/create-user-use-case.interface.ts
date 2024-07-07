import { RegisterUserRequestDto } from "../../../../authentication/application/data-transfer-objects/register/register-user-request.dto";
import { User } from "../../entities/user.entity";

export interface CreateUserUseCase {
    createUser(request: RegisterUserRequestDto): Promise<User>;
}