import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, type UserRepository } from "../user/application/ports/in/UserRepository.port";
import { User } from "../user/domain/User";
import { verify } from "@node-rs/argon2";
import { UserNotFoundError } from "../user/domain/UserNotFound.error";
import { InvalidCredentialsError } from "./domain/InvalidCredentials.error";
import { v7 } from "uuid";

@Injectable()
export class AuthService {
  public constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async login(email: string, password: string): Promise<User> {
    const user: User | null = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new UserNotFoundError(email);
    }

    const isCorrectPassword: boolean = await verify(user?.password, password);

    if (!isCorrectPassword) {
      throw new InvalidCredentialsError();
    }

    await this.userRepository.updateLastLogin(email);

    return user;
  }

  public async register(email: string, password: string, name: string): Promise<User> {
    const now: Date = new Date();

    try {
      let user: User = new User(
        v7(),
        email,
        password,
        now,
        now,
        name,
      );

      return await this.userRepository.save(user);
    } catch (e: unknown) {
      throw e;
    }
  }
}