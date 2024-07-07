import { ApiProperty } from '@nestjs/swagger';
import { PlaceItemDto } from './place-item.dto';

export class PlacesResponseDto {
  @ApiProperty({
    type: 'string',
  })
  places: PlaceItemDto[];

  constructor(places: PlaceItemDto[]) {
    this.places = places;
  }
}
