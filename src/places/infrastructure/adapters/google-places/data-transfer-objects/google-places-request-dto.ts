export class PlacesFinderRequestDto {
  latitude: number;
  longitude: number;
  radius: number;
  type: string;

  constructor(
    latitude: number,
    longitude: number,
    radius: number,
    type: string,
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.radius = radius;
    this.type = type;
  }

  public getLocation(): string {
    return `${this.latitude},${this.longitude}`;
  }
}
