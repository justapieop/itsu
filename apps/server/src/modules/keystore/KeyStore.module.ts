import KeyvRedis from "@keyv/redis";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        stores: [
          new KeyvRedis(`
            redis${config.get<string>("REDIS_SECURE", "true").toLowerCase() === "true" ? "s" : ""}://${config.get("REDIS_USER")}:${config.get("REDIS_PASSWORD")}@${config.get("REDIS_HOST")}:${config.get("REDIS_PORT")}/${config.get("REDIS_DB")}
          `),
        ],
      }),
    }),
  ],
  exports: [CacheModule],
})
export class KeyStoreModule {}