export class InvalidCredentialsError extends Error {
  public constructor() {
    super();
    this.message = "Invalid credentials.";
  }
}