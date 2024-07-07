export class CoordinatesResponseDto {
  latitude: number;

  longitude: number;

  constructor(coordinates: string) {
    const [latitude, longitude] = coordinates?.split(',')?.map(Number) ?? [0,0];
    this.latitude = latitude;
    this.longitude = longitude;
  }

  static from(latitude: string, longitude: string): CoordinatesResponseDto {
    const coordinates = `${latitude},${longitude}`;
    return new CoordinatesResponseDto(coordinates);
  }
}
