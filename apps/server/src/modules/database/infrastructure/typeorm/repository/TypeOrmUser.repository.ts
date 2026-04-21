import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../../../../user/application/ports/UserRepository.port";
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
    const existingUserByEmail: TypeOrmUserEntity | null = await this.userRepository.findOne({
      where: { email: input.email },
      select: { id: true },
    });

    if (existingUserByEmail) {
      return new User(
        existingUserByEmail.id,
        existingUserByEmail.email,
        existingUserByEmail.password,
        existingUserByEmail.createdAt,
        existingUserByEmail.updatedAt
      );
    }

    const entity: TypeOrmUserEntity = this.userRepository.create({
      id: input.id,
      email: input.email,
      password: input.password,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    return await this.userRepository.save(entity);
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