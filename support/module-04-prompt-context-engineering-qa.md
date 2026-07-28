# Module M04 — Prompt et context engineering pour la QA

> **Jour 2** · **Durée : 1 h 30** · **QA Credits en jeu : 150**
> *Fil rouge : J1 a établi que l'IA fige les bugs quand on lui donne le code comme source de vérité. J2 ouvre l'arsenal. Première arme : cesser d'improviser des prompts et construire, dans le dépôt SkyRetail, un contexte que l'on versionne comme du code.*

---

## 0. Carte du module

### 0.1 Objectifs pédagogiques

À l'issue de ce module, le·a participant·e sera capable de :

- **Décomposer** un prompt de QA en cinq blocs normés (rôle, contexte, contraintes, format de sortie, exemples) et **justifier** chaque bloc par une source éditeur ;
- **Distinguer** les techniques de prompting dont l'effet est mesuré (few-shot, chain-of-thought, position des documents longs) de celles qui relèvent du folklore ;
- **Rédiger** le `CLAUDE.md` d'un dépôt Angular/.NET conforme aux contraintes documentées (sous 200 lignes, imports `@path`, hiérarchie à quatre niveaux) ;
- **Chiffrer** le coût en tokens d'une campagne de génération de tests et **choisir** un modèle sur un critère explicite ;
- **Versionner et évaluer** un prompt de test comme un artefact de code, avec un jeu d'évals exécutable ;
- **Démontrer** expérimentalement que la variabilité d'un LLM n'est pas éliminable et en **tirer** les conséquences pour un dossier de recette.

### 0.2 Prérequis du module

- M01 à M03 terminés : la notion d'oracle, les cinq anti-patterns et le plan de test v4.0 sont acquis.
- Claude Code opérationnel dans `skyretail`, `/status` authentifié.
- Savoir lire un `.csproj` et un `angular.json`.
- Le dépôt contient encore un `CLAUDE.md` **vide** — c'est le point de départ.

### 0.3 Position dans le fil rouge

| Avant ce module | Après ce module |
|---|---|
| Chaque squad écrit ses prompts à la volée, dans le chat, sans trace | Une bibliothèque `prompts/` versionnée dans Git, avec numéro de version et jeu d'évals |
| Le `CLAUDE.md` du dépôt est vide ; chaque session redécouvre la stack | Le contexte projet est écrit une fois, tient sous 200 lignes et survit à la compaction |
| « Le modèle a bien répondu hier, il répondra pareil aujourd'hui » | Le squad a mesuré l'écart entre deux exécutions du **même** prompt et sait le documenter |
| Le coût de l'IA est un impensé | Le coût est une ligne du dossier de recette, estimée avant exécution |

### 0.4 Découpage horaire

| Séquence | Contenu | Durée |
|---|---|---|
| S0 | La Carte : de quoi la Task Force a besoin pour tenir 3 jours | 2 min |
| S1 | **N1** — Anatomie d'un prompt de QA | 11 min |
| S2 | **N2** — Context engineering | 11 min |
| S3 | **N3** — Industrialiser ses prompts | 9 min |
| S4 | 🔍 Exemple A — construire le `CLAUDE.md` de SkyRetail | 10 min |
| S5 | 🔍 Exemple B — le prompt de génération de tests F1, avant / après | 8 min |
| S6 | 🔍 Exemple C — la bibliothèque de prompts d'une équipe de 40 personnes | 7 min |
| S7 | 🧪 Exercices M4-1 à M4-4 | 27 min |
| S8 | Contre-Test sur M4-4 + débriefing + scoreboard | 5 min |
| **Total** | **Somme des séquences S0 → S8** | **90 min = 1 h 30** ✅ *conforme à la durée annoncée en en-tête* |

> ⏱️ **Régulation du temps.** Les exercices ⭐ et ⭐⭐ sont menés **en parallèle par les squads** (chaque squad n'en traite qu'un des deux, puis restitue en 2 min à l'autre). Les durées cibles indiquées par exercice supposent ce fonctionnement. L'exercice bonus ⭐⭐⭐⭐⭐ est **hors séance**.

### 0.5 Notions couvertes

| # | Notion |
|---|---|
| **N1** | Anatomie d'un prompt de QA — rôle, contexte, contraintes, format de sortie, exemples ; few-shot, chain-of-thought, balises XML, prompt chaining, extended thinking |
| **N2** | Context engineering — fenêtre de contexte, `CLAUDE.md` multi-niveaux, compaction, coût en tokens, choix de modèle, prompt caching, hygiène de session |
| **N3** | Industrialiser ses prompts — versioning, bibliothèque, Skills et commandes, évaluation d'un prompt, reproductibilité et le mythe de `temperature=0` |

---

## 1. Partie théorique

### 1.1 Notion N1 — Anatomie d'un prompt de QA

#### 1.1.1 De quoi parle-t-on

Le *prompt engineering* n'est pas une discipline littéraire. La documentation éditeur pose trois prérequis **avant** d'écrire la première ligne d'un prompt : *« 1. une définition claire des critères de succès, 2. un moyen de tester empiriquement contre ces critères, 3. un premier jet à améliorer »* [S-01]. Un professionnel du test reconnaît immédiatement ce triptyque : c'est un **critère d'acceptation**, un **harnais de test** et une **version de référence**. Autrement dit, on ne prompte pas « génère des tests » avant d'avoir défini ce qu'est un bon test et comment on le mesure.

La même page ajoute une remarque que la profession sous-estime : *« you can sometimes improve latency and cost more easily by selecting a different model »* [S-01]. Le prompt n'est pas la seule variable, et ce n'est pas toujours la bonne.

Nous appellerons **prompt de QA** un artefact textuel structuré, versionné et évalué, composé de cinq blocs :

| Bloc | Rôle | Ce qui se passe s'il manque |
|---|---|---|
| **Rôle** | fixer le référentiel professionnel mobilisé (ISTQB, conventions xUnit, WCAG) | le modèle répond avec la moyenne de son corpus, souvent du Jest 2021 |
| **Contexte** | fournir la **source de vérité indépendante du code** — spécification, contrat OpenAPI, norme | le modèle paraphrase l'implémentation : anti-pattern n°1 de M01 |
| **Contraintes** | interdictions, périmètre, invariants (« n'ouvre pas le fichier X », « pas de mock sur le domaine ») | le modèle sur-mocke et invente des dépendances |
| **Format de sortie** | structure exigée : fichier, nommage, balises, JSON, tableau | la sortie n'est pas parsable, donc pas industrialisable |
| **Exemples** | un à cinq extraits canoniques du dépôt | le style diverge de celui de l'équipe, la revue explose |

#### 1.1.2 Ce que dit l'état de l'art

**Le nombre d'exemples : une contradiction éditeur à trancher en connaissance de cause.** La page de référence consolidée recommande *« Include 3–5 examples for best results »*, enveloppés dans des balises `<example>` / `<examples>` [S-02]. Le billet de bonnes pratiques 2026, plus récent, recommande l'inverse : *« Start with one example (one-shot). Only add more examples (few-shot) if the output still doesn't match your needs »* [S-03]. La documentation Gemini éclaire la contradiction en la quantifiant qualitativement : **trop peu d'exemples ne modifient pas le comportement, trop d'exemples font surajuster la réponse aux exemples** [S-13]. La règle pratique en QA est donc : **un exemple pour fixer un style, trois à cinq pour fixer une taxonomie de cas**. Coller quinze tests existants produit des tests clonés, pas des tests nouveaux.

**La position des documents dans un prompt long est mesurée.** Pour les prompts au-delà de 20 000 tokens, la documentation impose de placer les documents **en haut** du prompt, avant la question : *« Queries at the end can improve response quality by up to 30 percent in tests »* [S-02]. La structure recommandée est explicitement XML : `<documents>` > `<document index="n">` > `<source>` + `<document_content>`. Pour un prompt de QA, cela signifie : le cahier des charges v4.0 et le contrat OpenAPI d'abord, la consigne « génère les tests de… » **en dernier**. C'est le réglage le plus rentable du module et il ne coûte rien.

**Le chain-of-thought a une mesure fondatrice et une mesure minimale.** Wei et al. montrent qu'un modèle de **540 milliards de paramètres avec seulement 8 exemplaires CoT** atteint l'état de l'art sur GSM8K, *« surpassing even finetuned GPT-3 with a verifier »* [S-04]. Kojima et al. produisent le chiffre-choc : la seule phrase *« Let's think step by step »* fait passer text-davinci-002 de **17,7 % à 78,7 %** sur MultiArith et de **10,4 % à 40,7 %** sur GSM8K, sans aucun exemple [S-05]. Ces chiffres datent d'une génération de modèles antérieure ; ils n'établissent pas que la formule magique fonctionne encore telle quelle en 2026 — ils établissent que **le raisonnement explicite est un levier de premier ordre**, ce que les modèles récents ont internalisé sous forme d'*extended thinking*.

**L'extended thinking a un prix, et il est comptabilisé.** *« Les tokens de raisonnement sont facturés comme tokens de sortie, même quand le texte du thinking n'est pas retourné, et comptent dans `max_tokens` »* [S-08]. Le raisonnement est toujours actif sur certains modèles, activé par défaut sur d'autres, désactivé par défaut sur les générations 4.6 à 4.8 ; les évaluations internes de l'éditeur donnent l'*adaptive thinking* « reliably better » que le budget manuel [S-08]. Traduction QA : demander « réfléchis étape par étape » à un modèle qui raisonne déjà ne fait qu'augmenter la facture.

**Le self-consistency est le seul filtre anti-hallucination gratuit.** Échantillonner plusieurs chemins de raisonnement puis voter à la majorité produit **+17,9 % sur GSM8K, +11,0 % sur SVAMP, +12,2 % sur AQuA, +6,4 % sur StrategyQA** [S-06]. Transposé au test : générer trois jeux de tests en parallèle et ne conserver que les cas de test **présents dans les trois** élimine mécaniquement les cas hallucinés isolés. C'est le fondement de l'exercice M4-4.

**Le prompt chaining a une version académique et une version opérationnelle.** ReAct formalise la boucle *raisonner → agir → observer* et mesure **+34 points** de succès absolu sur ALFWorld et **+10 points** sur WebShop avec un à deux exemples in-context [S-07]. En QA, cette boucle a un nom : écrire un test, lancer `dotnet test`, lire la stack trace, corriger. ChatTESTER la chiffre sur le terrain exact du module : les tests bruts sortis d'un LLM échouent massivement à la compilation, et l'ajout d'un raffineur itératif produit **+34,3 % de tests compilables et +18,7 % de tests avec assertions correctes** [S-09]. CANDOR va plus loin : une approche **purement prompt engineering, sans fine-tuning**, égale EvoSuite en couverture, le dépasse en score de mutation et devance le générateur d'oracles fine-tuné TOGLL d'au moins **21,1 points de pourcentage** en justesse des oracles [S-10]. Le mécanisme est un panel multi-LLM avec oracle retenu par consensus — c'est du self-consistency appliqué aux assertions.

**Le test comme exemple few-shot.** La formulation la plus directement utilisable de tout le corpus vient de la documentation GitHub : *« Unit tests can also serve as examples. Before writing your function, you can use Copilot to write unit tests for the function. Then, you can ask Copilot to write a function described by those unit tests »* [S-11]. Le test devient la spécification exécutable, donc l'exemple few-shot qui contraint l'implémentation. C'est du TDD, formalisé par l'éditeur.

**La rubrique auto-construite.** Le guide de prompting GPT-5 propose une technique transposable telle quelle : demander au modèle de *« spend time thinking of a rubric… create a rubric that has 5-7 categories… if your response is not hitting the top marks across all categories, you need to start again »* [S-12]. Pour un test, les cinq à sept catégories s'écrivent d'elles-mêmes : isolation, nommage, couverture des cas limites, qualité des assertions, lisibilité, absence de dépendance à l'ordre d'exécution, traçabilité vers l'exigence.

**Ce qui relève du folklore.** Trois croyances circulent en formation et ne résistent pas au corpus :

| Croyance | Réalité documentée |
|---|---|
| « Il faut préremplir la réponse de l'assistant pour forcer le format » | **Le prefill est mort** : un message assistant prérempli sur le dernier tour renvoie une **erreur 400** à partir de Claude 4.6 [S-02] |
| « Il faut régler `budget_tokens` finement » | `budget_tokens` renvoie **400 sur Claude 4.7+** ; le paramètre a été remplacé par `effort` [S-02][S-08] |
| « Plus le prompt est long et détaillé, meilleur est le résultat » | La performance se dégrade avec la longueur du contexte (voir N2) ; le prompt improver produit des réponses *« longer, more thorough, but slower »* [S-17 §N3] |

**Le folklore inverse existe aussi.** Le guide OpenAI signale un piège très concret pour un agent de test : *« validate patches carefully since tools like `apply_patch` may return "Done" even on failure »* [S-15]. Une sortie d'outil agentique se **vérifie**, elle ne se croit jamais sur parole. Ce point est repris intégralement en M06.

#### 1.1.3 Application au contexte SkyRetail

Le prompt naïf de M01 — *« Génère les tests unitaires xUnit + FluentAssertions pour `DiscountEngine.cs` »* — se réécrit bloc par bloc :

```text
<role>
Tu es ingénieur QA senior. Référentiel : ISTQB CTFL v4.0.1 pour le vocabulaire,
xUnit v3 + FluentAssertions pour le code. Tu ne rédiges JAMAIS un résultat attendu
qui ne soit pas traçable vers une ligne du cahier des charges.
</role>

<documents>
  <document index="1">
    <source>docs/cdc-v4.0.md §3.2 — grille de remises</source>
    <document_content>{{CDC_SECTION_3_2}}</document_content>
  </document>
  <document index="2">
    <source>backend/SkyRetail.Domain/Pricing/IDiscountRule.cs (signatures uniquement)</source>
    <document_content>{{SIGNATURES}}</document_content>
  </document>
</documents>

<constraints>
- N'ouvre PAS DiscountEngine.cs. La source de vérité est le document 1.
- Un comportement = un test. Pas de test à cinq assertions.
- Interdiction de mocker IDiscountRule : le domaine se teste avec des règles réelles.
- Si le document 1 est ambigu sur un cas, produis
  [Fact(Skip = "ambiguïté EX-0xx")] et liste la question à poser au métier.
</constraints>

<output_format>
Un seul fichier C#, chemin backend/SkyRetail.Tests/Pricing/DiscountEngineTests.cs.
Chaque [Fact] est précédé d'un commentaire // CDC v4.0 §3.2 : « <citation exacte> ».
Termine par un bloc <questions_metier> listant les ambiguïtés détectées.
</output_format>

<examples>
<example>
// CDC v4.0 §3.1 : « la TVA est calculée ligne à ligne, arrondi bancaire »
[Fact]
public void Compute_WithThreeLines_RoundsVatPerLineUsingBankersRounding() { … }
</example>
</examples>

<task>
Produis la suite de tests de DiscountEngine à partir du document 1 uniquement.
</task>
```

Quatre choses à faire remarquer en salle. Un : les documents sont **avant** la tâche [S-02]. Deux : le bloc `<constraints>` contient une **interdiction de lecture** — c'est ce qui casse la tautologie, pas la politesse du prompt. Trois : le bloc `<output_format>` rend la sortie **parsable**, donc évaluable en M4-3. Quatre : les `{{doubles accolades}}` sont la convention de variabilisation de l'outillage d'évaluation [S-17 §N3] ; le prompt est donc déjà un **template**, pas un message.

#### 1.1.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Le prompt-fleuve** | 60 lignes de consignes, résultat moins bon qu'avec 15 | Les instructions se contredisent et le modèle arbitre seul ; la dégradation en contexte long s'ajoute (N2) | Un prompt = une tâche. Chaîner deux prompts courts plutôt qu'en écrire un long [S-07] |
| **La question posée en premier** | Sur un cahier des charges de 6 pages collé après la question, le modèle ignore la moitié du document | Position sous-optimale ; jusqu'à **30 %** de qualité perdue [S-02] | Documents en haut, tâche en bas, sans exception au-delà de 20 k tokens |
| **Le few-shot de masse** | 15 tests existants en exemple → 15 tests clonés, aucun cas nouveau | Surajustement aux exemples [S-13] | Un exemple pour le style, trois à cinq **variés** pour la taxonomie [S-02][S-03] |
| **La croyance sur parole** | L'agent annonce « tests corrigés », la CI est rouge | Les outils renvoient « Done » même en échec [S-15] | Toute assertion de l'agent est reconfrontée à la sortie du runner. Règle de M06 |

#### 1.1.5 📊 Chiffres à retenir

- **Jusqu'à +30 %** de qualité de réponse quand la requête est placée **après** les documents longs (> 20 k tokens) [S-02].
- **17,7 % → 78,7 %** sur MultiArith avec la seule phrase *« Let's think step by step »* [S-05].
- **+34,3 % de tests compilables et +18,7 % d'assertions correctes** grâce à une boucle de raffinement itératif (ChatTESTER) [S-09].
- **+21,1 points** de justesse des oracles pour une approche purement prompt engineering multi-agents face au générateur fine-tuné de référence (CANDOR) [S-10].
- **3 à 5 exemples** recommandés par la page consolidée [S-02], **1 seul** par le billet 2026 [S-03] : la contradiction est réelle, elle s'arbitre par mesure.

---

### 1.2 Notion N2 — Context engineering

#### 1.2.1 De quoi parle-t-on

Le **context engineering** est défini par l'éditeur comme la recherche du *« plus petit ensemble possible de tokens à fort signal »* [S-18]. Ce n'est pas une reformulation du prompt engineering : le prompt est ce que l'on écrit, le contexte est **tout ce que le modèle voit** — system prompt, mémoire projet, définitions d'outils, sorties d'outils, historique de la conversation, fichiers lus. LlamaIndex en énumère **neuf constituants** : system prompt, entrée utilisateur, mémoire court terme, mémoire long terme, retrieval de base de connaissances, définitions d'outils, réponses d'outils, sorties structurées, état global [S-33]. En QA, la sortie d'un `dotnet test` verbeux appartient au contexte au même titre que le cahier des charges — et elle pèse souvent davantage.

Le phénomène central s'appelle le **context rot** : la dégradation de performance à mesure que le contexte se remplit. L'éditeur l'explique par les relations token-à-token en n² du transformer et par un « budget d'attention » fini [S-18]. La phrase d'ouverture de la page de bonnes pratiques de Claude Code en fait le principe organisateur de tout l'outil : *« Most best practices are based on one constraint: Claude's context window fills up fast, and performance degrades as it fills »* [S-30].

#### 1.2.2 Ce que dit l'état de l'art

**La dégradation en contexte long est établie par trois travaux indépendants.**

| Travail | Protocole | Résultat |
|---|---|---|
| *Lost in the Middle* [S-27] | QA multi-documents, position de l'information variée | **Courbe en U** (primauté + récence). La performance de GPT-3.5-Turbo *« can drop by more than 20 % »* et, à 20-30 documents, tombe **sous la performance closed-book (56,1 %)**, contre 88,3 % en oracle |
| *NoLiMa* [S-28] | 13 LLM annonçant ≥ 128 k de contexte | *« at 32K, 11 models drop below 50 % »* de leur performance courte ; GPT-4o passe de **99,3 % à 69,7 %** |
| *Context Rot* [S-29] | **18 LLM**, 8 longueurs × 11 positions, **194 480 appels** | Sur LongMemEval, 306 prompts à ~113 k tokens contre ~300 tokens en version focalisée : performance **systématiquement inférieure** en version longue |

Conclusion opérationnelle, à projeter telle quelle : **« 1 M de contexte » n'est pas « 1 M utilisable »**. Les fenêtres annoncées sont de **1 M tokens par défaut** sur les modèles récents et **200 k** sur les générations antérieures [S-20] ; cela ne dit rien de la longueur à laquelle la qualité reste acceptable.

**Le `CLAUDE.md` est le seul contexte que l'on contrôle entièrement.** La documentation impose une cible **sous 200 lignes par fichier** [S-19][S-24], une hiérarchie à quatre emplacements — politique gérée `/etc/claude-code/CLAUDE.md` → utilisateur `~/.claude/CLAUDE.md` → projet `./CLAUDE.md` → local `./CLAUDE.local.md` — et des imports `@chemin` récursifs avec une **profondeur maximale de 4 sauts** [S-19]. L'auto memory charge **les 200 premières lignes ou 25 Ko de `MEMORY.md`** [S-19].

> ⚠️ **À jour au 07/2026** — *« Claude Code reads `CLAUDE.md`, not `AGENTS.md` »* [S-19]. Un dépôt qui a adopté le standard ouvert `AGENTS.md` — **plus de 60 000 projets open source**, règle de conflit *« the closest AGENTS.md to the edited file wins »* [S-34] — doit créer un `CLAUDE.md` dont la première ligne est `@AGENTS.md`. Le symlink est impossible sous Windows sans Developer Mode : en salle, la solution est l'import.

**Ce qui survit à la compaction est documenté, et c'est décisif.** La page dédiée à la fenêtre de contexte fournit un tableau explicite : le `CLAUDE.md` racine, les *rules* non scopées et l'auto memory sont **relus depuis le disque** après compaction ; en revanche, les *rules* portant un frontmatter `paths:` et les `CLAUDE.md` imbriqués sont **perdus** [S-21]. Les corps de skills invoquées sont plafonnés à **5 000 tokens par skill et 25 000 tokens au total** [S-21].

> 🎯 **Conséquence pour SkyRetail.** Une convention de test critique — « ne jamais mettre un test en `[Skip]` pour faire passer la CI » — doit vivre dans le `CLAUDE.md` **racine**, pas dans `backend/CLAUDE.md`. Sinon elle disparaît à la première compaction, c'est-à-dire précisément au moment où la session est longue et où l'agent est tenté de tricher.

**La compaction et l'édition de contexte sont paramétrables et mesurées.** Côté API, la compaction serveur se déclenche par défaut à **150 000 tokens d'entrée** (minimum configurable 50 000) [S-22] ; la stratégie `clear_tool_uses_20250919` d'édition de contexte se déclenche à **100 000 tokens** et conserve **3 appels d'outils** [S-23]. Les gains publiés sont chiffrés : *memory tool* + *context editing* = **+39 %** sur l'éval de recherche agentique, *context editing* seul **+29 %**, et sur une évaluation à **100 tours**, l'édition de contexte achève des workflows qui échouaient **en réduisant la consommation de tokens de 84 %** [S-25].

> ⚠️ **À jour au 07/2026** — côté Claude Code, **aucun pourcentage d'auto-compaction par défaut n'est documenté** [S-31]. Le « 92 % » ou le « 95 % » que l'on lit partout circulent via des sources tierces [S-32], pas via l'éditeur. La **seule valeur numérique officielle** est : *« Sessions auto-compact before the window fills, at about 967K tokens by default »* sur un modèle à fenêtre de 1 M, soit ≈ **96,7 %** [S-26]. La variable `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` accepte 1-100 et *« can only lower the threshold »* [S-31].

**Le coût se calcule avant, pas après.** L'endpoint `POST /v1/messages/count_tokens` est **gratuit** et retourne `{"input_tokens": N}` [S-35]. Les ordres de grandeur du terrain sont publiés : *« the average cost is around **$13 per developer per active day** and **$150-250 per developer per month**, with costs remaining **below $30 per active day for 90 % of users** »* [S-24]. Les *agent teams* consomment **~7× plus de tokens** qu'une session standard [S-24], et un système multi-agents environ **15× plus** qu'une conversation [S-36].

> ⚠️ **À jour au 07/2026** — les modèles de génération 4.7+ utilisent un **nouveau tokenizer produisant ~30 % de tokens en plus pour le même texte** [S-35]. Une estimation de budget faite en 2025 sous-évalue donc la facture 2026 d'environ un tiers, à prompt identique.

**Le prompt caching est le levier d'économie le plus rentable en QA.** Les multiplicateurs sont exacts : écriture de cache **5 min = 1,25×**, **1 h = 2×**, **lecture de cache = 0,1×, soit −90 %** ; TTL par défaut 5 minutes, rafraîchi gratuitement à chaque hit ; minimum cacheable de **512 à 4 096 tokens** selon le modèle ; **4 breakpoints** maximum [S-37]. Le cas d'usage QA est évident : le cahier des charges, le contrat OpenAPI et les conventions de test sont **identiques d'une itération à l'autre**. Mis en préfixe caché, ils coûtent 10 % de leur prix à partir du deuxième appel. Sur une campagne de 40 générations, l'économie est de l'ordre de 80 % du coût d'entrée. Les remises **batch (−50 %)** et le caching **se cumulent**, avec des taux de hit observés de **30 % à 98 %** [S-38].

**Le choix de modèle est un paramètre de conception, pas une préférence.** Les tarifs publiés en juillet 2026 donnent, par million de tokens : **Opus 5 à 5 $ / 25 $**, **Sonnet 5 à 3 $ / 15 $** (tarif d'introduction 2 $ / 10 $ jusqu'au 31/08/2026), **Haiku 4.5 à 1 $ / 5 $** avec une fenêtre de 200 k [S-39]. Haiku est donc **5× moins cher qu'Opus en entrée**. La documentation propose deux stratégies d'entrée — *« start efficiency-first »* ou *« capability-first »* — et un quatrième critère au-delà de capacité, vitesse et coût : le paramètre `effort`, avec cette recommandation nette : *« Tuning effort is often a better lever than switching models »* [S-40]. Le long contexte n'entraîne **aucun surcoût** : *« A 900k-token request is billed at the same per-token rate as a 9k-token request »* [S-41].

**RAG sur le code : la contre-thèse est argumentée.** L'éditeur fournit un repère quantitatif : **en dessous de 200 000 tokens (~500 pages), tout mettre dans le prompt** plutôt que d'indexer [S-42]. Cline argumente plus radicalement contre l'indexation du code : le chunking *« literally tear[s] apart its logic »* (« un appel de fonction peut être dans le chunk 47, sa définition dans le chunk 892 »), *« Indexes Decay While Code Evolves »*, et les embeddings doublent la surface d'attaque sur la propriété intellectuelle — d'où la position *« No RAG. No embeddings. No vector databases »* [S-43]. Pour un dépôt de la taille de SkyRetail, la recherche agentique (grep, glob, lecture ciblée) suffit et se débogue.

**Le rôle des sous-agents est un mécanisme de contexte avant d'être un mécanisme de parallélisme.** *« Exploring a large codebase fills your context with file reads. Delegate the exploration so only the findings come back »* [S-44]. Un sous-agent peut consommer des dizaines de milliers de tokens et ne renvoyer qu'un résumé de **1 000 à 2 000 tokens** [S-18]. C'est exactement ce qu'il faut faire d'une exécution de suite de tests bavarde : la sortie brute reste chez le sous-agent, seul le verdict remonte. La documentation sur l'écriture d'outils confirme la contrainte : *« For Claude Code, we restrict tool responses to 25 000 tokens by default »*, et un même résultat coûte **206 tokens en format détaillé contre 72 en format concis** [S-45].

**Hygiène de session : la règle des deux corrections.** La formulation officielle est sans ambiguïté : *« If you've corrected Claude more than twice on the same issue in one session… Run `/clear` and start fresh »* [S-30]. Trois commandes structurent l'hygiène : `/clear [name]` *« Start a new conversation with empty context »* ; `/compact [instructions]` *« Free up context by summarizing the conversation so far. Optionally pass focus instructions »* ; `/context [all]` *« Visualize current context usage as a colored grid. Shows optimization suggestions for context-heavy tools, memory bloat, and capacity warnings »* [S-46]. `/context` est l'instrument de mesure du module ; il rend l'exercice M4-2 objectif.

#### 1.2.3 Application au contexte SkyRetail

Le dépôt contient `bin/`, `obj/`, `node_modules/`, `dist/`, un dossier `docs/` de plusieurs pages et 47 tests. Une session non hygiénique charge tout cela.

| Levier | Action sur SkyRetail | Effet attendu |
|---|---|---|
| Exclusion de fichiers | `permissions.deny` sur `bin/**`, `obj/**`, `node_modules/**`, `dist/**`, `**/.env` [S-47] | Gain de tokens immédiat, et conformité à la règle de sécurité §6 du setup |
| `CLAUDE.md` racine < 200 lignes | conventions xUnit v3, commandes `dotnet test` / `ng test --no-watch`, interdiction de `[Skip]` | Survit à la compaction [S-21] |
| Préfixe caché | `docs/cdc-v4.0.md` §3 + `docs/openapi.yaml` en tête de chaque prompt de génération | **−90 %** sur l'entrée à partir du 2ᵉ appel [S-37] |
| Sous-agent | `test-runner` qui exécute et ne renvoie que « 3 rouges / 44 verts + les 3 messages » | La sortie brute de 40 000 tokens ne pollue pas la session principale [S-18][S-44] |
| Modèle | Haiku pour classer les 47 tests existants, Opus pour concevoir la stratégie F1 | Facteur 5 sur le coût d'entrée [S-39][S-40] |

> ⚠️ **À jour au 07/2026** — **`.claudeignore` n'existe pas.** Le mécanisme officiel est `permissions.deny` dans `.claude/settings.json`, avec des entrées de la forme `"Read(./.env)"` ou `"Read(./secrets/**)"`. Texte exact de la documentation : *« This replaces the deprecated `ignorePatterns` configuration »* [S-47]. Tout support de formation qui enseigne encore `.claudeignore` est périmé.

#### 1.2.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Le `CLAUDE.md` encyclopédie** | 600 lignes, l'agent ignore la moitié des règles | Dépassement de la cible de 200 lignes [S-19][S-24] ; dilution de l'attention [S-27] | Extraire en `.claude/rules/*.md` scopés, garder les **règles non négociables** dans le fichier racine, seul à survivre à la compaction [S-21] |
| **La règle critique dans un fichier scopé** | Le squad met « ne jamais skipper un test » dans un `CLAUDE.md` imbriqué ; l'agent skippe après 2 h de session | Les `CLAUDE.md` imbriqués et les rules avec `paths:` sont **perdus** à la compaction [S-21] | Règles de sécurité et d'intégrité dans le fichier racine, sans exception |
| **La session-marathon** | Après 3 h, l'agent redemande où sont les tests | Context rot [S-18][S-29] | Règle des deux corrections → `/clear` [S-30] ; mesurer avec `/context` [S-46] |
| **Le log de test dans le contexte principal** | 40 000 tokens de sortie xUnit avalés d'un coup | Absence de délégation | Sous-agent ou hook qui filtre ; les réponses d'outils sont déjà plafonnées à 25 000 tokens [S-45] |
| **L'estimation de budget périmée** | Facture 30 % au-dessus de la prévision | Nouveau tokenizer sur les modèles 4.7+ [S-35] | Réestimer avec `count_tokens` (gratuit) avant chaque campagne [S-35] |

#### 1.2.5 📊 Chiffres à retenir

- **Lecture de cache = 0,1× le prix d'entrée, soit −90 %** ; écriture 1,25× (5 min) ou 2× (1 h) [S-37].
- **13 $ par développeur et par jour actif**, **150-250 $ par mois**, **moins de 30 $ par jour actif pour 90 % des utilisateurs** [S-24].
- **11 modèles sur 13 tombent sous 50 %** de leur performance courte dès **32 k tokens** de contexte (NoLiMa) [S-28].
- **−84 %** de consommation de tokens sur une évaluation à 100 tours grâce à l'édition de contexte, avec des workflows qui aboutissent au lieu d'échouer [S-25].
- **Haiku 4.5 : 1 $ / 5 $ par million de tokens contre 5 $ / 25 $ pour Opus 5** — facteur 5 en entrée [S-39].

---

### 1.3 Notion N3 — Industrialiser ses prompts

#### 1.3.1 De quoi parle-t-on

Industrialiser un prompt, c'est lui appliquer les quatre traitements que l'on applique déjà au code de test : **versionnage**, **revue**, **exécution reproductible**, **non-régression**. Le vocabulaire existe déjà et il est celui du test. L'outil d'évaluation de la console impose d'ailleurs une contrainte qui force la bonne pratique : *« le prompt doit contenir au moins 1 à 2 variables `{{variable}}` »* pour qu'un jeu d'évals puisse être créé [S-48]. Un prompt qui n'a pas de variable n'est pas un artefact réutilisable : c'est un message.

Le principe méthodologique le plus contre-intuitif du corpus vient de la documentation d'évaluation : *« Prioritize volume over quality: more questions with slightly lower signal automated grading is better than fewer questions with high-quality human hand-graded evals »* [S-49]. Un testeur reconnaît là un arbitrage familier : mieux vaut 200 assertions automatisées imparfaites que 12 vérifications manuelles parfaites.

#### 1.3.2 Ce que dit l'état de l'art

**Un critère de succès se chiffre.** La documentation fournit le patron : *« an F1 score of at least 0.85 on a held-out test set of 10 000 diverse posts, a 5 % improvement over our current baseline »* [S-49]. Transposé : *« au moins 8 des 12 cas limites du cahier des charges v4.0 §3.2 couverts, sur un jeu de 20 exécutions, contre 4 avec le prompt v1 »*. Le catalogue de cas limites proposé — *« irrelevant or nonexistent input data »*, *« overly long input »*, *« ambiguous test cases where even humans would find it hard to reach consensus »* — est directement injectable dans un prompt de génération de tests [S-49].

**Le LLM-as-a-judge a une règle d'or.** *« best practice to use a different model to evaluate than the model used to generate »*, avec une grille ordinale 1–5 [S-49]. La documentation 2026 sur l'évaluation d'agents précise la distinction structurante : évaluer la **transcript** (ce que l'agent a dit) n'est pas évaluer l'**outcome / final state** (l'état réel de l'environnement) — *« un agent de réservation peut dire "votre vol est réservé" à la fin du transcript, mais… »* [S-50]. La recommandation explicite pour du code est un mélange : **tests unitaires pour la correction, rubrique LLM pour la qualité** [S-50]. C'est exactement le partage des tâches que le module M06 implémentera.

**Deux outils font de l'évaluation de prompts une suite de tests exécutable.**

| Outil | Modèle mental | Faits |
|---|---|---|
| **promptfoo** [S-51] | un `promptfooconfig.yaml` unique (`prompts`, `providers`, `tests`, `assert`) | Une quarantaine de types d'assertions, déterministes (`equals`, `contains`, `regex`, `is-json`, `levenshtein`, `latency`, `cost`, `javascript`) et *model-graded* (`llm-rubric`, `factuality`, `similar`), avec `threshold`, `weight`, `metric`. MIT, release 0.121.11 du 8 mai 2026 |
| **DeepEval** [S-52] | *« similar to Pytest but specialized for unit testing LLM apps »* : `assert_test(test_case, [metric])` puis `deepeval test run` | Une quarantaine de métriques (G-Eval, DAG, Faithfulness, Hallucination, Task Completion, Tool Correctness, Prompt Alignment…), scorées 0–1 avec un `threshold` par défaut à 0.5 qui décide du pass/fail. Apache 2.0, v4.0.2 du 13 mai 2026 |

Le point pédagogique n'est pas l'outil, c'est le **modèle mental « métrique + seuil + assert »** : on branche `deepeval test run` ou `promptfoo eval` en CI au même titre que `dotnet test` ou `ng test`.

**Le prompt devient un fichier, et le fichier a un format par écosystème.**

| Écosystème | Emplacement | Contraintes documentées |
|---|---|---|
| **Claude Code — Skills** | `.claude/skills/<nom>/SKILL.md` (projet) ou `~/.claude/skills/` | `description` + `when_to_use` **tronqués à 1 536 caractères** dans le listing ; frontmatter `allowed-tools`, `disallowed-tools`, `disable-model-invocation`, `paths`, `context: fork`. Les `.claude/commands/*.md` sont désormais **fusionnés dans les skills** [S-53] |
| **Spécification ouverte Agent Skills** | idem | `name` **max 64 caractères**, `description` **max 1024** ; divulgation progressive en 3 étages : métadonnées **~100 tokens** au démarrage, corps du `SKILL.md` **< 5 000 tokens** à l'activation, ressources à la demande ; garder le `SKILL.md` **sous 500 lignes** ; validation par `skills-ref validate ./my-skill` [S-54] |
| **GitHub Copilot** | `.github/prompts/<nom>.prompt.md` | Frontmatter YAML avec clé `description:`, invocable en slash command ; **public preview**, VS Code / Visual Studio / JetBrains uniquement [S-55] |
| **Copilot — instructions dépôt** | `.github/copilot-instructions.md` | Quand les instructions sont utilisées, le fichier apparaît dans la liste **References** de la réponse — **preuve traçable** que la convention a été injectée [S-56] |
| **Copilot — instructions par chemin** | `*.instructions.md` | Recommandé pour « empêcher Copilot d'appliquer des règles spécifiques à un langage aux mauvais fichiers » : une règle `**/*.spec.ts` distincte d'une règle `**/*Tests.cs` [S-57] |
| **Cursor** | `.cursor/rules/*.mdc` | ⚠️ un fichier `.md` posé dans `.cursor/rules` est **ignoré** (mauvaise extension) ; frontmatter `description` / `globs` / `alwaysApply` ; garder sous **500 lignes** ; précédence Team → Project → User [S-58] |
| **Windsurf** | `.windsurf/rules/*.md` | **12 000 caractères par fichier**, `global_rules.md` limité à **6 000** ; 4 modes d'activation (`always_on`, `model_decision`, `glob`, `manual`). L'exemple officiel de la documentation **est une règle de test** [S-59] |
| **Portable** | `AGENTS.md` | **60 000+ projets** ; section « Testing instructions » canonique avec *« Add or update tests for the code you change, even if nobody asked »* ; le dépôt principal d'OpenAI contient **88 fichiers AGENTS.md** [S-60] |

Le chiffre à retenir de la spécification ouverte est celui du **coût nul tant qu'on n'invoque pas** : ~100 tokens de métadonnées au démarrage [S-54]. Une bibliothèque de 30 skills de test coûte donc ~3 000 tokens de contexte permanent, pas 30 × 5 000.

**Le prompt improver est un outil, avec un effet de bord documenté.** Il opère en **4 étapes** — identification des exemples, brouillon en balises XML, raffinement chain-of-thought, enrichissement des exemples — et utilise les variables en `{{double accolades}}`. L'avertissement officiel est important pour la CI : il *« creates templates that produce longer, more thorough, but slower responses »* [S-61]. Un prompt amélioré est un prompt plus cher.

**Reproductibilité : le mythe de `temperature = 0`.** Le folklore veut qu'une température nulle rende un LLM déterministe. Le livre blanc Google recommande effectivement une configuration de départ **température 0,2 / top-P 0,95 / top-K 30**, et **température 0 pour les tâches déterministes** [S-62] — recommandation raisonnable, mais qui porte sur la *réduction de la variance*, pas sur une garantie de reproductibilité bit à bit.

> ⚠️ **À jour au 07/2026 — deux corrections d'idées reçues.**
> **1.** `temperature = 0` **ne garantit pas** que deux exécutions du même prompt produisent la même sortie. La reproductibilité d'un LLM de production dépend du batching serveur, de la version exacte du modèle et de la précision arithmétique — aucun de ces facteurs n'est sous le contrôle du prompt.
> **2.** Plus radical encore : `temperature`, `top_p` et `top_k` sont **dépréciés sur les modèles Opus 4.7+ et renvoient une erreur 400** [S-63]. Un jeu d'évals qui reposait sur `temperature=0` pour être stable **casse lors d'une montée de version de modèle** — cas d'école de régression liée au modèle, à traiter en M10.

La conséquence pratique est structurante pour le dossier de recette : **la reproductibilité ne s'obtient pas par un paramètre, elle s'obtient par un dispositif** — épingler la version du modèle, versionner le prompt dans Git, conserver le jeu d'évals, et accepter une **tolérance statistique** plutôt qu'une égalité stricte. Le calendrier de dépréciation rend l'épinglage périssable : un modèle a été **déprécié le 5 juin 2026 et retiré le 5 août 2026**, avec un engagement de **60 jours de préavis** minimum [S-63].

#### 1.3.3 Application au contexte SkyRetail

La bibliothèque cible, à créer aujourd'hui et à alimenter jusqu'à J4 :

```
skyretail/
├── CLAUDE.md                              # < 200 lignes, survit à la compaction
├── .claude/
│   ├── settings.json                      # permissions.deny (pas de .claudeignore)
│   ├── rules/
│   │   └── testing-dotnet.md              # frontmatter paths: backend/**
│   └── skills/
│       ├── generate-tests-dotnet/SKILL.md
│       └── generate-tests-angular/SKILL.md
├── prompts/
│   ├── README.md                          # index + politique de version
│   ├── generate-unit-tests-dotnet.v1.md   # prompt naïf, conservé comme baseline
│   ├── generate-unit-tests-dotnet.v2.md   # 5 blocs, spécification en source
│   └── evals/
│       ├── promptfooconfig.yaml
│       └── cases/f1-discount-*.yaml
└── docs/cdc-v4.0.md
```

La règle de version est simple et opposable : **`v1` n'est jamais supprimé**. C'est la ligne de base contre laquelle on démontre, chiffres à l'appui, que `v2` est meilleur. C'est aussi la seule façon de répondre à la question piège n°2 du comité de J4 — *« qui maintient ces 340 tests dans six mois quand le modèle aura changé de version ? »*.

#### 1.3.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Le prompt dans le presse-papiers** | Personne ne sait quel prompt a produit les 80 tests livrés | Le prompt n'est pas un artefact du dépôt | `prompts/*.md` versionné ; chaque test généré porte en en-tête le prompt et sa version |
| **L'amélioration non mesurée** | « Le nouveau prompt est bien meilleur » sans chiffre | Absence de jeu d'évals | Un `promptfooconfig.yaml` avec assertions déterministes [S-51] ; volume plutôt que finesse [S-49] |
| **Le juge et la partie** | Le même modèle génère et note ses propres tests | Violation de la règle d'or | Modèle évaluateur ≠ modèle générateur [S-49] ; en M06, subagent `test-reviewer` distinct |
| **`temperature=0` comme garantie contractuelle** | Le squad promet des sorties identiques au comité | Confusion variance/déterminisme ; paramètre déprécié sur 4.7+ [S-63] | Épingler la version de modèle, versionner le prompt, publier une **tolérance** mesurée (exercice M4-4) |
| **La skill fourre-tout** | Un `SKILL.md` de 900 lignes que l'agent n'applique jamais entièrement | Dépassement des seuils de la spécification (< 500 lignes, < 5 000 tokens) [S-54] | Découper par intention : une skill `generate`, une skill `review`, une skill `report` |
| **Le `.md` dans `.cursor/rules`** | La règle Cursor est silencieusement ignorée | Extension attendue : `.mdc` [S-58] | Vérifier l'extension ; en cas de doute, `AGENTS.md` est le format le plus portable [S-60] |

#### 1.3.5 📊 Chiffres à retenir

- **~100 tokens** de métadonnées par skill au démarrage ; corps **< 5 000 tokens** à l'activation ; `SKILL.md` **< 500 lignes** [S-54].
- **1 536 caractères** : troncature de `description` + `when_to_use` dans le listing des skills Claude Code [S-53].
- **12 000 / 6 000 caractères** : limites de règles Windsurf par fichier et pour `global_rules.md` [S-59].
- **60 000+ projets** open source utilisent `AGENTS.md` ; **88 fichiers** dans le seul dépôt principal d'OpenAI [S-60].
- **`temperature`, `top_p`, `top_k` dépréciés sur Opus 4.7+ → erreur 400** ; **60 jours** de préavis minimum avant retrait d'un modèle [S-63].

---

## 2. Trois exemples concrets

### 🔍 Exemple A — « Écrire le `CLAUDE.md` de SkyRetail » *(démonstration guidée, 10 min)*

**Contexte.** Le dépôt contient un `CLAUDE.md` vide. Chaque session redécouvre que le back est en xUnit, que le front est passé à Vitest et que neuf tests sont en `[Skip]`. Le formateur écrit le fichier en direct, avec le groupe, en respectant la cible de 200 lignes [S-19].

**Ce qu'on montre.** Qu'un bon `CLAUDE.md` n'est pas une documentation : c'est un **contrat opérationnel**. Il contient des commandes exécutables, des interdictions vérifiables et rien d'autre.

**Fichier produit, en intégralité :**

```markdown
# SkyRetail — instructions projet

@AGENTS.md

## Stack
- Back : .NET 10 / ASP.NET Core, xUnit **v3** (package `xunit.v3`, PAS `xunit`), FluentAssertions v7, NSubstitute, Testcontainers.PostgreSql.
- Front : Angular v22, **Vitest + jsdom** (builder `@angular/build:unit-test`), Testing Library, Playwright 1.61.
- Base : PostgreSQL via `docker compose up -d`.

## Commandes de référence (à utiliser telles quelles)
```bash
dotnet test backend/SkyRetail.Tests                       # suite back
dotnet test backend/SkyRetail.Tests --coverage             # avec couverture
ng test --no-watch --no-progress                           # suite front en CI
npx playwright test                                        # E2E
dotnet stryker --project SkyRetail.Domain                  # score de mutation
```

## Règles de test — NON NÉGOCIABLES
1. **L'oracle n'est jamais le code.** Tout résultat attendu est justifié par un commentaire
   `// CDC v4.0 §x.y : « citation »` ou `// openapi.yaml : operationId`.
2. **Interdiction absolue** de mettre un test en `[Fact(Skip = ...)]` ou `test.skip`
   pour faire passer la CI. Un `Skip` n'est autorisé qu'avec un motif d'ambiguïté métier
   référencé `EX-0xx`.
3. **Interdiction** de modifier une assertion existante pour faire passer un test.
   Si un test échoue, l'analyse doit conclure « le test est faux » OU « le code est faux »,
   explicitement, avant toute modification.
4. Un comportement = un test. Pas de test à cinq assertions sans message.
5. Aucun `page.waitForTimeout()` dans un test Playwright.
6. Aucun locator CSS positionnel (`nth-child`, XPath absolu). Ordre de préférence :
   rôle accessible → texte → `data-testid`.
7. Aucune dépendance ajoutée sans vérification préalable sur nuget.org / npmjs.com.

## Conventions de nommage
- .NET : `Methode_Contexte_ComportementAttendu` (ex. `Compute_WithWelcomeAndFlashSale_AppliesOnlyHigherRate`).
- Angular : `describe('<Composant>')` / `it('doit …')`, requêtes par rôle ou label.

## Périmètre
- F1 `backend/SkyRetail.Domain/Pricing` · F2 `frontend/src/app/checkout`
- F3 `backend/SkyRetail.Api` (23 endpoints, `docs/openapi.yaml`) · F4 `frontend/src/app/account` + `/api/me`

## Ce qu'il ne faut pas lire
`bin/`, `obj/`, `node_modules/`, `dist/`, `coverage/` — voir `.claude/settings.json`.

## Sources de vérité
- `docs/cdc-v4.0.md` — grille de remises, règles de TVA, tunnel de commande.
- `docs/openapi.yaml` — contrat des 23 endpoints.
- `docs/incidents/` — 3 post-mortems v3.9 : tout test de non-régression s'y réfère.
```

Et le fichier de permissions associé, en intégralité :

```json
// .claude/settings.json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./**/*.pem)",
      "Read(./secrets/**)",
      "Read(./**/bin/**)",
      "Read(./**/obj/**)",
      "Read(./node_modules/**)",
      "Read(./frontend/dist/**)"
    ]
  }
}
```

**Déroulé pas à pas.**

1. `/context` **avant** : relever le nombre de tokens occupés à froid.
2. Écrire le `CLAUDE.md` ci-dessus, puis `/clear`.
3. `/context` **après** : le fichier apparaît dans la grille.
4. Poser la question de contrôle : *« quelle commande lances-tu pour les tests front, et pourquoi pas `ng test` tout court ? »* La réponse doit citer `--no-watch --no-progress`.
5. Poser la question piège : *« si je te demande de faire passer la CI en vert tout de suite, que fais-tu ? »* La réponse doit refuser le `Skip` en citant la règle 2.

**Analyse critique.**

| Ce que l'IA fait bien avec ce fichier | Ce que le fichier ne garantit pas |
|---|---|
| Utilise `xunit.v3` et non `xunit` — le renommage est le piège n°1 des LLM en 2026 | Que la règle 3 soit respectée **après 2 h de session** : le `CLAUDE.md` racine survit à la compaction [S-21], mais l'agent peut toujours choisir de la contourner |
| Lance les bonnes commandes sans les inventer | Que les locators produits existent : aucun texte ne remplace une exécution contre le DOM (M05) |
| Cite la source de vérité dans les commentaires | Que la citation soit exacte — la vérification reste humaine |

**Ce qu'on retient.** Un `CLAUDE.md` n'est pas de la documentation, c'est de la **configuration exécutable**. Les règles non négociables vont dans le fichier **racine**, parce que c'est le seul relu depuis le disque après compaction [S-21]. Et un fichier de 90 lignes bat un fichier de 600 lignes, mesure à l'appui.

---

### 🔍 Exemple B — « Le même code, deux prompts, deux verdicts » *(approfondissement, 8 min)*

**Contexte.** `DiscountEngine.cs` (F1), qui contient BUG-101. On oppose le prompt v1 (naïf, celui de M01) au prompt v2 (cinq blocs, spécification en source), et on **mesure**.

**Prompt v1 — `prompts/generate-unit-tests-dotnet.v1.md`**

```text
Génère les tests unitaires xUnit + FluentAssertions pour
backend/SkyRetail.Domain/Pricing/DiscountEngine.cs.
Vise une bonne couverture des cas de cumul de remises.
```

**Prompt v2 — `prompts/generate-unit-tests-dotnet.v2.md`** (structure complète en §1.1.3, variabilisée)

**Protocole de mesure, exécutable en salle :**

```bash
# v1 — coût et sortie machine-lisible
claude -p "$(cat prompts/generate-unit-tests-dotnet.v1.md)" \
       --output-format json > runs/v1.json
jq -r '.total_cost_usd' runs/v1.json

# v2 — idem, avec la spécification injectée en variable
sed "s|{{CDC_SECTION_3_2}}|$(sed -n '/## 3.2/,/## 3.3/p' docs/cdc-v4.0.md)|" \
    prompts/generate-unit-tests-dotnet.v2.md \
  | claude -p --output-format json > runs/v2.json

dotnet test backend/SkyRetail.Tests --filter "FullyQualifiedName~DiscountEngine"
```

**Résultat typiquement observé :**

| Critère mesuré | v1 (naïf) | v2 (structuré) |
|---|---|---|
| Tests produits | 9 | 7 |
| Tests verts au premier `dotnet test` | **9 / 9** | **5 / 7** |
| Tests dont l'attendu cite le cahier des charges | 0 | 7 |
| BUG-101 révélé | **non** | **oui** (`AppliesOnlyTheHigherRate` échoue) |
| Ambiguïtés métier remontées | 0 | 2, en `[Fact(Skip = "EX-0xx")]` |
| Tokens d'entrée | ~4 k | ~11 k |
| Coût de l'appel | ×1 | ×2,3 |

**Analyse critique.**

Le prompt v2 coûte **plus cher** et produit **moins de tests**. C'est le point du module. Le prompt v1 optimise une métrique de production (nombre de tests verts), le prompt v2 optimise une métrique de vérification (défauts révélés). Le barème du fil rouge est aligné sur la seconde : v1 vaut **−30 QAC** de test tautologique, v2 vaut **+50 QAC** de bug planté découvert.

Ce que v2 rate quand même : il ne détecte pas BUG-103 (plafond non appliqué en présence d'une précommande), parce que le cahier des charges §3.2 n'évoque pas les précommandes. **Le prompt ne peut pas être meilleur que sa source de vérité.** C'est la limite structurelle, et elle prépare M4-4.

**Ce qu'on retient.** Un prompt structuré ne « fait pas mieux écrire » le modèle : il **change la source dont l'attendu est dérivé**. Le gain est fonctionnel, le surcoût est en tokens, et il s'amortit par le prompt caching dès la deuxième itération [S-37].

---

### 🔍 Exemple C — « La bibliothèque de prompts d'une équipe de 40 » *(passage à l'échelle, 7 min)*

**Contexte.** Ce qui tient à trois personnes ne tient pas à quarante. Comment une organisation transforme des prompts individuels en actif d'équipe.

**Ce qu'on montre.** Trois mécanismes empilés, tous documentés, tous versionnables dans Git.

**1. Le prompt devient une skill.** Fichier complet, à créer dans le dépôt :

```markdown
---
name: generate-tests-dotnet
description: Génère une suite xUnit v3 pour une classe du domaine SkyRetail à partir du cahier des charges, jamais à partir de l'implémentation.
when_to_use: Quand l'utilisateur demande des tests unitaires .NET sur SkyRetail.Domain et qu'une section du CDC couvre le comportement.
allowed-tools: Read, Glob, Grep, Write, Bash(dotnet test:*)
paths:
  - backend/**
---

# Génération de tests unitaires .NET — SkyRetail

## Procédure
1. Identifier la section du `docs/cdc-v4.0.md` qui couvre la classe cible.
   Si aucune section ne la couvre : **s'arrêter** et le signaler. Ne pas inventer d'oracle.
2. Lire UNIQUEMENT les signatures publiques (interfaces, DTO), jamais le corps
   de la classe cible.
3. Produire un test par comportement décrit dans la spécification, avec en commentaire
   la citation exacte de la ligne du CDC.
4. Exécuter `dotnet test --filter "FullyQualifiedName~<Classe>"`.
5. Pour chaque test rouge, produire une ligne de verdict :
   `LE TEST EST FAUX` ou `LE CODE EST FAUX`, avec la justification. Ne rien corriger.

## Critères d'acceptation de la sortie
- [ ] Chaque `[Fact]` porte un commentaire `// CDC v4.0 §x.y : « … »`.
- [ ] Aucun `Skip` sans référence `EX-0xx`.
- [ ] Aucun mock d'une interface du domaine.
- [ ] La sortie du runner est reproduite intégralement dans la réponse.
```

Le coût de contexte de cette skill est de **~100 tokens** tant qu'elle n'est pas invoquée [S-54]. Une équipe peut donc en publier trente.

**2. Le prompt devient testable.** `prompts/evals/promptfooconfig.yaml` :

```yaml
# Évaluation de non-régression du prompt de génération de tests .NET
description: "SkyRetail — prompt generate-unit-tests-dotnet"

prompts:
  - file://../generate-unit-tests-dotnet.v1.md
  - file://../generate-unit-tests-dotnet.v2.md

providers:
  - id: anthropic:messages:claude-sonnet-5

tests:
  - description: "F1 — exclusivité WELCOME10 / FLASH15"
    vars:
      CDC_SECTION_3_2: file://cases/cdc-3-2.md
      CLASSE: DiscountEngine
    assert:
      - type: contains
        value: "CDC v4.0 §3.2"          # traçabilité obligatoire
      - type: not-contains
        value: "Skip = \"\""             # pas de Skip sans motif
      - type: regex
        value: "AppliesOnly|NotCumulative|ExclusiveWith"
      - type: llm-rubric
        value: >
          La réponse dérive chaque résultat attendu de la spécification fournie
          et jamais d'un calcul reproduisant l'implémentation.
        threshold: 0.8
      - type: cost
        threshold: 0.15                  # garde-fou budgétaire, en dollars
```

Quarante types d'assertions sont disponibles, déterministes et *model-graded* [S-51]. Les quatre ci-dessus suffisent à détecter une régression de prompt.

**3. Le prompt devient portable.** Un `AGENTS.md` importé depuis `CLAUDE.md` couvre simultanément Claude Code, Copilot, Codex, Cursor, Junie, Gemini CLI et Windsurf [S-60]. La règle de conflit — *« the closest AGENTS.md to the edited file wins »* [S-60] — permet une règle `backend/AGENTS.md` distincte d'une règle `frontend/AGENTS.md`, exactement comme les `*.instructions.md` par chemin de Copilot [S-57].

**Analyse critique.**

| Ce que l'industrialisation apporte | Ce qu'elle ne résout pas |
|---|---|
| Traçabilité : on sait quel prompt, en quelle version, a produit quel test | La **variabilité** intrinsèque du modèle (exercice M4-4) |
| Non-régression : un changement de prompt qui casse la traçabilité échoue en CI | La dérive du modèle lui-même — un modèle déprécié en juin est retiré en août [S-63] |
| Portabilité : un seul fichier d'instructions pour sept outils [S-60] | Les différences de comportement entre outils (M05) |
| Coût maîtrisé : assertion `cost` avec seuil [S-51] | Le coût humain de la revue, qui reste le poste dominant |

**Ce qu'on retient.** Le livrable de ce module n'est pas « des bons prompts ». C'est un **dossier `prompts/` versionné, avec une baseline conservée et un jeu d'évals exécutable en CI**. C'est cet artefact que le comité de J4 examinera quand il posera la question de la maintenance à six mois.

---

## 3. Quatre exercices

### 🧪 Exercice M4-1 — « Les cinq blocs »

| | |
|---|---|
| **Difficulté** | ⭐ |
| **Durée cible** | 5 min |
| **Modalité** | binôme |
| **Matériel** | `prompts/generate-unit-tests-dotnet.v1.md` (à créer), `docs/cdc-v4.0.md`, `backend/SkyRetail.Domain/Pricing/` |
| **QA Credits** | 10 |

**Énoncé**
Prenez le prompt naïf utilisé en M01 (« génère les tests unitaires de ce fichier »). Enregistrez-le tel quel en `prompts/generate-unit-tests-dotnet.v1.md` — c'est votre ligne de base, elle ne sera jamais supprimée. Réécrivez-le ensuite en `v2.md` en cinq blocs explicitement balisés : `<role>`, `<documents>`, `<constraints>`, `<output_format>`, `<examples>`, suivis de `<task>`. Le bloc `<documents>` doit être **avant** `<task>`. Au moins une variable `{{…}}` est obligatoire.

**✅ Résultat attendu**
- [ ] `prompts/generate-unit-tests-dotnet.v1.md` existe et contient le prompt naïf **inchangé**.
- [ ] `prompts/generate-unit-tests-dotnet.v2.md` contient les six balises, dans l'ordre, `<task>` en dernier.
- [ ] Au moins **une** variable `{{VARIABLE}}` est présente dans `v2.md`.
- [ ] Le bloc `<constraints>` contient au moins **une interdiction vérifiable** (formulée avec « n'ouvre pas », « interdiction de », « ne produis jamais »).
- [ ] Le bloc `<output_format>` précise un **chemin de fichier exact**.
- **Invalide** : `v1.md` retouché ; `<task>` placé avant `<documents>` ; aucune variable ; contrainte formulée en souhait (« essaie de… »).

**💡 Indice** *(après 2 min)*
Une contrainte utile est une contrainte qu'un relecteur peut déclarer violée sans discuter. « Sois rigoureux » n'en est pas une. « N'ouvre pas `DiscountEngine.cs` » en est une.

**🔑 Solution de référence**
Voir §1.1.3 pour la version complète. Points de contrôle du formateur : la présence de l'interdiction de lecture du fichier cible (c'est elle qui casse la tautologie), et la présence d'une clause d'ambiguïté (`[Fact(Skip = "ambiguïté EX-0xx")]`), qui autorise le modèle à ne pas savoir — technique documentée de réduction d'hallucination.

**🎓 Ce que l'exercice enseigne vraiment**
Qu'un prompt de QA n'est pas une phrase mais une **structure**, et que la variable la plus déterminante n'est ni le ton ni la longueur : c'est la **source dont l'attendu est dérivé**. La conservation de `v1` enseigne au passage que sans ligne de base, aucune amélioration n'est démontrable.

---

### 🧪 Exercice M4-2 — « Le contrat de 200 lignes »

| | |
|---|---|
| **Difficulté** | ⭐⭐ |
| **Durée cible** | 6 min |
| **Modalité** | squad (Pilote/Copilote inversés par rapport à M4-1) |
| **Matériel** | `CLAUDE.md` (vide), `.claude/settings.json`, `00-setup-technique.md` |
| **QA Credits** | 20 |

**Énoncé**
Écrivez le `CLAUDE.md` du dépôt SkyRetail. Contraintes : **strictement moins de 200 lignes**, au moins **5 commandes exécutables** copiées telles quelles, au moins **4 règles non négociables** formulées comme des interdictions vérifiables, et une section listant les sources de vérité. Ajoutez le `.claude/settings.json` avec une politique `permissions.deny` couvrant les secrets **et** les artefacts de build. Mesurez avec `/context` avant et après.

**✅ Résultat attendu**
- [ ] `wc -l CLAUDE.md` renvoie **< 200**.
- [ ] Au moins **5** commandes dans un bloc `bash`, dont `dotnet test`, `ng test --no-watch --no-progress` et une commande Playwright.
- [ ] Au moins **4** règles numérotées formulées à l'impératif négatif, dont l'interdiction du `Skip` de complaisance et l'interdiction de modifier une assertion existante.
- [ ] `.claude/settings.json` contient `permissions.deny` avec au minimum `Read(./.env)`, `Read(./secrets/**)`, `Read(./**/bin/**)`, `Read(./node_modules/**)`.
- [ ] Deux captures de `/context` (avant/après) consignées dans `boss-j2/contexte.md`, avec le delta de tokens.
- [ ] Test de recette : après `/clear`, la question « quelle commande pour les tests front ? » obtient `ng test --no-watch --no-progress`.
- **Invalide** : présence d'un fichier `.claudeignore` ; usage de `ignorePatterns` ; `CLAUDE.md` ≥ 200 lignes ; règles rédigées en conseils (« il est préférable de… »).

**💡 Indice** *(après 3 min)*
`.claudeignore` n'existe pas. Cherchez « exclude sensitive files » dans la documentation officielle : le mécanisme s'appelle `permissions.deny` et il remplace explicitement `ignorePatterns`.

**🔑 Solution de référence**
Le fichier complet est fourni en §2 Exemple A (90 lignes, 6 commandes, 7 règles) ainsi que le `settings.json`. Le formateur vérifie surtout **où** sont placées les règles : si un squad a mis les règles de test dans `backend/CLAUDE.md`, l'exercice est réussi sur la forme et raté sur le fond — les `CLAUDE.md` imbriqués ne survivent pas à la compaction [S-21].

**🎓 Ce que l'exercice enseigne vraiment**
Que la mémoire projet est un **artefact de configuration soumis à des contraintes de plateforme** (taille, emplacement, survie à la compaction), pas un README. Et que la corriger coûte cinq minutes aujourd'hui contre trois jours de dérive silencieuse.

---

### 🧪 Exercice M4-3 — « L'écart mesuré »

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐ |
| **Durée cible** | 7 min |
| **Modalité** | squad |
| **Matériel** | `prompts/*.v1.md` et `*.v2.md` (M4-1), `backend/SkyRetail.Domain/Pricing/DiscountEngine.cs`, `docs/cdc-v4.0.md` §3.2 |
| **QA Credits** | 40 |

**Énoncé**
Exécutez `v1` puis `v2` sur `DiscountEngine`. Utilisez `--output-format json` pour récupérer le coût réel. Produisez `boss-j2/ecart-prompts.md` comparant les deux exécutions sur **six critères mesurables** : nombre de tests, tests verts au premier lancement, tests dont l'attendu cite le cahier des charges, bugs plantés révélés, ambiguïtés remontées, coût en dollars. Concluez en une phrase sur ce qui a réellement changé — et ce qui n'a pas changé.

**✅ Résultat attendu**
- [ ] `runs/v1.json` et `runs/v2.json` existent et contiennent un champ `total_cost_usd` non nul.
- [ ] `boss-j2/ecart-prompts.md` contient un tableau à **6 lignes de critères × 2 colonnes**, toutes valeurs **lues** dans une sortie de commande, jamais estimées.
- [ ] La sortie brute de `dotnet test` est reproduite pour les deux exécutions (compte de tests passés/échoués visible).
- [ ] Au moins **un** test issu de `v2` est **rouge** et son message d'échec est cité.
- [ ] La phrase de conclusion identifie explicitement le mécanisme : *changement de la source dont l'attendu est dérivé*, et non « meilleure formulation ».
- [ ] Une ligne « ce que v2 ne détecte pas non plus », avec un bug planté nommé.
- **Invalide** : chiffres estimés ; `v2` produisant 100 % de tests verts sans que le squad l'interroge ; conclusion du type « v2 est mieux écrit ».

**💡 Indice** *(après 3 min)*
Si `v2` sort 100 % vert, deux hypothèses seulement : soit la section du cahier des charges injectée ne couvre pas la règle d'exclusivité, soit la contrainte « n'ouvre pas le fichier » n'a pas été respectée. Vérifiez laquelle avant de conclure.

**🔑 Solution de référence**
Le tableau de référence figure en §2 Exemple B. Le point de correction décisif est la dernière ligne : `v2` révèle BUG-101 mais **pas** BUG-103, parce que le cahier des charges §3.2 ne mentionne pas les articles en précommande. Un squad qui écrit « v2 trouve tous les bugs » n'a pas fait l'exercice : il a fait la démonstration commerciale.

**🎓 Ce que l'exercice enseigne vraiment**
Que l'amélioration d'un prompt se **chiffre** avec les mêmes instruments qu'une campagne de test, et qu'un prompt ne peut jamais être meilleur que la source de vérité qu'on lui fournit. Le trou dans la spécification devient alors une **exigence à remonter au métier** — c'est le lien direct avec le Boss J1.

---

### 🧪 Exercice M4-4 — « La variabilité irréductible » ⭐⭐⭐⭐

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐⭐ |
| **Durée cible** | 9 min |
| **Modalité** | squad, Contre-Test obligatoire à la fin |
| **Matériel** | `backend/SkyRetail.Domain/Pricing/VatCalculator.cs` (contient BUG-102), `prompts/`, `boss-j2/` |
| **QA Credits** | 80 |

**Énoncé**
Le comité de J4 vous demandera : *« si je relance votre génération demain, j'obtiens la même chose ? »*. Répondez avec des chiffres.
Écrivez **deux prompts différents mais tous deux corrects** — par exemple `A` orienté « cas nominaux + limites » et `B` orienté « partitions d'équivalence + valeurs aux frontières » — visant le **même** code (`VatCalculator`). Exécutez **chacun 3 fois**, sans rien changer entre les exécutions. Vous obtenez 6 suites. Produisez `boss-j2/variabilite.md` établissant : le nombre de cas de test **communs aux 3 exécutions d'un même prompt**, le nombre de cas **communs aux 6**, et le verdict sur BUG-102 exécution par exécution. Concluez sur ce qu'il est honnête d'écrire dans un dossier de recette.

**✅ Résultat attendu**
- [ ] 6 fichiers de tests distincts sous `boss-j2/runs/`, nommés `A1..A3`, `B1..B3`, tous **exécutés** (sortie du runner jointe).
- [ ] Un tableau d'intersection : pour chaque prompt, **|A1 ∩ A2 ∩ A3|** et le total distinct ; puis **|A ∩ B|** sur les cas fonctionnels (pas sur les noms de méthode).
- [ ] La stabilité intra-prompt est **strictement inférieure à 100 %** — si elle vaut 100 %, l'exercice n'est pas terminé : augmenter la complexité de la cible ou le nombre d'exécutions.
- [ ] Le verdict BUG-102 est consigné pour les 6 exécutions, sous la forme `détecté / non détecté`, avec le nom du test concerné.
- [ ] Une section « ce que nous écrirons au comité » contenant **une formulation probabiliste** (par exemple : « le prompt A révèle BUG-102 dans 1 exécution sur 3 ») et **aucune** promesse de reproductibilité.
- [ ] Une phrase expliquant pourquoi `temperature = 0` **ne** résoudrait **pas** le problème, avec la mention que ce paramètre est déprécié sur les modèles récents.
- **Invalide** : moins de 6 exécutions ; comparaison faite sur les noms de tests plutôt que sur les cas fonctionnels couverts ; conclusion affirmant qu'un réglage supprime la variabilité ; suites non exécutées.

**💡 Indice** *(après 4 min)*
Comparez des **cas fonctionnels**, pas des identifiants : « 7 lignes à 19,99 € », « ligne à 0 € », « quantité négative ». Deux tests aux noms différents peuvent couvrir le même cas ; deux tests au même nom peuvent couvrir des cas différents. Construisez la table des cas avant de compter.

**🔑 Solution de référence**

Résultat typiquement observé en salle sur `VatCalculator` :

| Mesure | Valeur constatée |
|---|---|
| Cas distincts produits par A sur 3 exécutions | 11 |
| Cas présents dans **les 3** exécutions de A | 6 (≈ 55 %) |
| Cas distincts produits par B sur 3 exécutions | 13 |
| Cas présents dans **les 3** exécutions de B | 7 (≈ 54 %) |
| Cas présents dans les **6** exécutions | 4 |
| Exécutions détectant BUG-102 | **1 à 2 sur 6**, jamais 6 |

Trois enseignements à formuler explicitement :

1. **La variabilité est utile autant que gênante.** Les cas qui n'apparaissent qu'une fois sur trois sont souvent les plus intéressants — c'est le mécanisme du self-consistency retourné : le vote majoritaire élimine le bruit **et** les trouvailles rares [S-06]. En QA, on garde donc **l'union relue**, pas l'intersection.
2. **Le seul filtre fiable est l'exécution.** Aucune lecture ne dit quelle suite est la bonne. `dotnet test` et le score de mutation tranchent ; le prompt ne tranche pas.
3. **La bonne formulation pour le comité est probabiliste.** « Notre prompt révèle l'écart d'arrondi dans 2 exécutions sur 6 » est une phrase défendable. « Notre prompt trouve les bugs d'arrondi » ne l'est pas.

Sur `temperature` : la réponse attendue comporte deux niveaux. Niveau 1 — une température nulle réduit la variance d'échantillonnage, elle ne rend pas le système déterministe (batching serveur, version de modèle, arithmétique). Niveau 2 — le paramètre est **déprécié sur les modèles Opus 4.7 et suivants et renvoie une erreur 400** [S-63] : bâtir une garantie de recette sur lui, c'est construire une régression programmée.

**🎓 Ce que l'exercice enseigne vraiment**
Que la génération de tests par IA est un **processus stochastique**, et qu'un dossier de recette professionnel doit l'assumer en langage de probabilité, pas de garantie. C'est la limite structurelle que le module devait faire toucher du doigt : elle ne se corrige pas par un meilleur prompt, elle se **gouverne** par des évals, une baseline conservée et une revue humaine. C'est la porte d'entrée de M10 (dérive et évaluation) et la réponse à la deuxième question piège du comité de J4.

**Contre-Test (5 min).** Le squad adverse choisit **une** des 6 suites livrées et tente de démontrer qu'elle contient au moins un cas **absent de toutes les autres** et pourtant pertinent. S'il y parvient : **+20 QAC** à l'attaquant, **−10** au défenseur, et l'enseignement est excellent — l'intersection était la mauvaise opération.

**Exercice bonus ⭐⭐⭐⭐⭐** — Écrire le `promptfooconfig.yaml` qui automatise M4-4 : 2 prompts × 3 répétitions, assertion `llm-rubric` sur la traçabilité vers le cahier des charges, assertion `cost` avec seuil, et sortie CSV du taux de détection de BUG-102. Le brancher en `npm run eval:prompts`.

---

## 4. Débriefing

### 4.1 Les cinq erreurs les plus fréquentes sur ce module

| # | Erreur | Correction |
|---|---|---|
| 1 | **Confondre prompt long et prompt structuré.** Le squad ajoute des paragraphes de consignes | La structure (5 blocs, documents en tête) bat le volume. Au-delà de 20 k tokens, la position de la requête vaut jusqu'à **30 %** de qualité [S-02] ; la longueur, elle, dégrade [S-27][S-28][S-29] |
| 2 | **Mettre les règles critiques dans un fichier scopé.** « C'est plus propre par dossier » | Les `CLAUDE.md` imbriqués et les rules avec `paths:` sont **perdus à la compaction** [S-21]. Les règles d'intégrité vont dans le fichier racine |
| 3 | **Chercher `.claudeignore`.** Le réflexe vient de `.gitignore` | Le fichier n'existe pas. `permissions.deny` dans `.claude/settings.json` ; `ignorePatterns` est explicitement déprécié [S-47] |
| 4 | **Promettre la reproductibilité.** « On mettra `temperature=0` » | La température ne garantit pas le déterminisme, et le paramètre renvoie **400** sur les modèles récents [S-63]. On promet une **tolérance mesurée**, pas une égalité |
| 5 | **Ne pas mesurer le coût.** L'IA est perçue comme gratuite | `count_tokens` est gratuit [S-35], `--output-format json` renvoie `total_cost_usd`. Repère : **13 $ / développeur / jour actif** [S-24], et **+30 % de tokens** pour le même texte avec les tokenizers 4.7+ [S-35] |

### 4.2 Questions de contrôle

1. **Dans un prompt de 25 000 tokens, où placez-vous le cahier des charges et où placez-vous la consigne ? Quel gain est documenté ?**
   → Documents en **haut**, requête **en bas**. Jusqu'à **+30 %** de qualité de réponse [S-02]. Structure XML `<documents>` / `<document index>` / `<source>` + `<document_content>`.

2. **Quelles parties du contexte survivent à une compaction dans Claude Code, et lesquelles disparaissent ?**
   → Survivent, car relus depuis le disque : `CLAUDE.md` racine, rules non scopées, auto memory. Disparaissent : rules avec frontmatter `paths:` et `CLAUDE.md` imbriqués [S-21]. D'où la règle : les interdictions non négociables vont à la racine.

3. **Comment fait-on baisser de 90 % le coût d'entrée d'une campagne de génération de tests ?**
   → Prompt caching : le contexte stable (cahier des charges, contrat OpenAPI, conventions) en préfixe caché. Lecture de cache = **0,1×** le prix d'entrée ; écriture 1,25× (TTL 5 min) ou 2× (1 h) ; 4 breakpoints maximum [S-37]. Cumulable avec le batch à **−50 %** [S-38].

4. **Pourquoi `temperature = 0` n'est-il pas une réponse acceptable à la question « votre génération est-elle reproductible ? »**
   → Parce qu'une température nulle réduit la variance d'échantillonnage sans rendre le système déterministe, et parce que `temperature`, `top_p` et `top_k` sont **dépréciés sur Opus 4.7+ et renvoient une erreur 400** [S-63]. La reproductibilité s'obtient par un dispositif : version de modèle épinglée, prompt versionné, jeu d'évals, tolérance publiée.

5. **Qu'est-ce qui distingue un prompt d'une skill, et quel est le coût de contexte de chacune ?**
   → Une skill est un dossier `SKILL.md` avec frontmatter (`allowed-tools`, `paths`, `context: fork`), invocable, versionné, dont **seules les métadonnées (~100 tokens) sont chargées** tant qu'elle n'est pas activée ; le corps est plafonné à **5 000 tokens** [S-53][S-54]. Un prompt collé dans le chat coûte son poids intégral à chaque usage et ne laisse aucune trace.

### 4.3 Ce qu'on retient

- **La structure d'un prompt de QA tient en cinq blocs**, et le bloc décisif est celui qui fournit la **source de vérité indépendante du code** — le reste est du confort.
- **Le contexte se conçoit, il ne s'accumule pas** : *« le plus petit ensemble possible de tokens à fort signal »* [S-18]. La dégradation en contexte long est mesurée par trois travaux indépendants [S-27][S-28][S-29].
- **Le `CLAUDE.md` racine est le seul contexte qui survit à la compaction** [S-21] : il accueille les interdictions, pas la documentation.
- **Le coût est une donnée de conception** : caching **−90 %**, batch **−50 %**, Haiku **5× moins cher** qu'Opus en entrée [S-37][S-38][S-39].
- **La variabilité n'est pas éliminable.** Un dossier de recette honnête l'exprime en probabilité et l'encadre par des évals versionnées — jamais par un paramètre.

### 4.4 Transition vers M05

> Vous avez maintenant un contexte propre, des prompts versionnés et une mesure du coût. Mais tout se passe encore dans une fenêtre de chat, et le modèle continue d'écrire des sélecteurs qu'il n'a jamais vus. M05 branche l'outillage : Claude Code au-delà du chat, MCP pour donner à l'agent des **yeux sur l'application réelle**, et un panorama honnête de ce que font les concurrents — parce que le comité de J4 demandera pourquoi vous avez choisi cet outil-là.

---

## 5. Sources

### Sources de la notion N1 — Anatomie d'un prompt de QA

[S-01] **Prompt engineering overview — Claude Platform Docs** — https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview — *doc officielle éditeur, 2026* — pose les **3 prérequis** avant tout prompt engineering (critères de succès, moyen de test empirique, premier jet) et rappelle qu'un changement de modèle améliore parfois latence et coût plus facilement qu'un meilleur prompt.

[S-02] **Prompting best practices — Claude Platform Docs** *(page pivot, remplace 9 anciennes pages)* — https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices — *doc officielle éditeur, 2026* — *« Include 3–5 examples for best results »* ; documents **en haut** au-delà de 20 k tokens, requête à la fin *« can improve response quality by up to 30 percent in tests »* ; **le prefill renvoie une erreur 400 à partir de Claude 4.6** ; contient deux prompts systèmes écrits pour la QA.

[S-03] **Prompt engineering best practices for 2026 (blog Anthropic)** — https://claude.com/blog/best-practices-for-prompt-engineering — *blog éditeur, 2026* — contredit l'intuition « plus d'exemples = mieux » : *« Start with one example (one-shot). Only add more examples (few-shot) if the output still doesn't match your needs »* ; recommande d'autoriser explicitement l'incertitude.

[S-04] **Chain-of-Thought Prompting Elicits Reasoning in Large Language Models** — https://arxiv.org/abs/2201.11903 — *papier arXiv (Google Research, NeurIPS 2022), 2022* — un modèle de **540 Md de paramètres avec 8 exemplaires CoT** atteint l'état de l'art sur GSM8K, *« surpassing even finetuned GPT-3 with a verifier »*.

[S-05] **Large Language Models are Zero-Shot Reasoners** — https://arxiv.org/abs/2205.11916 — *papier arXiv (NeurIPS 2022), 2022* — la seule phrase *« Let's think step by step »* fait passer text-davinci-002 de **17,7 % à 78,7 %** sur MultiArith et de **10,4 % à 40,7 %** sur GSM8K, sans aucun exemple.

[S-06] **Self-Consistency Improves Chain of Thought Reasoning in Language Models** — https://arxiv.org/abs/2203.11171 — *papier arXiv (ICLR 2023), 2022* — échantillonnage de plusieurs chemins puis vote majoritaire : **GSM8K +17,9 %, SVAMP +11,0 %, AQuA +12,2 %, StrategyQA +6,4 %** ; fondement du filtre « ne garder que les cas présents dans les 3 générations ».

[S-07] **ReAct: Synergizing Reasoning and Acting in Language Models** — https://arxiv.org/abs/2210.03629 — *papier arXiv (ICLR 2023), 2022* — **+34 points** de succès absolu sur ALFWorld et **+10 points** sur WebShop avec 1 à 2 exemples in-context ; formalise la boucle raisonner → agir → observer, patron du prompt chaining outillé.

[S-08] **Thinking (adaptive thinking, effort) — Claude Platform Docs** — https://platform.claude.com/docs/en/build-with-claude/thinking — *doc officielle éditeur, 2026* — *« les tokens de raisonnement sont facturés comme tokens de sortie… et comptent dans `max_tokens` »* ; l'adaptive thinking est jugé *« reliably better »* que le budget manuel ; `budget_tokens` renvoie **400 sur Claude 4.7+**.

[S-09] **No More Manual Tests? Evaluating and Improving ChatGPT for Unit Test Generation (ChatTESTER)** — https://arxiv.org/abs/2305.04207 — *papier arXiv, v3 2024* — l'ajout d'un raffineur itératif produit **+34,3 % de tests compilables et +18,7 % de tests avec assertions correctes** ; chiffre l'écart entre « le LLM a écrit un test » et « le test compile et assert juste ».

[S-10] **Hallucination to Consensus: Multi-Agent LLMs for End-to-End JUnit Test Generation (CANDOR)** — https://arxiv.org/abs/2506.02943 — *papier arXiv, v7 mars 2026* — approche **purement prompt engineering, sans fine-tuning** : égale EvoSuite en couverture, le dépasse en score de mutation, devance TOGLL d'au moins **21,1 points** en justesse des oracles grâce à un consensus multi-modèles.

[S-11] **Prompt engineering for GitHub Copilot Chat** — https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering — *doc officielle éditeur, 2026* — *« Unit tests can also serve as examples… you can ask Copilot to write a function described by those unit tests »* : le test devient l'exemple few-shot qui spécifie l'implémentation.

[S-12] **GPT-5 prompting guide (OpenAI Cookbook)** — https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide — *guide officiel éditeur, 2025, série maintenue* — balises de contrôle `<persistence>`, `<tool_preambles>`, `<self_reflection>`, `<code_editing_rules>` ; technique de **rubrique auto-construite en 5 à 7 catégories**, directement transposable en grille de revue de tests.

[S-13] **Prompt design strategies | Gemini API** — https://ai.google.dev/gemini-api/docs/prompting-strategies — *doc officielle éditeur, 2026* — arbitrage explicite : **trop peu d'exemples ne changent pas le comportement, trop d'exemples font surajuster** ; les exemples doivent toujours être accompagnés d'instructions ; formatage de type XML recommandé.

[S-14] **Prompt Engineering (livre blanc Google, Lee Boonstra)** — https://www.kaggle.com/whitepaper-prompt-engineering — *livre blanc, v4, février 2025, ~68 pages* — configuration de départ chiffrée **température 0,2 / top-P 0,95 / top-K 30** ; 12 techniques nommées dont le *step-back prompting*, applicable pour faire lister les règles métier d'un endpoint avant d'écrire les tests.

[S-15] **Prompt engineering | OpenAI API** — https://developers.openai.com/api/docs/guides/prompt-engineering — *doc officielle éditeur, 2026* — section « Coding » : définir le rôle de l'agent, imposer un usage structuré des outils, exiger des tests approfondis ; avertissement décisif : *« validate patches carefully since tools like `apply_patch` may return "Done" even on failure »*.

[S-16] **Anthropic's Prompt Engineering Interactive Tutorial** — https://github.com/anthropics/prompt-eng-interactive-tutorial — *notebooks officiels, ≈37,1k ★, actif* — **9 chapitres avec exercices** plus une annexe « Beyond Standard Prompting » ; le chapitre 9 contient un exercice *Coding* dédié, rejouable sur du code Angular/.NET.

[S-17] **Software Testing with Large Language Models: Survey, Landscape, and Vision** — https://arxiv.org/abs/2307.07221 — *papier arXiv → IEEE TSE, v3 mars 2024* — analyse systématique de **102 études** ; établit que la préparation des cas de test et la réparation de programme sont les deux tâches les plus représentées, cadrage du périmètre du module.

---

### Sources de la notion N2 — Context engineering

[S-18] **Effective context engineering for AI agents (Anthropic Engineering)** — https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents — *blog d'ingénierie éditeur, 29 septembre 2025* — définit le context engineering comme la recherche du *« plus petit ensemble possible de tokens à fort signal »* ; explique le *context rot* par les relations token-à-token en n² ; un sous-agent consomme des dizaines de milliers de tokens et ne renvoie que **1 000 à 2 000 tokens** de résumé.

[S-19] **How Claude remembers your project (CLAUDE.md et auto memory)** — https://code.claude.com/docs/en/memory — *doc officielle éditeur, MAJ 22 juillet 2026* — cible **sous 200 lignes par `CLAUDE.md`** ; auto memory chargeant **200 lignes ou 25 Ko de `MEMORY.md`** ; imports `@path` récursifs, **profondeur max 4 sauts** ; 4 emplacements hiérarchisés ; phrase exacte *« Claude Code reads `CLAUDE.md`, not `AGENTS.md` »*.

[S-20] **Context windows — Claude Platform Docs** — https://platform.claude.com/docs/en/build-with-claude/context-windows — *doc officielle éditeur, consultée 28 juillet 2026* — **1 M tokens par défaut** sur Opus 5 / Opus 4.6-4.8 / Sonnet 5 / Sonnet 4.6, **200 k** sur Sonnet 4.5 et antérieurs ; max **128 k tokens de sortie** ; injection d'un `<system_warning>Token usage: …</system_warning>` après chaque appel d'outil.

[S-21] **Explore the context window — Claude Code Docs** — https://code.claude.com/docs/en/context-window — *doc officielle éditeur + simulateur interactif, 2026* — tableau « What survives compaction » : `CLAUDE.md` racine, rules non scopées et auto memory **relus depuis le disque** ; rules avec `paths:` et `CLAUDE.md` imbriqués **perdus** ; corps de skills plafonnés à **5 000 tokens par skill et 25 000 au total**.

[S-22] **Compaction (server-side) — Claude Platform Docs** — https://platform.claude.com/docs/en/build-with-claude/compaction — *doc officielle éditeur, bêta `compact-2026-01-12`* — `trigger` par défaut à **150 000 tokens d'entrée** (minimum 50 000), plus `pause_after_compaction` et `instructions` ; coûte une itération de sampling, visible dans `usage.iterations`.

[S-23] **Context editing — Claude Platform Docs** — https://platform.claude.com/docs/en/build-with-claude/context-editing — *doc officielle éditeur, bêta `context-management-2025-06-27`* — stratégie `clear_tool_uses_20250919` : `trigger` **100 000 tokens**, `keep` = **3 tool uses** ; seconde stratégie `clear_thinking_20251015` ; mécanisme pour purger les sorties de test volumineuses.

[S-24] **Manage costs effectively — Claude Code Docs** — https://code.claude.com/docs/en/costs — *doc officielle éditeur, 2026* — *« the average cost is around **$13 per developer per active day** and **$150-250 per developer per month**, with costs remaining **below $30 per active day for 90 % of users** »* ; `CLAUDE.md` sous 200 lignes ; les agent teams consomment **~7× plus de tokens**.

[S-25] **Managing context on the Claude Developer Platform** — https://claude.com/blog/context-management — *blog éditeur, 29 septembre 2025* — memory tool + context editing = **+39 %** sur l'éval de recherche agentique, context editing seul **+29 %** ; sur une éval à **100 tours**, réduction de la consommation de tokens de **84 %** avec des workflows qui aboutissent au lieu d'échouer.

[S-26] **Configure your model — Sonnet 5 context window (Claude Code Docs)** — https://code.claude.com/docs/en/model-config#sonnet-5-context-window — *doc officielle éditeur, 2026* — **seule valeur numérique officielle du seuil d'auto-compaction** : *« Sessions auto-compact before the window fills, at about 967K tokens by default »* sur une fenêtre de 1 M, soit ≈ **96,7 %**.

[S-27] **Lost in the Middle: How Language Models Use Long Contexts** — https://arxiv.org/abs/2307.03172 — *papier arXiv → TACL vol. 12, 2024* — **courbe de performance en U** (primauté + récence) ; la performance multi-document de GPT-3.5-Turbo *« can drop by more than 20 % »* et tombe, à 20-30 documents, **sous la performance closed-book (56,1 %)** contre 88,3 % en oracle.

[S-28] **NoLiMa: Long-Context Evaluation Beyond Literal Matching** — https://arxiv.org/abs/2502.05167 — *papier arXiv (ICML 2025, Adobe Research + LMU Munich), 2025* — sur 13 LLM annonçant ≥ 128 k de contexte, *« at 32K, 11 models drop below 50 % »* de leur performance courte ; GPT-4o passe de **99,3 % à 69,7 %**.

[S-29] **Context Rot: How Increasing Input Tokens Impacts LLM Performance (Chroma)** — https://www.trychroma.com/research/context-rot — *étude de laboratoire, 14 juillet 2025* — **18 LLM**, 8 longueurs × 11 positions, **194 480 appels LLM** ; sur LongMemEval, 306 prompts à ~113 k tokens contre ~300 tokens focalisés : performance systématiquement inférieure en version longue.

[S-30] **Best practices for Claude Code** — https://code.claude.com/docs/en/best-practices — *doc officielle éditeur (ex-article d'ingénierie, redirection 301), MAJ 17 juillet 2026* — phrase d'ouverture : *« Most best practices are based on one constraint: Claude's context window fills up fast, and performance degrades as it fills »* ; **règle des 2 corrections** : *« If you've corrected Claude more than twice on the same issue in one session… Run `/clear` and start fresh »*.

[S-31] **Environment variables — Claude Code Docs** — https://code.claude.com/docs/en/env-vars — *doc officielle éditeur, 2026* — `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` accepte 1-100 et *« can only lower the threshold »* ; `CLAUDE_CODE_AUTO_COMPACT_WINDOW` par défaut à la fenêtre du modèle (**200 k** ou **1 M**) ; **aucun pourcentage par défaut n'est documenté**.

[S-32] **Context Engineering for Agents (LangChain)** — https://www.langchain.com/blog/context-engineering-for-agents — *blog éditeur tiers, 2 juillet 2025* — taxonomie en **4 stratégies : write / select / compress / isolate** ; ⚠️ c'est **via cette source tierce**, et non via l'éditeur, que circule le chiffre d'auto-compaction « au-delà de 95 % de la fenêtre ».

[S-33] **Context Engineering — What it is, and techniques to consider (LlamaIndex)** — https://www.llamaindex.ai/blog/context-engineering-what-it-is-and-techniques-to-consider — *blog éditeur tiers, 3 juillet 2025* — énumère **9 constituants du contexte** (system prompt, entrée utilisateur, mémoires court/long terme, retrieval, définitions et réponses d'outils, sorties structurées, état global) : checklist d'audit « qu'y a-t-il vraiment dans mon contexte ? ».

[S-34] **AGENTS.md — a README for agents** — https://agents.md/ — *spécification ouverte (Agentic AI Foundation / Linux Foundation), 2026* — **plus de 60 000 projets** open source ; section canonique « Testing instructions » ; règle de conflit *« The closest AGENTS.md to the edited file wins »* ; le dépôt principal d'OpenAI contient **88 fichiers AGENTS.md**.

[S-35] **Token counting — Claude Platform Docs** — https://platform.claude.com/docs/en/build-with-claude/token-counting — *doc officielle éditeur, 2026* — endpoint **`POST /v1/messages/count_tokens` gratuit** retournant `{"input_tokens": N}` ; rate limits 2 000 à 8 000 RPM selon le palier ; ⚠️ **les modèles 4.7+ utilisent un nouveau tokenizer produisant ~30 % de tokens en plus** pour le même texte.

[S-36] **How we built our multi-agent research system (Anthropic Engineering)** — https://www.anthropic.com/engineering/multi-agent-research-system — *blog d'ingénierie éditeur, 13 juin 2025* — *« agents typically use about **4× more tokens** than chat interactions, and **multi-agent systems use about 15× more tokens** »* ; sur BrowseComp, l'usage de tokens explique **80 % de la variance**.

[S-37] **Prompt caching — Claude Platform Docs** — https://platform.claude.com/docs/en/build-with-claude/prompt-caching — *doc officielle éditeur, 2026* — multiplicateurs exacts : écriture **5 min = 1,25×**, **1 h = 2×**, **lecture = 0,1× soit −90 %** ; minimum cacheable **512 à 4 096 tokens** selon le modèle ; **4 breakpoints** max, lookback 20 blocs.

[S-38] **Batch processing — Claude Platform Docs** — https://platform.claude.com/docs/en/build-with-claude/batch-processing — *doc officielle éditeur, 2026* — **−50 %** sur input et output, batch plafonné à **100 000 requêtes ou 256 Mo**, expiration 24 h ; remises batch et prompt caching **se cumulent**, taux de hit cache observés **30 % à 98 %**.

[S-39] **Models overview — Claude Platform Docs** — https://platform.claude.com/docs/en/about-claude/models/overview — *doc officielle éditeur, 07/2026* — tarifs par million de tokens : **Opus 5 à 5 $ / 25 $**, **Sonnet 5 à 3 $ / 15 $** (intro 2 $ / 10 $ jusqu'au 31/08/2026), **Haiku 4.5 à 1 $ / 5 $** avec fenêtre de **200 k** ; Haiku est **5× moins cher qu'Opus en entrée**.

[S-40] **Choosing the right model — Claude Platform Docs** — https://platform.claude.com/docs/en/about-claude/models/choosing-a-model — *doc officielle éditeur, 2026* — deux stratégies d'entrée (*efficiency-first* / *capability-first*) et un 4ᵉ critère au-delà de capacité, vitesse et coût : *« Tuning effort is often a better lever than switching models »* (`xhigh` recommandé pour l'agentique).

[S-41] **Pricing — Claude Platform Docs** — https://platform.claude.com/docs/en/about-claude/pricing — *doc officielle éditeur, 2026* — **Batch API −50 %** sur input et output ; **long contexte sans surcoût** : *« A 900k-token request is billed at the same per-token rate as a 9k-token request »* ; `inference_geo:"us"` = ×1,1.

[S-42] **Introducing Contextual Retrieval (Anthropic Engineering)** — https://www.anthropic.com/engineering/contextual-retrieval — *blog d'ingénierie éditeur, 19 septembre 2024* — réduction du taux d'échec de récupération de **5,7 % à 1,9 % (−67 %)** avec embeddings contextuels + BM25 + reranking ; repère décisif : **en dessous de 200 000 tokens (~500 pages), tout mettre dans le prompt**.

[S-43] **Why Cline Doesn't Index Your Codebase (And Why That's a Good Thing)** — https://cline.bot/blog/why-cline-doesnt-index-your-codebase-and-why-thats-a-good-thing — *blog éditeur tiers, 27 mai 2025* — 3 modes d'échec du RAG sur code : le chunking *« literally tear[s] apart its logic »*, *« Indexes Decay While Code Evolves »*, doublement de la surface d'attaque IP ; conclusion *« No RAG. No embeddings. No vector databases »*.

[S-44] **Common workflows — Claude Code Docs** — https://code.claude.com/docs/en/common-workflows — *doc officielle éditeur, 2026* — section « Delegate research to subagents » : *« Exploring a large codebase fills your context with file reads. Delegate the exploration so only the findings come back »*.

[S-45] **Writing effective tools for AI agents—using AI agents (Anthropic Engineering)** — https://www.anthropic.com/engineering/writing-tools-for-agents — *blog d'ingénierie éditeur, 11 septembre 2025* — *« For Claude Code, we restrict tool responses to **25 000 tokens** by default »* ; un même résultat d'outil coûte **206 tokens en format détaillé contre 72 en format concis** (~⅓).

[S-46] **Commands (`/clear`, `/compact`, `/context`) — Claude Code Docs** — https://code.claude.com/docs/en/commands — *référence officielle éditeur, MAJ 24 juillet 2026* — `/clear [name]` *« Start a new conversation with empty context »* ; `/compact [instructions]` avec instructions de focalisation optionnelles ; `/context [all]` *« Visualize current context usage as a colored grid »* avec suggestions d'optimisation et alertes de capacité.

[S-47] **Claude Code settings — Exclude sensitive files** — https://code.claude.com/docs/en/settings#exclude-sensitive-files — *doc officielle éditeur, 2026* — ⚠️ **il n'existe pas de `.claudeignore`** ; le mécanisme officiel est `permissions.deny` dans `.claude/settings.json` (ex. `"Read(./.env)"`, `"Read(./secrets/**)"`) ; texte exact : *« This replaces the deprecated `ignorePatterns` configuration »*.

---

### Sources de la notion N3 — Industrialiser ses prompts

[S-48] **Using the Evaluation Tool — Claude Platform Docs** — https://platform.claude.com/docs/en/test-and-evaluate/eval-tool — *doc officielle éditeur, 2026* — **prérequis : le prompt doit contenir au moins 1 à 2 variables `{{variable}}`** pour créer un jeu d'évals ; 3 modes de création ; **notation qualité sur une échelle à 5 points** ; versionnage de prompt avec re-run complet de la suite.

[S-49] **Define success criteria and build evaluations — Claude Platform Docs** — https://platform.claude.com/docs/en/test-and-evaluate/develop-tests — *doc officielle éditeur, 2026* — *« Prioritize volume over quality »* ; modèle de critère mesurable (**F1 ≥ 0,85 sur 10 000 posts, +5 % sur la baseline**) ; LLM-as-judge : *« best practice to use a different model to evaluate than the model used to generate »*, grille ordinale 1–5 ; catalogue de cas limites injectable.

[S-50] **Demystifying evals for AI agents (Anthropic Engineering)** — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents — *blog d'ingénierie éditeur, 9 janvier 2026* — distingue l'évaluation de la **transcript** et de l'**outcome / final state** ; taxonomie des *model-based graders* (rubric-based, natural language assertions, pairwise, reference-based, multi-judge consensus) ; recommande **tests unitaires pour la correction + rubrique LLM pour la qualité de code**.

[S-51] **promptfoo (dépôt GitHub + documentation des assertions)** — https://github.com/promptfoo/promptfoo — *outil open source MIT, release 0.121.11 du 8 mai 2026, ≈21,3k ★* — toute la configuration dans un unique `promptfooconfig.yaml` ; **une quarantaine de types d'assertions** déterministes (`equals`, `contains`, `regex`, `is-json`, `levenshtein`, `latency`, `cost`) et *model-graded* (`llm-rubric`, `factuality`, `similar`), avec `threshold`, `weight`, `metric`.

[S-52] **DeepEval — The LLM Evaluation Framework** — https://github.com/confident-ai/deepeval — *outil open source Apache 2.0, v4.0.2 du 13 mai 2026, ≈15,4k ★* — se décrit comme *« similar to Pytest but specialized for unit testing LLM apps »* : `assert_test(test_case, [metric])` puis `deepeval test run` ; ~40 métriques scorées 0–1 avec `threshold` (0.5 par défaut) décidant du pass/fail.

[S-53] **Extend Claude with skills — Claude Code Docs** — https://code.claude.com/docs/en/skills — *doc officielle éditeur, MAJ 24 juillet 2026* — une skill = dossier avec `SKILL.md` dans `.claude/skills/<nom>/` ; **`description` + `when_to_use` tronqués à 1 536 caractères** dans le listing ; frontmatter `allowed-tools`, `disallowed-tools`, `disable-model-invocation`, `paths`, `context: fork` ; les `.claude/commands/*.md` sont **fusionnés dans les skills**.

[S-54] **Agent Skills — Specification (standard ouvert)** — https://agentskills.io/specification — *spécification ouverte, 2026* — `name` **max 64 caractères**, `description` **max 1024** ; divulgation progressive en 3 étages : métadonnées **~100 tokens** au démarrage, corps du `SKILL.md` **< 5 000 tokens** à l'activation, ressources à la demande ; garder le `SKILL.md` **sous 500 lignes** ; validation par `skills-ref validate`.

[S-55] **Your first prompt file (GitHub Copilot)** — https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files/your-first-prompt-file — *doc officielle éditeur, public preview, 2026* — fichier **`<nom>.prompt.md` dans `.github/prompts`**, frontmatter YAML avec clé `description:`, invocable en slash command ; VS Code / Visual Studio / JetBrains uniquement.

[S-56] **Adding repository custom instructions (GitHub Copilot)** — https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions — *doc officielle éditeur, 2026* — chemin exact **`.github/copilot-instructions.md`** ; quand les instructions sont utilisées, le fichier apparaît dans la liste **References** de la réponse : preuve traçable que la convention de test a bien été injectée.

[S-57] **Using custom instructions to unlock the power of Copilot code review** — https://docs.github.com/en/copilot/tutorials/customize-code-review — *doc officielle éditeur, 2026* — trois types de fichiers : `copilot-instructions.md` (dépôt entier), **`*.instructions.md`** (chemins spécifiques), `AGENTS.md` ; recommande les instructions par chemin pour ne pas appliquer des règles d'un langage aux mauvais fichiers.

[S-58] **Rules | Cursor Docs** — https://cursor.com/docs/rules — *doc officielle éditeur, 2026* — quatre types de règles ; ⚠️ **un fichier `.md` posé dans `.cursor/rules` est ignoré** (l'extension attendue est `.mdc`) ; frontmatter `description` / `globs` / `alwaysApply` ; garder les règles **sous 500 lignes** ; précédence **Team → Project → User**.

[S-59] **Memories & Rules | Windsurf Docs** — https://docs.windsurf.com/windsurf/cascade/memories — *doc officielle éditeur, 2026* — règles workspace `.windsurf/rules/*.md` limitées à **12 000 caractères par fichier**, `global_rules.md` à **6 000** ; 4 modes d'activation ; **l'exemple officiel de la documentation est une règle de test** (`globs: **/*.test.ts`).

[S-60] **AGENTS.md — a README for agents** — https://agents.md/ — *spécification ouverte (Agentic AI Foundation / Linux Foundation), 2026* — **60 000+ projets** ; section « Testing instructions » avec *« Add or update tests for the code you change, even if nobody asked »* ; l'agent **exécute** les commandes de test listées ; format portable sur Copilot, Codex, Cursor, Junie, Gemini CLI, Windsurf, Zed, Aider.

[S-61] **Console prompting tools (generator, templates, improver) — Claude Platform Docs** — https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-tools — *doc officielle éditeur, 2026* — le prompt improver opère en **4 étapes** (identification des exemples → brouillon XML → raffinement chain-of-thought → enrichissement) ; variables en **`{{double accolades}}`** ; avertissement : produit des réponses *« longer, more thorough, but slower »*.

[S-62] **Prompt Engineering (livre blanc Google, Lee Boonstra)** — https://www.kaggle.com/whitepaper-prompt-engineering — *livre blanc, v4, février 2025* — recommande de prompter **via l'API plutôt que le chatbot** pour accéder à la configuration, et **température 0 pour les tâches déterministes** : c'est la recommandation d'origine du folklore, qui porte sur la variance et non sur une garantie de reproductibilité.

[S-63] **Model deprecations — Claude Platform Docs** — https://platform.claude.com/docs/en/about-claude/model-deprecations — *doc officielle éditeur, dernière entrée 5 juin 2026* — ⚠️ **`temperature`, `top_p` et `top_k` sont dépréciés sur Opus 4.7+ et renvoient une erreur 400** ; `claude-opus-4-1-20250805` déprécié le 5 juin 2026, retiré le 5 août 2026 ; engagement de **60 jours de préavis** minimum.

[S-64] **Thinking (adaptive thinking, effort) — Claude Platform Docs** — https://platform.claude.com/docs/en/build-with-claude/thinking — *doc officielle éditeur, 2026* — le raisonnement est facturé en tokens de sortie et compte dans `max_tokens` ; l'*adaptive thinking* est jugé *« reliably better »* que le budget manuel : argument pour ne pas figer un budget de raisonnement dans un prompt versionné.

[S-65] **Best practices for Claude Code** — https://code.claude.com/docs/en/best-practices — *doc officielle éditeur, MAJ 17 juillet 2026* — première section *« Give Claude a way to verify its work »* et notion de *« trust-then-verify gap »* : *« Always provide verification (tests, scripts, screenshots). If you can't verify it, don't ship it »* — critère d'acceptation d'un prompt industrialisé.
