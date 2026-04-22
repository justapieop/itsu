import { CanActivate, ExecutionContext, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "../../modules/jwt/Jwt.service";
import { USER_REPOSITORY, type UserRepository } from "../../modules/user/application/ports/in/UserRepository.port";
import { User } from "../../modules/user/domain/User";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
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

    const decoded = await this.jwtService.decodeToken(token);

    const { sub } = decoded;

    const user: User | null = await this.userRepository.findUserById(sub);

    if (!user) {
      throw new NotFoundException();
    }

    try {
      await this.jwtService.verifyToken(token);

      req.user = user;
    } catch (e: unknown) {
      throw new UnauthorizedException();
    }
    
    return true;
  }
}