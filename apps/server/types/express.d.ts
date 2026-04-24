import {} from "../src/modules/user/domain/User";

declare module "express" {
  export interface Request {
    user?: User
  }
}