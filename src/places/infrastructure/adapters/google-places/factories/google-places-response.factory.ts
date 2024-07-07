import { PlaceItemDto } from "../../../../../places/application/data-transfer-objects/places/place-item.dto";

export class GooglePlacesResponseFactory {
  public static fromJsonResponse(
    json: Record<string, any>,
  ): PlaceItemDto[] {
    const places: PlaceItemDto[] = [];

    if (json.results && Array.isArray(json.results)) {
      json.results.forEach((result: any) => {
        const place: PlaceItemDto = new PlaceItemDto(result.name);

        places.push(place);
      });
    }

    return places;
  }
}
