import {
  Injectable,
} from '@nestjs/common';
import { FindPlacesUseCaseImpl } from '../use-cases/find-places-use-case-impl';
import { PlacesRequestDto } from '../data-transfer-objects/places/places-request.dto';
import { PlacesResponseDto } from '../data-transfer-objects/places/places-response.dto';

@Injectable()
export class PlacesService {
  constructor(private readonly findPlacesUseCase: FindPlacesUseCaseImpl) {}

  async findPlaces(params: PlacesRequestDto): Promise<PlacesResponseDto> {
    const places = await this.findPlacesUseCase.findPlaces(params);
    
    return places;
  }
}
