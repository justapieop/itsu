import { CanActivate, ExecutionContext, Injectable, mixin, Type } from "@nestjs/common";
import { User } from "../../modules/user/domain/User";
import { UserRole } from "../../modules/user/domain/UserRole";
import { Request } from "express";
import { RequireActiveGuard } from "./RequireActive.guard";

const RequireRoleGuard = (role: UserRole): Type<CanActivate> => {
  @Injectable()
  class RequireRoleGuard extends RequireActiveGuard {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
      if (!await super.canActivate(context)) {
        return false;
      }

      const req: Request = context.switchToHttp().getRequest();

      const user: User = req.user;

      return (user.role < role);
    }
  };

  return mixin(RequireRoleGuard);
}