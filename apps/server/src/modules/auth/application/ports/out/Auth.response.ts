import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuthResponse {
  @ApiProperty()
  @Expose({ name: "access_token", })
  public readonly accessToken!: string;
  
  @ApiProperty()
  @Expose({ name: "refresh_token", })
  public readonly refreshToken!: string;

  @ApiProperty()
  @Expose({ name: "expires_in" })
  public readonly expiresIn!: number;
}