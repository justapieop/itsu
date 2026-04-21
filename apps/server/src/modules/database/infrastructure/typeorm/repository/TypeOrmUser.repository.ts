import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../../../../user/application/ports/in/UserRepository.port";
import { UserEmailAlreadyExistsError } from "../../../../user/domain/UserEmailAlreadyExists.error";
import { User } from "../../../../user/domain/User";
import { Repository } from "typeorm";
import { TypeOrmUserEntity } from "../entities/TypeOrmUser.entity";

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  public constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly userRepository: Repository<TypeOrmUserEntity>,
  ) {}

  public async updateLastLogin(email: string): Promise<void> {
    await this.userRepository.update({ email, }, { lastLogin: new Date(), });
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const entity: TypeOrmUserEntity | null = await this.userRepository.findOne({
      where: { email, },
    });

    if (!entity) {
      return null;
    }

    return new User(
      entity.id,
      entity.email,
      entity.password,
      entity.createdAt,
      entity.updatedAt,
      entity.name,
      entity.active,
    );
  }

  public async save(input: User): Promise<User> {
    const now: Date = new Date();

    const entity: TypeOrmUserEntity = this.userRepository.create({
      id: input.id,
      email: input.email,
      password: input.password,
      name: input.name,
      lastLogin: now,
    });

    try {
      const saved: TypeOrmUserEntity = await this.userRepository.save(entity);

      return new User(
        saved.id,
        saved.email,
        saved.password,
        saved.createdAt,
        saved.updatedAt,
        saved.name,
        saved.active,
      );
    } catch (error: unknown) {
      throw new UserEmailAlreadyExistsError(input.email);
    }
  }

  public async findUserById(id: string): Promise<User | null> {
    const entity: TypeOrmUserEntity | null = await this.userRepository.findOne({
      where: { id, },
    });

    if (!entity) {
      return null;
    }

    return new User(
      entity.id,
      entity.email,
      entity.password,
      entity.createdAt,
      entity.updatedAt,
      entity.name,
      entity.active,
    );
  }
}