import { Module } from "@nestjs/common";
import { TypeormUserRepositoryService } from "./infrastructure/TypeormUserRepository.service";
import { USER_REPOSITORY } from "./application/in/UserRepository.port";
import { DatabaseModule } from "../database/Database.module";

@Module({
  imports: [DatabaseModule],
  providers: [
    TypeormUserRepositoryService,
    {
      provide: USER_REPOSITORY,
      useExisting: TypeormUserRepositoryService,
    }
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}