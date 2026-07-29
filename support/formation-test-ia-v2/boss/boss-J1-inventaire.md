# 🏆 Col J1 — « L'Inventaire »

> **Jour 1 · 16:15 → 17:15 · 60 minutes · 100 Points de Repère**
> *Fin du module M2. On ne peut pas tester ce qu'on n'a pas cartographié.*
> Développement complet du §6.1 de `00-fil-rouge.md`.

**Document formateur.** Les sections **1**, **2**, **4** et **5** sont projetées ou distribuées aux
participants. Les sections **6**, **7** et **8** sont **strictement réservées au formateur** et ne
sont jamais affichées avant le débrief. Référence de vérité du terrain : `00-carte-du-terrain.md`.

---

## 1. Mise en situation — à lire à voix haute, sans commentaire

> *« Il est 16 h 15. Vous êtes arrivés ce matin sur un produit que vous ne connaissiez pas.
> Depuis, vous avez appris trois choses : qu'un test vert peut ne rien garantir, qu'une exigence
> a une adresse, et qu'un contrat se tait plus souvent qu'il ne parle.*
>
> *À 9 heures demain, le comité produit se réunit. Il ne veut pas savoir si vous êtes inquiets. Il
> veut savoir **dans quel état est ce produit** — et il veut le lire, pas l'entendre.*
>
> *Vous avez soixante minutes pour dresser l'inventaire. Une carte du terrain : ce qui est sain,
> ce qui n'est pas testé, ce qui ment, ce qui est bugué — et **la preuve de chaque case**. Une
> liste d'exigences, tracées au contrat. La liste de ce que le contrat ne dit pas. Et trois tests
> que vous suspectez, avec le motif.*
>
> *Une règle, une seule, et elle est absolue : **une case sans preuve ne vaut rien**. Vous pouvez
> écrire ce que vous voulez dans ce document. Ce qui sera compté, c'est ce que vous pouvez montrer.*
>
> *Bonne expédition. »*

**Après la lecture, le formateur ne reprend pas la parole pendant quatre minutes.** Le silence
initial fait partie de l'épreuve : les cordées doivent s'organiser seules. C'est la première chose
que le formateur observe (voir §7).

---

## 2. Cadre de l'épreuve

### 2.1 Ce qui est autorisé

| Ressource | Statut |
|---|---|
| Le dépôt *Carnet de voyage* dans son intégralité, y compris `backend/src/` | ✅ autorisé |
| `docs/API-CONTRACT.md` et `docs/stats.md` | ✅ autorisés |
| Les trois artefacts de la demi-journée : liste `EX-nnn`, grille de revue en 8 points, fiches de silence | ✅ **attendus sur la table** |
| Toute commande de test : `npm run test:backend`, `npm run e2e` | ✅ autorisées et encouragées |
| `curl`, un client HTTP, le backend démarré | ✅ autorisés |
| Un assistant IA, quel qu'il soit | ✅ autorisé — et **tracé** : voir la règle de traçabilité |
| Les notes de M1 et de M2 | ✅ autorisées |

### 2.2 Les trois règles

**Règle 1 — La preuve prime sur l'affirmation.** Une ligne de matrice sans preuve recevable vaut
**zéro**, même si son classement est juste. Trois formes de preuve sont recevables, et trois
seulement :

| Forme | Exemple |
|---|---|
| **Le nom d'un fichier de test** existant, avec son état d'exécution | `backend/src/steps/steps.add-order.spec.ts` — FAIL |
| **Une sortie de commande** collée telle quelle | `expected 400 "Bad Request", got 201 "Created"` |
| **Une ligne de `docs/API-CONTRACT.md`** citée entre guillemets, avec sa section | §Journeys, `PATCH /api/journeys/:id` : *« les steps ne doivent PAS être perdus »* |

**Règle 2 — Le commentaire `// BUG:` n'est pas une preuve.** Rien n'interdit de fouiller le code
source ; on peut y trouver des marqueurs. Mais un marqueur recopié depuis le code **ne prouve
rien** : c'est une déclaration de l'auteur du bug, pas un constat. Une ligne dont la seule preuve
est un commentaire du code source est cotée **zéro**. La preuve attendue est **l'exécution** — un
scénario joué, une sortie relue.

> 🔐 Cette règle est la contre-mesure au raccourci `grep -rn "BUG:" backend/src`. Elle est
> annoncée aux participants **sans nommer la commande**. Une cordée qui la trouve seule n'est pas
> sanctionnée : elle constatera simplement que la commande ne lui donne aucun point tant qu'elle
> n'a pas exécuté quelque chose. C'est exactement l'enseignement visé.

**Règle 3 — La traçabilité IA / humain.** Chaque section du livrable porte une mention en fin de
bloc : *« produit par : humain / IA relue / IA non relue »*. Le malus **« livrable collé d'un LLM
sans relecture, détecté au débrief » (−20 PR)** s'applique. La mention honnête ne coûte rien ;
l'omission détectée coûte le malus plein.

### 2.3 Les rôles dans la cordée

| Rôle | Mission | Rotation |
|---|---|---|
| **Le Cartographe** | Tient la matrice des 16 lignes. **Refuse toute case sans preuve.** | Fixe pendant l'épreuve |
| **Le Prouveur** | Au clavier : exécute les suites, joue les scénarios, colle les sorties | Rotation à 30 min |
| **Le Rédacteur** | Tient `carnet/j1-inventaire.md`, garantit qu'un non-technicien peut le lire | Fixe |

En cordée de deux, le Cartographe assure aussi la rédaction. En configuration à trois cordées
solo (groupe de 3), l'entraide est autorisée et rapporte **+10 PR** à la cordée qui aide, si
l'aide est validée par la cordée aidée.

### 2.4 Ce qui est interdit

- Modifier un test existant, quel qu'il soit. L'épreuve est un **inventaire**, pas une réparation.
  Un test modifié déclenche les malus du Lest (`−40 PR` pour un `.skip` ou une assertion ajustée).
- Corriger un bug du code de production. Même motif : ce n'est pas le col d'aujourd'hui.
- Rendre un document dont une section entière est une sortie de LLM non relue.

---

## 3. Déroulé minuté — les six phases

| Phase | Temps | Ce que fait la cordée | Ce que fait le formateur |
|---|---|---|---|
| **0 — Le briefing** | **0-4** *(4)* | Écoute, s'organise, répartit les rôles, ouvre les trois artefacts de la demi-journée | Lit la mise en situation à voix haute. Distribue le gabarit de `carnet/j1-inventaire.md` et la fiche de barème. **Puis se tait quatre minutes.** |
| **1 — La reconnaissance** | **4-19** *(15)* | Établit l'état des **16 fonctionnalités** par l'exécution : lance `npm run test:backend`, relève les suites et leur verdict, lance `npm run e2e` si le temps le permet, croise avec `docs/stats.md`. Remplit la matrice, colonne « preuve » comprise | Circule. **Ne valide aucune case.** Relance unique à 10 min : *« combien de vos seize lignes ont une preuve exécutée, et non une preuve lue ? »* |
| **2 — Le relevé des exigences** | **19-34** *(15)* | Complète la liste `EX-nnn` de M2.1 : §Journeys et §Steps, statut, type de test, priorité. Vise ≥ 90 % de couverture du contrat | Circule. Relance à 27 min : *« votre liste couvre-t-elle le bloc des types, ou seulement les routes ? »* |
| **3 — Les silences** | **34-46** *(12)* | Reprend les fiches de silence de M2.3, les corrige après le tri de la phase ②, en ajoute sur le reste du contrat (§Auth, §Places, §Map). Écarte explicitement au moins un faux silence | Circule. Relance à 41 min : *« vous en avez combien qui ne portent pas sur un code d'erreur ? »* |
| **4 — Les trois suspects** | **46-54** *(8)* | Désigne trois tests suspects, applique la grille en 8 points à chacun, **démontre** au moins un cas par une exécution | Circule. **Une seule mise en garde publique**, à 47 min, à toute la salle : *« attention à ne pas confondre un test suspect et un test rouge. »* Ne développe pas |
| **5 — La mise au propre** | **54-58** *(4)* | Le Rédacteur relit le document entier. Vérifie : chaque case porte sa preuve, chaque section porte sa mention de traçabilité, le résumé d'ouverture est lisible par un non-technicien | Annonce le temps restant à 58 min et à 59 min, à voix haute |
| **6 — Le dépôt** | **58-60** *(2)* | Enregistre `carnet/j1-inventaire.md` dans le dépôt partagé. Annonce à voix haute : « déposé » | Note l'heure de dépôt de chaque cordée. Aucun dépôt après 60 min |

**Contrôle : 4 + 15 + 15 + 12 + 8 + 4 + 2 = 60 min ✓**

> **Le pari d'allocation, à annoncer à la phase 0.** *« Vous avez quinze minutes pour la matrice
> et huit pour les suspects. Ce n'est pas une erreur de ma part : la matrice pèse 30 points et les
> suspects 20. Les cordées qui finissent dernières sont celles qui passent quarante minutes sur la
> matrice. »* Cette phrase économise dix minutes à au moins une cordée.

---

## 4. Le livrable — `carnet/j1-inventaire.md`

### 4.1 Format exact — gabarit à distribuer

````markdown
# Inventaire du terrain — Carnet de voyage
Cordée : ...............   Date : ..........   Heure de dépôt : ..........
Membres : ..............................................................

## 0. En une page, pour le comité
> Trois à cinq phrases, sans jargon. Ce qu'on sait, ce qu'on ne sait pas, ce qui inquiète.
> Un chiffre au maximum par phrase.

...........................................................................

## 1. La matrice du terrain — 16 fonctionnalités

Légende : 🟢 sain et testé · ⚪ non testé · 🟡 testé mais le test ment · 🔴 bugué
Une fonctionnalité peut porter deux états (exemple : 🔴 + 🟡).

| #  | Fonctionnalité | Zone | État | Preuve (fichier de test / sortie de commande / ligne de contrat) |
|----|----------------|------|------|------------------------------------------------------------------|
| 1  |                |      |      |                                                                  |
| 2  |                |      |      |                                                                  |
| …  |                |      |      |                                                                  |
| 16 |                |      |      |                                                                  |

Produit par : humain / IA relue / IA non relue

## 2. Les exigences testables

| #      | Exigence | Source (section + route) | Statut | Type de test | Priorité |
|--------|----------|--------------------------|--------|--------------|----------|
| EX-001 |          |                          | ✅/🟨/⛔ | TU/API/E2E/CTR | H/M/B  |

Nombre d'exigences extraites : ......   Sections couvertes : ......................

Produit par : humain / IA relue / IA non relue

## 3. Les ambiguïtés du contrat

| #      | Objet | Ce que le contrat dit | Ce qu'il ne dit pas | Question au métier (fermée) | Coût |
|--------|-------|-----------------------|---------------------|------------------------------|------|
| SIL-1  |       |                       |                     |                              | ⭐⭐⭐  |

### Faux silences écartés
| Fiche envisagée | Où la réponse se trouvait en réalité |
|-----------------|--------------------------------------|
|                 |                                      |

Produit par : humain / IA relue / IA non relue

## 4. Les trois tests suspects

### Suspect n° 1 — <chemin du fichier>
- **Motif du soupçon** : ...............................................
- **Cotation** : R1 = .. · R2 = .. · R3 = .. · R4 = ..   → verdict : ..........
- **Démonstration** *(sortie de commande ou scénario joué, collée telle quelle)* :
```
...
```

### Suspect n° 2 — <chemin du fichier>
(idem)

### Suspect n° 3 — <chemin du fichier>
(idem)

Produit par : humain / IA relue / IA non relue

## 5. Ce que nous n'avons pas pu établir
> Honnêteté du rapport. Ce qui reste inconnu, et pourquoi.
...........................................................................
````

### 4.2 Les quatre exigences de forme

1. **La section 0 se lit sans le reste.** C'est la seule que le comité lira sûrement. Un jargon
   non défini y coûte le critère de format.
2. **Aucune case vide dans la matrice.** Une fonctionnalité non traitée s'écrit *« non établi »*
   en section 5, pas en blanc dans le tableau.
3. **Les preuves sont collées, pas résumées.** *« la suite échoue »* n'est pas une preuve ; les
   trois lignes de sortie du runner en sont une.
4. **La section 5 rapporte des points.** Elle n'est pas un aveu de faiblesse : une cordée qui
   écrit *« nous n'avons pas pu établir l'état de la feature #16, faute de source externe »*
   montre qu'elle a compris ce qu'elle cherchait.

---

## 5. Barème détaillé — 100 PR

> Le barème est **distribué aux participants à la phase 0**. Une épreuve dont le barème est caché
> mesure la devinette, pas la compétence.

### 5.1 Critère 1 — La matrice, chaque classement prouvé — **30 PR**

| Sous-critère | Détail | PR |
|---|---|---|
| **Complétude** | Les 16 lignes sont renseignées, zone comprise. 6 PR si les 16 y sont ; 3 PR de 12 à 15 ; 0 en dessous de 12 | **6** |
| **Justesse des états** | **1 PR par ligne dont l'état est conforme à la référence §6.1**, plafonné à 12. Une ligne à double état (#6, #7, #8, #11) n'est juste que si les **deux** états y figurent | **12** |
| **Recevabilité des preuves** | Barème par tranche du nombre de lignes portant une preuve recevable au sens de la règle 1 : **12 PR** si ≥ 14 lignes · 9 PR de 11 à 13 · 6 PR de 8 à 10 · 3 PR de 5 à 7 · 0 en dessous | **12** |
| | **Total** | **30** |

> **Précision d'arbitrage.** Une preuve **lue** (une ligne de `docs/stats.md`) est recevable pour
> les fonctionnalités ⚪ *(« aucun test n'existe »)*, où l'absence ne s'exécute pas. Elle n'est
> **pas** recevable pour les états 🔴 et 🟡, qui exigent une **exécution**. Cette asymétrie est
> annoncée au briefing.

### 5.2 Critère 2 — Les exigences extraites et statuées — **25 PR**

Référence : la liste de 28 exigences de `module-M2-de-l-exigence-au-test.md` §M2.1.

| Couverture atteinte | Condition supplémentaire | PR |
|---|---|---|
| ≥ 90 % *(≥ 25 exigences sur 28)* | **toutes** portent un statut et une source | **25** |
| 75 à 89 % *(21 à 24)* | idem | **18** |
| 60 à 74 % *(17 à 20)* | idem | **12** |
| 40 à 59 % *(11 à 16)* | idem | **6** |
| < 40 % | — | **0** |

**Malus interne** : **−4 PR** si aucune exigence ne provient du bloc *Types partagés* — c'est le
signe d'une lecture par routes uniquement. **−4 PR** si aucun statut 🟨 ou ⛔ n'apparaît : une
liste où tout est testable est une liste qui n'a pas été statuée.
**Bonus interne** : **+3 PR** *(dans la limite des 25)* si `EX-004`, `EX-017` ou `EX-028` figure —
les trois exigences que presque personne n'écrit.

### 5.3 Critère 3 — Les ambiguïtés réelles — **20 PR**

| Sous-critère | Détail | PR |
|---|---|---|
| **Silences réels** | **3 PR par silence réel** figurant dans la liste de référence §6.3, plafonné à **18**. Un silence hors liste mais authentique est accepté au même tarif, sur arbitrage du formateur | **18** |
| **Lucidité** | **2 PR** si au moins un **faux silence** est explicitement écarté, avec l'endroit où la réponse se trouvait | **2** |
| **Malus** | **−2 PR par faux silence présenté comme réel**, plancher à 0 pour ce critère | — |
| | **Total** | **20** |

> **La question fermée est une condition, pas un bonus.** Un silence réel dont la question est
> ouverte (*« comment gère-t-on les dates ? »*) vaut **1 PR au lieu de 3**. Le critère se contrôle
> à l'œil : la question doit se terminer par une alternative.

### 5.4 Critère 4 — Trois tests suspects, avec démonstration — **20 PR**

| Sous-critère | Détail | PR |
|---|---|---|
| **Désignation** | **4 PR par suspect** conforme à la référence §6.4, plafonné à 12 | **12** |
| **Démonstration** | **8 PR** si **au moins un** suspect est démontré par une exécution dont la sortie est collée. 4 PR si la démonstration est décrite mais non collée. 0 si aucune | **8** |
| **Malus** | **−4 PR** si un **test rouge légitime** est présenté comme suspect *(voir le piège du col, §6.4)* | — |
| | **Total** | **20** |

### 5.5 Critère 5 — Format exploitable par un non-technicien — **5 PR**

| Vérification | PR |
|---|---|
| La section 0 existe, fait 3 à 5 phrases, et ne contient aucun terme technique non défini | 2 |
| Les mentions de traçabilité IA / humain sont présentes sur les quatre sections | 2 |
| La section 5 *(« ce que nous n'avons pas pu établir »)* est renseignée et non vide | 1 |

### 5.6 Bonus et malus

| Motif | PR |
|---|---|
| 🎯 **Bonus** — un défaut **non listé dans l'énoncé**, découvert **et prouvé par un test rouge** écrit pendant l'épreuve | **+40** |
| Aide à une autre cordée, validée par elle | **+10** |
| Test mis en `.skip` ou supprimé pour faire passer la suite | **−40** |
| Test tautologique livré | **−30** |
| Couverture augmentée sans une seule assertion nouvelle | **−25** |
| Livrable collé d'un LLM sans relecture, détecté au débrief | **−20** |
| Test laissant des fichiers `.md` résiduels dans le magasin | **−20** |
| Appel réel à Nominatim ou OSRM dans un test unitaire écrit pendant l'épreuve | **−20** |

> **Sur le bonus de +40.** Il est atteignable : les bugs **#9**, **#14** et **#16** ne sont
> **listés nulle part** dans les supports remis aux participants, et aucun test ne les couvre. Une
> cordée qui écrit, pendant les soixante minutes, un test rouge qui prouve `endDate` ignoré ou
> `authorId` nul touche le bonus. Statistiquement, cela arrive dans une session sur trois — et
> c'est ce qui rend le col mémorable.

### 5.7 Badges attribuables à l'issue du col

| Badge | Condition exacte |
|---|---|
| 🧭 **Le Cartographe** | Première cordée à rendre une zone complète — toutes ses fonctionnalités classées **avec preuve** |
| 🔦 **L'Éclaireur** | Première cordée à prouver un bug par un test rouge écrit pendant l'épreuve |
| 🪤 **Le Démineur** | *(reporté de M1 si non attribué)* démasquer un test qui ment **et** expliquer pourquoi il ment |
| 🎓 **Le Guide** | Avoir aidé une autre cordée, jugé clair par elle |

---

## 6. 🔐 Corrigé de référence — **RÉSERVÉ FORMATEUR**

> **Ne jamais projeter avant le débrief.** Cette section est l'oracle du col.

### 6.1 La matrice des 16 fonctionnalités — état réel et preuve de chaque classement

| # | Fonctionnalité | Zone | État de référence | **La preuve recevable** | Preuve **non** recevable |
|---|---|---|---|---|---|
| **1** | Création de compte | Z1 | 🟢 | La suite unitaire de la fonctionnalité passe, **et** chacun de ses `expect` se rattache à §Auth `POST /api/auth/register` : *« 201 → `{ id, email, name }` »*, *« 409 si l'email existe déjà »* | « elle est verte » — le vert seul ne classe rien depuis M1.1 |
| **2** | Login | Z1 | 🟢 **double** | TU **et** E2E verts, attendus tracés sur *« 200 → `{ accessToken, user: { id, email, name } }` »* et *« 401 si identifiants invalides »*. C'est **l'étalon absolu du dépôt** | Citer un seul des deux niveaux : l'état « double » exige les deux |
| **3** | Récupération de mot de passe | Z1 · Z4 | ⚪ | Une recherche produite en preuve montrant qu'aucun fichier de test du dépôt ne porte sur `forgot-password` ni `reset-password`. La ligne de `docs/stats.md` est recevable ici *(fonctionnalité ⚪)* | Une affirmation sans recherche jointe |
| **4** | Liste des journeys | Z2 · Z6 | 🟢/⚪ **asymétrique** | **Le couple** : un E2E existe et passe, **et** aucune suite unitaire back n'existe. La preuve est l'asymétrie elle-même | Classer 🟢 sur la seule foi de l'E2E vert — c'est l'erreur la plus fréquente du col |
| **5** | Détail d'une journey | Z2 | ⚪ | Aucun test, à tous les niveaux. Le contrat, lui, est explicite : *« 200 → `Journey` complet (avec `steps[]`, `comments[]`) »* — donc `EX-005` existe et n'est couverte par rien | — |
| **6** | **Création d'une journey** | Z2 | 🔴 **+ test rouge légitime** | La sortie : `FAIL backend/src/journeys/journeys.create-validation.spec.ts` · `expected 400 "Bad Request", got 201 "Created"`, **plus** la ligne du contrat *« 400 si `endDate < startDate` »* | La sortie seule, sans la ligne de contrat : elle ne dit pas **qui** a tort |
| **7** | **Modification d'une journey** | Z2 | 🟡 **+** 🔴 | **La paire, et elle seule** : (a) `journeys.update.spec.ts` est **vert** ; (b) le scénario réel — créer un voyage, ajouter une étape, `PATCH` le titre, relire le voyage : `steps` est vide. Plus la ligne *« les steps ne doivent PAS être perdus »* | Le seul état 🟡 sans le 🔴, ou l'inverse. Les deux se prouvent, et ils ne se prouvent pas de la même façon |
| **8** | **Ajout d'une étape** | Z3 | 🔴 **+ deux rouges légitimes** | Les deux sorties : `FAIL backend/src/steps/steps.add-order.spec.ts` et `FAIL e2e/tests/add-step-order.spec.ts`, plus la ligne *« ajouté **à la fin** de `steps[]` »*. **La preuve exige deux insertions** — avec une seule étape, rien ne se voit | Une seule des deux sorties : l'intérêt pédagogique du cas est le **double niveau** |
| **9** | **Modification d'une étape** | Z3 | 🔴 **silencieux, non testé** | Un scénario joué : `PATCH` d'une étape avec `endDate` modifiée → 200 → relecture du voyage → **`endDate` inchangée**. La preuve est le **diff entre le corps envoyé et le corps relu**. Aucun test n'existe sur cette fonctionnalité | Le statut 200 : il est **correct**, et c'est tout le problème. Une cordée qui conclut « ça marche, elle répond 200 » a le comportement que le bug exploite |
| **10** | Upload de photos sur une étape | Z3 · Z4 | ⚪ | Aucun test. Effet de bord constatable dans `/uploads/`, et contrat explicite sur le chemin relatif | — |
| **11** | **Recherche de lieu (géocodage)** | Z5 | ⚪ **+** 🟡 **instable** | **La répétition, et rien d'autre** : *n* exécutions de `e2e/tests/place-search.spec.ts` sur un code **inchangé**, *k* échecs. Deux exécutions ne prouvent rien ; dix commencent à parler | Un échec unique — il ne distingue pas l'instabilité d'un bug. **Fait remarquable à souligner : la fonctionnalité #11 n'a aucun bug.** L'échec ne dit rien du produit |
| **12** | Notation d'une journey | Z2 | ⚪ | Aucun test, alors que l'exigence existe : `PATCH /api/journeys/:id` accepte `rating?`, de type `number \| null` | — |
| **13** | Commentaires sur une journey | Z2 | ⚪ | Aucun test, route contractualisée : *« 201 → `Journey` mis à jour avec le nouveau commentaire dans `comments[]` »* | — |
| **14** | **Commentaires sur une étape** | Z3 | 🔴 **silencieux, non testé** | Un scénario joué : ajout d'un commentaire sur une étape → relecture → **`authorId` vaut `null`**, alors que `type Step` déclare `authorId: string`, **sans `\| null`**. La preuve est la **confrontation réponse / type** | `toBeDefined()` — vrai sur `null`. C'est précisément l'assertion que l'IA génère, et elle ne prouve rien |
| **15** | Carte — visualisation | Z6 | ⚪ | Aucun test front, aucun E2E | — |
| **16** | **Carte — itinéraire** | Z5 | 🔴 **subtil, non testé** | **Ne se prouve pas par lecture du code.** Preuve recevable : la confrontation à la **documentation d'OSRM** (l'API attend `lng,lat` ; le service envoie `lat,lng`), **plus** un appel dont le tracé retourné est géographiquement aberrant. L'API répond **200 avec une polyline valide** | Toute preuve interne au système. Une relecture par LLM du fichier **valide** le code : le savoir manquant est **externe** |

#### Ce que chaque niveau de cordée atteint réellement en 60 minutes

| Difficulté | Lignes concernées | Attendu |
|---|---|---|
| **Atteignable par toute cordée** | 1 · 2 · 3 · 5 · 6 · 8 · 10 · 12 · 13 · 15 | **10 lignes sur 16.** L'exécution de `npm run test:backend` et la lecture de `docs/stats.md` y suffisent |
| **Atteignable par une bonne cordée** | 4 *(l'asymétrie)* · 7 *(vu en M1.1, donc acquis)* · 11 *(exige la répétition)* | **13 lignes sur 16** |
| **Rarement atteint en 60 min** | **9 · 14 · 16** | Ce sont **les trois bugs silencieux et non testés**. Aucun test ne les signale, aucune sortie de commande ne les révèle, et le contrat ne les dénonce qu'à qui le lit ligne à ligne |

> 🎯 **C'est la mesure du débrief.** Les lignes 9, 14 et 16 sont exactement celles que
> `grep -rn "BUG:" backend/src` donne en une seconde. Le débrief de §8 consiste à révéler la
> commande, puis à compter combien de cordées avaient trouvé chacune des trois **sans elle**.
> La conclusion n'est pas « vous avez raté trois lignes » : c'est **« aucune commande ne remplace
> une source externe »** — le bug #16 n'est dans aucun grep de qui ne connaît pas OSRM.

### 6.2 Les exigences attendues

La liste de référence complète — **28 exigences**, `EX-001` à `EX-028` — figure dans
`module-M2-de-l-exigence-au-test.md`, §M2.1, *La liste de référence*. Elle n'est pas recopiée ici :
elle doit rester un document unique, sous peine de divergence.

**Ce que le formateur vérifie en trente secondes, par ordre de valeur.**

| Contrôle | Où regarder | Ce que ça révèle |
|---|---|---|
| **Le nombre** | Le compteur en bas de la section 2 | En dessous de 17, la lecture a été partielle |
| **La présence d'exigences issues des types** | Chercher une source citée `§Types partagés` | Son absence est le signe le plus fiable d'une lecture par routes |
| **La présence d'au moins un ⛔** | Colonne Statut | Une liste 100 % testable n'a pas été statuée |
| **`EX-008`, `EX-013`, `EX-020`, `EX-025`, `EX-028`** | Les cinq exigences qui portent un bug | Une cordée qui les a **toutes** possède, sans le savoir, la clé de cinq des six bugs |
| **`EX-004`, `EX-017`, `EX-028`** | Les trois exigences rares | Marqueur d'excellence — le bonus de +3 PR |

### 6.3 Les ambiguïtés réelles

La liste complète — **neuf silences réels**, `SIL-1` à `SIL-9`, plus les silences mal formulés et
les faux silences — figure dans `module-M2-de-l-exigence-au-test.md`, §M2.3, *Les silences de la
zone Z3*. Le col en étend le périmètre au **contrat entier**. Les silences supplémentaires
recevables, hors Z3 :

| # | Section | Le silence | Question fermée | Coût |
|---|---|---|---|---|
| **SIL-10** | §Journeys | Aucune pagination n'est spécifiée sur `GET /api/journeys` | *La liste est-elle paginée : oui, avec quels paramètres / non ?* | ⭐⭐ |
| **SIL-11** | §Auth | La durée de validité du jeton d'accès n'est pas donnée. Seul le jeton de réinitialisation porte une expiration explicite — *« expiration : 1h »* | *Quelle est la durée de validité du `accessToken` ?* | ⭐⭐ |
| **SIL-12** | §Auth | Aucune politique de mot de passe : longueur, complexité, réponse en cas de refus | *Quelle est la politique de mot de passe, et quel code retourne un mot de passe refusé ?* | ⭐⭐⭐ |
| **SIL-13** | §Places | Le comportement lorsque Nominatim est indisponible ou limite le débit n'est pas spécifié | *Que retourne `GET /api/places/search` si le service tiers ne répond pas : 502 / 200 avec liste vide / 504 ?* | ⭐⭐⭐ |
| **SIL-14** | §Map | Le comportement en cas d'échec d'OSRM, et le nombre minimal de points requis, ne sont pas spécifiés | *Combien de points minimum `POST /api/map/route` exige-t-il, et que retourne-t-il en cas d'échec du tiers ?* | ⭐⭐ |
| **SIL-15** | §Auth · Z4 | Le contrat spécifie l'écriture de `data/mails/{timestamp}-{email}.md` mais ne dit rien de la **rétention** ni de la protection de ce répertoire — qui contient des adresses et des jetons | *Ce répertoire est-il purgé, et sous quel délai ?* | ⭐⭐⭐ |

> **`SIL-15` est le silence à mettre en avant au débrief.** Il ne coûte pas un test : il coûte une
> non-conformité. C'est le pont explicite avec la notion **M8.3 — Conformité** du jour 4. Une
> cordée qui l'écrit mérite d'être citée.

**Les faux silences les plus fréquents au col**, dans l'ordre de fréquence observée : le format
des dates *(préambule)* · le type de `lat`/`lng` *(types partagés)* · le caractère facultatif de
`startDate` sur une étape *(types partagés)* · le nombre de résultats de la recherche de lieu
*(« max 5 résultats », §Places)* · le mode de stockage des données *(hors périmètre d'un contrat
d'API)*.

### 6.4 Les trois tests suspects

#### Les deux réponses attendues

| Suspect | Fichier | Motif exact | La démonstration recevable |
|---|---|---|---|
| **n° 1** | `backend/src/journeys/journeys.update.spec.ts` | **Faux positif par sur-mock.** La couche de sauvegarde est entièrement doublée et le double **réinjecte les `steps` d'origine** dans le résultat attendu : la logique de merge, qui porte le bug #7, n'est jamais exécutée. Cotation attendue : **`R1` = 0, `R2` = 0 → REFUSÉE** | Le scénario réel joué et sa sortie collée : le voyage relu après `PATCH` ne contient plus ses étapes, alors que la suite est verte |
| **n° 2** | `e2e/tests/place-search.spec.ts` | **Instabilité native.** Aucun double réseau : le test interroge le **vrai** Nominatim et assertit un **texte exact**. Latence, limitation de débit ou reformulation du libellé côté OSM le font tomber **sans que rien n'ait changé chez nous**. Cotation attendue : **`R7` = 0** ; `R1` et `R2` passent, ce qui en fait un cas différent du n° 1 | La **répétition** : *n* exécutions sur code inchangé, *k* échecs. C'est la seule preuve d'instabilité qui existe |

#### Le troisième suspect — question ouverte, deux réponses recevables

| Réponse | Motif | Recevabilité |
|---|---|---|
| **L'E2E de la feature #4** *(liste des journeys)* | Il est vert, il est le **seul** test de la fonctionnalité, et aucune suite unitaire n'existe. Il prouve que la page s'affiche ; il ne prouve **pas** `EX-002` — que la liste ne contienne que les voyages de l'utilisateur connecté. **Il garantit moins qu'il n'en a l'air.** Cotation : `R5` = 0 | ✅ **La meilleure réponse.** Elle mobilise la traçabilité aux exigences, c'est-à-dire l'apport propre de la journée |
| `e2e/tests/add-step-order.spec.ts` | Non parce qu'il ment — il est **juste** — mais parce qu'il **coûte cher pour une preuve déjà obtenue** au niveau unitaire par `steps.add-order.spec.ts`. Suspect de **redondance de niveau**, pas de mensonge | ✅ Recevable **à condition** que l'argument soit exactement celui-là. Si la cordée écrit « il est rouge donc suspect », la réponse est refusée et le malus de −4 PR s'applique |

#### 🪤 Le piège du col

**Une cordée sur deux désigne `journeys.create-validation.spec.ts` comme suspect, parce qu'il est
rouge.** C'est l'erreur que tout le col est construit pour faire apparaître.

L'arbitrage se donne en trois phrases, au débrief, sans ironie :

> *« Ce test est rouge parce que le contrat dit 400 et que le produit répond 201. Il fait
> exactement son travail. Un test suspect est un test dont on doute de la **valeur** ; un test
> rouge est un test dont on a la **preuve** qu'il en a une. Ce sont deux catégories opposées, et
> les confondre coûte cher : la première réaction devant un rouge, en entreprise, c'est de vouloir
> le faire passer. C'est le malus le plus lourd du barème — moins quarante. »*

Les trois tests rouges légitimes du dépôt — `journeys.create-validation.spec.ts`,
`steps.add-order.spec.ts` et `e2e/tests/add-step-order.spec.ts` — **ne se réparent pas : ils se
défendent.**

---

## 7. 🔐 Ce que le formateur observe pendant l'épreuve

> Le col n'est pas un temps mort pour le formateur. C'est son meilleur poste d'observation de la
> journée : les quatre notions du matin et de l'après-midi s'y vérifient en conditions réelles.

### 7.1 La grille d'observation

| Ce qu'on observe | Signe que la notion est passée | Signe qu'elle n'est pas passée | Notion concernée |
|---|---|---|---|
| **Les quatre premières minutes** | La cordée répartit les rôles et ouvre ses trois artefacts avant de toucher au clavier | Une personne ouvre le terminal, les autres regardent | Règle des rôles tournants |
| **Le premier geste technique** | `npm run test:backend` — on établit l'état avant de lire | Ouverture de `backend/src/` et lecture du code de production | M1.4 — l'oracle |
| **Le vocabulaire employé** | « son oracle, c'est… », « il ne peut pas échouer », « c'est un faux silence » | « ce test est nul », « ça a l'air bon » | M1.1, M1.4, M2.3 |
| **La colonne Preuve** | Elle se remplit **en même temps** que la colonne État | Elle est laissée vide « pour la fin » — elle ne sera jamais remplie | Règle 1 du col |
| **Le traitement de la feature #11** | La cordée **relance** le test plusieurs fois | Elle le lance une fois et conclut | M1.3, et M6.2 par anticipation |
| **Le traitement des features #9 et #14** | La cordée **relit** la réponse après l'appel | Elle regarde le code HTTP et passe | M2.2 — la ligne `R4` |
| **L'usage de l'IA** | Le résultat est relu, corrigé, et la mention de traçabilité est renseignée | Un tableau de 16 lignes apparaît en une minute, sans preuve | Malus −20 PR |

### 7.2 Les relances — quoi dire, quand, et à qui

> **Principe** : une relance est une **question**, jamais une indication. Elle s'adresse à une
> cordée, à voix normale ; les autres l'entendent ou non. Les deux relances marquées 📢 sont les
> seules qui s'adressent à toute la salle.

| Minute | Situation observée | La relance, mot pour mot |
|---|---|---|
| **8** | Une cordée lit le code de production depuis quatre minutes | *« Qu'est-ce que vous cherchez exactement dans ce fichier ? Et si vous le trouvez, qu'est-ce que ça prouvera ? »* |
| **10** | 📢 Toute la salle | *« Combien de vos seize lignes ont une preuve **exécutée**, et non une preuve **lue** ? »* |
| **14** | Une cordée a classé la feature #4 en 🟢 | *« Votre preuve, c'est l'E2E. Il prouve quoi, au juste ? Relisez `EX-002`. »* |
| **17** | Une cordée n'a pas ouvert `docs/stats.md` | *« Il existe un document dans ce dépôt qui vous donne dix de vos seize lignes. Vous l'avez lu ce matin. »* |
| **22** | Une cordée recopie sa liste `EX-nnn` sans la compléter | *« Combien de routes le contrat comporte-t-il, et combien votre liste en couvre-t-elle ? »* |
| **27** | 📢 Toute la salle | *« Votre liste d'exigences couvre-t-elle le bloc des types, ou seulement les routes ? »* |
| **33** | Une cordée annonce avoir « fini » les exigences en dix minutes | *« Vous en avez combien ? … Le contrat en contient plus. Lesquelles avez-vous écartées, et pourquoi ? »* |
| **38** | Une cordée n'écrit que des silences sur les codes d'erreur | *« Vous en avez combien qui ne portent **pas** sur un code d'erreur ? »* |
| **41** | Une cordée bute sur la formulation d'une question | *« Terminez votre question par “oui ou non”. Si vous n'y arrivez pas, c'est que vous n'avez pas encore isolé le silence. »* |
| **47** | 📢 Toute la salle, **une seule fois, sans développer** | *« Attention à ne pas confondre un test suspect et un test rouge. »* |
| **50** | Une cordée a désigné trois suspects sans en démontrer aucun | *« Lequel des trois pouvez-vous me **montrer** en deux minutes ? Faites celui-là. »* |
| **56** | Une cordée rédige encore la matrice | *« Arrêtez la matrice. Écrivez la section 0. C'est la seule page que le comité lira. »* |

### 7.3 Les trois incidents prévisibles et leur traitement

| Incident | Traitement |
|---|---|
| **Une cordée découvre `grep -rn "BUG:"` et remplit six lignes en trente secondes** | Ne pas l'interdire, ne pas la féliciter. Une phrase : *« très bien. Maintenant, montrez-m'en un. »* La règle 2 fait le reste : sans exécution, aucune de ces six lignes ne rapporte de point. La cordée le découvre seule, et c'est la meilleure leçon du col |
| **Une cordée modifie un test pour « vérifier »** | Arrêter immédiatement, sans dramatiser : *« restaurez le fichier. On inventorie, on ne répare pas. »* Si la modification est déposée dans le livrable, le malus s'applique |
| **Une cordée est bloquée à 30 minutes avec une matrice vide** | Débloquer par une question fermée : *« combien de suites `npm run test:backend` exécute-t-il, et combien échouent ? Écrivez ces deux chiffres. »* Cela donne quatre lignes immédiatement et relance la dynamique |

---

## 8. 🔐 Le débrief — 15 minutes

> **C'est le moment le plus important de la journée.** L'épreuve produit un document ; le débrief
> produit l'apprentissage. Il se tient **debout, devant le mur** où les matrices sont affichées.

### 8.1 Déroulé minuté

| Temps | Ce que fait le formateur | Ce que font les participants |
|---|---|---|
| **0-3** *(3)* | **LES SCORES BRUTS, SANS COMMENTAIRE.** Annonce le score de chaque cordée, critère par critère, en 60 secondes chacune. **Aucun commentaire de qualité.** Inscrit dans `CARNET-DE-BORD.md` | Écoutent, notent leur score. Les écarts entre cordées portent presque toujours sur le critère 1 — la **preuve**, pas le classement |
| **3-6** *(3)* | **LA RÉVÉLATION.** Se tourne vers l'écran et tape une seule commande, sans l'annoncer : `grep -rn "BUG:" backend/src`. Laisse la sortie à l'écran **cinq secondes en silence**. Puis : *« six lignes. Une seconde. Vous venez d'y passer une heure. »* Marque un temps. Puis, et c'est la phrase qui compte : *« et maintenant, je vais vous montrer pourquoi cette commande ne vaut rien. »* | Réagissent — la réaction est vive, et elle doit l'être. Certains sont agacés. C'est le bon état pour la suite |
| **6-11** *(5)* | **LA MESURE.** Passe les six bugs un par un. Pour chacun, une seule question à la salle : *« qui l'avait, avec une preuve exécutée ? »* Compte les mains, écrit le compte au tableau à côté du numéro du bug. Le tableau se remplit et il parle tout seul (voir §8.2) | Lèvent la main, comptent, découvrent la forme du résultat : les bugs prouvés par un test rouge sont trouvés par tout le monde ; les bugs silencieux, par personne ou presque |
| **11-14** *(3)* | **LES TROIS SUSPECTS ET LE PIÈGE.** Donne la réponse de référence en 90 secondes. Puis traite le piège du test rouge, avec les trois phrases du §6.4. Ne nomme aucune cordée | Réagissent. C'est ici que le malus de −40 PR du barème général devient concret et cesse d'être une règle abstraite |
| **14-15** *(1)* | **BADGES ET TRANSITION.** Remet les badges. Une phrase de transition vers le J2, et une seule | Applaudissent, rangent. La journée est finie |

**Contrôle : 3 + 3 + 5 + 3 + 1 = 15 min ✓**

### 8.2 Le tableau de la mesure — ce qu'on écrit au tableau, et ce qu'il démontre

| Bug | Ce qui le prouve dans le dépôt | Cordées l'ayant trouvé **sans** le `grep` | Ce que le chiffre démontre |
|---|---|---|---|
| **#6** — validation de dates | Un test **rouge** existe | **Toutes** | Un test rouge est un dispositif de détection qui fonctionne. C'est même le seul du dépôt |
| **#8** — `unshift` au lieu de `push` | **Deux** tests rouges, TU et E2E | **Toutes** | Idem — et le double niveau n'a rien apporté de plus. Une observation à garder pour le J3 |
| **#7** — le `PATCH` perd les `steps` | Un test **vert** qui ment | **Toutes** — mais parce qu'on le leur a montré ce matin | **La question honnête à poser** : *« l'auriez-vous trouvé sans M1.1 ? »* Le silence qui suit est la meilleure réponse |
| **#9** — `endDate` ignoré | **Rien** | 0 à 1 | Un bug qui répond 200 ne se voit qu'en **relisant la réponse**. C'est un geste, pas un outil |
| **#14** — `authorId` toujours `null` | **Rien** — sinon une ligne de type | 0 à 1 | Le **type** est un oracle. Il faut l'avoir lu, et il faut assertir autre chose que `toBeDefined()` |
| **#16** — coordonnées inversées | **Rien**, et le `grep` ne suffit pas | **0**, presque toujours | 🎯 **Le point d'arrivée du débrief.** Même avec la commande, personne ne comprend ce que « lat,lng au lieu de lng,lat » veut dire sans avoir lu la documentation d'OSRM. **Le savoir manquant est externe au dépôt.** Aucune commande, aucun agent, aucune relecture par LLM ne le donne |

### 8.3 Les trois phrases du débrief

À dire dans cet ordre, à la fin de la mesure. Ce sont les seules phrases du col qui doivent être
dites **mot pour mot**.

> **1.** *« La commande vous donne six numéros de ligne. Elle ne vous donne aucune preuve, aucun
> scénario, et aucune idée de ce que ça coûte au client. C'est pour ça qu'elle ne rapporte pas de
> points. »*
>
> **2.** *« Regardez la colonne du milieu. Les trois bugs que tout le monde a trouvés sont les
> trois qui portaient déjà un test. Les trois que personne n'a trouvés sont les trois qui n'en
> portaient aucun. Un dépôt ne vous montre que ce qu'il a déjà décidé de regarder. »*
>
> **3.** *« Et le dernier, le seize, personne ne l'a. Même avec la commande, vous ne l'auriez pas
> compris. Il faut la documentation d'OSRM, qui n'est pas dans ce dépôt. Retenez celui-là : c'est
> le seul bug de la journée qu'aucun outil ne vous donnera. »*

### 8.4 La transition vers le jour 2

> *« Vous savez maintenant dans quel état est ce produit, et vous savez le prouver. Demain matin,
> on change de main : on arrête de constater, on commence à produire. Et la première question sera
> celle que vous vous posez depuis ce matin — **comment on lui parle pour obtenir autre chose que
> du plausible.** »*

---

## 9. Repli et incidents matériels

| Incident | Repli |
|---|---|
| Le backend ne démarre sur aucun poste | Le col se joue **sans exécution** : la matrice se fonde sur `docs/stats.md` et le contrat. Le critère 1 est ramené à 20 PR *(complétude 6 + justesse 12 + preuves lues 2)*, et le critère 4 à 12 PR *(désignation seule)*. Le total du col passe à **82 PR**, annoncé au briefing. **Ne jamais laisser croire que le barème est resté le même** |
| Playwright n'est pas installé | La feature #11 se traite par la lecture de `docs/stats.md` et du fichier de test. L'état 🟡 reste établissable ; seule la **preuve par répétition** devient indisponible, et cela s'écrit en section 5 du livrable |
| Une cordée termine à 45 minutes | Ne pas donner de travail supplémentaire. Une seule question : *« combien de vos seize lignes ont une preuve exécutée ? »* Dans neuf cas sur dix, elle repart travailler |
| Le temps déborde | Sacrifier la phase 5 *(mise au propre)*, jamais la phase 4 *(les suspects)*. Le critère de format vaut 5 PR, celui des suspects en vaut 20 |
| Deux cordées seulement | Le débrief conserve la même structure ; le comptage des mains de §8.2 devient un comptage de cordées. L'effet du tableau est intact |
