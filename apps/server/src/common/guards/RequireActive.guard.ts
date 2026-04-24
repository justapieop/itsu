import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthenticatedGuard } from "./Authenticated.guard";
import { Request } from "express";
import { User } from "../../modules/user/domain/User";

@Injectable()
export class RequireActiveGuard extends AuthenticatedGuard {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!await super.canActivate(context)) {
      return false;
    }

    const req: Request = context.switchToHttp().getRequest();

    const user: User = req.user;

    if (user.suspended) {
      return false;
    }
    
    return true;
  }
}