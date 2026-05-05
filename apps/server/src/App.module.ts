import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./modules/database/Database.module";
import { KeyStoreModule } from "./modules/keystore/KeyStore.module";
import { UserModule } from "./modules/user/User.module";
import { CourtModule } from "./modules/court/Court.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../../.env"
    }),
    DatabaseModule,
    KeyStoreModule,
    UserModule,
    CourtModule,
  ],
})
export class AppModule {}