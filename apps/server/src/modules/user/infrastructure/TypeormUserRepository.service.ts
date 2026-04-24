import { Injectable } from "@nestjs/common";
import { UserRepository } from "../application/in/UserRepository.port";
import { User } from "../domain/User";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeormUserSchema } from "./TypeormUser.schema";
import { Repository } from "typeorm";

@Injectable()
export class TypeormUserRepositoryService implements UserRepository {
  public constructor(
    @InjectRepository(TypeormUserSchema)
    private readonly userRepo: Repository<TypeormUserSchema>,
  ) {}

  public async findUserById(id: string, suspended: boolean): Promise<User | null> {
    const fetched: TypeormUserSchema | null = await this.userRepo.findOneBy({ id, suspended, });

    if (!fetched) {
      return null;
    }

    return new User(
      fetched.id,
      fetched.email,
      fetched.avatarUrl,
      fetched.role,
      fetched.suspended,
    );
  }
}