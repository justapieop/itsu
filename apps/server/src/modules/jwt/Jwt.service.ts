import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { sign, verify } from "@node-rs/jsonwebtoken";
import type { Cache } from "cache-manager";
import { v7 } from "uuid";

@Injectable()
export class JwtService {
  private readonly secret: string;

  public constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {
    this.secret = this.configService.getOrThrow("JWT_SECRET");
  }

  public async createToken(id: string, issuedAt: number, expiresIn: number): Promise<string> {
    let jti: string = v7();
    const token: string = await sign({ sub: id, iat: issuedAt, exp: expiresIn, jti, }, this.secret);

    const ttl = (expiresIn - issuedAt) * 1000;
    await this.cacheManager.set(`jwt:${id}:${jti}`, "true", ttl);

    const userTokens: string[] = (await this.cacheManager.get<string[]>(`user_tokens:${id}`)) || [];
    userTokens.push(jti);
    await this.cacheManager.set(`user_tokens:${id}`, userTokens, ttl);

    return token;
  }

  public async revokeAllTokens(id: string) {
    const userTokens: string[] = (await this.cacheManager.get<string[]>(`user_tokens:${id}`)) || [];
    
    if (userTokens.length > 0) {
      await Promise.all(
        userTokens.map((jti) => this.cacheManager.del(`jwt:${id}:${jti}`))
      );
    }
    
    await this.cacheManager.del(`user_tokens:${id}`);
  }

  public async verifyToken(jwt: string): Promise<{ [key: string]: any, }| null> {
    let data;

    try {
      data = await verify(jwt, this.secret, { validateExp: true, validateSignature: true, })
    } catch (e: unknown) {
      return null;
    }

    if (!await this.cacheManager.get(`jwt:${data.sub}:${data.jti}`)) {
      return null;
    }

    return data;
  }
}