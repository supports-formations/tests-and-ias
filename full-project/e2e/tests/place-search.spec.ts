import { test, expect } from '@playwright/test';
import { makeUser, registerUser, loginViaUi } from './helpers';

// Feature #11 — Recherche de lieu (géocodage). The FEATURE itself is bug-free (real working
// Nominatim proxy). This TEST, however, is intentionally buggy (docs/stats.md): unlike the other
// e2e specs it does NOT mock `/api/places/search` and hits the real openstreetmap.org network,
// and asserts on the exact display text of the first result — both make it flaky/environment
// -dependent (network latency, rate limiting, or OSM changing its result wording can all break
// it) even though nothing is wrong with the app. Do not "fix" this by adding a mock — the point
// is for trainees to recognize and fix this class of test smell themselves.
test('la recherche de lieu propose Paris comme résultat', async ({ page }) => {
  const user = makeUser('place-search');
  await registerUser(user);
  await loginViaUi(page, user);

  await page.goto('/journeys/new');
  await page.getByTestId('place-search-input').fill('Paris');

  // No mock, no explicit wait for the debounce/network round-trip beyond the default assertion
  // timeout — real-world flakiness by design.
  await expect(page.getByTestId('place-search-result').first()).toHaveText(
    'Paris, Île-de-France, France métropolitaine, France',
  );
});
