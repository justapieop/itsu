import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, type UserRepository } from "../user/application/ports/in/UserRepository.port";
import { User } from "../user/domain/User";
import { verify } from "@node-rs/argon2";
import { UserNotFoundError } from "../user/domain/UserNotFound.error";
import { InvalidCredentialsError } from "./domain/InvalidCredentials.error";
import { v7 } from "uuid";
import { JwtService } from "../jwt/Jwt.service";

@Injectable()
export class AuthService {
  public constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
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

    return user;
  }

  public async verifyRefreshToken(jwt: string): Promise<string> {
    const data = await this.jwtService.verifyToken(jwt);

    if (!data) {
      throw new InvalidCredentialsError();
    }

    return data.sub;
  }

  public async logout(id: string): Promise<void> {
    await this.jwtService.revokeAllTokens(id);
  }

  public async issueTokens(id: string): Promise<[string, string, number]> {
    const now: number = Math.floor(Date.now() / 1000);
    
    return [
      await this.jwtService.createToken(id, now, now + 30 * 60),
      await this.jwtService.createToken(id, now, now + 7 * 24 * 60 * 60),
      now + 30 * 60,
    ];
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
        true,
        false,
      );

      return await this.userRepository.save(user);
    } catch (e: unknown) {
      throw e;
    }
  }
}