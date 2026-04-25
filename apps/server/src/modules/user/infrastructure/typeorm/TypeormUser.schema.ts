import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../../domain/UserRole";

@Entity({
  name: "users",
})
export class TypeormUserSchema {
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
  })
  public avatarUrl!: string;

  @CreateDateColumn()
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