# Architecture V2 — 4 jours × 7 h = 28 h

> **Macro-conception.** Ce document fige la progression, le découpage en modules et notions,
> la modalité de chaque notion et le minutage. Il se valide **avant** l'écriture des notions.
> Le projet fil rouge est référencé `{{PROJET}}` : il sera instancié partout dès sa transmission.

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

Légende des modalités : **DESC** descendant · **INV** pédagogie inversée · **JEU** jeu sérieux ·
**SOLO** exercice individuel · **GRP** exercice de groupe.
Le code entre parenthèses renvoie au critère de `00-grille-modalites.md`.

---

### JOUR 1 — COMPRENDRE

#### Module **M1 — « Le test qui ment »** · matin · 160 min + QCM 20

> **Promesse** : « À la fin de ce module, vous saurez reconnaître un test généré qui valide un bug
> au lieu de le détecter — et vous saurez le prouver en une commande. »

| # | Notion | Modalité | Durée | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|
| **M1.1** | Le test qui ne peut pas échouer | **JEU** — Le Piège (D-4) | 45 | Détecter un test tautologique et prouver qu'il l'est | Exercice court |
| **M1.2** | Ce que mesurent — et ne mesurent pas — les benchmarks | **DESC** + diagramme (A-2) | 35 | Situer ce que les LLM réussissent et échouent, chiffres à l'appui | QCM 3 questions |
| **M1.3** | Trois familles d'automatisation : qui fait quoi | **JEU** — Le Tri (B-1) | 40 | Distinguer IA générative, script déterministe et framework classique | Exercice court |
| **M1.4** | L'oracle : d'où vient le « résultat attendu » ? | **DESC** + démo (A-2) | 40 | Identifier la source de vérité d'un test et refuser le code comme oracle | QCM 3 questions |

**Clôture** : **QCM long M1** — 14 questions, 20 min.
**Rythme** : JEU · DESC · JEU · DESC — aucun doublon consécutif ✓ · ouverture non descendante ✓

---

#### Module **M2 — « De l'exigence au test »** · après-midi · 120 min + boss 60

> **Promesse** : « Vous saurez transformer une spécification floue en cas de test tracés,
> et repérer ce que l'IA a comblé toute seule. »

| # | Notion | Modalité | Durée | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|
| **M2.1** | Extraire des exigences testables d'une spec floue | **SOLO** (C-1) | 40 | Produire une liste d'exigences numérotées et statuées testable/non testable | Exercice court |
| **M2.2** | La revue en 8 points d'une suite générée | **GRP** (C-2) | 40 | Appliquer une grille de revue et rendre un verdict argumenté | Exercice court |
| **M2.3** | Ambiguïtés, silences, contradictions : ce que l'IA comble seule | **INV** (D-3) | 40 | Détecter les ambiguïtés d'une spec et formuler la question au métier | Restitution |

**Clôture** : 🏆 **BOSS J1 — « {{BOSS_J1}} »** — 60 min.
**Rythme** : SOLO · GRP · INV — post-déjeuner actif ✓ · INV du jour ✓

---

### JOUR 2 — OUTILLER

#### Module **M3 — « Parler à la machine »** · matin · 160 min + QCM 20

> **Promesse** : « Vous saurez écrire un prompt de test qui produit deux fois le même niveau
> de qualité — et vous saurez pourquoi il ne produira jamais deux fois la même sortie. »

| # | Notion | Modalité | Durée | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|
| **M3.1** | Le pari : deux prompts, un même code | **JEU** — Le Pari (D-3) | 40 | Mesurer l'écart de qualité entre prompt naïf et prompt structuré | Exercice court |
| **M3.2** | Anatomie d'un prompt de test : les cinq blocs | **DESC** + diagramme (A-2) | 40 | Construire un prompt à partir d'un gabarit à cinq blocs | QCM 3 questions |
| **M3.3** | Le contexte est une ressource rare | **SOLO** (C-1) | 40 | Mesurer et réduire la consommation de contexte d'une session | Exercice court |
| **M3.4** | Industrialiser : versionner un prompt comme du code | **GRP** (E-1) | 40 | Définir une convention d'équipe pour versionner et évaluer un prompt | Exercice court |

**Clôture** : **QCM long M3** — 13 questions, 20 min.
**Rythme** : JEU · DESC · SOLO · GRP ✓ · ouverture non descendante ✓

---

#### Module **M4 — « L'atelier »** · après-midi · 120 min + boss 60

> **Promesse** : « Vous saurez faire travailler un agent contre le vrai produit, pas contre
> l'idée qu'il s'en fait. »

| # | Notion | Modalité | Durée | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|
| **M4.1** | Claude Code : les dix gestes qui servent en QA | **SOLO** (C-1) | 40 | Exécuter les commandes de session, de contexte et de permission | Exercice court |
| **M4.2** | MCP : donner des yeux à l'agent | **DESC** + démo (A-2) | 40 | Expliquer l'apport de l'arbre d'accessibilité et brancher un serveur MCP | QCM 3 questions |
| **M4.3** | Choisir son outil : panorama et critères | **INV** (D-1) | 40 | Construire une grille de choix d'outil défendable devant sa hiérarchie | Restitution |

**Clôture** : 🏆 **BOSS J2 — « {{BOSS_J2}} »** — 60 min.
**Rythme** : SOLO · DESC · INV — post-déjeuner actif ✓ · INV du jour ✓

---

### JOUR 3 — INDUSTRIALISER

#### Module **M5 — « L'agent qui travaille seul »** · matin · 160 min + QCM 20

> **Promesse** : « Vous saurez construire un agent qui génère, exécute et corrige —
> et l'empêcher de tricher. »

| # | Notion | Modalité | Durée | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|
| **M5.1** | La chasse : cinq défauts cachés en quinze minutes | **JEU** — La Chasse (D-3) | 40 | Éprouver ce qu'un agent trouve seul et ce qu'il ne trouve pas | Exercice court |
| **M5.2** | La boucle : générer → exécuter → analyser → corriger | **DESC** + diagramme (A-2) | 40 | Énoncer la condition de vérité de chaque étape de la boucle | QCM 3 questions |
| **M5.3** | Construire l'agent : skill, subagent, hook | **SOLO** (C-2) | 45 | Assembler un agent minimal qui exécute réellement les tests | Exercice court |
| **M5.4** | L'agent qui triche : garde-fous et vérification | **JEU** — Le Piège (D-4) | 35 | Détecter une modification d'assertion faite pour verdir un test | Exercice court |

**Clôture** : **QCM long M5** — 14 questions, 20 min.
**Rythme** : JEU · DESC · SOLO · JEU ✓ · ouverture non descendante ✓

---

#### Module **M6 — « Dans le pipeline »** · après-midi · 120 min + boss 60

> **Promesse** : « Vous saurez classer un échec de CI en quatre catégories, et vous ne
> corrigerez plus jamais une flakiness par un retry. »

| # | Notion | Modalité | Durée | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|
| **M6.1** | Quatre causes, quatre gestes : classer un échec | **GRP** (B-2) | 40 | Classer un échec en vrai bug / test faux / flaky / environnement | Exercice court |
| **M6.2** | Combien coûte vraiment un test instable ? | **INV** (D-1) | 40 | Chiffrer le coût de la flakiness et le défendre avec ses sources | Restitution |
| **M6.3** | Mettre l'agent en CI sans se faire piéger | **SOLO** (C-2) | 40 | Écrire un workflow avec secrets, permissions minimales et budget | Exercice court |

**Clôture** : 🏆 **BOSS J3 — « {{BOSS_J3}} »** — 60 min.
**Rythme** : GRP · INV · SOLO — post-déjeuner actif ✓ · INV du jour ✓

---

### JOUR 4 — DÉCIDER

#### Module **M7 — « Ce que l'IA ne voit pas »** · matin · 160 min + QCM 20

> **Promesse** : « Vous saurez couvrir ce qui fait vraiment tomber la production :
> la charge, la faille et l'utilisateur qu'on n'a pas prévu. »

| # | Notion | Modalité | Durée | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|
| **M7.1** | Le pari : l'IA trouve-t-elle cette faille ? | **JEU** — Le Pari (D-3) | 35 | Constater les angles morts de l'analyse par LLM | Exercice court |
| **M7.2** | Performance : modéliser une charge réaliste | **SOLO** (C-1) | 45 | Écrire un scénario de charge à taux d'arrivée avec seuils bloquants | Exercice court |
| **M7.3** | Sécurité : ce que le LLM ne peut pas garantir | **DESC** + diagramme (A-2) | 40 | Situer DAST, SAST et revue LLM dans une chaîne de sécurité | QCM 3 questions |
| **M7.4** | Accessibilité : un tiers d'automatisable, et alors ? | **GRP** (B-1) | 40 | Distinguer ce qu'un outil détecte de ce qui exige un test humain | Exercice court |

**Clôture** : **QCM long M7** — 15 questions, 20 min.
**Rythme** : JEU · SOLO · DESC · GRP ✓ · ouverture non descendante ✓

---

#### Module **M8 — « Décider »** · après-midi · 120 min + boss final 60

> **Promesse** : « Vous saurez dire ce que vous couvrez, ce que vous ne couvrez pas,
> ce que ça coûte — et le défendre devant une direction. »

| # | Notion | Modalité | Durée | Objectif d'apprentissage | Micro-éval |
|---|---|---|---|---|---|
| **M8.1** | L'enchère : où mettre l'effort de test ? | **JEU** — L'Enchère (B-2) | 40 | Prioriser une campagne par probabilité × impact sous contrainte de budget | Exercice court |
| **M8.2** | Gouverner un agent dans la durée : dérive et évaluations | **INV** (D-1) | 40 | Concevoir un jeu d'évaluations de non-régression pour un agent | Restitution |
| **M8.3** | Conformité : ce qui vous engage juridiquement | **DESC** + GRP (A-1, E-1) | 40 | Identifier les obligations RGPD et AI Act d'une chaîne de test augmentée | QCM 3 questions |

**Clôture** : 🏆 **BOSS FINAL — « {{BOSS_J4}} »** — 60 min, soutenance contradictoire.
**Rythme** : JEU · INV · DESC — post-déjeuner actif ✓ · INV du jour ✓

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

---

## 5. Les 8 clôtures de module

| Module | Type | Durée | Objet |
|---|---|---|---|
| M1 | QCM long — 14 questions | 20 | Valider la lecture critique d'une suite générée |
| M2 | 🏆 BOSS J1 | 60 | Produire un plan de test tracé depuis une spécification floue |
| M3 | QCM long — 13 questions | 20 | Valider la maîtrise du prompt et du contexte |
| M4 | 🏆 BOSS J2 | 60 | Livrer un agent qui génère, exécute et commente |
| M5 | QCM long — 14 questions | 20 | Valider la boucle et ses garde-fous |
| M6 | 🏆 BOSS J3 | 60 | Remettre au vert un pipeline sans skip ni retry |
| M7 | QCM long — 15 questions | 20 | Valider la couverture non fonctionnelle |
| M8 | 🏆 BOSS FINAL | 60 | Défendre un Go/No-Go argumenté devant contradiction |

**Total évaluation** : 4 × 20 + 4 × 60 = **320 min**, soit **19 %** du temps de formation.
Ce n'est pas du temps perdu : c'est le temps où l'apprentissage se fixe.

---

## 6. Ce qui reste à instancier — en attente du projet fil rouge

Les éléments ci-dessous sont volontairement laissés en variables. Ils seront remplacés
dans **tout** le support dès transmission du projet.

| Variable | Ce qu'elle désigne | Impact |
|---|---|---|
| `{{PROJET}}` | Nom et pitch du projet fil rouge | Toutes les notions, tous les exemples |
| `{{STACK}}` | Technologies réelles du projet | Code des exemples et exercices |
| `{{FEATURES}}` | Les fonctionnalités support des exercices | Répartition des notions sur les features |
| `{{DEFAUTS}}` | Les défauts plantés dans le dépôt | Notions M1.1, M5.1, M5.4, M7.1 et les 4 boss |
| `{{BOSS_J1..J4}}` | Scénario et barème de chaque boss | Clôtures de M2, M4, M6, M8 |

**Questions à trancher avec le projet** :

1. Le dépôt contient-il déjà des **défauts exploitables**, ou faut-il en planter ?
   Les notions D-4 (le piège) en dépendent entièrement.
2. Les participants travaillent-ils sur **un projet commun** fourni, ou sur **leur propre
   projet** ? Cela change la nature des exercices SOLO et la faisabilité des boss.
3. Le projet a-t-il une **spécification écrite** exploitable en M2 ? Sinon il faut en produire une,
   avec ses ambiguïtés délibérées.
4. Y a-t-il un **pipeline CI existant** à reprendre en M6, ou faut-il le fournir ?
