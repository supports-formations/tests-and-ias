import { test, expect } from '@playwright/test';
import { API_URL, makeUser, registerAndLogin } from './helpers';

// Smoke — Création d'un voyage (F8). Parcours nominal : un utilisateur authentifié
// crée un voyage avec des dates valides. Pas de test des règles de validation
// (endDate < startDate, champs manquants).
test('un utilisateur peut créer un voyage intéressant', async ({ request }) => {
  const token = await registerAndLogin(makeUser('smoke-journey-create'));

  const res = await request.post(`${API_URL}/journeys`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      title: 'Roadtrip Sud-Est',
      startDate: '2026-08-01',
      endDate: '2026-08-10',
      destination: { name: 'Lyon', lat: 45.75, lng: 4.85 },
    },
  });

  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body).toMatchObject({ title: 'Roadtrip Sud-Est' });
  expect(body.id).toBeTruthy();
});
