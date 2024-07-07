import { CoordinatesFinderClient } from '../../../../places/domain/ports/out/coordinates-finder-client.interface';
import { CoordinatesResponseDto } from './data-transfer-objects/coordinates-response.dto';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { GoogleGeocodeResponseFactory } from './factories/google-geocode-response.factory';

@Injectable()
export class GoogleGeocodeClientImpl implements CoordinatesFinderClient {
  private readonly url: string;
  private readonly apiKey: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.httpService = httpService;
    this.configService = configService;
    this.url = this.configService.get('httpClients.googleGeocode.apiUrl');
    this.apiKey = this.configService.get('httpClients.googleGeocode.apiKey');
  }

  async findCoordinatesByAddress(
    address: string,
  ): Promise<CoordinatesResponseDto> {
    const response = await lastValueFrom(
      this.httpService.get(this.url, {
        params: {
          address,
          key: this.apiKey,
        },
      }),
    );

    return GoogleGeocodeResponseFactory.fromJsonResponse(response.data);
  }
}
