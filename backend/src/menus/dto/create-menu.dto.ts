import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  depth: number;

  @ApiProperty({ required: false })
  parentId?: string;
}
