import { ApiProperty } from '@nestjs/swagger';

export class PlaceItemDto {
  @ApiProperty({
    type: 'string',
  })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
