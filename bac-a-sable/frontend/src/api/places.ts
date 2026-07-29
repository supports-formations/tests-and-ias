import { apiRequest } from './client';
import type { PlaceResult } from '../types';

export function searchPlaces(q: string): Promise<PlaceResult[]> {
  return apiRequest<PlaceResult[]>(`/places/search?q=${encodeURIComponent(q)}`);
}
