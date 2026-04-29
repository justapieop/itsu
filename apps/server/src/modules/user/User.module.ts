import { Module } from "@nestjs/common";
import { TypeormUserRepositoryService } from "./infrastructure/typeorm/TypeOrmUser.repository";
import { USER_REPOSITORY } from "./application/in/UserRepository.port";
import { DatabaseModule } from "../database/Database.module";
import { UserController } from "./User.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeormUserEntity } from "./infrastructure/typeorm/TypeOrmUser.entity";
import { JwksModule } from "../jwks/Jwks.module";
import { KeyStoreModule } from "../keystore/KeyStore.module";

@Module({
  imports: [DatabaseModule, KeyStoreModule, TypeOrmModule.forFeature([TypeormUserEntity]), JwksModule],
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