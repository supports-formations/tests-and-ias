import { test, expect } from '@playwright/test';
import { API_URL, makeUser, registerAndLogin, createJourneyApi } from './helpers';

// Smoke — Détail d'un voyage (F9). Parcours nominal : consulter un voyage existant
// renvoie ses informations générales et ses tableaux steps/comments (même vides).
test('un utilisateur peut consulter le détail d\'un voyage', async ({ request }) => {
  const token = await registerAndLogin(makeUser('smoke-journey-detail'));
  const { body: journey } = await createJourneyApi(token);

  const res = await request.get(`${API_URL}/journeys/${journey.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.id).toBe(journey.id);
  expect(Array.isArray(body.steps)).toBe(true);
  expect(Array.isArray(body.comments)).toBe(true);
});
