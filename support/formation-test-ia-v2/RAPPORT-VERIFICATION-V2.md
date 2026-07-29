# Rapport de vérification — Support de formation V2

> **Objet** : audit qualité de la micro-conception V2 (`formation-test-ia-v2/`).
> **Date** : 29 juillet 2026 · **Méthode** : extraction et recalcul automatisés (Python/ripgrep)
> sur les 7 documents de cadrage, les 8 modules, les 4 cols et les 30 diagrammes.
> **Vérité du dépôt** : `uploads/stats.md` et `uploads/API-CONTRACT.md`.
> **Principe** : aucun chiffre n'est repris d'une affirmation écrite dans les fichiers ; tout est
> réextrait puis recalculé. Les contrôles affichés dans les documents sont eux-mêmes des objets
> de vérification, pas des sources.

## Synthèse

| Contrôle | Objet | Verdict |
|---|---|---|
| **C1** | Minutage — sommes, demi-journées, total | ✅ |
| **C2** | Conformité au gabarit de notion | ✅ |
| **C3** | Règles de rythme R-1, R-2, R-3, R-5, R-6, R-9 | ✅ |
| **C4** | Fidélité au dépôt réel (chemins, routes, bugs) | ✅ *(7 cellules corrigées)* |
| **C5** | Stack TypeScript exclusive | ✅ |
| **C6** | Plafond de 700 mots de contenu transmis | ✅ |
| **C7** | Évaluations — 28 micro, 4 QCM longs, 4 cols | ✅ |
| **C8** | Barème des Points de Repère | ✅ *(1 ligne ajoutée)* |
| **C9** | Traçabilité des URLs | ✅ |

**9 contrôles sur 9 au vert.** 9 anomalies corrigées, toutes mineures. 2 points laissés à
l'arbitrage du formateur (détaillés en fin de rapport). Aucune anomalie bloquante.

---

## C1 — Minutage ✅

**Méthode.** Extraction des 28 tableaux *Déroulé minuté*, addition des durées de ligne `*(n)*`,
comparaison à la durée annoncée dans le tableau d'identité, aux bornes temporelles de la première
et de la dernière ligne, et à l'addition affichée dans la ligne `**Contrôle : … = nn min**`.

### Résultats

| Vérification | Cible | Constat |
|---|---|---|
| Σ des lignes du déroulé = durée annoncée | 28/28 | **28/28** ✅ |
| Bornes temporelles continues (0 → durée, sans trou ni recouvrement) | 28/28 | **28/28** ✅ |
| Addition affichée dans la ligne « Contrôle » = somme réelle | 28/28 | **28/28** ✅ |
| Ligne « Contrôle » présente | 28/28 | **28/28** ✅ |

Les 28 additions affichées ont été récalculées terme à terme. Exemple M1.1 :
`3 + 10 + 3 + 4 + 3 + 7 + 4 + 8 + 3 = 45` — conforme à la durée annoncée et à la borne de fin.
**Aucune erreur de somme dans aucun contrôle affiché.**

### Demi-journées et total

| Jour | Matin | Σ | Après-midi | Σ | Cumuls | Horloge |
|---|---|---|---|---|---|---|
| J1 | M1 | **210** | M2 | **210** | ✅ | ✅ |
| J2 | M3 | **210** | M4 | **210** | ✅ | ✅ |
| J3 | M5 | **210** | M6 | **210** | ✅ | ✅ |
| J4 | M7 | **210** | M8 | **210** | ✅ | ✅ |

- Les 8 demi-journées font **exactement 210 min**. Total : **8 × 210 = 1 680 min = 28 h 00** ✅
- La colonne *Cumul* de chaque tableau §0.4 a été recalculée ligne à ligne : **8/8 exactes**.
- Les plages horaires (`09:15 → 10:00`) ont été converties et comparées à la colonne durée :
  **aucun écart** entre l'horloge affichée et le minutage.
- Décomposition vérifiée : notions **1 120** + briefs/débriefs `4 × 30` + pauses `4 × 30`
  + QCM longs `4 × 20` + cols `4 × 60` = **1 680** ✅
- Répartition de `00-architecture-28h.md` §3 recalculée : JEU 7 notions/275 min · SOLO 6/250 ·
  DESC 6/235 · INV 4/160 · GRP 5/200 = **28 notions / 1 120 min** ✅

**Verdict : ✅ aucune anomalie.** Le minutage est exact du niveau de la ligne de déroulé jusqu'au
total des 28 heures.

---

## C2 — Conformité au gabarit ✅

**Méthode.** Contrôle des 28 notions sur les 7 champs du tableau d'identité, les 9 sections
imposées, la citation d'un critère de `00-grille-modalites.md`, et le nombre de puces.

| Élément exigé par `00-gabarit-notion.md` | Conformes |
|---|---|
| Tableau d'identité — **Durée** | 28/28 ✅ |
| Tableau d'identité — **Modalité** | 28/28 ✅ |
| Tableau d'identité — **Objectif d'apprentissage** | 28/28 ✅ |
| Tableau d'identité — **Niveau visé (Bloom)** | 28/28 ✅ |
| Tableau d'identité — **Micro-évaluation** | 28/28 ✅ |
| Tableau d'identité — **Ancrage fil rouge** | 28/28 ✅ |
| Tableau d'identité — **Prérequis** | 28/28 ✅ |
| « Pourquoi cette modalité » **avec critère cité** | 28/28 ✅ |
| « Ce qu'il faut avoir compris » — 3 à 5 puces | 28/28 ✅ *(5 puces partout)* |
| Déroulé minuté | 28/28 ✅ |
| Contenu à transmettre | 28/28 ✅ |
| Diagramme | 28/28 ✅ |
| Démonstration / exemple | 28/28 ✅ |
| Micro-évaluation | 28/28 ✅ |
| Ressources | 28/28 ✅ |
| Pièges d'animation | 28/28 ✅ |

### Critères de modalité effectivement cités

| Critère | Notions |
|---|---|
| `A-1` | M8.3 |
| `A-2` | M1.2 · M1.4 · M3.2 · M4.2 · M5.2 · M7.3 |
| `B-1` | M1.3 · M7.4 |
| `B-2` | M6.1 · M8.1 |
| `C-1` | M2.1 · M3.3 · M4.1 · M7.2 |
| `C-2` | M2.2 · M5.3 · M6.3 |
| `D-1` | M4.3 · M6.2 · M8.2 |
| `D-3` | M2.3 · M3.1 · M5.1 · M7.1 |
| `D-4` | M1.1 · M5.4 |
| `E-1` | M3.4 · M8.3 |

**Aucune référence de critère manquante.** Les 12 critères de la grille sont représentés à
l'exception de `C-2`/`D-2`/`E-2` en usage exclusif, ce qui est cohérent avec le dispositif.

**Observation (sans gravité).** Deux notions nomment leur section de démonstration autrement que
le gabarit : **M6.3** utilise *« ▸ 🔧 Le workflow de référence »* (`module-M6`, L1077) et **M8.3**
*« ▸ 👥 L'exercice de groupe »* (`module-M8`, L1203). Le contenu remplit la fonction exigée
(exemple unique, exécutable, ancré) ; seul l'intitulé diffère. Non corrigé : renommer changerait
la nature annoncée de la séquence.

**Verdict : ✅ 28/28 conformes.**

---

## C3 — Règles de rythme ✅

**Méthode.** Reconstitution de la séquence réelle des modalités par jour depuis les tableaux
d'identité (et non depuis les lignes « Rythme » des modules, qui sont elles-mêmes contrôlées).

### Séquence reconstituée

| Jour | Modules | Séquence des modalités | R-1 |
|---|---|---|---|
| **J1** | M1 · M2 | JEU · DESC · JEU · DESC ‖ SOLO · GRP · INV | ✅ |
| **J2** | M3 · M4 | JEU · DESC · SOLO · GRP ‖ SOLO · DESC · INV | ✅ |
| **J3** | M5 · M6 | JEU · DESC · SOLO · JEU ‖ GRP · INV · SOLO | ✅ |
| **J4** | M7 · M8 | JEU · SOLO · DESC · GRP ‖ JEU · INV · GRP | ✅ |

### Verdict par règle et par jour

| Règle | J1 | J2 | J3 | J4 | Verdict |
|---|---|---|---|---|---|
| **R-1** aucun doublon de modalité consécutif | ✅ | ✅ | ✅ | ✅ | **✅** |
| **R-2** ≥ 1 pédagogie inversée par jour | 1 *(M2.3)* | 1 *(M4.3)* | 1 *(M6.2)* | 1 *(M8.2)* | **✅** |
| **R-3** ≥ 1 jeu sérieux par jour | 2 *(M1.1, M1.3)* | 1 *(M3.1)* | 2 *(M5.1, M5.4)* | 2 *(M7.1, M8.1)* | **✅** |
| **R-5** aucune ligne descendante > 12 min | ✅ | ✅ | ✅ | ✅ | **✅** |
| **R-6** première séquence du jour non descendante | JEU | JEU | JEU | JEU | **✅** |
| **R-9** une micro-évaluation par notion | 7/7 | 7/7 | 7/7 | 7/7 | **✅ 28/28** |

**R-5 en détail.** Neuf lignes de déroulé dépassent 12 minutes. Chacune a été lue : **aucune n'est
descendante.** Ce sont toutes des séquences d'activité participante —
M3.3 (16 min, SOLO, « les cinq quêtes de contexte »), M3.4 (14, GRP), M4.1 (14, SOLO),
M4.3 (14, INV), M5.1 (15, JEU « La Chasse »), M5.3 (18, SOLO), M6.3 (16, SOLO),
M7.2 (18, SOLO), M8.3 (16, **exercice de groupe** inséré dans une notion à dominante DESC).
La règle R-5 porte sur l'exposé sans interaction : elle est respectée.

*Observation.* Le gabarit §2 recommande des lignes « de 3 à 10 minutes ». Ces neuf lignes s'en
écartent par construction (un atelier au clavier ne se découpe pas en tranches de 10 min).
C'est un écart au conseil de rédaction, pas à la règle de rythme.

### Règles complémentaires vérifiées au passage

- **R-4** — part de descendant : **235 min de DESC pur sur 1 120** = **21,0 %**, ou **255 min**
  (22,8 %) en comptant la part descendante de M8.3. Plafond de 35 % **respecté** ✅
- **R-7** — séquence post-déjeuner active : M2.1 SOLO · M4.1 SOLO · M6.1 GRP · M8.1 JEU ✅
- **R-8** — 8 clôtures sur victoire mesurable : 4 QCM longs + 4 cols ✅

**Contrôle des auto-déclarations.** Les 8 lignes « Rythme » des modules annoncent `R-1 ✓`. Toutes
sont exactes. La seule adjacence apparemment litigieuse — **M7.4 → M8.1** — a été vérifiée :
M7.4 est un **exercice de groupe** (`GRP`, critère `B-1`) qui emprunte la mécanique du Tri, non un
jeu sérieux ; le tableau §0.3 de M7 et la ligne « Modalité » de la notion concordent, et
l'affirmation de M8.1 (*« elle suit un exercice de groupe le matin »*, `module-M8` L176) est juste.
Les deux notions sont en outre séparées par le QCM long M7 et la pause déjeuner.

**Verdict : ✅ les 6 règles sont respectées les 4 jours.**

---

## C4 — Fidélité au dépôt réel ✅

**Méthode.** Extraction de tous les chemins de fichiers et de toutes les routes cités dans les
8 modules et les 4 cols, puis confrontation à `stats.md` et `API-CONTRACT.md`.

### Fichiers de test — 5 cités, 5 réels, 0 inventé ✅

| Chemin cité | Occurrences | Présent dans `stats.md` |
|---|---|---|
| `backend/src/journeys/journeys.update.spec.ts` | 12 | ✅ |
| `backend/src/journeys/journeys.create-validation.spec.ts` | 7 | ✅ |
| `backend/src/steps/steps.add-order.spec.ts` | 6 | ✅ |
| `e2e/tests/add-step-order.spec.ts` | 9 | ✅ |
| `e2e/tests/place-search.spec.ts` | 19 | ✅ |

**Aucun fichier de test inventé.** Les cinq specs du dépôt sont citées, et aucune autre.

### Fichiers de code source — 5 cités, 5 réels ✅

`backend/src/journeys/journeys.service.ts` · `backend/src/steps/steps.service.ts` ·
`backend/src/map/map.service.ts` — tous trois nommés dans le tableau des bugs de `stats.md`.
`data/mails/{timestamp}-{email}.md` et le motif `/uploads/...` proviennent d'`API-CONTRACT.md`.

### Routes d'API — 18 citées, 18 réelles ✅

Les 15 routes du contrat sont couvertes ; les variantes de forme
(`GET /api/places/search`, `…?q=paris`, `…?q=...`) normalisent vers la même route réelle.

**Une seule route hors contrat a été relevée — et elle est délibérée.**
`DELETE /api/journeys/:id` (`module-M2` L1110) apparaît dans la fiche **SIL-8** des silences du
contrat, à la colonne *« Ce qu'un modèle décidera seul »* : *« Il inventera
`DELETE /api/journeys/:id` et écrira des tests contre une route qui n'existe pas. »* C'est
l'illustration pédagogique du silence, pas une erreur de fidélité. **Conservée telle quelle.**

### Artefacts « à créer » en séance — acceptables, listés à part

Ces chemins n'existent pas dans le dépôt de départ : ce sont les **livrables produits par les
participants** pendant la formation. Leur statut est explicite dans les modules et les cols.

| Chemin | Produit par | Occurrences |
|---|---|---|
| `carnet/j1-inventaire.md` | Col J1 | 8 |
| `carnet/j2-rapport-agent.md` | Col J2 | 3 |
| `carnet/j3-post-mortem.md` | Col J3 | 8 |
| `carnet/CARNET-DE-ROUTE.md` | Col J4 *(livrable final)* | 6 |
| `carnet/grille-revue-8-points.md` · `carnet/silences-Z3.md` | M2.2 · M2.3 | 2 |
| `CARNET-DE-BORD.md` | Formateur *(scoreboard, racine du dépôt)* | 13 |
| `.claude/settings.json` · `.claude/skills/exigence-vers-test/SKILL.md` · `.claude/agents/verificateur-de-tests.md` · `.claude/hooks/garde-assertions.ts` · `.claude/hooks/magasin-propre.ts` | M4.1 · M5.3 · Col J2 | 12 |
| `.github/workflows/tests.yml` | M6.3 | 1 |
| `evals/agent-eclaireur.eval.ts` | M8.2 | 6 |

*Note.* `CARNET-DE-BORD.md` (tableau de score tenu par le formateur, à la racine) et
`carnet/CARNET-DE-ROUTE.md` (dossier livré par la cordée au col J4) sont **deux artefacts
distincts** ; les 20 occurrences ont été vérifiées une à une — aucune confusion entre les deux.

### Les 6 bugs — cohérents partout ✅

| Bug | Fichier attendu (`stats.md`) | Mentions | Association divergente |
|---|---|---|---|
| **#6** création — pas de validation `endDate ≥ startDate` | `journeys.service.ts` | 40 | **0** |
| **#7** `PATCH` écrase `steps[]` | `journeys.service.ts` | 61 | **0** |
| **#8** `unshift` au lieu de `push` | `steps.service.ts` | 36 | **0** |
| **#9** `endDate` ignoré au `PATCH` d'étape | `steps.service.ts` | 50 | **0** |
| **#14** `authorId` toujours `null` | `steps.service.ts` | 42 | **0** |
| **#16** `lat,lng` au lieu de `lng,lat` vers OSRM | `map.service.ts` | 55 | **0** |

**Aucune contradiction entre modules.** Chaque fois qu'un bug est rattaché à un fichier, le
fichier est le bon.

### Les 2 tests menteurs — cohérents partout ✅

- `journeys.update.spec.ts` — **faux positif par sur-mock** (feature #7) : 52 mentions dans
  9 fichiers. La cause est décrite de façon identique partout — le double réinjecte les `steps`
  d'origine, la logique de merge n'est jamais exécutée.
- `place-search.spec.ts` — **flaky par appel réseau réel** (feature #11) : 30 mentions dans
  8 fichiers. Partout présenté comme instable **sans que la fonctionnalité soit buguée**.

**Point de vigilance vérifié :** les 11 passages associant la feature #11 au mot « bug » affirment
tous explicitement *« la feature #11 n'a aucun bug »* — `00-carte-du-terrain.md` L157,
`module-M6` L641/L665/L725, `boss-J3` L528, `module-M8` L349. Distinction tenue sans faille.

### ⚠️ Anomalie relevée et corrigée — zones périmées dans le macro-design

`00-architecture-28h.md` conservait, pour 7 notions, l'ancrage de la **première passe de
macro-conception**, contredit par l'oracle déclaré `00-carte-du-terrain.md` §7 et par les modules.
Seule la divergence de M7.1 était documentée (`module-M7` L68-71).

| Notion | Avant | Après *(oracle `00-carte-du-terrain.md` §7)* |
|---|---|---|
| **M1.1** | `Z1` 🟡 « sur-mock du poste de garde » | `Z2` 🟡 `journeys.update.spec.ts` + 🐞 #7 |
| **M1.4** | `Z2` 🟢 puis 🟡 | `Z2` 🟢 puis **🔴** *(rouge légitime #6)* |
| **M4.1** | `Z3` ⚪ | `Z1 · Z4` ⚪ *(feature #3, récupération de mot de passe)* |
| **M5.2** | `Z1` 🟢 puis ⚪ | `Z3 · Z4` ⚪ *(feature #10, upload de photos)* |
| **M5.4** | `Z2` 🔴 | `Z3` 🔴 *(🐞 #9, dans `steps.service.ts`)* |
| **M7.1** | `Z1` 🔴 | `Z5` 🔴 *(🐞 #16, inversion `lat`/`lng`)* |
| **M8.3** | `Z1 · Z3 · Z5` | `Z1 · Z4 · Z5` *(`data/mails/`, `/uploads/`, magasin `.md`)* |

**Corrigé.** Une *Note de synchronisation* a été ajoutée en tête de `00-architecture-28h.md` §3,
qui rappelle l'ordre de préséance et signale les paragraphes de prose restant à reprendre
(voir « À arbitrer » en fin de rapport).

**Divergences résiduelles bénignes (non corrigées).** Pour 10 notions, le module cite **plus** de
zones que le macro-design — M2.1 (`Z2` → `Z2·Z3`), M2.2, M3.2, M5.1, M5.3, M8.1 — ou remplace le
codage `Z1→Z6` par une formulation en clair : M3.3 et M4.3 (« le monorepo entier »), M6.1
(« la suite réelle »). Il s'agit d'enrichissements de la micro-conception, cohérents avec l'oracle.

**Verdict : ✅ aucun chemin ni aucune route inventés.** Fidélité au dépôt intégrale.

---

## C5 — Stack ✅

**Méthode.** Recherche insensible à la casse de `C#`, `csharp`, `.NET`, `xUnit`, `NUnit`,
`Angular`, `Jasmine`, `Karma`, `FluentAssertions` sur tous les `.md`, `.mmd` et `index.html`.

**3 occurrences, toutes légitimes :**

| Fichier · ligne | Occurrence | Statut |
|---|---|---|
| `00-fil-rouge.md` L125 | « Les exemples .NET/C# et Angular de la V1 **ne sont pas repris** » | ✅ énoncé d'exclusion |
| `00-gabarit-notion.md` L183 | « **Interdit** : tout exemple en C#/.NET, xUnit, NUnit, Angular ou Jasmine/Karma » | ✅ énoncé de la règle |
| `diagrammes/index.html` L1978 | `https://cdn.jsdelivr.net/npm/mermaid@11/…` | ✅ faux positif (`.net` dans un nom de domaine) |

**Aucun exemple de code hors stack.** Répartition des 111 blocs de code :

| Langage | Blocs |
|---|---|
| `ts` | 48 |
| `mermaid` | 30 |
| `bash` | 18 |
| `yaml` | 4 |
| `markdown` | 4 |
| `diff` | 4 |
| `text` | 3 |
| `json` / `jsonc` | 4 |
| `js` | **1** |

**L'unique bloc `js`** (`module-M7` L733) est un script **k6** de tir de capacité. Il est précédé
d'un avertissement explicite : *« C'est le seul extrait non TypeScript de tout le support V2 : les
scripts k6 sont en JavaScript, et c'est précisément l'un des coûts d'adoption relevés dans le
tableau ci-dessus. L'exercice que les participants écrivent, lui, reste en TypeScript. »*
JavaScript ne figure pas dans la liste des interdits, l'exception est assumée et motivée, et le
livrable des participants reste TypeScript. **Conservé.**

**Stack attendue effectivement mobilisée** : Jest (46) · supertest (30) · Vitest (22) ·
`@nestjs/testing` (11) · `@playwright/test` (11) · `@axe-core/playwright` (9) ·
`@testing-library/react` et `/user-event` (4).

**Verdict : ✅ zéro violation.**

---

## C6 — Plafond de contenu ✅

**Méthode.** Extraction de la section « Contenu à transmettre » des 28 notions, blocs de code
exclus, comptage des mots.

| Notion | Mots | Notion | Mots | Notion | Mots | Notion | Mots |
|---|---|---|---|---|---|---|---|
| M1.1 | 440 | M3.1 | 441 | M5.1 | 556 | M7.1 | 511 |
| M1.2 | 402 | M3.2 | 606 | M5.2 | 513 | M7.2 | 496 |
| M1.3 | 361 | M3.3 | 556 | M5.3 | 540 | M7.3 | 658 |
| M1.4 | 389 | M3.4 | 426 | M5.4 | 542 | M7.4 | 643 |
| M2.1 | 489 | M4.1 | 499 | M6.1 | 610 | M8.1 | 578 |
| M2.2 | 423 | M4.2 | 588 | M6.2 | 605 | M8.2 | 438 |
| M2.3 | 488 | M4.3 | 536 | M6.3 | **682** | M8.3 | 638 |

- **Dépassements : 0 / 28** ✅
- Maximum : **M6.3 à 682 mots** (97,4 % du plafond) · minimum : M1.3 à 361 · moyenne : **522**
- Hors tableaux (prose seule), le maximum tombe à 447 mots (M7.4).

**Verdict : ✅ aucun dépassement.** Trois notions approchent le plafond (M6.3 682, M7.3 658,
M7.4 643) : à surveiller à la prochaine itération, sans action requise aujourd'hui.

---

## C7 — Évaluations ✅

### Dénombrement

| Objet | Attendu | Constaté |
|---|---|---|
| Micro-évaluations | 28 | **28** ✅ |
| QCM longs | 4 | **4** ✅ |
| Cols | 4 | **4** ✅ |

### QCM longs — nombre de questions

| QCM | Annoncé | Constaté | Verdict |
|---|---|---|---|
| **M1** | 14 | **14** | ✅ |
| **M3** | 13 | **13** | ✅ |
| **M5** | 14 | **14** | ✅ |
| **M7** | 15 | **15** | ✅ |
| **Total** | 56 | **56** | ✅ |

### Structure des 56 questions

Chaque question a été contrôlée sur quatre points : nombre d'options, unicité de la bonne réponse
signalée en gras, présence d'une justification par option, et cohérence entre le marquage de la
bonne réponse et sa justification (« X est juste » / « X est faux »).

| Contrôle | Résultat |
|---|---|
| Exactement **4 options** (A/B/C/D) | **56/56** ✅ |
| **Une seule** bonne réponse identifiée | **56/56** ✅ |
| **Une justification pour chaque distracteur** *(3 par question)* | **56/56** ✅ |
| Justification également fournie pour la bonne réponse | **56/56** ✅ |
| Cohérence marquage ↔ justification | **56/56** ✅ |

Soit **224 justifications** rédigées, dont **168 justifications de distracteur**. Aucune manquante.

### Micro-évaluations — 7 QCM éclair

| Notion | Questions | Options | Bonne réponse | Justifications |
|---|---|---|---|---|
| M1.2 · M1.4 · M3.2 · M4.2 · M5.2 · M7.3 · M8.3 | **3 chacune** | **4** | **1** | **4/4** |

**21 questions supplémentaires, toutes conformes.** Total général : **77 questions**,
**308 justifications**, **0 manquante**.

### Micro-évaluations — 21 exercices courts

Les 21 autres notions portent un exercice court de 3 à 8 minutes (conforme à la règle du gabarit :
« dès *Appliquer*, la micro-évaluation est un exercice »). Chacun comporte énoncé, matériel,
résultat attendu vérifiable, solution de référence et erreur fréquente.

### Cols

| Col | Durée | Barème | Critères | Σ critères |
|---|---|---|---|---|
| **J1 — L'Inventaire** | 60 min | 100 PR | 5 | 30+25+20+20+5 = **100** ✅ |
| **J2 — L'Éclaireur** | 60 min | 100 PR | 5 | 30+25+20+15+10 = **100** ✅ |
| **J3 — Le Passage difficile** | 60 min | 100 PR | 5 | 30+30+20+15+5 = **100** ✅ |
| **J4 — Le Comité de mise en ligne** | 60 min | 200 PR | 6 | 40+40+35+25+25+35 = **200** ✅ |

Les sous-critères de chacun des 21 critères ont été additionnés et comparés à l'en-tête du
critère : **21/21 exacts**. *(Le critère 2 du col J1 est un barème par tranches — 25/18/12/6/0 —
et non une somme : contrôlé manuellement, plafond de 25 PR respecté.)*

**Verdict : ✅ dispositif d'évaluation complet et rigoureux.**

---

## C8 — Points de Repère ✅

**Méthode.** Confrontation du barème de référence (`00-fil-rouge.md` §5.2) aux 8 tableaux §0.5 des
modules et aux 4 barèmes détaillés des cols.

### Barème de référence et son application

| Source | `00-fil-rouge.md` §5.2 | Application dans les modules |
|---|---|---|
| Micro-évaluation réussie | 10 PR | **10 PR** — 28/28 ✅ |
| Restitution de pédagogie inversée | 20 PR | **20 PR** — 4/4 ✅ |
| Jeu sérieux remporté | 15 PR | **15 PR** — 8/8 ✅ |
| QCM long au prorata | 0 à 50 PR | **0 à 50 PR** — 4/4 ✅ |
| Col franchi (J1, J2, J3) | 100 PR | **100 PR** — 3/3 ✅ |
| Sommet (col final J4) | 200 PR | **200 PR** — 1/1 ✅ |
| Défaut non listé, prouvé par un test | +40 PR | **+40 PR** — M2, M8 ✅ |

### Totaux par module

| Module | Σ recalculée | Total déclaré | Bonus | Verdict |
|---|---|---|---|---|
| M1 | 120 | **120** | — | ✅ |
| M2 | 140 | **140** | +40 | ✅ |
| M3 | 105 | **105** | +10 | ✅ |
| M4 | 150 | **150** | +10 | ✅ |
| M5 | 120 | **120** | — | ✅ |
| M6 | 165 | **165** | +10 | ✅ |
| M7 | 130 | **130** | — | ✅ |
| M8 | 255 | **255** | +40 | ✅ |

**8/8 exacts.** Aucun écart entre la somme des lignes et le total maximal annoncé.

### ⚠️ Anomalie relevée et corrigée — la valeur du badge

Trois modules créditent un **badge** de **10 PR** et l'intègrent à leur total maximal :
`module-M4` L83 (💰 Le Frugal), `module-M6` L89 (🧊 Le Stabilisateur), `module-M7` L103
(♿ L'Hospitalier). Or `00-fil-rouge.md` §5.2 **ne prévoyait aucune valeur pour les badges** :
§5.3 les décrit sans les doter. Les trois totaux étaient donc justes, mais non fondés.

**Corrigé** — ligne ajoutée à `00-fil-rouge.md` §5.2 (L162) :
`| 🎖️ **Badge obtenu** (voir §5.3) | **10 PR** |`, valeur retenue parce que c'est celle
qu'appliquent déjà, à l'identique, les trois modules concernés.

### Malus

Les 7 malus du Lest (§5.2) sont repris sans divergence de valeur. Le malus spécifique de
**−60 PR** du col J2 (modification silencieuse d'une assertion, `boss-J2` §5.6) est propre à ce
col et déclaré comme tel — pas de conflit avec le barème général.

**Verdict : ✅ barème cohérent après correction.**

---

## C9 — URLs ✅

**Méthode.** Extraction de toutes les URLs des modules, cols, documents de cadrage et README,
puis recherche de chaque URL dans le corpus
`../formation-test-ia/recherche/sources-jour{1,2,3,4}.md`.

| Constat | Nombre |
|---|---|
| URLs distinctes relevées dans la V2 | **184** |
| Tolérées *(`localhost`, `example.*`, `nominatim.openstreetmap.org`, `router.project-osrm.org`)* | 11 |
| **Tracées à l'identique dans le corpus V1** | **173** |
| **NON TRACÉES** | **0** ✅ |

Les 173 URLs de contenu sont retrouvées **verbatim** dans un corpus de 751 références vérifiées.
Le contrôle a également porté sur les 30 fichiers `.mmd` et sur `diagrammes/index.html` : seules
deux URLs techniques y figurent — `http://www.w3.org/2000/svg` (espace de noms SVG) et
`https://cdn.jsdelivr.net/npm/mermaid@11/…` (CDN de rendu). Toutes deux légitimes.

**Verdict : ✅ aucune URL inventée. Traçabilité intégrale.**

---

## Contrôles complémentaires

### Diagrammes

| Contrôle | Résultat |
|---|---|
| Fichiers `.mmd` présents | **30** |
| Diagrammes référencés dans les modules et les cols | **30** |
| Référencés mais absents | **0** ✅ |
| Présents mais jamais référencés | **0** ✅ |
| Présents dans `diagrammes/index.html` | **30/30** ✅ |
| Notices de dévoilement | **28 en notion + 2 en col** ✅ |

Répartition : 28 diagrammes de notion (un par notion) + 2 diagrammes de col
(`BOSS-J2-l-eclaireur.mmd`, `BOSS-J4-la-carte-des-risques.mmd`).
`index.html` assure le rendu Mermaid et l'export **SVG et PNG** — vérifié.

*Corrigé.* `00-gabarit-notion.md` §5 donnait en exemple `diagrammes/M3-2-fenetre-de-contexte.svg`,
fichier inexistant. Remplacé par `diagrammes/M3-2-les-cinq-blocs.svg`, qui est le diagramme réel
de M3.2.

### Cohérence macro / micro

| Contrôle | Résultat |
|---|---|
| Durée de chaque notion : `00-architecture-28h.md` ↔ module | **28/28** ✅ |
| Modalité de chaque notion : architecture ↔ module | **28/28** ✅ |
| Répartition annoncée (7 JEU · 6 SOLO · 6 DESC · 4 INV · 5 GRP) | **exacte** ✅ |
| Ancrage terrain ↔ `00-carte-du-terrain.md` §7 | 7 écarts **corrigés**, 10 enrichissements bénins |

---

## Anomalies corrigées

| # | Contrôle | Fichier · ligne | Correction |
|---|---|---|---|
| 1 | C4 | `00-architecture-28h.md` L115 | M1.1 : terrain `Z1` 🟡 → **`Z2` 🟡** `journeys.update.spec.ts` + 🐞 #7 |
| 2 | C4 | `00-architecture-28h.md` L118 | M1.4 : `Z2` 🟢 puis 🟡 → **🟢 puis 🔴** (rouge légitime #6) |
| 3 | C4 | `00-architecture-28h.md` L195 | M4.1 : `Z3` ⚪ → **`Z1 · Z4`** ⚪ (feature #3) |
| 4 | C4 | `00-architecture-28h.md` L224 | M5.2 : `Z1` → **`Z3 · Z4`** ⚪ (feature #10) |
| 5 | C4 | `00-architecture-28h.md` L226 | M5.4 : `Z2` 🔴 → **`Z3` 🔴** (🐞 #9, `steps.service.ts`) |
| 6 | C4 | `00-architecture-28h.md` L281 | M7.1 : `Z1` 🔴 → **`Z5` 🔴** (🐞 #16) — divergence déjà signalée par `module-M7` |
| 7 | C4 | `00-architecture-28h.md` L314 | M8.3 : `Z3` → **`Z4`** (`data/mails/`, `/uploads/`, magasin `.md`) |
| 8 | C8 | `00-fil-rouge.md` L162 | Ajout au barème : `🎖️ Badge obtenu (voir §5.3) — 10 PR`, aligné sur M4/M6/M7 |
| 9 | — | `00-gabarit-notion.md` L157 | Exemple de diagramme : fichier inexistant → `diagrammes/M3-2-les-cinq-blocs.svg` |

Une **note de synchronisation** a par ailleurs été insérée en tête de `00-architecture-28h.md` §3 :
elle établit `00-carte-du-terrain.md` §7 comme oracle du terrain, récapitule les 7 réalignements et
désigne les paragraphes de prose restant à reprendre.

**Aucun contenu pédagogique de fond n'a été modifié** : ni objectif, ni modalité, ni déroulé, ni
contenu transmis, ni énoncé d'évaluation, ni corrigé, ni barème de col.

---

## À arbitrer par le formateur

**1. Les paragraphes « Motivation de l'ancrage » de `00-architecture-28h.md`.**
Les cellules ont été réalignées, mais quatre paragraphes de prose argumentent encore l'ancrage
initial et contredisent désormais leur propre tableau :

| Fichier · ligne | Texte à reprendre | Justification à jour disponible dans |
|---|---|---|
| `00-architecture-28h.md` L120-121 | *« M1.1 se joue sur Z1 parce que l'authentification est la zone la plus simple à lire »* | `module-M1` — ligne *Ancrage fil rouge* de M1.1 |
| `00-architecture-28h.md` L110 | Ligne « **Terrain** » du module M1 : *« Z1 (le sur-mock d'authentification) »* | idem |
| `00-architecture-28h.md` L228-229 | *« M5.4 se joue sur un défaut 🔴 de Z2 »* | `module-M5` — ancrage de M5.4 (`Z3`, 🐞 #9) |
| `00-architecture-28h.md` L294-295 | *« M7.1 se joue sur Z1 : le poste de garde concentre JWT… »* | `module-M7` L68-71 *(note de conception déjà rédigée)* |

Ce sont des raisonnements pédagogiques : l'audit s'est interdit de les réécrire. Une passe de
15 minutes suffit, la justification à jour existant déjà dans chaque module.

**2. Les trois notions proches du plafond de 700 mots** — M6.3 (682), M7.3 (658), M7.4 (643).
Conformes aujourd'hui, mais sans marge pour un ajout. À arbitrer si le contenu doit évoluer :
soit déporter vers les ressources, soit scinder la notion.

---

*Rapport établi le 29 juillet 2026. Les scripts d'extraction sont rejouables à l'identique :
tout chiffre de ce rapport provient d'un recalcul, jamais d'une affirmation reprise d'un fichier.*
