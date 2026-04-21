import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import uuid from "uuid";

@Entity({
  name: "users",
})
export class User {
  @PrimaryColumn({
    type: "uuid",
  })
  public id!: string;
  
  @Column({
    type: "text",
    unique: true,
    nullable: false,
  })
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

  @BeforeInsert()
  public generateId(): void {
    if (!this.id) {
      this.id = uuid.v7();
    }
  }
}