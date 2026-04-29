import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../../domain/UserRole";

@Entity({
  name: "users",
})
export class TypeormUserEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  public id!: string;

  @Column({
    type: "text",
    nullable: false,
  })
  @Index()
  public email!: string;

  @Column({
    type: "text",
    nullable: false,
    name: "avatar_url",
  })
  public avatarUrl!: string;

  @Column({
    type: "text",
    nullable: false,
    name: "display_name",
  })
  public displayName!: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
  })
  public createdAt!: Date;

  @Column({
    type: "enum",
    enum: UserRole,
    enumName: "UserRole",
  })
  public role!: UserRole;

  @Column({
    type: "boolean",
    nullable: false,
    default: false,
  })
  public suspended!: boolean;
}