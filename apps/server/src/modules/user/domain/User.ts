export class User {
  public constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly name: string,
    public readonly active: boolean,
    public readonly lastLogin: Date,
    public readonly lastRefresh: Date,
  ) {}
}