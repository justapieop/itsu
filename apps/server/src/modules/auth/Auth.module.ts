import { Module } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { DatabaseModule } from "../database/Database.module";
import { JwtModule } from "../jwt/Jwt.module";
import { AuthController } from "./Auth.controller";

@Module({
  providers: [AuthService],
  imports: [DatabaseModule, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}