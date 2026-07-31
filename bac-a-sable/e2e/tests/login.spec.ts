import { test, expect } from '@playwright/test';
import { makeUser, registerUser, loginViaUi } from './helpers';

// Feature #2 — Login. Bug-free feature, complete + reliable e2e test (docs/stats.md).
test('un utilisateur peut se connecter et accéder à la liste de ses voyages persos', async ({ page }) => {
  const user = makeUser('login');
  await registerUser(user);

  await loginViaUi(page, user);

  await expect(page).toHaveURL(/\/journeys$/);
  await expect(page.getByRole('heading', { name: 'Mes voyages' })).toBeVisible();
});

test('un mot de passe invalide affiche une erreur et ne connecte pas', async ({ page }) => {
  const user = makeUser('login-fail');
  await registerUser(user);

  await page.goto('/login');
  await page.getByTestId('login-email').fill(user.email);
  await page.getByTestId('login-password').fill('wrong-password');
  await page.getByTestId('login-submit').click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.locator('.form-error')).toBeVisible();
});
