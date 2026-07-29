# Carte du terrain — l'oracle du formateur

> **Document formateur. Ne jamais distribuer.**
> C'est la vérité de référence du dépôt *Carnet de voyage* : ce qui est sain, ce qui n'est pas
> testé, ce qui ment, ce qui est bugué. Toutes les notions et tous les cols s'y réfèrent.
> Source : `docs/stats.md` et `docs/API-CONTRACT.md` du dépôt.

---

## 1. Le chiffre d'ouverture

**16 fonctionnalités · 10 sans bug (62,5 %) · 7 avec au moins un test (43,75 %)**
→ **9 fonctionnalités sur 16 n'ont aucun test. 6 portent un bug.**

C'est le chiffre à projeter au Brief du J1. Il n'est ni catastrophique ni rassurant :
il est **réaliste**. C'est l'état de la plupart des produits qu'on reprend.

---

## 2. La carte complète — 16 fonctionnalités × 6 zones × 4 états

Légende : 🟢 sain et testé · ⚪ non testé · 🟡 testé mais le test ment · 🔴 bugué
`TU` = test unitaire Jest · `E2E` = Playwright

| # | Fonctionnalité | Zone | Bug | TU | E2E | État pédagogique | Usage en formation |
|---|---|---|---|---|---|---|---|
| 1 | Création de compte | **Z1** | — | ✅ | — | 🟢 **étalon** | Modèle « à quoi ressemble un bon TU ici » |
| 2 | Login | **Z1** | — | ✅ | ✅ | 🟢 **étalon double** | Modèle TU **et** E2E — la référence absolue |
| 3 | Récupération de mot de passe | **Z1 · Z4** | — | — | — | ⚪ **terrain vierge** | Génération de tests + effet de bord fichier `data/mails/` |
| 4 | Liste des journeys | **Z2 · Z6** | — | — | ✅ | 🟢/⚪ **asymétrique** | « E2E vert, zéro TU » : que garantit-on vraiment ? |
| 5 | Détail d'une journey | **Z2** | — | — | — | ⚪ terrain vierge | Génération guidée depuis le contrat |
| 6 | **Création d'une journey** | **Z2** | 🐞 **#6** | ✅ **rouge** | — | 🔴 + **test rouge légitime** | **La preuve** : le test est rouge *parce que* le contrat dit 400 |
| 7 | **Modification d'une journey** | **Z2** | 🐞 **#7** | 🟡 **ment** | — | 🔴 + 🟡 | ⭐ **LE PIÈGE FONDATEUR** — vert alors que le bug est là |
| 8 | **Ajout d'une étape** | **Z3** | 🐞 **#8** | ✅ **rouge** | ✅ **rouge** | 🔴 + tests rouges légitimes | Le même défaut vu à deux niveaux : TU et E2E |
| 9 | Modification d'une étape | **Z3** | 🐞 **#9** | — | — | 🔴 **silencieux, non testé** | Le bug qui ne lève aucune erreur |
| 10 | Upload de photos sur une étape | **Z3 · Z4** | — | — | — | ⚪ terrain vierge | Multipart, effet de bord `/uploads/` |
| 11 | **Recherche de lieu (géocodage)** | **Z5** | — | — | 🟡 **flaky** | ⚪ + 🟡 **instable** | ⭐ **LA FLAKINESS NATIVE** — appelle le vrai Nominatim |
| 12 | Notation d'une journey | **Z2** | — | — | — | ⚪ terrain vierge | Génération, cas limites de `rating` |
| 13 | Commentaires sur une journey | **Z2** | — | — | — | ⚪ terrain vierge | Génération |
| 14 | Commentaires sur une étape | **Z3** | 🐞 **#14** | — | — | 🔴 silencieux, non testé | Champ contractuel jamais rempli |
| 15 | Carte — visualisation | **Z6** | — | — | — | ⚪ terrain vierge | Accessibilité Leaflet, E2E |
| 16 | **Carte — itinéraire** | **Z5** | 🐞 **#16** | — | — | 🔴 **subtil, non testé** | ⭐ **LE BUG QUE L'IA NE VOIT PAS** — inversion lat/lng |

### 2.1 Répartition par zone

| Zone | Fonctionnalités | Ce que la zone offre |
|---|---|---|
| **Z1** — Le poste de garde | 1, 2, 3 | Les **deux étalons** (1, 2) + un terrain vierge (3) |
| **Z2** — Les voyages | 4, 5, 6, 7, 12, 13 | Le piège (7), la preuve (6), 4 terrains vierges |
| **Z3** — Les étapes | 8, 9, 10, 14 | 3 bugs sur 4 fonctionnalités — la zone la plus dégradée |
| **Z4** — Le magasin | transversal (3, 10) | Effets de bord physiques : `data/mails/`, `/uploads/`, `.md` |
| **Z5** — Le monde extérieur | 11, 16 | La flakiness native (11) + le bug subtil (16) |
| **Z6** — La vitrine | 4, 15 | Un E2E sain (4), une carte non testée (15) |

---

## 3. Les six bugs — fiche par fiche

`grep -rn "BUG:" backend/src` les localise tous. **Le formateur ne divulgue jamais cette commande
avant le débrief du col J1.**

### 🐞 #6 — Validation de dates absente · `backend/src/journeys/journeys.service.ts`

| | |
|---|---|
| **Symptôme** | On peut créer un voyage dont `endDate < startDate` |
| **Contrat violé** | `POST /api/journeys` → « 400 si `endDate < startDate` » |
| **Détecté par** | `journeys.create-validation.spec.ts` — **rouge, légitimement** |
| **Difficulté** | ⭐ |
| **Valeur pédagogique** | **L'oracle en action.** Le test est rouge parce que le *contrat* l'exige, pas parce que le code le fait. C'est la démonstration de M1.4. |
| **Piège IA** | Demander à l'IA « écris les tests de `createJourney` » sans le contrat → elle écrit un test qui accepte n'importe quelles dates, car c'est ce que fait le code. |

### 🐞 #7 — Le PATCH perd les steps · `backend/src/journeys/journeys.service.ts`

| | |
|---|---|
| **Symptôme** | Modifier le titre d'un voyage efface ses étapes |
| **Contrat violé** | `PATCH /api/journeys/:id` → « les steps ne doivent PAS être perdus » |
| **Détecté par** | **Personne.** Le TU existant est un faux positif (voir §4) |
| **Difficulté** | ⭐⭐⭐ |
| **Valeur pédagogique** | ⭐ **Le piège fondateur de toute la formation.** Perte de données silencieuse, couverte par un test vert. |
| **Piège IA** | L'IA lit `journeys.update.spec.ts`, en déduit le style « on mocke la sauvegarde », et reproduit le même mensonge sur d'autres fonctionnalités. **Le mensonge se propage.** |

### 🐞 #8 — `unshift` au lieu de `push` · `backend/src/steps/steps.service.ts`

| | |
|---|---|
| **Symptôme** | Les étapes s'affichent dans l'ordre inverse de leur ajout |
| **Contrat violé** | `POST /api/journeys/:id/steps` → « ajouté **à la fin** de `steps[]` » |
| **Détecté par** | `steps.add-order.spec.ts` (TU) **et** `e2e/tests/add-step-order.spec.ts` — **rouges, légitimement** |
| **Difficulté** | ⭐⭐ |
| **Valeur pédagogique** | **Le même défaut à deux niveaux.** Sert à montrer ce que chaque niveau de test coûte et rapporte. |
| **Piège IA** | Avec un seul step, le test passe. Il faut **deux insertions** pour révéler l'ordre — un cas que l'IA n'écrit pas spontanément. |

### 🐞 #9 — `endDate` silencieusement ignoré · `backend/src/steps/steps.service.ts`

| | |
|---|---|
| **Symptôme** | Le PATCH renvoie 200, l'ancienne `endDate` est conservée. Aucune erreur. |
| **Contrat violé** | `PATCH .../steps/:stepId` → « `endDate` doit bien être pris en compte » |
| **Détecté par** | **Personne** — aucun test sur cette fonctionnalité |
| **Difficulté** | ⭐⭐⭐ |
| **Valeur pédagogique** | **Le bug qui ne lève rien.** Un test qui vérifie « pas d'exception » ou « statut 200 » passe. Il faut **relire la réponse** et comparer au corps envoyé. |
| **Piège IA** | Un test généré vérifiant `expect(res.status).toBe(200)` est vert. C'est le cas d'école de l'assertion faible. |

### 🐞 #14 — `authorId` toujours `null` · `backend/src/steps/steps.service.ts`

| | |
|---|---|
| **Symptôme** | Les commentaires d'étape n'ont pas d'auteur identifiable |
| **Contrat violé** | Type `Step.comments[]` → `authorId: string` (non nullable) |
| **Détecté par** | **Personne** |
| **Difficulté** | ⭐⭐ |
| **Valeur pédagogique** | **Le contrat de type comme oracle.** Le `.d.ts` dit `string`, le runtime dit `null`. Un test de forme le prend. |
| **Piège IA** | L'IA génère souvent `expect(comment).toBeDefined()` — vrai, et inutile. |

### 🐞 #16 — Coordonnées inversées vers OSRM · `backend/src/map/map.service.ts`

| | |
|---|---|
| **Symptôme** | L'itinéraire tracé est absurde — mais l'API répond 200 avec une polyline valide |
| **Contrat violé** | OSRM attend `lng,lat` ; le service envoie `lat,lng` |
| **Détecté par** | **Personne** |
| **Difficulté** | ⭐⭐⭐⭐ |
| **Valeur pédagogique** | ⭐ **Le bug que l'IA ne voit pas.** Il n'est visible qu'en confrontant le code à la **documentation d'un tiers**, pas au code lui-même. Aucune relecture de code ne le donne. |
| **Piège IA** | Demandez à un LLM de relire `map.service.ts` : il valide. Le savoir manquant est externe. C'est la démonstration de M7.1. |

---

## 4. Les deux tests qui mentent

### 🟡 `backend/src/journeys/journeys.update.spec.ts` — le faux positif

**Pourquoi il ment.** Il mocke entièrement la couche de sauvegarde et **réinjecte les `steps`
d'origine dans le résultat attendu**. La logique de merge buguée n'est jamais exécutée.
Le test est vert. Le bug #7 est intact.

**Ce qu'il enseigne** — trois choses, dans cet ordre :

1. **Le sur-mock détruit la valeur du test.** Quand le double remplace précisément la partie
   qu'on veut vérifier, il ne reste rien à vérifier.
2. **L'attendu est fabriqué à partir de l'implémentation**, pas du contrat. C'est la définition
   du test tautologique.
3. **Vert ≠ correct.** Une couverture en hausse et une suite verte sont compatibles avec une perte
   de données en production.

**Le geste de démonstration** *(à faire en direct, sans prévenir)* : lancer le TU → vert.
Puis exécuter le scénario réel — créer un voyage, ajouter une étape, modifier le titre,
relire le voyage. Les étapes ont disparu. **Le test est vert et les données sont perdues.**

### 🟡 `e2e/tests/place-search.spec.ts` — le flaky natif

**Pourquoi il ment.** Aucun mock réseau : le test interroge le **vrai** Nominatim
(`nominatim.openstreetmap.org`) et assertit un **texte exact**. Latence, limitation de débit,
reformulation du libellé côté OSM : le test tombe sans que rien n'ait changé chez nous.

**Le fait remarquable** : la fonctionnalité #11 **n'a aucun bug**. L'échec ne dit rien du produit.
C'est la définition même de la flakiness.

**Ce qu'il enseigne** :

1. Un test instable **n'est pas une nuisance d'infrastructure** : c'est un test faux.
2. La dépendance à un tiers gratuit et public est une dépendance de disponibilité.
3. La parade n'est pas un `retry` : c'est un **double** — et un test de contrat séparé,
   exécuté rarement, qui vérifie que le tiers n'a pas changé.

**Le geste de démonstration** : lancer le test 20 fois. Le taux d'échec fait le reste.

---

## 5. Les trois tests rouges légitimes

À ne surtout pas « réparer ». Ils sont la **preuve vivante** qu'un test peut être rouge et juste.

| Fichier | Feature | Pourquoi il est rouge | Ce qu'il enseigne |
|---|---|---|---|
| `backend/src/journeys/journeys.create-validation.spec.ts` | #6 | Attend un 400 sur `endDate < startDate` ; la validation n'existe pas | L'oracle est le contrat. Le rouge accuse le code, pas le test. |
| `backend/src/steps/steps.add-order.spec.ts` | #8 | Attend l'ordre d'insertion ; le service fait `unshift` | Un TU suffit à prouver un défaut d'ordre |
| `e2e/tests/add-step-order.spec.ts` | #8 | Idem, vu de l'utilisateur | Le même défaut coûte plus cher à prouver en E2E |

> ⚠️ **Piège d'animation classique.** Un participant — ou l'IA — proposera de « faire passer »
> ces tests en modifiant l'assertion. C'est **exactement** le malus « test mis en `.skip` /
> assertion ajustée » du barème. Le moment où quelqu'un le propose est un moment pédagogique :
> on l'accueille, on ne le sanctionne pas socialement, et on nomme ce qui vient de se passer.

---

## 6. Les neuf terrains vierges — matière première des exercices

Neuf fonctionnalités sans le moindre test. C'est là que les participants génèrent, exécutent
et vérifient. Ordonnées par difficulté croissante d'écriture.

| Feature | Zone | Difficulté | Ce que l'exercice travaille | Employée en |
|---|---|---|---|---|
| 12. Notation d'une journey | Z2 | ⭐ | Cas limites simples : bornes, `null`, type | M2.1, M3.1 |
| 13. Commentaires sur une journey | Z2 | ⭐ | Création + relecture, structure de réponse | M2.1 |
| 5. Détail d'une journey | Z2 | ⭐ | Forme de la réponse, `steps[]` et `comments[]` présents | M3.2 |
| 3. Récupération de mot de passe | Z1 · Z4 | ⭐⭐ | Effet de bord fichier, non-divulgation (toujours 200) | M4.1, M5.3 |
| 10. Upload de photos | Z3 · Z4 | ⭐⭐ | Multipart, chemin retourné, effet de bord disque | M5.3 |
| 15. Carte — visualisation | Z6 | ⭐⭐ | E2E, accessibilité Leaflet | M7.4 |
| 14. Commentaires sur une étape | Z3 | ⭐⭐⭐ | 🔴 révèle le bug `authorId` si l'oracle est le type | M2.3, col J2 |
| 9. Modification d'une étape | Z3 | ⭐⭐⭐ | 🔴 révèle le bug `endDate` si l'assertion est forte | col J2, M5.4 |
| 16. Carte — itinéraire | Z5 | ⭐⭐⭐⭐ | 🔴 révèle le bug lat/lng **seulement** avec la doc OSRM | M7.1, col J4 |

> 🎯 **Le gradient est la richesse du dispositif** : générer un test sur la notation (#12) est
> facile et l'IA y réussit. Générer un test qui *attrape* le bug d'itinéraire (#16) exige de
> confronter le code à une documentation externe. Entre les deux, tout le métier.

---

## 7. Où chaque notion va chercher son terrain

Tableau de traçabilité. À vérifier avant l'écriture de chaque module.

| Notion | Terrain | Élément précis |
|---|---|---|
| **M1.1** Le test qui ne peut pas échouer | 🟡 | `journeys.update.spec.ts` + bug #7 — **le piège fondateur** |
| **M1.2** Ce que mesurent les benchmarks | ⚪ | Génération sur #12 ou #13, comparée aux chiffres d'état de l'art |
| **M1.3** Trois familles d'automatisation | mixte | Cartes tirées de Z4 (nettoyage), Z6 (E2E #4), Z5 (#11) |
| **M1.4** L'oracle : le contrat, pas le code | 🟢 → 🔴 | Étalon #2 (login), puis test rouge légitime #6 |
| **M2.1** Extraire des exigences testables | ⚪ | `API-CONTRACT.md` §Journeys → features #5, #12, #13 |
| **M2.2** La revue en 8 points | 🟡 + 🟢 | `journeys.update.spec.ts` confronté aux specs de #1 et #2 |
| **M2.3** Ce que l'IA comble seule | ⚪ / 🔴 | Silences du contrat sur Z3 : ordre, dates hors parent, `authorId` (#14) |
| **M3.1** Le pari : deux prompts | ⚪ | #12 ou #13, prompt nu contre prompt contractuel |
| **M3.2** Anatomie d'un prompt | ⚪ | #5 — détail d'une journey |
| **M3.3** Explorer sans tout charger | tout | Monorepo `backend/` + `frontend/` + `e2e/` |
| **M3.4** Versionner un prompt | — | Convention d'équipe, artefact réutilisé au col J2 |
| **M4.1** Les dix gestes de Claude Code | ⚪ | #3 — récupération de mot de passe |
| **M4.2** MCP : donner des yeux | Z6 | #15 — carte Leaflet, contre le vrai DOM |
| **M4.3** Choisir son outil | — | Recherche documentaire, restitution |
| **M5.1** La chasse | 🔴 | `grep BUG:` interdit — les 6 bugs à trouver autrement |
| **M5.2** La boucle | ⚪ | #10 — upload de photos |
| **M5.3** Construire l'agent | ⚪ | #3 et #10 — deux terrains vierges à effet de bord |
| **M5.4** L'agent qui triche | 🔴 | #9 — le bug silencieux : l'agent va vouloir assertir le statut |
| **M6.1** Classer un échec | 🔴🟡⚪ | La suite complète : 2 rouges légitimes, 1 faux positif, 1 flaky |
| **M6.2** Ce que coûte un test instable | 🟡 Z5 | `place-search.spec.ts` — exécution répétée |
| **M6.3** L'agent en CI | — | Workflow sur la suite réelle |
| **M7.1** Le pari : l'IA voit-elle ? | 🔴 Z5 | **#16 — inversion lat/lng** : l'IA relit et valide |
| **M7.2** Modéliser une charge | Z4 | Le magasin fichiers sous charge de lecture |
| **M7.3** Ce que le LLM ne garantit pas | Z1 | #3 — jeton de reset, expiration, non-divulgation |
| **M7.4** Ce qu'`axe` voit sur une carte | Z6 | #15 — Leaflet et `PlaceSearchInput` |
| **M8.1** L'enchère | tout | Les 16 fonctionnalités, budget de test contraint |
| **M8.2** Gouverner dans la durée | — | Évals de l'agent construit au col J2 |
| **M8.3** Ce qui vous engage | Z4 | `data/mails/`, `/uploads/`, données dans les `.md` |

---

## 8. Commandes de référence

```bash
npm install
npm run test:backend    # Jest — 2 suites passent, 2 suites échouent (rouge attendu)
npx playwright install  # une seule fois
npm run e2e             # Playwright — démarre backend + frontend automatiquement
```

**L'état de départ à constater ensemble au Brief du J1** : `npm run test:backend` sort en rouge.
Deux suites échouent — et **c'est normal**. La première leçon de la formation tient dans cette
phrase : *une suite rouge n'est pas un problème de qualité ; une suite verte peut en être un.*

> 🔐 **Commande réservée au formateur** : `grep -rn "BUG:" backend/src` donne les six bugs.
> Elle n'est révélée qu'au débrief du col J1, et sert alors à mesurer ce que chaque cordée
> avait trouvé sans elle.
