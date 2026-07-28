# JOUR 3 — Sources vérifiées : CI/CD et tests non fonctionnels
**Formation « Test logiciel avec IA générative » — Human Coders / Evan Boissonnot**
Stack TP : Angular + .NET Web API · Outil principal : Claude Code · Collecte du 28 juillet 2026

> **Méthode.** Chaque URL a été récupérée par requête HTTP réelle avec **lecture du contenu de la page** (et non simple code 200). Les redirections 301/302 rencontrées sont signalées avec l'URL finale. Aucune URL n'a été inventée ; les sources non vérifiables ont été écartées ou explicitement signalées comme telles. **138 sources uniques**, réparties sur les 8 notions.
>
> ⚠️ Contrainte d'environnement à connaître pour toute recollecte : `curl` est bloqué par le proxy du bac à sable (code `000` / 403 sur CONNECT) sur `docs.github.com`, `docs.gitlab.com`, `learn.microsoft.com`, `arxiv.org`, `raw.githubusercontent.com`… alors que les pages sont vivantes. **Un `curl` en échec ne prouve rien** : refaire la vérification par fetch HTTP applicatif.

---

## ⚠️ AVERTISSEMENTS TRANSVERSES (à répercuter dans tout le support)

1. **Doc Anthropic migrée (rappel Jour 2, toujours valable)** : Claude Code → `code.claude.com/docs/en/`, API → `platform.claude.com/docs/en/`. `docs.anthropic.com` répond encore mais **par redirection**.
2. **GitHub a renommé « Copilot coding agent » en « Copilot cloud agent »** : tous les slugs `.../agents/coding-agent/...` redirigent vers `.../agents/cloud-agent/...`.
3. **GitLab a supprimé le segment `/ee/`** : `docs.gitlab.com/ee/ci/components/index.html` → `docs.gitlab.com/ci/components/`.
4. **La doc k6 a quitté `k6.io/docs`** → `grafana.com/docs/k6/latest/`. Et k6 est passé en **v2.x** : les tutoriels v0.4x/v1.x utilisent des options obsolètes.
5. **L'OWASP Top 10:2025 est PUBLIÉ** (8ᵉ édition) et **toute la numérotation a changé** : Injection passe de A03:2021 à **A05:2025**, le SSRF disparaît comme catégorie autonome. Ne jamais dire « A03 = Injection » sans l'année.
6. **OWASP ASVS est en v5.0.0** depuis le 30 mai 2025 (plus 4.0.3) : les identifiants d'exigences ont changé.
7. **Le RGAA courant est la version 4.1.2**, pas 4.1 ; le **RGAA 5 est annoncé pour fin 2026**.
8. **« Température 0 = déterminisme » est faux**, et sur Claude Opus 4.7+ les paramètres `temperature`/`top_p`/`top_k` renvoient carrément une **erreur 400** s'ils ne sont pas à la valeur par défaut.
9. **Test Impact Analysis d'Azure DevOps ne supporte PAS .NET Core** : à présenter comme concept, jamais comme outil du TP .NET moderne.
10. **Le dernier rapport DORA publié est celui de 2025** (*State of AI-assisted Software Development*) — il n'y a pas d'édition 2026 au 28/07/2026.

---

# NOTION 1 — IA dans un pipeline CI/CD (16 sources)

## 1.A Agent Claude Code exécuté en CI (mode headless)

**Claude Code GitHub Actions**
`https://code.claude.com/docs/en/github-actions` · Doc officielle Anthropic · consultée le 28/07/2026
Page de référence de `anthropics/claude-code-action@v1` : tableau complet des paramètres (`prompt`, `claude_args`, `plugins`, `use_bedrock`, `use_vertex`) et table de migration beta → v1 (`direct_prompt` → `prompt`, `max_turns` → `claude_args: --max-turns`, `mode` supprimé car auto-détecté). Fait citable : `--max-turns` vaut **10 par défaut**, et l'installation se fait via `/install-github-app` (option **Skip for now** disponible depuis Claude Code v2.1.187).
→ *QA* : c'est le squelette exact du TP « faire relire/corriger les tests Angular + .NET par Claude sur chaque PR », avec le YAML prêt à copier.

**Run Claude Code programmatically (headless)**
`https://code.claude.com/docs/en/headless` · Doc officielle Anthropic · consultée le 28/07/2026
Le mode non interactif `claude -p` avec `--allowedTools`, `--output-format json|stream-json`, `--json-schema`, `--permission-mode dontAsk`. Faits citables : le flag **`--bare`** (recommandé en CI, il ignore hooks/plugins/MCP/CLAUDE.md pour un résultat reproductible et deviendra le défaut de `-p`), **stdin plafonné à 10 Mo depuis la v2.1.128**, sortie JSON contenant `total_cost_usd`, et un SIGTERM fait sortir avec le **code 143**.
→ *QA* : le cœur du module — comment transformer un agent interactif en étape de pipeline déterministe et scriptable (`| jq -r '.result'`), et comment mesurer le coût par exécution.

**Claude Code GitLab CI/CD**
`https://code.claude.com/docs/en/gitlab-ci-cd` · Doc officielle Anthropic (bêta, maintenue par GitLab) · consultée le 28/07/2026
Job `.gitlab-ci.yml` complet : image `node:24-alpine3.21`, installation via `curl -fsSL https://claude.ai/install.sh | bash`, puis `claude -p "$AI_FLOW_INPUT" --permission-mode acceptEdits --allowedTools "Bash Read Edit Write mcp__gitlab"`. Inclut les variantes Bedrock (échange OIDC `aws sts assume-role-with-web-identity --duration-seconds 3600`) et Workload Identity Federation GCP.
→ *QA* : le pendant GitLab du TP GitHub Actions, indispensable si les stagiaires sont sur GitLab ; montre les variables `AI_FLOW_*` et le déclenchement par webhook « Comments (notes) ».

**claude-code-action/docs/security.md**
`https://github.com/anthropics/claude-code-action/blob/main/docs/security.md` · Dépôt GitHub officiel (7,9k étoiles, 195 lignes / 11,3 Ko) · consultée le 28/07/2026
Modèle de menace de l'action : seuls les utilisateurs avec **write access** peuvent la déclencher, les bots sont bloqués par défaut (`allowed_bots`), et **Claude ne crée pas la PR lui-même** — il pousse une branche et fournit un lien, laissant la validation humaine. Fait citable : `CLAUDE_CODE_SCRIPT_CAPS: '{"edit-issue-labels.sh":2}'` plafonne le nombre d'appels d'un script, et l'option `show_full_output` est **désactivée par défaut** car les logs Actions sont publics sur un repo public.
→ *QA* : matière première du volet « risques » — injection de prompt via commentaires externes, danger de `pull_request_target` avec checkout du head, fuite de secrets dans les logs.

**Code Review**
`https://code.claude.com/docs/en/code-review` · Doc officielle Anthropic (research preview, Team/Enterprise) · MAJ juillet 2026
Service managé de revue multi-agents postant des commentaires inline gradués 🔴 Important / 🟡 Nit / 🟣 Pre-existing. Faits citables : une revue coûte **15 à 25 $ en moyenne** et dure **20 minutes en moyenne** ; le check run se termine toujours en conclusion `neutral` donc **ne bloque jamais le merge**, mais on peut le gater soi-même en parsant `bughunter-severity` avec `gh api ... | jq`.
→ *QA* : cas concret de « quality gate IA » chiffré, et démonstration de la bonne pratique — l'IA informe, la règle de gating reste explicite et sous contrôle de l'équipe QA.

## 1.B GitHub Actions : limites, sécurité, Copilot

**Actions limits**
`https://docs.github.com/en/actions/reference/limits` · Doc officielle GitHub · consultée le 28/07/2026
Toutes les limites dures : job **6 h max** sur runner GitHub-hosted (**5 jours** en self-hosted), run complet **35 jours**, matrice **256 jobs**, **50 re-runs** max. Concurrence : **20 jobs** en plan Free, 40 en Pro, 60 en Team, **500 en Enterprise**. Minutes incluses : **2 000/mois** en Free, 3 000 en Pro/Team, 50 000 en Enterprise Cloud. Le `GITHUB_TOKEN` est limité à **1 000 requêtes API/heure/dépôt**.
→ *QA* : chiffres de dimensionnement indispensables — une suite de tests pilotée par IA qui boucle peut saturer les 2 000 minutes gratuites ou le quota d'API du `GITHUB_TOKEN`.

**Configuring OpenID Connect in cloud providers**
`https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-cloud-providers` · Doc officielle GitHub · consultée le 28/07/2026
Explique l'échange JWT → jeton d'accès cloud sans secret longue durée. Fait citable exact : le job doit déclarer **`permissions: id-token: write`**, et la doc précise que ce réglage « ne donne aucune permission d'écriture sur les ressources » ; sans action officielle du provider, on récupère le JWT via `ACTIONS_ID_TOKEN_REQUEST_TOKEN` et `ACTIONS_ID_TOKEN_REQUEST_URL`.
→ *QA* : la bonne pratique à enseigner pour que le pipeline IA n'embarque aucune clé statique (Azure, AWS Bedrock, Vertex) — directement transposable au TP .NET déployé sur Azure.

**Secure use reference (GitHub Actions)**
`https://docs.github.com/en/actions/reference/security/secure-use` · Doc officielle GitHub · consultée le 28/07/2026
Référence de durcissement : « pinning an action to a full-length commit SHA is currently the only way to use an action as an immutable release » — seule protection contre l'ajout d'une backdoor dans le dépôt d'une action tierce ; couvre aussi les risques propres aux self-hosted runners.
→ *QA* : critère de revue de PR à faire appliquer quand un agent IA modifie lui-même des fichiers de workflow (il a tendance à écrire `@v1`, pas un SHA).

**About GitHub Copilot cloud agent**
`https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent` · Doc officielle GitHub · consultée le 28/07/2026
L'agent travaille dans « its own ephemeral development environment, powered by GitHub Actions », y lance tests et linters. Fait citable : la session est plafonnée à **59 minutes**, limite dure non extensible.
→ *QA* : comparatif direct avec Claude Code Action — deux modèles d'agent tournant sur runner jetable, avec des budgets temps très différents.

**Configure the development environment (Copilot cloud agent)**
`https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment` · Doc officielle GitHub · consultée le 28/07/2026
Le fichier **`.github/workflows/copilot-setup-steps.yml`** doit contenir **un seul job nommé `copilot-setup-steps`** et n'accepte que 6 clés (`steps`, `permissions`, `runs-on`, `services`, `snapshot`, `timeout-minutes` ≤ 59) ; il n'est pris en compte que s'il est présent sur la branche par défaut.
→ *QA* : c'est exactement là qu'on préinstalle .NET SDK, Node/Angular CLI et la base de test pour que l'agent puisse exécuter la suite de tests de façon reproductible.

**Requests in GitHub Copilot**
`https://docs.github.com/en/copilot/concepts/billing/copilot-requests` · Doc officielle GitHub · MAJ mentionnant le changement du 01/06/2026
Table de consommation officielle : le cloud agent coûte **1 premium request par session** (× multiplicateur du modèle) **+ 1 par commentaire de steering** ; Copilot Free est plafonné à **50 premium requests/mois**, et Copilot code review passe à un multiplicateur de **13** au 1er juin 2026.
→ *QA* : permet de chiffrer le coût d'une stratégie « l'IA écrit et corrige les tests dans la CI » et d'enseigner l'arbitrage quota/valeur avant industrialisation.

## 1.C GitLab CI/CD, composants et GitLab Duo

**CI/CD components**
`https://docs.gitlab.com/ci/components/` · Doc officielle GitLab · docs v19.3
Syntaxe `include: component: $CI_SERVER_FQDN/<chemin>/<composant>@<version>`, structure obligatoire `templates/` + `README.md`, résolution SHA > tag > branche. Faits citables : GA en **GitLab 17.0** (expérimental 16.0, bêta 16.6) et plafond passé de 30 à **100 composants par projet en GitLab 18.5**.
→ *QA* : permet d'empaqueter le job « test + analyse IA » en composant versionné réutilisable, avec pinning explicite pour la reproductibilité des pipelines de test.

**OpenID Connect (OIDC) Authentication Using ID Tokens**
`https://docs.gitlab.com/ci/secrets/id_token_authentication/` · Doc officielle GitLab · docs v19.3
Mot-clé `id_tokens` avec claim `aud` par jeton, claims standard (`iss`, `sub`, `aud`, `exp`, `jti`) et personnalisées (`project_id`, `ref_protected`, `environment`, `runner_environment`). Fait citable : jeton signé en **RS256**, expirant **au timeout du job — ou à 5 minutes si aucun timeout n'est défini**.
→ *QA* : le pattern anti-fuite à enseigner — le pipeline de test s'authentifie auprès du cloud ou de l'API du modèle sans stocker de clé LLM longue durée en variable.

**GitLab Duo Agent Platform**
`https://docs.gitlab.com/user/duo_agent_platform/` · Doc officielle GitLab · docs v19.3
Catalogue des flows GA (Agentic Chat, Code Review Flow, **Fix CI/CD Pipeline Flow**, Convert to GitLab CI/CD Flow, Custom flows) et bêta (**CI Expert Agent**), avec consommation en GitLab Credits. Fait citable : bêta en **GitLab 18.2**, **GA en GitLab 18.8**, motorisé par Claude Sonnet 4.
→ *QA* : cas documenté d'IA générative branchée nativement sur la CI/CD (réparation automatique d'un pipeline en échec), parfait pour une démo comparative face à Claude Code Action.

## 1.D Azure DevOps, OIDC et gestion des secrets

**Connect to Azure with an Azure Resource Manager service connection**
`https://learn.microsoft.com/en-us/azure/devops/pipelines/library/connect-to-azure?view=azure-devops` · Doc officielle Microsoft Learn · ms.date 2026-07-15
Workload Identity Federation (OIDC) recommandée par Microsoft car elle « élimine le besoin de secrets ». Faits citables : Azure Pipelines **désactive automatiquement les connexions de service inutilisées depuis 100 jours**, et après conversion secret → workload identity, le retour arrière n'est possible que pendant **7 jours**.
→ *QA* : équivalent Azure du pattern OIDC GitHub/GitLab — comment un pipeline de tests .NET s'authentifie sur Azure sans jamais stocker de secret.

**Microsoft-hosted agents for Azure Pipelines**
`https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops` · Doc officielle Microsoft Learn · ms.date 2026-06-17
Limites chiffrées : VM `Standard_DS2_v2` (2 cœurs, 7 Go RAM) avec seulement **10 Go d'espace disque libre**, VM réinitialisée à chaque job ; palier gratuit projet privé = **1 job parallèle, 60 minutes par exécution et 1 800 minutes (30 h) par mois**, le palier payant portant chaque job à **360 minutes**.
→ *QA* : chiffres nécessaires pour dimensionner un pipeline où génération + exécution de tests par IA risque de dépasser les 60 minutes gratuites ou les 10 Go de disque.

### Pièges vérifiés — Notion 1

- **Doc Anthropic migrée** : `docs.anthropic.com/en/docs/claude-code/...` n'est plus canonique. Claude Code est sur **`code.claude.com/docs/en/`**, l'API sur `platform.claude.com`. La page « headless » existe bien sous `/docs/en/headless` mais s'intitule désormais *Run Claude Code programmatically*.
- **Copilot renommé** : `.../agents/coding-agent/about-coding-agent` **redirige** vers `.../agents/cloud-agent/about-cloud-agent`. « coding agent » n'existe plus dans les slugs.
- **Facturation Copilot** : `.../managing-copilot/monitoring-usage-and-entitlements/about-premium-requests` n'est plus canonique → `concepts/billing/copilot-requests`. La page concept parle de « AI credits », la page facturation garde « premium requests » : citer la seconde pour les chiffres.
- **GitLab sans `/ee/`** : `docs.gitlab.com/ee/ci/components/index.html` redirige (301) vers `docs.gitlab.com/ci/components/` (avec **slash final**). `docs.gitlab.com/ee/user/gitlab_duo/` → `/user/duo_agent_platform/`.
- **Incohérence interne GitLab** : la page composants annonce dans son historique « 30 → 100 composants par projet en 18.5 » alors que le corps du texte dit encore « maximum of 30 ». Citer l'entrée d'historique.
- **Azure DevOps MCP** : `learn.microsoft.com/en-us/azure/devops/mcp/...` et `/integrate/get-started/mcp` sont **morts**. Bon chemin : `https://learn.microsoft.com/en-us/azure/devops/mcp-server/mcp-server-overview?view=azure-devops` (vérifié 200 — Node.js 20+, serveur local gratuit).
- **Faux positifs Microsoft Learn** : une URL 404 sur learn.microsoft.com renvoie une **page vide sans erreur**. Traiter tout corps vide comme non vérifié. Toujours citer avec le moniker `?view=azure-devops`.
- **Sources vérifiées 200, en réserve** : `https://learn.microsoft.com/en-us/azure/devops/pipelines/process/set-secret-variables?view=azure-devops` (secrets chiffrés RSA 2048, **non déchiffrés automatiquement en variables d'environnement**, masquage jamais appliqué aux sous-chaînes) et `https://docs.gitlab.com/ci/variables/` (masquage exigeant **8 caractères minimum**, sans espace, 10 000 caractères max, visibilité par défaut passée à *Masked* en GitLab 18.3).

---

# NOTION 2 — Reproductibilité et versioning des prompts (16 sources)

## 2.A Versioning et gestion de prompts

**Prompt engineering concepts (LangSmith)**
`https://docs.langchain.com/langsmith/prompt-engineering-concepts` · Doc éditeur · consulté 28/07/2026
Chaque sauvegarde crée un **commit avec un hash unique** référençable en code via `client.pull_prompt("prompt_name:commit_hash")` ; les tags `staging` et `production` sont réservés à la fonctionnalité Environments et peuvent être déplacés sans toucher au code.
→ *QA* : modèle mental exact du « git pour prompts » ; montre comment épingler un prompt par hash dans un test de non-régression.

**Get Started with Prompt Management (Langfuse)**
`https://langfuse.com/docs/prompt-management/get-started` · Doc éditeur (open source) · consulté 28/07/2026
Réenregistrer un prompt sous le même `name` crée automatiquement une **nouvelle version** ; la récupération se fait soit par label (`?label=production`, valeur par défaut), soit par numéro (`?version=1`) via l'API publique v2.
→ *QA* : alternative auto-hébergeable pour un TP ; le couple label/version illustre le découplage déploiement-prompt vs déploiement-code.

**Prompt Registry | MLflow AI Platform**
`https://mlflow.org/docs/latest/genai/prompt-registry` · Doc éditeur (open source) · consulté 28/07/2026 (redirection depuis `/prompt-registry/`)
Les versions de prompts sont **immuables**, d'où un cache mémoire à **TTL infini par version** contre **60 s par défaut pour un alias** (`MLFLOW_ALIAS_PROMPT_CACHE_TTL_SECONDS`) ; `model_config` stocke `temperature`, `top_p`, et même `seed` via `extra_params` aux côtés du template.
→ *QA* : le seul registre qui versionne explicitement **prompt + paramètres d'inférence ensemble** — exactement la définition de la reproductibilité à enseigner.

**Prompt Registry (PromptLayer)**
`https://docs.promptlayer.com/features/prompt-registry/overview` · Doc éditeur · consulté 28/07/2026
Les **release labels** (`prod`, `staging`) sont protégeables par **workflows d'approbation**, et le runtime appelle `pl_client.run(prompt_name=..., prompt_release_label="prod")` sans redéploiement.
→ *QA* : angle gouvernance/QA — qui a le droit de promouvoir un prompt en production, question directement transposable à un process de recette.

## 2.B Model pinning, dépréciations et non-déterminisme

**Model IDs and versioning — Claude Platform Docs**
`https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions` · Doc officielle · MAJ 2026
Depuis la génération **4.6**, un ID sans date (`claude-sonnet-4-6`) **n'est pas un alias** mais le snapshot figé lui-même ; avant 4.6, `claude-sonnet-4-5` est un alias pointant vers le dernier snapshot daté. Surtout : les poids sont figés mais **l'infrastructure de service (routeur, classifieurs de sécurité, logique d'échantillonnage) peut changer** et produire des différences de comportement observables à ID constant.
→ *QA* : détruit l'illusion « j'ai pinné le modèle donc mes tests sont stables » ; justifie de rejouer une baseline d'évaluation périodiquement.

**Model deprecations — Claude Platform Docs**
`https://platform.claude.com/docs/en/about-claude/model-deprecations` · Doc officielle · MAJ 06/2026
Préavis minimum de **60 jours** avant retrait ; `claude-opus-4-1-20250805` déprécié le 5 juin 2026 pour retrait le **5 août 2026**. Point critique : **`temperature`, `top_p` et `top_k` sont dépréciés sur Claude Opus 4.7 et suivants** et renvoient une **erreur 400** si on leur donne une valeur non par défaut.
→ *QA* : chiffre-clé du module — sur les modèles récents, « figer la température » n'est littéralement plus une option ; la reproductibilité passe par le prompt et les evals.

**Non-Determinism of "Deterministic" LLM Settings**
`https://arxiv.org/abs/2408.04667` · Papier arXiv (v5, avril 2025) · cs.CL
Sur **5 LLM, 8 tâches et 10 exécutions** en configuration « déterministe » : variations d'exactitude allant jusqu'à **15 %**, et écart entre meilleure et pire performance possible jusqu'à **70 %**. Introduit les métriques **TARr@N** (accord total sur la sortie brute) et **TARa@N** (sur la réponse parsée).
→ *QA* : la référence académique pour justifier N exécutions et un seuil de tolérance dans une campagne de test, plutôt qu'une assertion d'égalité stricte.

**Defeating Nondeterminism in LLM Inference**
`https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference` · Article de recherche industrielle · 10/09/2025
1000 complétions à **température 0** sur Qwen3-235B produisent **80 complétions uniques** ; elles sont identiques sur les **102 premiers tokens** et divergent au 103ᵉ. La vraie cause n'est pas « concurrence + flottants » mais la **non-invariance au batch** : la charge du serveur change la taille de batch, donc le résultat. Avec des kernels batch-invariants, les 1000 sorties deviennent identiques, pour un coût de 26 s → 42 s.
→ *QA* : explication causale claire et chiffrée à projeter en cours ; répond à « pourquoi mon test passe le matin et échoue l'après-midi ».

## 2.C Évaluation de prompts en CI

**Testing Prompts with GitHub Actions | Promptfoo**
`https://www.promptfoo.dev/docs/integrations/github-action` · Doc éditeur · MAJ 25/07/2026
L'action `promptfoo/promptfoo-action@v1` déclenche une comparaison **avant/après** sur toute PR modifiant `prompts/**` et poste le résultat en commentaire ; le cache `~/.cache/promptfoo` (via `actions/cache@v4`) réutilise les requêtes LLM d'un run à l'autre pour réduire le coût.
→ *QA* : squelette de workflow directement réutilisable en TP, y compris la maîtrise du budget CI par le cache.

**LLM Rubric | Promptfoo**
`https://www.promptfoo.dev/docs/configuration/expected-outputs/model-graded/llm-rubric` · Doc éditeur · MAJ 27/07/2026
Le juge par défaut dépend de la clé disponible (`gpt-5` côté OpenAI, `claude-sonnet-4-5-20250929` côté Anthropic) et le grader OpenAI intégré tourne déjà à **`temperature=0`**. Piège documenté : sans `threshold`, un retour `{pass: true, score: 0}` **passe quand même**.
→ *QA* : parfait pour un TD sur les faux positifs du LLM-as-a-judge — un test vert qui ne teste rien.

**DeepEval 5-min Quickstart**
`https://deepeval.com/docs/getting-started` · Doc éditeur (Apache 2.0) · consulté 28/07/2026
Intégration Pytest native (`deepeval test run`), métrique `GEval` scorée de **0 à 1** avec `threshold=0.5`. Côté robustesse CI : **1 seul retry** par défaut sur erreurs 5xx et 429 (backoff exponentiel, initial 1 s, base 2, jitter 2 s, plafond 5 s), `insufficient_quota` étant traité comme non-retryable.
→ *QA* : le plus proche des réflexes d'un testeur .NET/Java (assertions, fixtures) ; les règles de retry sont un excellent point sur la fiabilité d'une CI dépendant d'un quota.

**Working with evals | OpenAI API**
`https://developers.openai.com/api/docs/guides/evals` · Doc officielle · consulté 28/07/2026
Une eval se définit par deux ingrédients : `data_source_config` (schéma des données de test) et `testing_criteria` (les **graders**, par ex. `string_check` pour une correspondance exacte avec un label humain). La doc pointe un cookbook dédié à la **détection de régressions de prompt**.
→ *QA* : montre l'eval hébergée côté fournisseur, à comparer en cours avec l'approche fichier-dans-le-repo de promptfoo.

**Define success criteria and build evaluations — Claude Platform Docs**
`https://platform.claude.com/docs/en/test-and-evaluate/develop-tests` · Doc officielle · consulté 28/07/2026 (redirection depuis `/test-and-evaluate/eval-tool`)
Exige des critères quantifiés — l'exemple donné est « **moins de 0,1 % des sorties sur 10 000 essais** signalées comme toxiques » — et pose une règle contre-intuitive : **privilégier le volume de cas** avec une notation automatique un peu bruitée plutôt que peu de cas notés à la main.
→ *QA* : cadre méthodologique pour écrire des critères d'acceptation testables, transposable tel quel à une user story Angular/.NET.

## 2.D Coûts, caching et quotas

**Prompt caching — Claude Platform Docs**
`https://platform.claude.com/docs/en/build-with-claude/prompt-caching` · Doc officielle · MAJ 2026
TTL par défaut **5 minutes** (rafraîchi gratuitement à chaque hit), option **1 heure**. Multiplicateurs : écriture 5 min = **1,25×** le prix d'entrée, écriture 1 h = **2×**, **lecture = 0,1×**. Minimum cacheable variable : **512 tokens** (Opus 5), **1 024** (Sonnet 5, Opus 4.8), **4 096** (Opus 4.5/4.6, Haiku 4.5). Maximum **4 breakpoints**, fenêtre de lookback de **20 blocs**, et le hit exige **100 % d'identité** du préfixe.
→ *QA* : l'exigence d'identité stricte du préfixe est *l'*argument technique pour versionner ses prompts — un timestamp injecté casse le cache et fait payer une écriture à chaque requête.

**Prompt caching | OpenAI API**
`https://developers.openai.com/api/docs/guides/prompt-caching` · Doc officielle · consulté 28/07/2026
Activation automatique à partir de **1 024 tokens**, routage par hash des **~256 premiers tokens**. Sur GPT-5.6 et suivants : écriture facturée **1,25×**, TTL de `prompt_cache_options.ttl` fixé à **30 m** (seule valeur supportée), **4 écritures de cache max par requête**, lecture sur les **50 derniers breakpoints**, et il faut garder **~15 requêtes/minute par `prompt_cache_key`**. La FAQ précise que le caching **ne rend pas la sortie déterministe**.
→ *QA* : comparaison chiffrée directe avec Anthropic ; la phrase sur le non-déterminisme est à citer telle quelle pour couper court à la confusion cache = reproductibilité.

**Rate limits — Claude Platform Docs**
`https://platform.claude.com/docs/en/api/rate-limits` · Doc officielle · consulté 28/07/2026
Plafonds de dépense mensuels par palier : **Start 500 $, Build 1 000 $, Scale 200 000 $**. Les `cache_read_input_tokens` **ne comptent pas** dans la limite ITPM (sauf Haiku 3.5) : avec 2 000 000 ITPM et **80 % de taux de hit**, on traite effectivement **10 000 000 tokens d'entrée par minute**.
→ *QA* : chiffres concrets pour dimensionner le budget d'une campagne d'evals en CI et expliquer pourquoi un pipeline massif doit être conçu autour du cache.

### Pièges vérifiés — Notion 2

- **`docs.anthropic.com` est mort en tant que domaine canonique.** `https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching` renvoie 200 mais après **2 redirections** vers `platform.claude.com`.
- **La page « Prompt tools » d'Anthropic n'existe plus à l'adresse attendue.** `https://platform.claude.com/docs/en/api/prompt-tools-generate` renvoie 200 **après redirection vers `/docs/en/home`** — une page d'accueil, pas la doc demandée. Ne pas citer les « Anthropic Prompt Tools » (generate/improve/templatize) comme API documentée sans revérification.
- **Redirection interne Anthropic** : `/docs/en/test-and-evaluate/eval-tool` → `/docs/en/test-and-evaluate/develop-tests`.
- **Le cookbook OpenAI sur `seed` est officiellement archivé.** `https://developers.openai.com/cookbook/examples/reproducible_outputs_with_the_seed_parameter` répond 200 mais affiche le bandeau *« This recipe is archived… »* et utilise `gpt-3.5-turbo-1106`. Le concept reste citable : `seed` est un **« best effort »** explicitement non garanti, et `system_fingerprint` change quand OpenAI modifie sa configuration numérique, ce qui arrive **« a few times a year »**. Les anciennes URL `cookbook.openai.com/...` redirigent vers `developers.openai.com/cookbook/...`.
- **Idée fausse n°1 — « température 0 = déterminisme »** : démentie deux fois (80 complétions uniques sur 1000 ; jusqu'à 15 % de variation d'exactitude).
- **Idée fausse n°2 — « un ID de modèle sans date est un alias »** : faux depuis la génération 4.6 ; la doc Anthropic a une section entière *« Dateless IDs are pinned snapshots »*.
- **Idée fausse n°3 — « je fige `temperature` pour reproduire »** : erreur 400 sur Claude Opus 4.7+.
- **Idée fausse n°4 — « le prompt caching aide à la reproductibilité »** : la FAQ OpenAI dit explicitement l'inverse.
- **Neutralité de l'outil à signaler en cours** : la doc promptfoo affiche désormais le bandeau *« Promptfoo is now part of OpenAI »*, et la page LLM Rubric a été mise à jour le 27/07/2026 par un compte `mldangelo-oai`.

---

# NOTION 3 — Sélection et priorisation des tests en CI (16 sources)

## 3.A Test Impact Analysis et sélection côté Microsoft/.NET

**Speed up testing by using Test Impact Analysis (TIA)**
`https://learn.microsoft.com/en-us/azure/devops/pipelines/test/test-impact-analysis?view=azure-devops` · Doc officielle Microsoft Learn · MAJ 2025-10-27
TIA (tâche **Visual Studio Test v2.\***, case *Run only impacted tests*) sélectionne trois catégories : tests impactés par le commit, tests précédemment en échec, tests nouvellement ajoutés ; variables exactes : `DisableTestImpactAnalysis`, `TIA_IncludePathFilters`, `TIA.UserMapFile`.
→ *QA* : la référence pour montrer le mécanisme « call-graph → sous-ensemble », avec la stratégie de validation T1 (impacted) vs T2 (all) recommandée par MS.

**Manage flaky tests (Azure Pipelines)**
`https://learn.microsoft.com/en-us/azure/devops/pipelines/test/flaky-test-management?view=azure-devops` · Doc officielle Microsoft Learn · MAJ 2025-05-28
Détection système = re-run du test échoué dans la même exécution VSTest ; si le test passe au re-run il est taggé **Flaky**. Détection custom possible via l'API REST *Result Meta Data - Update*. Option : exclure les flaky du pass percentage → ils apparaissent dans « Tests not reported ».
→ *QA* : montre un cycle de quarantaine industrialisé (Detection → Management → Report → Resolution) directement branché sur le TP .NET.

**Configure unit tests by using a .runsettings file**
`https://learn.microsoft.com/en-us/visualstudio/test/configure-unit-tests-by-using-a-dot-runsettings-file?view=vs-2022` · Doc officielle Microsoft Learn · VS 2022
Le nœud `<MaxCpuCount>1</MaxCpuCount>` pilote le parallélisme **au niveau processus** ; la doc avertit explicitement que « the option name is case sensitive and is easy to misspell as MaxCPUCount ».
→ *QA* : le fichier `.runsettings` est le point d'entrée unique pour parallélisme + TIA data collector dans le TP .NET Web API.

**Running Tests in Parallel (xUnit.net)**
`https://xunit.net/docs/running-tests-in-parallel` · Doc officielle xUnit · Core Framework v2 2.8 / v3
Par défaut **chaque classe de test = une test collection** (les tests d'une même classe ne sont jamais parallèles) ; depuis v2 2.8 l'algorithme par défaut est passé de `aggressive` à `conservative` (`-parallelAlgorithm`), et `-parallel` accepte `none|collections|assemblies|all` (défaut `collections`).
→ *QA* : explique pourquoi un TP xUnit « ne va pas plus vite » si tout est dans une seule classe, et donne les leviers CLI exacts.

## 3.B Predictive test selection (ML) et travaux académiques

**Predictive Test Selection** — Machalica, Samylkin, Porth, Chandra (Meta/Facebook)
`https://arxiv.org/abs/1810.05286` · arXiv cs.SE, ICSE-SEIP 2019 · v2, 29 mai 2019
En production chez Facebook, la stratégie apprise **divise par deux le coût total d'infrastructure de test**, tout en garantissant que **>95 % des échecs de tests individuels** et **>99,9 % des changements fautifs** remontent aux développeurs ; le modèle intègre explicitement le flakiness.
→ *QA* : LE chiffre à afficher en slide pour justifier la sélection prédictive vs « on lance tout ».

**Taming Google-Scale Continuous Testing** — Memon, Nguyen, Nickell, Micco, Dhanda, Siemborski, Gao
`https://research.google/pubs/taming-google-scale-continuous-testing/` · ICSE '17 (Google Research) · 2017
Constats empiriques : très peu de tests échouent un jour ; ceux qui échouent sont généralement « plus proches » du code qu'ils testent ; et le code **modifié récemment par plus de 3 développeurs casse plus souvent**. Dataset anonymisé publié.
→ *QA* : fournit les *features* réelles (proximité, churn, nombre d'auteurs) qu'une IA générative peut proposer pour scorer les tests.

**Reinforcement Learning for Automatic Test Case Prioritization and Selection in Continuous Integration** — Spieker, Gotlieb, Marijan, Mossige
`https://arxiv.org/abs/1811.04122` · arXiv cs.SE / ISSTA '17 (DOI 10.1145/3092703.3092709) · nov. 2018
La méthode **RETECS** priorise sur trois signaux seulement — durée du test, date de dernière exécution, historique d'échecs — validée sur **3 études de cas industrielles**, sans lien de traçabilité code↔test.
→ *QA* : cas parfait pour un atelier « je n'ai pas de call-graph, je n'ai que l'historique xUnit — que peut faire un LLM ? ».

**An Empirical Analysis of Flaky Tests** — Luo, Hariri, Eloussi, Marinov (UIUC)
`http://mir.cs.illinois.edu/marinov/publications/LuoETAL14FlakyTestsAnalysis.pdf` · PDF, FSE 2014 · 2014
Première étude extensive : **201 commits** corrigeant des tests flaky dans **51 projets open source**, classés par cause racine et par stratégie de correction.
→ *QA* : taxonomie de référence pour faire classer des échecs flaky par un LLM (async wait, concurrence, ordre des tests…).

## 3.C Flaky, quarantaine et observabilité CI

**Flaky Tests at Google and How We Mitigate Them** — John Micco
`https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html` · Google Testing Blog · mai 2016
**~1,5 % de toutes les exécutions de tests** rendent un résultat flaky ; **presque 16 % des tests** présentent un niveau de flakiness ; et **~84 % des transitions pass→fail observées en CI impliquent un test flaky**. Un outil met automatiquement en quarantaine les tests trop flaky.
→ *QA* : les trois chiffres qui justifient à eux seuls le chapitre quarantaine.

**Unhealthy tests (GitLab development docs)**
`https://docs.gitlab.com/development/testing_guide/unhealthy_tests` · Doc officielle GitLab (v19.1) · 2026 — *redirection depuis `…/unhealthy_tests/`*
Les tests en échec sont **automatiquement rejoués une fois dans un process RSpec séparé** ; GitLab publie 8 catégories de flakiness étiquetées (`flaky-test::state leak`, `dataset-specific`, `random input`, `unreliable dom selector`, `datetime-sensitive`, `unstable infrastructure`, `improper synchronization`, `too-many-sql-queries`) et l'outil `scripts/rspec_bisect_flaky`.
→ *QA* : grille de diagnostic prête à l'emploi ; les catégories DOM/synchronisation se transposent directement à Playwright sur Angular.

**Test Quarantine Process (GitLab Handbook)**
`https://handbook.gitlab.com/handbook/engineering/testing/quarantine-process/` · Handbook officiel GitLab · 2026
Durées contractuelles chiffrées : **fast quarantine = 3 jours maximum**, **long-term quarantine = 3 mois maximum**, puis avertissement de suppression 1 semaine et **suppression automatique du test après 3 mois**. Les MR de quarantaine sont assignées automatiquement aux Engineering Managers via la métadonnée `feature_category`.
→ *QA* : le garde-fou anti-« quarantaine éternelle » — à imposer comme règle de politique dans le TP.

**Working with Flaky Tests (Datadog Test Optimization)**
`https://docs.datadoghq.com/tests/flaky_tests` · Doc officielle Datadog · 2026 — *redirection depuis `/tests/flaky_test_management/`*
Trois tags distincts : `is_flaky`, `is_new_flaky`, `is_known_flaky`. Un flaky non ré-échoué depuis **30 jours** sort automatiquement de la table ; la détection sur branche par défaut remonte les **5 000 derniers commits** ; la table est limitée aux **1 000 tests** les plus « commits flaked » ; une métrique de comptage est générée **toutes les 30 minutes**.
→ *QA* : montre la différence entre « flaky connu » (on n'échoue pas la PR) et « nouveau flaky » (on bloque) — décision de gating.

**Develocity Predictive Test Selection User Manual**
`https://docs.gradle.com/develocity/predictive-test-selection/` · Doc officielle Gradle/Develocity · 2026
Le modèle est entraîné sur les Build Scans du projet + « des millions d'exécutions de tests » ; le Build Scan indique quels tests ont été écartés, **pourquoi**, et **le temps économisé**. Un **Simulator** (Develocity **2022.1+**) rejoue les résultats réels pour comparer les *selection profiles* avant activation, et une configuration **must-run** force certains tests.
→ *QA* : le concept de « simuler avant d'activer » est le meilleur argument méthodologique à transmettre (on mesure le risque avant de couper des tests).

## 3.D Parallélisation, sharding et matrices CI

**Sharding (Playwright Test)**
`https://playwright.dev/docs/test-sharding` · Doc officielle Playwright · stable 2026
Option CLI exacte `--shard=x/y` (ex. `npx playwright test --shard=1/4`). Avec **`fullyParallel: true`** le découpage se fait **au test près** (shards équilibrés) ; **sans** `fullyParallel`, le découpage est **au fichier près** (déséquilibre si les fichiers sont inégaux). Fusion via reporter `blob` + `npx playwright merge-reports --reporter html ./all-blob-reports`.
→ *QA* : la combinaison `--shard` + `blob` + `merge-reports` est exactement le TP e2e Angular à monter.

**Retries (Playwright Test)**
`https://playwright.dev/docs/test-retries` · Doc officielle Playwright · stable 2026
`--retries=3` (ou `retries: 3`). Playwright classe en **trois** catégories : `passed`, **`flaky`** (échoué au 1er run, passé au retry), `failed`. `testInfo.retry` permet de nettoyer un état serveur avant la nouvelle tentative ; `test.describe.configure({ retries: 2 })` cible un groupe.
→ *QA* : le statut `flaky` natif donne une métrique gratuite à collecter en CI, sans outil tiers.

**Running variations of jobs in a workflow (GitHub Actions)**
`https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations` · Doc officielle GitHub · 2026 — *redirection depuis `/en/actions/using-jobs/using-a-matrix-for-your-jobs`*
`jobs.<job_id>.strategy.matrix` : une matrice `version: [10,12,14]` × `os: [ubuntu-latest, windows-latest]` produit **6 jobs**. `max-parallel: 2` plafonne la concurrence ; `fail-fast` + `continue-on-error: ${{ matrix.experimental }}` permettent d'isoler un shard « expérimental » sans annuler les autres.
→ *QA* : `fail-fast: false` est indispensable en sharding (sinon un shard rouge tue les autres et on perd les rapports blob).

### Pièges vérifiés — Notion 3

- **TIA ne supporte PAS .NET Core** — la page Microsoft Learn liste explicitement `.NET Core`, `UWP`, les tests data-driven, la topologie multi-machines et le parallélisme spécifique à l'adapter parmi les scénarios **non supportés**. **Pour un TP Angular + .NET moderne, TIA Azure DevOps n'est pas applicable** : concept, pas outil.
- **TIA + parallélisme = incompatible** (VS 2015) : les tests s'exécutent alors **en série**, et la couverture de code n'est **pas collectée**.
- **TIA retombe sur « tous les tests » silencieusement** dès qu'il rencontre un type de fichier inconnu (HTML, CSS, `.csproj`) — d'où `TIA_IncludePathFilters`. Un gain mesuré peut s'évaporer sans alerte.
- **Flaky test management Azure DevOps = Azure DevOps Services uniquement** (pas Server/on-prem), et **basculer entre détection système et custom efface tout l'historique de flakiness**.
- **Sharding Playwright sans `fullyParallel`** : découpage au fichier, shards potentiellement très déséquilibrés (voire vides) — piège classique quand un seul `.spec.ts` contient 80 % des tests.
- **`MaxCpuCount` est sensible à la casse** — `MaxCPUCount` est silencieusement ignoré.
- **Quarantaine sans date d'expiration** : GitLab impose 3 jours / 3 mois puis suppression automatique. Sans ce garde-fou, la quarantaine devient un cimetière.
- **Retry ≠ correction** : Google note que marquer un test « flaky » (échec seulement après 3 échecs consécutifs) retarde la détection d'une vraie régression de **~45 min** pour un test d'intégration de 15 min, et pousse les devs à ignorer la flakiness.
- **URL à ne pas recopier** : `docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs` et `docs.datadoghq.com/tests/flaky_test_management/` redirigent (301) ; les anciens `blogs.msdn.microsoft.com/devops/...` → `devblogs.microsoft.com/devops/...`.

---

# NOTION 4 — Tests de performance et de charge (16 sources)

## 4.A k6 : seuils, types de tests, dépôt

**Thresholds — Grafana k6 documentation**
`https://grafana.com/docs/k6/latest/using-k6/thresholds/` · Doc officielle · doc « latest », consultée juil. 2026
Syntaxe exacte confirmée : `thresholds: { http_req_duration: ['p(95)<200'] }`, sortie console `✓ 'p(95)<200' p(95)=148.21ms` ; un seuil échoué fait sortir k6 avec un **code retour non nul**. Exemples multi-percentiles réels : `['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000']` et seuils par tag `'http_req_duration{type:API}': ['p(95)<500']`.
→ *QA* : la page de référence pour transformer une SLO en quality gate ; sert de prompt-cible pour faire générer/corriger des seuils par Claude Code.

**Load test types — Grafana k6 documentation**
`https://grafana.com/docs/k6/latest/testing-guides/test-types/` · Guide officiel · doc « latest »
Tableau normatif des types : Smoke (VUs faibles, secondes/minutes), Average-load, **Stress (5–60 min, charge au-dessus de la moyenne)**, Soak (charge moyenne, plusieurs heures), Spike (très haute, quelques minutes) et Breakpoint (montée jusqu'à rupture).
→ *QA* : base du module « modélisation de charge » ; donne un vocabulaire commun avant d'écrire le premier script.

**k6 — dépôt officiel Grafana**
`https://github.com/grafana/k6` · Dépôt GitHub · dernière release **v2.1.0** (redirection vérifiée : `/releases/latest` → `/releases/tag/v2.1.0`)
Le binaire est en Go avec scripts JS ; la branche majeure est passée en v2.x (attention aux tutoriels écrits pour k6 v0.4x/v1.x).
→ *QA* : à citer pour l'installation et pour vérifier qu'un script généré par IA correspond bien à l'API de la version installée.

**Automated performance testing — Grafana k6**
`https://grafana.com/docs/k6/latest/testing-guides/automated-performance-testing/` · Guide officiel · doc « latest »
Chiffres directement exploitables : un test de charge dure typiquement **3 à 15 minutes**, donc Grafana **déconseille de lancer les gros tests dans un pipeline de déploiement automatique** ; en pré-production, 2 à 3 exécutions/jour ; en production, smoke test **toutes les 5 minutes** avec alerte après **6 échecs consécutifs**.
→ *QA* : contre-argumente le réflexe « on met le test de charge dans la PR » ; excellent support de débat en formation.

**setup-k6-action — GitHub Action officielle Grafana**
`https://github.com/grafana/setup-k6-action` · Dépôt GitHub / Action CI · dernière release **v1.2.1**
Action maintenue par Grafana pour installer et exécuter k6 dans GitHub Actions (complément de `grafana/run-k6-action`).
→ *QA* : brique concrète du TP « pipeline CI » ; le job échoue automatiquement si un threshold est dépassé.

## 4.B Performance en CI et budgets

**Performance budgets 101 — web.dev**
`https://web.dev/articles/performance-budgets-101` · Article Google/Chrome · dernière MAJ 2018-11-05
Valeurs de départ chiffrées : **< 5 s de Time to Interactive** et **< 170 Ko de ressources du chemin critique** (compressées), calibrées sur un mobile de référence en **3G**. Outils cités pour l'intégration build : Webpack performance, bundlesize, Lighthouse CI.
→ *QA* : côté Angular, relie le budget front (taille de bundle) au budget back (p95 API) dans le même pipeline.

**Run Your First Artillery Test — Artillery docs**
`https://www.artillery.io/docs/get-started/first-test` · Doc officielle · MAJ 27 mars 2026
Le plugin `ensure` encode les quality gates en YAML : `thresholds: - http.response_time.p99: 100` et `- http.response_time.p95: 75`, avec `apdex: threshold: 100`. Phases avec `arrivalRate` + `rampTo` (modèle ouvert, ex. 50 nouveaux VUs/s pendant 300 s).
→ *QA* : alternative YAML très lisible à k6 ; utile pour montrer que « scénario réaliste » ≠ « script complexe ».

## 4.C Modélisation open/closed et analyse des résultats

**Open and closed models — Grafana k6**
`https://grafana.com/docs/k6/latest/using-k6/scenarios/concepts/open-vs-closed/` · Doc officielle · doc « latest »
Explique que dans le modèle fermé « les itérations VU ne démarrent que quand la précédente se termine », ce qui provoque la **coordinated omission** (si le système ralentit, le débit d'arrivée baisse et le problème est masqué). k6 implémente le modèle ouvert via **deux exécuteurs** : `constant-arrival-rate` et `ramping-arrival-rate`.
→ *QA* : LE concept que les stagiaires ratent le plus ; explique pourquoi un test « 100 VUs » ne prouve rien sur la capacité réelle de l'API .NET.

**Injection — Gatling documentation**
`https://docs.gatling.io/concepts/injection/` · Doc officielle · modifiée 2026-07-02
API explicite `injectOpen` vs `injectClosed` (simplement `inject` en Scala), en Java/JavaScript/Kotlin/Scala. Exemple de test de capacité : `incrementUsersPerSec(5.0).times(5).eachLevelLasting(10).separatedByRampsLasting(10).startingFrom(10)` → paliers de 10, 15, 20, 25 puis 30 utilisateurs arrivant par seconde.
→ *QA* : montre le même concept open/closed dans un autre outil ; le SDK JavaScript rend Gatling accessible à une équipe Angular.

**Metrics and analysis of load testing, mean and standard deviation — Gatling**
`https://docs.gatling.io/testing-concepts/mean-and-sd/` · Doc officielle · publiée 2025-02-27, modifiée 2026-07-13
Affirmation nette et sourcée : « variance et écart-type n'ont de sens que sur des distributions gaussiennes, **rarement rencontrées en test de charge** » — les cas courants sont multimodaux, à valeurs extrêmes ou à longue traîne, et la moyenne arithmétique est très sensible aux outliers.
→ *QA* : justifie pourquoi on pilote au p95/p99 et jamais à la moyenne ; parfait pour un exercice de critique de rapport généré par IA.

**Apache JMeter User's Manual: Best Practices (§16)**
`https://jmeter.apache.org/usermanual/best-practices.html` · Doc officielle ASF · © 1999–2024
Prescriptions chiffrées : ne jamais utiliser une version antérieure de **plus de 3 versions** à la dernière ; mode CLI obligatoire pour la charge (`jmeter -n -t test.jmx -l test.jtl`) ; interdiction des listeners « View Results Tree »/« View Results in Table » pendant le tir ; sortie CSV plutôt que XML ; §16.2 avertit explicitement du problème de **Coordinated Omission** si le nombre de threads est mal dimensionné.
→ *QA* : la référence pour expliquer pourquoi un tir JMeter en GUI donne des résultats faux — piège classique en entreprise.

## 4.D Écosystème .NET et autres runners

**Overview — NBomber**
`https://nbomber.com/docs/getting-started/overview` · Doc officielle · site © 2026 (bandeau : NBomber Studio 0.8.2, 10 juil. 2026)
API minimale en C#/F# : `Simulation.Inject(rate: 10, interval: TimeSpan.FromSeconds(1), during: TimeSpan.FromSeconds(30))` — soit un modèle ouvert à 10 req/s pendant 30 s. Intégration CI/CD annoncée via **runners xUnit et NUnit**, et débogage des tests de charge dans l'IDE. *(Redirection : `/overview/` → `/overview`.)*
→ *QA* : permet d'écrire les tests de charge de l'API .NET **dans la même solution** que les tests unitaires du TP.

**NBomber — dépôt officiel PragmaticFlow**
`https://github.com/PragmaticFlow/NBomber` · Dépôt GitHub · dernière release **v6.5.0**
Dépôt de référence ; les exemples C# vivent dans `examples/Demo` sur la branche `dev`.
→ *QA* : source d'exemples exécutables à donner en contexte à Claude Code plutôt que de laisser le LLM inventer l'API NBomber.

**BenchmarkDotNet — Overview**
`https://benchmarkdotnet.org/articles/overview.html` · Doc officielle .NET Foundation · © 2013–2024
BenchmarkDotNet **refuse de s'exécuter hors configuration Release** (garde-fou anti-mesure de code non optimisé) ; supporte .NET Framework 4.6+, .NET Core 2.0+, Mono, NativeAOT. Exemple de sortie : Sha256 51,57 µs vs Md5 21,91 µs (± 0,3 µs) ; `MemoryDiagnoser` ajoute les colonnes Gen 0 / Allocated (ex. LINQ 32 B alloués vs 0 B en itératif).
→ *QA* : distingue clairement micro-benchmark (méthode) et test de charge (système) — confusion fréquente chez les stagiaires.

**Investigate performance counters (dotnet-counters)**
`https://learn.microsoft.com/en-us/dotnet/core/diagnostics/dotnet-counters` · Doc Microsoft Learn · ms.date 2025-09-06, page MAJ 2025-12-03
Commande vérifiée : `dotnet-counters collect --process-id 1902 --refresh-interval 3 --format csv`. Depuis **.NET 10.0.100**, exécution sans installation via `dnx dotnet-counters`. Compteurs .NET 9+ exposés en Meter (`dotnet.gc.pause.time`, `dotnet.thread_pool.queue.length`, `dotnet.monitor.lock_contentions`) ; en .NET 8 et antérieur, repli sur les EventCounters `System.Runtime`.
→ *QA* : côté serveur pendant le tir k6 — corrèle un p95 qui dérape avec la file du thread pool ou les pauses GC de l'API .NET.

**What is Locust? — Locust documentation**
`https://docs.locust.io/en/stable/what-is-locust.html` · Doc officielle · version stable **2.46.2** (© 2009-2026)
Scénarios en Python pur ; chaque utilisateur tourne dans **son propre greenlet** (gevent), d'où « des centaines de milliers d'utilisateurs concurrents » en distribué. Pages vérifiées : `running-without-web-ui.html` (CI) et `ai-docs.html` (documentation optimisée pour LLM).
→ *QA* : bonne option si l'équipe QA est Python ; la page « AI-optimized documentation » est un exemple concret de doc pensée pour être ingérée par un agent.

### Pièges vérifiés — Notion 4

- **Migration de la doc k6 confirmée par fetch** : `https://k6.io/docs/` renvoie une **redirection vers `https://grafana.com/docs/k6/latest`**. Tout lien de cours en `k6.io/docs/...` doit être réécrit.
- **Versions à jour au 28/07/2026** (via redirection `/releases/latest`) : k6 **v2.1.0**, Locust **2.46.2**, NBomber **v6.5.0**, Artillery **artillery-2.0.33** (`https://github.com/artilleryio/artillery`), setup-k6-action **v1.2.1**. Un script généré par IA sur la base de k6 v0.4x utilisera des options obsolètes.
- **URL Gatling à ne pas recopier** : `https://docs.gatling.io/reference/script/core/injection/` répond 200 mais son canonical est `https://docs.gatling.io/concepts/injection/` — citer cette dernière.
- **`abortOnFail` k6 n'est évalué qu'à intervalle régulier** : la doc précise que **l'arrêt peut être retardé jusqu'à 60 secondes**. Ne pas promettre un « fail fast » instantané.
- **Coordinated omission signalée indépendamment par k6 et par JMeter** : un test « N VUs » (modèle fermé) auto-régule sa charge quand le système ralentit et masque la dégradation. Utiliser les exécuteurs arrival-rate pour un vrai test de capacité.
- **Limite de collecte assumée** : aucun papier arXiv **spécifique** à la génération de tests de performance par LLM n'a pu être vérifié (API arXiv en 403, moteurs de recherche HTML bloqués). Seul ancrage académique vérifié par fetch : `https://arxiv.org/abs/2308.10620` — *Large Language Models for Software Engineering: A Systematic Literature Review* (Hou et al., v6 du 10/04/2024), **395 articles analysés de janvier 2017 à janvier 2024** — utilisable comme cadrage LLM4SE général, **pas** comme source sur les tests de performance. À compléter avant diffusion.

---

# NOTION 5 — Tests de sécurité applicative (17 sources)

## 5.A Référentiels OWASP (risques et exigences)

**OWASP Top 10:2025 — Introduction et liste des 10 catégories**
`https://owasp.org/Top10/2025/0x00_2025-Introduction/` · Standard OWASP · 2025 (version finale publiée)
8ᵉ édition du Top Ten, construite sur des données de **plus de 2,8 millions d'applications** ; 589 CWE analysés, dont **248 répartis dans les 10 catégories** (moyenne de 25 CWE par catégorie, plafond fixé à 40). Deux nouvelles catégories : A03 Software Supply Chain Failures et A10 Mishandling of Exceptional Conditions ; le SSRF a été fusionné dans A01. *(Redirection vérifiée : `owasp.org/Top10/` → `/Top10/2025/en/` → `/Top10/2025/`.)*
→ *QA* : la référence à jour pour cadrer les cas de test de sécurité.

**OWASP Top 10:2021 (avec traduction française officielle)**
`https://owasp.org/Top10/2021/` · Standard OWASP · 2021
Liste 2021 lue sur la page : A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection, A04 Insecure Design, A05 Security Misconfiguration, A06 Vulnerable and Outdated Components, A07 Identification and Authentication Failures, A08 Software and Data Integrity Failures, A09 Security Logging and Monitoring Failures, A10 SSRF. Version FR sur `/Top10/2021/fr/`.
→ *QA* : indispensable car la majorité des outils d'audit mappent encore sur 2021 ; permet l'exercice de re-mapping 2021 → 2025.

**A03:2025 – Software Supply Chain Failures**
`https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/` · Standard OWASP · 2025
Catégorie classée #1 par **exactement 50 % des répondants** de l'enquête communautaire, alors que seuls **11 CVE** portent les CWE associés (6 CWE mappés). Cite le ver npm auto-propageant **Shai-Hulud (2025), qui a atteint plus de 500 versions de paquets** avant d'être stoppé.
→ *QA* : justifie de placer le scan de dépendances (npm/NuGet) au même niveau que les tests fonctionnels. Contient aussi les références SBOM (CycloneDX, Dependency-Track).

**OWASP Application Security Verification Standard (ASVS) 5.0.0**
`https://owasp.org/www-project-application-security-verification-standard/` · Standard OWASP · v5.0.0, publiée le **30 mai 2025**
La version stable courante est **5.0.0** (et non plus 4.0.3, d'octobre 2021). Format de référence `v<version>-<chapitre>.<section>.<exigence>`, ex. `v5.0.0-1.2.5` = protection contre l'injection de commandes OS. PDF français officiel disponible.
→ *QA* : ASVS fournit des exigences testables une par une — idéal pour générer des cas de test avec Claude Code, contrairement au Top 10 qui reste un document de sensibilisation.

**OWASP Top 10 for LLM Applications & Generative AI (2025)**
`https://genai.owasp.org/llm-top-10/` · Standard OWASP GenAI Security Project · 2025
Liste 2025 : LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM03 Supply Chain, LLM04 Data and Model Poisoning, LLM05 Improper Output Handling, LLM06 Excessive Agency, **LLM07 System Prompt Leakage** et **LLM08 Vector and Embedding Weaknesses** (nouveautés 2025), LLM09 Misinformation, LLM10 Unbounded Consumption. Traduction française listée.
→ *QA* : couvre le risque introduit par l'outil de formation lui-même (Claude Code) — LLM01 et LLM05 sont directement démontrables en TP.

## 5.B DAST — OWASP ZAP en CI

**ZAP – Automation Framework**
`https://www.zaproxy.org/docs/automate/automation-framework/` · Documentation outil · maintenue 2026
Pilotage complet de ZAP via **un seul fichier YAML**. Codes de sortie normalisés : **0** (plan OK), **1** (erreur), **2** (avertissements) — ZAP sort en 2 même si `failOnWarning: false`. Jobs disponibles : `openapi`, `spiderAjax`, `activeScan`, `report`, et désormais `mcp-config` / `mcp-import`.
→ *QA* : le job `openapi` attaque directement le Swagger de l'API .NET, et `spiderAjax` crawle le SPA Angular — les deux briques exactes du TP.

**zaproxy/action-baseline — GitHub Action ZAP**
`https://github.com/zaproxy/action-baseline` · Dépôt GitHub officiel ZAP · v0.15.0, Apache-2.0, 364 étoiles
Action qui exécute le ZAP Baseline scan et **maintient automatiquement une issue GitHub** listant les alertes (fermée quand 0 alerte subsiste). Les faux positifs se filtrent via un fichier TSV `.zap/rules.tsv` au format `10011 IGNORE (Cookie Without Secure Flag)`.
→ *QA* : DAST en CI en ~10 lignes de YAML ; le fichier de règles est un excellent support d'exercice sur le tri des faux positifs.

## 5.C SAST et code scanning

**Code scanning with CodeQL**
`https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning` · Documentation GitHub · à jour 2026
CodeQL traite le code comme une base de données interrogeable. Langages supportés : C/C++, **C#**, Go, Java/Kotlin, **JavaScript/TypeScript**, Python, Ruby, Rust, Swift et workflows GitHub Actions. La page précise explicitement que **PHP et Scala ne sont PAS supportés**. *(Redirection depuis `.../introduction-to-code-scanning/about-code-scanning-with-codeql`.)*
→ *QA* : couvre nativement les deux langages du TP (C# et TypeScript).

**Semgrep — Quickstart**
`https://semgrep.dev/docs/getting-started/quickstart` · Documentation outil · MAJ 28 avril 2026
Installation via `pipx install semgrep` (Python **3.10+** requis), puis `semgrep ci`. Point de conformité important : **seuls les *findings* sont envoyés à la plateforme Semgrep, jamais le code**.
→ *QA* : SAST léger, exécutable en local sans compilation — complément rapide à CodeQL, et argument RGPD/confidentialité à faire valoir en entreprise.

**Copilot Autofix pour code scanning (usage responsable)**
`https://docs.github.com/en/code-security/concepts/code-scanning/autofix-for-code-scanning` · Documentation GitHub (transparency note) · 2026
Autofix génère les correctifs par LLM à partir des alertes CodeQL au format SARIF ; **disponible sans abonnement GitHub Copilot** et supporte **C#, JavaScript/TypeScript**, C/C++, Go, Java/Kotlin, Swift, Python, Ruby, Rust. Limites documentées : **non-déterminisme** (une même alerte peut donner des suggestions différentes) et revue humaine obligatoire ; les données ne servent pas à l'entraînement.
→ *QA* : cas d'école du « LLM qui corrige » — la clause de non-déterminisme fait le lien direct avec la Notion 2.

## 5.D SCA / analyse de dépendances (Angular + .NET)

**Auditing package dependencies for security vulnerabilities (NuGet / .NET)**
`https://learn.microsoft.com/en-us/nuget/concepts/auditing-packages` · Documentation Microsoft Learn · MAJ 5 mai 2026
`NuGetAuditMode` vaut **`all` par défaut dès que le projet cible `net10.0` ou supérieur**, sinon `direct`. Avertissements codifiés **NU1901 (low) → NU1904 (critical)**, NU1905 signalant une source d'audit sans base de vulnérabilités. Pour `dotnet list package --vulnerable`, **`--include-transitive` n'est pas activé par défaut**.
→ *QA* : permet de faire échouer la CI sur les seules vulnérabilités high/critical via `<WarningsAsErrors>$(WarningsAsErrors);NU1903;NU1904</WarningsAsErrors>`.

**npm-audit (npm CLI v11)**
`https://docs.npmjs.com/cli/v11/commands/npm-audit` · Documentation npm · v11.17.0, éditée le 20 avril 2026
`npm audit` sort en code 0 s'il n'y a aucune vulnérabilité ; `--audit-level=moderate` change **le seuil d'échec sans filtrer le rapport affiché**. Depuis npm 7, l'audit passe par le *Bulk Advisory Endpoint*. `npm audit signatures` vérifie les attestations de provenance Sigstore.
→ *QA* : pendant Angular du NuGet audit ; le piège « `--audit-level` ne filtre pas la sortie » est un classique d'examen.

**Dependabot alerts**
`https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-alerts` · Documentation GitHub · 2026
Une alerte est déclenchée dans deux cas seulement : **ajout d'une nouvelle vulnérabilité à la GitHub Advisory Database**, ou **modification du graphe de dépendances**. La doc note la latence : une vulnérabilité récente peut mettre du temps à apparaître dans la base.
→ *QA* : explique pourquoi un scan « vert » hier peut être rouge aujourd'hui sans changement de code — notion de test non déterministe dans le temps.

## 5.E Tests de sécurité assistés par LLM et sources officielles françaises

**Automate security reviews with Claude Code**
`https://claude.com/blog/automate-security-reviews-with-claude-code` · Annonce produit Anthropic · **6 août 2025**
Introduit la commande `/security-review` (injection SQL, XSS, failles d'authentification/autorisation, données mal manipulées, dépendances vulnérables) et l'action GitHub associée. Anthropic documente deux prises réelles sur son propre code : une **RCE exploitable par DNS rebinding** et une **SSRF sur un proxy de credentials**, toutes deux corrigées avant merge. *(Redirection : `anthropic.com/news/...` → `claude.com/blog/...`.)*
→ *QA* : source primaire pour la partie « IA générative appliquée au test de sécurité ».

**anthropics/claude-code-security-review**
`https://github.com/anthropics/claude-code-security-review` · Dépôt GitHub officiel · MIT, 4,5 k étoiles
Action GitHub *diff-aware* (n'analyse que les fichiers modifiés d'une PR), filtrage de faux positifs configurable, timeout par défaut de **20 minutes**. Avertissement explicite du README : **l'action n'est pas durcie contre l'injection de prompt et ne doit servir qu'à relire des PR de confiance**. La commande `/security-review` est personnalisable en copiant `.claude/commands/security-review.md` dans le projet.
→ *QA* : le fichier `security-review.md` est le livrable idéal d'un TP — les stagiaires y ajoutent des règles maison (ex. exigences ASVS v5.0.0).

**PentestGPT: An LLM-empowered Automatic Penetration Testing Tool**
`https://arxiv.org/abs/2308.06782` · Article arXiv (cs.SE/cs.CR) · v2 du 2 juin 2024
Architecture à trois modules auto-interagissants pour compenser la perte de contexte. Gain mesuré de **+228,6 % de complétion de tâches** par rapport au modèle GPT de référence ; l'article relève que les LLM réussissent les sous-tâches (usage d'outils, lecture de sorties) mais **échouent à maintenir une vision intégrée du scénario global**.
→ *QA* : base académique honnête pour expliquer pourquoi l'IA assiste le pentest sans le remplacer.

**Les Essentiels de l'ANSSI — DevSecOps**
`https://messervices.cyber.gouv.fr/guides/devsecops` · Guide ANSSI (collection « Les Essentiels ») · **publié le 13 mars 2024**, v1.0
PDF officiel : `https://messervices.cyber.gouv.fr/documents-guides/anssi_essentiels_devsecops_v1.0.pdf`. L'ANSSI précise que « Les Essentiels » énoncent des **bonnes pratiques indépendantes et complémentaires**, et ne constituent pas des recommandations détaillées comme ses guides techniques.
→ *QA* : caution institutionnelle française pour la partie CI/CD sécurisée.

**Guide RGPD de l'équipe de développement (CNIL)**
`https://github.com/LINCnil/Guide-RGPD-du-developpeur` · Guide CNIL, dépôt officiel LINCnil · GPLv3 + Licence Ouverte 2.0, 1,1 k étoiles
Guide en **18 fiches thématiques**, dont la fiche **11 « Tester vos applications »**, la fiche 09 « Maîtriser vos bibliothèques et vos SDK » et la fiche 18 « Se prémunir contre les attaques informatiques ». Version web officielle annoncée sur `cnil.fr/developpeur`.
→ *QA* : seule source française qui relie explicitement tests applicatifs et conformité RGPD (données de test, minimisation) — angle attendu en formation professionnelle française.

### Pièges vérifiés — Notion 5

- **L'OWASP Top 10:2025 est bien PUBLIÉ, pas en release candidate.** Attention : le **pied de page de la version 2021 affiche encore « Looking for the 2025 Release Candidate? »** — mention obsolète.
- **Toute la numérotation a bougé entre 2021 et 2025** : Injection A03 → **A05** ; Security Misconfiguration A05 → **A02** ; Cryptographic Failures A02 → **A04** ; Insecure Design A04 → **A06**. Surtout : **le SSRF (A10:2021) n'existe plus comme catégorie autonome**, il est absorbé dans A01:2025.
- **Incohérence interne dans la page A03:2025** : le texte annonce « the highest average incidence rate at **5,19 %** » alors que le tableau juste en dessous indique **5,72 %**. Citer le tableau.
- **ASVS : la version courante est 5.0.0**, pas 4.0.3 — les identifiants d'exigences ont changé, toujours préfixer par `v5.0.0-`.
- **CodeQL ne supporte pas PHP ni Scala** (mention explicite dans la doc).
- **`dotnet list package --vulnerable` n'inclut PAS les transitives par défaut** — or la majorité des vulnérabilités NuGet sont transitives.
- **`npm audit --audit-level` ne filtre pas le rapport**, il ne change que le seuil de code de sortie.
- **L'action Claude Code security review n'est pas durcie contre l'injection de prompt** — à ne pas exécuter sur des PR de contributeurs externes non approuvées.
- **Les anciennes URL ANSSI `cyber.gouv.fr/publications/<slug>` sont mortes** : les guides ont migré vers `messervices.cyber.gouv.fr/guides/<slug>`, l'index vers `cyber.gouv.fr/nous-connaitre/publications`.
- **`cnil.fr` renvoie un corps vide au fetch** (rendu client / filtrage) : le guide CNIL a donc été sourcé sur son dépôt GitHub officiel LINCnil, contenu lu et vérifié.
- **Ne jamais citer un identifiant arXiv de mémoire** : `arXiv:2412.17586`, testé pour ce dossier, s'est révélé être un article de génie biomédical sans rapport. Écarté.

---

# NOTION 6 — Tests d'accessibilité (20 sources)

## 6.A Normes internationales (W3C)

**Web Content Accessibility Guidelines (WCAG) 2.2**
`https://www.w3.org/TR/WCAG22/` · Recommandation W3C · 12 décembre 2024
Statut réel vérifié : **W3C Recommendation du 12 décembre 2024** (version datée `https://www.w3.org/TR/2024/REC-WCAG22-20241212/`, première REC en octobre 2023) ; la page signale explicitement « Errata exists ».
→ *QA* : la référence normative à citer dans les critères d'acceptation ; l'existence d'errata justifie de figer la version datée dans la définition de « fait ».

**W3C Accessibility Guidelines (WCAG) 3.0**
`https://www.w3.org/TR/wcag-3.0/` · Working Draft · 03 mars 2026
Toujours **W3C Working Draft** (dernière version `WD-wcag-3.0-20260303`) — donc **non normatif**, aucune obligation de conformité.
→ *QA* : à mentionner en veille uniquement ; interdire de bâtir un plan de tests sur WCAG 3.

**European Union — Web Accessibility Policies (W3C WAI)**
`https://www.w3.org/WAI/policies/european-union/` · Fiche officielle W3C WAI · MAJ 23 juillet 2025
Directive **(UE) 2016/2102** (secteur public) : standard applicable **EN 301 549 v3.2.1**, qui intègre WCAG 2.1 AA verbatim ; l'**EAA (2019/882)** y est fiché « Date enacted 2019-06-27 », scope public **et** privé, WCAG 2.2.
→ *QA* : une seule page pour cadrer les deux directives et savoir quel niveau WCAG viser selon le client (public vs privé).

## 6.B Cadre légal français (RGAA, obligations, ARCOM)

**Critères et tests — RGAA**
`https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/` · Référentiel officiel DINUM · RGAA **4.1.2**
Version courante vérifiée sur le site officiel : **RGAA 4.1.2** (et non 4.1) ; **13 thématiques, 106 critères** de contrôle et leurs tests associés.
→ *QA* : base de la matrice de traçabilité « critère RGAA ↔ cas de test » du TP.

**Rappel du champ d'application — RGAA**
`https://accessibilite.numerique.gouv.fr/obligations/champ-application/` · Obligations légales · RGAA 4.1.2
Article 47 loi n° 2005-102 : assujettissement des entreprises **à partir de 250 millions d'euros de chiffre d'affaires** (moyenne des 3 derniers exercices) ; norme de référence **EN 301 549 V2.1.2 (2018-08)**, soit **WCAG 2.1 niveaux A et AA** ; exemptions datées (bureautique avant 23/09/2018, vidéos avant 23/09/2020, intranets avant 23/09/2019).
→ *QA* : permet de dire en 2 minutes si l'app Angular/.NET du client est dans le périmètre légal.

**Déclaration d'accessibilité — RGAA**
`https://accessibilite.numerique.gouv.fr/obligations/declaration-accessibilite/` · Obligations légales · RGAA 4.1.2
Trois états seulement : **conformité totale / partielle (≥ 50 % des critères) / non-conformité (< 50 % ou pas d'audit valide)** ; validité **3 ans**, ou **18 mois après publication d'une nouvelle version du référentiel** ; réponse aux réclamations sous **1 semaine**, puis saisine du **Défenseur des droits**.
→ *QA* : le seuil de 50 % est un objectif de release chiffrable ; modèle de déclaration réutilisable comme livrable de fin de TP.

**Nouvelle version du RGAA — DesignGouv (DINUM)**
`https://design.numerique.gouv.fr/articles/2026-03-02-rgaa5/` · Article officiel · publié 2 mars 2026
Le **RGAA 5 est en cours de rédaction, publication prévue fin 2026** ; il désignera l'**Arcom comme autorité de contrôle**, créera un **téléservice de dépôt des déclarations**, intégrera **WCAG 2.2** et des critères pour applications mobiles et documents bureautiques ; rappel : **12 à 15 millions de personnes handicapées en France**.
→ *QA* : source à jour pour la partie « ce qui change bientôt » ; les déclarations faites avant la publication restent valables 18 mois.

## 6.C Cadre européen (EAA, directive secteur public)

**European Accessibility Act (EAA) — Commission européenne**
`https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/european-accessibility-act-eaa_en` · Page officielle CE · consultée 28/07/2026
⚠️ **Redirection** : l'ancienne URL `https://ec.europa.eu/social/main.jsp?catId=1202` redirige vers celle-ci. Fait vérifié : les États membres devaient **transposer l'EAA en droit national pour juin 2022** ; périmètre listé (e-commerce, services bancaires, e-books, smartphones, DAB, billettique, transports…).
→ *QA* : sert à expliquer pourquoi un e-commerce privé est concerné, contrairement au seul RGAA public.

**Directive (UE) 2019/882 du 17 avril 2019 (texte officiel)**
`https://eur-lex.europa.eu/eli/dir/2019/882/oj/eng` · EUR-Lex, texte primaire · adoptée 17/04/2019
Métadonnées ELI vérifiées : **date du document 2019-04-17, publication au JO 2019-06-07, entrée en vigueur 2019-06-27**. (Le corps du texte n'est pas restitué au fetch — voir *Pièges vérifiés*.)
→ *QA* : URL stable ELI à mettre dans le support ; l'article 31 porte la date d'application.

**The European Accessibility Act (EAA) — Deque**
`https://www.deque.com/accessibility-compliance/european-accessibility-act-eaa/` · Synthèse éditeur · MAJ 29 juin 2026
Exemption **microentreprises : moins de 10 salariés ET moins de 2 M€ de CA/bilan annuel** ; les sanctions ne sont **pas chiffrées dans la directive** — elle impose seulement des sanctions « effective, proportionate and dissuasive », le montant relevant de chaque État membre.
→ *QA* : coupe court à la question « combien on risque ? » — la réponse dépend du droit national, pas de l'UE.

## 6.D Outillage automatisable (axe, Playwright, Lighthouse, pa11y, Angular)

**dequelabs/axe-core**
`https://github.com/dequelabs/axe-core` · Dépôt officiel Deque, MPL-2.0 · dernière release **4.12.0, 1er juin 2026**
Le README affirme : « With axe-core, you can find **on average 57% of WCAG issues automatically** » ; le projet revendique **zéro faux positif** et est utilisé par **13,1 millions** de dépôts dépendants.
→ *QA* : le chiffre 57 % est LE point d'ancrage pour poser la limite « automatisable vs manuel » dès le début du module.

**axe-core — Rule Descriptions**
`https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md` · Catalogue de règles généré automatiquement · branche `develop`
Décompte effectué sur le fichier : **105 règles documentées** — 60 WCAG 2.0 A/AA, 2 WCAG 2.1 (`autocomplete-valid`, `avoid-inline-spacing`), **1 seule WCAG 2.2 (`target-size`)**, 27 « best practices », 3 AAA, 7 expérimentales, 5 dépréciées.
→ *QA* : montre concrètement que WCAG 2.2 n'est quasiment pas couvert en automatique — argument massue contre le « 100 % vert = conforme ».

**Accessibility testing — Playwright**
`https://playwright.dev/docs/accessibility-testing` · Documentation officielle Microsoft · Playwright stable, 2026
Recette officielle avec **`@axe-core/playwright`** (`https://www.npmjs.com/package/@axe-core/playwright`, API `AxeBuilder` : `.include()`, `.exclude()`, `.disableRules()`, `.withTags()`) ; filtrage WCAG via `withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa'])` ; encadré « Disclaimer » explicite : *« many accessibility problems can only be discovered through manual testing »*.
→ *QA* : code copiable tel quel pour le TP Angular ; le pattern « fixture partagée + snapshot d'empreintes de violations » gère la dette existante sans casser le build.

**Lighthouse accessibility score — Chrome for Developers**
`https://developer.chrome.com/docs/lighthouse/accessibility/scoring` · Documentation Google · MAJ 22 octobre 2025
Le score est une **moyenne pondérée** d'audits **pass/fail sans point partiel**, pondérés **3, 7 ou 10** selon l'impact utilisateur axe ; **55 audits** figurent dans le tableau, et les **audits manuels et « best practices » ne comptent pas dans le score**.
→ *QA* : explique pourquoi un score Lighthouse de 100 ne prouve rien — et pourquoi il ne faut pas en faire un KPI contractuel.

**GoogleChrome/lighthouse-ci**
`https://github.com/GoogleChrome/lighthouse-ci` · Dépôt officiel Google · `@lhci/cli@0.15.x`
Workflow GitHub Actions fourni clé en main (`npm install -g @lhci/cli@0.15.x` puis **`lhci autorun`**) ; annoncé pour « **prevent regressions in accessibility**, SEO, offline support, and performance ».
→ *QA* : la brique « quality gate » du pipeline ; assertions et budgets versionnés dans le repo.

**pa11y/pa11y**
`https://github.com/pa11y/pa11y` · Dépôt officiel, LGPL-3.0 · **Pa11y 9** (Node 20, 22 ou 24)
**Deux runners** au choix ou cumulables : `htmlcs` (HTML_CodeSniffer, par défaut) et `axe` ; standards `WCAG2A` / `WCAG2AA` (défaut) / `WCAG2AAA` ; **exit code 2** en cas d'erreurs, avec `--threshold N` pour tolérer un nombre d'erreurs connu.
→ *QA* : alternative CLI sans framework de test ; le double runner illustre que deux moteurs ne trouvent pas les mêmes défauts.

**Accessibility in Angular**
`https://angular.dev/best-practices/a11y` · Documentation officielle · Angular **v22**
Le CDK fournit le package **`a11y`** (`LiveAnnouncer` pour les régions `aria-live`, directive **`cdkTrapFocus`**) ; **Angular Aria** (nouveau) livre des directives headless pour accordion, combobox, listbox, menu, tabs, toolbar ; `RouterLinkActive` expose **`ariaCurrentWhenActive`**, et la doc impose de **gérer le focus après `NavigationEnd`**.
→ *QA* : les 3 bugs a11y les plus fréquents d'une SPA Angular (focus après navigation, lien actif, contenu `@defer` non annoncé) sont traités ici avec du code.

## 6.E Limites de l'automatisation et IA

**The WebAIM Million — rapport 2026**
`https://webaim.org/projects/million/` · Étude annuelle WebAIM (Utah State University) · données février 2026, page MAJ 30 mars 2026
**95,9 % des 1 000 000 pages d'accueil** présentent des échecs WCAG 2 **détectables automatiquement** (en hausse depuis 94,8 % en 2025) ; **56,1 erreurs par page** en moyenne ; 6 types d'erreurs concentrent **96 %** du total (contraste 83,9 %, alt manquant 53,1 %, labels 51 %). Les pages avec ARIA ont **59,1 erreurs contre 42** sans ARIA.
→ *QA* : chiffres imparables pour ouvrir le module, et le trio contraste/alt/label donne les 3 premiers tests à écrire.

**The Automated Accessibility Coverage Report — Deque**
`https://www.deque.com/automated-accessibility-coverage-report/` · Étude sur données d'audit · MAJ 10 juillet 2026
⚠️ **Redirection** : `https://www.deque.com/automated-accessibility-testing-coverage/` redirige vers cette URL. Sur **13 000+ pages/états et 294 958 problèmes**, **57,38 %** des problèmes ont été trouvés par tests automatisés — **mais seulement 16 des 50 critères de succès WCAG 2.1 AA** ont produit des problèmes automatisés (d'où le fameux « 20-30 % » quand on compte en critères). 100 % manuel pour 2.4.3 Focus Order, 2.4.7 Focus Visible, 1.4.11 Non-text Contrast.
→ *QA* : la source qui réconcilie « 57 % » et « 30 % » — deux façons de compter. À projeter tel quel pour cadrer les attentes du client.

**Axe MCP Server — Deque**
`https://www.deque.com/axe/mcp-server/` · Page produit · MAJ 17 juillet 2026
Serveur **MCP** exposant le moteur axe DevTools et la base de connaissances Deque University aux agents de codage : compatible **GitHub Copilot, Cursor, Claude Code, Windsurf, VS Code**, avec revue/acceptation/rejet des correctifs dans l'IDE.
→ *QA* : le pont direct entre « test d'accessibilité » et « IA générative » — démo possible en TP pour faire corriger des violations axe par un agent, puis re-vérifier avec `@axe-core/playwright`.

### Pièges vérifiés — Notion 6

- **RGAA : la version courante est 4.1.2, pas 4.1.** Confirmé sur `accessibilite.numerique.gouv.fr` (bandeau « RGAA - Version 4.1.2 », téléchargements `RGAA-v4.1.2.odt/pdf`). Le **RGAA 5 est annoncé pour fin 2026**.
- **⚠️ Le montant des sanctions du décret n° 2019-768 n'a PAS pu être vérifié.** `legifrance.gouv.fr` renvoie un corps vide aux clients non-navigateur (SPA rendue en JS) : `https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000038811937` et `https://www.legifrance.gouv.fr/loda/id/JORFTEXT000038811937/` répondent sans contenu. La page DINUM « Obligations légales **et sanctions** » (`design.numerique.gouv.fr/accessibilite-numerique/cadre-legal/`) **ne chiffre aucun montant**. ⇒ **Ne citez aucun montant en euros de mémoire** (ni 20 000 €, ni 25 000 €, ni 50 000 €) : à confirmer manuellement sur Légifrance dans un navigateur, en tenant compte des modifications postérieures (loi SREN / désignation de l'Arcom).
- **⚠️ La date d'application du 28 juin 2025 (EAA) n'a pas pu être extraite d'une source primaire.** EUR-Lex ne restitue pas le corps du texte au fetch. Ce qui **est** vérifié : entrée en vigueur **27 juin 2019** et transposition due **pour juin 2022**. La date d'application figure à l'**article 31** — à lire dans un navigateur avant impression du support.
- **ARCOM n'est pas *encore* formellement le régulateur dans le RGAA en vigueur** : sa désignation est une évolution annoncée du RGAA 5 ; le RGAA 4.1.2 renvoie au **Défenseur des droits**.
- **« 57 % » et « 20-30 % » ne se contredisent pas** : 57,38 % = part des *problèmes* détectés automatiquement ; ~32 % (16/50) = part des *critères de succès* WCAG 2.1 AA touchés. Toujours préciser l'unité de mesure.
- **axe-core ne couvre presque pas WCAG 2.2** : **une seule règle** (`target-size`). Un pipeline « axe vert » ne dit rien de la conformité 2.2.
- **Un score Lighthouse de 100 ne vaut pas conformité** : audits manuels et « best practices » explicitement **exclus du calcul**, chaque audit étant binaire.
- **Redirections rencontrées** : `deque.com/automated-accessibility-testing-coverage/` → `deque.com/automated-accessibility-coverage-report/` ; `ec.europa.eu/social/main.jsp?catId=1202` → `commission.europa.eu/...`.
- **Le RGAA impose WCAG 2.1 AA (via EN 301 549 V2.1.2), pas WCAG 2.2.** Tester en 2.2 est une bonne pratique, mais la norme opposable en France reste 2.1 AA.

---

# NOTION 7 — Tests visuels et UX (20 sources)

## 7.A Régression visuelle avec Playwright

**Visual comparisons | Playwright**
`https://playwright.dev/docs/test-snapshots` · Doc officielle · docs stable v1.62 (© 2026)
Le nom du golden est `example-test-1-chromium-darwin.png` : le suffixe `chromium-darwin` (navigateur + plateforme) est ajouté automatiquement car « les captures diffèrent entre navigateurs et plateformes du fait du rendu, des polices, etc. » ; mise à jour via `npx playwright test --update-snapshots`. L'encadré *warning* liste OS, version, réglages, matériel, **source d'alimentation (batterie vs secteur)** et mode headless comme causes de variation.
→ *QA* : base du TP Angular — première exécution génère la référence, la 2ᵉ compare ; sert à introduire `stylePath` pour masquer les zones volatiles.

**PageAssertions (`toHaveScreenshot`) | Playwright**
`https://playwright.dev/docs/api/class-pageassertions` · Référence API · v1.62
`threshold` = différence de couleur perçue en espace **YIQ**, entre 0 (strict) et 1 (laxiste), **valeur par défaut `0.2`** ; `maxDiffPixels` et `maxDiffPixelRatio` sont **non définis par défaut** ; `animations: "disabled"` et `caret: "hide"` sont les défauts ; masque rose `#FF00FF` ; `scale: "css"` par défaut.
→ *QA* : la source à projeter pour expliquer « pourquoi mon test passe alors que 300 px ont changé » — et pour calibrer un seuil au lieu de le désactiver.

**Docker | Playwright**
`https://playwright.dev/docs/docker` · Doc officielle · v1.62
Image `mcr.microsoft.com/playwright:v1.62.0-noble` (Ubuntu 24.04) ; tags `noble` / `jammy` (22.04) / `resolute` (26.04) ; `--ipc=host` recommandé sinon Chromium peut manquer de mémoire et crasher ; **Alpine/musl non supporté** (Firefox et WebKit sont buildés pour glibc).
→ *QA* : LA solution au problème des snapshots OS-dépendants — on génère et on rejoue les baselines dans le même conteneur qu'en CI.

## 7.B Plateformes de visual testing (SaaS et open source)

**Platform – Validate – Visual AI (Applitools)**
`https://applitools.com/platform/validate/visual-ai` · Page produit · MAJ 2024-02-16 *(redirection depuis `/visual-ai/`)*
Le moteur Visual AI est « un réseau de **centaines d'algorithmes** » mêlant règles codées à la main et deep learning ; il aurait **analysé plus d'1 milliard d'images** depuis son lancement. L'intégration se revendique en « trois lignes de code » remplaçant les assertions.
→ *QA* : contraste pédagogique clé — comparaison perceptuelle « façon œil humain » vs diff pixel de Playwright.

**Platform – Ultrafast Test Grid (Applitools)**
`https://applitools.com/platform/ultrafast-grid` · Page produit · MAJ 2024-12-13 *(redirection depuis `/ultrafast-grid/`)*
Annonce **30× plus rapide** et une réduction de la maintenance des tests d'un **facteur 3,8×** ; le principe est d'uploader des **DOM snapshots** (pas des screenshots) rendus en parallèle dans des **conteneurs, pas des VM**, avec cache des ressources inchangées.
→ *QA* : explique concrètement le « write once, render everywhere » — un seul run local, N combinaisons navigateur/viewport.

**Visual Testing with Percy | BrowserStack Docs**
`https://www.browserstack.com/docs/percy/overview/visual-testing-basics` · Doc officielle · sans date
Chiffres de rétention vérifiés : **projets illimités sur tous les plans**, builds du **plan gratuit expirés au bout de 30 jours** contre **1 an d'historique** sur les autres plans ; auto-approbation par défaut sur la branche principale ; les « changes requested » sont reportés sur les builds suivants tant que le diff est identique.
→ *QA* : montre le workflow d'approbation (baseline / review / merge blocker GitHub), qu'un simple `toHaveScreenshot` n'offre pas.

**Introduction to TurboSnap • Chromatic docs**
`https://www.chromatic.com/docs/turbosnap` · Doc officielle · sans date *(redirection depuis `/turbosnap/`)*
**Tarification vérifiée** : un snapshot capturé = **1 snapshot facturé**, un turbosnap (copié depuis la baseline) = **0,2** (1/5ᵉ). Exemple : Storybook de 50 stories dont 10 impactées → **18 snapshots facturés** (10 × 1 + 40 × 0,2). Rebuild complet forcé si `preview.js`, la config Storybook ou le lockfile changent.
→ *QA* : le seul document du lot qui chiffre le coût du visual testing — excellent pour l'arbitrage « tout snapshoter vs cibler ».

**garris/BackstopJS (GitHub)**
`https://github.com/garris/BackstopJS` · Dépôt officiel · README courant
Défauts documentés : **`misMatchThreshold` = 0.1** (soit 0,10 % de pixels différents tolérés, calcul délégué à Resemble.js) et **`requireSameDimensions` = true** ; moteurs `puppeteer` (Chrome headless) ou `playwright` (Firefox/WebKit) ; filtrage par `--filter=<scenarioLabelRegex>`.
→ *QA* : alternative 100 % open source à comparer chiffre à chiffre avec le `threshold: 0.2` de Playwright (attention : les deux « seuils » ne mesurent pas la même chose).

## 7.C Storybook, composants et instabilité des rendus

**Test runner | Storybook docs**
`https://storybook.js.org/docs/writing-tests/integrations/test-runner` · Doc officielle · Storybook **10.5**
Le test-runner est bâti sur **Jest + Playwright** et accepte un sous-ensemble des options CLI de Jest (`--watch`, `--maxWorkers`, `--browsers firefox chromium`, `--testTimeout`) ; en CI la doc recommande `test-storybook --maxWorkers=2`. Par défaut **la sortie d'erreur est tronquée à 1000 caractères**.
→ *QA* : transforme chaque story en smoke test exécuté sans écrire de spec — parfait pour un design system Angular.

**Accessibility tests | Storybook docs**
`https://storybook.js.org/docs/writing-tests/accessibility-testing` · Doc officielle · Storybook 10.5
L'addon `@storybook/addon-a11y` s'appuie sur **axe-core**, qui détecte automatiquement **jusqu'à 57 % des problèmes WCAG** (étude Deque citée) ; `parameters.a11y.test` accepte `'off' | 'todo' | 'error'` — seul `'error'` fait échouer la CI ; la **règle `region` est désactivée par défaut** ; rulesets par défaut = WCAG 2.0/2.1 A & AA + best practices.
→ *QA* : la stratégie `error` → `todo` → correction progressive est un plan d'action directement transposable en formation.

**Unstable tests debugging • Chromatic docs**
`https://www.chromatic.com/docs/unstable-tests` · Doc officielle · sans date *(redirection depuis `/unstable-tests/`)*
Fenêtre de capture de **15 secondes** ; hauteur de viewport par défaut **900 px** quand la hauteur naturelle est indétectable ; les **emojis sont rendus sous Linux** et différeront toujours de macOS/Windows (« aucune solution de contournement ») ; les polices web chargées tardivement déstabilisent les composants qui mesurent leur texte via `getBoundingClientRect()` → `<link rel="preload">`.
→ *QA* : catalogue prêt à l'emploi des causes de flakiness visuelle (animations, `srcset` + cache, `Date`, aléatoire, CDN d'images).

## 7.D Performance et UX perçue (Core Web Vitals, Lighthouse)

**Web Vitals | web.dev**
`https://web.dev/articles/vitals` · Doc officielle Google · publié 2020-05-04, **MAJ 2024-10-31**
Seuils « good » officiels : **LCP ≤ 2,5 s**, **INP ≤ 200 ms**, **CLS ≤ 0,1**, évalués au **75ᵉ percentile** des chargements, segmentés mobile/desktop. Lighthouse **ne peut pas mesurer INP** (pas d'interaction utilisateur) → utiliser **TBT** comme proxy en labo.
→ *QA* : la page de référence pour poser les 3 métriques et le cycle de vie experimental → pending → stable.

**Interaction to Next Paint (INP) | web.dev**
`https://web.dev/articles/inp` · Doc officielle Google · publié 2022-05-06, **MAJ 2025-09-02**
Barème complet : **≤ 200 ms = good, > 200 et ≤ 500 ms = needs improvement, > 500 ms = poor**. Détail méthodologique : sur les pages à fort trafic d'interactions, **on ignore la pire interaction par tranche de 50** ; les entrées `event` de **moins de 104 ms** ne sont pas remontées par défaut (`durationThreshold`, minimum 16 ms) ; scroll, hover et zoom **ne comptent pas**.
→ *QA* : les 104 ms et le « 1 sur 50 » expliquent les écarts entre mesure maison et CrUX — anti-piège utile.

**INP is now a Core Web Vital | web.dev blog**
`https://web.dev/blog/inp-cwv-launch` · Annonce officielle Google · MAJ 2024-03-12
Fixe la date exacte : **INP a remplacé FID le 12 mars 2024**, et la suppression de FID des API CrUX/PSI au **9 septembre 2024** — en précisant que ce **breaking change ne s'accompagne d'aucun bump de version majeure**.
→ *QA* : à citer pour dater précisément le changement (beaucoup de supports disent encore « FID »).

**Cumulative Layout Shift (CLS) | web.dev**
`https://web.dev/articles/cls` · Doc officielle Google · MAJ 2023-04-12
Détail non présent sur la page « vitals » : **> 0,25 = poor**, fenêtre de session = rafales séparées de **moins d'1 s**, durée max **5 s**, et exclusion des shifts survenus dans les **500 ms** suivant une entrée utilisateur (via `hadRecentInput`).
→ *QA* : indispensable pour écrire une assertion CLS correcte — sans la notion de fenêtre de session, la mesure maison ne correspondra jamais à celle de Google.

**Lighthouse performance scoring | Chrome for Developers**
`https://developer.chrome.com/docs/lighthouse/performance/performance-scoring` · Doc officielle · barème Lighthouse 10
Pondérations **Lighthouse 10** : FCP 10 %, Speed Index 10 %, **LCP 25 %**, **TBT 30 %**, **CLS 25 %** (en v8 : TTI 10 % et CLS seulement 15 %). Courbe log-normale calibrée sur HTTP Archive : le **25ᵉ percentile → score 50**, le **8ᵉ percentile → score 90** ; un LCP de **~1 220 ms** vaut un score de 99. Couleurs : 0-49 rouge, 50-89 orange, 90-100 vert.
→ *QA* : montre que TBT pèse 30 % du score — donc qu'optimiser le JS bloquant est le meilleur levier avant les images.

**CrUX methodology | Chrome for Developers**
`https://developer.chrome.com/docs/crux/methodology` · Doc officielle · MAJ 2024-06-20
Chrome iOS, les WebView Android et **les autres navigateurs Chromium (Edge inclus)** ne remontent aucune donnée ; le seuil de popularité minimal n'est **pas publié** ; un « fuzzing » aléatoire est appliqué au dataset.
→ *QA* : à dire avant tout TP PageSpeed Insights — explique pourquoi le RUM maison et CrUX ne coïncideront jamais exactement.

## 7.E Tests d'ergonomie assistés par IA (recherche)

**Seeing is Believing: Vision-driven Non-crash Functional Bug Detection for Mobile Apps (Trident)**
`https://arxiv.org/abs/2407.03037` · arXiv, cs.SE · v1 juil. 2024, **v2 déc. 2024**
Architecture **multi-agents MLLM** (Explorer, Monitor, Detector) qui infère des oracles visuels à partir de séquences de captures d'écran. Évalué sur **590 bugs non-crash** contre **12 baselines** : gain de **+14 % à +112 % en rappel moyen** et **+108 % à +147 % en précision** ; **43 nouveaux bugs** trouvés sur Google Play, **31 corrigés**.
→ *QA* : preuve chiffrée que le VLM sert d'oracle là où le diff pixel et l'assertion fonctionnelle échouent (bugs logiques sans crash).

**Make LLM a Testing Expert: … Mobile GUI Testing via Functionality-aware Decisions (GPTDroid)**
`https://arxiv.org/abs/2310.15780` · arXiv, cs.SE · oct. 2023, **accepté à ICSE 2024**
Le test GUI est reformulé en tâche de **Q&A** : le LLM « discute » avec l'app, reçoit l'état de la page, produit des scripts, reçoit le feedback, itère. Sur **93 apps du Google Play** : **+32 % de couverture d'activités** face à la meilleure baseline, **31 % de bugs supplémentaires** détectés plus vite, **53 nouveaux bugs** dont **35 confirmés et corrigés**.
→ *QA* : cadre de référence académique pour la démo « l'agent explore l'UI tout seul » — chiffres crédibles à opposer aux promesses marketing.

**WebVoyager: Building an End-to-End Web Agent with Large Multimodal Models**
`https://arxiv.org/abs/2401.13919` · arXiv, ACL 2024 · v4 juin 2024
Plafonne à **59,1 % de taux de réussite** sur 15 sites web réels ; l'évaluateur automatique GPT-4V est en accord à **85,3 %** avec le jugement humain.
→ *QA* : le chiffre à opposer à l'enthousiasme sur les agents qui « testent l'UI tout seuls » — 4 tâches sur 10 échouent encore.

### Pièges vérifiés — Notion 7

- **Redirections constatées** : `applitools.com/platform/ultrafast-grid/` et `/platform/validate/visual-ai/` servent la page sans slash final ; idem `chromatic.com/docs/turbosnap/` et `/docs/unstable-tests/`. Aucune 404 dans la liste finale.
- **URL abandonnée** : `https://applitools.com/docs/topics/overview/visual-ai.html` renvoie un corps **vide** (rendu JS / anti-bot). Le portail doc officiel est `https://applitools.com/docs/index.html`.
- **arXiv non interrogeable en masse** : `arxiv.org/search/?...` et `export.arxiv.org/api/query?...` renvoient un corps vide ; seules les pages `/abs/<id>` sont exploitables. Chaque papier a été vérifié individuellement.
- **`threshold` Playwright ≠ `misMatchThreshold` BackstopJS** : 0.2 chez Playwright = tolérance de **différence colorimétrique par pixel** (espace YIQ) ; 0.1 chez BackstopJS = **pourcentage de pixels différents** sur l'image. Confusion classique en formation.
- **Attention aux dates de « dernière MAJ » trompeuses** : la page Lighthouse scoring affiche « Last updated 2019-09-19 » en pied de page alors qu'elle documente les pondérations de **Lighthouse 10**. Ne pas la présenter comme obsolète.

---

# NOTION 8 — Observabilité et qualité en production (17 sources)

## 8.A Socle OpenTelemetry (spec, semconv, .NET, navigateur)

**Versioning and stability for OpenTelemetry clients**
`https://opentelemetry.io/docs/specs/otel/versioning-and-stability/` · Spécification officielle (statut : Stable) · OTel spec **1.59.0**
Le cycle de vie d'un signal est **Development → Stable → Deprecated → Removed** ; « Experimental » a été renommé « Development ». Une version majeure d'API doit être supportée **au minimum 3 ans** après la sortie de la majeure suivante (SDK et contrib : 1 an).
→ *QA* : cadre exactement ce qu'on peut promettre — traces/métriques/logs stables côté API, mais Profiles et Entities encore en Development. Répond à « peut-on baser nos assertions de test sur ce signal ? ».

**OpenTelemetry semantic conventions 1.43.0**
`https://opentelemetry.io/docs/specs/semconv/` · Spécification (versionnée séparément) · **1.43.0**
Les semconv ont leur **propre numéro de version (1.43.0), distinct de celui de la spec (1.59.0)**. Le registre couvre notamment `feature-flag`, `cicd`, `test`, et un groupe **.NET dédié** (ASP.NET Core, Kestrel, HTTP, DNS, SignalR).
→ *QA* : c'est le contrat de nommage sur lequel écrire des assertions de télémétrie (`http.server.request.duration`, `error.type`). Sans semconv, les tests d'observabilité cassent à chaque montée de version.

**.NET observability with OpenTelemetry**
`https://learn.microsoft.com/en-us/dotnet/core/diagnostics/observability-with-otel` · Doc Microsoft Learn · MAJ 2026-03-30
Particularité .NET : OTel **ne fournit pas d'API d'instrumentation propre**, il réutilise les API du framework — `ILogger<T>`, `System.Diagnostics.Metrics.Meter`, `System.Diagnostics.ActivitySource`/`Activity`. Trois voies : code explicite, EventPipe hors-process, ou startup hook.
→ *QA* : directement applicable au TP Web API. Permet d'instrumenter sans dépendance OTel dans le code métier, donc de tester l'émission de télémétrie avec des `ActivityListener` en test unitaire.

**Browser — OpenTelemetry JavaScript getting started**
`https://opentelemetry.io/docs/languages/js/getting-started/browser/` · Doc officielle OTel · consultée 2026-07-28
Avertissement explicite en tête de page : l'instrumentation client navigateur est **« experimental and mostly unspecified »** (Browser SIG). Le tutoriel repose sur `@opentelemetry/sdk-trace-web`, `@opentelemetry/instrumentation-document-load` et `@opentelemetry/context-zone`, plus une balise `<meta name="traceparent">` générée côté serveur.
→ *QA* : indispensable pour le volet Angular — `context-zone` s'appuie sur Zone.js, et le `traceparent` injecté dans le HTML est la technique concrète pour corréler un test E2E front avec les spans .NET.

## 8.B SLO, SLI et error budgets

**Embracing Risk — Site Reliability Engineering, chapitre 3**
`https://sre.google/sre-book/embracing-risk/` · Livre Google SRE · 2017 (CC BY-NC-ND 4.0)
Une cible de **99,99 % autorise 52,56 minutes d'indisponibilité par an** ; sur un service à 2,5 M requêtes/jour, cela laisse **250 erreurs par jour**. Google mesure le taux d'erreur de fond des FAI entre **0,01 % et 1 %** — descendre sous ce plancher est invisible pour l'utilisateur.
→ *QA* : le chiffre qui fait comprendre pourquoi « 100 % de tests verts » n'est pas l'objectif. Base du calcul d'error budget en exercice.

**Alerting on SLOs — The SRE Workbook, chapitre 5**
`https://sre.google/workbook/alerting-on-slos/` · Livre Google SRE · 2018
Configuration de référence multi-fenêtres / multi-burn-rate pour un SLO 99,9 % : **burn rate 14,4 sur 1 h (fenêtre courte 5 min) = 2 % du budget → page** ; **burn rate 6 sur 6 h (30 min) = 5 % → page** ; **burn rate 1 sur 3 j (6 h) = 10 % → ticket**. La fenêtre courte doit valoir **1/12** de la longue. À 99,999 %, une panne totale épuise le budget en **26 secondes**.
→ *QA* : seuils chiffrés prêts à l'emploi pour l'exercice « transformer un SLO en alerte », et montre pourquoi le paramètre `for:` de Prometheus est un anti-pattern.

## 8.C Déploiement progressif : canary, blue/green, feature flags

**Canarying Releases — The SRE Workbook, chapitre 16**
`https://sre.google/workbook/canarying-releases/` · Livre Google SRE · 2018
Chiffrage clé : une release défectueuse à **20 % d'erreurs déployée sur un canari de 5 %** ne produit qu'un **taux d'erreur global de 1 %**. Google indique qu'une **majorité de ses incidents sont déclenchés par des pushs de binaire ou de configuration**. Recommandation ferme : **un seul canari à la fois**, et intervalle d'agrégation des métriques ≤ durée du canari.
→ *QA* : justifie que le canari est un dispositif de test, pas juste de déploiement. Le piège « métrique horaire sur canari de 30 min » est un excellent cas d'école.

**Canary Deployment Strategy — Argo Rollouts**
`https://argo-rollouts.readthedocs.io/en/stable/features/canary/` · Doc CNCF · version « stable »
Le canari se décrit déclarativement en `steps` (`setWeight`, `pause`, `setCanaryScale`). Valeurs par défaut : **`maxSurge` = 25 %, `maxUnavailable` = 25 %**. Sans traffic management, un `setWeight: 41` sur 10 réplicas donne 4 pods canari. `dynamicStableScale: true` évite de doubler le nombre de pods.
→ *QA* : montre le lien mécanique entre pourcentage de trafic et nombre de pods — utile pour expliquer pourquoi un canari à faible réplication ne donne pas de signal statistique exploitable.

**Deployment Strategies — Flagger (Flux CD)**
`https://docs.flagger.app/usage/deployment-strategies` · Doc CNCF · consultée 2026-07-28
Formules explicites : durée minimale de promotion = **`interval × (maxWeight / stepWeight)`** (soit 25 min pour 1m/50/2) et délai de rollback = **`interval × threshold`**. Le **shadow traffic** s'active par `mirror: true` : chaque requête est dupliquée vers le canari, dont la réponse est **jetée** — à réserver aux opérations idempotentes.
→ *QA* : la seule source officielle qui donne à la fois le calcul de durée et la mise en garde d'idempotence pour le trafic miroir. Parfait pour l'atelier shadow testing.

**Set up staging environments in Azure App Service**
`https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots` · Doc Microsoft Learn · MAJ 2025-11-28
Les slots exigent le tier **Standard, Premium ou Isolated** (Standard = **5 slots max**), sans surcoût. Pendant un swap, App Service attend **90 secondes par requête HTTP de warm-up, avec 5 tentatives** avant abandon. Le routage partiel épingle le client via le cookie **`x-ms-routing-name`** pendant **1 heure**.
→ *QA* : équivalent managé du blue/green pour le TP .NET. Le tableau « swappé / non swappé » (les app settings suivent, les IP restrictions non) est une source classique de bugs de recette.

**OpenFeature Specification — Introduction**
`https://openfeature.dev/specification/` · Spécification CNCF (projet en incubation) · consultée 2026-07-28
Trois statuts de stabilité par section : **Experimental**, **Hardening**, **Stable** — avec la règle explicite « **no explicit status = Experimental** ». Les sections normatives sont celles sous titre H5 contenant un mot-clé RFC 2119 en majuscules, ce qui permet de dériver mécaniquement la liste des assertions de conformité.
→ *QA* : bel exemple de spécification directement traduisible en suite de tests de conformité — et de vocabulaire (provider, evaluation context, hook) réutilisé dans les TP.

**OpenFeature .NET SDK**
`https://openfeature.dev/docs/reference/sdks/server/dotnet` · Doc CNCF · SDK **v2.14.0**, spec **v0.8.0** *(redirection depuis `/docs/reference/technologies/server/dotnet`)*
Depuis la **v2.14, le SDK .NET émet nativement des spans OpenTelemetry pour chaque évaluation de flag, sans aucun hook** (il suffit d'ajouter `.AddSource("OpenFeature")`). Le `MetricsHook` expose `feature_flag.evaluation_requests_total`, `..._success_total`, `..._error_total`. Requiert **.NET 8+**.
→ *QA* : c'est le pont concret flags ↔ observabilité : on peut filtrer les traces d'un incident par `feature_flag.key` et prouver qu'un flag est la cause.

**.NET feature management (Microsoft.FeatureManagement)**
`https://learn.microsoft.com/en-us/azure/azure-app-configuration/feature-management-dotnet-reference` · Doc Microsoft Learn · MAJ 2026-06-22
Les flags se déclarent dans `appsettings.json` sous `feature_management.feature_flags` selon le schéma **`FeatureManagement.v2.0.0.schema.json`**, agnostique du langage. Les **feature filters** (ex. `Microsoft.TimeWindow` avec `Start`/`End`) sont parcourus jusqu'au premier qui active la feature ; si aucun ne répond, la feature est désactivée.
→ *QA* : permet de piloter des flags en test d'intégration ASP.NET Core via `IConfiguration` en mémoire — aucun service externe requis pour l'exercice.

## 8.D Testing in production : chaos et monitoring synthétique

**Principles of Chaos Engineering**
`https://principlesofchaos.org/` · Manifeste communautaire (Netflix et al.) · dernière MAJ **mars 2019**
Définit l'expérience de chaos en **4 étapes** (définir l'état stable mesurable → poser l'hypothèse → introduire des variables du monde réel → tenter de réfuter l'hypothèse) et **5 principes avancés**, dont « Run Experiments in Production » et « **Minimize Blast Radius** ».
→ *QA* : la distinction « le chaos vérifie *que* le système marche, pas *comment* il marche » est exactement la frontière entre test fonctionnel et test de résilience.

**Application Insights availability tests**
`https://learn.microsoft.com/en-us/azure/azure-monitor/app/availability` · Doc Microsoft Learn · MAJ 2026-02-27
Jusqu'à **100 tests de disponibilité par ressource** ; **5 localisations minimum recommandées**, 16 maximum ; seuil d'alerte conseillé = **nombre de localisations − 2**. Microsoft indique qu'**environ 80 % des échecs disparaissent au retry** (3 échecs consécutifs requis pour déclarer un échec). Les tests parsent jusqu'à **15 requêtes dépendantes** et suivent jusqu'à **10 redirections**.
→ *QA* : chiffres parfaits pour discuter du bruit et des faux positifs en monitoring synthétique, et pour relier « test de bout en bout » et « SLI de disponibilité ».

## 8.E DORA et IA appliquée à l'analyse d'incidents

**State of AI-assisted Software Development (rapport DORA 2025)**
`https://dora.dev/research/2025/dora-report/` · Rapport Google Cloud / DORA · **édition 2025** (la plus récente publiée)
Le rapport 2025 pose l'IA comme **amplificateur** : elle magnifie les forces *et* les faiblesses existantes de l'organisation, les gains venant du système sociotechnique plus que de l'outil. Partenaire de recherche premier : IT Revolution ; partenaires : GitHub, GitLab, SkillBench, Workhelix. Infographie PDF sur `dora.dev/research/2025/2025-DORA-Report-Infographic.pdf`.
→ *QA* : cadre honnêtement le discours « l'IA va accélérer les tests » — l'amplification joue dans les deux sens, ce qui justifie d'investir d'abord dans les fondations CI/CD et l'observabilité.

**Automatic Root Cause Analysis via Large Language Models for Cloud Incidents (RCACopilot)**
`https://arxiv.org/abs/2305.15778` · Papier arXiv, cs.SE (Microsoft + UIUC) · v4 nov. 2023
RCACopilot route un incident vers un *incident handler* selon son type d'alerte, agrège les diagnostics runtime, puis prédit la catégorie de cause racine avec une narration explicative. Évalué sur **un an d'incidents réels Microsoft**, il atteint une **précision de RCA allant jusqu'à 0,766** ; le composant de collecte de diagnostics est **en production chez Microsoft depuis plus de quatre ans**.
→ *QA* : chiffre concret pour un module « IA et analyse d'incidents » — 0,766 illustre que le LLM est un accélérateur de triage, pas un oracle, et que la valeur vient surtout de la collecte structurée en amont.

### Pièges vérifiés — Notion 8

- **DORA : pas d'édition 2026 au 28 juillet 2026.** L'index officiel `https://dora.dev/research/` liste les archives 2014→2025 ; la plus récente est **2025**. Le bouton « Full report » ne pointe pas vers un PDF sur dora.dev mais vers `cloud.google.com/dora` (formulaire).
- **Ne pas citer `arxiv.org/abs/2404.17662` pour la RCA.** Cet identifiant, qui circule parfois comme « papier RCA », est en réalité *PLAYER\*: LLM-based Multi-Agent … Murder Mystery Games* — vérifié par fetch. Le bon papier RCA est **2305.15778**.
- **Deux numéros de version OTel à ne pas confondre** : spécification = **1.59.0**, semantic conventions = **1.43.0**. Elles évoluent indépendamment.
- **L'instrumentation navigateur OTel est encore « experimental and mostly unspecified »** — à présenter comme telle pour la partie Angular, jamais comme un standard figé.
- **App Insights : les URL ping tests sont retirés le 30 septembre 2026** et les localisations China East / China North le 1er juillet 2026. Construire le TP sur les **Standard tests** uniquement.
- **Principles of Chaos n'a pas bougé depuis mars 2019** (mention explicite sur la page) — texte fondateur, pas source d'actualité.
- **Redirections constatées** : `openfeature.dev/docs/reference/technologies/server/dotnet` → `…/docs/reference/sdks/server/dotnet` ; `argo-rollouts.readthedocs.io/en/stable/features/canary` → canonical `/features/canary/` ; `arxiv.org/abs/2305.15778` → `…v4`. La doc Flagger vit sur **`docs.flagger.app`** (elle sert du markdown natif), pas sur `flagger.app/docs`.

---

## RÉCAPITULATIF PAR NOTION

| # | Notion | Sources |
|---|--------|---------|
| 1 | IA dans un pipeline CI/CD | 16 |
| 2 | Reproductibilité et versioning des prompts | 16 |
| 3 | Sélection et priorisation des tests en CI | 16 |
| 4 | Tests de performance et de charge | 16 |
| 5 | Tests de sécurité applicative | 17 |
| 6 | Tests d'accessibilité | 20 |
| 7 | Tests visuels et UX | 20 |
| 8 | Observabilité et qualité en production | 17 |
| | **TOTAL** | **138** |

## POINTS À REVÉRIFIER MANUELLEMENT AVANT DIFFUSION DU SUPPORT

1. **Montant des sanctions du décret n° 2019-768** (accessibilité) — Légifrance ne restitue pas son contenu au fetch. À lire dans un navigateur.
2. **Date d'application de l'EAA (art. 31 de la directive 2019/882)** — EUR-Lex ne restitue pas le corps du texte au fetch. Entrée en vigueur (27/06/2019) et échéance de transposition (juin 2022) sont, elles, vérifiées.
3. **Papier arXiv spécifique à la génération de tests de performance par LLM** — non trouvé/non vérifiable dans cet environnement ; à chercher manuellement si le module 4 doit avoir un ancrage académique dédié.
