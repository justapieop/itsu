import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "./UserRole";
import { Expose } from "class-transformer";

export class User {
  @ApiProperty()
  public readonly id: string;

  @ApiProperty()
  public readonly email: string;
  
  @ApiProperty({
    name: "avatar_url",
  })
  @Expose({
    name: "avatar_url",
  })
  public readonly avatarUrl: string;
  
  @ApiProperty({
    enum: UserRole,
  })
  public readonly role: UserRole;
  
  @ApiProperty()
  public readonly suspended: boolean;
  
  @ApiProperty({
    name: "created_at",
  })
  @Expose({
    name: "created_at",
  })
  public readonly createdAt: Date;
  
  @ApiProperty({
    name: "display_name",
  })
  @Expose({
    name: "created_at",
  })
  public readonly displayName: string;

  public constructor(
    id: string,
    email: string,
    displayName: string,
    avatarUrl: string,
    role: UserRole,
    suspended: boolean,
    createdAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.avatarUrl = avatarUrl;
    this.role = role;
    this.suspended = suspended;
    this.createdAt = createdAt;
  }
}