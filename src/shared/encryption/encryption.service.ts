import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcryptjs";

@Injectable()
export class EncryptionService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const match = await compare(password, hash);
    return match;
  }
}