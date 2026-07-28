# Annexe D — Bibliographie complète

**Formation « Test logiciel avec IA générative »** — Human Coders · Evan BOISSONNOT
**Version 1.0 — juillet 2026** · corpus consolidé et dédoublonné

---

## Avertissement de méthode

Cette bibliographie est construite **exclusivement** à partir des quatre corpus de recherche
du support (`recherche/sources-jour1.md` à `sources-jour4.md`). Toutes les URL y ont été
vérifiées par récupération HTTP réelle en **juillet 2026** (statut 200 + contrôle de
correspondance titre/contenu).

| Règle | Application |
|---|---|
| **Aucune URL n'a été inventée** | Une source absente des corpus est absente d'ici |
| **Dédoublonnage** | Une source citée dans plusieurs modules apparaît **une seule fois**, avec la liste des modules |
| **Datation** | Chaque entrée porte son année ou sa date de dernière mise à jour vérifiée |
| **Apport** | Une ligne, avec un chiffre quand la source en fournit un |
| **Redirections** | Signalées quand l'ancienne URL est encore largement citée |

> ⚠️ Le domaine évolue vite. Les entrées portant une mention **« à revérifier »** sont celles
> dont les corpus signalent une instabilité constatée à la date de collecte.

## Sommaire

| § | Section | Entrées |
|---|---|:-:|
| 1 | Normes et référentiels | 52 |
| 2 | Rapports d'industrie et enquêtes | 20 |
| 3 | Recherche académique | 100 |
| 4 | Documentation officielle des outils | 278 |
| 5 | Sources réglementaires françaises et européennes | 41 |
| 6 | Blogs d'ingénierie de référence | 50 |
| | **Total dédoublonné** | **541** |
| 7 | Pour aller plus loin — 10 recommandations + 3 signets | — |
| 8 | Fraîcheur des sources — 10 corrections principales, 10 secondaires, 6 points à revérifier | — |

---

# §1. Normes et référentiels

## 1.1 Vocabulaire et certification du test — ISTQB / CFTL

| Titre | URL | Type · Année | Apport | Modules |
|---|---|---|---|---|
| **ISTQB Glossary — « test oracle »** | `https://glossary.istqb.org/en_US/term/oracle` | Glossaire normatif · 2026 | *« a source to determine expected results […] but should not be the code »* — **la définition qui fonde tout le support** | M1, M2, M12 |
| **ISTQB Glossary — « test automation »** | `https://glossary.istqb.org/en_US/term/test-automation-2-2` | Glossaire normatif · 2026 | Définition officielle de l'automatisation du test, couvrant gestion, conception, exécution et vérification | M1, M5 |
| **ISTQB CTFL Syllabus v4.0.1** | `https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf` | Syllabus officiel (PDF) · 2023, rév. 2024 | 14 *business outcomes*, 64 objectifs d'apprentissage, 6 chapitres — socle du vocabulaire | M1, M2 |
| **Certified Tester Foundation Level (CTFL) v4.0** | `https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/` | Page officielle · MAJ 16/05/2026 | Conditions d'examen et prérequis du niveau fondation | Annexe D §7 |
| **ISTQB CT-AI Syllabus v2.0** | `https://istqb.org/wp-content/uploads/2026/05/ISTQB-_CTAI_Syllabus_v2.0_Release.pdf` | Syllabus officiel (PDF) · 2026 (GA) | 7 chapitres examinables, minimum 19,5 h de formation accréditée, prérequis CTFL ; chapitre dédié au test de l'IA générative | M11 |
| **Certified Tester AI Testing (CT-AI) v2.0** | `https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/` | Page de certification · MAJ 24/07/2026 | Examen 40 questions, score de passage **29/44** ; porte sur le test **des** systèmes d'IA | M11 |
| **ISTQB — Communiqué de sortie du syllabus CT-AI v2.0** | `https://istqb.org/istqb-releases-certified-tester-ai-testing-ct-ai-syllabus-version-2-0/` | Communiqué officiel · 21/04/2026 | Date de disponibilité générale — permet de dater la péremption des supports citant la v1.0 | M11 |
| **Certified Tester Specialist Level — Testing with Generative AI (CT-GenAI)** | `https://istqb.org/certifications/gen-ai/` | Page de certification · v1.1, MAJ 24/07/2026 | Certification portant sur le test **avec** l'IA générative — ⚠️ périmètre opposé à CT-AI | M11 |
| **ISTQB CTAL-TAE v2.0 (Test Automation Engineering)** | `https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/` | Page officielle · 2024 | 40 questions / 66 points, passage à 43, 90 minutes, 8 chapitres | §7 |
| **ISTQB CTAL-TM v3.0 (Test Management)** | `https://istqb.org/certifications/certified-tester-advanced-level-test-management-ctal-tm-v3-0/` | Page officielle · 2026 | Référentiel de management de test — pertinent pour le volet Go/No-Go | M12, §7 |
| **ISTQB CTAL-TA v4.0 (Test Analyst)** | `https://istqb.org/certifications/certified-tester-advanced-level-test-analyst/` | Page officielle · MAJ 24/07/2026 | Techniques de conception de test au niveau avancé | M2, §7 |
| **Index des certifications ISTQB** | `https://istqb.org/certifications/` | Index officiel · MAJ 27/05/2026 | Vue d'ensemble du schéma — utile pour orienter un participant | §7 |
| **CFTL — Comité Français des Tests Logiciels** | `https://cftl.fr/` | Member board français ISTQB · MAJ 09/03/2026 | Relais francophone : examens en français, terminologie traduite | §7 |
| **Glossaire ISTQB francophone — CFTL** | `https://cftl.fr/tests-logiciels/glossaire-istqb/` | Page de renvoi officielle · MAJ 23/02/2024 | Point d'entrée du glossaire en français | Annexe A |
| **Comprendre les tests — CFTL** | `https://cftl.fr/tests-logiciels/comprendre-les-tests/` | Page pédagogique · MAJ 07/11/2025 | Vulgarisation officielle en français, utilisable en pré-lecture | M0 |

## 1.2 Normes ISO / IEC / IEEE

| Titre | URL | Type · Année | Apport | Modules |
|---|---|---|---|---|
| **ISO/IEC/IEEE 29119-1:2022 — Concepts et définitions** | `https://www.iso.org/standard/81291.html` | Norme internationale · éd. 2, 04/02/2022 | 51 pages ; définit les concepts généraux du test. **Disponible gratuitement auprès de l'ISO** — lecture de référence à distribuer | M0, M11 |
| **ISO/IEC/IEEE 29119-2:2021 — Processus de test** | `https://www.iso.org/standard/79428.html` | Norme internationale · éd. 2, 28/10/2021 | Processus de test normalisés, du pilotage à l'exécution | M11 |
| **ISO/IEC/IEEE 29119-3 — Documentation de test** | `https://www.iso.org/standard/79429.html` | Norme internationale · 2021 | Gabarits normatifs : plans, rapports d'incident, rapports de synthèse d'exécution | M3 |
| **ISO/IEC TR 29119-11:2020 — Test des systèmes fondés sur l'IA** | `https://www.iso.org/standard/79016.html` | ⚠️ **Rapport technique**, pas une norme · 27/11/2020 | Lignes directrices pour tester des systèmes à base d'IA ; en clôture de revue | M11 |
| **ISO/IEC/IEEE 29119 — site officiel du groupe de travail** | `https://softwaretestingstandard.org/` | Site officiel du WG · 2026 | Vue d'ensemble de la série et de son état d'avancement | M11 |
| **ISO/IEC 25010:2023 — SQuaRE, modèle de qualité produit** | `https://www.iso.org/standard/78176.html` | Norme internationale · éd. 2, 15/11/2023 | 22 pages ; **9 caractéristiques** de qualité produit — la référence pour bâtir une grille de qualité | M11, M12 |
| **ISO/IEC 25010:2011 — édition RETIRÉE** | `https://www.iso.org/standard/35733.html` | Norme **retirée** le 04/03/2024 | ⚠️ Citée partout avec ses 8 caractéristiques — c'est le piège de formation le plus fréquent sur ce sujet | M11 |
| **ISO/IEC 25059:2023 — Modèle de qualité pour les systèmes d'IA** | `https://www.iso.org/standard/80655.html` | Norme internationale · 28/06/2023 | 15 pages ; extension SQuaRE spécifique à l'IA, citée dans les *business outcomes* de CT-AI v2.0 | M11 |
| **ISO/IEC FDIS 25059 — révision en cours** | `https://www.iso.org/standard/88234.html` | Projet final (FDIS) · stade 50.00 au 23/07/2026 | ⚠️ La 25059:2023 est déjà en cours de révision : ne pas la présenter comme stable | M11 |
| **ISO/IEC 42001:2023 — Système de management de l'IA** | `https://www.iso.org/standard/42001` · `https://www.iso.org/standard/81230.html` | Norme **certifiable** · 18/12/2023 | 51 pages ; première norme mondiale de SMIA. ⚠️ Ne confère **pas** la conformité AI Act | M11 |
| **ISO/IEC 23894:2023 — Management du risque en IA** | `https://www.iso.org/standard/77304.html` | Norme internationale · 06/02/2023 | Lignes directrices de gestion du risque, complément « processus » de la 42001 | M11 |
| **ISO/IEC 5338:2023 — Cycle de vie des systèmes d'IA** | `https://www.iso.org/standard/81118.html` | Norme internationale · 20/12/2023 | 39 pages ; répond à « où et quand teste-t-on dans un projet IA ? » avec un découpage normé | M11 |
| **ISO/IEC 22989:2022 — Concepts et terminologie de l'IA** | `https://www.iso.org/standard/74296.html` | Norme internationale · 19/07/2022 | 60 pages, **gratuite** — terminologie IA normalisée, à distribuer dès J1 pour aligner le vocabulaire | M0, Annexe A |
| **IEC 62304:2006 — Logiciel de dispositif médical** | `https://www.iso.org/standard/38421.html` | Norme internationale · mai 2006, confirmée 2021 | Cadre sectoriel antérieur à l'AI Act, souvent oublié dans les analyses de conformité | M11 |
| **ISO 21448:2022 — SOTIF (véhicules routiers)** | `https://www.iso.org/standard/77490.html` | Norme internationale · 30/06/2022 | Sécurité de la fonction prévue — cadre sectoriel automobile | M11 |

## 1.3 Référentiels de sécurité et de gouvernance

| Titre | URL | Type · Année | Apport | Modules |
|---|---|---|---|---|
| **OWASP Top 10:2025 — Introduction et catégories** | `https://owasp.org/Top10/2025/0x00_2025-Introduction/` | Standard OWASP · 2025 (version finale) | ⚠️ **Toute la numérotation a changé** par rapport à 2021 : Injection passe en **A05:2025**, le SSRF disparaît comme catégorie | M9 |
| **OWASP Top 10:2025 — A03 Software Supply Chain Failures** | `https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/` | Standard OWASP · 2025 | Nouvelle catégorie ; couvre directement le risque des serveurs MCP tiers et des paquets hallucinés | M9, M11 |
| **OWASP Top 10:2021 (avec traduction française officielle)** | `https://owasp.org/Top10/2021/` | Standard OWASP · 2021 | Édition précédente — à citer uniquement pour montrer le changement de numérotation | M9 |
| **OWASP ASVS 5.0.0** | `https://owasp.org/www-project-application-security-verification-standard/` | Standard OWASP · v5.0.0, 30/05/2025 | Exigences de sécurité **vérifiables**, chacune avec un identifiant citable `v5.0.0-x.y.z` | M9, M11 |
| **OWASP Top 10 for LLM Applications 2025** | `https://genai.owasp.org/llm-top-10/` · `https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/` | Référentiel OWASP GenAI · 2025 | 10 risques critiques, de LLM01 *prompt injection* à LLM10 *unbounded consumption* ; traductions publiées en 2025 | M1, M11 |
| **OWASP Top 10 for Agentic Applications 2026** | `https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/` | Référentiel OWASP GenAI · 09/12/2025 | ⚠️ Liste **distincte** du Top 10 LLM — il n'existe pas d'édition 2026 de ce dernier | M6, M11 |
| **OWASP Agentic AI — Threats and Mitigations v1.0** | `https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/` | Whitepaper OWASP · 17/02/2025 | Taxonomie des menaces agentiques et contre-mesures associées | M6, M11 |
| **OWASP — Agentic Security Initiative** | `https://genai.owasp.org/initiatives/agentic-security-initiative/` | Page d'initiative · MAJ 30/03/2026 | Point d'entrée des travaux OWASP sur la sécurité agentique | M11 |
| **OWASP — State of Agentic AI Security and Governance 2.01** | `https://genai.owasp.org/resource/state-of-agentic-ai-security-and-governance/` | Rapport OWASP GenAI · 01/06/2026 | État des lieux de la gouvernance agentique — la source la plus récente du corpus sur ce point | M11 |
| **OWASP — A Practical Guide for Secure MCP Server Development** | `https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/` | Whitepaper OWASP · 16/02/2026 | Traite les serveurs MCP comme des environnements à haut risque : permissions déléguées, chaînage d'appels d'outils | M5, M11 |
| **OWASP — CheatSheet : Securely Using Third-Party MCP Servers 1.0** | `https://genai.owasp.org/resource/cheatsheet-a-practical-guide-for-securely-using-third-party-mcp-servers-1-0/` | Cheat sheet OWASP · 04/11/2025 | Quatre risques nommés : *tool poisoning*, *prompt injection*, *memory poisoning*, *tool interference*. Format court, distribuable en salle | M5, M11 |
| **NIST AI 100-1 — AI Risk Management Framework 1.0** | `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf` · page : `https://www.nist.gov/itl/ai-risk-management-framework` | Cadre volontaire · janvier 2023 | Charpente de gouvernance quand aucune obligation sectorielle ne s'applique | M6, M10, M11 |
| **NIST AI 600-1 — Generative AI Profile** | `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf` · notice : `https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence` | Publication NIST · juillet 2024 | Déclinaison du cadre AI RMF aux systèmes génératifs | M10, M11 |
| **NIST AI 100-2 E2025 — Adversarial Machine Learning** | `https://csrc.nist.gov/pubs/ai/100/2/e2025/final` | Rapport NIST · 2025 | Taxonomie normalisée des attaques et des mitigations — base d'un exercice de red teaming | M10 |
| **NIST SP 1270 — Identifying and Managing Bias in AI** | `https://www.nist.gov/publications/towards-standard-identifying-and-managing-bias-artificial-intelligence` | Publication NIST · — | Cadre d'analyse des biais, applicable au juge LLM de M10 | M10 |
| **TMMi Model** | `https://www.tmmi.org/tmmi-model/` | Modèle de maturité · MAJ 01/07/2026 | Référentiel de maturité des processus de test, alternatif à l'approche ISTQB | M12, §7 |
| **TMMi — bibliothèque documentaire** | `https://www.tmmi.org/tmmi-documents/` | Documentation officielle · MAJ 24/06/2026 | Documents du modèle en accès libre | §7 |
| **TMMi et intelligence artificielle** | `https://www.tmmi.org/news/` | Actualité de la fondation · 19/01/2026 | Positionnement du modèle de maturité face à l'IA générative | M12 |
| **TMMi — organisations certifiées** | `https://www.tmmi.org/accredited-certifications/` | Registre officiel · 2026 | Permet de situer le niveau de maturité d'un secteur | M12 |

## 1.4 Accessibilité — normes et référentiels

| Titre | URL | Type · Année | Apport | Modules |
|---|---|---|---|---|
| **WCAG 2.2** | `https://www.w3.org/TR/WCAG22/` | Recommandation W3C · 12/12/2024 | Référentiel normatif des critères d'accessibilité web, base du RGAA et de l'EAA | M9 |
| **WCAG 3.0** | `https://www.w3.org/TR/wcag-3.0/` | Working Draft · 03/03/2026 | ⚠️ **Brouillon de travail** — à citer comme perspective, jamais comme obligation | M9 |
| **W3C WAI — European Union Web Accessibility Policies** | `https://www.w3.org/WAI/policies/european-union/` | Fiche officielle W3C · MAJ 23/07/2025 | Synthèse des obligations européennes, utile pour situer un contexte multi-pays | M9 |

---

# §2. Rapports d'industrie et enquêtes

## 2.1 Adoption de l'IA en ingénierie de la qualité

| Titre | URL | Type · Année | Apport chiffré | Modules |
|---|---|---|---|---|
| **World Quality Report 2025-26 (Capgemini / Sogeti / OpenText)** | `https://www.capgemini.com/insights/research-library/world-quality-report-2025-26/` · communiqué : `https://www.capgemini.com/news/press-releases/world-quality-report-2025-ai-adoption-surges-in-quality-engineering-but-enterprise-level-scaling-remains-elusive/` | Rapport industrie, 17ᵉ édition · 2025-2026 | **~90 %** des organisations poursuivent la GenAI en quality engineering, mais **15 %** seulement à l'échelle entreprise ; gain de productivité moyen **19 %** ; couverture d'automatisation classique stagnante à **33 %** | M1, M12 |
| **The 2026 State of Testing Report (PractiTest)** | `https://www.practitest.com/state-of-testing/` | Enquête mondiale, 13ᵉ édition · 2026 | Adoption IA en test **76,8 %** (81,7 % en grande entreprise) ; **70 %** l'utilisent pour créer des cas de test mais **19,9 %** seulement pour l'identification de risques | M1, M12 |
| **Katalon — 2025 State of Software Quality Report** | `https://katalon.com/resources-center/blog/2025-state-of-software-quality-report` | Rapport industrie (1 500 professionnels QA) · 2025 | **61 %** des équipes adoptent le test piloté par IA ; les testeurs qui utilisent l'IA sont **deux fois plus susceptibles** de craindre d'être remplacés | M1, M12 |
| **Gartner — Critical Capabilities for AI-Augmented Software Testing Tools** | `https://www.gartner.com/en/documents/7022898` | Rapport analyste · 2025 | Évalue **10 éditeurs** ; *Self-Healing For Test Scripts* et *Manual to Automated Test Conversion* distinguent un outil « AI-augmented » d'un framework scripté | M5 |

## 2.2 Adoption et perception côté développement

| Titre | URL | Type · Année | Apport chiffré | Modules |
|---|---|---|---|---|
| **Stack Overflow Developer Survey 2025 — section AI** | `https://survey.stackoverflow.co/2025/ai` | Enquête (~49 000 répondants) · 2025 | **84 %** utilisent ou prévoient d'utiliser l'IA (76 % en 2024) ; **46 % se méfient** de l'exactitude contre 33 % qui font confiance ; **3,1 %** seulement « highly trust » ; frustration n°1 : **« des solutions presque correctes mais pas tout à fait »** (45 %) | M1, M12 |
| **DORA — State of AI-assisted Software Development 2025** | `https://dora.dev/research/2025/dora-report/` (ex-`dora.dev/dora-report-2025/`) | Rapport Google Cloud, IT Revolution, GitHub, GitLab · 2025 | Adoption IA **90 %** (+14 pts) ; l'IA agit en **amplificateur** : **+21 %** de tâches complétées, **+98 %** de PR fusionnées, sans amélioration proportionnelle des métriques de livraison. **Version abrégée en français disponible** | M1, M8, M12 |
| **DORA — Balancing AI tensions** | `https://dora.dev/insights/balancing-ai-tensions/` | Rapport DORA · 2026 | **30 %** des professionnels ont peu ou pas confiance dans le code généré ; forte adoption IA = hausse **simultanée du débit et de l'instabilité** | M1, M12 |
| **DORA Research 2025 — vue d'ensemble** | `https://dora.dev/research/2025/` | Page programme · 2025 | Permet de vérifier quelle est la dernière édition publiée avant de citer un chiffre | M12 |
| **The State of Developer Ecosystem 2025 (JetBrains)** | `https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/` · rapport : `https://www.jetbrains.com/lp/devecosystem-2025/` · section IA : `https://devecosystem-2025.jetbrains.com/artificial-intelligence` | Enquête (24 534 développeurs, 194 pays) · 2025 | **85 %** utilisent régulièrement des outils IA, **62 %** au moins un agent ou assistant de code ; inquiétude n°1 : **qualité inconstante** du code généré | M1, M12 |
| **Octoverse 2025 (GitHub)** | `https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/` | Rapport officiel GitHub · 2025 | **1,1 M+** dépôts publics utilisent un SDK LLM, dont **693 867 créés en 12 mois** (**+178 %** en un an) | M1 |

## 2.3 Qualité et sécurité du code généré

| Titre | URL | Type · Année | Apport chiffré | Modules |
|---|---|---|---|---|
| **Veracode — GenAI Code Security Report (octobre 2025)** | `https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/` | Rapport industrie (100+ LLM, 80 tâches réelles) · 2025 | Le code généré introduit des failles dans **45 % des tests** ; **72 % d'échec sécurité** sur Java ; **augmenter la taille du modèle n'améliore pas la sécurité** | M1, M9 |
| **GitClear — AI Copilot Code Quality: 2025 Look Back** | `https://www.gitclear.com/ai_assistant_code_quality_2025_research` | Étude industrielle (**211 M de lignes**) · 2025 | Code copié-collé passé de **8,3 % (2020) à 12,3 % (2024)** tandis que le code refactorisé chute de **25 % à moins de 10 %** | M1, M12 |
| **Apiiro — 4x Velocity, 10x Vulnerabilities** | `https://apiiro.com/blog/4x-velocity-10x-vulnerabilities-ai-coding-assistants-are-shipping-more-risks/` | Rapport industrie · 2025 | **×10** de nouvelles failles par mois, **+322 %** de chemins d'escalade de privilèges, **+40 %** d'exposition de secrets. ⚠️ Chiffres issus de la couverture presse, page d'origine en rendu JS | M1, M9 |
| **Diffblue — Benchmark Report: Autonomous unit test generation at enterprise scale** | `https://www.diffblue.com/resources/benchmark-report-autonomous-unit-test-generation-at-enterprise-scale/` | Rapport éditeur · mars 2026 | Comparaison génération déterministe (apprentissage par renforcement) vs complétion LLM à l'échelle entreprise | M5 |

## 2.4 Productivité, emploi et prospective

| Titre | URL | Type · Année | Apport | Modules |
|---|---|---|---|---|
| **World Economic Forum — The Future of Jobs Report 2025** | `https://www.weforum.org/publications/the-future-of-jobs-report-2025/` | Rapport · 07/01/2025 | Situe le métier de testeur dans la recomposition générale des compétences, sans surinterpréter | M12 |
| **OIT — Generative AI and Jobs: A Refined Global Index of Occupational Exposure (Working Paper 140)** | `https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure` | Working paper OIT × NASK · — | Indice d'exposition professionnelle à la GenAI, méthodologie transparente | M12 |
| **OIT — Disruption without dividend?** | `https://www.ilo.org/publications/disruption-without-dividend-how-digital-divide-and-task-differences-split` | Working paper OIT · — | Effet différencié de la GenAI selon les contextes et les tâches | M12 |
| **FMI — Gen-AI: Artificial Intelligence and the Future of Work** | `https://www.imf.org/en/Publications/Staff-Discussion-Notes/Issues/2024/01/14/Gen-AI-Artificial-Intelligence-and-the-Future-of-Work-542379` | Staff Discussion Note · 2024 | Cadrage macroéconomique de l'exposition des emplois qualifiés | M12 |
| **Haut-commissariat à la Stratégie et au Plan — Intelligence artificielle et travail** | `https://www.strategie-plan.gouv.fr/publications/intelligence-artificielle-travail` (ex-`strategie.gouv.fr`) | Rapport public français · — | ⚠️ **France Stratégie a changé de nom et de domaine.** Source française officielle sur les **conditions de travail** — le point aveugle des rapports d'éditeurs | M12 |
| **CISQ — Cost of Poor Software Quality in the U.S.: A 2022 Report** | `https://www.it-cisq.org/the-cost-of-poor-quality-software-in-the-us-a-2022-report/` | Rapport consortium · 2022 | ⚠️ Le chiffre de 2,41 T$ est un coût **américain**, pas mondial, et une estimation — voir §8 | M12 |

---

# §3. Recherche académique

## 3.1 États de l'art et benchmarks de génération de tests

| Titre | URL | Type · Année | Apport chiffré | Modules |
|---|---|---|---|---|
| **Software Testing With Large Language Models: Survey, Landscape, and Vision** | `https://arxiv.org/abs/2307.07221` | arXiv → IEEE TSE vol. 50 n°4 · 2023 (TSE 2024) | Analyse systématique de **102 études** ; génération de cas de test et réparation de programme sont les deux tâches dominantes | M1, M4 |
| **TESTEVAL: Benchmarking LLMs for Test Case Generation** | `https://arxiv.org/abs/2406.04531` | arXiv (NAACL 2025 Findings) · 2024 | **210 programmes**, 16 LLM, 3 tâches ; la couverture globale est atteignable, mais cibler une **ligne / branche / chemin précis** reste le point faible net | M1 |
| **TestGenEval: A Real World Unit Test Generation and Test Completion Benchmark** | `https://arxiv.org/abs/2410.00752` | arXiv (Meta AI / FAIR) · 2024 | **68 647 tests**, 1 210 paires code/test, 11 dépôts réels ; le meilleur modèle plafonne à **35,2 % de couverture moyenne** | M1 |
| **SWT-Bench: Testing and Validating Real-World Bug-Fixes with Code Agents** | `https://arxiv.org/abs/2406.12952` | arXiv (NeurIPS 2024) · 2024 | Les tests générés par LLM, utilisés comme **filtre de validation**, doublent la précision d'un agent pour valider un correctif | M1, M6 |
| **SWE-bench: Can Language Models Resolve Real-World GitHub Issues?** | `https://arxiv.org/abs/2310.06770` | arXiv (Princeton, ICLR 2024) · 2023 | Benchmark fondateur de l'évaluation d'agents sur des dépôts réels | M6 |
| **SWE-bench Multimodal** | `https://www.swebench.com/multimodal.html` (papier arXiv:2410.03859) | Benchmark + papier ICLR 2025 · 2024-2025 | **517 issues** contenant captures d'écran, maquettes et diagrammes | M1 |
| **SWE-Bench Pro: Can AI Agents Solve Long-Horizon Software Engineering Tasks?** | `https://arxiv.org/abs/2509.16941` | arXiv · 2025 | **1 865 problèmes / 41 dépôts d'entreprise**, conçus anti-contamination ; tâches multi-fichiers de plusieurs heures | M1, M6 |
| **SWE-bench Leaderboards** | `https://www.swebench.com/` | Leaderboards actifs (Princeton) · 2026 | Point de vérification avant de citer un score de modèle | M5, M6 |
| **Introducing SWE-bench Verified (OpenAI)** | `https://openai.com/index/introducing-swe-bench-verified/` | Annonce · 13/08/2024, MAJ 24/02/2025 | Sous-ensemble validé humainement — corrige les faux négatifs du benchmark d'origine | M6 |
| **Terminal-Bench** | `https://www.tbench.ai/` | Benchmark (Stanford × Laude) · 2026 | **89 tâches** en v2.0 (80 en v1.0) couvrant ingénierie logicielle, ML, sécurité, data science | M5 |
| **Evaluating Large Language Models Trained on Code (HumanEval / Codex)** | `https://arxiv.org/abs/2107.03374` | arXiv (OpenAI) · 2021 | Référence fondatrice : introduit **HumanEval** (164 problèmes) et la métrique **pass@k** | M1 |
| **tau-bench: A Benchmark for Tool-Agent-User Interaction** | `https://arxiv.org/abs/2406.12045` · implémentation : `https://github.com/sierra-research/tau2-bench` | arXiv (Sierra) · 17/06/2024 | Évaluation d'agents en interaction outil-agent-utilisateur, avec règles métier | M6 |

## 3.2 Retours industriels sur la génération de tests

| Titre | URL | Type · Année | Apport chiffré | Modules |
|---|---|---|---|---|
| **Automated Unit Test Improvement using LLMs at Meta (TestGen-LLM)** | `https://arxiv.org/abs/2402.09171` | arXiv (FSE 2024, ACM) · 2024 | **Le chiffre-clé de la formation** : **75 %** des tests générés compilent, **57 %** passent de façon fiable, **25 %** augmentent la couverture, **73 %** des recommandations acceptées en production | M1, M5 |
| **An Empirical Evaluation of Using LLMs for Automated Unit Test Generation (TestPilot)** | `https://arxiv.org/abs/2302.06527` | arXiv (cs.SE) · 2023 | Sur **1 684 fonctions API**, TestPilot atteint **70,2 %** de couverture d'instructions contre **51,3 %** pour une technique scriptée | M1, M5 |
| **No More Manual Tests? Evaluating and Improving ChatGPT for Unit Test Generation (ChatTESTER)** | `https://arxiv.org/abs/2305.04207` | arXiv · 2023 | Analyse des causes d'échec de compilation des tests générés et boucle de correction itérative | M4 |
| **Hallucination to Consensus: Multi-Agent LLMs for End-to-End JUnit Test Generation (CANDOR)** | `https://arxiv.org/abs/2506.02943` | arXiv · 2025 | Architecture multi-agents avec consensus pour réduire les hallucinations de génération | M4, M6 |
| **Generating High-Level Test Cases from Requirements using LLM: An Industry Study** | `https://arxiv.org/abs/2510.03641` | arXiv · 2025 | **Macro-recall 0,81** sur un corpus d'exigences de qualité contre **0,37** sur un corpus dégradé — la dépendance à la qualité des exigences, chiffrée | M2 |
| **Acceptance Test Generation with Large Language Models: An Industrial Case Study** | `https://arxiv.org/abs/2504.07244` | arXiv (IEEE AST 2025) · 2025 | Pipeline en **2 étapes** (user story → Gherkin → code) : **95 %** des scénarios jugés utiles, **92 %** des tests utiles dont **60 % utilisables tels quels** | M2 |
| **Behaviour Driven Development Scenario Generation with Large Language Models** | `https://arxiv.org/abs/2603.04729` | arXiv · 2026 | **500 user stories** : des exigences détaillées produisent des scénarios de haute qualité, des user stories seules produisent des scénarios de faible qualité | M2 |
| **From Law to Gherkin: A Human-Centred Quasi-Experiment** | `https://arxiv.org/abs/2508.20744` | arXiv · 2025 | **120 spécifications Gherkin** générées : pertinence **95 %**, clarté **100 %**, complétude **94,2 %** — mais omissions et hallucinations persistantes | M2 |
| **Streamlining Acceptance Test Generation for Mobile Applications Through LLMs (AToMIC)** | `https://arxiv.org/abs/2510.18861` | arXiv · 2025 | Déployé en industrie : **93,3 %** des scénarios Gherkin syntaxiquement corrects dès la génération | M2 |
| **Enhancing Large Language Models for Text-to-Testcase Generation** | `https://arxiv.org/abs/2402.11910` | arXiv · 2024 | **7 000 cas de test** sur 5 projets open source, **78,5 %** de correction syntaxique et **61,7 %** de couverture | M2 |
| **APITestGenie: Generating Web API Tests from Requirements and API Specifications** | `https://arxiv.org/abs/2604.02039` | arXiv · 2026 | Exigences + OpenAPI → tests d'intégration : **89 % des exigences** produisent un script valide en **≤ 3 tentatives** | M2 |
| **Test Case Generation for Requirements in Natural Language — An LLM Comparison Study** | `https://dl.acm.org/doi/10.1145/3717383.3717389` | Papier ACM · 2025 | Les tests générés **couvrent les exigences mais ne satisfont pas les critères d'adéquation de test**. ⚠️ Paywall, résumé seul vérifié | M2 |
| **TraceLLM: LLMs with prompt engineering for enhanced requirements traceability** | `https://link.springer.com/article/10.1007/s00766-026-00460-1` | Requirements Engineering (Springer) · 2026 | Traçabilité exigences ↔ artefacts évaluée sur **8 LLM et 4 jeux de données** | M2 |

## 3.3 Anti-patterns, qualité et sécurité des tests générés

| Titre | URL | Type · Année | Apport chiffré | Modules |
|---|---|---|---|---|
| **Design choices made by LLM-based test generators prevent them from finding bugs** | `https://arxiv.org/abs/2412.14137` | arXiv · 2024 | **La source clé sur le test tautologique** : des générateurs testés sur du code bogué produisent des tests qui **valident le bug au lieu de le détecter** | M1 |
| **The Oracle Gap: Comparing Coverage and Mutation Score** | `https://arxiv.org/abs/2309.02395` | arXiv · 2023 | Introduit la notion d'**oracle gap** — une forte couverture coexiste couramment avec des oracles faibles | M1, M3, M12 |
| **Test smells in LLM-Generated Unit Tests** | `https://arxiv.org/abs/2410.10628` | arXiv · 2024 | **20 505 suites** générées analysées ; défauts systématiques de type **Assertion Roulette** et **Magic Number Test** | M2, M3 |
| **Quality Assessment of Python Tests Generated by Large Language Models** | `https://arxiv.org/abs/2506.14297` | arXiv (EASE 2025) · 2025 | Les **erreurs d'assertion représentent 64 %** de toutes les erreurs ; le **manque de cohésion** est le défaut le plus fréquent (**41 %**) | M2, M3 |
| **We Have a Package for You! Package Hallucinations by Code Generating LLMs** | `https://arxiv.org/abs/2406.10279` | arXiv (USENIX Security 2025) · 2024, rév. 2025 | Sur **576 000 échantillons** produits par 16 LLM : **5,2 %** de paquets inexistants pour les modèles commerciaux, **21,7 %** pour les modèles ouverts ; **205 474 noms hallucinés uniques** — origine du terme *slopsquatting* | M1, M11 |
| **A Survey on Hallucination in Large Language Models** | `https://arxiv.org/abs/2311.05232` | Survey arXiv (ACM TOIS) · 2023 | Taxonomie canonique : hallucinations **factuelles** vs **de fidélité**, détection et atténuation | M1, M3 |
| **Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions** | `https://arxiv.org/abs/2108.09293` | arXiv (IEEE S&P 2022) · 2021 | Sur **1 689 programmes** générés dans 89 scénarios liés au Top 25 CWE, **~40 %** du code contient des vulnérabilités exploitables | M1, M9 |
| **Empirical Analysis and Detection of Hallucinations in LLM-Generated Bug Report Summaries** | `https://arxiv.org/abs/2605.24137` | arXiv · 2026 | **~47,9 %** des résumés de bugs générés contiennent des informations manquantes, et **12,3 %** du contenu est **fabriqué** | M3 |
| **Can We Enhance Bug Report Quality Using LLMs?** | `https://arxiv.org/abs/2504.18804` | arXiv · 2025 | Un modèle affiné atteint **77 %** de score de qualité de rapport contre **75 %** pour un modèle généraliste en few-shot | M3 |
| **CUPID: Leveraging ChatGPT for More Accurate Duplicate Bug Report Detection** | `https://arxiv.org/abs/2308.10022` | arXiv · 2023 | **+5 à 8 %** de rappel@10 face à l'état de l'art, jusqu'à **+82 %** face aux approches d'apprentissage profond | M3 |
| **Large Language Models are Few-shot Testers (LIBRO)** | `https://arxiv.org/abs/2209.11515` | arXiv (ICSE 2023) · 2022 | Génère un test reproduisant le défaut **à partir du seul rapport de bug** dans **33 % des cas (251 sur 750)** | M3 |
| **Less is More: DocString Compression in Code Generation** | `https://arxiv.org/abs/2410.22793` | arXiv (ACM TOSEM) · 2024 | Compression des descriptions de **25 à 40 %** sans dégrader la qualité du code généré — argument d'économie de contexte | M4 |

## 3.4 Prompting, contexte et raisonnement

| Titre | URL | Type · Année | Apport chiffré | Modules |
|---|---|---|---|---|
| **Chain-of-Thought Prompting Elicits Reasoning in LLMs** (Wei et al.) | `https://arxiv.org/abs/2201.11903` | arXiv (Google Research, NeurIPS 2022) · 2022 | **8 exemplaires CoT** suffisent à atteindre l'état de l'art sur GSM8K, dépassant un modèle affiné avec vérificateur | M4 |
| **Large Language Models are Zero-Shot Reasoners** (Kojima et al.) | `https://arxiv.org/abs/2205.11916` | arXiv (NeurIPS 2022) · 2022 | La **seule phrase « Let's think step by step »** fait passer un modèle de **17,7 % à 78,7 %** sur MultiArith et de **10,4 % à 40,7 %** sur GSM8K — le chiffre-choc de M4 | M4 |
| **Self-Consistency Improves Chain of Thought Reasoning** (Wang et al.) | `https://arxiv.org/abs/2203.11171` | arXiv (ICLR 2023) · 2022 | Échantillonner plusieurs chemins puis voter : **GSM8K +17,9 %**, SVAMP +11,0 %, AQuA +12,2 %. → En QA : générer 3 jeux de tests et ne garder que l'intersection | M4 |
| **ReAct: Synergizing Reasoning and Acting in Language Models** (Yao et al.) | `https://arxiv.org/abs/2210.03629` | arXiv (ICLR 2023) · 2022 | **+34 points** (ALFWorld) et **+10 points** (WebShop) avec 1 à 2 exemples — le patron exact de la boucle d'un agent de test | M4, M6 |
| **Reflexion: Language Agents with Verbal Reinforcement Learning** (Shinn et al.) | `https://arxiv.org/abs/2303.11366` | arXiv (NeurIPS 2023) · 2023 | Renforcement **sans mise à jour de poids** : **91 % pass@1 sur HumanEval** contre 80 % pour le modèle seul — fondement du self-healing de test | M6, M7 |
| **Self-Refine: Iterative Refinement with Self-Feedback** (Madaan et al.) | `https://arxiv.org/abs/2303.17651` | arXiv (NeurIPS 2023) · 2023 | **~+20 points absolus** sur 7 tâches. ⚠️ **Sans oracle externe, le modèle s'auto-évalue et peut se tromper de façon corrélée** | M6, M10 |
| **Agent-as-a-Judge: Evaluate Agents with Agents** (Zhuge et al.) | `https://arxiv.org/abs/2410.10934` | arXiv (Meta AI / KAUST) · 2024 | Benchmark **DevAI : 55 tâches annotées avec 365 exigences hiérarchiques** ; atteint la fiabilité d'une baseline humaine — le patron du sous-agent relecteur | M6, M10 |
| **Lost in the Middle: How Language Models Use Long Contexts** | `https://arxiv.org/abs/2307.03172` · version publiée : `https://aclanthology.org/2024.tacl-1.9/` | arXiv → TACL vol. 12 (2024) · 2023 | **Courbe de performance en U** : la performance peut chuter de **plus de 20 %**, et tomber **sous la performance sans document** au-delà de 20-30 documents | M4 |
| **NoLiMa: Long-Context Evaluation Beyond Literal Matching** | `https://arxiv.org/abs/2502.05167` | arXiv (ICML 2025) · fév. 2025, rév. juil. 2025 | Évaluation de contexte long **au-delà de la correspondance littérale** : la dégradation est bien plus forte que ne le suggèrent les tests « aiguille dans une botte de foin » | M4 |
| **Non-Determinism of "Deterministic" LLM Settings** | `https://arxiv.org/abs/2408.04667` | arXiv (cs.CL), v5 · avril 2025 | **80 complétions uniques sur 1 000** à réglages identiques, et jusqu'à **15 % de variation d'exactitude** — la preuve chiffrée que `temperature=0` ne reproduit pas | M4, M8 |

## 3.5 Diagnostic, flakiness et priorisation

| Titre | URL | Type · Année | Apport chiffré | Modules |
|---|---|---|---|---|
| **Drain: An Online Log Parsing Approach with Fixed Depth Tree** | `https://jiemingzhu.github.io/pub/pjhe_icws2017.pdf` | IEEE ICWS 2017 · 2017 | Sur **11 M de messages** : **F-mesure 0,99** et réduction du temps de traitement de **51,85 % à 81,47 %** — l'alternative déterministe au LLM pour clusteriser | M7 |
| **Loghub — A Large Collection of System Log Datasets** | `https://github.com/logpai/loghub` | Dataset/benchmark (ISSRE 2023) · maintenu | Logs bruts de systèmes réels, **téléchargés par plus de 450 organisations** | M7 |
| **Interpretable Online Log Analysis Using LLMs with Prompt Strategies (LogPrompt)** | `https://arxiv.org/abs/2308.07610` | arXiv (ICPC 2024) · 2024 | Les stratégies de prompt spécialisées améliorent la performance de **+380,7 %** vs prompt simple, et dépassent de **55,9 %** des approches entraînées, **sans entraînement in-domain** | M7 |
| **LLM-based event log analysis techniques: A survey** | `https://arxiv.org/abs/2502.00677` | Survey arXiv · 2025 | Panorama structuré des approches (fine-tuning, RAG, in-context learning) et de leurs lacunes | M7 |
| **Automatic Root Cause Analysis via LLMs for Cloud Incidents (RCACopilot)** | `https://arxiv.org/abs/2305.15778` | Microsoft Research (EuroSys 2024) · 2023-2024 | Précision RCA jusqu'à **0,766** sur un an d'incidents réels ; module en production depuis **plus de 4 ans sur 30+ équipes** | M7 |
| **A Systematic Literature Review on LLMs for Automated Program Repair** | `https://arxiv.org/abs/2405.01466` | Revue systématique · 2024 | Analyse de **189 papiers** LLM + réparation automatique, **4 stratégies d'intégration** | M7 |
| **Exploring the Potential and Limitations of LLMs for Novice Program Fault Localization** | `https://arxiv.org/abs/2512.03421` | arXiv comparatif · 2025 | **13 LLM** comparés à SBFL et MBFL : les modèles à raisonnement surpassent nettement, mais souffrent de **sur-explication** et de coûts élevés — la source de « la narration n'est pas une preuve » | M7 |
| **An Empirical Analysis of Flaky Tests** (Luo, Hariri, Eloussi, Marinov) | `http://mir.cs.illinois.edu/marinov/publications/LuoETAL14FlakyTestsAnalysis.pdf` | FSE 2014 (UIUC) · 2014 | Taxonomie fondatrice des causes de flakiness — base de la taxonomie de M7 | M7 |
| **An Analysis of LLM Fine-Tuning and Few-Shot Learning for Flaky Test Detection** | `https://arxiv.org/abs/2502.02715` | arXiv (ICST 2025) · 2025 | Compare affinage et few-shot sur des jeux de données de flakiness de référence | M7 |
| **Cost of Flaky Tests in CI: An Industrial Case Study** | `https://mediatum.ub.tum.de/doc/1730194/1730194.pdf` | Étude de cas industrielle (ICST 2024, TU Munich / CQSE) · 2024 | Les tests flaky consomment **au moins 2,5 % du temps productif** ; une relance automatique coûte **0,02 centime** contre **5,67 $** pour une investigation manuelle | M7 |
| **Beyond LLM-based test automation: A Zero-Cost Self-Healing Approach Using DOM Accessibility Tree Extraction** | `https://arxiv.org/abs/2603.20358` | arXiv · 2026 | Self-healing **sans coût d'API** via une hiérarchie de **10 niveaux de locators** : **100 % de réussite** sur 31 combinaisons, guérison en **moins d'une seconde** | M7 |
| **Predictive Test Selection** (Machalica, Samylkin, Porth, Chandra) | `https://arxiv.org/abs/1810.05286` | arXiv (ICSE-SEIP 2019) · 2018, v2 2019 | Sélection de tests apprise ; ⚠️ les chiffres annoncés supposent un historique dé-flaké — voir §8 | M8, M12 |
| **Taming Google-Scale Continuous Testing** (Memon et al.) | `https://research.google/pubs/taming-google-scale-continuous-testing/` | ICSE-SEIP 2017 (Google Research) · 2017 | Analyse à très grande échelle des exécutions de test en intégration continue | M8, M12 |
| **Techniques for Improving Regression Testing in CI Development Environments** (Elbaum, Rothermel, Penix) | `https://research.google/pubs/techniques-for-improving-regression-testing-in-continuous-integration-development-environments/` | Papier Google Research · — | Sélection et priorisation de tests dans un contexte d'intégration continue | M8, M12 |
| **Reinforcement Learning for Automatic Test Case Prioritization and Selection in CI** (Spieker et al.) | `https://arxiv.org/abs/1811.04122` | arXiv / ISSTA 2017 · 2018 | Modèle Retecs, priorisation apprise sur trois signaux (durée, dernière exécution, historique d'échecs) — support de l'exercice bonus de M12 | M12 |
| **Prioritizing Test Cases For Regression Testing** (Rothermel, Untch, Chu, Harrold) | `https://dblp.org/rec/journals/tse/RothermelUCH01.html` | IEEE TSE 27(10) · 2001 | Article fondateur de la priorisation de tests ; **introduit l'APFD** | M12 |
| **Test Case Prioritization: A Family of Empirical Studies** (Elbaum, Malishevsky, Rothermel) | `https://dblp.org/rec/journals/tse/ElbaumMR02.html` | IEEE TSE 28(2) · 2002 | Validation empirique de l'APFD sur plusieurs contextes | M12 |
| **Use of Relative Code Churn Measures to Predict System Defect Density** (Nagappan, Ball) | `https://www.microsoft.com/en-us/research/publication/use-of-relative-code-churn-measures-to-predict-system-defect-density/` | ICSE 2005 (Microsoft Research) · 2005 | Le **churn relatif** est un prédicteur de densité de défauts — base du tableau de bord de M12 | M12 |
| **Mining Metrics to Predict Component Failures** (Nagappan, Ball, Zeller) | `https://www.microsoft.com/en-us/research/publication/mining-metrics-to-predict-component-failures/` | ICSE 2006 (Microsoft Research) · 2006 | ⚠️ Montre aussi que les prédicteurs **ne se transfèrent pas** tels quels d'un projet à l'autre | M12 |
| **A Large-Scale Empirical Study of Just-in-Time Quality Assurance** (Kamei et al.) | `https://posl.ait.kyushu-u.ac.jp/~kamei/publications/Kamei_TSE2013.pdf` | IEEE TSE · 2013 | Prédiction de défauts au niveau du commit — le grain exploitable en CI | M12 |
| **A Systematic Survey of Just-in-Time Software Defect Prediction** (Zhao, Damevski, Chen) | `https://api.crossref.org/works/10.1145/3567550` | ACM Computing Surveys · 2022 | Synthèse de l'état de l'art, avec les limites méthodologiques du domaine | M12 |
| **State of Mutation Testing at Google** (Petrović, Ivanković) | `https://research.google/pubs/state-of-mutation-testing-at-google/` | ICSE-SEIP 2018 (Google Research) · 2018 | Mise en œuvre du mutation testing à très grande échelle, et arbitrages de coût | M3, M12 |
| **Are Mutants a Valid Substitute for Real Faults in Software Testing?** (Just et al.) | `https://homes.cs.washington.edu/~rjust/publ/mutants_real_faults_fse_2014.pdf` | FSE 2014 (ACM SIGSOFT Distinguished Paper) · 2014 | ⚠️ La détection de mutants est corrélée à la détection de défauts réels, **mais la corrélation dépend de la taille de la suite** — la nuance à donner en comité | M3, M12 |
| **Are mutation scores correlated with real fault detection?** (Papadakis, Shin, Yoo, Bae) | `https://dblp.org/rec/conf/icse/PapadakisSYB18.html` | ICSE 2018 · 2018 | Réplication critique de l'étude précédente — à citer pour ne pas sur-vendre le score de mutation | M3, M12 |
| **A taxonomy of risk-based testing** (Felderer, Schieferdecker) | `https://link.springer.com/article/10.1007/s10009-014-0332-3` | Int. J. Softw. Tools Technol. Transf. 16(5) · 2014 | Taxonomie de référence du test basé sur les risques | M12 |
| **Integrating risk-based testing in industrial test processes** (Felderer, Ramler) | `https://link.springer.com/article/10.1007/s11219-013-9226-y` | Software Quality Journal 22(3) · 2014 | Conditions d'intégration en contexte industriel réel | M12 |
| **A multiple case study on risk-based testing in industry** (Felderer, Ramler) | `https://link.springer.com/article/10.1007/s10009-014-0328-z` | Int. J. Softw. Tools Technol. Transf. 16(5) · 2014 | ⚠️ Identifie le **risque hétérogène** comme prérequis : sans dispersion, la priorisation ne sert à rien | M12 |
| **Redefining Crowdsourced Test Report Prioritization with LLM (LLMPrior)** | `https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4741001` | Préprint (version de revue : Information and Software Technology, 2025) · — | Priorisation de rapports de test assistée par LLM | M12 |

## 3.6 Fuzzing, property-based testing et mutation par LLM

| Titre | URL | Type · Année | Apport chiffré | Modules |
|---|---|---|---|---|
| **Fuzz4All: Universal Fuzzing with Large Language Models** | `https://arxiv.org/abs/2308.04748` | arXiv (ICSE 2024) · 2023 | **98 défauts** identifiés dans GCC, Clang, Z3, CVC5, OpenJDK, Qiskit — dont **64 confirmés inconnus** | M3 |
| **Large Language Models are Zero-Shot Fuzzers (TitanFuzz)** | `https://arxiv.org/abs/2212.14834` | arXiv (ISSTA 2023) · 2022 | **+30,38 % / +50,84 %** de couverture sur deux bibliothèques majeures, **65 défauts** détectés dont 41 inconnus | M3 |
| **ChatAFL — LLM guided Protocol Fuzzing (NDSS'24)** | `https://github.com/ChatAFLndss/ChatAFL` | Dépôt officiel de l'article NDSS 2024 · 2024 | **+5,8 %** de couverture de branches vs AFLNet, **+6,7 %** vs NSFuzz | M3 |
| **LLMorpheus: Mutation Testing using Large Language Models** | `https://arxiv.org/abs/2404.09952` | arXiv · 2024 | Évalué sur **13 paquets** ; produit des mutants ressemblant à de **vrais bugs historiques**, impossibles à générer avec un mutateur classique | M3 |
| **PentestGPT: An LLM-empowered Automatic Penetration Testing Tool** | `https://arxiv.org/abs/2308.06782` | arXiv (cs.SE/cs.CR), v2 · 02/06/2024 | Capacités et limites d'un LLM sur des tâches de test d'intrusion | M9 |

## 3.7 Évaluation, juges LLM et dérive

| Titre | URL | Type · Année | Apport chiffré | Modules |
|---|---|---|---|---|
| **Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena** (Zheng et al.) | `https://arxiv.org/abs/2306.05685` | arXiv (NeurIPS 2023 D&B) · 2023, v4 | Article de référence sur le juge LLM et ses limites méthodologiques | M10 |
| **Large Language Models are not Fair Evaluators** (Wang et al.) | `https://arxiv.org/abs/2305.17926` | arXiv (cs.CL) · 2023, v2 | **Biais de position** : l'ordre des candidats change le verdict — d'où l'obligation de permutation | M10 |
| **LLM Evaluators Recognize and Favor Their Own Generations** (Panickssery, Bowman, Feng) | `https://arxiv.org/abs/2404.13076` | arXiv (cs.CL) · 2024 | **Biais d'auto-préférence** : un modèle reconnaît et préfère ses propres productions — le juge ne doit jamais être le modèle sous test | M10 |
| **Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference** (Chiang et al.) | `https://arxiv.org/abs/2403.04132` | arXiv (LMSYS / UC Berkeley) · 2024 | Méthodologie de comparaison par préférence humaine à grande échelle | M10 |
| **Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations** (E. Miller) | `https://arxiv.org/abs/2411.00640` | arXiv (stat.AP / cs.CL) · 2024 | **La source de l'exigence d'intervalle de confiance** : sans barres d'erreur, un écart de score ne veut rien dire | M10 |
| **How is ChatGPT's behavior changing over time?** (Chen, Zaharia, Zou) | `https://arxiv.org/abs/2307.09009` | arXiv (Stanford / Berkeley) · 2023, v3 | **Le chiffre de la dérive** : exactitude passée de **84 % à 51 %** sur une même tâche en trois mois, à identifiant de modèle constant | M10, M12 |
| **Learning under Concept Drift: A Review** (Lu et al.) | `https://arxiv.org/abs/2004.05785` | Revue (IEEE TKDE) · 2020 | Cadre théorique de la dérive de concept — distingue *data drift* et *model drift* | M10 |
| **AgentOps: Enabling Observability of LLM Agents** (Dong, Lu, Zhu) | `https://arxiv.org/abs/2411.05285` | arXiv (CSIRO Data61) · 2024, v2 | Taxonomie de ce qu'il faut observer d'un agent — charpente du contrat de journalisation de M10 | M10 |
| **Lessons From Red Teaming 100 Generative AI Products** | `https://arxiv.org/abs/2501.07238` | arXiv (équipe AI Red Team de Microsoft, 26 auteurs) · 13/01/2025 | Retour d'expérience sur 100 produits — les leçons transférables à une chaîne de test | M10 |
| **Llama Guard: LLM-based Input-Output Safeguard** (Inan et al.) | `https://arxiv.org/abs/2312.06674` | arXiv (cs.CL, Meta) · 2023 | Modèle de garde en entrée/sortie — une des architectures de garde-fou possibles | M10 |

## 3.8 Productivité mesurée et effets réels

| Titre | URL | Type · Année | Apport chiffré | Modules |
|---|---|---|---|---|
| **Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity (METR)** | `https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/` (arXiv 2507.09089) | **Essai contrôlé randomisé** · 10/07/2025 | 16 développeurs expérimentés, 246 issues réelles sur leurs propres dépôts : **l'IA les a ralentis**, alors qu'ils se percevaient comme accélérés. **La source anti-hype la plus solide du corpus** | M12 |
| **We are Changing our Developer Productivity Experiment Design (METR)** | `https://metr.org/blog/2026-02-24-uplift-update/` | Note méthodologique · 24/02/2026 | Nouvelle campagne : 57 développeurs, 143 dépôts, 800+ tâches — à surveiller pour actualiser le chiffre | M12 |
| **Measuring the Self-Reported Impact of Early-2026 AI on Technical Worker Productivity (METR)** | `https://metr.org/blog/2026-05-11-ai-usage-survey/` | Enquête (349 travailleurs techniques) · 11/05/2026 | Écart mesuré entre **gain de vitesse** perçu et **gain de valeur** effectif | M12 |
| **The Impact of AI on Developer Productivity: Evidence from GitHub Copilot** (Peng et al.) | `https://arxiv.org/abs/2302.06590` | Expérience contrôlée (GitHub / Microsoft / MIT) · 2023 | Résultat opposé à celui de METR, sur une tâche synthétique et des développeurs non experts du dépôt — **à citer avec METR, jamais seul** | M12 |
| **Vibe Coding: An Experiment with Test-Driven Development** (Mock, Russo) | `https://arxiv.org/abs/2607.22406` | Étude académique · 24/07/2026 | Confrontation du développement piloté par l'IA et du TDD — la source la plus fraîche du corpus | M12 |
| **How Do AI Coding Agents Contribute to Software Development?** (Mazloomzadeh et al.) | `https://arxiv.org/abs/2607.21832` | Étude longitudinale (Polytechnique Montréal, dataset AIDev) · juillet 2026 | Analyse empirique des pull requests produites par des agents | M12 |
| **« Go Home Copilot, You're Drunk » — Developer Responses to Agent-Generated Code Review Comments** | `https://arxiv.org/abs/2607.21997` | Étude à grande échelle (SMU) · 24/07/2026 | Réactions réelles des développeurs aux commentaires de revue générés — utile pour le volet conduite du changement | M12 |
| **Seeing is Believing: Vision-driven Non-crash Functional Bug Detection for Mobile Apps (Trident)** | `https://arxiv.org/abs/2407.03037` | arXiv (cs.SE) · 2024, v2 déc. 2024 | Détection de défauts fonctionnels non bloquants par analyse visuelle | M9 |
| **Make LLM a Testing Expert: Mobile GUI Testing via Functionality-aware Decisions (GPTDroid)** | `https://arxiv.org/abs/2310.15780` | arXiv (ICSE 2024) · 2023 | Exploration d'interface pilotée par LLM | M9 |
| **WebVoyager: Building an End-to-End Web Agent with Large Multimodal Models** | `https://arxiv.org/abs/2401.13919` | arXiv (ACL 2024) · 2024, v4 | Agent web multimodal de bout en bout — cadre de comparaison pour les agents E2E | M9 |

---

# §4. Documentation officielle des outils

> ⚠️ **Avertissement de section.** La documentation des éditeurs d'IA a beaucoup migré :
> `docs.anthropic.com` → `docs.claude.com` → **`platform.claude.com`** (API) et
> **`code.claude.com/docs/en/`** (Claude Code) ; `platform.openai.com` → `developers.openai.com`.
> Les anciens liens redirigent, mais **le contenu a été réécrit**. Ne jamais citer de mémoire.

## 4.1 Agent de code — Claude Code

| Titre | URL | Type · MAJ | Apport | Modules |
|---|---|---|---|---|
| **Best practices for Claude Code** ⭐ | `https://code.claude.com/docs/en/best-practices` | Doc officielle · MAJ 17/07/2026 | **Source pivot du support.** Première section : *« Give Claude a way to verify its work »*, avec 4 niveaux de gradation. Nomme le *« trust-then-verify gap »* : « If you can't verify it, don't ship it ». **Règle des 2 corrections** : au-delà de deux corrections sur le même sujet, `/clear` | M4, M5, M6 |
| **Overview — Claude Code** | `https://code.claude.com/docs/en/overview` | Doc officielle · MAJ 21/07/2026 | Exemple canonique du test piloté par agent ; 5 surfaces partagent le même moteur, donc la même configuration de test | M5 |
| **Quickstart** | `https://code.claude.com/docs/en/quickstart` | Doc officielle · MAJ 16/07/2026 | `claude -p` (one-off), `-c` (continue), `-r` (resume) ; cycle des modes de permission | M5 |
| **CLI reference** | `https://code.claude.com/docs/en/cli-reference` | Référence · MAJ 24/07/2026 | `--output-format` (text, json ou stream-json), `--permission-mode`, `--max-turns` (**aucune limite par défaut**), `--agents` en JSON inline | M5, M6, M8 |
| **Interactive mode** | `https://code.claude.com/docs/en/interactive-mode` | Référence · MAJ 25/07/2026 | Exécution en arrière-plan d'une commande longue — utile pour lancer `dotnet test` pendant l'analyse | M5 |
| **Commands (slash commands et skills fournies)** | `https://code.claude.com/docs/en/commands` | Référence · MAJ 24/07/2026 | Trois commandes directement QA : `/code-review`, `/security-review`, et **`/verify`** qui build, lance l'application et **observe le résultat** plutôt que de se fier aux tests | M5 |
| **Extend Claude Code (features overview)** | `https://code.claude.com/docs/en/features-overview` | Doc officielle · 2026 | Arbre de décision : quand utiliser un fichier de mémoire, une skill, un subagent, un hook, MCP ou un plugin | M5, M6 |
| **How Claude remembers your project (mémoire, `CLAUDE.md`)** | `https://code.claude.com/docs/en/memory` | Doc officielle · MAJ 22/07/2026 | Cible **sous 200 lignes** ; imports `@chemin` récursifs avec **profondeur max de 4 sauts** ; 4 emplacements hiérarchisés | M4, M6 |
| **AGENTS.md dans Claude Code** | `https://code.claude.com/docs/en/memory#agents-md` | Section de doc · 2026 | Phrase exacte : *« Claude Code reads `CLAUDE.md`, not `AGENTS.md` »* — le piège classique en TP sur poste Windows | M4 |
| **Extend Claude with skills** | `https://code.claude.com/docs/en/skills` | Doc officielle · MAJ 24/07/2026 | Structure d'une skill, frontmatter QA (`allowed-tools`, `disallowed-tools`, `paths`), fusion des anciennes commandes dans les skills | M5, M6 |
| **Agent Skills — Specification (standard ouvert)** | `https://agentskills.io/specification` | Spécification ouverte · 2026 | Divulgation progressive en 3 étages : **~100 tokens** de métadonnées au démarrage, corps **< 5 000 tokens** à l'activation. Le chiffre qui explique qu'une skill coûte ~0 contexte tant qu'elle n'est pas invoquée | M5 |
| **Create custom subagents** | `https://code.claude.com/docs/en/sub-agents` | Doc officielle · MAJ 27/07/2026 | **Chaque subagent tourne dans sa propre fenêtre de contexte** ; patron « isoler les opérations verbeuses » — la sortie du runner reste dans le sous-agent | M6 |
| **Hooks reference** | `https://code.claude.com/docs/en/hooks` | Référence · MAJ 27/07/2026 | Plus de 30 événements ; **seul le code de sortie 2 bloque**, le code 1 est une erreur non bloquante ; timeouts documentés | M6 |
| **Automate actions with hooks (guide)** | `https://code.claude.com/docs/en/hooks-guide` | Guide officiel · MAJ 21/07/2026 | Recettes : blocage de fichiers protégés, exécution automatique des tests après édition ; documente le **cap de blocage du hook `Stop`** | M6 |
| **Choose a permission mode** | `https://code.claude.com/docs/en/permission-modes` | Doc officielle · MAJ 25/07/2026 | 6 modes ; le mode `dontAsk` est **explicitement recommandé pour la CI verrouillée et les scripts** | M5, M8 |
| **Configure permissions** | `https://code.claude.com/docs/en/permissions` | Doc officielle · 2026 | Précédence **deny-first** ; ⚠️ **depuis la v2.1.210, seules `Edit(path)` et `Read(path)` sont réellement appliquées** — les autres sont acceptées mais jamais appliquées | M4, M6, M11 |
| **Claude Code settings — Exclude sensitive files** | `https://code.claude.com/docs/en/settings#exclude-sensitive-files` | Doc officielle · 2026 | ⚠️ **Il n'existe pas de `.claudeignore`.** Texte exact : *« This replaces the deprecated `ignorePatterns` configuration »* | M4, M11 |
| **Run Claude Code programmatically (headless)** | `https://code.claude.com/docs/en/headless` | Doc officielle · MAJ 21/07/2026 | `--bare` saute l'auto-découverte ; `--output-format json` renvoie **`total_cost_usd`** ; entrée `stdin` plafonnée à 10 Mo ; SIGTERM → code 143 | M8 |
| **Claude Code GitHub Actions** | `https://code.claude.com/docs/en/github-actions` | Doc officielle · MAJ 04/07/2026 | Installation, action officielle, exemple de revue de PR — support du workflow de M8 | M8 |
| **Claude Code GitLab CI/CD** | `https://code.claude.com/docs/en/gitlab-ci-cd` | Doc officielle (bêta, maintenue par GitLab) · 2026 | Variante GitLab du workflow — à privilégier si le client est sur GitLab | M8 |
| **Code Review (revue de PR automatisée)** | `https://code.claude.com/docs/en/code-review` | Doc officielle (research preview) · MAJ 07/2026 | Sections normatives *« What Important means here »*, *« Cap the nits »*, *« Do not report »* — modèle pour définir un oracle de revue | M5, M8 |
| **Claude Code security — Protect against prompt injection** | `https://code.claude.com/docs/en/security` | Doc officielle · 2026 | Modèle de menace et contre-mesures côté agent local | M11 |
| **Claude Code sandboxing — filesystem and network isolation** | `https://code.claude.com/docs/en/sandboxing` | Doc officielle · MAJ 27/07/2026 | Isolation système de fichiers et réseau, liste d'autorisation stricte — base de l'exercice M11-3 | M11 |
| **Explore the context window** | `https://code.claude.com/docs/en/context-window` | Doc officielle · 2026 | Page pédagogique idéale pour montrer `/context` avant/après en M4-2 | M4 |
| **Manage costs effectively** | `https://code.claude.com/docs/en/costs` | Doc officielle · 2026 | Leviers de réduction du coût d'une session | M4, M8 |
| **Configure your model — fenêtre de contexte** | `https://code.claude.com/docs/en/model-config#sonnet-5-context-window` | Doc officielle · 2026 | ⚠️ **Seule valeur numérique officielle du seuil d'auto-compaction** : ≈ 967 K tokens sur une fenêtre de 1 M. Les « 92 % » et « 95 % » circulent via des sources tierces | M4 |
| **Environment variables** | `https://code.claude.com/docs/en/env-vars` | Référence · 2026 | Variables d'environnement, dont celles liées à la compaction et au proxy d'entreprise | M4, M8 |
| **Checkpointing (`/rewind`)** | `https://code.claude.com/docs/en/checkpointing` | Doc officielle · MAJ 23/07/2026 | ⚠️ **Limite majeure : les fichiers modifiés par des commandes bash ne sont PAS tracés** | M6 |
| **Output styles** | `https://code.claude.com/docs/en/output-styles` | Doc officielle · MAJ 17/07/2026 | Le style **Learning** insère des marqueurs `TODO(human)` — idéal pour un exercice où le stagiaire écrit lui-même les assertions | M0, M6 |
| **Customize your status line** | `https://code.claude.com/docs/en/statusline` | Doc officielle · MAJ 24/07/2026 | Affichage permanent du coût ou du modèle en cours de session | M10 |
| **Common workflows** | `https://code.claude.com/docs/en/common-workflows` | Doc officielle · 2026 | Recettes de flux de travail, dont plusieurs directement transposables en QA | M5 |
| **Monitoring — OpenTelemetry pour Claude Code** | `https://code.claude.com/docs/en/monitoring-usage` | Doc officielle · 2026 | Métriques exportables : coût, tokens, temps bloqué sur l'utilisateur, décisions d'édition — base de l'exercice M10-1 | M10 |
| **Connect Claude Code to tools via MCP** | `https://code.claude.com/docs/en/mcp` | Doc officielle · MAJ 24/07/2026 | 3 portées (locale, projet versionné, utilisateur) ; timeouts d'inactivité ; avertissement explicite sur le risque d'injection via contenu externe | M5 |
| **Connect to MCP servers (quickstart)** | `https://code.claude.com/docs/en/mcp-quickstart` | Doc officielle · 2026 | Parcours minimal d'ajout et de vérification d'un serveur | M5 |
| **Index machine-lisible de la documentation** | `https://code.claude.com/docs/llms.txt` | Index officiel · 2026 | Permet de constituer un corpus documentaire local ; chaque page est récupérable en Markdown brut | M4 |

## 4.2 SDK d'agent et dépôts officiels

| Titre | URL | Type · MAJ | Apport | Modules |
|---|---|---|---|---|
| **Agent SDK — overview** | `https://code.claude.com/docs/en/agent-sdk/overview` | Doc officielle · MAJ 20/07/2026 | « Les mêmes outils, boucle d'agent et gestion de contexte que Claude Code », en Python et TypeScript | M6 |
| **Agent SDK reference — TypeScript** | `https://code.claude.com/docs/en/agent-sdk/typescript` | Référence · MAJ 23/07/2026 | ⚠️ **`allowedTools` auto-approuve sans restreindre** : il faut `disallowedTools` pour bloquer. Piège classique — croire qu'`allowedTools` met l'agent en bac à sable | M6 |
| **Agent SDK reference — Python** | `https://code.claude.com/docs/en/agent-sdk/python` | Référence · MAJ 27/07/2026 | `query()` one-shot vs client conversationnel ; changement de mode de permission en cours de session | M6 |
| **Give Claude custom tools (Agent SDK)** | `https://code.claude.com/docs/en/agent-sdk/custom-tools` | Doc officielle · 2026 | Déclaration d'outils maison — comment exposer un runner de test à l'agent | M6 |
| **Use MCP servers with the Agent SDK** | `https://code.claude.com/docs/en/agent-sdk/mcp` | Doc officielle · 2026 | Branchement de serveurs MCP depuis le SDK | M6 |
| **Control tool permissions (Agent SDK)** | `https://code.claude.com/docs/en/agent-sdk/permissions` | Doc officielle · 2026 | Mécanismes de contrôle fin, dont le rappel d'autorisation programmatique | M6, M11 |
| **Subagents in the Agent SDK** | `https://code.claude.com/docs/en/agent-sdk/subagents` | Doc officielle · 2026 | Composition d'agents spécialisés depuis le SDK | M6 |
| **Manage sessions (Agent SDK)** | `https://code.claude.com/docs/en/agent-sdk/sessions` | Doc officielle · 2026 | Reprise et persistance de session — indispensable pour une campagne longue | M6 |
| **Intercept and control agent behavior with hooks (Agent SDK)** | `https://code.claude.com/docs/en/agent-sdk/hooks` | Doc officielle · 2026 | Équivalent programmatique des hooks — support des garde-fous de M6 | M6 |
| **Host the Agent SDK in production** | `https://code.claude.com/docs/en/agent-sdk/hosting` | Doc officielle · MAJ 16/07/2026 | Contraintes d'hébergement, isolation, gestion des secrets | M8 |
| **Streaming Input vs Single Message Input** | `https://code.claude.com/docs/en/agent-sdk/streaming-vs-single-mode` | Doc officielle · 2026 | Choix du mode d'entrée selon le type de campagne | M6 |
| **anthropics/claude-code (dépôt)** | `https://github.com/anthropics/claude-code` | Dépôt officiel · 2026 | Suivi des versions et des régressions d'API — ⚠️ le rythme de publication impose d'épingler | M5 |
| **anthropics/claude-code-action (dépôt)** | `https://github.com/anthropics/claude-code-action` | Dépôt officiel · 2026 | Contient `examples/claude.yml` et `docs/security.md` | M8 |
| **claude-code-action — docs/security.md** | `https://github.com/anthropics/claude-code-action/blob/main/docs/security.md` | Doc de sécurité officielle · 2026 | ⚠️ Déconseille explicitement `pull_request_target` — le vecteur d'attaque de l'exercice M8-4 | M8 |
| **anthropics/claude-agent-sdk-typescript** | `https://github.com/anthropics/claude-agent-sdk-typescript` | Dépôt officiel · 2026 | **158 releases** au moment de la collecte → API très mouvante, **épingler la version** | M6, M8 |
| **anthropics/claude-agent-sdk-python** | `https://github.com/anthropics/claude-agent-sdk-python` | Dépôt officiel · 2026 | Exceptions typées exploitables pour un diagnostic propre ; changement de nom d'options à surveiller | M6 |
| **anthropics/claude-cookbooks — `claude_agent_sdk/`** | `https://github.com/anthropics/claude-cookbooks/tree/main/claude_agent_sdk` | Notebooks officiels (MIT) · 2026 | Exemples exécutables de boucles d'agent | M6 |
| **anthropics/claude-cookbooks — `patterns/agents/`** | `https://github.com/anthropics/claude-cookbooks/tree/main/patterns/agents` · version hébergée : `https://platform.claude.com/cookbook/patterns-agents-basic-workflows` | Notebooks officiels · 2026 | Implémentations des patrons de workflow — prompt chaining, routage, parallélisation, orchestrateur/workers, evaluator-optimizer | M6 |
| **anthropics/prompt-eng-interactive-tutorial** | `https://github.com/anthropics/prompt-eng-interactive-tutorial` | Notebooks officiels · actif | **9 chapitres avec exercices** + annexe ; le chapitre 9 contient un exercice dédié au code | M4, §7 |
| **anthropics/claude-code-security-review** | `https://github.com/anthropics/claude-code-security-review` | Dépôt officiel (MIT) · 2026 | Action de revue de sécurité prête à brancher en CI | M9 |

## 4.3 Plateforme et API — prompting, contexte, coûts, évaluation

| Titre | URL | Type · MAJ | Apport | Modules |
|---|---|---|---|---|
| **Prompt engineering overview** | `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview` | Doc officielle · 2026 | Point d'entrée du prompting ; ⚠️ **les 9 anciennes pages granulaires ont été fusionnées** | M4 |
| **Prompting best practices** ⭐ | `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices` | Doc officielle · 2026 | **Page pivot de M4.** Few-shot : *« Include 3–5 examples for best results »* dans des balises `<example>`. **Long contexte : documents EN HAUT, avant la question — jusqu'à 30 % d'amélioration** | M4 |
| **Long context prompting** | `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#long-context-prompting` | Section de doc · 2026 | Structure `<documents>` / `<document index>` / `<source>` — la convention reprise dans l'annexe B | M4 |
| **Console prompting tools (generator, templates, improver)** | `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-tools` | Doc officielle · 2026 | Outillage d'amélioration de prompt ; ⚠️ produit des réponses *« longer, more thorough, but slower »* | M4 |
| **Using the Evaluation Tool** | `https://platform.claude.com/docs/en/test-and-evaluate/eval-tool` | Doc officielle · 2026 | ⚠️ **Prérequis : le prompt doit contenir au moins une ou deux variables `{{variable}}`** pour créer un jeu d'évals — la justification de la règle n°3 de l'annexe B | M4, M10 |
| **Define success criteria and build evaluations** | `https://platform.claude.com/docs/en/test-and-evaluate/develop-tests` | Doc officielle · 2026 | Méthode de définition de critères de succès mesurables avant toute évaluation | M4, M10 |
| **Reduce hallucinations** | `https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations` | Doc officielle · 2026 | Techniques concrètes, **avec l'aveu explicite** qu'elles *« réduisent significativement les hallucinations mais ne les éliminent pas entièrement »* | M1, M3 |
| **Reducing latency** | `https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency` | Doc officielle · 2026 | Leviers de latence — pertinent pour un agent en CI sous contrainte de temps | M8 |
| **Context windows** | `https://platform.claude.com/docs/en/build-with-claude/context-windows` | Doc officielle · consultée 28/07/2026 | Fonctionnement de la fenêtre de contexte et de son remplissage | M4 |
| **Prompt caching** | `https://platform.claude.com/docs/en/build-with-claude/prompt-caching` | Doc officielle · 2026 | Mécanisme de cache de préfixe — le levier n°1 de réduction du coût d'entrée d'une campagne répétitive | M4, M8 |
| **Compaction (server-side)** | `https://platform.claude.com/docs/en/build-with-claude/compaction` | Doc officielle (bêta) · 2026 | Compaction côté serveur, avec en-tête bêta dédié | M4 |
| **Context editing** | `https://platform.claude.com/docs/en/build-with-claude/context-editing` | Doc officielle (bêta) · 2026 | Édition programmatique du contexte en cours de session | M4 |
| **Memory tool** | `https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool` | Doc officielle (GA) · 2026 | Mémoire persistante côté outil — alternative au fichier de contexte | M4, M6 |
| **Token counting** | `https://platform.claude.com/docs/en/build-with-claude/token-counting` | Doc officielle · 2026 | Comptage exact **avant** exécution — la base d'une estimation de budget honnête | M4, M8 |
| **Batch processing** | `https://platform.claude.com/docs/en/build-with-claude/batch-processing` | Doc officielle · 2026 | **−50 %** sur entrée et sortie ; remises batch et cache **se cumulent** | M4, M8 |
| **Pricing** | `https://platform.claude.com/docs/en/about-claude/pricing` | Doc officielle · 2026 | ⚠️ **Le contexte long n'entraîne aucun surcoût par token** — le coût vient du volume, pas de la longueur unitaire | M4, M8 |
| **Plans & Pricing (offres)** | `https://claude.com/pricing` | Page officielle · 07/2026 | Grille des offres — utile pour arbitrer abonnement vs API en formation | Setup |
| **Models overview** | `https://platform.claude.com/docs/en/about-claude/models/overview` | Doc officielle · 07/2026 | Catalogue des modèles et de leurs caractéristiques | M4, M8 |
| **Choosing the right model** | `https://platform.claude.com/docs/en/about-claude/models/choosing-a-model` | Doc officielle · 2026 | Critères de choix — support de l'objectif « choisir un modèle sur un critère explicite » | M4 |
| **Model IDs and versioning** | `https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions` | Doc officielle · 2026 | Format des identifiants complets et datés — la base de l'épinglage en CI | M8, M10 |
| **Model deprecations** | `https://platform.claude.com/docs/en/about-claude/model-deprecations` | Doc officielle · MAJ 06/2026 | Calendrier des dépréciations et retraits — source du test de garde à 90 jours de M10 | M10 |
| **Upgrade between model versions (migration guide)** | `https://platform.claude.com/docs/en/about-claude/models/migration-guide` | Doc officielle · 2026 | Procédure de migration entre versions, avec les points de rupture | M10 |
| **Thinking (adaptive thinking, effort)** | `https://platform.claude.com/docs/en/build-with-claude/thinking` | Doc officielle · 2026 | Paramétrage du raisonnement étendu ; ⚠️ l'ancien paramètre de budget de tokens a été remplacé | M4 |
| **Rate limits** | `https://platform.claude.com/docs/en/api/rate-limits` | Doc officielle · 2026 | Limites de débit — à connaître avant de lancer une campagne parallélisée en CI | M8, M10 |
| **Embeddings** | `https://platform.claude.com/docs/en/build-with-claude/embeddings` | Doc officielle · 2026 | Vectorisation — pertinent pour un corpus documentaire de test | M4 |
| **Computer use tool** | `https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool` | Doc officielle · 2026 | La doc recommande explicitement les cas d'usage *« où la vitesse n'est pas critique (par exemple, automated software testing) »* | M1, M5 |
| **Legal summarization (méta-summarization)** | `https://platform.claude.com/docs/en/about-claude/use-case-guides/legal-summarization` | Doc officielle · 2026 | Technique de **méta-summarization** (découpage puis fusion), avec un exemple chiffré du rapport de coût entre modèles | M3 |

## 4.4 Model Context Protocol (MCP)

| Titre | URL | Type · Date | Apport | Modules |
|---|---|---|---|---|
| **Spécification MCP — révision courante** | `https://modelcontextprotocol.io/specification/latest` | Spécification officielle · révision 2025-11-25 | Point d'entrée normatif | M5 |
| **Key Changes — Spécification MCP 2025-11-25 (changelog)** | `https://modelcontextprotocol.io/specification/2025-11-25/changelog` | Spécification · 25/11/2025 | 9 changements majeurs, dont la primitive expérimentale `tasks` explicitement conçue pour les *« test execution platforms that need to stream logs from long-running suites »* | M5 |
| **The 2026-07-28 MCP Specification Release Candidate** | `https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/` | Billet des mainteneurs · RC gelée 21/05/2026 | ⚠️ **À revérifier avant la session** : protocole **stateless**, en-têtes obligatoires, dépréciation de trois primitives. Au moment de la collecte, la page de spécification correspondante était vide | M5 |
| **Architecture — Spécification MCP** | `https://modelcontextprotocol.io/specification/2025-11-25/architecture` | Spécification · 2025 | Relation **1:1** client↔serveur : *« Servers should not be able to read the whole conversation, nor "see into" other servers »* — explique l'absence de fuite croisée entre serveurs | M5 |
| **Tools — Spécification MCP** | `https://modelcontextprotocol.io/specification/2025-11-25/server/tools` | Spécification · 2025 | Distingue erreurs de protocole et **erreurs d'exécution d'outil**, ces dernières devant contenir un retour **actionnable** — modèle pour un outil de test | M5, M6 |
| **Understanding MCP clients — Roots, Sampling, Elicitation** | `https://modelcontextprotocol.io/docs/learn/client-concepts` | Doc officielle · 2026 | ⚠️ Les *roots* sont *« a coordination mechanism, not a security boundary »* ; l'élicitation est le mécanisme propre pour demander confirmation avant un scénario destructif | M5, M11 |
| **Transports — stdio et Streamable HTTP** | `https://modelcontextprotocol.io/specification/2025-11-25/basic/transports` | Spécification · 2025 | En stdio, le serveur **ne doit rien écrire d'autre que du MCP valide sur `stdout`** — explique pourquoi un `console.log` mal placé casse un serveur maison | M5 |
| **Security Best Practices — MCP** | `https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices` (ancienne URL : `.../specification/2025-06-18/basic/security_best_practices`) | Document officiel · révisé 25/11/2025 | **7 classes d'attaques normatives** : *Confused Deputy*, *Token Passthrough* (« MUST NOT accept any tokens that were not explicitly issued for the MCP server »), SSRF, détournement de session, validation d'URL, minimisation des portées | M5, M11 |
| **The MCP Registry** | `https://modelcontextprotocol.io/registry/about` · API : `https://registry.modelcontextprotocol.io/` | Registre officiel (preview) · depuis 08/09/2025 | ⚠️ Le registre **délègue le scan de sécurité** aux registres de paquets : « être dans le registre » ≠ « être audité » | M5, M11 |
| **MCP joins the Agentic AI Foundation** | `https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/` | Billet officiel · 09/12/2025 | Passage sous gouvernance neutre (fondation) ; argument de pérennité face à une DSI | M5 |
| **One Year of MCP: November 2025 Spec Release** | `https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/` | Billet officiel · 25/11/2025 | Vue d'ensemble de l'adoption industrielle et de la gouvernance — idéale pour une diapositive d'introduction | M5 |
| **Playwright MCP — Introduction** | `https://playwright.dev/mcp/introduction` | Doc officielle Microsoft · 2026 | **Le chiffre décisif** : opère sur l'**arbre d'accessibilité**, pas sur les pixels ; **~200-400 tokens par snapshot** contre des milliers pour une capture. Chaque élément reçoit une référence | M5, M9 |
| **microsoft/playwright-mcp (dépôt)** | `https://github.com/microsoft/playwright-mcp` | Dépôt officiel Microsoft · 2026 | Famille d'outils d'assertion, traçage, génération de locator, simulation réseau. ⚠️ **Nuance 2026** : le README recommande désormais Playwright CLI + skills plutôt que MCP pour les agents de code, MCP restant pertinent pour les boucles à état persistant | M5 |
| **Chrome DevTools MCP — Tool Reference** | `https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md` | Dépôt officiel Google · 2026 | Outils de performance (Core Web Vitals), console, réseau, instantanés mémoire, bridage CPU/réseau — le complément de Playwright pour une SPA | M5, M9 |
| **Chrome DevTools (MCP) for your AI agent** | `https://developer.chrome.com/blog/chrome-devtools-mcp` | Billet officiel Google · 23/09/2025 | Formule le problème central : les agents *« are effectively programming with a blindfold on »* | M5 |
| **SonarQube MCP Server** | `https://docs.sonarsource.com/sonarqube-mcp-server/reference/tools` · `https://github.com/SonarSource/sonarqube-mcp-server` | Doc éditeur · 2026 | Fait le pont entre « tests écrits par l'IA » et « qualité mesurée objectivement » : quality gate et couverture avant fusion | M5 |
| **GitHub MCP Server** | `https://github.com/github/github-mcp-server` | Dépôt officiel · 2026 | Outil décisif pour la QA : récupération des **logs des jobs échoués uniquement** — support de la boucle « CI rouge → diagnostic → correction » | M5, M8 |
| **Filesystem MCP Server (serveur de référence)** | `https://github.com/modelcontextprotocol/servers/blob/main/src/filesystem/README.md` | Serveur de référence (MIT) · 2026 | Meilleur exemple concret d'**annotations d'outils** (destructif, idempotent) et d'implémentation des *roots* | M5 |
| **MSSQL MCP Server (.NET 8)** | `https://github.com/Azure-Samples/SQL-AI-samples/blob/main/MssqlMcp/dotnet/README.md` | Exemple officiel Microsoft · 2026 | Le plus proche de la stack du TP (C#) ; ⚠️ porte un avertissement **« EXPERIMENTAL USE ONLY »** — une leçon de gouvernance en soi | M5 |
| **Postgres MCP Pro** | `https://github.com/crystaldba/postgres-mcp` | Dépôt (MIT) · 2026 | Démonstration parfaite du **moindre privilège** : mode restreint en lecture seule avec analyse syntaxique du SQL pour empêcher le contournement. ⚠️ Le serveur Postgres de référence officiel est **archivé** | M5, M11 |
| **Axe MCP Server — Deque** | `https://www.deque.com/axe/mcp-server/` | Page produit · MAJ 17/07/2026 | Exposition des règles d'accessibilité à un agent | M9 |

## 4.5 Panorama concurrentiel — assistants de code et outils QA IA

| Titre | URL | Type · Date | Apport | Modules |
|---|---|---|---|---|
| **GitHub Copilot Chat cheat sheet** | `https://docs.github.com/en/copilot/reference/chat-cheat-sheet` | Doc officielle · 2026 | ⚠️ La commande de génération de tests **n'est pas identique selon l'IDE** — à démontrer côté Angular vs .NET | M5 |
| **Writing tests with GitHub Copilot** | `https://docs.github.com/en/copilot/tutorials/write-tests` | Tutoriel officiel · 2026 | GitHub écrit que les tests générés « peuvent ne pas couvrir tous les scénarios, vous devez toujours relire ». Astuce : ouvrir des fichiers de tests existants dans les onglets adjacents pour que l'outil déduise le framework | M5 |
| **Adding repository custom instructions** | `https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions` | Doc officielle · 2026 | Chemin exact `.github/copilot-instructions.md` ; le fichier apparaît dans les **références** de la réponse — preuve traçable que la convention a été injectée | M5 |
| **Using custom instructions for Copilot code review** | `https://docs.github.com/en/copilot/tutorials/customize-code-review` | Doc officielle · 2026 | Instructions **par chemin** — permet une règle distincte pour les specs front et les tests back dans un même dépôt | M5 |
| **Copilot code review now generally available** | `https://github.blog/changelog/2025-04-04-copilot-code-review-now-generally-available/` | Changelog · 04/04/2025 | **Plus d'un million de développeurs** en un mois de préversion publique | M5 |
| **Copilot coding agent is now generally available** | `https://github.blog/changelog/2025-09-25-copilot-coding-agent-is-now-generally-available/` | Changelog · 25/09/2025 | L'agent asynchrone ouvre une **pull request en brouillon** ; « Improving test coverage » est une tâche listée explicitement | M5, M8 |
| **GitHub Copilot CLI is now generally available** | `https://github.blog/changelog/2026-02-25-github-copilot-cli-is-now-generally-available/` | Changelog · 25/02/2026 | Agents spécialisés intégrés dont un agent **Task** qui « lance les builds et les tests » — boucle rouge/vert en terminal | M5 |
| **About GitHub Copilot cloud agent** | `https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent` | Doc officielle · 2026 | ⚠️ **Renommage** : « coding agent » → « **cloud agent** » ; les anciens slugs redirigent | M5, M8 |
| **Configure the development environment (cloud agent)** | `https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment` | Doc officielle · 2026 | Conditionne la capacité de l'agent à **réellement exécuter** la suite de tests | M8 |
| **Requests in GitHub Copilot (facturation)** | `https://docs.github.com/en/copilot/concepts/billing/copilot-requests` | Doc officielle · 2026 | Modèle de décompte des requêtes — nécessaire pour chiffrer un coût en CI | M8 |
| **Creating a pull request summary with GitHub Copilot** | `https://docs.github.com/copilot/using-github-copilot/creating-a-pull-request-summary-with-github-copilot` | Doc officielle · 2026 | ⚠️ Génération **disponible uniquement en anglais**, résumés **à relire avant publication** | M3 |
| **AGENTS.md — a README for agents** | `https://agents.md/` | Spécification ouverte (fondation) · 2026 | **Plus de 60 000 projets** ; l'exemple canonique contient une section « Testing instructions » ; règle de conflit : *« the closest AGENTS.md to the edited file wins »* | M4, M5 |
| **Rules — Cursor Docs** | `https://cursor.com/docs/rules` | Doc éditeur · 2026 | ⚠️ Un fichier `.md` posé dans le dossier de règles est **ignoré** (mauvaise extension) ; portées par motif de chemin ; règles à garder sous 500 lignes | M5 |
| **Cursor Changelog** | `https://cursor.com/changelog` | Changelog éditeur · 2026 | Hooks de fin de tour permettant de câbler l'exécution des tests avant clôture | M5 |
| **Cascade Overview — Windsurf Docs** | `https://docs.windsurf.com/windsurf/cascade/cascade` | Doc éditeur · 2026 | ⚠️ **Limite de 20 appels d'outils par prompt** — principal frein d'une boucle « écrire test → lancer → corriger » longue | M5 |
| **Memories & Rules — Windsurf Docs** | `https://docs.windsurf.com/windsurf/cascade/memories` | Doc éditeur · 2026 | Limites de taille par fichier de règles ; **l'exemple officiel de la doc est une règle de test** | M5 |
| **Codex CLI — OpenAI Developers** | `https://developers.openai.com/codex/cli` | Doc éditeur · 2026 | Revue de code locale par **un agent séparé** — le patron « générateur ≠ relecteur » | M5, M6 |
| **Codex web (cloud)** | `https://developers.openai.com/codex/cloud` | Doc éditeur · 2026 | ⚠️ Le contrôle d'accès réseau conditionne la restauration des paquets, donc la capacité à **exécuter** la suite | M5, M8 |
| **openai/codex (dépôt)** | `https://github.com/openai/codex` | Dépôt (Apache-2.0) · 2026 | **784 releases** au moment de la collecte : toute capture d'écran d'agent CLI est périmée en quelques semaines | M5 |
| **google-gemini/gemini-cli** | `https://github.com/google-gemini/gemini-cli` | Dépôt (Apache 2.0) · 2026 | Sortie JSON intégrable en pipeline CI ; palier gratuit documenté | M5, M8 |
| **Gemini Code Assist overview** | `https://developers.google.com/gemini-code-assist/docs/overview` | Doc éditeur · MAJ 23/06/2026 | ⚠️ Avertissement officiel : l'outil « can generate output that seems **plausible but is factually incorrect** » — **la meilleure citation pour justifier la relecture systématique** | M1, M5 |
| **Generate tests — JetBrains AI Assistant** | `https://www.jetbrains.com/help/ai-assistant/generate-tests-with-ai.html` | Doc éditeur · 18/03/2026 | Action IDE structurée avec **diff** avant application — contre-exemple utile à une commande de chat | M5 |
| **Junie by JetBrains** | `https://www.jetbrains.com/help/ai-assistant/junie-agent.html` | Doc éditeur · 18/06/2026 | Mode de débogage pilotant points d'arrêt et inspection de variables — **unique sur le marché** pour diagnostiquer un test instable au runtime | M5, M7 |
| **Generating unit tests with Amazon Q** | `https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/test-generation.html` | Doc AWS · 2026 | Seul acteur exposant un **taux d'acceptation** des tests générés ; ⚠️ **et seul dont l'agent de test ne couvre ni C# ni TypeScript** — discriminant décisif pour la stack du TP | M5 |
| **GenAI Test Automation with Self-Healing — mabl** | `https://www.mabl.com/auto-healing-tests` | Page produit · 2026 | Positionnement du self-healing comme argument commercial — à confronter aux garde-fous de M7 | M5, M7 |
| **How auto-heal works — mabl** | `https://help.mabl.com/hc/en-us/articles/19078583792404-How-auto-heal-works` | Doc technique · MAJ 07/05/2026 | Mécanisme en deux temps : correspondance standard, puis auto-réparation par IA **après plusieurs exécutions réussies** | M7 |
| **How mabl enhances your testing with AI** | `https://help.mabl.com/hc/en-us/articles/26881384186004-How-mabl-enhances-your-testing-with-AI` | Doc officielle · MAJ 24/04/2026 | Périmètre exact des fonctions IA de la plateforme | M5 |
| **Self-Healing — Applitools (Execution Cloud)** | `https://applitools.com/docs/eyes/concepts/test-execution/execution-cloud/self-healing` | Doc éditeur · 2026 | Réparation par comparaison d'attributs avec mémorisation du sélecteur réparé | M7 |
| **Applitools Eyes / Visual AI** | `https://applitools.com/platform/eyes/` · `https://applitools.com/platform/validate/visual-ai` · `https://applitools.com/docs/autonomous/visual-ai` | Pages produit et doc · 2026 | Comparaison visuelle par modèle plutôt que pixel à pixel | M9 |
| **Applitools Autonomous / Ultrafast Test Grid** | `https://applitools.com/platform/autonomous/` · `https://applitools.com/platform/ultrafast-grid` | Pages produit · 2026 | Exécution multi-navigateurs et génération autonome de tests | M5, M9 |
| **Testim (Tricentis)** | `https://www.tricentis.com/products/test-automation-web-apps-testim` | Page produit · MAJ 26/05/2026 | Plateforme E2E à self-healing | M5 |
| **Tricentis Tosca — Vision AI** | `https://www.tricentis.com/products/automate-continuous-testing-tosca/vision-ai` | Page produit · MAJ 24/04/2026 | Approche model-based pour applications d'entreprise | M5 |
| **Tricentis SeaLights — Quality intelligence** | `https://www.tricentis.com/products/quality-intelligence-sealights` | Page produit · MAJ 24/04/2026 | Intelligence de couverture et sélection de tests par impact | M5, M8 |
| **testRigor** | `https://testrigor.com/` | Page produit · 2026 | Tests en langage naturel — à évaluer sur le critère « portabilité du livrable » | M5 |
| **Functionize** | `https://www.functionize.com/` | Page produit · 2026 | Plateforme de test pour code écrit par IA | M5 |
| **Momentic** | `https://momentic.ai/` | Page produit · 2026 | E2E piloté par IA, changelog actif jusqu'en juin 2026 | M5 |
| **Autify Genesis** | `https://autify.com/products/autify-genesis` | Page produit · 2026 | Conception de tests assistée par IA | M5 |
| **KaneAI (TestMu AI)** | `https://www.testmuai.com/kane-ai/` | Page produit · 2026 | Agent autonome d'automatisation de test | M5 |
| **Octomind** | `https://octomind.dev/` | Page produit (bêta publique) · 2026 | Génération et maintenance automatiques de tests E2E | M5 |
| **Meticulous AI** | `https://www.meticulous.ai/` | Page produit · 2026 | Auto-génération de tests à partir du trafic réel — approche distincte de la génération par prompt | M5 |
| **Katalon TrueTest — Generate test cases** | `https://docs.katalon.com/katalon-truetest/test-case-generation-with-truetest/generate-test-cases-with-katalon-truetest` | Doc éditeur · notes de version juin 2026 | Génération de cas de test à partir de l'usage réel | M5 |
| **Katalon AI Assistant Overview** | `https://docs.katalon.com/katalon-studio/studioassist/studioassist-overview` | Doc éditeur · **« Last updated: July 2026 »** | La source éditeur la plus fraîche du corpus | M5 |
| **Diffblue Cover for Java** | `https://www.diffblue.com/diffblue-cover/` | Page produit · 2026 | **Apprentissage par renforcement, pas de complétion LLM** : tests « garantis de compiler et de s'exécuter », exécution 100 % locale — le contrepoint déterministe à citer | M5 |
| **qodo-ai/qodo-cover** | `https://github.com/qodo-ai/qodo-cover` | Dépôt (AGPL-3.0) · 2026 | ⚠️ **Bandeau officiel : « This repository is no longer maintained ».** À lire pour son **architecture en 4 composants** (runner, parseur de couverture, constructeur de prompt, appelant IA) et sa boucle qui **valide que la couverture augmente réellement** | M5, M6 |
| **The Qodo Code Review experience** | `https://docs.qodo.ai/code-review` | Doc éditeur · 2026 | Revue de PR assistée — comparatif avec les offres intégrées | M5 |
| **Cypress AI Skills** | `https://docs.cypress.io/app/tooling/ai-skills` | Doc officielle · 2026 | **3 skills IA officiels** ; résolution d'élément et auto-réparation par IA | M5, M7 |
| **Cypress best practices** | `https://docs.cypress.io/app/core-concepts/best-practices` | Doc officielle · 2026 | Recommande les attributs dédiés car ils *« will not change from CSS style or JS behavioral changes »* | M1, M5 |
| **Waiting Strategies — Selenium** | `https://www.selenium.dev/documentation/webdriver/waits/` | Doc officielle · 2026 | Distingue attente implicite et explicite ; **déconseille explicitement de mélanger les deux** — source d'une catégorie de flakiness | M7 |
| **Page object models — Selenium** | `https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/` | Doc officielle · 2026 | Définition canonique du patron *page object* | M5 |

## 4.6 Stack de test du TP — Angular, .NET, Playwright

| Titre | URL | Type · Version | Apport | Modules |
|---|---|---|---|---|
| **Unit testing — Angular** | `https://angular.dev/guide/testing` | Doc officielle · v22, 2026 | Point d'entrée du test unitaire Angular | M1 à M9 |
| **Migrating from Karma to Vitest — Angular** | `https://angular.dev/guide/testing/migrating-to-vitest` | Doc officielle · v22, 2026 | ⚠️ Le runner par défaut a changé : un support qui décrit encore Karma comme la norme est daté | M1 |
| **Testing with Karma and Jasmine — Angular** | `https://angular.dev/guide/testing/karma` | Doc officielle · v22, 2026 | Pour les dépôts non migrés | M1 |
| **Testing Utility APIs (TestBed, ComponentFixture, DebugElement)** | `https://angular.dev/guide/testing/utility-apis` | Doc officielle · v22, 2026 | API de test Angular utilisées dans les exemples front | M1, M9 |
| **Zone.js Testing Utilities** | `https://angular.dev/guide/testing/zone-js-testing-utilities` | Doc officielle · 2026 | `fakeAsync`, `tick` — sources classiques de flakiness quand mal employés | M7 |
| **Angular without ZoneJS (Zoneless)** | `https://angular.dev/guide/zoneless` | Doc officielle · v22, 2026 | Conséquences du mode zoneless sur les stratégies d'attente en test | M7 |
| **Component harnesses overview (Angular CDK)** | `https://angular.dev/guide/testing/component-harnesses-overview` | Doc officielle · 2026 | Alternative robuste aux sélecteurs bruts côté composant | M5 |
| **Code coverage — Angular** | `https://angular.dev/guide/testing/code-coverage` | Doc officielle · v22, 2026 | Production du rapport de couverture front | M3, M12 |
| **Accessibility in Angular** | `https://angular.dev/best-practices/a11y` | Doc officielle · v22, 2026 | Bonnes pratiques d'accessibilité côté framework | M9 |
| **Vitest — Getting Started** | `https://vitest.dev/guide/` | Doc officielle · v4.x, 2026 | Runner front du TP | M1 |
| **Vitest Browser Mode** | `https://vitest.dev/guide/browser/` | Doc officielle · 2026 | Exécution en navigateur réel avec fournisseur Playwright | M1, M9 |
| **Jest — Getting Started** | `https://jestjs.io/docs/getting-started` | Doc officielle · v30.4, MAJ 07/05/2026 | Alternative pour les dépôts existants | M1 |
| **Angular Testing Library — Introduction** | `https://testing-library.com/docs/angular-testing-library/intro` | Doc officielle · 2024-2026 | Approche « tester comme l'utilisateur » côté composant | M1 |
| **Guiding Principles (Testing Library)** | `https://testing-library.com/docs/guiding-principles` | Doctrine officielle · 2026 | *« The more your tests resemble the way your software is used, the more confidence they can give you »* — fondement de la hiérarchie de locators | M5 |
| **Analog — Using Vitest with an Angular Project** | `https://analogjs.org/docs/features/testing/vitest` | Doc officielle (MIT) · 2026 | Configuration de référence Vitest + Angular | M1 |
| **Playwright — Installation (Node.js / TypeScript)** | `https://playwright.dev/docs/intro` | Doc officielle · 2026 | Installation et premiers pas | M2, M5 |
| **Locators — Playwright** | `https://playwright.dev/docs/locators` | Doc officielle · 2026 | *« Testing by test ids is the most resilient way of testing »* ; les sélecteurs CSS/XPath longs sont qualifiés de **« bad practice that leads to unstable tests »** | M5, M7 |
| **Test generator (codegen) — Playwright** | `https://playwright.dev/docs/codegen` | Doc officielle · 2026 | Le générateur *« prioritise role, text and test id locators »* — la solution de repli quand MCP n'est pas disponible | M5 |
| **Playwright Test — Agents (planner / generator / healer)** | `https://playwright.dev/docs/test-agents` | Doc officielle · 2026 | 3 agents natifs : exploration et plan Markdown, génération de specs, réparation de tests cassés | M5, M7 |
| **Trace viewer — Playwright** | `https://playwright.dev/docs/trace-viewer` | Doc officielle · 2026 | Rejeu post-mortem avec **snapshots DOM complets par action**, réseau et console — matière première du dossier d'échec de M7 | M7 |
| **Retries — Playwright** | `https://playwright.dev/docs/test-retries` | Doc officielle · 2026 | Détection automatique du statut « flaky » ; recommandation officielle d'activer la trace à la première relance | M7, M8 |
| **Sharding — Playwright** | `https://playwright.dev/docs/test-sharding` | Doc officielle · 2026 | Découpage et fusion des rapports — levier principal de réduction du pipeline | M8 |
| **Reporters — Playwright** | `https://playwright.dev/docs/test-reporters` | Doc officielle · 2026 | Reporters combinables dont **JUnit XML** — entrée idéale d'un agent de synthèse | M3, M7 |
| **Accessibility testing — Playwright** | `https://playwright.dev/docs/accessibility-testing` | Doc officielle · 2026 | Intégration axe-core dans un test Playwright | M9 |
| **Visual comparisons — Playwright** | `https://playwright.dev/docs/test-snapshots` | Doc officielle · v1.62, 2026 | Régression visuelle native | M9 |
| **PageAssertions (`toHaveScreenshot`) — Playwright** | `https://playwright.dev/docs/api/class-pageassertions` | Référence API · v1.62 | Paramètres de seuil — ⚠️ à **baisser** après traitement des causes d'instabilité, jamais à monter | M9 |
| **Docker — Playwright** | `https://playwright.dev/docs/docker` | Doc officielle · v1.62 | Image officielle — condition de reproductibilité des captures de référence | M9 |
| **Playwright for .NET — Installation** | `https://playwright.dev/dotnet/docs/intro` | Doc officielle · 2026 | Variante C# pour les équipes back | M5 |
| **Testing in .NET** | `https://learn.microsoft.com/en-us/dotnet/core/testing/` | Doc Microsoft Learn · MAJ 27/04/2026 | Point d'entrée du test .NET | M1 à M12 |
| **Unit testing best practices for .NET** | `https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices` | Doc Microsoft Learn · 2025 | Nommage, isolation, un comportement par test — les points 3 et 4 de la grille de revue de l'annexe B | M2 |
| **Integration tests in ASP.NET Core (WebApplicationFactory)** | `https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-10.0` | Doc Microsoft Learn · MAJ 22/07/2026 | Tests d'intégration en mémoire — support des tests d'API de F3 | M2, M9 |
| **WebApplicationFactory (référence API)** | `https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.testing.webapplicationfactory-1?view=aspnetcore-10.0` | Référence API · MAJ 2026 | Points d'extension pour substituer une dépendance en test | M2 |
| **Test Minimal API apps** | `https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/test-min-api?view=aspnetcore-10.0` | Doc Microsoft Learn · 2025 | Variante Minimal API | M2 |
| **Testing with `dotnet test`** | `https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test` | Doc Microsoft Learn · MAJ 05/06/2026 | La page la plus fraîche du corpus Microsoft sur l'exécution des tests | M1, M8 |
| **`dotnet test` avec Microsoft.Testing.Platform (référence CLI)** | `https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test-mtp` | Référence CLI · 2026 | ⚠️ **`--minimum-expected-tests`** échoue avec un **code de sortie 9** — garde-fou précieux contre une suite silencieusement vide | M8 |
| **Microsoft.Testing.Platform (MTP) overview** | `https://learn.microsoft.com/en-us/dotnet/core/testing/microsoft-testing-platform-intro` | Doc Microsoft Learn · MAJ 27/04/2026 | Nouvelle plateforme d'exécution des tests .NET | M1, M8 |
| **Test platforms overview for .NET (VSTest vs MTP)** | `https://learn.microsoft.com/en-us/dotnet/core/testing/test-platforms-overview` | Doc Microsoft Learn · 2026 | Choix de plateforme et conséquences en CI | M8 |
| **Microsoft.Testing.Platform code coverage** | `https://learn.microsoft.com/en-us/dotnet/core/testing/microsoft-testing-platform-code-coverage` | Doc Microsoft Learn · 2026 | Couverture native à la nouvelle plateforme | M3 |
| **Use code coverage for unit testing (Coverlet + ReportGenerator)** | `https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-code-coverage` | Doc Microsoft Learn · 2026 | Chaîne de couverture utilisée dans le dossier de recette | M3, M12 |
| **dotnet-coverage (outil global)** | `https://learn.microsoft.com/en-us/dotnet/core/additional-tools/dotnet-coverage` | Doc Microsoft Learn · 2025 | Fusion de rapports de couverture entre projets | M3, M8 |
| **MSTest overview** | `https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-mstest-intro` | Doc Microsoft Learn · MAJ 09/02/2026 | Alternative de framework | M1 |
| **xUnit.net v3 — Getting Started et migration** | `https://xunit.net/docs/getting-started/v3/getting-started` · `https://xunit.net/docs/getting-started/v3/migration` · `https://xunit.net/releases/` | Doc officielle · 2026 | ⚠️ **Le paquet s'appelle `xunit.v3`** ; la v2 est explicitement en **mode maintenance**. Apports utiles : `Assert.Skip`, tests explicites, `TestContext` | M1 à M12 |
| **Running Tests in Parallel (xUnit.net)** | `https://xunit.net/docs/running-tests-in-parallel` | Doc officielle · 2026 | Collections et parallélisme — source classique d'échecs par ordre d'exécution | M7, M8 |
| **NUnit** | `https://nunit.org/` · `https://docs.nunit.org/` | Doc officielle · 2026 | Alternative de framework | M1 |
| **Testcontainers for .NET** | `https://dotnet.testcontainers.org/` · `https://dotnet.testcontainers.org/modules/postgres/` | Doc officielle · 2026 | PostgreSQL éphémère — c'est ce qui rend Docker indispensable dès M3 | M3 |
| **Reqnroll — et fin de vie officielle de SpecFlow** | `https://reqnroll.net/` · annonce : `https://reqnroll.net/news/2025/01/specflow-end-of-life-has-been-announced/` · migration : `https://docs.reqnroll.net/latest/guides/migrating-from-specflow.html` | Doc officielle · annonce 09/01/2025 | ⚠️ **Un support qui recommande encore SpecFlow sur .NET moderne est périmé** | M2 |
| **Reqnroll Documentation** | `https://docs.reqnroll.net/latest/` | Doc officielle · 2026 | Liaison Gherkin ↔ code C# | M2 |
| **Gherkin Reference (Cucumber)** | `https://cucumber.io/docs/gherkin/reference/` | Doc officielle · 2026 | Référence normative du format — base des contraintes du prompt P-12 | M2 |
| **Reporting — Cucumber** | `https://cucumber.io/docs/cucumber/reporting/` | Doc officielle · 2026 | Formats de rapport exploitables en synthèse | M3 |
| **OpenAPI Specification** | `https://spec.openapis.org/oas/latest.html` · `https://www.openapis.org/` | Spécification officielle · 2026 | Format d'entrée structuré canonique pour la génération de tests d'API | M2, M9 |
| **Verify (snapshot testing .NET)** | `https://github.com/VerifyTests/Verify` | Dépôt officiel · 2026 | Tests d'instantané côté .NET | M3 |
| **NSubstitute** | `https://nsubstitute.github.io/` · analyseurs : `https://nsubstitute.github.io/help/nsubstitute-analysers` | Doc officielle · 2026 | Bibliothèque de doublures utilisée dans le TP | M1 |
| **Moq** | `https://github.com/devlooped/moq` | Dépôt officiel · dernière release 09/2024 | ⚠️ Aucune release depuis septembre 2024 — point de vigilance sur la pérennité | M1 |
| **Bogus** | `https://github.com/bchavez/Bogus` | Dépôt officiel · v35.x, 2025 | Générateur de données factices .NET ; la graine garantit la reproductibilité | M3 |
| **AutoFixture** | `https://github.com/AutoFixture/AutoFixture/releases` | Dépôt officiel · 2026 | Génération d'objets de test — complémentaire de Bogus | M3 |
| **Faker (documentation de référence)** | `https://faker.readthedocs.io/` | Doc officielle · 2026 | Concepts de génération de données factices et de graine | M3 |
| **Hypothesis** | `https://hypothesis.readthedocs.io/` | Doc officielle · 2026 | Property-based testing de référence : génération de centaines de cas avec **shrinking** automatique | M3 |
| **fast-check** | `https://fast-check.dev/` | Doc officielle · 2026 | PBT pour TypeScript ; a permis de détecter des défauts dans des projets majeurs de l'écosystème | M3 |
| **SDV — Synthetic Data Vault** | `https://docs.sdv.dev/sdv` | Doc officielle · 2026 | Données tabulaires synthétiques **avec évaluation statistique de fidélité** | M3 |
| **Stryker Mutator — Documentation** | `https://stryker-mutator.io/docs/` | Doc officielle · 2026 | Mutation testing JS/TS et .NET ; **plus de 30 opérateurs**, exécution parallélisée | M3, M12 |
| **PIT Mutation Testing** | `https://pitest.org/` | Doc officielle · 2026 | Le **pourcentage de mutants tués** mesure la qualité réelle des assertions, là où la couverture ne mesure que l'exécution | M3 |
| **JaCoCo — Documentation** | `https://www.jacoco.org/jacoco/trunk/doc/` | Doc officielle · 2026 | DTD XML publique des rapports — format directement exploitable par un agent de synthèse | M3 |
| **Coverage.py Documentation** | `https://coverage.readthedocs.io/` | Doc officielle · 2026 | Rapports texte, HTML, XML, LCOV et JSON | M3 |
| **coverlet-coverage/coverlet** | `https://github.com/coverlet-coverage/coverlet` | Dépôt officiel · 2026 | Équivalent .NET de JaCoCo | M3 |
| **Allure Report Documentation** | `https://allurereport.org/docs/` | Doc officielle · 2026 | **30+ intégrations** de frameworks, avec quality gate et analyse de stabilité | M3 |
| **AI Test Case Generation — Xray Cloud** | `https://docs.getxray.app/space/XRAYCLOUD/392921171/AI+Test+Case+Generation` | Doc éditeur · 2025-2026 | Génération depuis les exigences, avec une étape **obligatoire** « Review, Edit & Select » — la revue humaine imposée par l'outil | M2 |

## 4.7 CI/CD, secrets et sélection de tests

| Titre | URL | Type · Date | Apport | Modules |
|---|---|---|---|---|
| **Actions limits (GitHub)** | `https://docs.github.com/en/actions/reference/limits` | Doc officielle · 2026 | Limites de durée, de concurrence et d'artefacts — contraintes de dimensionnement du pipeline | M8 |
| **Secure use reference (GitHub Actions)** | `https://docs.github.com/en/actions/reference/security/secure-use` | Doc officielle · 2026 | ⚠️ **Le SHA complet est la seule forme immuable d'épinglage d'une action** — un agent écrit spontanément un tag | M8 |
| **Configuring OpenID Connect in cloud providers** | `https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-cloud-providers` | Doc officielle · 2026 | Authentification sans secret longue durée ; `id-token: write` n'accorde **aucun** droit d'écriture sur le dépôt | M8 |
| **Running variations of jobs in a workflow (matrices)** | `https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations` | Doc officielle · 2026 | Matrices de jobs — support du sharding ; ⚠️ `fail-fast: false` est obligatoire pour ne pas perdre les autres fragments | M8 |
| **CI/CD components (GitLab)** | `https://docs.gitlab.com/ci/components/` | Doc officielle · v19.3 | Composants réutilisables — équivalent GitLab de l'action composite | M8 |
| **OpenID Connect Authentication Using ID Tokens (GitLab)** | `https://docs.gitlab.com/ci/secrets/id_token_authentication/` | Doc officielle · v19.3 | Équivalent GitLab de l'OIDC | M8 |
| **GitLab Duo Agent Platform** | `https://docs.gitlab.com/user/duo_agent_platform/` | Doc officielle · v19.3 | Offre agentique intégrée à GitLab | M5, M8 |
| **Azure Pipelines — Connect to Azure with a service connection** | `https://learn.microsoft.com/en-us/azure/devops/pipelines/library/connect-to-azure?view=azure-devops` | Doc Microsoft Learn · MAJ 15/07/2026 | Connexion de service et fédération d'identité côté Azure | M8 |
| **Microsoft-hosted agents for Azure Pipelines** | `https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops` | Doc Microsoft Learn · MAJ 17/06/2026 | Capacités et limites des agents hébergés | M8 |
| **Speed up testing by using Test Impact Analysis (TIA)** | `https://learn.microsoft.com/en-us/azure/devops/pipelines/test/test-impact-analysis?view=azure-devops` | Doc Microsoft Learn · MAJ 27/10/2025 | ⚠️ **Ne supporte pas .NET Core**, ni les tests pilotés par les données, ni les topologies multi-machines — inutilisable sur la stack du TP | M8 |
| **Manage flaky tests (Azure Pipelines)** | `https://learn.microsoft.com/en-us/azure/devops/pipelines/test/flaky-test-management?view=azure-devops` | Doc Microsoft Learn · MAJ 28/05/2025 | ⚠️ Disponible **uniquement sur le service géré**, et basculer entre détection système et détection personnalisée **efface tout l'historique** | M7, M8 |
| **Configure unit tests by using a .runsettings file** | `https://learn.microsoft.com/en-us/visualstudio/test/configure-unit-tests-by-using-a-dot-runsettings-file?view=vs-2022` | Doc Microsoft Learn · 2026 | Configuration d'exécution reproductible entre postes et CI | M8 |
| **Unhealthy tests (GitLab development docs)** | `https://docs.gitlab.com/development/testing_guide/unhealthy_tests` | Doc officielle · v19.1 | Politique publique de traitement des tests instables — modèle transposable | M7 |
| **Test Quarantine Process (GitLab Handbook)** | `https://handbook.gitlab.com/handbook/engineering/testing/quarantine-process/` | Handbook officiel · 2026 | Procédure de quarantaine **avec date de sortie et propriétaire** — le modèle du prompt P-20 | M7 |
| **Working with Flaky Tests (Datadog Test Optimization)** | `https://docs.datadoghq.com/tests/flaky_tests` | Doc éditeur · 2026 | Détection et suivi outillés de la flakiness | M7 |
| **Develocity Predictive Test Selection User Manual** | `https://docs.gradle.com/develocity/predictive-test-selection/` | Doc éditeur · 2026 | Implémentation commerciale de la sélection prédictive — utile pour comparer coût et bénéfice | M8, M12 |
| **Predictive test selection (Meta Engineering)** | `https://engineering.fb.com/2018/11/21/developer-tools/predictive-test-selection/` | Billet d'ingénierie · 21/11/2018 | Version vulgarisée du papier de recherche, avec les chiffres à ne pas sur-vendre | M8, M12 |

## 4.8 Performance, sécurité, accessibilité et visuel

| Titre | URL | Type · Date | Apport | Modules |
|---|---|---|---|---|
| **Thresholds — Grafana k6** | `https://grafana.com/docs/k6/latest/using-k6/thresholds/` | Doc officielle · 2026 | Seuils exploitables en quality gate, avec code de sortie non nul en cas de dépassement | M9 |
| **Load test types — Grafana k6** | `https://grafana.com/docs/k6/latest/testing-guides/test-types/` | Guide officiel · 2026 | Typologie : fumée, charge, stress, rupture, endurance — chacune avec sa question | M9 |
| **Open and closed models — Grafana k6** | `https://grafana.com/docs/k6/latest/using-k6/scenarios/concepts/open-vs-closed/` | Doc officielle · 2026 | **La source de l'exigence de modèle ouvert** : en modèle fermé, le débit s'auto-régule quand le système ralentit | M9 |
| **Automated performance testing — Grafana k6** | `https://grafana.com/docs/k6/latest/testing-guides/automated-performance-testing/` | Guide officiel · 2026 | Intégration en CI et arbitrage sur ce qu'on met dans une PR | M8, M9 |
| **grafana/k6 (dépôt)** | `https://github.com/grafana/k6` | Dépôt officiel · v2.x | ⚠️ **k6 est passé en v2.x** : les scripts générés à partir de tutoriels anciens utilisent des options obsolètes | M9 |
| **setup-k6-action (Grafana)** | `https://github.com/grafana/setup-k6-action` | Action CI officielle · 2026 | Installation de k6 en pipeline | M8, M9 |
| **Injection — Gatling documentation** | `https://docs.gatling.io/concepts/injection/` | Doc officielle · MAJ 02/07/2026 | Profils d'injection — équivalent conceptuel du modèle ouvert | M9 |
| **Metrics and analysis of load testing, mean and standard deviation — Gatling** | `https://docs.gatling.io/testing-concepts/mean-and-sd/` | Doc officielle · MAJ 13/07/2026 | ⚠️ **Pourquoi la moyenne ne suffit pas** : les distributions de latence ne sont pas gaussiennes | M9 |
| **Apache JMeter — Best Practices** | `https://jmeter.apache.org/usermanual/best-practices.html` | Doc officielle ASF · — | Pièges classiques de l'injecteur qui devient lui-même le goulot d'étranglement | M9 |
| **Overview — NBomber** | `https://nbomber.com/docs/getting-started/overview` | Doc officielle · 2026 | Alternative .NET native à k6 | M9 |
| **NBomber (dépôt PragmaticFlow)** | `https://github.com/PragmaticFlow/NBomber` | Dépôt officiel · v6.x | Suivi des versions | M9 |
| **Artillery — Run Your First Test** | `https://www.artillery.io/docs/get-started/first-test` | Doc officielle · MAJ 27/03/2026 | Troisième option de charge scriptable | M9 |
| **Locust — What is Locust?** | `https://docs.locust.io/en/stable/what-is-locust.html` | Doc officielle · v2.x, 2026 | Option Python, citée pour la comparaison de modèles de charge | M9 |
| **BenchmarkDotNet — Overview** | `https://benchmarkdotnet.org/articles/overview.html` | Doc officielle .NET Foundation · — | Micro-benchmark — à ne pas confondre avec un test de charge | M9 |
| **Investigate performance counters (dotnet-counters)** | `https://learn.microsoft.com/en-us/dotnet/core/diagnostics/dotnet-counters` | Doc Microsoft Learn · 2025 | Métriques serveur à relever **pendant** un tir de charge — critère de l'exercice M9-3 | M9 |
| **Performance budgets 101 — web.dev** | `https://web.dev/articles/performance-budgets-101` | Article Google/Chrome · 2018 | Notion de budget de performance opposable en CI | M9 |
| **ZAP — Automation Framework** | `https://www.zaproxy.org/docs/automate/automation-framework/` | Doc officielle · 2026 | Plan YAML avec jobs `openapi`, `activeScan`, `report` — support de l'exercice M9-2 | M9 |
| **zaproxy/action-baseline** | `https://github.com/zaproxy/action-baseline` | Action CI officielle (Apache-2.0) · 2026 | ⚠️ Le code de sortie n'est pas binaire : un `set -e` naïf casse le job | M9 |
| **Code scanning with CodeQL** | `https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning` | Doc GitHub · 2026 | SAST intégré au dépôt | M9 |
| **Semgrep — Quickstart** | `https://semgrep.dev/docs/getting-started/quickstart` | Doc éditeur · MAJ 28/04/2026 | SAST par règles, complémentaire de CodeQL | M9 |
| **Copilot Autofix pour code scanning** | `https://docs.github.com/en/code-security/concepts/code-scanning/autofix-for-code-scanning` | Doc GitHub (note de transparence) · 2026 | Correction assistée — à relire, comme toute sortie générée | M9 |
| **Auditing package dependencies (NuGet / .NET)** | `https://learn.microsoft.com/en-us/nuget/concepts/auditing-packages` | Doc Microsoft Learn · MAJ 05/05/2026 | Analyse de composition côté .NET | M9, M11 |
| **npm-audit (npm CLI v11)** | `https://docs.npmjs.com/cli/v11/commands/npm-audit` | Doc npm · MAJ 20/04/2026 | Analyse de composition côté front | M9, M11 |
| **Dependabot alerts** | `https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-alerts` | Doc GitHub · 2026 | Alerte sur dépendances vulnérables — contre-mesure directe de la catégorie chaîne d'approvisionnement | M9, M11 |
| **dequelabs/axe-core** | `https://github.com/dequelabs/axe-core` | Dépôt officiel (MPL-2.0) · v4.12, 06/2026 | Moteur d'analyse d'accessibilité ; ⚠️ la version compte, le catalogue de règles évolue | M9 |
| **axe-core — Rule Descriptions** | `https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md` | Catalogue généré · 2026 | Permet de vérifier **combien** de règles WCAG 2.2 sont réellement couvertes | M9 |
| **The Automated Accessibility Coverage Report — Deque** | `https://www.deque.com/automated-accessibility-coverage-report/` | Étude sur données d'audit · MAJ 10/07/2026 | **La source du chiffre de couverture réelle de l'automatisation** — à citer pour interdire le mot « conforme » | M9 |
| **Lighthouse accessibility score** | `https://developer.chrome.com/docs/lighthouse/accessibility/scoring` | Doc Google · MAJ 22/10/2025 | ⚠️ **Les audits manuels sont exclus du calcul du score** : 100 ne vaut pas conformité | M9 |
| **Lighthouse performance scoring** | `https://developer.chrome.com/docs/lighthouse/performance/performance-scoring` | Doc Google · 2026 | Composition du score de performance | M9 |
| **GoogleChrome/lighthouse-ci** | `https://github.com/GoogleChrome/lighthouse-ci` | Dépôt officiel Google · 2026 | Exécution de Lighthouse en pipeline avec assertions | M9 |
| **pa11y/pa11y** | `https://github.com/pa11y/pa11y` | Dépôt officiel (LGPL-3.0) · 2026 | **Deux moteurs cumulables** : la meilleure démonstration que deux outils ne trouvent pas les mêmes défauts | M9 |
| **The WebAIM Million — rapport 2026** | `https://webaim.org/projects/million/` | Étude annuelle (Utah State University) · données février 2026 | **95,9 %** des pages d'accueil présentent des échecs WCAG **détectables automatiquement** ; **56,1 erreurs par page** ; 6 types concentrent **96 %** du total. Les pages avec ARIA ont **59,1 erreurs contre 42** sans | M9 |
| **Test runner — Storybook** | `https://storybook.js.org/docs/writing-tests/integrations/test-runner` | Doc officielle · v10.5 | Exécution des stories comme tests | M9 |
| **Accessibility tests — Storybook** | `https://storybook.js.org/docs/writing-tests/accessibility-testing` | Doc officielle · v10.5 | Tests d'accessibilité au niveau composant | M9 |
| **Introduction to TurboSnap — Chromatic** | `https://www.chromatic.com/docs/turbosnap` | Doc officielle · 2026 | **Le seul document du corpus qui chiffre le coût du visual testing** : un instantané capturé = 1, un instantané copié = 0,2 — base de l'arbitrage « tout capturer vs cibler » | M9 |
| **Unstable tests debugging — Chromatic** | `https://www.chromatic.com/docs/unstable-tests` | Doc officielle · 2026 | Causes d'instabilité visuelle : animations, polices, contenus datés — à traiter **avant** de toucher au seuil | M9 |
| **Visual Testing with Percy — BrowserStack** | `https://www.browserstack.com/docs/percy/overview/visual-testing-basics` | Doc officielle · — | Alternative de plateforme | M9 |
| **garris/BackstopJS** | `https://github.com/garris/BackstopJS` | Dépôt officiel · 2026 | Option open source ; ⚠️ son seuil se calcule en **pourcentage de pixels**, là où celui de Playwright utilise une autre métrique — les deux ne sont pas comparables | M9 |
| **Web Vitals — web.dev** | `https://web.dev/articles/vitals` | Doc officielle Google · MAJ 31/10/2024 | Définition des métriques d'expérience utilisateur | M9 |
| **Interaction to Next Paint (INP)** | `https://web.dev/articles/inp` | Doc officielle Google · MAJ 02/09/2025 | Métrique de réactivité — la plus pertinente pour un tunnel de commande | M9 |
| **INP is now a Core Web Vital** | `https://web.dev/blog/inp-cwv-launch` | Annonce officielle · MAJ 12/03/2024 | Date le remplacement de la métrique précédente | M9 |
| **Cumulative Layout Shift (CLS)** | `https://web.dev/articles/cls` | Doc officielle Google · MAJ 12/04/2023 | Stabilité visuelle — cause fréquente de faux positifs en régression visuelle | M9 |
| **CrUX methodology** | `https://developer.chrome.com/docs/crux/methodology` | Doc officielle · 2024 | Différence entre données de terrain et données de laboratoire | M9 |

---

# §5. Sources réglementaires françaises et européennes

## 5.1 Protection des données — textes et autorités

| Titre | URL | Type · Date | Apport | Modules |
|---|---|---|---|---|
| **Règlement (UE) 2016/679 — RGPD (version française)** | `https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra` | Texte réglementaire (EUR-Lex, forme ELI) · adopté 27/04/2016 | Le texte primaire. À citer par article, jamais par paraphrase | M11 |
| **CNIL — IA : comment être en conformité avec le RGPD ?** | `https://www.cnil.fr/fr/intelligence-artificielle/ia-comment-etre-en-conformite-avec-le-rgpd` | Doc officielle (autorité de contrôle) · 2025 | Point d'entrée de la doctrine française sur l'IA et le RGPD | M11 |
| **CNIL — IA : comment se mettre en conformité ?** | `https://www.cnil.fr/fr/ia-comment-se-mettre-en-conformite` | Hub de fiches pratiques · — | Fiches opérationnelles, dont celles applicables aux jeux de données de test | M11 |
| **CNIL — Intelligence artificielle (espace professionnels)** | `https://www.cnil.fr/fr/technologies/intelligence-artificielle-ia` | Doc officielle · — | Panorama des positions de l'autorité | M11 |
| **CNIL — L'anonymisation de données personnelles** | `https://www.cnil.fr/fr/technologies/lanonymisation-de-donnees-personnelles` | Fiche pratique · 19/05/2020 | **Le test à trois critères** (individualisation, corrélation, inférence) — fondement de l'exercice M11-1 et du prompt P-15 | M11, M3 |
| **CNIL — L'analyse d'impact relative à la protection des données (AIPD)** | `https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd` | Méthodologie officielle · — | Quand une AIPD est requise, et ce qu'elle contient | M11 |
| **CNIL — Sécurité : encadrer les développements informatiques** | `https://www.cnil.fr/fr/securite-encadrer-les-developpements-informatiques` | Guide officiel · 2024 | **La recommandation qui interdit en pratique les données de production en test** : tests *« dans un environnement distinct de la production […] et sur des données fictives ou anonymisées »* | M3, M11 |
| **CNIL — Guide RGPD de l'équipe de développement** | `https://github.com/LINCnil/Guide-RGPD-du-developpeur` | Guide officiel (dépôt LINCnil) · GPLv3 + Licence Ouverte 2.0 | Guide fiche par fiche, directement exploitable par une équipe technique | M11 |
| **CNIL — Le CEPD met en lumière l'anonymisation et le moissonnage pour l'IA générative** | `https://www.cnil.fr/fr/cepd-ia-generative-chaines-blocs` | Communiqué CNIL (traduction CEPD) · **09/07/2026** | Position européenne la plus récente sur l'anonymisation appliquée à l'IA générative | M11 |
| **CNIL + CIANum — IA agentique et données personnelles (note exploratoire)** | `https://www.cnil.fr/fr/ia-agentique-cnil-cianum-note` | Note exploratoire · **20/07/2026** | **La source française la plus fraîche du corpus** sur les agents et les données personnelles | M11 |
| **CEPD — Opinion 28/2024 (traitement de données dans le contexte des modèles d'IA)** | `https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en` | Avis d'autorité européenne · 2024 | Cadre d'analyse commun aux autorités de contrôle européennes | M11 |
| **Commission européenne — Adequacy decisions** | `https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en` | Doc officielle · — | Liste des pays bénéficiant d'une décision d'adéquation — la question du transfert, factuellement | M11 |

## 5.2 AI Act et gouvernance de l'IA en Europe

| Titre | URL | Type · Date | Apport | Modules |
|---|---|---|---|---|
| **Règlement (UE) 2024/1689 — AI Act (version française)** | `https://eur-lex.europa.eu/eli/reg/2024/1689/oj/fra` | Texte réglementaire (EUR-Lex) · adopté 13/06/2024 | Le texte primaire. À citer par article | M11 |
| **AI Act — Shaping Europe's digital future** | `https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai` | Doc officielle (Commission) · MAJ 05/2026 | Page de référence de la Commission, tenue à jour | M11 |
| **Timeline for the Implementation of the EU AI Act (AI Act Service Desk)** | `https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act` | Doc officielle (Bureau IA / DG CNECT) · 2026 | **Le calendrier officiel** — à préférer à tout tracker tiers | M11 |
| **AI Act Single Information Platform** | `https://ai-act-service-desk.ec.europa.eu/en` | Plateforme officielle (Bureau IA) · 2026 | Point d'entrée officiel des questions de mise en conformité | M11 |
| **FAQ officielle — catégorie « Digital Omnibus »** | `https://ai-act-service-desk.ec.europa.eu/en/faq?faq_category_id=99` | FAQ officielle (Bureau IA) · 2026 | Réponses officielles sur la révision du calendrier | M11 |
| **EU agrees to simplify AI rules to boost innovation** | `https://digital-strategy.ec.europa.eu/en/news/eu-agrees-simplify-ai-rules-boost-innovation-and-ban-nudification-apps-protect-citizens` | Communiqué officiel (Commission) · 2026 | ⚠️ **Communiqué de l'accord politique** — un accord politique n'est **ni une adoption formelle ni une entrée en vigueur** | M11 |
| **Digital Omnibus on AI Regulation Proposal** | `https://digital-strategy.ec.europa.eu/en/library/digital-omnibus-ai-regulation-proposal` | Proposition législative · publiée 19/11/2025 | Le texte de la proposition qui modifie le calendrier | M11 |
| **European AI Office** | `https://digital-strategy.ec.europa.eu/en/policies/ai-office` | Doc officielle · MAJ 01/06/2026 | Rôle et compétences du Bureau IA | M11 |
| **Governance and enforcement of the AI Act** | `https://digital-strategy.ec.europa.eu/en/policies/ai-act-governance-and-enforcement` | Doc officielle · MAJ 01/06/2026 | Qui contrôle quoi, et avec quelles sanctions | M11 |
| **The General-Purpose AI Code of Practice** | `https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai` | Code de bonnes pratiques (Commission / Bureau IA) · publié 10/07/2025 | Engagements volontaires des fournisseurs de modèles à usage général | M11 |
| **Standardisation of the AI Act** | `https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation` | Doc officielle · MAJ 20/03/2026 | Articulation entre le règlement et les normes harmonisées | M11 |
| **CEN-CENELEC JTC 21 — European AI Standardization** | `https://jtc21.eu/` | Comité technique européen · MAJ 28/01/2026 | Le comité qui produit les normes harmonisées de l'AI Act | M11 |
| **Implementation Timeline — artificialintelligenceact.eu** | `https://artificialintelligenceact.eu/implementation-timeline/` | ⚠️ **Tracker indépendant** (Future of Life Institute) · « Last updated: 1 August 2024 » | ⚠️ **Le tracker le plus cité — et le plus périmé.** À citer uniquement comme contre-exemple de vérification | M11 |
| **Règlement (UE) 2022/2554 — DORA (résilience opérationnelle du secteur financier)** | `https://eur-lex.europa.eu/eli/reg/2022/2554/oj/fra` | Texte réglementaire · applicable depuis 17/01/2025 | Cadre sectoriel antérieur, souvent oublié — homonyme des métriques DORA | M11 |

## 5.3 Accessibilité — cadre français et européen

| Titre | URL | Type · Date | Apport | Modules |
|---|---|---|---|---|
| **RGAA 4.1.2 — Critères et tests** | `https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/` | Référentiel officiel (DINUM) · RGAA 4.1.2 | Les critères opposables en France, avec leurs tests — la référence citée dans les assertions du prompt P-26 | M9 |
| **RGAA — Rappel du champ d'application** | `https://accessibilite.numerique.gouv.fr/obligations/champ-application/` | Obligations légales · RGAA 4.1.2 | **Qui est assujetti** — la question à trancher avant tout audit | M9 |
| **RGAA — Déclaration d'accessibilité** | `https://accessibilite.numerique.gouv.fr/obligations/declaration-accessibilite/` | Obligations légales · RGAA 4.1.2 | Contenu obligatoire de la déclaration ; ⚠️ le RGAA 4.1.2 renvoie au **Défenseur des droits** | M9 |
| **Nouvelle version du RGAA — DesignGouv (DINUM)** | `https://design.numerique.gouv.fr/articles/2026-03-02-rgaa5/` | Article officiel · 02/03/2026 | Évolutions annoncées du RGAA 5 — à présenter comme **annonce**, pas comme droit en vigueur | M9 |
| **European Accessibility Act (EAA) — Commission européenne** | `https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/european-accessibility-act-eaa_en` | Page officielle CE · 2026 | Le texte qui étend les obligations au commerce électronique privé | M9 |
| **Directive (UE) 2019/882 (texte officiel)** | `https://eur-lex.europa.eu/eli/dir/2019/882/oj/eng` | EUR-Lex, texte primaire · 17/04/2019 | La directive elle-même | M9 |
| **The European Accessibility Act (EAA) — Deque** | `https://www.deque.com/accessibility-compliance/european-accessibility-act-eaa/` | Synthèse éditeur · MAJ 29/06/2026 | Lecture opérationnelle du texte — à confronter au texte primaire | M9 |

## 5.4 Sécurité — agences publiques

| Titre | URL | Type · Date | Apport | Modules |
|---|---|---|---|---|
| **ANSSI — Recommandations de sécurité pour un système d'IA générative** | `https://messervices.cyber.gouv.fr/guides/recommandations-de-securite-pour-un-systeme-dia-generative` | Guide officiel français · — | ⚠️ **C'est un guide de sécurité, pas une source de conformité RGPD** : ne pas confondre les deux registres | M11 |
| **ANSSI — Les Essentiels : DevSecOps** | `https://messervices.cyber.gouv.fr/guides/devsecops` | Guide ANSSI (collection « Les Essentiels ») · publié 13/03/2024, v1.0 | Cadre français d'intégration de la sécurité au pipeline | M9 |
| **NCSC (UK) / CISA — Guidelines for secure AI system development** | `https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development` | Guide conjoint de 23 agences · v1.0 | Cadre international de développement sécurisé de systèmes d'IA | M11 |
| **NCSC — The 'vibe coding spectrum' approach to AI-assisted software development** | `https://www.ncsc.gov.uk/blogs/the-vibe-coding-spectrum-approach-to-ai-assisted-software-development` | Billet officiel NCSC · — | Gradation des usages assistés selon le niveau de vérification — cadre utile pour une politique interne | M11, M12 |
| **ENISA — Artificial Intelligence Cybersecurity Challenges** | `https://www.enisa.europa.eu/publications/artificial-intelligence-cybersecurity-challenges` | Rapport ENISA · 15/12/2020 | Panorama européen des menaces sur les systèmes d'IA | M11 |

## 5.5 Formation professionnelle — cadre français

| Titre | URL | Type · Date | Apport | Modules |
|---|---|---|---|---|
| **Référentiel National Qualité (Qualiopi)** | `https://travail-emploi.gouv.fr/le-referentiel-national-qualite` | Texte officiel (ministère du Travail) · ⚠️ **non vérifiable par récupération automatique au 28/07/2026** | ⚠️ **Réserve assumée** : la version en vigueur et sa date d'entrée en application ne sont pas affirmées ici. Le RNQ impose notamment de **tracer l'adaptation des contenus aux évolutions du métier** — d'où la section §8 | Annexe C |
| **France compétences** | `https://www.francecompetences.fr/` | Institution nationale · MAJ 04/05/2026 | Cadre institutionnel de la formation professionnelle | Annexe C |
| **The Kirkpatrick Model** | `https://www.kirkpatrickpartners.com/the-kirkpatrick-model/` | Référentiel d'évaluation de la formation · révision 2026 | Les 4 niveaux (réaction, apprentissage, comportement, résultats) — charpente des questionnaires à chaud et à froid de l'annexe C | Annexe C |

---

# §6. Blogs d'ingénierie de référence

> 📘 Ces sources ne sont pas académiques. Elles ont deux vertus : elles décrivent des systèmes
> **réellement en production**, et elles disent souvent ce que les papiers taisent — les échecs.

| Titre | URL | Éditeur · Date | Apport | Modules |
|---|---|---|---|---|
| **Building effective agents** ⭐ | `https://www.anthropic.com/engineering/building-effective-agents` | Anthropic · 19/12/2024 | **La taxonomie de référence** : distingue workflows (prompt chaining, routage, parallélisation, orchestrateur/workers, evaluator-optimizer) et agents autonomes, et dit **quand un agent n'est pas justifié** | M6 |
| **Effective context engineering for AI agents** | `https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents` | Anthropic · 29/09/2025 | Fondements du context engineering — le contexte est une ressource finie qu'on budgète | M4 |
| **Effective harnesses for long-running agents** | `https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents` | Anthropic · 26/11/2025 | ⚠️ **La compaction ne suffit pas.** Remède direct à l'anti-pattern n°1 : *« Claude marks features as done prematurely → Set up a feature list file. Self-verify all features. Only mark features as "passing" after careful testing »* | M6 |
| **Writing effective tools for AI agents — using AI agents** | `https://www.anthropic.com/engineering/writing-tools-for-agents` | Anthropic · 11/09/2025 | Comment concevoir un outil pour qu'un agent l'utilise correctement — transposable à un outil de test maison | M6 |
| **How we built our multi-agent research system** | `https://www.anthropic.com/engineering/multi-agent-research-system` | Anthropic · 13/06/2025 | Retour d'expérience sur l'orchestration multi-agents et son coût réel en tokens | M6 |
| **Building agents with the Claude Agent SDK** | `https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk` | Anthropic · 2025, page maintenue | Mise en œuvre concrète de la boucle d'agent | M6 |
| **Demystifying evals for AI agents** | `https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents` | Anthropic · 09/01/2026 | Méthode de construction d'un jeu d'évals d'agent — support direct de M10 | M10 |
| **Introducing Contextual Retrieval** | `https://www.anthropic.com/engineering/contextual-retrieval` | Anthropic · 19/09/2024 | Amélioration mesurée de la récupération documentaire — pertinent pour ancrer un agent sur une spécification | M4 |
| **How Anthropic teams use Claude Code** | `https://claude.com/blog/how-anthropic-teams-use-claude-code` | Anthropic · 2025, en ligne 07/2026 | Études de cas internes, dont une équipe passée de *« give up on tests »* à du TDD guidé, et des **boucles autonomes** avec cartographie des états d'erreur | M6 |
| **Agentic coding and persistent returns to expertise** | `https://www.anthropic.com/research/claude-code-expertise` | Anthropic (recherche économique) · **16/06/2026** | Analyse d'un très grand nombre de sessions réelles ; le succès y est défini comme un résultat **« with verifiable evidence like passing tests or committed work »** ; la part du temps consacrée au débogage a **chuté de près de moitié** en 7 mois | M12 |
| **A harness for every task: dynamic workflows in Claude Code** | `https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code` | Anthropic · 02/06/2026 | Workflows dynamiques ; ⚠️ caveat officiel : *« often use more tokens and are best suited for complex, high value tasks »* | M6 |
| **Managing context on the Claude Developer Platform** | `https://claude.com/blog/context-management` | Anthropic · 29/09/2025 | Outils de gestion de contexte côté plateforme | M4 |
| **Prompt engineering best practices for 2026** | `https://claude.com/blog/best-practices-for-prompt-engineering` | Anthropic · 2026 | ⚠️ **Contredit partiellement la documentation sur le nombre d'exemples** : commencer à un exemple, n'en ajouter que si nécessaire. La contradiction est traitée en M4 §1.1 | M4 |
| **Automate security reviews with Claude Code** | `https://claude.com/blog/automate-security-reviews-with-claude-code` | Anthropic · 06/08/2025 | Revue de sécurité automatisée — et ses limites déclarées | M9 |
| **Where do our flaky tests come from?** | `https://testing.googleblog.com/2017/04/where-do-our-flaky-tests-come-from.html` | Google Testing Blog · 2017 | Pipeline de détection, **mise en quarantaine automatique** et triage à l'échelle | M7 |
| **Flaky Tests at Google and How We Mitigate Them** | `https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html` | Google Testing Blog (John Micco) · 27/05/2016 | **Les trois chiffres qui justifient à eux seuls le chapitre quarantaine** : ~1,5 % des exécutions rendent un résultat flaky, ~16 % des tests présentent de la flakiness, et **~84 % des transitions vert→rouge impliquent un test flaky** | M7, M12 |
| **Code Coverage Best Practices** | `https://testing.googleblog.com/2020/08/code-coverage-best-practices.html` | Google Testing Blog · 2020 | Seuils indicatifs (**60 % acceptable, 75 % louable, 90 % exemplaire**), assortis de l'avertissement qu'un fort pourcentage **ne garantit pas** la qualité des assertions ; met en garde contre la « mentalité de case à cocher » | M3, M12 |
| **Software Engineering at Google — Chapitre 13, Test Doubles** | `https://abseil.io/resources/swe-book/html/ch13.html` | Livre Google (accès libre) · 2020 | Google documente que l'abus du mocking a **« pollué » sa base de tests**, au point que certains ingénieurs ont déclaré **« no more mocks! »** | M1 |
| **Google Engineering Practices — Code Review** | `https://google.github.io/eng-practices/review/` | Doc officielle Google · 2026 | **8 critères de revue** (design, fonctionnalité, complexité, tests, nommage, commentaires, style, documentation) — la matrice d'inspiration de la grille en 8 points de M2 | M2 |
| **Leveling Up Fuzzing: Finding more vulnerabilities with AI** | `https://security.googleblog.com/2024/11/leveling-up-fuzzing-finding-more.html` | Google Security Blog · 2024 | **26 nouvelles vulnérabilités**, dont une non détectée depuis environ vingt ans ; couverture étendue à **272 projets** et **+370 000 lignes** | M3, M9 |
| **A summer of security: empowering cyber defenders with AI** | `https://blog.google/innovation-and-ai/technology/safety-security/cybersecurity-updates-summer-2025/` | Google · 2025 | Un agent découvre une vulnérabilité **avant exploitation** ; **20 vulnérabilités** signalées dans des bibliothèques largement déployées | M9 |
| **google/oss-fuzz-gen** | `https://github.com/google/oss-fuzz-gen` | Dépôt officiel Google · 2024-2026 | Génération de harnais de fuzzing par LLM : **30 défauts découverts**, gain de couverture jusqu'à **+29 %** face aux harnais humains | M3, M9 |
| **Mitigating prompt injection attacks with a layered defense strategy** | `https://blog.google/security/mitigating-prompt-injection-attacks/` | Google Security · 13/06/2025 | Défense en profondeur — **aucune couche seule ne suffit** | M11 |
| **AI threats in the wild: The current state of prompt injections on the web** | `https://blog.google/security/prompt-injections-web/` | Google Security · **23/04/2026** | État des lieux des injections réellement observées sur le web — la source la plus fraîche du corpus sur ce point | M11 |
| **MCP Security Notification: Tool Poisoning Attacks** | `https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks` | Invariant Labs · 01/04/2025 | **Source primaire du terme.** Démonstration reproductible : une description d'outil contenant un bloc `<IMPORTANT>` fait exfiltrer des fichiers sensibles. Décrit aussi le *rug pull* et le *tool shadowing* | M5, M11 |
| **The lethal trifecta for AI agents** | `https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/` | Simon Willison · 16/06/2025 | Formulation devenue canonique : accès aux données privées + exposition à du contenu non fiable + capacité d'exfiltration. Grille de lecture immédiate pour un agent de test en CI | M11 |
| **Defeating Nondeterminism in LLM Inference** | `https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference` | Recherche industrielle · 10/09/2025 | **Explique la cause technique** du non-déterminisme : lots de taille variable et non-associativité des opérations flottantes | M4, M8 |
| **Why Cline Doesn't Index Your Codebase (And Why That's a Good Thing)** | `https://cline.bot/blog/why-cline-doesnt-index-your-codebase-and-why-thats-a-good-thing` | Cline · 27/05/2025 | Argumentaire contre l'indexation vectorielle du code au profit de la recherche agentique — position minoritaire et utile au débat | M4 |
| **Context Rot: How Increasing Input Tokens Impacts LLM Performance** | `https://www.trychroma.com/research/context-rot` | Chroma · 14/07/2025 | **18 modèles**, 8 longueurs × 11 positions, **194 480 appels** : la performance est systématiquement inférieure en version longue, même à information constante | M4 |
| **Context Engineering for Agents** | `https://www.langchain.com/blog/context-engineering-for-agents` | LangChain · 02/07/2025 | Taxonomie des stratégies de gestion de contexte (écrire, sélectionner, compresser, isoler) | M4 |
| **Context Engineering — What it is, and techniques to consider** | `https://www.llamaindex.ai/blog/context-engineering-what-it-is-and-techniques-to-consider` | LlamaIndex · 03/07/2025 | Vue complémentaire, orientée récupération documentaire | M4 |
| **voyage-code-3: more accurate code retrieval** | `https://blog.voyageai.com/2024/12/04/voyage-code-3/` | Voyage AI · 04/12/2024 | Récupération spécialisée sur du code — pertinent si l'on construit un corpus de spécifications | M4 |
| **Challenges in red teaming AI systems** | `https://www.anthropic.com/news/challenges-in-red-teaming-ai-systems` | Anthropic (Policy) · 12/06/2024 | Ce que le red teaming ne garantit pas — utile pour ne pas sur-vendre l'exercice M10-4 | M10 |
| **Commitments on model deprecation and preservation** | `https://www.anthropic.com/research/deprecation-commitments` | Anthropic (Alignment) · 04/11/2025 | Engagements sur la dépréciation — à confronter au calendrier réel dans le test de garde de M10 | M10 |
| **Principles of Chaos Engineering** | `https://principlesofchaos.org/` | Manifeste communautaire · MAJ mars 2019 | Définition canonique de l'ingénierie du chaos — le prolongement du test en production | M9 |
| **Embracing Risk — Site Reliability Engineering, chapitre 3** | `https://sre.google/sre-book/embracing-risk/` | Livre Google SRE · 2017 | SLO et budget d'erreur : transforme la fiabilité en variable négociable plutôt qu'en absolu | M9, M12 |
| **Alerting on SLOs — The SRE Workbook, chapitre 5** | `https://sre.google/workbook/alerting-on-slos/` | Livre Google SRE · 2018 | Alerte sur la consommation du budget d'erreur — modèle transposable aux seuils non fonctionnels | M9 |
| **Canarying Releases — The SRE Workbook, chapitre 16** | `https://sre.google/workbook/canarying-releases/` | Livre Google SRE · 2018 | Déploiement progressif comme dispositif de test en production | M9, M12 |
| **The SPACE of Developer Productivity** | `https://cacm.acm.org/practice/the-space-of-developer-productivity/` | Communications of the ACM · — | Cinq dimensions de la productivité — antidote au ROI à métrique unique | M12 |
| **DevEx: What Actually Drives Productivity** | `https://queue.acm.org/detail.cfm?id=3595878` | ACM Queue vol. 21 n°2 · 2023 | Complément du cadre SPACE, centré sur l'expérience développeur | M12 |
| **DORA — Software delivery performance metrics** | `https://dora.dev/guides/dora-metrics/` | Guide DORA · MAJ 05/01/2026 | ⚠️ **La page qui prouve qu'elles sont cinq, pas quatre** | M12 |
| **DORA — A history of DORA's software delivery metrics** | `https://dora.dev/insights/dora-metrics-history/` | Article DORA · 02/01/2026 | Historique des métriques et de leurs évolutions — utile pour dater ses propres slides | M12 |
| **DORA — ROI of AI-assisted Software Development** | `https://dora.dev/ai/roi/report/` | Rapport + calculateur · MAJ 22/04/2026 | Cadre de chiffrage du retour sur investissement, avec un calculateur | M12 |
| **DORA — Choosing measurement frameworks to fit your goals** | `https://dora.dev/research/2025/measurement-frameworks/` | Chapitre du rapport DORA 2025 · MAJ 26/08/2025 | Comment choisir entre DORA, SPACE et DevEx selon la question posée | M12 |
| **The Leprechauns of Software Engineering** | `https://leanpub.com/leprechauns` | Ouvrage (Laurent Bossavit, 158 p.) · page MAJ 20/12/2025 | **La source qui démonte le ratio 1:10:100** en remontant aux sources primaires — chapitre *« The cost of defects: an illustrated history »* | M12 |
| **Mocks Aren't Stubs** | `https://martinfowler.com/articles/mocksArentStubs.html` | Martin Fowler · 2007 | Distingue les **5 types de doublures** et alerte sur le couplage excessif à l'implémentation | M1 |
| **Prompt engineering for GitHub Copilot Chat** | `https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering` | GitHub · 2026 | Conseils de prompting orientés développement, dont les exemples directement liés aux tests | M4 |
| **GPT-5 prompting guide (OpenAI Cookbook)** | `https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide` | OpenAI Cookbook · série maintenue | ⚠️ Signale un piège très concret pour un agent de test : *« validate patches carefully since tools […] may return "Done" even on failure »* | M4, M6 |
| **Prompt design strategies — Gemini API** | `https://ai.google.dev/gemini-api/docs/prompting-strategies` | Google · 2026 | Quantifie qualitativement l'effet du nombre d'exemples : **trop peu ne modifie rien, trop fait surajuster** | M4 |
| **Prompt Engineering (livre blanc Google, Lee Boonstra)** | `https://www.kaggle.com/whitepaper-prompt-engineering` | Livre blanc · v4, février 2025 | Synthèse de ~68 pages, bonne lecture de consolidation après M4 | M4, §7 |

---

# §7. Pour aller plus loin — 10 recommandations

> 🎯 Dix pistes classées par **effort croissant**, avec ce qu'elles apportent réellement.
> Toutes s'appuient sur des sources déjà listées ci-dessus : aucune référence nouvelle ici.

| # | Recommandation | Nature | Effort | Ce que ça apporte vraiment | Pour qui |
|---|---|---|---|---|---|
| **1** | **ISO/IEC 22989:2022 — Concepts et terminologie de l'IA** (`https://www.iso.org/standard/74296.html`) | Lecture normative **gratuite** | 2 h | Aligner le vocabulaire IA d'une équipe entière, gratuitement et sans débat d'opinion | Tous, dès le retour |
| **2** | **ISO/IEC/IEEE 29119-1:2022 — Concepts et définitions** (`https://www.iso.org/standard/81291.html`) | Lecture normative (partie 1 disponible gratuitement) | 3 h | Poser un vocabulaire de test partagé entre QA, dev et métier | Tous |
| **3** | **Building effective agents** (`https://www.anthropic.com/engineering/building-effective-agents`) | Lecture d'ingénierie | 45 min | **La lecture la plus rentable du corpus** : elle vous dira surtout **quand ne pas construire un agent** | Ceux qui veulent industrialiser M6 |
| **4** | **Prompt Engineering — livre blanc Google** (`https://www.kaggle.com/whitepaper-prompt-engineering`) | Livre blanc, ~68 pages | 3 h | Consolider M4 avec une vue éditeur-neutre et des exemples nombreux | Ceux qui écrivent la bibliothèque de prompts |
| **5** | **Anthropic — Prompt engineering interactive tutorial** (`https://github.com/anthropics/prompt-eng-interactive-tutorial`) | Notebooks avec exercices | 1 j | **9 chapitres pratiques**, dont un exercice dédié au code — le format le plus efficace pour un atelier interne | Ceux qui doivent former leurs collègues |
| **6** | **The Leprechauns of Software Engineering** (`https://leanpub.com/leprechauns`) | Ouvrage, 158 p. | 1 j | **Vaccin contre les chiffres non sourcés** — dont le 1:10:100 que vous alliez mettre dans votre slide de ROI | Ceux qui doivent défendre un budget |
| **7** | **Software Engineering at Google — chapitre 13 et Code Review** (`https://abseil.io/resources/swe-book/html/ch13.html` · `https://google.github.io/eng-practices/review/`) | Chapitres en accès libre | 1 j | Doubles de test et critères de revue à l'échelle — la matrice de votre grille de revue interne | Leads QA et tech |
| **8** | **ISTQB CT-GenAI — Testing with Generative AI** (`https://istqb.org/certifications/gen-ai/`) | **Certification** | 2 à 3 j + examen | La certification qui correspond **exactement** au périmètre de cette formation : tester **avec** l'IA générative | Ceux qui veulent une reconnaissance formelle du contenu de ces 21 h |
| **9** | **ISTQB CT-AI v2.0 — AI Testing** (`https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/`) | **Certification** (prérequis CTFL, min. 19,5 h accréditées) | 3 à 5 j + examen | ⚠️ **Périmètre différent** : tester **des** systèmes d'IA. Pertinent si votre produit *contient* de l'IA, pas si vous en *utilisez* pour tester | Ceux dont le produit embarque un modèle |
| **10** | **ISTQB CTAL-TAE v2.0 — Test Automation Engineering** (`https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/`) | **Certification** (40 questions / 66 points, passage à 43) | 5 j + examen | Le socle d'automatisation que l'IA **ne remplace pas** : architecture de suite, maintenabilité, stratégie | Ceux qui portent l'automatisation dans la durée |

**Trois compléments gratuits à mettre en signets** — ils bougent, donc on les consulte, on ne les mémorise pas :

| Ressource | URL | Pourquoi |
|---|---|---|
| **CFTL** — relais francophone ISTQB | `https://cftl.fr/` | Examens en français, terminologie traduite, actualité du schéma |
| **AI Act Single Information Platform** | `https://ai-act-service-desk.ec.europa.eu/en` | **Le seul calendrier AI Act à citer** — voir §8, correction n°6 |
| **DORA — Software delivery performance metrics** | `https://dora.dev/guides/dora-metrics/` | Pour vérifier combien il y a de métriques avant d'en parler en comité |

---

# §8. Fraîcheur des sources — 10 corrections d'idées reçues (juillet 2026)

> ⚠️ Ce support a été constitué en **juillet 2026**. Les dix points ci-dessous sont des
> affirmations **encore répandues dans la littérature de formation** et **fausses à cette date**.
> Chacune est signalée dans les modules par la mention **« ⚠️ À jour au 07/2026 »**.
>
> 📘 Cette section est aussi une **pièce Qualiopi** : elle trace l'adaptation des contenus aux
> évolutions du métier.

| # | Idée reçue encore répandue | Ce qui est vrai en juillet 2026 | Source de la correction | Module |
|---|---|---|---|---|
| **1** | « La documentation de Claude Code est sur `docs.anthropic.com` » | **Triple migration** : `docs.anthropic.com` → `docs.claude.com` → **`platform.claude.com`** pour l'API et **`code.claude.com/docs/en/`** pour Claude Code. Les anciens liens redirigent, **mais le contenu a été réécrit** — ne jamais citer de mémoire. Idem côté OpenAI : `platform.openai.com` → `developers.openai.com` | `https://code.claude.com/docs/en/overview` · `https://platform.claude.com/docs/en/about-claude/pricing` | Setup, M5 |
| **2** | « OWASP Top 10 A03, c'est l'injection » | **L'OWASP Top 10:2025 est publié et toute la numérotation a changé.** Injection est passée de **A03:2021 à A05:2025**, le SSRF a **disparu comme catégorie**, et *Software Supply Chain Failures* apparaît en **A03:2025**. **Citer une catégorie sans son millésime ne veut plus rien dire** | `https://owasp.org/Top10/2025/0x00_2025-Introduction/` · `https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/` | M9 |
| **3** | « Avec `temperature = 0`, la génération est reproductible » | **Faux.** La température ne contrôle que l'échantillonnage ; le non-déterminisme résiduel vient de l'infrastructure d'inférence (lots de taille variable, non-associativité des opérations flottantes). Mesuré : **80 complétions uniques sur 1 000** à réglages identiques, et jusqu'à **15 % de variation d'exactitude**. On ne promet pas la reproductibilité : **on mesure la variabilité et on l'exprime en probabilité** | `https://arxiv.org/abs/2408.04667` · `https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference` | M4, M8 |
| **4** | « On exclut des fichiers avec un `.claudeignore` » | **Ce fichier n'existe pas.** Le mécanisme officiel est **`permissions.deny`** dans `.claude/settings.json`, avec des entrées de la forme `"Read(./.env)"`. Texte exact de la documentation : *« This replaces the deprecated `ignorePatterns` configuration »*. ⚠️ Second piège : **depuis la v2.1.210, seules `Edit(path)` et `Read(path)` sont réellement appliquées** — `Write(path)`, `NotebookEdit(path)` et `Glob(path)` sont acceptées mais **jamais appliquées** | `https://code.claude.com/docs/en/settings#exclude-sensitive-files` · `https://code.claude.com/docs/en/permissions` | Setup, M4, M11 |
| **5** | « On activera le Test Impact Analysis d'Azure DevOps pour ne rejouer que les tests impactés » | **Impossible sur cette stack.** La documentation Microsoft liste explicitement **`.NET Core`**, UWP, les tests pilotés par les données, les topologies multi-machines et le parallélisme spécifique à l'adaptateur parmi les scénarios **non supportés**. ⚠️ De même, la gestion des tests flaky d'Azure DevOps n'existe **que sur le service géré**, et basculer de mode **efface tout l'historique de flakiness** | `https://learn.microsoft.com/en-us/azure/devops/pipelines/test/test-impact-analysis?view=azure-devops` · `https://learn.microsoft.com/en-us/azure/devops/pipelines/test/flaky-test-management?view=azure-devops` | M8 |
| **6** | « L'AI Act, le calendrier est celui de 2024 » | **Le calendrier a été révisé.** Un accord politique dit « omnibus » du **7 mai 2026** modifie plusieurs échéances, à partir de la proposition publiée le 19/11/2025. ⚠️ **Deux précautions** : (a) un accord politique **n'est ni une adoption formelle ni une entrée en vigueur** — toute citation doit porter la réserve « en attente d'adoption formelle » ; (b) **toutes les dates n'ont pas bougé**. Et ⚠️ le tracker le plus cité du web affiche encore « Last updated: 1 August 2024 » | `https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act` · `https://digital-strategy.ec.europa.eu/en/library/digital-omnibus-ai-regulation-proposal` · contre-exemple : `https://artificialintelligenceact.eu/implementation-timeline/` | M11 |
| **7** | « On est en Zero Data Retention, donc il n'y a pas de logs » | **Faux.** Le ZDR est **endpoint par endpoint**, et les **journaux de détection d'abus sont générés par défaut** pour l'usage d'API, conservés **jusqu'à 30 jours**. ⚠️ Corollaire : le régime des **offres grand public** n'est pas celui des offres commerciales — un tableau de rétention avec une seule ligne par éditeur est faux | `https://platform.claude.com/docs/en/api/rate-limits` · `https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data` · `https://developers.openai.com/api/docs/guides/your-data` | M11 |
| **8** | « Les 4 métriques DORA » | **Elles sont cinq depuis 2024** : *change lead time*, *deployment frequency*, *failed deployment recovery time* (débit) et *change fail rate*, **`deployment rework rate`** (instabilité). Le *time to restore service* a été redéfini. Un comité qui entend « les 4 métriques DORA » sait que la slide n'a pas été relue depuis deux ans | `https://dora.dev/guides/dora-metrics/` · `https://dora.dev/insights/dora-metrics-history/` | M12 |
| **9** | « ISO/IEC 25010 et ses 8 caractéristiques de qualité » | **L'édition 2011 est retirée depuis le 4 mars 2024.** L'édition en vigueur (**25010:2023**) en compte **9**. ⚠️ Trois confusions voisines à éviter : **42001** = système de **management** (organisation, certifiable) · **25010 / 25059** = qualité **produit** · **5338** = **cycle de vie**. Et la **29119-11** est un **rapport technique**, pas une norme | `https://www.iso.org/standard/78176.html` · `https://www.iso.org/standard/35733.html` · `https://www.iso.org/standard/79016.html` | M11 |
| **10** | « Un défaut corrigé en production coûte 100 fois plus cher : c'est le ratio 1:10:100 » | **C'est un artefact documenté sans source primaire solide** — un *leprechaun* au sens de Bossavit, qui remonte aux sources originales et montre la fabrication de la courbe. ⚠️ Même prudence sur le chiffre de coût de la non-qualité souvent cité : c'est une estimation **américaine**, pas mondiale. Pour défendre un budget, utilisez un **ROI local et honnête** avec ses coûts cachés | `https://leanpub.com/leprechauns` · `https://www.it-cisq.org/the-cost-of-poor-quality-software-in-the-us-a-2022-report/` | M12 |

## 8.1 Corrections secondaires — à connaître, moins structurantes

| # | Idée reçue | Ce qui est vrai en juillet 2026 | Module |
|---|---|---|---|
| 11 | « CT-AI, c'est la certification pour tester avec l'IA » | **Non.** CT-AI porte sur le test **des** systèmes d'IA ; c'est **CT-GenAI** qui porte sur le test **avec** l'IA générative. Et CT-AI est en **v2.0** depuis 2026 : tout support décrivant la v1.0 comme courante est périmé | M11 |
| 12 | « Claude Code lit `AGENTS.md` » | **Non** : il lit `CLAUDE.md`. Un dépôt ayant adopté le standard ouvert `AGENTS.md` doit créer un `CLAUDE.md` qui l'importe | M4 |
| 13 | « Le hook bloque avec un code d'erreur » | **Seul le code de sortie 2 bloque.** Le code 1 est une erreur **non bloquante** : le journal montre la détection, l'action a lieu quand même. Et le hook `Stop` est outrepassé après **8 blocages consécutifs** | M6 |
| 14 | « `allowedTools` restreint les outils de l'agent SDK » | **Non** : il **auto-approuve sans restreindre**. Il faut `disallowedTools` pour bloquer | M6 |
| 15 | « SpecFlow est le BDD de référence en .NET » | **Fin de vie annoncée en janvier 2025.** Le successeur direct et documenté est **Reqnroll** | M2 |
| 16 | « Le budget en tokens estimé l'an dernier reste valable » | **Non** : les modèles de génération 4.7+ utilisent un tokenizer produisant **~30 % de tokens en plus** pour le même texte. Une estimation de 2025 sous-évalue la facture 2026 d'environ un tiers | Setup, M4 |
| 17 | « L'auto-compaction se déclenche à 92 % (ou 95 %) du contexte » | **Aucun pourcentage générique n'est documenté par l'éditeur.** Ces chiffres circulent via des sources tierces. La seule valeur numérique officielle connue est un seuil ≈ **967 K tokens** sur une fenêtre de 1 M | M4 |
| 18 | « L'Arcom contrôle l'accessibilité numérique » | **Pas encore formellement** : c'est une évolution annoncée du RGAA 5. Le **RGAA 4.1.2 en vigueur renvoie au Défenseur des droits** | M9 |
| 19 | « Il existe un OWASP Top 10 LLM 2026 » | **Non.** L'édition en vigueur est **2025**. Le document de décembre 2025 est le **Top 10 for Agentic Applications**, qui est une liste **distincte** | M11 |
| 20 | « Nos scripts k6 sont à jour » | ⚠️ La documentation a migré vers `grafana.com/docs/k6/latest/` et **k6 est passé en v2.x**. Un script généré par un modèle à partir de tutoriels v0.4x ou v1.x utilise des **options obsolètes** | M9 |

## 8.2 Points à revérifier avant chaque session

Ces éléments étaient **instables ou non vérifiables** au moment de la collecte. Le formateur les
recontrôle en J-7 (voir `00-guide-formateur.md` §1.1).

| Élément | Nature de l'incertitude | Où vérifier |
|---|---|---|
| **Révision 2026-07-28 de la spécification MCP** | Annoncée par les mainteneurs, mais la page de spécification correspondante était **vide** à la collecte et le site affichait encore la révision précédente | `https://modelcontextprotocol.io/specification/latest` |
| **Version en vigueur du Référentiel National Qualité** | Page officielle **non récupérable automatiquement** ; aucune affirmation n'est faite ici sur la version applicable | `https://travail-emploi.gouv.fr/le-referentiel-national-qualite` |
| **Dates AI Act post-omnibus** | Accord politique, **adoption formelle non acquise** à la date de collecte | `https://ai-act-service-desk.ec.europa.eu/en/faq?faq_category_id=99` |
| **Définitions du glossaire ISTQB** | Pages en rendu JavaScript : les citations au mot près doivent être revalidées en navigateur | `https://glossary.istqb.org/en_US/term/oracle` |
| **Versions d'outils citées** (k6, Playwright, xUnit, axe-core, SDK d'agent) | Rythme de publication élevé ; le SDK d'agent comptait **158 releases** et un agent CLI concurrent **784** | Dépôts GitHub respectifs |
| **Chiffres de rétention et de tarification des éditeurs** | Modifiés sans préavis ; toujours relire la page de l'éditeur avant de projeter un tableau comparatif | Pages « pricing » et « privacy » de chaque éditeur |

---

# Récapitulatif du corpus

| Section | Contenu | Nature dominante |
|---|---|---|
| §1 — Normes et référentiels | ISTQB / CFTL, ISO-IEC-IEEE, OWASP, NIST, TMMi, W3C | Sources **normatives** — elles ne périment pas vite, mais leurs éditions changent |
| §2 — Rapports d'industrie | Adoption, qualité du code généré, productivité, emploi | Sources **datées** — toujours citer l'édition et l'échantillon |
| §3 — Recherche académique | Benchmarks, anti-patterns, prompting, flakiness, priorisation, évaluation | Sources **méthodologiques** — c'est là que se trouvent les limites |
| §4 — Documentation officielle des outils | Agent de code, plateforme, MCP, concurrents, stack Angular/.NET, CI/CD, non-fonctionnel | Sources **volatiles** — à revérifier avant chaque session |
| §5 — Réglementaire FR / UE | RGPD, AI Act, accessibilité, sécurité, formation professionnelle | Sources **opposables** — citer le texte primaire, jamais la synthèse |
| §6 — Blogs d'ingénierie | Anthropic, Google, OWASP GenAI, SRE, chercheurs indépendants | Sources **de terrain** — elles décrivent des systèmes réellement en production |
| §7 — Pour aller plus loin | 10 recommandations classées par effort | — |
| §8 — Fraîcheur des sources | 10 corrections principales + 10 secondaires + 6 points à revérifier | — |

**Trois règles pour utiliser ce corpus en formation :**

| # | Règle |
|---|---|
| 1 | **Un chiffre sans source ne se dit pas.** Chaque donnée de ce support porte une référence ; si elle manque, c'est qu'elle n'a pas été vérifiée |
| 2 | **Un référentiel se cite avec son millésime.** « OWASP A03 » et « les 4 métriques DORA » sont deux façons de dater sa propre obsolescence |
| 3 | **Une documentation d'éditeur se relit, elle ne se mémorise pas.** Les sections §4 et §8.2 existent pour cette raison |

---

*Fin de l'annexe D. Les quatre corpus bruts — environ 520 références vérifiées en juillet 2026 —
restent disponibles dans `recherche/sources-jour1.md` à `sources-jour4.md`.*
