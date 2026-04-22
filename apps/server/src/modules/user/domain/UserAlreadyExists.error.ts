export class UserEmailAlreadyExistsError extends Error {
  public constructor(identifier: string) {
    super();
    this.message = `User with identifier "${identifier}" already exists.`;
  }
}