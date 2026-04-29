import { Column, CreateDateColumn, Entity, Index, OneToOne, PrimaryColumn } from "typeorm";
import { TypeOrmCourtEntity } from "../../court/infrastructure/TypeOrmCourt.entity";
import { TypeormUserEntity } from "../../user/infrastructure/typeorm/TypeOrmUser.entity";

@Entity()
export class TypeOrmBookingEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  public id!: string;

  @OneToOne(() => TypeOrmCourtEntity)
  @Column({
    type: "uuid",
    nullable: false,
    name: "court_id",
  })
  @Index()
  public courtId!: string;

  @OneToOne(() => TypeormUserEntity)
  @Column({
    type: "uuid",
    nullable: false,
    name: "user_id",
  })
  @Index()
  public userId!: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
  })
  public createdAt!: Date;
}