import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "./Jwt.service";
import { KeyStoreModule } from "../keystore/KeyStore.module";

@Module({
  imports: [ConfigModule, KeyStoreModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}