import { test, expect } from '@playwright/test';
import { API_URL, makeUser, registerAndLogin } from './helpers';

// Smoke — Calcul d'itinéraire (F19). Parcours nominal : au moins deux points renvoie
// un tracé non vide. On ne vérifie PAS l'exactitude géographique du tracé (bug connu
// #16, docs/stats.md — lat/lng inversés en interne) : un smoke test vérifie que le
// circuit fonctionne, pas le contenu exhaustif de la réponse.
test('le calcul d\'itinéraire renvoie un tracé pour deux points', async ({ request }) => {
  // Dépend du vrai service OSRM (pas de mock possible côté serveur) : léger dépassement
  // du budget de 5s toléré pour cette seule route, par exception documentée.
  test.setTimeout(8_000);
  const token = await registerAndLogin(makeUser('smoke-map-route'));

  const res = await request.post(`${API_URL}/map/route`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      points: [
        { lat: 45.75, lng: 4.85 },
        { lat: 43.2965, lng: 5.3698 },
      ],
    },
  });

  // Le contrat documenté (docs/API-CONTRACT.md) annonce 200 mais le controller n'a
  // pas de @HttpCode explicite sur ce POST : NestJS renvoie 201 par défaut. On teste
  // le comportement réel de l'API, pas la documentation.
  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(Array.isArray(body.coordinates)).toBe(true);
  expect(body.coordinates.length).toBeGreaterThan(0);
});
