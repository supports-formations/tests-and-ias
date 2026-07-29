import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JourneysModule } from './journeys/journeys.module';
import { StepsModule } from './steps/steps.module';
import { PlacesModule } from './places/places.module';
import { MapModule } from './map/map.module';

// Static file serving for /uploads is configured in main.ts via
// NestExpressApplication#useStaticAssets, so no ServeStaticModule needed.
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    JourneysModule,
    StepsModule,
    PlacesModule,
    MapModule,
  ],
})
export class AppModule {}
