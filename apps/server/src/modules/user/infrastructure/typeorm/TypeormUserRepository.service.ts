import { Injectable, UseInterceptors } from "@nestjs/common";
import { UserRepository } from "../../application/in/UserRepository.port";
import { User } from "../../domain/User";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeormUserSchema } from "./TypeormUser.schema";
import { InsertResult, Repository } from "typeorm";
import { UserInsertError } from "../../domain/UserInsert.error";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

@Injectable()
export class TypeormUserRepositoryService implements UserRepository {
  public constructor(
    @InjectRepository(TypeormUserSchema)
    private readonly userRepo: Repository<TypeormUserSchema>,
  ) { }

  public async save(user: User): Promise<User> {
    const insertionResult: InsertResult = await this.userRepo
      .createQueryBuilder()
      .insert()
      .into(TypeormUserSchema)
      .values({
        id: user.id,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
        suspended: user.suspended,
        displayName: user.displayName,
      })
      .orUpdate(["email", "avatar_url", "suspended"], ["id"])
      .returning("*")
      .execute();

    const inserted: TypeormUserSchema | undefined = insertionResult.raw[0];

    if (inserted) {
      return new User(
        inserted.id,
        inserted.email,
        inserted.displayName,
        inserted.avatarUrl,
        inserted.role,
        inserted.suspended,
        inserted.createdAt,
      );
    }

    const conflicted: TypeormUserSchema | null = await this.userRepo.findOneBy({ id: user.id });

    if (!conflicted) {
      throw new UserInsertError();
    }

    return new User(
      conflicted.id,
      conflicted.email,
      conflicted.displayName,
      conflicted.avatarUrl,
      conflicted.role,
      conflicted.suspended,
      conflicted.createdAt,
    );
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 60 * 1000)
  public async findUserById(id: string, suspended: boolean): Promise<User | null> {
    const fetched: TypeormUserSchema | null = await this.userRepo.findOneBy({ id, suspended, });

    if (!fetched) {
      return null;
    }

    return new User(
      fetched.id,
      fetched.email,
      fetched.displayName,
      fetched.avatarUrl,
      fetched.role,
      fetched.suspended,
      fetched.createdAt,
    );
  }
}