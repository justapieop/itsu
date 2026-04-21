export class UserNotFoundError extends Error {
  public constructor(email: string) {
    super();
    this.message = `User with email "${email}" not found.`;
  }
}