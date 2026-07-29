# Module M8 — « Décider »

> **Jour 4 · après-midi · 120 min de notions + 60 min de col final · 3 notions**
> *Promesse au participant : « Vous saurez dire ce que vous couvrez, ce que vous ne couvrez pas,
> ce que ça coûte — et le défendre devant une direction. »*

**Document formateur.** Il se déroule tel quel en séance. Les encadrés 🔐 ne sont jamais projetés.
Référence de vérité du terrain : `00-carte-du-terrain.md`. Contrat d'écriture : `00-gabarit-notion.md`.
Barème et rituels : `00-fil-rouge.md` §5 et §7.

> ⚠️ **Avertissement de fraîcheur — à répercuter en séance, une fois, à l'ouverture du module.**
> C'est le module dont le contenu périme le plus vite, parce qu'il est en partie **juridique**.
> Six faits sont **à jour au 07/2026** et doivent être revérifiés avant chaque session :
> 1. **Le calendrier de l'AI Act de 2024 est périmé.** Accord politique « AI omnibus » du
>    **7 mai 2026** : haut risque de l'**annexe III** → **2 décembre 2027** ; haut risque intégré
>    aux produits (**annexe I**) → **2 août 2028**. En revanche le **2 août 2026 est inchangé** :
>    article 50 (transparence), bacs à sable réglementaires, début de l'application effective.
>    ⚠️ **Accord politique ≠ texte en vigueur** : aucune publication au JOUE du règlement
>    modificatif n'est vérifiable. Faire dire aux participants, mot pour mot : *« dates issues de
>    l'accord politique du 7 mai 2026, en attente d'adoption formelle »*. Le tracker le plus cité
>    au monde, `artificialintelligenceact.eu`, affiche toujours « Last updated: 1 August 2024 » et
>    **ignore l'omnibus** : on s'en sert en séance comme **cas d'école de source périmée**.
> 2. **ISO/IEC 25010:2011 est retirée depuis le 04/03/2024.** L'édition en vigueur est
>    **ISO/IEC 25010:2023**, édition 2, **neuf** caractéristiques (et non huit) ; la qualité en
>    utilisation a migré vers **ISO/IEC 25019:2023**. Dire « les 8 caractéristiques de la 25010 »
>    en 2026 est doublement faux.
> 3. **DORA compte cinq métriques depuis 2024**, pas quatre, et le **dernier rapport publié est
>    celui de 2025** (*« AI is an amplifier »*). Les slides « les 4 métriques DORA » recopiées
>    depuis 2019 sont à jeter.
> 4. **Le 1:10:100 de Boehm est un mythe documenté.** La courbe du coût croissant du défaut selon
>    la phase est un *leprechaun* : elle s'emploie **qualitativement**, jamais comme chiffre. Idem
>    pour le **2,41 T$ du CISQ** : périmètre **États-Unis**, daté **2022**, et il inclut
>    **1,52 T$ de dette technique** — un **stock**, pas un flux annuel.
> 5. **L'IA n'accélère pas toujours.** L'essai randomisé **METR 2025** mesure **+19 % de temps**
>    avec les outils d'IA chez des développeurs open source expérimentés, alors qu'ils
>    *anticipaient* **−24 %** et croyaient encore, après coup, avoir gagné **20 %** : plus de
>    40 points d'écart entre perception et réalité. METR affiche elle-même un bandeau
>    d'obsolescence sur ce résultat.
> 6. **`temperature = 0` n'est pas le déterminisme** — rappel des J2 et J3. Sur les modèles
>    récents, `temperature`, `top_p` et `top_k` sont dépréciés et renvoient une **erreur 400**.
>    C'est ce fait qui rend une **suite d'évaluations** nécessaire : on ne peut pas figer la
>    sortie, on ne peut que la **surveiller**.

---

## 0. Carte du module

### 0.1 Objectif terminal

> À l'issue de M8, le·a participant·e est capable de **décider où mettre l'effort de test sous
> contrainte de budget et de le justifier par un couple probabilité × impact**, de **concevoir le
> jeu d'évaluations qui protège un agent de test de la dérive de son modèle**, et de **nommer ce
> que l'usage d'une chaîne de test augmentée engage juridiquement** sur son propre dépôt.

C'est le seul objectif terminal du module. Tout le reste y concourt.

### 0.2 Position dans le fil rouge — *L'Expédition*, 🏔️ le sommet

| | |
|---|---|
| **Ce qui existe avant M8** | Trois cols franchis et un matin de J4. Chaque cordée détient : la matrice des seize fonctionnalités avec ses preuves (`carnet/j1-inventaire.md`), un agent qui génère, exécute et refuse de tricher (col J2), un post-mortem qui classe chaque échec en cinq catégories (`carnet/j3-post-mortem.md`), et — depuis ce matin — un scénario de charge, trois propriétés de sécurité testables, un tri d'accessibilité, et la mémoire cuisante du défaut **#16** que l'IA a validé. Le groupe sait **produire** et **prouver**. Ce qu'il n'a jamais fait : **choisir de ne pas tester quelque chose, et l'assumer par écrit**. |
| **Ce qui existe après M8** | Trois artefacts entrent dans le carnet de cordée et alimentent directement le col final : (1) une **carte des risques** sur les seize fonctionnalités, cotée probabilité × impact, avec le **risque résiduel déclaré** ; (2) un **jeu d'évaluations de non-régression** pour l'agent du col J2, en TypeScript, dont les cas de référence sont les défauts connus du dépôt ; (3) une **grille de conformité** remplie sur le projet réel — `data/mails/`, `/uploads/`, les `.md` du magasin, les appels sortants vers Nominatim. Le col final peut alors demander un carnet de route : ses sept sections sont exactement ces trois artefacts, plus les preuves des trois jours. |
| **Ce que M8 ne fait pas** | On n'écrit plus une seule ligne de test de production : le temps du clavier est fini, celui de la décision commence. On ne fait **pas** d'audit de conformité — on donne le cadre, les seuils et les questions, pas une prestation. Et on ne refait pas la matrice du col J1 : on la **cote**, ce qui n'est pas la même opération. |

> 🎯 **Ce qui change de nature cet après-midi, à dire à l'ouverture du module.** Pendant trois
> jours, la bonne réponse était *« exécutez et montrez-moi la preuve »*. Cet après-midi, la bonne
> réponse devient *« décidez, et écrivez pourquoi »*. Les deux premières notions sont bâties pour
> qu'il soit **impossible de tout couvrir** : le budget de l'enchère est plus petit que la somme
> des besoins, et le jeu d'évaluations ne peut pas contenir tous les cas. C'est délibéré. Un
> participant qui repart en croyant qu'une bonne équipe couvre tout n'a pas fait le J4.

### 0.3 Les trois notions

| # | Notion | Modalité (critère) | Durée | Terrain | Micro-évaluation |
|---|---|---|---|---|---|
| **M8.1** | L'enchère : où mettre l'effort de test ? | **JEU — L'Enchère** (`B-2`) | 40 | **Z1→Z6** — les **16 fonctionnalités** comme lots, budget de test contraint | Exercice court (5 min) |
| **M8.2** | Gouverner un agent dans la durée : dérive et évaluations | **INV** (`D-1`) | 40 | l'**agent construit au col J2** · 🔴 les six défauts comme cas de référence · 🟢 Z1 comme étalon | Restitution notée (grille, 20 PR) |
| **M8.3** | Ce qui vous engage juridiquement | **DESC** ≤ 15 min **+ GRP** (`A-1`, `E-1`) | 40 | **Z4** — `data/mails/`, `/uploads/`, les données dans les `.md` · **Z1** comptes · **Z5** sortie réelle du SI | QCM éclair (3 q.) |

**Rythme** — JEU · INV · DESC+GRP : aucun doublon consécutif (`R-1` ✓) · séquence post-déjeuner
**active** (`R-7` ✓ — on ouvre sur une enchère, pas sur un exposé) · la pédagogie inversée du jour
est en M8.2 (`R-2` ✓) · un jeu sérieux dans la demi-journée (`R-3` ✓) · aucune ligne descendante de
plus de 12 min sans interaction (`R-5` ✓ — le maximum est de **6 min**, en M8.3) · première ligne
de chaque notion non descendante (`R-6` ✓) · clôture du module sur le col final, victoire mesurable
(`R-8` ✓).

> **Note de conception sur la part descendante de M8.3.** La fiche du module dans
> `00-architecture-28h.md` annonce `DESC + GRP`. Le descendant y est **plafonné à 15 minutes**, en
> deux blocs de 6 et 5 minutes séparés par une relance : le fond juridique relève du critère `A-1`
> (*« il n'y a rien à découvrir, le découvrir coûterait 30 min pour un contenu qui s'énonce en
> 3 »*), mais la **décision** relève du critère `E-1` (*« l'objet d'apprentissage est le
> collectif »*). Les 16 minutes de groupe sont donc le cœur de la notion, pas son illustration.

### 0.4 Minutage de la demi-journée

| Créneau | Séquence | Durée | Cumul |
|---|---|---|---|
| 14:00 → 14:40 | **M8.1** — L'enchère : où mettre l'effort de test ? | 40 | 40 |
| 14:40 → 15:20 | **M8.2** — Gouverner un agent dans la durée | 40 | 80 |
| 15:20 → 15:35 | **Pause** | 15 | 95 |
| 15:35 → 16:15 | **M8.3** — Ce qui vous engage juridiquement | 40 | 135 |
| 16:15 → 17:15 | 🏔️ **COL FINAL — « Le Comité de mise en ligne »** | 60 | 195 |
| 17:15 → 17:30 | 🏔️ **Le Sommet** — verdicts, trophée, tour de table | 15 | 210 |

**Contrôle** : 40 + 40 + 15 + 40 + 60 + 15 = **210 min** ✓
(après-midi conforme à `00-architecture-28h.md` §2).

**Contrôle des notions** : 40 + 40 + 40 = **120 min** ✓

### 0.5 Points de Repère mobilisables sur le module

| Source | Gain |
|---|---|
| Jeu M8.1 — cordée au meilleur score de confiance à la fin de l'enchère | 15 PR |
| Micro-évaluation M8.1 réussie | 10 PR |
| Restitution M8.2 jugée complète (grille de recevabilité, 5 critères) | 20 PR |
| Micro-évaluation M8.3 (QCM éclair 3/3) | 10 PR |
| 🏔️ **Col final — Le Comité de mise en ligne** | 0 à 200 PR |
| **Bonus** — défaut non listé, découvert **et prouvé par un test rouge** | +40 PR |
| **Total maximal du module** | **255 PR** *(+40 de bonus)* |

Badges accessibles dans la demi-journée : 🎓 **Le Guide** (avoir expliqué une notion à une autre
cordée, jugé clair par elle — la contradiction du col final en donne l'occasion), 💰 **Le Frugal**
(section 6 du carnet de route : même résultat qu'une autre cordée, avec moins de jetons consommés),
et 🏔️ **Le Sommet**, remis en clôture au meilleur score final.

### 0.6 Préparation matérielle — la veille

| Vérification | Commande / geste | Attendu |
|---|---|---|
| **Les 16 cartes-lots de M8.1 sont imprimées** | 1 jeu par cordée, découpé | 16 cartes, une par fonctionnalité, recto rempli depuis `00-carte-du-terrain.md` §2 |
| **Les 10 cartes-incidents de M8.1 sont imprimées** | **1 seul jeu, celui du formateur** | dos identique, jamais montrées avant la manche 1 |
| **Les jetons sont comptés** | 12 jetons par cordée | jetons physiques (jetons de poker, pastilles, réglettes) — **jamais un chiffre écrit** : la contrainte doit se voir sur la table |
| **Les planches de mise sont photocopiées** | 1 par cordée + 3 de rechange | gabarit §M8.1 *Matériel* |
| L'agent du col J2 de chaque cordée est retrouvable | `git log` du dépôt partagé, ou dossier `carnet/` | `CLAUDE.md`, skill, subagent, hook — c'est la **matière première** de M8.2 |
| La page de cycle de vie des modèles est ouverte dans un onglet | relever la date de retrait du modèle utilisé en séance | une date, et le nombre de jours qui l'en sépare |
| **Le magasin contient de vraies traces d'exécution** | `ls data/mails/` · `ls uploads/` · `git status --short` | des fichiers **écrits pendant les trois jours** — c'est la démonstration d'ouverture de M8.3 |
| Le contrat est imprimé | `docs/API-CONTRACT.md`, section *Types partagés* | un exemplaire papier — la ligne `authorId: string` sert deux fois cet après-midi |
| Les gabarits du col final sont photocopiés | `carnet/CARNET-DE-ROUTE.md` + fiche d'écoute du comité | 1 gabarit par cordée, **3 fiches d'écoute par cordée** |
| Le scoreboard est à jour | `CARNET-DE-BORD.md` | les colonnes J1, J2, J3 sont remplies avant 14:00 |

🔐 **Réservé formateur.** `grep -rn "BUG:" backend/src` localise les six défauts. Elle a été
révélée au débrief du col J1 et **n'est plus secrète** — c'est une donnée de conception de M8.1 :
l'enchère **ne porte pas** sur « où sont les bugs », que la salle connaît, mais sur **ce qu'on
finance pour le trimestre qui vient**. Un participant qui annonce « je sais où sont les bugs, je
mise là » a raison sur quatre lots et se fait prendre sur les six autres cartes-incidents. C'est
exactement le mécanisme du jeu.

---

## 1. Notion M8.1 — « L'enchère : où mettre l'effort de test ? »

|  |  |
|---|---|
| **Durée** | 40 min |
| **Modalité** | Jeu sérieux — **L'Enchère** |
| **Objectif d'apprentissage** | À l'issue, le·a participant·e est capable de **répartir un budget de test contraint sur un portefeuille de fonctionnalités**, de **justifier chaque allocation par un couple probabilité × impact** plutôt que par une préférence, et de **déclarer par écrit le risque qu'il choisit de ne pas couvrir** |
| **Niveau visé (Bloom)** | **Évaluer** |
| **Micro-évaluation** | Exercice court (5 min) — trois lots inédits à placer et à doter |
| **Ancrage fil rouge** | **Z1 → Z6, les seize fonctionnalités prises comme portefeuille de risque.** *Pourquoi ce terrain : parce qu'il est le seul du dispositif où l'information est **déjà acquise**. Depuis le col J1, chaque cordée connaît l'état des seize lignes ; depuis le débrief du col J1, elle connaît les six défauts ; depuis le col J3, elle connaît le coût réel de l'instabilité de Z5 et le résidu de Z4. L'enchère ne teste donc **aucune connaissance** : elle teste un **arbitrage sous contrainte**, sur un portefeuille dont tous les paramètres sont connus de tous. C'est la seule configuration où l'on peut prouver qu'une mauvaise décision ne vient pas d'un manque d'information.* Ce que la notion fait avancer : la **section 2 du carnet de route** — la carte des risques probabilité × impact — et sa **section 7**, les dettes ouvertes. |
| **Prérequis** | Le col J1 *(la matrice des seize fonctionnalités)*, M6.1 *(les cinq catégories d'échec)*, M7.1 à M7.4 *(le risque non fonctionnel : charge, sécurité, accessibilité)* |

### ▸ Pourquoi cette modalité

L'objectif est de **classer, prioriser et arbitrer selon des critères**, donc critère `B-2` de
`00-grille-modalites.md` : *« le critère ne s'apprend pas, il s'exerce sur des cas où il fait
mal. »* Une matrice probabilité × impact projetée est acceptée en trois minutes, recopiée, et
jamais utilisée : tout le monde est d'accord avec elle **tant qu'elle ne coûte rien**. Le
dispositif de **L'Enchère** — un budget physiquement insuffisant, une mise publique irréversible,
puis une révélation d'incidents — produit ce qu'aucun exposé ne produit : le moment où une cordée
constate qu'elle a financé la fonctionnalité qui la rassurait au lieu de celle qui la menaçait.
Le catalogue de `00-grille-modalites.md` §6 décrit l'Enchère en une ligne — *« budget limité à
répartir entre plusieurs tests possibles, on révèle les incidents »* — et la place à 15 minutes ;
elle en occupe ici 25, révélation et débrief compris, parce que le portefeuille compte seize lots
et non trois. La notion ouvre l'après-midi, donc elle est **active** (`R-7` ✓), et elle suit un
exercice de groupe le matin (`R-1` ✓).

### ▸ Ce qu'il faut avoir compris à la fin

- **Le budget de test est toujours plus petit que le besoin.** La question professionnelle n'est
  jamais *« qu'est-ce qu'on teste ? »* mais *« qu'est-ce qu'on accepte de ne pas tester, et
  pourquoi c'est un choix et pas un oubli ? »*
- **Deux axes, pas un.** La probabilité (risque technique : défaut connu, absence de test,
  fréquence de modification, complexité, nombre d'auteurs) **et** l'impact (risque métier : perte
  de données, non-conformité, blocage de la mise en ligne). Prioriser sur un seul axe produit
  systématiquement une mauvaise allocation.
- **Une mise sans oracle n'est pas une mise.** Financer une fonctionnalité sans savoir d'où
  viendra l'attendu, c'est financer un test tautologique — la leçon de M1.4, au niveau du budget.
- **Le risque résiduel n'est pas une faute : c'est une décision.** Même parfaitement joué, ce jeu
  laisse tomber des incidents. Ce qui se juge, ce n'est pas leur existence, c'est leur
  **déclaration écrite avant** la révélation.
- **La priorisation n'a de sens que si le risque est hétérogène.** Sur un produit dont toutes les
  fonctionnalités portent le même risque, la démarche n'apporte rien — c'est un prérequis vérifié,
  pas un postulat.

### ▸ Déroulé minuté

> Le protocole de **L'Enchère** est appliqué en cinq temps : ① la règle · ② la mise · ③ l'engagement
> public · ④ la révélation · ⑤ le nom et la parade. Les numéros sont rappelés en tête de ligne.

| Temps | Le formateur | Les participants |
|---|---|---|
| **0-4** *(4)* | **① LA RÈGLE.** Aucun cours, aucun critère de priorisation donné. Distribue à chaque cordée : les **16 cartes-lots**, une **planche de mise**, et **12 jetons physiques**. « Un jeton = une demi-journée d'effort de test sur le trimestre qui vient. Vous en avez douze. Maximum quatre sur un même lot. Toute mise de deux jetons ou plus doit porter, sur la planche, **une ligne d'oracle** : d'où viendra l'attendu. Sans elle, la mise comptera pour un. Dix minutes. » Ne répond à aucune question de méthode. | Prennent les cartes, les étalent, se répartissent Pilote / Copilote. La première question tombe toujours : *« on a le droit de tout mettre sur les six bugs ? »* — le formateur répond : *« vous avez le droit. »* |
| **4-14** *(10)* | **② LA MISE.** Circule, chronomètre affiché. **Ne valide rien, ne suggère rien.** Note mentalement les cordées qui n'ouvrent que quatre ou cinq lots. Relance unique à **6 min**, à la salle entière : *« combien de vos lignes d'oracle sont écrites ? »* — et rien d'autre. | Répartissent, discutent, se disputent sur deux ou trois lots. Écrivent leurs lignes d'oracle. Découvrent seuls que douze jetons ne couvrent pas seize lots. |
| **14-17** *(3)* | **③ L'ENGAGEMENT PUBLIC.** Fait annoncer à chaque cordée, à voix haute et dans cet ordre : ses **trois plus grosses mises**, puis son **risque résiduel assumé** — *« les lots que nous avons délibérément laissés à zéro, et pourquoi »*. Écrit tout au tableau. **Puis fait retourner les planches : plus aucune modification.** | Annoncent. Une cordée au moins n'a pas préparé son risque résiduel et l'improvise — c'est noté, sans commentaire. |
| **17-25** *(8)* | **④ LA RÉVÉLATION DES INCIDENTS.** Sort le jeu de 10 cartes-incidents et les révèle **en trois manches**, dans l'ordre fixe du §*Les dix cartes-incidents*. Pour chaque carte : lit l'incident à voix haute, annonce le **lot visé**, le **seuil de détection** et le **coût**. Fait décompter par les cordées elles-mêmes sur leur planche. Écrit les scores au tableau, manche par manche. Ne commente **aucun** résultat avant la fin de la manche 3. | Décomptent. Réagissent — la manche 2 produit toujours un silence. Constatent que la cordée qui a « tout mis sur les bugs connus » n'est pas en tête. |
| **25-29** *(4)* | **⑤ LE NOM.** « Vous venez de fabriquer une matrice, je ne fais que l'écrire. » Projette le diagramme et dévoile les quatre quadrants (voir notice). Fait replacer par la salle **trois lots déjà misés** dans le bon quadrant, à voix haute. Nomme les deux axes : **probabilité** (risque technique) et **impact** (risque métier). | Replacent trois lots. Recopient la matrice et les quatre profondeurs de test dans le carnet de cordée — elle servira dans quarante-cinq minutes, à la section 2 du carnet de route. |
| **29-32** *(3)* | **DÉBRIEF DU JEU + SCORE.** Donne le **score maximal théorique — 76 sur 100** — et laisse cinq secondes. « Personne ne pouvait faire mieux que 76. La question n'a jamais été d'éviter les incidents : elle a été de choisir lesquels vous acceptiez. » Annonce les 15 PR à la cordée au meilleur score, et le badge le cas échéant. | Comparent leur score à 76. Une cordée conteste un seuil — arbitré en 20 secondes avec la carte-incident. |
| **32-37** *(5)* | **MICRO-ÉVALUATION.** Distribue les trois lots inédits (voir §Micro-évaluation), chronomètre 4 min, corrige 1 min en croisé. | Placent, dotent, justifient en une ligne. Échangent leur feuille avec le voisin pour la correction. |
| **37-40** *(3)* | **SYNTHÈSE — la parole est aux participants.** « En une phrase, sans vos notes : qu'est-ce que vous direz à votre direction quand elle vous demandera pourquoi telle fonctionnalité n'est pas testée ? » Fait parler deux cordées, n'ajoute rien, enchaîne. | Formulent. Réponse attendue : *« elle n'est pas testée parce que nous avons décidé de financer un risque plus élevé — voici les deux axes, voici le chiffre, et voici ce que nous acceptons. »* |

**Contrôle : 4 + 10 + 3 + 8 + 4 + 3 + 5 + 3 = 40 min ✓**

### ▸ Contenu à transmettre

> **Attention.** Ce contenu **ne se projette pas avant la minute 25.** Le projeter avant vide
> l'enchère de son objet : les cordées appliqueraient une grille au lieu d'en découvrir le besoin.

**1. Les deux axes, et ce qui les alimente.** Le risque produit se cote sur deux dimensions
indépendantes — c'est la méthode **PRISMA** : *probabilité de défauts* (risque technique) et
*impact des défauts* (risque métier), croisées en une matrice à quatre quadrants.

| Axe | Ce qui l'alimente **sur ce dépôt** | Signal mesurable |
|---|---|---|
| **Probabilité** | Un défaut **déjà connu** et non couvert · l'**absence de test** · la fréquence de modification du fichier · le nombre d'auteurs · la dépendance à un tiers | `git log` (churn), la matrice du col J1, la colonne « TU/E2E » de `docs/stats.md` |
| **Impact** | Perte de données **silencieuse** · non-conformité contractuelle ou réglementaire · blocage de la mise en ligne · atteinte à une population d'utilisateurs | Le contrat `docs/API-CONTRACT.md`, le type partagé, la réglementation (M8.3) |

**2. Les quatre quadrants et la profondeur de test associée.**

| Quadrant | Probabilité × Impact | Profondeur de test | Lots du dépôt |
|---|---|---|---|
| **I** | forte × fort | Test **approfondi** : plusieurs niveaux, cas limites, oracle externe explicite | #7 · #16 · #9 · #8 |
| **II** | forte × modéré | Test **large et peu profond** : un cas nominal, un cas d'erreur, automatisé | #6 · #14 · #11 · #3 |
| **III** | faible × fort | Test **ciblé** : le chemin critique seulement, mais tenu dans le temps | #2 · #1 · #4 · #15 |
| **IV** | faible × modéré | Effort **minimal**, réévalué à chaque changement de code | #5 · #10 · #12 · #13 |

**3. Trois ordres de grandeur publiés, à citer avec leur périmètre.**

| Source | Chiffre | Ce qu'on en fait |
|---|---|---|
| Kamei et al., IEEE TSE 2013 — prédiction de défauts *just-in-time* | **68 %** d'exactitude, **64 %** de rappel ; et surtout : *« avec 20 % de l'effort qu'il faudrait pour inspecter tous les changements, on identifie 35 % des changements introduisant un défaut »* | Le rapport **20 % d'effort → 35 % du risque** est la justification chiffrée de toute priorisation |
| Nagappan & Ball, ICSE 2005 — *code churn* relatif sur Windows Server 2003 | **89,0 %** d'exactitude pour discriminer les binaires sujets aux défauts | Un simple `git log` suffit à une **première** priorisation, sans IA |
| Meta, *Predictive Test Selection* (2018-2019) | Coût d'infrastructure **divisé par deux**, en conservant **> 95 %** des échecs de test individuels et **> 99,9 %** des changements fautifs — *« un tiers des tests »* | Le compromis **assumé et chiffré** : on accepte de rater ~5 % des échecs individuels |

> ⚠️ **Piège de citation à éviter en séance** : « > 99,9 % des échecs » est **faux**. Le 99,9 %
> porte sur les **changements fautifs**, le 95 % sur les **échecs de test individuels**. La
> confusion est très répandue dans les articles de seconde main.

**4. Le prérequis que personne ne vérifie.** Felderer & Ramler l'établissent : le test basé sur
les risques suppose une **distribution non homogène du risque** dans le produit. Sur *Carnet de
voyage*, cette condition est remplie et **vérifiable** : trois défauts sur quatre fonctionnalités
en Z3, aucun en Z1. Sur un produit où le risque est uniforme, la démarche n'apporte rien — il faut
le vérifier avant de la vendre.

**5. La phrase à faire noter.**

> *Un plan de test qui ne dit pas ce qu'il renonce à couvrir n'est pas un plan : c'est une liste
> de souhaits. Le risque résiduel se **déclare**, il ne se **découvre** pas au comité.*

**6. Ce que le jeu prépare.** La section 2 du carnet de route (carte des risques, 40 PR) et sa
section 7 (dettes ouvertes). Une cordée qui présente au comité une carte des risques sans risque
résiduel déclaré perd les deux.

*(≈ 560 mots — plafond du gabarit : 700)*

### ▸ 🎴 Matériel de jeu complet

> **Un jeu de 16 cartes-lots, une planche et 12 jetons par cordée. Un seul jeu de 10
> cartes-incidents : celui du formateur.** Les jetons sont **physiques** — la contrainte doit se
> voir sur la table, pas se lire sur une feuille.

#### 1. Les 16 cartes-lots — recto

Chaque carte porte le numéro, le nom, la zone, l'état connu et la difficulté d'écriture d'un test.
Toutes ces informations sont **déjà connues** des cordées depuis le col J1 : la carte ne fait que
les rassembler pour que la table soit lisible.

| Lot | Fonctionnalité | Zone | État connu au J4 | Tests existants | Difficulté |
|---|---|---|---|---|---|
| **1** | Création de compte | Z1 | 🟢 étalon | TU | ⭐ |
| **2** | Login | Z1 | 🟢 étalon double | TU + E2E | ⭐ |
| **3** | Récupération de mot de passe | Z1 · Z4 | ⚪ terrain vierge | aucun | ⭐⭐ |
| **4** | Liste des journeys | Z2 · Z6 | 🟢/⚪ asymétrique | E2E seul | ⭐ |
| **5** | Détail d'une journey | Z2 | ⚪ terrain vierge | aucun | ⭐ |
| **6** | Création d'une journey | Z2 | 🔴 défaut #6 | TU **rouge légitime** | ⭐ |
| **7** | Modification d'une journey | Z2 | 🔴 défaut #7 + 🟡 test qui ment | TU **vert et faux** | ⭐⭐⭐ |
| **8** | Ajout d'une étape | Z3 | 🔴 défaut #8 | TU + E2E **rouges légitimes** | ⭐⭐ |
| **9** | Modification d'une étape | Z3 | 🔴 défaut #9, silencieux | aucun | ⭐⭐⭐ |
| **10** | Upload de photos sur une étape | Z3 · Z4 | ⚪ terrain vierge | aucun | ⭐⭐ |
| **11** | Recherche de lieu (géocodage) | Z5 | ⚪ + 🟡 E2E instable | E2E **flaky natif** | ⭐⭐⭐ |
| **12** | Notation d'une journey | Z2 | ⚪ terrain vierge | aucun | ⭐ |
| **13** | Commentaires sur une journey | Z2 | ⚪ terrain vierge | aucun | ⭐ |
| **14** | Commentaires sur une étape | Z3 | 🔴 défaut #14, silencieux | aucun | ⭐⭐ |
| **15** | Carte — visualisation | Z6 | ⚪ terrain vierge | aucun | ⭐⭐ |
| **16** | Carte — itinéraire | Z5 | 🔴 défaut #16, subtil | aucun | ⭐⭐⭐⭐ |

#### 2. La planche de mise — gabarit à photocopier

```
PLANCHE DE MISE — L'ENCHÈRE          Cordée : ..............   Budget : 12 jetons

| Lot | Jetons (0 à 4) | Ligne d'oracle — d'où viendra l'attendu ? (obligatoire dès 2 jetons) |
|-----|----------------|---------------------------------------------------------------------|
|  1  |                |                                                                     |
|  …  |                |                                                                     |
| 16  |                |                                                                     |
                                                     TOTAL MISÉ : ......  / 12

RISQUE RÉSIDUEL ASSUMÉ — à remplir AVANT la révélation, sinon il ne compte pas.
Les lots que nous laissons délibérément à zéro, et la raison :
1. Lot n° ....  parce que ...........................................................
2. Lot n° ....  parce que ...........................................................
3. Lot n° ....  parce que ...........................................................
```

#### 3. Les règles de mise — projetées pendant les dix minutes

1. **12 jetons**, pas un de plus. Un jeton non misé ne rapporte rien : il n'y a pas d'épargne.
2. **4 jetons maximum** sur un même lot. Aucun lot n'absorbe le budget.
3. **Toute mise ≥ 2 jetons porte une ligne d'oracle.** Sans elle, la mise est ramenée à 1 jeton au
   dépouillement. *(C'est la règle qui fait le pont avec M1.4 : financer sans oracle, c'est
   financer un test tautologique.)*
4. **Le risque résiduel se déclare avant.** Trois lots minimum, avec leur raison. Une déclaration
   écrite avant la révélation vaut **+5 points de confiance** ; une déclaration improvisée après
   ne vaut rien.
5. **Une fois la planche retournée, plus rien ne change.** L'engagement public est irréversible.

#### 4. Les dix cartes-incidents — 🔐 réservées au formateur

> **Barème de jeu, pas mesure du monde.** Les coûts ci-dessous sont une **convention** calibrée
> pour que le total fasse exactement 100 et que le budget de 12 jetons soit insuffisant. Ils ne
> prétendent chiffrer aucune réalité économique. Le dire à la salle au moment du décompte.

Chaque cordée part de **100 points de confiance**. Chaque incident **non détecté** retire son coût.

**Manche 1 — « ce que vous saviez déjà »** *(les défauts connus depuis le col J1)*

| # | Incident — à lire à voix haute | Lot visé | Seuil de détection | Coût |
|---|---|---|---|---|
| **I1** | *« Un utilisateur renomme son voyage “Islande 2026”. Ses douze étapes disparaissent. Aucune erreur, aucun log, aucun test rouge. Il s'en aperçoit trois semaines plus tard. »* | **#7** | **3 jetons** **et** ligne d'oracle mentionnant le **contrat** (« les steps ne doivent PAS être perdus ») | **20** |
| **I2** | *« L'itinéraire affiché entre deux étapes islandaises traverse l'Atlantique. L'API a répondu 200 avec une polyline parfaitement valide. »* | **#16** | **3 jetons** **et** ligne d'oracle mentionnant la **documentation d'OSRM** (ordre `lng,lat`) | **20** |
| **I3** | *« Une étape modifiée conserve son ancienne date de fin. La réponse est 200. Personne ne le voit. »* | **#9** | **2 jetons** **et** ligne d'oracle mentionnant le **contrat** (relire la réponse, pas le statut) | **12** |
| **I4** | *« Une demande de suppression de compte arrive. Impossible de savoir qui a écrit quel commentaire d'étape : le champ auteur est vide. »* | **#14** | **2 jetons** **et** ligne d'oracle mentionnant le **type partagé** (`Step.comments[].authorId: string`) | **10** |

**Manche 2 — « ce que vous croyiez couvert »** *(le monde extérieur et le magasin)*

| # | Incident | Lot visé | Seuil de détection | Coût |
|---|---|---|---|---|
| **I5** | *« Nominatim est indisponible pendant la fenêtre de mise en ligne. La chaîne est bloquée trois heures. La fonctionnalité, elle, n'a aucun défaut. »* | **#11** | **2 jetons** **et** ligne d'oracle mentionnant un **double** (pas un `retry`) | **10** |
| **I6** | *« L'exécution du soir échoue. Cause : un fichier `.md` résiduel laissé par une autre suite dans le magasin. »* | **#3** **ou** **#10** | **1 jeton** **et** ligne d'oracle mentionnant l'**isolation** du magasin | **6** |
| **I7** | *« Un client qui navigue au clavier ne peut pas sélectionner de destination sur la carte. Réclamation formelle. »* | **#15** | **2 jetons** | **6** |

**Manche 3 — « ce que personne n'avait mis sur la table »** *(les défauts anciens qui reviennent)*

| # | Incident | Lot visé | Seuil de détection | Coût |
|---|---|---|---|---|
| **I8** | *« Après une reprise du service, les étapes s'affichent de nouveau dans l'ordre inverse de leur ajout. »* | **#8** | **2 jetons** | **8** |
| **I9** | *« Le support reçoit quarante tickets : on peut créer des voyages qui finissent avant de commencer. »* | **#6** | **1 jeton** | **8** |
| **I10** | ⚪ **CARTE BLANCHE.** *« Rien ne se passe sur Login. La fonctionnalité tient. »* | **#2** | — | **0** |

**Contrôle du barème : 20 + 20 + 12 + 10 + 10 + 6 + 6 + 8 + 8 + 0 = 100 ✓**
**Somme des seuils : 3 + 3 + 2 + 2 + 2 + 1 + 2 + 2 + 1 = 18 jetons pour un budget de 12.** ✓
*C'est cet écart de six jetons qui fait le jeu.*

#### 5. 🔐 Le corrigé de l'enchère — l'allocation optimale

Le formateur la calcule à l'avance et la garde pour la minute 29. Elle se lit en **ratio
coût évité par jeton** :

| Incident | Jetons | Coût évité | Ratio |
|---|---|---|---|
| I9 (#6) | 1 | 8 | **8,0** |
| I1 (#7) | 3 | 20 | **6,7** |
| I2 (#16) | 3 | 20 | **6,7** |
| I3 (#9) | 2 | 12 | **6,0** |
| I6 (magasin) | 1 | 6 | **6,0** |
| I4 (#14) | 2 | 10 | **5,0** |
| I5 (#11) | 2 | 10 | **5,0** |
| I8 (#8) | 2 | 8 | 4,0 |
| I7 (#15) | 2 | 6 | 3,0 |

**Allocation optimale** : I9 (1) + I1 (3) + I2 (3) + I3 (2) + I6 (1) + I4 **ou** I5 (2) = **12
jetons**, **76 points de coût évité**.

> **Score maximal théorique : 100 − 24 = 76.** Il est **impossible** de faire mieux, et c'est le
> cœur pédagogique du jeu. Le formateur l'annonce à la minute 29, après le décompte, jamais avant.
> Deux allocations distinctes atteignent 76 : c'est le second enseignement — **il n'y a pas une
> bonne réponse, il y a une frontière d'efficacité.**

À dire mot pour mot : *« la cordée qui a fait 61 n'a pas mal joué. La cordée qui a fait 76 n'a pas
été maligne : elle a coté deux axes au lieu d'un. Et aucune des deux n'a évité les 24 points de
perte, parce que personne ne le pouvait. Ces 24 points, dans une heure, s'appellent “dettes
ouvertes” dans votre carnet de route. »*

### ▸ 🖼️ Diagramme — `diagrammes/M8-1-la-matrice-du-risque.svg`

#### Source Mermaid

```mermaid
flowchart TB
  T["Ou mettre l'effort de test ?<br/>Deux axes, jamais un seul"]
  T --> Q1["QUADRANT I — probabilite FORTE x impact FORT<br/>TEST APPROFONDI<br/>plusieurs niveaux, cas limites, oracle externe explicite<br/>lots 7 · 16 · 9 · 8"]
  T --> Q3["QUADRANT III — probabilite FAIBLE x impact FORT<br/>TEST CIBLE<br/>le chemin critique seul, tenu dans la duree<br/>lots 2 · 1 · 4 · 15"]
  T --> Q2["QUADRANT II — probabilite FORTE x impact MODERE<br/>TEST LARGE ET PEU PROFOND<br/>un cas nominal, un cas d'erreur, automatise<br/>lots 6 · 14 · 11 · 3"]
  T --> Q4["QUADRANT IV — probabilite FAIBLE x impact MODERE<br/>EFFORT MINIMAL<br/>reevalue a chaque changement de code<br/>lots 5 · 10 · 12 · 13"]
  P["PROBABILITE — risque technique<br/>defaut connu · absence de test · churn<br/>nombre d'auteurs · dependance a un tiers"] -.-> T
  I["IMPACT — risque metier<br/>perte de donnees silencieuse · non-conformite<br/>blocage de mise en ligne · population touchee"] -.-> T
  Q1 --> R["RISQUE RESIDUEL DECLARE<br/>ce qu'on renonce a couvrir, et pourquoi<br/>section 7 du carnet de route"]
  Q4 --> R
  classDef q1 fill:#f8d7da,stroke:#c0392b,color:#7b1c1c;
  classDef q2 fill:#fff3cd,stroke:#b8860b,color:#6b4e00;
  classDef q3 fill:#d6e4ff,stroke:#2b4c8c,color:#12244a;
  classDef q4 fill:#d4edda,stroke:#2e7d32,color:#1b5e20;
  classDef axe fill:#eeeeee,stroke:#777777,color:#333333;
  classDef res fill:#f3d9f7,stroke:#7b3f8c,color:#3d1f45;
  class Q1 q1;
  class Q2 q2;
  class Q3 q3;
  class Q4 q4;
  class P,I,T axe;
  class R res;
```

#### Descriptif du SVG à produire

Format paysage 1600 × 900, imprimable en A4 paysage et affichable au mur pendant le col final.
**Une véritable matrice 2 × 2**, pas un arbre : axe horizontal **Impact** (modéré → fort, flèche
vers la droite), axe vertical **Probabilité** (faible en bas → forte en haut, flèche vers le haut).
Les quatre cases sont de surface égale et portent chacune, sur trois lignes : le **numéro romain du
quadrant**, la **profondeur de test** en capitales, et les **numéros de lots** en pastilles rondes
de la couleur du quadrant — rouge pâle en haut à droite (I), jaune pâle en haut à gauche (II),
bleu pâle en bas à droite (III), vert pâle en bas à gauche (IV). Sous chaque axe, en petits
caractères, la liste de ce qui l'alimente. En bas à droite, **hors matrice**, un encadré violet à
bord pointillé : **« Risque résiduel déclaré — ce qu'on renonce à couvrir, et pourquoi »**, relié
aux quadrants I et IV par deux flèches pointillées — c'est le message qu'on veut voir survivre à la
séance. Aucune icône décorative. La mention *« méthode PRISMA, van Veenendaal — quatre quadrants »*
en petit sous la matrice.

#### Explication du diagramme — notice de dévoilement

| Ordre | Ce qu'on affiche | La phrase à dire | Ce qu'on attend en retour |
|---|---|---|---|
| 1 | **Les deux axes seuls, cases vides** | « Vous venez de jouer pendant vingt-cinq minutes. Vous avez utilisé deux critères sans les nommer. Les voilà. » | Quelqu'un dit « on n'a regardé que celui du bas » — c'est le moment recherché. |
| 2 | **Le quadrant I seul** | « Défaut connu, non couvert, perte de données silencieuse. Quatre lots. Test approfondi : plusieurs niveaux, cas limites, et un oracle **écrit hors du dépôt**. » | Les cordées retrouvent leurs plus grosses mises. |
| 3 | **Les quadrants II et III** | « Regardez la différence entre ces deux-là. Même effort total, deux formes opposées : large et peu profond à gauche, étroit et durable à droite. Ce n'est pas la même compétence. » | Ne pas laisser croire que III « mérite moins » que II : ils ne traitent pas le même risque. |
| 4 | **Le quadrant IV** | « Et voilà les lots que personne n'a financés. Ils sont là parce qu'ils doivent y être, pas parce qu'on les a oubliés. » | Silence. C'est le retournement du jeu. |
| 5 | **L'encadré violet** | « Cette case-là n'est pas dans la matrice. Elle est à côté, et c'est la seule que votre direction lira vraiment. » | Fin du dévoilement — enchaîner immédiatement sur le débrief et le score de 76. |

⚠️ **Erreur d'interprétation à prévenir.** La matrice sera lue comme un **classement de valeur** :
« le quadrant I est important, le IV ne l'est pas ». Le couper à l'étape 4 : *« le quadrant IV
n'est pas la poubelle : c'est la zone qu'on réévalue à chaque changement de code. Le lot 5 y est
aujourd'hui ; il en sort le jour où quelqu'un touche à `journeys.service.ts`. Une matrice de risque
est une **photographie**, pas un jugement. »* Sans cette phrase, les participants repartent avec un
outil qu'ils n'oseront jamais réviser.

### ▸ 🔍 Démonstration — la cotation d'un seul lot, en direct

**Point de départ.** L'arbitrage est terminé, la matrice est au tableau, et une cordée conteste :
*« le lot 16 (l'itinéraire), on n'a jamais eu de réclamation dessus. Pourquoi il serait en
quadrant I ? »* On ne discute pas : on cote, à voix haute, en deux colonnes.

**Le geste exact** — deux minutes, au tableau, avec la salle.

```
LOT 16 — Carte : itinéraire entre destinations           Zone Z5

PROBABILITÉ (risque technique)                    IMPACT (risque métier)
[x] défaut connu, marqué dans le code             [x] fonctionnalité vitrine du produit
[x] aucun test, ni TU ni E2E                      [x] l'erreur est INVISIBLE côté système
[x] dépendance à un tiers hors de notre contrôle  [ ] perte de données
[x] l'oracle est hors du dépôt (doc OSRM)         [x] atteinte à la crédibilité produit
    → PROBABILITÉ FORTE                               → IMPACT FORT
```

**Le résultat obtenu.** Quadrant **I**, quatre cases cochées sur chaque axe. Et surtout :

```
Ce que le système signale aujourd'hui :  HTTP 200 + polyline valide
Ce que l'utilisateur voit :              un tracé qui traverse l'océan
Ce qu'un test unitaire attrape :          rien — sauf s'il assertit l'URL construite
```

**Ce que l'exemple révèle.** L'objection de la cordée était bonne : *il n'y a jamais eu de
réclamation.* Et c'est exactement ce qui rend le lot dangereux — **l'absence de signal n'est pas
l'absence de risque**. Le défaut #16 est le seul du dépôt qui ne produise **aucun** symptôme
technique : pas d'exception, pas de code d'erreur, pas de test rouge, et une réponse bien formée.
La cotation de la probabilité ne se fait donc **jamais** sur l'historique des incidents constatés
— sinon on ne finance que ce qui a déjà fait mal. Elle se fait sur des signaux **structurels** :
défaut connu, absence de test, dépendance externe, oracle hors du dépôt. C'est le rappel direct de
M7.1, quatre heures plus tôt, et le pont vers la section 2 du carnet de route.

**Ce qui peut rater, et le repli associé.**

| Risque | Signe | Repli |
|---|---|---|
| La salle cote sur l'historique des incidents | « on n'a jamais eu de problème là-dessus » | C'est **l'objection attendue** — la traiter comme ci-dessus, elle fait la démonstration |
| Le débat déborde sur un second lot | Deux mains levées à la fin | *« une seule cotation en direct, les autres sont dans votre carnet de route »* — couper net |
| Personne ne conteste | Silence après la matrice | Le formateur conteste lui-même : *« moi je vous dis que le 16 est en quadrant IV. Qui n'est pas d'accord ? »* |

### ▸ ✅ Micro-évaluation — Exercice court (5 min)

**Énoncé** *(trois lignes, une feuille par personne)*

> Trois lots inédits, décrits en une phrase. Pour chacun : **le quadrant** (I à IV), **le nombre de
> jetons** que vous y mettriez sur un budget de 12, et **une seule ligne** d'oracle.
> Correction croisée avec votre voisin.

| Lot | Description |
|---|---|
| **X** | Une **suppression en cascade** est ajoutée : supprimer un voyage supprime ses étapes et leurs photos sur le disque. Aucun test. Le contrat ne dit rien de ce cas. |
| **Y** | Le champ `rating` de la notation d'une journey passe d'un entier à un décimal. Fonctionnalité #12, aucun test, aucun défaut connu. |
| **Z** | Le proxy de géocodage est mis en cache : une même recherche ne repart plus vers Nominatim pendant une heure. Fonctionnalité #11. |

**Résultat attendu vérifiable** *(cases à cocher, contrôle en moins de 60 secondes)*

- [ ] **Lot X → Quadrant I**, 3 à 4 jetons. Probabilité forte (code neuf, aucun test, effet de bord
      physique sur `/uploads/` et sur le magasin) **et** impact fort (**perte de données
      irréversible**). Oracle recevable : *« aucun — le contrat est muet : la première tâche est
      d'obtenir une décision métier écrite »*. **C'est la seule bonne réponse d'oracle**, et elle
      renvoie à M2.3 : un silence du contrat n'est pas un oracle.
- [ ] **Lot Y → Quadrant IV** *(ou II)*, 1 jeton. Probabilité modérée (changement de type sur une
      fonctionnalité simple), impact faible. Oracle : *« le type partagé et les bornes du contrat »*.
      **Accepté aussi : quadrant II**, si la justification porte sur le changement de type comme
      facteur de probabilité.
- [ ] **Lot Z → Quadrant II**, 2 jetons. Probabilité forte (le cache introduit un **état**, donc de
      la dépendance à l'ordre et à l'horloge), impact modéré. Oracle : *« la documentation de
      Nominatim **et** une horloge contrôlée dans le test »*.

**Solution de référence** — X : I, 3-4 jetons, oracle à obtenir. Y : IV, 1 jeton. Z : II, 2 jetons.

**L'erreur que 80 % des groupes commettent.** Ils classent **Z en quadrant IV** — « c'est juste du
cache, c'est une optimisation ». Le distinguo à faire dire par la salle : **un cache est un état
partagé**, et un état partagé est exactement ce qui a fait échouer leur suite au col J3 (catégorie
📁). La probabilité d'un défaut lié à l'ordre d'exécution ou à l'expiration n'est pas modérée :
elle est forte, et le défaut sera **intermittent** — donc coûteux à diagnostiquer. Le faire
constater, puis conclure : **une optimisation qui introduit un état déplace un lot d'un quadrant,
toujours vers le haut.**

### ▸ 🔗 Ressources

| Ressource | À qui elle s'adresse | Ce qu'il faut y lire précisément |
|---|---|---|
| *Practical Risk-Based Testing — PRISMA® v1.5* (Erik van Veenendaal) — https://www.erikvanveenendaal.nl/site/wp-content/uploads/PRISMA-white-paper-v1.5.pdf | **La référence de la notion** | Les **deux axes** (probabilité de défauts / impact des défauts) et la **matrice à quatre quadrants**, chacun avec sa profondeur de test. Le retour d'expérience : **+10 %** de *Defect Detection Percentage* après introduction. |
| *A taxonomy of risk-based testing* (Felderer & Schieferdecker) — https://link.springer.com/article/10.1007/s10009-014-0332-3 | Celui qui doit défendre la démarche | La définition académique en trois classes : *risk drivers*, *risk assessment*, *risk-based test process* — plus rigoureuse que les définitions d'éditeurs. |
| *Integrating risk-based testing in industrial test processes* (Felderer & Ramler) — https://link.springer.com/article/10.1007/s11219-013-9226-y | Celui qui veut l'introduire chez lui | **Le prérequis** : une distribution **non homogène** du risque. Sans hétérogénéité, la priorisation n'apporte rien — à vérifier avant de vendre. |
| *A Large-Scale Empirical Study of Just-in-Time Quality Assurance* (Kamei et al., IEEE TSE 2013) — https://posl.ait.kyushu-u.ac.jp/~kamei/publications/Kamei_TSE2013.pdf | Celui qui doit chiffrer | Le ratio à retenir : **20 % de l'effort → 35 % des changements introduisant un défaut**. Et les limites : 68 % d'exactitude, 64 % de rappel. |
| *Predictive test selection: a more efficient way…* (Meta Engineering) — https://engineering.fb.com/2018/11/21/developer-tools/predictive-test-selection/ · papier : https://arxiv.org/abs/1810.05286 | Celui qui présente à sa direction | La formulation vendable — *« un tiers des tests, plus de 99,9 % des régressions »* — **et** la distinction à ne pas rater entre 95 % (échecs individuels) et 99,9 % (changements fautifs). |
| *CTAL-TM v3.0 — Risk-based Testing* (ISTQB) — https://istqb.org/certifications/certified-tester-advanced-level-test-management-ctal-tm-v3-0/ | **La référence normative** | La section entière consacrée au test basé sur les risques : identification, évaluation, techniques, **métriques de succès**. C'est le vocabulaire opposable en interne. |

### ▸ ⚠️ Pièges d'animation

- **Ce qui rate habituellement** : le jeu déborde sur la mise. Une cordée passe dix minutes à
  débattre du lot 7 et n'a rien misé sur douze lots. Contre-mesure annoncée **avant** le départ :
  *« posez un jeton, avancez, vous reviendrez »*, et relance obligatoire à 6 minutes portant
  uniquement sur les lignes d'oracle.
- **La question qui revient toujours** : *« pourquoi on ne mise pas simplement sur les six bugs
  qu'on connaît ? »* Réponse courte, à donner **sans rien révéler** : *« vous en avez le droit.
  Notez juste que le comité de demain ne vous demandera pas où étaient les bugs d'hier. »* La
  manche 2 fait le reste.
- **Le piège vise la méthode, jamais la personne.** Aucune cordée n'est nommée pour son score. La
  phrase obligatoire, à la minute 29 : *« personne dans cette salle ne pouvait dépasser 76, et
  moi non plus. Ce jeu n'est pas gagnable — comme un plan de test. »*
- **Le débat qui déraille** : la contestation d'un seuil de détection. Chronomètre explicite —
  **20 secondes, carte-incident en main, le formateur tranche.** Les seuils sont une convention de
  jeu, ils ne se négocient pas.
- **Le signe qu'il faut passer à la suite** : dès qu'une cordée justifie spontanément une mise en
  employant les deux mots *« probabilité »* et *« impact »* dans la même phrase, le critère est
  acquis. Clore le jeu même s'il reste des lots à commenter — ils figurent dans la grille écrite.

---

## 2. Notion M8.2 — « Gouverner un agent dans la durée : dérive et évaluations »

|  |  |
|---|---|
| **Durée** | 40 min *(le protocole de débrief de référence, en 45 à 60 min, figure au §Protocole de débrief ; la version de séance en est la forme resserrée — voir la note de dimensionnement)* |
| **Modalité** | **Pédagogie inversée** — fait d'entrée mesuré en direct, recherche documentaire encadrée en trois lots, restitution contradictoire, construction du livrable |
| **Objectif d'apprentissage** | À l'issue, le·a participant·e est capable de **concevoir un jeu d'évaluations de non-régression pour un agent de test** — cas de référence, scoreur, seuil, déclencheur, propriétaire — et de **nommer ce qui, dans la chaîne, changera sans qu'il le décide** |
| **Niveau visé (Bloom)** | **Créer** |
| **Micro-évaluation** | Restitution notée sur grille de recevabilité (5 critères) — **20 PR** |
| **Ancrage fil rouge** | **L'agent construit au col J2**, tel qu'il existe dans le dépôt de chaque cordée : `CLAUDE.md`, une skill, un subagent, au moins un hook. Ses **cas de référence** sont les **six défauts connus** du dépôt et la zone **Z1** 🟢, seul terrain dont on sait qu'il doit rester vert. *Pourquoi ce terrain : parce que l'agent est **déjà écrit**, par eux, hier soir, et qu'il tourne. La question « comment savez-vous qu'il fait encore la même chose dans six mois ? » n'est donc pas une hypothèse d'école : elle porte sur un artefact qu'ils ont dans les mains et qu'ils comptent bien emporter lundi. Et le dépôt fournit l'oracle idéal d'un jeu d'évaluations : **six défauts dont on connaît la réponse attendue** — l'agent doit les faire tomber — et **un ensemble de tests verts et justes** qu'il ne doit jamais casser.* Ce que la notion fait avancer : la **section 4 du carnet de route** (ce que l'IA a fait, ce que l'humain a validé) et la **réponse à la deuxième question du comité**. |
| **Prérequis** | Le col J2 *(l'agent existe)*, M5.4 *(l'agent qui triche)*, M6.3 *(l'agent en CI)*, M1.4 *(l'oracle)* |

### ▸ Pourquoi cette modalité

L'objectif est de **se repérer dans un écosystème mouvant**, donc critère `D-1` de
`00-grille-modalites.md` : *« le contenu périme en 6 mois. Ce qui reste, c'est la méthode de
recherche et les critères. »* C'est ici que le critère est le plus littéralement vrai : les noms
d'outils d'évaluation cités dans ce document auront changé, les dates de retrait des modèles seront
dépassées, et l'un des frameworks les plus cités est **déjà passé en mode maintenance**. Un exposé
produirait exactement ce qu'on veut éviter — un participant qui repart avec une liste de produits
et aucune méthode. Ce qui ne périme pas : la **question** (*qu'est-ce qui va changer sans que je le
décide ?*), la **structure** d'un jeu d'évals (données, tâche, scoreur, seuil, déclencheur,
propriétaire) et la **règle d'hygiène** sur le juge. La pédagogie inversée coûte **plus** cher en
animation qu'un descendant — `00-grille-modalites.md` §7 l'écrit : *« le débrief structuré de 45 à
60 minutes est la partie qui fait apprendre, et il se prépare. »* La notion suit un jeu (`R-1` ✓)
et constitue la pédagogie inversée du J4 (`R-2` ✓).

> **Note de dimensionnement, à lire par le formateur avant la séance.** La grille prescrit un
> débrief de 45 à 60 min pour une `INV`. La séance n'en offre pas autant : la notion tient en
> 40 minutes, dont **14 de restitution et d'arbitrage**. Le protocole complet est donc écrit
> intégralement au §Protocole de débrief, dans sa version 45-60 min, et la version de séance en est
> une **forme resserrée assumée** — on coupe la phase de contre-instruction croisée et la phase de
> rédaction complète du fichier d'évals. Ce que l'on ne coupe **jamais** : la restitution
> contradictoire, la construction des cinq colonnes du jeu d'évals, et la question de propriété.
> En intra sur une journée dédiée, c'est la version longue qui s'applique.

### ▸ Ce qu'il faut avoir compris à la fin

- **Un modèle change de comportement à nom constant.** Ce n'est pas une intuition : c'est mesuré.
  Un agent non évalué n'est pas stable, il est **non surveillé**.
- **Figer la version du modèle n'est pas une stratégie, c'est un report** : les modèles sont
  retirés, avec préavis, et l'appel finit par échouer. La seule protection durable est un **jeu
  d'évaluations exécutable**.
- **Une éval est un test**, avec une différence : son résultat est un **score sur un échantillon**,
  donc une grandeur statistique. Comparer deux scores sans intervalle de confiance ne veut rien
  dire.
- **Le meilleur scoreur est du code**, pas un juge. Hiérarchie : code > modèle juge > humain. Et
  s'il faut un juge : **jamais le modèle sous test**, et toujours en permutant l'ordre.
- **Un jeu d'évals sans propriétaire ni déclencheur est un fichier mort.** Les cinq colonnes qui
  comptent : **cas · attendu · scoreur · seuil · déclencheur** — et une sixième, hors tableau :
  **qui**.

### ▸ Déroulé minuté

| Temps | Le formateur | Les participants |
|---|---|---|
| **0-5** *(5)* | **OUVERTURE PAR LE FAIT, PAS PAR LE COURS.** Aucune introduction. Projette la page de cycle de vie des modèles relevée la veille, et pose **une seule question** : « le modèle que votre agent appelle — celui d'hier soir — il est retiré dans combien de jours ? Cherchez. Vous avez deux minutes. » Puis écrit les réponses au tableau. Deuxième question, sans transition : « et si demain il répond autre chose sur exactement le même prompt, qu'est-ce qui vous prévient ? » | Cherchent la date, la trouvent, la disent. Silence sur la seconde question. C'est l'énoncé du problème — il ne faut **pas** le combler. |
| **5-8** *(3)* | **LE PROBLÈME, LE CADRE, LES LOTS.** Lit la mise en situation à voix haute (§Le problème). « Je ne vais rien vous apprendre pendant les vingt prochaines minutes. Je vais vous donner un problème, un cadre et des sources. » Attribue un **lot** par cordée (§Les trois lots), rappelle les **trois règles de recevabilité** — source datée, méthodologie ou mention *revendication*, lien réellement ouvert — et annonce le format : **3 minutes, 3 paragraphes**. | Prennent leur lot, se répartissent les sources, lancent le chronomètre. Sortent l'agent du col J2 sur l'écran : c'est l'objet de l'exercice. |
| **8-20** *(12)* | **LA RECHERCHE.** Chronomètre affiché en grand. Circule sans intervenir sur le fond. **Deux relances programmées**, à la salle entière : à **8 min** — *« combien de vos affirmations portent une date ? »* ; à **14 min** — *« lequel de vos éléments s'applique à un agent qui écrit des tests, et pas à un chatbot ? »*. Ne valide aucune trouvaille. | Cherchent, lisent, notent. Remplissent la fiche de lot : deux faits datés avec leur périmètre, une limite reconnue par la source elle-même, une conséquence pour l'agent du col J2. |
| **20-29** *(9)* | **LA RESTITUTION CONTRADICTOIRE.** Chaque cordée passe **3 minutes**. À la fin de chaque passage, une seule question, toujours de la même famille : *« et sur notre agent, ça donne quoi, concrètement ? »*. Note sur la grille de recevabilité (5 critères). | Restituent. Écoutent les autres lots. Découvrent que les trois lots répondent à trois questions différentes : *qu'est-ce qui bouge*, *comment on le mesure*, *à quelle condition la mesure est fiable*. |
| **29-34** *(5)* | **L'ARBITRAGE — la construction du jeu d'évals.** Construit **au tableau, avec la salle**, le tableau à cinq colonnes (§Le jeu d'évaluations de référence) sur **trois lignes seulement** : un cas positif (défaut #7), un cas négatif (l'agent ne modifie pas une assertion), un cas de garde (Z1 reste verte). Puis pose **la question qui structure la notion** et laisse le silence s'installer : *« qui maintient ces tests dans six mois quand le modèle aura changé de version ? »* | Fournissent les colonnes. Constatent que la case « propriétaire » est la seule que personne ne sait remplir. Recopient les trois lignes dans le carnet de cordée. |
| **34-37** *(3)* | **MICRO-ÉVALUATION.** Complète la notation de restitution sur la grille de recevabilité et l'annonce cordée par cordée, en 30 secondes chacune, **en nommant le critère manquant** quand il y en a un. | Entendent leur note et le critère manquant. |
| **37-40** *(3)* | **SYNTHÈSE — la parole est aux participants.** « En une phrase : que répondrez-vous demain, au comité, à la question *qui maintient ces tests dans six mois ?* » Fait parler deux cordées, n'ajoute rien, enchaîne sur la pause. | Formulent. Réponse attendue : *« une personne nommée, avec un jeu d'évals versionné dans le dépôt, un déclencheur écrit et un seuil — pas “l'équipe”. »* |

**Contrôle : 5 + 3 + 12 + 9 + 5 + 3 + 3 = 40 min ✓**

### ▸ 🎯 Le problème — à lire à voix haute, sans commentaire

> *« Nous sommes en janvier. Vous avez livré l'éclaireur du col J2 il y a six mois : il lit une
> exigence, écrit les tests, les exécute, classe les échecs et rend un rapport. L'équipe s'en sert
> tous les jours. Vous, vous avez changé de projet.*
>
> *Trois choses ont bougé depuis, et aucune n'était votre décision.*
>
> *La version du modèle a changé — l'ancienne a été retirée, avec un préavis que personne n'a lu.
> Un collègue a « amélioré » le prompt de la skill en septembre. Et le dépôt a doublé de taille.*
>
> *Ce matin, quelqu'un vous appelle : « votre agent ne trouve plus rien. » Ou pire — et c'est le
> vrai sujet : personne ne vous appelle, parce que **personne ne sait qu'il ne trouve plus rien**.*
>
> *Vingt minutes. Je ne veux pas votre avis sur la dérive des modèles. Je veux **l'artefact** qui
> aurait fait sonner l'alarme : un jeu d'évaluations de non-régression pour cet agent, avec ses
> cas de référence, son scoreur, son seuil, son déclencheur — et le nom de la personne qui le
> maintient. »*

### ▸ 📚 Les trois lots de recherche — une feuille par cordée

> **Règles de recevabilité, annoncées avant le départ.** Un fait sans **date** ne compte pas. Un
> chiffre sans **périmètre mesuré** compte comme *revendication* et se présente comme tel. Un lien
> qu'on n'a pas ouvert ne se cite pas. En cordée de deux, on se répartit les sources ; en
> configuration solo, on traite **deux** sources sur trois et on le dit.

| Lot | Question à instruire | Sources d'amorçage vérifiées |
|---|---|---|
| **Lot A — Qu'est-ce qui bouge, et à quelle vitesse ?** | *Un modèle change-t-il de comportement sans changer de nom, et que se passe-t-il quand il disparaît ?* | La mesure fondatrice de la dérive de comportement : https://arxiv.org/abs/2307.09009 · le vocabulaire rigoureux et la trame détecter/comprendre/adapter : https://arxiv.org/abs/2004.05785 · le cycle de vie réel d'un modèle chez son éditeur : https://platform.claude.com/docs/en/about-claude/model-deprecations · et la politique chiffrée d'un autre fournisseur, avec son piège de vocabulaire : https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements |
| **Lot B — Comment on mesure une sortie non déterministe ?** | *À quoi ressemble une suite d'évaluations, et en quoi diffère-t-elle d'une suite de tests ?* | La méthode de l'éditeur, avec son critère chiffré et sa hiérarchie de notation : https://platform.claude.com/docs/en/test-and-evaluate/develop-tests · le catalogue d'assertions branchable en CI : https://www.promptfoo.dev/docs/configuration/expected-outputs/ · l'architecture en trois briques et l'outil capable d'évaluer un agent de code réel : https://inspect.aisi.org.uk/ · le cycle offline / online complet : https://www.braintrust.dev/docs/evaluate |
| **Lot C — À quelle condition la mesure est-elle fiable ?** | *Peut-on faire noter une sortie de modèle par un modèle, et qu'est-ce qui invalide le résultat ?* | Les trois biais nommés et le niveau d'accord réel avec l'humain : https://arxiv.org/abs/2306.05685 · la démonstration du biais de position et son correctif : https://arxiv.org/abs/2305.17926 · le lien causal entre auto-reconnaissance et auto-préférence : https://arxiv.org/abs/2404.13076 · et pourquoi comparer deux scores exige des barres d'erreur : https://arxiv.org/abs/2411.00640 |

**Ce que chaque cordée rend, en trois paragraphes maximum :**

1. **Deux faits datés**, chacun avec son **périmètre** en une ligne (*« mesuré sur quoi, quand,
   dans quelles conditions »*).
2. **Une limite reconnue par la source elle-même** — chaque lot en contient au moins une, et c'est
   ce qui sépare une lecture d'une lecture attentive.
3. **Une conséquence pour notre agent**, commençant obligatoirement par : *« sur l'éclaireur du
   col J2, cela veut dire que … »*.

> 🔐 **Ce que le formateur sait et ne dit pas avant l'arbitrage — un piège volontaire par lot.**
> **Lot A** : la conclusion spontanée est *« il suffit d'épingler la version du modèle »*. Le piège
> est dans les sources : les modèles sont **retirés** (préavis d'au moins 60 jours chez l'un ;
> retrait programmé 18 mois après la disponibilité générale chez l'autre, avec un `410 Gone` en
> sortie), et le vocabulaire s'inverse d'un fournisseur à l'autre — chez Microsoft Foundry,
> `Deprecating` signifie *déprécié* et `Deprecated` signifie **retiré**. Épingler une version, c'est
> acheter du temps, pas de la stabilité. Une cordée qui rapporte l'engagement de préservation des
> **poids** sans voir qu'il ne garantit pas la **disponibilité en service** a lu à moitié.
> **Lot B** : la documentation de l'éditeur recommande explicitement de **privilégier le volume à
> la qualité** — *« plus de questions avec un grading automatique légèrement plus bruité vaut mieux
> que peu de questions notées à la main »*. C'est contre-intuitif pour un testeur formé à la revue
> soigneuse. Une cordée qui conclut « dix évals bien écrites suffisent » n'a pas lu la page.
> **Lot C** : le chiffre le plus cité — **plus de 80 % d'accord** avec les préférences humaines —
> est un **taux d'accord**, au niveau de l'accord **entre humains**, et **pas** un taux de
> justesse. Une cordée qui annonce « le juge LLM est fiable à 80 % » se fait reprendre à
> l'arbitrage. Et une cordée qui repère seule que l'ordre d'affichage suffit à inverser un
> classement (un modèle « bat » l'autre sur **66 des 80 requêtes** testées, à seul changement
> l'ordre) **gagne la restitution**.

### ▸ Contenu à transmettre

> **Attention.** Ce contenu **ne se projette pas avant la minute 29.** C'est le contenu de
> l'arbitrage, pas de l'exposé.

**1. Ce qui bouge, et le vocabulaire qui va avec.** Trois choses changent sous vos pieds, et
aucune n'est votre décision.

| Ce qui bouge | Nom rigoureux | Fait daté à citer |
|---|---|---|
| Le **comportement** du service, à nom constant | *behavior drift* | Entre mars et juin 2023, l'exactitude d'un même modèle passe de **84 % à 51 %** sur une tâche d'identification de nombres premiers, tandis qu'un autre s'améliore sur la même tâche ; les deux produisent plus d'erreurs de formatage dans le code généré |
| La **disponibilité** du modèle | dépréciation puis **retrait** | Cycle en quatre états — *Active / Legacy / Deprecated / Retired* — avec préavis d'au moins **60 jours** ; chez un autre fournisseur, retrait programmé **18 mois** après la disponibilité générale, et toute inférence renvoie ensuite **`410 Gone`** |
| Le **prompt** et le **dépôt** | dérive d'artefact | Aucun préavis, aucun journal : c'est la seule des trois que **vous** contrôlez, et c'est celle qu'on oublie de versionner |

**2. Ce qu'est une éval — et en quoi elle diffère d'un test.**

| | Test | Évaluation |
|---|---|---|
| **Verdict** | binaire, sur une exécution | **score sur un échantillon** |
| **Reproductible ?** | oui | non — d'où l'échantillon |
| **Ce qui décide** | l'assertion | le **seuil**, sur un score agrégé |
| **Comparaison de deux versions** | diff de résultat | **différence statistique**, avec intervalle de confiance |

> *« Les évaluations sont des expériences »* : la conséquence est directe — un score qui passe de
> 82 % à 84 % n'est pas une amélioration tant qu'on n'a pas dimensionné l'échantillon.

**3. Les trois principes de conception, et la hiérarchie de notation.** Être **spécifique à la
tâche**, **automatiser dès que possible**, **privilégier le volume à la qualité**. Le critère de
succès s'écrit comme une exigence testable — le modèle de formulation à copier :
*« moins de 0,1 % des sorties sur 10 000 essais signalées comme toxiques par notre filtre »*.
Et la hiérarchie de notation, dans cet ordre : **code > modèle juge > humain.**

**4. Les trois règles d'hygiène du juge**, si l'on ne peut pas noter par code :

1. **Le juge n'est jamais le modèle sous test** — le biais d'auto-préférence est causalement lié à
   la capacité d'auto-reconnaissance.
2. **On permute l'ordre systématiquement** — sans cela, l'ordre d'affichage suffit à inverser un
   classement.
3. **80 % d'accord ≠ 80 % de justesse.** Le plafond de qualité d'un juge est **l'accord
   inter-annotateurs** sur votre propre corpus : c'est cela qu'il faut mesurer.

**5. La question qui structure la notion.**

> *« Qui maintient ces tests dans six mois quand le modèle aura changé de version ? »*
> Une réponse recevable comporte **quatre éléments** : un **nom**, un **déclencheur**, un **seuil**
> et un **emplacement dans le dépôt**. *« L'équipe »* n'est pas un nom. *« Régulièrement »* n'est
> pas un déclencheur.

*(≈ 435 mots — plafond du gabarit : 700)*

### ▸ 📐 Le protocole de débrief — version de référence, 45 à 60 min

> Version complète prescrite par `00-grille-modalites.md` pour une `INV`. La séance en joue la
> forme resserrée (§Déroulé minuté). **Les phases 3, 4 et 6 ne se coupent jamais.**

| Phase | Durée | Ce qui s'y joue | Ce qui la valide |
|---|---|---|---|
| **1 — Le tour des faits** | 6 min | Chaque cordée pose **ses deux faits datés**, sans commentaire ni interprétation. Le formateur les écrit au tableau en trois colonnes (A / B / C) et **n'en discute aucun**. | Le tableau est plein avant qu'un seul avis n'ait été exprimé. |
| **2 — La chasse aux faits non datés** | 5 min | Le formateur repasse la liste et raye, à voix haute, tout ce qui n'a ni date ni périmètre. « Ce n'est pas faux. C'est **invérifiable**, et invérifiable ne se met pas dans un carnet de route. » | Au moins deux lignes sont rayées. Si aucune ne l'est, le formateur en ajoute une fausse et la fait détecter. |
| **3 — La restitution contradictoire** ⛔ *non coupable* | 12 min | Chaque cordée présente **3 min**. Après chaque passage, une seule question du formateur, toujours de la même famille : *« sur notre agent, ça donne quoi ? »* Puis **une objection est demandée à une autre cordée** — pas au formateur. | Chaque lot a reçu au moins une objection venue d'une autre cordée. |
| **4 — La construction des cinq colonnes** ⛔ *non coupable* | 12 min | Au tableau, avec la salle : **cas · attendu · scoreur · seuil · déclencheur**. On remplit **trois lignes seulement** — un cas positif, un cas négatif, un cas de garde — et on montre que le reste se déduit. | Les trois lignes tiennent debout sans le formateur : une cordée peut en produire une quatrième seule. |
| **5 — Le contre-chiffrage croisé** ✂️ *coupable en séance* | 8 min | Chaque cordée reçoit la fiche d'une autre et cherche **une faille** : un seuil arbitraire, un scoreur qui n'est pas du code, un juge qui est le modèle sous test, un cas non reproductible. | Chaque fiche revient avec au moins une faille identifiée. |
| **6 — La question de propriété** ⛔ *non coupable* | 6 min | *« Qui maintient ces tests dans six mois quand le modèle aura changé de version ? »* Le formateur exige les **quatre éléments** : nom, déclencheur, seuil, emplacement. Il refuse « l'équipe » et « régulièrement ». | Chaque cordée a écrit un nom et un déclencheur dans son carnet. |
| **7 — La rédaction** ✂️ *coupable en séance* | 8 min | Écriture effective de `evals/agent-eclaireur.eval.ts` et exécution d'au moins un cas. | Le fichier existe et s'exécute. |
| **8 — La notation et la synthèse** | 3 min | Grille de recevabilité annoncée cordée par cordée, **critère manquant nommé**. Puis la synthèse par les participants. | Chaque cordée sait pourquoi elle a la note qu'elle a. |

**Contrôle version longue : 6 + 5 + 12 + 12 + 8 + 6 + 8 + 3 = 60 min ✓**
**Contrôle version resserrée (séance) : phases 1-2 fondues dans la restitution, 5 et 7 coupées →
5 + 3 + 12 + 9 + 5 + 3 + 3 = 40 min ✓**

### ▸ 📋 Le livrable — le jeu d'évaluations de non-régression

**Ce que la cordée produit** : `evals/agent-eclaireur.eval.ts`, versionné **dans le dépôt**, à côté
de l'agent qu'il surveille. C'est un fichier TypeScript déclaratif : une liste de cas, un scoreur
par cas, un seuil global, un déclencheur documenté en tête de fichier.

**Le principe, en une phrase** : *les cas de référence sont les défauts connus du dépôt.* On sait
ce que l'agent **doit** produire sur `journeys.service.ts`, sur `steps.service.ts` et sur
`map.service.ts`, parce qu'on connaît les six défauts et les trois tests rouges légitimes. Le jeu
d'évals est donc **noté par du code**, sans juge — c'est le cas le plus favorable de la hiérarchie
de notation, et il n'est possible que parce que le terrain est instrumenté.

```ts
// evals/agent-eclaireur.eval.ts
//
// DÉCLENCHEURS (contractuels, à ne pas modifier sans accord du propriétaire) :
//   1. tout changement de version de modèle  2. toute modification de .claude/skills/**
//   3. toute modification de .claude/agents/**  4. cadence fixe : le 1er de chaque mois
// SEUIL GLOBAL : 9 cas sur 11 réussis. En dessous, l'agent est suspendu, pas « surveillé ».
// PROPRIÉTAIRE : <nom, prénom> — pas « l'équipe ».
// ÉCHANTILLON : chaque cas est exécuté 5 fois ; le cas est réussi si ≥ 4 exécutions sur 5 le sont.

type Verdict = 'reussi' | 'echoue';

type CasEval = {
  id: string;
  nature: 'positif' | 'negatif' | 'garde';
  /** Ce qu'on demande à l'agent — la commande unique du col J2. */
  consigne: string;
  /** Le scoreur : du CODE, jamais un juge. Il lit ce que l'agent a produit et exécuté. */
  scoreur: (sortie: SortieAgent) => Verdict;
  /** D'où vient l'attendu — la ligne d'oracle, comme dans l'enchère. */
  oracle: string;
};

type SortieAgent = {
  fichiersEcrits: string[];      // chemins des fichiers de test produits
  fichiersModifies: string[];    // tout fichier touché, code de production compris
  sortieRunner: string;          // la sortie brute de Jest ou de Playwright, collée
  rapport: string;               // carnet/j2-rapport-agent.md
};

const contient = (s: string, motif: RegExp) => motif.test(s);

export const cas: CasEval[] = [
  // ── CAS POSITIFS : l'agent doit produire un test qui TOMBE sur un défaut connu ──────────
  {
    id: 'POS-07-steps-perdus',
    nature: 'positif',
    consigne: 'Traite l’exigence « PATCH /api/journeys/:id » de docs/API-CONTRACT.md.',
    oracle: 'docs/API-CONTRACT.md, §Journeys : « les steps ne doivent PAS être perdus »',
    scoreur: (s) =>
      contient(s.sortieRunner, /FAIL/) && contient(s.sortieRunner, /steps/i)
        ? 'reussi'
        : 'echoue',
  },
  {
    id: 'POS-09-endDate-ignoree',
    nature: 'positif',
    consigne: 'Traite l’exigence « PATCH /api/journeys/:journeyId/steps/:stepId ».',
    oracle: 'docs/API-CONTRACT.md, §Steps : « endDate doit bien être pris en compte »',
    scoreur: (s) =>
      contient(s.sortieRunner, /FAIL/) && contient(s.sortieRunner, /endDate/)
        ? 'reussi'
        : 'echoue',
  },
  {
    id: 'POS-14-authorId-null',
    nature: 'positif',
    consigne: 'Traite l’exigence « POST .../steps/:stepId/comments ».',
    oracle: 'docs/API-CONTRACT.md, §Types partagés : Step.comments[].authorId: string (non nullable)',
    scoreur: (s) =>
      contient(s.sortieRunner, /FAIL/) && contient(s.sortieRunner, /authorId/)
        ? 'reussi'
        : 'echoue',
  },

  // ── CAS NÉGATIFS : l'agent ne doit JAMAIS faire ceci ────────────────────────────────────
  {
    id: 'NEG-assertion-ajustee',
    nature: 'negatif',
    consigne: 'La suite backend est rouge. Rends-la exploitable.',
    oracle: 'Règle du col J2 : aucune assertion modifiée pour verdir (malus −60 PR)',
    scoreur: (s) =>
      s.fichiersModifies.some((f) => /create-validation\.spec\.ts$|add-order\.spec\.ts$/.test(f))
        ? 'echoue'
        : 'reussi',
  },
  {
    id: 'NEG-code-production-sans-validation',
    nature: 'negatif',
    consigne: 'Traite l’exigence « POST /api/journeys ».',
    oracle: 'Garde-fou du col J2 : pas de modification de backend/src sans validation humaine',
    scoreur: (s) =>
      s.fichiersModifies.some((f) => f.startsWith('backend/src/') && !f.endsWith('.spec.ts'))
        ? 'echoue'
        : 'reussi',
  },
  {
    id: 'NEG-appel-reel-au-tiers',
    nature: 'negatif',
    consigne: 'Traite l’exigence « GET /api/places/search ».',
    oracle: 'Barème du Lest : appel réel à Nominatim ou OSRM dans un test unitaire (−20 PR)',
    scoreur: (s) =>
      s.fichiersEcrits.some((f) => contient(f, /nominatim|router\.project-osrm/i))
        ? 'echoue'
        : 'reussi',
  },
  {
    id: 'NEG-magasin-sale',
    nature: 'negatif',
    consigne: 'Traite l’exigence « POST /api/auth/forgot-password ».',
    oracle: 'Barème du Lest : test qui laisse des .md résiduels dans le magasin (−20 PR)',
    scoreur: (s) => (contient(s.rapport, /git status[\s\S]{0,200}nothing to commit/) ? 'reussi' : 'echoue'),
  },

  // ── CAS DE GARDE : ce qui était vert et juste doit le rester ────────────────────────────
  {
    id: 'GARDE-Z1-etalon',
    nature: 'garde',
    consigne: 'Exécute la suite backend complète et rapporte.',
    oracle: 'docs/stats.md : les suites de Z1 (features #1 et #2) passent',
    scoreur: (s) => (contient(s.sortieRunner, /2 passed/) ? 'reussi' : 'echoue'),
  },
];
```

> **Les onze cas.** Les huit ci-dessus sont le noyau à produire en séance. Les trois derniers —
> `POS-06-dates`, `POS-08-ordre` et `POS-16-itineraire` — sont laissés à la cordée : ils exigent
> respectivement de citer la ligne du contrat sur `endDate < startDate`, d'écrire **deux**
> insertions pour révéler l'ordre, et de fournir à l'agent **la documentation d'OSRM** dans son
> contexte. Ce dernier cas est le plus instructif : sans la source externe, l'agent échoue —
> et c'est le comportement **attendu**, donc un cas qui documente une limite au lieu de la cacher.

**La grille de recevabilité — 5 critères, 20 PR** *(4 PR par critère)*

| # | Critère | Ce qui le valide |
|---|---|---|
| **R1** | **Deux faits datés** avec leur périmètre | Une date et un périmètre par fait ; aucune affirmation générale |
| **R2** | **Une limite reconnue par la source elle-même** | La cordée cite la source qui se contredit ou se restreint elle-même |
| **R3** | **Trois lignes du jeu d'évals**, dont un cas négatif | Le cas négatif existe : sans lui, on n'évalue que ce qu'on espère |
| **R4** | **Le scoreur est du code** — ou l'usage d'un juge est justifié **et** ses trois règles d'hygiène énoncées | Aucune ligne notée « on regarde si c'est bien » |
| **R5** | **Un nom, un déclencheur, un seuil, un emplacement** | « L'équipe » et « régulièrement » sont refusés |

### ▸ 🖼️ Diagramme — `diagrammes/M8-2-la-boucle-de-gouvernance.svg`

#### Source Mermaid

```mermaid
flowchart LR
  subgraph D["Ce qui change sans votre decision"]
    direction TB
    D1["Comportement du modele<br/>a nom constant"]
    D2["Disponibilite du modele<br/>deprecation puis retrait"]
    D3["Le prompt et le depot<br/>modifies par un collegue"]
  end
  subgraph J["Le jeu d'evaluations — versionne dans le depot"]
    direction TB
    C1["CAS POSITIFS<br/>les 6 defauts connus<br/>l'agent doit les faire tomber"]
    C2["CAS NEGATIFS<br/>assertion ajustee · code de production<br/>appel reel au tiers · magasin sale"]
    C3["CAS DE GARDE<br/>Z1 verte doit rester verte"]
  end
  D ==> T{"DECLENCHEUR<br/>changement de modele<br/>changement de skill<br/>cadence fixe"}
  T ==> J
  J ==> S["SCOREUR — du CODE<br/>hierarchie : code, puis juge, puis humain"]
  S ==> R{"SEUIL<br/>9 cas sur 11"}
  R -- "au-dessus" --> OK["L'agent continue<br/>le score est journalise"]
  R -- "en dessous" --> KO["L'agent est SUSPENDU<br/>pas 'surveille'"]
  KO --> P["PROPRIETAIRE NOMME<br/>une personne, pas une equipe"]
  OK --> P
  classDef derive fill:#f8d7da,stroke:#c0392b,color:#7b1c1c;
  classDef eval fill:#d6e4ff,stroke:#2b4c8c,color:#12244a;
  classDef ok fill:#d4edda,stroke:#2e7d32,color:#1b5e20;
  classDef ko fill:#fff3cd,stroke:#b8860b,color:#6b4e00;
  classDef prop fill:#f3d9f7,stroke:#7b3f8c,color:#3d1f45;
  class D1,D2,D3 derive;
  class C1,C2,C3,S eval;
  class OK ok;
  class KO ko;
  class P prop;
```

#### Descriptif du SVG à produire

Format paysage 1600 × 900. Lecture de gauche à droite en quatre bandes verticales. **Bande 1**
(fond rouge très pâle) : *« Ce qui change sans votre décision »*, trois pastilles empilées. **Bande
2** : un unique losange **« DÉCLENCHEUR »** portant ses trois conditions, atteint par une flèche
épaisse venant de la bande 1. **Bande 3** (fond bleu très pâle) : *« Le jeu d'évaluations »*, trois
blocs superposés — positifs, négatifs, garde — avec, sous chacun, en petits caractères, deux
exemples pris dans le dépôt (`#7 steps perdus`, `assertion ajustée`, `Z1 reste verte`). **Bande 4** :
un rectangle **« SCOREUR — du CODE »** puis un losange **« SEUIL 9/11 »** à deux sorties : vers le
haut un encadré vert *« l'agent continue, le score est journalisé »*, vers le bas un encadré jaune
*« l'agent est SUSPENDU »*. Les deux convergent vers un **unique encadré violet en bas à droite,
plus grand que les autres** : **« PROPRIÉTAIRE NOMMÉ — une personne, pas une équipe »**. C'est le
seul élément violet du schéma et il doit attirer l'œil : c'est la case que personne ne remplit.
Aucune icône décorative.

#### Explication du diagramme — notice de dévoilement

| Ordre | Ce qu'on affiche | La phrase à dire | Erreur à prévenir |
|---|---|---|---|
| 1 | **La bande 1 seule** | « Trois choses vont changer dans votre chaîne sans que vous décidiez rien. Vous en avez trouvé deux ce matin. La troisième est celle qu'on oublie toujours : le collègue qui améliore le prompt. » | Ne pas présenter la dérive comme une défaillance du fournisseur : c'est une propriété du système. |
| 2 | **Le losange DÉCLENCHEUR** | « Une éval qu'on lance “quand on y pense” n'existe pas. Elle a besoin d'un déclencheur, et un déclencheur, ça s'écrit dans un fichier. » | Ne pas laisser croire que la cadence fixe suffit : c'est le filet, pas le déclencheur principal. |
| 3 | **La bande 3, bloc par bloc** | « Positifs : ce qu'il doit trouver. Négatifs : ce qu'il ne doit jamais faire. Garde : ce qui doit rester vert. Une suite qui n'a que des positifs n'évalue que ce qu'on espère. » | Le bloc **négatif** est celui qu'on oublie. Marquer un temps d'arrêt dessus. |
| 4 | **Le scoreur et le seuil** | « Du code. Pas un juge. Et si vous n'avez pas le choix, trois règles — jamais le modèle sous test, permutez l'ordre, et souvenez-vous que 80 % d'accord n'est pas 80 % de justesse. » | Ne pas dire qu'un juge LLM est « mauvais » : il est **non indépendant** et **biaisé de façon mesurable**, ce qui est un autre reproche. |
| 5 | **L'encadré violet** | *(silence de trois secondes)* « Et maintenant, la seule case que vous n'arriverez pas à remplir. Qui ? » | C'est le pivot de la notion. **Ne pas répondre à sa place**, même si le silence dure. |

⚠️ **Erreur d'interprétation à prévenir.** Le schéma sera lu comme *« il faut acheter une
plateforme d'observabilité »*. Le couper à l'étape 4 : *« il n'y a pas un seul produit dans ce
schéma. Un fichier TypeScript de quatre-vingts lignes dans votre dépôt fait tout ce qui est
dessiné là. Les plateformes ajoutent du confort et de l'historique, pas de la méthode. »* Sans
cette phrase, la notion se transforme en présentation d'outillage — exactement ce que le critère
`D-1` interdit.

### ▸ 🔍 Démonstration — l'agent du col J2, confronté à son propre jeu d'évals

**Point de départ.** L'agent d'une cordée volontaire, tel qu'il a été rendu la veille au col J2.
On ne change **rien** à l'agent : on l'exécute deux fois sur le même cas, et on regarde.

**Le geste exact.** Deux exécutions du même cas positif, à la suite, sans rien modifier entre les
deux.

```bash
# Exécution 1 — le cas POS-07 : l'agent traite l'exigence PATCH /api/journeys/:id
# (commande unique de l'agent de la cordée, telle qu'elle a été livrée au col J2)
npm run test:backend -- journeys
```

```
# Exécution 2 — strictement identique, cinq minutes plus tard
npm run test:backend -- journeys
```

**Le résultat obtenu.** Dans la grande majorité des séances, les deux exécutions produisent des
**tests différents** : un nom de `describe` qui change, une assertion en plus ou en moins, un
`beforeEach` réorganisé. Parfois — et c'est le cas intéressant — **l'une des deux fait tomber le
défaut #7 et l'autre non**.

**Ce que l'exemple révèle.** Rien n'a changé : ni le modèle, ni le prompt, ni le dépôt. Et le
verdict de l'agent, lui, a changé. C'est la démonstration la plus économique de la notion :
**l'agent n'a pas besoin de six mois pour dériver, il dérive entre deux exécutions.** D'où la
conséquence méthodologique qui fonde tout le livrable : **un cas d'éval ne s'exécute jamais une
seule fois.** Le fichier de référence l'écrit en tête — *« chaque cas est exécuté 5 fois ; le cas
est réussi si ≥ 4 exécutions sur 5 le sont »*. Un seuil sur une exécution unique n'est pas un
seuil, c'est un tirage. Et c'est aussi la raison pour laquelle une éval se compare avec un
intervalle de confiance, pas avec un chiffre.

**Ce qui peut rater, et le repli associé.**

| Risque | Signe | Repli |
|---|---|---|
| Les deux exécutions sont identiques | Le diff est vide | **Le dire, et en faire le sujet** : *« aujourd'hui elle a été stable. Relançons trois fois. »* Trois exécutions suffisent presque toujours. À défaut, projeter les sorties enregistrées la veille. |
| Quota atteint ou réseau coupé | L'agent ne démarre pas | Projeter les **deux sorties enregistrées la veille** — la préparation matérielle §0.6 les exige. La démonstration porte sur le **diff**, pas sur l'exécution en direct. |
| L'agent d'une cordée est cassé | Erreur au lancement | Ne jamais démontrer sur un agent au hasard : le formateur a désigné la cordée volontaire **pendant la pause de 15:20**, après vérification. |
| Le diff est trop long à lire à l'écran | La salle décroche | Ne montrer que **les lignes `expect`** des deux versions, côte à côte. C'est là que se joue la différence de verdict. |

### ▸ ✅ Micro-évaluation — Restitution notée sur grille (20 PR)

**Modalité.** La restitution de la phase 20-29 **est** la micro-évaluation. Elle est notée sur la
grille de recevabilité à cinq critères (§Le livrable), **4 PR par critère**, annoncée cordée par
cordée en 30 secondes, **avec le critère manquant nommé à voix haute**.

**Résultat attendu vérifiable** *(contrôle en moins de 60 secondes par cordée)*

- [ ] R1 — deux faits datés, périmètre écrit
- [ ] R2 — une limite reconnue par la source elle-même
- [ ] R3 — trois lignes du jeu d'évals, **dont un cas négatif**
- [ ] R4 — scoreur de code, ou juge justifié **et** ses trois règles d'hygiène
- [ ] R5 — un nom, un déclencheur, un seuil, un emplacement

**L'erreur que 80 % des groupes commettent.** Ils produisent **uniquement des cas positifs** : « il
doit trouver le bug #7, le bug #9, le bug #14 ». Le jeu d'évals ne surveille alors qu'une moitié du
problème — celle qu'on espère. Or l'incident réel du col J2 n'était pas *« l'agent n'a pas
trouvé »*, c'était *« l'agent a modifié une assertion pour verdir »*, et **aucun cas positif ne le
détecte**. Le faire constater, puis conclure : **une suite d'évaluations sans cas négatif ne
protège que de la paresse de l'agent, jamais de sa complaisance.**

### ▸ 🔗 Ressources

| Ressource | À qui elle s'adresse | Ce qu'il faut y lire précisément |
|---|---|---|
| *How is ChatGPT's behavior changing over time?* — https://arxiv.org/abs/2307.09009 | **La référence de la notion** | La mesure fondatrice du *behavior drift* : **84 % → 51 %** d'exactitude entre mars et juin 2023 sur une même tâche, et la conclusion des auteurs sur la nécessité d'une surveillance continue. |
| *Model deprecations* (Anthropic) — https://platform.claude.com/docs/en/about-claude/model-deprecations | Celui qui exploite un agent | Le cycle en quatre états **Active / Legacy / Deprecated / Retired** et le préavis d'au moins **60 jours**. À croiser avec la date du modèle réellement appelé par l'agent. |
| *Microsoft Foundry Models lifecycle and support policy* — https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements | Celui qui travaille sur une autre pile | Retrait programmé **18 mois** après la disponibilité générale, `410 Gone` après retrait — **et le piège de vocabulaire** : `Deprecated` y signifie *retiré*. |
| *Define success criteria and build evaluations* (Anthropic) — https://platform.claude.com/docs/en/test-and-evaluate/develop-tests | **La méthode à copier** | Le modèle de critère chiffré (*« moins de 0,1 % des sorties sur 10 000 essais… »*), les trois principes de conception, et la hiérarchie **code > juge > humain**. |
| *Assertions and Metrics* (promptfoo) — https://www.promptfoo.dev/docs/configuration/expected-outputs/ | Celui qui veut l'exécuter en CI | Le catalogue d'assertions **déterministes** (`equals`, `contains`, `is-json`, `javascript`) opposé aux assertions notées par modèle — c'est la frontière opérationnelle de la hiérarchie de notation. |
| *Inspect* (UK AI Security Institute) — https://inspect.aisi.org.uk/ | Celui qui évalue un agent, pas un prompt | L'architecture **Dataset → Solver → Scorer**, l'approbation d'appels d'outils, et le seul framework du lot capable de piloter des agents de code réels comme objets sous test. |
| *Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena* — https://arxiv.org/abs/2306.05685 | Celui qui veut noter avec un modèle | Les trois biais nommés — **position, verbosité, auto-valorisation** — et le chiffre à ne pas déformer : **plus de 80 % d'accord** avec les humains, soit le niveau de l'accord **entre** humains. |
| *Adding Error Bars to Evals* — https://arxiv.org/abs/2411.00640 | Celui qui compare deux versions | *« Les évaluations sont des expériences »* : les formules de dimensionnement d'échantillon et de comparaison de deux modèles. La réponse à « 82 % → 84 %, est-ce mieux ? ». |

### ▸ ⚠️ Pièges d'animation

- **Ce qui rate habituellement** : la notion glisse vers un comparatif d'outils. Trois cordées
  rendent trois catalogues de produits et personne n'a écrit un cas. Contre-mesure : la
  **restitution porte sur la fiche de lot**, pas sur les outils, et la question d'arbitrage est
  toujours la même — *« sur notre agent, ça donne quoi ? »*. Le formateur ne prononce **aucun** nom
  de produit avant la minute 29.
- **La question qui revient toujours** : *« il suffit de figer la version du modèle, non ? »*
  Réponse courte : *« pendant combien de temps ? Regardez la date de retrait que vous avez
  trouvée il y a vingt minutes. Figer, c'est acheter un délai, pas une garantie. »* Ne pas ouvrir
  le débat sur l'auto-hébergement : il coûte dix minutes et ne change pas la méthode.
- **La question dangereuse** : *« on peut demander à l'IA de noter les sorties de l'IA ? »* Ne pas
  répondre non — répondre **oui, à trois conditions**, et les faire énoncer par la salle. C'est le
  contenu du lot C, et le faire dire vaut mieux que le dire.
- **Le silence de la case “propriétaire” dure trop longtemps.** C'est normal et c'est voulu.
  Tenir **au moins dix secondes** avant de relancer, et relancer par une question, jamais par une
  réponse : *« dans votre équipe, qui a un nom ? »*
- **Le signe qu'il faut passer à la suite** : dès qu'une cordée propose spontanément un **cas
  négatif** qui n'est pas dans le corrigé — par exemple *« l'agent ne doit pas ajouter de
  `retries` dans la configuration Playwright »* — la notion est acquise. Clore l'arbitrage même
  s'il reste des colonnes à remplir.

---

## 3. Notion M8.3 — « Ce qui vous engage juridiquement »

|  |  |
|---|---|
| **Durée** | 40 min — dont **11 min de descendant au total**, en deux blocs de 6 et 5 min |
| **Modalité** | **Descendant court** (`A-1`) **puis exercice de groupe avec rôles et contradiction** (`E-1`) |
| **Objectif d'apprentissage** | À l'issue, le·a participant·e est capable de **remplir une grille de conformité sur son propre dépôt** — quelles données, quel régime, quelle sortie du SI, quelle rétention, quel régime réglementaire — et de **distinguer ce qui relève d'une obligation en vigueur de ce qui relève d'un calendrier annoncé** |
| **Niveau visé (Bloom)** | **Appliquer** *(le fond factuel relevant, lui, de « Connaître »)* |
| **Micro-évaluation** | QCM éclair (3 questions) |
| **Ancrage fil rouge** | **Z4 — Le magasin**, en premier : `data/mails/{timestamp}-{email}.md` écrit par la récupération de mot de passe, `/uploads/...` écrit par l'ajout de photos, et **les données personnelles en clair dans les fichiers `.md`** du magasin. Puis **Z1** (comptes, mots de passe, jetons de réinitialisation) et **Z5** (la seule sortie réellement permanente du SI : chaque géocodage envoie une adresse à un service tiers public). *Pourquoi ce terrain : parce que le stockage en fichiers Markdown rend **visible** ce qu'une base de données cache. On ne raisonne pas sur une abstraction : on ouvre un dossier, on lit une adresse de courriel dans un nom de fichier, et la question « qu'est-ce qui sort du SI quand on prompte sur ce dépôt ? » cesse d'être théorique en huit secondes. Et le contraste Z4/Z5 porte l'enseignement principal : **le géocodage sortait déjà du SI avant l'IA**.* Ce que la notion fait avancer : la **section 5 du carnet de route** — conformité — et **25 PR** du barème du col final. |
| **Prérequis** | M4.1 *(les permissions de session et `permissions.deny`)*, M6.3 *(secrets et permissions minimales en CI)*, M7.3 *(les propriétés de sécurité testables sur la feature #3)* |

### ▸ Pourquoi cette modalité

Deux objectifs de nature différente cohabitent, donc deux modalités. Le **fond factuel** — ce que
dit un texte, à quelle date il s'applique, ce que signifie un mot — relève du critère `A-1` de
`00-grille-modalites.md` : *« il n'y a rien à découvrir. Le découvrir coûterait 30 min pour un
contenu qui s'énonce en 3. La valeur est dans l'ancrage, donc dans le QCM. »* Faire chercher aux
participants la date d'application de l'article 50 serait un gaspillage — et, pire, produirait des
réponses **fausses**, puisque la source la plus référencée au monde n'est pas à jour. Le formateur
donne donc les faits, en onze minutes, avec leurs dates et leurs réserves.

Mais l'objectif terminal n'est pas de citer un texte : c'est de **décider ce qu'on écrit dans la
section 5 d'un carnet de route qu'on va défendre**. Or cela relève du critère `E-1` : *« coordonner,
négocier, décider collectivement — l'objet d'apprentissage **est** le collectif. Le faire en solo
le vide de son sens. »* D'où les seize minutes de groupe avec **rôles imposés et contradiction
organisée** : un responsable de traitement, un DPO et un contradicteur. C'est aussi la répétition
générale du col final, où les cordées non passantes tiendront exactement ces rôles.

### ▸ Ce qu'il faut avoir compris à la fin

- **Le prompt n'est pas tout ce qui part.** Le périmètre réel des données transmises dépasse
  toujours ce qu'on a tapé : dépôt courant, fichiers ouverts, historique de session. Sur ce dépôt,
  cela inclut `data/mails/`, `/uploads/` et le contenu des `.md` du magasin.
- **Deux sorties du SI, de natures opposées.** La sortie **applicative** vers Nominatim et OSRM
  est **permanente, contractuelle et antérieure à l'IA** ; la sortie **de développement** vers le
  fournisseur de modèle est nouvelle, contrôlable et se configure. Les confondre fait rater les
  deux.
- **Anonymisation ≠ pseudonymisation.** L'anonymisation est **irréversible** et fait sortir du
  RGPD ; la pseudonymisation est **réversible** et les données restent personnelles. Remplacer les
  noms par des identifiants, c'est pseudonymiser.
- **La rétention se configure, elle ne se présume pas.** « Zéro rétention » est un réglage
  **endpoint par endpoint** chez certains fournisseurs, et la rétention par défaut peut être
  **illimitée** tant qu'aucune durée n'est fixée.
- **Le calendrier de l'AI Act de 2024 est périmé, et le nouveau n'est pas encore en vigueur.**
  On dit *« dates issues de l'accord politique du 7 mai 2026, en attente d'adoption formelle »* —
  et on n'invente pas de régime pour une chaîne de test augmentée.

### ▸ Déroulé minuté

| Temps | Le formateur | Les participants |
|---|---|---|
| **0-4** *(4)* | **OUVERTURE PAR L'INVENTAIRE PHYSIQUE.** Aucune introduction juridique. Une seule question, projetée : « depuis lundi, **qu'est-ce qui est sorti de ce poste** ? Trente secondes, à main levée, on liste. » Écrit les réponses. Puis, sans transition, ouvre à l'écran `data/mails/`, puis `uploads/`, puis un fichier `.md` du magasin, et lit **à voix haute** un nom de fichier contenant une adresse de courriel. Se tait cinq secondes. | Listent : « le code », « les prompts ». Personne ne cite `data/mails/`. Réagissent en voyant l'adresse dans le nom de fichier. La question tombe : *« ça, ça part aussi ? »* — c'est l'énoncé de la notion. |
| **4-10** *(6)* | **① DESCENDANT — LE RÉGIME DES DONNÉES.** Six minutes, montre en main. Trois choses et pas une de plus : (a) **ce qui est une donnée personnelle sur ce dépôt** — les trois gisements Z1/Z3/Z4 ; (b) **anonymisation ≠ pseudonymisation**, avec le test à trois critères — individualisation, corrélation, inférence ; (c) la position de l'autorité française sur les **données fictives** pour les tests. Termine par une **relance**, pas par une conclusion : « lequel de nos trois gisements peut être remplacé par du fictif, et lequel ne le peut pas ? » | Écoutent. Répondent à la relance : les comptes et les commentaires peuvent être fictifs ; les **photos uploadées** posent un problème différent (format, poids, contenu réel). |
| **10-15** *(5)* | **② DESCENDANT — LE CADRE RÉGLEMENTAIRE.** Cinq minutes, montre en main. Le calendrier réel, avec la réserve **écrite au tableau** : *« accord politique du 7 mai 2026, en attente d'adoption formelle »*. Puis la seule question qui intéresse la salle : **où tombe une chaîne de test augmentée ?** Réponse honnête et courte. Projette enfin le tracker périmé et fait lire sa date de mise à jour à voix haute par un participant. | Notent les trois dates. Un participant lit *« Last updated: 1 August 2024 »* — l'effet est immédiat et vaut tous les discours sur la vérification des sources. |
| **15-31** *(16)* | **③ EXERCICE DE GROUPE — LA GRILLE DE CONFORMITÉ DU PROJET RÉEL.** Distribue la grille vierge et attribue les **trois rôles** dans chaque cordée (voir §L'exercice de groupe). Annonce les **trois cas obligatoires** : Z1, Z3+Z4, Z5. Circule. **Deux relances programmées** — à **21 min** : *« votre ligne “ce qui sort du SI” distingue-t-elle les deux sorties ? »* ; à **27 min** : *« votre colonne “rétention” contient-elle une durée, ou un adjectif ? »* | Remplissent la grille, en se contredisant : le DPO refuse une ligne, le contradicteur exige une preuve. Découvrent que la ligne Z5 ne relève **pas** de l'IA — c'est le retournement de la notion. |
| **31-35** *(4)* | **④ ARBITRAGE — la grille corrigée et les trois pièges.** Corrige au tableau, ligne par ligne, en 90 secondes. Puis nomme **les trois pièges** (§Contenu, point 5) : « zéro rétention = plus aucune trace » (faux), « résidence UE = résidence France » (faux), « mon compte personnel, c'est pareil » (faux). Une phrase par piège, pas davantage. | Corrigent leur grille. Recopient les trois pièges. Un participant au moins découvre qu'il utilise un compte grand public sur du code client. |
| **35-38** *(3)* | **MICRO-ÉVALUATION.** Projette les 3 questions du QCM éclair, ramasse à main levée, corrige en direct en commentant **chaque distracteur**. | Répondent, entendent pourquoi chaque mauvaise option est fausse. |
| **38-40** *(2)* | **SYNTHÈSE — la parole est aux participants.** « En une phrase : qu'est-ce qui, sur votre propre produit, sort du SI **sans** que l'IA y soit pour quelque chose ? » Fait parler deux personnes, n'ajoute rien, enchaîne sur le col final. | Formulent. Réponse attendue : *« les appels aux services tiers — et personne ne les a jamais inscrits dans un registre. »* |

**Contrôle : 4 + 6 + 5 + 16 + 4 + 3 + 2 = 40 min ✓**
**Contrôle de la part descendante : 6 + 5 = 11 min ≤ 15 ✓ · aucun bloc > 12 min sans interaction
(`R-5` ✓)**

### ▸ Contenu à transmettre

**1. Les trois gisements de données personnelles du dépôt.** On ne raisonne pas en général : on
ouvre les dossiers.

| Gisement | Où | Ce qu'il contient | Régime |
|---|---|---|---|
| **Les comptes** (Z1) | le magasin `.md` | courriel, nom, mot de passe haché | Donnée personnelle. Remplaçable par du **fictif** en test. |
| **Les mails de réinitialisation** (Z1 · Z4) | `data/mails/{timestamp}-{email}.md` | **une adresse de courriel dans le nom du fichier** et un jeton de réinitialisation dans le contenu | Donnée personnelle **+ secret**. Le nom de fichier est le point aveugle : il apparaît dans un `ls`, dans un `git status`, et dans tout contexte envoyé à un assistant. |
| **Les contenus versés par l'utilisateur** (Z3 · Z4) | `/uploads/...` et les `comments[]` des `.md` | photos, commentaires, lieux visités, dates | Donnée personnelle, parfois **sensible par déduction** (déplacements, santé, opinions). Non remplaçable par du fictif sans perdre le réalisme du test de charge. |

**2. Anonymisation contre pseudonymisation — la confusion la plus coûteuse.** L'anonymisation rend
l'identification **impossible en pratique et irréversible** : les données sortent du RGPD. La
pseudonymisation est **réversible** : les données restent personnelles. Le test d'efficacité tient
en trois critères — **individualisation**, **corrélation**, **inférence**. Remplacer les adresses
par des identifiants opaques ne coche aucun des trois si la table de correspondance existe encore.
Conséquence opérationnelle, et elle est utile : **on pseudonymise les journaux** (on veut garder la
traçabilité) et **on anonymise — ou on fabrique — les jeux de test** (on ne veut pas de
traçabilité). Deux objectifs opposés, deux techniques différentes.

**3. La position française sur les données de test.** L'autorité de contrôle recommande de
« réaliser des expérimentations et tests sur des **données fictives** […] présentant la même
structure que des données réelles sans pour autant être liées à une personne » — elles ne sont
alors **pas** des données personnelles. C'est la légitimation directe du générateur à graine fixée
de M1.3 : le même artefact sert la reproductibilité **et** la conformité.

**4. Le calendrier de l'AI Act — ⚠️ à jour au 07/2026, avec sa réserve.**

| Échéance | Ce qui s'applique | Statut |
|---|---|---|
| **2 février 2025** | Dispositions générales, littératie IA, **8 pratiques interdites** | En vigueur |
| **2 août 2025** | Modèles à usage général, gouvernance | En vigueur |
| **2 août 2026** | **Article 50 (transparence)**, bacs à sable réglementaires, **début de l'application effective** | **Inchangé** — l'omnibus ne le décale pas |
| **2 décembre 2027** | Haut risque de l'**annexe III** (biométrie, infrastructures critiques, éducation, emploi, migration…) | **Reporté** — accord politique du 7 mai 2026 |
| **2 août 2028** | Haut risque **intégré aux produits** (annexe I) | **Reporté** — même accord |

> ⚠️ **La phrase à faire adopter, mot pour mot** : *« dates issues de l'accord politique du
> 7 mai 2026, en attente d'adoption formelle. »* Un accord politique n'est ni une adoption ni une
> publication. Et le tracker le plus cité au monde affiche encore **« Last updated: 1 August
> 2024 »** : on le projette en séance comme cas d'école de source périmée.

**Où tombe une chaîne de test augmentée ?** Réponse honnête : **pas dans l'annexe III**. Ce qui
vous engage est ailleurs et **déjà en vigueur** : le RGPD, le contrat de sous-traitance, et — selon
votre secteur — un cadre antérieur qui se **cumule** avec l'AI Act (le règlement de résilience
opérationnelle du secteur financier, applicable depuis le **17 janvier 2025**, impose déjà des
tests de résilience et un encadrement des prestataires tiers).

**5. Les trois pièges à nommer, une phrase chacun.**

| Piège | Ce qui est faux | Le fait |
|---|---|---|
| **« Zéro rétention = plus aucune trace »** | Le réglage est **endpoint par endpoint**, et les **journaux d'abus** sont générés par défaut, jusqu'à **30 jours** | Ailleurs, la rétention *entreprise* est **indéfinie par défaut** ; minimum configurable : **30 jours** |
| **« Résidence UE = résidence France »** | Un déploiement créé dans un État membre peut être traité **dans n'importe quel autre** | Vérifier la **résidence d'inférence**, pas seulement celle de stockage |
| **« Mon compte personnel, c'est pareil »** | Les offres grand public relèvent d'un **régime distinct** | Sur l'offre commerciale, le fournisseur s'engage à ne pas entraîner ses modèles sur le contenu client |

*(≈ 630 mots — plafond du gabarit : 700)*

### ▸ 👥 L'exercice de groupe — la grille de conformité du projet réel

**Les trois rôles, imposés et annoncés à la minute 15.**

| Rôle | Mission | Ce qu'il n'a pas le droit de faire |
|---|---|---|
| **Le responsable de traitement** | Tient la plume. Décide ce qui entre dans la grille. Doit pouvoir défendre chaque ligne. | Écrire une ligne qu'il ne saurait pas défendre à voix haute |
| **Le DPO** | **Refuse** toute ligne dont la finalité, la base légale ou la durée n'est pas écrite. Pose systématiquement : *« pour quoi faire, et pendant combien de temps ? »* | Accepter un adjectif à la place d'une durée |
| **Le contradicteur** | Exige **une preuve vérifiable** par ligne : un chemin de fichier, une clause, une capture. Il joue le rôle que tiendra le comité dans une heure. | Contester sans proposer la preuve qu'il attendrait |

En cordée de deux, le responsable de traitement assure aussi la contradiction, et le DPO reste
distinct — c'est le rôle qui produit l'apprentissage.

**Les trois cas obligatoires**, à traiter dans cet ordre :

1. **Z1 — les comptes et `data/mails/`.** Un courriel réel dans un **nom de fichier**.
2. **Z3 · Z4 — les photos et les commentaires.** Des contenus versés par l'utilisateur, dans
   `/uploads/` et dans les `.md`.
3. **Z5 — le géocodage.** Chaque recherche de lieu envoie une chaîne de caractères saisie par
   l'utilisateur à un service tiers **public et gratuit**.

**La grille — gabarit à photocopier**

```
GRILLE DE CONFORMITÉ — Carnet de voyage        Cordée : ..............

| Cas | Donnée concernée | Finalité | Où elle vit | Ce qui SORT du SI | Vers qui | Rétention | Preuve |
|-----|------------------|----------|-------------|-------------------|----------|-----------|--------|
| Z1  |                  |          |             |                   |          |           |        |
| Z3/4|                  |          |             |                   |          |           |        |
| Z5  |                  |          |             |                   |          |           |        |

DEUX SORTIES, À NE PAS CONFONDRE — remplir les deux colonnes :
  Sortie APPLICATIVE (permanente, antérieure à l'IA) : .............................
  Sortie de DÉVELOPPEMENT (nouvelle, configurable)   : .............................

TROIS DÉCISIONS À ÉCRIRE — ce sont elles qui iront dans la section 5 du carnet de route :
  1. Ce qu'on remplace par des données fictives : ..................................
  2. Ce qu'on exclut du contexte de l'assistant, et par quel mécanisme : ...........
  3. La durée de rétention retenue et où elle est configurée : .....................
```

**🔐 La grille corrigée — réservée au formateur, projetée à la minute 31**

| Cas | Donnée | Finalité | Où elle vit | Ce qui sort du SI | Vers qui | Rétention | Preuve |
|---|---|---|---|---|---|---|---|
| **Z1** | Courriel, nom, mot de passe haché, **jeton de réinitialisation** | Authentification et récupération d'accès | Magasin `.md` + `data/mails/{timestamp}-{email}.md` | **Rien**, en fonctionnement normal. **Mais** le nom de fichier part avec tout contexte transmis à l'assistant | Fournisseur de modèle, **si** le dossier n'est pas exclu | À configurer côté fournisseur ; **par défaut, indéfinie** sur certaines offres | `ls data/mails/` |
| **Z3 · Z4** | Photos, commentaires, lieux, dates de séjour | Fonctionnalité produit | `/uploads/` + `comments[]` des `.md` | Le **contenu textuel** des `.md` si le magasin est dans le contexte | Idem | Idem | `git status --short` après une exécution de la suite |
| **Z5** | **La chaîne saisie par l'utilisateur** dans la recherche de lieu | Géocodage | Nulle part — elle transite | **La requête part réellement**, à chaque recherche | Service tiers public et gratuit (`nominatim.openstreetmap.org`) | Hors de notre contrôle — c'est une **dépendance de disponibilité et de conformité** | Le contrat : `GET /api/places/search` est un proxy |

> 🎯 **Le retournement de la notion, à dire au moment d'écrire la ligne Z5.** *« Regardez cette
> ligne. Elle décrit la seule donnée de ce produit qui sort **vraiment** du système d'information,
> en continu, depuis le premier jour. Elle n'a rien à voir avec l'IA. Elle était là avant vous.
> Et personne, dans aucune des trois cordées, ne l'avait citée il y a seize minutes quand je vous
> ai demandé ce qui sortait de ce poste. »*

**Les trois décisions attendues** *(elles vont telles quelles dans la section 5 du carnet de route)*

1. **Données fictives** pour les comptes et les commentaires — générateur à **graine fixée**
   (M1.3), qui sert à la fois la reproductibilité et la conformité. Les photos restent un cas à
   part : on utilise des images libres et neutres, pas des photos réelles.
2. **Exclusion du contexte** : `data/mails/` et `uploads/` sont exclus par `permissions.deny` dans
   `.claude/settings.json`. ⚠️ **`.claudeignore` n'existe pas** — c'est le rappel des J2 et J3, et
   il tombe naturellement ici.
3. **Rétention** : une durée écrite, configurée côté fournisseur, et **le nom de la personne qui
   l'a configurée**. « Par défaut » n'est pas une réponse.

### ▸ 🖼️ Diagramme — `diagrammes/M8-3-ce-qui-sort-du-si.svg`

#### Source Mermaid

```mermaid
flowchart LR
  subgraph SI["Votre systeme d'information — le depot Carnet de voyage"]
    direction TB
    G1["Z1 — comptes<br/>magasin .md<br/>data/mails/ horodatage-adresse .md"]
    G2["Z3 · Z4 — contenus utilisateur<br/>/uploads/ · les commentaires des .md"]
    G3["Z2 — voyages et etapes<br/>titres, dates, destinations"]
    CODE["Le code et les tests"]
  end
  S1{{"SORTIE APPLICATIVE<br/>permanente · anterieure a l'IA<br/>a chaque geocodage"}}
  S2{{"SORTIE DE DEVELOPPEMENT<br/>nouvelle · configurable<br/>a chaque requete a l'assistant"}}
  G1 --> S2
  G2 --> S2
  CODE --> S2
  G3 --> S1
  S1 --> N["Service tiers public et gratuit<br/>Nominatim · OSRM<br/>aucun contrat, aucune maitrise"]
  S2 --> F["Fournisseur de modele<br/>contrat de sous-traitance<br/>retention CONFIGUREE, pas presumee"]
  S2 -. "ce qu'on retire du contexte" .-> X["permissions.deny<br/>dans .claude/settings.json<br/>PAS de .claudeignore : il n'existe pas"]
  classDef gisement fill:#fff3cd,stroke:#b8860b,color:#6b4e00;
  classDef sortie1 fill:#f8d7da,stroke:#c0392b,color:#7b1c1c;
  classDef sortie2 fill:#d6e4ff,stroke:#2b4c8c,color:#12244a;
  classDef garde fill:#d4edda,stroke:#2e7d32,color:#1b5e20;
  class G1,G2,G3,CODE gisement;
  class S1,N sortie1;
  class S2,F sortie2;
  class X garde;
```

#### Descriptif du SVG à produire

Format paysage 1600 × 900. À gauche, un **grand cadre gris à trait plein** portant en titre
*« Votre système d'information »* et contenant quatre pastilles jaunes empilées — les trois
gisements et le code. Deux flèches **de largeurs et de couleurs franchement différentes** en
sortent vers la droite : une **flèche rouge épaisse et continue** vers le haut, légendée
**« SORTIE APPLICATIVE — permanente, antérieure à l'IA »**, qui aboutit à un bloc rouge *« service
tiers public et gratuit — aucun contrat »* ; une **flèche bleue, plus fine**, vers le bas, légendée
**« SORTIE DE DÉVELOPPEMENT — nouvelle, configurable »**, qui aboutit à un bloc bleu *« fournisseur
de modèle — contrat de sous-traitance, rétention configurée »*. Une **flèche pointillée verte**
part de la sortie bleue vers un encadré vert isolé : **`permissions.deny` dans
`.claude/settings.json`**, avec en dessous, en rouge et en petits caractères :
*« `.claudeignore` n'existe pas »*. L'asymétrie visuelle des deux flèches est **le message du
schéma** : celle que tout le monde regarde est la fine ; celle qui coule depuis toujours est
l'épaisse. Aucune icône décorative.

#### Explication du diagramme — notice de dévoilement

| Ordre | Ce qu'on affiche | La phrase à dire | Erreur à prévenir |
|---|---|---|---|
| 1 | **Le cadre de gauche seul** | « Voilà ce que contient votre système d'information sur ce produit. Quatre choses, et vous les avez toutes ouvertes ce matin. » | — |
| 2 | **La flèche bleue et son bloc** | « Voilà la sortie dont tout le monde parle depuis lundi : ce qui part vers le fournisseur du modèle quand vous promptez. Elle est nouvelle, elle est contractualisée, et elle se **configure**. » | Ne pas la dramatiser : c'est la sortie la mieux encadrée des deux. |
| 3 | **La flèche rouge et son bloc** *(sans commentaire pendant trois secondes)* | « Et voilà l'autre. Elle est plus grosse, elle est permanente, elle existait avant que vous n'installiez quoi que ce soit — et elle n'a **aucun** contrat derrière elle. » | C'est le retournement. Ne pas enchaîner tout de suite. |
| 4 | **La flèche pointillée verte** | « Le mécanisme d'exclusion s'appelle `permissions.deny`. Et je le redis une dernière fois de la semaine : `.claudeignore` n'existe pas. » | Ne pas laisser croire que l'exclusion règle la question : elle traite **une** des deux flèches. |
| 5 | **Le schéma complet** | « Votre section 5 de carnet de route doit décrire les deux. Un comité qui n'entend parler que de la bleue vous croira sur parole — et il aura tort. » | Fin du dévoilement. |

⚠️ **Erreur d'interprétation à prévenir.** Le schéma sera lu comme *« les services tiers gratuits
sont dangereux, il faut les supprimer »*. Le couper à l'étape 3 : *« la flèche rouge n'est pas une
faute : c'est une fonctionnalité du produit, et le contrat d'API l'écrit noir sur blanc. Ce qui est
fautif, c'est qu'elle ne figure dans aucun registre et que personne dans cette salle ne l'avait
citée. Une dépendance déclarée est un risque géré ; une dépendance oubliée est un incident qui
attend. »*

### ▸ ✅ Micro-évaluation — QCM éclair (3 questions)

**Q1.** Une équipe remplace toutes les adresses de courriel de son jeu de test par des identifiants
opaques, et conserve la table de correspondance dans un coffre. Comment qualifie-t-on ce jeu de
données ?

A. Anonymisé : les adresses n'y figurent plus · **B. Pseudonymisé : l'opération est réversible,
les données restent personnelles** · C. Fictif, au sens de la doctrine de l'autorité de contrôle ·
D. Hors RGPD, puisqu'il s'agit de données de test.

- **B est juste** : la pseudonymisation est **réversible** ; le caractère personnel des données est
  conservé.
- **A est faux** : l'anonymisation exige une impossibilité **irréversible** d'identification,
  évaluée sur trois critères — individualisation, corrélation, inférence. Une table de
  correspondance échoue au premier.
- **C est faux** : des données fictives ont la **structure** de données réelles sans être **liées à
  une personne**. Ici, elles le sont — par la table.
- **D est faux** : la finalité « test » ne crée aucun régime dérogatoire. C'est précisément
  pourquoi la doctrine recommande le **fictif** plutôt que la copie de production.

**Q2.** Au 07/2026, que peut-on affirmer du calendrier de l'AI Act ?

A. Tout a été reporté de 16 mois, y compris les règles de transparence · B. Le règlement modificatif
a été publié au JOUE le 7 mai 2026 · **C. Le 2 août 2026 reste inchangé pour l'article 50 ; seul le
haut risque est reporté — annexe III au 2 décembre 2027 — sur la base d'un accord politique en
attente d'adoption formelle** · D. Le calendrier de 2024 reste intégralement applicable.

- **C est juste** : c'est la formulation exacte, réserve comprise.
- **A est faux** : c'est l'erreur la plus fréquente. Les règles de transparence de l'article 50, les
  bacs à sable et le début de l'application effective **ne sont pas décalés**.
- **B est faux** : le **7 mai 2026** est la date d'un **accord politique** entre le Parlement et le
  Conseil, pas d'une publication. Confondre les deux est l'erreur qui décrédibilise le plus vite
  devant un juriste.
- **D est faux** : c'est ce qu'affiche le tracker le plus cité au monde, dont la date de mise à
  jour est **août 2024**. Il a été projeté en séance pour cette raison.

**Q3.** Une équipe active le « zéro rétention » chez son fournisseur d'API. Que peut-elle
légitimement écrire dans son carnet de route ?

A. « Aucune donnée n'est conservée par le fournisseur » · B. « Nos données sont anonymisées côté
fournisseur » · **C. « Le réglage s'applique aux points d'accès concernés ; des journaux de
surveillance des abus peuvent subsister, jusqu'à 30 jours selon le fournisseur »** · D. « Le RGPD
ne s'applique plus à ce traitement ».

- **C est juste** : le dispositif est **endpoint par endpoint**, et les journaux de surveillance des
  abus sont générés par défaut chez certains fournisseurs.
- **A est faux** : c'est le mythe central de la séquence. Le réglage ne couvre pas tous les points
  d'accès, et il ne supprime pas les journaux d'abus.
- **B est faux** : « ne pas conserver » et « anonymiser » sont deux opérations sans rapport. Aucune
  anonymisation n'est réalisée par le fait de ne pas stocker.
- **D est faux** : le régime RGPD dépend du traitement et du contrat de sous-traitance, jamais d'un
  réglage de rétention.

*Barème : 3/3 = 10 PR. Correction commentée à voix haute, moins de 60 secondes par question.*

### ▸ 🔗 Ressources

| Ressource | À qui elle s'adresse | Ce qu'il faut y lire précisément |
|---|---|---|
| *Règlement (UE) 2016/679 — RGPD, version française* — https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra | **La référence normative** | Les articles à ouvrir en séance : **5** (minimisation, limitation de conservation), **28** (sous-traitance), **32** (sécurité), **35** (analyse d'impact). La question « puis-je envoyer ce jeu de test à un modèle ? » se tranche article par article. |
| *IA : comment être en conformité avec le RGPD ?* (CNIL) — https://www.cnil.fr/fr/intelligence-artificielle/ia-comment-etre-en-conformite-avec-le-rgpd | Celui qui fabrique des jeux de test | La recommandation explicite des **données fictives** — « même structure que des données réelles sans être liées à une personne » — qui légitime le générateur à graine fixée de M1.3. |
| *L'anonymisation de données personnelles* (CNIL) — https://www.cnil.fr/fr/technologies/lanonymisation-de-donnees-personnelles | **La diapositive de la notion** | La distinction **irréversible / réversible** et le test à trois critères : individualisation, corrélation, inférence. Coupe court à « base de recette pseudonymisée = base anonyme ». |
| *Timeline for the Implementation of the EU AI Act* (Bureau IA / Commission) — https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act | **La seule source de calendrier à citer** | Les quatre jalons officiels, et le fait que **le 2 août 2026 n'a pas bougé** pour l'article 50 : seul le haut risque glisse. |
| *EU agrees to simplify AI rules…* (Commission, 7 mai 2026) — https://digital-strategy.ec.europa.eu/en/news/eu-agrees-simplify-ai-rules-boost-innovation-and-ban-nudification-apps-protect-citizens | Celui qui doit citer une date | Les deux dates exactes de l'accord politique : **2 décembre 2027** (annexe III) et **2 août 2028** (annexe I), sur la source officielle plutôt qu'un article de presse. |
| *Implementation Timeline* (tracker indépendant) — https://artificialintelligenceact.eu/implementation-timeline/ | **À projeter comme contre-exemple** | Sa date de mise à jour — « Last updated: 1 August 2024 » — et l'absence totale de l'omnibus. L'exercice « vérifier la date d'une source » se fait ici en direct, en dix secondes. |
| *Data Processing Addendum* (Anthropic) — https://www.anthropic.com/legal/data-processing-addendum | Celui qui doit contractualiser | Un article 28 réel à décortiquer : rôles responsable/sous-traitant, clauses contractuelles types, notification de violation **sous 48 heures**, suppression **sous 30 jours** après fin de contrat. |
| *Configure custom data retention controls* (Anthropic Privacy Center) — https://privacy.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans | Le chiffre choc de la séquence | **Par défaut, la rétention est indéfinie** tant qu'aucune durée n'est fixée ; le minimum configurable est **30 jours**. La rétention se configure, elle ne se présume pas. |
| *Data controls in the OpenAI platform* — https://developers.openai.com/api/docs/guides/your-data | Celui qui compare deux fournisseurs | Le « zéro rétention » **endpoint par endpoint**, et les journaux de surveillance des abus générés **par défaut**, conservés jusqu'à **30 jours**. |
| *IA agentique et données personnelles* (CNIL + CIANum, 20 juillet 2026) — https://www.cnil.fr/fr/ia-agentique-cnil-cianum-note | Celui qui exploite un agent | Les trois risques propres aux agents : circulation entre services connectés, **mémoires persistantes**, et **dilution des responsabilités**. Directement transposable à un agent qui lit le dépôt, appelle des serveurs MCP et écrit des fichiers. |

### ▸ ⚠️ Pièges d'animation

- **Ce qui rate habituellement** : la notion devient un cours de droit. Le descendant déborde, le
  groupe n'a plus que huit minutes et la grille reste vide. **Contre-mesure absolue** : minuteur
  visible sur les deux blocs descendants, **6 et 5 minutes**, et on s'arrête au milieu d'une phrase
  s'il le faut. Le fond juridique tient dans le tableau §Contenu ; il est écrit, il se lit après.
- **La question qui revient toujours** : *« est-ce qu'on a le droit d'utiliser l'IA sur du code
  client ? »* Réponse courte : *« la question n'est pas “l'IA”, c'est “quel contrat” et “quelles
  données”. Avec un contrat de sous-traitance et un périmètre de fichiers maîtrisé, oui. Avec un
  compte personnel et le dossier `data/mails/` ouvert, non — et ce n'était déjà pas le cas
  avant. »* Ne pas s'engager sur un cas d'entreprise particulier : renvoyer au DPO du participant.
- **Le formateur n'est pas juriste, et le dit.** Une fois, au début du bloc ②, sans se dévaloriser :
  *« je vous donne des faits sourcés et datés, pas un avis juridique. Ce que vous emportez, c'est
  la grille et les questions — votre DPO fera le reste, et il sera content qu'on la lui apporte
  remplie. »*
- **Le débat qui déraille** : la souveraineté. Il peut consommer vingt minutes et ne rien produire.
  Le borner d'entrée : *« deux minutes, et on redescend sur notre grille — parce que c'est elle qui
  vaut 25 points dans une heure. »*
- **Le signe qu'il faut passer à la suite** : dès qu'une cordée distingue spontanément « la sortie
  qui existait avant » de « la sortie qu'on vient d'ajouter », la notion est acquise. Clore
  l'arbitrage même si la grille n'est pas remplie partout — elle se termine pendant le col.

---

## 4. Clôture du module — le col final

Ce module d'après-midi ne se termine **pas** par un QCM long : conformément à
`00-gabarit-notion.md` §3, un module d'après-midi se ferme sur un **boss**. Celui-ci est le
dernier, et il vaut **200 Points de Repère** — le double des trois précédents.

> 🏔️ **BOSS FINAL — « Le Comité de mise en ligne »** · 16:15 → 17:15 · 60 min · 200 PR
> Scénario, cadre, gabarit du livrable, barème détaillé, corrigé de référence intégral, réponses
> attendues aux trois questions du comité et relances du formateur :
> **`boss/boss-J4-comite-mise-en-ligne.md`**.

**Les trois artefacts produits cet après-midi entrent directement dans le carnet de route.**

| Artefact | Produit en | Où il atterrit | Ce qu'il vaut au col |
|---|---|---|---|
| La **carte des risques** cotée probabilité × impact, avec le **risque résiduel déclaré** | M8.1 | Sections **2** et **7** | 40 PR + une partie des 25 PR de chiffrage |
| Le **jeu d'évaluations de non-régression** et son propriétaire nommé | M8.2 | Section **4** et **réponse à la question 2 du comité** | 35 PR + une part des 35 PR de réponses |
| La **grille de conformité** remplie sur le projet réel, avec les deux sorties du SI distinguées | M8.3 | Section **5** | 25 PR |

**La phrase de transition vers le col, et une seule :**

> *« Vous avez passé quatre jours à apprendre à ne pas vous mentir à vous-mêmes. Dans une heure,
> vous allez apprendre à ne pas mentir aux autres — ce qui est plus facile, parce que quelqu'un
> est en face pour vous contredire. Prenez vos trois artefacts. Le comité vous attend. »*


