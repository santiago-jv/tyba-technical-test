import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { PlacesRequestDto } from '../../../../places/application/data-transfer-objects/places/places-request.dto';
import { PlacesService } from '../../../../places/application/services/places.service';
import { OpenApiTags } from '../../../../shared/open-api/api-tags';
import { GooglePlaceType } from '../../adapters/google-places/enums/google-place-type.enum';
import { HttpJwtGuard } from '../../../../shared/authentication/guards/http-jwt.guard';
import { PlacesResponseDto } from '../../../../places/application/data-transfer-objects/places/places-response.dto';

@ApiTags(OpenApiTags.Places)
@Controller('v1/places')
@UseGuards(HttpJwtGuard)
export class PlacesV1Controller {
  constructor(private readonly placesService: PlacesService) {}

  @Get('nearby')
  @ApiBearerAuth()
  @ApiQuery({ name: 'city', required: false, type: String })
  @ApiQuery({ name: 'coordinates', required: false, type: String })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: GooglePlaceType,
    enumName: 'GooglePlaceType',
  })
  @ApiQuery({ name: 'search_radius', required: false, type: Number })
  async searchNearbyPlaces(
    @Query('city') city?: string,
    @Query('coordinates') coordinates?: string,
    @Query('type') type?: GooglePlaceType,
    @Query('search_radius') searchRadius?: number,
  ): Promise<PlacesResponseDto> {
    const requestData = new PlacesRequestDto(
      city,
      coordinates,
      type ?? GooglePlaceType.Restaurant,
      searchRadius ?? 1000,
    );

    return this.placesService.findPlaces(requestData);
  }
}
