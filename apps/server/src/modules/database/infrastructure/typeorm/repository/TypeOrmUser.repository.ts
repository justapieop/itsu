import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../../../../user/application/ports/UserRepository.port";
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

  public async save(input: User): Promise<User> {
    const entity: TypeOrmUserEntity = this.userRepository.create({
      id: input.id,
      email: input.email,
      password: input.password,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    try {
      const saved: TypeOrmUserEntity = await this.userRepository.save(entity);

      return new User(
        saved.id,
        saved.email,
        saved.password,
        saved.createdAt,
        saved.updatedAt,
      );
    } catch (error: unknown) {
      throw new UserEmailAlreadyExistsError(input.email);
    }
  }

  public async findUserById(id: string): Promise<User | null> {
    const entity = await this.userRepository.findOne({
      where: { id },
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
    );
  }
}