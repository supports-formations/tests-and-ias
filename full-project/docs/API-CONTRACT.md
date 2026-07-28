# Contrat d'API — Carnet de voyage

Backend NestJS exposé sur `http://localhost:3000/api`. Toutes les routes protégées attendent
`Authorization: Bearer <jwt>`. Toutes les dates sont des chaînes ISO 8601 (`YYYY-MM-DD`).

## Auth

### POST /api/auth/register
Body: `{ email, password, name }`
201 → `{ id, email, name }`
409 si l'email existe déjà.

### POST /api/auth/login
Body: `{ email, password }`
200 → `{ accessToken, user: { id, email, name } }`
401 si identifiants invalides.

### POST /api/auth/forgot-password
Body: `{ email }`
200 → `{ message: "ok" }` (toujours 200 même si l'email n'existe pas, pour ne pas divulguer l'existence du compte)
Effet de bord : écrit un fichier `data/mails/{timestamp}-{email}.md` contenant le lien de reset
(`http://localhost:5173/reset-password?token=...`) et logge le lien en console. Pas d'envoi réel.

### POST /api/auth/reset-password
Body: `{ token, newPassword }`
200 → `{ message: "ok" }`
400 si token invalide ou expiré (expiration : 1h).

## Journeys

### GET /api/journeys
Auth requise. Retourne la liste des journeys de l'utilisateur connecté.
200 → `Journey[]` (sans le détail des steps, juste résumé : id, title, startDate, endDate, destination, rating)

### GET /api/journeys/:id
200 → `Journey` complet (avec steps[], comments[])

### POST /api/journeys
Body: `{ title, startDate, endDate, destination: { name, lat, lng } }`
201 → `Journey`
400 si `endDate < startDate` (validation attendue — voir bug injecté feature #6).

### PATCH /api/journeys/:id
Body: partiel `{ title?, startDate?, endDate?, destination?, rating? }`
200 → `Journey` mis à jour (voir bug injecté feature #7 : les steps ne doivent PAS être perdus).

### POST /api/journeys/:id/comments
Body: `{ author, text }`
201 → `Journey` mis à jour avec le nouveau commentaire dans `comments[]`.

## Steps

### POST /api/journeys/:journeyId/steps
Body: `{ name, placeName, lat, lng, startDate?, endDate? }`
201 → `Journey` mis à jour avec le nouveau step ajouté **à la fin** de `steps[]`
(voir bug injecté feature #8 : ne doit pas être ajouté en tête).

### PATCH /api/journeys/:journeyId/steps/:stepId
Body: partiel `{ name?, placeName?, lat?, lng?, startDate?, endDate? }`
200 → `Journey` mis à jour (voir bug injecté feature #9 : `endDate` doit bien être pris en compte).

### POST /api/journeys/:journeyId/steps/:stepId/photos
`multipart/form-data`, champ `file`.
201 → `Journey` mis à jour, photo ajoutée à `steps[i].photos[]` (chemin relatif `/uploads/...`).

### POST /api/journeys/:journeyId/steps/:stepId/comments
Body: `{ author, text }`
201 → `Journey` mis à jour avec le commentaire ajouté à `steps[i].comments[]`, incluant `authorId`
(voir bug injecté feature #14 : `authorId` ne doit pas être `null`).

## Places (géocodage)

### GET /api/places/search?q=paris
Proxy vers Nominatim (`https://nominatim.openstreetmap.org/search`).
200 → `Array<{ name, displayName, lat, lng }>` (max 5 résultats)

## Map (itinéraire)

### POST /api/map/route
Body: `{ points: Array<{ lat, lng }> }` (dans l'ordre de visite)
Proxy vers OSRM (`https://router.project-osrm.org/route/v1/driving/...`).
200 → `{ coordinates: Array<[lat, lng]> }` — polyline de l'itinéraire
(voir bug injecté feature #16 : attention à l'ordre lng,lat attendu par OSRM en interne).

## Types partagés

```ts
type Journey = {
  id: string;
  ownerId: string;
  title: string;
  startDate: string;
  endDate: string;
  destination: { name: string; lat: number; lng: number };
  rating: number | null;
  comments: Array<{ id: string; author: string; text: string; createdAt: string }>;
  steps: Step[];
};

type Step = {
  id: string;
  name: string;
  placeName: string;
  lat: number;
  lng: number;
  startDate: string | null;
  endDate: string | null;
  photos: string[];
  comments: Array<{ id: string; author: string; authorId: string; text: string; createdAt: string }>;
};
```
