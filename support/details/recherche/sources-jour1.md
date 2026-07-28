# Sources vérifiées — JOUR 1 « Test logiciel avec IA générative »

**Date de collecte : juillet 2026 — ~100 sources uniques, toutes vérifiées par récupération directe (HTTP 200 + correspondance titre/contenu).**

---

## NOTION 1 — Panorama des LLM appliqués au test logiciel (15 sources)

### Surveys / états de l'art

**Software Testing With Large Language Models: Survey, Landscape, and Vision**
- URL : https://arxiv.org/abs/2307.07221
- Type : papier arXiv → IEEE Transactions on Software Engineering, vol. 50 n°4
- Année : 2023 (publié TSE 2024)
- Apport : analyse systématique de **102 études** ; identifie génération de cas de test et réparation de programme comme les deux tâches dominantes de la littérature.

**TESTEVAL: Benchmarking Large Language Models for Test Case Generation**
- URL : https://arxiv.org/abs/2406.04531
- Type : papier arXiv (NAACL 2025 Findings)
- Année : 2024
- Apport : **210 programmes Python**, 16 LLM, 3 tâches ; la couverture globale est atteignable, mais cibler une **ligne / branche / chemin précis** reste le point faible net des LLM.

### Benchmarks

**TestGenEval: A Real World Unit Test Generation and Test Completion Benchmark**
- URL : https://arxiv.org/abs/2410.00752
- Type : papier arXiv (Meta AI / FAIR)
- Année : 2024
- Apport : **68 647 tests**, 1 210 paires code/test, 11 dépôts Python réels ; le meilleur modèle (GPT-4o) plafonne à **35,2 % de couverture moyenne**.

**SWT-Bench: Testing and Validating Real-World Bug-Fixes with Code Agents**
- URL : https://arxiv.org/abs/2406.12952
- Type : papier arXiv (NeurIPS 2024)
- Année : 2024
- Apport : les tests générés par LLM, utilisés comme **filtre de validation**, doublent la précision de SWE-Agent pour valider un correctif.

**SWE-bench Multimodal: Do AI Systems Generalize to Visual Software Domains?**
- URL : https://www.swebench.com/multimodal.html (papier : arXiv:2410.03859)
- Type : doc officielle de benchmark + papier ICLR 2025
- Année : 2024-2025
- Apport : **517 issues** contenant captures d'écran, maquettes et diagrammes — évalue le traitement conjoint texte + visuel.

**SWE-Bench Pro: Can AI Agents Solve Long-Horizon Software Engineering Tasks?**
- URL : https://arxiv.org/abs/2509.16941
- Type : papier arXiv
- Année : 2025
- Apport : **1 865 problèmes / 41 dépôts d'entreprise**, conçus anti-contamination ; tâches nécessitant des heures à des jours de travail humain et des patchs multi-fichiers.

**Evaluating Large Language Models Trained on Code (HumanEval / Codex)**
- URL : https://arxiv.org/abs/2107.03374
- Type : papier arXiv (OpenAI)
- Année : 2021 (référence fondatrice)
- Apport : introduit HumanEval (**164 problèmes**) et la métrique **pass@k** ; Codex initial = **28,8 % en pass@1**.

### Études empiriques industrielles

**Automated Unit Test Improvement using Large Language Models at Meta (TestGen-LLM)**
- URL : https://arxiv.org/abs/2402.09171
- Type : papier arXiv (FSE 2024, ACM)
- Année : 2024
- Apport : **le chiffre-clé de la formation** — sur Instagram/Facebook : **75 %** des tests générés compilent, **57 %** passent de façon fiable, **25 %** augmentent la couverture, **73 %** des recommandations acceptées en production.

**Revolutionizing software testing: Introducing LLM-powered bug catchers (Meta ACH)**
- URL : https://engineering.fb.com/2025/02/05/security/revolutionizing-software-testing-llm-powered-bug-catchers-meta-ach/
- Type : blog éditeur (Engineering at Meta) + arXiv:2501.12862
- Année : 2025
- Apport : premier système industriel combinant **génération de mutants ET de tests par LLM**, déployé sur Facebook Feed, Instagram, Messenger, WhatsApp.

**An Empirical Evaluation of Using Large Language Models for Automated Unit Test Generation (TestPilot)**
- URL : https://arxiv.org/abs/2302.06527
- Type : papier arXiv (cs.SE)
- Année : 2023
- Apport : sur **1 684 fonctions API JavaScript**, TestPilot atteint **70,2 % de couverture d'instructions** contre **51,3 %** pour Nessie (technique scriptée feedback-directed).

### Rapports industrie (adoption)

**World Quality Report 2025-26 (Capgemini / Sogeti / OpenText)**
- URL : https://www.capgemini.com/insights/research-library/world-quality-report-2025-26/
- Communiqué chiffré : https://www.capgemini.com/news/press-releases/world-quality-report-2025-ai-adoption-surges-in-quality-engineering-but-enterprise-level-scaling-remains-elusive/
- Type : rapport industrie (17ᵉ édition)
- Année : 2025-2026
- Apport : **~90 %** des organisations poursuivent la GenAI en quality engineering, mais **seulement 15 %** à l'échelle entreprise ; gain de productivité moyen **19 %** ; couverture d'automatisation classique stagnant à **33 %**.

**The 2026 State of Testing Report (PractiTest)**
- URL : https://www.practitest.com/state-of-testing/
- Type : rapport industrie (13ᵉ édition)
- Année : 2026
- Apport : adoption IA en test **76,8 %** (81,7 % en grande entreprise) ; **70 %** l'utilisent pour créer des cas de test mais **seulement 19,9 %** pour l'identification de risques.

**Stack Overflow Developer Survey 2025 — AI**
- URL : https://survey.stackoverflow.co/2025/ai
- Type : enquête industrie (>49 000 répondants)
- Année : 2025
- Apport : **84 %** utilisent ou prévoient d'utiliser l'IA (76 % l'an passé), mais **46 % ne font pas confiance** à l'exactitude des sorties (31 % l'an passé).

**DORA — State of AI-assisted Software Development 2025**
- URL : https://dora.dev/dora-report-2025/
- Type : rapport industrie (Google Cloud, GitHub, GitLab, IT Revolution)
- Année : 2025
- Apport : adoption IA **90 %** (+14 pts) ; l'IA agit en **amplificateur** : **+21 %** de tâches complétées, **+98 %** de PR fusionnées, sans amélioration proportionnelle des métriques de livraison.

**The State of Developer Ecosystem 2025 (JetBrains)**
- URL : https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/
- Type : rapport industrie (24 534 développeurs, 194 pays)
- Année : 2025
- Apport : **85 %** utilisent régulièrement des outils IA, **62 %** au moins un agent/assistant de code ; inquiétude n°1 = **qualité inconstante** du code généré.

**Octoverse 2025 (GitHub)**
- URL : https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/
- Type : rapport officiel GitHub
- Année : 2025
- Apport : **1,1 M+ dépôts publics** utilisent un SDK LLM, dont **693 867 créés en 12 mois** (**+178 %** YoY).

---

## NOTION 2 — IA générative vs automatisation scriptée vs frameworks classiques (17 sources)

### ISTQB (vocabulaire normatif)

**ISTQB Glossary — « test automation »**
- URL : https://glossary.istqb.org/en_US/term/test-automation-2-2
- Type : glossaire normatif officiel
- Année : 2026 (glossaire vivant)
- Apport : définition officielle — *« the use of software to perform or support test activities, e.g. test management, test design, test execution and results checking »*.

**ISTQB Glossary — « test oracle »**
- URL : https://glossary.istqb.org/en_US/term/oracle
- Type : glossaire normatif officiel
- Année : 2026
- Apport : *« a source to determine expected results […] but should not be the code »* → argument central pour expliquer pourquoi un LLM ne peut pas servir d'oracle indépendant.

**ISTQB Certified Tester Foundation Level (CTFL) Syllabus v4.0.1**
- URL : https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf
- Type : syllabus officiel (PDF)
- Année : 2023 (v4.0), révision 2024
- Apport : **14 Business Outcomes, 64 Learning Objectives, 6 chapitres** — socle normatif du vocabulaire de test.

**ISTQB Certified Tester AI Testing (CT-AI) Syllabus v2.0**
- URL : https://istqb.org/wp-content/uploads/2026/05/ISTQB-_CTAI_Syllabus_v2.0_Release.pdf
- Type : syllabus officiel (PDF)
- Année : 2026 (GA)
- Apport : **7 chapitres examinables, minimum 19,5 h de formation accréditée**, prérequis CTFL ; inclut un chapitre dédié au test de l'IA générative et des LLM.

**ISTQB CTAL-TAE (Test Automation Engineering) v2.0**
- URL : https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/
- Type : page officielle de certification
- Année : 2024
- Apport : **40 questions / 66 points, score de passage 43, 90 minutes**, 8 chapitres.

### Playwright (Microsoft)

**Test generator (codegen) | Playwright**
- URL : https://playwright.dev/docs/codegen
- Type : doc officielle éditeur
- Année : 2026
- Apport : le générateur *« prioritise role, text and test id locators »* et désambiguïse automatiquement.

**Locators | Playwright**
- URL : https://playwright.dev/docs/locators
- Type : doc officielle éditeur
- Année : 2026
- Apport : *« Testing by test ids is the most resilient way of testing »* ; les sélecteurs CSS/XPath longs sont qualifiés de **« bad practice that leads to unstable tests »**.

**Playwright Test — Agents (planner / generator / healer)**
- URL : https://playwright.dev/docs/test-agents
- Type : doc officielle éditeur
- Année : 2026
- Apport : 3 agents natifs (planner explore et écrit un plan Markdown, generator produit les `.spec.ts`, healer répare les tests cassés), installés par `npx playwright init-agents`.

**Playwright MCP — Introduction**
- URL : https://playwright.dev/mcp/introduction
- Type : doc officielle éditeur
- Année : 2026
- Apport : **40+ outils** opérant sur l'**arbre d'accessibilité** (pas de pixels) ; un snapshot structuré coûte **~200-400 tokens** contre des milliers pour une capture d'écran.

**microsoft/playwright-mcp (dépôt GitHub officiel)**
- URL : https://github.com/microsoft/playwright-mcp
- Type : dépôt officiel
- Année : 2026
- Apport : installation en une ligne `npx @playwright/mcp@latest`, compatible VS Code / Claude Code / Cursor.

### Cypress

**Cypress best practices**
- URL : https://docs.cypress.io/app/core-concepts/best-practices
- Type : doc officielle éditeur
- Année : 2026
- Apport : recommande les attributs `data-*` (`data-cy`) car ils *« will not change from CSS style or JS behavioral changes »*.

**Cypress AI Skills**
- URL : https://docs.cypress.io/app/tooling/ai-skills
- Type : doc officielle éditeur
- Année : 2026
- Apport : **3 skills IA officiels** (`cypress-author`, `cypress-explain`, `cypress-docs`) ; `cy.prompt()` fait de la résolution d'élément et de l'auto-healing par IA.

### Selenium

**Waiting Strategies | Selenium**
- URL : https://www.selenium.dev/documentation/webdriver/waits/
- Type : doc officielle éditeur
- Année : 2026
- Apport : distingue **implicit wait** et **explicit wait** ; la doc **déconseille explicitement de mélanger les deux**.

**Page object models | Selenium**
- URL : https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/
- Type : doc officielle éditeur
- Année : 2026
- Apport : *« A page object is an object-oriented class that serves as an interface to a page of your AUT »*.

### Anthropic

**Computer use tool — Claude Platform Docs**
- URL : https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool
- Type : doc officielle éditeur
- Année : 2026
- Apport : header bêta requis ; la doc recommande les cas d'usage *« où la vitesse n'est pas critique (par exemple, automated software testing) »*.

### Analyste

**Gartner — Critical Capabilities for AI-Augmented Software Testing Tools**
- URL : https://www.gartner.com/en/documents/7022898
- Type : rapport analyste
- Année : 2025
- Apport : évalue **10 éditeurs** ; **Self-Healing For Test Scripts** et **Manual to Automated Test Conversion** distinguent un outil « AI-augmented » d'un framework scripté.

---

## NOTION 3 — Génération de cas de test à partir de spécifications en langage naturel (14 sources)

**Generating High-Level Test Cases from Requirements using LLM: An Industry Study**
- URL : https://arxiv.org/abs/2510.03641
- Type : papier arXiv
- Année : 2025
- Apport : **macro-recall 0,81** (Bluetooth) vs **0,37** (Mozilla) → dépendance forte à la qualité des exigences.

**Acceptance Test Generation with Large Language Models: An Industrial Case Study**
- URL : https://arxiv.org/abs/2504.07244
- Type : papier arXiv (IEEE AST 2025)
- Année : 2025
- Apport : pipeline 2 étapes (user story → Gherkin, puis Gherkin → Cypress) ; **95 %** des scénarios jugés utiles, **92 %** des tests utiles dont **60 % utilisables tels quels**.

**Behaviour Driven Development Scenario Generation with Large Language Models**
- URL : https://arxiv.org/abs/2603.04729
- Type : papier arXiv
- Année : 2026
- Apport : **500 user stories** ; des descriptions d'exigences détaillées produisent des scénarios de haute qualité, des user stories seules produisent des scénarios de faible qualité ; température 0 / top_p 1.0 = meilleurs résultats.

**From Law to Gherkin: A Human-Centred Quasi-Experiment**
- URL : https://arxiv.org/abs/2508.20744
- Type : papier arXiv
- Année : 2025
- Apport : **120 spécifications Gherkin** générées : pertinence **95 %**, clarté **100 %**, complétude **94,2 %** — mais omissions et hallucinations persistantes.

**Streamlining Acceptance Test Generation for Mobile Applications Through LLMs (AToMIC)**
- URL : https://arxiv.org/abs/2510.18861
- Type : papier arXiv
- Année : 2025
- Apport : déployé chez **BMW** : **93,3 %** des scénarios Gherkin syntaxiquement corrects dès la génération, **100 %** des tests UI générés exécutés avec succès.

**Enhancing Large Language Models for Text-to-Testcase Generation**
- URL : https://arxiv.org/abs/2402.11910
- Type : papier arXiv
- Année : 2024
- Apport : GPT-3.5 fine-tuné génère **7 000 cas de test** sur 5 projets OSS avec **78,5 %** de correction syntaxique et **61,7 %** de couverture.

**APITestGenie: Generating Web API Tests from Requirements and API Specifications with LLMs**
- URL : https://arxiv.org/abs/2604.02039
- Type : papier arXiv
- Année : 2026
- Apport : exigences + OpenAPI → tests d'intégration ; **89 % des exigences produisent un script valide en ≤ 3 tentatives**.

**Test Case Generation for Requirements in Natural Language — An LLM Comparison Study**
- URL : https://dl.acm.org/doi/10.1145/3717383.3717389
- Type : papier ACM
- Année : 2025
- Apport : les tests générés **couvrent généralement les exigences mais ne satisfont pas toujours les critères d'adéquation de test**.

**TraceLLM: leveraging large language models with prompt engineering for enhanced requirements traceability**
- URL : https://link.springer.com/article/10.1007/s00766-026-00460-1
- Type : article de revue (Requirements Engineering, Springer)
- Année : 2026
- Apport : traçabilité exigences↔artefacts évaluée sur **8 LLM et 4 jeux de données** ; scores F2 état de l'art.

**Gherkin Reference — Documentation officielle Cucumber**
- URL : https://cucumber.io/docs/gherkin/reference/
- Type : doc officielle
- Année : 2026
- Apport : référence normative du format (Feature, Rule, Given/When/Then, Background, Scenario Outline, Data Tables).

**Reqnroll Documentation** (successeur .NET de SpecFlow)
- URL : https://docs.reqnroll.net/latest/
- Type : doc officielle
- Année : 2026
- Apport : portage .NET de Cucumber basé sur le code SpecFlow, compatible .NET Framework 4.6.2 → .NET 8.0+, guide de migration SpecFlow → Reqnroll.

**OpenAPI Specification (OAS)**
- URL : https://spec.openapis.org/oas/latest.html — https://www.openapis.org/
- Type : spécification officielle
- Année : 2026
- Apport : format d'entrée structuré canonique pour la génération de tests API par LLM.

**AI Test Case Generation — Xray Cloud Documentation**
- URL : https://docs.getxray.app/space/XRAYCLOUD/392921171/AI+Test+Case+Generation
- Type : doc officielle éditeur
- Année : 2025-2026
- Apport : génère des tests manuels ou Cucumber/BDD depuis les exigences Jira, avec étape **obligatoire** « Review, Edit & Select ».

**ISTQB Certified Tester AI Testing (CT-AI) v2.0 — page de certification**
- URL : https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/
- Type : référentiel officiel
- Année : 2026
- Apport : chapitre **« Testing Generative AI and Large Language Models »** ; examen **40 questions, score de passage 29/44**.

---

## NOTION 4 — Données synthétiques, property-based testing, fuzzing assisté par LLM (14 sources)

**Leveling Up Fuzzing: Finding more vulnerabilities with AI (Google Security Blog)**
- URL : https://security.googleblog.com/2024/11/leveling-up-fuzzing-finding-more.html
- Type : blog officiel Google
- Année : 2024
- Apport : **26 nouvelles vulnérabilités**, dont **CVE-2024-9143 dans OpenSSL, non détectée depuis ~20 ans** ; couverture étendue à **272 projets C/C++**, **+370 000 lignes**.

**google/oss-fuzz-gen (dépôt officiel)**
- URL : https://github.com/google/oss-fuzz-gen
- Type : dépôt officiel Google
- Année : 2024-2026
- Apport : génération de harnais de fuzzing par LLM ; **30 bugs/vulnérabilités découverts**, gain de couverture jusqu'à **+29 %** face aux harnais humains.

**A summer of security: empowering cyber defenders with AI (Big Sleep)**
- URL : https://blog.google/innovation-and-ai/technology/safety-security/cybersecurity-updates-summer-2025/
- Type : communiqué officiel Google
- Année : 2025
- Apport : l'agent **Big Sleep** découvre la **CVE-2025-6965 (SQLite)** avant exploitation ; **20 vulnérabilités** signalées dans FFmpeg, ImageMagick, etc.

**Fuzz4All: Universal Fuzzing with Large Language Models**
- URL : https://arxiv.org/abs/2308.04748
- Type : papier arXiv (ICSE 2024)
- Année : 2023
- Apport : **98 bugs** identifiés dans GCC, Clang, Z3, CVC5, OpenJDK, Qiskit — dont **64 confirmés inconnus**.

**Large Language Models are Zero-Shot Fuzzers (TitanFuzz)**
- URL : https://arxiv.org/abs/2212.14834
- Type : papier arXiv (ISSTA 2023)
- Année : 2022
- Apport : **+30,38 % / +50,84 %** de couverture sur TensorFlow / PyTorch, **65 bugs** détectés (41 inconnus).

**ChatAFL — Large Language Model guided Protocol Fuzzing (NDSS'24)**
- URL : https://github.com/ChatAFLndss/ChatAFL
- Type : dépôt officiel de l'article NDSS 2024
- Année : 2024
- Apport : **+5,8 %** de couverture de branches vs AFLNet, **+6,7 %** vs NSFuzz.

**LLMorpheus: Mutation Testing using Large Language Models**
- URL : https://arxiv.org/abs/2404.09952
- Type : papier arXiv
- Année : 2024
- Apport : évalué sur **13 packages** JavaScript ; produit des mutants ressemblant à de vrais bugs historiques, **impossibles à générer avec StrykerJS**.

**PIT Mutation Testing**
- URL : https://pitest.org/
- Type : doc officielle
- Année : 2026
- Apport : le **pourcentage de mutants tués** mesure la qualité réelle des assertions, là où la couverture de lignes ne mesure que l'exécution.

**Stryker Mutator — Documentation**
- URL : https://stryker-mutator.io/docs/
- Type : doc officielle
- Année : 2026
- Apport : mutation testing JS/TS et **.NET (Stryker.NET)** ; **plus de 30 opérateurs de mutation**, exécution parallélisée.

**Hypothesis documentation**
- URL : https://hypothesis.readthedocs.io/
- Type : doc officielle
- Année : 2026
- Apport : PBT de référence ; `@given` génère des centaines de cas, avec **shrinking** automatique du contre-exemple minimal.

**fast-check**
- URL : https://fast-check.dev/
- Type : doc officielle
- Année : 2026
- Apport : équivalent QuickCheck pour JS/TS ; a permis de détecter des bugs dans **Jest, TypeScript, Ramda**.

**Faker documentation**
- URL : https://faker.readthedocs.io/ — .NET : https://github.com/bchavez/Bogus
- Type : doc officielle
- Année : 2026
- Apport : génération de données factices réalistes ; `seed()` garantit la **reproductibilité** du jeu de test.

**SDV — Synthetic Data Vault**
- URL : https://docs.sdv.dev/sdv
- Type : doc officielle
- Année : 2026
- Apport : génération de données tabulaires synthétiques (GaussianCopula, CTGAN) **avec évaluation statistique de fidélité**.

**CNIL — Sécurité : Encadrer les développements informatiques**
- URL : https://www.cnil.fr/fr/securite-encadrer-les-developpements-informatiques
- Type : guide officiel de l'autorité française
- Année : 2024
- Apport : recommandation explicite d'effectuer les tests *« dans un environnement distinct de la production […] et sur des données fictives ou anonymisées »*.

---

## NOTION 5 — Documentation et reporting de test assistés par IA (15 sources)

**Large Language Models are Few-shot Testers (LIBRO)**
- URL : https://arxiv.org/abs/2209.11515
- Type : papier arXiv (ICSE 2023)
- Année : 2022
- Apport : génère un test reproduisant le bug **à partir du seul rapport de bug** pour **33 % des cas (251 sur 750)** de Defects4J.

**CUPID: Leveraging ChatGPT for More Accurate Duplicate Bug Report Detection**
- URL : https://arxiv.org/abs/2308.10022
- Type : papier arXiv
- Année : 2023
- Apport : **+5 à 8 %** de Recall Rate@10 vs état de l'art, jusqu'à **+82 %** face aux approches deep learning.

**Can We Enhance Bug Report Quality Using LLMs?**
- URL : https://arxiv.org/abs/2504.18804
- Type : papier arXiv
- Année : 2025
- Apport : Qwen 2.5 fine-tuné atteint **77 % de score CTQRS**, contre **75 %** pour ChatGPT-4o en few-shot.

**Empirical Analysis and Detection of Hallucinations in LLM-Generated Bug Report Summaries**
- URL : https://arxiv.org/abs/2605.24137
- Type : papier arXiv
- Année : 2026
- Apport : **~47,9 %** des résumés de bugs générés par LLM contiennent des informations manquantes, et **12,3 %** du contenu **fabriqué**.

**Less is More: DocString Compression in Code Generation**
- URL : https://arxiv.org/abs/2410.22793
- Type : papier arXiv (ACM TOSEM)
- Année : 2024
- Apport : ShortenDoc compresse les docstrings de **25 à 40 %** sans dégrader la qualité du code généré.

**Allure Report Documentation**
- URL : https://allurereport.org/docs/
- Type : doc officielle
- Année : 2026
- Apport : **30+ intégrations** de frameworks (JUnit, pytest, Cucumber, Playwright…), avec Quality Gate et analyse de stabilité.

**Reporters | Playwright**
- URL : https://playwright.dev/docs/test-reporters
- Type : doc officielle
- Année : 2026
- Apport : reporters list, dot, HTML, JSON, **JUnit XML** combinables — support d'entrée idéal pour un LLM de synthèse.

**Reporting | Cucumber**
- URL : https://cucumber.io/docs/cucumber/reporting/
- Type : doc officielle
- Année : 2026
- Apport : formatters message/progress/pretty/html/json/junit/testng.

**JaCoCo — Documentation**
- URL : https://www.jacoco.org/jacoco/trunk/doc/
- Type : doc officielle
- Année : 2026
- Apport : compteurs de couverture, **DTD XML public** des rapports → format directement exploitable par un agent de synthèse. Équivalent .NET : Coverlet (https://github.com/coverlet-coverage/coverlet).

**Coverage.py Documentation**
- URL : https://coverage.readthedocs.io/
- Type : doc officielle
- Année : 2026
- Apport : rapports texte, HTML, XML, LCOV et **JSON**.

**Code Coverage Best Practices (Google Testing Blog)**
- URL : https://testing.googleblog.com/2020/08/code-coverage-best-practices.html
- Type : blog officiel Google
- Année : 2020
- Apport : seuils indicatifs Google — **60 % acceptable, 75 % louable, 90 % exemplaire** — assortis de l'avertissement qu'un fort pourcentage ne garantit pas la qualité des assertions.

**Introduction — Google Engineering Practices (Code Review)**
- URL : https://google.github.io/eng-practices/review/
- Type : doc officielle Google
- Année : 2026
- Apport : **8 critères de revue** (Design, Functionality, Complexity, Tests, Naming, Comments, Style, Documentation).

**Legal summarization — Claude Platform Docs (Anthropic)**
- URL : https://platform.claude.com/docs/en/about-claude/use-case-guides/legal-summarization
- Type : doc officielle Anthropic
- Année : 2026
- Apport : technique de **méta-summarization** (chunking puis fusion) ; exemple chiffré : 1 000 documents de 300 000 caractères = **438,75 $ en Opus contre 87,75 $ en Haiku**.

**Creating a pull request summary with GitHub Copilot**
- URL : https://docs.github.com/copilot/using-github-copilot/creating-a-pull-request-summary-with-github-copilot
- Type : doc officielle GitHub
- Année : 2026
- Apport : génération **disponible uniquement en anglais**, résumés **à relire avant publication**.

**ISO/IEC/IEEE 29119-3 — Software testing — Part 3: Test documentation**
- URL : https://www.iso.org/standard/79429.html
- Type : norme internationale
- Année : 2021
- Apport : gabarits normatifs pour toute la documentation de test — plans, rapports d'incident, rapports de synthèse d'exécution.

**Katalon's 2025 State of Software Quality Report**
- URL : https://katalon.com/resources-center/blog/2025-state-of-software-quality-report
- Type : rapport industrie (1 500 professionnels QA)
- Année : 2025
- Apport : **61 %** des équipes adoptent le testing piloté par IA ; les testeurs qui utilisent l'IA sont **deux fois plus susceptibles** de craindre d'être remplacés.

---

## NOTION 6 — Analyse et diagnostic d'anomalies par IA (15 sources)

**Drain: An Online Log Parsing Approach with Fixed Depth Tree**
- URL : https://jiemingzhu.github.io/pub/pjhe_icws2017.pdf (IEEE ICWS 2017)
- Type : papier IEEE fondateur
- Année : 2017
- Apport : sur HDFS (**11 M messages**), **F-mesure 0,99** et réduction du temps de traitement de **51,85 % à 81,47 %** face à Spell.

**Loghub — A Large Collection of System Log Datasets**
- URL : https://github.com/logpai/loghub
- Type : dataset/benchmark officiel (LogPai, ISSRE 2023)
- Année : maintenu en continu
- Apport : logs bruts HDFS, BGL, Thunderbird, Windows… **téléchargés par plus de 450 organisations**.

**Interpretable Online Log Analysis Using LLMs with Prompt Strategies (LogPrompt)**
- URL : https://arxiv.org/abs/2308.07610
- Type : papier arXiv (ICPC 2024)
- Année : 2024
- Apport : les stratégies de prompt spécialisées améliorent la performance de **+380,7 %** vs prompt simple, et dépassent de **55,9 %** des approches entraînées — **sans aucun entraînement in-domain**.

**LLM-based event log analysis techniques: A survey**
- URL : https://arxiv.org/abs/2502.00677
- Type : survey arXiv
- Année : 2025
- Apport : panorama structuré des approches (fine-tuning, RAG, in-context learning) et des lacunes de recherche.

**Automatic Root Cause Analysis via LLMs for Cloud Incidents (RCACopilot)**
- URL : https://arxiv.org/abs/2305.15778
- Type : papier Microsoft Research (EuroSys 2024)
- Année : 2023/2024
- Apport : précision RCA jusqu'à **0,766** sur un an d'incidents réels Microsoft ; module en production depuis **plus de 4 ans sur 30+ équipes**.

**A Systematic Literature Review on LLMs for Automated Program Repair**
- URL : https://arxiv.org/abs/2405.01466
- Type : revue systématique
- Année : 2024
- Apport : analyse **189 papiers** LLM+APR, **4 stratégies d'intégration**.

**Exploring the Potential and Limitations of LLMs for Novice Program Fault Localization**
- URL : https://arxiv.org/abs/2512.03421
- Type : papier arXiv comparatif
- Année : 2025
- Apport : **13 LLM** comparés à SBFL et MBFL ; les modèles à raisonnement surpassent nettement SBFL/MBFL mais souffrent de **sur-explication** et de coûts élevés.

**Beyond LLM-based test automation: A Zero-Cost Self-Healing Approach Using DOM Accessibility Tree Extraction**
- URL : https://arxiv.org/abs/2603.20358
- Type : papier arXiv
- Année : 2026
- Apport : self-healing **sans coût API** via une hiérarchie de **10 niveaux de locators** ; **100 % de réussite** sur 31 combinaisons, guérison en **moins d'1 seconde**.

**How auto-heal works — mabl**
- URL : https://help.mabl.com/hc/en-us/articles/19078583792404-How-auto-heal-works
- Type : doc officielle éditeur
- Année : 2026
- Apport : mécanisme en deux temps — correspondance standard, puis **« advanced auto-heal » par IA générative après 5 exécutions réussies**.

**Self-Healing — Applitools Documentation (Execution Cloud)**
- URL : https://applitools.com/docs/eyes/concepts/test-execution/execution-cloud/self-healing
- Type : doc officielle éditeur
- Année : 2026
- Apport : réparation par comparaison d'attributs avec mémorisation du « healed selector » ; activable par `APPLITOOLS_USE_SELF_HEALING`.

**An Analysis of LLM Fine-Tuning and Few-Shot Learning for Flaky Test Detection**
- URL : https://arxiv.org/abs/2502.02715
- Type : papier arXiv (ICST 2025)
- Année : 2025
- Apport : compare fine-tuning et few-shot sur FlakyCat et IDoFT ; introduit **FlakyXbert**.

**Cost of Flaky Tests in CI: An Industrial Case Study**
- URL : https://mediatum.ub.tum.de/doc/1730194/1730194.pdf
- Type : étude de cas industrielle (ICST 2024, TU Munich / CQSE)
- Année : 2024
- Apport : les tests flaky consomment **au moins 2,5 % du temps productif** ; un relancement automatique coûte **0,02 centime** contre **5,67 $** pour une investigation manuelle.

**Where do our flaky tests come from? (Google Testing Blog)**
- URL : https://testing.googleblog.com/2017/04/where-do-our-flaky-tests-come-from.html
- Type : blog officiel Google
- Année : 2017
- Apport : pipeline Google de détection, **mise en quarantaine automatique** et triage ; **~16 % des tests Google** présentent un comportement flaky.

**Trace viewer | Playwright**
- URL : https://playwright.dev/docs/trace-viewer
- Type : doc officielle
- Année : 2026
- Apport : rejeu post-mortem (film strip, **snapshots DOM complets par action**, logs réseau/console) — matière première idéale pour un LLM de diagnostic.

**Retries | Playwright**
- URL : https://playwright.dev/docs/test-retries
- Type : doc officielle
- Année : 2026
- Apport : détection automatique du statut **« flaky »** ; recommandation officielle `trace: 'on-first-retry'`.

---

## NOTION 7 — Anti-patterns connus (17 sources)

**We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs**
- URL : https://arxiv.org/abs/2406.10279
- Type : papier arXiv (USENIX Security 2025)
- Année : 2024
- Apport : sur **576 000 échantillons** générés par 16 LLM, **5,2 %** des paquets recommandés par les modèles commerciaux et **21,7 %** pour les open-source sont **inexistants** ; **205 474 noms hallucinés uniques** (« slopsquatting »).

**A Survey on Hallucination in Large Language Models**
- URL : https://arxiv.org/abs/2311.05232
- Type : survey arXiv (ACM TOIS)
- Année : 2023
- Apport : taxonomie canonique (hallucinations **factuelles** vs **de fidélité**), détection et atténuation.

**Reduce hallucinations — Documentation officielle Anthropic**
- URL : https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- Type : doc officielle éditeur
- Année : 2026
- Apport : techniques concrètes (autoriser « je ne sais pas », citations vérifiables, chain-of-thought verification, best-of-N) **avec l'aveu explicite** que ces techniques *« réduisent significativement les hallucinations mais ne les éliminent pas entièrement »*.

**OWASP Top 10 for LLM Applications 2025**
- URL : https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/
- Type : référentiel de sécurité officiel
- Année : 2025
- Apport : cadre des **10 risques critiques** (LLM01 prompt injection → LLM10 unbounded consumption).

**Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions**
- URL : https://arxiv.org/abs/2108.09293
- Type : papier arXiv (IEEE S&P 2022)
- Année : 2021
- Apport : sur **1 689 programmes** générés dans 89 scénarios liés au Top 25 CWE MITRE, **~40 %** du code contient des vulnérabilités exploitables.

**October 2025 Update: GenAI Code Security Report (Veracode)**
- URL : https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/
- Type : rapport industrie (100+ LLM, 80 tâches réelles)
- Année : 2025
- Apport : le code généré introduit des failles dans **45 % des tests** ; **Java = 72 % d'échec sécurité** ; **augmenter la taille du modèle n'améliore pas la sécurité**.

**AI Copilot Code Quality: 2025 Look Back at 12 Months of Data (GitClear)**
- URL : https://www.gitclear.com/ai_assistant_code_quality_2025_research
- Type : étude industrielle (**211 M de lignes**)
- Année : 2025
- Apport : code copié-collé passé de **8,3 % (2020) à 12,3 % (2024)** tandis que le code refactorisé chute de **25 % à moins de 10 %**.

**4x Velocity, 10x Vulnerabilities (Apiiro)**
- URL : https://apiiro.com/blog/4x-velocity-10x-vulnerabilities-ai-coding-assistants-are-shipping-more-risks/
- Type : rapport industrie
- Année : 2025
- Apport : **×10** de nouvelles failles par mois, **+322 %** de chemins d'escalade de privilèges, **+40 %** d'exposition de secrets.

**Test smells in LLM-Generated Unit Tests**
- URL : https://arxiv.org/abs/2410.10628
- Type : papier arXiv
- Année : 2024
- Apport : **20 505 suites de tests** générées ; smells systématiques de type **Assertion Roulette** et **Magic Number Test**.

**Quality Assessment of Python Tests Generated by Large Language Models**
- URL : https://arxiv.org/abs/2506.14297
- Type : papier arXiv (EASE 2025)
- Année : 2025
- Apport : les **erreurs d'assertion représentent 64 %** de toutes les erreurs, le **manque de cohésion est le smell le plus fréquent (41 %)**.

**Design choices made by LLM-based test generators prevent them from finding bugs**
- URL : https://arxiv.org/abs/2412.14137
- Type : papier arXiv
- Année : 2024
- Apport : **la source clé sur le test tautologique** — Codium CoverAgent et CoverUp testés sur du code bogué génèrent des tests qui **valident le bug au lieu de le détecter**.

**Code Coverage Best Practices (Google Testing Blog)**
- URL : https://testing.googleblog.com/2020/08/code-coverage-best-practices.html
- Type : blog officiel Google
- Année : 2020
- Apport : mise en garde contre la **« mentalité de case à cocher »** ; les gains de couverture sont logarithmiques.

**The Oracle Gap: Comparing Coverage and Mutation Score**
- URL : https://arxiv.org/abs/2309.02395
- Type : papier arXiv
- Année : 2023
- Apport : introduit la notion d'**« oracle gap »** — une forte couverture coexiste couramment avec des oracles faibles.

**Mocks Aren't Stubs (Martin Fowler)**
- URL : https://martinfowler.com/articles/mocksArentStubs.html
- Type : article de référence
- Année : 2007
- Apport : distingue les **5 types de test doubles** (Dummy, Fake, Stub, Spy, Mock) et alerte sur le couplage excessif à l'implémentation.

**Software Engineering at Google — Chapitre 13, Test Doubles**
- URL : https://abseil.io/resources/swe-book/html/ch13.html
- Type : chapitre officiel (accès libre)
- Année : 2020
- Apport : Google documente que l'abus du mocking a **« pollué » sa base de tests**, au point que certains ingénieurs ont déclaré **« no more mocks! »**.

**DORA — Balancing AI tensions**
- URL : https://dora.dev/insights/balancing-ai-tensions/
- Type : rapport officiel Google Cloud / DORA
- Année : 2026
- Apport : **30 %** des professionnels ont peu ou pas confiance dans le code généré ; forte adoption IA = hausse **simultanée du débit ET de l'instabilité**.

**Stack Overflow 2025 Developer Survey — AI**
- URL : https://survey.stackoverflow.co/2025/ai
- Type : enquête industrie
- Année : 2025
- Apport : **46 %** ne font pas confiance à l'exactitude du code IA ; **45 %** citent **« des solutions presque correctes mais pas tout à fait »** comme frustration n°1.

---

## Notes de fiabilité

1. Toutes les URL ci-dessus ont été récupérées avec succès (statut 200 + contenu correspondant au titre).
2. Les pages ISTQB Glossary sont des SPA JavaScript — les définitions sont corroborées par des sources tierces, à revalider en navigateur pour une citation au mot près.
3. Le papier ACM 10.1145/3717383.3717389 est derrière paywall (abstract seul vérifié).
4. Les chiffres Apiiro proviennent de la couverture presse du rapport, la page d'origine étant en rendu JS.
