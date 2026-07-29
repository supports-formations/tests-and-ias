import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { RoutePointDto } from './dto/route.dto';

@Injectable()
export class MapService {
  async getRoute(points: RoutePointDto[]): Promise<{ coordinates: [number, number][] }> {
    // OSRM expects coordinates in the URL as `lng,lat` pairs.
    // BUG: coordinates are passed as `lat,lng` here (swapped), so OSRM
    // silently computes a route between the wrong geographic points
    // (feature #16).
    const coordsPath = points.map((p) => `${p.lat},${p.lng}`).join(';');

    const url = `https://router.project-osrm.org/route/v1/driving/${coordsPath}`;
    const response = await axios.get(url, {
      params: {
        overview: 'full',
        geometries: 'geojson',
      },
    });

    const geometry = response.data?.routes?.[0]?.geometry;
    const rawCoords: [number, number][] = geometry?.coordinates ?? [];

    // OSRM returns [lng, lat] pairs in the geometry; convert to [lat, lng]
    // for the API response.
    const coordinates: [number, number][] = rawCoords.map(([lng, lat]) => [lat, lng]);

    return { coordinates };
  }
}
