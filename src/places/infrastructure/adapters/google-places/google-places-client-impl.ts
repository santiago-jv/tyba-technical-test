import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { PlacesFinderClient } from '../../../../places/domain/ports/out/places-finder-client.interface';
import { PlacesFinderRequestDto } from './data-transfer-objects/google-places-request-dto';
import { GooglePlacesResponseFactory } from './factories/google-places-response.factory';
import { PlaceItemDto } from '../../../../places/application/data-transfer-objects/places/place-item.dto';

@Injectable()
export class GooglePlacesClientImpl implements PlacesFinderClient {
  private readonly url: string;
  private readonly apiKey: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.httpService = httpService;
    this.configService = configService;
    this.url = this.configService.get('httpClients.googlePlaces.apiUrl');
    this.apiKey = this.configService.get('httpClients.googlePlaces.apiKey');
  }

  async findNearbyPlaces(
    data: PlacesFinderRequestDto,
  ): Promise<PlaceItemDto[]> {
    const response = await lastValueFrom(
      this.httpService.get(this.url, {
        params: {
          radius: data.radius,
          type: data.type,
          location: data.getLocation(),
          key: this.apiKey,
        },
      }),
    );

    return GooglePlacesResponseFactory.fromJsonResponse(response.data);
  }
}
