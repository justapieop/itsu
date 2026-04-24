import { UserRole } from "./UserRole";

export class User {
  public constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly avatarUrl: string,
    public readonly role: UserRole,
    public readonly suspended: boolean,
  ) {}
}