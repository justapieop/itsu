import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";

import { UserRepository } from "../../application/in/UserRepository.port";
import { User } from "../../domain/User";
import { UserInsertError } from "../../domain/UserInsert.error";
import { TypeormUserEntity } from "./TypeOrmUser.entity";

@Injectable()
export class TypeormUserRepositoryService implements UserRepository {
  public constructor(
    @InjectRepository(TypeormUserEntity)
    private readonly userRepo: Repository<TypeormUserEntity>,
  ) {}

  public async save(user: User): Promise<User> {
    const result: InsertResult = await this.userRepo
      .createQueryBuilder()
      .insert()
      .into(TypeormUserEntity)
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

    const entity: TypeormUserEntity | undefined = result.raw[0]
      ?? await this.userRepo.findOneBy({ id: user.id }) ?? undefined;

    if (!entity) throw new UserInsertError();

    return this.toUser(entity);
  }

  public async findUserById(id: string, suspended: boolean): Promise<User | null> {
    const entity = await this.userRepo.findOneBy({ id, suspended });
    return entity ? this.toUser(entity) : null;
  }

  private toUser(entity: TypeormUserEntity): User {
    return new User(
      entity.id,
      entity.email,
      entity.displayName,
      entity.avatarUrl,
      entity.role,
      entity.suspended,
      entity.createdAt,
    );
  }
}