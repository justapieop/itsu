import { Module } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { JwtModule } from "../jwt/Jwt.module";
import { AuthController } from "./Auth.controller";
import { UserModule } from "../user/User.module";

@Module({
  providers: [AuthService],
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}