import { test, expect } from '@playwright/test';
import {
  makeUser,
  registerUser,
  loginViaUi,
  createJourneyViaUi,
  mockPlaceSearch,
  FIXTURE_PLACE,
  FIXTURE_PLACE_2,
} from './helpers';

// Feature #8 — Ajout d'une étape. Buggy feature (backend adds new steps with `unshift` instead of
// `push`, reversing insertion order — see backend/src/steps/steps.service.ts, `// BUG:`).
// This e2e test is intentionally complete and correct: it is EXPECTED TO FAIL (red) until that
// bug is fixed. Do not "fix" this test to make it pass — see docs/stats.md.
test('les étapes ajoutées apparaissent dans leur ordre d\'ajout', async ({ page }) => {
  const user = makeUser('steps-order');
  await registerUser(user);
  await mockPlaceSearch(page, [FIXTURE_PLACE]);

  await loginViaUi(page, user);
  await createJourneyViaUi(page, 'Voyage étapes ordonnées');

  await page.getByTestId('add-step-button').click();
  await page.getByTestId('step-form-name').fill('Première étape');
  await page.getByTestId('place-search-input').fill('Lyon');
  await page.getByTestId('place-search-result').first().click();
  await page.getByTestId('step-form-submit').click();
  await expect(page.getByTestId('step-card')).toHaveCount(1);

  await mockPlaceSearch(page, [FIXTURE_PLACE_2]);
  await page.getByTestId('add-step-button').click();
  await page.getByTestId('step-form-name').fill('Deuxième étape');
  await page.getByTestId('place-search-input').fill('Marseille');
  await page.getByTestId('place-search-result').first().click();
  await page.getByTestId('step-form-submit').click();
  await expect(page.getByTestId('step-card')).toHaveCount(2);

  const stepCards = page.getByTestId('step-list').getByTestId('step-card');
  await expect(stepCards.nth(0)).toContainText('Première étape');
  await expect(stepCards.nth(1)).toContainText('Deuxième étape');
});
