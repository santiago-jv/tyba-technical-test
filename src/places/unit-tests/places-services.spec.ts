import { Test, TestingModule } from '@nestjs/testing';
import { PlacesRequestDto } from '../application/data-transfer-objects/places/places-request.dto';
import { PlacesResponseDto } from '../application/data-transfer-objects/places/places-response.dto';
import { PlacesService } from '../application/services/places.service';
import { FindPlacesUseCaseImpl } from '../application/use-cases/find-places-use-case-impl';
import { GooglePlaceType } from '../infrastructure/adapters/google-places/enums/google-place-type.enum';

describe('PlacesService', () => {
  let service: PlacesService;
  let findPlacesUseCase: FindPlacesUseCaseImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        {
          provide: FindPlacesUseCaseImpl,
          useValue: {
            findPlaces: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
    findPlacesUseCase = module.get<FindPlacesUseCaseImpl>(FindPlacesUseCaseImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPlaces', () => {
    it('should return places when findPlacesUseCase with city returns places', async () => {
      const mockParams: PlacesRequestDto = {
       type: GooglePlaceType.Restaurant,
       city: 'Bogota',
       searchRadius: 1000,
      };

      const mockPlaces: PlacesResponseDto = {
        places: [
          {
            name: 'Mock Place',
          },
        ],
      };

      jest.spyOn(findPlacesUseCase, 'findPlaces').mockResolvedValue(mockPlaces);

      const result = await service.findPlaces(mockParams);

      expect(result).toEqual(mockPlaces);
    });
    it('should return places when findPlacesUseCase with coordinates returns places', async () => {
        const mockParams: PlacesRequestDto = {
         type: GooglePlaceType.Restaurant,
         coordinates:'4.60971,-74.08175',
         searchRadius: 1000,
        };
  
        const mockPlaces: PlacesResponseDto = {
          places: [
            {
              name: 'Mock Place',
            },
          ],
        };
  
        jest.spyOn(findPlacesUseCase, 'findPlaces').mockResolvedValue(mockPlaces);
  
        const result = await service.findPlaces(mockParams);
  
        expect(result).toEqual(mockPlaces);
      });
  });
});
