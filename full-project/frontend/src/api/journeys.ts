import { apiRequest, API_URL } from './client';
import type { Journey, JourneySummary, Destination } from '../types';

export type JourneyInput = {
  title: string;
  startDate: string;
  endDate: string;
  destination: Destination;
};

export function listJourneys(): Promise<JourneySummary[]> {
  return apiRequest<JourneySummary[]>('/journeys');
}

export function getJourney(id: string): Promise<Journey> {
  return apiRequest<Journey>(`/journeys/${id}`);
}

export function createJourney(input: JourneyInput): Promise<Journey> {
  return apiRequest<Journey>('/journeys', { method: 'POST', body: input });
}

export function updateJourney(id: string, input: Partial<JourneyInput & { rating: number }>): Promise<Journey> {
  return apiRequest<Journey>(`/journeys/${id}`, { method: 'PATCH', body: input });
}

export function addJourneyComment(id: string, author: string, text: string): Promise<Journey> {
  return apiRequest<Journey>(`/journeys/${id}/comments`, {
    method: 'POST',
    body: { author, text },
  });
}

export type StepInput = {
  name: string;
  placeName: string;
  lat: number;
  lng: number;
  startDate?: string;
  endDate?: string;
};

export function addStep(journeyId: string, input: StepInput): Promise<Journey> {
  return apiRequest<Journey>(`/journeys/${journeyId}/steps`, {
    method: 'POST',
    body: input,
  });
}

export function updateStep(
  journeyId: string,
  stepId: string,
  input: Partial<StepInput>,
): Promise<Journey> {
  return apiRequest<Journey>(`/journeys/${journeyId}/steps/${stepId}`, {
    method: 'PATCH',
    body: input,
  });
}

export function addStepComment(
  journeyId: string,
  stepId: string,
  author: string,
  text: string,
): Promise<Journey> {
  return apiRequest<Journey>(`/journeys/${journeyId}/steps/${stepId}/comments`, {
    method: 'POST',
    body: { author, text },
  });
}

export async function uploadStepPhoto(
  journeyId: string,
  stepId: string,
  file: File,
): Promise<Journey> {
  const form = new FormData();
  form.append('file', file);
  return apiRequest<Journey>(`/journeys/${journeyId}/steps/${stepId}/photos`, {
    method: 'POST',
    body: form,
    isFormData: true,
  });
}

export function photoUrl(path: string): string {
  if (path.startsWith('http')) return path;
  // API_URL includes trailing /api, uploads are served from server root
  const origin = API_URL.replace(/\/api\/?$/, '');
  return `${origin}${path}`;
}
