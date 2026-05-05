import { ApiProperty, ApiExtraModels, getSchemaPath } from "@nestjs/swagger";
import { Type } from "@nestjs/common";

export class ListResponse<T> {
  @ApiProperty()
  public limit!: number;

  @ApiProperty()
  public page!: number;

  @ApiProperty({
    isArray: true,
  })
  public data!: T[];
}

export const createListResponseDto = <TModel extends Type<any>>(model: TModel) => {
  @ApiExtraModels(model)
  class ListResponseDto {
    @ApiProperty()
    public limit!: number;

    @ApiProperty()
    public page!: number;

    @ApiProperty({
      type: "array",
      items: { $ref: getSchemaPath(model), },
    })
    public data!: InstanceType<TModel>[];
  }

  return ListResponseDto;
};