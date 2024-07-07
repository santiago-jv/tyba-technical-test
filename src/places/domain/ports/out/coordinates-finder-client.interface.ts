import { CoordinatesResponseDto } from "../../../../places/infrastructure/adapters/google-geocode/data-transfer-objects/coordinates-response.dto";

export interface CoordinatesFinderClient {
  findCoordinatesByAddress(
   address: string,
  ): Promise<CoordinatesResponseDto>;
}
