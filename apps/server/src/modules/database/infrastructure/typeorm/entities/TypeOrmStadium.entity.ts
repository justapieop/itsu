import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity({
  name: "stadium",
})
export class TypeOrmStadiumEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  public id!: string;

  @Column({
    type: "text",
  })
  @Index()
  public name!: string;
}