import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./modules/database/Database.module";
import { UserModule } from "./modules/user/User.module";
import { AuthModule } from "./modules/auth/Auth.module";
import { KeyStoreModule } from "./modules/keystore/KeyStore.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../../.env"
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    KeyStoreModule,
  ]
})
export class AppModule {}