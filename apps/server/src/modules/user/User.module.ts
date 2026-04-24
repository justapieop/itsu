import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmUserEntity } from "./infrastructure/TypeOrmUser.entity";
import { TypeOrmUserRepository } from "./infrastructure/TypeOrmUser.repository";
import { USER_REPOSITORY } from "./application/ports/in/UserRepository.port";

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmUserEntity]),
  ],
  providers: [
    TypeOrmUserRepository,
    {
      provide: USER_REPOSITORY,
      useExisting: TypeOrmUserRepository,
    }
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}