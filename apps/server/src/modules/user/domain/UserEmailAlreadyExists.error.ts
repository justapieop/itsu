export class UserEmailAlreadyExistsError extends Error {
  public constructor(email: string) {
    super();
    this.message = `User with email "${email}" already exists.`;
  }
}