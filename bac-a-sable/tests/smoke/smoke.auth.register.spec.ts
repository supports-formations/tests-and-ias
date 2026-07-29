import { test, expect } from '@playwright/test';
import { API_URL } from './helpers';

// Smoke — Inscription (F1). Parcours nominal : POST /auth/register avec un email
// inédit renvoie 201 et l'utilisateur créé. Pas de test du cas "email déjà utilisé".
test('un nouvel utilisateur peut s\'inscrire', async ({ request }) => {
  const email = `smoke-register-${Date.now()}@example.com`;

  const res = await request.post(`${API_URL}/auth/register`, {
    data: { email, password: 'Password123!', name: 'Smoke Register' },
  });

  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body).toMatchObject({ email, name: 'Smoke Register' });
  expect(body.id).toBeTruthy();
});
