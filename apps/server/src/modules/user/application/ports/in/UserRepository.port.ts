import { User } from "../../../domain/User";

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");

export interface UserRepository {
  save(input: User): Promise<User>;
  updateLastLogin(email: string): Promise<void>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
}