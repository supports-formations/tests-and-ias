import { test, expect } from '@playwright/test';
import { API_URL, makeUser, registerAndLogin, createJourneyApi } from './helpers';

// Smoke — Commentaire sur un voyage (F12). Parcours nominal : ajouter un commentaire
// à un voyage existant l'ajoute à comments[]. Le commentaire sur étape (F17) partage
// le même circuit (route sœur) et n'est pas testé séparément dans le smoke set.
test('un utilisateur peut ajouter un commentaire à un voyage', async ({ request }) => {
  const token = await registerAndLogin(makeUser('smoke-comment-add'));
  const { body: journey } = await createJourneyApi(token);

  const res = await request.post(`${API_URL}/journeys/${journey.id}/comments`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { author: 'Smoke Tester', text: 'Super voyage !' },
  });

  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body.comments).toHaveLength(1);
  expect(body.comments[0].text).toBe('Super voyage !');
});
