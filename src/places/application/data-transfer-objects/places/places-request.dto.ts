import { ApiProperty } from '@nestjs/swagger';
import { GooglePlaceType } from '../../../../places/infrastructure/adapters/google-places/enums/google-place-type.enum';

export class PlacesRequestDto {
  @ApiProperty({
    type: 'string',
    enum: GooglePlaceType,
  })
  type: GooglePlaceType;

  @ApiProperty({
    type: 'string',
  })
  city?: string;

  @ApiProperty({
    type: 'string',
  })
  coordinates?: string;

  @ApiProperty({
    type: 'number',
  })
  searchRadius?: number;

  constructor(
    city?: string,
    coordinates?: string,
    type?: GooglePlaceType,
    searchRadius?: number,
  ) {
    this.city = city;
    this.coordinates = coordinates;
    this.type = type;
    this.searchRadius = searchRadius;
  }
}
