import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { sign, verify } from "@node-rs/jsonwebtoken";

@Injectable()
export class JwtService {
  private readonly secret: string;

  public constructor(
    private readonly configService: ConfigService,
  ) {
    this.secret = this.configService.getOrThrow("JWT_SECRET");
  }

  public async createToken(id: string, expiresIn: number): Promise<string> {
    return await sign({ sub: id, iat: Math.floor(Date.now() / 1000), exp: expiresIn, }, this.secret);
  }

  public async verifyToken(jwt: string, iat: number): Promise<string | null> {
    let data;

    try {
      data = await verify(jwt, this.secret, { validateExp: true, validateSignature: true, })
    } catch (e: unknown) {
      return null;
    }

    if (iat !== data.iat) {
      return null;
    }

    return data.sub;
  }
}