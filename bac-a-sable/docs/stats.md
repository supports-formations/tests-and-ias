# État des features — Carnet de voyage

Projet support de formation "Tests & IA". Certaines features sont volontairement buguées, et la
couverture de tests (unitaires backend Jest, e2e Playwright full-stack) est volontairement
incomplète et hétérogène : certaines features n'ont aucun test, d'autres n'ont que des tests
unitaires, d'autres que des tests e2e, et certains tests présents sont eux-mêmes volontairement
buggés (faux positifs ou flaky) pour servir de support pédagogique.

Bilan global : **10/16 features sans bug (62,5%)**, **7/16 features avec au moins un test (43,75%)**.

| Feature | Sans bug (O/N) | TU complets (O/N) | TU buggés (O/N) | e2e complets (O/N) | e2e buggés (O/N) |
|---|---|---|---|---|---|
| 1. Création de compte | O | O | N | N | N |
| 2. Login | O | O | N | O | N |
| 3. Récupération de mot de passe | O | N | N | N | N |
| 4. Liste des journeys | O | N | N | O | N |
| 5. Détail d'une journey | O | N | N | N | N |
| 6. Création d'une journey | N | O | N | N | N |
| 7. Modification d'une journey | N | N | O | N | N |
| 8. Ajout d'une étape | N | O | N | O | N |
| 9. Modification d'une étape | N | N | N | N | N |
| 10. Upload de photos sur une étape | O | N | N | N | N |
| 11. Recherche de lieu (géocodage) | O | N | N | N | O |
| 12. Notation d'une journey | O | N | N | N | N |
| 13. Commentaires sur une journey | O | N | N | N | N |
| 14. Commentaires sur une étape | N | N | N | N | N |
| 15. Carte — visualisation des journeys | O | N | N | N | N |
| 16. Carte — itinéraire entre destinations | N | N | N | N | N |

## Détail des bugs injectés

Chaque bug est marqué dans le code source par un commentaire `// BUG:` (grep `BUG:` dans
`backend/src`).

| # | Feature | Fichier | Description du bug |
|---|---|---|---|
| 6 | Création d'une journey | `backend/src/journeys/journeys.service.ts` | Aucune validation que `endDate >= startDate` : on peut créer un voyage qui finit avant de commencer. |
| 7 | Modification d'une journey | `backend/src/journeys/journeys.service.ts` | Le PATCH écrase/perd le tableau `steps[]` existant au lieu de le conserver. |
| 8 | Ajout d'une étape | `backend/src/steps/steps.service.ts` | Les étapes sont ajoutées avec `unshift` au lieu de `push` : l'ordre affiché est inversé par rapport à l'ordre d'ajout. |
| 9 | Modification d'une étape | `backend/src/steps/steps.service.ts` | Le champ `endDate` est silencieusement ignoré lors du PATCH d'une étape. |
| 14 | Commentaires sur une étape | `backend/src/steps/steps.service.ts` | `authorId` du commentaire n'est jamais renseigné (toujours `null`). |
| 16 | Carte — itinéraire | `backend/src/map/map.service.ts` | Les coordonnées sont envoyées à OSRM en `lat,lng` au lieu de `lng,lat` attendu par l'API : le tracé retourné est incorrect. |

## Détail des tests volontairement buggés

| # | Feature | Fichier | Pourquoi le test est buggé |
|---|---|---|---|
| 7 | Modification d'une journey (TU) | `backend/src/journeys/journeys.update.spec.ts` | Le test mocke entièrement la couche de sauvegarde en réinjectant les `steps` d'origine dans le résultat attendu : il ne passe jamais réellement par la logique de merge buguée, donc il est vert (faux positif) alors que le bug #7 est bien présent. |
| 11 | Recherche de lieu (e2e) | `e2e/tests/place-search.spec.ts` | Le test n'utilise aucun mock réseau et interroge le vrai serveur Nominatim (openstreetmap.org), en asserttant un texte exact — flaky par nature (latence, rate limiting, changement de formulation du résultat), alors que la feature elle-même n'a pas de bug. |

## Tests intentionnellement rouges (pas des faux positifs — la feature est buguée et le test le prouve)

- `backend/src/journeys/journeys.create-validation.spec.ts` (feature #6) : attend un 400 sur
  `endDate < startDate`, échoue car la validation n'existe pas.
- `backend/src/steps/steps.add-order.spec.ts` (feature #8, TU) et
  `e2e/tests/add-step-order.spec.ts` (feature #8, e2e) : attendent l'ordre d'insertion, échouent à
  cause du `unshift`.

## Comment lancer les tests

```bash
npm install
npm run test:backend       # Jest — 2 suites passent, 2 suites échouent (rouge attendu, voir ci-dessus)
npx playwright install     # une seule fois, télécharge les navigateurs
npm run e2e                # Playwright — démarre backend+frontend automatiquement
```
