import type { TestUser } from '../../e2e/tests/helpers';

export const API_URL = 'http://localhost:3000/api';

type FetchLike = typeof fetch;

// Re-exported so every smoke spec can import everything from one place.
export { makeUser, registerUser, loginViaUi, createJourneyViaUi, mockPlaceSearch, FIXTURE_PLACE, FIXTURE_PLACE_2 } from '../../e2e/tests/helpers';
export type { TestUser } from '../../e2e/tests/helpers';

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`${res.status} ${res.url}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

// Registers + logs in a fresh user directly via the API (fast, no UI round-trip)
// and returns the bearer token most smoke tests need to hit protected endpoints.
// The optional fetch implementation makes this helper easy to stub in tests instead of
// always hitting the network.
export async function registerAndLogin(user: TestUser, fetchImpl: FetchLike = fetch): Promise<string> {
  await fetchImpl(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const res = await fetchImpl(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user.email, password: user.password }),
  });
  const body = await json<{ accessToken: string }>(res);
  return body.accessToken;
}

export async function createJourneyApi(token: string, overrides: Record<string, unknown> = {}, fetchImpl: FetchLike = fetch) {
  const res = await fetchImpl(`${API_URL}/journeys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      title: 'Roadtrip smoke test',
      startDate: '2026-08-01',
      endDate: '2026-08-10',
      destination: { name: 'Lyon', lat: 45.75, lng: 4.85 },
      ...overrides,
    }),
  });
  return { res, body: res.ok ? await json(res) : null };
}

export async function addStepApi(token: string, journeyId: string, overrides: Record<string, unknown> = {}, fetchImpl: FetchLike = fetch) {
  const res = await fetchImpl(`${API_URL}/journeys/${journeyId}/steps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      name: 'Étape smoke test',
      placeName: 'Lyon',
      lat: 45.75,
      lng: 4.85,
      ...overrides,
    }),
  });
  return { res, body: res.ok ? await json(res) : null };
}
