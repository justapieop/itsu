import { Injectable } from "@nestjs/common";
import { JwksService } from "../application/in/Jwks.port";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { ConfigService } from "@nestjs/config";
import { InvalidTokenError } from "../domain/InvalidToken.error";

@Injectable()
export class JoseService implements JwksService {
  private readonly jwks;
  
  public constructor(
    private readonly configService: ConfigService,
  ) {
    this.jwks = createRemoteJWKSet(new URL(this.configService.getOrThrow("JWKS_URL")), { cacheMaxAge: 7 * 24 * 60 * 60 * 1000, });
  }

  public async verifyJwt(jwt: string): Promise<string> {
    const verify = await jwtVerify(jwt, this.jwks);

    if (!verify.payload.sub) {
      throw new InvalidTokenError();
    }

    return verify.payload.sub;
  }
}