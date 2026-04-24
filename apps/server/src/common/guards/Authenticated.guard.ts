import { CanActivate, ExecutionContext, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JWKS_SERVICE, type JwksService } from "../../modules/jwks/application/in/Jwks.port";
import { User } from "../../modules/user/domain/User";
import { USER_REPOSITORY, type UserRepository } from "../../modules/user/application/in/UserRepository.port";
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  public constructor(
    @Inject(JWKS_SERVICE)
    private readonly jwksService: JwksService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,

  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader || typeof authorizationHeader !== "string" || !authorizationHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException();
    }

    const splittedHeader: string[] = authorizationHeader.split(" ");

    if (splittedHeader.length !== 2) {
      throw new UnauthorizedException();
    }

    const token: string = splittedHeader[1];

    let decoded: string;

    try {
      decoded = await this.jwksService.verifyJwt(token);
    } catch (e: unknown) {
      throw new UnauthorizedException();
    }
    const user: User | null = await this.userRepository.findUserById(decoded, false);

    if (!user) {
      throw new NotFoundException();
    }

    req.user = user;
    
    return true;
  }
}