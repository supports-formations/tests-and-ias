# Annexe A — Glossaire

**Formation « Test logiciel avec IA générative »** — Human Coders · Evan BOISSONNOT
**Version 1.0 — juillet 2026** · 118 entrées

---

## Comment lire ce glossaire

| Pastille | Famille | Origine du vocabulaire |
|---|---|---|
| 🧪 | **Test logiciel** | Glossaire ISTQB, ISO/IEC/IEEE 29119, ISO/IEC 25010, pratique de l'ingénierie de test |
| 🤖 | **IA générative** | Documentation des éditeurs de modèles, recherche académique, référentiels OWASP GenAI et NIST |
| 🔧 | **Outillage** | Documentation officielle des outils, frameworks et normes techniques utilisés en TP |

**Colonne « Module »** : le module où la notion est **enseignée** (pas seulement mentionnée).
Une notion traitée dans plusieurs modules porte le module principal en gras.

> ⚠️ Les définitions marquées **« À jour au 07/2026 »** corrigent une idée reçue encore répandue
> dans la littérature de formation. Elles sont listées en annexe D, section « Fraîcheur des sources ».

---

## A

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🤖 | **Agent** *(agent)* | Système qui, à partir d'un objectif, boucle sur *rassembler du contexte → agir → vérifier son travail → recommencer*, en choisissant lui-même la séquence d'actions. Se distingue d'un **workflow** (chemin déterministe) et d'un **script** (aucune décision). | **M6**, M5 |
| 🤖 | **Agentic (OWASP Top 10 for Agentic Applications)** | Référentiel OWASP de décembre 2025 listant les risques propres aux applications agentiques. ⚠️ **À jour au 07/2026** : c'est une liste **distincte** du Top 10 LLM 2025 ; il n'existe pas d'édition 2026 du Top 10 LLM. | **M11**, M6 |
| 🧪 | **Analyse de la cause racine** *(root cause analysis, RCA)* | Démarche visant à identifier la cause première d'un échec plutôt que son symptôme. En test augmenté par IA, elle exige une **commande de reproduction**, pas une narration du modèle. | **M7** |
| 🔧 | **Allure Report** | Générateur de rapports de test multi-frameworks (30+ intégrations), avec quality gate et analyse de stabilité. Format d'entrée exploitable par un agent de synthèse. | M3 |
| 🧪 | **Anomalie / défaut** *(defect, bug)* | Imperfection d'un composant pouvant provoquer une défaillance. À distinguer de la **défaillance** (le comportement observé) et de l'**erreur** (l'action humaine à l'origine). | M0, M7 |
| 🤖 | **Anonymisation** *(anonymisation)* | Traitement **irréversible** rendant impossible la réidentification d'une personne. Fait sortir la donnée du champ du RGPD. ⚠️ Se distingue de la **pseudonymisation**, qui est réversible et ne fait pas sortir du RGPD. | **M11**, M3 |
| 🧪 | **APFD** *(Average Percentage of Faults Detected)* | Métrique comparant deux ordonnancements de tests : elle mesure à quel point les défauts sont détectés **tôt** dans l'exécution. Se calcule à partir du rang du premier test révélant chaque défaut. | **M12** |
| 🔧 | **Arbre d'accessibilité** *(accessibility tree)* | Représentation structurée de la page exposée par le navigateur aux technologies d'assistance. Un snapshot coûte **200 à 400 tokens** contre des milliers pour une capture d'écran — c'est ce qui rend les agents de test E2E économiquement viables. | **M5**, M9 |
| 🧪 | **Assertion Roulette** | Défaut de test (*test smell*) : plusieurs assertions dans un même test, sans message explicatif, si bien qu'un échec ne dit pas laquelle a cassé. Défaut systématique des suites générées par LLM. | M2, M3 |
| 🔧 | **ASVS** *(Application Security Verification Standard)* | Référentiel OWASP d'exigences de sécurité applicative vérifiables, en v5.0.0 depuis mai 2025. Chaque exigence porte un identifiant citable de la forme `v5.0.0-x.y.z`. | **M9**, M11 |
| 🔧 | **axe-core** | Moteur open source d'analyse d'accessibilité, intégrable via `@axe-core/playwright`. ⚠️ Il détecte environ **57 % des problèmes** et son catalogue ne comporte qu'**une seule règle** WCAG 2.2 : « axe vert » ≠ « conforme ». | **M9** |

---

## B

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🤖 | **Batch API** *(batch processing)* | Mode d'appel asynchrone d'un modèle offrant une remise de **−50 %** sur les tokens d'entrée et de sortie, cumulable avec le prompt caching. Expiration typique à 24 h. | M4, M8 |
| 🧪 | **BDD** *(Behaviour Driven Development)* | Approche où les comportements attendus sont exprimés en langage structuré (Gherkin) partagé entre métier et technique, puis reliés à du code exécutable. | **M2** |
| 🔧 | **Bogus** | Générateur de données factices .NET (portage de Faker). Sa **graine** (`seed`) garantit la reproductibilité du jeu de test. | **M3** |
| 🧪 | **Boss (de journée)** | Épreuve intégrative de fin de journée dans le fil rouge, notée sur un barème public : *Le Cahier des Charges Fantôme* (J1), *L'Agent Zéro* (J2), *Le Pipeline Rouge* (J3), *Le Comité de Go/No-Go* (J4). | M3, M6, M9, M12 |
| 🧪 | **Bug planté** *(seeded defect)* | Défaut délibérément introduit dans le dépôt SkyRetail pour servir d'oracle au formateur. Il y en a **9**, de BUG-101 à BUG-402. | Fil rouge |

---

## C

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🤖 | **Chain-of-thought** *(CoT)* | Technique de prompting consistant à demander au modèle d'expliciter son raisonnement avant de conclure. Effet mesuré et massif sur les tâches de raisonnement ; effet marginal sur les tâches de restitution. | **M4** |
| 🔧 | **`CLAUDE.md`** | Fichier de mémoire projet lu au démarrage de la session d'agent : conventions, commandes, interdictions. Cible **sous 200 lignes**, imports `@chemin` avec profondeur maximale de 4 sauts. ⚠️ **À jour au 07/2026** : Claude Code lit `CLAUDE.md`, **pas `AGENTS.md`** — passer par un import. | **M4**, M5, M6 |
| 🧪 | **Classe d'équivalence** *(equivalence partitioning)* | Technique de conception de test : partitionner le domaine d'entrée en classes dont les membres sont supposés traités identiquement, puis tester un représentant par classe, valide **et** invalide. | **M2** |
| 🤖 | **Compaction** | Mécanisme de résumé automatique de l'historique de conversation lorsque la fenêtre de contexte se remplit. ⚠️ **À jour au 07/2026** : aucun pourcentage de déclenchement générique n'est documenté ; la seule valeur officielle connue est un seuil ≈ 967 K tokens sur une fenêtre de 1 M. | **M4** |
| 🧪 | **Contexte (fenêtre de)** *(context window)* | Quantité maximale de tokens qu'un modèle peut traiter en une requête. La performance **se dégrade avant** la saturation : c'est le phénomène de *context rot*. | **M4** |
| 🧪 | **Contre-Test** | Rituel du fil rouge : après chaque exercice difficile, un squad adverse dispose de 5 minutes pour faire échouer la solution livrée. +20/−10 QAC si réussi, +10 au défenseur sinon. | Fil rouge |
| 🧪 | **Couverture de code** *(code coverage)* | Pourcentage de lignes, de branches ou de chemins **exécutés** par la suite de tests. Mesure l'exécution, **jamais la vérification** — d'où l'écart avec le score de mutation. | **M3**, M12 |
| 🔧 | **Coverlet** | Collecteur de couverture .NET, équivalent fonctionnel de JaCoCo côté Java. Produit du Cobertura/OpenCover exploitable en CI. | M3, M8 |
| 🧪 | **CT-AI** *(Certified Tester AI Testing)* | Certification ISTQB portant sur le test **des** systèmes d'IA. Syllabus v2.0 en disponibilité générale depuis 2026 ; examen de 40 questions, score de passage 29/44 ; prérequis CTFL. | M11 |
| 🧪 | **CT-GenAI** *(Testing with Generative AI)* | Certification ISTQB de niveau spécialiste portant sur le test **avec** l'IA générative. ⚠️ **À ne pas confondre avec CT-AI** : ce sont deux périmètres opposés. | M11 |
| 🧪 | **CTFL** *(Certified Tester Foundation Level)* | Syllabus fondamental ISTQB (v4.0.1) : 6 chapitres, 64 objectifs d'apprentissage. Socle du vocabulaire normatif utilisé dans tout ce support. | M1 |

---

## D

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🔧 | **DAST** *(Dynamic Application Security Testing)* | Test de sécurité par sollicitation de l'application **en cours d'exécution** (boîte noire). Outil de référence en TP : OWASP ZAP en mode Automation Framework. | **M9** |
| 🤖 | **Data drift** | Évolution de la distribution des données d'entrée dans le temps, dégradant les performances d'un modèle sans que le modèle ait changé. À distinguer du **model drift**. | **M10** |
| 🤖 | **Dérive de modèle** *(model drift)* | Évolution du comportement d'un service de modèle à identifiant apparent constant. Chiffre de référence : une exactitude passée de **84 % à 51 %** sur la même tâche en trois mois. Impose un rejeu périodique du jeu d'évals. | **M10**, M12 |
| 🧪 | **Dette Technique (DT)** | Système de malus du fil rouge : test tautologique livré (−30), sélecteur halluciné (−30), secret commité (−50), test mis en `[Skip]` pour verdir la CI (−40), couverture augmentée sans assertion (−25). | Fil rouge |
| 🤖 | **Dépréciation / retrait de modèle** *(deprecation / retirement)* | Cycle de fin de vie d'une version de modèle. ⚠️ **À jour au 07/2026 — inversion de vocabulaire** : chez un fournisseur, `Deprecating` signifie « déprécié » et `Deprecated` signifie « retiré » — l'inverse d'un autre. Un test de garde multi-fournisseurs doit en tenir compte. | **M10** |
| 🔧 | **DORA (métriques)** | Cadre de mesure de la performance de livraison logicielle. ⚠️ **À jour au 07/2026** : elles sont **cinq**, pas quatre — *change lead time*, *deployment frequency*, *failed deployment recovery time*, *change fail rate* et **deployment rework rate**. | **M12** |
| 🔧 | **DORA (règlement UE 2022/2554)** | Règlement sur la résilience opérationnelle numérique du secteur financier, applicable depuis le 17 janvier 2025. Homonyme total des métriques ci-dessus : préciser lequel on cite. | M11 |
| 🤖 | **DPA** *(Data Processing Addendum)* | Contrat de sous-traitance au sens de l'article 28 du RGPD, signé avec le fournisseur de modèle. C'est le document à lire, pas la page marketing. | **M11** |
| 🔧 | **Drain** | Algorithme de parsing de logs en ligne à arbre de profondeur fixe, référence du domaine (F-mesure 0,99 sur HDFS). Alternative déterministe et gratuite à un LLM pour clusteriser des messages d'échec. | **M7** |

---

## E

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🔧 | **EAA** *(European Accessibility Act)* | Directive (UE) 2019/882 étendant les obligations d'accessibilité à des services du secteur privé, dont le commerce électronique. C'est le texte qui rend l'accessibilité opposable à SkyRetail. | **M9** |
| 🤖 | **Eval** *(evaluation)* | Jeu de cas de test appliqué à un prompt ou à un agent, avec des critères d'acceptation chiffrés et reproductibles. Un eval sans **assertion déterministe** n'est pas un eval, c'est une impression. | **M10**, M4 |
| 🧪 | **Exigence** *(requirement)* | Énoncé d'un besoin ou d'une contrainte, numéroté et traçable. En M2, chaque exigence extraite du cahier des charges est qualifiée **testable / non testable en l'état**, avec la question à poser au métier. | **M2** |

---

## F

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🔧 | **fast-check** | Bibliothèque de property-based testing pour TypeScript/JavaScript, équivalent de QuickCheck. A permis de détecter des défauts dans des projets majeurs de l'écosystème JS. | M3 |
| 🤖 | **Few-shot** | Technique consistant à fournir des exemples dans le prompt pour fixer un format ou une taxonomie. Règle pratique en QA : **un exemple** pour fixer un style, **trois à cinq** pour fixer une taxonomie de cas. Au-delà, le modèle clone les exemples. | **M4** |
| 🧪 | **Fil rouge** | Dispositif narratif liant tous les modules : *QA Rescue Mission — Opération SkyRetail*. Chaque exercice s'ancre sur les 4 features F1 à F4 et les 9 bugs plantés. | Tous |
| 🧪 | **Flakiness / test flaky** *(flaky test)* | Test produisant des **résultats différents sur le même code**, sans modification. À ne jamais confondre avec un test qui échoue systématiquement — cette confusion envoie de vrais défauts en quarantaine. Repère industriel : environ **16 %** des tests d'un grand dépôt présentent un comportement flaky. | **M7**, M8 |
| 🔧 | **FluentAssertions** | Bibliothèque d'assertions expressives pour .NET, utilisée dans tous les exemples back-end du support. | M1 à M12 |
| 🔧 | **FsCheck** | Bibliothèque de property-based testing pour .NET, intégrée à xUnit via `FsCheck.Xunit`. C'est elle qui trouve BUG-102 en quelques secondes en M3. | **M3** |
| 🧪 | **Fuzzing** | Technique consistant à soumettre des entrées aléatoires ou malformées pour provoquer des défaillances. Le fuzzing **assisté par LLM** génère les harnais ; il a permis de découvrir des vulnérabilités anciennes dans des bibliothèques largement déployées. | **M3**, M9 |

---

## G

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🧪 | **Garde-fou** *(guardrail)* | Contrainte technique **non contournable par le prompt** encadrant un agent : hook bloquant, liste `deny` de permissions, sandbox réseau, porte de validation humaine. Une consigne dans un fichier de contexte n'est pas un garde-fou. | **M6**, M11 |
| 🔧 | **Gherkin** | Langage structuré de description de scénarios (`Feature`, `Rule`, `Given/When/Then`, `Background`, `Scenario Outline`, tables de données). Se valide syntaxiquement avec `npx @cucumber/gherkin-utils`. | **M2** |
| 🧪 | **Golden Oracle** | Trophée remis au squad ayant le score final le plus élevé. Le nom rappelle que la compétence évaluée est la qualité de l'oracle, pas le volume produit. | M12 |
| 🧪 | **Graine** *(seed)* | Valeur initialisant un générateur pseudo-aléatoire. Une graine **constante et versionnée** rend un jeu de données de test reproductible ; sans elle, deux participants ne testent pas la même chose. | **M3** |

---

## H

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🤖 | **Hallucination** | Production par un modèle d'un contenu plausible mais faux. La taxonomie usuelle distingue les hallucinations **factuelles** (le contenu contredit le réel) et **de fidélité** (le contenu contredit la source fournie). Les techniques d'atténuation les réduisent, elles ne les éliminent pas. | **M1**, M3 |
| 🔧 | **Headless (mode)** | Exécution non interactive d'un agent, pilotée par une commande unique et produisant une sortie machine-lisible (`--output-format json`, champ `total_cost_usd`). C'est le mode d'exécution en CI. | **M8**, M5 |
| 🔧 | **Hook** | Script déclenché par un événement de la boucle d'agent (`PreToolUse`, `PostToolUse`, `Stop`…). ⚠️ **Seul le code de sortie 2 bloque** ; le code 1 est une erreur non bloquante. Limite documentée : le hook `Stop` est outrepassé après **8 blocages consécutifs**. | **M6**, M5 |

---

## I

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🧪 | **Idempotence** | Propriété d'une opération dont l'exécution répétée produit le même effet qu'une exécution unique. Son absence est la cause de BUG-201 : un double-clic sur « Valider » crée deux commandes. | **M6**, M7 |
| 🔧 | **ISO/IEC 25010:2023** | Modèle de qualité produit de la série SQuaRE. ⚠️ **À jour au 07/2026** : l'édition 2011 et ses 8 caractéristiques sont **retirées** depuis le 4 mars 2024 ; l'édition en vigueur en compte 9. | M11 |
| 🔧 | **ISO/IEC 42001:2023** | Première norme **certifiable** de système de management de l'intelligence artificielle. ⚠️ Elle ne confère **pas** la conformité à l'AI Act : elle organise la gouvernance, elle ne remplit pas les obligations réglementaires. | **M11** |
| 🔧 | **ISO/IEC/IEEE 29119** | Série normative sur le test logiciel : concepts (partie 1), processus (partie 2), **documentation (partie 3)**. La partie 11 sur le test des systèmes fondés sur l'IA est un **rapport technique**, pas une norme. | M3, M11 |
| 🧪 | **ISTQB** | *International Software Testing Qualifications Board* — organisme de référence du vocabulaire et de la certification en test logiciel. Son glossaire est la source normative utilisée dans tout ce support. Relais francophone : le CFTL. | M1 |

---

## J

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🔧 | **JUnit XML** | Format d'échange de résultats de test, produit par la plupart des runners (`--reporter=junit` côté Playwright, `--logger:trx`/adaptateurs côté .NET). Entrée canonique d'un agent de synthèse ou de diagnostic. | **M7**, M3 |
| 🤖 | **Juge LLM** *(LLM-as-a-judge)* | Usage d'un modèle pour noter la sortie d'un autre. Trois biais documentés à neutraliser : **position** (l'ordre des candidats compte), **verbosité** (le plus long gagne), **auto-préférence** (un modèle se préfère lui-même). Contre-mesures : permutation, contrôle de longueur, juge différent du modèle sous test. | **M10** |

---

## K

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🔧 | **k6** | Outil de test de charge scriptable en TypeScript, avec `thresholds` exploitables en quality gate. ⚠️ **À jour au 07/2026** : la documentation a migré vers `grafana.com/docs/k6/latest/` et l'outil est passé en v2.x — les scripts générés à partir de tutoriels v0.4x utilisent des options obsolètes. | **M9** |
| 🔧 | **Kirkpatrick (modèle de)** | Référentiel d'évaluation de la formation en 4 niveaux : réaction, apprentissage, comportement, résultats. Cadre des questionnaires à chaud (niveaux 1-2) et à froid (niveaux 3-4) de l'annexe C. | Annexe C |

---

## L

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🔧 | **Lighthouse** | Outil d'audit Google (performance, accessibilité, SEO). ⚠️ Un score d'accessibilité de 100 **ne vaut pas conformité** : les audits manuels sont exclus du calcul du score. | M9 |
| 🤖 | **LLM** *(Large Language Model)* | Modèle de langage de grande taille, entraîné à prédire du texte, et utilisé ici comme **producteur** d'artefacts de test — jamais comme **oracle**. | **M1** |
| 🔧 | **Locator** | Expression désignant un élément d'interface dans un test E2E. Hiérarchie de robustesse : **rôle accessible + nom** > `data-testid` > texte > CSS > XPath positionnel. Les sélecteurs CSS/XPath longs sont qualifiés de mauvaise pratique par la documentation officielle. | **M5**, M7 |
| 🤖 | **Lost in the middle** | Dégradation en U de la performance d'un modèle sur un contexte long : l'information placée au **milieu** du prompt est moins bien exploitée que celle placée au début ou à la fin. Conséquence pratique : documents en haut, consigne en bas. | **M4** |

---

## M

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🔧 | **MCP** *(Model Context Protocol)* | Protocole client-serveur sur JSON-RPC standardisant l'accès d'un modèle à des outils et des ressources. Relation **1:1** client↔serveur : un serveur ne voit ni la conversation entière ni les autres serveurs. Gouverné par une fondation neutre depuis décembre 2025. | **M5**, M11 |
| 🧪 | **Modèle ouvert / modèle fermé (charge)** *(open / closed model)* | En **modèle fermé**, un nombre fixe d'utilisateurs virtuels attend la réponse avant de renvoyer : le débit s'auto-régule quand le système ralentit, donc le test ne mesure pas la capacité. En **modèle ouvert**, le taux d'arrivée est imposé indépendamment des réponses. Un test de capacité exige un exécuteur à taux d'arrivée. | **M9** |
| 🤖 | **Moindre privilège** *(least privilege)* | Principe de n'accorder à un agent que les droits strictement nécessaires : outils restreints, système de fichiers borné, réseau sur liste d'autorisation minimale, aucun secret dans l'environnement. | **M11**, M6 |
| 🧪 | **Mutant** | Variante du code de production obtenue en appliquant un opérateur de mutation (inverser un opérateur, changer une constante, supprimer un appel). Un mutant **survivant** désigne exactement ce qu'aucune assertion ne vérifie. | **M3** |
| 🧪 | **Mutation testing / score de mutation** | Technique consistant à générer des mutants et à mesurer le pourcentage tué par la suite de tests. C'est la mesure de la **capacité de détection**, là où la couverture ne mesure que l'exécution. Écart typique observé : 78 % de couverture pour 41 % de score de mutation. | **M3**, M12 |

---

## N

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🔧 | **NBomber** | Outil de test de charge natif .NET, alternative C# à k6 pour les équipes qui veulent rester dans un seul écosystème. | M9 |
| 🔧 | **NIST AI RMF** | Cadre volontaire américain de gestion des risques de l'IA (AI 100-1), complété par un profil dédié à l'IA générative (AI 600-1). Sert de charpente aux grilles de gouvernance quand aucune obligation sectorielle ne s'applique. | M10, M11 |
| 🤖 | **Non-déterminisme** | Propriété d'un service de modèle produisant des sorties différentes à réglages identiques, du fait du parallélisme d'inférence et de l'arithmétique flottante. Chiffres de référence : **80 complétions uniques sur 1 000**, et jusqu'à **15 % de variation d'exactitude**. | **M4**, M8 |

---

## O

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🔧 | **OIDC** *(OpenID Connect)* | Mécanisme d'authentification par jeton éphémère, remplaçant les secrets longue durée en CI. ⚠️ La permission `id-token: write` n'accorde **aucun droit d'écriture** sur le dépôt : elle autorise seulement la demande d'un jeton d'identité. | **M8** |
| 🔧 | **OpenAPI** | Spécification standard de description d'API HTTP. Entrée structurée canonique pour générer des tests d'API et de contrat — c'est le support de la feature F3 (23 endpoints). | M2, M9 |
| 🔧 | **OpenTelemetry GenAI (conventions sémantiques)** | Conventions d'instrumentation des appels de modèles (tokens par bucket, coût, latence, décisions). ⚠️ **À jour au 07/2026** : la page historique des conventions GenAI porte un bandeau de déplacement et n'est plus maintenue ; le dépôt dédié fait foi. Certains attributs sont encore en statut *Development*, donc instables. | **M10** |
| 🧪 | **Oracle de test** *(test oracle)* | *« Une source permettant de déterminer les résultats attendus […] mais qui ne doit pas être le code »* (ISTQB). **Notion centrale de toute la formation** : un LLM qui lit le code ne peut pas tenir lieu d'oracle, puisqu'il en dérive l'attendu. | **M1**, tous |
| 🧪 | **Oracle gap** | Écart entre une forte couverture et des oracles faibles : le code est exécuté, mais rien ne vérifie qu'il fait ce qu'il doit. Se mesure par la différence couverture / score de mutation. | **M1**, M3 |
| 🔧 | **OWASP Top 10:2025** | Édition en vigueur du référentiel de risques applicatifs. ⚠️ **À jour au 07/2026 — la numérotation a changé** : Injection est passée de A03:2021 à **A05:2025**, le SSRF a disparu comme catégorie, et *Software Supply Chain Failures* apparaît en A03:2025. Citer une catégorie sans son millésime ne veut rien dire. | **M9** |
| 🔧 | **OWASP Top 10 for LLM Applications 2025** | Référentiel des dix risques critiques des applications à base de LLM (LLM01 prompt injection → LLM10 consommation non bornée). ⚠️ Il n'existe **pas** d'édition 2026 ; le document de décembre 2025 est celui des applications **agentiques**, qui est distinct. | **M11** |

---

## P

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🧪 | **p95 / p99** | Percentiles de latence : valeur en dessous de laquelle se situent 95 % (resp. 99 %) des réponses. Les distributions de latence n'étant pas gaussiennes, **on pilote sur les percentiles, jamais sur la moyenne**. | **M9** |
| 🔧 | **Pa11y** | Vérificateur d'accessibilité en ligne de commande, avec deux moteurs cumulables (`htmlcs` et `axe`) et un code de sortie exploitable en CI. Le double moteur illustre que deux outils ne trouvent pas les mêmes défauts. | M9 |
| 🤖 | **pass@k** | Métrique d'évaluation de génération de code : probabilité qu'au moins une solution parmi *k* échantillons soit correcte. Introduite avec le benchmark HumanEval. | M1 |
| 🔧 | **`permissions.deny`** | Mécanisme officiel de restriction d'accès aux fichiers d'un agent, dans `.claude/settings.json`. ⚠️ **À jour au 07/2026** : **`.claudeignore` n'existe pas** et `ignorePatterns` est déprécié. Précédence **deny-first**. Depuis la v2.1.210, seules les règles `Edit(path)` et `Read(path)` sont réellement appliquées. | **M4**, M6, M11 |
| 🧪 | **Pilote / Copilote** | Rôles tournants dans un squad : le **Pilote** tient le clavier, le **Copilote** relit chaque sortie d'IA avant exécution ou commit et tient le journal des décisions. Rotation obligatoire à chaque module. | M0, tous |
| 🔧 | **Plan mode** | Mode d'agent produisant un plan d'action avant toute écriture. Utilisé en M5 pour faire produire une stratégie de test avant tout code. | M5 |
| 🔧 | **Playwright** | Framework de test E2E multi-navigateurs. Éléments clés du support : hiérarchie de locators, *trace viewer*, sharding, `toHaveScreenshot`, `@axe-core/playwright`, et l'agent `healer` natif. | **M5**, M7, M9 |
| 🔧 | **Playwright MCP** | Serveur MCP exposant le navigateur via l'**arbre d'accessibilité** plutôt que par capture d'écran. C'est l'outil qui supprime le sélecteur halluciné en M5. | **M5** |
| 🧪 | **Predictive test selection** | Sélection des tests à exécuter par un modèle appris sur l'historique des échecs et des modifications. ⚠️ Prérequis absolu : un historique **dé-flaké** — sinon le modèle apprend le bruit. | **M8**, M12 |
| 🧪 | **PRISMA** *(Product RISk MAnagement)* | Méthode de priorisation par les risques à deux axes — probabilité de défaut (technique) × impact métier — répartissant le backlog en quatre quadrants. Base de la matrice du dossier de recette. | **M12** |
| 🤖 | **Prompt** | Artefact textuel **structuré, versionné et évalué**, composé de cinq blocs : rôle, contexte/documents, contraintes, format de sortie, exemples — la tâche venant en dernier. Ce n'est pas un message de chat. | **M4** |
| 🤖 | **Prompt caching** | Mise en cache des préfixes de prompt réutilisés, réduisant massivement le coût d'entrée d'une campagne répétitive. Se cumule avec la remise batch. | M4, M8 |
| 🤖 | **Prompt chaining** | Décomposition d'une tâche en plusieurs prompts courts enchaînés, plutôt qu'un prompt long. Contre-mesure au *prompt-fleuve* et à la dégradation en contexte long. | **M4** |
| 🤖 | **Prompt injection** | Détournement d'un modèle par des instructions insérées dans son contexte. **Directe** : dans l'entrée utilisateur. **Indirecte** : dans un contenu lu par l'agent (fichier, page web, description d'outil, corps de pull request). La défense qui tient est le **moindre privilège**, pas la consigne. | **M11**, M8 |
| 🧪 | **Property-based testing (PBT)** | Écriture de **propriétés** invariantes vérifiées sur des centaines d'entrées générées, avec réduction automatique (*shrinking*) vers le contre-exemple minimal. Une propriété exprime une **relation**, pas un calcul. | **M3** |
| 🤖 | **Pseudonymisation** | Remplacement des identifiants directs par des substituts, **réversible** par recoupement. Les données restent personnelles et restent soumises au RGPD. Confusion la plus fréquente avec l'anonymisation. | **M11** |

---

## Q

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🧪 | **QA Credits (QAC)** | Monnaie du fil rouge : 10 / 20 / 40 / 80 QAC selon la difficulté de l'exercice, 150 par boss de journée, 300 pour le boss final, assortis de malus de Dette Technique. | Fil rouge |
| 🔧 | **Qualiopi** | Marque française attestant la qualité du processus des organismes de formation, adossée au Référentiel National Qualité. ⚠️ Ce n'est pas une certification de la qualité **des contenus** au sens ISO. | Annexe C |
| 🧪 | **Quarantaine** *(quarantine)* | Mise à l'écart temporaire d'un test flaky pour ne pas bloquer la CI. Dangereuse sans **date de sortie et propriétaire** : la quarantaine sans échéance est une suppression déguisée. | **M7** |

---

## R

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🤖 | **RAG** *(Retrieval-Augmented Generation)* | Génération augmentée par récupération : on injecte dans le contexte des extraits pertinents issus d'une base documentaire plutôt que de compter sur la mémoire du modèle. En QA, sert à ancrer les tests sur la spécification. | M4 |
| 🤖 | **ReAct** *(Reasoning + Acting)* | Patron d'agent alternant raisonnement, action et observation. C'est exactement la boucle d'un agent qui lance `dotnet test`, lit la trace d'échec et corrige. | **M6** |
| 🤖 | **Reflexion** | Patron d'agent où l'échec est verbalisé et réinjecté en mémoire épisodique pour la tentative suivante, sans mise à jour des poids. Fondement académique du self-healing de test. | M6 |
| 🔧 | **Reqnroll** | Successeur .NET de SpecFlow (fin de vie annoncée en janvier 2025), portage de Cucumber pour lier les scénarios Gherkin à du code C#. ⚠️ Un support recommandant encore SpecFlow sur .NET 8+ est périmé. | M2 |
| 🧪 | **Retry** | Relance automatique d'un test échoué. Coût réel documenté : la relance elle-même est quasi gratuite, mais elle **masque** le défaut, alors qu'une investigation manuelle coûte plusieurs dollars. Un `retry` global pour verdir la CI vaut **−60 QAC** au Boss J3. | **M7**, M8 |
| 🔧 | **RGAA 4.1.2** | Référentiel général d'amélioration de l'accessibilité, déclinaison française des WCAG. ⚠️ **À jour au 07/2026** : le RGAA 4.1.2 renvoie encore au **Défenseur des droits** ; le transfert du contrôle à l'Arcom est une évolution annoncée du RGAA 5, pas un fait établi. | **M9** |
| 🔧 | **RGPD** | Règlement (UE) 2016/679. En test augmenté : impose la minimisation, interdit en pratique les données de production dans les environnements de test, et encadre les transferts vers un fournisseur de modèle. | **M11**, M3 |
| 🧪 | **Risk-based testing** | Priorisation des efforts de test par le risque produit. ⚠️ Prérequis souvent oublié : le risque doit être **hétérogène**. Une matrice où toutes les lignes valent la même chose ne priorise rien. | **M12** |

---

## S

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🔧 | **SAST** *(Static Application Security Testing)* | Analyse de sécurité du code source sans exécution. Complémentaire du DAST : le premier voit le code, le second voit le comportement ; aucun des deux ne voit une règle métier comme BUG-401. | **M9** |
| 🔧 | **SCA** *(Software Composition Analysis)* | Analyse des dépendances tierces à la recherche de vulnérabilités connues. C'est la contre-mesure directe de la catégorie *Software Supply Chain Failures*. | M9, M11 |
| 🧪 | **Sélecteur halluciné** | Locator inventé par un modèle et jamais confronté au DOM réel. Symptôme : échec sur timeout de locator, ou pire, test vert sur un élément homonyme. Malus de **−30 QAC** dans le fil rouge. | **M1**, M5 |
| 🧪 | **Self-healing** | Réparation automatique d'un locator cassé, par IA ou par hiérarchie de locators de repli. ⚠️ Acceptable en recette **uniquement** si la réparation est journalisée, revue et bornée : sinon elle masque une régression fonctionnelle réelle. | **M7** |
| 🔧 | **Sharding** | Découpage d'une suite de tests en fragments exécutés en parallèle sur plusieurs runners (`--shard=i/N`), puis fusion des rapports. Levier de réduction de pipeline le moins risqué — à faire **avant** toute sélection de tests. | **M8** |
| 🔧 | **Skill** | Capacité packagée d'un agent : un dossier contenant un `SKILL.md` avec métadonnées et instructions. Divulgation progressive : ~100 tokens de métadonnées au démarrage, corps chargé seulement à l'activation. | **M5**, M6 |
| 🤖 | **Slopsquatting** | Attaque exploitant les **hallucinations de paquets** : un modèle recommande une dépendance inexistante, un attaquant publie ce nom. Ordre de grandeur mesuré : **5,2 %** de paquets inexistants recommandés par les modèles commerciaux, **21,7 %** pour les modèles ouverts. | **M11**, M1 |
| 🧪 | **SLO / error budget** | Objectif de niveau de service et budget d'erreur associé, qui transforme la fiabilité en variable négociable plutôt qu'en absolu. Cadre de lecture des seuils non fonctionnels. | M9 |
| 🧪 | **Snapshot testing** | Comparaison d'une sortie à une référence figée (`Verify` côté .NET, `toHaveScreenshot` côté visuel). Puissant, et dangereux : une référence approuvée sans relecture fige un défaut. | M3, M9 |
| 🧪 | **Squad** | Équipe de 1 à 3 participants dans le fil rouge : 🔮 ORACLE, 🎯 HUNTER, 🛡️ GUARDIAN. Le score est **collectif par squad**. | M0 |
| 🔧 | **Stryker.NET** | Outil de mutation testing pour .NET (plus de 30 opérateurs de mutation, exécution parallélisée). C'est lui qui produit le chiffre de score de mutation du dossier de recette. | **M3**, M12 |
| 🔧 | **Subagent** | Agent secondaire disposant de **sa propre fenêtre de contexte** et d'un outillage restreint. Patron clé en QA : isoler les opérations verbeuses (sortie du runner) dans un sous-agent, ne faire remonter que le résumé. | **M6**, M5 |
| 🔧 | **SWE-bench** | Famille de benchmarks évaluant la capacité d'agents à résoudre de vraies *issues* GitHub. Sa variante **SWT-Bench** évalue spécifiquement la génération de **tests** validant un correctif. | M1 |

---

## T

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🧪 | **Table de décision** *(decision table)* | Technique de conception de test énumérant les combinaisons de conditions et les actions attendues. **Seule technique des trois enseignées capable de révéler une contradiction dans la spécification** — c'est elle qui fait tomber le conflit EX-003 / EX-014. | **M2** |
| 🧪 | **Test tautologique** | Test dont le résultat attendu est dérivé du code testé plutôt que d'une source indépendante. Il passe toujours, y compris sur du code faux : il **fige le défaut** au lieu de le détecter. Anti-pattern fondateur du support, malus de −30 QAC. | **M1**, tous |
| 🤖 | **Temperature** | Paramètre d'échantillonnage d'un modèle. ⚠️ **À jour au 07/2026 — deux points, et le second est bloquant.** (1) `temperature = 0` **ne garantit pas le déterminisme** : le non-déterminisme résiduel vient de l'infrastructure d'inférence (ordre des réductions en virgule flottante, taille de lot, routage), pas de l'échantillonnage. On ne construit donc **jamais** une assertion de test sur l'égalité stricte d'une sortie de modèle. (2) Sur **Claude Opus 4.7 et au-delà**, les paramètres `temperature`, `top_p` et `top_k` **ne sont plus acceptés** : les transmettre renvoie une **erreur 400**. Tout script, harnais d'éval ou wrapper hérité qui les positionne « par précaution » casse à la montée de version — c'est le premier point à vérifier lors d'un changement de modèle. La reproductibilité s'obtient par ailleurs : figer la version exacte du modèle, le prompt et le contexte, puis évaluer sur **k exécutions** (cf. `pass^k`) au lieu d'exiger une sortie unique. | **M4**, M8, M10 |
| 🧪 | **Test double** | Terme générique pour les substituts d'objets réels : *dummy*, *fake*, *stub*, *spy*, *mock*. Le sur-mock est un anti-pattern fondateur : il couple le test à l'implémentation et ne teste plus le comportement. | M1 |
| 🔧 | **Test Impact Analysis (TIA)** | Sélection des tests impactés par une modification. ⚠️ **À jour au 07/2026** : l'implémentation d'Azure DevOps **ne supporte pas .NET Core**, ni les tests pilotés par les données, ni les topologies multi-machines. Inutilisable en l'état sur SkyRetail. | **M8** |
| 🔧 | **Testcontainers** | Bibliothèque démarrant des dépendances réelles éphémères en conteneur (PostgreSQL ici) pour les tests d'intégration. Rend Docker indispensable dès M3. | M3 |
| 🤖 | **Token** | Unité de découpage du texte facturée en entrée et en sortie. ⚠️ **À jour au 07/2026** : les modèles de génération 4.7+ utilisent un tokenizer produisant **~30 % de tokens en plus** pour le même texte — toute estimation de budget antérieure est sous-évaluée d'environ un tiers. | **M4**, M8 |
| 🤖 | **Tool poisoning** | Attaque consistant à cacher des instructions dans la **description** d'un outil MCP. Enseignement central : une description d'outil est du **prompt injecté**, jamais de la documentation inerte. Variantes : *rug pull* (le serveur change après approbation), *tool shadowing*. | **M5**, M11 |
| 🧪 | **Traçabilité** *(traceability)* | Lien explicite et vérifiable entre une exigence, un cas de test et un résultat. Dans le dossier de recette, elle prend la forme du tableau « ce que l'IA a fait / ce que l'humain a validé ». | **M2**, M12 |
| 🔧 | **Trace Playwright** | Enregistrement rejouable d'une exécution (bande d'images, snapshots DOM par action, réseau, console). Matière première du dossier d'échec de M7. Recommandation officielle : `trace: 'on-first-retry'`. | **M7** |

---

## V

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🧪 | **Valeurs limites** *(boundary value analysis)* | Technique de conception testant les frontières des classes d'équivalence (la valeur limite, celle juste en dessous, celle juste au-dessus). C'est la technique que les modèles appliquent le moins spontanément — d'où l'exercice M2-3. | **M2** |
| 🔧 | **Verify** | Bibliothèque de tests d'instantané pour .NET, utile pour figer une sortie complexe (rapport, JSON, rendu) et détecter toute variation. | M3 |
| 🔧 | **Visual AI** | Comparaison visuelle par modèle plutôt que pixel à pixel, tolérante aux variations de rendu non significatives. Alternative aux seuils `toHaveScreenshot` quand le pixel-à-pixel devient ingérable. | M9 |
| 🧪 | **VU** *(virtual user)* | Utilisateur virtuel simulé par un outil de charge. ⚠️ « 200 VUs » **ne prouve rien** sur la capacité d'une API : en modèle fermé, le débit baisse mécaniquement quand le système ralentit. | **M9** |

---

## W

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🧪 | **`waitForTimeout` (anti-pattern)** | Attente fixe insérée pour « corriger » un test instable. Elle ne corrige pas la flakiness, elle corrige la capacité à la voir : sous charge ou en parallèle, l'instabilité revient. Contre-mesure : attendre un **état observable**, pas une durée. | **M7** |
| 🔧 | **WCAG 2.2** | Recommandation W3C de décembre 2024 définissant les critères d'accessibilité du web. Base normative du RGAA et de l'EAA. L'automatisation n'en couvre qu'une part minoritaire. | **M9** |
| 🔧 | **WebApplicationFactory** | Fabrique .NET démarrant l'application en mémoire pour des tests d'intégration proches du réel, sans déploiement. Support des tests d'API de la feature F3. | M2, M9 |

---

## X · Z

| | Terme (anglais) | Définition | Module |
|---|---|---|---|
| 🤖 | **XML (balises de prompt)** | Convention de structuration d'un prompt par balises (`<role>`, `<documents>`, `<constraints>`, `<output_format>`, `<examples>`, `<task>`). Elle rend le prompt lisible, variabilisable et **évaluable**. | **M4** |
| 🔧 | **xUnit v3** | Framework de test .NET utilisé dans tout le support. Le paquet s'appelle `xunit.v3` ; la v2 est en mode maintenance. Apports utiles ici : `Assert.Skip(…)`, tests explicites, `TestContext`. | M1 à M12 |
| 🔧 | **ZAP** *(Zed Attack Proxy)* | Scanner DAST open source de l'OWASP, pilotable en CI par un plan YAML (`openapi`, `activeScan`, `report`). ⚠️ Son code de sortie n'est pas binaire : un `set -e` naïf casse le job. | **M9** |
| 🤖 | **ZDR** *(Zero Data Retention)* | Régime contractuel de non-conservation des données envoyées à un fournisseur de modèle. ⚠️ **À jour au 07/2026 — le mythe à casser** : le ZDR est **endpoint par endpoint**, et les journaux de détection d'abus peuvent être conservés **jusqu'à 30 jours**. « ZDR » ne signifie pas « aucun log ». | **M11** |

---

## Index par famille

| Famille | Nombre d'entrées | Modules les plus concernés |
|---|---|---|
| 🧪 Test logiciel | 44 | M1, M2, M3, M7, M9, M12 |
| 🤖 IA générative | 33 | M1, M4, M6, M10, M11 |
| 🔧 Outillage | 41 | M3, M5, M8, M9 |
| **Total** | **118** | |

## Les dix termes à connaître avant de sortir de la salle

Si un participant ne devait retenir que dix entrées de ce glossaire, ce seraient celles-ci —
ce sont aussi les dix qui reviennent au boss final.

| # | Terme | Pourquoi celui-là |
|---|---|---|
| 1 | **Oracle de test** | C'est l'axe de décision de toute la formation |
| 2 | **Test tautologique** | C'est le défaut n°1 des suites générées |
| 3 | **Score de mutation** | C'est le seul chiffre qui répond à « mes tests servent-ils à quelque chose ? » |
| 4 | **Sélecteur halluciné** | C'est le défaut n°1 des E2E générés |
| 5 | **Flakiness** | C'est ce qui détruit la confiance dans une suite |
| 6 | **Garde-fou** | C'est ce qui distingue un agent d'un générateur de texte |
| 7 | **Non-déterminisme** | C'est ce qui interdit de promettre la reproductibilité |
| 8 | **Dérive de modèle** | C'est la réponse à « qui maintient ça dans six mois ? » |
| 9 | **Pseudonymisation** | C'est l'erreur de qualification la plus coûteuse en conformité |
| 10 | **p95** | C'est le seul chiffre de charge qui ait un sens |

---

*Les sources normatives de ces définitions (glossaire ISTQB, ISO, W3C, OWASP, documentations
éditeurs) sont référencées dans `annexes/annexe-D-bibliographie-complete.md`.*
