import { test, expect } from '@playwright/test';
import { API_URL, makeUser, registerAndLogin, createJourneyApi, addStepApi } from './helpers';

// Smoke — Modification d'un voyage (F10). Parcours nominal : modifier le titre d'un
// voyage qui a déjà une étape ne doit pas faire perdre cette étape.
// NB : bug connu #7 (docs/stats.md) — le PATCH écrase steps[]. Ce test est donc
// attendu rouge tant que le bug n'est pas corrigé, ce qui est le comportement souhaité
// pour un smoke test (il détecte une régression sur un parcours nominal critique).
test('modifier un voyage conserve ses étapes existantes', async ({ request }) => {
  const token = await registerAndLogin(makeUser('smoke-journey-update'));
  const { body: journey } = await createJourneyApi(token);
  await addStepApi(token, journey.id);

  const res = await request.patch(`${API_URL}/journeys/${journey.id}`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { title: 'Titre modifié' },
  });

  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.title).toBe('Titre modifié');
  expect(body.steps).toHaveLength(1);
});
