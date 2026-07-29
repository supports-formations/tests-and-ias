import { test, expect } from '@playwright/test';
import { makeUser, registerUser, loginViaUi, createJourneyViaUi, mockPlaceSearch, FIXTURE_PLACE } from './helpers';

// Smoke — Consultation de la liste des voyages (F7). Parcours nominal : un voyage
// créé apparaît dans la liste. Pas de test de tri, pagination, ou liste vide.
test('la liste des voyages affiche le voyage créé', async ({ page }) => {
  const user = makeUser('smoke-journeys-list');
  await registerUser(user);
  await mockPlaceSearch(page, [FIXTURE_PLACE]);

  await loginViaUi(page, user);
  await createJourneyViaUi(page, 'Roadtrip Sud-Est');

  await page.goto('/journeys');
  await expect(page.getByTestId('journey-card')).toHaveCount(1);
});
