import { test, expect } from '@playwright/test';
import { API_URL, makeUser, registerAndLogin } from './helpers';

// Smoke — Recherche de lieux (F14). Parcours nominal : une recherche renvoie une
// liste de suggestions exploitable. Contrairement à e2e/tests/place-search.spec.ts,
// on n'asserte PAS le texte exact du premier résultat (dépendant de Nominatim) —
// seulement la forme de la réponse, pour éviter la flakiness connue (docs/stats.md #11).
test('la recherche de lieux renvoie des suggestions', async ({ request }) => {
  // Dépend du vrai service Nominatim (pas de mock possible côté serveur) : léger
  // dépassement du budget de 5s toléré pour cette seule route, par exception documentée.
  test.setTimeout(8_000);
  const token = await registerAndLogin(makeUser('smoke-places-search'));

  const res = await request.get(`${API_URL}/places/search?q=Paris`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
  expect(body[0]).toHaveProperty('lat');
  expect(body[0]).toHaveProperty('lng');
});
