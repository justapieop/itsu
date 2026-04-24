import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity({
  name: "courts",
})
export class TypeOrmCourtEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  public id!: string;

  @Column({
    type: "text",
  })
  @Index()
  public name!: string;

  @Column({
    type: "real",
    nullable: false,
  })
  public latitude!: number;

  @Column({
    type: "real",
    nullable: false,
  })
  public longitude!: number;

  @Column({
    type: "text",
    nullable: false,
  })
  @Index()
  public address!: string;
}