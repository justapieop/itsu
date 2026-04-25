import { Expose, Type } from "class-transformer";
import { ValidateNested, IsString, IsBoolean, IsDefined } from "class-validator";

export class AuthgearWebhookUserStandardAttributes {
  @IsString()
  public email!: string;

  @Expose({ name: "email_verified", })
  @IsBoolean()
  public emailVerified!: boolean;

  @IsString()
  public picture!: string;

  @IsString()
  public name!: string;
}

export class AuthgearWebhookUser {
  @IsString()
  public id!: string;

  @IsBoolean()
  @Expose({ name: "is_disabled", })
  public isDisabled!: boolean;

  @Expose({ name: "standard_attributes" })
  @IsDefined()
  @ValidateNested()
  @Type(() => AuthgearWebhookUserStandardAttributes)
  public standardAttributes!: AuthgearWebhookUserStandardAttributes;
}

export class AuthgearWebhookPayload {
  @IsDefined()
  @ValidateNested()
  @Type(() => AuthgearWebhookUser)
  public user!: AuthgearWebhookUser;
}

export class AuthgearWebhookDto {
  @IsString()
  public type!: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => AuthgearWebhookPayload)
  public payload!: AuthgearWebhookPayload;
}