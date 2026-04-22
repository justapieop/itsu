export class UserNotFoundError extends Error {
  public constructor(identifier: string) {
    super();
    this.message = `User with identifier "${identifier}" not found.`;
  }
}