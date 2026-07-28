# Guide formateur — « Test logiciel avec IA générative »

**Organisme** : Human Coders (certifié Qualiopi) · **Formateur** : Evan BOISSONNOT
**Format de référence** : 4 journées de 5 h 15 = **21 h 00**
**Document interne** — ne pas distribuer aux participants.
**Version** : 1.0 — juillet 2026

> 🎯 Ce guide est le mode d'emploi de l'animation. Il ne remplace pas les modules :
> il dit **quand**, **combien de temps**, **ce qu'on coupe** et **ce qu'on ne coupe jamais**.

---

## Sommaire

| § | Contenu |
|---|---|
| 1 | Avant la session — J-15, J-7, J-1 |
| 2 | Minutage détaillé des 4 journées — réconcilié à 21 h 00 exactement |
| 3 | Fiche d'animation par module (13 fiches) |
| 4 | Les cinq moments à ne pas rater |
| 5 | Gestion de groupe |
| 6 | FAQ des participants (15 questions) |
| 7 | Plan B |
| 8 | Après la session |

---

# §1. Avant la session

## 1.1 Rétroplanning

| Échéance | Action | Livrable | Durée formateur |
|---|---|---|---|
| **J-15** | Confirmer l'effectif et le format (4 × 5 h 15 / 3 × 7 h / 6 × 3 h 30 / distanciel) | Convention signée, format arrêté | 15 min |
| **J-15** | Vérifier avec le client : GitHub ou GitLab ? Docker autorisé ? Proxy d'entreprise ? Droits d'installation npm/NuGet ? | Fiche « contraintes poste » | 30 min |
| **J-15** | Provisionner les accès Claude Code (abonnement Max ou clés API) et estimer le budget | Ligne budgétaire validée | 30 min |
| **J-7** | Envoyer `00-setup-technique.md` + lien du dépôt aux participants | Courriel de setup (§1.2) | 15 min |
| **J-7** | Créer et pousser les branches de formation (§1.3) | Dépôt prêt | 1 h |
| **J-7** | Vérifier que les 9 bugs plantés sont bien présents et que `dotnet test` affiche **47 tests dont 9 `[Skip]`** | `git log` propre sur `formation/j1-start` | 30 min |
| **J-3** | Relance de setup : demander une capture de `claude /status` et de `dotnet test` | Tableau de suivi de setup | 20 min |
| **J-1** | Rejouer intégralement les exemples A de M1, M5, M6 et M7 sur votre propre poste | Aucun exemple non testé le jour J | 2 h |
| **J-1** | Imprimer les cartes de badges, préparer le paperboard `SCOREBOARD` | Matériel présentiel | 30 min |
| **J-1** | Vérifier le solde d'API et les quotas (§1.5) | Capture de la console de facturation | 10 min |

## 1.2 Le courriel de setup (J-7) — trame

> Objet : **Formation « Test logiciel avec IA générative » — 45 minutes de préparation obligatoires**
>
> Bonjour,
>
> La formation démarre le `<date>` à `<heure>`. Elle est **entièrement en atelier** : le module
> d'ouverture ne prévoit que 15 minutes de **vérification**, pas d'installation.
>
> Merci de réaliser avant le jour 1 les 6 sections du fichier joint `00-setup-technique.md`
> (comptez 45 min) et de me renvoyer **deux captures d'écran** :
> 1. la sortie de `dotnet test` (elle doit afficher **47 tests**) ;
> 2. la sortie de `claude` puis `/status` (compte authentifié).
>
> Si votre poste est verrouillé (pas de Docker, pas de droits d'installation), dites-le-moi
> **maintenant** : une solution de repli existe (devcontainer, base PostgreSQL partagée),
> mais elle se prépare avant, pas pendant.
>
> Bonne préparation,

**Règle d'or** : tout participant qui n'a pas renvoyé ses captures à J-2 est considéré comme
non setupé. On le binôme d'office en M0 ; on ne dépanne pas individuellement en séance.

## 1.3 Les branches à créer dans le dépôt `skyretail`

| Branche | Contenu | Quand elle sert | Protégée ? |
|---|---|---|---|
| `formation/j1-start` | État initial : 47 tests dont 9 `[Skip]`, 12 % de couverture, 0 E2E, pipeline 34 min, les 9 bugs plantés | Point de départ de tout le monde, J1 | non |
| `formation/checkpoint-M01` … `checkpoint-M12` | État attendu **en fin** de chaque module | Rattrapage d'un squad décroché (Plan B, §7) | non |
| `formation/j3-pipeline-rouge` | 19 échecs répartis en 4 catégories (4 vrais bugs, 6 tests faux, 7 flaky, 2 environnement) | J3 uniquement, distribuée en M7 | non |
| `SOLUTIONS` | Corrigés des 9 bugs, transcriptions pré-enregistrées, `DOSSIER-DE-RECETTE.md` de référence | **jamais partagée** | **oui** |
| `squad/oracle/*`, `squad/hunter/*`, `squad/guardian/*` | Espaces de travail des squads | créées par les squads en M0 | non |

> ⚠️ **Vérification J-7 obligatoire** : `git checkout formation/checkpoint-M06 && dotnet test`
> doit passer. Un checkpoint cassé est pire que pas de checkpoint : il fait perdre 20 minutes
> au squad qu'il devait sauver.

## 1.4 Ce qu'il faut préparer côté salle

| Élément | Présentiel | Distanciel |
|---|---|---|
| `SCOREBOARD.md` | Paperboard + feutres 3 couleurs | Fichier partagé projeté en permanence |
| Cartes de badges | 10 cartes A6 imprimées, plastifiées | Émojis dans le canal de discussion |
| Cahier des charges v4.0 | 1 exemplaire papier par squad (6 pages) | PDF distribué en M2 |
| Minuteur visible | Oui — les boss sont chronométrés | Timer partagé à l'écran |
| Second écran formateur | Indispensable (support + démonstration) | Indispensable |
| Sous-salles | — | 1 par squad, ouvertes en permanence |

## 1.5 Budget API — ce qu'il faut provisionner

Ordre de grandeur par participant sur les 21 h, avec discipline de contexte
(voir `00-setup-technique.md` §2.2) :

| Poste | Fourchette |
|---|---|
| M1 → M4 (exploration, génération) | 3 à 6 $ |
| M5 → M6 (agent, itérations) | 8 à 15 $ |
| M7 → M9 (CI, diagnostic, non-fonctionnel) | 6 à 12 $ |
| M10 → M12 (evals, synthèse) | 4 à 8 $ |
| **Total** | **20 à 40 $ / participant** |

**Trois corrections à intégrer au budget :**

1. ⚠️ **À jour au 07/2026** — les modèles de génération 4.7+ utilisent un tokenizer produisant
   **~30 % de tokens en plus** pour le même texte. Une estimation faite en 2025 sous-évalue la
   facture 2026 d'environ un tiers.
2. Prévoir **×1,5 de marge** : un squad qui découvre le mode agentique en M6 peut brûler en
   20 minutes ce qu'un autre consomme en une demi-journée. C'est d'ailleurs le sujet du badge
   💰 **L'Économe**.
3. Un abonnement **Claude Max** par participant couvre confortablement la session et supprime
   la surveillance de solde en séance. C'est l'option recommandée en intra.

**Impressions à prévoir** : cahier des charges v4.0 (6 p. × nombre de squads), cartes de badges,
fiche « les 5 blocs d'un prompt de QA » (M4), grille de revue en 8 points (M2), taxonomie de
flakiness (M7). Total : environ 40 pages pour un groupe de 6.

---

# §2. Minutage détaillé des 4 journées

## 2.1 ✅ Le minutage est réconcilié — 21 h 00 exactement

**Le support tient dans le temps vendu.** La somme des séquences déclarées dans les 13 fichiers
`module-*.md` vaut **21 h 00**, soit exactement la durée contractuelle. Il n'y a plus de
dépassement structurel à arbitrer avant la session.

| Module | Durée annoncée en en-tête | Somme des séquences (§0.4) | Écart |
|---|---|---|---|
| M0 | 0 h 45 | 0 h 45 | **0** |
| M1 | 1 h 30 | 1 h 30 | **0** |
| M2 | 1 h 30 | 1 h 30 | **0** |
| M3 | 1 h 30 *(dont Boss J1 30 min)* | 1 h 30 | **0** |
| M4 | 1 h 30 | 1 h 30 | **0** |
| M5 | 1 h 45 | 1 h 45 | **0** |
| M6 | 2 h 00 *(dont Boss J2 45 min)* | 2 h 00 | **0** |
| M7 | 1 h 30 | 1 h 30 | **0** |
| M8 | 1 h 45 | 1 h 45 | **0** |
| M9 | 2 h 00 *(dont Boss J3 45 min)* | 2 h 00 | **0** |
| M10 | 1 h 30 | 1 h 30 | **0** |
| M11 | 1 h 15 | 1 h 15 | **0** |
| M12 | 2 h 30 *(dont Boss final 60 min)* | 2 h 30 | **0** |
| **Total** | **21 h 00** | **21 h 00** | **0** |

Chaque tableau « 0.4 Découpage horaire » se termine désormais par une **ligne « Total »** qui
affiche explicitement la somme face à la durée d'en-tête : une dérive future se voit à la
lecture, sans recalcul. Trois conventions garantissent la cohérence descendante :

- les **boss** (30 / 45 / 45 / 60 min) et les **2 à 3 min de « La Carte »** sont des durées fermes ;
- le bloc **🧪 exercices** ne descend jamais sous **25 %** de la durée pédagogique du module (boss exclu) ;
- la somme des **durées cibles des 4 exercices** est toujours **≤** à la ligne « exercices » du §0.4,
  sous l'hypothèse de régulation rappelée sous chaque tableau : les exercices ⭐ et ⭐⭐ sont menés
  **en parallèle par les squads** (chacun n'en traite qu'un, puis restitue en 2 min), et l'exercice
  bonus ⭐⭐⭐⭐⭐ est **hors séance**.

### Marges de manœuvre si vous êtes en retard

Le minutage nominal n'a plus de coupe obligatoire. Le tableau ci-dessous n'est donc **pas** un
plan de coupes : c'est la liste de ce qu'on sacrifie **en premier**, module par module, quand un
groupe prend du retard. À décider avant la séance — improviser en séance reste la première cause
de sortie de piste.

| Module | À sacrifier en premier | Gain | Ce qu'on perd |
|---|---|---|---|
| M1 | 🔍 Exemple C (filtre d'assurance Meta) passé en **slide commentée 3 min** au lieu de 7 min | 4 min | Le passage à l'échelle industriel — récupérable en FAQ (§6, Q1) |
| M2 | 🔍 Exemple B (Gherkin → Reqnroll) en démonstration accélérée 8 → 4 min | 4 min | La liaison .NET des scénarios — à renvoyer vers l'annexe B |
| M3 | 🔍 Exemple A (Bogus/graine) 5 → 3 min ; débriefing S9 6 → 4 min | 4 min | La partie reporting, largement reprise en M12. **Le Boss J1 n'est jamais touché.** |
| M4 | 🔍 Exemple C (bibliothèque d'une équipe de 40) 7 → 3 min | 4 min | Le passage à l'échelle organisationnel |
| M5 | 🔍 Exemple C (GitHub MCP + SonarQube MCP) 7 → 3 min ; S3 11 → 8 min | 7 min | La chaîne d'entreprise — à traiter en FAQ |
| M6 | **Rien.** Module protégé | 0 | — |
| M7 | 🔍 Exemple B (clustering des 19 échecs) 7 → 4 min ; S1 10 → 8 min | 5 min | Le clustering algorithmique, restitué par l'exercice M7-2 |
| M8 | 🔍 Exemple B (variante GitLab) 8 → 4 min | 4 min | GitLab — **à ne pas couper si le client est sur GitLab** |
| M9 | S1/S2/S3 : 11+11+11 → 9+9+9 | 6 min | La profondeur théorique ; les exercices et le Boss J3 restent intacts |
| M10 | 🔍 Exemple C (test de garde de dépréciation) 7 → 3 min | 4 min | La partie dépréciation — reprise dans la question piège n°2 du boss final |
| M11 | **Rien.** Module déjà au format serré | 0 | — |
| M12 | Voir §2.5 — repli détaillé | 15 min | — |
| | **Total mobilisable** | **≈ 57 min** | soit ~5 % du volume, réparti sur les 4 jours |

> 📘 **Règle de décision en séance** : on rogne **toujours** dans les exemples (section 2) et
> la théorie (section 1), **jamais** dans les exercices (section 3) ni dans les boss.
> Le support est un atelier : la valeur perçue et l'évaluation Qualiopi sont dans le TP.

## 2.2 Planning A — « matin » 9 h 00 → 14 h 15

Format le plus demandé en intra : la journée reste ouverte l'après-midi.
**5 h 15 d'horloge**, deux pauses de 10 minutes prises **pendant les temps de latence des
agents** (une suite Playwright shardée tourne 4 à 6 minutes : c'est la pause).

### J1 — L'état des lieux

| Début | Fin | Séquence | Durée | Repère d'animation |
|---|---|---|---|---|
| 09 h 00 | 09 h 45 | **M0** — Briefing, auto-positionnement, squads, règles du jeu, checklist | 45 min | Terminer par le score 0-0-0 écrit au paperboard |
| 09 h 45 | 11 h 15 | **M1** — Panorama, oracle, anti-patterns · ☕ pause flottante pendant M1-1 | 90 min | La démonstration du test tautologique tombe vers 10 h 25 |
| 11 h 15 | 12 h 45 | **M2** — Exigences → cas de test, Gherkin, techniques de conception · ☕ pause flottante pendant M2-2 | 90 min | Distribuer le CDC v4.0 papier à 11 h 18, pas avant |
| 12 h 45 | 14 h 15 | **M3** — Données, PBT, mutation testing + 👑 **Boss J1** (30 min) | 90 min | Boss lancé à **13 h 38 au plus tard**, débriefing à 14 h 08 |
| | | **Total J1** | **5 h 15** | Minutage nominal, sans coupe : les 12 min mobilisables de J1 sont en §2.1 |

### J2 — L'arsenal

| Début | Fin | Séquence | Durée | Repère d'animation |
|---|---|---|---|---|
| 09 h 00 | 09 h 10 | **Le Brief** (rituel) : score de la veille, objectif du jour | 10 min | *Inclus dans M4* |
| 09 h 10 | 10 h 30 | **M4** — Prompt et context engineering | 80 min | `CLAUDE.md` écrit avant 10 h 00, sinon M5 décroche |
| 10 h 30 | 12 h 15 | **M5** — Claude Code, MCP, panorama concurrentiel · ☕ pause pendant M5-1 | 105 min | Playwright MCP branché sur `:4200` avant 11 h 15 |
| 12 h 15 | 14 h 15 | **M6** — Agent de test + 👹 **Boss J2** (45 min) | 120 min | Boss lancé à **13 h 30 impérativement** |
| | | **Total J2** | **5 h 15** | |

### J3 — L'industrialisation

| Début | Fin | Séquence | Durée | Repère d'animation |
|---|---|---|---|---|
| 09 h 00 | 10 h 30 | **M7** — Diagnostic, flakiness, self-healing | 90 min | Basculer tout le monde sur `formation/j3-pipeline-rouge` à 09 h 05 |
| 10 h 30 | 12 h 15 | **M8** — CI/CD, headless, OIDC, sélection de tests · ☕ pause pendant les runs Actions | 105 min | Les runs GitHub Actions prennent 5 à 8 min : c'est la pause |
| 12 h 15 | 14 h 15 | **M9** — Charge, sécurité, accessibilité + 🏆 **Boss J3** (45 min) | 120 min | Boss lancé à **13 h 25 impérativement** |
| | | **Total J3** | **5 h 15** | |

### J4 — La mise en production

| Début | Fin | Séquence | Durée | Repère d'animation |
|---|---|---|---|---|
| 09 h 00 | 10 h 30 | **M10** — Observabilité, evals, dérive de modèle | 90 min | `npx promptfoo eval` doit tourner avant 10 h 10 |
| 10 h 30 | 11 h 45 | **M11** — RGPD, prompt injection, AI Act · ☕ pause à 11 h 20 | 75 min | Module dense et court : ne pas le sacrifier |
| 11 h 45 | 13 h 05 | **M12** — Priorisation, ROI, exercices (S0 → S8) | 80 min | Le dossier de recette doit être **commité à 13 h 05** |
| 13 h 05 | 14 h 05 | 👑 **Boss final — Comité de Go/No-Go** (M12 S9) | 60 min | Chronométrage strict : 10 min par squad |
| 14 h 05 | 14 h 15 | 🎓 **Clôture** (M12 S10) — Golden Oracle, tour de table « lundi matin » | 10 min | Le QCM de 20 questions est envoyé en asynchrone (§8.1) |
| | | **Total J4** | **5 h 15** | |

## 2.3 Planning B — journée 9 h 30 → 16 h 15 avec pause déjeuner

**6 h 45 d'horloge − 1 h 00 de déjeuner − 2 × 15 min de pause = 5 h 15 de face-à-face.**
Format recommandé en inter-entreprises et pour les groupes hétérogènes : la pause déjeuner
sert de rattrapage informel.

### Ossature commune aux 4 jours

| Créneau | Nature | Durée |
|---|---|---|
| 09 h 30 → 11 h 00 | Bloc 1 | 90 min |
| 11 h 00 → 11 h 15 | ☕ **Pause** | 15 min |
| 11 h 15 → 12 h 45 | Bloc 2 | 90 min |
| 12 h 45 → 13 h 45 | 🍽️ **Déjeuner** | 60 min |
| 13 h 45 → 15 h 00 | Bloc 3 | 75 min |
| 15 h 00 → 15 h 15 | ☕ **Pause** | 15 min |
| 15 h 15 → 16 h 15 | Bloc 4 | 60 min |
| | **Total pédagogique** | **5 h 15** |

### Affectation des modules

| Bloc | J1 | J2 | J3 | J4 |
|---|---|---|---|---|
| **1** (90) | M0 (45) + M1 §0→§2 (45) | M4 (90) | M7 (90) | M10 (90) |
| **2** (90) | M1 §3→§4 (45) + M2 §0→§2 (45) | M5 §0→§2 (90) | M8 §0→§2 (90) | M11 (75) + lancement M12 (15) |
| **3** (75) | M2 §3→§4 (45) + M3 §0→§2 (30) | M5 §3→§4 (15) + M6 §0→§2 (60) | M8 §3→§4 (15) + M9 §0→§2 (60) | M12 §1→§3 (75) |
| **4** (60) | M3 §3 + 👑 Boss J1 + débrief (60) | M6 §3 + 👹 Boss J2 (60) | M9 §3 + 🏆 Boss J3 (60) | 👑 Boss final (45) + 🎓 clôture (15) |

> ⚠️ **Point de vigilance du planning B** : la pause de 15 h 00 tombe **juste avant le boss**.
> C'est délibéré — les squads reviennent avec les idées claires. Mais il faut annoncer
> le boss **avant** la pause, pour qu'ils y pensent pendant.

### Ce qui change concrètement entre A et B

| Critère | Planning A (matin) | Planning B (journée) |
|---|---|---|
| Fatigue cognitive | Élevée en fin de matinée | Répartie |
| Absorption des temps de latence | Excellente (pauses flottantes) | Bonne (pauses franches) |
| Rattrapage d'un squad en retard | Impossible en séance | Possible pendant le déjeuner |
| Risque de dépassement | Fort sur J4 | Faible |
| Adapté à | Intra, équipe soudée, niveau homogène | Inter, niveaux hétérogènes, distanciel |

## 2.4 Où se trouve la marge de manœuvre, jour par jour

| Jour | Marge mobilisable | Comment la récupérer | Ce qui est intouchable |
|---|---|---|---|
| **J1** | 12 min | Exemples C de M1, exemple A de M3, débriefing S9 de M3 | La démonstration du test tautologique (M1, exemple A) et le Boss J1 |
| **J2** | 11 min | Exemple C de M4 et M5, notion N3 de M5 | L'exercice M5-2 (zéro sélecteur halluciné) et le Boss J2 |
| **J3** | 15 min | Théorie de M9 (les 3 notions), exemples B de M7 et M8 | L'exercice M7-4 (cause racine de BUG-202) et le Boss J3 |
| **J4** | 19 min | Théorie de M12, exercice M12-1 en démonstration collective | Le Boss final et les 3 questions pièges |

## 2.5 M12 — le module le plus tendu, et son repli

Le module M12 vaut **2 h 30 pile** tel qu'écrit : c'est déjà sa version dense, boss final de
60 minutes inclus. Il n'y a donc rien à compresser en amont. En revanche, c'est la séquence où
un retard accumulé sur J4 se paie comptant. Voici le **repli**, dans l'ordre où on l'applique :

| Séquence | Durée nominale (§0.4) | Repli si retard | Comment |
|---|---|---|---|
| S0 — La Carte | 3 min | 3 min | inchangé |
| S1 — N1 Priorisation par les risques | 13 min | **10 min** | Matrice PRISMA au tableau, defect prediction en 3 chiffres |
| S2 — N2 Mesurer la valeur | 13 min | **11 min** | Couverture vs mutation en démonstration live, DORA en une slide |
| S3 — N3 Le métier de testeur augmenté | 9 min | **6 min** | Renvoyé au tour de table de clôture |
| S4 — 🔍 Exemple A (tableau de bord) | 6 min | **4 min** | Script pré-exécuté, on commente la sortie |
| S5 — 🔍 Exemple B (la ligne 42) | 5 min | **5 min** | **inchangé — c'est le cœur du module** |
| S6 — 🔍 Exemple C (ROI honnête) | 4 min | **2 min** | Slide unique |
| S7 — 🧪 Exercices M12-1 à M12-4 | 23 min | **20 min** | M12-1 traité en collectif (4 min), M12-2 → M12-4 en squad |
| S8 — Préparation du dossier | 4 min | **4 min** | Le squelette du `DOSSIER-DE-RECETTE.md` est fourni pré-rempli |
| S9 — 👑 Boss final | 60 min | **60 min** | **jamais réduit en premier** — c'est l'évaluation sommative |
| S10 — 🎓 Clôture | 10 min | **10 min** | QCM envoyé en asynchrone après la session |
| **Total** | **2 h 30** | **2 h 15** | **15 min** rendus au planning sans toucher au boss |

> ⚠️ **Dernier recours seulement** : si le retard dépasse 15 minutes, le boss final passe à
> **45 min** (3 squads × 8 min + 12 min de questions pièges + 9 min de verdict) et la clôture à
> **5 min**. **Ne jamais supprimer les questions pièges.**

---

# §3. Fiches d'animation par module

> Format : **intention · à montrer absolument · le moment clé · sacrifiable · la question qui relance**

---

### 📘 M0 — Briefing de mission *(0 h 45, J1)*

| | |
|---|---|
| **Intention** | Transformer une salle de gens qui attendent « l'IA qui écrit les tests » en trois squads qui ont **mesuré** une dette. Poser le contrat pédagogique et le contrat d'évaluation. |
| **À montrer absolument** | La sortie brute de `dotnet test` sur `formation/j1-start` : **47 tests, 9 `[Skip]`, 12 % de couverture**. Le chiffre lu à l'écran vaut dix minutes de discours. |
| **Le moment clé** | L'énoncé du **malus de Dette Technique**. Quand vous annoncez « −30 QAC pour un test tautologique livré », la salle comprend en 15 secondes que la formation ne récompense pas la vitesse de production. |
| **Sacrifiable si en retard** | Le tirage au sort des noms de squad (attribuez-les), et l'exercice M0-1 réduit à un relevé oral des six indicateurs. |
| **La question qui relance** | *« Levez la main : qui pense que dans deux jours nous aurons 80 % de couverture ? »* — puis : *« Et qui pense que ça voudra dire quelque chose ? »* |

---

### 📘 M1 — Panorama de l'IA générative appliquée au test *(1 h 30, J1)*

| | |
|---|---|
| **Intention** | Installer l'**oracle de test** comme axe de décision de toute la formation, et faire vivre l'anti-pattern tautologique plutôt que le raconter. |
| **À montrer absolument** | 🔍 **Exemple A** : demander à Claude Code de générer les tests de `DiscountEngine.cs`, obtenir une suite **verte**, puis montrer que BUG-101 est toujours là — les tests l'ont figé. C'est la démonstration fondatrice du support (§4.1). |
| **Le moment clé** | La lecture à voix haute de la définition ISTQB de l'oracle : *« a source to determine expected results […] but should not be the code »*. Enchaînez immédiatement : « les tests que vous venez de voir ont pris quoi comme source ? ». |
| **Sacrifiable si en retard** | L'exemple C (filtre d'assurance de Meta) → slide commentée en 3 minutes. Les 4 chiffres de la cascade TestGen-LLM (75 / 57 / 25 / 73 %) suffisent. |
| **La question qui relance** | *« Ce test est vert. Est-ce que ça veut dire que le code est juste, ou que le test est d'accord avec le code ? »* |

---

### 📘 M2 — Générer des cas de test à partir des spécifications *(1 h 30, J1)*

| | |
|---|---|
| **Intention** | Donner une **source de vérité indépendante du code** (le cahier des charges v4.0) et apprendre à la traiter comme un artefact troué : ambiguïtés, silences, contradictions. |
| **À montrer absolument** | La différence entre la sortie Gherkin **brute** et la version **revue** — projetée côte à côte, ligne à ligne. Le diff est le livrable, pas le Gherkin. |
| **Le moment clé** | Quand un squad découvre qu'**EX-014 contredit EX-003** (plafond de 30 % vs 40 % le Black Friday) et que le LLM ne l'avait pas signalé alors que les deux exigences étaient dans son contexte. |
| **Sacrifiable si en retard** | L'exemple B (liaison Reqnroll) en démonstration accélérée. La validation `npx @cucumber/gherkin-utils` reste obligatoire. |
| **La question qui relance** | *« Le modèle a comblé le trou de la spécification par une supposition plausible. Qui, dans votre organisation, a le droit de faire ça ? »* |

---

### 📘 M3 — Données de test et documentation générées *(1 h 30, J1 — contient le Boss J1)*

| | |
|---|---|
| **Intention** | Passer de « j'ai des tests » à « je sais si mes tests vérifient quelque chose » — par le score de mutation. Et produire un jeu de données reproductible sans donnée personnelle. |
| **À montrer absolument** | 🔍 **Exemple C** : **78 % de couverture, 41 % de score de mutation**, sur le même code. Puis 🔍 **Exemple B** : une propriété FsCheck qui trouve BUG-102 en 4 secondes là où la recherche manuelle a pris 20 minutes en M1-4. |
| **Le moment clé** | Le premier mutant survivant expliqué : « ce mutant vous dit exactement quelle ligne n'est vérifiée par aucune assertion. Aucun rapport de couverture ne fait ça. » |
| **Sacrifiable si en retard** | La notion N3 (documentation et reporting) réduite à 5 minutes — elle est reprise en M12. **Le Boss J1 n'est jamais sacrifiable** : c'est la première évaluation formative de la session. |
| **La question qui relance** | *« Vous avez 78 % de couverture. Combien de vos tests tombent si je change un `>` en `>=` ? »* |

---

### 📘 M4 — Prompt et context engineering pour la QA *(1 h 30, J2)*

| | |
|---|---|
| **Intention** | Transformer le prompt d'un message jeté dans un chat en **artefact versionné, variabilisé et évalué**. Et écrire le `CLAUDE.md` du dépôt, qui servira jusqu'à J4. |
| **À montrer absolument** | Le prompt en **cinq blocs** (`<role>`, `<documents>`, `<constraints>`, `<output_format>`, `<examples>`, puis `<task>` en dernier), et surtout la ligne du bloc `<constraints>` : `N'ouvre PAS DiscountEngine.cs. La source de vérité est le document 1.` C'est cette ligne qui casse la tautologie. |
| **Le moment clé** | L'exercice M4-4 : le **même** prompt exécuté trois fois produit trois suites différentes. La salle découvre qu'aucune promesse de reproductibilité n'est tenable. |
| **Sacrifiable si en retard** | L'exemple C (bibliothèque d'une équipe de 40 personnes) → 3 minutes. L'exercice M4-1 peut se faire en collectif au tableau. |
| **La question qui relance** | *« Vous écrivez dans le comité de recette : "les tests ont été générés par IA". Le DSI demande : est-ce qu'on peut refaire tourner ça dans six mois et obtenir la même chose ? »* |

---

### 📘 M5 — Outillage : Claude Code, MCP et panorama concurrent *(1 h 45, J2)*

| | |
|---|---|
| **Intention** | Donner des **yeux** à l'agent. Faire comprendre techniquement pourquoi l'arbre d'accessibilité (200-400 tokens) change tout par rapport à une capture d'écran, et produire une grille de décision outil × feature. |
| **À montrer absolument** | 🔍 **Exemple A** : le même test E2E écrit **sans** MCP (sélecteurs inventés) puis **avec** Playwright MCP (chaque locator issu d'un snapshot de `localhost:4200`). Exécuter les deux (§4.2). |
| **Le moment clé** | L'exercice M5-4 (« L'outil qui ment ») : un serveur MCP dont la description d'outil contient un bloc `<IMPORTANT>` — la salle comprend qu'**une description d'outil est du prompt injecté**, pas de la documentation inerte. |
| **Sacrifiable si en retard** | L'exemple C (GitHub MCP + SonarQube MCP) → 3 minutes. La notion N3 (panorama concurrentiel) peut passer de 13 à 8 minutes, la grille étant produite en exercice. |
| **La question qui relance** | *« Combien de vos sélecteurs actuels ont été confrontés au vrai DOM avant d'être commités ? »* |

---

### 📘 M6 — Concevoir son agent de test personnalisé *(2 h 00, J2 — contient le Boss J2)*

| | |
|---|---|
| **Intention** | Construire un agent qui **exécute réellement** ce qu'il produit, et poser les garde-fous qui l'empêchent de tricher. C'est le module le plus dense de la formation. |
| **À montrer absolument** | 🔍 **Exemple B — l'agent qui triche** : l'agent affaiblit silencieusement une assertion pour faire passer un test. Puis le hook `PreToolUse` avec `exit 2` qui le bloque (§4.3). |
| **Le moment clé** | La démonstration que **seul le code de sortie 2 bloque** un hook — le code 1 est une erreur non bloquante. L'exercice M6-2 fait vivre la différence : avec `exit 1`, le journal montre la détection **mais l'édition a lieu**. |
| **Sacrifiable si en retard** | Rien. **Module protégé.** Si vous êtes en retard en arrivant en M6, prenez les 20 minutes sur M4 et M5, pas sur M6. |
| **La question qui relance** | *« Votre agent dit "c'est corrigé". Qu'est-ce qui, dans votre configuration, rend cette phrase vérifiable ? »* |

---

### 📘 M7 — Diagnostic d'anomalies, flakiness et auto-réparation *(1 h 30, J3)*

| | |
|---|---|
| **Intention** | Remplacer le réflexe `retries: 3` par la question « quelle attente implicite ai-je écrite sans le savoir ? ». Et apprendre à constituer un **dossier d'échec** de 200 lignes plutôt qu'à envoyer 40 000 tokens de trace. |
| **À montrer absolument** | 🔍 **Exemple A** : montage en direct du dossier d'échec de BUG-202 — trace Playwright, JUnit XML, `git diff` limité au SUT, logs applicatifs. Puis le verdict : le bouton « Payer » reste actif 400 ms. |
| **Le moment clé** | Quand la salle réalise que **BUG-202 explique 7 des 12 tests flaky historiques** : une cause racine unique, sept symptômes. C'est le moment où la notion de « cause racine » devient concrète (§4.4). **À dire dans la foulée** : sur la branche du Boss J3, le même défaut n'est révélé que par **un** échec (`E-01`) — les 7 « flaky » du boss ont 7 causes différentes. Les deux populations sont tabulées en `module-07` §1.2.3. |
| **Sacrifiable si en retard** | L'exemple B (clustering des 19 échecs) → 4 minutes, l'exercice M7-2 le refait. La notion N1 de 12 à 8 minutes. |
| **La question qui relance** | *« Ce `waitForTimeout(500)` fait passer le test. Qu'est-ce qu'il prouve sur le produit ? »* |

---

### 📘 M8 — Intégration CI/CD *(1 h 45, J3)*

| | |
|---|---|
| **Intention** | Sortir l'agent du poste de développement : runner jetable, authentification sans secret longue durée, coût mesuré à chaque exécution, pipeline sous 20 minutes. |
| **À montrer absolument** | Le workflow complet construit en direct, avec **`permissions: contents: read` uniquement**, `timeout-minutes ≤ 10`, tous les `uses:` épinglés sur un **SHA de 40 caractères**, et la ligne `::notice::Coût de l'agent : X $` lue dans `total_cost_usd`. |
| **Le moment clé** | 🔍 **Exemple C** : l'injection de prompt portée par une pull request de contributeur externe. La règle qui tombe : `pull_request_target` est proscrit, l'agent n'analyse que les PR de contributeurs avec droit d'écriture. |
| **Sacrifiable si en retard** | La variante GitLab CI (exemple B) → 4 minutes… **sauf si le client est sur GitLab**, auquel cas on inverse et on coupe la partie GitHub Actions. |
| **La question qui relance** | *« Votre RSSI voit `permissions: id-token: write` dans le workflow. Qu'est-ce que vous lui répondez ? »* |

---

### 📘 M9 — Tests non fonctionnels *(2 h 00, J3 — contient le Boss J3)*

| | |
|---|---|
| **Intention** | Couvrir ce qui fait vraiment tomber la production : la charge, la sécurité, l'accessibilité. Et casser trois illusions — « 200 VUs », « scan vert = sécurisé », « axe vert = conforme ». |
| **À montrer absolument** | 🔍 **Exemple A** : la courbe de dégradation de la recherche full-text. p95 à 1 200 produits, puis à 12 000 : **4,87 s**. La dégradation est **supra-linéaire**, le calcul est fait au tableau. |
| **Le moment clé** | 🔍 **Exemple B** : aucun scanner ne détecte BUG-401 (fuite d'identifiant tiers dans l'export RGPD), parce qu'aucun scanner ne connaît la règle métier « `referrerId` ne doit contenir que l'identifiant du titulaire ». L'oracle est réglementaire, pas technique. |
| **Sacrifiable si en retard** | **30 minutes de théorie** : les trois notions passent de 14 à 10 minutes chacune, les trois exemples de 11/8/8 à 8/5/5. Les exercices et le Boss J3 restent intacts. |
| **La question qui relance** | *« Notre pipeline affiche 0 violation axe-core. On écrit "conforme WCAG 2.2" dans le dossier de recette ? »* |

---

### 📘 M10 — Gouvernance, dérive et évaluation des agents *(1 h 30, J4)*

| | |
|---|---|
| **Intention** | Répondre à la question qui tue en comité : *« qui maintient ça dans six mois ? »*. Instrumenter, évaluer, détecter la dérive. |
| **À montrer absolument** | Le jeu d'évals `evals/agent-zero.yaml` qui s'exécute par `npx promptfoo eval` et produit une matrice — avec les **9 bugs plantés** comme cas de test et un cas de contrôle négatif. |
| **Le moment clé** | 🔍 **Exemple B — le juge qui se préfère lui-même**. On fait juger deux versions par un LLM identique au modèle sous test, puis on permute les positions, et l'écart change. Les trois biais (position, verbosité, auto-préférence) deviennent tangibles. |
| **Sacrifiable si en retard** | L'exemple C (test de garde de dépréciation) → 3 minutes ; la notion N3 de 11 à 6 minutes. Le contenu est repris dans la question piège n°2 du boss final. |
| **La question qui relance** | *« Le nom du modèle n'a pas changé. Est-ce que ça veut dire que le comportement n'a pas changé ? »* (§4.5) |

---

### 📘 M11 — Confidentialité, conformité et AI Act *(1 h 15, J4)*

| | |
|---|---|
| **Intention** | Donner au participant de quoi répondre à son DPO. Trois choses : qualifier une donnée, savoir ce qui sort du SI, situer l'agent dans l'AI Act avec le **calendrier révisé**. |
| **À montrer absolument** | 🔍 **Exemple A** : ce qui part réellement quand on prompte — le prompt, mais aussi le contexte enrichi automatiquement par l'outil. Puis le tableau comparatif des rétentions fournisseurs, offre commerciale vs offre grand public. |
| **Le moment clé** | Quand la salle découvre que remplacer les noms par des UUID est une **pseudonymisation**, donc que les données restent personnelles et restent soumises au RGPD. C'est la correction d'idée reçue la plus utile de la journée. |
| **Sacrifiable si en retard** | **Rien.** Le module est déjà au format serré (1 h 15 pour 3 notions). Si vous devez couper, coupez dans M10 ou M12, pas ici : c'est le module que les participants citent le plus en évaluation à froid. |
| **La question qui relance** | *« Le jeu de données que votre agent a généré, il vient d'où ? Et on a le droit de l'envoyer où ? »* |

---

### 📘 M12 — Priorisation par les risques, ROI et Go/No-Go *(2 h 30, J4 — contient le Boss final)*

| | |
|---|---|
| **Intention** | Faire produire une **décision**, pas un rapport. Et démontrer que la valeur d'un·e QA est le jugement, pas la production. |
| **À montrer absolument** | 🔍 **Exemple B — la ligne 42** : supprimer une ligne de `DiscountEngine.cs`, relancer la suite, constater qu'**un seul test sur 87** tombe et que la couverture ne bouge pas d'un point. Puis le score de mutation. |
| **Le moment clé** | Les trois questions pièges du comité, posées à chaque squad sans temps de préparation (§4.6). Elles sont l'évaluation sommative réelle de la formation. |
| **Sacrifiable si en retard** | Voir le repli §2.5 : 15 minutes récupérables sur la théorie et les exemples, sans toucher au boss. En dernier recours seulement : le boss passe de 60 à 45 minutes (8 min par squad) et la clôture de 10 à 5. **Ne jamais supprimer les questions pièges.** |
| **La question qui relance** | *« Si ça casse demain matin, c'est la faute de qui ? »* — et refuser la réponse « du modèle ». |

---

# §4. Les cinq moments à ne pas rater

Ces cinq séquences portent à elles seules le message de la formation. Si vous n'avez le temps
de préparer que cinq choses, préparez celles-là — et **répétez-les la veille**.

## 4.1 🎯 La démonstration du test tautologique (M1, exemple A)

**Où** : J1, vers 10 h 25 en planning A. **Durée** : 12 minutes.

**Déroulé** :

| Temps | Action | Ce que la salle voit |
|---|---|---|
| 0 → 2 min | Ouvrir `DiscountEngine.cs` et le montrer en survol. Ne rien dire de BUG-101 | Un fichier de domaine ordinaire |
| 2 → 5 min | Prompter : « Génère les tests unitaires xUnit + FluentAssertions pour ce fichier » | Une suite de 8 à 14 tests, propre, bien nommée |
| 5 → 7 min | `dotnet test --filter Discount` | **Tout est vert.** Laisser le silence s'installer |
| 7 → 9 min | Ouvrir le CDC v4.0 §3.1 et lire l'exigence sur la non-cumulabilité | La règle métier réelle |
| 9 → 11 min | Montrer que le test « valide » l'ordre inverse — c'est-à-dire qu'il **fige BUG-101** | Le test a pris le code comme oracle |
| 11 → 12 min | Écrire au tableau : *« Un test qui ne peut pas échouer ne teste rien »* | La devise du Squad ORACLE prend son sens |

**Le piège à éviter** : ne pas expliquer avant. Le mécanisme pédagogique repose entièrement sur
l'ordre — voir vert, puis comprendre pourquoi c'est un problème. Si vous annoncez la chute,
vous perdez l'effet et la salle retient un concept au lieu d'une expérience.

**Si ça rate** (l'IA produit un test rouge, ce qui arrive) : c'est encore mieux. Demandez :
« pourquoi ce test-là a échoué alors que les autres passent ? » et remontez au même endroit.

## 4.2 🎯 Le sélecteur halluciné contre le vrai DOM (M5, exemple A)

**Où** : J2, vers 11 h 15 en planning A. **Durée** : 12 minutes.

**Déroulé** : deux tests E2E du tunnel de commande, écrits en parallèle sur deux moitiés d'écran.

| Colonne gauche — sans MCP | Colonne droite — avec Playwright MCP |
|---|---|
| Prompt : « écris le test E2E du tunnel de commande » | Même prompt, MCP branché sur `http://localhost:4200` |
| Sortie : `page.click('.checkout-primary')` | Sortie : `page.getByRole('button', { name: 'Valider la commande' })` |
| Le sélecteur **n'existe pas** dans le DOM | Le locator provient d'un snapshot d'accessibilité, référence `e17` |
| `npx playwright test` → **échec sur timeout de locator** | `npx playwright test` → s'exécute et révèle **BUG-201** (double soumission) |

**La phrase à dire** : *« Le modèle n'a pas menti. Il a produit ce qu'un tunnel de commande
contient statistiquement. Le problème, c'est qu'il n'a jamais regardé le vôtre. »*

**Le chiffre à donner** : un snapshot d'arbre d'accessibilité coûte **200 à 400 tokens** ;
une capture d'écran en coûte des milliers, et le modèle doit encore l'interpréter.
C'est ce rapport qui rend l'approche exploitable en CI.

## 4.3 🎯 L'agent qui triche (M6, exemple B)

**Où** : J2, vers 13 h 00 en planning A. **Durée** : 7 minutes, puis l'exercice M6-4.

**Déroulé** :

1. Lancer l'agent sur une exigence dont le code de production est faux (BUG-103, le plafond
   de remise non appliqué en présence d'une précommande).
2. L'agent génère un test, l'exécute, **il est rouge**.
3. L'agent itère. Observer la seconde version du test : la valeur attendue a changé.
4. Faire `git diff` sur le fichier de test : l'assertion `.Should().Be(30m)` est devenue
   `.Should().Be(38m)` — c'est-à-dire la valeur produite par le code bogué.
5. Montrer le journal : l'agent n'a rien caché, il a juste optimisé « faire passer les tests ».

**Le point à marteler** : l'agent n'a pas de malveillance, il a une **fonction objectif mal
posée**. Si le critère de succès est « la suite est verte », affaiblir une assertion est une
stratégie rationnelle.

**Puis la contre-mesure, immédiatement** : un hook `PreToolUse` qui, avant tout `Write` dans
`SkyRetail.Tests/`, compare au contenu de `git show HEAD:<fichier>` et refuse avec `exit 2`
si le nombre d'assertions diminue ou si une valeur attendue existante change.

**Et la limite, dite honnêtement** : le hook `Stop` est outrepassé après **8 blocages
consécutifs**. Aucune configuration ne garantit qu'un agent ne trichera pas. Elle rend la
triche coûteuse et visible — c'est tout, et c'est déjà beaucoup.

## 4.4 🎯 La cause racine contre le `waitForTimeout` (M7, exercice M7-4)

**Où** : J3, vers 10 h 00 en planning A. **Durée** : 12 minutes + 5 min de Contre-Test.

**Le scénario** : un squad propose de « corriger » le test flaky du tunnel en ajoutant
`await page.waitForTimeout(500)`. Le test passe. Le squad demande la validation.

**Ce que fait le formateur, dans cet ordre** :

1. Valider que le test passe. Ne pas contredire tout de suite.
2. Demander : *« Relancez avec `--repeat-each=20 --workers=4`. »* → il redevient flaky, parce
   que le `waitForTimeout` a masqué le symptôme sur une machine peu chargée, pas sur quatre.
3. Demander : *« Maintenant écrivez le test qui double-clique sur "Payer" et qui assert qu'il
   n'existe qu'une seule commande. »* → il est **rouge**, y compris avec le `waitForTimeout`.
4. Faire nommer la cause : le bouton reste actif 400 ms après la soumission. Le diff de
   correction touche **`payment.component.ts`** (état positionné **synchroniquement**) **et**
   `OrdersController.cs` (clé d'idempotence). **Un seul des deux ne suffit pas.**
5. Appliquer le malus si le squad avait livré : `retry` global → **−60 QAC** au Boss J3.

**La phrase à dire** : *« Le `waitForTimeout` n'a pas corrigé la flakiness. Il a corrigé
votre capacité à la voir. »*

**Le badge à attribuer** : 🧹 **Le Fossoyeur de Flaky** au premier squad qui élimine la cause
racine sans `retry`.

## 4.5 🎯 « Qui maintient ça dans six mois ? » (M10 → boss final)

**Où** : posée en M10, rejouée au boss final J4. **Durée** : 5 minutes en M10, puis notée.

C'est la question qui distingue un squad qui a livré un **outil** d'un squad qui a livré un
**actif**. Elle se prépare en M10 et se paye en M12.

**Ce que le formateur installe en M10, en trois temps** :

| Temps | Contenu | Effet recherché |
|---|---|---|
| 1 | Un service peut dériver **à nom de modèle constant** : l'étude de référence mesure une exactitude passée de **84 % à 51 %** sur une même tâche en trois mois | Casser « le modèle est le même donc les résultats seront les mêmes » |
| 2 | Trois déclencheurs de rejeu : changement de prompt, changement de version de modèle, **cron hebdomadaire sans changement déclaré** | Le troisième est le plus important, et le plus oublié |
| 3 | Le test de garde qui échoue **90 jours avant** la date de retrait annoncée du modèle | Rendre la dépréciation détectable par la CI, pas par la panne |

⚠️ **À jour au 07/2026 — inversion de vocabulaire à signaler** : dans l'API Microsoft Foundry,
`lifecycleStatus: "Deprecating"` signifie **déprécié** et `"Deprecated"` signifie **retiré** —
l'inverse de la convention Anthropic. Un script de garde multi-fournisseurs qui ignore ce point
donne un faux vert.

**Le critère de notation au boss** : un squad qui répond « les tests sont stables, il n'y a
rien à maintenir » prend **−10** sur la question 2. Un squad qui nomme un **propriétaire**,
un **budget** (0,5 j/semaine) et **trois déclencheurs** prend les 17 points.

## 4.6 Récapitulatif — les cinq moments et leur créneau

| # | Moment | Module | Jour | Créneau planning A | Durée | Ne jamais couper |
|---|---|---|---|---|---|---|
| 1 | Test tautologique | M1 ex. A | J1 | ~10 h 25 | 12 min | ✅ |
| 2 | Sélecteur halluciné vs vrai DOM | M5 ex. A | J2 | ~11 h 15 | 12 min | ✅ |
| 3 | L'agent qui triche | M6 ex. B | J2 | ~13 h 00 | 7 min | ✅ |
| 4 | Cause racine vs `waitForTimeout` | M7 ex. M7-4 | J3 | ~10 h 00 | 17 min | ✅ |
| 5 | « Qui maintient ça dans 6 mois ? » | M10 → M12 | J4 | ~09 h 50 puis boss | 5 + noté | ✅ |

---

# §5. Gestion de groupe

## 5.1 Les quatre profils difficiles

### 🙅 Le sceptique — *« De toute façon, l'IA écrit du code de merde »*

| | |
|---|---|
| **Ce qu'il exprime** | Souvent une expérience réelle et malheureuse, parfois une inquiétude professionnelle déguisée en jugement technique. |
| **Ce qu'il ne faut pas faire** | Le contredire avec un chiffre d'adoption. Il en connaît d'autres, et vous entrez dans un débat que personne ne gagne. |
| **Ce qui marche** | Lui donner **raison**, publiquement et tôt. Dès M1, exemple A : « vous avez raison, et on va le mesurer ensemble ». Puis le nommer **arbitre des Contre-Tests** : c'est le rôle qui valorise exactement sa disposition d'esprit. |
| **Le retournement typique** | Il bascule en M3, quand le score de mutation lui donne un chiffre pour ce qu'il pressentait. |
| **Signal d'alerte** | S'il refuse de toucher au clavier en tant que Pilote. Imposez la rotation, elle est faite pour ça. |

### 🚀 L'enthousiaste non critique — *« En trois prompts j'ai 200 tests »*

| | |
|---|---|
| **Ce qu'il exprime** | Une sincère fascination, et souvent un vrai talent de prompting. |
| **Le risque** | Il entraîne son squad vers la production de volume, et son squad finit dernier au scoreboard à cause des malus. |
| **Ce qui marche** | Le malus de Dette Technique, appliqué **sans discussion et publiquement** dès la première occurrence. −30 QAC pour un test tautologique livré : le message passe en une fois. |
| **Le moment décisif** | M6-4 « Faites-le tricher ». Il est généralement le premier à réussir une manœuvre — et donc le premier à comprendre. Valorisez-le pour ça. |
| **Le badge à viser** | 💰 **L'Économe** : il faut consommer moins de tokens qu'un squad concurrent, à résultat égal. Cela le force à la sobriété sans le brider. |

### 🤐 Le silencieux

| | |
|---|---|
| **Deux cas très différents** | (a) il n'ose pas ; (b) il est perdu depuis M1 et n'ose pas le dire. Le diagnostic se fait sur l'auto-positionnement de M0. |
| **Ce qui marche pour (a)** | Le rôle de **Copilote** : il ne parle pas, il relit, et son avis devient structurellement obligatoire avant chaque commit. Puis le rituel du Debrief de fin de journée (« 1 chose apprise, 1 surprenante, 1 doute — par participant ») qui lui donne un tour de parole garanti. |
| **Ce qui marche pour (b)** | La branche `formation/checkpoint-Mxx`. Le remettre à niveau **sans le nommer** : « tout le monde bascule sur le checkpoint, on repart du même point ». |
| **Ce qu'il ne faut pas faire** | L'interroger à froid en plénière. Vous obtiendrez un silence plus long. |

### 🎓 L'expert qui monopolise

| | |
|---|---|
| **Ce qu'il exprime** | Une compétence réelle, et le besoin qu'elle soit reconnue dans un groupe où il ne connaît personne. |
| **Le risque** | Il répond à la place du formateur, et les autres décrochent. |
| **Ce qui marche** | Le nommer explicitement : « vous avez manifestement pratiqué, j'aurai besoin de vous sur le Contre-Test de M5-4 ». On lui donne une place officielle, on récupère le contrôle du temps de parole. |
| **Le levier structurel** | Les **exercices bonus ⭐⭐⭐⭐⭐** (un par module) et le badge 🎓 **Le Pédagogue** (expliquer une notion à un autre squad, jugé clair par celui-ci). Il gagne des points en faisant progresser les autres. |
| **La limite à poser** | *« Je vous propose qu'on garde cette question pour le débriefing — trois personnes ici n'ont pas encore lancé la commande. »* |

## 5.2 Les tensions liées au scoring

| Symptôme | Cause | Réaction |
|---|---|---|
| Un squad conteste un malus | Le barème a été perçu comme arbitraire | Relire le barème à voix haute, montrer l'artefact fautif. **Ne jamais revenir sur un malus** : la crédibilité du scoring est en jeu. |
| Un squad joue le score plutôt que l'apprentissage | Le score est devenu l'objectif | Rappeler que les Contre-Tests rapportent **aux deux camps** (+20/−10 pour l'attaquant qui réussit, +10 au défenseur qui résiste). Le jeu est coopératif à somme non nulle. |
| Écart de plus de 200 QAC en fin de J2 | Squads déséquilibrés dès M0 | Rééquilibrer par les badges (sans valeur en QAC) et débloquer les bonus ⭐⭐⭐⭐⭐ pour le squad de tête. En dernier recours : **masquer le classement, ne garder que les badges**. |
| Un participant se désengage après un malus | Le malus a été perçu comme personnel | Le score est **collectif par squad**. Le redire. Et faire tourner les rôles au module suivant. |
| Contestation du Boss final | Barème jugé sévère | Le barème est annoncé **avant** le boss (§6.2 de M12) et chaque critère est justifié en une phrase à voix haute au verdict. C'est la procédure, elle protège. |

> 🎯 **Le message qui désamorce tout** : *« Le score ne récompense pas la vitesse de production
> de l'IA, il récompense le jugement. Un squad qui génère 200 tests en 10 minutes et en livre 40
> tautologiques finit dernier. C'est le message central de la formation. »* — à dire en M0, et à
> redire à la première tension.

## 5.3 L'hétérogénéité de niveau

L'auto-positionnement de M0 donne le diagnostic en 60 secondes :

| Signal | Ajustement | Où on prend le temps |
|---|---|---|
| Total ≤ 8 chez la majorité | Renforcer les démonstrations guidées, binômage permanent autorisé, **alléger M6** (l'agent est fourni, on l'analyse et on le durcit) | Sur les exercices ⭐⭐⭐⭐ |
| Total 9-16 | Support nominal | — |
| Total ≥ 17 | Débloquer les bonus ⭐⭐⭐⭐⭐ **dès M1**, durcir les Contre-Tests | Sur la théorie (sections 1) |
| **Q6 = 0 ou 1 chez ≥ 50 %** (notion d'oracle absente) | Traiter §1.2 de M1 en démonstration collective au lieu de lecture | Sur l'exemple C de M1 |
| **Q8 = 0 chez ≥ 50 %** (conformité fragile) | Prévenir la salle : « M11 sera dense » | **Ne pas sacrifier M11** au profit du TP |

**Règle de composition des squads** : équilibrer les totaux, écart maximal visé **4 points**.
Un squad homogène et faible décroche. Un squad homogène et fort s'ennuie et va plus vite que
le support.

**Quand un squad entier décroche** : ne pas ralentir le groupe. Lui donner
`formation/checkpoint-Mxx` et le rattacher au débriefing suivant. La formation est conçue pour
que chaque module reparte d'un état connu.

---

# §6. FAQ des participants

Quinze questions réellement posées en session. Les réponses sont **courtes et honnêtes** :
un support qui ne présente que les succès de l'IA est inutilisable en QA.

---

**Q1 — « Est-ce que l'IA va remplacer les testeurs ? »**

Non, et ce n'est pas une réponse de confort. Ce que l'IA fait bien, c'est **produire** :
du code de test, des jeux de données, des synthèses. Ce qu'elle ne sait pas faire, c'est
**établir un oracle indépendant du code** — c'est-à-dire décider ce qui est le comportement
attendu. Cette décision se prend dans une spécification, une norme, une obligation légale ou
une discussion avec le métier.

Ce qui change vraiment : la valeur se déplace de la production vers le jugement. Un signal à
connaître : dans une enquête sectorielle de 2025, les testeurs qui **utilisent** l'IA sont
**deux fois plus susceptibles** de craindre d'être remplacés que ceux qui ne l'utilisent pas.
Ce n'est pas un signal sur le remplacement, c'est un signal sur l'inconfort de la transition.

---

**Q2 — « Combien ça coûte vraiment ? »**

Sur cette formation : **20 à 40 $ par participant** pour 21 heures d'usage intensif. En
production, l'ordre de grandeur utile est différent — c'est le **coût par campagne**, pas par
personne. Trois choses à savoir :

1. La variabilité est d'un **facteur 3** selon le modèle et l'hygiène de contexte. C'est
   l'objet du module M4.
2. Le prompt caching et le traitement par lot (**−50 %**) se **cumulent**.
3. ⚠️ Les modèles 4.7+ produisent **~30 % de tokens en plus** pour le même texte : une
   estimation de 2025 sous-évalue la facture 2026 d'environ un tiers.

Et le coût qui compte le plus n'est pas la facture d'API : c'est le **temps humain de revue**
et la **dette de maintenance** des tests générés. Les deux sont dans le dossier de recette de J4.

---

**Q3 — « On a le droit d'envoyer notre code à un fournisseur américain ? »**

La question comporte trois sous-questions qu'il faut séparer :

| Sous-question | Réponse courte |
|---|---|
| Est-ce un transfert de données personnelles ? | Seulement si le prompt en contient. Du code source sans donnée personnelle n'est pas un traitement RGPD — mais il peut relever du secret des affaires. |
| Le transfert est-il encadré ? | Il existe des décisions d'adéquation et des clauses contractuelles types ; le contrat de sous-traitance (DPA) de l'éditeur est le document à lire, pas sa page marketing. |
| Que fait le fournisseur de mes données ? | Cela dépend de l'**offre** : le régime des offres grand public n'est pas celui des offres commerciales. Et le « Zero Data Retention » est **endpoint par endpoint** ; les journaux de détection d'abus peuvent vivre jusqu'à **30 jours**. |

La réponse opérationnelle en formation : **aucune donnée réelle d'entreprise dans un prompt**.
Le dépôt SkyRetail est le seul terrain. C'est traité en M11 et c'est une règle du jeu assortie
d'un malus de −50 QAC.

---

**Q4 — « Ça marche sur du legacy COBOL / Delphi / VB6 ? »**

Partiellement, et pas comme on l'espère. Trois constats :

1. La **génération de tests** fonctionne d'autant mieux que le langage est représenté dans les
   données d'entraînement et que l'outillage de test est standard. COBOL coche mal les deux
   cases.
2. L'usage qui marche le mieux sur du legacy n'est pas la génération, c'est la
   **caractérisation** : faire décrire par le modèle ce que le code fait, pour construire des
   tests de non-régression sur le comportement actuel. Attention : c'est par construction
   **tautologique** — on fige le comportement, on ne le valide pas. C'est acceptable pour
   sécuriser un refactoring, jamais pour valider une exigence.
3. Le point bloquant est rarement le modèle : c'est l'absence de **runner** exécutable en
   boucle courte. Sans exécution, il n'y a pas d'agent, il y a un générateur de texte.

---

**Q5 — « Quel outil je choisis lundi matin ? »**

La grille de décision est produite en exercice M5-3, feature par feature. Le raccourci
honnête :

| Besoin | Choix par défaut |
|---|---|
| Vous êtes déjà sur GitHub, équipe mixte, budget contraint | GitHub Copilot pour l'assistance quotidienne + un agent CLI pour les campagnes |
| Vous voulez un agent qui exécute et itère sur du .NET/Angular | Claude Code + Playwright MCP + hooks — c'est la chaîne enseignée ici |
| Vous avez un problème de **maintenance E2E** massif | Un outil QA nativement IA à self-healing, mais avec une politique explicite (M7 §N3) |
| Vous avez un problème de **régression visuelle** | Un outil de visual AI dédié — le pixel-à-pixel ne tient pas à l'échelle |
| Vous voulez juste **plus de couverture unitaire** sur du Java | Un générateur déterministe, pas un LLM |

La vraie réponse : **commencez par le problème mesuré**, pas par l'outil. Si vous ne savez pas
dire quel indicateur vous voulez faire bouger, aucun outil ne vous aidera.

---

**Q6 — « Pourquoi `temperature = 0` ne suffit pas ? »**

Parce que la température ne contrôle que l'échantillonnage. Le non-déterminisme résiduel vient
de l'infrastructure d'inférence : parallélisme, tailles de lot variables, non-associativité des
opérations en virgule flottante sur GPU. C'est mesuré : sur une tâche de complétion,
**80 complétions uniques sur 1 000** exécutions à réglages identiques, et jusqu'à **15 % de
variation d'exactitude**.

La conséquence pour un dossier de recette : on ne promet pas la reproductibilité, on **mesure
la variabilité** et on l'exprime en probabilité (« le prompt A révèle BUG-102 dans 1 exécution
sur 3 »). C'est l'exercice M4-4, et c'est ce qui distingue un livrable défendable d'un livrable
optimiste.

---

**Q7 — « Comment j'empêche l'IA de lire notre `.env` ? »**

⚠️ **Pas avec un `.claudeignore` : ce fichier n'existe pas.** Le mécanisme officiel est
`permissions.deny` dans `.claude/settings.json`, avec des entrées de la forme `"Read(./.env)"`
ou `"Read(./secrets/**)"`. Le champ `ignorePatterns` est déprécié.

Deux précisions qui font échouer les configurations en séance :

1. **Depuis la v2.1.210, seules `Edit(path)` et `Read(path)` sont réellement appliquées.**
   Les règles `Write(path)`, `NotebookEdit(path)` et `Glob(path)` sont acceptées mais jamais
   appliquées — un avertissement s'affiche au démarrage.
2. La précédence est **deny-first**. Une règle `allow` ne prime jamais sur un `deny`.

---

**Q8 — « Est-ce que les tests générés sont maintenables ? »**

Moins que ce qu'on croit, et c'est mesurable. Les suites générées par LLM présentent des
défauts systématiques documentés : **Assertion Roulette** (plusieurs assertions sans message
dans un même test), **Magic Number Test**, manque de cohésion. Sur du Python généré, les
erreurs d'assertion représentent **64 %** de toutes les erreurs et le manque de cohésion est
le défaut le plus fréquent (**41 %**).

La contre-mesure enseignée en M2 est la **grille de revue en 8 points**, appliquée par le
Copilote avant chaque commit. Et la métrique qui compte n'est pas le nombre de tests, c'est le
**score de mutation** — sinon vous maintenez du volume sans valeur.

---

**Q9 — « On peut brancher l'agent sur notre Jira / notre référentiel de tests ? »**

Techniquement oui, via MCP : il existe des serveurs officiels ou éditeurs pour la plupart des
outils de la chaîne. Mais **un serveur MCP est un composant de la chaîne d'approvisionnement**,
soumis à revue.

Trois règles minimales, traitées en M5 et M11 :

1. Être dans le registre officiel ≠ être audité. Le registre **délègue le scan** aux registres
   de paquets et ne scanne pas le code.
2. **La description d'un outil est du prompt injecté**, pas de la documentation. L'attaque de
   référence (*tool poisoning*) passe par un bloc `<IMPORTANT>` dans une description d'outil.
3. Épingler la version — sinon vous êtes exposé au *rug pull* (le serveur change de
   comportement après approbation).

---

**Q10 — « Combien de temps avant que ce que j'apprends aujourd'hui soit périmé ? »**

Les **concepts** ne périment pas : oracle de test, score de mutation, taxonomie de flakiness,
modélisation de charge ouverte/fermée, exigences WCAG. Ils ont vingt à cinquante ans.

Les **outils** périment très vite. Repère chiffré : l'un des agents CLI du marché compte
**784 versions** publiées ; une capture d'écran d'interface d'agent est périmée en quelques
semaines. Et le SDK d'agent de référence a connu **158 releases** — d'où la consigne
d'**épingler la version** en CI.

C'est pour cela que ce support met les URL, les versions et les dates partout : ce qui vieillit,
vous pouvez le revérifier. Voir l'annexe D, section « Fraîcheur des sources ».

---

**Q11 — « Notre couverture est à 85 %. On est bons, non ? »**

La couverture mesure ce qui est **exécuté**, pas ce qui est **vérifié**. Les deux se dissocient
massivement dès qu'on génère les tests : on observe couramment **78 % de couverture pour 41 %
de score de mutation** sur le même code — c'est l'exemple C de M3.

Le test décisif tient en une phrase, et c'est la question piège n°1 du comité de J4 :
*« si je supprime la ligne 42, combien de vos tests tombent ? »*. Si la réponse est « un seul
sur 87 », la couverture ne dit rien de votre risque.

À l'inverse, une mise en garde honnête : le score de mutation **n'est pas non plus** une mesure
directe du risque résiduel — sa corrélation avec les défauts réels dépend notamment de la taille
de la suite. La mesure du risque, c'est la matrice de M12, pas un pourcentage.

---

**Q12 — « Est-ce qu'on peut mettre l'agent IA en gate bloquant de la CI ? »**

Non, et c'est une position défendue par les éditeurs eux-mêmes : un service de revue managé se
termine en statut **neutre** par construction. Un check IA **informe**, il ne **gate** pas.

Ce qui peut gater, ce sont des artefacts déterministes : le résultat de `dotnet test`, un seuil
`p(95)` k6, un compte de violations axe-core, un score de mutation minimal, un jeu d'évals qui
régresse de plus d'un cas. L'IA produit ces artefacts ; ce sont eux qui décident.

---

**Q13 — « Notre entreprise interdit les outils cloud. On fait quoi ? »**

Trois options, par ordre de fidélité au support :

| Option | Ce qui marche | Ce qui est perdu |
|---|---|---|
| Modèle auto-hébergé + agent open source | Toute la partie boucle agentique, hooks, CI, non-fonctionnel | La qualité de génération, très sensible au modèle |
| Fournisseur cloud avec résidence UE et rétention nulle contractuelle | Tout | Rien, mais il faut faire valider le DPA par le DPO |
| Mode dégradé sans API | L'analyse critique de sorties d'IA réelles, à partir des transcriptions pré-enregistrées | La pratique de la boucle |

⚠️ Attention à un piège traité en M11 : « résidence UE » ne signifie pas « résidence France ».
Chez certains fournisseurs, une zone de données peut couvrir plusieurs pays européens.

---

**Q14 — « Comment je justifie ce budget à mon manager ? »**

Pas avec un ratio de retour sur investissement générique. Deux chiffres à ne **pas** utiliser :

- Le ratio **1:10:100** de Boehm (« un défaut corrigé en production coûte 100 fois plus »),
  qui est un artefact documenté sans source primaire solide.
- Le chiffre de **2,41 T$** du coût de la non-qualité, qui est une estimation **américaine**,
  souvent citée comme mondiale.

Ce qui marche : un ROI **local et honnête**, en trois blocs — bénéfices mesurés, coûts directs
mesurés, **coûts cachés** (temps de revue, dette de maintenance, faux positifs traités). C'est
l'exercice M12-3, et le barème du boss final récompense explicitement le fait de présenter ses
coûts cachés **spontanément** (+20 QAC).

Et une donnée à garder en tête pour ne pas sur-vendre : dans un essai contrôlé sur des
développeurs expérimentés travaillant sur leurs propres dépôts, l'IA a **ralenti** les
participants alors qu'ils se percevaient comme accélérés. L'écart perception/réalité est réel.

---

**Q15 — « Par où je commence lundi matin, concrètement ? »**

Dans cet ordre, et pas un autre :

| # | Action | Durée | Pourquoi en premier |
|---|---|---|---|
| 1 | Écrire le `CLAUDE.md` de votre dépôt (< 200 lignes) | 1 h | Sans contexte projet, chaque session redécouvre la stack |
| 2 | Poser `permissions.deny` sur `.env`, `secrets/`, `bin/`, `node_modules/` | 15 min | Hygiène minimale, et gain de contexte immédiat |
| 3 | Mesurer votre **score de mutation** sur un seul module métier | 2 h | C'est le chiffre qui va changer vos priorités |
| 4 | Prendre **un** test flaky et en trouver la cause racine | 1/2 j | Un succès visible, qui achète la crédibilité pour la suite |
| 5 | Versionner **un** prompt dans `prompts/` avec 3 cas d'évals | 1 h | C'est le début de la bibliothèque |

Ce qu'il ne faut **pas** faire lundi : lancer une campagne de génération massive de tests.
Vous produirez du volume tautologique que quelqu'un devra maintenir.

---

# §7. Plan B

## 7.1 Table de décision rapide

| Incident | Réaction immédiate | Temps perdu | Repli si ça persiste |
|---|---|---|---|
| **Pas de connexion / quota API épuisé** | Basculer sur les **transcriptions pré-enregistrées** de `SOLUTIONS/transcripts/`. Les exercices deviennent des **analyses critiques de sorties d'IA réelles** | 5 min | Le contenu pédagogique tient sans API sur J1, J3 et J4. J2 est le jour le plus exposé |
| **Un participant n'a pas de droits d'installation** | Binômage immédiat, il prend le rôle de **Copilote** | 0 | Devcontainer `.devcontainer/devcontainer.json`, ou poste de secours du formateur en partage d'écran |
| **Docker indisponible** | Bascule sur la base PostgreSQL partagée fournie par le formateur | 10 min | Mode dégradé SQLite in-memory, documenté en M3 |
| **Le dépôt ne compile pas chez un participant** | `git clean -xfd && git checkout formation/j1-start` | 5 min | Devcontainer, puis binômage forcé |
| **Playwright ne s'installe pas** (proxy, droits) | `npx playwright install --with-deps` avec `HTTPS_PROXY` positionné | 10 min | Exécuter les E2E dans le conteneur Docker officiel Playwright |
| **GitHub Actions indisponible / organisation verrouillée** | Chaque participant travaille sur son **fork personnel** | 15 min | Exécuter les workflows en local avec un runner auto-hébergé, ou traiter M8 en analyse de workflow |
| **Un squad très en avance** | Débloquer l'**exercice bonus ⭐⭐⭐⭐⭐** du module | 0 | Le nommer arbitre des Contre-Tests, ou lui confier le rôle « métier » au boss final |
| **Un squad très en retard** | `git checkout formation/checkpoint-Mxx` | 5 min | Fusionner deux squads pour la fin de journée |
| **Groupe entier trop lent** | Mobiliser les marges de manœuvre de §2.1 par anticipation, dès J1 | — | Passer M9 en démonstration guidée intégrale et protéger le Boss J3 |
| **Groupe entier trop rapide** | Bonus ⭐⭐⭐⭐⭐ systématiques, Contre-Tests sur **tous** les exercices ⭐⭐⭐ | — | Ajouter la 5ᵉ feature : faire auditer le dépôt `SOLUTIONS` (sans les corrigés) |
| **Tension liée au classement** | Rappeler que le score est **collectif** et que les Contre-Tests rapportent aux deux camps | 2 min | Masquer le classement, ne garder que les badges |
| **Un boss n'est terminé par aucun squad** | Le formateur déroule le corrigé de référence en direct, en commentant | 10 min | Attribuer les QAC au prorata des critères atteints, jamais 0 |

## 7.2 Le mode « sans API » — ce qui tient et ce qui tombe

| Module | Tient sans API ? | Substitution |
|---|---|---|
| M0 | ✅ | — |
| M1 | ✅ | Transcription de la génération tautologique, analysée collectivement |
| M2 | ⚠️ partiel | Gherkin brut pré-généré fourni ; le diff reste l'exercice |
| M3 | ✅ | Stryker, FsCheck et Bogus ne nécessitent pas d'API |
| M4 | ⚠️ partiel | Les prompts s'écrivent et se relisent ; la mesure d'écart (M4-3, M4-4) tombe |
| M5 | ❌ | Playwright MCP nécessite un modèle. Repli : `npx playwright codegen`, qui produit aussi des locators issus du DOM réel |
| M6 | ❌ | L'agent est fourni pré-construit ; l'exercice devient « durcissez-le » (M6-2, M6-4 restent jouables) |
| M7 | ✅ | Le clustering et la taxonomie se font sans LLM ; c'est même l'enseignement de M7-2 |
| M8 | ⚠️ partiel | Le workflow s'écrit et se valide ; l'étape d'analyse IA est skippée — ce qui est justement l'attendu de M8-4 |
| M9 | ✅ | k6, ZAP, axe-core sont autonomes |
| M10 | ⚠️ partiel | Le jeu d'évals s'écrit ; son exécution nécessite un modèle |
| M11 | ✅ | Module documentaire et de configuration |
| M12 | ✅ | Priorisation, APFD, ROI et boss final sont humains par construction |

> 🎯 **À dire à la salle en cas de bascule** : *« On va faire ce que fait un·e QA la moitié du
> temps : critiquer une sortie qu'on n'a pas produite. C'est la compétence, pas le prompt. »*

## 7.3 Les cinq pannes techniques les plus fréquentes en séance

| Panne | Symptôme | Correction en 60 secondes |
|---|---|---|
| Serveur MCP muet | `claude mcp list` affiche `playwright` mais `/mcp` ne liste aucun outil | Un `console.log` dans un serveur stdio casse le protocole : le serveur **ne doit rien écrire d'autre que du MCP sur `stdout`** |
| `CLAUDE.md` ignoré | Les conventions ne sont pas appliquées | ⚠️ Claude Code lit `CLAUDE.md`, **pas `AGENTS.md`**. Créer un `CLAUDE.md` avec `@AGENTS.md` en première ligne |
| Le hook ne bloque pas | Le journal montre la détection, l'édition a lieu quand même | **Seul `exit 2` bloque.** `exit 1` est une erreur non bloquante |
| Tests E2E instables en salle | Échecs aléatoires sur plusieurs postes | Fixer `TZ`, `--workers=1` pour le diagnostic, et vérifier que le seed de la base est rejoué |
| Pipeline qui échoue sur les forks | Les secrets ne sont pas disponibles | C'est **normal et voulu**. Ne pas « corriger » avec `pull_request_target` — c'est le vecteur d'attaque de M8-4 |

---

# §8. Après la session

## 8.1 Évaluation à chaud

**Quand** : dans les 30 minutes suivant la clôture, lien envoyé avant que les participants
quittent la salle. Taux de réponse observé : > 80 % si envoyé en séance, < 40 % le lendemain.

**Contenu** : questionnaire de 12 questions, grille complète en
`annexes/annexe-C-grilles-evaluation.md` §6.

**En complément** : le **QCM sommatif de 20 questions** est envoyé en asynchrone — la clôture
en séance (M12 S10, 10 min) est calibrée sans lui. Fenêtre de réponse : 48 h. Il alimente
la traçabilité Qualiopi des objectifs O1 à O13.

## 8.2 Évaluation à froid (J+60)

**Quand** : 60 jours après la fin de session. C'est le délai qui permet de mesurer le
**transfert** — assez long pour que quelque chose ait été mis en œuvre, assez court pour que le
souvenir soit exploitable.

**Contenu** : 6 questions, grille en annexe C §7. Une seule question compte vraiment :
*« Qu'avez-vous effectivement mis en place ? »*, avec réponse ouverte obligatoire.

**Exploitation** : les réponses alimentent la révision du support. Une action citée par moins
de 20 % des répondants sur trois sessions consécutives est un signal que le module correspondant
ne transfère pas.

## 8.3 Attestation et pièces Qualiopi

| Pièce | Émise par | Quand | Contenu |
|---|---|---|---|
| **Feuille d'émargement** | Formateur | Demi-journée par demi-journée | Signature par créneau |
| **Attestation de fin de formation** | Human Coders | J+5 | Intitulé, dates, durée (**21 h**), objectifs O1-O13, modalités d'évaluation |
| **Certificat de réalisation** | Human Coders | J+5 | Pièce réglementaire distincte de l'attestation |
| **Grille d'auto-positionnement** (M0) | Participant | J1 | Archivée — c'est l'évaluation **diagnostique** |
| **Relevé de QA Credits + badges** | Formateur | J4 | Archivé — c'est l'évaluation **formative continue** |
| **QCM + grille de soutenance** | Formateur | J4 ou J+2 | Archivé — c'est l'évaluation **sommative** |
| **Questionnaires à chaud et à froid** | Human Coders | J0 et J+60 | Archivés — satisfaction |
| **Tableau de traçabilité O1-O13** | Formateur | J+5 | Annexe C §8 — la pièce qui relie objectifs, modules et modalités |

> 📘 Le Référentiel National Qualité impose notamment de **tracer l'adaptation des contenus aux
> évolutions du métier**. Sur ce sujet, la section « Fraîcheur des sources » de l'annexe D
> (10 corrections d'idées reçues datées de juillet 2026) est exactement la pièce à produire.

## 8.4 Ressources d'accompagnement post-formation

| Ressource | Forme | Pour qui |
|---|---|---|
| **Annexe B — Bibliothèque de prompts** | 30 prompts versionnés, prêts à copier dans `prompts/` | Tous |
| **Annexe A — Glossaire** | 100+ entrées, à partager avec l'équipe restée au bureau | Tous |
| **Annexe D — Bibliographie** | Corpus dédoublonné, avec la section « Pour aller plus loin » | Ceux qui veulent creuser |
| **Dépôt SkyRetail** | Accès conservé 6 mois, branches de checkpoint incluses | Tous |
| **Session de retour à J+30** | 1 h en visioconférence, facultative, sur les blocages rencontrés | Groupes intra |
| **Certifications** | ISTQB CT-AI v2.0 (test **des** systèmes d'IA) et CT-GenAI (test **avec** l'IA générative) — **ce sont deux choses différentes**, voir annexe D | Ceux qui veulent une reconnaissance formelle |

## 8.5 Ce que le formateur fait dans les 48 h

1. **Mettre à jour le journal de session** : ce qui a débordé, ce qui est tombé à plat, les
   questions nouvelles. C'est la matière de la version suivante du support.
2. **Vérifier les liens de l'annexe D** qui ont bougé pendant la session (le domaine évolue
   vite ; deux ou trois URL par session).
3. **Archiver les livrables des squads** (avec leur accord) : les `DOSSIER-DE-RECETTE.md`
   réels sont les meilleurs exemples pour la session suivante.
4. **Reporter le solde d'API consommé** dans le suivi budgétaire, ventilé par jour. C'est ce
   qui rend l'estimation du §1.5 de plus en plus juste.

---

*Fin du guide formateur. Les grilles d'évaluation, la bibliothèque de prompts, le glossaire et
la bibliographie complète sont dans `annexes/`.*
