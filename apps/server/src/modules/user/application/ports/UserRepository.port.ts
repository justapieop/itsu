import { User } from "../../domain/User";

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");

export interface UserRepository {
  save(input: User): Promise<User>;

  findUserById(id: string): Promise<User | null>;
}