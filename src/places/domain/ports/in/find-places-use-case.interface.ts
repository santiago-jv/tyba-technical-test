import { PlacesRequestDto } from "../../../../places/application/data-transfer-objects/places/places-request.dto";
import { PlacesResponseDto } from "../../../../places/application/data-transfer-objects/places/places-response.dto";

export interface FindPlacesUseCase {
    findPlaces(data:PlacesRequestDto): Promise<PlacesResponseDto>;
}