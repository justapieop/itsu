import { IsString } from "class-validator";
import { LoginCredentialsDto } from "./LoginCredentials.dto";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterCredentialsDto extends LoginCredentialsDto {
  @ApiProperty()
  @IsString()
  public name!: string;
}