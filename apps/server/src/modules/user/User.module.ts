import { Module } from "@nestjs/common";
import { TypeormUserRepositoryService } from "./infrastructure/typeorm/TypeormUserRepository.service";
import { USER_REPOSITORY } from "./application/in/UserRepository.port";
import { DatabaseModule } from "../database/Database.module";
import { UserController } from "./User.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeormUserSchema } from "./infrastructure/typeorm/TypeormUser.schema";
import { JwksModule } from "../jwks/Jwks.module";

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([TypeormUserSchema]), JwksModule],
  providers: [
    TypeormUserRepositoryService,
    {
      provide: USER_REPOSITORY,
      useExisting: TypeormUserRepositoryService,
    }
  ],
  exports: [USER_REPOSITORY],
  controllers: [UserController],
})
export class UserModule {}