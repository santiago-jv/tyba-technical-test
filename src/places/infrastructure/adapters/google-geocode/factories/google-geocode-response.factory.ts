import { NotFoundException } from '@nestjs/common';
import { CoordinatesResponseDto } from '../data-transfer-objects/coordinates-response.dto';

export class GoogleGeocodeResponseFactory {
  public static fromJsonResponse(
    json: Record<string, any>,
  ): CoordinatesResponseDto {
    if (json.results.length === 0) {
      throw new NotFoundException(
        'No coordinates found for the provided address',
      );
    }

    const result = json.results[0];
    const location = result.geometry.location;
    return CoordinatesResponseDto.from(location.lat, location.lng);
  }
}
