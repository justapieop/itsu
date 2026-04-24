import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { type Request } from "express";

export const AuthenticatedUser = createParamDecorator(
  (_: any, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();

    return req.user;
  },
);