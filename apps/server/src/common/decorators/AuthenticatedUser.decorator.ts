import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { type Request } from "express";
import { InvalidCredentialsError } from "../../modules/auth/domain/InvalidCredentials.error";
import { InsufficientPermissionError } from "../../modules/user/domain/InsufficientPermission.error";

export interface RequiredRole {
  requireAdmin?: boolean;
}

export const AuthenticatedUser = createParamDecorator(
  (data: RequiredRole, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    
    const user = req.user;

    if (!user || typeof user !== "object") {
      throw new InvalidCredentialsError();
    }

    if (data && data.requireAdmin && !user.admin) {
      throw new InsufficientPermissionError();
    }

    return user;
  },
);