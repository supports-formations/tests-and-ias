import { apiRequest } from './client';
import type { RouteResult } from '../types';

export function getRoute(points: Array<{ lat: number; lng: number }>): Promise<RouteResult> {
  return apiRequest<RouteResult>('/map/route', {
    method: 'POST',
    body: { points },
  });
}
