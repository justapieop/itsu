import { User } from "../../domain/User";

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");

export interface UserRepository {
  findUserById(id: string, suspended: boolean): Promise<User | null>;
}