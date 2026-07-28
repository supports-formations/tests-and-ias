# Module M02 — Générer des cas de test à partir des spécifications

> **Jour 1** · **Durée : 1 h 30** · **QA Credits en jeu : 150**
> *Fil rouge : M1 a établi que l'oracle ne doit pas être le code. Or SkyRetail possède exactement une source de vérité indépendante du code — six pages écrites par le métier, jamais relues par la tech. On les ouvre.*

---

## 0. Carte du module

### 0.1 Objectifs pédagogiques

À l'issue de ce module, le·a participant·e sera capable de :

- **Extraire** d'un cahier des charges en langage naturel une liste d'exigences numérotées, chacune qualifiée testable ou non testable avec justification ;
- **Détecter** les ambiguïtés, silences et contradictions d'une spécification, et **formuler** la question à poser au métier plutôt que de les combler par supposition ;
- **Générer** puis **réviser** des scénarios BDD/Gherkin syntaxiquement valides et fonctionnellement corrects, en documentant le diff entre la sortie brute du LLM et la version revue ;
- **Imposer** au modèle l'application explicite des techniques ISTQB de conception de test — classes d'équivalence, valeurs limites, tables de décision — au lieu d'un échantillonnage arbitraire ;
- **Appliquer** une grille de revue en 8 points à une suite de cas de test générée, et **tracer** chaque cas jusqu'à son exigence source.

### 0.2 Prérequis du module

- M1 terminé : notion d'oracle acquise, anti-pattern tautologique constaté en direct.
- `docs/cdc-v4.0.md` distribué (6 pages) et `docs/openapi.yaml` accessible.
- Node.js pour la validation Gherkin (`npx @cucumber/gherkin-utils`), .NET pour Reqnroll.

### 0.3 Position dans le fil rouge

| Avant ce module | Après ce module |
|---|---|
| Le cahier des charges v4.0 est un PDF que personne n'a lu | Il est découpé en exigences numérotées EX-001…EX-0nn, dont les non-testables sont identifiées |
| Les squads ne connaissent pas de source de vérité indépendante du code | Ils en ont une, et savent qu'elle est trouée |
| Aucun scénario formalisé | Une première vague de Gherkin générée, revue, et versionnée |
| Les techniques de conception de test sont un souvenir de certification | Elles sont devenues des **instructions de prompt** |

### 0.4 Découpage horaire

| Séquence | Contenu | Durée |
|---|---|---|
| S0 | La Carte + distribution du cahier des charges v4.0 | 3 min |
| S1 | **N1** — Des exigences aux cas de test | 10 min |
| S2 | **N2** — Génération de scénarios BDD / Gherkin | 10 min |
| S3 | **N3** — Techniques de conception de test et revue humaine | 9 min |
| S4 | 🔍 Exemple A — requirements-to-tests sur le CDC §3.2 | 9 min |
| S5 | 🔍 Exemple B — Gherkin généré puis lié à Reqnroll | 8 min |
| S6 | 🔍 Exemple C — 23 endpoints OpenAPI → tests d'API (F3) | 8 min |
| S7 | 🧪 Exercices M2-1 à M2-4 | 23 min |
| S8 | Contre-Test sur M2-4 + débriefing + scoreboard | 10 min |
| **Total** | **Somme des séquences S0 → S8** | **90 min = 1 h 30** ✅ *conforme à la durée annoncée en en-tête* |

> ⏱️ **Régulation du temps.** Les exercices ⭐ et ⭐⭐ sont menés **en parallèle par les squads** (chaque squad n'en traite qu'un des deux, puis restitue en 2 min à l'autre). Les durées cibles indiquées par exercice supposent ce fonctionnement. L'exercice bonus ⭐⭐⭐⭐⭐ est **hors séance**.

### 0.5 Notions couvertes

| # | Notion |
|---|---|
| **N1** | Des exigences aux cas de test — requirements-to-tests, qualité des exigences, ambiguïtés, traçabilité |
| **N2** | Génération de scénarios BDD / Gherkin — pipeline en deux étapes, résultats industriels, liaison .NET |
| **N3** | Techniques de conception de test et revue humaine — classes d'équivalence, valeurs limites, tables de décision, grille de revue |

---

## 1. Partie théorique

### 1.1 Notion N1 — Des exigences aux cas de test

#### 1.1.1 De quoi parle-t-on

Le *requirements-to-tests* désigne la production d'artefacts de test à partir d'une expression de besoin en **langage naturel** — cahier des charges, user story, ticket, texte réglementaire — par opposition à la génération à partir du **code**, traitée en M1.

Le déplacement est décisif. Le socle ISTQB CTFL v4.0.1 [S-09] définit l'analyse et la conception de test comme la transformation d'une **base de test** en conditions puis en cas de test. La base de test est, par construction, un artefact **indépendant de l'implémentation** — ce que le glossaire exige de l'oracle : *« a source to determine expected results […] but should not be the code »* [S-10]. Générer à partir des exigences, c'est donc, structurellement, le seul mode de génération capable de **détecter** un défaut plutôt que de le figer.

Trois artefacts intermédiaires sont normés par **ISO/IEC/IEEE 29119-3** [S-11] : la spécification de conception des tests, la spécification des cas de test, et la matrice de traçabilité. Les gabarits existent ; l'IA générative ne les remplace pas, elle les remplit plus vite.

#### 1.1.2 Ce que dit l'état de l'art

**La qualité de sortie est proportionnelle à la qualité de l'entrée — et l'écart est énorme.** L'étude industrielle de référence mesure un **macro-recall de 0,81** sur les exigences Bluetooth contre **0,37** sur celles de Mozilla [S-01]. Même modèle, même prompt, même tâche : un facteur **2,2** d'écart, imputable à la seule qualité rédactionnelle de la base de test. Les exigences Bluetooth sont normatives, numérotées, avec un vocabulaire contraint ; celles de Mozilla sont des discussions de tickets.

Cette dépendance est confirmée sur le versant BDD : sur **500 user stories** analysées, des descriptions d'exigences détaillées produisent des scénarios de haute qualité, tandis que **des user stories seules produisent des scénarios de faible qualité** [S-12]. Conclusion opérationnelle brutale : *si votre spécification est mauvaise, l'IA ne la sauvera pas — elle en produira une version exécutable et donc plus difficile à contester.*

**Les résultats sont bons quand la base est structurée.** Le pipeline en deux étapes user story → Gherkin → Cypress d'une étude de cas industrielle obtient **95 %** de scénarios jugés utiles et **92 %** de tests utiles, dont **60 % utilisables tels quels** [S-02]. Sur du texte de loi, 120 spécifications Gherkin générées atteignent **95 %** de pertinence, **100 %** de clarté et **94,2 %** de complétude — *mais avec des omissions et des hallucinations persistantes* [S-14]. Un modèle GPT-3.5 fine-tuné produit **7 000 cas de test** sur 5 projets open source avec **78,5 %** de correction syntaxique et **61,7 %** de couverture [S-03].

**Le cas le plus favorable est la spécification machine.** APITestGenie combine exigences et **OpenAPI** : **89 % des exigences produisent un script valide en ≤ 3 tentatives** [S-04]. La spécification OpenAPI [S-07] est le format d'entrée canonique pour la génération de tests d'API par LLM : elle est structurée, typée, versionnée, et elle contient déjà les codes de statut attendus — c'est-à-dire **l'oracle**.

**La limite documentée.** Une étude comparative de LLM sur exigences en langage naturel formule le résultat le plus utile de la notion : les tests générés **couvrent généralement les exigences mais ne satisfont pas toujours les critères d'adéquation de test** [S-05]. Autrement dit : chaque exigence a bien un test, mais rien ne garantit que ce test soit suffisant. La traçabilité est atteinte, l'adéquation ne l'est pas. C'est un piège de gouvernance : une matrice de traçabilité complète à 100 % rassure un comité de pilotage tout en ne disant rien du pouvoir de détection.

**La traçabilité elle-même est automatisable.** TraceLLM évalue la traçabilité exigences ↔ artefacts sur **8 LLM et 4 jeux de données**, avec des scores F2 à l'état de l'art [S-06]. Les outils commerciaux industrialisent la chaîne : Xray Cloud génère des tests manuels ou Cucumber depuis les exigences Jira, avec une étape **« Review, Edit & Select » obligatoire** dans le flux produit [S-08]. Cette obligation, imposée par un éditeur dans son propre produit, est le meilleur argument de vente de la revue humaine : personne ne prétend que la sortie est directement livrable.

**Typologie des défauts d'exigence à faire chercher au modèle.** C'est ici que l'IA rend son meilleur service — non pas en écrivant des tests, mais en **relisant** la spécification.

| Type de défaut | Exemple issu du CDC v4.0 | Question à poser au métier |
|---|---|---|
| **Adjectif non quantifié** | « une remise *intéressante* » | Quel taux exactement ? |
| **Seuil implicite** | « les commandes *importantes* » | À partir de quel montant, TTC ou HT ? |
| **Terme métier non défini** | « les clients *fidèles* » | Défini par quel critère : ancienneté, nombre de commandes, montant cumulé ? |
| **Silence** | rien sur les montants négatifs ou les remboursements | Que fait le moteur sur un avoir ? |
| **Contradiction** | EX-003 (plafond 30 %) vs EX-014 (40 % en Black Friday) | Laquelle prime ? |
| **Dépendance temporelle floue** | « pendant les *périodes promotionnelles* » | Défini par qui, dans quel fuseau, avec quelle granularité ? |
| **Comportement « normal » non spécifié** | « les articles en précommande sont traités *normalement* » | « Normalement » = comme un article en stock ? Alors pourquoi la mention ? |

#### 1.1.3 Application au contexte SkyRetail

Le cahier des charges v4.0 fait **6 pages** et contient **7 ambiguïtés délibérées**. La stratégie du squad se déduit directement des chiffres ci-dessus : la qualité rédactionnelle du CDC est proche de celle des tickets Mozilla (macro-recall ~0,37 [S-01]), pas des exigences Bluetooth. **Générer directement des tests depuis ce document produira des tests plausibles et faux.**

L'ordre correct des opérations est donc :

```
1. Extraire les exigences      → EX-001 … EX-0nn        (mécanique, IA très efficace)
2. Qualifier chaque exigence   → testable oui/non        (IA propose, humain tranche)
3. Détecter les ambiguïtés     → 7 attendues             (IA propose, humain arbitre)
4. Poser les questions au métier                          (humain seul)
5. SEULEMENT ENSUITE : générer les cas de test
```

L'étape 5 est celle que tout le monde veut faire en premier. Le Boss J1 évalue les étapes 1 à 4.

#### 1.1.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **L'ambiguïté silencieusement comblée** | Le modèle produit un test avec un seuil de 100 € que personne n'a jamais écrit | Un LLM est entraîné à répondre, pas à refuser ; il complète le trou par la valeur la plus fréquente de son corpus | Instruction explicite : *« si une valeur n'est pas dans le document, écris `[AMBIGU]` et formule la question — n'invente aucun seuil »* |
| **Traçabilité de façade** | 100 % des exigences ont un test ; le comité est rassuré | La couverture d'exigences n'est pas l'adéquation de test [S-05] | Exiger, pour chaque exigence, **au moins un cas nominal et un cas d'erreur**, plus la technique de conception employée |
| **Générer avant de nettoyer** | 60 cas de test produits sur une base contradictoire | La contradiction EX-003/EX-014 n'a pas été détectée avant la génération | Ordonnancer : extraire → qualifier → questionner → générer |
| **Confondre user story et exigence** | Les scénarios sont vagues et non vérifiables | Une user story seule produit des scénarios de faible qualité [S-12] | Enrichir la user story de critères d'acceptation avant génération |

#### 1.1.5 📊 Chiffres à retenir

- **0,81 vs 0,37** de macro-recall selon la qualité rédactionnelle des exigences — même modèle, même prompt [S-01].
- **95 % / 92 % / 60 %** — scénarios utiles / tests utiles / tests utilisables **tels quels** dans une étude de cas industrielle [S-02].
- **89 %** des exigences produisent un script d'API valide en **≤ 3 tentatives** lorsque la base inclut l'OpenAPI [S-04].
- **78,5 %** de correction syntaxique et **61,7 %** de couverture sur 7 000 cas générés pour 5 projets open source [S-03].
- Les tests générés **couvrent les exigences sans toujours satisfaire les critères d'adéquation** [S-05] : la traçabilité n'est pas la qualité.

---

### 1.2 Notion N2 — Génération de scénarios BDD / Gherkin

#### 1.2.1 De quoi parle-t-on

**Gherkin** est le langage de spécification exécutable de Cucumber. Sa référence normative [S-15] définit les mots-clés : `Feature`, `Rule`, `Background`, `Scenario`, `Scenario Outline`, `Examples`, `Given`, `When`, `Then`, `And`, `But`, ainsi que les *data tables* et les *doc strings*.

Sa propriété intéressante ici est double :

1. **C'est une grammaire.** Un scénario est donc **validable syntaxiquement par une machine**, indépendamment de tout jugement humain — `npx @cucumber/gherkin-utils` suffit. C'est le seul artefact de la journée dont la conformité formelle se vérifie en une commande.
2. **C'est un contrat lisible par le métier.** Un `Then` faux est repérable par une personne qui ne sait pas coder. C'est le meilleur support de revue disponible pour une sortie d'IA.

Attention à ne pas confondre validité syntaxique et validité fonctionnelle : `Then le total est de 25 %` est parfaitement valide en Gherkin, et parfaitement faux si la règle métier dit 15 %. La grammaire ne contient pas l'oracle.

Sur .NET, le liant est **Reqnroll** [S-16], portage de Cucumber basé sur le code de SpecFlow, compatible de .NET Framework 4.6.2 à .NET 8.0+, avec un guide de migration depuis SpecFlow.

> ⚠️ **À jour au 07/2026** — SpecFlow n'est plus le choix par défaut sur .NET moderne : **Reqnroll** en est le successeur direct et documenté [S-16]. Un support qui recommande encore SpecFlow pour un projet .NET 8 est périmé.

#### 1.2.2 Ce que dit l'état de l'art

**Le meilleur résultat industriel publié.** AToMIC, déployé chez **BMW**, obtient **93,3 %** de scénarios Gherkin **syntaxiquement corrects dès la génération** et **100 %** des tests UI générés exécutés avec succès [S-13]. Ces deux chiffres doivent être lus ensemble et avec précaution : « syntaxiquement corrects » et « exécutés avec succès » ne disent **rien** de la justesse fonctionnelle des `Then`. Un test qui s'exécute est un test qui tourne, pas un test qui vérifie la bonne chose.

**Le pipeline en deux étapes est la structure gagnante.** L'étude de cas industrielle sépare explicitement *user story → Gherkin* puis *Gherkin → Cypress* [S-02] : **95 %** de scénarios utiles, **92 %** de tests utiles, **60 % utilisables tels quels**. La séparation en deux étapes est ce qui rend la revue humaine possible : elle insère un artefact lisible par le métier **entre** l'intention et le code. Un pipeline direct exigence → code de test supprime le point de contrôle.

**Ce qui conditionne la qualité.** Sur 500 user stories, les paramètres qui comptent sont, dans l'ordre : la **richesse de la description d'exigence** (facteur dominant), puis les paramètres d'échantillonnage — **température 0 / top_p 1.0** donnant les meilleurs résultats [S-12]. Sur du texte de loi, 120 spécifications générées atteignent **95 %** de pertinence, **100 %** de clarté, **94,2 %** de complétude, avec des **omissions et hallucinations persistantes** [S-14].

> ⚠️ **À jour au 07/2026** — « température 0 = meilleurs résultats » ne signifie **pas** « température 0 = résultats reproductibles ». Le non-déterminisme résiduel des LLM est traité en M4 ; il impose de **versionner les scénarios produits**, pas seulement le prompt qui les a produits.

**Comparatif des formats d'entrée**, tel qu'il ressort du corpus :

| Base de test fournie | Qualité observée | Source |
|---|---|---|
| User story seule | faible | [S-12] |
| User story + critères d'acceptation détaillés | haute | [S-12] |
| Exigence normative structurée | macro-recall 0,81 | [S-01] |
| Ticket de discussion | macro-recall 0,37 | [S-01] |
| Exigence + spécification OpenAPI | 89 % de scripts valides ≤ 3 tentatives | [S-04] |
| Texte juridique | 95 % pertinence, hallucinations persistantes | [S-14] |

**L'aval compte aussi.** Cucumber fournit des formatters `message / progress / pretty / html / json / junit / testng` [S-17] et Allure agrège **30+ intégrations** de frameworks avec Quality Gate et analyse de stabilité [S-18]. Ces sorties ne servent pas qu'au reporting : elles constituent l'**entrée structurée** d'un agent de synthèse, sujet traité en M3.

#### 1.2.3 Application au contexte SkyRetail

Le Boss J1 exige **12 scénarios Gherkin valides syntaxiquement** et un **diff explicite** entre la sortie brute du LLM et la version revue. La cible de production réaliste, en appliquant les taux industriels [S-02][S-13], est :

| Étape | Volume attendu |
|---|---|
| Scénarios générés depuis le CDC §3.2 | ~18 |
| Syntaxiquement valides d'emblée (93 %) | ~17 |
| Fonctionnellement corrects après revue | ~11-12 |
| Nécessitant une correction du `Then` | **~5** |
| Devant être **supprimés** (portant sur une exigence ambiguë) | **~2** |

Les deux dernières lignes sont le livrable qui rapporte des points. Un squad qui rend 18 scénarios verts sans diff obtient 0 sur le critère « diff explicite » (40 points) du barème.

Exemple d'entrée réelle du dépôt, `docs/cdc-v4.0.md` §3.2 :

> *« Les clients fidèles bénéficient d'une remise intéressante sur les commandes importantes. La remise de bienvenue WELCOME10 (10 %) s'applique à la première commande. La vente flash FLASH15 (15 %) s'applique pendant les périodes promotionnelles. Ces deux remises ne sont pas cumulables. Le cumul total des remises est plafonné à 30 %. Les articles en précommande sont traités normalement. »*

Six lignes, **quatre ambiguïtés** (« fidèles », « intéressante », « importantes », « normalement ») et **une règle parfaitement testable** (« ne sont pas cumulables » → BUG-101).

#### 1.2.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Gherkin impératif** | `When je clique sur le bouton #submit` | Le modèle a vu du code E2E dans son corpus et mélange les niveaux | Règle : le `When` décrit une **intention métier**, jamais un geste d'IHM. `When je valide ma commande`. |
| **Validation syntaxique prise pour une validation** | « 93 % de scénarios valides ! » | Confusion grammaire / oracle ; le chiffre BMW porte sur la syntaxe [S-13] | Deux portes distinctes : `gherkin-utils` **et** revue métier du `Then` |
| **Scénario sans `Then` vérifiable** | `Then la commande est correctement traitée` | Reformulation vague issue du texte source | Exiger une valeur ou un état observable dans chaque `Then` |
| **Explosion combinatoire** | 40 scénarios pour 6 règles | Le modèle génère un scénario par combinaison au lieu d'un `Scenario Outline` | Imposer `Scenario Outline` + `Examples` et la réduction par classes d'équivalence (N3) |

#### 1.2.5 📊 Chiffres à retenir

- **93,3 %** de scénarios Gherkin syntaxiquement corrects dès la génération, **100 %** des tests UI exécutés avec succès — déploiement BMW [S-13].
- **95 % / 92 % / 60 %** — pipeline en deux étapes user story → Gherkin → Cypress [S-02].
- **500 user stories** analysées : description détaillée = haute qualité, user story seule = faible qualité ; **température 0 / top_p 1.0** optimaux [S-12].
- **120 spécifications Gherkin** issues de textes de loi : **95 %** pertinence, **100 %** clarté, **94,2 %** complétude — hallucinations persistantes [S-14].
- **30+ intégrations** de frameworks dans Allure [S-18] ; formatters Cucumber `json` et `junit` [S-17] exploitables par un agent de synthèse.

---

### 1.3 Notion N3 — Techniques de conception de test et revue humaine

#### 1.3.1 De quoi parle-t-on

Le socle **ISTQB CTFL v4.0.1** [S-09] normalise les techniques de conception boîte noire. Trois sont indispensables ici, et elles ont en commun d'être **algorithmiques** : elles disent *combien* de cas produire et *lesquels*, sans arbitraire.

| Technique | Principe | Ce qu'elle garantit |
|---|---|---|
| **Partitionnement en classes d'équivalence** | Découper le domaine d'entrée en partitions dont tous les membres sont censés être traités identiquement ; un cas par partition, valide et invalide | Couverture du domaine sans redondance |
| **Analyse des valeurs limites** | Tester aux bornes de chaque partition (2 ou 3 valeurs par borne) | Détection des erreurs de comparateur (`<` vs `<=`) et d'arrondi |
| **Table de décision** | Croiser conditions et actions, une colonne par règle métier | Détection des combinaisons **oubliées** et des règles **contradictoires** |

La table de décision mérite un mot supplémentaire : c'est la seule des trois qui **détecte une contradiction dans la spécification**. Deux colonnes avec les mêmes conditions et des actions différentes signalent que la base de test est incohérente. C'est l'outil exact pour trouver EX-003 vs EX-014.

Ces trois techniques relèvent explicitement du périmètre automatisable au sens ISTQB, dont la définition de l'automatisation inclut *« test design »* au même titre que l'exécution [S-21]. Mais un LLM à qui l'on demande « génère des cas de test » ne les applique pas : il produit un échantillon plausible, biaisé vers les cas nominaux vus dans son corpus. **La technique doit être une instruction explicite du prompt** — c'est l'apport pratique central de cette notion.

#### 1.3.2 Ce que dit l'état de l'art

**Le déficit d'assertions est mesuré.** Sur les tests générés par LLM, les **erreurs d'assertion représentent 64 %** de toutes les erreurs, et le **manque de cohésion est le smell le plus fréquent (41 %)** [S-24]. Sur **20 505 suites de tests** générées, les smells dominants sont **Assertion Roulette** (plusieurs assertions sans message dans un même test) et **Magic Number Test** (valeurs numériques non expliquées) [S-23]. Ces deux smells sont exactement ce que les techniques ISTQB éliminent : une valeur limite est un nombre **justifié par une frontière**, pas un nombre magique.

**La faiblesse est structurelle, pas conjoncturelle.** Les générateurs sont conçus pour maximiser la couverture avec des tests qui passent ; sur du code bogué, ils **valident le bug au lieu de le détecter** [S-25]. Et la métrique qui rassure — la couverture — coexiste couramment avec des oracles faibles : c'est l'*oracle gap* [S-26]. Google le formule dans ses propres recommandations : seuils **60 / 75 / 90 %**, assortis d'une mise en garde contre la « mentalité de case à cocher » [S-27].

**La revue humaine n'est pas une option, c'est un composant du produit.** Xray impose une étape **« Review, Edit & Select »** dans son flux de génération [S-08]. Google publie **8 critères de revue** — Design, Functionality, Complexity, **Tests**, Naming, Comments, Style, Documentation [S-22] — directement transposables à une sortie d'IA. Le syllabus **ISTQB CT-AI v2.0** consacre un chapitre au test de l'IA générative et des LLM [S-19][S-20], utile ici pour le vocabulaire d'évaluation.

**La grille de revue de la formation** — 8 points, applicable en 90 secondes par cas de test généré, projetable telle quelle :

| # | Question | Rejet si |
|---|---|---|
| 1 | **D'où vient la valeur attendue ?** | Elle vient du code (test tautologique) [S-25] → **−30 QAC** |
| 2 | **Quelle exigence ce test tracé ?** | Aucune référence `EX-0nn` |
| 3 | **Quelle technique de conception a été appliquée ?** | Aucune ; échantillonnage arbitraire |
| 4 | **Le test peut-il échouer ?** | Aucune modification du code de production ne le fait rougir |
| 5 | **Combien d'assertions, et sont-elles messagées ?** | Assertion Roulette [S-23] |
| 6 | **Les valeurs sont-elles justifiées ?** | Magic Number Test [S-23] |
| 7 | **Le test est-il isolé et rejouable ?** | Dépend de l'ordre, de l'horloge ou d'un état partagé |
| 8 | **Que se passe-t-il si l'exigence change ?** | Il faut réécrire 12 tests pour un seuil |

#### 1.3.3 Application au contexte SkyRetail

Application des trois techniques à la grille de remises F1 :

**Classes d'équivalence** sur le montant du panier, selon les paliers du CDC (0-49,99 € / 50-199,99 € / ≥ 200 €) :

| Partition | Représentant | Attendu |
|---|---|---|
| Invalide (négatif) | −10 € | Rejet — **non spécifié → ambiguïté à remonter** |
| Valide bas | 25 € | 0 % |
| Valide médian | 120 € | 5 % |
| Valide haut | 450 € | 10 % |

**Valeurs limites** sur la frontière 50 € — trois valeurs par borne :

| Valeur | Attendu | Ce qu'elle détecte |
|---|---|---|
| 49,99 € | 0 % | borne exclue |
| 50,00 € | 5 % | **erreur `<` vs `<=`** |
| 50,01 € | 5 % | borne incluse |

**Table de décision** sur le cumul, qui est l'outil de détection de BUG-101 :

| Conditions | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| Première commande (WELCOME10) | V | V | F | F |
| Période promotionnelle (FLASH15) | V | F | V | F |
| Cumul total avant plafond | 15 % | 10 % | 15 % | 0 % |
| **Action attendue** | **15 %** (non cumulables) | 10 % | 15 % | 0 % |

La colonne **R1** est celle que le code échoue à traiter dans un sens d'évaluation sur deux. Elle ne peut être produite qu'en dressant la table — un échantillonnage libre par le modèle a une chance sur quatre de la manquer, et surtout ne dira pas qu'elle manque.

#### 1.3.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Technique implicite** | 12 cas de test dont 11 nominaux | Le modèle échantillonne selon la fréquence de son corpus, pas selon une couverture de domaine | Nommer la technique dans le prompt : *« applique le partitionnement en classes d'équivalence, puis l'analyse des valeurs limites à 3 points sur chaque frontière »* |
| **Valeurs limites à un seul point** | Seule la valeur de la borne est testée | Le modèle produit `50` mais ni `49,99` ni `50,01` | Exiger explicitement les **trois** points par borne |
| **Assertion Roulette** | 6 assertions sans message dans un `[Fact]` | Le générateur maximise la couverture par test [S-23] | Un comportement = un test ; message obligatoire dans `.Should().Be(x, "car EX-007…")` |
| **Revue par relecture flottante** | « ça a l'air bien » | Absence de grille ; la revue devient une impression | Grille en 8 points §1.3.2, tenue par le **Copilote**, tracée dans le journal du squad |

#### 1.3.5 📊 Chiffres à retenir

- **64 %** des erreurs des tests générés sont des **erreurs d'assertion** ; **41 %** de manque de cohésion [S-24].
- **20 505 suites** analysées : **Assertion Roulette** et **Magic Number Test** dominent [S-23].
- **8 critères de revue** Google (Design, Functionality, Complexity, Tests, Naming, Comments, Style, Documentation) [S-22].
- **60 / 75 / 90 %** — seuils de couverture Google, avec avertissement contre la « mentalité de case à cocher » [S-27].
- Étape **« Review, Edit & Select » obligatoire** dans le flux de génération d'un éditeur commercial [S-08] : la revue est un composant du produit, pas une bonne pratique optionnelle.

---

## 2. Trois exemples concrets

### 🔍 Exemple A — « Six lignes de cahier des charges, sept trous » *(démonstration guidée, 9 min)*

**Contexte.** `docs/cdc-v4.0.md` §3.2, l'extrait de six lignes cité en §1.2.3. On le soumet à Claude Code de deux façons opposées.

**Ce qu'on montre.** Que le même document, avec deux prompts différents, produit soit une suite de tests confortable et fausse, soit une liste de questions embarrassantes et utile.

**Prompt naïf :**

```text
Voici la spécification du moteur de remises de SkyRetail. Génère les cas de test.
[coller les 6 lignes de §3.2]
```

**Sortie brute (extrait) :**

```markdown
| # | Cas de test | Entrée | Résultat attendu |
|---|---|---|---|
| 1 | Client fidèle, commande importante | client avec 5 commandes, panier 250 € | remise de 15 % |
| 2 | Première commande | nouveau client, panier 80 € | remise de 10 % (WELCOME10) |
| 3 | Vente flash | panier 80 € pendant promo | remise de 15 % (FLASH15) |
| 4 | Cumul WELCOME10 + FLASH15 | nouveau client pendant promo | remise de 15 % (non cumulables) |
| 5 | Plafond atteint | panier avec 4 remises actives | remise plafonnée à 30 % |
| 6 | Article en précommande | panier avec 1 précommande | traitement normal, remise appliquée |
```

**Analyse critique.**

| Ligne | Verdict | Motif |
|---|---|---|
| 1 | ❌ **Fabriqué** | « 5 commandes » et « 250 € » n'apparaissent nulle part dans le document ; « 15 % » non plus. Trois valeurs inventées dans une seule ligne. |
| 2 | ✅ Correct | La valeur 10 % est explicitement écrite |
| 3 | ⚠️ Partiel | 15 % est écrit, mais « pendant promo » n'est pas défini |
| 4 | ✅ **Excellent** | Seule ligne qui exprime une vraie règle métier, et c'est celle qui détectera **BUG-101** |
| 5 | ⚠️ Non testable en l'état | « 4 remises actives » suppose une liste des 6 règles absente de l'extrait |
| 6 | ❌ **Dangereux** | « traitement normal » a été interprété comme « la remise s'applique ». C'est une **supposition**, et elle masque **BUG-103** |

Bilan : sur six cas, **un seul** est directement exploitable, deux sont fabriqués ou dangereux. Le modèle a comblé chaque trou par la valeur la plus plausible de son corpus, silencieusement. Aucune des quatre ambiguïtés n'a été signalée — le taux de détection est de **0 sur 4**.

**Prompt corrigé :**

```text
Rôle : analyste de test. Tu ne génères AUCUN cas de test à cette étape.

Entrée : l'extrait de spécification ci-dessous.
[coller les 6 lignes]

Tâche, en trois tableaux séparés :
1. EXIGENCES — numérote EX-001…EX-0nn. Une exigence = une affirmation vérifiable.
   Colonnes : id | énoncé (citation littérale) | testable oui/non | type de test | priorité.
2. AMBIGUÏTÉS — tout terme non quantifié, seuil implicite, silence ou contradiction.
   Colonnes : id | extrait cité | nature du défaut | question exacte à poser au métier.
3. HORS-PÉRIMÈTRE — ce que le document ne dit pas et qu'il devrait dire.

Contrainte absolue : n'invente AUCUNE valeur numérique absente du texte.
Si une valeur manque, écris [ABSENT] et déplace la ligne dans le tableau 2.
```

**Sortie corrigée (extrait du tableau 2) :**

```markdown
| id | Extrait cité | Nature | Question au métier |
|---|---|---|---|
| AMB-1 | « clients fidèles » | terme métier non défini | Fidèle = combien de commandes, sur quelle période ? |
| AMB-2 | « remise intéressante » | adjectif non quantifié | Quel taux exact ? |
| AMB-3 | « commandes importantes » | seuil implicite | À partir de quel montant, HT ou TTC ? |
| AMB-4 | « périodes promotionnelles » | dépendance temporelle floue | Défini par qui, dans quel fuseau ? |
| AMB-5 | « traités normalement » | comportement non spécifié | Si c'est identique aux autres articles, pourquoi la mention ? |
```

AMB-5 est la ligne à mille euros : la mention explicite d'un traitement « normal » pour les précommandes signale qu'un traitement **anormal** existe quelque part — c'est la trace de **BUG-103** dans la spécification, avant même d'avoir ouvert le code.

**Ce qu'on retient.** L'IA est excellente en **extraction** et médiocre en **complétion honnête**. Le levier n'est pas la qualité du prompt de génération, c'est **l'interdiction explicite d'inventer** couplée à une sortie structurée qui rend le trou visible. On sépare toujours *analyser* de *générer*.

---

### 🔍 Exemple B — « Du Gherkin qui compile jusqu'au test qui vérifie » *(approfondissement, 8 min)*

**Contexte.** EX-003 (« WELCOME10 et FLASH15 ne sont pas cumulables ») est la seule exigence non ambiguë de l'extrait. On la déroule complètement : Gherkin → validation syntaxique → binding Reqnroll → exécution.

**Prompt :**

```text
Exigence EX-003 (citation littérale) : « La remise de bienvenue WELCOME10 (10 %)
s'applique à la première commande. La vente flash FLASH15 (15 %) s'applique
pendant les périodes promotionnelles. Ces deux remises ne sont pas cumulables. »

Écris la feature Gherkin en français correspondante. Contraintes :
- utilise Scenario Outline + Examples pour couvrir les 4 combinaisons de la table de décision ;
- chaque Then contient une valeur numérique observable ;
- le When décrit une intention métier, jamais un geste d'interface ;
- ajoute en commentaire, sur chaque scénario, la référence EX-003.
```

**Sortie, après revue (les corrections sont signalées) :**

```gherkin
# language: fr
Fonctionnalité: Cumul des remises promotionnelles
  # Traçabilité : EX-003 — docs/cdc-v4.0.md §3.2

  Contexte:
    Étant donné un panier contenant 1 article à 100,00 € HT

  Plan du Scénario: Exclusivité entre WELCOME10 et FLASH15
    Étant donné que le client est <premiere_commande> à sa première commande
    Et que la période promotionnelle est <promo>
    Quand je calcule le prix du panier
    Alors le taux de remise appliqué est de <taux>

    Exemples:
      | premiere_commande | promo  | taux  |
      | oui               | active | 15 %  |   # R1 — non cumulables : la plus élevée prime
      | oui               | inactive | 10 % |  # R2
      | non               | active | 15 %  |   # R3
      | non               | inactive | 0 %  |   # R4
```

**Diff avec la sortie brute — c'est le livrable qui rapporte des points au Boss J1 :**

| # | Sortie brute du LLM | Version revue | Motif |
|---|---|---|---|
| 1 | `| oui | active | 25 % |` | `15 %` | **Le LLM a additionné.** Il a appliqué la logique du code, pas la règle « non cumulables » |
| 2 | `Quand je clique sur "Valider le panier"` | `Quand je calcule le prix du panier` | Gherkin impératif : le `When` décrivait un geste d'IHM |
| 3 | 4 scénarios séparés | 1 `Plan du Scénario` + `Exemples` | Réduction combinatoire, maintenance divisée par 4 |
| 4 | Aucun commentaire de traçabilité | `# Traçabilité : EX-003` | Exigence du barème |

La ligne 1 est spectaculaire : le modèle a produit `25 %` sur une exigence dont le texte dit **explicitement** « ne sont pas cumulables », citée dans le prompt. C'est le même défaut de raisonnement que l'exemple A de M1 — sauf qu'ici la spécification était fournie. Enseignement : **fournir la spécification est nécessaire mais pas suffisant**. La revue reste obligatoire.

**Validation syntaxique et liaison .NET :**

```bash
# Porte 1 — validité grammaticale (objective, machine)
npx @cucumber/gherkin-utils format e2e/features/remises.feature

# Porte 2 — exécution réelle via Reqnroll
cd backend/SkyRetail.Tests && dotnet test --filter "Category=BDD"
```

```csharp
// backend/SkyRetail.Tests/Bdd/RemisesSteps.cs — binding Reqnroll
using Reqnroll;
using FluentAssertions;

[Binding]
public class RemisesSteps
{
    private Cart _cart = null!;
    private PriceBreakdown _result = null!;

    [Given(@"un panier contenant (\d+) article à (.*) € HT")]
    public void UnPanier(int qty, decimal unitPrice)
        => _cart = CartBuilder.New().WithLine("SKU-1", unitPrice, qty).Build();

    [Given(@"que le client est (oui|non) à sa première commande")]
    public void PremiereCommande(string flag)
        => _cart = _cart.With(isFirstOrder: flag == "oui");

    [Given(@"que la période promotionnelle est (active|inactive)")]
    public void Promo(string state)
        => _cart = _cart.With(flashSaleActive: state == "active");

    [When(@"je calcule le prix du panier")]
    public void Calculer()
        => _result = new DiscountEngine(DiscountRules.All).Compute(_cart);

    [Then(@"le taux de remise appliqué est de (.*) %")]
    public void VerifierTaux(decimal expected)
        => _result.TotalDiscountRate.Should().Be(expected / 100m,
             "EX-003 impose l'exclusivité entre WELCOME10 et FLASH15");
}
```

**Résultat d'exécution :** la ligne R1 (`oui | active | 15 %`) **échoue** sur `formation/j1-start` — le moteur renvoie 25 %. **BUG-101 est découvert par le chemin de la spécification**, sans avoir lu une ligne de `DiscountEngine.cs`. Badge 🔍 **L'Œil** pour le premier squad qui y arrive.

**Ce qu'on retient.** Trois enseignements. (1) Le Gherkin syntaxiquement valide n'est pas un Gherkin correct : les 93,3 % de BMW [S-13] mesurent la grammaire. (2) Le `Scenario Outline` est la traduction directe d'une table de décision : c'est la technique de conception qui rend la couverture démontrable. (3) Un scénario dérivé de la spécification **échoue** quand le code est faux — c'est exactement ce que le test dérivé du code ne fait jamais.

---

### 🔍 Exemple C — « 23 endpoints, un contrat, zéro ambiguïté » *(cas d'entreprise, 8 min)*

**Contexte.** F3, catalogue et recherche. `docs/openapi.yaml` documente 23 endpoints. C'est le cas le plus favorable du projet : le contrat contient les types, les bornes et **les codes de statut attendus** — c'est-à-dire l'oracle, écrit noir sur blanc.

**Extrait du contrat :**

```yaml
# docs/openapi.yaml
/api/products:
  get:
    parameters:
      - name: page
        in: query
        schema: { type: integer, minimum: 1, default: 1 }
      - name: pageSize
        in: query
        schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
    responses:
      '200': { description: OK }
      '400': { description: Paramètres invalides }
```

**Prompt :**

```text
Entrée : docs/openapi.yaml, opération GET /api/products.

Génère les tests d'intégration xUnit + WebApplicationFactory. Contraintes :
- applique le partitionnement en classes d'équivalence sur `page` et `pageSize` ;
- applique l'analyse des valeurs limites à 3 points sur chaque borne du schéma
  (minimum, maximum, default) ;
- pour chaque cas, l'assertion sur le code de statut doit citer en commentaire
  la ligne du contrat OpenAPI qui la justifie ;
- inclus systématiquement les partitions INVALIDES, pas seulement les valides.
```

**Code produit (extrait, après revue) :**

```csharp
// backend/SkyRetail.Tests/Api/ProductsContractTests.cs
public class ProductsContractTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    public ProductsContractTests(WebApplicationFactory<Program> f) => _client = f.CreateClient();

    // Valeurs limites sur `page` : minimum = 1 → points 0 / 1 / 2
    // Valeurs limites sur `pageSize` : min 1, max 100 → 0 / 1 / 2 et 99 / 100 / 101
    [Theory]
    [InlineData("?page=0",        HttpStatusCode.BadRequest)]  // openapi: minimum: 1
    [InlineData("?page=1",        HttpStatusCode.OK)]          // borne incluse
    [InlineData("?page=2",        HttpStatusCode.OK)]
    [InlineData("?page=-1",       HttpStatusCode.BadRequest)]  // openapi: minimum: 1
    [InlineData("?pageSize=0",    HttpStatusCode.BadRequest)]  // openapi: minimum: 1
    [InlineData("?pageSize=100",  HttpStatusCode.OK)]          // openapi: maximum: 100
    [InlineData("?pageSize=101",  HttpStatusCode.BadRequest)]  // openapi: maximum: 100
    [InlineData("?page=abc",      HttpStatusCode.BadRequest)]  // openapi: type: integer
    public async Task GetProducts_RespectsOpenApiContract(string query, HttpStatusCode expected)
    {
        var response = await _client.GetAsync($"/api/products{query}");
        response.StatusCode.Should().Be(expected,
            $"le contrat OpenAPI déclare ce comportement pour '{query}'");
    }
}
```

**Résultat d'exécution :** 7 verts, **1 rouge**.

```
Failed GetProducts_RespectsOpenApiContract(query: "?page=-1", expected: BadRequest)
  Expected response.StatusCode to be BadRequest because le contrat OpenAPI
  déclare ce comportement pour '?page=-1', but found InternalServerError.
```

**BUG-301 détecté** : `GET /api/products?page=-1` renvoie 500 au lieu de 400.

**Analyse critique.**

| Ce que l'IA a bien fait | Ce qu'elle a raté |
|---|---|
| Balayage exhaustif des 23 endpoints en une passe | A produit d'emblée **uniquement les partitions valides** — les cas invalides n'ont été générés qu'après instruction explicite |
| Assertions citant le contrat, donc **oracle indépendant du code** | N'a pas testé les **combinaisons** `page` × `pageSize` (pas de table de décision spontanée) |
| Usage correct de `WebApplicationFactory` sans réinventer d'infrastructure | N'a pas questionné ce que le contrat **ne dit pas** : rien sur `page` très grand (`2^31−1`), rien sur le comportement au-delà du dernier index |
| `[Theory]` + `[InlineData]` au lieu de 8 `[Fact]` | A supposé que le contrat est correct — or un contrat peut être faux (sujet du fuzzing, M3) |

**Comparaison avec l'état de l'art.** APITestGenie mesure **89 % d'exigences produisant un script valide en ≤ 3 tentatives** quand la base combine exigences et OpenAPI [S-04]. Notre observation sur F3 est cohérente. L'écart avec les 0,37 de macro-recall sur des tickets mal écrits [S-01] mesure exactement une chose : **la valeur d'un contrat écrit**.

**Ce qu'on retient.** Là où existe une spécification machine, l'IA générative est à son maximum d'utilité et de sûreté — parce que l'oracle est fourni, pas inféré. Et le seul geste qui a rendu ce résultat possible tient en une ligne de prompt : *« inclus systématiquement les partitions invalides »*. Sans elle, huit tests verts, aucun bug trouvé.

---

## 3. Quatre exercices

### 🧪 Exercice M2-1 — « L'extracteur d'exigences »

| | |
|---|---|
| **Difficulté** | ⭐ |
| **Durée cible** | 4 min |
| **Modalité** | squad |
| **Matériel** | `docs/cdc-v4.0.md` §2 (tunnel de commande, ~1 page) |
| **QA Credits** | 10 |

**Énoncé**
Extrayez de la section §2 du cahier des charges la liste des exigences, numérotées EX-001 à EX-0nn. Pour chacune : énoncé cité **littéralement**, testable oui/non, type de test envisagé, priorité (haute/moyenne/basse). Interdiction formelle d'inventer une valeur numérique absente du texte : tout trou est marqué `[ABSENT]`.

**✅ Résultat attendu**
- [ ] `boss-j1/plan-de-test-v4.md` créé, section « §2 — Tunnel de commande ».
- [ ] Au moins **8 exigences** extraites, numérotées sans trou.
- [ ] Colonne « énoncé » contenant une **citation littérale** du document, entre guillemets.
- [ ] Au moins **2 exigences** classées « non testable en l'état », avec la raison.
- [ ] Aucune valeur numérique présente dans le tableau qui ne figure pas dans le document source (vérifiable par recherche textuelle).
- **Invalide** : un seuil, un délai ou un pourcentage apparaissant dans le livrable et absent du CDC.

**💡 Indice** *(après 1 min 30)*
Une exigence testable contient un **verbe d'action** et un **critère observable**. « Le tunnel doit être fluide » n'en est pas une. « Le bouton Valider est désactivé après soumission » en est une — et c'est BUG-202.

**🔑 Solution de référence**

```markdown
| id | Énoncé (citation) | Testable | Type | Priorité |
|---|---|---|---|---|
| EX-101 | « Le client peut valider sa commande depuis le récapitulatif » | oui | E2E | haute |
| EX-102 | « Une commande validée deux fois ne doit créer qu'une seule commande » | oui | E2E + concurrence | **haute** |
| EX-103 | « Le tunnel doit être fluide et rapide » | **non** | — | — |
| EX-104 | « Le paiement est confirmé sous [ABSENT] secondes » | **non** | perf | haute |
| EX-105 | « Un message de confirmation s'affiche après validation » | oui | E2E | moyenne |
```

EX-102 est l'exigence à repérer : elle décrit une **idempotence** et c'est l'énoncé exact de BUG-201. EX-103 et EX-104 sont les non-testables attendues.

**🎓 Ce que l'exercice enseigne vraiment**
Que l'extraction est la tâche où l'IA est la plus fiable et la plus rentable — à condition de lui **interdire de compléter**. La contrainte `[ABSENT]` transforme une faiblesse structurelle du modèle (il répond toujours) en instrument de mesure de la qualité de la spécification.

---

### 🧪 Exercice M2-2 — « Douze scénarios, et le diff »

| | |
|---|---|
| **Difficulté** | ⭐⭐ |
| **Durée cible** | 5 min |
| **Modalité** | binôme (rotation Pilote/Copilote) |
| **Matériel** | exigences produites en M2-1, `e2e/features/` |
| **QA Credits** | 20 |

**Énoncé**
Générez des scénarios Gherkin pour vos exigences **testables** de M2-1. Conservez impérativement la **sortie brute** dans `e2e/features/_raw/`. Révisez-la, enregistrez la version corrigée dans `e2e/features/`, et produisez le **diff commenté** : pour chaque correction, la nature du défaut et la raison.

**✅ Résultat attendu**
- [ ] `e2e/features/_raw/*.feature` (brut) et `e2e/features/*.feature` (revu) coexistent dans le dépôt.
- [ ] Au moins **6 scénarios** dans la version revue.
- [ ] `npx @cucumber/gherkin-utils format e2e/features/*.feature` s'exécute **sans erreur**.
- [ ] `boss-j1/diff-gherkin.md` contient au moins **3 corrections** avec, pour chacune : ligne brute, ligne corrigée, nature du défaut (parmi : Gherkin impératif, `Then` non vérifiable, valeur inventée, combinatoire non factorisée, traçabilité absente).
- [ ] Chaque scénario porte un commentaire `# Traçabilité : EX-1nn`.
- **Invalide** : sortie brute écrasée (aucun diff possible) ; ou fichier `.feature` refusé par `gherkin-utils`.

**💡 Indice** *(après 2 min)*
Cherchez d'abord les `When`. Si un `When` contient un nom de composant, un sélecteur CSS ou le mot « clique », c'est du Gherkin impératif — correction n°1 la plus fréquente, et la plus facile à défendre au Contre-Test.

**🔑 Solution de référence**
Trois corrections types, à obtenir a minima :

| Brut | Revu | Nature |
|---|---|---|
| `Quand je clique sur le bouton #confirm-order` | `Quand je valide ma commande` | Gherkin impératif |
| `Alors la commande est correctement enregistrée` | `Alors une seule commande est créée pour la référence <ref>` | `Then` non vérifiable |
| `Alors le délai est inférieur à 2 secondes` | *(scénario supprimé)* | Valeur inventée : EX-104 dit `[ABSENT]` |

La troisième est la plus formatrice : **supprimer un scénario est une correction valide**, et souvent la bonne. Un scénario adossé à une exigence ambiguë ne doit pas exister ; il doit devenir une question au métier.

**🎓 Ce que l'exercice enseigne vraiment**
Que le livrable de valeur n'est pas le fichier `.feature` mais le **diff**. C'est le seul artefact qui prouve qu'un humain est passé, et c'est ce que le comité de J4 demandera sous le nom de « traçabilité IA/humain » — 50 points du barème final.

---

### 🧪 Exercice M2-3 — « Imposer la technique »

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐ |
| **Durée cible** | 7 min |
| **Modalité** | squad |
| **Matériel** | `docs/cdc-v4.0.md` §3.2 (paliers de remise), `backend/SkyRetail.Tests/Pricing/` |
| **QA Credits** | 40 |

**Énoncé**
Deux générations successives sur la **même** exigence (les paliers de remise par montant de panier). **Génération A** : prompt libre, « génère les cas de test ». **Génération B** : prompt imposant explicitement le partitionnement en classes d'équivalence puis l'analyse des valeurs limites à **3 points par borne**, partitions invalides incluses. Comparez les deux, puis implémentez B en `[Theory]` xUnit.

**✅ Résultat attendu**
- [ ] `boss-j1/technique-conception.md` contient les deux tableaux de cas (A et B) et un tableau comparatif : nombre de cas, nombre de cas aux bornes, nombre de partitions invalides couvertes.
- [ ] La génération B produit **strictement plus** de cas aux bornes que A.
- [ ] `backend/SkyRetail.Tests/Pricing/DiscountTiersTests.cs` contient un `[Theory]` avec **au moins 9 `[InlineData]`**, dont les trois points de chaque frontière de palier.
- [ ] Au moins **une partition invalide** est testée (montant négatif, `null`, ou zéro) — et son statut est consigné : si le CDC ne la spécifie pas, le cas est marqué `[Fact(Skip="ambiguïté AMB-x")]` avec la question au métier.
- [ ] `dotnet test --filter "DiscountTiers"` s'exécute ; le nombre de tests verts/rouges est consigné.
- **Invalide** : génération B identique à A (prompt non contraignant) ; ou aucune partition invalide traitée.

**💡 Indice** *(après 2 min 30)*
Le prompt B doit contenir les mots exacts « classes d'équivalence », « valeurs limites », « 3 points par borne » et « partitions invalides incluses ». Les modèles connaissent ces techniques ; ils ne les appliquent simplement pas spontanément [S-09].

**🔑 Solution de référence**

```csharp
// backend/SkyRetail.Tests/Pricing/DiscountTiersTests.cs
public class DiscountTiersTests
{
    // Paliers CDC §3.2 : [0 ; 50[ → 0 % · [50 ; 200[ → 5 % · [200 ; +∞[ → 10 %
    // Classes d'équivalence : 3 valides + 1 invalide (négatif, non spécifiée)
    // Valeurs limites : 3 points sur chaque frontière (49,99 / 50,00 / 50,01 · 199,99 / 200,00 / 200,01)
    [Theory]
    [InlineData(25.00,  0.00)]   // partition valide basse — représentant
    [InlineData(49.99,  0.00)]   // borne 50 : point inférieur
    [InlineData(50.00,  0.05)]   // borne 50 : point pivot  ← détecte `<` vs `<=`
    [InlineData(50.01,  0.05)]   // borne 50 : point supérieur
    [InlineData(120.00, 0.05)]   // partition valide médiane — représentant
    [InlineData(199.99, 0.05)]   // borne 200 : point inférieur
    [InlineData(200.00, 0.10)]   // borne 200 : point pivot
    [InlineData(200.01, 0.10)]   // borne 200 : point supérieur
    [InlineData(450.00, 0.10)]   // partition valide haute — représentant
    public void TierRate_MatchesSpecification(decimal cartTotal, decimal expectedRate)
    {
        var rate = DiscountTiers.RateFor(cartTotal);
        rate.Should().Be(expectedRate,
            "CDC v4.0 §3.2 définit les paliers [0;50[ 0 %, [50;200[ 5 %, [200;+∞[ 10 %");
    }

    // Partition INVALIDE : le CDC ne spécifie pas les montants négatifs.
    // On ne devine pas : on trace la question.
    [Fact(Skip = "AMB-6 : comportement sur montant négatif non spécifié — question posée au métier le JJ/MM")]
    public void TierRate_NegativeAmount_Undefined() { }
}
```

Résultat typique : **génération A** produit 3 à 4 cas, tous représentants de partition, aucun aux bornes. **Génération B** en produit 9 à 12, dont 6 aux bornes. L'écart est intégralement imputable au prompt.

**🎓 Ce que l'exercice enseigne vraiment**
Que **la compétence QA se transfère au modèle par le vocabulaire normatif**. Un·e testeur·euse certifié·e ISTQB dispose d'un avantage direct et mesurable en génération assistée : il ou elle sait nommer ce qu'il faut produire. Et que le bon comportement face à une partition non spécifiée n'est ni de l'ignorer ni de deviner, mais de la tracer en `Skip` motivé — ce qui, contrairement à un `Skip` de complaisance, ne coûte aucun QAC.

---

### 🧪 Exercice M2-4 — « L'exigence impossible » 🎯

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐⭐ |
| **Durée cible** | 7 min (+ 5 min de Contre-Test) |
| **Modalité** | squad |
| **Matériel** | `docs/cdc-v4.0.md` intégral (6 pages), en particulier §3.2 et §4.4 |
| **QA Credits** | 80 |

**Énoncé**
Le cahier des charges contient **au moins une contradiction interne** entre deux exigences. Demandez à Claude Code de générer les cas de test couvrant **l'ensemble** des règles de remise, en une seule passe, sans autre instruction. Puis démontrez que la suite produite est **logiquement impossible à satisfaire simultanément**. Livrez : la contradiction identifiée, la preuve, et le test qui la rend visible.

**✅ Résultat attendu**
- [ ] `boss-j1/contradiction.md` identifie nommément **EX-003** (« le cumul total des remises est plafonné à 30 % ») et **EX-014** (« lors du Black Friday, la remise cumulée peut atteindre 40 % sur la catégorie Électronique »).
- [ ] Une **table de décision** montre au moins une combinaison de conditions produisant **deux actions différentes** selon l'exigence appliquée.
- [ ] Un test `[Fact]` nommé explicitement (ex. `Cap_OnBlackFriday_IsContradictory`) démontre que **quel que soit** le résultat du moteur, une des deux exigences est violée — avec les deux assertions mutuellement exclusives commentées.
- [ ] Une analyse en trois lignes : **pourquoi le LLM n'a pas signalé la contradiction** alors que les deux exigences étaient dans son contexte.
- [ ] La question à poser au métier, rédigée telle qu'elle serait envoyée.
- **Invalide** : contradiction « trouvée » sans citation des deux extraits littéraux ; ou test qui ne fait qu'échouer sans démontrer l'exclusion mutuelle.

**💡 Indice** *(après 2 min 30)*
Dressez la table de décision de l'ensemble des règles, en une colonne par combinaison. Une contradiction se lit à l'œil nu : **deux colonnes avec des conditions identiques et des actions différentes**. C'est la seule des trois techniques ISTQB capable de la révéler ; ni les classes d'équivalence ni les valeurs limites ne la verront jamais.

**🔑 Solution de référence**

Table de décision, extrait :

| Conditions | C1 | C2 |
|---|---|---|
| Catégorie = Électronique | V | V |
| Date = Black Friday | V | V |
| Somme des remises éligibles | 40 % | 40 % |
| **Action selon EX-003** | plafonner à **30 %** | plafonner à **30 %** |
| **Action selon EX-014** | autoriser **40 %** | autoriser **40 %** |

```csharp
// backend/SkyRetail.Tests/Pricing/SpecificationContradictionTests.cs
public class SpecificationContradictionTests
{
    // EX-003 (CDC §3.2) : « Le cumul total des remises est plafonné à 30 %. »
    // EX-014 (CDC §4.4) : « Lors du Black Friday, la remise cumulée peut atteindre 40 %
    //                        sur la catégorie Électronique. »
    // Les deux exigences ne peuvent pas être satisfaites simultanément.
    [Fact]
    public void Cap_OnBlackFriday_IsContradictory()
    {
        var cart = CartBuilder.New()
            .WithLine("TV-4K", 1000m, category: "Électronique")
            .OnDate(new DateOnly(2026, 11, 27))          // Black Friday
            .WithEligibleDiscounts(0.15m, 0.15m, 0.10m)  // 40 % cumulés
            .Build();

        var rate = new DiscountEngine(DiscountRules.All).Compute(cart).TotalDiscountRate;

        // Une seule de ces deux assertions peut passer. Le test EST la contradiction.
        using var _ = new AssertionScope();
        rate.Should().Be(0.30m, "EX-003 plafonne le cumul à 30 %");
        rate.Should().Be(0.40m, "EX-014 autorise 40 % en Black Friday sur l'Électronique");
    }
}
```

Les trois lignes d'analyse attendues :

> 1. Le modèle traite les exigences **séquentiellement et localement** : il a produit des tests pour EX-003 puis pour EX-014 sans construire la table de décision qui les met en regard.
> 2. Il est optimisé pour produire une sortie **cohérente et utile**, pas pour signaler que l'entrée est incohérente — refuser de répondre n'est pas son comportement par défaut [S-01].
> 3. Les deux exigences sont séparées de **deux pages** dans le document ; même dans un contexte suffisant, la mise en regard suppose une **intention de recherche de conflit** que rien dans le prompt ne demandait.

Question au métier, rédigée :

> *« §3.2 fixe un plafond global de remise à 30 %. §4.4 autorise 40 % sur l'Électronique pendant le Black Friday. Laquelle prime ? Si c'est §4.4, s'agit-il d'une dérogation limitée à cette catégorie et à cette date, ou d'un relèvement général du plafond ? Le moteur doit-il journaliser l'application de la dérogation à des fins de contrôle comptable ? »*

**🎓 Ce que l'exercice enseigne vraiment**

1. **Un LLM ne détecte pas spontanément une contradiction dans son entrée.** Il produit une sortie cohérente à partir d'une entrée incohérente — ce qui est pire que de ne rien produire, parce que le résultat est présentable.
2. **La table de décision est le seul instrument** qui rend la contradiction visible. Les techniques de conception ne servent pas qu'à produire des cas : elles servent à **auditer la spécification**.
3. **La valeur ajoutée du testeur se déplace vers l'amont.** Le squad qui remonte cette contradiction le mardi économise à SkyRetail un incident de production le vendredi. Ça ne se mesure ni en tests écrits ni en couverture — c'est le **bonus +30 points** du Boss J1.

**Contre-Test (5 min).** Le squad adverse doit trouver une lecture des deux exigences qui les rende **compatibles** (par exemple : « peut atteindre 40 % » = plafond de cumul *avant* application du plafond global). S'il y parvient, +20 QAC — et l'enseignement est meilleur encore : *une contradiction apparente peut être une ambiguïté de formulation*, ce qui ne change rien à la conclusion : **la question doit être posée au métier**.

**Exercice bonus ⭐⭐⭐⭐⭐** — Construire un prompt d'audit réutilisable qui détecte les contradictions dans **n'importe quelle** spécification : instruction de construire la table de décision globale d'abord, puis de chercher les colonnes à conditions identiques et actions divergentes. Le tester sur les 6 pages complètes et mesurer combien des 7 ambiguïtés il retrouve.

---

## 4. Débriefing

### 4.1 Les cinq erreurs les plus fréquentes sur ce module

| # | Erreur | Correction |
|---|---|---|
| 1 | **Générer les tests avant d'avoir nettoyé la spécification** | L'ordre est : extraire → qualifier → questionner → générer. Une base à 0,37 de macro-recall produit des tests plausibles et faux [S-01]. |
| 2 | **Laisser le modèle combler les trous** | Il le fait toujours, et silencieusement. La contre-mesure est une instruction explicite : `[ABSENT]` obligatoire, aucune valeur inventée. |
| 3 | **Écraser la sortie brute** | Sans elle, pas de diff, donc pas de preuve de revue. Le diff vaut 40 points au Boss J1 et 50 au Boss final. |
| 4 | **Prendre la validité syntaxique pour de la justesse** | Les 93,3 % de BMW [S-13] mesurent la grammaire. Un `Then` faux passe `gherkin-utils` sans broncher. |
| 5 | **Ne pas nommer la technique de conception** | Sans les mots « classes d'équivalence » et « valeurs limites » dans le prompt, le modèle échantillonne les cas nominaux. L'écart mesuré en M2-3 est d'un facteur 2 à 3 sur les cas aux bornes. |

### 4.2 Questions de contrôle

1. **Quel écart de performance la qualité des exigences produit-elle, à modèle et prompt constants ?**
   → Macro-recall **0,81** sur des exigences normatives (Bluetooth) contre **0,37** sur des tickets de discussion (Mozilla) [S-01] — un facteur 2,2.

2. **Pourquoi le pipeline en deux étapes user story → Gherkin → code est-il préférable à une génération directe ?**
   → Parce qu'il insère un artefact **lisible par le métier** entre l'intention et le code, donc un point de contrôle humain. Résultats mesurés : 95 % de scénarios utiles, 92 % de tests utiles, 60 % utilisables tels quels [S-02].

3. **Que signifie « les tests générés couvrent les exigences sans satisfaire les critères d'adéquation » ?**
   → Que chaque exigence a un test — la matrice de traçabilité est complète — mais que rien ne garantit que ce test soit suffisant pour détecter un défaut [S-05]. Traçabilité ≠ qualité.

4. **Quelle technique de conception détecte une contradiction dans la spécification, et pourquoi les deux autres ne le peuvent pas ?**
   → La **table de décision**, parce qu'elle met les combinaisons de conditions en regard des actions ; deux colonnes identiques en conditions et divergentes en actions révèlent le conflit. Les classes d'équivalence et les valeurs limites travaillent sur une variable à la fois.

5. **Citez trois des huit points de la grille de revue d'un cas de test généré.**
   → D'où vient la valeur attendue ? Quelle exigence est tracée ? Quelle technique de conception a été appliquée ? Le test peut-il échouer ? Les assertions sont-elles messagées ? Les valeurs sont-elles justifiées ? Le test est-il isolé et rejouable ? Que coûte un changement d'exigence ?

### 4.3 Ce qu'on retient

- **La qualité de sortie est proportionnelle à la qualité de l'entrée** : 0,81 contre 0,37 de macro-recall, même modèle [S-01].
- **Séparer analyser de générer.** L'IA est excellente en extraction, médiocre en complétion honnête : lui interdire d'inventer transforme sa faiblesse en instrument de mesure.
- **Le livrable de valeur est le diff**, pas le fichier généré. C'est la preuve de la revue humaine.
- **Nommer la technique de conception dans le prompt** — classes d'équivalence, valeurs limites, table de décision — double le nombre de cas aux bornes.
- **Un LLM ne signale pas une contradiction dans son entrée** ; il produit une sortie cohérente à partir d'une base incohérente. La table de décision est le seul instrument qui la révèle.

### 4.4 Transition vers M3

> Vous avez des exigences, des scénarios revus, et deux questions embarrassantes pour le métier. Il vous manque de quoi les exécuter : **des données**. Or celles de production sont interdites, celles que l'IA invente ne sont pas reproductibles, et personne ne sait encore si vos tests vérifient quoi que ce soit. M3 s'attaque aux trois — puis le Boss J1 vous demandera de tout rassembler avant 17 h.

---

## 5. Sources

### Sources de la notion N1 — Des exigences aux cas de test

[S-01] **Generating High-Level Test Cases from Requirements using LLM: An Industry Study** — https://arxiv.org/abs/2510.03641 — *papier arXiv, 2025* — **macro-recall 0,81** (exigences Bluetooth) contre **0,37** (Mozilla) : la qualité rédactionnelle de la base de test produit un facteur 2,2 à modèle constant.

[S-02] **Acceptance Test Generation with Large Language Models: An Industrial Case Study** — https://arxiv.org/abs/2504.07244 — *papier arXiv (IEEE AST 2025), 2025* — pipeline en deux étapes user story → Gherkin → Cypress ; **95 %** des scénarios jugés utiles, **92 %** des tests utiles dont **60 % utilisables tels quels**.

[S-03] **Enhancing Large Language Models for Text-to-Testcase Generation** — https://arxiv.org/abs/2402.11910 — *papier arXiv, 2024* — un GPT-3.5 fine-tuné génère **7 000 cas de test** sur 5 projets open source avec **78,5 %** de correction syntaxique et **61,7 %** de couverture.

[S-04] **APITestGenie: Generating Web API Tests from Requirements and API Specifications with LLMs** — https://arxiv.org/abs/2604.02039 — *papier arXiv, 2026* — exigences + OpenAPI → tests d'intégration : **89 % des exigences produisent un script valide en ≤ 3 tentatives**.

[S-05] **Test Case Generation for Requirements in Natural Language — An LLM Comparison Study** — https://dl.acm.org/doi/10.1145/3717383.3717389 — *papier ACM, 2025* — les tests générés **couvrent généralement les exigences mais ne satisfont pas toujours les critères d'adéquation de test** : la traçabilité n'est pas la qualité.

[S-06] **TraceLLM: leveraging large language models with prompt engineering for enhanced requirements traceability** — https://link.springer.com/article/10.1007/s00766-026-00460-1 — *article de revue (Requirements Engineering, Springer), 2026* — traçabilité exigences ↔ artefacts évaluée sur **8 LLM et 4 jeux de données**, scores F2 à l'état de l'art.

[S-07] **OpenAPI Specification (OAS)** — https://spec.openapis.org/oas/latest.html — *spécification officielle, 2026* — format d'entrée structuré canonique pour la génération de tests d'API par LLM : types, bornes et codes de statut y constituent un oracle explicite.

[S-08] **AI Test Case Generation — Xray Cloud Documentation** — https://docs.getxray.app/space/XRAYCLOUD/392921171/AI+Test+Case+Generation — *doc officielle éditeur, 2025-2026* — génère des tests manuels ou Cucumber/BDD depuis les exigences Jira, avec une étape **« Review, Edit & Select » obligatoire** dans le flux produit.

[S-09] **ISTQB Certified Tester Foundation Level (CTFL) Syllabus v4.0.1** — https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf — *syllabus officiel PDF, 2023 rév. 2024* — **14 Business Outcomes, 64 Learning Objectives, 6 chapitres** ; définit base de test, condition de test et cas de test, socle de toute la notion.

[S-10] **ISTQB Glossary — « test oracle »** — https://glossary.istqb.org/en_US/term/oracle — *glossaire normatif officiel, 2026* — *« a source to determine expected results […] but should not be the code »* : justifie que la génération depuis les exigences soit le seul mode capable de détecter un défaut.

[S-11] **ISO/IEC/IEEE 29119-3 — Software testing — Part 3: Test documentation** — https://www.iso.org/standard/79429.html — *norme internationale, 2021* — gabarits normatifs de la spécification de conception des tests, de la spécification des cas de test et de la matrice de traçabilité.

[S-12] **Behaviour Driven Development Scenario Generation with Large Language Models** — https://arxiv.org/abs/2603.04729 — *papier arXiv, 2026* — sur **500 user stories** : des descriptions d'exigences détaillées produisent des scénarios de haute qualité, des user stories seules produisent des scénarios de faible qualité.

### Sources de la notion N2 — Génération de scénarios BDD / Gherkin

[S-13] **Streamlining Acceptance Test Generation for Mobile Applications Through LLMs (AToMIC)** — https://arxiv.org/abs/2510.18861 — *papier arXiv, 2025* — déployé chez **BMW** : **93,3 %** des scénarios Gherkin syntaxiquement corrects dès la génération, **100 %** des tests UI générés exécutés avec succès.

[S-12] **Behaviour Driven Development Scenario Generation with Large Language Models** — https://arxiv.org/abs/2603.04729 — *papier arXiv, 2026* — **500 user stories** analysées ; **température 0 / top_p 1.0** donnent les meilleurs résultats, mais la richesse de la description d'exigence reste le facteur dominant.

[S-14] **From Law to Gherkin: A Human-Centred Quasi-Experiment** — https://arxiv.org/abs/2508.20744 — *papier arXiv, 2025* — **120 spécifications Gherkin** générées depuis du texte de loi : pertinence **95 %**, clarté **100 %**, complétude **94,2 %** — avec omissions et hallucinations persistantes.

[S-02] **Acceptance Test Generation with Large Language Models: An Industrial Case Study** — https://arxiv.org/abs/2504.07244 — *papier arXiv (IEEE AST 2025), 2025* — établit la supériorité du pipeline en **deux étapes** (user story → Gherkin → Cypress), qui insère un artefact lisible par le métier avant le code.

[S-15] **Gherkin Reference — Documentation officielle Cucumber** — https://cucumber.io/docs/gherkin/reference/ — *doc officielle, 2026* — référence normative du format : `Feature`, `Rule`, `Background`, `Scenario Outline`, `Examples`, data tables, doc strings ; base de la validation syntaxique par machine.

[S-16] **Reqnroll Documentation** — https://docs.reqnroll.net/latest/ — *doc officielle, 2026* — portage .NET de Cucumber basé sur le code SpecFlow, compatible .NET Framework 4.6.2 → .NET 8.0+, avec guide de migration SpecFlow → Reqnroll.

[S-17] **Reporting | Cucumber** — https://cucumber.io/docs/cucumber/reporting/ — *doc officielle, 2026* — formatters `message / progress / pretty / html / json / junit / testng` : sorties structurées exploitables comme entrée d'un agent de synthèse.

[S-18] **Allure Report Documentation** — https://allurereport.org/docs/ — *doc officielle, 2026* — **30+ intégrations** de frameworks (JUnit, pytest, Cucumber, Playwright…), avec Quality Gate et analyse de stabilité.

[S-08] **AI Test Case Generation — Xray Cloud Documentation** — https://docs.getxray.app/space/XRAYCLOUD/392921171/AI+Test+Case+Generation — *doc officielle éditeur, 2025-2026* — génération de tests Cucumber/BDD depuis Jira ; l'étape de revue est intégrée au produit, ce qui vaut aveu éditeur sur la non-livrabilité directe.

[S-04] **APITestGenie: Generating Web API Tests from Requirements and API Specifications with LLMs** — https://arxiv.org/abs/2604.02039 — *papier arXiv, 2026* — **89 %** de scripts valides en ≤ 3 tentatives lorsque la base de test combine exigences et spécification machine.

[S-07] **OpenAPI Specification (OAS)** — https://spec.openapis.org/oas/latest.html — *spécification officielle, 2026* — alternative structurée au Gherkin lorsque la cible est une API : contrat typé, versionné, contenant les codes de statut attendus.

[S-11] **ISO/IEC/IEEE 29119-3 — Software testing — Part 3: Test documentation** — https://www.iso.org/standard/79429.html — *norme internationale, 2021* — situe le scénario Gherkin comme une forme de spécification de cas de test, avec les exigences documentaires associées.

### Sources de la notion N3 — Techniques de conception de test et revue humaine

[S-09] **ISTQB Certified Tester Foundation Level (CTFL) Syllabus v4.0.1** — https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf — *syllabus officiel PDF, 2023 rév. 2024* — définit le partitionnement en classes d'équivalence, l'analyse des valeurs limites et les tables de décision : le vocabulaire à injecter littéralement dans le prompt.

[S-19] **ISTQB Certified Tester AI Testing (CT-AI) Syllabus v2.0** — https://istqb.org/wp-content/uploads/2026/05/ISTQB-_CTAI_Syllabus_v2.0_Release.pdf — *syllabus officiel PDF, 2026 (GA)* — **7 chapitres examinables, minimum 19,5 h** de formation accréditée ; fournit le vocabulaire d'évaluation d'une sortie de modèle génératif.

[S-20] **ISTQB CT-AI v2.0 — page de certification** — https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/ — *référentiel officiel, 2026* — chapitre « Testing Generative AI and Large Language Models » ; examen de **40 questions, score de passage 29/44**.

[S-10] **ISTQB Glossary — « test oracle »** — https://glossary.istqb.org/en_US/term/oracle — *glossaire normatif officiel, 2026* — *« a source to determine expected results […] but should not be the code »* : point n°1 de la grille de revue en 8 points.

[S-21] **ISTQB Glossary — « test automation »** — https://glossary.istqb.org/en_US/term/test-automation-2-2 — *glossaire normatif officiel, 2026* — *« the use of software to perform or support test activities, e.g. test management, test design, test execution and results checking »* : la conception de test fait explicitement partie du périmètre automatisable.

[S-22] **Introduction — Google Engineering Practices (Code Review)** — https://google.github.io/eng-practices/review/ — *doc officielle Google, 2026* — **8 critères de revue** (Design, Functionality, Complexity, **Tests**, Naming, Comments, Style, Documentation), transposables tels quels à une sortie d'IA.

[S-23] **Test smells in LLM-Generated Unit Tests** — https://arxiv.org/abs/2410.10628 — *papier arXiv, 2024* — **20 505 suites de tests** générées analysées ; smells systématiques de type **Assertion Roulette** et **Magic Number Test**, précisément ce que les techniques de conception éliminent.

[S-24] **Quality Assessment of Python Tests Generated by Large Language Models** — https://arxiv.org/abs/2506.14297 — *papier arXiv (EASE 2025), 2025* — les **erreurs d'assertion représentent 64 %** de toutes les erreurs ; le **manque de cohésion est le smell le plus fréquent (41 %)**.

[S-25] **Design choices made by LLM-based test generators prevent them from finding bugs** — https://arxiv.org/abs/2412.14137 — *papier arXiv, 2024* — les générateurs appliqués à du code bogué **valident le bug au lieu de le détecter** : justifie le point n°1 et le point n°4 de la grille de revue.

[S-26] **The Oracle Gap: Comparing Coverage and Mutation Score** — https://arxiv.org/abs/2309.02395 — *papier arXiv, 2023* — introduit l'**« oracle gap »** : une forte couverture coexiste couramment avec des oracles faibles.

[S-27] **Code Coverage Best Practices (Google Testing Blog)** — https://testing.googleblog.com/2020/08/code-coverage-best-practices.html — *blog officiel Google, 2020* — seuils **60 % acceptable / 75 % louable / 90 % exemplaire**, assortis d'une mise en garde contre la **« mentalité de case à cocher »**.

[S-08] **AI Test Case Generation — Xray Cloud Documentation** — https://docs.getxray.app/space/XRAYCLOUD/392921171/AI+Test+Case+Generation — *doc officielle éditeur, 2025-2026* — étape **« Review, Edit & Select » obligatoire** : la revue humaine est un composant du produit, pas une bonne pratique facultative.

[S-05] **Test Case Generation for Requirements in Natural Language — An LLM Comparison Study** — https://dl.acm.org/doi/10.1145/3717383.3717389 — *papier ACM, 2025* — les tests générés ne satisfont pas toujours les **critères d'adéquation de test**, ce qui fonde la nécessité d'imposer explicitement une technique de conception.
