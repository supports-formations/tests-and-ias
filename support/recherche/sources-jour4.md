# JOUR 4 — Sources vérifiées : maintenance, gouvernance, conformité, risques et valeur
**Formation « Test logiciel avec IA générative » — Human Coders / Evan Boissonnot**
Stack TP : Angular + .NET Web API · Outil principal : Claude Code · Collecte du 28 juillet 2026

> **Méthode.** Chaque URL a été récupérée par requête HTTP réelle avec **lecture du contenu de la page** (et non simple code 200). Les redirections 301/302 sont signalées avec l'URL finale. Aucune URL n'a été inventée ; les sources non vérifiables ont été écartées ou explicitement signalées comme telles. **178 sources uniques**, réparties sur les 10 notions.
>
> ⚠️ Contrainte d'environnement à connaître pour toute recollecte : `curl` est bloqué par le proxy du bac à sable (code `000` / 403 sur CONNECT) sur de nombreux domaines (`arxiv.org`, `learn.microsoft.com`, `docs.github.com`, `iso.org`…) alors que les pages sont vivantes. **Un `curl` en échec ne prouve rien** : refaire la vérification par fetch HTTP applicatif.

---

## ⚠️ AVERTISSEMENTS TRANSVERSES JOUR 4 (à répercuter dans tout le support)

1. **AI Act : le calendrier de 2024 est périmé.** Accord politique « AI omnibus » du **7 mai 2026** (vérifié deux fois, sur le communiqué et sur la page AI Act de la Commission) : haut risque annexe III → **2 décembre 2027**, haut risque intégré aux produits (annexe I) → **2 août 2028**. En revanche le **2 août 2026 est inchangé** (art. 50 transparence, bacs à sable, application générale). Le tracker `artificialintelligenceact.eu` affiche toujours « Last updated: 1 August 2024 » et ignore l'omnibus.
2. **Accord politique ≠ texte en vigueur.** Aucune publication au JOUE du règlement modificatif n'est vérifiable au 28/07/2026 : faire dire aux stagiaires « dates issues de l'accord politique du 7 mai 2026, en attente d'adoption formelle ».
3. **ISTQB : CT-AI ≠ « tester avec l'IA ».** CT-AI (v2.0, publiée 2026 ; v1.0 retirée le 21/04/2027 en anglais) porte sur le test **DES** systèmes IA. Le module qui correspond à cette formation est **CT-GenAI**. CT-AI v2.0 : 40 questions, 29/44 points pour réussir, 60 min.
4. **ISO/IEC 25010:2011 est retirée depuis le 04/03/2024.** L'édition en vigueur est **25010:2023, 9 caractéristiques** ; la qualité en utilisation est passée dans **25019:2023**. Et **ISO/IEC/IEEE 29119-11 est un Technical Report gratuit**, pas une norme : on ne peut pas « être conforme à la 29119-11 ».
5. **OWASP : pas d'édition 2026 du Top 10 LLM.** L'édition courante reste **2025** ; le document daté décembre 2025 est le **Top 10 for Agentic Applications**, une liste distincte. Ne jamais mélanger les deux, ni avec le Top 10 web 2025.
6. **Spec MCP courante = 2025-11-25** (pas 2025-06-18), et le document *Security Best Practices* a été sorti du dossier versionné.
7. **Conventions OpenTelemetry GenAI déménagées** vers le dépôt `open-telemetry/semantic-conventions-genai` ; l'ancienne page `opentelemetry.io` est marquée « no longer maintained », et les spans d'agents sont toujours en statut **Development**, pas stable.
8. **Le mythe 1:10:100 de Boehm** (coût d'un défaut selon la phase) est un « leprechaun » documenté par Bossavit : à n'employer que qualitativement, jamais comme chiffre. De même, le **2,41 T$ du CISQ** est US-only, daté 2022, et inclut 1,52 T$ de dette technique — un **stock**, pas un flux annuel.
9. **L'IA n'accélère pas toujours.** L'étude randomisée METR 2025 mesure **+19 % de temps** avec l'IA chez des développeurs open source expérimentés, alors qu'ils croyaient avoir gagné 20 % : plus de 40 points d'écart entre perception et réalité.
10. **Le dernier rapport DORA publié est celui de 2025** (« AI is an amplifier »), et DORA compte **5 métriques** depuis 2024, pas 4. Idem : WEF *Future of Jobs* 2025 et Stack Overflow 2025 sont les dernières éditions disponibles.
11. **Inversion de vocabulaire Azure/Microsoft Foundry** : dans l'API, `Deprecating` = déprécié et `Deprecated` = **retiré** — l'inverse de la convention Anthropic.
12. **« ZDR = pas de logs » est faux** : chez OpenAI le Zero Data Retention s'applique endpoint par endpoint (exclut assistants/threads/files/batches) et les logs d'abus sont conservés jusqu'à 30 jours par défaut.
13. **ISO/IEC 42001 (certifiable) ≠ ISO/IEC 23894 (guide) ≠ AI Act.** Aucune des deux normes ne donne présomption de conformité : seules les **normes harmonisées du CEN-CENELEC JTC 21** publiées au JOUE le feront (prEN 18286 en enquête publique depuis le 30/10/2025).
14. **Renommages Anthropic (rappel Jours 2-3)** : `docs.anthropic.com` → `platform.claude.com/docs/en/` (API) et `code.claude.com/docs/en/` (Claude Code).

---

# NOTION 1 — Surveillance et maintenance d'agents IA en production (15 sources)

## 1.A Standard d'observabilité : OpenTelemetry GenAI

**Moved: Generative AI semantic conventions | OpenTelemetry**
`https://opentelemetry.io/docs/specs/semconv/gen-ai/` · Doc officielle / norme (OpenTelemetry, projet CNCF) · Semantic conventions 1.43.0 · consultée le 28/07/2026
Page d'atterrissage historique des conventions GenAI : elle affiche désormais un bandeau « Important » indiquant que **les conventions GenAI ont été déplacées vers le dépôt `open-telemetry/semantic-conventions-genai` et que cette page n'est plus maintenue**. Le reste du site reste sur la version 1.43.0 des semantic conventions.
→ *QA* : évite de faire travailler les stagiaires sur une spec figée/abandonnée, et sert d'exemple concret de « source officielle mais périmée » à vérifier avant de bâtir une instrumentation de test.

**OpenTelemetry GenAI Semantic Conventions (README du dépôt)**
`https://raw.githubusercontent.com/open-telemetry/semantic-conventions-genai/main/README.md` · Doc officielle / dépôt normatif · état courant du dépôt · consultée le 28/07/2026
Dépôt officiel qui « étend les OpenTelemetry Semantic Conventions avec les conventions spécifiques GenAI », couvrant **spans, metrics et events pour les clients GenAI, MCP (Model Context Protocol) et les conventions par fournisseur (OpenAI, etc.)** ; les dépendances vers le cœur des semconv sont gérées via l'outil Weaver. Le champ « Schema URL » y est encore marqué `TODO`.
→ *QA* : c'est la référence à citer pour normaliser les traces d'agents, et le `TODO` sur le Schema URL montre bien qu'on est sur une spec en cours de stabilisation.

**Semantic conventions for GenAI agent spans**
`https://raw.githubusercontent.com/open-telemetry/semantic-conventions-genai/main/docs/gen-ai/gen-ai-agent-spans.md` · Doc normative (spec) · état courant · consultée le 28/07/2026
Le document porte le **statut `Development`** (badge bleu) : les valeurs d'opération `create_agent`, `invoke_agent`, `execute_tool`, `invoke_workflow`, `plan`, `retrieval`, `create_memory`… ainsi que tous les attributs `gen_ai.*` (`gen_ai.agent.id`, `gen_ai.agent.name`, `gen_ai.agent.version`, `gen_ai.provider.name`…) sont en Development, alors que seuls les attributs empruntés au cœur (`error.type`, `server.address`, `server.port`, référencés en v1.41.1) sont **Stable**. Nom de span recommandé : `create_agent {gen_ai.agent.name}`.
→ *QA* : permet d'expliquer précisément aux stagiaires quels attributs de trace sont sûrs à figer dans des assertions de test et lesquels vont encore bouger.

## 1.B Télémétrie de l'agent de code (Claude Code)

**Monitoring — Learn how to enable and configure OpenTelemetry for Claude Code**
`https://code.claude.com/docs/en/monitoring-usage` (redirection depuis `https://docs.claude.com/en/docs/claude-code/monitoring-usage`) · Doc officielle éditeur (Anthropic) · état courant · consultée le 28/07/2026
Claude Code exporte des **métriques** (`claude_code.session.count`, `claude_code.cost.usage` en **USD**, `claude_code.token.usage` en **tokens**, `claude_code.lines_of_code.count`, `claude_code.pull_request.count`, `claude_code.commit.count`, `claude_code.code_edit_tool.decision`, `claude_code.active_time.total` en **s**), des **events** (`claude_code.user_prompt`, `claude_code.assistant_response`) et, en bêta, des **traces distribuées** : span racine `claude_code.interaction`, enfants `claude_code.llm_request`, `claude_code.hook`, `claude_code.tool`, ce dernier ayant lui-même `claude_code.tool.blocked_on_user` (temps d'attente d'une décision de permission) et `claude_code.tool.execution`. Un header W3C `traceparent` relie les spans client aux traces serveur ; depuis la **v2.1.216**, l'export `prometheus` seul omet les unités pour rester un scrape valide.
→ *QA* : c'est la source de référence pour instrumenter le TP — on peut mesurer objectivement le coût, le temps humain d'approbation et le nombre de décisions de permission d'une session de test assistée par IA.

## 1.C Maîtrise des coûts, quotas et fiabilité

**Rate limits — Claude Platform Docs**
`https://platform.claude.com/docs/en/api/rate-limits` (redirection depuis `https://docs.claude.com/en/api/rate-limits`) · Doc officielle éditeur · état courant · consultée le 28/07/2026
Deux mécanismes distincts : **spend limits** (plafond mensuel : **Start 500 $, Build 1 000 $, Scale 200 000 $**, Custom sans plafond) et **rate limits** (RPM / ITPM / OTPM par classe de modèle, algorithme **token bucket**, erreur **429** + header `retry-after`). Point clé : **`cache_read_input_tokens` ne compte PAS dans l'ITPM** pour la plupart des modèles (exception Claude Haiku 3.5) — avec une limite de 2 000 000 ITPM et **80 % de cache hit, on traite effectivement 10 000 000 tokens d'entrée par minute**.
→ *QA* : donne des chiffres concrets pour concevoir des tests de charge/robustesse d'un pipeline IA et pour expliquer pourquoi un test « qui passe » en local peut échouer en 429 en CI.

**Model Usage & Cost Tracking — Langfuse**
`https://langfuse.com/docs/observability/features/token-and-cost-tracking` · Doc officielle éditeur (open source) · état courant · consultée le 28/07/2026
Langfuse impose un **contrat de « buckets mutuellement exclusifs »** : chaque token ne doit être compté que dans une seule clé de `usage_details`. Or **OpenAI reporte des compteurs inclusifs** (`prompt_tokens` inclut les tokens cachés) alors qu'**Anthropic exclut déjà cache reads et cache writes** ; exemple documenté : 17 903 prompt tokens dont 17 817 cache hits doivent être stockés comme `input: 86` + `input_cached_tokens: 17817`, sinon le coût affiché **surestime silencieusement** la facture réelle. Gère aussi des **pricing tiers** (ex. tier « Large Context » déclenché à `input > 200 000` tokens).
→ *QA* : cas d'école de bug de mesure — parfait pour un exercice « le dashboard ment, trouvez pourquoi » sur la comptabilité de tokens.

## 1.D Plateformes d'observabilité LLM

**Observability & Application Tracing — Langfuse**
`https://langfuse.com/docs/observability/overview` · Doc officielle éditeur (open source, Langfuse GmbH) · état courant (mention « Langfuse v4 is live ») · consultée le 28/07/2026
Définit le trace comme « log structuré de chaque requête capturant le prompt exact envoyé, la réponse du modèle, l'usage de tokens, la latence et les outils/retrieval intermédiaires ». Précise que **les SDK envoient la télémétrie de façon asynchrone, en file locale et par batchs, donc sans impact sur le temps de réponse applicatif**.
→ *QA* : réponse toute faite à l'objection classique « instrumenter va ralentir mon appli » et cadre conceptuel trace / session / observation pour les TP.

**Tracing quickstart — LangSmith (LangChain docs)**
`https://docs.langchain.com/langsmith/observability-quickstart` · Doc officielle éditeur · état courant · consultée le 28/07/2026
Activation par une seule variable (`LANGSMITH_TRACING=true` + `LANGSMITH_API_KEY`), wrappers `wrap_openai` / `@traceable` (Python, TypeScript, **Java et Kotlin** désormais disponibles). Attention à la **régionalisation** : il faut positionner `LANGSMITH_ENDPOINT` pour les régions GCP EU (`https://eu.api.smith.langchain.com`), GCP APAC ou AWS US, faute de quoi la clé d'API n'est pas reconnue.
→ *QA* : point RGPD/souveraineté directement citable en formation française — le choix de région n'est pas un détail de config mais une condition de fonctionnement.

**What is Arize Phoenix? — AI Observability and Evaluation**
`https://arize.com/docs/phoenix` · Doc officielle éditeur (open source) · état courant · consultée le 28/07/2026
Phoenix est **construit sur OpenTelemetry** et alimenté par l'instrumentation **OpenInference** ; il accepte les traces en **OTLP** et fournit de l'auto-instrumentation pour LlamaIndex, LangChain, DSPy, Mastra, Vercel AI SDK, OpenAI, Bedrock, Anthropic, en Python, TypeScript et Java. Il combine tracing, évaluations (LLM-as-a-judge, code, annotations humaines), prompt playground et datasets/expériences.
→ *QA* : montre le pont concret entre observabilité et évaluation — la même trace sert de preuve de debug et de cas de test rejouable.

**Quickstart — Helicone**
`https://docs.helicone.ai/getting-started/quick-start` · Doc officielle éditeur · état courant · consultée le 28/07/2026
Approche « gateway » plutôt que SDK : on change uniquement la `baseURL` vers `https://ai-gateway.helicone.ai` avec le SDK OpenAI pour logger, observer et bénéficier de fallbacks sur **100+ modèles** (OpenAI, Anthropic, Vertex, Groq…), avec **0 % de markup** sur le prix fournisseur.
→ *QA* : illustre le pattern proxy/gateway, très utile en test pour intercepter, rejouer et plafonner les appels LLM sans toucher au code applicatif.

## 1.E Garde-fous, sécurité et gestion du risque

**NVIDIA NeMo Guardrails Library Developer Guide**
`https://docs.nvidia.com/nemo/guardrails/latest/index.html` · Doc officielle éditeur (NVIDIA) · version « latest » avec guide « Migrating to 0.22 » · consultée le 28/07/2026
Bibliothèque Python open source de garde-fous programmables qui « intercepte les entrées et sorties, applique des contrôles de sécurité configurables et bloque ou modifie le contenu ». Cinq types de rails : **input, retrieval, dialog, execution, output**. Le catalogue couvre content safety, jailbreak detection, topic control, PII, **agentic security**, plus des intégrations communautaires dont **Llama Guard, Presidio, GLiNER PII, Cleanlab, Patronus Lynx**. Observabilité intégrée via **OpenTelemetry (tracing, logs, metrics)**. Dépôt GitHub : `NVIDIA-NeMo/Guardrails`.
→ *QA* : fournit une taxonomie de rails directement transposable en plan de tests (un rail = une famille de cas de test négatifs).

**Llama Guard: LLM-based Input-Output Safeguard for Human-AI Conversations**
`https://arxiv.org/abs/2312.06674` · arXiv (cs.CL), Inan et al. (Meta) · soumis le 7 décembre 2023, v1 · consultée le 28/07/2026
Modèle **Llama2-7b instruction-tuné** sur un jeu de données de sécurité de faible volume, qui réalise à la fois de la **classification de prompt** et de la **classification de réponse** selon une taxonomie de risques ; ses performances égalent ou dépassent celles des outils de modération disponibles sur OpenAI Moderation Evaluation dataset et ToxicChat. La taxonomie est adaptable par prompting zero-shot / few-shot.
→ *QA* : papier fondateur pour expliquer que « tester la sécurité d'un LLM » = tester deux surfaces distinctes (entrée et sortie), avec une taxonomie explicite et donc auditable.

**OWASP Top 10 for LLM Applications 2025**
`https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/` · Référentiel communautaire de référence (OWASP GenAI Security Project) · publié le 17 novembre 2024, page mise à jour le 28 avril 2025 · consultée le 28/07/2026
Édition 2025 du Top 10 spécifique aux applications LLM, issue d'un effort communautaire démarré en 2023. La même bibliothèque de ressources héberge des publications plus récentes directement pertinentes pour les agents : **« State of Agentic AI Security and Governance 2.01 » (1er juin 2026)** et le crosswalk **« AIUC-1 / OWASP Top 10 For Agentic Applications » (25 mai 2026)**.
→ *QA* : base de départ pour construire une checklist de tests de sécurité, et les documents 2026 montrent que le référentiel « agentique » est désormais distinct du Top 10 LLM classique.

**Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1)**
`https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf` · Norme / publication gouvernementale (NIST Trustworthy and Responsible AI) · **juillet 2024** · consultée le 28/07/2026
Profil compagnon de l'AI RMF 1.0 : il dresse une « Overview of Risks Unique to or Exacerbated by GAI » et propose pour chacun un ensemble d'**actions suggérées** rattachées aux fonctions Govern/Map/Measure/Manage. Le risque n° 2 est la **« Confabulation »**, définie comme « la production de contenu erroné ou faux énoncé avec assurance ».
→ *QA* : donne un vocabulaire normatif (et un mot plus juste que « hallucination ») pour rédiger des critères d'acceptation et documenter la couverture de risque d'une recette IA.

## 1.F Recherche : observabilité des agents

**AgentOps: Enabling Observability of LLM Agents**
`https://arxiv.org/abs/2411.05285` · arXiv (cs.AI / cs.SE), Dong, Lu & Zhu (CSIRO Data61) · soumis le 8 novembre 2024, **v2 du 30 novembre 2024**, 12 pages · consultée le 28/07/2026
Propose une **taxonomie AgentOps** issue d'une *systematic mapping study* des outils existants, identifiant les artefacts et données à tracer **sur l'ensemble du cycle de vie de l'agent**. Argument central : les agents étant autonomes, non déterministes et en évolution continue, l'observabilité est une condition de la sûreté, pas un confort d'exploitation.
→ *QA* : la référence académique à citer pour justifier « pourquoi tracer un agent ne se résume pas à logger les prompts », et un modèle de check-list de complétude de télémétrie.

---

# NOTION 2 — Évaluation des sorties d'un LLM (14 sources)

## 2.A Papiers fondateurs LLM-as-a-judge et biais des juges

**Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena**
`https://arxiv.org/abs/2306.05685` · arXiv (cs.CL), Zheng et al. — **NeurIPS 2023 Datasets and Benchmarks Track** · soumis le 9 juin 2023, v4 du 24 décembre 2023 · consultée le 28/07/2026
Papier fondateur : il introduit MT-Bench (questions multi-tours) et Chatbot Arena, et **nomme explicitement les biais des juges — position, verbosité, auto-valorisation (self-enhancement) — ainsi que leurs capacités de raisonnement limitées**. Résultat le plus cité : un juge fort comme GPT-4 atteint **plus de 80 % d'accord avec les préférences humaines, soit le même niveau que l'accord entre humains**. Données publiées : **3 000 votes d'experts et 30 000 conversations**.
→ *QA* : c'est LA source à montrer pour poser le seuil « un juge LLM vaut à peu près un annotateur humain, pas mieux », et pour introduire l'accord inter-annotateurs comme référentiel.

**Large Language Models are not Fair Evaluators**
`https://arxiv.org/abs/2305.17926` · arXiv (cs.CL), Wang et al. · soumis le 29 mai 2023, v2 du 30 août 2023 · consultée le 28/07/2026
Démonstration spectaculaire du **biais de position** : en changeant simplement l'ordre d'apparition des réponses dans le contexte, **Vicuna-13B « bat » ChatGPT sur 66 des 80 requêtes testées** avec ChatGPT comme évaluateur. Les auteurs proposent trois correctifs : Multiple Evidence Calibration, **Balanced Position Calibration** (agréger sur plusieurs ordres) et Human-in-the-Loop Calibration guidée par une entropie de diversité de position.
→ *QA* : chiffre choc pour faire comprendre qu'un eval LLM sans permutation d'ordre est un test non fiable — et le correctif (swap A/B) est implémentable en 5 lignes dans un TP.

**LLM Evaluators Recognize and Favor Their Own Generations**
`https://arxiv.org/abs/2404.13076` · arXiv (cs.CL), Panickssery, Bowman & Feng · soumis le 15 avril 2024 · consultée le 28/07/2026
Établit un lien **causal, et linéairement corrélé après fine-tuning, entre la capacité d'auto-reconnaissance d'un LLM et la force de son biais d'auto-préférence** : GPT-4 et Llama 2 distinguent leurs propres sorties de celles d'autres modèles et d'humains avec une précision non triviale, et les notent plus haut que ne le feraient des annotateurs humains.
→ *QA* : justification technique de la règle d'hygiène « ne jamais faire juger une sortie de modèle X par le modèle X » dans un pipeline de test.

**Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference**
`https://arxiv.org/abs/2403.04132` · arXiv (cs.AI), Chiang et al. (LMSYS / UC Berkeley) · soumis le 7 mars 2024 · consultée le 28/07/2026
Décrit la méthodologie de comparaison **par paires crowdsourcées** et les méthodes statistiques de classement, sur la base de **plus de 240 000 votes** collectés à la date du papier. Les auteurs vérifient que les questions crowdsourcées sont suffisamment diverses et discriminantes et que **les votes de la foule concordent avec ceux d'évaluateurs experts**.
→ *QA* : modèle méthodologique pour organiser une évaluation humaine par paires en interne (plutôt que des notes absolues), plus fiable et plus facile à agréger.

## 2.B Statistique, taille d'échantillon et intervalles de confiance

**Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations**
`https://arxiv.org/abs/2411.00640` · arXiv (stat.AP / cs.CL), Evan Miller (Anthropic) · soumis le 1er novembre 2024, 14 pages · consultée le 28/07/2026
Thèse centrale : **« les évaluations sont des expériences »**, et la littérature sur les evals a largement ignoré la statistique expérimentale. Le papier conceptualise les questions d'eval comme tirées d'une **super-population non observée** et fournit les formules pour analyser des résultats, **mesurer une différence entre deux modèles** et **dimensionner l'expérience**, avec des recommandations explicites de reporting minimisant le bruit statistique.
→ *QA* : indispensable pour répondre à « mon score est passé de 82 % à 84 %, est-ce une amélioration ? » — la réponse est un intervalle de confiance, pas un chiffre.

## 2.C Méthode côté éditeur (Anthropic)

**Define success criteria and build evaluations — Claude Platform Docs**
`https://platform.claude.com/docs/en/test-and-evaluate/develop-tests` · Doc officielle éditeur (Anthropic) · état courant · consultée le 28/07/2026
Méthode SMART appliquée aux critères de succès, avec un exemple de reformulation directement citable : au lieu de « sorties sûres », écrire **« moins de 0,1 % des sorties sur 10 000 essais signalées comme toxiques par notre filtre de contenu »**. Trois principes de conception d'evals : **être spécifique à la tâche**, **automatiser dès que possible**, et **privilégier le volume à la qualité** (« plus de questions avec un grading automatique légèrement plus bruité vaut mieux que peu de questions notées à la main »). Hiérarchie de grading : code > LLM > humain, avec pour le grading LLM des rubriques détaillées, une sortie contrainte (`correct`/`incorrect` ou 1–5) et un raisonnement demandé **puis jeté**.
→ *QA* : c'est le squelette de cours prêt à l'emploi pour la partie « comment écrire un critère d'acceptation testable sur une sortie non déterministe ».

**Using the Evaluation Tool — Claude Platform Docs (Console)**
`https://platform.claude.com/docs/en/test-and-evaluate/eval-tool` · Doc officielle éditeur (Anthropic) · état courant · consultée le 28/07/2026
L'onglet **Evaluate** de la Claude Console exige que le prompt contienne **au moins 1–2 variables dynamiques en double accolades `{{variable}}`** pour créer un jeu de tests. Fonctions : génération de cas de test par Claude, import CSV, **comparaison côte à côte**, **notation qualité sur une échelle à 5 points**, et **versionnage de prompt** avec re-run de toute la suite d'evals.
→ *QA* : outil no-code pour faire manipuler la boucle « prompt → suite d'evals → régression » à des testeurs non développeurs, avant de passer au code.

## 2.D Frameworks d'évaluation open source

**Intro | Promptfoo**
`https://www.promptfoo.dev/docs/intro/` · Doc officielle éditeur (open source, MIT) · **dernière mise à jour le 27 juillet 2026** · consultée le 28/07/2026
CLI et bibliothèque open source d'évaluation **et de red teaming** (**23,6 k étoiles GitHub** affichées), utilisable en CLI, en librairie Node ou en **CI/CD via GitHub Action**, avec cas de test déclaratifs sans notebook, caching, concurrence et live reload. Positionnement revendiqué : **« test-driven LLM development, not trial-and-error »**, exécution 100 % locale.
→ *QA* : l'outil le plus proche de la culture QA classique (fichier de config + matrice de résultats + intégration CI), idéal pour le TP Angular/.NET.

**DeepEval 5-min Quickstart**
`https://deepeval.com/docs/getting-started` · Doc officielle éditeur (Confident AI, Apache 2.0) · bandeau **« DeepEval 4.0 just got released »** · consultée le 28/07/2026
Framework construit **sur Pytest** : `deepeval test run test_example.py`, `assert_test(test_case, [metric])`, métriques scorées **de 0 à 1 avec un `threshold`** (0.5 par défaut dans l'exemple) qui décide du pass/fail. Distingue **evals end-to-end** (boîte noire) et **evals au niveau composant** via tracing `@observe`, avec évaluation **en ligne sur le trafic de production**. Attention : la doc précise que **presque toutes les métriques DeepEval, y compris `GEval`, sont des métriques LLM-as-a-judge** et nécessitent donc une clé de modèle juge.
→ *QA* : le pont le plus direct entre « tests unitaires » et « evals » — un testeur qui connaît Pytest est opérationnel en quelques minutes.

**Ragas — Introduction**
`https://docs.ragas.io/en/stable/` · Doc officielle éditeur (open source) · dernière édition doc : 9 décembre 2025 · consultée le 28/07/2026
Bibliothèque pour « passer des *vibe checks* à des boucles d'évaluation systématiques ». Catalogue de métriques structuré : **RAG** (Context Precision, Context Recall, Faithfulness, Noise Sensitivity, Response Relevancy), **agents / tool use** (Topic Adherence, **Tool Call Accuracy**, **Tool Call F1**, **Agent Goal Accuracy**), SQL, rubriques génériques, et métriques NLP traditionnelles (BLEU, ROUGE, chrF, exact match). **Le dépôt est désormais `vibrantlabsai/ragas`** (et non plus `explodinggradients/ragas`).
→ *QA* : fournit un vocabulaire métrique prêt à l'emploi pour évaluer un agent qui appelle des outils — exactement le cas d'un agent de test sur une Web API .NET.

**Inspect — An open-source framework for large language model evaluations**
`https://inspect.aisi.org.uk/` · Doc officielle (**UK AI Security Institute**, co-développé avec **Meridian Labs**) · framework publié en mai 2024, doc à l'état courant · consultée le 28/07/2026
Architecture en trois briques composables : **Dataset → Solver → Scorer**. Comprend **plus de 200 évaluations pré-construites** prêtes à lancer sur n'importe quel modèle, un viewer web, une extension VS Code, un **sandboxing** (Docker, Kubernetes, Modal, Proxmox, Vagrant), un mécanisme de **Tool Approval** (approbation d'appels d'outils) et la capacité de **piloter des agents externes réels comme Claude Code, Codex CLI et Gemini CLI**. Scorer par modèle : `model_graded_qa()`.
→ *QA* : source la plus crédible institutionnellement, et le seul framework du lot qui sait évaluer **Claude Code lui-même** en tant qu'agent sous test.

**Holistic Evaluation of Language Models (HELM) — CRFM HELM**
`https://crfm-helm.readthedocs.io/en/latest/` · Doc officielle académique (Stanford CRFM) · **entré en maintenance mode le 1er juin 2026** · consultée le 28/07/2026
Framework Python de référence pour l'évaluation **holistique, reproductible et transparente** de modèles de fondation : datasets standardisés (MMLU-Pro, GPQA, IFEval, WildBench), interface unifiée multi-fournisseurs, et surtout **des métriques au-delà de la seule exactitude (efficacité, biais, toxicité)**. Leaderboards phares : HELM Capabilities, HELM Safety, VHELM. Le papier fondateur (Liang et al.) est publié dans **TMLR 2023**. ⚠️ Un bandeau annonce que **HELM est en maintenance mode depuis le 1er juin 2026**.
→ *QA* : illustre le principe « multi-métrique » (on ne résume pas la qualité à un score), tout en servant d'avertissement sur la durée de vie des benchmarks académiques.

## 2.E Évaluation intégrée aux plateformes d'observabilité

**LLM-as-a-Judge — Langfuse**
`https://langfuse.com/docs/evaluation/evaluation-methods/llm-as-a-judge` · Doc officielle éditeur · état courant · consultée le 28/07/2026
Décrit les 4 blocs d'un prompt de juge (critères/rubrique, contexte d'entrée, sortie à évaluer, référence optionnelle) et trois types de scores : **numérique, catégoriel, booléen**. Chiffres directement citables issus de la FAQ : les juges LLM forts atteignent **80–90 % d'accord avec les évaluateurs humains**, comparable à l'accord inter-annotateurs humain, et **une évaluation coûte typiquement 0,01 à 0,10 $**. Le **sampling est appliqué par évaluateur** (deux évaluateurs à 5 % ne notent pas le même échantillon). ⚠️ **Les évaluateurs au niveau trace sont dépréciés** au profit des évaluateurs au niveau observation.
→ *QA* : montre comment industrialiser un juge en production (échantillonnage, coût, debug via traces dédiées `langfuse-llm-as-a-judge`) et non seulement en labo.

**Evaluate systematically — Braintrust**
`https://www.braintrust.dev/docs/evaluate` (redirection depuis `https://www.braintrust.dev/docs/guides/evals`) · Doc officielle éditeur · état courant · consultée le 28/07/2026
Formalise un cycle d'évaluation en 5 étapes : **itérer en playground → promouvoir en experiment (snapshot immuable) → automatiser en CI/CD sur chaque pull request → scorer en production via online scoring → réinjecter les traces intéressantes dans les datasets**. Distingue **offline** (dataset connu, résultats reproductibles et comparables) et **online** (pas de vérité terrain, donc recours au LLM-as-a-judge, exécuté de façon asynchrone sans impact sur la latence). Anatomie d'une eval : **Data + Task + Scorers/Classifiers**.
→ *QA* : c'est la description la plus proche d'un cycle QA classique (campagne de tests → non-régression en CI → monitoring en prod) et donc le meilleur schéma pédagogique pour un public testeur.

---

## ⚠️ Pièges et erreurs répandues (notions 1-2)

1. **« Les conventions OTel GenAI sont sur opentelemetry.io »** — FAUX depuis peu : elles ont été **déplacées dans le dépôt dédié `open-telemetry/semantic-conventions-genai`**, et la page `opentelemetry.io/docs/specs/semconv/gen-ai/` affiche explicitement « no longer maintained ». Les semantic conventions cœur sont en 1.43.0.
2. **« Les spans d'agents OTel sont stables »** — FAUX : le document `gen-ai-agent-spans.md` porte le statut **Development**, et toutes les valeurs `gen_ai.operation.name` (`invoke_agent`, `execute_tool`, `plan`…) sont en Development. Seuls des attributs empruntés au cœur (`error.type`, `server.address`) sont Stable. Ne pas figer d'assertions dessus sans mécanisme de tolérance.
3. **Domaines Anthropic renommés** — `docs.anthropic.com` → `docs.claude.com` → **redirige aujourd'hui vers `platform.claude.com/docs/...` pour l'API et `code.claude.com/docs/...` pour Claude Code**. Tout support de cours contenant d'anciennes URL est à repasser.
4. **HELM présenté comme le benchmark vivant de référence** — il est **en maintenance mode depuis le 1er juin 2026**. À citer comme repère méthodologique (multi-métrique), pas comme leaderboard à jour.
5. **Ragas : mauvais dépôt** — le projet est maintenant sous **`vibrantlabsai/ragas`**, plus `explodinggradients/ragas`. Idem pour NeMo Guardrails, désormais sous **`NVIDIA-NeMo/Guardrails`**.
6. **Double comptage des tokens cachés** — beaucoup de dashboards maison surestiment les coûts parce qu'**OpenAI reporte des compteurs inclusifs** (`prompt_tokens` contient les `cached_tokens`) alors qu'**Anthropic reporte des compteurs déjà exclusifs**. Langfuse documente l'exemple 17 903 → `input: 86` + `input_cached_tokens: 17817`.
7. **« Tous les tokens comptent dans le rate limit »** — FAUX chez Anthropic : `cache_read_input_tokens` **ne compte pas** dans l'ITPM (sauf Claude Haiku 3.5). Avec 80 % de cache hit sur 2 M ITPM, on traite effectivement 10 M tokens/min. Un test de charge dimensionné sans tenir compte du cache est faux d'un facteur 5.
8. **Confondre « 80 % d'accord » et « 80 % de justesse »** — le chiffre de MT-Bench est un **taux d'accord avec les humains, au niveau de l'accord inter-humains**, pas une exactitude absolue. Le plafond de qualité d'un juge LLM est donc l'accord inter-annotateurs, à mesurer sur son propre corpus.
9. **Juger un modèle par lui-même** — biais d'auto-préférence **causalement** lié à l'auto-reconnaissance (arXiv 2404.13076). Règle : juge ≠ modèle sous test.
10. **Oublier de permuter l'ordre** — sans Balanced Position Calibration, l'ordre A/B suffit à inverser un classement (66/80 requêtes, arXiv 2305.17926). Toute comparaison par paires doit être exécutée dans les deux sens.
11. **Comparer deux scores d'eval sans barre d'erreur** — une eval est une expérience statistique ; sans intervalle de confiance ni dimensionnement d'échantillon (arXiv 2411.00640), un écart de quelques points ne signifie rien.
12. **Évaluateurs Langfuse au niveau trace** — **dépréciés** au profit des évaluateurs au niveau observation (nouveau modèle de données, Langfuse v4). Un support de cours de 2025 est déjà obsolète sur ce point.
13. **LangSmith sans région** — sans `LANGSMITH_ENDPOINT` positionné (ex. `https://eu.api.smith.langchain.com`), la clé d'API d'un compte EU n'est tout simplement pas reconnue : ce n'est pas un réglage optionnel de conformité, c'est une condition de fonctionnement.
14. **« Instrumenter ralentit l'application »** — Langfuse documente explicitement un envoi **asynchrone, en file locale et par batchs**, sans impact sur le temps de réponse. L'objection ne tient pas.
# NOTION 3 — Biais, dérive de modèle et validation continue (14 sources)

> Toutes les URL ci-dessous ont été récupérées et lues par fetch HTTP réel le 28/07/2026. Les redirections observées sont signalées explicitement.

## 3.A — Dérive : model drift, data drift, concept drift (définitions & détection)

**How is ChatGPT's behavior changing over time?**
`https://arxiv.org/abs/2307.09009` · arXiv (cs.CL), Chen, Zaharia & Zou (Stanford / Berkeley) · v1 18 juil. 2023, dernière révision v3 31 oct. 2023 · consultée le 28/07/2026
Étude fondatrice du « behavior drift » d'un service LLM : entre mars et juin 2023, GPT-4 passe de **84 % à 51 % d'exactitude** sur l'identification nombres premiers/composés, tandis que GPT-3.5 s'améliore sur la même tâche ; les deux modèles produisent **plus d'erreurs de formatage dans le code généré** en juin qu'en mars. Les auteurs relient une grande part des dérives à une baisse de la capacité à suivre les instructions utilisateur et concluent sur la nécessité d'un « continuous monitoring » des LLM.
→ *QA* : c'est LE cas d'école pour justifier une suite de tests de non-régression exécutée à chaque changement de modèle, même quand le nom du modèle ne change pas.

**Learning under Concept Drift: A Review**
`https://arxiv.org/abs/2004.05785` · arXiv (revue de littérature, publiée dans IEEE TKDE), Lu et al. · 2020 · consultée le 28/07/2026
Revue de référence de **plus de 130 publications** qui structure le domaine en trois composants : *détection* du drift, *compréhension* du drift, *adaptation* au drift ; elle recense **10 jeux de données synthétiques et 14 jeux de données benchmark** publics pour évaluer les algorithmes en présence de dérive.
→ *QA* : fournit le vocabulaire rigoureux (concept drift ≠ data drift ≠ model decay) et la trame « détecter / comprendre / adapter » réutilisable pour construire un plan de surveillance de suite de tests IA.

**AI Risk Management Framework**
`https://www.nist.gov/itl/ai-risk-management-framework` · Page officielle NIST (cadre AI RMF 1.0, NIST AI 100-1) · publié 26 janv. 2023, page mise à jour le **10 juin 2026** · consultée le 28/07/2026
Le cadre volontaire structuré en 4 fonctions (Govern / Map / Measure / Manage) reste la référence pour la surveillance continue des systèmes d'IA ; état courant à juillet 2026 : **« The AI RMF 1.0 is being revised »**, et le **7 avril 2026** NIST a publié une note de concept pour un profil « Trustworthy AI in Critical Infrastructure ». Le profil IA générative (NIST AI 600-1) date du 26 juillet 2024.
→ *QA* : donne un cadre normatif reconnu pour ancrer la « validation continue » dans un vocabulaire d'audit (Measure = mesure de performance dans le temps), avec la précision qu'une révision est en cours.

## 3.B — Dépréciation, retrait et migration de modèles

**Model deprecations**
`https://platform.claude.com/docs/en/about-claude/model-deprecations` · Documentation officielle Anthropic · à jour au 28/07/2026 · consultée le 28/07/2026
⚠️ *Redirection* : `https://docs.claude.com/en/docs/about-claude/model-deprecations` → `https://platform.claude.com/docs/en/about-claude/model-deprecations`.
Cycle de vie en 4 états (**Active / Legacy / Deprecated / Retired**), avec un préavis d'au moins **60 jours** avant retrait pour les modèles publics. État courant : `claude-opus-4-1-20250805` déprécié le **5 juin 2026**, retrait le **5 août 2026** ; `claude-sonnet-4` et `claude-opus-4` **retirés le 15 juin 2026** ; `claude-3-7-sonnet` et `claude-3-5-haiku` **retirés le 19 février 2026** ; `claude-opus-5` actif, retrait « pas avant le 24 juillet 2027 ». À noter aussi : `temperature`, `top_p` et `top_k` sont **dépréciés à partir de Claude Opus 4.7** et renvoient une erreur 400 si valorisés hors défaut.
→ *QA* : permet de faire l'exercice « mon pipeline de tests appelle-t-il un modèle qui meurt dans 60 jours ? » et d'introduire l'audit d'usage via l'export CSV de la page Usage de la console.

**Commitments on model deprecation and preservation**
`https://www.anthropic.com/research/deprecation-commitments` · Billet de recherche officiel Anthropic (Alignment) · 4 nov. 2025 · consultée le 28/07/2026
Anthropic s'engage à **préserver les poids de tous les modèles publiés au minimum pendant la durée de vie de l'entreprise** et à produire un « post-deployment report » (entretien avec le modèle) avant chaque retrait ; le texte reconnaît explicitement que le retrait « restreint la recherche sur les modèles passés » et que le coût de service croît **linéairement avec le nombre de modèles servis**.
→ *QA* : montre que la reproductibilité d'un benchmark de test n'est pas garantie dans le temps — argument pour figer les artefacts (prompts, réponses, snapshots) plutôt que de compter sur la disponibilité du modèle.

**Microsoft Foundry Models lifecycle and support policy**
`https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements` · Documentation officielle Microsoft Learn · mise à jour le **24 juillet 2026** · consultée le 28/07/2026
⚠️ *Redirection* : `.../azure/ai-foundry/openai/concepts/model-retirements` → `.../azure/foundry/openai/concepts/model-retirements` (le service a été renommé « Microsoft Foundry »).
Politique chiffrée : date de retrait fixée programmatiquement à **18 mois** après la GA, passage en « Deprecated » à **12 mois**, modèle de remplacement déclaré seulement **90 à 120 jours** avant le retrait, préavis d'au moins **60 jours** (GA) ou **30 jours** (preview), et après retrait toute inférence renvoie **`410 Gone`**. Piège documenté : dans l'API `lifecycleStatus`, la valeur `"Deprecated"` signifie **retiré**, et `"Deprecating"` signifie déprécié.
→ *QA* : excellent support pour un TP « écrire un test de garde qui échoue si le modèle utilisé est à moins de N jours de son retirement date ».

**Upgrade between model versions (Migration guide)**
`https://platform.claude.com/docs/en/about-claude/models/migration-guide` · Documentation officielle Anthropic · à jour au 28/07/2026 · consultée le 28/07/2026
Guide officiel de migration entre versions de modèles Claude, référencé depuis la page Model deprecations comme procédure à suivre avant chaque date de retrait ; il couvre notamment la migration depuis Claude Mythos Preview et le retrait des paramètres d'échantillonnage.
→ *QA* : à utiliser comme checklist de « recette de montée de version modèle » à intégrer au plan de test, au même titre qu'une montée de version de framework.

## 3.C — Tests de non-régression sur prompts et évaluations

**Define success criteria and build evaluations**
`https://platform.claude.com/docs/en/test-and-evaluate/develop-tests` · Documentation officielle Anthropic (Best practices) · à jour au 28/07/2026 · consultée le 28/07/2026
⚠️ *Redirection* : `https://docs.claude.com/en/docs/test-and-evaluate/develop-tests` → `https://platform.claude.com/docs/en/test-and-evaluate/develop-tests`.
Méthode officielle en 3 temps (définir des critères **spécifiques/mesurables/atteignables/pertinents**, construire les évals, choisir la méthode de notation). Exemple de critère chiffré donné par Anthropic : « **moins de 0,1 % des sorties sur 10 000 essais** signalées comme toxiques ». Règle d'ingénierie explicite : **privilégier le volume sur la qualité** (« more questions with slightly lower signal automated grading is better than fewer questions with high-quality human hand-graded evals ») et hiérarchie de notation code-based > LLM-based > humain.
→ *QA* : traduit directement les notions ISTQB de critère d'acceptation et d'oracle de test dans le monde LLM ; base idéale d'un TP « écrire 50 cas d'éval automatisables pour un agent de test ».

**Assertions and Metrics — LLM Output Validation**
`https://www.promptfoo.dev/docs/configuration/expected-outputs/` · Documentation d'outil open source (promptfoo) · à jour au 28/07/2026 · consultée le 28/07/2026
Catalogue d'assertions pour tester des prompts en CI : assertions déterministes (`equals`, `contains`, `is-json`, `javascript`, `python`), assertions notées par modèle (`llm-rubric`, `factuality`, `answer-relevance`) et métriques agrégées avec seuils — c'est l'implémentation concrète du « snapshot / regression testing de prompts ».
→ *QA* : outil directement branchable dans un pipeline Angular/.NET (npx) pour matérialiser la non-régression de prompts à chaque changement de modèle.

## 3.D — Red teaming

**Lessons From Red Teaming 100 Generative AI Products**
`https://arxiv.org/abs/2501.07238` · arXiv (cs.AI), équipe AI Red Team de Microsoft (26 auteurs, dont Mark Russinovich) · 13 janv. 2025 · consultée le 28/07/2026
Retour d'expérience sur **plus de 100 produits d'IA générative** red-teamés chez Microsoft, avec une ontologie de menaces et **8 leçons**, dont deux très utiles en formation QA : « **AI red teaming is not safety benchmarking** » (leçon 3) et « **you don't have to compute gradients to break an AI system** » (leçon 2).
→ *QA* : sert à séparer clairement, devant des testeurs, ce qui relève du benchmark/éval reproductible et ce qui relève du red teaming exploratoire.

**PyRIT — Python Risk Identification Tool**
`https://microsoft.github.io/PyRIT/` · Documentation officielle du framework open source Microsoft · à jour au 28/07/2026 · consultée le 28/07/2026
⚠️ *Redirection* : `https://azure.github.io/PyRIT/` → `https://microsoft.github.io/PyRIT/` (le projet a migré de l'org Azure vers l'org Microsoft).
Framework de red teaming automatisé et assisté par l'humain : stratégies multi-tours **Crescendo, TAP, Skeleton Key**, mode « Scanner » en ligne de commande (`pyrit_scan`), interface graphique **CoPyRIT** (`pyrit_backend`), mémoire SQLite/Azure SQL, scorers true/false, Likert, classification. Cibles supportées : OpenAI, Azure, Anthropic, Google, HuggingFace, endpoints HTTP/WebSocket, apps web via Playwright.
→ *QA* : outil crédible pour une démo de « campagne de tests adverses » scriptée et rejouable, avec traçabilité des résultats — analogue d'un runner de tests.

**Challenges in red teaming AI systems**
`https://www.anthropic.com/news/challenges-in-red-teaming-ai-systems` · Billet officiel Anthropic (Policy) · 12 juin 2024 · consultée le 28/07/2026
Panorama des méthodes utilisées par Anthropic (Policy Vulnerability Testing avec experts externes, frontier threats CBRN/cyber, red teaming multilingue, red teaming automatisé red/blue, multimodal, crowdsourcé) et surtout la **boucle « du red teaming qualitatif vers les évaluations quantitatives automatisées »** : on part d'un test ad hoc par experts, on standardise, puis on génère des centaines/milliers de variantes par LLM.
→ *QA* : c'est exactement le pipeline « exploratoire → scripté → automatisé » que connaissent les testeurs ; excellent pont pédagogique.

## 3.E — Biais et équité (y compris biais d'évaluation)

**Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena**
`https://arxiv.org/abs/2306.05685` · arXiv (NeurIPS 2023 Datasets & Benchmarks), Zheng et al. · 2023 (v4) · consultée le 28/07/2026
Article de référence qui nomme et mesure les biais du juge LLM : **biais de position, biais de verbosité et biais d'auto-valorisation (self-enhancement)**, plus une capacité de raisonnement limitée ; il montre par ailleurs que des juges forts comme GPT-4 atteignent **plus de 80 % d'accord** avec les préférences humaines — soit le même niveau d'accord qu'entre humains. Données publiques : MT-bench, **3 000 votes d'experts et 30 000 conversations**.
→ *QA* : indispensable dès qu'on utilise « LLM-as-a-judge » comme oracle de test — impose des contre-mesures (permutation des positions, normalisation de longueur, juge différent du modèle testé).

**Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (NIST SP 1270)**
`https://www.nist.gov/publications/towards-standard-identifying-and-managing-bias-artificial-intelligence` · Publication NIST (Special Publication 1270), Schwartz, Vassilev, Greene, Perine, Burt, Hall · 15 mars 2022, page mise à jour 13 mars 2023 · consultée le 28/07/2026
Taxonomie officielle des biais de l'IA en trois catégories — **biais systémique, biais statistique/computationnel, biais humain** — avec l'argument central que « les biais restent endémiques dans les processus technologiques et peuvent produire des impacts nocifs indépendamment de l'intention ». DOI : 10.6028/NIST.SP.1270.
→ *QA* : donne une grille de lecture normée pour classer les biais qu'un testeur observe (biais de données, biais d'annotation, biais d'usage) au lieu de tout appeler « hallucination ».

**Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (NIST AI 100-2 E2025)**
`https://csrc.nist.gov/pubs/ai/100/2/e2025/final` · Rapport NIST (Trustworthy & Responsible AI), Vassilev, Oprea, Fordyce, Anderson, Davies, Hamin · **mars 2025** (édition E2025, PDF corrigé le 1er avril 2025, errata publié le 3 juin 2025) · consultée le 28/07/2026
Taxonomie officielle de l'apprentissage automatique adverse : étapes du cycle de vie de l'attaque, objectifs/capacités/connaissances de l'attaquant, avec un glossaire commun (empoisonnement de données, évasion, abus, atteinte à la vie privée). C'est la référence terminologique commune entre red teaming et test.
→ *QA* : sert de « dictionnaire » partagé pour éviter que chaque testeur invente son vocabulaire de menace ; utile aussi en notion 4.

---

# NOTION 4 — Sécurité des agents de test (17 sources)

## 4.A — Prompt injection directe et indirecte

**LLM Top 10 for 2025 — OWASP Gen AI Security Project**
`https://genai.owasp.org/llm-top-10/` · Référentiel OWASP (page officielle du Top 10) · édition **2025** toujours en vigueur au 28/07/2026 · consultée le 28/07/2026
Liste courante : **LLM01 Prompt Injection**, LLM02 Sensitive Information Disclosure, LLM03 Supply Chain, LLM04 Data and Model Poisoning, LLM05 Improper Output Handling, LLM06 Excessive Agency, LLM07 System Prompt Leakage, LLM08 Vector and Embedding Weaknesses, LLM09 Misinformation, LLM10 Unbounded Consumption. Point d'état important : **il n'existe pas d'édition 2026 du Top 10 LLM** — la dernière est bien celle de 2025 (la précédente étant 2023/24, accessible sur `https://genai.owasp.org/llm-top-10-2023-24/`).
→ *QA* : donne les 10 familles de risques à couvrir par des cas de test, avec une numérotation à citer précisément (LLM01:2025, etc.).

**Mitigating prompt injection attacks with a layered defense strategy**
`https://blog.google/security/mitigating-prompt-injection-attacks/` · Billet officiel Google (GenAI Security Team) · 13 juin 2025 · consultée le 28/07/2026
⚠️ *Redirection* : `https://security.googleblog.com/2025/06/mitigating-prompt-injection-attacks.html` → `https://blog.google/security/mitigating-prompt-injection-attacks/`.
Distingue nettement injection **directe** (l'utilisateur jailbreake) et **indirecte** (instructions cachées dans un email, un document, une invitation d'agenda), puis décrit **5 couches de défense** : classifieurs de contenu, « security thought reinforcement », sanitation Markdown + rédaction d'URL suspectes, framework de confirmation utilisateur (human-in-the-loop), notifications de mitigation à l'utilisateur.
→ *QA* : fournit une architecture de défense en profondeur dont chaque couche est testable indépendamment — parfait pour construire une matrice de tests de sécurité.

**AI threats in the wild: The current state of prompt injections on the web**
`https://blog.google/security/prompt-injections-web/` · Billet officiel Google Security (Brunner, Liu, Pande) · **23 avril 2026** · consultée le 28/07/2026
Balayage du web public via **Common Crawl (2 à 3 milliards de pages par instantané mensuel)** pour repérer des injections indirectes réelles. Résultat clé : la majorité des détections sont des **faux positifs** (articles pédagogiques, papiers de recherche), les vraies tentatives sont peu sophistiquées (canulars, SEO, dissuasion de crawl, exfiltration, destruction), mais on observe une **hausse relative de 32 % de la catégorie malveillante entre novembre 2025 et février 2026**.
→ *QA* : chiffre récent et citable pour objectiver le risque sans le dramatiser, et pour montrer la difficulté de détection (taux de faux positifs) dans un test automatisé.

## 4.B — OWASP Agentic AI / Agentic Security Initiative

**OWASP Top 10 for Agentic Applications for 2026**
`https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/` · Référentiel OWASP (whitepaper/guide) · publié le **9 décembre 2025**, version 12.6 · consultée le 28/07/2026
Le référentiel agentique le plus récent : framework relu par les pairs à l'échelle mondiale, élaboré avec **plus de 100 experts, chercheurs et praticiens**, qui identifie les risques de sécurité critiques des systèmes autonomes qui « planifient, agissent et décident » dans des workflows complexes. Un crosswalk avec le référentiel AIUC-1 a été publié le 25 mai 2026.
→ *QA* : c'est le document à utiliser pour un agent de test (Claude Code) plutôt que le Top 10 LLM, car il couvre l'autonomie, les outils et la mémoire.

**Agentic AI – Threats and Mitigations**
`https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/` · Whitepaper OWASP GenAI (Agentic Security Initiative), v1.0 · **17 février 2025** · consultée le 28/07/2026
Premier document de la série ASI : référence de menaces agentiques fondée sur un **modèle de menace** (threat-model-based), avec les mitigations associées ; il pose la taxonomie reprise ensuite par les outils du marché.
→ *QA* : plus détaillé que le Top 10 pour construire un atelier de threat modeling sur un agent de test.

**Agentic Security Initiative — OWASP Gen AI Security Project**
`https://genai.owasp.org/initiatives/agentic-security-initiative/` · Page officielle de l'initiative OWASP · page modifiée le **30 mars 2026** · consultée le 28/07/2026
Point d'entrée qui recense toutes les publications agentiques à jour (Top 10 Agentic 2026, guides MCP, State of Agentic AI 2.01, landscapes Q2 2026, CTF « FinBot »), avec un groupe d'experts incluant Microsoft AI Red Team, NIST (Apostol Vassilev) et l'Alan Turing Institute.
→ *QA* : la page à donner aux stagiaires pour qu'ils suivent les mises à jour après la formation, plutôt qu'un PDF figé.

**State of Agentic AI Security and Governance 2.01**
`https://genai.owasp.org/resource/state-of-agentic-ai-security-and-governance/` · Rapport OWASP GenAI, version 2.01 · **1er juin 2026** · consultée le 28/07/2026
Panorama le plus récent (juin 2026) des cadres, modèles de gouvernance et normes réglementaires mondiales applicables à l'IA agentique, destiné explicitement aux développeurs, professionnels de la sécurité et décideurs.
→ *QA* : source de contexte réglementaire à jour pour la partie « pourquoi mon organisation encadre l'usage d'un agent de test ».

## 4.C — Supply chain de l'IA : MCP, tool poisoning, rug pulls, slopsquatting

**Specification (Model Context Protocol) — révision 2025-11-25**
`https://modelcontextprotocol.io/specification/latest` · Spécification officielle MCP · révision courante **2025-11-25** · consultée le 28/07/2026
⚠️ *Redirection* : `/specification/latest` → `https://modelcontextprotocol.io/specification/2025-11-25`. **La révision courante en juillet 2026 est 2025-11-25, pas 2025-06-18.** La section « Security and Trust & Safety » pose 4 principes normatifs : consentement et contrôle utilisateur, confidentialité des données, **sûreté des outils** (« les descriptions de comportement d'outil, y compris les annotations, doivent être considérées comme non fiables sauf si elles proviennent d'un serveur de confiance ») et contrôle du sampling LLM.
→ *QA* : à citer pour rappeler que MCP ne peut pas imposer la sécurité au niveau protocole — c'est l'hôte (Claude Code) qui doit implémenter consentement et garde-fous.

**Security Best Practices (MCP)**
`https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices` · Document officiel MCP · consultée le 28/07/2026
⚠️ *Redirection* : cette URL redirige désormais vers `https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices` (le document a été sorti du dossier de spec versionné).
Catalogue d'attaques et de contre-mesures normatives : **confused deputy** sur les proxys OAuth, **token passthrough** (« les serveurs MCP NE DOIVENT PAS accepter de jetons qui ne leur ont pas été explicitement délivrés »), **SSRF** lors de la découverte de métadonnées OAuth (dont `169.254.169.254`), **détournement de session** (« les serveurs MCP NE DOIVENT PAS utiliser les sessions pour l'authentification »), **compromission de serveur MCP local** (commandes de démarrage malveillantes, exfiltration de `~/.ssh/id_rsa`) et **minimisation des scopes** (interdire `*`, `all`, `full-access`).
→ *QA* : matière première directe pour une checklist de revue de sécurité d'un serveur MCP ajouté à un projet de test.

**A Practical Guide for Secure MCP Server Development**
`https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/` · Guide OWASP GenAI · **16 février 2026** · consultée le 28/07/2026
Guide dédié au développement de serveurs MCP, qui insiste sur ce qui les différencie d'une API classique : **permissions utilisateur déléguées, architecture d'outils dynamique et chaînage d'appels d'outils**, ce qui amplifie l'impact d'une seule vulnérabilité. Couvre architecture sécurisée, authn/authz forte, validation stricte, isolation de session, déploiement durci.
→ *QA* : à utiliser si les stagiaires écrivent eux-mêmes un serveur MCP exposant leur API .NET aux agents de test.

**CheatSheet – A Practical Guide for Securely Using Third-Party MCP Servers 1.0**
`https://genai.owasp.org/resource/cheatsheet-a-practical-guide-for-securely-using-third-party-mcp-servers-1-0/` · Cheat sheet OWASP GenAI, v1.0 · **4 novembre 2025** · consultée le 28/07/2026
Cadre d'évaluation des serveurs MCP tiers : risques spécifiques nommés — **tool poisoning, prompt injection, memory poisoning, tool interference** — et mitigations couvrant authentification, autorisation, **sandboxing côté client**, découverte sécurisée des serveurs et workflows de gouvernance, avec insistance sur le **moindre privilège** et le **human-in-the-loop**.
→ *QA* : format « cheat sheet » directement exploitable comme grille d'acceptation avant d'ajouter un serveur MCP dans un projet.

**MCP Security Notification: Tool Poisoning Attacks**
`https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks` · Recherche de sécurité (Invariant Labs, Beurer-Kellner & Fischer) · 1er avril 2025 · consultée le 28/07/2026
Démonstration reproductible des trois attaques de référence de l'écosystème MCP : **tool poisoning** (instructions cachées dans la description d'un outil, qui font lire `~/.cursor/mcp.json` et les clés SSH puis les exfiltrer), **rug pull** (le serveur modifie la description de l'outil *après* l'approbation utilisateur) et **tool shadowing** (un serveur malveillant altère le comportement d'un outil `send_email` fourni par un serveur de confiance, sans jamais apparaître dans le journal utilisateur).
→ *QA* : les captures et le code de l'outil `add` piégé constituent une démo de 5 minutes très marquante en salle.

**We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs**
`https://arxiv.org/abs/2406.10279` · arXiv (cs.SE), Spracklen et al., **à paraître à USENIX Security Symposium 2025** · v1 juin 2024, v3 2 mars 2025 · consultée le 28/07/2026
Base empirique du « slopsquatting » : **576 000 échantillons de code** générés par **16 LLM** en Python et JavaScript ; le taux moyen de paquets hallucinés est d'au moins **5,2 % pour les modèles commerciaux et 21,7 % pour les modèles open source**, avec **205 474 noms de paquets hallucinés uniques**.
→ *QA* : chiffre décisif pour imposer une étape « vérifier que chaque dépendance suggérée existe vraiment » dans la revue de code générée (npm pour Angular, NuGet pour .NET).

## 4.D — Sécurité de Claude Code : permissions, moindre privilège, sandboxing, secrets

**Security (Claude Code)**
`https://code.claude.com/docs/en/security` · Documentation officielle Anthropic · à jour au 28/07/2026 · consultée le 28/07/2026
⚠️ *Redirection* : `https://docs.claude.com/en/docs/claude-code/security` → `https://code.claude.com/docs/en/security` (les docs Claude Code ont migré sur `code.claude.com`).
Architecture « **read-only par défaut** », frontière du répertoire de travail (écriture impossible hors du dossier de lancement et de ses sous-dossiers), **`curl` et `wget` ne sont pas auto-approuvés**, fenêtre de contexte isolée pour le web fetch afin d'éviter l'injection, détection d'injection de commande qui redemande une approbation manuelle même sur commande précédemment autorisée, **fail-closed matching**, vérification de confiance à la première exécution d'un dépôt et à l'ajout d'un serveur MCP (désactivée en mode non interactif `-p`). Anthropic précise ne **pas auditer la sécurité des serveurs MCP** du répertoire.
→ *QA* : c'est la page de référence à projeter pour expliquer pourquoi un agent de test doit être lancé depuis le dossier du projet et pas depuis `~`.

**Configure permissions (Claude Code)**
`https://code.claude.com/docs/en/permissions` · Documentation officielle Anthropic · à jour au 28/07/2026 · consultée le 28/07/2026
Système de permissions à niveaux : lecture seule (pas d'approbation dans le répertoire de travail), commandes Bash (approbation sauf jeu intégré de commandes en lecture seule), modification de fichiers (approbation, mémorisée jusqu'à la fin de session). Les règles `allow` / `ask` / `deny` sont versionnables et distribuables à toute l'organisation ; « Yes, don't ask again » écrit dans **`.claude/settings.local.json`** à la racine du dépôt git.
→ *QA* : support du TP « écrire un `settings.json` d'équipe qui autorise `dotnet test` et `ng test` mais interdit `git push` et l'accès réseau ».

**Configure the sandboxed Bash tool (Claude Code)**
`https://code.claude.com/docs/en/sandboxing` · Documentation officielle Anthropic · à jour au 28/07/2026 · consultée le 28/07/2026
Isolation OS réelle : **Seatbelt sur macOS, bubblewrap sur Linux/WSL2** (Windows natif non supporté), deux couches indépendantes — **isolation filesystem** (écriture limitée au répertoire de travail + `$TMPDIR` de session) et **isolation réseau** (aucun domaine pré-autorisé par défaut, proxy hors sandbox, `strictAllowlist`, `allowManagedDomainsOnly`). Gestion des secrets via `sandbox.credentials` : `mode: "deny"` pour bloquer `~/.aws/credentials` ou `~/.ssh` et supprimer `GITHUB_TOKEN`, ou `mode: "mask"` qui remplace le secret par une sentinelle et ne le réinjecte qu'au niveau du proxy pour les `injectHosts` autorisés. Limite honnête documentée : **le proxy ne termine pas TLS par défaut**, donc autoriser un domaine large comme `github.com` ouvre une voie d'exfiltration (domain fronting).
→ *QA* : la source la plus concrète pour enseigner « moindre privilège + gestion des secrets » sur un agent de test réel, avec ses limites explicitement reconnues.

## 4.E — Cadres officiels étatiques et normatifs

**Guidelines for secure AI system development**
`https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development` · Guide conjoint NCSC (UK) / CISA (US) et 21 agences internationales, v1.0 · **27 novembre 2023** · consultée le 28/07/2026
Guide « secure by default » structuré sur **4 phases du cycle de vie** : secure design, secure development (dont sécurité de la chaîne d'approvisionnement et gestion de la dette technique), secure deployment, **secure operation and maintenance** (journalisation, supervision, gestion des mises à jour, partage d'informations). Aligné explicitement sur le NIST SSDF et les « secure by design principles » de la CISA. PDF de 2,23 Mo téléchargeable.
→ *QA* : la 4ᵉ phase donne la justification institutionnelle de la « validation continue » (notion 3) dans un langage compréhensible par un RSSI.

**Recommandations de sécurité pour un système d'IA générative**
`https://messervices.cyber.gouv.fr/guides/recommandations-de-securite-pour-un-systeme-dia-generative` · Guide officiel ANSSI (français) · publié le **29 avril 2024** · consultée le 28/07/2026
⚠️ *Redirection* : `https://cyber.gouv.fr/publications/recommandations-de-securite-pour-un-systeme-dia-generative` → `https://messervices.cyber.gouv.fr/guides/...` (les guides ANSSI ont migré sur la plateforme MesServicesCyber).
Guide français de référence sur la **sécurisation de l'architecture** d'un système d'IA générative, de la conception/entraînement au déploiement en production, avec une « posture de prudence » explicite. Périmètre à connaître : le document exclut volontairement la qualité des données, la performance métier, l'éthique et la protection des données personnelles.
→ *QA* : indispensable pour une formation française (CPF/Qualiopi) : c'est la référence nationale citable, avec son périmètre clairement délimité.

**The 'vibe coding spectrum' approach to AI-assisted software development**
`https://www.ncsc.gov.uk/blogs/the-vibe-coding-spectrum-approach-to-ai-assisted-software-development` · Billet officiel NCSC (Toby W, Principal Security Architect) · **18 juin 2026** · consultée le 28/07/2026
Position officielle et nuancée : le vibe coding n'est pas binaire mais un **spectre**, à calibrer selon la criticité du code. Glisser vers « full vibe » pour prototypes, démos et outils internes sans données sensibles ; glisser vers le manuel pour l'authentification/autorisation, le traitement de données personnelles, la manipulation de secrets et le code critique. Le NCSC renvoie aux **exigences de base ETSI TS 104 223** (« Baseline Cyber Security Requirements for AI Models and Systems ») dès que le profil de risque se déplace.
→ *QA* : cadre décisionnel parfait pour la question récurrente « peut-on laisser Claude Code écrire nos tests tout seul ? » — la réponse est « ça dépend du code sous test ».

**Artificial Intelligence Cybersecurity Challenges (ENISA AI Threat Landscape)**
`https://www.enisa.europa.eu/publications/artificial-intelligence-cybersecurity-challenges` · Rapport ENISA (agence de l'UE) · **15 décembre 2020** · consultée le 28/07/2026
Cartographie européenne fondatrice : approche par cycle de vie, identification des **actifs** de l'écosystème IA, taxonomie détaillée du paysage de menaces et classification par étape du cycle de vie ; le rapport insiste déjà sur la **chaîne d'approvisionnement de l'IA** comme zone de risque majeure.
→ *QA* : utile comme référence UE et pour l'inventaire d'actifs, **mais à présenter comme historique (2020, pré-LLM)** et à compléter systématiquement par OWASP 2025/2026.

---

## ⚠️ Pièges et erreurs répandues (notions 3-4)

1. **« OWASP Top 10 LLM » ≠ « OWASP Top 10 » (web).** Ce sont deux projets distincts ; l'A03 d'un Top 10 web (Injection) n'a rien à voir avec LLM01:2025 (Prompt Injection). Citer toujours le préfixe complet (`LLM01:2025`) ou (`ASI`/Agentic) pour lever l'ambiguïté.
2. **La numérotation OWASP LLM change entre éditions.** En 2023/24, « Insecure Output Handling » était LLM02 et « Model Denial of Service » LLM04 ; en 2025 c'est LLM05 « Improper Output Handling » et LLM10 « Unbounded Consumption ». Ne jamais citer « LLM04 » sans l'année.
3. **Il n'y a pas d'édition 2026 du Top 10 LLM (juillet 2026).** L'édition courante reste **2025**. En revanche il existe bien un **OWASP Top 10 for Agentic Applications 2026** (publié le 9 déc. 2025) : ce sont deux listes différentes, à ne pas confondre ni fusionner.
4. **La révision courante de la spec MCP n'est plus `2025-06-18` mais `2025-11-25`.** Beaucoup de tutoriels et de billets citent encore 2025-06-18 ; vérifier via `/specification/latest`. De plus, le document « Security Best Practices » a été déplacé hors du dossier de spec versionné (redirection vers `/docs/tutorials/security/...`).
5. **Confondre « deprecated » et « retired ».** Chez Anthropic, un modèle *deprecated* fonctionne encore mais a une date de retrait ; *retired* = les requêtes échouent. Chez Microsoft Foundry, le piège est inverse et documenté : dans l'API, `lifecycleStatus: "Deprecating"` = déprécié, et `lifecycleStatus: "Deprecated"` = **retiré** (`410 Gone`).
6. **Croire que les dates de dépréciation sont négociables ou identiques partout.** Microsoft répond explicitement « No » à la demande d'extension. Et Anthropic précise que les dates publiées ne valent que pour ses plateformes : **Amazon Bedrock et Google Cloud fixent leurs propres calendriers**, donc un même modèle peut être retiré à des dates différentes selon le fournisseur.
7. **Croire qu'un modèle « figé » donne des résultats figés.** Chen/Zaharia/Zou montrent qu'un même *service* peut dériver fortement en 3 mois (84 % → 51 %). Corollaire : versionner l'identifiant complet daté (`claude-sonnet-4-5-20250929`) et rejouer la suite de non-régression à chaque montée de version.
8. **Prendre le red teaming pour du benchmarking.** Leçon 3 de Microsoft : le red teaming est exploratoire et adversarial, il ne remplace pas une éval reproductible — et inversement une éval ne remplace pas le red teaming. Prévoir les deux dans le plan de test.
9. **Utiliser un LLM-as-a-judge sans neutraliser ses biais.** Biais de position, de verbosité et d'auto-valorisation sont documentés (arXiv 2306.05685). Un juge qui note son propre modèle est un oracle biaisé.
10. **Réduire le prompt injection à la seule injection directe.** L'injection **indirecte** (contenu web, ticket Jira, commentaire de code, README d'une dépendance) est le vecteur principal contre les agents ; Google observe une hausse relative de 32 % des tentatives malveillantes sur le web entre nov. 2025 et fév. 2026.
11. **Croire qu'approuver un serveur MCP une fois suffit.** Le **rug pull** permet au serveur de modifier la description d'un outil *après* approbation, et le **tool shadowing** permet à un serveur malveillant de détourner un outil de confiance sans jamais apparaître dans le journal utilisateur.
12. **Confondre sandbox et isolation complète.** La doc Anthropic le dit explicitement : le proxy ne termine pas TLS par défaut, donc un `allowedDomains` trop large (`github.com`) laisse une voie d'exfiltration ; et `filesystem.disabled: true` ou `enableWeakerNestedSandbox` affaiblissent fortement la garantie.
13. **Confondre permissions et sandboxing dans Claude Code.** Les permissions sont évaluées *avant* l'exécution, sur la chaîne de commande ; le sandbox est appliqué *par l'OS* pendant l'exécution et couvre tous les processus fils. Les deux sont complémentaires, aucun ne remplace l'autre. À noter aussi : le sandbox ne fonctionne pas sur Windows natif (WSL2 requis) — point à anticiper pour des stagiaires sur postes Windows.
14. **« Slopsquatting » n'est pas un mythe mais son ampleur est souvent mal citée.** Le chiffre correct est **5,2 % (modèles commerciaux) / 21,7 % (open source)** de paquets hallucinés en moyenne, pas « 20 % pour tous les modèles ».
15. **Citer l'ANSSI ou l'ENISA sans regarder la date.** Le guide ANSSI IA générative date d'**avril 2024** (avant l'explosion des agents et de MCP) et le rapport ENISA cité de **décembre 2020** (pré-LLM). Ils restent valides sur l'architecture et la taxonomie mais doivent être complétés par OWASP 2025/2026 et par la spec MCP.
16. **Attention aux URL qui ont bougé.** `docs.claude.com/en/docs/claude-code/*` → `code.claude.com/docs/en/*` ; `azure.github.io/PyRIT` → `microsoft.github.io/PyRIT` ; `learn.microsoft.com/.../azure/ai-foundry/openai/...` → `.../azure/foundry/openai/...` ; `cyber.gouv.fr/publications/...` → `messervices.cyber.gouv.fr/guides/...`. Mettre à jour les supports de formation contenant les anciennes adresses.
# NOTION 5 — Confidentialité et conformité des données (18 sources)

> Toutes les URL ci-dessous ont été récupérées et lues réellement (fetch HTTP + lecture du contenu) le 28/07/2026. Les redirections constatées sont signalées. Les URL mortes ou vides sont listées en fin de notion.

## 5.A Socle juridique : RGPD et doctrine CNIL

**Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (règlement général sur la protection des données)**
`https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra` · Texte réglementaire (EUR-Lex, forme ELI, version française) · adopté le 27/04/2016, publié au JOUE le 04/05/2016, en vigueur le 24/05/2016 · consultée le 28/07/2026
Texte de référence pour les articles cités en formation : art. 5 (principes, dont minimisation et limitation de conservation), art. 6 (bases légales, dont intérêt légitime), art. 22 (décision automatisée), art. 25 (privacy by design/by default), art. 28 (sous-traitance), art. 32 (sécurité), art. 35 (AIPD) et chapitre V (transferts hors UE). CELEX : 32016R0679.
→ *QA* : c'est le texte à ouvrir en séance pour montrer que la question « puis-je envoyer ce jeu de données de test à un LLM ? » se tranche article par article, pas à l'intuition.

**IA : comment être en conformité avec le RGPD ?**
`https://www.cnil.fr/fr/intelligence-artificielle/ia-comment-etre-en-conformite-avec-le-rgpd` · Doc officielle (autorité de contrôle française) · 05 avril 2022 · consultée le 28/07/2026
La CNIL impose de **séparer la phase d'apprentissage de la phase de production** et recommande explicitement, pour la minimisation, de « réaliser des expérimentations et tests sur des **données fictives**, c'est-à-dire présentant la même structure que des données réelles sans pour autant être liées à une personne » — ces données ne sont alors pas des données personnelles. Elle rappelle aussi qu'un modèle entraîné sur des données personnelles n'est pas, par défaut, considéré comme contenant des données personnelles, mais qu'une attaque en confidentialité réussie (inférence d'appartenance, inversion, exfiltration) **constitue une violation de données** à notifier.
→ *QA* : c'est la source française qui légitime directement la fabrication de jeux de données de test synthétiques ou fictifs plutôt que la copie d'une base de production.

**L'analyse d'impact relative à la protection des données (AIPD)**
`https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd` · Doc officielle (méthodologie CNIL) · date de MAJ non affichée · consultée le 28/07/2026
⚠️ Redirection/URL corrigée : `https://www.cnil.fr/fr/analyse-dimpact-relative-la-protection-des-donnees-aipd` renvoie une page **vide** ; utiliser l'URL ci-dessus.
L'AIPD (art. 35 RGPD) est obligatoire pour tout traitement « susceptible d'engendrer un **risque élevé** pour les droits et libertés » ; la page donne accès aux deux listes officielles CNIL (AIPD requise / non requise), au logiciel open source **PIA**, aux trois guides méthodologiques et aux lignes directrices **WP248 rév. 01** du G29.
→ *QA* : permet de trancher en formation si l'introduction d'un assistant IA dans la chaîne de test (accès au code, aux logs, aux données de recette) déclenche ou non une AIPD.

**IA - Comment se mettre en conformité ?**
`https://www.cnil.fr/fr/ia-comment-se-mettre-en-conformite` · Doc officielle (hub de fiches pratiques CNIL) · date de MAJ non affichée · consultée le 28/07/2026
Page pivot qui agrège les ressources opérationnelles CNIL : « les grands principes pour se mettre en conformité », les **recommandations spécifiques sur le développement des systèmes d'IA**, les quatre fiches France Num/CPME/CNIL sur l'IA générative en TPE-PME et la **FAQ « utilisation d'un système d'IA générative »** destinée aux organisations déployantes.
→ *QA* : point d'entrée unique à donner aux stagiaires DPO/QA pour bâtir une politique interne d'usage de Claude Code.

## 5.B Doctrine européenne sur les modèles d'IA

**Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models**
`https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en` · Avis d'autorité européenne (CEPD/EDPB, art. 64(2) RGPD) · **18 décembre 2024** · consultée le 28/07/2026
Avis rendu sur saisine de l'autorité irlandaise, disponible en 24 langues dont le français (PDF EN : `https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf`, 711,6 Ko). Il traite de l'anonymat allégué des modèles d'IA, de l'**intérêt légitime** comme base légale pour développer puis déployer un modèle, et des conséquences d'un traitement illicite en amont.
→ *QA* : la référence à citer quand un stagiaire affirme « le modèle est anonyme donc le RGPD ne s'applique plus ».

**Le CEPD met en lumière l'anonymisation et le moissonnage pour l'IA générative et adopte la version finale des lignes directrices sur la chaîne de blocs**
`https://www.cnil.fr/fr/cepd-ia-generative-chaines-blocs` · Doc officielle (CNIL, traduction du communiqué CEPD) · **09 juillet 2026** · consultée le 28/07/2026
Le **7 juillet 2026**, le CEPD a adopté des lignes directrices sur l'anonymisation et sur le moissonnage dans le contexte de l'IA générative, tenant compte de l'arrêt CJUE **C-413/23 P, CEPD/CRU, du 4 septembre 2025** ; le test d'anonymat repose sur **3 critères** (pas d'individualisation, pas de corrélation, pas d'inférence) et sur le choix entre une « approche contextuelle » et une « approche simplifiée ». **Consultation publique ouverte jusqu'au 30 octobre 2026.**
→ *QA* : source la plus récente et la plus citable pour expliquer pourquoi « j'ai retiré les noms » ne suffit pas à rendre un jeu de test anonyme.

**IA agentique et données personnelles : la CNIL et le Conseil de l'IA et du Numérique publient une note exploratoire**
`https://www.cnil.fr/fr/ia-agentique-cnil-cianum-note` · Rapport / note exploratoire (CNIL + CIANum) · **20 juillet 2026** · consultée le 28/07/2026
La note (PDF : `https://www.cnil.fr/sites/default/files/2026-07/ia-cianum-cnil.pdf`) pointe trois risques propres aux agents : circulation de données personnelles **entre de nombreux services connectés**, **mémoires persistantes** et historiques d'interactions qui gonflent les volumes conservés, et **dilution des responsabilités** entre acteurs du fait de l'autonomie décisionnelle.
→ *QA* : directement transposable à Claude Code, qui lit le dépôt, appelle des MCP et écrit des fichiers — c'est l'exemple français le plus à jour de « chaîne de traitement agentique ».

## 5.C Anonymisation vs pseudonymisation, données de test

**L'anonymisation de données personnelles**
`https://www.cnil.fr/fr/technologies/lanonymisation-de-donnees-personnelles` · Fiche pratique d'autorité de contrôle · **19 mai 2020** · consultée le 28/07/2026
La CNIL distingue formellement l'anonymisation, qui rend « impossible, en pratique, toute identification de la personne […] de manière **irréversible** », de la pseudonymisation, **réversible**, dont les données « conservent donc un caractère personnel ». Les trois critères d'efficacité (individualisation, corrélation, inférence) proviennent de l'**avis 05/2014 du G29 du 10 avril 2014** sur les techniques d'anonymisation.
→ *QA* : la diapo à afficher pour couper court à la confusion la plus répandue en équipe QA — « base de recette pseudonymisée = base anonyme ».

**What is the EU Data Boundary?**
`https://learn.microsoft.com/en-us/privacy/eudb/eu-data-boundary-learn` · Doc éditeur (Microsoft) · `ms.date` 21/07/2026, encadré interne « Last updated: February 26, 2025 » · consultée le 28/07/2026
La frontière couvre les **27 pays de l'UE plus 4 pays de l'AELE** (Liechtenstein, Islande, Norvège, Suisse). Microsoft exige que **toutes** les données personnelles présentes dans les journaux générés par le système soient **pseudonymisées au sens de l'article 4(5) du RGPD** (chiffrement, masquage, tokenisation, floutage) — l'anonymisation étant écartée car elle détruirait l'historique factuel nécessaire à l'exploitation.
→ *QA* : exemple industriel parfait pour montrer qu'on pseudonymise les logs (traçabilité conservée) et qu'on anonymise les jeux de test (traçabilité perdue) — deux objectifs différents.

## 5.D Sous-traitance, DPA et transferts internationaux

**Data Processing Addendum (Anthropic)**
`https://www.anthropic.com/legal/data-processing-addendum` · Doc contractuelle éditeur (DPA art. 28 RGPD) · **effectif le 24 février 2025** · consultée le 28/07/2026
Le client est **responsable de traitement**, Anthropic **sous-traitant** ; les transferts s'appuient sur les **Clauses contractuelles types de la décision (UE) 2021/914 du 4 juin 2021, Modules 2 et 3**, droit applicable irlandais. Points chiffrés citables : notification de violation **sous 48 heures**, droit d'objection à un nouveau sous-traitant **sous 15 jours**, suppression des données **sous 30 jours** après fin du contrat, chiffrement minimum **AES-256** au repos et **TLS 1.2+** en transit, mots de passe internes ≥ 16 caractères.
→ *QA* : c'est le document à exiger avant tout pilote Claude Code en entreprise — et l'exemple concret d'un art. 28 réel à décortiquer en TP.

**Commercial Terms of Service (Anthropic)**
`https://www.anthropic.com/legal/commercial-terms` · Doc contractuelle éditeur · **effectif le 17 juin 2025** · consultée le 28/07/2026
Deux clauses décisives : « **Anthropic may not train models on Customer Content from Services** » (section B), et l'entité contractante est **Anthropic Ireland, Limited** pour tout client résidant dans l'EEE, en Suisse ou au Royaume-Uni, avec droit irlandais et arbitrage à Dublin. Le client conserve ses Inputs et détient ses Outputs.
→ *QA* : sert à démontrer que l'offre commerciale/API n'a pas le même régime que l'offre grand public — distinction que beaucoup d'équipes QA ignorent.

**Adequacy decisions (Data protection adequacy for non-EU countries)**
`https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en` · Doc officielle (Commission européenne) · actualité la plus récente datée du 23/07/2026 · consultée le 28/07/2026
⚠️ L'URL `.../eu-us-data-transfer-framework_en` renvoie une page **vide** ; utiliser celle-ci.
La Commission agit sur le fondement de l'**article 45 du RGPD** : une décision d'adéquation permet les flux « without any further safeguard being necessary ». Les États-Unis n'y figurent que pour les organisations commerciales participant à l'**EU-US Data Privacy Framework**, décision d'adéquation du **10 juillet 2023**, dont le premier rapport de réexamen a été publié le **9 octobre 2024**.
→ *QA* : indispensable pour répondre à « mon fournisseur d'IA est américain, est-ce que je peux ? » sans replonger dans Schrems II de mémoire.

## 5.E Rétention, Zero Data Retention et politiques fournisseurs

**Configure custom data retention controls for Enterprise plans | Anthropic Privacy Center**
`https://privacy.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans` · Doc éditeur · **16 mars 2026** · consultée le 28/07/2026
⚠️ Redirection : `https://privacy.anthropic.com/en/articles/10440198-...` → `https://privacy.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans`.
La **durée minimale de rétention configurable est de 30 jours** (un « mois » = 30 jours) et, **par défaut, les données sont conservées indéfiniment** tant qu'aucune durée personnalisée n'est fixée ; la suppression s'exécute à minuit UTC et est irréversible, tous les changements étant tracés dans les journaux d'audit.
→ *QA* : le chiffre choc de la séquence — « par défaut = illimité » : la rétention se configure, elle ne se présume pas.

**How long do you store my data? | Anthropic Privacy Center**
`https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data` · Doc éditeur (offres grand public : Free, Pro, Max, et Claude Code sur ces comptes) · MAJ « over 3 weeks ago » (≈ début juillet 2026) · consultée le 28/07/2026
Une conversation supprimée disparaît de l'historique immédiatement et des systèmes back-end **sous 30 jours** ; si l'amélioration du modèle est activée, les données peuvent être conservées **jusqu'à 5 ans** sous forme dé-identifiée dans les pipelines d'entraînement ; en cas de signalement par les systèmes automatisés de trust & safety, les entrées/sorties sont conservées **jusqu'à 2 ans** et les scores de classification **jusqu'à 7 ans**.
→ *QA* : montre noir sur blanc pourquoi un développeur qui utilise son compte Pro personnel pour tester du code client n'est pas dans le même régime que l'offre entreprise.

**Data controls in the OpenAI platform**
`https://developers.openai.com/api/docs/guides/your-data` · Doc éditeur · date non affichée · consultée le 28/07/2026
⚠️ `https://platform.openai.com/docs/guides/your-data` renvoie une page **vide** (SPA non rendue) ; l'URL ci-dessus est la canonical du même contenu.
Les **logs de surveillance des abus sont générés par défaut** pour tout usage de l'API et conservés **jusqu'à 30 jours**. Le **Zero Data Retention** n'est disponible que sur certains endpoints (`/v1/chat/completions`, `/v1/responses`, où il force `store=false` même si la requête demande le contraire) et **pas** sur `/v1/assistants`, `/v1/threads`, `/v1/files`, `/v1/fine_tuning/jobs` ni `/v1/batches`.
→ *QA* : la source qui casse le mythe « ZDR = plus aucune trace nulle part » — le ZDR est endpoint par endpoint.

**Enterprise privacy at OpenAI**
`https://openai.com/enterprise-privacy` · Doc éditeur / FAQ conformité · **mise à jour le 8 janvier 2026** · consultée le 28/07/2026
Les entrées et sorties de l'API peuvent être conservées de façon sécurisée **jusqu'à 30 jours** pour fournir le service et détecter les abus, puis sont supprimées sauf obligation légale. Par défaut, les données de l'API postérieures au **1er mars 2023** ne servent pas à entraîner les modèles, et OpenAI signe un DPA.
→ *QA* : utile en comparatif fournisseurs face aux clauses Anthropic, avec des dates précises à mettre côte à côte.

**Data, privacy, and security for Models sold by Azure in Microsoft Foundry**
`https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy` · Doc éditeur · `ms.date` 18/05/2026 · consultée le 28/07/2026
⚠️ Redirection : `/azure/ai-foundry/responsible-ai/openai/data-privacy` → `/azure/foundry/responsible-ai/openai/data-privacy`. Version française vérifiée : `https://learn.microsoft.com/fr-fr/azure/foundry/responsible-ai/openai/data-privacy`.
Les modèles sont **sans état** et les prompts/complétions ne sont ni accessibles aux fournisseurs de modèles ni utilisés pour entraîner les modèles de base ; les données au repos sont chiffrées en **AES-256** dans le tenant Azure du client. Pour un déploiement **DataZone** créé dans un État membre de l'UE, le traitement peut avoir lieu dans **n'importe quel autre État membre de l'UE**, et les réviseurs humains habilités pour l'EEE sont localisés dans l'EEE ; la journalisation pour surveillance des abus se désactive via `"ContentLogging": "false"`.
→ *QA* : nuance essentielle « résidence UE ≠ résidence France » à faire passer dès qu'un client exige la localisation.

**Data protection - Amazon Bedrock**
`https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html` · Doc éditeur · date non affichée · consultée le 28/07/2026
Bedrock isole chaque modèle dans un **Model Deployment Account** par fournisseur et par région AWS, opéré par l'équipe Bedrock : les fournisseurs de modèles n'ont « **no access to Amazon Bedrock logs or to customer prompts and completions** ». AWS **exige TLS 1.2** (recommande TLS 1.3), propose des endpoints **FIPS 140-3** et déconseille explicitement de placer des informations confidentielles dans les tags ou champs texte libre, qui alimentent facturation et journaux de diagnostic.
→ *QA* : illustre le cas « je passe par un cloud tiers » et le piège des métadonnées (noms de tags, noms de jobs de test) qui fuient hors du périmètre chiffré.

**Application card: GitHub Copilot Chat**
`https://docs.github.com/en/copilot/responsible-use/chat` · Doc éditeur · date non affichée · consultée le 28/07/2026
⚠️ Redirection depuis `/en/copilot/responsible-use-of-github-copilot-features/responsible-use-of-github-copilot-chat-in-your-ide`.
Le prompt utilisateur est **enrichi automatiquement d'un contexte** (dépôt courant, fichiers ouverts, historique de conversation) avant envoi au LLM. En mode BYOK (clé de modèle propre), « your prompts and responses are transmitted to your selected provider and may be subject to that provider's **data retention and privacy policies** » — la rétention échappe alors entièrement à GitHub.
→ *QA* : montre que le périmètre réel des données envoyées est plus large que ce que le testeur a tapé — argument clé pour interdire l'ouverture de fichiers de données réelles dans l'IDE.

## 5.F Résidence des données et sécurité

**Regional Compliance | Claude by Anthropic**
`https://claude.com/regional-compliance` · Doc éditeur · date de MAJ non affichée · consultée le 28/07/2026
La résidence des données (stockage des prompts, sorties et historiques) et la **résidence d'inférence** (lieu de traitement) sont distinguées et configurables via **AWS Bedrock, GCP Vertex et Microsoft Foundry**, avec disponibilité Europe / États-Unis / Canada / Asie-Pacifique (Microsoft Foundry annoncé « Coming 2026 » hors États-Unis). Certifications listées : **SOC 2 Type 2, ISO/IEC 27001, ISO/IEC 27017, ISO/IEC 27018, CSA STAR**, plus HIPAA ; « By default, Anthropic does not use customer data from commercial deployments to train models ».
→ *QA* : la page à projeter pour répondre à un client bancaire ou santé qui exige la localisation UE avant d'autoriser Claude Code.

**Recommandations de sécurité pour un système d'IA générative (ANSSI)**
`https://messervices.cyber.gouv.fr/guides/recommandations-de-securite-pour-un-systeme-dia-generative` · Guide d'agence publique française · **publié le 29 avril 2024** · consultée le 28/07/2026
⚠️ Redirection : `https://cyber.gouv.fr/publications/recommandations-de-securite-pour-un-systeme-dia-generative` → portail MesServicesCyber.
Le guide couvre la sécurisation de l'architecture d'un système d'IA générative, de la conception et de l'entraînement au déploiement en production. **Point d'honnêteté à signaler en formation** : le document indique explicitement que « les enjeux comme l'éthique, la vie privée ou encore la protection des données personnelles » **ne sont pas traités**.
→ *QA* : source sécurité française de référence — mais à ne surtout pas présenter comme une source de conformité RGPD.

### URLs écartées (mortes, vides ou non vérifiables) — notion 5
- `https://www.cnil.fr/fr/intelligence-artificielle/recommandations` → réponse vide.
- `https://www.cnil.fr/fr/analyse-dimpact-relative-la-protection-des-donnees-aipd` → réponse vide (remplacée).
- `https://platform.openai.com/docs/guides/your-data` → réponse vide (SPA).
- `https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfer-framework_en` → réponse vide sur 3 tentatives.
- `https://cloud.google.com/vertex-ai/generative-ai/docs/data-governance` → **404** sans paramètre ; la doc Google a été restructurée sous `docs.cloud.google.com/gemini-enterprise-agent-platform/resources/zero-data-retention`, dont le corps n'a **pas pu être extrait** — **aucun chiffre Google n'est cité ici**.
- `https://github.com/customer-terms/github-copilot-product-specific-terms` → HTTP 200 mais corps rendu en JavaScript, contenu non vérifiable : ne pas citer.

---

# NOTION 6 — Cadre réglementaire IA (22 sources)

## 6.A Le texte et son état d'application réel au 28/07/2026

**Règlement (UE) 2024/1689 du Parlement européen et du Conseil du 13 juin 2024 établissant des règles harmonisées concernant l'intelligence artificielle (règlement sur l'intelligence artificielle)**
`https://eur-lex.europa.eu/eli/reg/2024/1689/oj/fra` · Texte réglementaire (EUR-Lex, forme ELI, version française) · adopté le 13/06/2024, publié au JOUE le 12/07/2024, entré en vigueur le 01/08/2024 · consultée le 28/07/2026
CELEX : **32024R1689**. Le règlement modifie notamment les règlements (CE) n° 300/2008, (UE) n° 167/2013, (UE) 2018/858, (UE) 2018/1139, (UE) 2019/2144 et les directives 2014/90/UE, (UE) 2016/797 et (UE) 2020/1828.
→ *QA* : version française officielle et opposable — à préférer aux résumés de blogs pour citer un article en séance.

**AI Act | Shaping Europe's digital future**
`https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai` · Doc officielle (Commission européenne) · **dernière mise à jour : 11 mai 2026** · consultée le 28/07/2026
Page de référence de la Commission : 4 niveaux de risque, **8 pratiques interdites** applicables depuis février 2025, obligations GPAI applicables depuis **août 2025**, règles de transparence entrant en vigueur en **août 2026**, et — mention explicite — « the rules for high-risk AI systems embedded into regulated products have an extended transition period until **2 August 2028** (as a result of the political agreement on the proposal to simplify the AI Act – 'AI omnibus') ».
→ *QA* : la seule page à citer pour le calendrier — c'est la version officielle post-omnibus, contrairement à la plupart des trackers.

**EU agrees to simplify AI rules to boost innovation and ban 'nudification' apps to protect citizens**
`https://digital-strategy.ec.europa.eu/en/news/eu-agrees-simplify-ai-rules-boost-innovation-and-ban-nudification-apps-protect-citizens` · Communiqué de presse (Commission européenne) · **7 mai 2026** · consultée le 28/07/2026
Accord politique Parlement/Conseil du **7 mai 2026** : les règles pour les systèmes à haut risque de certains domaines (biométrie, infrastructures critiques, éducation, emploi, migration, asile, contrôle aux frontières) s'appliqueront **à partir du 2 décembre 2027** ; pour les systèmes intégrés à des produits (ascenseurs, jouets), **à partir du 2 août 2028**. La proposition d'omnibus datait de « only five months ago ».
→ *QA* : les deux dates exactes à faire noter aux stagiaires, avec la source officielle plutôt qu'un article de presse.
*(Le communiqué presscorner `https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1024` existe mais son corps est rendu en JavaScript et n'a pas pu être lu : utiliser ce miroir.)*

**Digital Omnibus on AI Regulation Proposal**
`https://digital-strategy.ec.europa.eu/en/library/digital-omnibus-ai-regulation-proposal` · Proposition législative (Commission) · publiée le **19 novembre 2025**, MAJ 19/01/2026 · consultée le 28/07/2026
Référence **CELEX 52025PC0836**, disponible avec ses annexes dans toutes les langues officielles. Le texte présente des « targeted simplification measures » visant une application « timely, smooth, and proportionate » de certaines dispositions de l'AI Act.
→ *QA* : la source primaire à montrer quand quelqu'un dit « l'AI Act a été reporté » — pour distinguer proposition, accord politique et publication au JOUE.

**Timeline for the Implementation of the EU AI Act — AI Act Single Information Platform**
`https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act` · Doc officielle (Bureau IA / DG CNECT) · date de MAJ non affichée · consultée le 28/07/2026
Quatre jalons officiels : **02/02/2025** (dispositions générales, littératie IA, interdictions), **02/08/2025** (modèles à usage général + gouvernance), **02/08/2026** (annexe III, **règles de transparence de l'article 50**, mesures de soutien à l'innovation, au moins un bac à sable réglementaire par État membre, **début de l'application effective**), **02/08/2027** (haut risque intégré aux produits réglementés). Un astérisque de renvoi vers la FAQ Digital Omnibus n'est apposé **qu'aux deux lignes « haut risque »**.
→ *QA* : montre que le **2 août 2026 — dans 5 jours — n'a pas bougé** pour l'article 50 ; seul le haut risque glisse.

**Frequently Asked Questions — catégorie « Digital Omnibus » (AI Act Service Desk)**
`https://ai-act-service-desk.ec.europa.eu/en/faq?faq_category_id=99` · FAQ officielle (Bureau IA) · date non affichée · consultée le 28/07/2026
Mécanique du report confirmée : annexe III **au maximum 16 mois plus tard** que prévu initialement, annexe I **au maximum 12 mois plus tard**, avec déclenchement lié à la **disponibilité des normes**. La FAQ mentionne aussi une période de transition de **6 mois** pour les fournisseurs devant intégrer rétroactivement des solutions de marquage/détectabilité dans leurs systèmes d'IA générative, et l'extension des allègements PME aux small mid-caps (**≈ 8 250 entreprises supplémentaires**).
→ *QA* : les chiffres « +16 mois / +12 mois » sont bien plus parlants que les dates brutes pour expliquer la logique « pas de règles sans normes ».

**AI Act Single Information Platform**
`https://ai-act-service-desk.ec.europa.eu/en` · Plateforme officielle (Bureau IA / DG CNECT) · date de MAJ non affichée · consultée le 28/07/2026
Rappelle l'entrée en vigueur au **1er août 2024** et met à disposition trois outils gratuits : **AI Act Explorer**, **Compliance Checker** et un **Service Desk** répondant dans la langue de l'utilisateur.
→ *QA* : le Compliance Checker fait un excellent exercice de 15 minutes en atelier pour classer l'outillage de test de l'entreprise.

**Implementation Timeline | EU Artificial Intelligence Act (artificialintelligenceact.eu)**
`https://artificialintelligenceact.eu/implementation-timeline/` · Tracker indépendant (Future of Life Institute) · **« Last updated: 1 August 2024 »** · consultée le 28/07/2026
⚠️ **Source à utiliser avec précaution** : le tracker le plus cité au monde affiche encore la chronologie d'origine (2 août 2026 pour « le reste de l'AI Act », 2 août 2027 pour l'art. 6(1)) et **n'intègre pas l'omnibus ni l'accord du 7 mai 2026**. Il reste excellent pour la correspondance jalon ↔ article (art. 113, 111, 112, 57, 70, 77).
→ *QA* : à montrer justement comme cas d'école de source périmée — l'exercice « vérifier la date de mise à jour d'une source » se fait ici en direct.

## 6.B Gouvernance, GPAI et normalisation

**European AI Office**
`https://digital-strategy.ec.europa.eu/en/policies/ai-office` · Doc officielle (Commission) · **MAJ 1er juin 2026** · consultée le 28/07/2026
Le Bureau IA emploie **plus de 125 personnes** réparties en **6 unités et 2 conseillers** (dont une unité « AI Safety » et une unité « Regulation and Compliance »). La page confirme noir sur blanc : « In November 2025, the 'AI omnibus' … proposed targeted amendments to the AI Act… **A political agreement was reached on 7 May 2026**. »
→ *QA* : confirmation croisée de la date clé, plus l'identité du régulateur à qui s'adressent les obligations GPAI.

**Governance and enforcement of the AI Act**
`https://digital-strategy.ec.europa.eu/en/policies/ai-act-governance-and-enforcement` · Doc officielle (Commission) · **MAJ 1er juin 2026** · consultée le 28/07/2026
La gouvernance repose sur **3 organes consultatifs** (AI Board, Scientific Panel, Advisory Forum) plus le Bureau IA ; chaque État membre devait avoir désigné et habilité ses autorités nationales compétentes **au plus tard le 2 août 2025**.
→ *QA* : répond à « qui va me contrôler ? » — question systématique dès qu'on parle de conformité en formation.

**The General-Purpose AI Code of Practice**
`https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai` · Code de bonnes pratiques (Commission / AI Office) · publié le **10 juillet 2025**, page MAJ 23/04/2026 · consultée le 28/07/2026
Le code comporte **3 chapitres** — Transparency, Copyright, Safety and Security — les deux premiers couvrant l'**article 53** de l'AI Act et le troisième l'**article 55** (modèles à risque systémique). La page liste **23 signataires**, dont Anthropic, Google, IBM, Microsoft, Mistral AI, OpenAI et Amazon (xAI n'ayant signé que le chapitre Safety and Security).
→ *QA* : montre que le fournisseur du modèle qu'on utilise en test a pris des engagements publics et vérifiables sur la transparence et le copyright.

**Standardisation of the AI Act**
`https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation` · Doc officielle (Commission) · **MAJ 20 mars 2026** · consultée le 28/07/2026
La Commission a demandé à CEN et CENELEC des normes dans **10 domaines clés** (gestion des risques, gouvernance et qualité des jeux de données, journalisation, transparence, supervision humaine, exactitude, robustesse, cybersécurité, management de la qualité, évaluation de la conformité) via la demande de normalisation **C(2025)3871**. Le **30 octobre 2025**, **prEN 18286 « Artificial Intelligence — Quality Management System for EU AI Act Regulatory Purposes »** est devenue la **première norme harmonisée IA à entrer en enquête publique**, en appui de l'**article 17**.
→ *QA* : les 10 domaines recoupent presque terme à terme un plan de test — exactitude, robustesse, journalisation, qualité des données : c'est le pont direct entre AI Act et métier QA.

**European AI Standardization | CEN-CENELEC JTC 21**
`https://jtc21.eu/` · Site officiel de comité technique (CEN-CENELEC, projet UE n° 101140954) · publié le 02/12/2024, modifié le **28 janvier 2026** · consultée le 28/07/2026
Le comité CEN-CLC/JTC 21 développe les normes européennes donnant aux fabricants la **présomption de conformité** à l'AI Act, et renvoie au portail CEN-CENELEC pour l'état d'avancement des projets.
→ *QA* : à citer pour expliquer pourquoi le report du haut risque est indexé sur la disponibilité des normes — sans JTC 21, pas de présomption de conformité.

## 6.C Normes de management et de gestion du risque IA

**ISO/IEC 42001:2023 — Information technology — Artificial intelligence — Management system**
`https://www.iso.org/standard/42001` · Norme internationale (ISO/IEC JTC 1/SC 42) · publiée le **18 décembre 2023** · consultée le 28/07/2026
Première norme mondiale de **système de management de l'IA (AIMS)**, édition 1, **51 pages**, **225 CHF**, fondée sur le cycle **Plan-Do-Check-Act**. La fiche ISO précise elle-même la différence avec les autres normes IA : 42001 est un *management system standard*, alors qu'ISO/IEC 23894 donne des lignes directrices de gestion du risque et qu'ISO/IEC 22989 / 23053 traitent terminologie et cadre ML. La page mentionne aussi le package **42001 + ISO/IEC 42005:2025** (évaluation d'impact des systèmes d'IA).
→ *QA* : c'est la norme qu'un client demandera en audit — utile pour situer où s'insèrent les preuves produites par l'équipe de test.

**ISO/IEC 23894:2023 — Information technology — Artificial intelligence — Guidance on risk management**
`https://www.iso.org/standard/77304.html` · Norme internationale (ISO/IEC JTC 1/SC 42) · publiée le **6 février 2023** · consultée le 28/07/2026
Édition 1, **26 pages**, **155 CHF**. Il s'agit de **lignes directrices**, non certifiables : le document explique comment intégrer la gestion du risque IA dans les activités et fonctions existantes de l'organisation, et est personnalisable selon le contexte.
→ *QA* : à opposer explicitement à 42001 (certifiable) dans la même diapo pour éviter la confusion la plus fréquente.

**AI Risk Management Framework (NIST)**
`https://www.nist.gov/itl/ai-risk-management-framework` · Cadre volontaire (agence fédérale américaine) · page créée le 12/07/2021, **mise à jour le 10 juin 2026** · consultée le 28/07/2026
La page confirme la publication du cadre le **26 janvier 2023** et celle du profil IA générative le **26 juillet 2024**. Elle indique explicitement que « **The AI RMF 1.0 is being revised** » et qu'au **7 avril 2026** le NIST a publié une note de cadrage pour un « AI RMF Profile on Trustworthy AI in Critical Infrastructure ».
→ *QA* : information rare et fraîche — le NIST AI RMF est en cours de révision, ce que la plupart des supports de formation ignorent encore.

**NIST AI 100-1 — Artificial Intelligence Risk Management Framework (AI RMF 1.0)**
`https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf` · Cadre volontaire, PDF officiel · **janvier 2023** · consultée le 28/07/2026
DOI **10.6028/NIST.AI.100-1**. Structuré en Part 1 (Foundational Information) et Part 2 (Core and Profiles) ; le document prévoit une revue formelle avec la communauté IA « **no later than 2028** ». Les quatre fonctions du Core (GOVERN, MAP, MEASURE, MANAGE) constituent le vocabulaire de référence.
→ *QA* : les fonctions MEASURE et MANAGE se cartographient directement sur les activités de test et de suivi post-déploiement.

**Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1)**
`https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence` · Notice de publication officielle NIST · publiée le **26 juillet 2024**, MAJ 08/04/2026 · consultée le 28/07/2026
DOI **10.6028/NIST.AI.600-1**, 8 auteurs (Autio, Schwartz, Dunietz, Jain, Stanley, Tabassi, Hall, Roberts) ; profil transversal du AI RMF 1.0 dédié à l'IA générative, adopté en application de l'**Executive Order 14110**.
→ *QA* : le seul document officiel qui liste des risques spécifiquement génératifs (confabulation, contenus dangereux, homogénéisation) exploitables comme catalogue de cas de test.
*(Note de vérification : le PDF direct `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf` n'a pas pu être re-fetché dans cette session ; le miroir NIST `https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=958388` est indiqué sur la notice officielle.)*

## 6.D Cadres sectoriels

**Règlement (UE) 2022/2554 du 14 décembre 2022 sur la résilience opérationnelle numérique du secteur financier (DORA)**
`https://eur-lex.europa.eu/eli/reg/2022/2554/oj/fra` · Texte réglementaire (EUR-Lex, version française) · adopté le 14/12/2022, publié au JOUE le 27/12/2022, **applicable depuis le 17 janvier 2025** · consultée le 28/07/2026
CELEX : **32022R2554**. Impose notamment des **tests de résilience opérationnelle numérique** et un encadrement contractuel strict des **prestataires tiers de services TIC** — catégorie dans laquelle tombe un fournisseur de LLM utilisé dans la chaîne de développement d'un établissement financier.
→ *QA* : pour les stagiaires du secteur bancaire/assurance, c'est DORA, pas l'AI Act, qui impose en premier des tests et un registre des prestataires.

**IEC 62304:2006 — Medical device software — Software life cycle processes**
`https://www.iso.org/standard/38421.html` · Norme internationale (ISO/TC 210) · publiée en **mai 2006**, confirmée en 2021, **sous revue systématique depuis le 15 juillet 2026** · consultée le 28/07/2026
Édition 1, **151 pages**, **380 CHF**, complétée par l'amendement **IEC 62304:2006/Amd 1:2015**. Elle définit les processus du cycle de vie du logiciel de dispositif médical et la classification de sécurité A/B/C qui conditionne la profondeur des activités de vérification.
→ *QA* : montre qu'en santé la charge de preuve de test préexiste largement à l'AI Act et se cumule avec lui (annexe I → 2 août 2028).

**ISO 21448:2022 — Road vehicles — Safety of the intended functionality (SOTIF)**
`https://www.iso.org/standard/77490.html` · Norme internationale (ISO/TC 22/SC 32) · publiée le **30 juin 2022**, stade 90.92 « to be revised » depuis le **14 octobre 2025** · consultée le 28/07/2026
Édition 1, **181 pages**, **227 CHF**. Traite de l'absence de risque déraisonnable dû aux **insuffisances fonctionnelles** (spécification ou performance des éléments E/E), s'applique aux niveaux d'automatisation de conduite **1 à 5**, et **exclut explicitement** les défaillances couvertes par la série ISO 26262 ainsi que les menaces de cybersécurité.
→ *QA* : la notion « le système fonctionne comme spécifié mais la spécification est insuffisante » est exactement le type de défaut que les tests classiques ne détectent pas — transposable aux systèmes à base de LLM.

**Artificial Intelligence — EASA (Artificial Intelligence Roadmap)**
`https://www.easa.europa.eu/en/domains/research-innovation/ai` · Feuille de route d'agence européenne (AESA) · date de MAJ non affichée · consultée le 28/07/2026
La page présente l'**EASA Artificial Intelligence Roadmap 2.0** (téléchargement : `https://www.easa.europa.eu/en/downloads/137919/en`), qui « provides a comprehensive action plan for the EASA AI Programme and sets the pace for conceptual guidance deliverables and anticipated rulemaking activities ».
→ *QA* : exemple d'un régulateur sectoriel qui construit sa propre doctrine IA en parallèle de l'AI Act, avec des niveaux de confiance progressifs.

**Intelligence artificielle (IA) — CNIL, espace professionnels**
`https://www.cnil.fr/fr/technologies/intelligence-artificielle-ia` · Doc officielle (autorité de contrôle française) · date de MAJ non affichée · consultée le 28/07/2026
Hub professionnel centralisant les fiches IA, le glossaire IA et le contact `ia[@]cnil.fr`. À noter pour la formation : **il n'existe pas, au 28/07/2026, de page CNIL dédiée au règlement européen sur l'IA** — la rubrique « Cadre européen » du site ne liste que RGPD, directive Police-Justice, directive ePrivacy et lignes directrices du CEPD. Le programme de travail CNIL du 7 avril 2026 mentionne l'accompagnement de la conformité « avec le RGPD et **certaines dispositions du RIA** ».
→ *QA* : évite de promettre aux stagiaires une doctrine CNIL sur l'AI Act qui n'existe pas encore — la CNIL n'est d'ailleurs pas (encore) l'autorité de surveillance du marché désignée pour l'ensemble du RIA.

### URLs écartées (mortes, vides ou non vérifiables) — notion 6
- `https://www.cnil.fr/fr/reglement-europeen-ia` → réponse **totalement vide** ; aucune page CNIL dédiée au RIA n'est atteignable depuis les hubs IA.
- `https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1024` → HTTP 200 mais corps rendu en JavaScript : seuls titre et chapô sont exploitables ; préférer le miroir digital-strategy.
- `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf` → non re-vérifiable dans la session (déduplication de cache), sans erreur HTTP ; utiliser la notice NIST officielle citée ci-dessus.
- Le moteur de recherche interne de la CNIL (`/fr/recherche?search_api_fulltext=`) est rendu en JavaScript et retourne 0 résultat via fetch : inexploitable pour de la recherche automatisée.

---

## ⚠️ Pièges et erreurs répandues (notions 5-6)

**1. Citer un calendrier AI Act de 2024 sans vérifier.** Le tracker le plus référencé, `artificialintelligenceact.eu/implementation-timeline/`, affiche encore « Last updated: 1 August 2024 » et **ignore l'omnibus**. La vérité officielle au 28/07/2026 : accord politique du **7 mai 2026**, haut risque annexe III repoussé au **2 décembre 2027**, haut risque intégré aux produits (annexe I) au **2 août 2028**, tandis que le **2 août 2026 reste inchangé** pour l'article 50 (transparence), les bacs à sable et le début de l'application effective.

**2. Confondre accord politique et texte en vigueur.** Un accord politique Parlement/Conseil n'est ni une adoption ni une publication au JOUE. Aucune source officielle vérifiée n'atteste, au 28/07/2026, de la publication du règlement modificatif. Formulation prudente à faire adopter aux stagiaires : « dates issues de l'accord politique du 7 mai 2026, en attente d'adoption formelle ».

**3. Croire que « ZDR = pas de logs ».** Le Zero Data Retention est **endpoint par endpoint** : chez OpenAI il ne couvre que `/v1/chat/completions` et `/v1/responses`, et **pas** `/v1/assistants`, `/v1/threads`, `/v1/files`, `/v1/fine_tuning/jobs`, `/v1/batches`. Par défaut, les **logs de surveillance des abus** sont générés et conservés jusqu'à 30 jours. Chez Anthropic, la rétention Enterprise est **indéfinie par défaut** tant qu'aucune durée personnalisée (minimum 30 jours) n'est configurée.

**4. Confondre anonymisation et pseudonymisation.** L'anonymisation est **irréversible** et fait sortir du RGPD ; la pseudonymisation (art. 4(5)) est **réversible** et les données restent personnelles. Test à trois critères (individualisation / corrélation / inférence), issu de l'avis 05/2014 du G29 et repris par les lignes directrices CEPD adoptées le 7 juillet 2026. « J'ai remplacé les noms par des UUID » = pseudonymisation, pas anonymisation.

**5. Confondre ISO/IEC 42001, ISO/IEC 23894 et l'AI Act.** 42001 est une **norme de système de management certifiable** (51 p., PDCA) ; 23894 n'est qu'un **guide de gestion du risque non certifiable** (26 p.) ; l'AI Act est un **règlement contraignant**. Aucune des deux normes ISO ne confère la présomption de conformité à l'AI Act — seules les **normes harmonisées CEN-CENELEC JTC 21 référencées au JOUE** le feront (la première, prEN 18286, n'est entrée en enquête publique que le 30 octobre 2025).

**6. Croire que « résidence UE » signifie « résidence France ».** Chez Microsoft, un déploiement DataZone créé dans un État membre de l'UE peut voir ses prompts traités **dans n'importe quel autre État membre**. L'EU Data Boundary couvre 27 pays UE + 4 pays AELE, dont la Suisse — qui n'est pas dans l'UE. Vérifier la région d'inférence, pas seulement la région de stockage.

**7. Prendre le guide ANSSI pour une source de conformité RGPD.** Les « Recommandations de sécurité pour un système d'IA générative » (29/04/2024) excluent **explicitement** de leur périmètre l'éthique, la vie privée et la protection des données personnelles. C'est une source sécurité, pas une source de conformité données.

**8. Oublier que le prompt n'est pas tout ce qui part.** GitHub Copilot Chat enrichit automatiquement le prompt du dépôt courant, des fichiers ouverts et de l'historique ; AWS avertit que les tags et champs texte libre remontent dans la facturation et les journaux de diagnostic. Le périmètre réel des données transmises dépasse toujours ce que le testeur a tapé — d'où l'intérêt d'un `.claudeignore` / d'une politique de fichiers ouverts.

**9. Utiliser un compte grand public pour du code client.** Les offres Free/Pro/Max relèvent d'un régime distinct : jusqu'à **5 ans** de conservation dé-identifiée si l'amélioration du modèle est activée, **2 ans** d'entrées/sorties et **7 ans** de scores de classification en cas de signalement trust & safety. L'offre commerciale, elle, stipule contractuellement qu'Anthropic « may not train models on Customer Content » et fait contracter l'entité **Anthropic Ireland, Limited** pour l'EEE.

**10. Oublier les cadres sectoriels antérieurs.** DORA (applicable depuis le **17 janvier 2025**), IEC 62304 (santé) ou ISO 21448 SOTIF (auto) imposent déjà des obligations de test et d'encadrement des prestataires tiers, indépendamment de l'AI Act — et se cumulent avec lui.
# NOTION 7 — Référentiels qualité et test (23 sources)

## 7.A — ISTQB : les certifications liées à l'IA (état en juillet 2026)

**Certified Tester AI Testing (CT-AI) Version 2.0**
`https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/` · Page officielle de certification / syllabus · MAJ 24/07/2026 · consultée le 28/07/2026
CT-AI **v2.0** est la version en vigueur et remplace CT-AI v1.0 ; l'examen compte **40 questions, 44 points, score de passage 29, 60 minutes**. Le syllabus porte sur le test **DES** systèmes fondés sur l'IA (ML et IA générative), avec une approche par cycle de vie : test des données d'entrée, test du modèle, test du développement ML. La v1.0 anglaise reste disponible jusqu'au **21 avril 2027** (non-anglaises jusqu'au 21 octobre 2027).
→ *QA* : c'est le référentiel qui donne le vocabulaire normé (caractéristiques qualité IA, métriques de performance fonctionnelle ML) pour parler sérieusement de qualité d'un système IA en formation.

**ISTQB® Releases Certified Tester AI Testing (CT-AI) Syllabus Version 2.0**
`https://istqb.org/istqb-releases-certified-tester-ai-testing-ct-ai-syllabus-version-2-0/` · Communiqué officiel ISTQB · publié le 21/04/2026 · consultée le 28/07/2026
Annonce de la sortie de la v2.0 : la **durée de formation recommandée passe de 4 jours à 3 jours** à couverture équivalente, et le syllabus intègre le test de l'IA générative et des LLM (test exploratoire, red teaming).
→ *QA* : fait daté et citable pour montrer aux stagiaires que le référentiel a été refondu en 2026 pour intégrer la GenAI.

**Certified Tester Specialist Level – Testing with Generative AI (CT-GenAI)**
`https://istqb.org/certifications/gen-ai/` · Page officielle de certification / syllabus · v1.1, MAJ 24/07/2026 · consultée le 28/07/2026
C'est la certification qui traite du test **AVEC** l'IA générative (l'inverse de CT-AI) : prompt engineering pour le test, gestion des risques (hallucinations, biais, sécurité, confidentialité, impact environnemental), solutions LLM et feuille de route d'adoption. Examen : **40 questions, 46 points, score de passage 30 (65 %), 60 minutes**.
→ *QA* : c'est LE référentiel qui correspond exactement au périmètre de la formation « Test logiciel avec IA générative » ; à citer d'emblée pour cadrer le sujet.

**Certifications — ISTQB®**
`https://istqb.org/certifications/` · Index officiel du schéma de certification · MAJ 27/05/2026 · consultée le 28/07/2026
Vue d'ensemble du schéma en 2026 : Core Foundation (CTFL v4.0), Core Advanced (CTAL-TA v4.0, CTAL-TTA, CTAL-TM v3.0, CTAL-TAE v2.0, CTAL-AT v2.0) et une trentaine de modules Specialist, dont **deux modules IA distincts : CT-AI v2.0 et CT-GenAI**, plus CT-AI v1.0 en retrait.
→ *QA* : permet de situer visuellement où se placent les deux modules IA dans le parcours, et d'éviter de les confondre.

## 7.B — ISTQB : le risque produit dans les référentiels cœur

**Certified Tester Foundation Level (CTFL) v4.0**
`https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/` · Page officielle de certification / syllabus · MAJ 16/05/2026 · consultée le 28/07/2026
Le socle du schéma : **40 questions, score de passage 26/40, 60 minutes**. Le chapitre « Managing the Test Activities » contient un sous-chapitre explicite **« Risk Management »**, et l'un des business outcomes est « Understand the impact of risk on testing ».
→ *QA* : c'est le prérequis obligatoire de CT-AI et CT-GenAI, et c'est là que le vocabulaire risque produit / risque projet est posé.

**Certified Tester Advanced Level Test Management (CTAL-TM) v3.0**
`https://istqb.org/certifications/certified-tester-advanced-level-test-management-ctal-tm-v3-0/` · Page officielle de certification / syllabus · MAJ 24/07/2026 · consultée le 28/07/2026
Contient une section entière **« Risk-based Testing »** (le test comme activité de mitigation du risque, identification des risques qualité, évaluation des risques qualité, techniques de test basé sur les risques, métriques de succès). Examen : **50 questions, 88 points, score de passage 58, 120 minutes**. Business outcome : « Organize risk identification and risk assessment sessions… and use the results to guide testing ».
→ *QA* : source d'autorité pour la partie « priorisation par les risques » de la notion 8, côté référentiel plutôt que côté recherche.

**Certified Tester Advanced Level Test Analyst (CTAL-TA) v4.0**
`https://istqb.org/certifications/certified-tester-advanced-level-test-analyst/` · Page officielle de certification / syllabus · MAJ 24/07/2026 · consultée le 28/07/2026
Contient la section **« The Tasks of the Test Analyst in Risk-Based Testing »** (analyse du risque, contrôle du risque). Examen : **45 questions, 78 points, score de passage 51, 120 minutes**. La v3.1 est retirée le 16 mai 2026 (anglais) / 16 novembre 2026 (autres langues).
→ *QA* : montre que le risk-based testing n'est pas qu'une affaire de manager — l'analyste de test a des tâches normées dessus, ce qui légitime le TP de priorisation.

## 7.C — ISO/IEC 25010 et 25059 (série SQuaRE)

**ISO/IEC 25010:2023 — Systems and software engineering — SQuaRE — Product quality model**
`https://www.iso.org/standard/78176.html` · Norme internationale · Édition 2, publiée le 15/11/2023 (stage 60.60) · consultée le 28/07/2026
**Édition 2 en vigueur, 22 pages, comité ISO/IEC JTC 1/SC 7, 155 CHF.** Le modèle de qualité produit est composé de **neuf caractéristiques** subdivisées en sous-caractéristiques (contre huit dans l'édition 2011). S'applique aux produits TIC et logiciels, y compris pour « identifying product and information system testing objectives ».
→ *QA* : c'est la référence à citer pour construire une grille de qualité produit ; le passage de 8 à 9 caractéristiques est le piège classique en formation.

**ISO/IEC 25010:2011 — SQuaRE — System and software quality models (RETIRÉE)**
`https://www.iso.org/standard/35733.html` · Norme internationale **retirée** · publiée 03/2011, retirée le 04/03/2024 (stage 95.99) · consultée le 28/07/2026
Édition 1, 34 pages. Modèle produit à **huit caractéristiques** + modèle de qualité en utilisation à **cinq caractéristiques**. Remplacée par un trio de documents : **ISO/IEC 25002:2024, ISO/IEC 25010:2023 et ISO/IEC 25019:2023**.
→ *QA* : à projeter pour démontrer, preuve à l'appui, que citer « ISO 25010:2011 » en 2026 est une erreur — et que la qualité en utilisation a migré vers 25019.

**ISO/IEC 25059:2023 — SQuaRE — Quality model for AI systems**
`https://www.iso.org/standard/80655.html` · Norme internationale · Édition 1, publiée le 28/06/2023 · consultée le 28/07/2026
**15 pages, comité ISO/IEC JTC 1/SC 42 (Intelligence artificielle), 100 CHF.** Extension de SQuaRE spécifique à l'IA : elle ajoute au modèle 25010 des caractéristiques propres aux systèmes IA. **Attention : son stage ISO est déjà 90.92 « International Standard to be revised »** — elle est en cours de révision.
→ *QA* : c'est la norme explicitement citée dans les business outcomes de CT-AI v2.0 (« Understand the specific AI quality characteristics defined by ISO/IEC 25059 »).

**ISO/IEC FDIS 25059 — SQuaRE — Quality models for AI systems**
`https://www.iso.org/standard/88234.html` · Projet final de norme internationale (FDIS) · stage 50.00 au 23/07/2026 · consultée le 28/07/2026
Édition 2 en cours d'approbation formelle : nouveau projet enregistré le 06/03/2024, clôture du vote DIS le 13/03/2026, **FDIS enregistré les 21-23 juillet 2026** — la publication est imminente. Noter le changement de titre au pluriel : « Quality **models** for AI systems ».
→ *QA* : fait d'actualité très fort (moins d'une semaine avant la formation) pour montrer que la normalisation qualité IA bouge encore.

## 7.D — ISO/IEC/IEEE 29119 (série test logiciel)

**ISO/IEC/IEEE 29119-1:2022 — Software testing — Part 1: Concepts and definitions**
`https://www.iso.org/standard/81291.html` · Norme internationale · Édition 2, publiée le 04/02/2022 (stage 60.60) · consultée le 28/07/2026
**51 pages, ISO/IEC JTC 1/SC 7.** Définit les concepts généraux du test logiciel et introduit les concepts clés utilisés dans toute la série 29119 ; remplace l'édition 2013. *(Note de vérification : la page en anglais renvoyait un corps vide au fetch ; le contenu a été confirmé sur le miroir français `https://www.iso.org/fr/standard/81291.html`, même identifiant.)*
→ *QA* : la partie 1 est disponible gratuitement auprès de l'ISO — utile comme lecture de référence à donner aux stagiaires.

**ISO/IEC/IEEE 29119-2:2021 — Software testing — Part 2: Test processes**
`https://www.iso.org/standard/79428.html` · Norme internationale · Édition 2, publiée le 28/10/2021 (stage 60.60) · consultée le 28/07/2026
Spécifie les processus de test à trois niveaux (organisationnel, gestion de test, test dynamique) utilisables « for any organization, project or testing activity ». Prix : **204 CHF**.
→ *QA* : donne le cadre processus dans lequel s'insère l'analyse de risque produit (planification du test), utile pour ancrer la notion 8.

**ISO/IEC TR 29119-11:2020 — Software testing — Part 11: Guidelines on the testing of AI-based systems**
`https://www.iso.org/standard/79016.html` · **Rapport technique (TR), pas une norme** · Édition 1, publiée le 27/11/2020 · stage 90.60 « Close of review » au 05/03/2026 · consultée le 28/07/2026
Document **gratuit** auprès de l'ISO. Il pointe explicitement le **problème de l'oracle de test** comme difficulté principale : « the main challenge being the test oracle problem, whereby testers find it difficult to determine expected results for testing ». Il vient de passer une revue systématique en mars 2026 et n'est ni retiré ni remplacé.
→ *QA* : c'est la source normative gratuite la plus directement exploitable en TP sur « comment tester un système dont on ne connaît pas le résultat attendu ».

**ISO/IEC/IEEE 29119 Software Testing — site officiel du groupe de travail**
`https://softwaretestingstandard.org/` · Site officiel du WG (documentation de la série) · consultée le 28/07/2026
Recense **huit parties actives** dans la série : 1 (Concepts and Definitions), 2 (Test Processes), 3 (Test Documentation), 4 (Test Techniques), 5 (Keyword Driven Testing), 6 (Guidelines for Agile), **11 (Testing of AI-Based Systems)**, 13 (Testing of Biometric Systems), plus deux normes support (ISO/IEC 20246:2017 revues, ISO/IEC 33063:2015 modèle d'évaluation de processus). La série est maintenue par **ISO/IEC JTC 1/SC 7/WG 26**.
→ *QA* : la seule page qui donne d'un coup d'œil la cartographie complète de la série — parfait pour une slide.

## 7.E — Normes ISO du cycle de vie et du management de l'IA

**ISO/IEC 5338:2023 — Information technology — Artificial intelligence — AI system life cycle processes**
`https://www.iso.org/standard/81118.html` · Norme internationale · Édition 1, publiée le 20/12/2023 (stage 60.60) · consultée le 28/07/2026
**39 pages, ISO/IEC JTC 1/SC 42, 181 CHF.** Définit les processus et concepts décrivant le cycle de vie des systèmes IA « based on machine learning and heuristic systems » ; c'est une adaptation de l'ISO/IEC/IEEE 12207 au contexte IA.
→ *QA* : sert à répondre à la question « où et quand teste-t-on dans un projet IA ? » avec un découpage normé plutôt qu'improvisé.

**ISO/IEC 42001:2023 — Information technology — Artificial intelligence — Management system**
`https://www.iso.org/standard/81230.html` · Norme internationale (certifiable) · Édition 1, publiée le 18/12/2023 · consultée le 28/07/2026
**51 pages, ISO/IEC JTC 1/SC 42, 225 CHF.** Première norme mondiale de **système de management de l'IA (SMIA/AIMS)** : elle spécifie les exigences pour établir, mettre en œuvre, maintenir et améliorer en continu un système de management de l'IA. ⚠️ Ne pas utiliser l'URL `.../standard/42001.html` avec le suffixe `.html` : elle pointe vers une norme d'outillage mécanique sans rapport.
→ *QA* : c'est le pendant « organisation/gouvernance » de la qualité IA, à opposer à 25010/25059 qui sont côté « produit ».

**ISO/IEC 22989:2022 — Artificial intelligence — Artificial intelligence concepts and terminology**
`https://www.iso.org/standard/74296.html` · Norme internationale · Édition 1, publiée le 19/07/2022 · consultée le 28/07/2026
**60 pages, ISO/IEC JTC 1/SC 42, prix 0 CHF (norme gratuite).** Fournit la terminologie IA normalisée utilisée par toutes les autres normes SC 42.
→ *QA* : glossaire officiel et gratuit à distribuer, pour aligner le vocabulaire IA du groupe dès le jour 1.

## 7.F — TMMi (maturité du processus de test)

**TMMi Model**
`https://www.tmmi.org/tmmi-model/` · Documentation officielle du modèle · MAJ 01/07/2026 · consultée le 28/07/2026
Modèle étagé de maturité du test en **5 niveaux** : 1 Initial (ad hoc), 2 Managed (politique et stratégie de test, planification, techniques de conception, environnements dédiés), 3 Defined (test intégré au cycle de vie, revues, test non fonctionnel), 4 Measured (mesure du processus et de la qualité produit), 5 Optimization (prévention des défauts, amélioration continue).
→ *QA* : cadre utile pour dire à une équipe « voici où l'IA générative peut vous aider selon votre niveau de maturité actuel ».

**TMMi Documents**
`https://www.tmmi.org/tmmi-documents/` · Bibliothèque documentaire officielle · MAJ 24/06/2026 · consultée le 28/07/2026
La version courante est le **TMMi Framework Model v2.0**, qui « integrates Agile and DevOps practices and examples, and has a distinct connection to Quality Engineering and Artificial Intelligence (AI) ». Les évaluations basées sur la Release 1.3 sont retirées **après le 1er août 2027**. On y trouve aussi un document dédié : **« Testing AI-systems and TMMi – V1.0 »**, qui reprend les domaines de processus du niveau 2 un par un dans le contexte du test de systèmes IA.
→ *QA* : rare document qui croise explicitement maturité du test et systèmes IA, et il est téléchargeable gratuitement.

**TMMi News / TMMi and Artificial Intelligence**
`https://www.tmmi.org/news/` · Actualités de la fondation · article daté du 19/01/2026 · consultée le 28/07/2026
Annonce d'un article « TMMi in the age of AI » qui « explores how TMMi provides structure, clarity, and governance in AI-driven environments ». La même page donne un chiffre d'adoption : **135 évaluations TMMi conduites en 2024 (+75 %)**, et une croissance de **59 % au premier semestre 2025** par rapport au premier semestre 2024.
→ *QA* : chiffre d'adoption concret pour montrer que le sujet « maturité du test » n'est pas mort à l'ère de l'IA.

**Certified Organizations — TMMi**
`https://www.tmmi.org/accredited-certifications/` · Registre officiel des organisations certifiées · consultée le 28/07/2026
Registre nominatif des organisations certifiées TMMi par niveau (numéro de certificat, expiration, prestataire d'évaluation) ; le comptage brut des lignes du tableau donne **de l'ordre de 290 organisations certifiées** (chiffre à présenter comme un ordre de grandeur relevé sur la page, non comme une statistique publiée par TMMi).
→ *QA* : preuve tangible que TMMi est un référentiel réellement audité, et non un modèle théorique.

## 7.G — CFTL (Comité Français des Tests Logiciels)

**CFTL — Comité Français des Tests Logiciels**
`https://cftl.fr/` · Site officiel du member board français de l'ISTQB · MAJ 09/03/2026 · consultée le 28/07/2026 · *(redirection : `https://www.cftl.fr/` → `https://cftl.fr/`)*
Le CFTL agit « en tant qu'unique représentant de l'ISTQB® … en France et dans tous les pays francophones ne possédant pas de comité » : il développe et fait administrer les examens et accrédite les formateurs et organismes de formation.
→ *QA* : à citer pour expliquer aux stagiaires par quel canal passer concrètement en France pour se certifier CT-GenAI ou CT-AI.

**Comprendre Les Tests — CFTL**
`https://cftl.fr/tests-logiciels/comprendre-les-tests/` · Page pédagogique officielle (en français) · MAJ 07/11/2025 · consultée le 28/07/2026
Présente le schéma ISTQB en trois niveaux (Fondation, Avancé — Manageur / Analyste / Analyste technique — et Expert) et avance le chiffre de **plus d'un million de personnes certifiées ISTQB dans le monde**.
→ *QA* : source francophone officielle, idéale pour un public français qui n'ira pas lire istqb.org en anglais.

**Glossaire ISTQB® — CFTL**
`https://cftl.fr/tests-logiciels/glossaire-istqb/` · Page de renvoi officielle vers le glossaire francophone · MAJ 23/02/2024 · consultée le 28/07/2026
Le CFTL n'héberge pas son propre glossaire mais renvoie vers la version française du glossaire ISTQB (`https://glossary.istqb.org/fr_FR/...`) : c'est la référence terminologique francophone officielle pour « test basé sur les risques », « risque produit », etc.
→ *QA* : permet d'imposer un vocabulaire français normé en TP, au lieu de traductions maison.
⚠️ *Réserve de vérification* : l'application `glossary.istqb.org` est une SPA JavaScript ; ses pages renvoient un corps vide au fetch. Ne pas citer une définition verbatim du glossaire sans l'avoir ouverte dans un navigateur.

---

# NOTION 8 — Priorisation des tests par les risques (23 sources)

## 8.A — Théorie du risk-based testing

**Risk-Based E-Business Testing (Gerrard & Thompson)**
`https://openlibrary.org/isbn/1580533140` · Notice bibliographique d'ouvrage · Artech House, 1re édition, 15/08/2002, 430 pages · consultée le 28/07/2026 · *(redirection vers `https://openlibrary.org/books/OL8780195M/`)*
Ouvrage fondateur du risk-based testing appliqué (ISBN-13 **9781580533140**, LCCN 2002074496) : Paul Gerrard et Neil Thompson y formalisent l'inventaire de risques, la matrice risque/test et l'idée que la stratégie de test se déduit des risques et non de l'exhaustivité.
→ *QA* : référence historique à citer pour montrer que le risk-based testing précède de vingt ans l'IA — l'IA n'invente pas la priorisation, elle l'outille.
⚠️ *Réserve* : `gerrardconsulting.com` n'héberge plus de contenu (page technique vide) — ne pas la citer.

**Practical Risk-Based Testing — Product RISk MAnagement: the PRISMA® method (v1.5)**
`https://www.erikvanveenendaal.nl/site/wp-content/uploads/PRISMA-white-paper-v1.5.pdf` · Livre blanc industriel (Erik van Veenendaal, Improve Quality Services BV) · v1.5, janvier 2018 · consultée le 28/07/2026
Méthode PRISMA : chaque élément à tester est coté sur **deux axes — la probabilité de défauts (risque technique) et l'impact des défauts (risque métier)** — puis positionné dans une **matrice de risque produit à quatre quadrants (I à IV)**, chacun associé à une profondeur et un type de test différenciés. Retours d'expérience cités : **+10 % de Defect Detection Percentage** après introduction de PRISMA, et une note d'utilité moyenne de **7,5/10** auprès d'une vingtaine d'entreprises.
→ *QA* : c'est la méthode la plus directement transposable en TP — les 4 quadrants donnent une consigne de priorisation immédiatement actionnable pour un backlog de tests Angular/.NET.

**A taxonomy of risk-based testing (Felderer & Schieferdecker)**
`https://link.springer.com/article/10.1007/s10009-014-0332-3` · Article de recherche évalué par les pairs · Int. J. Softw. Tools Technol. Transf. 16(5):559-568, 2014 · consultée le 28/07/2026
Taxonomie de référence structurant le domaine en **trois classes de premier niveau : risk drivers, risk assessment, risk-based test process**. Définit le risk-based testing comme l'usage de (ré)évaluations du risque pour piloter toutes les phases du processus de test.
→ *QA* : donne une définition académique citable, plus rigoureuse que les définitions marketing d'éditeurs d'outils.

**Integrating risk-based testing in industrial test processes (Felderer & Ramler)**
`https://link.springer.com/article/10.1007/s11219-013-9226-y` · Article de recherche évalué par les pairs · Software Quality Journal 22(3):543-575, 2014 · consultée le 28/07/2026
Identifie les prérequis à l'introduction du RBT en industrie : une **distribution non homogène du risque** dans le produit et la nécessité de combiner une vue technique et une vue métier. Bénéfices constatés : détection plus rapide des défauts et livraison plus précoce.
→ *QA* : argument à opposer au réflexe « on teste tout uniformément » — sans hétérogénéité du risque, la priorisation n'apporte rien.

**A multiple case study on risk-based testing in industry (Felderer & Ramler)**
`https://link.springer.com/article/10.1007/s10009-014-0328-z` · Article de recherche évalué par les pairs · Int. J. Softw. Tools Technol. Transf. 16(5):609-625, 2014 · consultée le 28/07/2026
Étude de cas multiple sur **trois contextes industriels** : un grand système d'information web, des équipements de mesure/diagnostic pour l'industrie électrique, et le processus de test d'un intégrateur télécom.
→ *QA* : fournit trois contextes réels pour illustrer que le même principe de priorisation se décline différemment selon le domaine.

## 8.B — Defect prediction : churn, complexité, JIT

**Use of Relative Code Churn Measures to Predict System Defect Density**
`https://www.microsoft.com/en-us/research/publication/use-of-relative-code-churn-measures-to-predict-system-defect-density/` · Papier de recherche (ICSE 2005), Microsoft Research · 2005 · consultée le 28/07/2026 · *(PDF : `https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/icse05churn.pdf`)*
Étude de cas sur **Windows Server 2003** : la suite de métriques de **code churn relatif** discrimine les binaires fault-prone des binaires non fault-prone avec une **exactitude de 89,0 %**. Le point clé est que ce sont les mesures *relatives* (churn normalisé par la taille), et non absolues, qui sont prédictives.
→ *QA* : le chiffre de 89 % justifie devant une équipe qu'un simple `git log` (churn) suffit à faire une première priorisation de tests, sans IA.

**Mining Metrics to Predict Component Failures**
`https://www.microsoft.com/en-us/research/publication/mining-metrics-to-predict-component-failures/` · Papier de recherche (ICSE 2006 / MSR-TR-2005-149), Microsoft Research · novembre 2005 · consultée le 28/07/2026
Étude de l'historique de défauts post-livraison de **cinq systèmes Microsoft** : les entités fault-prone sont statistiquement corrélées aux mesures de complexité du code, mais **« there is no single set of complexity metrics that could act as a universally best defect predictor »** — les prédicteurs ne se transfèrent qu'entre projets similaires.
→ *QA* : nuance essentielle à faire passer — un modèle de prédiction de défauts se calibre par projet, on ne recopie pas les seuils d'un autre contexte.

**A Large-Scale Empirical Study of Just-in-Time Quality Assurance (Kamei et al.)**
`https://posl.ait.kyushu-u.ac.jp/~kamei/publications/Kamei_TSE2013.pdf` · Papier de recherche évalué par les pairs (PDF hébergé par l'auteur, Kyushu University) · IEEE TSE 39(6):757-773, juin 2013 · consultée le 28/07/2026
Papier fondateur du **Just-In-Time defect prediction** (prédiction au niveau du *changement* et non du fichier) : **68 % d'exactitude et 64 % de rappel** en moyenne ; en évaluation sensible à l'effort, **« using only 20 percent of the effort it would take to inspect all changes, we can identify 35 percent of all defect-inducing changes »**.
→ *QA* : le ratio 20 % d'effort → 35 % des changements fautifs est le chiffre parfait pour introduire la logique coût/bénéfice de la priorisation.

**A Systematic Survey of Just-in-Time Software Defect Prediction (Zhao, Damevski & Chen)**
`https://api.crossref.org/works/10.1145/3567550` · Revue systématique évaluée par les pairs (métadonnées + résumé via Crossref) · ACM Computing Surveys 55(10), art. 201, en ligne le 02/02/2023 · consultée le 28/07/2026
Synthèse de **67 études de JIT-SDP** ; la méta-analyse montre que la performance prédictive **corrèle avec le taux de changements défectueux** du projet : le JIT-SDP est d'autant plus performant que le projet a un ratio de défauts élevé.
→ *QA* : recadrage honnête à donner en formation — ces techniques marchent bien sur du code déjà buggé, moins sur une base saine.
⚠️ *Réserve* : le DOI `https://doi.org/10.1145/3567550` redirige vers `dl.acm.org`, inaccessible depuis le bac à sable ; le résumé a été lu via l'API Crossref.

## 8.C — Test case prioritization : les fondations académiques

**Prioritizing Test Cases For Regression Testing (Rothermel, Untch, Chu, Harrold)**
`https://dblp.org/rec/journals/tse/RothermelUCH01.html` · Notice bibliographique de référence (dblp) · IEEE Trans. Software Eng. 27(10):929-948, 2001 · DOI 10.1109/32.962562 · consultée le 28/07/2026
Papier canonique qui introduit la métrique **APFD (Average Percentage of Faults Detected)**, devenue l'étalon d'évaluation de toute technique de priorisation de tests : une APFD proche de 100 % signifie que les tests détectant les défauts sont exécutés très tôt dans la séquence.
→ *QA* : sans APFD, impossible de comparer objectivement « priorisation IA » et « priorisation manuelle » en TP — c'est la métrique à faire calculer aux stagiaires.
⚠️ *Réserve de vérification* : le texte intégral est sous paywall IEEE et **aucune copie en accès ouvert n'a pu être vérifiée** (Unpaywall : `is_oa: false`) ; seule la notice bibliographique a été lue.

**Test Case Prioritization: A Family of Empirical Studies (Elbaum, Malishevsky, Rothermel)**
`https://dblp.org/rec/journals/tse/ElbaumMR02.html` · Notice bibliographique de référence (dblp) · IEEE Trans. Software Eng. 28(2):159-182, 2002 · DOI 10.1109/32.988497 · consultée le 28/07/2026
Série d'études empiriques qui compare systématiquement les techniques de priorisation (aléatoire, par couverture totale, par couverture additionnelle, par probabilité d'exposition de faute) et établit qu'aucune technique n'est universellement supérieure — le choix dépend du contexte.
→ *QA* : antidote au discours « l'outil IA trouve le bon ordre » : le bon ordre dépend de l'objectif (détecter vite vs couvrir large).
⚠️ *Réserve* : même situation de paywall que ci-dessus, seule la notice a pu être lue.

## 8.D — Priorisation assistée par ML/IA à l'échelle industrielle

**Predictive Test Selection (Machalica, Samylkin, Porth, Chandra — Facebook/Meta)**
`https://arxiv.org/abs/1810.05286` · Préprint arXiv (cs.SE), soumis le 11/10/2018, v2 le 29/05/2019 · consultée le 28/07/2026
Sélection de tests par apprentissage automatique entraîné sur l'historique des exécutions : le système **divise par deux le coût total d'infrastructure de test**, tout en garantissant que **plus de 95 % des échecs de test individuels et plus de 99,9 % des changements fautifs** sont toujours remontés aux développeurs.
→ *QA* : chiffres de référence pour montrer le compromis explicite et assumé (on accepte de rater ~5 % des échecs individuels pour diviser le coût par deux).

**Predictive test selection: A more efficient way to ensure reliability of code changes**
`https://engineering.fb.com/2018/11/21/developer-tools/predictive-test-selection/` · Billet d'ingénierie officiel (Meta/Facebook Engineering) · 21/11/2018 · consultée le 28/07/2026
Version vulgarisée du papier : le système « catch more than 99.9 percent of all regressions before they are visible… while running just a **third of all tests** that transitively depend on modified code ».
→ *QA* : la formulation « un tiers des tests, 99,9 % des régressions » est la phrase à retenir pour vendre l'approche à un management.

**Taming Google-Scale Continuous Testing (Memon et al.)**
`https://research.google/pubs/taming-google-scale-continuous-testing/` · Papier de recherche évalué par les pairs (ICSE-SEIP 2017), Google Research · 2017 · consultée le 28/07/2026
Analyse du système de test continu de Google : **très peu de tests échouent un jour donné**, mais ceux qui échouent sont généralement « plus proches » du code qu'ils testent ; certains fichiers fréquemment modifiés et certains outils/utilisateurs causent davantage de casses ; et **le code modifié récemment par plus de 3 développeurs casse plus souvent**.
→ *QA* : les trois signaux (proximité, fréquence de modification, nombre d'auteurs) sont exactement les features à donner à Claude Code pour prioriser un plan de test.

**Techniques for Improving Regression Testing in Continuous Integration Development Environments (Elbaum, Rothermel, Penix)**
`https://research.google/pubs/techniques-for-improving-regression-testing-in-continuous-integration-development-environments/` · Papier de recherche évalué par les pairs (FSE 2014), Google · 2014 · consultée le 28/07/2026
Propose de combiner **sélection de tests en pre-submit** et **priorisation de tests en post-submit** ; point remarquable : les algorithmes sont « relatively inexpensive and **do not rely on code coverage information** », et sont évalués sur un large jeu de données Google.
→ *QA* : montre qu'on peut prioriser sans instrumentation de couverture — décisif quand la couverture est coûteuse à collecter sur une stack Angular + .NET.

**Test Impact Analysis (TIA) — Azure Pipelines**
`https://learn.microsoft.com/en-us/azure/devops/pipelines/test/test-impact-analysis?view=azure-devops` · Documentation officielle produit (Microsoft) · consultée le 28/07/2026
TIA « automatically selects only the subset of tests required to validate the code being committed », avec un **repli automatique sur l'exécution complète** quand l'outil ne sait pas raisonner sur un changement (types de fichiers hors code managé, par exemple).
→ *QA* : implémentation industrielle disponible nativement sur la stack .NET des TP — le mécanisme de fallback est le point de sécurité à souligner.

## 8.E — Tests instables (flaky tests) dans la priorisation

**Flaky Tests at Google and How We Mitigate Them (John Micco)**
`https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html` · Billet d'ingénierie officiel (Google Testing Blog) · 27/05/2016 · consultée le 28/07/2026
Trois chiffres majeurs : **environ 1,5 % de toutes les exécutions de tests remontent un résultat « flaky »** ; **près de 16 % des tests présentent un certain niveau d'instabilité** ; et **environ 84 % des transitions pass → fail observées impliquent un test flaky**.
→ *QA* : ces 84 % expliquent pourquoi tout modèle de priorisation entraîné sur l'historique d'échecs doit d'abord filtrer les flaky, sinon il apprend du bruit.

**An Empirical Analysis of Flaky Tests (Luo, Hariri, Eloussi, Marinov)**
`http://mir.cs.illinois.edu/marinov/publications/LuoETAL14FlakyTestsAnalysis.pdf` · Papier de recherche évalué par les pairs (FSE 2014), PDF hébergé par l'université (UIUC) · 2014 · consultée le 28/07/2026
Première étude systématique des causes d'instabilité : analyse détaillée de **201 commits** corrigeant vraisemblablement des tests flaky dans **51 projets open source**, avec une taxonomie des causes (attentes asynchrones, concurrence, ordre d'exécution des tests…).
→ *QA* : donne une grille de diagnostic des causes de flakiness, utile pour faire produire à l'IA un correctif ciblé plutôt qu'un `retry` générique.

## 8.F — Mutation testing comme mesure de risque

**State of Mutation Testing at Google (Petrović & Ivanković)**
`https://research.google/pubs/state-of-mutation-testing-at-google/` · Papier de recherche évalué par les pairs (ICSE-SEIP 2018), Google Research · 2018 · consultée le 28/07/2026 · *(PDF : `https://storage.googleapis.com/gweb-research2023-media/pubtools/4203.pdf`)*
Déploiement du test par mutation à l'échelle : utilisé par **6 000 ingénieurs** sur tous les changements qu'ils écrivent ou revoient, touchant au total **plus de 14 000 auteurs de code**, et traitant **environ 30 % de tous les diffs de Google** pour lesquels la couverture d'instructions est calculée. La clé du passage à l'échelle est de ne présenter que quelques mutants pertinents par diff, pendant la revue de code.
→ *QA* : prouve que le mutation testing est industrialisable si l'on cible les mutants — mode d'emploi directement transposable avec un agent IA.

**Are Mutants a Valid Substitute for Real Faults in Software Testing? (Just et al.)**
`https://homes.cs.washington.edu/~rjust/publ/mutants_real_faults_fse_2014.pdf` · Papier de recherche évalué par les pairs (FSE 2014, ACM SIGSOFT Distinguished Paper), PDF hébergé par l'auteur (University of Washington) · 2014 · consultée le 28/07/2026
Expérimentation sur **357 défauts réels** dans **5 applications open source** totalisant **321 000 lignes de code** : les résultats montrent une **corrélation statistiquement significative entre la détection de mutants et la détection de défauts réels, indépendamment de la couverture de code**.
→ *QA* : c'est la justification scientifique pour utiliser le score de mutation — et non la couverture — comme indicateur de risque résiduel d'une suite de tests.

**Are mutation scores correlated with real fault detection? (Papadakis, Shin, Yoo, Bae)**
`https://dblp.org/rec/conf/icse/PapadakisSYB18.html` · Notice bibliographique de référence (dblp) · ICSE 2018, pp. 537-548 · DOI 10.1145/3180155.3180183 · consultée le 28/07/2026
Étude empirique à grande échelle sur la relation entre mutants et défauts réels ; elle nuance le résultat de Just et al. en montrant que la corrélation, si elle existe, est fortement affectée par la taille de la suite de tests (facteur de confusion).
→ *QA* : le contrepoint indispensable pour ne pas survendre le score de mutation comme mesure absolue de risque.
⚠️ *Réserve de vérification* : texte intégral sous paywall ACM (`dl.acm.org` inaccessible depuis le bac à sable) ; seule la notice bibliographique a pu être lue.

## 8.G — Apprentissage automatique et LLM appliqués à la priorisation

**Reinforcement Learning for Automatic Test Case Prioritization and Selection in Continuous Integration (Spieker, Gotlieb, Marijan, Mossige)**
`https://arxiv.org/abs/1811.04122` · Préprint arXiv de l'article ISSTA 2017 (pp. 12-22, DOI 10.1145/3092703.3092709) · consultée le 28/07/2026
Présente **Retecs**, une méthode d'apprentissage par renforcement qui sélectionne et priorise les cas de test « according to their **duration, previous last execution and failure history** », validée sur **trois études de cas industrielles**. L'agent apprend en continu à partir du retour d'échec/succès de chaque cycle CI.
→ *QA* : montre que trois signaux très simples (durée, dernière exécution, historique d'échecs) suffisent — un excellent modèle de départ à faire implémenter par Claude Code sur le pipeline des TP.

**Redefining Crowdsourced Test Report Prioritization: An Innovative Approach with Large Language Model (LLMPrior)**
`https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4741001` · Préprint en accès libre (version de revue : Information and Software Technology, 2025, DOI 10.1016/j.infsof.2024.107629) · déposé en février 2024 · consultée le 28/07/2026
Utilise un LLM pour **regrouper (clustering) les rapports de test puis les prioriser algorithmiquement** ; les auteurs rapportent que LLMPrior « not only outperforms the current state-of-the-art approach, but is also more feasible, efficient, and reliable ».
→ *QA* : exemple récent et vérifiable de LLM utilisé non pas pour générer des tests mais pour **ordonner** un backlog de test — exactement le geste travaillé au jour 4.
⚠️ *Réserve* : aucune version arXiv n'a pu être trouvée ; la version publiée est sous paywall Elsevier, le résumé a été lu sur SSRN.

---

## ⚠️ Pièges et erreurs répandues (notions 7-8)

**1. Citer « ISO/IEC 25010:2011 » et ses 8 caractéristiques.** L'édition 2011 est **retirée depuis le 4 mars 2024**. L'édition en vigueur est **ISO/IEC 25010:2023 (édition 2), avec neuf caractéristiques** de qualité produit. De plus, le modèle de « qualité en utilisation » ne fait plus partie de 25010 : il a migré vers **ISO/IEC 25019:2023**, et le cadre général vers **ISO/IEC 25002:2024**. Dire « les 8 caractéristiques de la 25010 » en 2026 est doublement faux.

**2. Confondre ISO/IEC TR 29119-11 (rapport technique) et une norme.** La partie 11 est un **Technical Report** : ce sont des *guidelines*, non des exigences normatives, et elle est **gratuite**. On ne peut pas « être conforme à la 29119-11 ». À l'inverse, les parties 1 à 6 et 13 sont, elles, de vraies normes internationales. Autre nuance : le TR date de 2020 et vient seulement de passer une revue systématique (stage 90.60, mars 2026) — il ne couvre pas l'IA générative.

**3. Croire que CT-AI enseigne à tester AVEC l'IA.** CT-AI (v2.0) porte sur le test **DES systèmes d'IA** (données, modèle, développement ML, LLM). Le module qui traite du test **AVEC** l'IA générative est **CT-GenAI** — c'est écrit noir sur blanc sur la page CT-AI : « Candidates interested in using generative AI to support testing activities should consider the ISTQB® CT-GenAI certification ». Pour une formation « Test logiciel avec IA générative », la référence pertinente est CT-GenAI, pas CT-AI.

**4. Présenter ISO/IEC 25059 comme stable.** La 25059:2023 est déjà au stage **90.92 « to be revised »**, et un **FDIS (édition 2) était enregistré les 21-23 juillet 2026** — soit quelques jours avant la formation. Il faut annoncer la version citée et la date de consultation.

**5. Confondre les périmètres ISO 42001 / 25059 / 5338.** 42001 = **système de management** de l'IA (organisation, certifiable) ; 25059 = **modèle de qualité produit** pour l'IA ; 5338 = **processus de cycle de vie** d'un système IA. Les mélanger dans une même slide « les normes IA » est l'erreur la plus fréquente.

**6. Annoncer « X % de couverture donc risque maîtrisé ».** Just et al. (FSE 2014) montrent que la détection de mutants corrèle avec la détection de défauts réels **indépendamment de la couverture** ; et Papadakis et al. (ICSE 2018) rappellent que la corrélation entre score de mutation et défauts réels est elle-même confondue par la taille de la suite de tests. Ni la couverture ni le score de mutation ne sont une mesure directe du risque résiduel.

**7. Entraîner une priorisation sur un historique d'échecs non nettoyé des flaky.** Chez Google, **84 % des transitions pass → fail impliquent un test flaky** : un modèle naïf apprendra à prioriser les tests instables plutôt que les tests révélateurs de vrais défauts. Le dé-flaking est un prérequis, pas une option.

**8. Sur-vendre les chiffres de Meta.** Le papier « Predictive Test Selection » annonce **> 95 %** des échecs de test *individuels* et **> 99,9 %** des *changements fautifs* — ce n'est pas « 99,9 % des échecs de test ». La confusion entre les deux taux est très répandue dans les articles de seconde main.

**9. Croire que la prédiction de défauts est transférable telle quelle.** Nagappan, Ball & Zeller (ICSE 2006) sont explicites : « there is no single set of complexity metrics that could act as a universally best defect predictor ». Un modèle se recalibre sur chaque projet ; et la revue ACM CSUR 2023 (67 études) confirme que la performance du JIT-SDP dépend du taux de changements défectueux du projet.

**10. Oublier que le risk-based testing suppose un risque hétérogène.** Felderer & Ramler l'identifient comme prérequis : si le risque est uniformément réparti dans le produit, la priorisation n'apporte aucun gain. Il faut le vérifier avant de vendre la démarche.

---

### Note méthodologique sur la vérification

Toutes les URL ci-dessus ont été récupérées et **lues** via des requêtes HTTP réelles le 28/07/2026. Les sources dont seule la notice bibliographique a pu être lue (paywall IEEE/ACM inaccessible depuis l'environnement) sont signalées par une ⚠️ *Réserve de vérification*.

**URL écartées (mortes, vides ou non vérifiables) :**
- `https://gerrardconsulting.com/` — plus de contenu éditorial (page technique de serveur mail).
- `https://softwaretestingstandard.org/29119-11/` et toutes ses variantes — corps vide (SPA), seule la racine `/` est exploitable.
- `https://glossary.istqb.org/en_US/...` — application JavaScript, corps vide au fetch : ne pas citer de définition verbatim sans vérification navigateur.
- `https://istqb.org/istqb-announces-minor-update-to-certified-tester-testing-with-generative-ai-ct-genai/` — article annoncé le 27/04/2026 sur l'index d'actualités mais renvoyant une page vide ; les faits CT-GenAI v1.1 ont été confirmés sur la page de certification à la place.
- `https://www.iso.org/standard/42001.html` (avec le suffixe `.html`) — pointe vers ISO 12164-4:2008, sans rapport. Utiliser `/standard/81230.html`.
- `https://www.iso.org/standard/74296.html` ne correspond **pas** à ISO/IEC/IEEE 29119-4 (c'est ISO/IEC 22989:2022) ; **aucune URL vérifiée n'a pu être établie pour la partie 4 de la série 29119**, à ne pas citer d'URL pour cette partie.
- `dl.acm.org`, `ieeexplore.ieee.org`, `web.archive.org`, `scholar.google.com`, `researchgate.net` — inaccessibles depuis l'environnement de vérification.
# NOTION 9 — Mesure de la valeur d'une stratégie QA augmentée (18 sources)

> **Méthode de vérification** : toutes les URL ci-dessous ont été récupérées par un fetch HTTP réel avec lecture du contenu le **28/07/2026**. Les redirections et les URL mortes/bloquées sont signalées explicitement (voir aussi la section « Pièges » en fin de document).

---

## 9.A — DORA : les métriques de livraison logicielle (5 sources)

**DORA's software delivery performance metrics**
`https://dora.dev/guides/dora-metrics/` · Guide de référence (Google Cloud / DORA) · dernière MAJ 5 janvier 2026 · consultée le 28/07/2026
DORA ne parle plus de « 4 keys » mais de **cinq** métriques réparties en *throughput* (change lead time, deployment frequency, failed deployment recovery time) et *instability* (change fail rate, **deployment rework rate**). Le guide liste aussi 7 pièges d'usage explicites (loi de Goodhart, « one metric to rule them all », comparaisons entre applications hétérogènes…).
→ *QA* : c'est la définition canonique à projeter en formation — et le meilleur garde-fou contre les tableaux de bord QA « vanity metrics ».
*Note redirection* : `https://dora.dev/guides/dora-metrics-four-keys/` redirige vers `https://dora.dev/guides/dora-metrics/`.

**A history of DORA's software delivery metrics**
`https://dora.dev/insights/dora-metrics-history/` · Article de recherche vulgarisé (DORA) · publié le 2 janvier 2026, MAJ 2 janvier 2026 · consultée le 28/07/2026
Retrace l'évolution 2014→2024 : en 2014 le change fail rate ne corrélait pas assez pour entrer dans le construit ; en 2023 MTTR devient *failed deployment recovery time* ; en 2024 ajout du *deployment rework rate*. DORA écrit noir sur blanc que **le rapport 2021 avait « inexactement » appelé la reliability la « cinquième métrique »**.
→ *QA* : source idéale pour montrer aux stagiaires qu'un référentiel de mesure se corrige — et pour désamorcer les slides « les 4 métriques DORA » recopiés depuis 2019.

**DORA Research: 2025 (Overview)**
`https://dora.dev/research/2025/` · Page programme de recherche · édition 2025 · consultée le 28/07/2026
**Vérification « dernier rapport »** : l'archive complète (`https://dora.dev/research/`) liste les éditions 2014→**2025** ; aucune édition 2026 n'est publiée au 28/07/2026. L'édition 2025 est donc bien la dernière. Infographie PDF téléchargeable directement.
→ *QA* : permet d'annoncer en formation « le dernier DORA est celui de 2025 » sans se tromper d'un an.

**State of AI-assisted Software Development 2025 (2025 DORA Report)**
`https://dora.dev/research/2025/dora-report/` · Rapport annuel (Google Cloud, partenaires IT Revolution / GitHub / GitLab) · 2025 · consultée le 28/07/2026
Thèse centrale citable : **« AI's primary role is as an amplifier »** — l'IA amplifie les forces *et* les faiblesses organisationnelles existantes ; les meilleurs retours ne viennent pas des outils mais du système sociotechnique sous-jacent. Version abrégée disponible en français.
→ *QA* : cadre parfait pour l'argument « l'IA ne répare pas une stratégie de test défaillante, elle l'accélère ».

**ROI of AI-assisted Software Development report**
`https://dora.dev/ai/roi/report/` · Rapport + calculateur (DORA / Google Cloud) · dernière MAJ 22 avril 2026 · consultée le 28/07/2026
Publication **2026** la plus récente de DORA : cadre pratique de calcul du ROI de l'IA, incluant explicitement la gestion du **« productivity dip »** initial d'un déploiement. Un calculateur interactif est fourni (`https://dora.dev/ai/roi/calculator/`).
→ *QA* : donne une trame de calcul défendable devant un DAF quand on veut budgéter Claude Code sur une chaîne de test.

---

## 9.B — Cadres de mesure de la productivité : SPACE, DevEx (4 sources)

**The SPACE of Developer Productivity**
`https://cacm.acm.org/practice/the-space-of-developer-productivity/` · Article académique/praticien (Communications of the ACM, Forsgren, Storey, Maddila, Zimmermann, Houck, Butler) · 2021 · consultée le 28/07/2026
Définit les 5 dimensions (Satisfaction & well-being, Performance, Activity, Communication & collaboration, Efficiency & flow) et recommande de **combiner au moins 3 dimensions, dont au moins une mesure perceptuelle**. Démonte 5 mythes, dont « une seule métrique suffit ».
→ *QA* : structure directement un tableau de bord QA augmentée (ex. code review : les 5 dimensions y sont mesurables).
*Attention* : `https://queue.acm.org/detail.cfm?id=3454124` (URL SPACE la plus citée) **ne renvoie aucun contenu** — utiliser l'URL CACM ci-dessus.

**DevEx: What Actually Drives Productivity**
`https://queue.acm.org/detail.cfm?id=3595878` · Article académique/praticien (ACM Queue vol. 21 n°2, Noda, Storey, Forsgren, Greiler) · 2023 · consultée le 28/07/2026
Trois dimensions : **feedback loops, cognitive load, flow state**. Chiffres citables : **78 % des organisations sondées par Gartner ont une initiative DevEx** ; étude McKinsey 2020 → croissance de CA 4 à 5× supérieure. Cas eBay : ×2 sur la fréquence de release et **÷6 sur le lead time de déploiement**.
→ *QA* : « feedback loops » est *le* concept qui relie temps d'exécution des tests, flakiness et satisfaction dev.

**Choosing measurement frameworks to fit your organizational goals**
`https://dora.dev/research/2025/measurement-frameworks/` · Chapitre du rapport DORA 2025 (D'Angelo, Murillo, Inman, Storer) · MAJ 26 août 2025 · consultée le 28/07/2026
Explique quand choisir SPACE / DevEx / H.E.A.R.T / DORA, et rappelle une erreur fréquente : **« it is a common misconception that logs-based metrics are objective »**. Sur l'IA : ne pas jeter le framework, ajouter quelques mesures (taux d'acceptation des suggestions, confiance) et garder la baseline.
→ *QA* : réponse toute faite à « faut-il tout changer maintenant qu'on teste avec l'IA ? » → non, on étend.

**The State of Developer Ecosystem Report 2025**
`https://www.jetbrains.com/lp/devecosystem-2025/` (redirige vers `https://devecosystem-2025.jetbrains.com/`) · Enquête sectorielle · enquête avril–juin 2025, **24 534** répondants après nettoyage · consultée le 28/07/2026
Chiffre massue pour la notion 9 : **66 % des développeurs ne croient pas — ou ne sont pas sûrs — que les métriques actuelles reflètent leur contribution réelle**, et réclament de la transparence sur les processus de mesure. Données brutes anonymisées téléchargeables.
→ *QA* : à afficher avant tout atelier « on va mesurer votre QA » — la légitimité perçue de la mesure est une condition de son efficacité.
*Vérification « dernière édition »* : l'édition 2025 est celle mise en avant au 28/07/2026 (aucune édition 2026 liée depuis la page).

---

## 9.C — Coût de la non-qualité et mythes du coût de correction (2 sources)

**Cost of Poor Software Quality in the U.S.: A 2022 Report**
`https://www.it-cisq.org/the-cost-of-poor-quality-software-in-the-us-a-2022-report/` · Rapport (Consortium for Information & Software Quality, auteur Herb Krasner) · nov. 2022, page MAJ 14/09/2023 · consultée le 28/07/2026
Estimation : **au moins 2 410 milliards de $ (2,41 T$)** de coût de la mauvaise qualité logicielle aux États-Unis, dont **~1 520 milliards de $ (1,52 T$) de dette technique accumulée**, sur un PIB projeté de 23,35 T$. Trois foyers identifiés : cybercriminalité via vulnérabilités existantes, supply chain / OSS tiers, dette technique. PDF intégral : `https://www.it-cisq.org/wp-content/uploads/sites/6/2022/11/CPSQ-Report-Nov-22-2.pdf`. Éditions antérieures 2020 et 2018 liées depuis la page.
→ *QA* : le seul chiffre macro sérieux pour ouvrir « pourquoi investir en QA » — à condition de le citer correctement (voir Pièges).
*Vérification* : c'est la **dernière** édition de cette série biennale accessible sur it-cisq.org au 28/07/2026 (archive : 2022 / 2020 / 2018).

**The Leprechauns of Software Engineering — How folklore turns into fact and what to do about it**
`https://leanpub.com/leprechauns` · Ouvrage (Laurent Bossavit, 158 p., page MAJ 20/12/2025, 3 154 lecteurs) · consultée le 28/07/2026
Le **chapitre 10 « The cost of defects: an illustrated history »** et l'**annexe B « bibliographical analysis for the "defect-cost-increase curve" »** retracent la fabrication du mythe du coût croissant 1:10:100 et remontent aux sources primaires (« Where's the data? », « Theory-laden diagrams », « Boehm's assent »). Le ch. 5 fait le même travail sur le mythe du 10x. Extrait PDF/EPUB gratuit téléchargeable depuis la page.
→ *QA* : indispensable pour enseigner le « shift-left » sans reprendre un chiffre indéfendable devant un public d'ingénieurs.

---

## 9.D — Flakiness : mesurer le bruit avant de mesurer la qualité (1 source)

**Flaky Tests at Google and How We Mitigate Them**
`https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html` · Retour d'expérience industriel (Google Testing Blog, John Micco) · 27 mai 2016 · consultée le 28/07/2026
Trois chiffres citables tels quels : **~1,5 % de tous les runs de tests remontent un résultat « flaky »** ; **~16 % des tests présentent un certain niveau de flakiness** (« more than 1 in 7 ») ; **~84 % des transitions pass→fail observées en CI impliquent un test flaky**. Sur un projet moyen de ~1 000 tests, cela fait ~15 tests rouges par run à trier. Google note aussi que le taux d'insertion de flakiness ≈ le taux de correction.
→ *QA* : c'est la base de référence pour justifier un indicateur de flakiness dans le tableau de bord — et pour expliquer pourquoi « ajouter des tests générés par IA » sans garde-fou dégrade le signal.

---

## 9.E — Impact mesuré de l'IA générative sur la productivité (4 sources)

**The Impact of AI on Developer Productivity: Evidence from GitHub Copilot**
`https://arxiv.org/abs/2302.06590` · Étude académique / expérience contrôlée (Peng, Kalliamvakou, Cihon, Demirer — GitHub/Microsoft/MIT) · soumis le 13 février 2023 · consultée le 28/07/2026
Le groupe avec Copilot a terminé la tâche (implémenter un serveur HTTP en JavaScript) **55,8 % plus vite** que le groupe contrôle. Effets hétérogènes favorables aux profils juniors.
→ *QA* : le chiffre « pro-IA » de référence — à présenter **systématiquement en tension** avec l'étude METR ci-dessous.

**Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity**
`https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/` · RCT (METR ; 16 devs expérimentés, 246 issues réelles, repos 22k+ stars) · 10 juillet 2025 · consultée le 28/07/2026 · article : `https://arxiv.org/abs/2507.09089`
Résultat contre-intuitif : avec accès aux outils IA, les devs mettent **19 % de temps en plus**. Écart perception/réalité massif : ils *anticipaient* **+24 % de gain** et, après l'expérience, croyaient encore avoir gagné **20 %**. **Bandeau d'obsolescence affiché par METR eux-mêmes** : « These results are out of date ».
→ *QA* : la démonstration la plus propre que « se sentir plus productif » ≠ « être plus productif » — cœur de l'argumentaire mesure en formation.

**We are Changing our Developer Productivity Experiment Design**
`https://metr.org/blog/2026-02-24-uplift-update/` · Note méthodologique (METR ; 57 devs, 143 repos, 800+ tâches) · 24 février 2026 · consultée le 28/07/2026
Suite fin-2025 : **-18 % (IC -38 % à +9 %)** pour les devs de l'étude initiale, **-4 % (IC -15 % à +9 %)** pour les nouveaux recrutés — donc une accélération probable mais non concluante. Cause : **30 à 50 % des devs déclarent ne plus soumettre certaines tâches parce qu'ils refusent de les faire sans IA**, ce qui biaise l'estimation vers le bas. Mentionne au passage que **~4 % des commits GitHub seraient écrits par Claude Code**.
→ *QA* : montre qu'en 2026 mesurer l'effet de l'IA devient méthodologiquement difficile — argument fort pour mesurer *chez soi*, sur ses propres DORA, plutôt que d'importer un chiffre du marché.

**Measuring the Self-Reported Impact of Early-2026 AI on Technical Worker Productivity**
`https://metr.org/blog/2026-05-11-ai-usage-survey/` · Enquête (METR ; 349 travailleurs techniques, fév.–avr. 2026) · 11 mai 2026 · consultée le 28/07/2026
Médiane **1,4× à 2× de gain de « valeur »** auto-déclaré, contre **3× de gain de « vitesse »** — l'écart valeur/vitesse est le résultat central. Trajectoire déclarée : 1,3× (mars 2025) → 2× (mars 2026) → 2,5× attendu (mars 2027). Le médian sacrifierait **29 % de son salaire** pour garder l'accès à l'IA un mois. METR rappelle que sa propre étude 2025 avait mesuré une **surestimation de plus de 40 points de pourcentage**.
→ *QA* : distinction *vitesse vs valeur* directement transposable au test (générer 10× plus de tests ≠ 10× plus de valeur — cf. State of Testing 2026, notion 10).

---

## 9.F — Évaluation d'une formation, Qualiopi, Kirkpatrick (2 sources vérifiées + 1 source canonique inaccessible)

**The Kirkpatrick Model**
`https://www.kirkpatrickpartners.com/the-kirkpatrick-model/` · Référentiel d'évaluation de la formation (Kirkpatrick Partners) · **révision 2026** · consultée le 28/07/2026
Les 4 niveaux (Reaction / Learning / Behavior / Results) avec la règle « **commencer par le niveau 4** et remonter ». **Nouveauté 2026 (Vanessa Milara Alzate) : ajout du « Performance Environment »** comme facteur externe conditionnant le transfert. Le modèle abandonne le ROI seul au profit de **ROE (Return on Expectations), ROP (Return on Performance) et cROI (Contributive ROI)** — « results are rarely caused by a single program ». Communauté de plus de 14 000 certifiés.
→ *QA* : donne un vocabulaire d'évaluation crédible pour la formation elle-même (niveau 3 = les stagiaires écrivent-ils vraiment leurs tests avec Claude Code 3 mois après ?).

**Accueil — France compétences**
`https://www.francecompetences.fr/` · Site de l'institution nationale de la formation professionnelle et de l'apprentissage · page MAJ 4 mai 2026 · consultée le 28/07/2026
Point d'entrée officiel vers la base documentaire, le RNCP/RS et les travaux qualité. C'est l'autorité française à citer pour tout ce qui touche à la certification des compétences.
→ *QA* : à mobiliser pour l'inscription de la formation dans le cadre national (financements, blocs de compétences).

**⚠️ Référentiel National Qualité (Qualiopi) — source canonique NON vérifiable par fetch au 28/07/2026**
`https://travail-emploi.gouv.fr/le-referentiel-national-qualite` · Texte officiel (ministère du Travail) · consultée le 28/07/2026
La page **répond bien (elle n'est pas morte)** mais renvoie un écran **« Vérification de sécurité » (anti-bot Cegedim.cloud)** au lieu du contenu ; idem pour `https://travail-emploi.gouv.fr/formation-professionnelle/acteurs-cadre-et-qualite-de-la-formation-professionnelle/article/qualiopi-marque-de-certification-qualite-des-prestataires-de-formation`. Legifrance (`https://www.legifrance.gouv.fr/loda/id/JORFTEXT000038610456/` et la variante `/jorf/id/...`) renvoie une réponse vide.
**Conséquence assumée** : je **n'affirme pas** ici quelle version du RNQ est en vigueur ni sa date d'entrée en application — cette vérification doit être faite manuellement dans un navigateur sur travail-emploi.gouv.fr (rubrique « Le référentiel national qualité ») et sur Legifrance (décret n° 2019-564 et arrêté du 6 juin 2019 **modifié**). Les 7 critères / 32 indicateurs et le « Guide de lecture » y sont publiés.
→ *QA* : le RNQ impose notamment de tracer l'adaptation des contenus aux évolutions du métier — argument direct pour documenter l'actualisation « IA générative » du programme.

---

# NOTION 10 — Avenir du métier de testeur avec l'IA (14 sources)

## 10.A — Positions officielles ISTQB (2 sources)

**Certified Tester AI Testing (CT-AI) Version 2.0**
`https://www.istqb.org/certifications/certified-tester-ai-testing-ct-ai/` (redirige vers `https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/`) · Texte de référence / syllabus de certification (ISTQB) · page MAJ **24 juillet 2026** · consultée le 28/07/2026
La v2.0 remplace la v1.0 : **la v1.0 anglaise est retirée au 21 avril 2027**, les versions non-anglaises au 21 octobre 2027. Le syllabus v2.0 couvre désormais explicitement **le test des systèmes GenAI et des LLM** (comportement probabiliste, non-déterminisme, dépendance aux données) et les caractéristiques qualité de l'**ISO/IEC 25059**. Examen : 40 questions, 29 requis sur 44 points, 60 min. Syllabus PDF téléchargeable (4 293 téléchargements affichés).
→ *QA* : c'est la position institutionnelle sur *tester l'IA* — à distinguer nettement de *tester avec l'IA*.

**Certified Tester Specialist Level – Testing with Generative AI (CT-GenAI)**
`https://www.istqb.org/certifications/gen-ai/` (redirige vers `https://istqb.org/certifications/gen-ai/`) · Texte de référence / syllabus v1.1 (ISTQB) · publié 17/07/2025, page MAJ **24 juillet 2026** · consultée le 28/07/2026
Certification dédiée à l'**usage** de la GenAI sur tout le cycle de test (analyse d'exigences, conception, automatisation, reporting). Le syllabus v1.1 renforce le prompt engineering avancé et la **gestion des risques : hallucinations, erreurs de raisonnement, biais, données personnelles, sécurité, consommation énergétique**, plus « AI Regulations, Standards and Best Practice Frameworks ». Examen : 40 questions, 30/46 (65 %). **23 678 téléchargements du syllabus** affichés — bon proxy de l'intérêt du marché.
→ *QA* : c'est le référentiel le plus proche du programme d'une formation « Test logiciel avec IA générative » — utile pour se positionner et pour la cartographie de compétences.

## 10.B — Enquêtes du secteur du test (2 sources)

**The 2026 State of Testing™ Report**
`https://www.practitest.com/state-of-testing/` · Enquête sectorielle mondiale (PractiTest × Tea-time with Testers), **13ᵉ édition** · page MAJ 22 juin 2026 · consultée le 28/07/2026
**Vérification « dernière édition » : le 2026 est bien la dernière au 28/07/2026** (les éditions 2025→2014 sont archivées en PDF sur la même page). Chiffres majeurs : **76,8 % d'adoption de l'IA** en QA ; **78,8 %** citent l'IA comme la tendance la plus impactante des 5 ans ; **65,6 % sont « Very Concerned »** pour l'avenir du métier — mais les utilisateurs actifs d'IA sont **17 % moins anxieux** et **4× plus souvent « Zero Concern »** (« l'AI Paradox »). Écart hiérarchique : **68,9 % des praticiens (IC) vs 55,6 % des leaders**. Le « Faster Horse » : **70 % utilisent l'IA pour créer des cas de test, 19,9 % seulement pour l'identification des risques** ; **56 % des équipes sont évaluées sur la couverture de test, 8,6 % sur le business impact, 4,5 % sur le NPS**. Salaires : utilisateurs d'IA ~45 400 $ vs non-utilisateurs ~35 800 $ (**+27 %**) ; **prime « leadership » +10,6 % vs pénalité « exécution technique » −13,8 %** chez les 10+ ans d'expérience.
→ *QA* : la source la plus riche pour la séquence « que devient le métier » — et elle contient sa propre critique (on optimise un test factory au lieu d'en sortir).

**World Quality Report 2025-26**
`https://www.capgemini.com/insights/research-library/world-quality-report-2025-26/` · Rapport annuel (Capgemini / Sogeti), **17ᵉ édition**, thème « Adapting to Emerging Worlds » · page MAJ 10 mars 2026 · consultée le 28/07/2026
**Vérification « dernière édition » : l'édition 2025-26 est bien la dernière publiée au 28/07/2026** (le WQR sort habituellement à l'automne ; aucune édition 2026-27 n'est en ligne). Highlights publics : **43 % des organisations expérimentent la GenAI en QA mais seulement 15 % l'ont passée à l'échelle** ; **60 %** peinent sur des données de test sécurisées et scalables, **58 %** sur l'adoption des outils IA ; **données synthétiques : 14 % (2024) → 25 % (2025)**, premier cas d'usage GenAI ; **la GenAI devient la compétence n°1 attendue d'un quality engineer (63 %)**, devant les compétences QE cœur (60 %), les soft skills arrivant 5ᵉ (51 %) ; **94 % examinent les données de production** mais près de la moitié n'en tirent pas de stratégie actionnable. Rapport intégral derrière formulaire d'inscription.
→ *QA* : le chiffre 43 % / 15 % est le meilleur antidote au discours « tout le monde a déjà basculé ».

## 10.C — Enquêtes développeurs (2 sources)

**Stack Overflow Developer Survey 2025 — AI**
`https://survey.stackoverflow.co/2025/ai` · Enquête développeurs (Stack Overflow) · 2025 · consultée le 28/07/2026
**Vérification « dernière édition » : `https://survey.stackoverflow.co/2026/` ne renvoie aucun contenu au 28/07/2026 → l'édition 2025 reste la dernière consultable.** Résultats en or pour une formation au test : **84 % utilisent ou prévoient d'utiliser l'IA** (vs 76 % l'an passé), **51 % des développeurs professionnels quotidiennement** ; mais **46 % se défient de l'exactitude des sorties contre 33 % qui leur font confiance**, et **3,1 % seulement « highly trust »** (2,5 % chez les expérimentés, qui affichent le plus fort taux de défiance à 20,7 %). Frustration n°1 : **« AI solutions that are almost right, but not quite » — 66 %**, suivie de **« debugging AI-generated code is more time-consuming » — 45,2 %**. Enfin, la raison n°1 de demander de l'aide à un humain reste **« quand je ne fais pas confiance aux réponses de l'IA » (75,3 %)**.
→ *QA* : « presque juste mais pas tout à fait » est *exactement* la définition du travail de testeur à l'ère de l'IA — c'est le meilleur slide d'ouverture de la notion 10.

**The State of Developer Ecosystem Report 2025 — Artificial Intelligence**
`https://devecosystem-2025.jetbrains.com/artificial-intelligence` · Enquête développeurs (JetBrains, 24 534 répondants, avril–juin 2025) · consultée le 28/07/2026 (via `https://www.jetbrains.com/lp/devecosystem-2025/`)
Volet IA du rapport ; le rapport associé *The State of Developer Experience and Developer Productivity* fournit le chiffre transversal **66 % des développeurs ne croient pas / ne sont pas sûrs que les métriques actuelles reflètent leur contribution réelle**. Données brutes ouvertes (`RawData.zip`) — utile pour un TP d'analyse.
→ *QA* : contrepoint « côté dev » aux enquêtes purement QA, et pont naturel avec la notion 9.

## 10.D — Impact de l'IA sur l'emploi : institutions internationales (4 sources)

**The Future of Jobs Report 2025**
`https://www.weforum.org/publications/the-future-of-jobs-report-2025/` · Rapport (World Economic Forum) · publié le **7 janvier 2025** · consultée le 28/07/2026
**Vérification « dernière édition » : `https://www.weforum.org/publications/the-future-of-jobs-report-2026/` ne renvoie aucun contenu ; la page 2025 liste comme « in this series » les éditions 2023, 2020 et 2018 → l'édition 2025 est bien la dernière au 28/07/2026** (série bisannuelle). Base : **plus de 1 000 employeurs représentant plus de 14 millions de travailleurs, 22 clusters industriels, 55 économies**, horizon 2025-2030. PDF intégral libre : `https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf`.
→ *QA* : la référence pour situer le métier de testeur dans la recomposition générale des compétences, sans surinterpréter.

**Generative AI and Jobs: A Refined Global Index of Occupational Exposure (ILO Working Paper 140)**
`https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure` · Working paper (OIT/ILO × NASK ; Gmyrek, Berg et al.) · 20 mai 2025, page MAJ 02/03/2026 · consultée le 28/07/2026
Méthode : 29 753 tâches, 1 640 personnes enquêtées, **52 558 points de données sur 2 861 tâches**, plus des tours Delphi d'experts. Résultats : **1 travailleur sur 4 dans le monde occupe un emploi présentant une exposition à la GenAI** ; **3,3 % de l'emploi mondial dans la catégorie d'exposition la plus élevée** (femmes 4,7 % vs hommes 2,4 %) ; **11 % de l'emploi total dans les pays à bas revenu vs 34 % dans les pays à haut revenu**. Conclusion : **la transformation des emplois est l'impact le plus probable, pas leur disparition**. PDF : `https://www.ilo.org/sites/default/files/2025-05/WP140_web.pdf`.
→ *QA* : le cadrage « transformation ≠ suppression » adossé à une source ONU — bien plus solide qu'un billet LinkedIn.

**Disruption without dividend? How the digital divide and task differences split GenAI's global impact (ILO Working Paper 166)**
`https://www.ilo.org/publications/disruption-without-dividend-how-digital-divide-and-task-differences-split` · Working paper (OIT/ILO ; Gmyrek, Viollaz, Winkler) · **17 mars 2026** · consultée le 28/07/2026
Publication OIT la **plus récente** sur le sujet : 135 pays, ~2/3 de l'emploi mondial. **30-32 % de l'emploi exposé dans les pays à haut revenu vs 10-15 % dans les pays à bas revenu** ; **441,8 millions d'emplois relèvent de gradients d'« augmentation », dont ~66,9 millions sans accès à Internet** (potentiel de productivité non réalisé). Contribution méthodologique majeure : **les indices d'exposition standards surestiment l'impact dans les pays en développement** car un même intitulé ISCO ne recouvre pas les mêmes tâches (données PIAAC/STEP, 46 pays).
→ *QA* : excellent exemple pédagogique de « la métrique dépend de la définition de la tâche » — transposable au débat « couverture de test ».

**Gen-AI: Artificial Intelligence and the Future of Work**
`https://www.imf.org/en/Publications/Staff-Discussion-Notes/Issues/2024/01/14/Gen-AI-Artificial-Intelligence-and-the-Future-of-Work-542379` (redirige en minuscules) · Staff Discussion Note 2024/001 (FMI, 41 p., 8 auteurs) · 14 janvier 2024 · consultée le 28/07/2026
Les économies avancées ressentiront bénéfices *et* écueils de l'IA plus tôt, du fait de leur structure d'emploi **à forte intensité cognitive**. **Femmes et diplômés du supérieur sont plus exposés mais aussi mieux placés pour en tirer parti** ; les travailleurs âgés s'adaptent moins facilement. Risque d'accroissement des inégalités de revenu du travail et du capital.
→ *QA* : source institutionnelle pour parler honnêtement des effets différenciés sur les carrières QA (junior vs senior, manuel vs automatisation).

## 10.E — France (1 source)

**Intelligence artificielle et travail**
`https://www.strategie.gouv.fr/publications/intelligence-artificielle-travail` → **redirige vers** `https://www.strategie-plan.gouv.fr/publications/intelligence-artificielle-travail` · Rapport officiel (France Stratégie, mission Pénicaud/Mahjoubi ; Benhamou, Janin, Charrié, Thibault) · publié 28/03/2018, **MAJ 20/05/2025** · consultée le 28/07/2026
**Signalement important** : France Stratégie est devenu le **Haut-commissariat à la Stratégie et au Plan** et le domaine `strategie.gouv.fr` redirige vers `strategie-plan.gouv.fr` — toutes les URL « France Stratégie » citées ailleurs doivent être vérifiées. Trois axes d'action toujours d'actualité : prospective de branche, **formation des travailleurs aux enjeux techniques, juridiques, économiques et éthiques de l'IA**, sécurisation des parcours. Le rapport insiste sur les **risques de conditions de travail** (perte d'autonomie, surcharge mentale liée à la prise en charge des tâches complexes, intensification) — pas seulement sur l'emploi. PDF : `https://www.strategie-plan.gouv.fr/files/files/Publications/Rapport/fs-rapport-intelligence-artificielle-28-mars-2018_0.pdf`.
→ *QA* : source française officielle pour le volet « conditions de travail du testeur » — le point aveugle des rapports d'éditeurs.
*Limite à annoncer* : le corps du rapport date de 2018 ; à utiliser pour le cadre d'analyse, pas pour des chiffres 2026.

## 10.F — Littérature académique récente et contre-points (3 sources)

**Vibe Coding: An Experiment with Test-Driven Development**
`https://arxiv.org/abs/2607.22406` · Étude académique (Moritz Mock, Barbara Russo) · soumis le **24 juillet 2026** · consultée le 28/07/2026
Compare 4 modèles d'interaction (solo / collaboratif humain-LLM / entièrement automatisé / agentique via MetaGPT-X) sur des workflows TDD, avec une étude contrôlée auprès de professionnels du TDD. Résultat central et directement transposable : **les workflows agentiques produisent du code de production rapidement et fonctionnellement correct, mais introduisent des décisions d'implémentation non exigées par la spécification, créant des « untested decision points »** ; **les workflows collaboratifs produisent des suites de tests de meilleure qualité et mieux organisées**.
→ *QA* : justification empirique et fraîche du « human-in-the-loop » sur la conception des tests, même quand l'agent code bien.

**How Do AI Coding Agents Contribute to Software Development? An Empirical Study of Agentic Pull Requests**
`https://arxiv.org/abs/2607.21832` · Étude académique longitudinale (Mazloomzadeh, Morovati, Khomh — Polytechnique Montréal, dataset AIDev) · soumis le **23 juillet 2026** · consultée le 28/07/2026
Compare PR agentiques vs PR humaines dans le temps : taux de merge, types de tâches où les agents sont majoritairement employés, et caractéristiques ayant des implications sur la **qualité logicielle**. Perspective explicitement « nuancée » sur bénéfices *et* limites en conditions réelles.
→ *QA* : matière pour un débat en formation sur « qu'est-ce qu'on laisse faire à l'agent, et où place-t-on la revue ? ».

**« Go Home Copilot, You're Drunk »: Understanding Developer Responses to Agent-Generated Code Review Comments**
`https://arxiv.org/abs/2607.21997` · Étude académique à grande échelle (Cynthia, Widyasari, Roy, Zhang, Lo — SMU) · soumis le **24 juillet 2026** · consultée le 28/07/2026
Première étude à grande échelle sur la résolution des commentaires de revue générés par agents : **54 791 commentaires produits par 5 agents (Copilot, Cursor, Codex, Devin, Claude) sur 342 dépôts Python GitHub**. Copilot concentre **72,9 %** des commentaires résolus. Card sorting sur **470 discussions non résolues** → **10 motifs**, les plus fréquents étant les **suggestions incorrectes** et les **décisions de conception intentionnelles**. Le meilleur prédicteur de résolution est la **présence d'une suggestion de code inline** ; les commentaires longs et complexes sont ignorés.
→ *QA* : leçon actionnable immédiate pour les TP — un feedback IA n'a de valeur que s'il est court, situé et accompagné d'un patch applicable.

---

## ⚠️ Pièges et erreurs répandues (notions 9-10)

**1. « Les 4 métriques DORA » — c'est faux depuis 2024.** DORA en utilise **cinq** (ajout du *deployment rework rate*), et le *time to restore* a été redéfini en **failed deployment recovery time** dès 2023. Pire : DORA reconnaît elle-même que **le rapport 2021 avait appelé à tort la « reliability » la cinquième métrique** — la reliability est une mesure de performance *opérationnelle*, pas de *livraison*. Source : `https://dora.dev/insights/dora-metrics-history/`.

**2. Le mythe du coût 1:10:100 (Boehm).** La courbe exponentielle du coût de correction d'un défaut selon la phase est un « leprechaun » : Bossavit remonte aux sources primaires et montre la fabrication du chiffre par citations en cascade (ch. 10 + annexe B des *Leprechauns of Software Engineering*). **À enseigner comme un ordre d'idée qualitatif — « corriger tard coûte plus cher » — jamais comme un ratio chiffré.** Corollaire : ne pas construire un ROI de « shift-left » sur ce ratio.

**3. Le chiffre CISQ mal cité.** Les 2,41 T$ sont (a) un coût **américain**, pas mondial ; (b) une estimation **2022**, pas actuelle ; (c) un total **incluant ~1,52 T$ de dette technique accumulée** (un stock, pas un flux annuel de bugs) ; (d) construit à partir de sources publiques secondaires, avec les limites que cela implique. Dire « la non-qualité logicielle coûte 2 400 milliards par an » est une triple erreur.

**4. L'illusion que l'IA accélère toujours.** L'écart perception/réalité est mesuré : dans le RCT METR 2025, les développeurs expérimentés étaient **19 % plus lents** tout en croyant avoir gagné **20 %** — soit **plus de 40 points de pourcentage de surestimation**. Symétriquement, ne pas figer ce résultat : METR l'a lui-même marqué obsolète et estime en 2026 un effet probablement positif, mais **non concluant à cause de biais de sélection** (30 à 50 % des devs refusent de travailler sans IA). La conclusion pédagogique n'est ni « l'IA ralentit » ni « l'IA accélère », c'est : **mesurez sur vos propres métriques de livraison**.

**5. Confondre « gain de vitesse » et « gain de valeur ».** L'enquête METR de mai 2026 mesure **3× en vitesse mais 1,4-2× en valeur** — l'écart s'explique par la substitution vers des tâches devenues bon marché mais peu importantes. En QA, c'est exactement le piège « Faster Horse » du State of Testing 2026 : **70 % des équipes utilisent l'IA pour générer plus de cas de test, 19,9 % pour identifier des risques**, et **56 % sont évaluées sur la couverture contre 8,6 % sur le business impact**. Générer 10× plus de tests avec Claude Code n'est un succès que si le taux de détection de défauts réels progresse.

**6. Confondre Qualiopi et « certification qualité de la formation » au sens ISO.** Qualiopi est la marque attestant la conformité au **Référentiel National Qualité (RNQ)**, condition d'accès aux **fonds publics et mutualisés** — ce n'est ni un label de qualité pédagogique, ni une certification du contenu, ni une équivalence ISO 9001. Attention aussi à ne pas confondre **Qualiopi (organisme de formation)** et **RNCP/RS (certification professionnelle, France compétences)** : ce sont deux dispositifs distincts. ⚠️ **La version du RNQ en vigueur et sa date d'entrée en application n'ont pas pu être confirmées par fetch** : `travail-emploi.gouv.fr` renvoie un écran anti-bot et Legifrance une réponse vide — à vérifier manuellement avant toute affirmation en formation.

**7. Citer la mauvaise édition d'un rapport annuel.** État vérifié au 28/07/2026 : DORA → **2025** (pas de 2026) ; World Quality Report → **2025-26, 17ᵉ édition** ; State of Testing → **2026, 13ᵉ édition** ; WEF Future of Jobs → **2025** (l'URL 2026 ne renvoie rien) ; Stack Overflow Developer Survey → **2025** (l'URL 2026 ne renvoie rien) ; JetBrains State of Developer Ecosystem → **2025** ; CISQ CPSQ → **2022**.

**8. URLs à ne pas recopier telles quelles.** `queue.acm.org/detail.cfm?id=3454124` (SPACE) et `dl.acm.org/doi/10.1145/3454122.3454124` renvoient **vide** → utiliser `https://cacm.acm.org/practice/the-space-of-developer-productivity/`. `strategie.gouv.fr` **redirige** vers `strategie-plan.gouv.fr` (France Stratégie → Haut-commissariat à la Stratégie et au Plan). `www.istqb.org/...` redirige vers `istqb.org/...`. `dora.dev/guides/dora-metrics-four-keys/` redirige vers `dora.dev/guides/dora-metrics/`. `entreprendre.service-public.fr/vosdroits/F33369` mène à une page **sans rapport** avec Qualiopi (documents commerciaux) — écartée.

---

## Manques assumés à combler manuellement

- **OCDE** : aucune URL oecd.org n'a répondu par fetch (plusieurs chemins testés, réponses vides). Cibles recommandées à vérifier en navigateur : *OECD Employment Outlook* (chapitre IA) et *« The impact of AI on the workplace: Main findings from the OECD AI surveys of employers and workers »*.
- **DARES** : non testée (`dares.travail-emploi.gouv.fr` relève du même domaine protégé par anti-bot que travail-emploi.gouv.fr).
- **Référentiel National Qualité / Legifrance** : voir piège n°6.
- **Flakiness** : une seule source vérifiée (Google 2016). À compléter par une étude académique récente (une recherche arXiv ciblée « flaky tests » n'a pas pu aboutir : l'API `export.arxiv.org` et l'endpoint `/search/` d'arXiv renvoient vide via ce proxy, seules les pages `/abs/<id>` et `/list/cs.SE/recent` fonctionnent).
