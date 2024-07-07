import { Module } from '@nestjs/common';
import { PlacesService } from './application/services/places.service';
import { PlacesV1Controller } from './infrastructure/controllers/v1/places-v1.controller';
import { GoogleGeocodeClientImpl } from './infrastructure/adapters/google-geocode/google-geocode-client-impl';
import { HttpModule } from '@nestjs/axios';
import { FindPlacesUseCaseImpl } from './application/use-cases/find-places-use-case-impl';
import { AuthenticationModule } from '../authentication/authentication.module';
import { GooglePlacesClientImpl } from './infrastructure/adapters/google-places/google-places-client-impl';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    HttpModule,
    AuthenticationModule,
    TransactionModule,
  ],
  controllers: [PlacesV1Controller],
  providers: [
    GoogleGeocodeClientImpl,
    FindPlacesUseCaseImpl,
    GooglePlacesClientImpl,
    PlacesService,
  ],
})
export class PlacesModule {}
