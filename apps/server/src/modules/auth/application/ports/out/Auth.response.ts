import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuthResponse {
  @ApiProperty({ name: "access_token", })
  @Expose({ name: "access_token", })
  public readonly accessToken!: string;
  
  @ApiProperty({ name: "refresh_token", })
  @Expose({ name: "refresh_token", })
  public readonly refreshToken!: string;

  @ApiProperty({ name: "expires_in", })
  @Expose({ name: "expires_in" })
  public readonly expiresIn!: number;
}