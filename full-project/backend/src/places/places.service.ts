import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface PlaceResult {
  name: string;
  displayName: string;
  lat: number;
  lng: number;
}

@Injectable()
export class PlacesService {
  async search(query: string): Promise<PlaceResult[]> {
    if (!query || !query.trim()) {
      return [];
    }
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        format: 'json',
        q: query,
        limit: 5,
      },
      headers: {
        'User-Agent': 'carnet-de-voyage-training-app/1.0 (contact: evan@boissonnot.fr)',
      },
    });

    const results = Array.isArray(response.data) ? response.data : [];
    return results.slice(0, 5).map((item: any) => ({
      name: item.name || item.display_name?.split(',')[0] || query,
      displayName: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    }));
  }
}
