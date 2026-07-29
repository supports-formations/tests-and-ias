import type { Page } from '@playwright/test';

const API_URL = 'http://localhost:3000/api';

export function uniqueEmail(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}@example.com`;
}

export type TestUser = { email: string; password: string; name: string };

export function makeUser(prefix: string): TestUser {
  return { email: uniqueEmail(prefix), password: 'Password123!', name: `Test ${prefix}` };
}

// Registers a user directly via the API (fast, avoids re-testing the register UI in every spec).
export async function registerUser(user: TestUser) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error(`register failed: ${res.status} ${await res.text()}`);
}

// Mocks the geocoding proxy so journey/step creation flows are deterministic and don't depend
// on the real Nominatim network in tests that must be reliable (see docs/stats.md feature #11
// for the one test that intentionally does NOT use this mock).
export async function mockPlaceSearch(page: Page, results: Array<{ name: string; displayName: string; lat: number; lng: number }>) {
  await page.route('**/api/places/search**', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(results) });
  });
}

export const FIXTURE_PLACE = {
  name: 'Lyon',
  displayName: 'Lyon, Auvergne-Rhône-Alpes, France',
  lat: 45.75,
  lng: 4.85,
};

export const FIXTURE_PLACE_2 = {
  name: 'Marseille',
  displayName: 'Marseille, Provence-Alpes-Côte d\'Azur, France',
  lat: 43.2965,
  lng: 5.3698,
};

export async function loginViaUi(page: Page, user: TestUser) {
  await page.goto('/login');
  await page.getByTestId('login-email').fill(user.email);
  await page.getByTestId('login-password').fill(user.password);
  await page.getByTestId('login-submit').click();
  await page.waitForURL('**/journeys');
}

export async function createJourneyViaUi(page: Page, title: string) {
  await page.getByTestId('create-journey-button').click();
  await page.waitForURL('**/journeys/new');
  await page.getByTestId('journey-form-title').fill(title);
  await page.getByTestId('journey-form-startDate').fill('2026-08-01');
  await page.getByTestId('journey-form-endDate').fill('2026-08-10');
  await page.getByTestId('place-search-input').fill('Lyon');
  await page.getByTestId('place-search-result').first().click();
  await page.getByTestId('journey-form-submit').click();
  await page.waitForURL(/\/journeys\/[^/]+$/);
}
