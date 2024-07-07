import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getAppConfiguration } from './shared/configuration/app-config';
import typeormConfig from './shared/configuration/typeorm-config';
import { AuthenticationModule } from './authentication/authentication.module';
import { PlacesModule } from './places/places.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [getAppConfiguration, typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get('typeorm');
      },
      inject: [ConfigService],
    }),
    AuthenticationModule,
    PlacesModule,
    TransactionModule,
  ],
})
export class AppModule {}
