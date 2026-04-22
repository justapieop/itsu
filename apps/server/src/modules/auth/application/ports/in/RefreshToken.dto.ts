import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class RefreshTokenDto {
  @ApiProperty({ name: "refresh_token", })
  @IsString()
  @Expose({ name: "refresh_token", })
  public readonly refreshToken!: string;
}