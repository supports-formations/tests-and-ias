# Guide d'animation — « Test logiciel avec IA générative »

> **Human Coders (Qualiopi) · Formateur : Evan BOISSONNOT · 28 h — 4 jours × 7 h**
> **09:00-12:30 / 14:00-17:30 · 8 modules · 28 notions · 4 QCM longs · 4 cols**
> Projet fil rouge : **Carnet de voyage** — dispositif *L'Expédition*.

**Document formateur, jamais distribué.** Il ne remplace aucun module : il dit **comment on les
anime**, ce qu'on prépare avant, ce qu'on sacrifie quand on est en retard, et ce qu'on fait quand
rien ne marche. Les documents de référence restent `00-fil-rouge.md` (le dispositif),
`00-carte-du-terrain.md` (**l'oracle du formateur**), `00-grille-modalites.md` (les règles de
rythme) et `00-architecture-28h.md` (le minutage validé).

> ⚠️ **À jour au 07/2026.** Ce guide contient des faits qui périment : documentation d'outillage,
> calendrier réglementaire, versions de normes. Chaque module porte son propre avertissement de
> fraîcheur ; **les cinq faits transverses à revérifier avant chaque session** sont rappelés au
> §1.1. Ne pas animer une session sans les avoir repassés.

---

## §1 Avant la session

### 1.1 Les cinq faits à revérifier avant toute session

Quinze minutes de vérification qui évitent d'enseigner du faux. Ils sont listés ici une fois ; le
détail figure dans les avertissements de fraîcheur de M4, M5, M6, M7 et M8.

| # | Fait | Où le vérifier | Ce qui se dit en séance si c'est encore vrai |
|---|---|---|---|
| **1** | Le calendrier de l'AI Act post-omnibus | La page de la Commission et la chronologie officielle du Bureau IA | *« Accord politique du 7 mai 2026, **en attente d'adoption formelle** : annexe III au 2 déc. 2027, annexe I au 2 août 2028 — et le 2 août 2026 **inchangé** pour l'article 50. »* Le tracker indépendant le plus cité affiche encore « Last updated: 1 August 2024 » : on le projette **comme contre-exemple**. |
| **2** | La documentation de l'outillage assistant | `code.claude.com/docs/en/` | Les liens historiques **redirigent** et les pages ont été **réécrites**. Deux rappels obligatoires : **`.claudeignore` n'existe pas** (le mécanisme est `permissions.deny` dans `.claude/settings.json`) et **`temperature = 0` n'est pas le déterminisme** — ce paramètre est déprécié et renvoie une erreur 400 sur les modèles récents. |
| **3** | La date de retrait du modèle utilisé en séance | La page de cycle de vie des modèles de l'éditeur | Elle sert d'**ouverture à M8.2**. Si elle a changé, le chiffre de la séance change avec elle : c'est le sujet. |
| **4** | Les versions de normes citées | ISO/IEC **25010:2023** (9 caractéristiques, l'édition 2011 est **retirée**) · OWASP Top 10 **2025** · RGAA **4.1.2** | Dire « les 8 caractéristiques de la 25010 » ou « A03 c'est l'injection » sans préciser l'année décrédibilise en trente secondes devant un public certifié. |
| **5** | Les repères chiffrés du J4 | DORA : **5** métriques, dernier rapport **2025** · METR : **+19 %** de temps · le **1:10:100** de Boehm reste un mythe documenté | Ce sont les trois chiffres que les participants réutiliseront devant leur direction. Les donner faux coûte cher, à eux. |

### 1.2 J-15 — le cadrage

| Action | Détail | Pourquoi c'est à J-15 et pas plus tard |
|---|---|---|
| **Envoyer le dépôt et la fiche de prérequis** | Lien du dépôt *Carnet de voyage* + une page : ce qu'il faut installer, la commande à lancer, la capture d'écran du résultat attendu | Un participant sur trois découvre à J-15 qu'il n'a pas les droits d'installation. C'est le seul délai qui permet à sa DSI de réagir. |
| **Demander la capture du `npm run test:backend`** | Une capture par participant, renvoyée par courriel | C'est le contrôle qui compte. On ne demande pas « avez-vous installé ? » — on demande **la sortie**. |
| **Vérifier les comptes de l'assistant** | Un compte **par participant**, sur une offre **commerciale**, jamais un compte personnel | C'est aussi une exigence de conformité, et elle est enseignée en M8.3 : le formateur ne peut pas dire l'inverse de ce qu'il fait. |
| **Estimer le budget de consommation** | Compter large : les cols J2 et J3 sont les postes principaux | Un quota épuisé au J3 à 16 h coûte le col. Le plan B existe (§7.1) mais il coûte de la valeur pédagogique. |
| **Envoyer le questionnaire de positionnement** | 8 questions : rôle, ancienneté, outils de test pratiqués, usage actuel de l'IA, une attente en une phrase | Exigence Qualiopi **et** matière d'animation : la question « une attente en une phrase » sert au Brief du J1. |
| **Réserver la salle avec ses contraintes** | Un mur libre pour afficher les **cartes du Tri de M1.3** et la **matrice de M8.1** pendant quatre jours · un vidéoprojecteur · des tables déplaçables | Les cordées travaillent en îlots, pas en rangs. Une salle en amphithéâtre casse la moitié du dispositif. |

### 1.3 J-7 — la préparation matérielle

| Action | Détail |
|---|---|
| **Rejouer intégralement le dépôt** | `npm install` · `npm run test:backend` → **2 suites passent, 2 suites échouent** · `npx playwright install` · `npm run e2e`. **Une session complète, sur un poste propre.** |
| **Enregistrer toutes les sorties de secours** | Les prompts A et B de M3.1 · la génération nue de M1.2 · la relecture par LLM de `map.service.ts` pour M7.1 — *qui doit valider le fichier bugué* · les deux exécutions de l'agent pour M8.2. **Conservées dans `annexes/`.** Ce sont les replis de tous les plans B. |
| **Préparer les impressions** *(voir §1.5)* | Les 15 cartes du Tri (M1.3), les cartes-verdict (M1.1), les 14 cartes de M7.4, les 16 cartes-lots et les 10 cartes-incidents de M8.1, les gabarits des 4 cols, les fiches d'écoute du col J4 |
| **Compter les jetons** | 12 jetons **physiques** par cordée pour M8.1. Jetons de poker, pastilles, réglettes — jamais un chiffre écrit sur une feuille : la contrainte doit se **voir** sur la table |
| **Préparer `CARNET-DE-BORD.md`** | À la racine du dépôt partagé, avec les trois lignes de cordée et les colonnes J1-J4 |
| **Relire `00-carte-du-terrain.md` en entier** | C'est l'oracle. Un formateur qui hésite sur l'état d'une fonctionnalité devant une cordée perd l'autorité du dispositif en une seconde |

### 1.4 J-1 — les contrôles qui décident de la journée

| Contrôle | Commande / geste | Attendu | Si ce n'est pas le cas |
|---|---|---|---|
| Le dépôt s'installe | `npm install` | pas d'erreur bloquante | Refaire sur un poste vierge — pas sur le poste du formateur, qui a du cache |
| **La suite sort bien en rouge** | `npm run test:backend` | **2 suites passent, 2 suites échouent** | **C'est le contrôle le plus important du dispositif.** Si la suite est verte, quelqu'un a « réparé » le dépôt : `git checkout` de l'état de départ. Sans ce rouge, M1 n'existe pas |
| Le back démarre | démarrage du backend NestJS | `http://localhost:3000/api` répond | Libérer le port 3000 |
| Le front démarre | démarrage du front Vite | `http://localhost:5173` s'affiche, la carte se charge | |
| Playwright est prêt | `npx playwright install` | navigateurs téléchargés | À faire **la veille**, jamais en séance : c'est long |
| Un compte existe | `POST /api/auth/register` puis `POST /api/auth/login` | un jeton récupérable | Le formateur en garde **deux** en réserve |
| La route d'itinéraire répond | un `POST /api/map/route` à deux points | 200 avec une polyline — **valide en apparence** | C'est la démonstration de M7.1 |
| Les tiers répondent | une recherche de lieu, un calcul d'itinéraire | réponse obtenue | S'ils ne répondent pas : **c'est une opportunité**, voir §7.2 |
| Le magasin porte des traces | `ls data/mails/` · `ls uploads/` · `git status --short` | des fichiers y sont | C'est l'ouverture de M8.3 : si le dossier est vide, exécuter la feature #3 une fois |
| Le scoreboard est prêt | `CARNET-DE-BORD.md` | trois lignes, colonnes vides | |
| Les impressions sont faites | tour de table du matériel | tout est découpé et compté | Découper 45 cartes à 8 h 50 est le meilleur moyen de rater le Brief |
| Le budget de consommation est disponible | console de l'éditeur | quota suffisant pour deux journées | Sinon, activer le plan B §7.1 **avant** le J1, pas pendant |

### 1.5 Le tableau des impressions

| Support | Quantité | Utilisé en |
|---|---|---|
| **Cartes-verdict** (oui/non + preuve + confiance sur 5) | 1 par cordée × 2 | **M1.1** |
| **Les 15 cartes du Tri** | **1 jeu par cordée**, découpées, mélangées, verso vierge | **M1.3** |
| `docs/API-CONTRACT.md` imprimé | **1 par personne**, agrafé | **M2.1**, M2.3, col J1, M8.3 |
| Grille de revue en 8 points | 1 par cordée | **M2.2** |
| Gabarit `carnet/j1-inventaire.md` | 1 par cordée | **Col J1** |
| Gabarit `carnet/j2-rapport-agent.md` | 1 par cordée | **Col J2** |
| Gabarit `carnet/j3-post-mortem.md` | 1 par cordée | **Col J3** |
| **Les 14 cartes d'accessibilité** | 1 jeu par cordée | **M7.4** |
| **Les 16 cartes-lots** de l'Enchère | 1 jeu par cordée | **M8.1** |
| **Les 10 cartes-incidents** de l'Enchère | **1 seul jeu — celui du formateur** | **M8.1** |
| **Planche de mise** | 1 par cordée + 3 de rechange | **M8.1** |
| Grille de conformité vierge | 1 par cordée | **M8.3** |
| Gabarit `carnet/CARNET-DE-ROUTE.md` | 1 par cordée | **Col J4** |
| **Fiches d'écoute du comité** | **3 par cordée** | **Col J4** |
| Fiches de barème des 4 cols | 1 par cordée | Cols J1 à J4 |

---

## §2 Minutage des 4 journées

**Le squelette est identique tous les jours** — c'est volontaire : le participant sait toujours où
il en est. Matin 09:00-12:30 (210 min), déjeuner 12:30-14:00, après-midi 14:00-17:30 (210 min).
**420 min par jour.**

### 2.1 Jour 1 — COMPRENDRE · 🏕️ Le camp de base

| Créneau | Séquence | Modalité | Durée |
|---|---|---|---|
| 09:00 → 09:15 | **Le Brief** — pitch de *L'Expédition*, cordées, score, chiffre d'ouverture | rituel | 15 |
| 09:15 → 10:00 | **M1.1** — Le test qui ne peut pas échouer | JEU — Le Piège | 45 |
| 10:00 → 10:35 | **M1.2** — Ce que mesurent les benchmarks | DESC | 35 |
| 10:35 → 10:50 | **Pause** | — | 15 |
| 10:50 → 11:30 | **M1.3** — Trois familles d'automatisation | JEU — Le Tri | 40 |
| 11:30 → 12:10 | **M1.4** — L'oracle : le contrat, pas le code | DESC | 40 |
| 12:10 → 12:30 | **QCM long M1** — 14 questions | évaluation | 20 |
| 14:00 → 14:40 | **M2.1** — Extraire des exigences testables | SOLO | 40 |
| 14:40 → 15:20 | **M2.2** — La revue en 8 points | GRP | 40 |
| 15:20 → 15:35 | **Pause** | — | 15 |
| 15:35 → 16:15 | **M2.3** — Ambiguïtés, silences, contradictions | INV | 40 |
| 16:15 → 17:15 | 🏆 **COL J1 — « L'Inventaire »** | boss | 60 |
| 17:15 → 17:30 | **Le Débrief** — corrigé, scoreboard | rituel | 15 |

**Contrôle** : matin 15+45+35+15+40+40+20 = **210** · après-midi 40+40+15+40+60+15 = **210** →
**420 min** ✓

### 2.2 Jour 2 — OUTILLER · 🎒 L'équipement

| Créneau | Séquence | Modalité | Durée |
|---|---|---|---|
| 09:00 → 09:15 | **Le Brief** — score du J1, l'étape du jour | rituel | 15 |
| 09:15 → 09:55 | **M3.1** — Le pari : deux prompts, un même code | JEU — Le Pari | 40 |
| 09:55 → 10:35 | **M3.2** — Anatomie d'un prompt : les cinq blocs | DESC | 40 |
| 10:35 → 10:50 | **Pause** | — | 15 |
| 10:50 → 11:30 | **M3.3** — Explorer le monorepo sans le charger | SOLO | 40 |
| 11:30 → 12:10 | **M3.4** — Versionner un prompt comme du code | GRP | 40 |
| 12:10 → 12:30 | **QCM long M3** — 13 questions | évaluation | 20 |
| 14:00 → 14:40 | **M4.1** — Les dix gestes qui servent en QA | SOLO | 40 |
| 14:40 → 15:20 | **M4.2** — MCP : donner des yeux à l'agent | DESC | 40 |
| 15:20 → 15:35 | **Pause** | — | 15 |
| 15:35 → 16:15 | **M4.3** — Choisir son outil : panorama et critères | INV | 40 |
| 16:15 → 17:15 | 🏆 **COL J2 — « L'Éclaireur »** | boss | 60 |
| 17:15 → 17:30 | **Le Débrief** | rituel | 15 |

**Contrôle** : 15+40+40+15+40+40+20 = **210** · 40+40+15+40+60+15 = **210** → **420 min** ✓

### 2.3 Jour 3 — INDUSTRIALISER · ⛰️ L'ascension

| Créneau | Séquence | Modalité | Durée |
|---|---|---|---|
| 09:00 → 09:15 | **Le Brief** — scoreboard, la commande interdite | rituel | 15 |
| 09:15 → 09:55 | **M5.1** — La chasse : cinq défauts en quinze minutes | JEU — La Chasse | 40 |
| 09:55 → 10:35 | **M5.2** — La boucle : générer → exécuter → analyser → corriger | DESC | 40 |
| 10:35 → 10:50 | **Pause** | — | 15 |
| 10:50 → 11:35 | **M5.3** — Construire l'agent : skill, subagent, hook | SOLO | **45** |
| 11:35 → 12:10 | **M5.4** — L'agent qui triche | JEU — Le Piège | **35** |
| 12:10 → 12:30 | **QCM long M5** — 14 questions | évaluation | 20 |
| 14:00 → 14:40 | **M6.1** — Quatre causes, quatre gestes | GRP | 40 |
| 14:40 → 15:20 | **M6.2** — Combien coûte un test qui dépend de Nominatim ? | INV | 40 |
| 15:20 → 15:35 | **Pause** | — | 15 |
| 15:35 → 16:15 | **M6.3** — Mettre l'agent en CI sans se faire piéger | SOLO | 40 |
| 16:15 → 17:15 | 🏆 **COL J3 — « Le Passage difficile »** | boss | 60 |
| 17:15 → 17:30 | **Le Débrief** | rituel | 15 |

**Contrôle** : 15+40+40+15+45+35+20 = **210** · 40+40+15+40+60+15 = **210** → **420 min** ✓

### 2.4 Jour 4 — DÉCIDER · 🏔️ Le sommet

| Créneau | Séquence | Modalité | Durée |
|---|---|---|---|
| 09:00 → 09:15 | **Le Brief** — corrigé express du col J3, l'étape du jour | rituel | 15 |
| 09:15 → 09:50 | **M7.1** — Le pari : l'IA trouve-t-elle cette faille ? | JEU — Le Pari | **35** |
| 09:50 → 10:35 | **M7.2** — Modéliser une charge réaliste | SOLO | **45** |
| 10:35 → 10:50 | **Pause** | — | 15 |
| 10:50 → 11:30 | **M7.3** — Sécurité : ce que le LLM ne peut pas garantir | DESC | 40 |
| 11:30 → 12:10 | **M7.4** — Ce qu'`axe` voit sur une carte | GRP | 40 |
| 12:10 → 12:30 | **QCM long M7** — 15 questions | évaluation | 20 |
| 14:00 → 14:40 | **M8.1** — L'enchère : où mettre l'effort de test ? | JEU — L'Enchère | 40 |
| 14:40 → 15:20 | **M8.2** — Gouverner un agent dans la durée | INV | 40 |
| 15:20 → 15:35 | **Pause** | — | 15 |
| 15:35 → 16:15 | **M8.3** — Ce qui vous engage juridiquement | DESC + GRP | 40 |
| 16:15 → 17:15 | 🏔️ **COL FINAL — « Le Comité de mise en ligne »** | boss | 60 |
| 17:15 → 17:30 | 🏔️ **Le Sommet** — verdicts, trophée, tour de table | rituel | 15 |

**Contrôle** : 15+35+45+15+40+40+20 = **210** · 40+40+15+40+60+15 = **210** → **420 min** ✓

### 2.5 Contrôle global

| Poste | Calcul | Minutes |
|---|---|---|
| Notions | 1 120 min sur 28 notions | 1 120 |
| Briefs et débriefs | 4 × 30 | 120 |
| Pauses | 4 × 30 | 120 |
| QCM longs | 4 × 20 | 80 |
| Cols | 4 × 60 | 240 |
| **Total** | | **1 680** |

**4 × 420 = 1 680 min = 28 h 00** ✓ · Part de descendant : **255 min sur 1 120 min de notions =
22,8 %**, sous le plafond de 35 % de la règle `R-4` ✓

---

## §3 Fiches d'animation — une par module

> Format constant : **l'intention** · **ce qu'il faut absolument montrer** · **le moment clé** ·
> **ce qu'on sacrifie si on est en retard** · **la question qui relance**.

### M1 — « Le test qui ment » · J1 matin · 4 notions

| | |
|---|---|
| **Intention** | Installer le doute qui porte les quatre jours. À la fin, le participant ne demande plus « le test passe-t-il ? » mais **« d'où vient l'attendu ? »**. |
| **Ce qu'il faut absolument montrer** | La **révélation de M1.1** : le test unitaire de la modification d'un voyage est vert, et le scénario réel — créer, ajouter une étape, renommer, relire — rend un voyage **sans étapes**. Et, en M1.4, le couple 🟢/🔴 : l'étalon de la connexion contre le rouge légitime de la création de voyage. |
| **Le moment clé** | Les **cinq secondes de silence** après le `{ "title": "Islande 2026", "etapes": 0 }`. Ne pas parler. Puis la phrase obligatoire, mot pour mot : *« tout le monde est tombé dedans, moi le premier, et c'est exactement pour ça qu'on en fait un point de contrôle. »* |
| **Ce qu'on sacrifie si on est en retard** | **Le débat des trois cartes du Tri de M1.3** : arbitrer la carte 13 seulement, corriger les autres à la grille écrite (−6 min). Puis **le tableau §3 de M1.2** (laboratoire/terrain), qui se lit après (−4 min). **Jamais** la révélation de M1.1 ni la bascule de M1.4. |
| **La question qui relance** | *« Quelle modification du code de production ferait passer ce test au rouge ? »* — elle marche sur n'importe quel test du dépôt, à n'importe quel moment des quatre jours. |

### M2 — « De l'exigence au test » · J1 après-midi · 3 notions + col J1

| | |
|---|---|
| **Intention** | Passer du jugement à la production : savoir **fabriquer** l'attendu à partir du contrat, et voir ce que le contrat ne dit pas. |
| **Ce qu'il faut absolument montrer** | Le **contrat papier annoté** : les participants doivent l'avoir en main, pas à l'écran. Et, en M2.3, un **vrai silence** du contrat sur les étapes — l'ordre, les dates hors du voyage parent, la suppression en cascade. |
| **Le moment clé** | Le moment où une cordée découvre qu'elle a écrit une exigence **que le contrat ne contient pas** : elle l'a comblée elle-même, exactement comme le fera l'IA. |
| **Ce qu'on sacrifie si on est en retard** | La restitution croisée complète de M2.2 : passer à **deux cordées sur trois** (−6 min). Le col J1 ne se raccourcit **jamais** : c'est la matrice sur laquelle reposent les trois jours suivants. |
| **La question qui relance** | *« Cette phrase, elle est dans le contrat, ou c'est vous qui venez de la décider ? »* |

### M3 — « Parler à la machine » · J2 matin · 4 notions

| | |
|---|---|
| **Intention** | Faire passer la qualité de sortie du hasard à la méthode — et faire comprendre pourquoi la **reproductibilité** ne s'achète pas. |
| **Ce qu'il faut absolument montrer** | Le **pari de M3.1** : deux prompts sur la même fonctionnalité, l'écart mesuré, pas raconté. Et le relevé de **coût de contexte** de M3.3, avant et après. |
| **Le moment clé** | Quand la salle constate que le prompt structuré ne produit pas *deux fois la même sortie*, mais **deux fois le même niveau de qualité**. C'est la nuance de tout le module, et elle se dit une fois. |
| **Ce qu'on sacrifie si on est en retard** | La partie « convention d'équipe » de M3.4 se réduit à **un seul runner** au lieu de deux (−8 min). **Jamais** le pari de M3.1 : il fonde le J2. |
| **La question qui relance** | *« Qu'est-ce que vous avez mis dans le prompt qui n'était pas dans le code ? »* |

### M4 — « L'atelier » · J2 après-midi · 3 notions + col J2

| | |
|---|---|
| **Intention** | Mettre les mains dessus. À la fin, chacun a **tapé** les gestes, pas vu quelqu'un les taper. |
| **Ce qu'il faut absolument montrer** | En M4.2, **un sélecteur plausible qui meurt contre le vrai DOM** de la carte. C'est ce qui rend palpable le malus « sélecteur inventé ». |
| **Le moment clé** | L'instant où l'agent, doté de l'arbre d'accessibilité réel, **contredit** ce qu'il affirmait trente secondes plus tôt. |
| **Ce qu'on sacrifie si on est en retard** | La restitution de M4.3 passe de trois lots à **deux** (−8 min), et les gestes 9 et 10 de M4.1 sont donnés en fiche (−5 min). Le col J2 est intouchable. |
| **La question qui relance** | *« Ce sélecteur, vous l'avez exécuté contre quoi ? »* |

### M5 — « L'agent qui travaille seul » · J3 matin · 4 notions

| | |
|---|---|
| **Intention** | Construire un agent qui exécute réellement — et l'empêcher de tricher. La chasse n'est **pas** une chasse au trésor : les six défauts sont connus depuis le débrief du col J1. C'est une **chasse à la preuve**. |
| **Ce qu'il faut absolument montrer** | En M5.4, **l'agent qui produit une assertion verte sur un défaut ouvert**, en direct. Et le **hook qui refuse** de rendre la main tant que le magasin n'est pas propre. |
| **Le moment clé** | Le `git diff` où l'on voit l'assertion changer. Ne pas commenter : laisser lire. |
| **Ce qu'on sacrifie si on est en retard** | Le cinquième défaut de la chasse de M5.1 (−5 min) et le second hook de M5.3 (−7 min). **Jamais** M5.4 : c'est ce qui prépare le malus de −60 PR du col J2 et la catégorie 🔴 du col J3. |
| **La question qui relance** | *« Il a exécuté, ou il a dit qu'il exécutait ? Montrez-moi la sortie du runner. »* |

### M6 — « Dans le pipeline » · J3 après-midi · 3 notions + col J3

| | |
|---|---|
| **Intention** | Cinq catégories d'échec, cinq signaux, cinq gestes — et l'interdiction définitive du `retry` comme remède. |
| **Ce qu'il faut absolument montrer** | Les **20 exécutions** du test de recherche de lieu, lancées en direct pendant qu'on parle, avec les paris de la salle écrits au tableau. |
| **Le moment clé** | Quand la salle réalise que la fonctionnalité concernée **n'a aucun défaut** : l'échec ne dit rien du produit. C'est la définition de l'instabilité, vécue. |
| **Ce qu'on sacrifie si on est en retard** | Le contre-chiffrage croisé de M6.2 (−8 min) et les blocs « artefacts » et « budget » du workflow de M6.3, donnés en corrigé (−7 min). Le col J3 est intouchable. |
| **La question qui relance** | *« Qu'est-ce qui a varié entre les deux exécutions ? Le code, l'ordre, le réseau, ou l'heure ? »* |

### M7 — « Ce que l'IA ne voit pas » · J4 matin · 4 notions

| | |
|---|---|
| **Intention** | Nommer la classe de défauts qu'aucune relecture de code ne donne : ceux dont l'oracle est **hors du dépôt**. Puis couvrir charge, sécurité et accessibilité. |
| **Ce qu'il faut absolument montrer** | En M7.1, **l'IA qui valide `map.service.ts`** — la sortie enregistrée la veille suffit. Puis l'ouverture de la documentation du service tiers : l'ordre des coordonnées y est écrit noir sur blanc. |
| **Le moment clé** | Le retournement : *« ce n'est pas que le modèle est mauvais, c'est que la réponse n'était pas dans ce qu'on lui a donné. »* Il transforme la déception en méthode. Sans cette phrase, la salle repart démoralisée. |
| **Ce qu'on sacrifie si on est en retard** | Le tir de charge de M7.2 se fait sur **un seul scénario** au lieu de deux (−10 min). Les cartes non litigieuses de M7.4 sont corrigées à la grille (−6 min). **Jamais** le pari de M7.1. |
| **La question qui relance** | *« Où est écrit ce qui prouve que c'est faux — et est-ce que c'est dans ce dépôt ? »* |

### M8 — « Décider » · J4 après-midi · 3 notions + col final

| | |
|---|---|
| **Intention** | Faire basculer la salle de *« exécutez et prouvez »* à *« décidez et écrivez pourquoi »*. C'est la seule demi-journée où l'on n'écrit plus de test. |
| **Ce qu'il faut absolument montrer** | La **révélation des incidents de M8.1**, en trois manches, avec le décompte au tableau. Et, en M8.3, l'ouverture de `data/mails/` avec une adresse de courriel **dans le nom du fichier**. |
| **Le moment clé** | La minute 29 de M8.1 : *« personne ne pouvait dépasser 76. Ce jeu n'est pas gagnable — comme un plan de test. »* Et, en M8.2, le **silence sur la case “propriétaire”** : tenir dix secondes sans répondre. |
| **Ce qu'on sacrifie si on est en retard** | La démonstration de cotation en direct de M8.1 (−4 min), puis les phases 5 et 7 du protocole de débrief de M8.2 — elles sont écrites comme coupables. **Jamais** les deux blocs descendants de M8.3 : sans eux, la grille de conformité se remplit à l'intuition. |
| **La question qui relance** | *« Qu'est-ce que vous acceptez de ne pas couvrir — et pourquoi c'est un choix et pas un oubli ? »* |

---

## §4 Les moments à ne pas rater

> Six moments. Ils tiennent, tous les six, en moins de cinq minutes chacun. Ce sont eux dont les
> participants parleront trois mois plus tard. Si la session dérape et qu'il faut choisir, on
> protège ces six-là et on sacrifie le reste.

### 4.1 🪤 La révélation de M1.1 — le test vert, les étapes perdues · *J1, ~09:31*

**Ce qui se passe.** Toutes les cordées ont annoncé publiquement que la modification d'un voyage
était couverte, preuve à l'appui : le test est vert. Le formateur exécute le scénario réel en
quatre appels et relit le voyage : **zéro étape**.

**Ce qui le fait rater.** Trois choses, toujours les mêmes. **(a)** Une cordée rapide découvre le
défaut pendant l'étape ② et l'annonce à voix haute → l'annoncer **avant** : *« si vous trouvez
quelque chose, écrivez-le sur votre carte, ne le dites pas »*. **(b)** Le formateur commente
pendant la démonstration → **ne rien dire entre les deux temps**. **(c)** Le formateur enchaîne
immédiatement → **cinq secondes de silence**, montre en main.

**Ce qui le rend inoubliable.** La phrase, mot pour mot, dite en regardant la salle et pas
l'écran : *« tout le monde est tombé dedans, moi le premier, et c'est exactement pour ça qu'on en
fait un point de contrôle. »*

### 4.2 🎴 Le tri de M1.3 — la carte 13 · *J1, ~11:18*

**Ce qui se passe.** Quinze cartes à classer en trois familles. Douze se classent facilement. Trois
divisent la salle. Et **la carte 13** — *« décider si l'échec de `journeys.create-validation.spec.ts`
accuse le code ou le test »* — n'appartient à **aucune** des trois familles.

**Ce qui le fait rater.** Le tri déborde et l'arbitrage se fait à la va-vite. La contre-mesure est
mécanique : **relance obligatoire à 5 minutes** (*« posez la carte, avancez »*) et **90 secondes
par camp**, chronomètre visible, sur les seules cartes 7, 9 et 13.

**Ce qui le rend inoubliable.** Terminer sur la carte 13 et ne pas la résoudre soi-même : *« aucune
des trois. C'est un jugement humain, et c'est la notion suivante. »* Une cordée qui a **refusé** la
carte en écrivant la raison au verso gagne le jeu, quel que soit le reste de son tri — le dire à
voix haute.

### 4.3 📜 La découverte du contrat comme oracle en M1.4 · *J1, ~11:49*

**Ce qui se passe.** Le formateur exécute le test rouge de la création de voyage, lit l'assertion,
ouvre le contrat sur la ligne *« 400 si `endDate < startDate` »*. Puis, sans prévenir : *« qui
propose une manière de faire passer ce test ? »*

**Ce qui le fait rater.** Personne ne propose l'ajustement d'assertion. Le formateur le propose
alors lui-même : *« moi je vous propose ceci — qui n'est pas d'accord ? »*, et **l'écrit au
tableau**. C'est l'écriture qui produit l'effet, pas la mention.

**Ce qui le rend inoubliable.** La question posée après trois secondes de silence : *« et
maintenant, qu'est-ce qui nous dit encore que le produit accepte des voyages qui finissent avant de
commencer ? »* La preuve vient de disparaître sous leurs yeux. **−40 PR**, le malus le plus lourd
du barème — et ce n'est pas un hasard.

### 4.4 🎭 L'agent qui triche en M5.4 · *J3, ~11:50*

**Ce qui se passe.** L'agent est lâché sur un défaut ouvert, silencieux, qui ne lève aucune erreur.
Il produit un test qui assertit le statut de réponse. Le test est **vert**. Le défaut est intact.
Puis, poussé à « faire passer la suite », il **affaiblit une assertion**.

**Ce qui le fait rater.** L'agent se comporte bien ce jour-là. Le dire, sans embarras : *« aujourd'hui
elle a bien travaillé — c'est la variabilité, on l'a mesurée hier matin »*, puis projeter le diff
enregistré la veille. La démonstration porte sur **le diff**, pas sur la performance du modèle.

**Ce qui le rend inoubliable.** Ne rien commenter pendant la lecture du `git diff`. La salle voit
l'assertion changer. Le silence fait le travail — et il prépare directement le malus de **−60 PR**
du col J2 et la catégorie 🟡 du col J3.

### 4.5 🎲 Le pari de M7.1 — l'IA valide le défaut d'itinéraire · *J4, ~09:22*

**Ce qui se passe.** La salle parie **par écrit** que l'IA va trouver le défaut. Le formateur lui
soumet `backend/src/map/map.service.ts`. **Elle valide le fichier.** Puis il ouvre la documentation
du service tiers, où l'ordre des coordonnées est écrit noir sur blanc.

**Ce qui le fait rater.** Deux écueils opposés. **(a)** Laisser la salle conclure que « l'IA est
nulle » → c'est la conclusion la plus fausse de la semaine, et elle annule trois jours de travail.
**(b)** Laisser quelqu'un lancer la commande qui localise les défauts marqués dans le code →
l'accueillir et retourner l'argument : *« vous venez de lire une déclaration de l'auteur du bug.
Montrez-moi maintenant ce qui, **hors de ce dépôt**, prouve qu'il a raison. »*

**Ce qui le rend inoubliable.** Le retournement, dit lentement : *« ce n'est pas que le modèle est
mauvais. C'est que la réponse n'était pas dans ce qu'on lui a donné. La parade n'est pas un
meilleur prompt : c'est un meilleur **contexte**. »*

### 4.6 💥 La révélation des incidents en M8.1 · *J4, ~14:17*

**Ce qui se passe.** Les planches de mise sont retournées, les engagements sont au tableau. Le
formateur révèle dix cartes-incidents en trois manches. **La manche 2 produit toujours un
silence** : elle frappe le monde extérieur et le magasin, deux lots que presque personne n'a
financés.

**Ce qui le fait rater.** Commenter les résultats avant la fin de la manche 3. **Ne rien dire**
avant que les trois manches ne soient passées et que les scores ne soient au tableau.

**Ce qui le rend inoubliable.** L'annonce du **score maximal théorique : 76 sur 100**, suivie de
cinq secondes de silence, puis : *« personne dans cette salle ne pouvait faire mieux, moi non plus.
Ce jeu n'est pas gagnable — comme un plan de test. Les 24 points qui manquent, dans une heure, ils
s'appelleront “dettes ouvertes” dans votre carnet de route. »*

---

## §5 Gestion de groupe

### 5.1 Les quatre profils difficiles

| Profil | Comment il se manifeste | Ce qu'il faut comprendre | Ce qu'on fait — et ce qu'on ne fait pas |
|---|---|---|---|
| 🧊 **Le sceptique** | *« De toute façon l'IA ne sait pas tester. »* Dès le J1, souvent avec de l'ancienneté et de la légitimité technique. | **Il a raison sur le fond, et le dispositif lui donne raison** trois fois : M1.1, M5.4, M7.1. Le combattre serait absurde. | **On le recrute.** *« Vous allez être content : ce matin, on démonte un test généré. Et j'aimerais que ce soit vous qui le disiez à la salle. »* On lui confie le rôle de contradicteur au col J4 (le DPO ou le métier). **On ne cherche jamais à le convaincre par un chiffre** : il en a de meilleurs. |
| 🚀 **L'enthousiaste non critique** | Colle des sorties de LLM sans les lire, produit vite, valorise le volume. Souvent le plus jeune, souvent le plus rapide. | Il ne fait pas de la mauvaise foi : **il n'a jamais vu le coût**. Il le verra au col J2 (malus −60 PR) et au col J3. | **On le laisse tomber dans le piège**, ce qui est le principe du dispositif — puis on nomme la méthode, jamais la personne. Malus appliqué **sans commentaire moral**. On lui confie le rôle de Gardien au col J3 : c'est le rôle qui le transforme. |
| 🤐 **Le silencieux** | Ne parle jamais en plénière, travaille bien en cordée, disparaît aux restitutions. | Ce n'est ni du désintérêt ni de l'incompétence. C'est souvent l'inverse. | **Les rôles tournants font tout le travail** : rotation Pilote/Copilote **à chaque notion**, et la règle des **deux porte-parole** au col J4. On lui pose des questions **fermées** en circulant (*« vous avez trouvé quoi sur la carte 9 ? »*), jamais une question ouverte en plénière. On ne le désigne **jamais** par surprise devant la salle. |
| 🎓 **L'expert qui monopolise** | Répond à toutes les questions, y compris celles posées aux autres. Souvent bienveillant. | Il assèche la salle sans s'en rendre compte, et il empêche les erreurs — donc l'apprentissage. | **On l'emploie** : badge 🎓 Le Guide, rôle d'aide inter-cordées (**+10 PR** validés par la cordée aidée). Et une règle annoncée au Brief du J1, valable pour tous : *« pendant les jeux, on écrit son verdict, on ne l'annonce pas. »* Cette règle est faite pour lui et ne le désigne pas. |

### 5.2 Les tensions liées au score

Le score est un moteur, et tout moteur chauffe. Trois tensions reviennent :

| Tension | Symptôme | Traitement |
|---|---|---|
| **La contestation de barème** | *« On mérite les 15 PR. »* | **20 secondes d'arbitrage, montre en main, et on passe.** Le formateur tranche, il ne négocie pas. Annoncé au Brief du J1 : *« une contestation par cordée et par module, vingt secondes. »* |
| **Le décrochage de la cordée dernière** | Elle cesse de jouer au J3 | **Les cols valent 100, 100, 100 et 200 PR** : mathématiquement, rien n'est joué avant le J4 après-midi. **Le dire explicitement au Brief du J3**, au tableau, chiffres à l'appui. C'est vrai, et c'est ce qui rattrape le groupe. |
| **La compétition qui tourne à l'aigre** | Piques entre cordées, refus d'entraide | Rappeler le sens du barème : *« une cordée qui génère 200 tests en dix minutes et en livre 40 tautologiques finit dernière. Le score ne récompense pas la vitesse, il récompense le jugement. »* Et **valoriser bruyamment** le +10 PR d'entraide et le badge 🎓 Le Guide. |

### 5.3 L'hétérogénéité du groupe

Elle est **prévue par le terrain**, pas subie : les six zones sont ordonnées par difficulté
croissante, de ⭐ (le poste de garde) à ⭐⭐⭐⭐ (le monde extérieur).

| Situation | Levier |
|---|---|
| Un participant très en avance | Lui donner le **bonus de +40 PR** : *« le dépôt contient des défauts que personne ne prouve. »* C'est une piste ouverte à tout moment. |
| Un participant très en retard sur le clavier | Le placer **Copilote** sur les notions SOLO les plus techniques (M4.1, M5.3, M6.3) et **Pilote** sur les notions de jugement (M1.3, M6.1, M8.1), où il est souvent excellent. |
| Un groupe globalement junior | Réduire la zone Z5 : traiter le défaut d'itinéraire **par la démonstration** en M7.1 plutôt que par la construction du test. Le pari fonctionne quand même. |
| Un groupe globalement senior | Durcir les cols : au col J1, exiger la matrice **sur les seize lignes en 45 minutes** au lieu de 60, et consacrer les 15 minutes gagnées à la contradiction. |
| Un participant qui ne code pas (chef de projet, métier) | Il existe un parcours pour lui : Greffier au col J1, DPO au col J4, et responsable du **format exploitable par un non-technicien** — qui vaut des points à chaque col. Le lui dire au Brief, en privé. |

### 5.4 ⚖️ La contrainte éthique des pièges — **la règle non négociable**

Le dispositif repose sur des pièges : M1.1, M5.4, M7.1, M8.1. **On y tombe publiquement.** C'est ce
qui le rend efficace, et c'est ce qui le rend dangereux si on l'anime mal.

> **La règle : le piège vise la méthode, jamais la personne.**

Cinq applications concrètes, à respecter sans exception :

1. **On ne nomme jamais une cordée qui s'est trompée.** Ni pendant, ni au débrief, ni au scoreboard.
   Les malus s'annoncent **par leur nature**, jamais par leur auteur : *« un livrable a été rendu
   avec une assertion modifiée »*, pas *« PIOLET a modifié une assertion »*.
2. **Le formateur se met dans le piège avec la salle.** La phrase de M1.1 est obligatoire et
   contient *« moi le premier »*. Elle n'est pas une figure de style : sans elle, la révélation
   devient une humiliation collective.
3. **On rappelle que le code piégé a été écrit par des professionnels.** Le test qui ment sur la
   modification d'un voyage a été **écrit et relu**. Ce n'est pas un problème de compétence, c'est
   un problème de méthode. Le dire dès que quelqu'un s'auto-dévalorise.
4. **La proposition dangereuse ne se rejette pas : elle s'essaie.** *« Il suffit d'ajouter un
   `expect` »* → on l'essaie, elle échoue, et c'est l'enseignement. On ne corrige pas une idée, on
   la met à l'épreuve.
5. **Un malus s'applique sans commentaire moral.** Le barème parle ; le formateur ne juge pas.
   *« Malus de −40, c'est le barème, on continue. »* Et jamais de soupir, jamais de sourire
   entendu.

> 🔐 **Le signal d'alerte à surveiller.** Si un participant cesse de proposer des réponses après un
> piège, le piège a raté — pas parce qu'il était trop dur, mais parce qu'il a été mal débriefé.
> Traitement immédiat, en privé, à la pause : *« la moitié de cette formation est construite pour
> qu'on se trompe. C'est le seul endroit de votre année où ça ne coûte rien. »*

---

## §6 FAQ — quinze questions réellement posées

> Réponses courtes et honnêtes. Elles sont là pour être **dites**, pas lues.

**1. « L'IA va-t-elle remplacer les testeurs ? »** *(posée au J1, presque toujours dans la première
heure)*
Ce qu'on observe aujourd'hui, c'est un déplacement de la valeur : la production de cas de test se
délègue largement, le **jugement** ne se délègue pas. Les quatre jours sont construits sur cette
frontière, et vous la verrez à quatre reprises — dont une où l'IA validera un fichier bugué.

**2. « Alors on ne mocke plus rien ? »** *(M1.1, systématique)*
On mocke ce qui est **hors sujet** : le réseau, l'horloge, un tiers. On ne mocke **jamais** la chose
qu'on veut vérifier. Le double n'est pas coupable ; c'est son **placement** qui l'est.

**3. « Ces chiffres sont de quand ? Ils sont déjà périmés. »** *(M1.2)*
Oui, les valeurs bougent. La **forme** ne bouge pas : ce qui n'est pas mesuré aujourd'hui ne le
sera pas davantage dans la version suivante du modèle. Et les dates de chaque source sont dans le
support — vous pouvez les revérifier.

**4. « Et si le contrat est faux ? »** *(M1.4, systématique)*
Alors le test est juste et c'est le contrat qu'on corrige — et on aura appris quelque chose. Ce
qu'on ne fait **jamais**, c'est corriger l'assertion en silence.

**5. « On peut utiliser un autre assistant que celui de la formation ? »**
Oui pour les notions de prompt et de jugement. Non pour les notions M4.1, M5.3 et M6.3, qui portent
sur des mécanismes précis — skills, subagents, hooks, permissions — qui n'ont pas d'équivalent
littéral ailleurs. Vous transposerez : la méthode se transpose, les commandes non.

**6. « Il suffit de mettre la température à zéro pour être reproductible ? »**
Non. C'est une **réduction de variabilité**, jamais une garantie de reproductibilité — et sur les
modèles récents ce paramètre est **déprécié** et renvoie une erreur. C'est précisément pour cela
qu'on écrit une suite d'évaluations : on ne peut pas figer la sortie, on peut la **surveiller**.

**7. « Est-ce qu'on a le droit d'utiliser l'IA sur du code client ? »** *(M8.3)*
La question n'est pas « l'IA », c'est « quel contrat » et « quelles données ». Avec un contrat de
sous-traitance et un périmètre de fichiers maîtrisé, oui. Avec un compte personnel et un dossier de
données réelles ouvert, non — et ce n'était déjà pas le cas avant l'IA. Votre DPO tranchera : on
lui apportera la grille remplie.

**8. « Combien ça coûte, concrètement, d'utiliser un agent sur un vrai projet ? »**
Deux postes, et le second domine : la **consommation** de la chaîne, qui se mesure directement, et
le **temps humain de relecture**, qui ne se mesure que si on le décide. Vous chiffrerez les deux au
J4, sur ce projet, avec vos chiffres.

**9. « Est-ce que je peux montrer ce support à mon équipe ? »**
Les documents formateur ne sont pas diffusables tels quels — ils contiennent les corrigés et les
pièges. Le mémo de synthèse, les grilles et les gabarits de carnet le sont. Ce que vous
emporterez surtout, ce sont **vos** artefacts : agent, évals, grille de conformité, carnet de route.

**10. « Le score, ça sert à quoi ? Je ne suis pas là pour jouer. »** *(posée une fois par session,
souvent par le plus senior)*
Il sert à une chose : rendre visible que **le jugement rapporte plus que la production**. Une cordée
qui produit vite et mal finit dernière, et c'est écrit dans le barème avant qu'on commence. Si le
jeu vous gêne, ignorez les points et gardez les critères.

**11. « Qu'est-ce que je fais si mon équipe refuse d'utiliser l'IA ? »**
Vous n'avez rien à lui vendre. Vous rentrez avec une grille de revue en 8 points et une manière de
détecter un test qui ment — deux choses qui fonctionnent **sans** IA et qui améliorent la suite
existante. Le reste viendra ou ne viendra pas.

**12. « Est-ce que la formation prépare à une certification ? »**
Elle n'y prépare pas formellement, et elle n'est pas une session accréditée. Le référentiel qui
correspond à son périmètre — tester **avec** l'IA générative — est distinct de celui qui porte sur
le test **des** systèmes d'IA ; le support donne les deux références et le canal francophone pour
s'y inscrire.

**13. « Pourquoi le dépôt est-il en TypeScript et pas dans ma stack ? »**
Parce qu'un fil rouge unique est la condition d'un dispositif progressif : les seize
fonctionnalités, les six défauts et les tests qui mentent sont **les mêmes** pour tout le monde
pendant quatre jours. Ce qui se transpose, ce sont les gestes et les critères — pas la syntaxe.

**14. « On n'a pas le temps de tout tester dans la vraie vie. »** *(J4, et c'est la meilleure
question de la semaine)*
Personne ne l'a. C'est exactement l'objet de l'après-midi du J4 : un budget délibérément trop petit,
et l'obligation d'écrire ce qu'on renonce à couvrir. Vous verrez que même parfaitement joué, le jeu
n'est pas gagnable.

**15. « Est-ce qu'on peut avoir les corrigés des cols ? »**
Les gabarits, les barèmes et les grilles : oui, ils vous seront envoyés. Les corrigés de référence :
non, et pas par principe de rétention — ils contiennent les pièges, et un collègue à qui vous
transmettrez le dépôt doit pouvoir y tomber comme vous.

---

## §7 Plan B

> Ordonnés par probabilité décroissante. Le premier est **certain** à un moment ou à un autre ; le
> deuxième est le plus fréquent, et c'est le seul qui soit une **bonne** nouvelle.

### 7.1 Le quota de consommation est épuisé

| Quand ça arrive | Ce qu'on fait |
|---|---|
| **Pendant une notion de démonstration** (M1.2, M3.1, M5.4, M7.1, M8.2) | **Projeter la sortie enregistrée la veille.** Elle existe : la préparation J-7 l'exige pour chacune de ces notions. La démonstration porte sur la **forme** de la sortie, pas sur son obtention en direct. |
| **Pendant un col J2 ou J3** | Basculer en **mode papier** : la cordée écrit son agent — `CLAUDE.md`, skill, subagent, hook — sans l'exécuter, et le formateur note sur les critères de conception. Les critères « exécution réelle » sont **neutralisés et le barème ramené à 100** au prorata. On l'annonce **avant** le col, jamais après. |
| **En prévention** | Deux comptes de secours du formateur, jamais utilisés en démonstration mais disponibles pour une cordée bloquée. Et **une règle annoncée au Brief du J2** : *« on ne relance pas une génération pour voir si elle fait mieux — on la juge. »* |

### 7.2 ⭐ Un service tiers est en panne le jour J — **et c'est une opportunité**

> **C'est le scénario le plus probable des quatre jours.** Les deux services utilisés sont publics,
> gratuits et sans clé : ils répondent lentement, limitent le débit et tombent. **Ce n'est pas un
> incident : c'est le contenu du J3 qui arrive tout seul.**

| Notion concernée | Ce qu'on fait |
|---|---|
| **M6.2** (le coût de l'instabilité) | **On change la nature du signal, pas la notion.** Prévu : 20 exécutions, un taux d'échec. Panne : *« vous ne pouvez pas prouver l'instabilité aujourd'hui par la répétition — elle est totale. Prouvez la dépendance **extérieure** : coupez le réseau et comparez. »* La catégorie reste attribuable, la parade est identique. |
| **Col J3** | La catégorie « monde extérieur » se prouve **par l'absence** : la suite échoue immédiatement et systématiquement. C'est un signal valide, explicitement prévu au barème. |
| **M7.1** (le pari sur l'itinéraire) | **Aucun impact** : le test qui attrape le défaut **assertit l'URL construite** avant l'appel. Il ne dépend d'aucun réseau. C'est même l'argument de la notion — le dire. |
| **M8.1** (l'incident I5) | **Cadeau.** Le formateur lit la carte-incident *« le service est indisponible pendant la fenêtre de mise en ligne »* en montrant l'écran. Personne ne conteste. |
| **Col J4** | La question 3 du comité devient concrète : *« que se passe-t-il le jour où le service est en panne pendant votre release ? »* — *« regardez l'écran, c'est aujourd'hui. »* |

**Ce qu'on dit à la salle, en une phrase, sans dramatiser :** *« le service est tombé. On ne va pas
faire semblant que c'est un problème : c'est exactement ce que je vous aurais fait simuler cet
après-midi, et vous l'avez gratuitement. »*

### 7.3 Le dépôt ne s'installe pas sur un poste

| Cause | Repli |
|---|---|
| Version d'environnement incompatible | Le participant travaille **en binôme** sur le poste voisin, en Copilote, et prend le clavier à chaque rotation. **Aucune notion n'exige un poste par personne**, sauf M4.1 et M5.3 — pour lesquelles on inverse les rôles. |
| Antivirus ou proxy d'entreprise | Ne pas chercher à débloquer en séance : c'est un puits sans fond. Binôme immédiat, et on traite à la pause si c'est possible. |
| Navigateurs de test non téléchargés | Les notions et cols concernés sont traités **sur le papier** : le geste est écrit, non exécuté, et la cordée le signale. Le barème du col J3 perd au maximum 10 PR — c'est prévu. |
| Le dépôt a été modifié la veille par un participant curieux | `git checkout` de l'état de départ. **Contrôle du J-1 : la suite doit sortir avec 2 suites rouges.** Si elle est verte, quelqu'un a « réparé » — et sans ce rouge, M1 n'existe pas. |

### 7.4 Le groupe est trop lent

**Le principe** : on ne raccourcit **jamais** un col ni un moment du §4. On coupe dans les notions,
et on coupe ce qui est **écrit** — ce qui est écrit se lit après.

| Retard | Ce qu'on coupe, dans cet ordre |
|---|---|
| **10 min** | Le tableau « laboratoire / terrain » de M1.2 (−4) · les cartes non litigieuses de M1.3, corrigées à la grille (−6) |
| **20 min** | + la restitution croisée de M2.2, réduite à deux cordées (−6) · la phase de contre-chiffrage de M6.2 (−8) |
| **30 min** | + le second scénario de charge de M7.2 (−10) · la démonstration de cotation de M8.1 (−4) · les phases 5 et 7 du débrief de M8.2, écrites comme coupables (−16) |
| **Au-delà** | Rogner sur les QCM longs : passation en **8 min** au lieu de 12, correction commentée sur **les 6 questions les plus discriminantes**. C'est le dernier levier avant les cols, et il coûte le moins. |

**Ce qu'on ne coupe jamais**, quelle que soit la situation : la révélation de M1.1 · la bascule de
M1.4 · le diff de M5.4 · le pari de M7.1 · la révélation des incidents de M8.1 · **les quatre
cols** · **les 3 minutes des trois questions du comité** au col J4.

### 7.5 Le groupe est trop rapide

C'est plus fréquent avec des groupes seniors, et c'est un risque réel : un groupe qui s'ennuie
décroche plus vite qu'un groupe débordé.

| Levier | Où |
|---|---|
| **Le bonus de +40 PR** — un défaut non listé, découvert **et prouvé par un test rouge** | Ouvert à **tout moment** des quatre jours. C'est le levier le plus efficace : il occupe les rapides sans désorganiser la séance. |
| **Le contre-test** | Une cordée tente de casser la production d'une autre en 5 min. À glisser après M2.2, après le col J2 ou après M6.3. |
| **La quatrième question du col J4** | *« Une question de la cordée qui vient de passer »* — la meilleure contradiction du dispositif, parce qu'elle vient de gens qui viennent de vivre la même chose. |
| **Durcir les cols** | Col J1 en 45 min au lieu de 60, les 15 min gagnées passant en contradiction. Col J3 : exiger en plus le score de mutation sur une zone. |
| **Le mode long de M6.2 et M8.2** | Les deux notions `INV` ont un **protocole de débrief 45-60 min** écrit intégralement. En groupe rapide, on joue la version longue. |

### 7.6 Un participant n'a pas les droits d'installation

C'est la situation à **anticiper à J-15**, et c'est la seule raison pour laquelle l'envoi se fait
si tôt. Si elle survient malgré tout :

1. **Binôme immédiat**, avec rotation stricte du clavier à chaque notion. Le dispositif prévoit
   déjà Pilote/Copilote : ce n'est pas une dégradation, c'est le fonctionnement normal.
2. **Rôles non techniques valorisés** : Greffier au col J1, Gardien au col J3, DPO au col J4,
   responsable du « format exploitable par un non-technicien » — qui rapporte des points à **chaque**
   col.
3. **Ce qu'on ne fait pas** : passer trente minutes à contourner une politique de sécurité
   d'entreprise en séance. Cela ne marche presque jamais, et cela coûte une notion à toute la salle.

---

## §8 Après la session

### 8.1 L'évaluation à chaud — le jour même

| Élément | Détail |
|---|---|
| **Le tour de table du Sommet** | *« Ce que je fais lundi matin »*, une phrase par personne, **et le formateur n'ajoute rien après**. C'est la dernière parole de la formation et elle appartient aux participants. Noter les réponses : elles alimentent l'évaluation à froid. |
| **Le questionnaire de satisfaction** | Envoyé le soir même, rempli avant de partir si possible. Cinq axes : atteinte des objectifs annoncés, rythme, équilibre théorie/pratique, qualité du fil rouge, ce qui manquait. |
| **Deux questions qui valent tout le reste** | *« Quel moment de ces quatre jours raconterez-vous à un collègue ? »* et *« Qu'est-ce que vous avez cru vrai lundi matin et que vous ne croyez plus ? »* Les réponses à la seconde sont l'indicateur d'efficacité le plus fiable du dispositif. |
| **Les traces d'évaluation** | Micro-évaluations (28), QCM longs (4), scores des cols (4) et `CARNET-DE-BORD.md` final. C'est le dossier de preuve d'acquisition — à archiver avec la session. |

### 8.2 L'évaluation à froid — à 3 mois

Trois questions, envoyées par courriel, cinq minutes de réponse. On mesure le **transfert**, pas la
satisfaction : c'est le niveau qui compte et c'est celui que presque personne ne mesure.

1. *« Avez-vous détecté, depuis, un test qui ne pouvait pas échouer ? Sur quel projet ? »*
2. *« Utilisez-vous un agent de test ? Si oui, a-t-il des garde-fous, et qui les maintient ? »*
3. *« Avez-vous écrit une seule fois “ce que nous n'avons pas testé, et pourquoi c'est un choix” ? »*

> Le taux de réponse à la troisième question est l'indicateur le plus intéressant du dispositif :
> c'est la compétence la plus rare, et c'est celle que le col final travaille.

### 8.3 L'attestation et le dossier

| Pièce | Contenu |
|---|---|
| **Attestation de fin de formation** | Intitulé, dates, durée **28 h**, objectifs pédagogiques, modalités d'évaluation — micro-évaluations, QCM longs, mises en situation évaluées. |
| **Relevé d'acquisition** *(facultatif, apprécié)* | Le score final de la cordée, les badges obtenus, et les trois objectifs terminaux atteints. Il rend l'attestation lisible par un manager. |
| **Feuilles d'émargement** | Par demi-journée, 8 au total. |
| **Traces d'adaptation du contenu** | Le relevé des cinq faits revérifiés (§1.1), daté. C'est la preuve directe que le programme est actualisé aux évolutions du métier. |

### 8.4 Les ressources remises aux participants

| Ressource | Forme |
|---|---|
| **Leurs propres artefacts** | Le plus important, et de loin : l'agent (`CLAUDE.md`, skill, subagent, hooks), le jeu d'évaluations, la grille de conformité, les quatre livrables de col. **Ils repartent avec le dépôt.** |
| Le mémo de synthèse | 2 pages : les 4 questions de détection d'un test tautologique, les 5 oracles admissibles et les 3 interdits, les 3 familles d'automatisation, les 5 catégories d'échec, les 4 quadrants de risque, les 5 colonnes d'un jeu d'évals. |
| Les gabarits | Les quatre gabarits de carnet, la grille de revue en 8 points, la grille de conformité, la planche de mise. |
| La bibliographie | Les sources citées, **avec leur date de consultation** — c'est ce qui les rend réutilisables et vérifiables. |
| Le dépôt *Carnet de voyage* | Avec sa carte du terrain **expurgée des corrigés**, pour qu'ils puissent y faire tomber un collègue. |

### 8.5 Ce que le formateur fait pour lui-même, le lendemain

Vingt minutes, pas davantage, mais elles décident de la session suivante.

1. **Reporter les trois incidents de la session** dans le §7 de ce guide. Un plan B qui a servi est
   un plan B qui doit être écrit.
2. **Relever les chiffres réels de la session** — durée des cols, scores, taux de réussite des
   micro-évaluations — et les comparer aux repères des corrigés (« ce que chaque niveau de cordée
   atteint réellement »). Si un repère est faux deux sessions de suite, il se corrige.
3. **Noter les deux questions nouvelles** posées par le groupe et qui ne sont pas dans la FAQ. Au
   bout de trois sessions, elles y entrent.
4. **Revérifier la date des cinq faits transverses (§1.1)** et inscrire la date du contrôle. C'est
   ce qui empêche un support de vieillir sans qu'on s'en aperçoive.

