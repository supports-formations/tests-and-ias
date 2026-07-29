import { Module } from '@nestjs/common';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './journeys.service';
import { JourneysRepository } from './journeys.repository';

@Module({
  controllers: [JourneysController],
  providers: [JourneysService, JourneysRepository],
  exports: [JourneysRepository],
})
export class JourneysModule {}
