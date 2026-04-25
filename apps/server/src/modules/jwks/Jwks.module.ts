import { Global, Module } from "@nestjs/common";
import { JoseService } from "./infrastructure/Jose.service";
import { JWKS_SERVICE } from "./application/in/Jwks.port";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [
    JoseService,
    {
      provide: JWKS_SERVICE,
      useExisting: JoseService,
    }
  ],
  exports: [JWKS_SERVICE],
})
export class JwksModule {}