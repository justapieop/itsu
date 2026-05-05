import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CourtAddDto {
  @IsString()
  @ApiProperty()
  public name!: string;

  @IsNumber()
  @ApiProperty()
  public latitude!: number;

  @IsNumber()
  @ApiProperty()
  public longitude!: number;
  
  @IsString()
  @ApiProperty()
  public address!: string;

  @IsString()
  @ApiProperty()
  public terms!: string;
  
  @IsNumber()
  @ApiProperty({ name: "min_hours_per_session", })
  @Expose({ name: "min_hours_per_session", })
  public minHoursPerSession!: number;
}