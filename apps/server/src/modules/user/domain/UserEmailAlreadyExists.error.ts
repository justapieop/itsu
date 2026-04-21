export class UserEmailAlreadyExistsError extends Error {
  public constructor(public readonly email: string) {
    super(`User with email "${email}" already exists.`);
    this.name = UserEmailAlreadyExistsError.name;
  }
}