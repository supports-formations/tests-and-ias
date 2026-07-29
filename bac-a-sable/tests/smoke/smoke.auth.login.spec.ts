import { test, expect } from '@playwright/test';
import { makeUser, registerUser, loginViaUi } from './helpers';

// Smoke — Connexion (F2). Parcours nominal uniquement : login avec des identifiants
// valides doit mener à l'espace personnel. Pas de variantes (mdp invalide, etc.).
test('un utilisateur peut se connecter et accéder à la liste de ses voyages', async ({ page }) => {
  const user = makeUser('smoke-login');
  await registerUser(user);

  await loginViaUi(page, user);

  await expect(page).toHaveURL(/\/journeys$/);
  await expect(page.getByRole('heading', { name: 'Mes voyages' })).toBeVisible();
});
