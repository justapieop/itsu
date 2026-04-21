import { BeforeInsert, Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v7 as uuidv7 } from "uuid";

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
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    name: "updated_at",
  })
  public updatedAt!: Date;

  @Column({
    type: "timestamptz",
    name: "last_login",
  })
  public lastLogin!: Date;

  @Column({
    type: "timestamptz",
    name: "last_refresh",
  })
  public lastRefresh!: Date;

  @BeforeInsert()
  public generateId(): void {
    if (!this.id) {
      this.id = uuidv7();
    }
  }
}