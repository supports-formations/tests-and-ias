# Module M00 — Briefing de mission et mise en place

> **Jour 1** · **Durée : 0 h 45** · **QA Credits en jeu : 10**
> *Fil rouge : la Task Force QA franchit la porte de SkyRetail. Avant de toucher au code, il faut savoir dans quel état on récupère le chantier — et à quoi on joue pendant quatre jours.*

---

## 0. Carte du module

### 0.1 Objectifs pédagogiques

À l'issue de ce module, le·a participant·e sera capable de :

- **Situer** son niveau de départ sur les six axes de compétence de la formation (auto-positionnement en 8 questions) ;
- **Énoncer** ce que cette formation enseigne et ce qu'elle n'enseigne pas, en distinguant *tester l'IA* de *tester avec l'IA* ;
- **Vérifier** que son poste de travail est opérationnel sur les sept points de la checklist de setup ;
- **Constater et chiffrer** l'état initial du dépôt SkyRetail (nombre de tests, couverture, durée de pipeline) ;
- **Appliquer** les règles du jeu : squads, rôles Pilote/Copilote, QA Credits, malus de Dette Technique.

### 0.2 Prérequis du module

- Setup technique réalisé **avant** la session (voir `00-setup-technique.md`) — le module ne prévoit **aucune installation**, seulement une vérification.
- Dépôt `skyretail` cloné, branche `formation/j1-start`.
- Compte Claude Code authentifié.

### 0.3 Position dans le fil rouge

| Avant ce module | Après ce module |
|---|---|
| Les participants arrivent avec des attentes hétérogènes, souvent « l'IA va écrire mes tests » | Chaque squad est constitué, sait ce qu'il joue, et a **mesuré** la dette de départ au lieu de l'entendre raconter |
| Le dépôt SkyRetail est une abstraction | Le dépôt tourne sur chaque poste, avec ses 47 tests et ses 12 % de couverture affichés à l'écran |
| L'évaluation Qualiopi n'est pas positionnée | L'auto-positionnement diagnostique est renseigné et archivé |

### 0.4 Découpage horaire

| Séquence | Contenu | Durée |
|---|---|---|
| S1 | Le briefing de mission (lecture du pitch, contexte SkyRetail) | 8 min |
| S2 | Ce que cette formation est — et ce qu'elle n'est PAS | 7 min |
| S3 | Auto-positionnement (8 questions, individuel) | 7 min |
| S4 | Constitution des squads, tirage des noms, rôles Pilote/Copilote | 5 min |
| S5 | Règles du jeu : QA Credits, malus, badges, Contre-Test | 5 min |
| S6 | Checklist de setup, en binôme | 8 min |
| S7 | **Exercice M0-1 — « L'état des lieux »** | 5 min |

### 0.5 Notions couvertes

Module d'ouverture au **format allégé** : pas de partie théorique développée, pas de triptyque d'exemples. Le contenu de fond commence en M1. Ce module pose le cadre, le contrat pédagogique et la ligne de base mesurée.

---

## 1. Le briefing de mission

### 1.1 Le pitch (lu à voix haute, 3 minutes)

> **SkyRetail** est une plateforme e-commerce B2C : 340 000 clients actifs, 12 000 commandes par jour, un pic à 90 000 le Black Friday. Front **Angular**, back **.NET Web API**, base **PostgreSQL**.
>
> Il y a six mois, SkyRetail a été racheté. Le nouveau propriétaire a imposé une refonte du tunnel de commande et une nouvelle grille de remises. La version majeure **v4.0** part en production **dans quatre jours**.
>
> Problème : l'équipe QA historique — deux personnes — est partie il y a trois semaines. Ce qu'elles laissent derrière elles :
>
> - **12 %** de couverture de code sur le back-end, **0 %** sur le front,
> - **47 tests** dans la CI, dont **12 identifiés comme flaky** et **9 en `[Skip]`** depuis 14 mois,
> - **aucun** test end-to-end,
> - un cahier des charges de la v4.0 de **6 pages**, écrit par le métier, jamais relu par la tech,
> - **3 incidents de production** ouverts sur la v3.9, sans test de non-régression associé,
> - un pipeline GitHub Actions qui dure **34 minutes** et que tout le monde relance « au cas où ».
>
> Vous êtes la **Task Force QA**. Vous avez quatre jours, une licence Claude Code, et l'interdiction formelle de recruter.
>
> **Objectif : arriver au comité de Go/No-Go de J4 avec un dossier de recette défendable.**

### 1.2 Les quatre features du produit

Tout exercice de la formation s'ancre sur l'une de ces quatre features. Chaque squad choisit sa feature d'entrée en fonction de son aisance technique.

| Code | Feature | Périmètre technique | Ce qu'elle sert à enseigner |
|---|---|---|---|
| **F1** | Moteur de remises | Domaine .NET pur (`SkyRetail.Domain/Pricing`) — 6 règles cumulables, priorités, plafonds | Tests unitaires, oracle, property-based, mutation testing |
| **F2** | Tunnel de commande | Angular (`checkout/`) + API `/api/orders` | E2E Playwright, sélecteurs, flakiness, régression visuelle |
| **F3** | Catalogue & recherche | API .NET documentée en OpenAPI, 23 endpoints | Tests d'API et de contrat, fuzzing, charge |
| **F4** | Espace client & RGPD | Angular + API `/api/me`, export et suppression | Sécurité, accessibilité, conformité, données de test |

> 🎯 **Fil rouge.** Le dépôt contient un nombre non divulgué de **défauts délibérés**. Ils ne sont pas signalés dans les énoncés. Toute découverte d'un défaut non listé rapporte **+50 QAC**. Ce point est annoncé aux participants dès maintenant : il change radicalement leur posture de lecture des sorties d'IA.

### 1.3 La progression sur quatre jours

| Jour | Titre | État au départ | État à l'arrivée |
|---|---|---|---|
| **J1** | L'état des lieux | Personne ne sait ce qui est testé | Plan de test v4.0 tracé, ambiguïtés remontées au métier, premiers bugs suspectés |
| **J2** | L'arsenal | Tout se fait à la main, prompt par prompt | Un agent maison génère, exécute et commente |
| **J3** | L'industrialisation | L'agent tourne sur un poste | L'agent tourne dans la CI, pipeline vert, non-fonctionnel couvert |
| **J4** | La mise en production | Ça marche, mais personne ne sait si c'est tenable | Dossier de recette, décision Go/No-Go argumentée, gouvernance posée |

---

## 2. ⚠️ Ce que cette formation n'est PAS

C'est la section la plus importante du module. Elle évite quatre malentendus qui, non traités en ouverture, empoisonnent les trois jours suivants.

### 2.1 Elle n'apprend pas à **tester l'IA** — elle apprend à tester **avec** l'IA

Ce sont deux disciplines distinctes, avec deux référentiels distincts.

| | **Tester l'IA** *(hors périmètre)* | **Tester avec l'IA** *(cette formation)* |
|---|---|---|
| Objet du test | Un système contenant un modèle de ML/LLM : un classifieur, un chatbot, un moteur de recommandation | Une application logicielle classique — ici, Angular + .NET |
| Question posée | « Ce modèle est-il suffisamment exact, robuste, équitable, explicable ? » | « L'IA générative m'aide-t-elle à concevoir, écrire, exécuter et documenter mes tests ? » |
| Vocabulaire | Précision, rappel, matrice de confusion, biais, dérive de données, adversarial testing | Cas de test, oracle, couverture, score de mutation, flakiness, traçabilité |
| Référentiel de rattachement | **ISTQB Certified Tester AI Testing (CT-AI) v2.0** — 7 chapitres examinables, minimum 19,5 h de formation accréditée, prérequis CTFL [S-04] | **ISTQB CTFL v4.0.1** (socle) [S-03] + pratiques d'ingénierie de l'IA générative |
| Livrable type | Rapport d'évaluation de modèle, jeu de tests adversariaux | Plan de test, suite de tests exécutable, dossier de recette |

Nuance à énoncer explicitement : le syllabus **CT-AI v2.0** contient un chapitre *« Testing Generative AI and Large Language Models »* [S-04][S-05]. Cette formation en croise le vocabulaire en J4 (module M10, évaluation et dérive des agents), mais son cœur reste l'usage de l'IA **comme outil de production de tests**. Un·e participant·e qui vient chercher une préparation à la certification CT-AI doit le savoir dès la première demi-heure.

> ⚠️ **À jour au 07/2026** — CT-AI v2.0 est en disponibilité générale depuis 2026 ; l'examen comporte 40 questions avec un score de passage de 29/44 [S-05]. Toute documentation de formation qui décrit encore CT-AI v1.0 comme le référentiel courant est périmée.

### 2.2 Ce n'est pas une formation « l'IA écrit vos tests à votre place »

Le message central de ces quatre jours tient en une phrase : **l'IA générative déplace le goulot d'étranglement de la production vers le jugement.**

Générer 200 tests prend dix minutes. Décider lesquels sont légitimes, lesquels figent un bug, lesquels ne s'exécuteront jamais deux fois de la même façon — c'est là que se trouve le travail, et c'est ce que la formation entraîne. Le barème de score l'inscrit noir sur blanc : un test tautologique livré coûte **−30 QAC**, un sélecteur inventé par l'IA et jamais exécuté contre le vrai DOM coûte **−30 QAC**. Le malus n'est pas une posture de formateur : il est adossé à un résultat expérimental, les générateurs de test appliqués à du code bogué produisant des tests qui **valident le bug au lieu de le détecter** [S-10].

Les chiffres de terrain disent la même chose sous un autre angle. L'adoption est massive — **~90 %** des organisations poursuivent la GenAI en quality engineering, mais **15 %** seulement à l'échelle entreprise [S-07] ; **76,8 %** d'adoption en test, dont **70 %** pour créer des cas de test contre **19,9 %** pour identifier les risques [S-06] ; **90 %** d'adoption côté développement, l'IA agissant en **amplificateur** du débit sans amélioration proportionnelle des métriques de livraison [S-12]. Et la confiance recule à mesure que l'usage progresse : **46 %** des développeurs ne font pas confiance à l'exactitude des sorties, contre 31 % un an plus tôt [S-08]. La littérature académique, qui a déjà analysé **102 études** sur le sujet [S-01], place la génération de cas de test parmi les tâches dominantes — ce qui traduit surtout ce qui est facile à mesurer. Autrement dit : la profession produit beaucoup et arbitre peu. Cette formation entraîne l'arbitrage, dans le périmètre que l'ISTQB nomme *test automation* — *« the use of software to perform or support test activities »* [S-02], conception de test incluse.

> 🎯 **Point d'attention pour le formateur.** **61 %** des équipes adoptent le testing piloté par IA, et les testeur·euse·s qui l'utilisent sont **deux fois plus susceptibles** de craindre d'être remplacé·e·s [S-11]. La question « est-ce que ça va me remplacer ? » sera posée. La réponse de ce support n'est pas rhétorique : elle est dans le barème de malus, qui rémunère exclusivement le jugement humain.

### 2.3 Ce n'est pas un catalogue d'outils

Claude Code est le fil conducteur, parce qu'il faut un outil unique pour que 6 personnes puissent travailler ensemble sans passer la journée en installation. Les concurrents (GitHub Copilot, Cursor, Codex, mabl, Applitools, testRigor, Qodo) sont traités en comparaison structurée au module **M5**, sur des critères, pas en démonstration commerciale. Ce qui est enseigné — oracle, tautologie, oracle gap, flakiness, traçabilité — survivra au changement d'outil.

### 2.4 Ce n'est pas une formation sur les modèles de langage

Aucun contenu sur l'architecture des transformeurs, le fine-tuning ou l'entraînement. Ce qui est nécessaire — non-déterminisme, fenêtre de contexte, hallucination, coût en tokens — est introduit **au moment où il sert**, jamais en préambule théorique.

> ⚠️ **À jour au 07/2026** — première idée reçue à casser : **`temperature = 0` ne garantit pas le déterminisme** d'un LLM. Ce point est démontré en M4. Il conditionne toute la stratégie de non-régression des prompts vue en M10.

---

## 3. Auto-positionnement (7 min, individuel)

Évaluation **diagnostique** au sens Qualiopi. Elle n'est pas notée, elle sert à composer les squads et à ajuster le rythme. Chaque participant·e note de **0 à 3** :

> 0 = jamais fait · 1 = j'en ai entendu parler · 2 = je l'ai fait accompagné·e · 3 = je le fais seul·e en production

| # | Question | Axe |
|---|---|---|
| Q1 | J'écris et j'exécute des tests unitaires dans un projet réel (xUnit, NUnit, Jest, Vitest…) | Fondamentaux du test |
| Q2 | Je sais expliquer la différence entre couverture de lignes, de branches et score de mutation | Métriques de qualité |
| Q3 | J'ai déjà écrit un test end-to-end (Playwright, Cypress, Selenium) qui tourne en CI | Automatisation E2E |
| Q4 | Je sais lire un pipeline GitHub Actions ou GitLab CI et y ajouter une étape | CI/CD |
| Q5 | J'ai déjà utilisé un assistant IA (Copilot, Claude, Cursor…) pour produire du code de test | Usage de l'IA |
| Q6 | Je sais dire ce qu'est un **oracle de test** et pourquoi il ne doit pas être le code lui-même | Concept clé du J1 |
| Q7 | J'ai déjà rédigé des scénarios Gherkin / Given-When-Then exploités par un outil | Spécification exécutable |
| Q8 | Je connais les obligations RGPD applicables à un jeu de données de test | Conformité |

**Exploitation par le formateur, en 60 secondes :**

| Profil | Signal | Ajustement |
|---|---|---|
| Total ≤ 8 | Public junior ou non-technique | Renforcer les démonstrations guidées, autoriser le binômage permanent, alléger M6 |
| Total 9-16 | Public cible | Dérouler le support nominal |
| Total ≥ 17 | Public senior | Débloquer les exercices bonus ⭐⭐⭐⭐⭐ dès M1, durcir les Contre-Tests |
| Q6 = 0 ou 1 chez ≥ 50 % | Notion d'oracle absente | Traiter §1.2 de M1 en démonstration collective plutôt qu'en lecture |
| Q8 = 0 chez ≥ 50 % | Volet conformité fragile | Prévenir : M11 sera dense, ne pas le sacrifier au profit du temps de TP |

**Répartition dans les squads** : le formateur équilibre les totaux entre squads (écart maximal visé : 4 points). Un squad homogène et faible décroche ; un squad homogène et fort s'ennuie.

---

## 4. Constitution des squads et rôles

### 4.1 Composition

| Effectif | Organisation |
|---|---|
| 3 participants | 3 squads solo, entraide autorisée, boss en coopératif |
| 4 participants | 2 squads de 2 |
| 5 participants | 1 squad de 3 + 1 squad de 2 |
| 6 participants | 3 squads de 2 |

**Noms imposés — le tirage au sort fait partie du rituel :**

- 🔮 **Squad ORACLE** — *« Un test qui ne peut pas échouer ne teste rien. »*
- 🎯 **Squad HUNTER** — *« Le bug existe. Il faut juste le provoquer. »*
- 🛡️ **Squad GUARDIAN** — *« En production, personne ne relance le pipeline. »*

### 4.2 Les deux rôles, et pourquoi ils tournent

| Rôle | Responsabilité | Interdit |
|---|---|---|
| **Pilote** | Tient le clavier, écrit les prompts, lance les commandes | Ne valide jamais seul un livrable |
| **Copilote** | Relit **chaque sortie d'IA avant exécution ou commit**, tient le journal des décisions du squad | Ne touche pas au clavier pendant la séquence |

**Rotation obligatoire à chaque module.** C'est le seul mécanisme qui empêche qu'un participant à l'aise fasse toute la formation pendant que l'autre regarde. Le formateur l'annonce comme une règle, pas comme une suggestion.

Le rôle de Copilote est l'incarnation pédagogique du message de §2.2 : dans une chaîne de test augmentée par l'IA, **le relecteur est le poste critique**, pas le producteur.

---

## 5. Les règles du jeu

### 5.1 Les gains

| Source | Gain |
|---|---|
| Exercice ⭐ réussi | **10 QAC** |
| Exercice ⭐⭐ réussi | **20 QAC** |
| Exercice ⭐⭐⭐ réussi | **40 QAC** |
| Exercice ⭐⭐⭐⭐ réussi | **80 QAC** |
| Boss de journée réussi | **150 QAC** |
| Boss final (Go/No-Go) | **300 QAC** |
| Découverte d'un défaut planté non listé dans l'énoncé | **+50 QAC** |
| Aide apportée à un autre squad (validée par lui) | **+15 QAC** |

### 5.2 Les malus — la Dette Technique

Appliqués **sans discussion** par le formateur, y compris rétroactivement au débriefing.

| Infraction | Malus |
|---|---|
| Test tautologique livré (assertion qui reproduit l'implémentation) | **−30 QAC** |
| Sélecteur halluciné : locator inventé par l'IA, jamais exécuté contre le vrai DOM | **−30 QAC** |
| Secret, token ou données personnelles réelles commités | **−50 QAC** |
| Test mis en `[Skip]` / `test.skip` pour faire passer la CI | **−40 QAC** |
| Couverture augmentée sans aucune assertion nouvelle | **−25 QAC** |
| Livrable copié-collé d'un LLM sans relecture (détecté au débriefing) | **−20 QAC** |

> 🎯 **À dire mot pour mot en séance.** « Le score ne récompense pas la vitesse de production de l'IA. Il récompense le jugement. Un squad qui génère 200 tests en 10 minutes et en livre 40 tautologiques finit dernier. »

### 5.3 Le Contre-Test

Après chaque exercice ⭐⭐⭐ et ⭐⭐⭐⭐, un squad adverse dispose de **5 minutes** pour faire échouer la solution livrée : en modifiant une ligne du code de production, en changeant une donnée, ou en montrant que le test passe alors qu'il ne devrait pas.

- Contre-test réussi : **+20 QAC** à l'attaquant, **−10 QAC** au défenseur.
- Contre-test échoué : **+10 QAC** au défenseur.

### 5.4 Les badges

Cumulables, sans valeur en QAC, remis en carte imprimée en présentiel : 🔍 L'Œil · 🧿 L'Oracle · 🪤 Le Piégeur · ⚡ Le Rapide · 🧹 Le Fossoyeur de Flaky · 🔐 Le Gardien · ♿ L'Inclusif · 💰 L'Économe · 🎓 Le Pédagogue · 🏆 Golden Oracle. Conditions détaillées dans `00-fil-rouge-qa-rescue-mission.md` §4.3.

### 5.5 Hygiène de sécurité — quatre règles non négociables

1. **Aucune donnée réelle d'entreprise** dans un prompt. Le dépôt SkyRetail est le seul terrain.
2. **Aucun secret commité.** Les clés vont dans `.env` (déjà dans `.gitignore`).
3. **Permissions Claude Code restreintes.** Le dépôt fournit un `.claude/settings.json` avec une politique `permissions.deny` sur `**/.env`, `**/*.pem`, `**/secrets/**`.
   > ⚠️ **À jour au 07/2026** — le fichier `.claudeignore` **n'existe pas** dans Claude Code ; le mécanisme officiel est `permissions.deny`. Le champ `ignorePatterns` est déprécié.
4. **Aucun serveur MCP tiers non vérifié.** En séance, seuls les serveurs officiels Microsoft / Anthropic / GitHub sont autorisés. Le sujet de la chaîne d'approvisionnement est traité en M11.

---

## 6. Checklist de setup (8 min, en binôme)

À faire cocher **à voix haute**. Le module ne prévoit aucune installation : le setup a été envoyé une semaine avant.

- [ ] `dotnet test` s'exécute et affiche **47 tests**
- [ ] `npm start` sert l'application sur `http://localhost:4200`
- [ ] `docker compose ps` montre PostgreSQL en `healthy`
- [ ] `npx playwright test --list` ne renvoie pas d'erreur d'installation
- [ ] `claude` démarre et `/status` affiche un compte authentifié
- [ ] `claude mcp list` affiche `playwright`
- [ ] `git status` est propre sur `formation/j1-start`

**Si une case n'est pas cochée** : binômage immédiat, pas de dépannage individuel en séance. Repli : `.devcontainer/devcontainer.json` fourni dans le dépôt, qui embarque toute la chaîne.

**Plan B connexion** : en cas de quota API épuisé ou de coupure, bascule sur les transcriptions pré-enregistrées de `SOLUTIONS/transcripts/`. Les exercices deviennent des analyses critiques de sorties d'IA réelles. Le contenu pédagogique tient sans API.

---

## 7. L'exercice du module

### 🧪 Exercice M0-1 — « L'état des lieux »

| | |
|---|---|
| **Difficulté** | ⭐ |
| **Durée cible** | 5 min |
| **Modalité** | squad (Pilote au clavier, Copilote au relevé) |
| **Matériel** | dépôt `skyretail` sur `formation/j1-start`, `.github/workflows/ci.yml` |
| **QA Credits** | 10 |

**Énoncé**

Vous venez d'arriver. Avant de proposer quoi que ce soit, on vous demandera « c'était comment quand vous êtes arrivés ? ». Produisez la **ligne de base chiffrée** de la mission. Sans IA pour cet exercice : uniquement les outils du dépôt. Créez le fichier `boss-j1/etat-des-lieux.md` et remplissez le tableau des six indicateurs. Chaque valeur doit être accompagnée de **la commande exacte** qui l'a produite.

```bash
# Nombre de tests et tests ignorés
cd backend && dotnet test --list-tests | Select-String -Pattern "SkyRetail" | Measure-Object
dotnet test 2>&1 | Select-String -Pattern "Skipped|Passed|Failed"

# Couverture back-end
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura

# Tests front réels (hors squelettes vides)
cd ../frontend && npx ng test --watch=false --browsers=ChromeHeadless

# Durée du pipeline : dernier run sur la branche
gh run list --branch formation/j1-start --limit 1
```

**✅ Résultat attendu**

- [ ] Le fichier `boss-j1/etat-des-lieux.md` existe et est commité sur une branche `squad/<nom>/m0`.
- [ ] Il contient un tableau à trois colonnes : **Indicateur · Valeur constatée · Commande utilisée**.
- [ ] Les six indicateurs sont renseignés, aux valeurs suivantes (tolérance ±1 sur les comptages, ±2 points sur la couverture) :

| Indicateur | Valeur attendue |
|---|---|
| Tests back-end | **47** (dont **9** `[Skip]`) |
| Tests front-end réels | **0** |
| Tests E2E | **0** |
| Couverture back-end | **~12 %** |
| Durée du pipeline CI | **~34 min** |
| Endpoints documentés en OpenAPI | **23** |

- [ ] Une ligne de conclusion en une phrase : « ce que je ne sais pas encore, c'est… ».

**❌ Ce qui invalide l'exercice**

- Valeurs recopiées depuis `00-setup-technique.md` sans exécution (le Copilote atteste de l'exécution réelle).
- Colonne « Commande utilisée » vide ou générique (`dotnet test` seul ne produit pas la couverture).
- Fichier non commité.

**💡 Indice** *(après 2 min)*
Les 9 tests `[Skip]` n'apparaissent pas dans le compte des tests exécutés mais bien dans `--list-tests`. L'écart entre les deux chiffres **est** l'information intéressante. Pour les endpoints OpenAPI, comptez les couples chemin×verbe dans `docs/openapi.yaml`, pas les chemins.

**🔑 Solution de référence**

```markdown
# État des lieux — SkyRetail v4.0, branche formation/j1-start
Squad : GUARDIAN · Pilote : … · Copilote : … · Date : …

| Indicateur | Valeur constatée | Commande utilisée |
|---|---|---|
| Tests back-end découverts | 47 | `dotnet test --list-tests` |
| dont ignorés `[Skip]` | 9 | `dotnet test` → ligne « Skipped: 9 » |
| Tests réellement exécutés | 38 | `dotnet test` → « Passed: 33, Failed: 5 » |
| Tests front-end réels | 0 | `npx ng test --watch=false` (0 spec non vide) |
| Tests E2E | 0 | `ls e2e/` → dossier vide |
| Couverture de lignes back-end | 12,4 % | `dotnet test /p:CollectCoverage=true` |
| Durée du dernier pipeline | 34 min 12 s | `gh run list --branch formation/j1-start --limit 1` |
| Endpoints OpenAPI | 23 | `grep -cE '^\s{4}(get|post|put|patch|delete):' docs/openapi.yaml` |

**Ce que je ne sais pas encore** : sur les 38 tests exécutés, je ne sais pas combien
contiennent une assertion réelle, ni pourquoi 9 tests sont ignorés depuis 14 mois.
```

**🎓 Ce que l'exercice enseigne vraiment**

Trois choses, dans cet ordre.

1. **Une ligne de base non mesurée ne vaut rien.** En J4, le comité demandera « qu'avez-vous amélioré ». Sans le chiffre de départ, la réponse est une opinion.
2. **Les chiffres du briefing ne sont pas des chiffres de qualité.** 47 tests ne dit rien. 12 % de couverture ne dit rien non plus : c'est une mesure d'exécution, pas de vérification. Cette distinction est le sujet de M1 §1.3 (oracle gap) et de M3 (mutation testing).
3. **Le premier réflexe n'est pas de prompter.** Cet exercice se fait volontairement **sans IA**. C'est un choix : le premier geste d'un·e QA est de constater, pas de générer.

---

## 8. Débriefing du module

### 8.1 Les trois erreurs les plus fréquentes

| Erreur | Correction à apporter en séance |
|---|---|
| « 12 % de couverture, donc l'objectif c'est 80 % » | Non. L'objectif est de couvrir **le risque**, pas la ligne. Google lui-même donne 60 % comme acceptable et 75 % comme louable, en avertissant qu'un fort pourcentage ne garantit pas la qualité des assertions [S-09]. On y revient en M1 et M12. |
| « Les 9 tests en `[Skip]`, on les supprime » | Interdit par le barème (−40 QAC). Un test ignoré depuis 14 mois est une **information** : quelqu'un a rencontré un problème et l'a enterré. On les rouvre en J3. |
| « On peut demander à Claude de faire l'état des lieux » | Oui, et il produira une réponse plausible. Mais si le chiffre n'a pas été exécuté, il n'est pas défendable en comité. Règle de la formation : **tout chiffre livré a été observé**. |

### 8.2 Questions de contrôle

1. **Quelle est la différence entre « tester l'IA » et « tester avec l'IA » ? À quel référentiel chacune se rattache-t-elle ?**
   → Tester l'IA = évaluer un système contenant un modèle (exactitude, robustesse, biais), référentiel ISTQB CT-AI v2.0. Tester avec l'IA = utiliser l'IA générative comme outil de production de tests sur un logiciel classique, socle ISTQB CTFL v4.0.1. Cette formation traite le second.
2. **Que coûte un test tautologique livré, et pourquoi ce malus existe-t-il ?**
   → −30 QAC. Parce que la production de tests est devenue quasi gratuite ; ce qui est rare, et donc ce qui est évalué, c'est le jugement sur leur validité.
3. **Pourquoi la rotation Pilote/Copilote est-elle obligatoire ?**
   → Parce que sans elle, une seule personne par squad fait la formation. Et parce que le rôle de relecteur est le poste critique d'une chaîne de test augmentée.
4. **Combien de tests le dépôt contient-il, et combien s'exécutent réellement ?**
   → 47 découverts, 9 en `[Skip]`, donc 38 exécutés. L'écart est le premier symptôme de dette.
5. **Que faut-il faire si le quota API est épuisé en séance ?**
   → Basculer sur `SOLUTIONS/transcripts/` : les exercices deviennent des analyses critiques de sorties d'IA réelles, déjà enregistrées.

### 8.3 Ce qu'on retient

- La mission est chiffrée : **47 tests, 9 ignorés, 12 % de couverture, 34 min de pipeline, 0 E2E, 4 jours**.
- Cette formation enseigne à **tester avec l'IA**, pas à tester l'IA — deux référentiels ISTQB distincts.
- L'IA rend la production de tests presque gratuite ; le score de la formation évalue le **jugement**, via les malus.
- Le **Copilote** est le poste critique du squad : rien ne sort sans relecture.
- Le premier geste d'un·e QA face à un système inconnu est de **mesurer**, pas de générer.

### 8.4 Transition vers M1

> Vous savez maintenant ce que vous avez : 47 tests dont vous ignorez la valeur, et un délai de quatre jours. La question suivante est la seule qui compte pour arbitrer votre stratégie : **qu'est-ce qu'un LLM sait réellement faire là-dedans — et où va-t-il vous mentir ?** M1 répond aux deux, chiffres et démonstration à l'appui.

---

## 9. Sources

*Module d'ouverture au format allégé : une liste unique, adossée au corpus vérifié `recherche/sources-jour1.md`. Les listes de 10 sources par notion commencent au module M1.*

[S-01] **Software Testing With Large Language Models: Survey, Landscape, and Vision** — https://arxiv.org/abs/2307.07221 — *papier arXiv → IEEE TSE vol. 50 n°4, 2023-2024* — analyse systématique de 102 études ; cadre la place réelle de l'IA générative dans le cycle de test.

[S-02] **ISTQB Glossary — « test automation »** — https://glossary.istqb.org/en_US/term/test-automation-2-2 — *glossaire normatif officiel, 2026* — définition de référence : *« the use of software to perform or support test activities »*.

[S-03] **ISTQB Certified Tester Foundation Level (CTFL) Syllabus v4.0.1** — https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf — *syllabus officiel PDF, 2023 rév. 2024* — 14 Business Outcomes, 64 Learning Objectives, 6 chapitres : socle de vocabulaire de toute la formation.

[S-04] **ISTQB Certified Tester AI Testing (CT-AI) Syllabus v2.0** — https://istqb.org/wp-content/uploads/2026/05/ISTQB-_CTAI_Syllabus_v2.0_Release.pdf — *syllabus officiel PDF, 2026 (GA)* — 7 chapitres examinables, minimum 19,5 h de formation accréditée, prérequis CTFL ; c'est le référentiel du « tester l'IA », hors périmètre ici.

[S-05] **ISTQB CT-AI v2.0 — page de certification** — https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/ — *référentiel officiel, 2026* — chapitre « Testing Generative AI and Large Language Models » ; examen de 40 questions, score de passage 29/44.

[S-06] **The 2026 State of Testing Report (PractiTest)** — https://www.practitest.com/state-of-testing/ — *rapport industrie, 13ᵉ édition, 2026* — adoption de l'IA en test à 76,8 % ; 70 % l'utilisent pour créer des cas de test mais seulement 19,9 % pour l'identification de risques.

[S-07] **World Quality Report 2025-26 (Capgemini / Sogeti / OpenText)** — https://www.capgemini.com/insights/research-library/world-quality-report-2025-26/ — *rapport industrie, 2025-2026* — ~90 % des organisations poursuivent la GenAI en quality engineering, mais 15 % seulement à l'échelle entreprise.

[S-08] **Stack Overflow Developer Survey 2025 — AI** — https://survey.stackoverflow.co/2025/ai — *enquête industrie, >49 000 répondants, 2025* — 84 % utilisent ou prévoient d'utiliser l'IA, mais 46 % ne font pas confiance à l'exactitude des sorties.

[S-09] **Code Coverage Best Practices (Google Testing Blog)** — https://testing.googleblog.com/2020/08/code-coverage-best-practices.html — *blog officiel Google, 2020* — seuils indicatifs 60 % acceptable / 75 % louable / 90 % exemplaire, assortis de l'avertissement qu'un fort pourcentage ne garantit pas la qualité des assertions.

[S-10] **Design choices made by LLM-based test generators prevent them from finding bugs** — https://arxiv.org/abs/2412.14137 — *papier arXiv, 2024* — source de référence sur le test tautologique : sur du code bogué, les générateurs valident le bug au lieu de le détecter. Justifie le malus de −30 QAC.

[S-11] **Katalon's 2025 State of Software Quality Report** — https://katalon.com/resources-center/blog/2025-state-of-software-quality-report — *rapport industrie, 1 500 professionnels QA, 2025* — 61 % des équipes adoptent le testing piloté par IA ; les testeurs qui utilisent l'IA sont deux fois plus susceptibles de craindre d'être remplacés — à citer pour désamorcer l'angoisse en ouverture.

[S-12] **DORA — State of AI-assisted Software Development 2025** — https://dora.dev/dora-report-2025/ — *rapport industrie (Google Cloud, GitHub, GitLab, IT Revolution), 2025* — adoption de l'IA à 90 % (+14 pts) ; l'IA agit en amplificateur (+21 % de tâches complétées) sans amélioration proportionnelle des métriques de livraison.
