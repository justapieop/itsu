import { Column, CreateDateColumn, Entity, Index, OneToOne, PrimaryColumn } from "typeorm";
import { TypeOrmCourtEntity } from "../../court/infrastructure/typeorm/TypeOrmCourt.entity";
import { TypeormUserEntity } from "../../user/infrastructure/typeorm/TypeOrmUser.entity";
import { User } from "../../user/domain/User";
import { Court } from "../../court/domain/Court";

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
  public court!: Court;

  @OneToOne(() => TypeormUserEntity)
  @Column({
    type: "uuid",
    nullable: false,
    name: "user_id",
  })
  @Index()
  public user!: User;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
  })
  public createdAt!: Date;
}