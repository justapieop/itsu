import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./modules/database/Database.module";
import { UserModule } from "./modules/user/User.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../../.env"
    }),
    DatabaseModule,
    UserModule,
  ]
})
export class AppModule {}