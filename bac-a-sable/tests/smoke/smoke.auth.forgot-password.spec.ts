import { test, expect } from '@playwright/test';
import { API_URL, makeUser, registerUser } from './helpers';

// Smoke — Récupération de mot de passe (F3). Parcours nominal : un compte existant
// demande un reset et reçoit une réponse 200 générique. Pas de test du cycle complet
// (lecture du lien, reset-password) ni du cas email inconnu.
test('une demande de reset de mot de passe pour un compte existant répond 200', async ({ request }) => {
  const user = makeUser('smoke-forgot');
  await registerUser(user);

  const res = await request.post(`${API_URL}/auth/forgot-password`, {
    data: { email: user.email },
  });

  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.message).toBe('ok');
});
