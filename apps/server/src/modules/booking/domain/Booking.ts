import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class Booking {
  @ApiProperty()
  public id!: string;

  @ApiProperty({
    name: "court_id",
  })
  @Expose({ name: "court_id", })
  public courtId!: string;

  @ApiProperty({
    name: "user_id",
  })
  @Expose({
    name: "userId",
  })
  public userId!: string;
}