import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class Court {
  @ApiProperty()
  public id!: string;

  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public latitude!: number;

  @ApiProperty()
  public longitude!: number;
  
  @ApiProperty()
  public address!: string;

  @ApiProperty({ name: "created_at", })
  @Expose({ name: "created_at", })
  public createdAt!: Date;

  @ApiProperty()
  public open!: boolean;

  @ApiProperty()
  public terms!: string;

  @ApiProperty({ name: "min_hours_per_session", })
  @Expose({ name: "min_hours_per_session", })
  public minHoursPerSession!: number;
}