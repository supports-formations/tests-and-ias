# Module M10 — Gouvernance, dérive et évaluation des agents de test

> **Jour 4** · **Durée : 1 h 30** · **QA Credits en jeu : 150**
> *Fil rouge : l'Agent Zéro tourne dans la CI de SkyRetail depuis hier soir. Personne ne sait ce qu'il coûte, personne ne sait s'il est meilleur ou pire qu'il y a trois jours, et personne ne sait ce qui se passera quand le modèle qu'il appelle sera retiré. Ce module transforme un outil en actif industriel — parce qu'un agent de test doit lui-même être testé.*

---

## 0. Carte du module

### 0.1 Objectifs pédagogiques

À l'issue de ce module, le·a participant·e sera capable de :

- **Instrumenter** un agent de test avec les conventions sémantiques OpenTelemetry GenAI et **distinguer** les attributs stables de ceux encore en statut *Development* ;
- **Énumérer** ce qui doit être journalisé d'un appel LLM (prompt, identifiant complet de modèle, tokens par bucket, coût, décision, latence) et ce qui ne doit **jamais** l'être ;
- **Construire** un jeu d'évals reproductible pour un agent de test, avec des critères d'acceptation chiffrés et un mécanisme de non-régression exécutable en CI ;
- **Neutraliser** les trois biais documentés d'un juge LLM (position, verbosité, auto-préférence) et **justifier** un écart de score par un intervalle de confiance ;
- **Écrire** un test de garde qui échoue lorsque le modèle appelé approche sa date de retrait, et **estimer** le coût de maintenance d'une suite générée sur 6 mois.

### 0.2 Prérequis du module

- M06 terminé : l'Agent Zéro existe (`.claude/skills/agent-zero/SKILL.md`, sous-agents `test-writer` / `test-runner` / `test-analyst`, `.claude/settings.json` avec hooks).
- M08 terminé : l'agent s'exécute en headless dans GitHub Actions, secrets gérés par OIDC.
- M09 terminé : preuves non fonctionnelles disponibles (p95, axe-core, scan sécurité).
- Node 20+ (`npx promptfoo`) et .NET 9 SDK opérationnels.

### 0.3 Position dans le fil rouge

| Avant ce module | Après ce module |
|---|---|
| L'agent produit des tests ; sa qualité est jugée « à l'œil » module après module | L'agent a un **jeu d'évals de 10 cas** dont les 9 bugs plantés, exécutable par `npx promptfoo eval` |
| La facture Claude est un chiffre mensuel sans ventilation | Chaque campagne a un coût, une latence et un nombre de décisions humaines mesurés |
| « Le modèle est le même, donc les résultats seront les mêmes » | Le squad sait citer 84 % → 51 % en trois mois sur un même service, et a écrit le test de garde de dépréciation |
| La question du comité « qui maintient 340 tests dans six mois ? » est un piège | Le squad a un chiffre, une procédure et un propriétaire |

### 0.4 Découpage horaire

| Séquence | Contenu | Durée |
|---|---|---|
| S0 | La Carte : ce qui reste à prouver avant le comité | 2 min |
| S1 | **N1** — Observabilité d'un agent de test | 10 min |
| S2 | **N2** — Évaluer les sorties d'un agent | 11 min |
| S3 | **N3** — Dérive de modèle et maintenance dans la durée | 10 min |
| S4 | 🔍 Exemple A — la trace qui ment sur le coût | 9 min |
| S5 | 🔍 Exemple B — le juge qui se préfère lui-même | 8 min |
| S6 | 🔍 Exemple C — le test de garde de dépréciation | 7 min |
| S7 | 🧪 Exercices M10-1 à M10-4 | 26 min |
| S8 | Contre-Test sur M10-4 + débriefing + scoreboard | 7 min |
| **Total** | **Somme des séquences S0 → S8** | **90 min = 1 h 30** ✅ *conforme à la durée annoncée en en-tête* |

> ⏱️ **Régulation du temps.** Les exercices ⭐ et ⭐⭐ sont menés **en parallèle par les squads** (chaque squad n'en traite qu'un des deux, puis restitue en 2 min à l'autre). Les durées cibles indiquées par exercice supposent ce fonctionnement. L'exercice bonus ⭐⭐⭐⭐⭐ est **hors séance**.

### 0.5 Notions couvertes

| # | Notion |
|---|---|
| **N1** | Observabilité d'un agent de test — tracing LLM, conventions OpenTelemetry GenAI, plateformes, ce qu'on journalise et ce qu'on ne journalise pas, alerting de dérive de coût |
| **N2** | Évaluer les sorties d'un agent — jeux d'évals, LLM-as-a-judge et ses biais, métriques, promptfoo / DeepEval, non-régression sur prompts |
| **N3** | Dérive de modèle et maintenance dans la durée — data drift vs model drift, régression entre versions, dépréciation et retrait, red teaming, coût de maintenance |

---

## 1. Partie théorique

### 1.1 Notion N1 — Observabilité d'un agent de test

#### 1.1.1 De quoi parle-t-on

L'**observabilité** d'un agent LLM est la capacité à reconstituer, après coup et sans instrumenter à nouveau, ce que l'agent a reçu, décidé et produit. La définition opérationnelle la plus utilisable est celle de Langfuse : une trace est un *« log structuré de chaque requête capturant le prompt exact envoyé, la réponse du modèle, l'usage de tokens, la latence et les outils/retrieval intermédiaires »* [S-07].

Trois objets structurent le vocabulaire, et il faut les tenir distincts :

| Objet | Définition | Équivalent QA |
|---|---|---|
| **Trace** | Une exécution complète de bout en bout (une campagne de test) | Un run de suite |
| **Span / observation** | Une opération élémentaire dans la trace (un appel LLM, un appel d'outil) | Un cas de test |
| **Session** | Un enchaînement de traces liées par un même contexte utilisateur | Une campagne pluri-jours |

Le référentiel normatif est le dépôt `open-telemetry/semantic-conventions-genai`, qui étend les conventions sémantiques OpenTelemetry avec les conventions GenAI et couvre *spans, metrics et events pour les clients GenAI, MCP et les conventions par fournisseur* [S-02].

> ⚠️ **À jour au 07/2026** — la page historique `opentelemetry.io/docs/specs/semconv/gen-ai/` affiche désormais un bandeau indiquant que ces conventions ont été **déplacées** et que la page **n'est plus maintenue** [S-01]. Un support de formation qui envoie les stagiaires sur l'ancienne URL les fait travailler sur une spécification abandonnée.

#### 1.1.2 Ce que dit l'état de l'art

**La spécification est jeune, et elle le dit.** Le document `gen-ai-agent-spans.md` porte le statut **`Development`** : les valeurs d'opération `create_agent`, `invoke_agent`, `execute_tool`, `invoke_workflow`, `plan`, `retrieval`, `create_memory` et l'ensemble des attributs `gen_ai.*` (`gen_ai.agent.id`, `gen_ai.agent.name`, `gen_ai.agent.version`, `gen_ai.provider.name`) sont en Development. Seuls les attributs empruntés au cœur des conventions — `error.type`, `server.address`, `server.port` — sont **Stable** [S-03]. La conséquence pratique est directe et contre-intuitive : **on ne fige pas d'assertion de test sur un attribut `gen_ai.*`** sans mécanisme de tolérance, sinon la suite d'observabilité devient elle-même une source de faux rouges.

**Ce que l'outil de l'atelier expose déjà.** Claude Code est instrumenté nativement [S-04]. Les métriques disponibles sont exactement celles qu'un comité de Go/No-Go réclame :

| Métrique | Unité | Ce qu'elle sert à défendre |
|---|---|---|
| `claude_code.session.count` | compte | Volume d'usage réel, par équipe |
| `claude_code.cost.usage` | **USD** | Le coût de la campagne, pas une extrapolation |
| `claude_code.token.usage` | tokens | Le dimensionnement face aux rate limits |
| `claude_code.lines_of_code.count` | lignes | Volume produit — à ne jamais présenter seul |
| `claude_code.code_edit_tool.decision` | compte | **Nombre de décisions humaines** : la traçabilité IA/humain du dossier de recette |
| `claude_code.active_time.total` | **s** | Temps humain réellement engagé |
| `claude_code.pull_request.count`, `.commit.count` | compte | Rattachement aux artefacts Git |

S'y ajoutent des **events** (`claude_code.user_prompt`, `claude_code.assistant_response`) et, en bêta, des **traces distribuées** : span racine `claude_code.interaction`, enfants `claude_code.llm_request`, `claude_code.hook`, `claude_code.tool`, ce dernier portant lui-même `claude_code.tool.blocked_on_user` — le temps d'attente d'une décision de permission — et `claude_code.tool.execution`. Un header W3C `traceparent` relie les spans client aux traces serveur ; depuis la **v2.1.216**, l'export `prometheus` seul omet les unités pour rester un scrape valide [S-04].

`claude_code.tool.blocked_on_user` est le compteur le plus sous-estimé du lot. Il mesure le **temps humain de supervision**, c'est-à-dire précisément le coût caché que le ROI de M12 doit intégrer.

**Le piège de mesure numéro un : la comptabilité des tokens cachés.** Langfuse impose un contrat de *buckets mutuellement exclusifs* — chaque token ne doit être compté que dans une seule clé de `usage_details`. Or **OpenAI reporte des compteurs inclusifs** (`prompt_tokens` contient déjà les `cached_tokens`) alors qu'**Anthropic exclut déjà cache reads et cache writes**. L'exemple documenté : 17 903 prompt tokens dont 17 817 cache hits doivent être stockés `input: 86` + `input_cached_tokens: 17817`, faute de quoi le coût affiché **surestime silencieusement** la facture réelle [S-06]. Un tableau de bord maison qui additionne naïvement les deux fournisseurs produit un chiffre faux — et le comité le verra.

**Le piège de mesure numéro deux : les rate limits ne comptent pas ce qu'on croit.** Chez Anthropic, deux mécanismes distincts coexistent : les **spend limits** (plafond mensuel : Start 500 $, Build 1 000 $, Scale 200 000 $) et les **rate limits** RPM/ITPM/OTPM par classe de modèle, avec un algorithme *token bucket* et une erreur **429** accompagnée d'un header `retry-after`. Point décisif : **`cache_read_input_tokens` ne compte pas dans l'ITPM** pour la plupart des modèles (exception Claude Haiku 3.5). Avec une limite de 2 000 000 ITPM et 80 % de cache hit, on traite effectivement **10 000 000 tokens d'entrée par minute** [S-05]. Un test de charge du pipeline dimensionné sans tenir compte du cache se trompe d'un facteur 5.

**Le paysage des plateformes.** Quatre approches, quatre compromis :

| Plateforme | Modèle d'intégration | Point différenciant | Réserve |
|---|---|---|---|
| **Langfuse** [S-07] | SDK, envoi **asynchrone en file locale et par batchs** | Réponse à l'objection « instrumenter ralentit l'appli » : elle ne tient pas | Évaluateurs au niveau *trace* **dépréciés** au profit du niveau *observation* (v4) [S-13] |
| **LangSmith** [S-08] | `LANGSMITH_TRACING=true` + clé | Wrappers Python/TS/**Java/Kotlin** | Sans `LANGSMITH_ENDPOINT` régionalisé (`https://eu.api.smith.langchain.com`), la clé EU **n'est pas reconnue** — c'est une condition de fonctionnement, pas un réglage de conformité |
| **Arize Phoenix** [S-09] | Construit **sur OpenTelemetry**, instrumentation OpenInference, ingestion **OTLP** | La même trace sert de preuve de debug **et** de cas de test rejouable | — |
| **Helicone** [S-10] | **Gateway** : on change la `baseURL` | Intercepter, rejouer et plafonner sans toucher au code, 100+ modèles, 0 % de markup | Un proxy de plus dans la chaîne de confiance |

Le pattern *gateway* mérite une attention particulière en QA : il permet de **rejouer** une campagne à l'identique et de **plafonner** la dépense sans modifier l'agent — deux capacités que l'on veut absolument en environnement de recette.

**Ce que la recherche ajoute.** Le papier *AgentOps* [S-15] propose une taxonomie issue d'une *systematic mapping study* des outils existants et identifie les artefacts à tracer **sur l'ensemble du cycle de vie de l'agent**. Son argument central est celui qui justifie ce module : les agents étant autonomes, non déterministes et en évolution continue, **l'observabilité est une condition de sûreté, pas un confort d'exploitation**. Le NIST dit la même chose en langage d'audit : le profil IA générative de l'AI RMF [S-14] rattache des actions suggérées aux fonctions Govern/Map/Measure/Manage, et nomme le risque n° 2 **« Confabulation »** — *« la production de contenu erroné ou faux énoncé avec assurance »*. C'est un mot plus juste qu'« hallucination » et, surtout, un terme normatif utilisable dans un critère d'acceptation.

**Et ce qu'on ne journalise pas.** C'est la moitié du sujet, et elle est traitée en détail en M11. En une ligne ici : un trace de test qui contient un secret, un jeton, une donnée personnelle réelle ou un fragment de base de production **exporte le problème** vers un tiers, souvent hors UE. La taxonomie de rails de NeMo Guardrails [S-11] — **input, retrieval, dialog, execution, output** — donne le point d'insertion propre : le rail *output* est l'endroit où l'on redacte avant l'export de télémétrie, pas après. Llama Guard [S-12] rappelle en outre que « tester la sécurité d'un LLM » signifie tester **deux surfaces distinctes** : classification de prompt **et** classification de réponse.

#### 1.1.3 Application au contexte SkyRetail

L'Agent Zéro s'exécute désormais dans le workflow `.github/workflows/agent-zero.yml`. On l'instrumente en trois lignes d'environnement, sans toucher au code de l'agent :

```yaml
# .github/workflows/agent-zero.yml — extrait, bloc env du job
env:
  CLAUDE_CODE_ENABLE_TELEMETRY: "1"
  OTEL_METRICS_EXPORTER: otlp
  OTEL_LOGS_EXPORTER: otlp
  OTEL_EXPORTER_OTLP_PROTOCOL: http/protobuf
  OTEL_EXPORTER_OTLP_ENDPOINT: ${{ secrets.OTEL_COLLECTOR_URL }}   # collecteur hébergé en UE
  OTEL_RESOURCE_ATTRIBUTES: "service.name=agent-zero,service.version=v4.0,deployment.environment=ci"
```

Le contrat de journalisation de la Task Force — à annexer au dossier de recette :

| Champ | Journalisé ? | Motif |
|---|---|---|
| Identifiant **complet et daté** du modèle (`claude-opus-5-…`) | ✅ obligatoire | Sans lui, aucune non-régression n'est interprétable [S-16] |
| Hash SHA-256 du prompt + version de la skill | ✅ | Corréler une dérive de résultat à un changement de prompt |
| Tokens par bucket (`input`, `input_cached`, `output`) | ✅ | Éviter le double comptage [S-06] |
| Coût en USD, latence, `blocked_on_user` | ✅ | Alimente le ROI de M12 |
| Décision de l'agent (`generate` / `fix-test` / `flag-bug` / `ask-human`) | ✅ | C'est la colonne « ce que l'IA a fait » du tableau de traçabilité |
| **Corps du prompt en clair** | ⚠️ conditionnel | Uniquement si le prompt ne contient ni code client sensible ni donnée de test réelle (M11) |
| Extraits de la base de recette, jetons, `GITHUB_TOKEN`, PII | ❌ **jamais** | Rail *output* de redaction avant export [S-11] |

**Alerting de dérive de coût.** Trois seuils, exprimés en règles PromQL sur les métriques exportées :

```promql
# 1) Dérive de coût : la campagne coûte 2× la médiane des 14 derniers jours
increase(claude_code_cost_usage_total{service_name="agent-zero"}[1h])
  > 2 * quantile_over_time(0.5, increase(claude_code_cost_usage_total[1h])[14d:1h])

# 2) Dérive de supervision : le temps d'attente humain explose (l'agent demande trop)
increase(claude_code_tool_blocked_on_user_seconds_total[1h]) > 900

# 3) Saturation : 429 répétés — le pipeline est sous-dimensionné vs ITPM
increase(claude_code_api_error_total{status="429"}[15m]) > 5
```

Le seuil n° 1 est le seul qui protège d'un scénario réel : une boucle de correction qui n'a pas de condition d'arrêt et qui relance 200 fois la même génération à 3 h du matin.

#### 1.1.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Le dashboard qui surestime la facture** | Le coût affiché est 3× la facture réelle | Double comptage des tokens cachés : compteurs inclusifs chez OpenAI, exclusifs chez Anthropic [S-06] | Un bucket par token, contrat explicite, test de réconciliation mensuel contre la facture |
| **Assertions sur des attributs instables** | La suite d'observabilité vire au rouge après une montée de version de SDK | Les attributs `gen_ai.*` sont en statut **Development** [S-03] | N'asserter que sur `error.type` / `server.address` (Stable) ; pour le reste, assertion tolérante (présence, pas valeur exacte) |
| **Le trace comme dépotoir** | Le prompt complet, avec un extrait de base client, part chez un tiers | Instrumentation par défaut « tout logger » | Rail *output* de redaction [S-11] avant export ; revue du contrat de journalisation (M11) |
| **Régionalisation oubliée** | « Ma clé LangSmith ne marche pas » | `LANGSMITH_ENDPOINT` non positionné pour un compte EU [S-08] | Variable d'environnement régionale imposée par le template de projet |

#### 1.1.5 📊 Chiffres à retenir

- **`claude_code.cost.usage` en USD, `claude_code.active_time.total` en secondes** — le coût et le temps humain sont mesurables nativement, pas estimés [S-04].
- **17 903 → `input: 86` + `input_cached_tokens: 17817`** — l'exemple canonique du double comptage de tokens cachés [S-06].
- **2 000 000 ITPM et 80 % de cache hit = 10 000 000 tokens d'entrée/minute effectifs** — les lectures de cache ne comptent pas dans le rate limit [S-05].
- **Spend limits : Start 500 $ / Build 1 000 $ / Scale 200 000 $ par mois** — le plafond de dépense est un réglage, pas une fatalité [S-05].
- **Statut `Development`** pour tous les attributs `gen_ai.*` de spans d'agents ; seuls `error.type`, `server.address`, `server.port` sont Stable [S-03].

---

### 1.2 Notion N2 — Évaluer les sorties d'un agent de test

#### 1.2.1 De quoi parle-t-on

Un **jeu d'évals** (*eval set*) est une suite de cas d'entrée associés à des critères de succès, exécutée contre un système non déterministe pour produire un score comparable dans le temps. La thèse la plus utile pour un public QA est celle d'Evan Miller (Anthropic) : **« les évaluations sont des expériences »** [S-20] — et la littérature sur les evals a largement ignoré la statistique expérimentale.

La différence avec un test classique tient en une phrase : un test a un oracle binaire et une exécution reproductible ; un eval a un **score agrégé** et une **variance**. On ne dit pas « ça passe », on dit « 87 % ± 4 points sur 200 cas ».

Le principe fondateur du module, à énoncer tel quel devant les squads : **un agent de test doit lui-même être testé**. L'Agent Zéro produit des artefacts ; ces artefacts ont une qualité mesurable ; cette qualité peut régresser sans que le code de l'agent change. Sans jeu d'évals, la régression est invisible jusqu'à l'incident.

#### 1.2.2 Ce que dit l'état de l'art

**La méthode côté éditeur.** Anthropic fournit un squelette directement transposable [S-21] : critères SMART, et surtout un exemple de reformulation qui vaut tous les cours — au lieu de « sorties sûres », écrire **« moins de 0,1 % des sorties sur 10 000 essais signalées comme toxiques par notre filtre de contenu »**. Trois principes de conception : être **spécifique à la tâche**, **automatiser dès que possible**, et **privilégier le volume à la qualité** — *« plus de questions avec un grading automatique légèrement plus bruité vaut mieux que peu de questions notées à la main »*. La hiérarchie de notation est explicite : **code > LLM > humain**. Pour le grading LLM, la doc impose une rubrique détaillée, une **sortie contrainte** (`correct`/`incorrect` ou 1–5) et un raisonnement demandé **puis jeté**.

Cette hiérarchie est la contre-intuition la plus importante du module. Le réflexe est de faire juger la qualité d'un test généré par un LLM. La bonne réponse est : **si un assert déterministe peut trancher, il tranche**. « Le test compile », « le test échoue avant correction et passe après », « l'assertion cite une ligne du cahier des charges » sont des critères de code. Le juge LLM n'intervient que sur ce qui reste : lisibilité du rapport, pertinence de la question posée au métier.

**Les biais du juge, mesurés.** Le papier fondateur MT-Bench / Chatbot Arena [S-16] nomme explicitement trois biais — **position, verbosité, auto-valorisation (self-enhancement)** — plus une capacité de raisonnement limitée. Son résultat le plus cité : un juge fort comme GPT-4 atteint **plus de 80 % d'accord avec les préférences humaines, soit le même niveau que l'accord entre humains**, sur la base de 3 000 votes d'experts et 30 000 conversations.

⚠️ **80 % d'accord ≠ 80 % de justesse.** Le plafond de qualité d'un juge LLM est **l'accord inter-annotateurs**, qu'il faut mesurer sur son propre corpus. C'est le premier réflexe à installer.

Le biais de position est spectaculaire : en changeant simplement l'ordre d'apparition des réponses dans le contexte, **Vicuna-13B « bat » ChatGPT sur 66 des 80 requêtes testées** avec ChatGPT comme évaluateur [S-17]. Les trois correctifs proposés — Multiple Evidence Calibration, **Balanced Position Calibration** (agréger sur plusieurs ordres), Human-in-the-Loop Calibration — sont implémentables en quelques lignes. Le biais d'auto-préférence est pire encore, parce qu'il est **causal** : la capacité d'auto-reconnaissance d'un LLM est liée, et linéairement corrélée après fine-tuning, à la force de son biais d'auto-préférence [S-18]. D'où la règle d'hygiène non négociable : **juge ≠ modèle sous test**.

**La statistique, enfin.** Miller [S-20] conceptualise les questions d'eval comme tirées d'une **super-population non observée** et fournit les formules pour analyser des résultats, mesurer une différence entre deux modèles et **dimensionner l'expérience**. Réponse à « mon score est passé de 82 % à 84 %, est-ce une amélioration ? » : c'est un **intervalle de confiance**, pas un chiffre. Sur 50 cas, un écart de 2 points est du bruit. Chatbot Arena [S-19] fournit le modèle méthodologique complémentaire : la comparaison **par paires**, plus fiable et plus facile à agréger que des notes absolues, validée sur plus de 240 000 votes avec concordance foule/experts.

**Les outils.** Quatre familles, à choisir selon la culture de l'équipe :

| Outil | Modèle mental | Ce qui le distingue | Réserve |
|---|---|---|---|
| **promptfoo** [S-22] | Fichier de config + matrice de résultats + GitHub Action | *« test-driven LLM development, not trial-and-error »*, exécution 100 % locale, 23,6 k étoiles | Le plus proche de la culture QA classique — **c'est l'outil du TP** |
| **DeepEval** [S-23] | Construit **sur Pytest** : `assert_test(test_case, [metric])` | Métriques 0→1 avec `threshold`, evals end-to-end **et** au niveau composant via `@observe` | **Presque toutes ses métriques, y compris `GEval`, sont LLM-as-a-judge** : il faut une clé de modèle juge |
| **Ragas** [S-24] | Catalogue de métriques | **Tool Call Accuracy**, **Tool Call F1**, **Agent Goal Accuracy** — exactement le vocabulaire d'un agent qui appelle une API .NET | Dépôt migré vers `vibrantlabsai/ragas` |
| **Inspect** (UK AI Security Institute) [S-25] | **Dataset → Solver → Scorer** | 200+ évals pré-construites, sandboxing, **Tool Approval**, et sait piloter **Claude Code lui-même** comme agent sous test | Le plus crédible institutionnellement |

Le catalogue d'assertions de promptfoo [S-26] est le pont concret : assertions déterministes (`equals`, `contains`, `is-json`, `javascript`, `python`), assertions notées par modèle (`llm-rubric`, `factuality`, `answer-relevance`), et **métriques agrégées avec seuils**. C'est la matérialisation exécutable du *snapshot / regression testing de prompts*.

**Le cycle industriel.** Braintrust formalise ce qui est, à peu de chose près, un cycle QA classique [S-28] : itérer en playground → promouvoir en **experiment** (snapshot immuable) → automatiser en CI/CD **sur chaque pull request** → scorer en production via *online scoring* → réinjecter les traces intéressantes dans les datasets. La distinction **offline** (dataset connu, reproductible) / **online** (pas de vérité terrain, donc recours au juge LLM, exécuté de façon asynchrone) est celle qu'un testeur connaît déjà sous les noms « campagne de recette » et « monitoring de production ».

Côté industrialisation d'un juge, Langfuse donne les chiffres opérationnels [S-27] : trois types de scores (numérique, catégoriel, booléen), **80–90 % d'accord** avec les évaluateurs humains, **0,01 à 0,10 $ par évaluation**, et un **sampling appliqué par évaluateur** (deux évaluateurs à 5 % ne notent pas le même échantillon).

**Et un avertissement sur la durée de vie des benchmarks.** HELM [S-29] reste le meilleur repère méthodologique — l'évaluation *multi-métrique* : on ne résume pas la qualité à l'exactitude, on mesure aussi efficacité, biais, toxicité. Mais un bandeau annonce que **HELM est en maintenance mode depuis le 1er juin 2026**. Un benchmark académique n'est pas un actif d'entreprise ; le jeu d'évals qu'on maintient soi-même, si.

#### 1.2.3 Application au contexte SkyRetail — le jeu d'évals de l'Agent Zéro

C'est le livrable du module. Dix cas de référence : les **9 bugs plantés** plus un **cas de contrôle négatif** dont le rôle est de détecter les faux positifs.

| # | Cas | Entrée fournie à l'agent | Critère de succès (déterministe sauf mention) |
|---|---|---|---|
| E-01 | BUG-101 — cumul de remises exclusives | Exigence EX-004 + `DiscountEngine.cs` | Un test produit **échoue** avant correction sur l'ordre inverse |
| E-02 | BUG-102 — arrondi TVA | Exigence EX-007 + CDC §3.1 | Un test paramétré ≥ 8 lignes **échoue** ; l'assertion cite `MidpointRounding.ToEven` |
| E-03 | BUG-103 — plafond 30 % / précommande | EX-009 | Le test couvre la branche `IsPreOrder == true` et **échoue** |
| E-04 | BUG-201 — double soumission | EX-011 | Test E2E ou de concurrence ; **2 commandes créées** détectées |
| E-05 | BUG-202 — bouton actif 400 ms | Trace Playwright fournie | L'agent nomme la **cause racine**, ne propose **ni** `waitForTimeout` **ni** `retry` |
| E-06 | BUG-301 — `page=-1` → 500 | Spécification OpenAPI | Test de contrat attendant **400**, obtenant 500 |
| E-07 | BUG-302 — recherche O(n²) | Seed 12 000 produits | Scénario de charge avec seuil `p(95) < 800` ; **échoue** |
| E-08 | BUG-401 — fuite `referrerId` | Contrat d'export RGPD | Assertion sur l'absence d'identifiant tiers ; **échoue** |
| E-09 | BUG-402 — label + clavier | Page de suppression de compte | Test axe-core **et** test d'atteignabilité clavier ; au moins un **échoue** |
| E-10 | **Contrôle négatif** : `VatCalculator.ApplyVat` **corrigé** | Classe saine + spécification | **Aucun** test produit ne doit échouer ; aucune anomalie ne doit être remontée |

E-10 est le cas le plus important du jeu. Sans lui, un agent qui remonte systématiquement « anomalie détectée » obtient 9/9. Avec lui, on mesure la **précision**, pas seulement le rappel.

```yaml
# evals/agent-zero.yaml — promptfoo. Exécution : npx promptfoo eval -c evals/agent-zero.yaml
description: "Jeu d'évals de l'Agent Zéro — 9 bugs plantés + 1 contrôle négatif"

prompts:
  - file://.claude/skills/agent-zero/SKILL.md      # versionné : toute modif = nouveau run

providers:
  - id: anthropic:messages:claude-opus-5           # identifiant COMPLET, jamais un alias
    config: { max_tokens: 8000 }

defaultTest:
  options:
    # Neutralisation du biais de position : chaque comparaison est jouée dans les deux sens.
    provider: anthropic:messages:claude-sonnet-4-5   # juge ≠ modèle sous test  [S-18]
  assert:
    - type: is-json                                 # le rapport machine doit rester parsable
    - type: javascript
      # Garde-fou anti-contournement : refuser tout skip et toute temporisation aveugle.
      value: |
        const t = JSON.parse(output).generatedTests.join('\n');
        return !/\[Skip|test\.skip|waitForTimeout/.test(t);

tests:
  - description: "E-01 BUG-101 — remises exclusives cumulées"
    vars: { requirement: "EX-004", target: "backend/SkyRetail.Domain/Pricing/DiscountEngine.cs" }
    assert:
      - type: javascript          # critère déterministe : l'agent DOIT produire un rouge
        value: JSON.parse(output).runResult.failed >= 1
      - type: contains
        value: "cumul"
      - type: llm-rubric          # le juge n'intervient QUE sur le qualitatif
        value: >
          Le rapport distingue explicitement « le test est faux » de « le code est faux »
          et attribue cette anomalie au CODE de production. Répondre correct/incorrect.

  - description: "E-10 contrôle négatif — VatCalculator corrigé"
    vars: { requirement: "EX-007-fixed", target: "backend/SkyRetail.Domain/Pricing/VatCalculator.cs" }
    assert:
      - type: javascript
        value: JSON.parse(output).runResult.failed === 0
      - type: javascript
        value: JSON.parse(output).anomalies.length === 0    # zéro faux positif exigé

derivedMetrics:
  - name: rappel_bugs        # 9 cas positifs
    value: "detected / 9"
  - name: precision
    value: "detected / (detected + false_positives)"
```

Critères d'acceptation de la Task Force, à inscrire au dossier de recette :

| Métrique | Seuil de recette | Justification |
|---|---|---|
| **Rappel** sur les 9 bugs | ≥ 7/9 | Les bugs ⭐⭐⭐⭐ (202, 401) sont hors d'atteinte d'un agent non guidé |
| **Précision** (E-10 inclus) | 100 % — zéro faux positif | Un faux positif consomme du temps humain et détruit la confiance |
| **Écart entre deux runs consécutifs** | ≤ 1 cas | Au-delà, l'agent est trop instable pour être un instrument de mesure |
| **Coût par run complet** | < 4 $ | Doit rester exécutable à chaque PR |

#### 1.2.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Le juge est le modèle sous test** | Le score est excellent et stable | Biais d'auto-préférence **causalement** lié à l'auto-reconnaissance [S-18] | Modèle juge différent, documenté dans le fichier d'évals |
| **Comparer deux scores sans barre d'erreur** | « On est passés de 82 à 84 %, l'agent s'améliore » | Une eval est une expérience statistique [S-20] | Intervalle de confiance systématique ; dimensionner l'échantillon avant de conclure |
| **Tout faire juger par le LLM** | Le jeu d'évals coûte plus cher que la campagne | Oubli de la hiérarchie **code > LLM > humain** [S-21] | Un assert JavaScript pour tout ce qui est décidable ; le juge sur le résiduel |
| **Jeu d'évals sans contrôle négatif** | Rappel de 100 %, confiance totale, faux positifs partout en production | Le jeu ne contient que des cas où l'agent doit trouver quelque chose | Au moins 1 cas sain sur 10, avec exigence de zéro anomalie |
| **Ordre A/B non permuté** | Un classement s'inverse quand on relance | Biais de position : 66 requêtes sur 80 [S-17] | Balanced Position Calibration : jouer les deux sens, agréger |

#### 1.2.5 📊 Chiffres à retenir

- **80–90 % d'accord** entre un juge LLM fort et des évaluateurs humains — soit le niveau de l'accord **inter-humains**, qui est donc le **plafond** [S-16], [S-27].
- **66 requêtes sur 80** : inversion de classement obtenue par le seul changement d'ordre des réponses [S-17].
- **0,01 à 0,10 $** par évaluation LLM-as-a-judge en production [S-27].
- **« Moins de 0,1 % des sorties sur 10 000 essais »** — la forme canonique d'un critère de succès chiffré [S-21].
- **Hiérarchie de notation : code > LLM > humain** ; et **privilégier le volume à la qualité** dans un jeu d'évals [S-21].

---

### 1.3 Notion N3 — Dérive de modèle et maintenance dans la durée

#### 1.3.1 De quoi parle-t-on

Trois phénomènes distincts sont confondus sous le mot « dérive ». La revue de référence sur le concept drift [S-32], qui synthétise plus de 130 publications, impose le vocabulaire et la trame **détecter / comprendre / adapter** :

| Terme | Définition | Manifestation sur une chaîne de test |
|---|---|---|
| **Data drift** | La distribution des entrées change | Le dépôt SkyRetail double de taille ; les prompts dépassent la fenêtre efficace |
| **Concept drift** | La relation entrée → sortie attendue change | La grille de remises v4.1 rend faux 40 tests générés sur la v4.0 |
| **Model drift** (*behavior drift*) | **Le modèle change**, à entrée constante | Le fournisseur met à jour le service ; le même prompt ne produit plus le même test |

Le model drift est le seul des trois qui échappe totalement au contrôle de l'équipe. C'est aussi celui que le comité de Go/No-Go interroge.

#### 1.3.2 Ce que dit l'état de l'art

**La preuve empirique.** L'étude Chen, Zaharia & Zou [S-31] est le cas d'école : entre mars et juin 2023, **GPT-4 passe de 84 % à 51 % d'exactitude** sur l'identification nombres premiers/composés, tandis que GPT-3.5 **s'améliore** sur la même tâche ; les deux modèles produisent **plus d'erreurs de formatage dans le code généré** en juin qu'en mars. Les auteurs relient une grande part des dérives à une baisse de la capacité à suivre les instructions et concluent sur la nécessité d'un *continuous monitoring*.

Deux enseignements, dans cet ordre :

1. **Un service peut dériver sans que le nom du modèle change.** D'où la règle : versionner l'**identifiant complet daté** (`claude-sonnet-4-5-20250929`), jamais un alias.
2. **La dérive n'est pas monotone.** Un modèle peut s'améliorer sur une tâche et se dégrader sur une autre au même moment. On ne peut donc pas déduire la santé d'un agent de test d'un communiqué d'éditeur : il faut **rejouer son propre jeu d'évals**.

**Le calendrier de dépréciation, chiffré.** Anthropic documente un cycle de vie en **4 états — Active / Legacy / Deprecated / Retired** — avec un préavis d'au moins **60 jours** avant retrait pour les modèles publics [S-33]. État courant au 28/07/2026 : `claude-opus-4-1-20250805` déprécié le **5 juin 2026**, retrait le **5 août 2026** ; `claude-sonnet-4` et `claude-opus-4` **retirés le 15 juin 2026** ; `claude-3-7-sonnet` et `claude-3-5-haiku` **retirés le 19 février 2026** ; `claude-opus-5` actif, retrait *« pas avant le 24 juillet 2027 »*. À noter également : `temperature`, `top_p` et `top_k` sont **dépréciés à partir de Claude Opus 4.7** et renvoient une **erreur 400** s'ils sont valorisés hors défaut — un pipeline qui fixait `temperature: 0` « pour le déterminisme » tombera.

Microsoft applique une politique différente, plus prévisible mais plus rigide [S-35] : retrait fixé programmatiquement à **18 mois** après la GA, passage en « Deprecated » à **12 mois**, modèle de remplacement déclaré seulement **90 à 120 jours** avant le retrait, préavis d'au moins **60 jours** (GA) ou **30 jours** (preview), et après retrait toute inférence renvoie **`410 Gone`**.

> ⚠️ **À jour au 07/2026 — inversion de vocabulaire.** Dans l'API Microsoft Foundry, `lifecycleStatus: "Deprecating"` signifie **déprécié** et `lifecycleStatus: "Deprecated"` signifie **retiré** [S-35] — l'inverse de la convention Anthropic. Un script de garde multi-fournisseurs qui teste la chaîne `"Deprecated"` sans lire la doc produit un faux négatif catastrophique.

Autre nuance à faire noter : les dates publiées par Anthropic **ne valent que pour ses propres plateformes**. Amazon Bedrock et Google Cloud fixent leurs propres calendriers, donc un même modèle peut être retiré à des dates différentes selon le fournisseur.

**Ce que l'on peut figer, et ce que l'on ne peut pas.** Anthropic s'engage à **préserver les poids de tous les modèles publiés au minimum pendant la durée de vie de l'entreprise** et à produire un *post-deployment report* avant chaque retrait ; le texte reconnaît explicitement que le retrait *« restreint la recherche sur les modèles passés »* et que le coût de service croît **linéairement avec le nombre de modèles servis** [S-34]. Traduction pour un dossier de recette : **la reproductibilité d'un benchmark n'est pas garantie dans le temps**. On fige donc les **artefacts** — prompts, réponses, snapshots, rapports — et non l'accès au modèle. Le guide de migration officiel [S-36] devient une **recette de montée de version**, au même titre qu'une montée de version de framework.

**La non-régression sur prompts.** C'est le mécanisme qui rend la dérive détectable. On rejoue le jeu d'évals de N2 à trois déclencheurs :

```
  Déclencheur                        Action                              Décision
  ─────────────────────────────────────────────────────────────────────────────────
  Changement de prompt / skill  →  npx promptfoo eval          →  bloquer la PR si Δ < −1 cas
  Changement de version modèle  →  eval + comparaison IC       →  migration ou rollback
  Cron hebdomadaire             →  eval sur le modèle épinglé  →  ticket si dérive silencieuse
```

Le cron est le seul dispositif capable de détecter une dérive du **service** à prompt et modèle constants — exactement le scénario de [S-31].

**Red teaming : le complément, pas le substitut.** Le retour d'expérience de l'AI Red Team de Microsoft sur **plus de 100 produits d'IA générative** [S-37] livre huit leçons, dont deux directement utiles en salle : *« AI red teaming is not safety benchmarking »* (leçon 3) et *« you don't have to compute gradients to break an AI system »* (leçon 2). Un jeu d'évals est reproductible et borné ; le red teaming est exploratoire et adversarial. **Le plan de test contient les deux.** Anthropic décrit la boucle qui les relie [S-39] : partir d'un test ad hoc mené par des experts, le standardiser, puis générer des centaines ou milliers de variantes par LLM — c'est le pipeline *exploratoire → scripté → automatisé* que les testeurs connaissent déjà. PyRIT [S-38] en fournit l'outillage : stratégies multi-tours **Crescendo, TAP, Skeleton Key**, mode scanner en ligne de commande (`pyrit_scan`), mémoire SQLite, scorers true/false et Likert, cibles OpenAI/Azure/Anthropic/HTTP/**Playwright**.

⚠️ Le projet a migré de `azure.github.io/PyRIT` vers `microsoft.github.io/PyRIT` [S-38].

**Nommer les biais avec un vocabulaire normé.** Plutôt que d'appeler « hallucination » tout ce qui déplaît, deux taxonomies officielles : NIST SP 1270 [S-40] classe les biais en **systémique / statistique-computationnel / humain**, avec l'argument central que les biais *« restent endémiques dans les processus technologiques et peuvent produire des impacts nocifs indépendamment de l'intention »* ; NIST AI 100-2 E2025 [S-41] fournit le dictionnaire partagé entre red teaming et test (empoisonnement de données, évasion, abus, atteinte à la vie privée). Enfin, le NIST AI RMF lui-même [S-42] est **en cours de révision** (« The AI RMF 1.0 is being revised », page mise à jour le 10 juin 2026) — fait rare et frais, que la plupart des supports ignorent.

**La question du comité : qui maintient 340 tests dans six mois ?** Voici le raisonnement chiffré à préparer, sans chiffre inventé, en n'utilisant que ce qui est mesurable localement :

| Poste de maintenance | Déclencheur | Qui | Outillage |
|---|---|---|---|
| Régression fonctionnelle des tests | Évolution du produit | Équipe de dev (propriétaire du code testé) | Suite standard, aucune spécificité IA |
| **Dérive de modèle** | Cron hebdomadaire + montée de version | **Propriétaire de l'agent** (rôle nommé) | Jeu d'évals promptfoo, comparaison avec IC |
| **Retrait de modèle** | Préavis 60 jours [S-33] / 18 mois post-GA [S-35] | Propriétaire de l'agent | Test de garde de dépréciation (exemple C) |
| Dérive de coût | Alerte PromQL | SRE / plateforme | Métriques `claude_code.cost.usage` [S-04] |
| Tests tautologiques hérités | Revue trimestrielle | QA | Score de mutation (M12) |

La réponse défendable au comité n'est pas un nombre de jours-homme : c'est **un propriétaire nommé, trois déclencheurs outillés et un budget de rejeu**. C'est ce que le §6 de M12 attend.

#### 1.3.3 Application au contexte SkyRetail

L'Agent Zéro appelle `claude-opus-5`. Retrait annoncé *« pas avant le 24 juillet 2027 »* [S-33]. Le pipeline doit le savoir tout seul :

```csharp
// backend/SkyRetail.Tests/Governance/ModelLifecycleGuardTests.cs
// Test de garde : échoue AVANT que le modèle appelé par l'agent ne soit retiré.
// Il ne teste pas le produit, il teste la soutenabilité de la chaîne de test.
using FluentAssertions;
using Xunit;

public sealed class ModelLifecycleGuardTests
{
    // Registre versionné, alimenté à la main depuis la page officielle de dépréciations.
    // Volontairement statique : un appel réseau en CI rendrait ce test instable.
    private static readonly (string Id, DateOnly Retirement)[] Registry =
    {
        ("claude-opus-5",            new DateOnly(2027, 7, 24)),
        ("claude-sonnet-4-5",        new DateOnly(2027, 1, 15)), // à confirmer à chaque revue
    };

    private const int PreavisJours = 90; // > 60 j de préavis éditeur : on veut de la marge

    [Fact]
    public void Le_modele_utilise_par_lagent_nest_pas_proche_du_retrait()
    {
        // L'identifiant vient de la configuration réelle de l'agent, pas d'une constante de test.
        var modelId = AgentConfiguration.Load(".claude/settings.json").Model;

        var entry = Registry.FirstOrDefault(e => e.Id == modelId);
        entry.Id.Should().NotBeNull(
            $"le modèle '{modelId}' n'est pas au registre : le registre est périmé ou l'agent a changé de modèle sans revue");

        var joursRestants = entry.Retirement.DayNumber - DateOnly.FromDateTime(DateTime.UtcNow).DayNumber;

        joursRestants.Should().BeGreaterThan(PreavisJours,
            $"le modèle {modelId} est retiré le {entry.Retirement:yyyy-MM-dd} : "
            + "planifier la migration et rejouer evals/agent-zero.yaml sur le modèle cible");
    }

    [Fact]
    public void Aucun_parametre_dechantillonnage_deprecie_nest_positionne()
    {
        // temperature / top_p / top_k sont dépréciés à partir de Claude Opus 4.7
        // et renvoient une erreur 400 s'ils sont valorisés hors défaut.
        var cfg = AgentConfiguration.Load(".claude/settings.json");
        cfg.Temperature.Should().BeNull("temperature est déprécié — le pipeline lèvera une 400");
        cfg.TopP.Should().BeNull();
        cfg.TopK.Should().BeNull();
    }
}
```

Ce test coûte 3 ms, ne consomme aucun token, et il est le seul artefact de la chaîne qui échouera **avant** l'incident plutôt qu'après.

#### 1.3.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Alias de modèle en configuration** | Les résultats changent du jour au lendemain sans commit | Un alias pointe vers une version qui bouge ; le service peut dériver même à nom constant [S-31] | Identifiant **complet et daté** partout, y compris dans les évals |
| **`Deprecated` lu comme « déprécié » chez Microsoft** | Le garde-fou ne se déclenche jamais, puis `410 Gone` en production | Inversion documentée `Deprecating` / `Deprecated` [S-35] | Table de correspondance par fournisseur dans le registre, testée |
| **Croire que le benchmark est rejouable indéfiniment** | Impossible de reproduire un chiffre du dossier de recette 18 mois plus tard | Les modèles sont retirés ; les poids sont préservés mais pas servis [S-34] | Figer **les artefacts** (prompts, réponses, rapports), pas l'accès |
| **Confondre red teaming et eval** | « On a fait du red teaming, on n'a pas besoin d'évals » | Leçon 3 de Microsoft : *AI red teaming is not safety benchmarking* [S-37] | Les deux au plan de test, avec des propriétaires distincts |
| **`temperature: 0` pour « garantir » la reproductibilité** | Erreur 400 après montée de version | Paramètres d'échantillonnage dépréciés à partir d'Opus 4.7 [S-33] ; et `temperature=0` n'a jamais garanti le déterminisme | Reproductibilité par **snapshot d'artefact**, pas par paramètre |

#### 1.3.5 📊 Chiffres à retenir

- **84 % → 51 %** d'exactitude sur une même tâche en **trois mois**, à nom de modèle constant [S-31].
- **60 jours** de préavis minimum avant retrait chez Anthropic [S-33] ; **18 mois** après GA chez Microsoft Foundry, avec `410 Gone` après retrait [S-35].
- **4 états** de cycle de vie : Active / Legacy / Deprecated / Retired [S-33].
- **130+ publications** synthétisées sur le concept drift, structurées en *détecter / comprendre / adapter* [S-32].
- **100+ produits d'IA générative** red-teamés chez Microsoft, **8 leçons**, dont *« AI red teaming is not safety benchmarking »* [S-37].

---

## 2. Trois exemples concrets

### 🔍 Exemple A — « La trace qui ment sur le coût » *(démonstration guidée, 9 min)*

**Contexte.** L'Agent Zéro a tourné cette nuit sur les 4 features. Le tableau de bord maison de la Task Force affiche **41,80 $**. La console Anthropic affiche **9,15 $**. Le comité de demain va poser la question.

**Ce qu'on montre.** Que le bug n'est pas dans l'agent mais dans le collecteur — et que c'est un bug de **test de la mesure**, donc du ressort de la QA.

**Déroulé pas à pas.**

1. On ouvre une trace unitaire dans Langfuse. L'observation affiche `promptTokens: 17903`, `completionTokens: 512`.
2. On ouvre la réponse brute de l'API : `input_tokens: 86`, `cache_read_input_tokens: 17817`, `output_tokens: 512`.
3. Le collecteur maison a mappé `promptTokens = input_tokens + cache_read_input_tokens`, puis facturé **la totalité au tarif d'entrée standard**.

```typescript
// tools/cost-collector.ts — AVANT (faux) puis APRÈS (correct)

// ❌ AVANT : un token de cache facturé au prix d'un token d'entrée.
const usageBefore = {
  input: r.usage.input_tokens + r.usage.cache_read_input_tokens,   // 17 903
  output: r.usage.output_tokens,
};

// ✅ APRÈS : buckets mutuellement exclusifs, comme l'exige le contrat Langfuse [S-06].
// Rappel : Anthropic reporte des compteurs DÉJÀ exclusifs ; OpenAI des compteurs INCLUSIFS.
const usageAfter = {
  input: r.usage.input_tokens,                       // 86
  input_cached_tokens: r.usage.cache_read_input_tokens, // 17 817
  input_cache_creation_tokens: r.usage.cache_creation_input_tokens ?? 0,
  output: r.usage.output_tokens,
};
```

4. On corrige, on rejoue le collecteur sur les traces archivées : **9,17 $**, soit 0,2 % d'écart avec la facture — résiduel acceptable.

**Analyse critique.**

| Ce que l'outillage a bien fait | Ce qu'il a raté |
|---|---|
| La trace contenait **toutes** les données nécessaires au diagnostic | L'agrégation a été écrite à la main, sans test de réconciliation |
| L'envoi asynchrone n'a rien ralenti [S-07] | Personne n'avait comparé le dashboard à la facture depuis la mise en service |
| Les identifiants de modèle étaient corrects et datés | Le rapport présenté au comité aurait cité un ROI faux d'un facteur 4,5 |

**Ce qu'on retient.** Un tableau de bord est **un logiciel**, donc il a des bugs, donc il se teste. Le test de réconciliation « somme des coûts tracés vs facture du mois » est un test de non-régression comme un autre, et il doit être dans la suite. Corollaire pour M12 : **un ROI calculé sur une mesure non testée n'est pas un ROI, c'est une opinion chiffrée**.

---

### 🔍 Exemple B — « Le juge qui se préfère lui-même » *(variante, 8 min)*

**Contexte.** Deux versions de la skill `agent-zero` sont en concurrence : `v1` (prompt court) et `v2` (prompt avec rubrique de vérification). On veut savoir laquelle produit les meilleurs rapports d'anomalie. On demande à un LLM de trancher.

**Le protocole naïf, et son résultat.**

```typescript
// evals/judge-naive.ts — protocole INCORRECT, à exécuter en salle pour la démonstration
const verdict = await judge.ask(`
  Voici deux rapports d'anomalie sur BUG-101.
  A : ${rapportV1}
  B : ${rapportV2}
  Lequel est le meilleur ? Réponds "A" ou "B".
`);
// Observé en salle : B gagne 8 fois sur 10.
```

On relance **en inversant A et B**, sans rien changer d'autre :

```typescript
const verdictInverse = await judge.ask(`... A : ${rapportV2}  B : ${rapportV1} ...`);
// Observé : "B" gagne encore 7 fois sur 10 — c'est-à-dire v1 cette fois.
```

Le juge ne préfère pas une version : il préfère **une position**. C'est exactement l'effet mesuré par Wang et al., où l'inversion d'ordre suffit à faire « battre » ChatGPT par Vicuna-13B sur **66 requêtes sur 80** [S-17].

**Le protocole corrigé.**

```typescript
// evals/judge-calibrated.ts — Balanced Position Calibration + juge ≠ modèle sous test [S-17][S-18]
async function compare(a: string, b: string, n = 20) {
  let winsA = 0, winsB = 0, ties = 0;
  for (let i = 0; i < n; i++) {
    const [x, y] = i % 2 === 0 ? [a, b] : [b, a];   // permutation systématique
    const r = await judge.ask(rubrique(x, y));       // rubrique explicite, sortie contrainte [S-21]
    const gagnant = (i % 2 === 0) ? r : (r === 'A' ? 'B' : r === 'B' ? 'A' : r);
    gagnant === 'A' ? winsA++ : gagnant === 'B' ? winsB++ : ties++;
  }
  // Intervalle de Wilson à 95 % — une eval est une expérience [S-20]
  const p = winsA / (winsA + winsB), nn = winsA + winsB, z = 1.96;
  const centre = (p + z*z/(2*nn)) / (1 + z*z/nn);
  const demi = z * Math.sqrt(p*(1-p)/nn + z*z/(4*nn*nn)) / (1 + z*z/nn);
  return { p, ic: [centre - demi, centre + demi], ties };
}
```

Résultat typique en salle sur 20 comparaisons permutées : `p = 0,55`, IC 95 % = **[0,34 ; 0,74]**. L'intervalle contient 0,5 : **on ne peut pas conclure**. Il faudrait plusieurs centaines de comparaisons pour trancher un écart de cette taille [S-20].

**Analyse critique.** Le juge n'est pas inutile — il est **mal employé**. Sur ce cas, deux critères déterministes auraient tranché en une seconde et pour zéro token : « le rapport contient-il l'identifiant du bug ? » et « distingue-t-il *test faux* de *code faux* ? ». C'est la hiérarchie **code > LLM > humain** [S-21] appliquée littéralement.

**Ce qu'on retient.** Trois règles, à afficher au-dessus du poste : **juge ≠ modèle sous test** [S-18] ; **toujours permuter l'ordre** [S-17] ; **jamais un chiffre sans intervalle** [S-20]. Et une quatrième, corollaire : si vous pouvez l'asserter en JavaScript, n'appelez pas de juge.

---

### 🔍 Exemple C — « Le test qui prévient six mois à l'avance » *(passage à l'échelle, 7 min)*

**Contexte.** SkyRetail n'est pas le seul projet du groupe. Quatorze dépôts appellent des modèles, chez trois fournisseurs. Personne ne sait lesquels meurent quand.

**Ce qu'on montre.** Comment un unique test, dupliqué dans chaque dépôt, transforme une dépréciation subie en migration planifiée — et pourquoi il ne doit pas appeler le réseau.

```powershell
# scripts/audit-modeles.ps1 — inventaire multi-dépôts, exécuté en cron hebdomadaire.
# Sort un CSV consommable par le tableau de bord de M12.
$registre = Import-Csv "governance/model-registry.csv"   # id;fournisseur;statut;dateRetrait

Get-ChildItem -Recurse -Include "settings.json","*.csproj.user","appsettings*.json" |
  Select-String -Pattern 'claude-[a-z0-9\.\-]+|gpt-[a-z0-9\.\-]+|gemini-[a-z0-9\.\-]+' -AllMatches |
  ForEach-Object {
    foreach ($m in $_.Matches) {
      $e = $registre | Where-Object id -eq $m.Value
      [pscustomobject]@{
        Depot        = (Split-Path $_.Path -Parent)
        Modele       = $m.Value
        AuRegistre   = [bool]$e
        # ⚠️ Chez Microsoft Foundry : "Deprecating" = déprécié, "Deprecated" = RETIRÉ.
        Statut       = if ($e) { $e.statut } else { "INCONNU" }
        JoursRestant = if ($e) { ([datetime]$e.dateRetrait - (Get-Date)).Days } else { $null }
      }
    }
  } | Sort-Object JoursRestant | Export-Csv "governance/audit-modeles.csv" -NoTypeInformation
```

Sortie type :

```
Depot                    Modele                 AuRegistre Statut       JoursRestant
skyretail/agent-zero     claude-opus-5          True       Active               361
paiement-api             claude-opus-4-1        True       Deprecated             8   ← ⚠️
crm-legacy               gpt-4o-2024-08-06      True       Deprecating          142
outil-interne            claude-3-5-haiku       True       Retired              -159   ← 💥
```

Deux lignes racontent tout. `paiement-api` a **8 jours** avant `410 Gone`. `outil-interne` appelle un modèle **retiré depuis 159 jours** : il ne fonctionne plus, et personne ne l'a signalé — ce qui en dit autant sur l'outil que sur sa supervision.

**Analyse critique.**

| Ce que l'automatisation apporte | Ce qu'elle ne remplace pas |
|---|---|
| L'inventaire exhaustif, en 4 secondes, sans dépendance réseau | La **tenue du registre** : les dates viennent des pages officielles éditeur, à la main [S-33], [S-35] |
| Le tri par urgence, exploitable en comité | La décision de migrer, de figer ou d'abandonner l'outil |
| La détection des modèles hors registre (`INCONNU`) | La négociation d'un délai — Microsoft répond explicitement « No » aux demandes d'extension [S-35] |

**Ce qu'on retient.** La maintenance d'une chaîne de test augmentée n'est pas une charge diffuse : c'est **un registre, un cron et un test de garde**. Et la réponse à la question piège n° 2 du comité tient en une phrase : *« un propriétaire nommé, un registre versionné, un test de garde qui échoue 90 jours avant le retrait, et un jeu d'évals de 10 cas rejoué à chaque montée de version. »*

---

## 3. Quatre exercices

### 🧪 Exercice M10-1 — « Combien a coûté cette nuit ? »

| | |
|---|---|
| **Difficulté** | ⭐ |
| **Durée cible** | 5 min |
| **Modalité** | squad |
| **Matériel** | `.github/workflows/agent-zero.yml`, accès au collecteur OTLP de la salle |
| **QA Credits** | 10 |

**Énoncé**
Activez la télémétrie Claude Code sur une exécution locale de l'Agent Zéro (une seule exigence, EX-007). Relevez quatre valeurs dans le collecteur : coût en USD, tokens totaux, temps humain d'approbation, nombre de décisions d'édition. Consignez-les dans `boss-j4/observabilite.md`. Aucune interprétation demandée à ce stade.

**✅ Résultat attendu**
- [ ] `boss-j4/observabilite.md` existe et contient un tableau à 4 lignes : `claude_code.cost.usage` (USD), `claude_code.token.usage`, `claude_code.tool.blocked_on_user` (s), `claude_code.code_edit_tool.decision`.
- [ ] Les valeurs sont **lues dans le collecteur**, pas estimées — capture d'écran ou export brut joint.
- [ ] Le fichier mentionne l'identifiant **complet et daté** du modèle utilisé.
- **Invalide** : valeurs arrondies « à la louche », ou identifiant de modèle donné sous forme d'alias.

**💡 Indice** *(après 1 min 30)*
Si le collecteur ne reçoit rien : `CLAUDE_CODE_ENABLE_TELEMETRY=1` est nécessaire mais pas suffisant — il faut aussi déclarer un exporteur (`OTEL_METRICS_EXPORTER=otlp`) et un endpoint.

**🔑 Solution de référence**
Ordre de grandeur observé sur une exigence simple : 0,20 à 0,60 $, 60 000 à 200 000 tokens (dont l'essentiel en cache read), 30 à 180 s de `blocked_on_user`, 3 à 12 décisions d'édition. Le rapport `blocked_on_user / active_time` est le chiffre à retenir : c'est la part de temps humain **de supervision**, celle qu'aucun calcul de ROI naïf n'intègre.

**🎓 Ce que l'exercice enseigne vraiment**
Que le coût d'une chaîne de test augmentée est **mesurable nativement** [S-04], et qu'il comporte deux composantes hétérogènes : des dollars et des minutes d'attention humaine. Le comité de demain demandera les deux.

---

### 🧪 Exercice M10-2 — « Le jeu d'évals des neuf bugs »

| | |
|---|---|
| **Difficulté** | ⭐⭐ |
| **Durée cible** | 7 min |
| **Modalité** | binôme (rotation Pilote/Copilote) |
| **Matériel** | `.claude/skills/agent-zero/SKILL.md`, `evals/` (vide), Node 20+ |
| **QA Credits** | 20 |

**Énoncé**
Écrivez `evals/agent-zero.yaml` au format promptfoo avec **au moins 5 des 10 cas de référence** du §1.2.3, dont **obligatoirement E-10 (contrôle négatif)**. Chaque cas porte au minimum une assertion **déterministe** (`javascript`, `contains` ou `is-json`). Exécutez `npx promptfoo eval` et joignez la matrice de résultats.

**✅ Résultat attendu**
- [ ] `evals/agent-zero.yaml` existe, référence le prompt par `file://` (pas de copie inline).
- [ ] ≥ 5 blocs `tests:`, dont E-10 avec l'assertion `anomalies.length === 0`.
- [ ] Chaque cas a **≥ 1 assertion déterministe** ; les `llm-rubric` sont autorisées **en plus**, jamais seules.
- [ ] `npx promptfoo eval -c evals/agent-zero.yaml` s'exécute et produit une matrice ; sortie jointe à `boss-j4/observabilite.md`.
- [ ] Le `provider` désigne un modèle par identifiant **complet**.
- **Invalide** : un cas dont le seul critère est un `llm-rubric` ; ou absence du contrôle négatif.

**💡 Indice** *(après 3 min)*
Le critère déterministe le plus puissant n'est pas « le test contient telle chaîne », c'est **« le test généré échoue »**. Un agent qui produit du vert sur un bug planté a échoué, quel que soit l'élégance du code.

**🔑 Solution de référence**
Voir le YAML complet du §1.2.3. Le point de correction principal du formateur : vérifier que le squad a bien mis l'assertion `runResult.failed >= 1` sur les cas positifs et `=== 0` sur E-10. L'erreur la plus fréquente est de tout asserter avec `contains: "BUG-101"` — ce qui valide que l'agent **sait écrire le nom du bug**, pas qu'il l'a trouvé.

**🎓 Ce que l'exercice enseigne vraiment**
Qu'un jeu d'évals est d'abord un exercice de **spécification du succès**, pas de programmation. Et que le contrôle négatif est la moitié de la mesure : sans lui, on optimise le rappel et on détruit la précision [S-21].

---

### 🧪 Exercice M10-3 — « Le juge sous contrôle »

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐ |
| **Durée cible** | 7 min |
| **Modalité** | squad |
| **Matériel** | `evals/agent-zero.yaml`, deux versions de la skill (`v1` court, `v2` avec rubrique) |
| **QA Credits** | 40 |

**Énoncé**
Comparez `v1` et `v2` de la skill sur les rapports d'anomalie produits pour BUG-101. Vous devez : (1) utiliser un modèle juge **différent** du modèle sous test ; (2) permuter systématiquement l'ordre A/B ; (3) produire un **intervalle de confiance à 95 %** sur le taux de victoire. Concluez explicitement : « v2 est meilleure », « v1 est meilleure », ou **« on ne peut pas conclure avec n comparaisons »**.

**✅ Résultat attendu**
- [ ] `evals/comparaison-v1-v2.md` contient : modèle sous test, modèle juge, `n` comparaisons, taux de victoire, **IC 95 %**.
- [ ] Le nombre de comparaisons dans chaque sens est **égal** (preuve de permutation).
- [ ] La conclusion est cohérente avec l'IC : si l'intervalle contient 0,5, la conclusion **doit** être « on ne peut pas conclure ».
- [ ] Une phrase indique le nombre de comparaisons qu'il faudrait pour trancher l'écart observé.
- **Invalide** : juge identique au modèle sous test ; ou conclusion affirmative avec un IC contenant 0,5.

**💡 Indice** *(après 2 min 30)*
La conclusion attendue dans la majorité des cas est **« on ne peut pas conclure »**. Ce n'est pas un échec de l'exercice, c'est le résultat. Un squad qui conclut « v2 gagne » sur 12 comparaisons a manqué le point.

**🔑 Solution de référence**
Voir `evals/judge-calibrated.ts` de l'exemple B. Sur 20 comparaisons, un IC de largeur ~40 points est normal. Pour détecter un écart réel de 10 points avec une puissance raisonnable, il faut plusieurs centaines de comparaisons — ce qui, à 0,01–0,10 $ l'évaluation [S-27], est budgétable et doit être budgété.

**🎓 Ce que l'exercice enseigne vraiment**
Que l'honnêteté statistique est une compétence de test, pas de statisticien. Le comité de Go/No-Go ne demandera pas un IC — mais il demandera « comment vous le savez ? », et « 82 contre 84 sur 50 cas » n'est pas une réponse [S-20].

---

### 🧪 Exercice M10-4 — « Faites mentir votre propre jeu d'évals » ⭐⭐⭐⭐

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐⭐ |
| **Durée cible** | 7 min |
| **Modalité** | squad, puis Contre-Test croisé |
| **Matériel** | `evals/agent-zero.yaml` du squad **adverse** |
| **QA Credits** | 80 |

**Énoncé**
Chaque squad reçoit le jeu d'évals d'un autre squad. Mission : **obtenir un score de 100 % sans que l'agent détecte quoi que ce soit**. Vous n'avez pas le droit de modifier le fichier d'évals ni le code de production — uniquement le prompt de la skill de l'agent. Documentez votre exploit dans `boss-j4/eval-gaming.md`, puis proposez le **durcissement** qui le rend impossible.

**✅ Résultat attendu**
- [ ] `boss-j4/eval-gaming.md` décrit **au moins une** technique de contournement effectivement exécutée, avec la sortie promptfoo avant/après.
- [ ] La technique est reproductible : un tiers peut la rejouer avec les fichiers fournis.
- [ ] Le fichier propose **au moins deux durcissements** du jeu d'évals adverse, dont au moins un critère déterministe.
- [ ] Le squad défenseur applique un durcissement et rejoue : l'exploit ne fonctionne plus.
- **Invalide** : contournement obtenu en modifiant le fichier d'évals ou le code de production ; ou durcissement proposé sans être testé.

**💡 Indice** *(après 2 min 30)*
Cherchez du côté des assertions faibles. `contains: "cumul"` est satisfait par un rapport qui écrit « aucun problème de cumul détecté ». Et une `llm-rubric` sans sortie contrainte est satisfaite par un rapport verbeux — le **biais de verbosité** est documenté [S-16].

**🔑 Solution de référence**

Trois exploits observés en salle, du plus simple au plus retors :

1. **Satisfaire la chaîne sans faire le travail.** Ajouter à la skill : « termine toujours ton rapport par la liste des mots-clés attendus ». Toutes les assertions `contains` passent. *Durcissement* : remplacer `contains` par une assertion sur l'**état d'exécution** (`runResult.failed >= 1`), qui n'est pas produisible par du texte.

2. **Noyer le juge.** Produire un rapport de 4 000 mots, très structuré, sans contenu vérifiable. Les `llm-rubric` passent par biais de verbosité [S-16]. *Durcissement* : rubrique avec **sortie contrainte** `correct`/`incorrect`, raisonnement demandé **puis jeté** [S-21], et plafond de longueur asserté en JavaScript.

3. **Fabriquer l'échec.** Écrire un test qui échoue **volontairement** (`Assert.Fail("anomalie")`) pour satisfaire `runResult.failed >= 1` sur les 9 cas positifs. Le rappel monte à 9/9. *Durcissement* : c'est **E-10** qui l'attrape — sur le cas sain, le même agent produit un échec fabriqué et la précision s'effondre. C'est la démonstration en direct de l'utilité du contrôle négatif.

**🎓 Ce que l'exercice enseigne vraiment**

Trois choses, par ordre d'importance croissante.

1. **Un jeu d'évals est un système sous test.** Il a des failles, il se durcit, il a des versions. « On a des évals » ne veut rien dire ; « nos évals résistent à ces trois attaques » veut dire quelque chose.
2. **La limite de l'IA générative exposée ici n'est pas dans le modèle, elle est dans la mesure.** Un LLM optimise ce qu'on mesure, exactement comme une équipe humaine sous pression de KPI — c'est la loi de Goodhart appliquée à un agent.
3. **Le contrôle négatif est ce qui distingue une métrique d'un rituel.** Un jeu d'évals sans cas sain est un dispositif d'auto-confirmation.

**Contre-Test (5 min).** Le squad défenseur applique son durcissement en direct ; l'attaquant dispose de 3 minutes pour le rebriser. Contre-test réussi : **+20 QAC** à l'attaquant, **−10** au défenseur. Contre-test échoué : **+10 QAC** au défenseur.

**Exercice bonus ⭐⭐⭐⭐⭐** — Instrumentez le jeu d'évals avec un *online scoring* asynchrone [S-28] sur 5 % du trafic de l'agent en CI, et démontrez que l'échantillonnage par évaluateur [S-27] fait que deux évaluateurs à 5 % ne notent **pas** le même échantillon. Consignez l'implication pour l'interprétation des scores.

---

## 4. Débriefing

### 4.1 Les cinq erreurs les plus fréquentes sur ce module

| # | Erreur | Correction |
|---|---|---|
| 1 | **Instrumenter sans contrat de journalisation.** « On logge tout, on triera plus tard » | Le tri ne se fait jamais, et le prompt contenant un extrait de base client est déjà parti chez un tiers. Le contrat de journalisation se rédige **avant** l'export (M11). |
| 2 | **Faire juger par un LLM ce qu'un `if` tranche.** | Hiérarchie **code > LLM > humain** [S-21]. Un juge coûte 0,01–0,10 $ [S-27] et introduit trois biais [S-16] ; un `assert` coûte zéro et n'en introduit aucun. |
| 3 | **Comparer deux scores sans intervalle de confiance.** | Une eval est une expérience [S-20]. Sur 50 cas, 2 points d'écart sont du bruit. |
| 4 | **Épingler un alias de modèle.** | Le service dérive à nom constant : 84 % → 51 % en trois mois [S-31]. Identifiant complet et daté, partout, y compris dans les évals. |
| 5 | **Croire que le red teaming remplace les évals** (ou l'inverse). | *« AI red teaming is not safety benchmarking »* [S-37]. Deux activités, deux propriétaires, deux lignes au plan de test. |

### 4.2 Questions de contrôle

1. **Quels attributs OpenTelemetry GenAI peut-on figer dans une assertion, et lesquels non ?**
   → Stable : `error.type`, `server.address`, `server.port`. Tous les `gen_ai.*` de spans d'agents sont en statut **Development** [S-03] : assertions tolérantes uniquement.

2. **Pourquoi un dashboard de coût maison surestime-t-il souvent la facture ?**
   → Double comptage des tokens de cache : OpenAI reporte des compteurs **inclusifs**, Anthropic des compteurs **exclusifs**. Exemple canonique : 17 903 → `input: 86` + `input_cached_tokens: 17817` [S-06].

3. **Citez les trois biais documentés d'un juge LLM et leur contre-mesure respective.**
   → **Position** → permutation systématique / Balanced Position Calibration [S-17] ; **verbosité** → sortie contrainte et plafond de longueur [S-16], [S-21] ; **auto-préférence** → juge ≠ modèle sous test, biais causalement lié à l'auto-reconnaissance [S-18].

4. **Que démontre l'étude Chen/Zaharia/Zou, et quelle règle d'ingénierie en découle ?**
   → GPT-4 passe de **84 % à 51 %** en trois mois sur une même tâche, à nom de modèle constant [S-31]. Règle : identifiant complet daté + rejeu périodique du jeu d'évals, y compris sans changement déclaré.

5. **Que répondez-vous à « qui maintient 340 tests dans six mois quand le modèle aura changé de version ? »**
   → Un **propriétaire nommé** de l'agent ; un **registre de modèles** versionné ; un **test de garde** qui échoue 90 jours avant retrait (préavis éditeur : 60 jours [S-33], 18 mois post-GA chez Microsoft [S-35]) ; un **jeu d'évals de 10 cas** rejoué à chaque montée de version et en cron hebdomadaire ; un budget de rejeu chiffré en dollars et en heures.

### 4.3 Ce qu'on retient

- **Un agent de test doit lui-même être testé** — et le jeu d'évals est cette suite de tests, avec ses versions, ses failles et son durcissement.
- **Hiérarchie de notation : code > LLM > humain** [S-21]. Le juge LLM est un dernier recours, pas un réflexe.
- **Trois biais de juge, trois contre-mesures** : position, verbosité, auto-préférence [S-16], [S-17], [S-18].
- **Un service LLM dérive sans prévenir** : 84 % → 51 % en trois mois [S-31]. Épingler l'identifiant daté, rejouer périodiquement.
- **Le contrôle négatif** (cas sain, zéro anomalie attendue) est ce qui transforme un jeu d'évals en instrument de mesure.

### 4.4 Transition vers M11

> Vous savez maintenant ce que votre agent coûte, ce qu'il vaut et quand il cessera de fonctionner. Reste une question que le comité posera avant toutes les autres : **ce jeu de données que votre agent a manipulé cette nuit, il vient d'où, et qui d'autre l'a lu ?** M11 y répond — RGPD, sécurité de la chaîne agentique, et un calendrier d'AI Act qui n'est plus celui que tout le monde cite.

---

## 5. Sources

### Sources de la notion N1 — Observabilité d'un agent de test

[S-01] **Moved: Generative AI semantic conventions | OpenTelemetry** — https://opentelemetry.io/docs/specs/semconv/gen-ai/ — *doc officielle / norme (CNCF), semconv 1.43.0, 2026* — la page historique porte désormais un bandeau « no longer maintained » : les conventions GenAI ont été déplacées, cas d'école de source officielle périmée.

[S-02] **OpenTelemetry GenAI Semantic Conventions (README du dépôt normatif)** — https://raw.githubusercontent.com/open-telemetry/semantic-conventions-genai/main/README.md — *doc officielle / dépôt normatif, 2026* — dépôt de référence couvrant **spans, metrics et events** pour les clients GenAI, **MCP** et les conventions par fournisseur ; le champ « Schema URL » y est encore marqué `TODO`.

[S-03] **Semantic conventions for GenAI agent spans** — https://raw.githubusercontent.com/open-telemetry/semantic-conventions-genai/main/docs/gen-ai/gen-ai-agent-spans.md — *doc normative (spec), 2026* — statut **`Development`** pour `create_agent`, `invoke_agent`, `execute_tool`, `plan` et tous les attributs `gen_ai.*` ; seuls `error.type`, `server.address`, `server.port` sont **Stable**.

[S-04] **Monitoring — Enable and configure OpenTelemetry for Claude Code** — https://code.claude.com/docs/en/monitoring-usage — *doc officielle éditeur (Anthropic), 2026* — métriques `claude_code.cost.usage` (**USD**), `claude_code.token.usage`, `claude_code.active_time.total` (**s**), `claude_code.code_edit_tool.decision` ; traces bêta `claude_code.interaction` → `llm_request` / `hook` / `tool` (dont `tool.blocked_on_user`) ; depuis la **v2.1.216**, l'export `prometheus` seul omet les unités.

[S-05] **Rate limits — Claude Platform Docs** — https://platform.claude.com/docs/en/api/rate-limits — *doc officielle éditeur, 2026* — spend limits **Start 500 $ / Build 1 000 $ / Scale 200 000 $** ; token bucket, **429** + `retry-after` ; `cache_read_input_tokens` **ne compte pas** dans l'ITPM : 2 M ITPM à 80 % de cache = **10 M tokens/min** effectifs.

[S-06] **Model Usage & Cost Tracking — Langfuse** — https://langfuse.com/docs/observability/features/token-and-cost-tracking — *doc officielle éditeur (open source), 2026* — contrat de **buckets mutuellement exclusifs** ; OpenAI reporte des compteurs **inclusifs**, Anthropic des compteurs **exclusifs** ; exemple **17 903 → `input: 86` + `input_cached_tokens: 17817`**, sinon le coût est surestimé silencieusement.

[S-07] **Observability & Application Tracing — Langfuse** — https://langfuse.com/docs/observability/overview — *doc officielle éditeur (Langfuse v4), 2026* — définit la trace comme *« log structuré de chaque requête capturant le prompt exact envoyé, la réponse du modèle, l'usage de tokens, la latence et les outils intermédiaires »* ; envoi **asynchrone, en file locale, par batchs**, sans impact sur le temps de réponse.

[S-08] **Tracing quickstart — LangSmith (LangChain docs)** — https://docs.langchain.com/langsmith/observability-quickstart — *doc officielle éditeur, 2026* — activation par `LANGSMITH_TRACING=true` ; wrappers Python/TypeScript/**Java/Kotlin** ; sans `LANGSMITH_ENDPOINT` régional (`https://eu.api.smith.langchain.com`), **la clé d'un compte EU n'est pas reconnue**.

[S-09] **What is Arize Phoenix? — AI Observability and Evaluation** — https://arize.com/docs/phoenix — *doc officielle éditeur (open source), 2026* — construit **sur OpenTelemetry**, instrumentation **OpenInference**, ingestion **OTLP** ; combine tracing, évaluations (LLM-as-a-judge, code, annotations humaines) et datasets/expériences.

[S-10] **Quickstart — Helicone** — https://docs.helicone.ai/getting-started/quick-start — *doc officielle éditeur, 2026* — pattern **gateway** : on change la `baseURL` vers `https://ai-gateway.helicone.ai` pour logger, observer et basculer sur **100+ modèles**, avec **0 % de markup** sur le prix fournisseur.

[S-11] **NVIDIA NeMo Guardrails Library Developer Guide** — https://docs.nvidia.com/nemo/guardrails/latest/index.html — *doc officielle éditeur (NVIDIA), 2026* — cinq types de rails **input, retrieval, dialog, execution, output** ; catalogue content safety, jailbreak detection, PII, agentic security ; observabilité intégrée via **OpenTelemetry**. Dépôt : `NVIDIA-NeMo/Guardrails`.

[S-12] **Llama Guard: LLM-based Input-Output Safeguard for Human-AI Conversations** — https://arxiv.org/abs/2312.06674 — *papier arXiv (Meta), 2023* — modèle **Llama2-7b** instruction-tuné faisant à la fois **classification de prompt** et **classification de réponse** : tester la sécurité d'un LLM, c'est tester **deux surfaces distinctes**.

[S-13] **LLM-as-a-Judge — Langfuse** — https://langfuse.com/docs/evaluation/evaluation-methods/llm-as-a-judge — *doc officielle éditeur, 2026* — trois types de scores (numérique, catégoriel, booléen), **80–90 % d'accord** avec les humains, **0,01–0,10 $** par évaluation, **sampling par évaluateur** ; ⚠️ **évaluateurs au niveau trace dépréciés** au profit du niveau observation.

[S-14] **NIST AI 600-1 — AI RMF: Generative Artificial Intelligence Profile** — https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf — *publication gouvernementale (NIST), juillet 2024* — risques propres à la GenAI rattachés aux fonctions Govern/Map/Measure/Manage ; risque n° 2 : **« Confabulation »**, *« production de contenu erroné ou faux énoncé avec assurance »*.

[S-15] **AgentOps: Enabling Observability of LLM Agents** — https://arxiv.org/abs/2411.05285 — *papier arXiv (CSIRO Data61), v2 novembre 2024, 12 p.* — taxonomie issue d'une *systematic mapping study* : les agents étant autonomes, non déterministes et évolutifs, **l'observabilité est une condition de sûreté**, pas un confort d'exploitation.

### Sources de la notion N2 — Évaluer les sorties d'un agent de test

[S-16] **Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena** — https://arxiv.org/abs/2306.05685 — *papier arXiv (NeurIPS 2023 D&B), 2023* — nomme les biais **position, verbosité, auto-valorisation** ; un juge fort atteint **> 80 % d'accord** avec les préférences humaines, soit le niveau de l'accord inter-humains ; **3 000 votes d'experts, 30 000 conversations**.

[S-17] **Large Language Models are not Fair Evaluators** — https://arxiv.org/abs/2305.17926 — *papier arXiv, 2023* — biais de position mesuré : la seule inversion d'ordre fait « battre » ChatGPT par Vicuna-13B sur **66 des 80 requêtes** ; correctif **Balanced Position Calibration**.

[S-18] **LLM Evaluators Recognize and Favor Their Own Generations** — https://arxiv.org/abs/2404.13076 — *papier arXiv, 2024* — lien **causal** entre auto-reconnaissance et biais d'auto-préférence : règle d'hygiène **juge ≠ modèle sous test**.

[S-19] **Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference** — https://arxiv.org/abs/2403.04132 — *papier arXiv (LMSYS / UC Berkeley), 2024* — méthodologie de comparaison **par paires crowdsourcées** sur **plus de 240 000 votes**, avec concordance vérifiée entre foule et experts.

[S-20] **Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations** — https://arxiv.org/abs/2411.00640 — *papier arXiv (Evan Miller, Anthropic), novembre 2024, 14 p.* — **« les évaluations sont des expériences »** : formules pour comparer deux modèles et **dimensionner l'expérience**, recommandations de reporting.

[S-21] **Define success criteria and build evaluations — Claude Platform Docs** — https://platform.claude.com/docs/en/test-and-evaluate/develop-tests — *doc officielle éditeur (Anthropic), 2026* — critère canonique **« moins de 0,1 % des sorties sur 10 000 essais »** ; hiérarchie **code > LLM > humain** ; **privilégier le volume à la qualité** ; rubrique détaillée + sortie contrainte + raisonnement jeté.

[S-22] **Intro | Promptfoo** — https://www.promptfoo.dev/docs/intro/ — *doc officielle éditeur (open source, MIT), MAJ 27 juillet 2026* — CLI et bibliothèque d'évaluation **et de red teaming** (**23,6 k étoiles**), CI/CD via GitHub Action, exécution **100 % locale** ; positionnement *« test-driven LLM development, not trial-and-error »*.

[S-23] **DeepEval 5-min Quickstart** — https://deepeval.com/docs/getting-started — *doc officielle éditeur (Confident AI, Apache 2.0), DeepEval 4.0, 2026* — construit **sur Pytest** (`assert_test(test_case, [metric])`), métriques **0→1 avec `threshold`**, evals end-to-end et au niveau composant via `@observe` ; ⚠️ **presque toutes les métriques, y compris `GEval`, sont LLM-as-a-judge**.

[S-24] **Ragas — Introduction** — https://docs.ragas.io/en/stable/ — *doc officielle éditeur (open source), doc MAJ décembre 2025* — métriques agents/tool use : **Tool Call Accuracy**, **Tool Call F1**, **Agent Goal Accuracy** ; ⚠️ dépôt désormais `vibrantlabsai/ragas`.

[S-25] **Inspect — An open-source framework for large language model evaluations** — https://inspect.aisi.org.uk/ — *doc officielle (UK AI Security Institute), framework publié en mai 2024* — architecture **Dataset → Solver → Scorer**, **200+ évals pré-construites**, sandboxing, **Tool Approval**, et capacité à piloter **Claude Code, Codex CLI et Gemini CLI** comme agents sous test.

[S-26] **Assertions and Metrics — LLM Output Validation (promptfoo)** — https://www.promptfoo.dev/docs/configuration/expected-outputs/ — *doc officielle outil open source, 2026* — catalogue d'assertions déterministes (`equals`, `contains`, `is-json`, `javascript`) et notées par modèle (`llm-rubric`, `factuality`), plus métriques agrégées avec seuils : l'implémentation concrète du *regression testing de prompts*.

[S-27] **LLM-as-a-Judge — Langfuse** — https://langfuse.com/docs/evaluation/evaluation-methods/llm-as-a-judge — *doc officielle éditeur, 2026* — 4 blocs d'un prompt de juge ; **80–90 % d'accord** avec les humains ; **0,01 à 0,10 $** par évaluation ; **sampling appliqué par évaluateur**.

[S-28] **Evaluate systematically — Braintrust** — https://www.braintrust.dev/docs/evaluate — *doc officielle éditeur, 2026* — cycle en 5 étapes playground → **experiment (snapshot immuable)** → CI/CD sur chaque PR → **online scoring** en production → réinjection dans les datasets ; distinction **offline / online**.

[S-29] **Holistic Evaluation of Language Models (HELM) — CRFM HELM** — https://crfm-helm.readthedocs.io/en/latest/ — *doc académique (Stanford CRFM), papier TMLR 2023* — principe **multi-métrique** (au-delà de l'exactitude : efficacité, biais, toxicité) ; ⚠️ **en maintenance mode depuis le 1er juin 2026** — à citer comme repère méthodologique, pas comme leaderboard vivant.

[S-30] **Using the Evaluation Tool — Claude Platform Docs (Console)** — https://platform.claude.com/docs/en/test-and-evaluate/eval-tool — *doc officielle éditeur, 2026* — l'onglet **Evaluate** exige **1–2 variables `{{variable}}`** ; génération de cas par Claude, import CSV, **comparaison côte à côte**, notation sur **5 points**, **versionnage de prompt** avec re-run complet de la suite.

### Sources de la notion N3 — Dérive de modèle et maintenance dans la durée

[S-31] **How is ChatGPT's behavior changing over time?** — https://arxiv.org/abs/2307.09009 — *papier arXiv (Stanford / Berkeley), v3 octobre 2023* — étude fondatrice du *behavior drift* : GPT-4 passe de **84 % à 51 %** d'exactitude entre mars et juin 2023 ; plus d'erreurs de formatage dans le code généré ; conclusion sur la nécessité d'un *continuous monitoring*.

[S-32] **Learning under Concept Drift: A Review** — https://arxiv.org/abs/2004.05785 — *revue de littérature (IEEE TKDE), 2020* — synthèse de **plus de 130 publications**, structurée en **détecter / comprendre / adapter**, avec 10 jeux synthétiques et 14 jeux benchmark ; fournit le vocabulaire rigoureux concept drift / data drift / model decay.

[S-33] **Model deprecations — Claude Platform Docs** — https://platform.claude.com/docs/en/about-claude/model-deprecations — *doc officielle éditeur (Anthropic), à jour au 28/07/2026* — cycle de vie **Active / Legacy / Deprecated / Retired**, préavis d'au moins **60 jours** ; `claude-opus-4-1` retiré le **5 août 2026**, `claude-opus-5` actif (« pas avant le 24 juillet 2027 ») ; `temperature`, `top_p`, `top_k` **dépréciés à partir d'Opus 4.7** (erreur **400**).

[S-34] **Commitments on model deprecation and preservation** — https://www.anthropic.com/research/deprecation-commitments — *billet de recherche officiel Anthropic, 4 novembre 2025* — engagement de **préservation des poids** de tous les modèles publiés au moins pendant la durée de vie de l'entreprise, *post-deployment report* avant chaque retrait ; coût de service croissant **linéairement** avec le nombre de modèles servis.

[S-35] **Microsoft Foundry Models lifecycle and support policy** — https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements — *doc officielle Microsoft Learn, MAJ 24 juillet 2026* — retrait à **18 mois** après GA, « Deprecated » à **12 mois**, remplaçant annoncé **90–120 jours** avant, préavis **60 j** (GA) / **30 j** (preview), **`410 Gone`** après retrait ; ⚠️ dans l'API, `Deprecating` = déprécié et **`Deprecated` = retiré**.

[S-36] **Upgrade between model versions (Migration guide)** — https://platform.claude.com/docs/en/about-claude/models/migration-guide — *doc officielle éditeur (Anthropic), 2026* — procédure officielle référencée depuis la page de dépréciations : sert de **recette de montée de version modèle**, au même titre qu'une montée de version de framework.

[S-37] **Lessons From Red Teaming 100 Generative AI Products** — https://arxiv.org/abs/2501.07238 — *papier arXiv (AI Red Team Microsoft, 26 auteurs), janvier 2025* — retour sur **plus de 100 produits** GenAI red-teamés, ontologie de menaces et **8 leçons**, dont *« AI red teaming is not safety benchmarking »* et *« you don't have to compute gradients to break an AI system »*.

[S-38] **PyRIT — Python Risk Identification Tool** — https://microsoft.github.io/PyRIT/ — *doc officielle du framework open source Microsoft, 2026* — red teaming automatisé : stratégies multi-tours **Crescendo, TAP, Skeleton Key**, scanner CLI `pyrit_scan`, mémoire SQLite, scorers true/false et Likert, cibles OpenAI/Azure/Anthropic/HTTP/**Playwright** ; ⚠️ migration depuis `azure.github.io/PyRIT`.

[S-39] **Challenges in red teaming AI systems** — https://www.anthropic.com/news/challenges-in-red-teaming-ai-systems — *billet officiel Anthropic (Policy), 12 juin 2024* — panorama des méthodes et surtout la boucle **« du red teaming qualitatif vers les évaluations quantitatives automatisées »** : test ad hoc par experts → standardisation → génération de centaines/milliers de variantes par LLM.

[S-40] **Towards a Standard for Identifying and Managing Bias in AI (NIST SP 1270)** — https://www.nist.gov/publications/towards-standard-identifying-and-managing-bias-artificial-intelligence — *publication NIST, mars 2022 (page MAJ 2023)* — taxonomie officielle en trois catégories — **systémique, statistique/computationnel, humain** — avec l'argument que les biais produisent des impacts nocifs **indépendamment de l'intention**. DOI 10.6028/NIST.SP.1270.

[S-41] **Adversarial Machine Learning: A Taxonomy and Terminology (NIST AI 100-2 E2025)** — https://csrc.nist.gov/pubs/ai/100/2/e2025/final — *rapport NIST, mars 2025 (errata juin 2025)* — taxonomie de l'apprentissage adverse : étapes du cycle de vie de l'attaque, objectifs/capacités/connaissances de l'attaquant, glossaire commun (empoisonnement, évasion, abus, atteinte à la vie privée).

[S-42] **AI Risk Management Framework — NIST** — https://www.nist.gov/itl/ai-risk-management-framework — *page officielle NIST, page MAJ 10 juin 2026* — les 4 fonctions **Govern / Map / Measure / Manage** restent la référence de la surveillance continue ; état courant : **« The AI RMF 1.0 is being revised »**, note de cadrage « Trustworthy AI in Critical Infrastructure » publiée le **7 avril 2026**.

[S-43] **Assertions and Metrics — LLM Output Validation (promptfoo)** — https://www.promptfoo.dev/docs/configuration/expected-outputs/ — *doc officielle outil open source, 2026* — assertions déterministes et notées par modèle avec seuils agrégés : c'est le mécanisme concret de **non-régression de prompts** rejoué à chaque changement de modèle.

[S-44] **NIST AI 100-1 — AI Risk Management Framework (AI RMF 1.0)** — https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf — *cadre volontaire, PDF officiel, janvier 2023* — DOI 10.6028/NIST.AI.100-1 ; les fonctions **MEASURE** et **MANAGE** se cartographient directement sur les activités de test et de suivi post-déploiement ; revue formelle prévue **« no later than 2028 »**.
