import { Module } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { DatabaseModule } from "../database/Database.module";
import { JwtService } from "../jwt/Jwt.service";
import { AuthController } from "./Auth.controller";

@Module({
  providers: [AuthService, JwtService],
  imports: [DatabaseModule],
  controllers: [AuthController],
})
export class AuthModule {}