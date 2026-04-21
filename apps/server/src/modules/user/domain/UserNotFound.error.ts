export class UserNotFoundError extends Error {
  public constructor(public readonly email: string) {
    super(`User with email "${email}" not found.`);
    this.name = UserNotFoundError.name;
  }
}