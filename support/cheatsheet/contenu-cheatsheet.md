# Cheat-sheet « Je teste avec l'IA » — contenu prêt à mettre en page

**Formation « Test logiciel avec IA générative »** — Human Coders · Evan BOISSONNOT
Format cible : **2 pages A4, 3 colonnes par page**. Modèle : cheat-sheet Git de git-scm.com.
Stack de référence : **Angular + .NET Web API**, outil principal **Claude Code**.
Toutes les commandes, valeurs et URL viennent du support de formation.

> Convention de lecture des blocs : `titre du bloc` · couleur de thème · nombre de lignes de contenu.
> Une ligne = une ligne de PDF (≈ 60-70 caractères max).

---

# PAGE 1 — FAIRE

---

## BLOC 1 · `SETUP` · couleur **gris ardoise** (#4A5568) · **10 lignes**

Sous-titre suggéré : *installer la chaîne, une fois pour toutes*

| Commande | Description |
|---|---|
| `npm install -g @anthropic-ai/claude-code` | installe Claude Code |
| `claude --version` puis `claude` | vérifie, puis lance dans le dépôt |
| `claude mcp add playwright npx @playwright/mcp@latest` | branche Playwright MCP |
| `claude mcp list` | doit afficher `playwright` |
| `npx playwright install --with-deps` | installe les navigateurs |
| `npm i -D @playwright/test @axe-core/playwright` | E2E + accessibilité |
| `dotnet add package xunit FluentAssertions NSubstitute` | socle de test .NET |
| `dotnet tool install --global dotnet-stryker` | mutation testing |
| `dotnet tool install --global dotnet-coverage` | couverture .NET |
| `docker compose up -d && dotnet test` | base éphémère, puis 47 tests |

---

## BLOC 2 · `CLAUDE CODE — L'ESSENTIEL` · couleur **orange brûlé** (#C05621) · **18 lignes**

Sous-titre suggéré : *ce qu'on tape vraiment quand on teste*

| Commande / réglage | Description |
|---|---|
| `claude` | ouvre une session dans le dépôt |
| `/status` | compte authentifié + répertoire de travail |
| `/context` | mesure l'usage du contexte, suggère des gains |
| `/clear` | contexte vide — après 2 corrections identiques |
| `/compact [instructions]` | résume la session, libère du contexte |
| `--permission-mode plan` | stratégie de test **avant** tout code |
| `--permission-mode dontAsk` | mode recommandé en CI verrouillée |
| `Ctrl+B` | passe `dotnet test` en arrière-plan |
| `Esc` `Esc` | rewind (`Alt+M` sous Windows si VT inactif) |
| `/agents` | **ne crée plus** d'agent : éditer `.claude/agents/*.md` |
| `/verify` | construit, lance l'app et **observe** le résultat |
| `/code-review [low…ultra] [--fix]` | revue multi-agents du dépôt |
| `/security-review` | revue de sécurité, sur invocation explicite |
| `claude -p "…" --output-format json` | headless ; renvoie `total_cost_usd` |
| `--bare` | ignore hooks, MCP, `CLAUDE.md` — à utiliser en CI |
| `--max-turns N` | **aucune limite par défaut** : plafonner soi-même |
| `CLAUDE.md` racine < 200 lignes | seul fichier qui survit à la compaction |
| `permissions.deny` dans `.claude/settings.json` | `.claudeignore` n'existe pas |

> Encadré latéral (2 lignes, fond rouge pâle) :
> `Write(path)`, `Glob(path)` acceptées mais **jamais appliquées** — seules `Edit(path)` et `Read(path)` le sont.
> Checkpoints : 100 par session, purgés à 30 j — **les écritures par bash ne sont pas tracées**. Git reste le filet.

---

## BLOC 3 · `MCP POUR LA QA` · couleur **cyan profond** (#2C7A7B) · **10 lignes**

Sous-titre suggéré : *donner des yeux à l'agent*

| Commande / fait | Description |
|---|---|
| `claude mcp add playwright npx @playwright/mcp@latest` | ajoute le serveur |
| `claude mcp list` · `/mcp` | liste et état des serveurs |
| `claude mcp add --transport http <nom> <url>` | `sse` est **déprécié** |
| `.mcp.json` (scope Project) | versionné, relu en PR comme du code |
| Playwright MCP = **arbre d'accessibilité** | pas de pixels, pas de modèle vision |
| Snapshot ≈ **200-400 tokens** | référence stable par élément (`e5`) |
| **69 outils** `browser_*` | `verify_element_visible`, `generate_locator`, `route` |
| Chrome DevTools MCP — **45 outils** | LCP/INP/CLS, console, réseau, `lighthouse_audit` |
| GitHub MCP `get_job_logs failed_only:true` | boucle « CI rouge → diagnostic » |
| Retirer le serveur après génération | 69 schémas d'outils coûtent du contexte |

> Encadré (1 ligne, fond rouge pâle) : la **description d'un outil est du prompt injecté**, pas de la documentation.

---

## BLOC 4 · `ANATOMIE D'UN PROMPT DE TEST` · couleur **violet** (#553C9A) · **5 + 10 lignes**

Sous-titre suggéré : *cinq blocs, `<task>` en dernier*

**Les 5 blocs — une ligne chacun (5 lignes)**

| Bloc | Ce qu'il fait |
|---|---|
| `<role>` | fixe le référentiel : ISTQB, xUnit v3, WCAG |
| `<documents>` | source de vérité **hors du code** — toujours en haut |
| `<constraints>` | interdictions vérifiables, pas des souhaits |
| `<output_format>` | chemin de fichier exact, sortie parsable |
| `<examples>` | 1 exemple = un style · 3 à 5 = une taxonomie |

**Gabarit copiable (10 lignes)**

```text
<role>Ingénieur QA senior. ISTQB CTFL v4.0.1, xUnit v3 + FluentAssertions.</role>
<documents><document index="1"><source>{{CHEMIN_SPEC}} — {{SECTION}}</source>
<document_content>{{CONTENU_SPEC}}</document_content></document></documents>
<constraints>
- N'ouvre PAS {{FICHIER_SOUS_TEST}}. La source de vérité est le document 1.
- Un comportement = un test. Interdiction de mocker {{INTERFACE_DOMAINE}}.
- Chaque [Fact] précédé de // {{REF_SPEC}} : « citation littérale ».
- Ambiguïté → [Fact(Skip = "ambiguïté {{ID}}")] + question au métier.
</constraints>
<output_format>Un seul fichier, chemin exact {{CHEMIN_FICHIER_TEST}}.</output_format>
<task>Produis la suite de tests de {{CLASSE}} à partir du document 1 uniquement.</task>
```

> Encadré (1 ligne) : documents > 20 k tokens en haut, tâche en bas — **jusqu'à +30 %** de qualité.

---

## BLOC 5 · `PROMPTS PRÊTS À L'EMPLOI` · couleur **indigo** (#434190) · **10 lignes**

Sous-titre suggéré : *annexe B, condensée — un prompt par ligne*

| Réf. | Prompt en une ligne |
|---|---|
| **P-04** unit .NET | « Produis la suite de {{CLASSE}} depuis le doc 1 seul. N'ouvre pas le code. » |
| **P-08** E2E Playwright | « Écris l'E2E de {{PARCOURS}} : locators lus dans le snapshot, zéro waitForTimeout. » |
| **P-12** Gherkin | « Génère les scénarios des exigences du doc 1, un par comportement, traçables. » |
| **P-14** jeu de données | « Générateur de {{ENTITE}} : graine constante, domaines .test, partitions couvertes. » |
| **P-17** dossier d'échec | « Constitue le dossier de {{TEST}} en 7 sections, ≤ {{MAX_LIGNES}}, sans hypothèse. » |
| **P-19** flakiness | « Classe les échecs du doc 1 dans la taxonomie, avec discriminant et n/N. » |
| **P-21** revue de tests | « Révise la suite : 8 points, verdict OK/À CORRIGER/BLOQUANT + preuve citée. » |
| **P-23** charge k6 | « Scénario de {{ENDPOINT}} : arrival-rate seul, seuils p(95)/p(99), exit non nul. » |
| **P-26** audit a11y | « Audit de {{COMPOSANT}} : test axe + test clavier seul + ce qu'ils ne voient pas. » |
| **P-27** synthèse | « Rédige la synthèse de {{CAMPAGNE}} depuis les sorties structurées, chiffres sourcés. » |

> Encadré (2 lignes) : 4 règles non négociables — **toute valeur attendue cite sa source** · **interdiction de lire le code testé** ·
> **au moins un `{{PLACEHOLDER}}`** · **aucune sortie n'est réputée exécutée** avant lecture du runner.

---

## BLOC 6 · `LA BOUCLE` · couleur **vert bouteille** (#276749) · **11 lignes**

Sous-titre suggéré : *5 étapes — ce qui doit être VRAI à chaque étape*
*(étiquettes pour le diagramme circulaire, à mettre en page à part)*

| Étape | Étiquette | Ce qui doit être VRAI |
|---|---|---|
| 0 | **Contexte** | La citation exacte de la spec est consignée ; sinon on s'arrête |
| 1 | **Générer** | Le générateur n'a PAS lu le code sous test |
| 2 | **Exécuter** | La sortie du runner a été **lue**, pas supposée |
| 3 | **Analyser** | Verdict par test : test faux / code faux / spec manquante |
| 4 | **Corriger** | On corrige le test ; le code produit n'est **jamais** touché |
| 5 | **Vérifier** | Compte ≥ baseline, chaque test cite sa source, coût consigné |

Commande imposée à l'étape 2 :
`dotnet test backend/SkyRetail.Tests --minimum-expected-tests 47 --coverage`

> Encadré (2 lignes) : *« If you can't verify it, don't ship it. »*
> Un `[Fact]` vert du premier coup sur du code jamais testé est un **signal d'alerte**, pas un succès.

---

## BLOC 7 · `COMMANDES DE TEST` · couleur **bleu acier** (#2B6CB0) · **14 lignes**

Sous-titre suggéré : *Angular / Playwright · .NET / xUnit*

| Commande | Description |
|---|---|
| `dotnet test` | exécute la suite complète |
| `dotnet test --filter "FullyQualifiedName~VatCalculator"` | cible une classe |
| `dotnet test --minimum-expected-tests 47` | échoue en **code 9** si tests supprimés |
| `dotnet test --coverage --coverage-output-format cobertura` | couverture exploitable |
| `dotnet stryker --project SkyRetail.Domain --threshold-break 40` | score de mutation |
| `dotnet-counters collect --process-id <pid> --format csv` | GC, thread pool côté serveur |
| `ng test --no-watch --no-progress` | tests front en CI (Vitest + jsdom) |
| `npx playwright test` | exécute la suite E2E |
| `npx playwright test --ui` | mode interactif de mise au point |
| `npx playwright test --repeat-each=20 --workers=4 --trace=on` | chasse au flaky |
| `npx playwright test --workers=1` | discriminant concurrence |
| `npx playwright test --shard=1/4 --reporter=blob` | parallélisation en CI |
| `npx playwright merge-reports --reporter html ./all-blob-reports` | fusion des shards |
| `k6 run perf/search-breakpoint.ts` | charge, sortie non nulle si seuil dépassé |

> Encadré (2 lignes) : `TZ=Pacific/Auckland dotnet test --filter "…"` — le discriminant le plus rentable.
> `--shard` équilibré **seulement** si `fullyParallel: true` ; sinon découpage au fichier près.

---

# PAGE 2 — VÉRIFIER

---

## BLOC 8 · `LES 6 ANTI-PATTERNS` · couleur **rouge brique** (#9B2C2C) · **6 lignes**

Sous-titre suggéré : *nom · symptôme observable · test de détection*

| Anti-pattern | Symptôme observable | Test de détection |
|---|---|---|
| **Test tautologique** | 100 % vert du 1er coup sur du code jamais testé | l'attendu est-il citable dans la spec ? |
| **Sélecteur halluciné** | locator plausible absent du DOM réel | `grep` du locator dans le snapshot |
| **Couverture trompeuse** | couverture en hausse, aucune assertion nouvelle | publier couverture **et** score de mutation |
| **Sur-mock** | le test casse au refactoring, pas au bug | supprimer le mock : le test tient-il ? |
| **Paquet halluciné** | `dotnet add package` d'un nom inconnu | vérifier sur nuget.org / npmjs.com avant |
| **Retry qui masque** | `retries: 3`, pipeline vert, moral en hausse | `--repeat-each=20` sur le même code |

---

## BLOC 9 · `CHECKLIST AVANT COMMIT` · couleur **vert bouteille** (#276749) · **10 lignes**

Sous-titre suggéré : *10 cases opposables — le Copilote du squad les fait cocher*

- [ ] Chaque test cite sa source (`// CDC v4.0 §x.y : « … »`), littéralement.
- [ ] Aucune valeur attendue n'est justifiable uniquement par le code.
- [ ] Au moins un test a été **rouge** avant d'être vert.
- [ ] La sortie du runner a été lue : générés / compilent / passent.
- [ ] Un comportement = un test ; aucun test à cinq assertions.
- [ ] Zéro `waitForTimeout`, zéro sélecteur CSS positionnel (`grep` à l'appui).
- [ ] Aucun test supprimé ni passé en `[Skip]` pour verdir la CI.
- [ ] Aucune donnée réelle, aucun secret, aucun domaine e-mail existant.
- [ ] Toute dépendance ajoutée a été vérifiée sur nuget.org / npmjs.com.
- [ ] Couverture **et** score de mutation publiés ensemble.

---

## BLOC 10 · `SEUILS ET CHIFFRES À CONNAÎTRE` · couleur **ambre** (#B7791F) · **15 lignes**

Sous-titre suggéré : *les seuls chiffres à citer en réunion*

| Valeur | Ce que ça signifie |
|---|---|
| **60 / 75 / 90 %** | couverture Google : acceptable, louable, exemplaire |
| **35-40 points** | écart attendu entre couverture et score de mutation |
| **~16 % / ~1,5 %** | tests flaky / exécutions flaky chez Google |
| **~84 %** | des passages au rouge sont un flaky, pas une régression |
| **~80 %** | des échecs de disponibilité disparaissent au retry |
| **0,02 ct vs 5,67 $** | relance automatique contre investigation manuelle |
| **3 jours / 3 mois** | quarantaine maximale GitLab, puis suppression |
| **5,2 % / 21,7 %** | paquets hallucinés, modèles commerciaux / open source |
| **~40 % · 45 %** | code IA vulnérable · tests Veracode introduisant une faille |
| **64 %** | des erreurs des tests générés sont des erreurs d'assertion |
| **57,38 % · 16/50** | ce qu'axe détecte : des problèmes · des critères WCAG |
| **1 règle sur 105** | couverture WCAG 2.2 d'axe-core (`target-size`) |
| **200-400 tokens** | coût d'un snapshot d'accessibilité Playwright MCP |
| **exit 2 · exit 9** | seul code bloquant un hook · `--minimum-expected-tests` |
| **13 $ / jour / dev** | coût moyen observé ; 150-250 $ par mois |

> Encadré (2 lignes) : `p(95) < 800` sur `/api/products/search` · budget front **< 170 Ko / < 5 s TTI**.
> **8 blocages consécutifs** : au-delà, un hook `Stop` est outrepassé. Aucun garde-fou logiciel n'est absolu.

---

## BLOC 11 · `DIAGNOSTIQUER UN ÉCHEC` · couleur **rouge brique** (#9B2C2C) · **10 lignes**

Sous-titre suggéré : *un signal discrimine chaque branche*
*(texte des étiquettes pour l'arbre de décision, à mettre en page à part)*

**Entrée** — constituer d'abord le dossier : erreur brute non reformulée, `--repeat-each` exécuté,
`git log -1` + diff **limités au SUT**, contexte (workers, TZ, versions). Aucune hypothèse à ce stade.

| Branche | Signal qui discrimine | Geste |
|---|---|---|
| **Vrai bug produit** | échoue partout, y compris hors CI ; le produit dévie de la spec | fiche d'anomalie, ne pas toucher au test |
| **Test faux** | l'oracle vient du code ; `--workers=1` ne change rien | corriger le test, citer la spec |
| **Flaky** | n/N varie sur le même code ; `--repeat-each=20` le prouve | classer, corriger la cause, jamais un retry |
| **Environnement** | l'échec suit le **runner**, pas le test ; disparaît ailleurs | corréler runner/échec avant d'accuser |

> Encadré (2 lignes) : un test flaky est **un test faux**, pas une nuisance d'infra.
> Quand la flakiness est le symptôme d'un défaut produit, le classement correct est **« vrai bug »**.

---

## BLOC 12 · `IA OU PAS IA ?` · couleur **violet** (#553C9A) · **8 lignes**

Sous-titre suggéré : *la grille de décision du module 5*

| Pour cette tâche | Verdict |
|---|---|
| Oracle disponible hors du code (spec, contrat, norme) | **IA générative** + validation humaine contre la source |
| Aucun oracle documenté | **Humain** écrit l'oracle, l'IA n'écrit que la mécanique |
| Test rejoué des centaines de fois en CI | **Script déterministe** versionné et exportable |
| Exploration one-shot d'une IHM inconnue | **IA générative** (agent exploratoire) |
| Faux négatif réglementaire ou financier | **Les deux** : revue humaine + mutation testing |
| Parsing, clustering et dédoublonnage de logs | **Script déterministe** (Drain, F-mesure 0,99) |
| Écrire des locators depuis le DOM réel | **Les deux** : MCP fournit l'arbre, l'IA rédige |
| Décision de Go / No-Go | **Humain**, jamais l'IA — elle informe, elle ne décide pas |

---

## BLOC 13 · `CI/CD` · couleur **bleu acier** (#2B6CB0) · **8 lignes**

Sous-titre suggéré : *8 règles pour un agent en pipeline*

1. **Secrets** — jamais en clair ; OIDC de préférence ; `show_full_output` désactivé.
2. **Permissions minimales** — `--permission-mode dontAsk`, `disallowedTools`, jeton à portée réduite.
3. **Pinning** — actions épinglées au **SHA complet**, version de modèle et de SDK épinglées.
4. **Timeout** — `timeout-minutes` sur chaque job ; sans lui, le défaut est 6 heures.
5. **Budget** — `--max-turns` explicite ; `total_cost_usd` relevé après chaque run.
6. **Artefacts** — l'agent consomme JUnit, traces et rapports ; il ne relance pas la suite.
7. **Idempotence** — `--bare` en CI : contexte explicite, jamais hérité du poste.
8. **PR de fork** — jamais `pull_request_target` + checkout du head ; sans secret ou approbation.

> Encadré (2 lignes) : l'agent est en **dernier étage** du pipeline et **ne bloque pas**.
> Le gating reste une règle écrite par la QA : seuils de couverture, seuils k6, violations axe critiques.

---

## BLOC 14 · `NE JAMAIS` · couleur **rouge brique** (#9B2C2C) · **8 lignes**

Sous-titre suggéré : *huit interdits fermes*

- **Ne jamais** mettre une donnée réelle dans un prompt — même partielle, même « anonymisée ».
- **Ne jamais** commiter un secret : `.env`, clé API, jeton OIDC restent hors du dépôt.
- **Ne jamais** `[Skip]` ni supprimer un test pour faire passer la CI.
- **Ne jamais** « corriger » une flakiness par `waitForTimeout`, `Thread.Sleep` ou un retry.
- **Ne jamais** installer une URL, un paquet ou un serveur MCP suggéré sans vérification.
- **Ne jamais** prendre un LLM pour oracle : l'oracle est la spec, le contrat, la norme.
- **Ne jamais** laisser un self-healing sans journal ni revue humaine avant commit.
- **Ne jamais** croire une sortie d'outil sur parole — un outil renvoie « Done » même en échec.

---

## BLOC 15 · `RÉFÉRENCES` · couleur **gris ardoise** (#4A5568) · **8 lignes**

Sous-titre suggéré : *documentation officielle uniquement*

| Sujet | URL |
|---|---|
| Claude Code — accueil | `code.claude.com/docs/en/` |
| Claude Code — bonnes pratiques | `code.claude.com/docs/en/best-practices` |
| Claude Code — hooks | `code.claude.com/docs/en/hooks` |
| API — prompt caching | `platform.claude.com/docs/en/build-with-claude/prompt-caching` |
| Playwright — locators | `playwright.dev/docs/locators` |
| Playwright — agents & MCP | `playwright.dev/docs/test-agents` · `playwright.dev/mcp/introduction` |
| .NET — `dotnet test` (MTP) | `learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test-mtp` |
| Angular — tests · k6 — seuils | `angular.dev/guide/testing` · `grafana.com/docs/k6/latest/using-k6/thresholds/` |

---

# NOTES DE MISE EN PAGE

## Décompte

| Page | Blocs | Lignes de contenu |
|---|---|---|
| **Page 1** | 1 à 7 | **88** (10 + 18 + 10 + 15 + 10 + 11 + 14) |
| **Page 2** | 8 à 15 | **73** (6 + 10 + 15 + 10 + 8 + 8 + 8 + 8) |
| **Total** | **15 blocs** | **161 lignes** (+ 12 encadrés latéraux ≈ 20 lignes) |

## Répartition en colonnes

**Page 1** — 3 colonnes
- Colonne 1 : `SETUP` (10) + `CLAUDE CODE` (18) = 28 lignes.
- Colonne 2 : `MCP POUR LA QA` (10) + `ANATOMIE D'UN PROMPT` (15) = 25 lignes + gabarit en monospace.
- Colonne 3 : `PROMPTS PRÊTS À L'EMPLOI` (10) + `LA BOUCLE` (11) = 21 lignes.
- `COMMANDES DE TEST` (14) en **bandeau pleine largeur en pied de page**, sur 2 sous-colonnes
  (.NET à gauche, Angular/Playwright à droite). C'est le bloc le plus consulté : il doit être
  repérable sans lire le reste.

**Page 2** — 3 colonnes
- Colonne 1 : `LES 6 ANTI-PATTERNS` (6) + `CHECKLIST AVANT COMMIT` (10) = 16 lignes.
- Colonne 2 : `SEUILS ET CHIFFRES` (15) + `DIAGNOSTIQUER UN ÉCHEC` (10) = 25 lignes.
- Colonne 3 : `IA OU PAS IA ?` (8) + `CI/CD` (8) = 16 lignes.
- `NE JAMAIS` (8) en **bandeau pleine largeur**, fond rouge brique, texte blanc, juste au-dessus
  de `RÉFÉRENCES` (8) en pied de page sur 2 sous-colonnes, corps réduit.

## Blocs incompressibles

Ces cinq blocs sont la raison d'être du document ; ils ne se coupent pas :

1. `ANATOMIE D'UN PROMPT DE TEST` — le gabarit doit rester **copiable intégralement**.
2. `LES 6 ANTI-PATTERNS` — les 6 lignes, colonne « test de détection » comprise.
3. `CHECKLIST AVANT COMMIT` — 10 cases, aucune n'est décorative.
4. `NE JAMAIS` — 8 interdits, formulation à l'impératif conservée mot pour mot.
5. `COMMANDES DE TEST` — c'est le bloc qu'on regarde au quotidien.

## Ce qui se coupe si ça déborde, dans cet ordre

1. `SETUP` — passer de 10 à 6 lignes : ne garder que Claude Code, Playwright MCP,
   `playwright install`, `dotnet test`. Le reste est dans `00-setup-technique.md`.
2. `RÉFÉRENCES` — passer de 8 à 5 : Claude Code, bonnes pratiques, Playwright locators,
   `dotnet test` MTP, Angular testing. Les autres se retrouvent depuis ces cinq.
3. `SEUILS` — passer de 15 à 10 : sacrifier `13 $/jour/dev`, `0,02 ct vs 5,67 $`,
   `1 règle sur 105`, `64 %`, `~40 % · 45 %`. Garder impérativement 60/75/90, ~84 %,
   5,2 %/21,7 %, 57,38 %, exit 2 / exit 9.
4. `MCP POUR LA QA` — passer de 10 à 7 : fusionner les lignes Chrome DevTools et GitHub MCP.
5. `PROMPTS PRÊTS À L'EMPLOI` — passer de 10 à 8 : retirer P-12 (Gherkin) et P-27 (synthèse),
   les moins utilisés au poste de travail.
6. Les 12 encadrés latéraux sont la **variable d'ajustement finale** : ils s'enlèvent un par un
   sans casser la lecture, en commençant par ceux des blocs 3, 5 et 7.

## Réglages typographiques suggérés

- Corps : 7,5 pt, interligne 9,5 pt. Monospace 7 pt pour les commandes.
- Commandes en monospace **gras** ; descriptions en romain gris 40 %.
- Chaque bloc : filet de couleur de 3 pt en tête, titre en capitales 9 pt sur la couleur.
- Ligne de séparation d'un demi-point toutes les 5 lignes dans les blocs longs
  (`CLAUDE CODE`, `SEUILS`, `COMMANDES DE TEST`) pour guider l'œil.
- Pied de page : « Formation Test logiciel avec IA générative · Human Coders · Evan Boissonnot ·
  à jour 07/2026 » + numéro de page.

## Deux diagrammes à produire séparément

- **`LA BOUCLE`** (bloc 6) — cercle à 5 nœuds, sens horaire, retour Analyser → Générer.
  Les étiquettes et les conditions « ce qui doit être VRAI » sont fournies telles quelles.
- **`DIAGNOSTIQUER UN ÉCHEC`** (bloc 11) — arbre à 4 branches depuis « Dossier d'échec constitué ».
  Le signal discriminant s'écrit sur l'arête, le geste sur la feuille.
