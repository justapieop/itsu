import { User } from "../../user/domain/User";

export interface UserRepository {
  save(input: User): Promise<void>;

  findUserById(id: string): Promise<User | null>;
}