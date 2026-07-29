# Architecture V2 — 4 jours × 7 h = 28 h

> **Macro-conception.** Ce document fige la progression, le découpage en modules et notions,
> la modalité de chaque notion et le minutage. Il se valide **avant** l'écriture des notions.
> Le projet fil rouge est **Carnet de voyage** (métaphore de *L'EXPÉDITION*) : chaque notion
> est ancrée sur une ou plusieurs des six zones `Z1`-`Z6` décrites dans `00-fil-rouge.md`.

---

## 1. La progression d'ensemble

Quatre journées, quatre verbes. Chaque journée répond à une question que le participant
se pose vraiment, dans l'ordre où il se la pose.

| Jour | Verbe | La question du participant | Ce qu'il sait faire le soir |
|---|---|---|---|
| **J1** | **COMPRENDRE** | *« Est-ce que je peux faire confiance à ce que l'IA écrit ? »* | Détecter un test qui ment ; produire des cas de test tracés à une exigence |
| **J2** | **OUTILLER** | *« Comment je lui parle pour obtenir autre chose que du plausible ? »* | Écrire un prompt de test industrialisable ; piloter Claude Code et MCP |
| **J3** | **INDUSTRIALISER** | *« Comment ça tourne sans moi ? »* | Construire un agent avec garde-fous ; le mettre en CI ; diagnostiquer un échec |
| **J4** | **DÉCIDER** | *« Qu'est-ce que j'assume quand je signe ? »* | Couvrir le non-fonctionnel ; gouverner, prioriser par le risque, défendre un Go/No-Go |

**Le fil narratif** : on passe de *sceptique* (J1) à *outillé* (J2), d'outillé à *autonome* (J3),
d'autonome à *responsable* (J4). C'est aussi la courbe d'un jeu : découverte des règles,
acquisition de l'équipement, maîtrise, boss final.

**Le fil narratif du projet** : chaque journée est une étape de l'expédition et se termine
sur un col.

| Jour | Étape | Col à franchir |
|---|---|---|
| **J1** | 🏕️ Le camp de base | 🏆 *L'Inventaire* |
| **J2** | 🎒 L'équipement | 🏆 *L'Éclaireur* |
| **J3** | ⛰️ L'ascension | 🏆 *Le Passage difficile* |
| **J4** | 🏔️ Le sommet | 🏔️ *Le Comité de mise en ligne* |

---

## 2. Le squelette d'une journée — 420 min

Identique tous les jours. Le participant sait toujours où il est.

| Créneau | Séquence | Durée |
|---|---|---|
| 09:00 | **Le Brief** — situation, score de la veille, objectif du jour | 15 |
| 09:15 | Notion 1 *(jamais descendante — règle R-6)* | 35-45 |
| — | Notion 2 | 35-45 |
| 11:00 | **Pause** | 15 |
| 11:15 | Notion 3 | 35-45 |
| — | Notion 4 | 35-45 |
| 12:10 | **QCM long du module du matin** — 12 à 15 questions, correction commentée | 20 |
| 12:30 | *Déjeuner* | — |
| 14:00 | Notion 5 *(active — règle R-7)* | 40 |
| — | Notion 6 | 40 |
| 15:20 | **Pause** | 15 |
| 15:35 | Notion 7 | 40 |
| 16:15 | 🏆 **BOSS** — TP scénarisé, barème, corrigé | 60 |
| 17:15 | **Le Débrief** — corrigé du boss, scoreboard, ce qu'on retient | 15 |
| 17:30 | *Fin* | — |

**Contrôle** : 15 + 160 + 15 + 20 = 210 (matin) · 120 + 15 + 60 + 15 = 210 (après-midi) → **420 min**.
Sur 4 jours : **1 680 min = 28 h 00**.

---

## 3. Carte des 8 modules et des 28 notions

> ⚠️ **Note de synchronisation (audit V2 du 29/07/2026).** Ce document est le **macro-design**.
> En cas de désaccord sur le terrain d'une notion, **l'oracle est `00-carte-du-terrain.md` §7**,
> et les modules micro-conçus font foi. Sept cellules de la colonne *Zone · terrain* ont été
> réalignées sur l'oracle : **M1.1** (Z1 → **Z2**), **M1.4** (🟡 → **🔴**), **M4.1** (Z3 → **Z1·Z4**),
> **M5.2** (Z1 → **Z3·Z4**), **M5.4** (Z2 → **Z3**), **M7.1** (Z1 → **Z5**, divergence déjà
> documentée dans `module-M7`), **M8.3** (Z3 → **Z4**).
>
> **Restent à réécrire par le formateur** — les paragraphes *« Motivation de l'ancrage »* de M1
> (M1.1 : *« se joue sur Z1 parce que l'authentification… »*), de M4 (ligne « Terrain » du module),
> de M5 (M5.4 : *« un défaut 🔴 de Z2 »*) et de M7 (M7.1 : *« se joue sur Z1 »*) argumentent encore
> l'ancrage initial. Ce sont des raisonnements pédagogiques : l'audit ne les a pas touchés. La
> justification à jour de chaque notion figure dans la ligne **Ancrage fil rouge** de son module.

Légende des modalités : **DESC** descendant · **INV** pédagogie inversée · **JEU** jeu sérieux ·
**SOLO** exercice individuel · **GRP** exercice de groupe.
Le code entre parenthèses renvoie au critère de `00-grille-modalites.md`.

Légende du terrain — les six zones de `00-fil-rouge.md` :

| Zone | Périmètre |
|---|---|
| **Z1** | Le poste de garde — `backend/auth` + pages front associées |
| **Z2** | Les voyages — `backend/journeys` + liste et détail front |
| **Z3** | Les étapes — `backend/steps` (imbriquées, photos, commentaires) |
| **Z4** | Le magasin — `backend/storage`, fichiers `.md` + `gray-matter` |
| **Z5** | Le monde extérieur — `backend/places` → Nominatim · `backend/map` → OSRM |
| **Z6** | La vitrine — `frontend` React/Vite, `PlaceSearchInput`, carte Leaflet · `e2e/` Playwright |

Légende des états : 🟢 sain (l'étalon) · ⚪ non testé (le terrain d'exercice) ·
🟡 testé mais faux (le piège) · 🔴 bugué (la preuve).

Outillage mobilisé, tout en TypeScript : Jest + `@nestjs/testing` + supertest (back) ·
Vitest + React Testing Library (front) · `@playwright/test` et `@axe-core/playwright` (e2e).

---

### JOUR 1 — COMPRENDRE

#### Module **M1 — « Le test qui ment »** · matin · 160 min + QCM 20

> **Promesse** : « À la fin de ce module, vous saurez reconnaître un test généré qui valide un bug
> au lieu de le détecter — et vous saurez le prouver en une commande. »

**Terrain** : Z1 (le sur-mock d'authentification) · Z2 (l'étalon métier et sa contrefaçon) ·
Z4/Z5/Z6 en appui sur le jeu de tri.

| # | Notion | Modalité | Durée | Zone · terrain | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|---|
| **M1.1** | Le test qui ne peut pas échouer — le sur-mock de la modification d'un voyage | **JEU** — Le Piège (D-4) | 45 | **Z2** 🟡 *(`journeys.update.spec.ts` + 🐞 #7)* | Détecter un test tautologique et prouver qu'il l'est | Exercice court |
| **M1.2** | Ce que mesurent — et ne mesurent pas — les benchmarks | **DESC** + diagramme (A-2) | 35 | **Z2** ⚪ *(démo de génération)* | Situer ce que les LLM réussissent et échouent, chiffres à l'appui | QCM 3 questions |
| **M1.3** | Trois familles d'automatisation : qui fait quoi | **JEU** — Le Tri (B-1) | 40 | **Z4 · Z5 · Z6** *(cartes issues des trois)* | Distinguer IA générative, script déterministe et framework classique | Exercice court |
| **M1.4** | L'oracle : le contrat, pas le code | **DESC** + démo (A-2) | 40 | **Z2** 🟢 *puis* 🔴 | Identifier la source de vérité d'un test et refuser le code comme oracle | QCM 3 questions |

**Motivation de l'ancrage** : M1.1 se joue sur Z1 parce que l'authentification est la zone la
plus simple à lire — le piège ne peut pas être excusé par la complexité. M1.4 part du terrain
🟢 de Z2 (« voilà à quoi ressemble un oracle tenu par `docs/API-CONTRACT.md` ») puis bascule
sur le 🟡 de la même zone : même fonctionnalité, oracle inversé. Le contraste est immédiat.
M1.3 tire ses cartes de trois zones aux natures opposées : un nettoyage de magasin (Z4) est un
script déterministe, un parcours Playwright (Z6) est un framework classique, une suite générée
contre Nominatim (Z5) est de l'IA générative.

**Clôture** : **QCM long M1** — 14 questions, 20 min.
**Rythme** : JEU · DESC · JEU · DESC — aucun doublon consécutif ✓ · ouverture non descendante ✓

---

#### Module **M2 — « De l'exigence au test »** · après-midi · 120 min + boss 60

> **Promesse** : « Vous saurez transformer une spécification floue en cas de test tracés,
> et repérer ce que l'IA a comblé toute seule. »

**Terrain** : Z2 et Z3 lues à travers `docs/API-CONTRACT.md` · Z1 pour la revue de suite.

| # | Notion | Modalité | Durée | Zone · terrain | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|---|
| **M2.1** | Extraire des exigences testables de `docs/API-CONTRACT.md` | **SOLO** (C-1) | 40 | **Z2** ⚪ | Produire une liste d'exigences numérotées et statuées testable/non testable | Exercice court |
| **M2.2** | La revue en 8 points d'une suite générée | **GRP** (C-2) | 40 | **Z1** 🟡 *(+ étalon* 🟢*)* | Appliquer une grille de revue et rendre un verdict argumenté | Exercice court |
| **M2.3** | Ambiguïtés, silences, contradictions : ce que l'IA comble seule | **INV** (D-3) | 40 | **Z3** ⚪ / 🔴 | Détecter les ambiguïtés d'une spec et formuler la question au métier | Restitution |

**Motivation de l'ancrage** : M2.3 se joue sur Z3 parce que les étapes sont imbriquées dans un
voyage — dates, photos, commentaires : c'est là que le contrat se tait le plus (ordre des étapes,
dates hors du voyage parent, suppression en cascade). Les silences sont réels, pas fabriqués.
M2.2 confronte une suite 🟡 de Z1 à la suite 🟢 vue en M1.4 : la grille de revue sépare les deux.

**Clôture** : 🏆 **BOSS J1 — « L'Inventaire »** — 60 min.
**Rythme** : SOLO · GRP · INV — post-déjeuner actif ✓ · INV du jour ✓

---

### JOUR 2 — OUTILLER

#### Module **M3 — « Parler à la machine »** · matin · 160 min + QCM 20

> **Promesse** : « Vous saurez écrire un prompt de test qui produit deux fois le même niveau
> de qualité — et vous saurez pourquoi il ne produira jamais deux fois la même sortie. »

**Terrain** : Z2 ⚪ pour le pari · Z1 🟢 comme modèle de style · le monorepo entier
(`backend`, `frontend`, `e2e`) pour le contexte.

| # | Notion | Modalité | Durée | Zone · terrain | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|---|
| **M3.1** | Le pari : deux prompts, un même code | **JEU** — Le Pari (D-3) | 40 | **Z2** ⚪ | Mesurer l'écart de qualité entre prompt naïf et prompt structuré | Exercice court |
| **M3.2** | Anatomie d'un prompt de test : les cinq blocs | **DESC** + diagramme (A-2) | 40 | **Z1** 🟢 *(le bloc « style attendu »)* | Construire un prompt à partir d'un gabarit à cinq blocs | QCM 3 questions |
| **M3.3** | Explorer le monorepo sans le charger en entier | **SOLO** (C-1) | 40 | **Z1→Z6** *(arborescence `backend` / `frontend` / `e2e`)* | Mesurer et réduire la consommation de contexte d'une session | Exercice court |
| **M3.4** | Industrialiser : versionner un prompt comme du code | **GRP** (E-1) | 40 | **Z2** *(back)* · **Z6** *(front)* | Définir une convention d'équipe pour versionner et évaluer un prompt | Exercice court |

**Motivation de l'ancrage** : M3.3 se joue sur le monorepo réel — trois `package.json`, trois
runners, un dossier `docs/`. Le participant doit trouver la règle de validation d'une zone sans
ouvrir tout le back : c'est la compétence de contexte, pas un exercice de lecture. M3.2 prend le
test 🟢 de Z1 comme exemple de style à citer dans le prompt : l'étalon devient un bloc du gabarit.
M3.4 impose deux prompts d'équipe, un back (Jest/supertest) et un front (Vitest/RTL) — la
convention doit tenir sur les deux runners.

**Clôture** : **QCM long M3** — 13 questions, 20 min.
**Rythme** : JEU · DESC · SOLO · GRP ✓ · ouverture non descendante ✓

---

#### Module **M4 — « L'atelier »** · après-midi · 120 min + boss 60

> **Promesse** : « Vous saurez faire travailler un agent contre le vrai produit, pas contre
> l'idée qu'il s'en fait. »

**Terrain** : Z3 ⚪ pour les gestes · Z6 🟡 pour le sélecteur halluciné · les trois runners du
dépôt pour le panorama d'outils.

| # | Notion | Modalité | Durée | Zone · terrain | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|---|
| **M4.1** | Claude Code : les dix gestes qui servent en QA | **SOLO** (C-1) | 40 | **Z1** ⚪ *(feature #3)* · **Z4** | Exécuter les commandes de session, de contexte et de permission | Exercice court |
| **M4.2** | MCP : donner des yeux à l'agent sur la vitrine | **DESC** + démo (A-2) | 40 | **Z6** 🟡 | Expliquer l'apport de l'arbre d'accessibilité et brancher un serveur MCP | QCM 3 questions |
| **M4.3** | Choisir son outil : panorama et critères | **INV** (D-1) | 40 | **Z1→Z6** *(Jest · Vitest · Playwright)* | Construire une grille de choix d'outil défendable devant sa hiérarchie | Restitution |

**Motivation de l'ancrage** : M4.2 se joue sur Z6 parce que c'est la seule zone où l'agent peut
inventer une réalité — un sélecteur plausible sur `PlaceSearchInput` ou sur la carte Leaflet, qui
n'existe dans aucun DOM. Le MCP Playwright y répond en donnant l'arbre d'accessibilité réel. Le
malus « sélecteur inventé » (−30 PR) devient palpable ici.
M4.3 se joue sur une contrainte réelle : le dépôt impose déjà trois runners TypeScript ; la grille
doit expliquer pourquoi, pas choisir dans le vide.

**Clôture** : 🏆 **BOSS J2 — « L'Éclaireur »** — 60 min.
**Rythme** : SOLO · DESC · INV — post-déjeuner actif ✓ · INV du jour ✓

---

### JOUR 3 — INDUSTRIALISER

#### Module **M5 — « L'agent qui travaille seul »** · matin · 160 min + QCM 20

> **Promesse** : « Vous saurez construire un agent qui génère, exécute et corrige —
> et l'empêcher de tricher. »

**Terrain** : Z2 et Z3 🔴 pour la chasse et la triche · Z1 🟢 pour la boucle ·
Z4 pour le garde-fou de propreté du magasin.

| # | Notion | Modalité | Durée | Zone · terrain | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|---|
| **M5.1** | La chasse : cinq défauts cachés en quinze minutes | **JEU** — La Chasse (D-3) | 40 | **Z2 · Z3** 🔴 | Éprouver ce qu'un agent trouve seul et ce qu'il ne trouve pas | Exercice court |
| **M5.2** | La boucle : générer → exécuter → analyser → corriger | **DESC** + diagramme (A-2) | 40 | **Z3 · Z4** ⚪ *(feature #10)* | Énoncer la condition de vérité de chaque étape de la boucle | QCM 3 questions |
| **M5.3** | Construire l'agent : skill, subagent, hook | **SOLO** (C-2) | 45 | **Z3** ⚪ *+ hook sur* **Z4** | Assembler un agent minimal qui exécute réellement les tests | Exercice court |
| **M5.4** | L'agent qui triche : garde-fous et vérification | **JEU** — Le Piège (D-4) | 35 | **Z3** 🔴 *(🐞 #9)* | Détecter une modification d'assertion faite pour verdir un test | Exercice court |

**Motivation de l'ancrage** : M5.4 se joue sur un défaut 🔴 de Z2 — le test rouge est légitime,
donc la seule façon de verdir est de mentir. C'est le piège dans sa forme pure, et il prépare le
malus de −60 PR du Boss J2 comme la catégorie 🔴 du Boss J3.
M5.3 impose un hook sur Z4 : l'agent ne rend la main que si le magasin est propre. Le garde-fou
est vérifiable à l'œil, sur des fichiers `.md`, sans instrumentation.
M5.1 sépare volontairement Z2 (défauts métier, atteignables par lecture) et Z3 (défauts
d'imbrication, invisibles hors exécution) : l'agent réussit sur l'une et échoue sur l'autre.

**Clôture** : **QCM long M5** — 14 questions, 20 min.
**Rythme** : JEU · DESC · SOLO · JEU ✓ · ouverture non descendante ✓

---

#### Module **M6 — « Dans le pipeline »** · après-midi · 120 min + boss 60

> **Promesse** : « Vous saurez classer un échec de CI en quatre catégories, et vous ne
> corrigerez plus jamais une flakiness par un retry. »

**Terrain** : Z5 (Nominatim, OSRM) pour l'instabilité native · Z4 pour l'isolation ·
Z2/Z3 🟡🔴 pour les autres causes d'échec.

| # | Notion | Modalité | Durée | Zone · terrain | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|---|
| **M6.1** | Quatre causes, quatre gestes : classer un échec | **GRP** (B-2) | 40 | **Z2·Z3** 🔴 · **Z4** · **Z5** · 🟡 | Classer un échec en vrai bug / test faux / flaky / environnement | Exercice court |
| **M6.2** | Combien coûte un test qui dépend de Nominatim ? | **INV** (D-1) | 40 | **Z5** 🌀 | Chiffrer le coût de la flakiness et le défendre avec ses sources | Restitution |
| **M6.3** | Mettre l'agent en CI sans se faire piéger | **SOLO** (C-2) | 40 | **Z4** *(isolation)* · **Z5** *(neutralisation)* | Écrire un workflow avec secrets, permissions minimales et budget | Exercice court |

**Motivation de l'ancrage** : M6.2 se joue sur Z5 parce que l'instabilité y est **réelle** et non
simulée. Nominatim et OSRM sont des services publics, gratuits, sans clé : ils répondent lentement,
limitent le débit, tombent. Le participant relance la même suite et n'obtient pas le même résultat —
c'est la définition de la flakiness, vécue et non racontée. Le chiffrage porte sur ce cas.
M6.1 utilise les cinq signaux discriminants du Boss J3 : chaque catégorie a sa zone d'élection
(🌍 extérieur → Z5, 📁 magasin → Z4, 🟡 test faux et 🔴 vrai bug → Z2/Z3). Le classement se fait
sur des échecs prélevés, pas inventés.
M6.3 traite l'isolation du magasin en CI : sans répertoire dédié par exécution, l'ordre des tests
décide du résultat.

**Clôture** : 🏆 **BOSS J3 — « Le Passage difficile »** — 60 min.
**Rythme** : GRP · INV · SOLO — post-déjeuner actif ✓ · INV du jour ✓

---

### JOUR 4 — DÉCIDER

#### Module **M7 — « Ce que l'IA ne voit pas »** · matin · 160 min + QCM 20

> **Promesse** : « Vous saurez couvrir ce qui fait vraiment tomber la production :
> la charge, la faille et l'utilisateur qu'on n'a pas prévu. »

**Terrain** : Z1 pour la sécurité · Z2 + Z4 pour la charge · Z6 pour l'accessibilité.

| # | Notion | Modalité | Durée | Zone · terrain | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|---|
| **M7.1** | Le pari : l'IA trouve-t-elle cette faille ? | **JEU** — Le Pari (D-3) | 35 | **Z5** 🔴 *(🐞 #16, inversion `lat`/`lng`)* | Constater les angles morts de l'analyse par LLM | Exercice court |
| **M7.2** | Performance : une API dont la base est un dossier de fichiers | **SOLO** (C-1) | 45 | **Z2** *(API NestJS)* · **Z4** *(magasin)* | Écrire un scénario de charge à taux d'arrivée avec seuils bloquants | Exercice court |
| **M7.3** | Sécurité : ce que le LLM ne peut pas garantir | **DESC** + diagramme (A-2) | 40 | **Z1** *(JWT, reset)* · **Z4** *(écriture pilotée par l'entrée)* | Situer DAST, SAST et revue LLM dans une chaîne de sécurité | QCM 3 questions |
| **M7.4** | Accessibilité : ce qu'`axe` voit sur une carte, et ce qu'il ne voit pas | **GRP** (B-1) | 40 | **Z6** *(Leaflet, `PlaceSearchInput`)* | Distinguer ce qu'un outil détecte de ce qui exige un test humain | Exercice court |

**Motivation de l'ancrage** : M7.2 se joue sur le couple Z2 × Z4. L'API NestJS répond vite tant
qu'on la sollicite seule ; le magasin, lui, relit et réécrit des fichiers `.md`. Un tir de charge
(k6 ou équivalent en TypeScript) sur les listes de voyages met en évidence un coût qui croît avec
le nombre de fichiers — un comportement de stockage, invisible en test unitaire.
M7.4 se joue sur Z6 parce que la carte Leaflet et `PlaceSearchInput` sont deux cas d'accessibilité
redoutables et **réels** : une carte interactive est massivement non navigable au clavier, et un
champ à suggestions asynchrones est un motif que `@axe-core/playwright` ne juge que partiellement.
Le tiers automatisable se démontre là, pas sur un formulaire d'école.
M7.1 se joue sur Z1 : le poste de garde concentre JWT, réinitialisation de mot de passe et
messages d'erreur — les angles morts classiques d'une revue par LLM.

**Clôture** : **QCM long M7** — 15 questions, 20 min.
**Rythme** : JEU · SOLO · DESC · GRP ✓ · ouverture non descendante ✓

---

#### Module **M8 — « Décider »** · après-midi · 120 min + boss final 60

> **Promesse** : « Vous saurez dire ce que vous couvrez, ce que vous ne couvrez pas,
> ce que ça coûte — et le défendre devant une direction. »

**Terrain** : les six zones prises comme portefeuille de risque · Z1 🟢 comme référence
d'évaluation · Z1/Z3/Z5 pour le volet conformité.

| # | Notion | Modalité | Durée | Zone · terrain | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|---|
| **M8.1** | L'enchère : où mettre l'effort de test sur les six zones ? | **JEU** — L'Enchère (B-2) | 40 | **Z1→Z6** *(budget à répartir)* | Prioriser une campagne par probabilité × impact sous contrainte de budget | Exercice court |
| **M8.2** | Gouverner un agent dans la durée : dérive et évaluations | **INV** (D-1) | 40 | **Z1** 🟢 *(jeu d'évaluations de référence)* | Concevoir un jeu d'évaluations de non-régression pour un agent | Restitution |
| **M8.3** | Conformité : ce qui vous engage juridiquement | **DESC** + GRP (A-1, E-1) | 40 | **Z1** *(comptes)* · **Z4** *(`data/mails/`, `/uploads/`, magasin `.md`)* · **Z5** *(sortie du SI)* | Identifier les obligations RGPD et AI Act d'une chaîne de test augmentée | QCM 3 questions |

**Motivation de l'ancrage** : M8.3 se joue sur trois zones parce que le projet pose trois
questions de conformité distinctes et vraies — des comptes utilisateurs et leurs mots de passe
(Z1), des contenus personnels versés par l'utilisateur, photos et commentaires (Z3), et des
données qui **sortent réellement du SI** puisque chaque géocodage envoie une adresse à un service
tiers (Z5). Le tableau de conformité s'écrit sur ces trois cas, pas sur des exemples génériques.
M8.1 utilise les six zones comme portefeuille : leur difficulté d'accès (⭐ à ⭐⭐⭐⭐) et leur état
🟢⚪🟡🔴 sont connus depuis le Boss J1 — l'enchère se joue donc sur de l'information acquise.
M8.2 prend la zone 🟢 comme jeu d'évaluations de référence : c'est le seul terrain dont on sait
qu'il doit rester vert.

**Clôture** : 🏔️ **BOSS FINAL — « Le Comité de mise en ligne »** — 60 min, soutenance contradictoire.
**Rythme** : JEU · INV · DESC — post-déjeuner actif ✓ · INV du jour ✓

---

### 3.1 Couverture des six zones par le programme

Contrôle de non-oubli : aucune zone ne doit rester hors du parcours, aucune ne doit le saturer.

| Zone | Notions qui s'y jouent | Boss concernés |
|---|---|---|
| **Z1** | M1.1 · M2.2 · M3.2 · M5.2 · M7.1 · M7.3 · M8.2 · M8.3 | J1, J3, J4 |
| **Z2** | M1.2 · M1.4 · M2.1 · M3.1 · M3.4 · M5.1 · M5.4 · M6.1 · M7.2 | J1, J2, J3, J4 |
| **Z3** | M2.3 · M4.1 · M5.1 · M5.3 · M6.1 · M8.3 | J1, J2, J3, J4 |
| **Z4** | M1.3 · M5.3 · M6.1 · M6.3 · M7.2 · M7.3 | J1, J3, J4 |
| **Z5** | M1.3 · M6.1 · M6.2 · M6.3 · M8.3 | J1, J3, J4 |
| **Z6** | M1.3 · M3.4 · M4.2 · M7.4 | J1, J2, J4 |

Les zones transverses (M3.3, M4.3, M8.1) balaient `Z1→Z6` et ne sont pas comptées ici.

---

## 4. Grille de contrôle du concepteur — vérification

| Contrôle | Cible | J1 | J2 | J3 | J4 | Verdict |
|---|---|---|---|---|---|---|
| Nombre de notions | 7 | 7 | 7 | 7 | 7 | ✅ |
| Modalités distinctes utilisées | ≥ 4 / 5 | 5 | 5 | 5 | 5 | ✅ |
| Doublons de modalité consécutifs | 0 | 0 | 0 | 0 | 0 | ✅ |
| Pédagogie inversée | ≥ 1 | 1 | 1 | 1 | 1 | ✅ |
| Jeu sérieux | ≥ 1 | 2 | 1 | 2 | 2 | ✅ |
| Première séquence non descendante | oui | ✓ | ✓ | ✓ | ✓ | ✅ |
| Séquence post-déjeuner active | oui | SOLO | SOLO | GRP | JEU | ✅ |
| Micro-évaluations | 7 | 7 | 7 | 7 | 7 | ✅ |
| Clôtures (QCM long + boss) | 2 | 2 | 2 | 2 | 2 | ✅ |
| Total minuté | 420 | 420 | 420 | 420 | 420 | ✅ |
| Zones distinctes mobilisées dans la journée | ≥ 3 | 5 | 5 | 5 | 6 | ✅ |

**Détail du minutage par demi-journée** :

| Jour | Module matin | Notions | Module après-midi | Notions | Contrôle |
|---|---|---|---|---|---|
| J1 | M1 | 45 + 35 + 40 + 40 = **160** | M2 | 40 + 40 + 40 = **120** | 15 + 160 + 15 + 20 + 120 + 15 + 60 + 15 = **420** ✅ |
| J2 | M3 | 40 + 40 + 40 + 40 = **160** | M4 | 40 + 40 + 40 = **120** | **420** ✅ |
| J3 | M5 | 40 + 40 + 45 + 35 = **160** | M6 | 40 + 40 + 40 = **120** | **420** ✅ |
| J4 | M7 | 35 + 45 + 40 + 40 = **160** | M8 | 40 + 40 + 40 = **120** | **420** ✅ |

**Part de descendant** : 235 min de DESC pur + ~20 min de la part descendante de M8.3
= **255 min sur 1 120 min de notions = 22,8 %** — sous le plafond de 35 % ✅

**Répartition globale des 28 notions**

| Modalité | Notions | Minutes | Part |
|---|---|---|---|
| JEU | 7 | 275 | 24,6 % |
| SOLO | 6 | 250 | 22,3 % |
| DESC | 6 | 235 | 21,0 % |
| INV | 4 | 160 | 14,3 % |
| GRP | 5 | 200 | 17,8 % |
| **Total** | **28** | **1 120** | **100 %** |

**Vérification du détail** : JEU = 45 + 40 + 40 + 40 + 35 + 35 + 40 = 275 ·
SOLO = 40 + 40 + 40 + 45 + 40 + 45 = 250 · DESC = 35 + 40 + 40 + 40 + 40 + 40 = 235 ·
INV = 4 × 40 = 160 · GRP = 5 × 40 = 200. Somme = **1 120 min** ✅
Notions 1 120 + briefs et débriefs 4 × 30 + pauses 4 × 30 + QCM longs 4 × 20 + boss 4 × 60
= 1 120 + 120 + 120 + 80 + 240 = **1 680 min = 28 h** ✅

---

## 5. Les 8 clôtures de module

| Module | Type | Durée | Objet |
|---|---|---|---|
| M1 | QCM long — 14 questions | 20 | Valider la lecture critique d'une suite générée |
| M2 | 🏆 BOSS J1 — *L'Inventaire* | 60 | Dresser la matrice des quatre états sur les six zones et tracer les exigences |
| M3 | QCM long — 13 questions | 20 | Valider la maîtrise du prompt et du contexte |
| M4 | 🏆 BOSS J2 — *L'Éclaireur* | 60 | Livrer un agent qui génère, exécute et commente sur une zone non testée |
| M5 | QCM long — 14 questions | 20 | Valider la boucle et ses garde-fous |
| M6 | 🏆 BOSS J3 — *Le Passage difficile* | 60 | Remettre la suite au vert sans `.skip` ni retry, en classant chaque échec |
| M7 | QCM long — 15 questions | 20 | Valider la couverture non fonctionnelle |
| M8 | 🏔️ BOSS FINAL — *Le Comité de mise en ligne* | 60 | Défendre un Go/No-Go argumenté devant contradiction |

**Total évaluation** : 4 × 20 + 4 × 60 = **320 min**, soit **19 %** du temps de formation.
Ce n'est pas du temps perdu : c'est le temps où l'apprentissage se fixe.

---

## 6. Ce qui reste à instancier

Le projet fil rouge est connu et instancié dans tout ce document. Trois éléments manquent
encore, tous extractibles du dépôt en une lecture.

| Élément manquant | Source exacte | Ce qu'il verrouille |
|---|---|---|
| Tableau nominatif fonctionnalité → état 🟢⚪🟡🔴 → défaut | contenu de `docs/stats.md` | La matrice du Boss J1, les notions piège M1.1, M5.1, M5.4, M7.1 |
| Routes, payloads, types et ambiguïtés du contrat | contenu de `docs/API-CONTRACT.md` | Les exigences `EX-001…` de M2.1, les silences de M2.3 |
| Commandes exactes de test, de couverture et de lancement | scripts des `package.json` (back, front, e2e) | Toutes les notions SOLO et les trois boss techniques |

Tant que ces trois éléments ne sont pas repris, les notions s'écrivent avec des emplacements
réservés au niveau de la zone. Une fois repris, chaque exercice porte un résultat attendu
vérifiable au caractère près.
