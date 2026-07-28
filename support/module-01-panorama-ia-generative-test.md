# Module M01 — Panorama de l'IA générative appliquée au test logiciel

> **Jour 1** · **Durée : 1 h 30** · **QA Credits en jeu : 150**
> *Fil rouge : la Task Force a mesuré la dette. Avant de lancer la machine à générer, il faut savoir ce qu'un LLM sait réellement produire sur `DiscountEngine.cs` — et à quel endroit précis il va écrire un test qui passe alors qu'il ne devrait pas.*

---

## 0. Carte du module

### 0.1 Objectifs pédagogiques

À l'issue de ce module, le·a participant·e sera capable de :

- **Citer** les résultats chiffrés des principaux benchmarks de génération de tests par LLM (TestGenEval, TESTEVAL, SWT-Bench) et l'unique retour industriel à grande échelle publié (Meta TestGen-LLM) ;
- **Distinguer** trois familles d'outillage — frameworks classiques, automatisation scriptée générée, IA générative — et **justifier** le choix de l'une d'elles pour un contexte donné ;
- **Définir** un oracle de test au sens ISTQB et **expliquer** pourquoi un LLM qui lit le code ne peut pas en tenir lieu ;
- **Identifier** les cinq anti-patterns fondateurs de la génération de tests par IA (tautologie, sélecteur halluciné, couverture trompeuse, sur-mock, hallucination de paquets) sur une sortie réelle ;
- **Construire** un cas de test qui prend un LLM en défaut sur un défaut arithmétique non détectable par lecture du code.

### 0.2 Prérequis du module

- M00 terminé : ligne de base chiffrée produite, squads constitués.
- Savoir lire du C# et exécuter `dotnet test`.
- Claude Code opérationnel dans le dépôt `skyretail`.

### 0.3 Position dans le fil rouge

| Avant ce module | Après ce module |
|---|---|
| « L'IA va écrire nos tests, on va passer de 12 à 80 % de couverture aujourd'hui » | Le squad a vu, en direct, l'IA produire des tests verts qui figent BUG-101 — et sait pourquoi |
| Le mot « oracle » est un mot de glossaire | Le mot « oracle » est l'axe de décision de toute la mission |
| Aucun critère pour choisir entre Playwright codegen, un agent et un test écrit à la main | Une matrice de décision applicable à F1/F2/F3/F4 |

### 0.4 Découpage horaire

| Séquence | Contenu | Durée |
|---|---|---|
| S0 | La Carte : où on en est dans la mission | 2 min |
| S1 | **N1** — Ce que les LLM savent et ne savent pas faire en test | 10 min |
| S2 | **N2** — IA générative vs automatisation scriptée vs frameworks classiques | 10 min |
| S3 | **N3** — Les anti-patterns fondateurs | 8 min |
| S4 | 🔍 Exemple A — *la démonstration de l'échec* sur `DiscountEngine.cs` | 10 min |
| S5 | 🔍 Exemple B — le sélecteur halluciné sur le tunnel F2 | 7 min |
| S6 | 🔍 Exemple C — passage à l'échelle : le filtre d'assurance de Meta | 7 min |
| S7 | 🧪 Exercices M1-1 à M1-4 | 24 min |
| S8 | Contre-Test sur M1-4 + débriefing + scoreboard | 12 min |
| **Total** | **Somme des séquences S0 → S8** | **90 min = 1 h 30** ✅ *conforme à la durée annoncée en en-tête* |

> ⏱️ **Régulation du temps.** Les exercices ⭐ et ⭐⭐ sont menés **en parallèle par les squads** (chaque squad n'en traite qu'un des deux, puis restitue en 2 min à l'autre). Les durées cibles indiquées par exercice supposent ce fonctionnement. L'exercice bonus ⭐⭐⭐⭐⭐ est **hors séance**.

### 0.5 Notions couvertes

| # | Notion |
|---|---|
| **N1** | Ce que les LLM savent et ne savent pas faire en test logiciel — benchmarks, retours industriels, état de l'adoption |
| **N2** | IA générative vs automatisation scriptée vs frameworks classiques — définitions ISTQB, oracle de test, matrice de décision |
| **N3** | Les anti-patterns fondateurs — tautologie, sélecteur halluciné, couverture trompeuse, sur-mock, hallucination de paquets |

---

## 1. Partie théorique

### 1.1 Notion N1 — Ce que les LLM savent et ne savent pas faire en test logiciel

#### 1.1.1 De quoi parle-t-on

Le périmètre de ce module est l'usage d'un **grand modèle de langage** comme outil de production d'artefacts de test : cas de test, code de test, données de test, documentation de test. Le référentiel de rattachement est le socle **ISTQB CTFL v4.0.1** [S-19], pas le syllabus **CT-AI v2.0** [S-20], qui traite du test *des* systèmes d'IA et dont un chapitre entier est consacré à l'évaluation des LLM eux-mêmes.

La littérature académique découpe la tâche en cinq sous-problèmes distincts, qu'il faut nommer séparément car les LLM n'y réussissent pas également :

| Sous-tâche | Énoncé | Difficulté pour un LLM |
|---|---|---|
| **Test generation** | Produire une suite de tests pour une unité de code | Faible — c'est du texte structuré et répétitif |
| **Test completion** | Compléter un test partiellement écrit | Très faible — contexte local suffisant |
| **Coverage-targeted generation** | Produire un test qui atteint **une ligne, une branche ou un chemin précis** | **Élevée** — c'est le point faible net [S-02] |
| **Bug reproduction** | Produire un test qui échoue sur un bug donné | Élevée — nécessite un oracle indépendant |
| **Oracle generation** | Produire l'assertion, c'est-à-dire le **résultat attendu** | **La plus élevée** — c'est le sujet de N2 |

Le survey de référence [S-01], qui analyse **102 études**, identifie la génération de cas de test et la réparation de programme comme les deux tâches dominantes de la littérature — ce qui traduit surtout ce qui est *facile à mesurer*, pas ce qui est *utile en production*.

#### 1.1.2 Ce que dit l'état de l'art

**Les benchmarks académiques.** Ils fournissent le plancher de réalité contre lequel confronter les démonstrations commerciales.

| Benchmark | Périmètre | Résultat clé |
|---|---|---|
| **HumanEval / Codex** [S-07] | 164 problèmes, métrique `pass@k` | Codex initial : **28,8 % en pass@1** — la référence fondatrice, et un rappel utile de la pente parcourue |
| **TestGenEval** [S-03] | 68 647 tests, 1 210 paires code/test, 11 dépôts Python réels (Meta AI / FAIR) | Le meilleur modèle évalué (GPT-4o) plafonne à **35,2 % de couverture moyenne** |
| **TESTEVAL** [S-02] | 210 programmes, 16 LLM, 3 tâches | La couverture *globale* est atteignable ; cibler une **ligne / branche / chemin précis** reste le point faible net |
| **SWT-Bench** [S-04] | Tests générés utilisés comme filtre de validation de correctifs réels | Les tests LLM **doublent la précision** de SWE-Agent pour valider un correctif |
| **SWE-bench Multimodal** [S-05] | 517 issues avec captures d'écran, maquettes, diagrammes | Évalue le traitement conjoint texte + visuel — pertinent pour F2 |
| **SWE-Bench Pro** [S-06] | 1 865 problèmes, 41 dépôts d'entreprise, conçu anti-contamination | Tâches de plusieurs heures à plusieurs jours, patchs multi-fichiers |

Deux lectures s'imposent. D'une part, **35,2 % de couverture moyenne** sur du code réel est très loin des promesses de démonstration. D'autre part, SWT-Bench [S-04] montre le vrai gisement de valeur : le test généré n'est pas performant comme *produit final*, il l'est comme **filtre de validation**. Ce renversement est le fondement de l'exemple C.

**Le seul retour industriel à grande échelle publié.** Meta a déployé **TestGen-LLM** sur Instagram et Facebook et publié les chiffres bruts [S-08]. Ce sont les quatre nombres à retenir de la journée :

| Étape du filtre | Taux |
|---|---|
| Tests générés qui **compilent** | **75 %** |
| Tests générés qui **passent de façon fiable** (plusieurs exécutions) | **57 %** |
| Tests générés qui **augmentent la couverture** | **25 %** |
| Recommandations **acceptées** par les ingénieurs en production | **73 %** |

La cascade est le message : on part de 100 tests générés, il en reste **25** qui apportent quelque chose. Le taux d'acceptation de 73 % ne porte pas sur les 100 tests, il porte sur les survivants du filtre. Meta a prolongé l'approche avec **ACH** [S-09], premier système industriel combinant génération de **mutants** ET de **tests** par LLM, déployé sur Facebook Feed, Instagram, Messenger et WhatsApp — soit exactement la stratégie « générer un défaut, puis générer le test qui l'attrape » que M3 met en œuvre avec Stryker.NET.

Côté académique appliqué, **TestPilot** [S-10] atteint **70,2 % de couverture d'instructions** sur 1 684 fonctions d'API JavaScript, contre **51,3 %** pour Nessie, une technique scriptée *feedback-directed*. Le gain est réel — mais il se mesure en couverture, pas en défauts détectés. C'est précisément l'écart que N3 nomme *oracle gap*.

**L'état de l'adoption.** Les chiffres de terrain 2025-2026 convergent sur une figure : adoption massive, confiance faible, mise à l'échelle rare.

| Source | Adoption | Nuance décisive |
|---|---|---|
| World Quality Report 2025-26 [S-11] | ~**90 %** des organisations poursuivent la GenAI en quality engineering | **15 %** seulement à l'échelle entreprise ; gain de productivité moyen **19 %** ; couverture d'automatisation classique stagnante à **33 %** |
| State of Testing 2026 [S-12] | **76,8 %** (81,7 % en grande entreprise) | **70 %** l'utilisent pour créer des cas de test, mais **19,9 %** seulement pour l'identification de risques |
| Stack Overflow 2025 [S-13] | **84 %** utilisent ou prévoient d'utiliser | **46 % ne font pas confiance** à l'exactitude des sorties — contre 31 % l'an passé, donc **la défiance augmente avec l'usage** |
| DORA 2025 [S-14] | **90 %** (+14 pts) | L'IA agit en **amplificateur** : **+21 %** de tâches complétées, **+98 %** de PR fusionnées, sans amélioration proportionnelle des métriques de livraison |
| JetBrains 2025 [S-15] | **85 %** régulièrement, **62 %** au moins un agent | Inquiétude n°1 : **qualité inconstante** du code généré |
| Octoverse 2025 [S-16] | **1,1 M+** dépôts publics utilisant un SDK LLM | **693 867** créés en 12 mois (**+178 %** YoY) |

Le chiffre le plus instructif est le couple du State of Testing [S-12] : **70 % pour créer des cas de test, 19,9 % pour identifier les risques**. La profession utilise l'IA sur la partie mécanique et pas sur la partie où le jugement humain se conjugue mal avec un contexte incomplet. C'est cohérent, et c'est aussi un aveu : l'IA est employée là où elle produit du volume, pas là où elle produirait de la valeur.

**Synthèse opérationnelle.**

| Ce que les LLM font bien | Ce qu'ils font mal |
|---|---|
| Produire du code de test syntaxiquement correct, idiomatique du framework | Inventer un **résultat attendu** qui ne soit pas dérivé du code lu |
| Compléter, paramétrer, factoriser une suite existante | Atteindre une **branche précise** identifiée à l'avance [S-02] |
| Transposer une intention de test d'un langage vers un autre | Détecter qu'une spécification est **contradictoire ou incomplète** |
| Rédiger la documentation d'un test existant | Décider **ce qui mérite** d'être testé (risque) |
| Servir de **filtre de validation** d'un correctif [S-04] | Garantir la stabilité d'un test à travers plusieurs exécutions [S-08] |

#### 1.1.3 Application au contexte SkyRetail

Le dépôt affiche **12 % de couverture** et **47 tests dont 9 ignorés**. La tentation est de lancer une génération massive sur `SkyRetail.Domain` et d'annoncer 70 % le soir même.

Projection honnête, en appliquant la cascade Meta [S-08] aux ~40 classes du domaine :

| Étape | Estimation SkyRetail |
|---|---|
| Tests générés en une passe | ~320 |
| Qui compilent (75 %) | ~240 |
| Qui passent de façon fiable (57 %) | ~180 |
| Qui **augmentent réellement la couverture** (25 %) | **~80** |
| Qui détectent un des défauts plantés | **inconnu — c'est l'objet de l'exemple A** |

Le dernier chiffre est celui qui décide du Go/No-Go de J4. Une suite de 180 tests verts sur un domaine contenant BUG-101, BUG-102 et BUG-103 n'est pas un progrès : c'est une **couverture de complaisance**, et elle est plus dangereuse que 12 %, parce qu'elle produit un sentiment de sécurité.

#### 1.1.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Le benchmark n'est pas votre dépôt** | « GPT-4o fait 35 % de couverture, donc on fera pareil » | Les benchmarks portent majoritairement sur du Python open source, souvent présent dans les données d'entraînement (contamination) ; SWE-Bench Pro [S-06] a été conçu explicitement pour y répondre | Mesurer sur **son** dépôt, sur un échantillon de 3 classes, avant d'engager une stratégie |
| **Confondre adoption et maturité** | « 90 % des organisations le font » | Le WQR [S-11] mesure la *poursuite* d'initiatives, pas leur industrialisation : 15 % seulement sont à l'échelle | Distinguer explicitement pilote / production / échelle dans le dossier de recette |
| **Prendre le taux d'acceptation pour un taux de qualité** | « 73 % des tests Meta sont acceptés » | Les 73 % portent sur les survivants d'un filtre à quatre portes, pas sur la production brute | Toujours citer les quatre chiffres 75/57/25/73 ensemble |
| **Mesurer le succès en nombre de tests** | Le squad annonce « 200 tests écrits » | Le nombre de tests est une mesure de production, jamais de vérification | Mesurer en **défauts détectés** et en **score de mutation** (M3) |

#### 1.1.5 📊 Chiffres à retenir

- **75 / 57 / 25 / 73 %** — cascade Meta TestGen-LLM : compilent / passent de façon fiable / augmentent la couverture / recommandations acceptées [S-08].
- **35,2 %** — couverture moyenne du meilleur modèle sur TestGenEval, 11 dépôts réels [S-03].
- **70,2 % vs 51,3 %** — couverture d'instructions de TestPilot (LLM) contre Nessie (scripté) sur 1 684 fonctions d'API [S-10].
- **76,8 %** d'adoption de l'IA en test, mais **19,9 %** seulement pour l'identification des risques [S-12].
- **46 %** des développeurs ne font pas confiance à l'exactitude des sorties d'IA — contre 31 % un an plus tôt [S-13].

---

### 1.2 Notion N2 — IA générative, automatisation scriptée et frameworks classiques

#### 1.2.1 De quoi parle-t-on

Deux définitions normatives structurent toute la notion.

> **Test automation** — *« the use of software to perform or support test activities, e.g. test management, test design, test execution and results checking »* — ISTQB Glossary [S-17].

> **Test oracle** — *« a source to determine expected results […] but should not be the code »* — ISTQB Glossary [S-18].

La seconde définition contient, en sept mots, le fondement de toute cette formation : **l'oracle ne doit pas être le code**. Un LLM à qui l'on donne `DiscountEngine.cs` et à qui l'on demande d'écrire les tests dérive nécessairement le résultat attendu de ce qu'il lit. Il ne produit donc pas un oracle : il produit une **paraphrase exécutable de l'implémentation**. Si l'implémentation est fausse, le test l'est aussi — et il est vert.

C'est le *problème de l'oracle*, connu du génie logiciel bien avant les LLM. L'IA générative ne le résout pas ; elle l'aggrave, parce qu'elle rend la production d'une paraphrase quasi gratuite et visuellement convaincante.

On distingue trois familles d'outillage.

| Famille | Ce qui produit le test | Ce qui produit l'oracle | Déterminisme à la génération |
|---|---|---|---|
| **Framework classique** (xUnit, Playwright écrit à la main, Testing Library) | l'humain | l'humain, depuis la spécification | total |
| **Automatisation scriptée / générée** (Playwright codegen, record & replay, POM) | l'outil, par observation d'une session réelle | **l'humain** — l'outil ne fournit que des assertions triviales | total |
| **IA générative** (LLM, agents de test) | le modèle | **le modèle**, dérivé du code ou de la spécification | **nul** |

#### 1.2.2 Ce que dit l'état de l'art

**L'automatisation scriptée n'a pas disparu — elle a une doctrine.** Le générateur Playwright *« prioritise role, text and test id locators »* et désambiguïse automatiquement [S-22]. La documentation des locators est plus explicite encore : *« Testing by test ids is the most resilient way of testing »*, et les sélecteurs CSS/XPath longs y sont qualifiés de *« bad practice that leads to unstable tests »* [S-23]. Cypress dit la même chose autrement, en recommandant les attributs `data-*` parce qu'ils *« will not change from CSS style or JS behavioral changes »* [S-27]. Selenium, de son côté, documente le Page Object Model comme *« an object-oriented class that serves as an interface to a page of your AUT »* [S-30] et **déconseille explicitement de mélanger implicit et explicit waits** [S-29] — cause racine numéro un de flakiness, et sujet de BUG-202 en J3.

Retenir : ces règles ne sont pas caduques à l'ère de l'IA. Elles **deviennent le critère d'acceptation** d'un test généré. Un locator produit par un LLM qui n'est ni un rôle, ni un texte, ni un `data-testid` est rejetable sur une base documentaire éditeur, sans débat d'opinion.

**Les éditeurs ont intégré l'IA dans les frameworks eux-mêmes.** Playwright fournit désormais trois agents natifs — **planner** (explore l'application et écrit un plan Markdown), **generator** (produit les `.spec.ts`), **healer** (répare les tests cassés) — installés par `npx playwright init-agents` [S-24]. Playwright MCP expose **40+ outils** opérant sur l'**arbre d'accessibilité** et non sur des pixels ; un snapshot structuré coûte **~200-400 tokens** contre plusieurs milliers pour une capture d'écran [S-25], avec une installation en une ligne `npx @playwright/mcp@latest` compatible VS Code, Claude Code et Cursor [S-26]. Cypress publie **3 skills IA officiels** — `cypress-author`, `cypress-explain`, `cypress-docs` — et `cy.prompt()` fait de la résolution d'élément et de l'auto-healing par IA [S-28].

La différence entre ces agents et « demander des tests à un LLM » est essentielle : **ils s'exécutent contre l'application réelle**. Le planner explore le DOM ; le generator écrit un test que le runner valide ; le healer observe un échec. Le modèle n'invente pas de sélecteur, il en lit un. C'est le remède structurel à l'anti-pattern du sélecteur halluciné (§1.3).

Anthropic documente son *computer use tool* en recommandant les cas d'usage *« où la vitesse n'est pas critique (par exemple, automated software testing) »* [S-31] — aveu honnête d'un compromis : le pilotage par vision est robuste au changement de DOM mais lent et coûteux.

**Ce que les analystes retiennent comme différenciant.** Gartner, en évaluant 10 éditeurs de *AI-Augmented Software Testing Tools*, identifie **Self-Healing For Test Scripts** et **Manual to Automated Test Conversion** comme les capacités qui distinguent un outil « AI-augmented » d'un framework scripté [S-32]. Traduction : la valeur commerciale de l'IA en test se situe aujourd'hui sur la **maintenance** et la **conversion**, pas sur la conception. C'est exactement l'inverse de ce que les participants attendent en arrivant.

**Matrice de décision.** C'est le livrable projetable de la notion.

| Question | Si oui → | Si non → |
|---|---|---|
| Le résultat attendu est-il **dérivable d'une source indépendante du code** (spécification, norme, référence métier) ? | l'IA peut proposer l'oracle, l'humain le valide contre la source | **l'humain écrit l'oracle** ; l'IA n'écrit que la mécanique |
| Le test doit-il être **rejoué à l'identique** en CI des centaines de fois ? | framework classique ou scripté, avec locators `data-testid` [S-23] | un agent peut suffire (exploration, one-shot) |
| L'interface est-elle **stable** ? | codegen + POM [S-30] | agents avec healing [S-24], en acceptant le coût |
| Le coût d'un faux négatif est-il **élevé** (paiement, RGPD, sécurité) ? | test écrit et relu par un humain, plus mutation testing | génération assistée acceptable |
| A-t-on une **spécification écrite** exploitable ? | requirements-to-tests (module M2) | commencer par écrire la spécification — c'est le Boss J1 |

#### 1.2.3 Application au contexte SkyRetail

| Feature | Famille recommandée | Justification |
|---|---|---|
| **F1 — Moteur de remises** | Framework classique + IA pour la **mécanique** uniquement | L'oracle vient du cahier des charges v4.0 (grille de remises), pas du code. C'est le seul endroit du projet où l'oracle est documenté ailleurs que dans l'implémentation. |
| **F2 — Tunnel de commande** | Playwright codegen / agents [S-24], puis durcissement manuel des locators | L'interface bouge (refonte v4.0) ; les sélecteurs doivent être capturés contre le vrai DOM, jamais inventés |
| **F3 — Catalogue & recherche** | Génération depuis **OpenAPI** — l'oracle est dans le contrat | 23 endpoints documentés : la spécification *est* l'oracle. Cas le plus favorable à l'IA de tout le projet. |
| **F4 — Espace client & RGPD** | Humain d'abord, IA en assistance | Le coût d'un faux négatif est réglementaire. BUG-401 (fuite d'identifiant dans l'export) ne se détecte pas sans intention humaine. |

#### 1.2.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Le LLM comme oracle** | Tous les tests générés passent du premier coup | Le modèle a lu l'implémentation et l'a paraphrasée ; ISTQB : l'oracle *« should not be the code »* [S-18] | Fournir la **spécification** au lieu du code, ou en plus ; exiger au moins un test qui échoue avant correction |
| **Self-healing qui masque une régression** | Le test reste vert après un changement d'IHM non prévu | Le healer a réassocié le locator à un autre élément — le comportement testé a changé sans que personne le voie | Journaliser chaque *healing* et le faire relire ; interdire le healing silencieux en CI (traité en M7) |
| **Codegen brut committé tel quel** | Sélecteurs CSS longs, `nth-child`, XPath absolus | Le codegen désambiguïse mais l'enregistrement suit ce que l'opérateur a cliqué ; la doc éditeur qualifie ces sélecteurs de *bad practice* [S-23] | Passe de durcissement obligatoire : rôle, texte accessible ou `data-testid` |
| **Choisir l'outil avant la question** | « On prend l'agent, c'est plus moderne » | Confusion entre nouveauté et adéquation ; Gartner situe la valeur sur la maintenance et la conversion [S-32] | Passer la matrice §1.2.2 avant tout choix, feature par feature |

#### 1.2.5 📊 Chiffres à retenir

- **200-400 tokens** — coût d'un snapshot d'arbre d'accessibilité via Playwright MCP, contre plusieurs milliers pour une capture d'écran [S-25].
- **40+ outils** exposés par Playwright MCP, tous sur l'arbre d'accessibilité, aucun sur les pixels [S-25].
- **3 agents natifs** Playwright — planner, generator, healer [S-24] — et **3 skills IA** officiels Cypress [S-28].
- **10 éditeurs** évalués par Gartner ; *self-healing* et *manual-to-automated conversion* comme capacités différenciantes [S-32].
- **40 questions / 66 points / score de passage 43 / 90 minutes** — format de l'examen ISTQB CTAL-TAE v2.0, pour situer le niveau d'exigence attendu d'un·e automaticien·ne [S-21].

---

### 1.3 Notion N3 — Les anti-patterns fondateurs

#### 1.3.1 De quoi parle-t-on

Un **anti-pattern** est une solution qui paraît résoudre le problème, se répand par imitation, et dégrade le système. Les cinq qui suivent sont documentés et mesurés. Ils ne sont pas des opinions de formateur : chacun porte une référence et un chiffre.

| # | Anti-pattern | Définition en une phrase |
|---|---|---|
| 1 | **Test tautologique** | Le test affirme ce que le code fait, non ce qu'il devrait faire |
| 2 | **Sélecteur halluciné** | Le locator a été inventé par le modèle et jamais confronté au DOM réel |
| 3 | **Couverture trompeuse (oracle gap)** | Le code est exécuté par les tests mais pas vérifié |
| 4 | **Sur-mock** | Le test valide l'orchestration interne au lieu du comportement |
| 5 | **Hallucination de paquets** | Le modèle importe une bibliothèque qui n'existe pas |

#### 1.3.2 Ce que dit l'état de l'art

**1. Le test tautologique.** C'est l'anti-pattern central de la journée, et il est démontré expérimentalement : des générateurs de test spécialisés — Codium CoverAgent et CoverUp — appliqués à du code **bogué** produisent des tests qui **valident le bug au lieu de le détecter** [S-43]. Le mécanisme est structurel, pas accidentel : le générateur est optimisé pour maximiser la couverture en produisant des tests qui **passent**, donc il calcule le résultat attendu en exécutant le code. Un test qui échouerait serait, du point de vue de l'outil, un échec de génération.

La littérature sur la qualité des tests générés confirme à l'échelle : sur **20 505 suites de tests** générées, on observe des *smells* systématiques de type **Assertion Roulette** et **Magic Number Test** [S-41] ; une autre évaluation établit que les **erreurs d'assertion représentent 64 %** de toutes les erreurs des tests générés et que le **manque de cohésion est le smell le plus fréquent (41 %)** [S-42].

**2. Le sélecteur halluciné.** Cas particulier d'hallucination de fidélité au sens de la taxonomie canonique [S-34]. Le modèle produit un `page.getByTestId('confirm-order-btn')` cohérent avec les conventions du projet mais absent du DOM. Le test échoue en CI, quelqu'un ajoute un `waitForTimeout`, puis un `retry`, et la suite devient flaky pour une raison qui n'a rien à voir avec l'application. La contre-mesure documentaire existe : la hiérarchie de locators recommandée par l'éditeur [S-23].

**3. La couverture trompeuse — l'*oracle gap*.** La notion est nommée et mesurée : une **forte couverture coexiste couramment avec des oracles faibles** [S-45]. Google publie ses seuils indicatifs — **60 % acceptable, 75 % louable, 90 % exemplaire** — en les assortissant d'une mise en garde contre la *« mentalité de case à cocher »*, et rappelle que les gains de couverture sont logarithmiques [S-44]. La couverture mesure **l'exécution**, jamais **la vérification**. Un test sans assertion couvre exactement autant qu'un test qui en contient dix.

**4. Le sur-mock.** Martin Fowler a fixé le vocabulaire en distinguant les **5 types de test doubles** — Dummy, Fake, Stub, Spy, Mock — et en alertant sur le couplage excessif à l'implémentation [S-46]. Google documente son propre échec : l'abus du mocking a *« pollué »* sa base de tests, au point que certains ingénieurs ont déclaré **« no more mocks! »** [S-47]. Un LLM sur-mocke par défaut, parce que le mock est le moyen le plus court d'obtenir un test qui compile et passe sans infrastructure.

**5. L'hallucination de paquets.** Sur **576 000 échantillons** générés par 16 LLM, **5,2 %** des paquets recommandés par les modèles commerciaux et **21,7 %** pour les modèles open source sont **inexistants**, pour **205 474 noms hallucinés uniques** [S-33]. Le risque n'est pas l'erreur de compilation : c'est le **slopsquatting**, l'enregistrement par un attaquant d'un nom halluciné récurrent. Le cadre de référence est **OWASP Top 10 for LLM Applications 2025** [S-36]. Anthropic documente des techniques de réduction — autoriser « je ne sais pas », exiger des citations vérifiables, chain-of-thought verification, best-of-N — **en admettant explicitement** qu'elles *« réduisent significativement les hallucinations mais ne les éliminent pas entièrement »* [S-35].

**Le contexte sécurité et qualité, en toile de fond.** Sur 1 689 programmes générés dans 89 scénarios liés au Top 25 CWE MITRE, **~40 %** du code contient des vulnérabilités exploitables [S-37]. Veracode, sur 100+ modèles et 80 tâches réelles, mesure des failles dans **45 % des tests**, avec **72 % d'échec sécurité en Java**, et établit qu'**augmenter la taille du modèle n'améliore pas la sécurité** [S-38]. GitClear, sur **211 millions de lignes**, observe le code copié-collé passer de **8,3 % (2020) à 12,3 % (2024)** tandis que le code refactorisé chute de **25 % à moins de 10 %** [S-39]. Apiiro rapporte **×10** de nouvelles failles par mois, **+322 %** de chemins d'escalade de privilèges et **+40 %** d'exposition de secrets [S-40]. DORA conclut que la forte adoption de l'IA fait monter **simultanément le débit et l'instabilité**, et que **30 %** des professionnels ont peu ou pas confiance dans le code généré [S-48].

#### 1.3.3 Application au contexte SkyRetail

Les cinq anti-patterns ont chacun leur terrain dans le dépôt :

| Anti-pattern | Où il se manifestera | Défaut associé |
|---|---|---|
| Tautologie | `backend/SkyRetail.Domain/Pricing/DiscountEngine.cs` | **BUG-101**, **BUG-102** — démontré en exemple A et exercice M1-4 |
| Sélecteur halluciné | `frontend/src/app/checkout/` | **BUG-201** — exemple B |
| Couverture trompeuse | Rapport Coverlet du domaine | **BUG-103** — le plafond non appliqué en présence d'une précommande est une **branche exécutée mais non vérifiée** |
| Sur-mock | `SkyRetail.Api` — services de commande | Un mock de `IPricingService` rend BUG-101 indétectable au niveau API |
| Hallucination de paquets | `backend/SkyRetail.Tests/*.csproj` | Toute suggestion `dotnet add package` non vérifiée sur nuget.org |

> 🎯 **Piège volontaire du fil rouge.** Sur **BUG-102** et **BUG-401**, un LLM à qui l'on demande « génère les tests de cette classe » écrira des tests qui **passent**. Le formateur ne l'annonce pas : il le fait constater.

#### 1.3.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **« Tous mes tests sont verts du premier coup »** présenté comme un succès | 100 % de réussite immédiate sur une classe jamais testée | Oracle dérivé du code [S-43] | Règle du squad : **au moins un test doit échouer** avant qu'on touche au code. C'est le badge 🧿 L'Oracle. |
| **Assertion Roulette** | Cinq assertions sans message dans un même test ; en cas d'échec on ne sait pas laquelle | Le générateur maximise la couverture par test [S-41] | Un comportement = un test ; messages d'assertion obligatoires (`.Should().Be(x, "car la règle EX-007 …")`) |
| **Course à la couverture** | Le squad annonce +40 points de couverture en une heure | Confusion exécution / vérification [S-44][S-45] | Publier **couverture ET score de mutation** ensemble (M3). Barème : +25 QAC de malus si couverture augmentée sans assertion nouvelle. |
| **`dotnet add package` aveugle** | Le projet ne restaure plus, ou pire il restaure un paquet inconnu | 5,2 à 21,7 % de paquets hallucinés [S-33] | Vérifier sur nuget.org / npmjs.com **avant** d'ajouter ; interdire l'ajout de dépendance par l'agent sans validation (garde-fou du M6) |

#### 1.3.5 📊 Chiffres à retenir

- **5,2 % / 21,7 %** de paquets hallucinés (modèles commerciaux / open source) sur 576 000 échantillons, **205 474 noms uniques** [S-33].
- **64 %** des erreurs des tests générés sont des **erreurs d'assertion** ; **41 %** de manque de cohésion [S-42].
- **60 / 75 / 90 %** — seuils de couverture Google, avec avertissement explicite sur la « mentalité de case à cocher » [S-44].
- **~40 %** du code généré contient des vulnérabilités exploitables (89 scénarios CWE Top 25) [S-37] ; **45 %** des tests Veracode introduisent une faille [S-38].
- **8,3 % → 12,3 %** de code copié-collé entre 2020 et 2024, refactorisation de **25 % à < 10 %**, sur 211 M de lignes [S-39].

---

## 2. Trois exemples concrets

### 🔍 Exemple A — « Le test qui fige le bug » *(démonstration guidée, 10 min)*

**Contexte.** `backend/SkyRetail.Domain/Pricing/DiscountEngine.cs`, feature F1. Six règles de remise cumulables, un plafond global à 30 %. Le cahier des charges v4.0 précise : *« la remise de bienvenue WELCOME10 et la vente flash FLASH15 ne sont pas cumulables »*. Le code contient **BUG-101**.

**Ce qu'on montre.** Que la sortie du LLM est verte, plausible, idiomatique — et fausse. C'est le moment fondateur de la formation ; il se joue en direct, sans filet, projeté.

**Le code de production (extrait, tel qu'il est dans le dépôt) :**

```csharp
// backend/SkyRetail.Domain/Pricing/DiscountEngine.cs
namespace SkyRetail.Domain.Pricing;

public sealed class DiscountEngine
{
    private readonly IReadOnlyList<IDiscountRule> _rules;

    public DiscountEngine(IEnumerable<IDiscountRule> rules)
        => _rules = rules.OrderBy(r => r.Priority).ToList();

    public PriceBreakdown Compute(Cart cart)
    {
        var applied = new List<AppliedDiscount>();
        decimal rate = 0m;

        foreach (var rule in _rules)
        {
            if (!rule.IsEligible(cart)) continue;

            // BUG-101 — le contrôle d'exclusivité n'interroge que les règles DÉJÀ appliquées.
            // Si la règle exclusive est évaluée en second, l'exclusion n'est jamais vue.
            if (applied.Any(a => a.Rule.ExcludedCodes.Contains(rule.Code)))
                continue;

            var r = rule.Rate(cart);
            rate += r;
            applied.Add(new AppliedDiscount(rule, r));
        }

        rate = Math.Min(rate, 0.30m);              // plafond global
        return PriceBreakdown.From(cart, rate, applied);
    }
}
```

**Déroulé pas à pas.**

1. Le formateur ouvre Claude Code à la racine du dépôt et lance le prompt **naïf**, celui que tout le monde écrirait :

```text
Génère les tests unitaires xUnit + FluentAssertions pour
backend/SkyRetail.Domain/Pricing/DiscountEngine.cs.
Vise une bonne couverture des cas de cumul de remises.
```

2. On lit la sortie **avant** de l'exécuter. Extrait représentatif :

```csharp
// backend/SkyRetail.Tests/Pricing/DiscountEngineTests.cs  — GÉNÉRÉ, NON RELU
[Fact]
public void Compute_WithWelcomeAndFlashSale_AppliesBothDiscounts()
{
    var cart = CartBuilder.New().WithLine("SKU-1", 100m).ForNewCustomer().Build();
    var engine = new DiscountEngine(new IDiscountRule[]
    {
        new FlashSaleRule(),   // priorité 1
        new WelcomeRule()      // priorité 2
    });

    var result = engine.Compute(cart);

    result.TotalDiscountRate.Should().Be(0.25m); // 15 % + 10 %
}
```

3. `dotnet test` → **vert**. La couverture de `DiscountEngine` passe de 0 à 87 %.
4. Le formateur projette alors la ligne du cahier des charges : *« WELCOME10 et FLASH15 ne sont pas cumulables »*.

**Analyse critique.**

| Ce que l'IA a bien fait | Ce qu'elle a raté |
|---|---|
| Structure AAA respectée, nommage lisible, usage correct de FluentAssertions | Le nom du test **énonce le bug** : `AppliesBothDiscounts` |
| Utilisation du `CartBuilder` existant du dépôt, sans le réinventer | L'assertion `Be(0.25m)` a été **calculée en simulant le code**, pas lue dans la spécification |
| Couverture réelle des branches d'éligibilité | Aucune question posée sur l'exclusivité, alors que `ExcludedCodes` est un nom de propriété parlant |
| Commentaire explicatif `// 15 % + 10 %` | Ce commentaire est précisément **l'aveu de la tautologie** : le résultat attendu est une addition, pas une règle métier |

Le test est **irréfutable techniquement et faux fonctionnellement**. Il est désormais dans la suite, il passera en CI pendant deux ans, et il **empêchera** la correction de BUG-101 : le jour où un développeur corrigera l'ordre d'évaluation, ce test deviendra rouge et quelqu'un « corrigera le test ».

**Le prompt corrigé, pour comparaison immédiate :**

```text
Contexte : le fichier docs/cdc-v4.0.md, section 3.2, définit la grille de remises.
Tâche : à partir de la SPÉCIFICATION uniquement, écris les tests xUnit de
DiscountEngine. Pour chaque test, cite en commentaire la ligne exacte du cahier
des charges qui justifie le résultat attendu.
Contrainte : n'ouvre pas DiscountEngine.cs. Si la spécification est ambiguë sur
un cas, écris un test [Fact(Skip = "ambiguïté EX-0xx à trancher")] et liste
la question à poser au métier.
```

Sortie attendue avec ce prompt : `Compute_WithWelcomeAndFlashSale_AppliesOnlyTheHigherRate` → `Should().Be(0.15m)` → **rouge** → BUG-101 découvert.

**Ce qu'on retient.** L'oracle ne doit pas être le code [S-18]. Changer le prompt ne suffit pas : il faut changer **la source de vérité fournie au modèle**. Et un test généré qui passe du premier coup sur une classe jamais testée est un **signal d'alerte**, pas un succès [S-43].

---

### 🔍 Exemple B — « Le sélecteur qui n'a jamais existé » *(variante, 7 min)*

**Contexte.** F2, tunnel de commande Angular. On demande un test E2E de validation de commande, sans que le modèle ait accès à l'application en cours d'exécution.

**Prompt.**

```text
Écris un test Playwright TypeScript qui ajoute un produit au panier,
va au checkout et valide la commande sur http://localhost:4200.
```

**Sortie brute :**

```typescript
// e2e/checkout.spec.ts — GÉNÉRÉ SANS ACCÈS AU DOM
import { test, expect } from '@playwright/test';

test('validation de commande', async ({ page }) => {
  await page.goto('http://localhost:4200/products');
  await page.click('.product-card:nth-child(1) .add-to-cart-btn');   // ❌ inventé
  await page.click('#cart-icon');                                     // ❌ inventé
  await page.click('button.checkout-primary');                        // ❌ inventé
  await page.fill('input[name="cardNumber"]', '4242424242424242');
  await page.click('[data-testid="confirm-order-btn"]');              // ❌ inventé
  await expect(page.locator('.order-confirmation')).toBeVisible();    // ❌ inventé
});
```

**Analyse critique.** Six locators, zéro vérifié. Le test est parfaitement plausible : il suit les conventions Angular usuelles et mélange même volontairement CSS et `data-testid`, ce qui le rend crédible. À l'exécution, il échoue sur la première ligne — ou pire, il *passe* parce que `.product-card:nth-child(1)` correspond par hasard à un élément différent. La documentation éditeur qualifie ce type de sélecteur de *bad practice that leads to unstable tests* [S-23].

**La contre-mesure, en direct :**

```bash
# 1) Capturer les locators contre le DOM réel
npx playwright codegen http://localhost:4200/products

# 2) Ou brancher l'agent officiel, qui explore avant d'écrire
npx playwright init-agents --loop=claude
```

Avec Playwright MCP, le modèle travaille sur l'**arbre d'accessibilité** — pas sur des pixels, pas sur son imagination — pour **200 à 400 tokens** par snapshot [S-25]. Les locators produits sont des rôles et des textes accessibles réellement présents.

**Ce qu'on retient.** Un LLM sans accès à l'application génère de la fiction syntaxiquement valide. **Malus de −30 QAC** pour tout locator livré sans preuve d'exécution. Bénéfice collatéral, découvert ici : le tunnel F2 n'a presque aucun `data-testid` — c'est une dette d'ingénierie à remonter, et elle conditionne toute la stratégie E2E de J3.

---

### 🔍 Exemple C — « Le filtre d'assurance » *(passage à l'échelle, 7 min)*

**Contexte.** Comment Meta industrialise ce que nous venons de voir échouer artisanalement — et comment on le transpose sur SkyRetail dès aujourd'hui.

**Ce qu'on montre.** TestGen-LLM n'est pas « un LLM qui écrit des tests ». C'est un LLM **encadré par un filtre à quatre portes**, dont seuls les survivants sont proposés à un humain [S-08]. Le prolongement, ACH, ajoute la génération de **mutants** : on fabrique un défaut, puis on exige un test qui l'attrape [S-09]. C'est le même principe que SWT-Bench, où les tests LLM servent de **filtre de validation** et **doublent la précision** de l'agent de correction [S-04].

```
                    ┌──────────────────────────┐
   Classe cible ───►│  Génération (LLM, N=k)   │
                    └────────────┬─────────────┘
                                 ▼
                    Porte 1 : ça compile ?              → 75 %
                                 ▼
                    Porte 2 : ça passe 5 fois ?         → 57 %   (anti-flaky)
                                 ▼
                    Porte 3 : ça augmente la couverture ? → 25 %
                                 ▼
                    Porte 4 : ça tue un mutant ?        → (ACH)
                                 ▼
                    Revue humaine ─────────────► 73 % acceptés
```

**Transposition SkyRetail, exécutable dès aujourd'hui :**

```bash
# Porte 1 — compilation
dotnet build backend/SkyRetail.Tests -warnaserror

# Porte 2 — stabilité : 5 exécutions, tolérance zéro
for ($i=1; $i -le 5; $i++) { dotnet test --filter "FullyQualifiedName~Pricing" }

# Porte 3 — delta de couverture
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura `
            /p:Threshold=0 /p:CoverletOutput=./cov-after.xml

# Porte 4 — score de mutation (détaillé en M3)
dotnet stryker --project SkyRetail.Domain --threshold-break 40
```

**Analyse critique.**

| Ce que le modèle apporte | Ce que seul le filtre apporte |
|---|---|
| Le volume : k candidats en quelques minutes | L'élimination des 43 % qui ne passent pas de façon fiable |
| La couverture de cas triviaux fastidieux | La garantie que le test **ajoute** quelque chose (porte 3) |
| L'idiomaticité du framework | La garantie que le test **vérifie** quelque chose (porte 4) |

**Ce qu'on retient.** L'unité de travail n'est pas le prompt, c'est le **pipeline**. Un squad qui livre une suite générée sans porte 2 ni porte 4 livre statistiquement 43 % de tests instables et une proportion inconnue de tests tautologiques. La porte 4 — le mutation testing — est le seul rempart automatisable contre la tautologie ; c'est la raison pour laquelle M3 lui consacre une notion entière.

---

## 3. Quatre exercices

### 🧪 Exercice M1-1 — « Le premier contact »

| | |
|---|---|
| **Difficulté** | ⭐ |
| **Durée cible** | 4 min |
| **Modalité** | squad |
| **Matériel** | `backend/SkyRetail.Domain/Pricing/VatCalculator.cs`, `backend/SkyRetail.Tests/` |
| **QA Credits** | 10 |

**Énoncé**
Demandez à Claude Code de générer les tests unitaires de `VatCalculator.cs`. N'améliorez pas le prompt : utilisez volontairement la formulation naïve « génère les tests unitaires de ce fichier ». Exécutez la suite. Relevez trois chiffres : nombre de tests générés, nombre qui compilent, nombre qui passent. Comparez votre cascade à celle de Meta (75 / 57 / 25 %).

**✅ Résultat attendu**
- [ ] Fichier `backend/SkyRetail.Tests/Pricing/VatCalculatorTests.cs` créé et commité.
- [ ] `dotnet test --filter "FullyQualifiedName~VatCalculator"` s'exécute et affiche un compte non nul.
- [ ] Trois chiffres relevés dans `boss-j1/etat-des-lieux.md`, section « M1-1 » : *générés / compilent / passent*.
- [ ] Une phrase de commentaire : « ma cascade est plus/moins favorable que celle de Meta parce que… ».
- **Invalide** : suite non exécutée, ou chiffres estimés au lieu d'être lus dans la sortie du runner.

**💡 Indice** *(après 2 min)*
Si tout compile et tout passe du premier coup, ce n'est pas une bonne nouvelle — c'est le sujet de M1-2. Notez-le tel quel.

**🔑 Solution de référence**
Résultat typiquement observé : 6 à 9 tests, 100 % compilent, 100 % passent. La cascade est **plus favorable** que celle de Meta, pour une raison qui n'a rien de flatteur : `VatCalculator` est une classe courte et sans dépendance, et le modèle a dérivé chaque assertion de l'implémentation. Meta mesure sur du code réel, volumineux et fortement couplé. L'écart mesure la **facilité du terrain**, pas la qualité de l'outil.

**🎓 Ce que l'exercice enseigne vraiment**
Que le taux de réussite d'une génération de tests dépend d'abord du code cible, ensuite du modèle — et que « 100 % vert » est une métrique creuse tant qu'on n'a pas su dire **contre quoi** les tests ont été confrontés.

---

### 🧪 Exercice M1-2 — « L'audit de tautologie »

| | |
|---|---|
| **Difficulté** | ⭐⭐ |
| **Durée cible** | 5 min |
| **Modalité** | binôme (Pilote/Copilote inversés par rapport à M1-1) |
| **Matériel** | la suite produite en M1-1 + `docs/cdc-v4.0.md` §3.1 (règles de TVA) |
| **QA Credits** | 20 |

**Énoncé**
Reprenez chacun des tests générés en M1-1. Pour chacun, répondez à **une seule question** : *d'où vient le nombre attendu ?* Classez-le en trois catégories — **(S)** dérivé de la spécification, **(C)** dérivé du code, **(I)** indéterminable. Produisez `boss-j1/audit-tautologie.md` avec le tableau de classement, puis réécrivez **un** test de catégorie (C) en catégorie (S), en citant la ligne du cahier des charges dans le commentaire.

**✅ Résultat attendu**
- [ ] `boss-j1/audit-tautologie.md` contient un tableau : *Nom du test · Valeur attendue · Origine (S/C/I) · Justification*.
- [ ] Chaque test de la suite M1-1 est classé — aucun trou.
- [ ] Au moins **un** test réécrit en catégorie (S), avec un commentaire de la forme `// CDC v4.0 §3.1 : « … »`.
- [ ] Le test réécrit est exécuté ; son statut (vert ou rouge) est consigné.
- **Invalide** : classement sans justification, ou « (S) » revendiqué sans citation du cahier des charges.

**💡 Indice** *(après 2 min 30)*
Un indice fiable de catégorie (C) : le commentaire du test **recopie l'opération arithmétique** (`// 15 % + 10 %`, `// prix * 1,20`). Un test de catégorie (S) cite une **règle**, pas un calcul.

**🔑 Solution de référence**

| Test | Attendu | Origine | Justification |
|---|---|---|---|
| `ApplyVat_StandardRate_Returns120` | `120.00m` | **(S)** | CDC §3.1 : taux normal 20 % |
| `ApplyVat_RoundsToTwoDecimals` | `12.35m` | **(C)** | Le mode d'arrondi n'est **pas** spécifié dans le CDC → l'attendu vient de `MidpointRounding.AwayFromZero` lu dans le code |
| `ApplyVat_ZeroAmount_ReturnsZero` | `0m` | **(S)** | Cas trivial, cohérent avec la spécification |
| `ApplyVat_NegativeAmount_...` | — | **(I)** | Le CDC ne dit rien des montants négatifs → **question à poser au métier**, pas un test |

La ligne à surligner est la deuxième : le mode d'arrondi n'est pas spécifié, donc l'assertion **ne peut pas** être de catégorie (S). Le test est vert et sans valeur. C'est la porte d'entrée de BUG-102 et de l'exercice M1-4.

**🎓 Ce que l'exercice enseigne vraiment**
Que la question de tri n'est pas « ce test est-il bien écrit ? » mais « **d'où vient le nombre ?** ». C'est une question qu'un·e QA peut poser sans lire le code, sans connaître le framework, et sans se faire impressionner par la qualité rédactionnelle de la sortie. C'est aussi la question qui alimente le malus de −30 QAC.

---

### 🧪 Exercice M1-3 — « La matrice de décision »

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐ |
| **Durée cible** | 7 min |
| **Modalité** | squad |
| **Matériel** | `docs/openapi.yaml`, `frontend/src/app/checkout/`, `backend/SkyRetail.Domain/Pricing/`, `backend/SkyRetail.Api/Controllers/MeController.cs` |
| **QA Credits** | 40 |

**Énoncé**
Pour chacune des quatre features F1 à F4, choisissez **une seule** famille d'outillage — framework classique, automatisation scriptée générée, IA générative — et justifiez en répondant explicitement aux cinq questions de la matrice §1.2.2. Le livrable sera contredit par un autre squad au Contre-Test : anticipez l'objection.

**✅ Résultat attendu**
- [ ] `boss-j1/matrice-decision.md` avec une ligne par feature et six colonnes : *Feature · Famille retenue · Source de l'oracle · Rejouabilité CI · Stabilité de l'interface · Coût d'un faux négatif*.
- [ ] Les quatre features sont couvertes, **avec des choix différents** entre au moins deux d'entre elles (un tableau uniforme est refusé).
- [ ] Pour chaque feature, la **source de l'oracle** est un artefact nommé et existant du dépôt (`docs/cdc-v4.0.md §x`, `docs/openapi.yaml`, RGPD art. 15/17…), jamais « le code ».
- [ ] Une ligne « objection anticipée » par feature.
- **Invalide** : « IA générative » choisi pour les quatre features ; ou source d'oracle = « l'implémentation actuelle ».

**💡 Indice** *(après 3 min)*
La question qui tranche le plus vite est la première : *le résultat attendu est-il dérivable d'une source indépendante du code ?* Sur F3, la réponse est un fichier de 23 endpoints. Sur F1, c'est six pages écrites par le métier. Sur F2, la réponse honnête est « pas encore ».

**🔑 Solution de référence**

| Feature | Famille | Source de l'oracle | Rejouabilité | Stabilité IHM | Faux négatif | Objection anticipée |
|---|---|---|---|---|---|---|
| **F1** | Framework classique, IA pour la mécanique | `docs/cdc-v4.0.md` §3.1-3.2 | forte | s/o | élevé (facturation) | « Le CDC est ambigu » → oui, c'est le Boss J1 |
| **F2** | Scriptée générée (codegen/agents [S-24]) puis durcissement | Parcours métier + maquettes | forte | **faible** (refonte v4.0) | moyen | « Les agents healent tout seuls » → healing silencieux interdit |
| **F3** | IA générative depuis OpenAPI | `docs/openapi.yaml` (23 endpoints) | forte | forte | moyen | « Le contrat peut être faux » → juste : ajouter du fuzzing (M3) |
| **F4** | Humain d'abord, IA en assistance | RGPD art. 15 & 17 + `docs/cdc-v4.0.md` §5 | moyenne | moyenne | **très élevé** | « C'est lent » → oui, et c'est assumé |

**🎓 Ce que l'exercice enseigne vraiment**
Que le choix d'outillage se déduit de la **disponibilité d'un oracle indépendant**, pas de la modernité de l'outil. Et que la seule feature où l'IA générative est franchement à son avantage — F3 — est celle où quelqu'un a pris la peine d'écrire un contrat.

**Exercice bonus ⭐⭐⭐⭐⭐** — Reprendre F2 et démontrer, chiffres en main, le coût comparé de trois stratégies de sélecteurs (CSS profond / `data-testid` / rôle accessible) : nombre de tests cassés après un `ng generate` de refonte d'un composant du checkout.

---

### 🧪 Exercice M1-4 — « Prendre l'IA en défaut » 🎯

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐⭐ |
| **Durée cible** | 8 min (+ 5 min de Contre-Test) |
| **Modalité** | squad |
| **Matériel** | `backend/SkyRetail.Domain/Pricing/VatCalculator.cs`, `docs/cdc-v4.0.md` §3.1, un panier de 8 lignes minimum |
| **QA Credits** | 80 |

**Énoncé**
`VatCalculator` contient un défaut d'arrondi que **toute** génération naïve de tests valide au lieu de détecter. Votre mission : **écrire le test qui échoue**. Contraintes : (1) l'assertion ne doit pas être dérivée du code — vous devez pouvoir en citer la source ; (2) le test doit échouer sur le code actuel et passer après correction ; (3) vous devez produire, en trois lignes, l'explication de **pourquoi le LLM ne pouvait pas le trouver seul**.

**✅ Résultat attendu**
- [ ] `backend/SkyRetail.Tests/Pricing/VatRoundingTests.cs` contient un test **rouge** sur `formation/j1-start`.
- [ ] L'écart constaté est de **0,01 €** au minimum, sur un panier d'au moins **7 lignes**.
- [ ] L'assertion cite sa source en commentaire : arrondi au pair le plus proche (*banker's rounding*, `MidpointRounding.ToEven`), norme de facturation appliquée par le CDC §3.1.
- [ ] Le test devient **vert** si l'on remplace `MidpointRounding.AwayFromZero` par `MidpointRounding.ToEven` — la correction est démontrée sans être commitée.
- [ ] `boss-j1/defaut-ia.md` contient les trois lignes d'explication.
- **Invalide** : test rendu rouge en modifiant le code de production ; ou écart obtenu avec un seul montant magique non reproductible ; ou assertion recalculée depuis `AwayFromZero`.

**💡 Indice** *(après 3 min 30)*
Un arrondi à mi-chemin est **invisible sur les valeurs rondes couramment testées** — 10 €, 19,99 €, 100 € : les deux modes d'arrondi y donnent le même centime, et c'est pour cela que la suite générée par le LLM est verte. Il ne devient visible que sur les montants dont la **troisième décimale de la TVA tombe pile sur 5** (`x,xx5`) : là, l'écart d'un centime apparaît **dès une seule ligne**. Cherchez donc d'abord un tel montant — `0,625 € × 20 % = 0,125 €` en est un — puis empilez-le : sur un panier multi-lignes, l'effet cesse d'être une curiosité à un centime et devient **systématique**, l'écart croissant linéairement avec le nombre de lignes. Sept lignes suffisent à le rendre indiscutable en réunion. Si vous ne trouvez pas le montant à la main, laissez FsCheck chercher — c'est le sujet de M3, vous avez le droit d'anticiper.

**🔑 Solution de référence**

```csharp
// backend/SkyRetail.Tests/Pricing/VatRoundingTests.cs
using FluentAssertions;
using SkyRetail.Domain.Pricing;
using Xunit;

public class VatRoundingTests
{
    // Oracle : CDC v4.0 §3.1 — « les montants de TVA sont arrondis selon la règle
    // du pair le plus proche (arrondi bancaire) ». Source INDÉPENDANTE du code.
    // L'implémentation actuelle utilise MidpointRounding.AwayFromZero.
    [Fact]
    public void TotalVat_OnSevenHalfCentLines_UsesBankersRounding()
    {
        // 7 lignes dont la TVA tombe exactement sur un demi-centime : 0,125 € chacune
        var lines = Enumerable.Repeat(0.625m, 7).ToArray();   // 0,625 × 20 % = 0,125
        var sut   = new VatCalculator(vatRate: 0.20m);

        var total = lines.Sum(l => sut.VatFor(l));

        // Arrondi bancaire : 0,125 → 0,12 (pair le plus proche) → 7 × 0,12 = 0,84
        // Arrondi AwayFromZero (code actuel) : 0,125 → 0,13 → 7 × 0,13 = 0,91
        total.Should().Be(0.84m,
            "CDC §3.1 impose l'arrondi bancaire ; l'écart cumulé atteint 0,07 € sur 7 lignes");
    }

    // Variante paramétrée : l'écart croît linéairement avec le nombre de lignes.
    [Theory]
    [InlineData(1, 0.12)]
    [InlineData(7, 0.84)]
    [InlineData(20, 2.40)]
    public void TotalVat_ScalesWithBankersRounding(int lineCount, decimal expected)
    {
        var sut = new VatCalculator(vatRate: 0.20m);
        var total = Enumerable.Repeat(0.625m, lineCount).Sum(l => sut.VatFor(l));
        total.Should().Be(expected);
    }
}
```

Correction démontrée (non commitée) :

```csharp
// backend/SkyRetail.Domain/Pricing/VatCalculator.cs
public decimal VatFor(decimal amountExclVat)
    => Math.Round(amountExclVat * _vatRate, 2, MidpointRounding.ToEven); // était AwayFromZero
```

**Les trois lignes attendues dans `boss-j1/defaut-ia.md` :**

> 1. Le LLM ne disposait d'aucun oracle indépendant : le mode d'arrondi n'est pas déductible du code, il est **normatif**, et le CDC §3.1 ne lui avait pas été fourni.
> 2. Le générateur est optimisé pour produire des tests **qui passent** ; produire un test rouge est, de son point de vue, un échec [S-43].
> 3. Le défaut n'apparaît qu'en **accumulation** : aucun cas de test unitaire à une ligne ne le révèle, ce qui le rend invisible aux stratégies de couverture [S-45].

**🎓 Ce que l'exercice enseigne vraiment**

Trois enseignements, dans cet ordre de gravité.

1. **Un défaut d'oracle ne se détecte pas par plus de couverture.** On peut couvrir `VatFor` à 100 % et ne jamais voir BUG-102. C'est la définition opératoire de l'*oracle gap* [S-45].
2. **La compétence rare n'est pas de générer, c'est de savoir où chercher.** Le squad a dû mobiliser une connaissance externe — la norme d'arrondi comptable — que le modèle n'avait pas de raison de convoquer.
3. **Écrire le test rouge d'abord est une discipline, pas une préférence.** C'est le badge 🧿 **L'Oracle**, et c'est le seul comportement qui garantisse qu'un test peut échouer.

**Contre-Test (5 min).** Le squad adverse dispose du droit de modifier **une seule ligne** de production pour tenter de faire passer le test rouge sans corriger l'arrondi. S'il y parvient (par exemple en arrondissant une seule fois sur le total plutôt que ligne à ligne), il gagne **+20 QAC** — et l'enseignement est encore meilleur : l'assertion portait sur la mauvaise granularité.

**Exercice bonus ⭐⭐⭐⭐⭐** — Écrire une propriété FsCheck qui **cherche seule** un contre-exemple à `somme(TVA des lignes) == TVA(somme des lignes)`, et faire réduire (*shrink*) le contre-exemple minimal. Comparer le temps de découverte à votre recherche manuelle.

---

## 4. Débriefing

### 4.1 Les cinq erreurs les plus fréquentes sur ce module

| # | Erreur | Correction |
|---|---|---|
| 1 | **Célébrer une suite 100 % verte.** « L'IA a écrit 40 tests, tous passent » | Sur une classe jamais testée, c'est le symptôme le plus fiable de tautologie. Demander systématiquement : *quel test a échoué ?* |
| 2 | **Confondre couverture et vérification.** « On est passés de 12 à 60 % » | La couverture mesure l'exécution [S-44]. Sans score de mutation, un chiffre de couverture n'est pas défendable en comité — c'est la question piège n°1 du Boss J4. |
| 3 | **Croire qu'un meilleur prompt suffit.** « Il faut juste mieux demander » | Non : il faut **changer la source de vérité**. Tant que le modèle lit l'implémentation, il paraphrase l'implémentation [S-18][S-43]. |
| 4 | **Committer un test E2E jamais exécuté.** Les locators « ont l'air bons » | −30 QAC. La contre-mesure est outillée : codegen [S-22], agents [S-24], MCP sur l'arbre d'accessibilité [S-25]. |
| 5 | **Extrapoler les benchmarks à son dépôt.** « GPT fait 35 %, on fera pareil » | Les benchmarks portent sur du code souvent contaminé ; SWE-Bench Pro a été conçu pour y remédier [S-06]. Mesurer sur 3 classes de **son** dépôt avant d'engager une stratégie. |

### 4.2 Questions de contrôle

1. **Quels sont les quatre chiffres de la cascade Meta TestGen-LLM, et que mesure chacun ?**
   → 75 % compilent, 57 % passent de façon fiable, 25 % augmentent la couverture, 73 % des recommandations sont acceptées en production [S-08]. Le quatrième porte sur les survivants du filtre, pas sur la production brute.

2. **Citez la définition ISTQB de l'oracle de test et expliquez la conséquence pratique.**
   → *« a source to determine expected results […] but should not be the code »* [S-18]. Conséquence : un LLM à qui l'on donne l'implémentation ne produit pas un oracle mais une paraphrase exécutable de l'implémentation.

3. **Pourquoi un test généré qui passe du premier coup sur une classe bogée est-il un problème structurel et non accidentel ?**
   → Parce que le générateur est optimisé pour maximiser la couverture avec des tests qui passent : il calcule l'attendu en exécutant le code. Un test rouge serait, pour lui, un échec de génération [S-43].

4. **Qu'est-ce que l'*oracle gap*, et par quelle métrique le mesure-t-on ?**
   → L'écart entre code exécuté et code vérifié : une forte couverture coexiste couramment avec des oracles faibles [S-45]. On le mesure par le **score de mutation** (M3), pas par la couverture.

5. **Sur quels critères choisit-on entre framework classique, automatisation scriptée et IA générative ?**
   → Disponibilité d'un oracle indépendant du code ; besoin de rejouabilité en CI ; stabilité de l'interface ; coût d'un faux négatif ; existence d'une spécification exploitable (matrice §1.2.2).

### 4.3 Ce qu'on retient

- **L'oracle ne doit pas être le code** [S-18]. Tout le reste du module en découle.
- La cascade **75 / 57 / 25 / 73 %** [S-08] : sur 100 tests générés, environ **25** apportent quelque chose. L'unité de travail est le **filtre**, pas le prompt.
- Un test généré **vert du premier coup** sur une classe jamais testée est un signal d'alerte [S-43].
- La couverture mesure **l'exécution**, jamais la **vérification** [S-44][S-45].
- Le choix d'outillage se déduit de la **disponibilité d'un oracle indépendant**, pas de la modernité de l'outil [S-32].

### 4.4 Transition vers M2

> Vous venez d'établir que sans source de vérité indépendante, l'IA fige les bugs au lieu de les révéler. Or il existe, dans ce dépôt, exactement une source de vérité indépendante du code : **six pages écrites par le métier, jamais relues par la tech**. M2 s'y attaque — et découvre qu'elles ne sont ni complètes, ni cohérentes.

---

## 5. Sources

### Sources de la notion N1 — Ce que les LLM savent et ne savent pas faire en test logiciel

[S-01] **Software Testing With Large Language Models: Survey, Landscape, and Vision** — https://arxiv.org/abs/2307.07221 — *papier arXiv → IEEE TSE vol. 50 n°4, 2023 (publié 2024)* — analyse systématique de **102 études** ; identifie la génération de cas de test et la réparation de programme comme les deux tâches dominantes de la littérature.

[S-02] **TESTEVAL: Benchmarking Large Language Models for Test Case Generation** — https://arxiv.org/abs/2406.04531 — *papier arXiv (NAACL 2025 Findings), 2024* — **210 programmes**, 16 LLM, 3 tâches : la couverture globale est atteignable, mais cibler une **ligne / branche / chemin précis** reste le point faible net des LLM.

[S-03] **TestGenEval: A Real World Unit Test Generation and Test Completion Benchmark** — https://arxiv.org/abs/2410.00752 — *papier arXiv (Meta AI / FAIR), 2024* — **68 647 tests**, 1 210 paires code/test, 11 dépôts réels ; le meilleur modèle plafonne à **35,2 % de couverture moyenne**.

[S-04] **SWT-Bench: Testing and Validating Real-World Bug-Fixes with Code Agents** — https://arxiv.org/abs/2406.12952 — *papier arXiv (NeurIPS 2024), 2024* — les tests générés par LLM, utilisés comme **filtre de validation**, **doublent la précision** de SWE-Agent pour valider un correctif.

[S-05] **SWE-bench Multimodal: Do AI Systems Generalize to Visual Software Domains?** — https://www.swebench.com/multimodal.html — *doc officielle de benchmark + papier ICLR 2025, 2024-2025* — **517 issues** contenant captures d'écran, maquettes et diagrammes ; évalue le traitement conjoint texte + visuel.

[S-06] **SWE-Bench Pro: Can AI Agents Solve Long-Horizon Software Engineering Tasks?** — https://arxiv.org/abs/2509.16941 — *papier arXiv, 2025* — **1 865 problèmes / 41 dépôts d'entreprise**, conçu anti-contamination ; tâches de plusieurs heures à plusieurs jours, patchs multi-fichiers.

[S-07] **Evaluating Large Language Models Trained on Code (HumanEval / Codex)** — https://arxiv.org/abs/2107.03374 — *papier arXiv (OpenAI), 2021* — introduit HumanEval (**164 problèmes**) et la métrique **pass@k** ; Codex initial à **28,8 % en pass@1**.

[S-08] **Automated Unit Test Improvement using Large Language Models at Meta (TestGen-LLM)** — https://arxiv.org/abs/2402.09171 — *papier arXiv (FSE 2024, ACM), 2024* — le chiffre-clé de la formation : **75 %** compilent, **57 %** passent de façon fiable, **25 %** augmentent la couverture, **73 %** des recommandations acceptées en production.

[S-09] **Revolutionizing software testing: Introducing LLM-powered bug catchers (Meta ACH)** — https://engineering.fb.com/2025/02/05/security/revolutionizing-software-testing-llm-powered-bug-catchers-meta-ach/ — *blog éditeur (Engineering at Meta) + arXiv:2501.12862, 2025* — premier système industriel combinant génération de **mutants ET de tests** par LLM, déployé sur Facebook Feed, Instagram, Messenger, WhatsApp.

[S-10] **An Empirical Evaluation of Using LLMs for Automated Unit Test Generation (TestPilot)** — https://arxiv.org/abs/2302.06527 — *papier arXiv (cs.SE), 2023* — sur **1 684 fonctions d'API JavaScript**, **70,2 %** de couverture d'instructions contre **51,3 %** pour Nessie (technique scriptée feedback-directed).

[S-11] **World Quality Report 2025-26 (Capgemini / Sogeti / OpenText)** — https://www.capgemini.com/insights/research-library/world-quality-report-2025-26/ — *rapport industrie, 17ᵉ édition, 2025-2026* — **~90 %** poursuivent la GenAI en quality engineering, **15 %** seulement à l'échelle entreprise ; productivité **+19 %** ; couverture d'automatisation classique stagnante à **33 %**.

[S-12] **The 2026 State of Testing Report (PractiTest)** — https://www.practitest.com/state-of-testing/ — *rapport industrie, 13ᵉ édition, 2026* — adoption de l'IA en test à **76,8 %** (81,7 % en grande entreprise) ; **70 %** pour créer des cas de test, **19,9 %** seulement pour l'identification de risques.

[S-13] **Stack Overflow Developer Survey 2025 — AI** — https://survey.stackoverflow.co/2025/ai — *enquête industrie, >49 000 répondants, 2025* — **84 %** utilisent ou prévoient d'utiliser l'IA (76 % l'an passé), mais **46 % ne font pas confiance** à l'exactitude des sorties (31 % l'an passé).

[S-14] **DORA — State of AI-assisted Software Development 2025** — https://dora.dev/dora-report-2025/ — *rapport industrie (Google Cloud, GitHub, GitLab, IT Revolution), 2025* — adoption **90 %** (+14 pts) ; l'IA agit en **amplificateur** : **+21 %** de tâches complétées, **+98 %** de PR fusionnées, sans amélioration proportionnelle des métriques de livraison.

[S-15] **The State of Developer Ecosystem 2025 (JetBrains)** — https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/ — *rapport industrie, 24 534 développeurs, 194 pays, 2025* — **85 %** utilisent régulièrement des outils IA, **62 %** au moins un agent ; inquiétude n°1 = **qualité inconstante** du code généré.

[S-16] **Octoverse 2025 (GitHub)** — https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/ — *rapport officiel GitHub, 2025* — **1,1 M+ dépôts publics** utilisent un SDK LLM, dont **693 867 créés en 12 mois** (**+178 %** YoY).

### Sources de la notion N2 — IA générative vs automatisation scriptée vs frameworks classiques

[S-17] **ISTQB Glossary — « test automation »** — https://glossary.istqb.org/en_US/term/test-automation-2-2 — *glossaire normatif officiel, 2026* — définition de référence : *« the use of software to perform or support test activities, e.g. test management, test design, test execution and results checking »*.

[S-18] **ISTQB Glossary — « test oracle »** — https://glossary.istqb.org/en_US/term/oracle — *glossaire normatif officiel, 2026* — *« a source to determine expected results […] but should not be the code »* : argument central pour établir qu'un LLM lisant l'implémentation ne peut pas servir d'oracle indépendant.

[S-19] **ISTQB Certified Tester Foundation Level (CTFL) Syllabus v4.0.1** — https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf — *syllabus officiel PDF, 2023 rév. 2024* — **14 Business Outcomes, 64 Learning Objectives, 6 chapitres** ; socle normatif du vocabulaire employé dans tout le module.

[S-20] **ISTQB Certified Tester AI Testing (CT-AI) Syllabus v2.0** — https://istqb.org/wp-content/uploads/2026/05/ISTQB-_CTAI_Syllabus_v2.0_Release.pdf — *syllabus officiel PDF, 2026 (GA)* — **7 chapitres examinables, minimum 19,5 h** de formation accréditée ; sert ici à délimiter le hors-périmètre (tester l'IA ≠ tester avec l'IA).

[S-21] **ISTQB CTAL-TAE (Test Automation Engineering) v2.0** — https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/ — *page officielle de certification, 2024* — **40 questions / 66 points, score de passage 43, 90 minutes**, 8 chapitres : repère du niveau d'exigence attendu en automatisation.

[S-22] **Test generator (codegen) | Playwright** — https://playwright.dev/docs/codegen — *doc officielle éditeur, 2026* — le générateur *« prioritise role, text and test id locators »* et désambiguïse automatiquement : c'est la contre-mesure outillée au sélecteur halluciné.

[S-23] **Locators | Playwright** — https://playwright.dev/docs/locators — *doc officielle éditeur, 2026* — *« Testing by test ids is the most resilient way of testing »* ; les sélecteurs CSS/XPath longs sont qualifiés de **« bad practice that leads to unstable tests »**.

[S-24] **Playwright Test — Agents (planner / generator / healer)** — https://playwright.dev/docs/test-agents — *doc officielle éditeur, 2026* — 3 agents natifs (planner explore et écrit un plan Markdown, generator produit les `.spec.ts`, healer répare les tests cassés), installés par `npx playwright init-agents`.

[S-25] **Playwright MCP — Introduction** — https://playwright.dev/mcp/introduction — *doc officielle éditeur, 2026* — **40+ outils** opérant sur l'**arbre d'accessibilité** ; un snapshot structuré coûte **~200-400 tokens** contre des milliers pour une capture d'écran.

[S-26] **microsoft/playwright-mcp (dépôt GitHub officiel)** — https://github.com/microsoft/playwright-mcp — *dépôt officiel, 2026* — installation en une ligne `npx @playwright/mcp@latest`, compatible VS Code / Claude Code / Cursor.

[S-27] **Cypress best practices** — https://docs.cypress.io/app/core-concepts/best-practices — *doc officielle éditeur, 2026* — recommande les attributs `data-*` (`data-cy`) car ils *« will not change from CSS style or JS behavioral changes »*.

[S-28] **Cypress AI Skills** — https://docs.cypress.io/app/tooling/ai-skills — *doc officielle éditeur, 2026* — **3 skills IA officiels** (`cypress-author`, `cypress-explain`, `cypress-docs`) ; `cy.prompt()` fait de la résolution d'élément et de l'auto-healing par IA.

[S-29] **Waiting Strategies | Selenium** — https://www.selenium.dev/documentation/webdriver/waits/ — *doc officielle éditeur, 2026* — distingue **implicit** et **explicit wait** et **déconseille explicitement de mélanger les deux** : cause racine documentée de flakiness, à rapprocher de BUG-202.

[S-30] **Page object models | Selenium** — https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/ — *doc officielle éditeur, 2026* — *« A page object is an object-oriented class that serves as an interface to a page of your AUT »* : structure de référence pour durcir un test issu de codegen.

[S-31] **Computer use tool — Claude Platform Docs** — https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool — *doc officielle éditeur, 2026* — header bêta requis ; la doc recommande les cas d'usage *« où la vitesse n'est pas critique (par exemple, automated software testing) »*.

[S-32] **Gartner — Critical Capabilities for AI-Augmented Software Testing Tools** — https://www.gartner.com/en/documents/7022898 — *rapport analyste, 2025* — évalue **10 éditeurs** ; **Self-Healing For Test Scripts** et **Manual to Automated Test Conversion** distinguent un outil « AI-augmented » d'un framework scripté.

### Sources de la notion N3 — Les anti-patterns fondateurs

[S-43] **Design choices made by LLM-based test generators prevent them from finding bugs** — https://arxiv.org/abs/2412.14137 — *papier arXiv, 2024* — **la source clé sur le test tautologique** : Codium CoverAgent et CoverUp, appliqués à du code bogué, génèrent des tests qui **valident le bug au lieu de le détecter**.

[S-45] **The Oracle Gap: Comparing Coverage and Mutation Score** — https://arxiv.org/abs/2309.02395 — *papier arXiv, 2023* — introduit la notion d'**« oracle gap »** : une forte couverture coexiste couramment avec des oracles faibles.

[S-44] **Code Coverage Best Practices (Google Testing Blog)** — https://testing.googleblog.com/2020/08/code-coverage-best-practices.html — *blog officiel Google, 2020* — seuils **60 % acceptable / 75 % louable / 90 % exemplaire**, mise en garde contre la **« mentalité de case à cocher »** et rappel que les gains de couverture sont logarithmiques.

[S-41] **Test smells in LLM-Generated Unit Tests** — https://arxiv.org/abs/2410.10628 — *papier arXiv, 2024* — **20 505 suites de tests** générées analysées ; smells systématiques de type **Assertion Roulette** et **Magic Number Test**.

[S-42] **Quality Assessment of Python Tests Generated by Large Language Models** — https://arxiv.org/abs/2506.14297 — *papier arXiv (EASE 2025), 2025* — les **erreurs d'assertion représentent 64 %** de toutes les erreurs ; le **manque de cohésion est le smell le plus fréquent (41 %)**.

[S-33] **We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs** — https://arxiv.org/abs/2406.10279 — *papier arXiv (USENIX Security 2025), 2024* — sur **576 000 échantillons** générés par 16 LLM, **5,2 %** des paquets recommandés par les modèles commerciaux et **21,7 %** pour les open source sont **inexistants** ; **205 474 noms hallucinés uniques** (« slopsquatting »).

[S-34] **A Survey on Hallucination in Large Language Models** — https://arxiv.org/abs/2311.05232 — *survey arXiv (ACM TOIS), 2023* — taxonomie canonique distinguant hallucinations **factuelles** et **de fidélité** ; le sélecteur halluciné relève de la seconde catégorie.

[S-35] **Reduce hallucinations — Documentation officielle Anthropic** — https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations — *doc officielle éditeur, 2026* — techniques concrètes (autoriser « je ne sais pas », citations vérifiables, chain-of-thought verification, best-of-N) **avec l'aveu explicite** qu'elles *« réduisent significativement les hallucinations mais ne les éliminent pas entièrement »*.

[S-36] **OWASP Top 10 for LLM Applications 2025** — https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/ — *référentiel de sécurité officiel, 2025* — cadre des **10 risques critiques** (LLM01 prompt injection → LLM10 unbounded consumption) ; rattachement normatif de l'hallucination de paquets.

[S-37] **Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions** — https://arxiv.org/abs/2108.09293 — *papier arXiv (IEEE S&P 2022), 2021* — sur **1 689 programmes** générés dans 89 scénarios liés au Top 25 CWE MITRE, **~40 %** du code contient des vulnérabilités exploitables.

[S-38] **October 2025 Update: GenAI Code Security Report (Veracode)** — https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/ — *rapport industrie, 100+ LLM, 80 tâches réelles, 2025* — le code généré introduit des failles dans **45 % des tests** ; **Java à 72 % d'échec sécurité** ; **augmenter la taille du modèle n'améliore pas la sécurité**.

[S-39] **AI Copilot Code Quality: 2025 Look Back at 12 Months of Data (GitClear)** — https://www.gitclear.com/ai_assistant_code_quality_2025_research — *étude industrielle, 211 M de lignes, 2025* — code copié-collé passé de **8,3 % (2020) à 12,3 % (2024)**, code refactorisé chutant de **25 % à moins de 10 %**.

[S-40] **4x Velocity, 10x Vulnerabilities (Apiiro)** — https://apiiro.com/blog/4x-velocity-10x-vulnerabilities-ai-coding-assistants-are-shipping-more-risks/ — *rapport industrie, 2025* — **×10** de nouvelles failles par mois, **+322 %** de chemins d'escalade de privilèges, **+40 %** d'exposition de secrets.

[S-46] **Mocks Aren't Stubs (Martin Fowler)** — https://martinfowler.com/articles/mocksArentStubs.html — *article de référence, 2007* — distingue les **5 types de test doubles** (Dummy, Fake, Stub, Spy, Mock) et alerte sur le couplage excessif à l'implémentation, mécanisme du sur-mock.

[S-47] **Software Engineering at Google — Chapitre 13, Test Doubles** — https://abseil.io/resources/swe-book/html/ch13.html — *chapitre officiel en accès libre, 2020* — Google documente que l'abus du mocking a **« pollué »** sa base de tests, au point que certains ingénieurs ont déclaré **« no more mocks! »**.

[S-48] **DORA — Balancing AI tensions** — https://dora.dev/insights/balancing-ai-tensions/ — *rapport officiel Google Cloud / DORA, 2026* — **30 %** des professionnels ont peu ou pas confiance dans le code généré ; une forte adoption de l'IA fait monter **simultanément le débit et l'instabilité**.

[S-13] **Stack Overflow 2025 Developer Survey — AI** — https://survey.stackoverflow.co/2025/ai — *enquête industrie, 2025* — **46 %** ne font pas confiance à l'exactitude du code IA ; **45 %** citent **« des solutions presque correctes mais pas tout à fait »** comme frustration n°1 — description exacte du test tautologique vu de l'utilisateur.
