import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../../application/UserRepository.port";
import { User } from "../../../../user/domain/User";

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  public async save(input: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async findUserById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  
}