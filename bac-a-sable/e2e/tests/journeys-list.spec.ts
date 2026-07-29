import { test, expect } from '@playwright/test';
import { makeUser, registerUser, loginViaUi, createJourneyViaUi, mockPlaceSearch, FIXTURE_PLACE } from './helpers';

// Feature #4 — Liste des journeys. Bug-free feature, complete + reliable e2e test (docs/stats.md).
test('la liste des voyages affiche les voyages créés par l\'utilisateur', async ({ page }) => {
  const user = makeUser('journeys-list');
  await registerUser(user);
  await mockPlaceSearch(page, [FIXTURE_PLACE]);

  await loginViaUi(page, user);

  await expect(page.getByTestId('journeys-list')).toBeAttached();
  await expect(page.getByTestId('journey-card')).toHaveCount(0);

  await createJourneyViaUi(page, 'Roadtrip Sud-Est');

  await page.goto('/journeys');
  await expect(page.getByTestId('journey-card')).toHaveCount(1);
  await expect(page.getByTestId('journey-card').first()).toContainText('Roadtrip Sud-Est');
});
