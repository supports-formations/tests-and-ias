# Test logiciel avec IA générative — Support de formation

**Organisme** : Human Coders (certifié Qualiopi) · **Formateur** : Evan BOISSONNOT
**Durée** : 21 heures réparties sur **4 journées** de 5 h 15
**Stack des travaux pratiques** : **Angular** (front) + **.NET Web API** (back) + PostgreSQL
**Outil IA fil conducteur** : **Claude Code** — avec panorama comparatif des solutions concurrentes
**Modalité pédagogique** : atelier gamifié à fil rouge — *QA Rescue Mission : Opération SkyRetail*
**Public** : ingénieur·e·s QA, testeur·euse·s, développeur·se·s, chef·fe·s de projet qualité logicielle
**Version du support** : 1.0 — juillet 2026

---

## 1. Pourquoi 4 jours pour 21 heures ?

Le programme catalogue Human Coders est vendu sur 3 jours (21 h en 3 × 7 h). Ce support restitue
**le même volume horaire pédagogique (21 h) étalé sur 4 demi-longues journées de 5 h 15**.

Ce choix n'est pas cosmétique, il répond à trois contraintes documentées :

1. **Charge cognitive.** L'atelier combine trois domaines simultanés — test logiciel, IA générative,
   CI/CD. Les journées de 7 h consécutives saturent la mémoire de travail sur ce type de contenu.
2. **Temps de latence des agents.** Un agent de test qui explore un dépôt, génère puis exécute
   une suite Playwright prend plusieurs minutes par itération. Les créneaux de TP doivent être
   suffisamment longs pour absorber ces temps morts sans hacher la théorie.
3. **Effet nuit.** Le fil rouge repose sur une accumulation d'artefacts (plan de test, agent,
   pipeline, dossier de recette). Quatre nuits de consolidation valent mieux que trois.

**Équivalence contractuelle** : 4 × 5 h 15 = **21 h 00**, strictement identique au format catalogue.
Le découpage est indiqué à titre indicatif pour l'organisation intra-entreprise ; il peut être
recompacté en 3 × 7 h (voir §6).

---

## 2. Architecture du support

```
formation-test-ia/
├── README.md                          ← vous êtes ici (index + architecture)
├── 00-fil-rouge-qa-rescue-mission.md  ← scénario gamifié, scoring, badges, boss de journée
├── 00-guide-formateur.md              ← minutage, animation, pièges, plan B
├── 00-setup-technique.md              ← préparation du poste, dépôt SkyRetail, comptes
│
├── J1 — L'ÉTAT DES LIEUX
│   ├── module-00-briefing-mission.md
│   ├── module-01-panorama-ia-generative-test.md
│   ├── module-02-generation-cas-de-test.md
│   └── module-03-donnees-et-documentation.md
│
├── J2 — L'ARSENAL
│   ├── module-04-prompt-context-engineering-qa.md
│   ├── module-05-outillage-claude-code-mcp-panorama.md
│   └── module-06-agent-de-test-personnalise.md
│
├── J3 — L'INDUSTRIALISATION
│   ├── module-07-diagnostic-anomalies-flakiness.md
│   ├── module-08-integration-ci-cd.md
│   └── module-09-tests-non-fonctionnels.md
│
├── J4 — LA MISE EN PRODUCTION
│   ├── module-10-gouvernance-derive-evaluation.md
│   ├── module-11-confidentialite-conformite-ai-act.md
│   └── module-12-priorisation-risques-roi-go-nogo.md
│
├── annexes/
│   ├── annexe-A-glossaire.md
│   ├── annexe-B-bibliotheque-de-prompts.md
│   ├── annexe-C-grilles-evaluation.md
│   └── annexe-D-bibliographie-complete.md
│
└── recherche/                         ← corpus de sources vérifiées (juillet 2026)
    ├── sources-jour1.md
    ├── sources-jour2.md
    ├── sources-jour3.md
    └── sources-jour4.md
```

---

## 3. Structure invariante de chaque module

Chaque module respecte **strictement** le même gabarit. C'est un contrat pédagogique :
les participants savent en permanence où ils en sont.

| Section | Contenu | Durée type |
|---|---|---|
| **0. Carte du module** | Objectifs, prérequis, position dans le fil rouge, QA Credits en jeu | 2 min |
| **1. Partie théorique** | Notions, définitions normatives, chiffres sourcés, schémas, anti-patterns | 35 % du temps |
| **2. Trois exemples concrets** | Exemple A (démonstration guidée), B (variante), C (cas d'entreprise) — tous en Angular / .NET | 25 % |
| **3. Quatre exercices** | ⭐ Découverte → ⭐⭐ Application → ⭐⭐⭐ Transfert → ⭐⭐⭐⭐ Défi | 35 % |
| **4. Débriefing et pièges** | Erreurs fréquentes, questions de contrôle, ce qu'on retient | 5 % |
| **5. Sources de la notion** | **Minimum 10 sources vérifiées par notion**, avec URL, type, année et apport | — |

**Chaque exercice comporte obligatoirement :**

- un **intitulé** explicite,
- un **niveau de difficulté** (⭐ à ⭐⭐⭐⭐),
- une **durée cible**,
- le **matériel fourni** (fichiers du dépôt SkyRetail),
- l'**énoncé**,
- le **résultat attendu** — décrit de manière vérifiable (fichiers produits, assertions,
  seuils numériques, sortie console), afin que le formateur **et** le participant puissent
  trancher objectivement si l'exercice est réussi,
- les **QA Credits** rapportés,
- un **indice** et une **solution de référence**.

> ### 📖 Statut du document : référence exhaustive, pas support de projection
>
> **Ce support n'est pas un jeu de slides.** C'est un **document de référence** d'environ
> **520 pages A4 équivalentes** (13 modules ≈ 407 p., 4 annexes ≈ 107 p., transverses ≈ 15 p.),
> conçu pour 21 h de face-à-face. Le rapport est assumé et voulu : **chaque module contient
> délibérément plus de matière que ce qui sera couvert en séance** — de l'ordre de 15 à 30 pages
> par module, là où une séquence projetée en tiendrait 7 à 12.
>
> **Comment il s'utilise, concrètement.**
>
> | Rôle | Usage attendu |
> |---|---|
> | **Le formateur** | Y **puise** le contenu de sa session. Le tableau §0.4 de chaque module donne le minutage de référence ; le reste est du matériau mobilisable — exemples de rechange, chiffres sourcés pour répondre en salle, anti-patterns à sortir si la question vient. Personne ne « déroule » un module intégralement. |
> | **Le groupe** | Permet l'**adaptation au niveau réel** : un groupe avancé consomme les exemples C et les exercices ⭐⭐⭐⭐ ; un groupe débutant reste sur A/B et ⭐/⭐⭐, sans que le formateur ait à improviser du contenu. |
> | **Les participants** | Constitue leur **documentation post-formation**. Les sources (≥ 10 par notion, vérifiées et datées), les solutions de référence et les grilles restent exploitables au poste de travail des mois après la session. C'est la partie du support qui a la plus longue durée de vie. |
>
> **Conséquence pratique.** Si vous cherchez un support projetable, il faut en **dériver** un jeu de
> slides à partir des sections §0, des schémas de §1 et des énoncés de §3 — pas projeter les modules
> tels quels. Le volume par module indiqué dans `_TEMPLATE-MODULE.md` (15 à 30 pages) reflète cette
> vocation de manuel de référence.

---

## 4. Programme détaillé — 21 h 00

### JOUR 1 — L'état des lieux (5 h 15)

> *Fil rouge : la Task Force QA débarque chez SkyRetail. 4 jours avant le go-live, la suite de tests
> est à 12 % de couverture. Première mission : comprendre ce qu'on a, et ce que l'IA peut y changer.*

| # | Module | Durée | Notions principales |
|---|---|---|---|
| **M0** | Briefing de mission et mise en place | 0 h 45 | Contexte SkyRetail, constitution des squads, setup, règles du jeu |
| **M1** | Panorama de l'IA générative appliquée au test logiciel | 1 h 30 | LLM et test, benchmarks (TestGenEval, SWT-Bench), IA générative vs automatisation scriptée vs frameworks classiques, oracle de test, état de l'adoption |
| **M2** | Générer des cas de test à partir des spécifications | 1 h 30 | Requirements-to-tests, Gherkin généré, traçabilité, techniques de conception de tests, revue humaine |
| **M3** | Données de test et documentation générées | 1 h 30 | Données synthétiques, property-based testing, fuzzing assisté, rapports d'anomalie, synthèse de couverture |

**Boss de fin de journée** : *Le Cahier des Charges Fantôme* (30 min, inclus dans M3).

---

### JOUR 2 — L'arsenal (5 h 15)

> *Fil rouge : la Task Force a un diagnostic. Il lui faut maintenant des armes. On monte l'atelier :
> prompts industrialisés, outillage agentique, et un agent maison capable de travailler seul.*

| # | Module | Durée | Notions principales |
|---|---|---|---|
| **M4** | Prompt et context engineering pour la QA | 1 h 30 | Structuration de prompt, few-shot, chain-of-thought, XML, prompt chaining, fenêtre de contexte, économie de tokens, versioning |
| **M5** | Outillage : Claude Code, MCP et panorama concurrent | 1 h 45 | Claude Code (CLAUDE.md, Skills, subagents, hooks, headless), MCP et Playwright MCP, GitHub Copilot, Cursor, Codex, outils QA IA (mabl, Applitools, testRigor, Qodo) |
| **M6** | Concevoir son agent de test personnalisé | 2 h 00 | Patterns d'agents, boucle générer→exécuter→analyser→corriger, Agent SDK, garde-fous, coût et modèle |

**Boss de fin de journée** : *L'Agent Zéro* (45 min, inclus dans M6).

---

### JOUR 3 — L'industrialisation (5 h 15)

> *Fil rouge : l'agent fonctionne sur le poste d'un développeur. Il doit maintenant tourner
> tout seul dans la CI, et couvrir ce qui fait vraiment tomber la production : la charge,
> la sécurité et l'accessibilité.*

| # | Module | Durée | Notions principales |
|---|---|---|---|
| **M7** | Diagnostic d'anomalies, flakiness et auto-réparation | 1 h 30 | Clustering de logs, analyse sémantique des échecs, RCA, tests flaky, self-healing de sélecteurs, quarantaine |
| **M8** | Intégration CI/CD | 1 h 45 | GitHub Actions et GitLab CI, agents en headless, secrets et OIDC, reproductibilité, sélection de tests, coûts |
| **M9** | Tests non fonctionnels : performance, sécurité, accessibilité | 2 h 00 | k6/NBomber, modélisation de charge, OWASP Top 10 2025, ZAP/CodeQL, WCAG 2.2 et RGAA 4.1.2, axe-core, régression visuelle |

**Boss de fin de journée** : *Le Pipeline Rouge* (45 min, inclus dans M9).

---

### JOUR 4 — La mise en production (5 h 15)

> *Fil rouge : dernière ligne droite. Il reste à prouver que la machine tient dans la durée,
> qu'elle est conforme, et à défendre un Go/No-Go devant le comité de direction.*

| # | Module | Durée | Notions principales |
|---|---|---|---|
| **M10** | Gouvernance, dérive et évaluation des agents | 1 h 30 | Observabilité LLM, evals et LLM-as-a-judge, dérive de modèle, dépréciation, non-régression sur prompts, red teaming |
| **M11** | Confidentialité, conformité et AI Act | 1 h 15 | RGPD et CNIL, anonymisation des données de test, rétention fournisseurs, AI Act, ISO/IEC 42001, prompt injection et supply chain |
| **M12** | Priorisation par les risques, ROI et Go/No-Go final | 2 h 30 | Risk-based testing, matrice probabilité/impact, defect prediction, tableau de bord de priorisation, métriques DORA, coût de la non-qualité |

**Boss final** : *Le Comité de Go/No-Go* (60 min, inclus dans M12) + remise du trophée **Golden Oracle**.

---

## 5. Objectifs pédagogiques et modalités d'évaluation (cadre Qualiopi)

### 5.1 Objectifs opérationnels

À l'issue de la formation, le·a participant·e sera capable de :

| # | Objectif | Module(s) | Évalué par |
|---|---|---|---|
| O1 | Expliquer les principes, apports et limites documentées des LLM appliqués au test logiciel | M1 | QCM J1 + exercice M1-4 |
| O2 | Distinguer les cas d'usage relevant de l'IA générative de ceux relevant de l'automatisation scriptée | M1, M5 | Grille de décision produite en M5-3 |
| O3 | Générer, réviser et tracer une suite de cas de test à partir d'exigences en langage naturel | M2 | Livrable « plan de test augmenté » |
| O4 | Produire des jeux de données de test conformes et une documentation de test exploitable | M3 | Exercices M3-2 à M3-4 |
| O5 | Concevoir un prompt et un contexte de qualité industrielle pour une tâche de QA | M4 | Bibliothèque de prompts versionnée |
| O6 | Mettre en œuvre Claude Code, MCP et au moins un outil concurrent sur un cas de test réel | M5 | Démonstration en squad |
| O7 | Construire un agent de test capable de générer, exécuter et commenter une campagne | M6 | Boss « L'Agent Zéro » |
| O8 | Diagnostiquer un échec de test et traiter la flakiness avec l'appui de l'IA | M7 | Boss « Le Pipeline Rouge » |
| O9 | Intégrer un agent de test dans un pipeline CI/CD avec gestion des secrets et des coûts | M8 | Workflow fonctionnel en CI |
| O10 | Concevoir des tests non fonctionnels (charge, sécurité, accessibilité) assistés par IA | M9 | Exercices M9-1 à M9-4 |
| O11 | Mettre en place la surveillance, l'évaluation et la non-régression d'un agent de test | M10 | Jeu d'évals produit |
| O12 | Identifier les obligations RGPD et AI Act applicables à une chaîne de test augmentée | M11 | Grille de conformité |
| O13 | Prioriser une campagne de test par les risques et argumenter un Go/No-Go chiffré | M12 | Soutenance finale |

### 5.2 Modalités d'évaluation

- **Diagnostique** (M0) : auto-positionnement en 8 questions sur les prérequis.
- **Formative continue** : validation du résultat attendu de chaque exercice par le formateur ;
  système de QA Credits servant de retour immédiat.
- **Sommative** : QCM de 20 questions en fin de J4 + soutenance du Go/No-Go (grille en annexe C).
- **Satisfaction** : questionnaire à chaud en fin de J4, à froid à J+60.

### 5.3 Prérequis

- Connaissances de base en développement logiciel ou en automatisation de tests.
- Avoir déjà utilisé un outil de test automatisé (Playwright, Cypress, Selenium, xUnit, NUnit…).
- Notions d'Angular et/ou de .NET suffisantes pour lire du code — **pas** pour en écrire seul.
- Poste de travail conforme au fichier `00-setup-technique.md`.

### 5.4 Accessibilité

Formation adaptable aux situations de handicap : support disponible en Markdown accessible
(structure de titres, tables légendées, pas d'information portée par la seule couleur),
exercices réalisables au clavier seul, temps majorés possibles sur les boss de journée.
Contact référent handicap Human Coders à préciser en convention.

---

## 6. Variantes de format

| Format | Découpage | Adaptations |
|---|---|---|
| **4 × 5 h 15** *(format de référence de ce support)* | M0-M3 / M4-M6 / M7-M9 / M10-M12 | aucune |
| **3 × 7 h** *(format catalogue)* | J1 = M0-M4 · J2 = M5-M8 · J3 = M9-M12 | supprimer les exercices ⭐ (découverte) de M4, M8 et M10, traités en démonstration |
| **6 × 3 h 30** *(intra, format « demi-journées »)* | 2 modules par session | conserver l'intégralité ; ajouter 10 min de reprise en début de chaque session |
| **Distanciel** | identique au format de référence | pauses de 10 min toutes les 50 min, boss de journée en sous-salles, tableau de scores partagé en direct |

---

## 7. Comment lire ce support

- 📘 **Théorie** — encadrés de fond, avec les sources en note.
- 🔍 **Exemple** — bloc de code commenté, systématiquement exécutable.
- 🧪 **Exercice** — encadré avec résultat attendu et QA Credits.
- ⚠️ **Piège** — anti-pattern documenté, à démontrer en direct de préférence.
- 🎯 **Fil rouge** — rattachement explicite à la mission SkyRetail.
- 📊 **Chiffre** — donnée sourcée, utilisable telle quelle en slide.

**Convention de citation** : chaque affirmation factuelle porte une référence `[S-xx]` renvoyant
à la section « Sources de la notion » du module. Les sources brutes complètes (≈ 520 références
vérifiées en juillet 2026) sont dans `recherche/`.

---

## 8. Avertissement sur la fraîcheur des sources

Le domaine bouge vite. Ce support a été constitué en **juillet 2026** et intègre plusieurs
corrections d'idées reçues encore répandues dans la littérature de formation :

- La documentation Anthropic a migré vers `platform.claude.com` (API) et `code.claude.com` (Claude Code).
- **OWASP Top 10:2025 est publié** : toute la numérotation a changé par rapport à l'édition 2021.
- **`temperature = 0` ne garantit pas le déterminisme** d'un LLM.
- **`.claudeignore` n'existe pas** dans Claude Code — le mécanisme officiel est `permissions.deny`.
- Le **Test Impact Analysis d'Azure DevOps ne supporte pas .NET Core**.
- Le **calendrier de l'AI Act a été révisé** (accord politique « omnibus » du 7 mai 2026).

Chaque module signale explicitement ces points sous la mention ⚠️ **À jour au 07/2026**.
