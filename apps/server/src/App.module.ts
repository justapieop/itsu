import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./modules/database/Database.module";
import { KeyStoreModule } from "./modules/keystore/KeyStore.module";
import { UserModule } from "./modules/user/User.module";
import { JwksModule } from "./modules/jwks/Jwks.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../../.env"
    }),
    DatabaseModule,
    KeyStoreModule,
    UserModule,
  ],
})
export class AppModule {}