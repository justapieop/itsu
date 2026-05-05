import { CanActivate, ExecutionContext, Injectable, RawBodyRequest } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHmac, Hmac, timingSafeEqual } from "crypto";
import { Request } from "express";

@Injectable()
export class ValidSignatureGuard implements CanActivate {
  public constructor(
    private readonly configService: ConfigService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RawBodyRequest<Request>>();

    const secret: string = this.configService.getOrThrow("WEBHOOK_SECRET");

    const headerSig = req.headers["x-authgear-body-signature"];

    if (!headerSig || typeof headerSig !== "string") {
      return false;
    }

    if (!req.rawBody) {
      return false;
    }

    const sig: string = this.hmacSha256(req.rawBody, secret);

    const sigBuffer = Buffer.from(sig);
    const headerSigBuffer = Buffer.from(headerSig);

    if (sigBuffer.length !== headerSigBuffer.length || !timingSafeEqual(sigBuffer, headerSigBuffer)) {
      return false;
    }

    return true;
  }

  private hmacSha256(data: Buffer, secret: string): string {
    const hasher: Hmac = createHmac("sha256", secret); 

    hasher.update(data);
    return hasher.digest("hex");
  }
}