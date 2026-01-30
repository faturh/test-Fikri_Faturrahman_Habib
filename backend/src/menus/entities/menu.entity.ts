import { ApiProperty } from '@nestjs/swagger';

export class Menu {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  depth: number;

  @ApiProperty({ required: false, nullable: true })
  parentId: string | null;

  @ApiProperty({ required: false })
  children?: Menu[];
}
