import { Module } from '@nestjs/common';
import { JourneysModule } from '../journeys/journeys.module';
import { StepsController } from './steps.controller';
import { StepsService } from './steps.service';

@Module({
  imports: [JourneysModule],
  controllers: [StepsController],
  providers: [StepsService],
})
export class StepsModule {}
