import { test, expect } from '@playwright/test';
import { makeUser, registerUser, loginViaUi, createJourneyViaUi, mockPlaceSearch, FIXTURE_PLACE } from './helpers';

// Smoke — Visualisation cartographique (F18). Parcours nominal : la carte se charge
// et propose le voyage créé dans le sélecteur. Pas de vérification des marqueurs
// individuels ni du contenu des popups.
test('la carte affiche le voyage créé dans le sélecteur', async ({ page }) => {
  const user = makeUser('smoke-map-view');
  await registerUser(user);
  await mockPlaceSearch(page, [FIXTURE_PLACE]);

  await loginViaUi(page, user);
  await createJourneyViaUi(page, 'Roadtrip carte');

  await page.goto('/map');
  await expect(page.getByTestId('map-journey-select')).toContainText('Roadtrip carte');
});
