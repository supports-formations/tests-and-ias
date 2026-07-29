import { test, expect } from '@playwright/test';
import { makeUser, registerAndLogin, createJourneyApi, addStepApi } from './helpers';

// Smoke — Ajout d'une étape (F13). Parcours nominal : ajouter une étape à un voyage
// existant l'ajoute bien à sa liste steps[]. Pas de vérification de l'ordre d'insertion
// (couvert séparément par e2e/tests/add-step-order.spec.ts, hors périmètre smoke).
test('un utilisateur peut ajouter une étape à un voyage', async () => {
  const token = await registerAndLogin(makeUser('smoke-step-add'));
  const { body: journey } = await createJourneyApi(token);

  const { res, body } = await addStepApi(token, journey.id, { name: 'Étape 1' });

  expect(res.status).toBe(201);
  expect(body.steps).toHaveLength(1);
  expect(body.steps[0].name).toBe('Étape 1');
});
