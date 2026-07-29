import { test, expect } from '@playwright/test';
import { API_URL, makeUser, registerAndLogin, createJourneyApi, addStepApi } from './helpers';

// Smoke — Ajout de photo à une étape (F16). Parcours nominal : uploader un fichier
// sur une étape existante l'ajoute à photos[]. Pas de test des formats/tailles limites.
test('un utilisateur peut ajouter une photo à une étape', async ({ request }) => {
  const token = await registerAndLogin(makeUser('smoke-step-photo'));
  const { body: journey } = await createJourneyApi(token);
  const { body: withStep } = await addStepApi(token, journey.id);
  const stepId = withStep.steps[0].id;

  const res = await request.post(`${API_URL}/journeys/${journey.id}/steps/${stepId}/photos`, {
    headers: { Authorization: `Bearer ${token}` },
    multipart: {
      file: {
        name: 'smoke.png',
        mimeType: 'image/png',
        buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47]),
      },
    },
  });

  expect(res.status()).toBe(201);
  const body = await res.json();
  const updatedStep = body.steps.find((s: { id: string }) => s.id === stepId);
  expect(updatedStep.photos).toHaveLength(1);
});
