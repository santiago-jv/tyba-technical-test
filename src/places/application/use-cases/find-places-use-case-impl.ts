import { Injectable } from '@nestjs/common';
import { FindPlacesUseCase } from '../../../places/domain/ports/in/find-places-use-case.interface';
import { PlacesResponseDto } from '../data-transfer-objects/places/places-response.dto';
import { PlacesRequestDto } from '../data-transfer-objects/places/places-request.dto';
import { GoogleGeocodeClientImpl } from '../../../places/infrastructure/adapters/google-geocode/google-geocode-client-impl';
import { GooglePlacesClientImpl } from '../../../places/infrastructure/adapters/google-places/google-places-client-impl';
import { PlacesFinderRequestDto } from '../../../places/infrastructure/adapters/google-places/data-transfer-objects/google-places-request-dto';
import { CoordinatesResponseDto } from '../../../places/infrastructure/adapters/google-geocode/data-transfer-objects/coordinates-response.dto';
import { TransactionService } from '../../../transaction/application/services/transaction.service';

@Injectable()
export class FindPlacesUseCaseImpl implements FindPlacesUseCase {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly coordinatesFinderClient: GoogleGeocodeClientImpl,
    private readonly placesFinderClient: GooglePlacesClientImpl,
  ) {}

  async findPlaces(data: PlacesRequestDto): Promise<PlacesResponseDto> {
    let coordinates = new CoordinatesResponseDto(data.coordinates);

    if (data.city) {
      coordinates = await this.coordinatesFinderClient.findCoordinatesByAddress(
        data.city,
      );
    }

    const places = await this.placesFinderClient.findNearbyPlaces(
      new PlacesFinderRequestDto(
        coordinates.latitude,
        coordinates.longitude,
        data.searchRadius,
        data.type,
      ),
    );

    await this.transactionService.createTransaction({
      resultsFound: places.length,
      response: JSON.stringify(places),
      request: JSON.stringify(data),
      url: 'api/v1/places/nearby',
    });

    return new PlacesResponseDto(places);
  }
}
