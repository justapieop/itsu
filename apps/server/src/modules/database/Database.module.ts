import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { USER_REPOSITORY } from "../user/application/ports/UserRepository.port";
import { TypeOrmUserEntity } from "./infrastructure/typeorm/entities/TypeOrmUser.entity";
import { TypeOrmUserRepository } from "./infrastructure/typeorm/repository/TypeOrmUser.repository";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("POSTGRES_HOST"),
        port: configService.getOrThrow("POSTGRES_PORT"),
        username: configService.getOrThrow("POSTGRES_USERNAME"),
        password: configService.getOrThrow("POSTGRES_PASSWORD"),
        database: configService.getOrThrow("POSTGRES_DB"),
        autoLoadEntities: true,
        synchronize: configService.get<string>("NODE_ENV", "production").toLowerCase() === "development",
        parseInt8: true,
        cache: true,
        ssl: configService.get<string>("POSTGRES_SSL_ENABLED", "true").toLowerCase() === "true",
      }),
    }),
    TypeOrmModule.forFeature([TypeOrmUserEntity]),
  ],
  providers: [
    TypeOrmUserRepository,
    {
      provide: USER_REPOSITORY,
      useExisting: TypeOrmUserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class DatabaseModule {}