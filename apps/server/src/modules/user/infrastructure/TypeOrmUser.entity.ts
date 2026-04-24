import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({
  name: "users",
})
export class TypeOrmUserEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  public id!: string;
  
  @Column({
    type: "text",
    nullable: false,
  })
  public name!: string;

  @Column({
    type: "text",
    unique: true,
    nullable: false,
  })
  @Index()
  public email!: string;

  @Column({
    type: "text",
    nullable: false,
  })
  public password!: string;

  @CreateDateColumn({
    type: "timestamptz",
    name: "created_at",
    nullable: false,
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    name: "updated_at",
    nullable: false,
  })
  public updatedAt!: Date;

  @Column({
    type: "boolean",
    nullable: false,
    default: false,
  })
  public active!: boolean;

  @Column({
    type: "boolean",
    nullable: false,
  })
  public admin!: boolean;
}