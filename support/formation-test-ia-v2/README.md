# Tests & IA — Support de formation V2

> **Formation Human Coders (Qualiopi) · Formateur : Evan BOISSONNOT**
> **28 h — 4 jours × 7 h** · 09:00-12:30 / 14:00-17:30
> **Projet fil rouge : *Carnet de voyage*** — un vrai dépôt TypeScript, avec ses vrais bugs.

---

## Statut — livré

| Étape | État |
|---|---|
| **Macro-conception** — architecture, fil rouge, grille des modalités, carte du terrain | ✅ **livrée** |
| **Micro-conception** — les 28 notions écrites, minutées, évaluées | ✅ **livrée** |
| **Évaluations** — 28 micro-évaluations, 4 QCM longs, 4 cols | ✅ **livrées** |
| **Diagrammes** — 30 sources Mermaid + visionneuse d'export | ✅ **livrés** |
| **Guide d'animation** — minutage, plans B, FAQ, Qualiopi | ✅ **livré** |
| **Audit qualité** — 9 contrôles C1-C9 | ✅ **`RAPPORT-VERIFICATION-V2.md`** |

**Le support se déroule tel quel en séance.** Ce n'est pas un manuel dans lequel on puise :
c'est un scénario minuté qu'on exécute.

### Chiffres de contrôle

| Grandeur | Valeur | Vérifiée |
|---|---|---|
| Durée totale | **28 h = 1 680 min** | ✅ recalculée |
| Demi-journées | **8 × 210 min** | ✅ 8/8 exactes |
| Temps de notions | **1 120 min** | ✅ |
| Modules | **8** | ✅ |
| Notions | **28** | ✅ |
| Micro-évaluations | **28** *(une par notion)* | ✅ |
| QCM longs | **4** — 14 + 13 + 14 + 15 = **56 questions** | ✅ |
| Cols (TP évalués de 60 min) | **4** | ✅ |
| Diagrammes | **30** *(28 de notion + 2 de col)* | ✅ |
| Volume rédigé | **≈ 237 000 mots · 1,7 Mo** | — |
| Part de descendant | **21,0 %** *(plafond : 35 %)* | ✅ |

---

## Ce que la V2 change

| | V1 | V2 |
|---|---|---|
| Unité de base | le **module** (15-30 p.) | la **notion** (2-4 p., 35-45 min) |
| Logique | exhaustivité — tout dire | progression — une chose à la fois, apprise **et vérifiée** |
| Modalité | toujours la même | **choisie** selon l'objectif, et **justifiée** par un critère |
| Évaluation | 4 exercices en fin de module | **28 micro-évaluations** + 4 QCM longs + 4 cols |
| Rôle du formateur | puiser dans un manuel | **dérouler un scénario minuté** |
| Terrain | exemples génériques | **un dépôt réel**, ses 16 features, ses 6 bugs, ses 2 tests menteurs |

Trois principes tiennent tout le dispositif :

1. **Une notion sans vérification n'a pas eu lieu.** 28 notions, 28 micro-évaluations.
2. **Un piège raconté ne protège de rien.** Les anti-patterns se vivent, publiquement, sans enjeu
   (critère `D-4`).
3. **Aucun nom de fichier, aucune route, aucun test n'est écrit sans avoir été relevé dans le
   dépôt.** Vérifié : 0 chemin inventé, 0 route inventée, 0 URL non tracée.

---

## Arborescence réelle

```
formation-test-ia-v2/
│
├── README.md                              ← ce fichier — index du support
├── RAPPORT-VERIFICATION-V2.md    4 900 m. ← audit qualité C1-C9, anomalies et corrections
│
│   ── CADRAGE ── à lire une fois, avant tout ────────────────────────────────
├── 00-fil-rouge.md               3 500 m. ← le projet, les 6 zones, les règles du jeu,
│                                            le barème en Points de Repère, les 4 cols
├── 00-carte-du-terrain.md        3 000 m. ← ⭐ L'ORACLE : 16 features × 6 zones × 4 états,
│                                            les 6 bugs fiche par fiche, les 2 tests menteurs,
│                                            et où chaque notion va chercher son terrain (§7)
├── 00-architecture-28h.md        5 000 m. ← macro-design : les 8 modules, les 28 notions,
│                                            modalité · durée · terrain · objectif, minutage 1 680
├── 00-grille-modalites.md        1 700 m. ← les 5 modalités, les 12 critères A-1…E-2,
│                                            les 10 règles de rythme, le catalogue des 9 jeux
├── 00-gabarit-notion.md          1 700 m. ← le contrat d'écriture d'une notion (structure imposée)
├── 00-guide-animation.md         9 600 m. ← ⭐ EN SÉANCE : préparation J-1, minutage des 4 jours,
│                                            fiches par module, plans B, FAQ, dossier Qualiopi
│
│   ── LES 8 MODULES ── le scénario qui se déroule en séance ─────────────────
├── module-M1-le-test-qui-ment.md            17 500 m.   J1 matin
├── module-M2-de-l-exigence-au-test.md       18 900 m.   J1 après-midi
├── module-M3-parler-a-la-machine.md         24 700 m.   J2 matin
├── module-M4-l-atelier.md                   17 100 m.   J2 après-midi
├── module-M5-l-agent-qui-travaille-seul.md  21 700 m.   J3 matin
├── module-M6-dans-le-pipeline.md            18 700 m.   J3 après-midi
├── module-M7-ce-que-l-ia-ne-voit-pas.md     24 700 m.   J4 matin
├── module-M8-decider.md                     20 100 m.   J4 après-midi
│
│   ── LES 4 COLS ── un TP évalué de 60 min qui ferme chaque journée ─────────
├── boss/
│   ├── boss-J1-inventaire.md             7 400 m.   100 PR
│   ├── boss-J2-eclaireur.md             11 000 m.   100 PR
│   ├── boss-J3-passage-difficile.md      9 000 m.   100 PR
│   └── boss-J4-comite-mise-en-ligne.md  13 800 m.   200 PR — le Sommet
│
└── diagrammes/                                     296 Ko
    ├── index.html                       ← visionneuse : rendu, export SVG et PNG
    ├── _sources.json                    ← index des 30 diagrammes
    └── 30 fichiers .mmd                 ← sources Mermaid, modifiables
```

---

## Les 8 modules × 28 notions

**Légende des modalités** — `DESC` descendant · `INV` pédagogie inversée · `JEU` jeu sérieux ·
`SOLO` exercice individuel · `GRP` exercice de groupe.
**Légende du terrain** — 🟢 sain (l'étalon) · ⚪ non testé (le terrain d'exercice) ·
🟡 testé mais faux (le piège) · 🔴 bugué (la preuve).
**Zones** — `Z1` auth · `Z2` journeys · `Z3` steps · `Z4` magasin `.md` · `Z5` Nominatim/OSRM ·
`Z6` front et E2E.

| Module | Jour | Notions · modalité · durée | Terrain dominant | Clôture |
|---|---|---|---|---|
| **M1 — Le test qui ment** | J1 matin | `JEU` 45 · `DESC` 35 · `JEU` 40 · `DESC` 40 — **160 min** | **Z2** 🟡 le faux positif `journeys.update.spec.ts` + 🐞 #7, puis 🟢 étalon #2 → 🔴 rouge légitime #6 | **QCM long M1** — 14 q. |
| **M2 — De l'exigence au test** | J1 aprem | `SOLO` 40 · `GRP` 40 · `INV` 40 — **120 min** | **Z2 · Z3** ⚪ le contrat comme source d'exigences, et ses **9 silences** | 🏆 **Col J1 — L'Inventaire** |
| **M3 — Parler à la machine** | J2 matin | `JEU` 40 · `DESC` 40 · `SOLO` 40 · `GRP` 40 — **160 min** | **Z2** ⚪ features #5/#12 · le **monorepo entier** pour le budget de contexte | **QCM long M3** — 13 q. |
| **M4 — L'atelier** | J2 aprem | `SOLO` 40 · `DESC` 40 · `INV` 40 — **120 min** | **Z1 · Z4** ⚪ feature #3 · **Z6** ⚪ feature #15 (carte Leaflet, MCP) | 🏆 **Col J2 — L'Éclaireur** |
| **M5 — L'agent qui travaille seul** | J3 matin | `JEU` 40 · `DESC` 40 · `SOLO` 45 · `JEU` 35 — **160 min** | **Z2·Z3·Z5** 🔴 les 6 bugs sans `grep BUG:` · **Z3** 🔴 🐞 #9, l'agent qui triche | **QCM long M5** — 14 q. |
| **M6 — Dans le pipeline** | J3 aprem | `GRP` 40 · `INV` 40 · `SOLO` 40 — **120 min** | 🔴🟡⚪ la **suite réelle** · **Z5** 🟡 `place-search.spec.ts`, le flaky natif | 🏆 **Col J3 — Le Passage difficile** |
| **M7 — Ce que l'IA ne voit pas** | J4 matin | `JEU` 35 · `SOLO` 45 · `DESC` 40 · `GRP` 40 — **160 min** | **Z5** 🔴 🐞 #16 `lat`/`lng` · **Z4** charge · **Z1** sécurité · **Z6** accessibilité | **QCM long M7** — 15 q. |
| **M8 — Décider** | J4 aprem | `JEU` 40 · `INV` 40 · `DESC`+`GRP` 40 — **120 min** | **Z1→Z6** les 16 features comme lots d'enchère · **Z4** RGPD et AI Act | 🏔️ **Col final — Le Comité** |

**Détail des 28 notions** : `00-architecture-28h.md` §3 (une ligne par notion, avec objectif
d'apprentissage et micro-évaluation) — ou le tableau §0.3 en tête de chaque module.

### Équilibre des modalités — vérifié

| Modalité | Notions | Minutes | Part |
|---|---|---|---|
| `JEU` jeu sérieux | 7 | 275 | 24,6 % |
| `SOLO` exercice individuel | 6 | 250 | 22,3 % |
| `DESC` descendant | 6 | 235 | **21,0 %** *(plafond 35 %)* |
| `GRP` exercice de groupe | 5 | 200 | 17,8 % |
| `INV` pédagogie inversée | 4 | 160 | 14,3 % |
| **Total** | **28** | **1 120** | **100 %** |

Règles de rythme respectées les 4 jours : aucun doublon de modalité consécutif · ≥ 1 pédagogie
inversée et ≥ 1 jeu sérieux par jour · aucune séquence descendante de plus de 12 min sans
interaction · ouverture de journée jamais descendante · séquence post-déjeuner toujours active.

---

## Les 4 QCM longs

Un module de **matin** se ferme sur un QCM long : 20 minutes, correction commentée à voix haute,
0 à 50 Points de Repère au prorata.

| QCM | Module | Questions | Où |
|---|---|---|---|
| **QCM M1** | Le test qui ment | **14** | `module-M1-le-test-qui-ment.md` §5 |
| **QCM M3** | Parler à la machine | **13** | `module-M3-parler-a-la-machine.md` §5 |
| **QCM M5** | L'agent qui travaille seul | **14** | `module-M5-l-agent-qui-travaille-seul.md` §5 |
| **QCM M7** | Ce que l'IA ne voit pas | **15** | `module-M7-ce-que-l-ia-ne-voit-pas.md` §5 |

**56 questions**, chacune à 4 options, avec la bonne réponse identifiée **et une justification
écrite pour chaque distracteur** — c'est là que se joue l'apprentissage, pas dans le score.

## Les 4 cols

Un module d'**après-midi** se ferme sur un col : 60 minutes de mise en situation évaluée.

| Col | Jour | Ce qu'on y fait | Livrable | PR |
|---|---|---|---|---|
| 🏆 **J1 — L'Inventaire** | J1 · 16:15 | Cartographier les 16 features : bug ou pas, testé ou pas, **avec preuve** | `carnet/j1-inventaire.md` | **100** |
| 🏆 **J2 — L'Éclaireur** | J2 · 16:15 | Construire un agent qui lit une exigence, écrit un test, **l'exécute** et classe l'échec | agent `.claude/` + `carnet/j2-rapport-agent.md` | **100** |
| 🏆 **J3 — Le Passage difficile** | J3 · 16:15 | Stabiliser une suite rouge : classer, neutraliser le monde extérieur, isoler le magasin | `carnet/j3-post-mortem.md` | **100** |
| 🏔️ **J4 — Le Comité de mise en ligne** | J4 · 16:15 | Défendre un Go / No-Go devant un comité contradicteur, 10 min par cordée | `carnet/CARNET-DE-ROUTE.md` | **200** |

Chaque col est fourni avec sa mise en situation, son barème détaillé critère par critère, son
corrigé intégral, ses plans B et son protocole de débrief. **Barèmes vérifiés : 100 / 100 / 100 / 200.**

---

## Comment le formateur utilise ce support

### Avant la session — l'ordre de lecture

| # | Document | Pourquoi | Temps |
|---|---|---|---|
| 1 | `00-fil-rouge.md` | Le projet, les 6 zones, les cordées, le barème. **Tout le reste s'y réfère.** | 25 min |
| 2 | `00-carte-du-terrain.md` | ⭐ **L'oracle.** Les 16 features, les 6 bugs, les 2 tests menteurs. En cas de doute sur un terrain, **ce document tranche.** | 30 min |
| 3 | `00-architecture-28h.md` | La vue d'ensemble des 28 notions et le minutage. | 20 min |
| 4 | `00-grille-modalites.md` | Les critères `A-1`…`E-2` et le protocole `D-4` des anti-patterns. | 15 min |
| 5 | `00-guide-animation.md` §1 | La checklist de préparation **la veille**, matériel compris. | 20 min |
| 6 | Le module du jour, **en entier** | C'est le script. Les 🔐 encadrés ne sont jamais projetés. | 60 min / module |
| 7 | Le col du jour | Barème et corrigé, à connaître **avant** de lancer le TP. | 30 min / col |

*(`00-gabarit-notion.md` est un document de production : utile pour écrire une notion
supplémentaire, inutile pour animer.)*

### La veille de chaque journée

`00-guide-animation.md` §1 et le **§0.6 « Préparation matérielle »** du module concerné :
`npm install`, la suite back qui doit sortir **en rouge** (2 suites passent, 2 échouent), le back
sur `http://localhost:3000/api`, le front sur `http://localhost:5173`, `npx playwright install`,
et le matériel imprimé (cartes de tri, fiches, grilles de barème).

### En séance — quoi ouvrir

| Écran | Contenu |
|---|---|
| **Écran 1 — projeté** | `diagrammes/index.html` sur le diagramme de la notion en cours, et le terminal pour les démos |
| **Écran 2 — formateur seul** | Le **module du jour**, sur la notion en cours : le déroulé minuté se lit ligne à ligne |
| **Papier** | `00-guide-animation.md` §2 (minutage de la journée) et §4 (les moments à ne pas rater) |

**Une notion se déroule ainsi :** on lit le tableau d'identité (30 s), on ouvre le déroulé minuté,
et **on suit les lignes**. Chaque ligne dit ce que fait le formateur et ce que font les
participants, à la minute. La dernière ligne est toujours une **synthèse par les participants** —
jamais par le formateur. Puis la micro-évaluation, corrigée en moins de 60 secondes.

### Le rituel de fin de module

Score annoncé **à voix haute en 60 secondes**, inscrit dans `CARNET-DE-BORD.md` (à la racine du
dépôt partagé). Badges attribués. Aucun module ne se termine sans une victoire mesurable.

### Si ça rate

`00-guide-animation.md` **§7 Plan B** : poste sans Claude Code, backend qui ne démarre pas,
Playwright absent, groupe en retard, salle de 3 participants. Chaque col porte en outre sa propre
section « Plan B » **avec le barème dégradé correspondant** — et la consigne de toujours annoncer
que le barème a changé.

---

## Les diagrammes

**30 diagrammes** : 28 de notion (un par notion) + 2 de col.

| Élément | Rôle |
|---|---|
| **`diagrammes/index.html`** | La **visionneuse**. Ouvrir dans un navigateur — aucune installation. Rend les 30 diagrammes via Mermaid, permet de les projeter plein écran et de les **exporter en SVG ou en PNG** (impression, slides, remise aux participants). |
| **Les 30 fichiers `.mmd`** | Les **sources Mermaid**, modifiables. Le formateur peut adapter un libellé, une couleur, un nœud, sans repartir de zéro. |
| **`_sources.json`** | L'index machine des 30 diagrammes (titre, module, notion). |
| **Les notices de dévoilement** | ⭐ Dans **chaque module**, sous chaque diagramme : *« ce qu'on montre en premier, dans quel ordre on le dévoile, la phrase à dire sur chaque élément, et l'erreur d'interprétation à prévenir »*. **C'est là que se trouve la valeur pédagogique** — un diagramme projeté d'un coup ne fait rien ; dévoilé dans l'ordre, il remplace 500 mots. |

Un diagramme n'est jamais décoratif : il n'existe que là où il clarifie.

---

## Le fonds documentaire V1

La V2 est un **scénario** ; la V1 reste le **manuel de référence** et n'est pas jetée.

| Ressource | Chemin | Contenu |
|---|---|---|
| **Modules V1** | `../formation-test-ia/module-*.md` | 13 modules exhaustifs, ≈ 520 pages A4 |
| **Corpus de sources** | `../formation-test-ia/recherche/sources-jour{1,2,3,4}.md` | **≈ 520 sources vérifiées** (juillet 2026), avec URL, type, année et apport |
| **Annexes** | `../formation-test-ia/annexes/` | A glossaire · B bibliothèque de prompts · C grilles d'évaluation · D bibliographie complète |
| **Cheat-sheet PDF** | `../formation-test-ia/cheatsheet/cheatsheet-je-teste-avec-lia.pdf` | Le **mémo 2 pages** à remettre aux participants — déjà produit, prêt à imprimer *(sources HTML/CSS à côté pour retouche)* |

**Traçabilité vérifiée** : les 173 URLs de contenu citées dans la V2 proviennent **toutes** de ce
corpus, sans exception. Les contenus V1 hors stack (.NET/C#, Angular) restent consultables en
annexe mais ne sont **ni recopiés ni projetés** en V2.

---

## Contrôle qualité

`RAPPORT-VERIFICATION-V2.md` — audit en 9 contrôles, tous **au vert** :

| | Contrôle | Résultat |
|---|---|---|
| **C1** | Minutage | 28/28 notions exactes · 8/8 demi-journées à 210 min · **1 680 min** |
| **C2** | Conformité au gabarit | **28/28** notions conformes sur 16 points chacune |
| **C3** | Règles de rythme | R-1, R-2, R-3, R-5, R-6, R-9 respectées **les 4 jours** |
| **C4** | Fidélité au dépôt | **0** chemin inventé · **0** route inventée · 6 bugs et 2 tests menteurs cohérents partout |
| **C5** | Stack TypeScript | **0** occurrence de C#/.NET/xUnit/NUnit/Angular/Jasmine/Karma |
| **C6** | Plafond de 700 mots | **0/28** dépassement (max. 682) |
| **C7** | Évaluations | 28 micro · 56 questions de QCM long · **308 justifications**, aucune manquante |
| **C8** | Barème des Points de Repère | 8/8 modules et 4/4 cols équilibrés |
| **C9** | URLs | **184** relevées · **0 non tracée** |

Tous les chiffres du rapport sont **recalculés**, jamais repris d'une affirmation écrite dans un
fichier. Deux points restent à l'arbitrage du formateur, listés en fin de rapport.

---

*Support V2 — juillet 2026. Conception et rédaction : Evan BOISSONNOT, pour Human Coders.*
