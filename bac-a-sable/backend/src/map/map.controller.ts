import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MapService } from './map.service';
import { RouteDto } from './dto/route.dto';

@Controller('map')
@UseGuards(JwtAuthGuard)
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Post('route')
  getRoute(@Body() dto: RouteDto) {
    return this.mapService.getRoute(dto.points);
  }
}
