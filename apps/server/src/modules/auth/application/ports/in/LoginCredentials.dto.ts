import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginCredentialsDto {
  @ApiProperty()
  @IsEmail()
  public email!: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 10,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  public password!: string;
}