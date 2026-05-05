import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from "typeorm";

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

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
  })
  public createdAt!: Date;

  @Column({
    type: "boolean",
    nullable: false,
    default: false,
  })
  public open!: boolean;

  @Column({
    type: "text",
    nullable: false,
    default: ""
  })
  public terms!: string;

  @Column({
    type: "float4",
    nullable: false,
    default: 1,
    name: "min_hours_per_session"
  })
  public minHoursPerSession!: number;
}