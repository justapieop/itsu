import { Expose } from "class-transformer";

export class AuthResponse {
  @Expose({ name: "access_token", })
  public readonly accessToken!: string;
  
  @Expose({ name: "refresh_token", })
  public readonly refreshToken!: string;

  @Expose({ name: "expires_in" })
  public readonly expiresIn!: number;
}