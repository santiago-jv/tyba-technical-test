import { PlaceItemDto } from "../../../../places/application/data-transfer-objects/places/place-item.dto";
import { PlacesFinderRequestDto } from "../../../../places/infrastructure/adapters/google-places/data-transfer-objects/google-places-request-dto";

export interface PlacesFinderClient {
  findNearbyPlaces(
    data:PlacesFinderRequestDto
  ): Promise< PlaceItemDto[]>;
}
