import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRepository } from "../application/ports/in/UserRepository.port";
import { User } from "../domain/User";
import { UserEmailAlreadyExistsError } from "../domain/UserAlreadyExists.error";
import { TypeOrmUserEntity } from "./TypeOrmUser.entity";

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  public constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly userRepository: Repository<TypeOrmUserEntity>,
  ) {}

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
      entity.admin,
    );
  }

  public async save(input: User): Promise<User> {
    const now: Date = new Date();

    const entity: TypeOrmUserEntity = this.userRepository.create({
      id: input.id,
      email: input.email,
      password: input.password,
      name: input.name,
      admin: input.admin
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
        saved.admin,
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
      entity.admin,
    );
  }
}