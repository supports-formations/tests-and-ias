# 🏆 Col J3 — « Le Passage difficile »

> **Jour 3 · 16:15 → 17:15 · 60 minutes · 100 Points de Repère**
> *Fin du module M6. La voie est rouge. On ne contourne pas, on stabilise.*
> Développement complet du §6.3 de `00-fil-rouge.md`.

**Document formateur.** Les sections **1**, **2**, **3**, **4** et **5** sont projetées ou
distribuées aux participants. Les sections **6**, **7** et **8** sont **strictement réservées au
formateur** et ne sont jamais affichées avant le débrief. Référence de vérité du terrain :
`00-carte-du-terrain.md`. État nominatif de la suite : `docs/stats.md`.

> ⚠️ **Le cœur pédagogique de ce col, en une phrase, à lire avant de l'animer.**
> Ce col ressemble à une épreuve de remise au vert. **Il n'en est pas une.** Deux tests du dépôt
> sont rouges **et justes** — ils prouvent des défauts réels du produit — et un troisième est
> vert **et faux**. Une cordée qui optimise le nombre de tests verts « répare » les premiers et
> ignore le second : elle finit avec une suite entièrement verte et **zéro preuve**. Une cordée
> qui a compris finit avec une suite qui compte **plus de rouges qu'au départ**, et un document qui
> explique chacun d'eux. C'est la seconde qui franchit le col.

---

## 1. Mise en situation — à lire à voix haute, sans commentaire

> *« Il est 16 h 15. Depuis lundi, cette suite est rouge et personne dans l'équipe ne sait
> vraiment pourquoi. Ce matin, vous avez appris à faire travailler un agent. Cet après-midi, vous
> avez appris à nommer cinq sortes d'échec et à écrire le pipeline qui les rend visibles.*
>
> *Ce soir, la voie doit être franchissable.*
>
> *Voilà ce qu'on vous demande, et voilà ce qu'on ne vous demande pas. On ne vous demande pas une
> suite verte : n'importe qui peut rendre une suite verte en une minute, et vous savez très bien
> comment. On vous demande **une suite dont plus aucun échec n'est inexpliqué**.*
>
> *Chaque échec de cette suite appartient à l'une des cinq catégories que vous avez classées il y
> a deux heures. Pour chacun, je veux la catégorie, le signal qui vous a fait trancher, le geste
> que vous avez posé — ou la raison pour laquelle vous n'en avez posé aucun.*
>
> *Trois règles, et elles sont absolues. **Aucun `.skip`. Aucune suppression. Aucune assertion
> ajustée pour verdir.** Si vous les enfreignez, le barème s'en occupera tout seul.*
>
> *Et une dernière chose, que je vous dis maintenant parce que vous ne me croiriez pas dans
> cinquante minutes : **il y a dans cette suite des rouges que vous n'avez pas le droit de faire
> disparaître.** Ce sont les plus précieux. À vous de trouver lesquels.*
>
> *Bonne ascension. »*

**Après la lecture, le formateur ne reprend pas la parole pendant quatre minutes.** Le silence
initial fait partie de l'épreuve : les cordées doivent décider seules par où commencer. C'est la
première chose que le formateur observe (voir §7).

---

## 2. Cadre de l'épreuve

### 2.1 Ce qui est autorisé

| Ressource | Statut |
|---|---|
| Le dépôt *Carnet de voyage* dans son intégralité, `backend/src/` compris | ✅ autorisé |
| `docs/API-CONTRACT.md` et `docs/stats.md` | ✅ autorisés — ce sont les **oracles** de l'épreuve |
| Les trois artefacts de la demi-journée : arbre de classement, parade en deux fréquences, workflow en six blocs | ✅ **attendus sur la table** |
| Toute commande de test : `npm run test:backend`, `npm run e2e`, `npx playwright test <fichier>` | ✅ autorisées et encouragées |
| `git status`, `git diff`, l'exécution répétée, la coupure réseau | ✅ **ce sont les instruments de preuve de ce col** |
| **Modifier le code de production** (`backend/src/...`) | ✅ **autorisé — et c'est nouveau.** Voir la règle 3 |
| Écrire ou réécrire un double de test | ✅ autorisé |
| Un assistant IA, quel qu'il soit | ✅ autorisé — et **tracé** : voir la règle 4 |
| Les notes de M1, M5 et M6 | ✅ autorisées |

### 2.2 Les quatre règles

**Règle 1 — « Au vert » ne veut pas dire « tout vert ».** C'est la règle qui décide de l'épreuve,
et elle est projetée en gros caractères pendant les soixante minutes :

> ***La voie est franchie quand il ne reste plus un seul échec inexpliqué.***
> Un test rouge accompagné de sa catégorie, de son signal et de sa preuve **ne pénalise pas**.
> Un test vert dont personne ne sait dire d'où vient l'attendu **pénalise**.

Trois états d'arrivée sont recevables pour un artefact donné, et un seul est disqualifiant :

| État d'arrivée | Recevable ? |
|---|---|
| **Vert, et l'oracle est extérieur au code** | ✅ Oui — c'est l'idéal |
| **Rouge, classé 🔴, avec preuve du défaut et fiche ouverte** | ✅ Oui — pleinement compté |
| **Rouge, classé et documenté, avec une raison écrite de ne pas avoir agi dans l'heure** | ✅ Oui, partiellement compté |
| **Vert obtenu par `.skip`, suppression, ou assertion ajustée** | ❌ Non — malus du Lest |

**Règle 2 — La preuve prime sur l'affirmation.** Une ligne du post-mortem sans preuve recevable
vaut **zéro**, même si son classement est juste. Quatre formes de preuve sont recevables, et
quatre seulement — ce sont les **manipulations** de M6.1 :

| Forme | Ce qu'elle prouve | Exemple |
|---|---|---|
| **Une sortie de commande collée telle quelle** | Le verdict et sa stabilité | `expected 400 "Bad Request", got 201 "Created"` |
| **Un décompte de N exécutions**, N ≥ 20 | L'instabilité (🌀) | `13 PASS / 7 FAIL sur 20` |
| **Un `git status` avant et après** | Le résidu de magasin (📁) | deux blocs collés côte à côte |
| **Une ligne de `docs/API-CONTRACT.md`** citée entre guillemets, avec sa section | L'admissibilité de l'oracle (🔴 contre 🟡) | §Journeys, `POST /api/journeys` : *« 400 si `endDate < startDate` »* |

**Règle 3 — Le code de production peut être modifié, à une condition.** Ce col est le premier où
c'est autorisé : au col J1 c'était interdit (on inventoriait), au col J2 l'agent devait s'en
abstenir sans validation. Ici, la condition est la suivante :

> **On ne corrige un défaut du produit qu'après avoir un test rouge qui le prouve.**
> Le test rouge d'abord, la correction ensuite. Jamais l'inverse.

Une correction de code sans test rouge préalable ne rapporte rien : elle est invérifiable. Une
correction de code **précédée** du test rouge qui la motive vaut le plein des points, parce que
c'est exactement l'enchaînement que M1.4 a posé — *le rouge accuse le code, on corrige le code*.

> 🔐 **Ce que cette règle produit, et pourquoi elle est écrite ainsi.** Elle rend légitime le
> passage au vert des tests rouges du dépôt — **mais uniquement par le bon chemin**. Une cordée
> qui corrige `backend/src/steps/steps.service.ts` fait passer deux tests au vert **sans avoir
> touché à une seule assertion** : c'est le parcours maximal. Une cordée qui n'a pas le temps
> documente et laisse rouge : c'est le parcours honnête. Les deux franchissent le col. Le seul
> parcours qui échoue est celui qui touche à l'assertion.

**Règle 4 — La traçabilité IA / humain.** Chaque ligne du post-mortem porte une mention en fin de
bloc : *« produit par : humain / IA relue / IA non relue »*. Le malus **« livrable collé d'un LLM
sans relecture, détecté au débrief » (−20 PR)** s'applique. La mention honnête ne coûte rien ;
l'omission détectée coûte le malus plein.

> 🔐 **Rappel à faire à l'ouverture, sans le nommer.** `grep -rn "BUG:" backend/src` a été
> révélée au débrief du col J1 : elle n'est plus secrète. Elle reste **irrecevable comme preuve**,
> exactement comme au col J1 : *« un marqueur recopié depuis le code est une déclaration de
> l'auteur du bug, pas un constat. La preuve attendue est une exécution. »*

### 2.3 Les rôles dans la cordée

| Rôle | Mission | Rotation |
|---|---|---|
| **Le Manipulateur** | Au clavier. Exécute, répète, isole, coupe le réseau. **Seul autorisé à produire une preuve.** | Rotation à 30 min |
| **Le Greffier** | Tient `carnet/j3-post-mortem.md`. **Refuse toute ligne sans preuve collée.** Tient aussi le décompte : combien d'échecs restent inexpliqués ? | Fixe |
| **Le Gardien** | Surveille les interdits. Relit chaque `git diff` avant qu'il soit gardé et refuse tout `.skip`, toute suppression, toute assertion modifiée. | Fixe |

En cordée de deux, le Greffier assure aussi le rôle de Gardien. En configuration à trois cordées
solo (groupe de 3), l'entraide est autorisée et rapporte **+10 PR** à la cordée qui aide, si l'aide
est validée par la cordée aidée.

### 2.4 Ce qui est interdit

- **Mettre un test en `.skip`, l'annoter pour l'ignorer, ou le supprimer.** Malus **−40 PR**.
- **Modifier l'assertion d'un test dont l'oracle est le contrat**, pour quelque raison que ce
  soit. Malus **−40 PR**.
- **Ajouter un `retry` global** — dans la configuration Playwright, dans la ligne de commande, ou
  dans le workflow — pour masquer l'instabilité. Malus **−50 PR**, le plus lourd du col.
- **Laisser un appel réel à Nominatim ou OSRM** dans la suite qui tourne à chaque exécution.
  Malus **−20 PR**.
- **Rendre un post-mortem dont une section entière est une sortie de LLM non relue.**
  Malus **−20 PR**.

---

## 3. Déroulé minuté — les sept phases

| Phase | Temps | Ce que fait la cordée | Ce que fait le formateur |
|---|---|---|---|
| **0 — Le briefing** | **0-4** *(4)* | Écoute. S'organise, répartit les trois rôles, sort les trois artefacts de la demi-journée. Décide par où commencer. | Lit la mise en situation à voix haute. Distribue le gabarit de `carnet/j3-post-mortem.md` et la fiche de barème. **Puis se tait quatre minutes.** |
| **1 — Le relevé** | **4-14** *(10)* | Établit **la liste exhaustive des artefacts à traiter**, avant tout classement : lance `npm run test:backend`, note les suites vertes **et** rouges, lance `npm run e2e`, note les fichiers, puis `git status`. Le Greffier ouvre une ligne par artefact. | Circule. **Ne valide rien.** Relance unique à 8 min, à la salle entière : *« combien de lignes avez-vous ouvertes ? Est-ce que les vertes en font partie ? »* |
| **2 — Le classement** | **14-26** *(12)* | Passe chaque ligne dans l'arbre de M6.1. Pour chacune : la catégorie, **le signal** — donc la manipulation — et la preuve collée. C'est ici que la répétition de 20 exécutions et la coupure réseau se font. | Circule. Relance à 20 min : *« lesquelles de vos lignes ont un signal qui est une manipulation, et lesquelles ont un signal qui est une opinion ? »* |
| **3 — Les gestes** | **26-42** *(16)* | Pose les gestes, dans l'ordre de coût croissant : neutralisation du tiers (double), isolation du magasin (répertoire par exécution), réécriture du test faux. Puis, **s'il reste du temps**, correction du code sur les défauts prouvés. | Circule. **Une seule mise en garde publique**, à 30 min, à toute la salle : *« si votre nombre de tests rouges n'a pas augmenté à un moment de cette heure, posez-vous une question. »* Ne développe pas. |
| **4 — La preuve** | **42-52** *(10)* | Rejoue tout. Relance la suite complète deux fois de suite **sans nettoyer**. Relance le fichier instable 20 fois. Fait `git status`. Colle les sorties d'arrivée en face des sorties de départ dans le post-mortem. | Circule. Relance à 48 min : *« vos preuves d'arrivée sont-elles de la même nature que vos preuves de départ ? »* |
| **5 — La mise au propre** | **52-58** *(6)* | Le Greffier relit le document entier : chaque ligne a sa catégorie, son signal, sa preuve, son geste, sa mention de traçabilité. Le Gardien relit le `git diff` complet et signe qu'aucun interdit n'a été franchi. | Annonce le temps restant à 55 min et à 59 min, à voix haute. |
| **6 — Le dépôt** | **58-60** *(2)* | Enregistre `carnet/j3-post-mortem.md` et le `git diff` dans le dépôt partagé. Annonce à voix haute : « déposé ». | Note l'heure de dépôt de chaque cordée. Aucun dépôt après 60 min. |

**Contrôle : 4 + 10 + 12 + 16 + 10 + 6 + 2 = 60 min ✓**

> **Le pari d'allocation, à annoncer à la phase 0.** *« Vous avez douze minutes pour classer et
> seize pour agir. Ce n'est pas une erreur de ma part : le classement pèse 30 points, exactement
> comme la voie franchie. Les cordées qui finissent dernières sont celles qui commencent par
> réparer. »* Cette phrase économise dix minutes à au moins une cordée.

---

## 4. Le livrable

### 4.1 Ce qui est rendu — deux artefacts

1. **L'état du dépôt** — le `git diff` complet de l'heure, sans `.skip`, sans suppression, sans
   assertion modifiée.
2. **`carnet/j3-post-mortem.md`** — le document qui classe **chaque** échec dans les cinq
   catégories, avec sa preuve et son geste.

### 4.2 Format exact — gabarit à distribuer

````markdown
# Post-mortem de la voie — Carnet de voyage · Jour 3
Cordée : ...............   Date : ..........   Heure de dépôt : ..........
Membres : ..............................................................

## 0. En une page, pour l'équipe
> Trois à cinq phrases, sans jargon. Combien d'échecs au départ, combien à l'arrivée,
> combien restent — et pourquoi ceux qui restent sont là volontairement.

...........................................................................

Nombre d'artefacts relevés : ....   dont verts au départ : ....
Échecs restant à l'arrivée : ....   dont EXPLIQUÉS et ASSUMÉS : ....
Échecs inexpliqués à l'arrivée : ....        ← cette case doit valoir 0

## 1. Le tableau des échecs — une ligne par artefact

Catégories : 🔴 vrai bug produit · 🟡 test faux · 🌀 instable · 🌍 extérieur · 📁 magasin
Un artefact peut porter DEUX catégories.

| Artefact (chemin exact) | Verdict départ | Catégorie | Signal — la manipulation | Preuve (collée) | Geste posé | Verdict arrivée |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |

Produit par : humain / IA relue / IA non relue

## 2. Les rouges que nous avons choisi de garder
> Pour chaque test rouge encore rouge à l'arrivée : pourquoi il est juste,
> quelle ligne du contrat le fonde, et ce qu'il prouverait si on le supprimait.

### Rouge conservé n° 1 — <chemin du fichier>
- Ligne du contrat qui fonde l'attendu : « ............................... »
- Ce que ce rouge prouve : ...............................................
- Ce qu'on perdrait en le verdissant autrement que par le code : .........

## 3. Le monde extérieur — ce que nous avons neutralisé
> Les deux artefacts de la parade, avec leur fréquence et leur propriétaire.

| Artefact | Où il vit | Fréquence | Propriétaire |
|---|---|---|---|
| Le double | | à chaque exécution | |
| Le test de contrat | | rare / planifié | |

Preuve que plus aucun appel réel n'est émis dans la suite courante : ......

## 4. Le magasin — l'isolation rétablie
```
git status --short AVANT :        git status --short APRÈS :
..............................    ..............................
```
Mécanisme d'isolation retenu : ..........................................

## 5. Ce que nous n'avons pas pu faire, et pourquoi
> Liste honnête. Une dette écrite vaut mieux qu'un oubli silencieux.
> Elle sera reprise dans le carnet de route du J4.

## 6. Traçabilité IA / humain
| Section | Produit par | Relu par |
|---|---|---|
````

### 4.3 Les quatre exigences de forme

1. **Une ligne par artefact, y compris les verts.** Un tableau qui ne contient que des rouges est
   incomplet par construction : la catégorie 🟡 s'applique à un test vert.
2. **La preuve est collée, jamais résumée.** *« ça échoue tout le temps »* n'est pas une preuve ;
   la sortie du runner en est une.
3. **Le signal est une manipulation.** *« c'est clairement un bug »* n'est pas un signal ;
   *« 20 exécutions, 20 échecs, même sortie »* en est un.
4. **La case « échecs inexpliqués à l'arrivée » vaut 0.** C'est la définition de la voie franchie.
   Si elle ne vaut pas 0, le document le dit — et c'est encore mieux que de mentir.

---

## 5. Barème détaillé — 100 PR

| Critère | PR |
|---|---|
| **C1** — Voie franchie : aucun échec inexpliqué, sans `.skip` ni suppression | 30 |
| **C2** — Classement correct des échecs, avec preuve par catégorie | 30 |
| **C3** — Neutralisation propre du monde extérieur (double, pas `retry`) | 20 |
| **C4** — Isolation du magasin rétablie — `git status` propre après exécution | 15 |
| **C5** — Temps d'exécution de la suite réduit | 5 |
| **Bonus** — un défaut non listé dans l'énoncé, découvert et prouvé par un test rouge | **+40** |
| **Malus** — `retry` global ajouté pour masquer l'instabilité | **−50** |
| **Malus** — test mis en `.skip`, supprimé, ou assertion ajustée | **−40** |
| **Malus** — appel réel à Nominatim ou OSRM dans la suite courante | **−20** |
| **Malus** — livrable collé d'un LLM sans relecture | **−20** |

### 5.1 Critère C1 — La voie franchie — **30 PR**

| Sous-critère | PR |
|---|---|
| Tous les artefacts de la suite sont **relevés**, verts compris | 6 |
| Chaque échec restant porte une catégorie, un signal et une preuve | 12 |
| La case « échecs inexpliqués » vaut **0**, et c'est vérifiable | 6 |
| Aucun `.skip`, aucune suppression, aucune assertion modifiée — vérifié au `git diff` | 6 |

> ⚠️ **La lecture à ne pas faire.** Ce critère **ne compte pas les tests verts**. Une cordée dont
> la suite comporte trois rouges expliqués et prouvés obtient **30/30**. Une cordée dont la suite
> est entièrement verte parce qu'elle a ajusté deux assertions obtient **0/30** — et **−40 PR**
> en plus. Le formateur l'annonce à la phase 0 et le répète au débrief.

### 5.2 Critère C2 — Le classement, avec preuve par catégorie — **30 PR**

| Sous-critère | PR |
|---|---|
| Les 🔴 sont identifiés **et** la ligne de contrat qui les fonde est citée | 8 |
| Le 🟡 est identifié — **y compris s'il est vert** | 8 |
| Le 🌀 est prouvé par un décompte d'au moins **20 exécutions** | 6 |
| Le 🌍 est distingué du 🌀 par une manipulation (coupure réseau, ou substitution du tiers) | 4 |
| Le 📁 est prouvé par un `git status` avant / après **ou** par un changement d'ordre d'exécution | 4 |

> **La cordée qui rate ce critère est presque toujours celle qui a classé à la lecture.** Le
> signal le plus fréquemment manquant est celui du 🌀 : un décompte de trois exécutions ne prouve
> rien, et se voit immédiatement.

### 5.3 Critère C3 — La neutralisation du monde extérieur — **20 PR**

| Sous-critère | PR |
|---|---|
| Un **double** neutralise l'appel réel dans la suite qui tourne à chaque exécution | 8 |
| Un **test de contrat séparé** existe, qui interroge le vrai tiers | 6 |
| Ce test de contrat porte une **fréquence explicite** et **n'arrête aucune contribution** | 4 |
| Le double est **versionné** : sa réponse de référence est dans le dépôt, pas improvisée | 2 |

> **Un `retry` ici ne vaut pas zéro : il vaut −50.** Le critère et le malus se cumulent. C'est le
> seul endroit du barème de l'expédition où un geste coûte plus que ce que sa réussite rapporte —
> et c'est délibéré.

### 5.4 Critère C4 — L'isolation du magasin — **15 PR**

| Sous-critère | PR |
|---|---|
| `git status` est **propre** après une exécution complète de la suite | 6 |
| Le mécanisme d'isolation est **par exécution**, pas par convention de nommage | 5 |
| Deux exécutions consécutives **sans nettoyage manuel** donnent le même résultat | 4 |

> Ce critère ouvre le badge 🧹 **Le Gardien du magasin**.

### 5.5 Critère C5 — Le temps d'exécution — **5 PR**

| Sous-critère | PR |
|---|---|
| Le temps de la suite est **mesuré** avant et après, et les deux chiffres sont dans le document | 3 |
| Le temps a **diminué**, et la cordée sait dire **par quel geste** | 2 |

> **Le gain vient presque toujours du double**, pas d'une optimisation : supprimer un appel réseau
> réel supprime la latence d'un tiers public. Une cordée qui l'explique ainsi obtient les 5 PR
> même si le gain est modeste. Une cordée qui a gagné du temps en exécutant moins de tests ne les
> obtient pas.

### 5.6 Bonus et malus

**Le bonus (+40 PR).** Le dépôt contient des défauts **non détectés par la suite actuelle** :
`docs/stats.md` en liste six au total, dont trois seulement sont couverts par un test. Une cordée
qui, dans l'heure, écrit un test rouge prouvant un défaut **qui n'était prouvé par personne**
obtient le bonus. C'est le parcours des cordées rapides, et il vaut mieux que n'importe quelle
optimisation de temps d'exécution.

**Les malus, appliqués sans discussion, au `git diff`.**

| Infraction | Comment elle se détecte | Malus |
|---|---|---|
| `retry` global | Recherche de `retries` dans la configuration Playwright, la ligne de commande, le workflow | **−50** |
| `.skip`, annotation d'exclusion, suppression de fichier ou de cas | `git diff` sur les fichiers de test | **−40** |
| Assertion modifiée sur un test dont l'oracle est le contrat | `git diff` sur les lignes `expect` | **−40** |
| Appel réel au tiers dans la suite courante | Exécution hors ligne : la suite doit passer | **−20** |
| Livrable non relu | Lecture du post-mortem au débrief, questions de contrôle | **−20** |

### 5.7 Badges attribuables à l'issue du col

| Badge | Condition exacte au col J3 |
|---|---|
| 🧊 **Le Stabilisateur** | Avoir éliminé la **cause racine** de l'instabilité — un double versionné — et l'avoir prouvé par 20 exécutions vertes consécutives |
| 🎭 **Le Doubleur** | Avoir neutralisé proprement le tiers **et** monté le test de contrat séparé, avec sa fréquence |
| 🧹 **Le Gardien du magasin** | `git status` propre après exécution complète, deux fois de suite |
| 🪤 **Le Démineur** | Avoir démasqué le test **vert** qui ment, et l'avoir réécrit jusqu'à ce qu'il devienne rouge |
| 🔦 **L'Éclaireur** | Avoir prouvé par un test rouge un défaut que la suite ne prouvait pas *(donne aussi le bonus +40)* |

---

## 6. 🔐 Corrigé de référence — **RÉSERVÉ FORMATEUR**

> **Ne jamais projeter avant le débrief.** Ce corrigé s'appuie **exclusivement** sur les artefacts
> réellement présents dans le dépôt, tels que `docs/stats.md` les nomme. Aucun fichier de test
> n'est inventé ; les fichiers **à créer** par les cordées sont explicitement signalés comme tels,
> et leur nom est une **proposition**, pas une exigence.

### 6.0 L'inventaire de départ — ce que la cordée doit relever en phase 1

| # | Artefact | Verdict de départ | Source |
|---|---|---|---|
| **1** | `backend/src/journeys/journeys.create-validation.spec.ts` | **FAIL** | `stats.md` §Tests intentionnellement rouges |
| **2** | `backend/src/steps/steps.add-order.spec.ts` | **FAIL** | idem |
| **3** | `e2e/tests/add-step-order.spec.ts` | **FAIL** | idem |
| **4** | `backend/src/journeys/journeys.update.spec.ts` | **PASS** | `stats.md` §Tests volontairement buggés |
| **5** | `e2e/tests/place-search.spec.ts` | **PASS / FAIL selon l'exécution** | idem |
| **6** | *Le résidu du magasin* — pas un fichier de test, un **état** | visible à `git status` | Z4, `00-fil-rouge.md` §3.2 |
| **7** | Les suites unitaires de **Z1** — features #1 *Création de compte* et #2 *Login* | **PASS** | `stats.md`, colonnes TU complets |

> 📌 **Note de préparation, à traiter la veille.** `docs/stats.md` annonce **4 suites** au back,
> dont 2 en échec, et nomme explicitement trois fichiers : les deux rouges (#1 et #2 ci-dessus) et
> le faux positif (#4). **Le formateur relève la veille la composition exacte des quatre suites**
> et le chemin des suites vertes de Z1 : ces chemins ne sont pas figés dans le support, exactement
> comme en M1.4. Seuls les cinq fichiers nommés ci-dessus sont garantis par la documentation du
> dépôt, et ce sont les seuls que le corrigé exploite.

**Le décompte attendu.** Une cordée qui a compris relève **7 lignes**, dont **3 vertes** — les
lignes 4 et 7. Une cordée qui n'a pas compris en relève **3** : celles qui sont rouges à l'écran.
C'est le premier discriminant du col, et il se lit en trente secondes sur le tableau du
post-mortem.

---

### 6.1 🔴 Artefact 1 — `backend/src/journeys/journeys.create-validation.spec.ts`

| | |
|---|---|
| **Verdict de départ** | **FAIL** — `expected 400 "Bad Request", got 201 "Created"` |
| **Catégorie** | 🔴 **Vrai bug produit** — défaut #6 |
| **Le signal attendu** | **Deux manipulations, cumulées.** ① 20 exécutions : 20 échecs identiques, à la sortie près → l'échec est **stable**, donc branche droite de l'arbre. ② Ouverture de `docs/API-CONTRACT.md`, §Journeys : *« 400 si `endDate < startDate` (validation attendue) »* → l'attendu vient d'une source **extérieure au code**. |
| **Preuve recevable** | La sortie du runner collée **plus** la ligne du contrat entre guillemets. L'une sans l'autre ne suffit pas : la sortie seule ne dit pas qui a tort. |
| **Le geste — ce qu'il ne faut PAS faire** | Ajuster l'assertion de `400` vers `201`. Ce serait adopter le code comme oracle, détruire la seule preuve du défaut #6, et déclencher **−40 PR**. |
| **Le geste attendu — parcours minimal** | Classer, prouver, **laisser rouge**, et ouvrir une fiche de défaut dans la section 2 du post-mortem. **Ce parcours vaut le plein des points de C1 et C2.** |
| **Le geste attendu — parcours maximal** | Corriger `backend/src/journeys/journeys.service.ts` : ajouter la validation de dates. Le test passe au vert **sans qu'une seule ligne de test ait été touchée**. C'est l'enchaînement de la règle 3 : *le test rouge d'abord, la correction ensuite.* |

**La correction de référence, si la cordée a le temps** — deux lignes dans le service, en
TypeScript :

```ts
// backend/src/journeys/journeys.service.ts — extrait de la création
// Le contrat (§Journeys, POST /api/journeys) : « 400 si endDate < startDate ».
// L'oracle est extérieur au code : c'est lui qui décide, pas l'implémentation actuelle.
create(dto: CreateJourneyDto): Journey {
  if (new Date(dto.endDate) < new Date(dto.startDate)) {
    throw new BadRequestException('endDate must not be before startDate');
  }
  // … suite inchangée
}
```

> **Ce que le formateur observe ici.** Le moment où une cordée demande *« on a le droit de toucher
> au code ? »* est un moment pédagogique. La réponse est dans la règle 3, et elle se donne sans
> commentaire : *« oui, après le test rouge. Jamais avant. »* Une cordée qui corrige le service
> **sans** avoir d'abord collé la sortie rouge n'a rien prouvé : elle a fait une modification de
> confort.

---

### 6.2 🔴 Artefacts 2 et 3 — `steps.add-order.spec.ts` et `e2e/tests/add-step-order.spec.ts`

| | |
|---|---|
| **Verdict de départ** | **FAIL** tous les deux — le test attend l'étape ajoutée en **dernière** position de `steps[]`, elle est en **première** |
| **Catégorie** | 🔴 **Vrai bug produit** — défaut #8, `unshift` au lieu de `push` dans `backend/src/steps/steps.service.ts` |
| **Le signal attendu** | Échec **stable** aux deux niveaux **et** ligne de contrat, §Steps, `POST /api/journeys/:journeyId/steps` : *« ajouté **à la fin** de `steps[]` »*. Le signal secondaire, qui vaut d'être relevé : **le même défaut est prouvé deux fois, à deux coûts différents** — le TU en quelques millisecondes, l'E2E en plusieurs secondes de navigateur. |
| **Preuve recevable** | Les deux sorties collées, plus la ligne du contrat. |
| **Le piège de ce col** | Une cordée pressée traite les deux comme **un doublon** et en supprime un « puisqu'ils testent la même chose ». C'est une **suppression** : **−40 PR**. Le doublon n'en est pas un : c'est une redondance de preuve à deux niveaux, et c'est ce qui permettra, au J4, de répondre à la question du comité sur le coût de chaque niveau de test. |
| **Le geste attendu — parcours minimal** | Classer les deux, prouver les deux, laisser rouges, une fiche de défaut commune dans la section 2. |
| **Le geste attendu — parcours maximal** | Corriger `backend/src/steps/steps.service.ts` : remplacer l'insertion en tête par une insertion en queue. **Les deux tests passent au vert simultanément**, sans qu'aucune assertion n'ait bougé — et c'est la meilleure démonstration possible que le rouge accusait bien le code. |

**La correction de référence** — une ligne, en TypeScript :

```ts
// backend/src/steps/steps.service.ts — extrait de l'ajout d'étape
// Le contrat (§Steps) : « ajouté à la fin de steps[] ».
// Un seul step ne révèle rien : il faut DEUX insertions pour que l'ordre soit
// observable. C'est exactement le cas que l'IA n'écrit pas spontanément (M1.1).
addStep(journey: Journey, step: Step): Journey {
  journey.steps.push(step);   // était : journey.steps.unshift(step)
  return journey;
}
```

> 🔐 **La question à poser au débrief, et à personne d'autre moment.** *« Combien de secondes avez-vous
> gagné en corrigeant une ligne ? Et combien vous aurait coûté la suppression du test E2E ? »*
> La réponse remonte au J4 : un défaut prouvé à deux niveaux se corrige une fois et se vérifie
> deux fois. C'est le seul argument qui tienne devant un comité qui demande pourquoi on paie deux
> suites.

---

### 6.3 🟡 Artefact 4 — `backend/src/journeys/journeys.update.spec.ts` — **le cœur du col**

| | |
|---|---|
| **Verdict de départ** | **PASS.** Vert à chaque exécution, depuis lundi. |
| **Catégorie** | 🟡 **Test faux** — le faux positif fondateur, feature #7 |
| **Le signal attendu** | **Une lecture guidée par une manipulation.** ① 20 exécutions : 20 verts → l'artefact est stable, donc branche droite. ② La question de M1.1 : *« quelle modification du code de production ferait passer ce test au rouge ? »* — réponse : **aucune**. ③ La confirmation par le contrat, §Journeys, `PATCH /api/journeys/:id` : *« les steps ne doivent PAS être perdus »* — assertion absente du test. |
| **Pourquoi il ment** | Le double de la couche de sauvegarde **réinjecte les `steps` d'origine** dans le résultat attendu. La logique de fusion buguée n'est jamais exécutée. Le test compare une valeur qu'il a fabriquée à une valeur qu'il a fabriquée. |
| **Le geste attendu** | Réécrire **le double d'abord**, l'assertion ensuite. Le double cesse de fabriquer la réponse : il **capture** ce qu'on lui demande d'écrire. L'assertion vient du contrat. |
| **Le verdict d'arrivée attendu** | **ROUGE.** Et c'est le résultat correct. |

**La réécriture de référence** — en TypeScript, dans l'ordre exact :

```ts
// backend/src/journeys/journeys.update.spec.ts — version réécrite
// ① LE DOUBLE. Il ne fabrique plus la réponse : il écrit ce qu'on lui donne.
//    C'est la seule modification qui rende le test capable d'échouer.
const storage = {
  read:  jest.fn().mockResolvedValue(existing),
  write: jest.fn(async (_id: string, journey: unknown) => journey),
};

// ② L'ASSERTION. Elle vient de docs/API-CONTRACT.md, §Journeys :
//    « les steps ne doivent PAS être perdus ».
it('conserve les étapes lors d’une mise à jour partielle', async () => {
  const result = await service.update('j1', { title: 'Islande 2026' });
  expect(result.title).toBe('Islande 2026');
  expect(result.steps).toHaveLength(1);       // ← ROUGE avec le défaut #7
  expect(result.steps[0].id).toBe('s1');
});
```

**Ce qui se passe alors, et c'est tout l'enjeu du col.** L'artefact 4 **quitte** la catégorie 🟡 et
**rejoint** la catégorie 🔴 : il est désormais un test juste qui prouve le défaut #7. La suite
compte **un rouge de plus qu'au départ**. C'est le mouvement que la flèche pointillée du diagramme
de M6.1 annonçait, et c'est le geste qui distingue les cordées.

| Parcours | Ce que fait la cordée | Ce que ça donne |
|---|---|---|
| **Parcours maximal** | Réécrit le double, l'assertion devient rouge, **puis** corrige la logique de fusion dans `backend/src/journeys/journeys.service.ts` pour que les `steps` soient conservés. Le test repasse au vert **par le code** | C1 et C2 au plein, badge 🪤 **Le Démineur** |
| **Parcours honnête** | Réécrit le double, l'assertion devient rouge, **laisse rouge**, documente le défaut #7 en section 2 du post-mortem | C1 et C2 au plein, badge 🪤 **Le Démineur** |
| **Parcours du compteur de verts** | Ne touche pas à l'artefact, « puisqu'il est vert » | Perd les 8 PR du 🟡 en C2, et n'a rien démasqué |
| **Parcours disqualifiant** | Renforce l'assertion (`toHaveLength(1)`) **sans toucher au double** | Le test **reste vert** : le double continue de renvoyer `existing`, étapes comprises. C'est l'erreur que 80 % des groupes commettent, et elle est déjà connue depuis M1.1 |

> 🔐 **L'erreur à guetter, et à ne surtout pas corriger avant la fin.** Une cordée sur deux
> renforce l'assertion sans toucher au double, constate que le test reste vert, et **en conclut
> qu'il n'y a pas de bug**. Le laisser se produire : c'est le rappel le plus efficace de M1.1, et
> il se nomme au débrief en une phrase — *« une assertion forte branchée sur un double menteur
> reste un test menteur. »*

---

### 6.4 🌀 + 🌍 Artefact 5 — `e2e/tests/place-search.spec.ts`

| | |
|---|---|
| **Verdict de départ** | **Variable.** PASS ou FAIL selon l'exécution, sur le même code. |
| **Catégorie** | **Deux catégories** — 🌀 **Instable** *et* 🌍 **Extérieur**. C'est le seul artefact du dépôt à en porter deux, et le post-mortem doit les porter toutes les deux, parce qu'il y a **deux gestes**. |
| **Le signal attendu — 🌀** | Un décompte de **20 exécutions au minimum**, avec un taux d'échec non nul. Trois exécutions ne prouvent rien : le formateur le refuse. |
| **Le signal attendu — 🌍** | Une **seconde** manipulation qui distingue la cause : couper le réseau, ou intercepter l'appel. L'échec change de nature — il devient immédiat et systématique. Une cordée qui ne fait que le décompte a prouvé l'instabilité, **pas** son origine : elle obtient les 6 PR du 🌀 et pas les 4 du 🌍. |
| **Le fait remarquable, à relever dans le post-mortem** | La **feature #11 n'a aucun bug**. L'échec ne dit rien du produit. Une cordée qui écrit cette phrase dans son document a compris la notion ; une cordée qui cherche un défaut dans le code de la recherche de lieu perd dix minutes. |
| **Le geste — ce qu'il ne faut PAS faire** | Ajouter des relances. **−50 PR**, le malus le plus lourd du col. Il s'applique que la relance soit dans la configuration, dans la ligne de commande, ou dans le workflow écrit en M6.3. |
| **Le geste attendu** | **Les deux artefacts de la parade de M6.2**, avec leurs deux fréquences. |

**Artefact A — le double, dans la suite courante.** En Playwright, l'interception se fait au
niveau de la page ou du contexte. La réponse de référence est **versionnée dans le dépôt**, pas
improvisée dans le test : c'est ce qui rend le double auditable.

```ts
// e2e/tests/place-search.spec.ts — le double, à poser AVANT la navigation
// Fichier de référence à créer : e2e/fixtures/nominatim-paris.json
// (nom proposé — la cordée choisit le sien, l'exigence est qu'il soit VERSIONNÉ)
import { test, expect } from '@playwright/test';
import reponseDeReference from '../fixtures/nominatim-paris.json';

test.beforeEach(async ({ page }) => {
  // La route interceptée est celle du PROXY du produit, telle que le contrat
  // la déclare : GET /api/places/search?q=...
  await page.route('**/api/places/search**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(reponseDeReference),
    });
  });
});
```

> **Deux variantes sont recevables**, et le barème ne les départage pas : intercepter au niveau du
> **navigateur** (comme ci-dessus, on double le proxy du produit) ou intercepter au niveau du
> **backend**, en substituant le client HTTP qui appelle Nominatim. La première est plus rapide à
> écrire en E2E ; la seconde teste davantage de code réel. Ce qui est **exigé dans les deux cas** :
> la réponse de référence est **dans le dépôt**, et plus aucun appel réel n'est émis par la suite
> courante. La vérification est simple : **la suite doit passer hors ligne.**

**Artefact B — le test de contrat, séparé et rare.** Il interroge le **vrai** Nominatim et vérifie
la **forme** de la réponse, pas son contenu exact. Il ne vit pas dans la suite courante et
n'arrête aucune contribution.

```ts
// Fichier à créer — nom proposé : e2e/contract/nominatim.contract.spec.ts
// Fréquence : hebdomadaire ou planifiée. JAMAIS dans le chemin critique.
// Propriétaire : celui qui possède l'intégration, pas l'équipe de test.
import { test, expect } from '@playwright/test';

test('le proxy de géocodage renvoie toujours la forme attendue par le contrat', async ({ request }) => {
  // Contrat, §Places : 200 → Array<{ name, displayName, lat, lng }>, max 5 résultats.
  const res = await request.get('/api/places/search?q=paris');
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeLessThanOrEqual(5);

  // On vérifie la FORME, jamais le libellé exact : c'est précisément
  // la reformulation du libellé côté OpenStreetMap qui rendait le test
  // d'origine instable.
  if (body.length > 0) {
    expect(body[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        displayName: expect.any(String),
        lat: expect.any(Number),
        lng: expect.any(Number),
      }),
    );
  }
});
```

**La preuve d'arrivée attendue.** 20 exécutions consécutives de la suite courante, **20 verts**,
et une exécution hors ligne qui passe également. C'est ce qui ouvre le badge 🧊 **Le
Stabilisateur** — et 🎭 **Le Doubleur** si le test de contrat existe avec sa fréquence.

---

### 6.5 📁 Artefact 6 — le résidu du magasin

| | |
|---|---|
| **Verdict de départ** | Aucun test ne porte ce nom : c'est un **état**, pas un fichier. Il se relève à `git status` après une exécution complète. |
| **Catégorie** | 📁 **Magasin** — zone Z4 |
| **Le signal attendu** | **Deux manipulations.** ① `git status --short` avant et après une exécution complète : des fichiers `.md` non suivis apparaissent dans le dossier du magasin. ② Deux exécutions consécutives **sans nettoyage** : une suite qui passait échoue, ou un décompte change. C'est le signal qui prouve que **le résultat dépend du passé**. |
| **La difficulté propre à ce col** | Aucun nom de fichier ne désigne le coupable. La cordée doit **le trouver par bissection** : exécuter les fichiers de test un par un et regarder `git status` après chacun. C'est un travail d'enquête, et c'est la ligne du post-mortem qui distingue les cordées méthodiques. |
| **Le geste — ce qu'il ne faut PAS faire** | Ajouter un `git clean` en fin de suite. Cela **efface le symptôme** sans supprimer la cause : deux suites qui tournent en parallèle continueront de s'écrire dessus, et le nettoyage global détruira les fichiers de l'autre. |
| **Le geste attendu** | Un **répertoire de magasin par exécution**, créé au démarrage de la suite et supprimé à la fin. Le mécanisme se pose une fois et vaut pour tous les fichiers de test. |

**Le geste de référence, en TypeScript** — isolation par répertoire temporaire, appliquée au
niveau de la configuration de la suite plutôt que fichier par fichier :

```ts
// Mécanisme d'isolation — à poser une fois pour toute la suite backend.
// Nom du répertoire dérivé de l'identifiant d'exécution : deux exécutions
// parallèles ne peuvent pas se rencontrer.
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let magasin: string;

beforeAll(() => {
  magasin = mkdtempSync(join(tmpdir(), 'carnet-magasin-'));
  process.env.CARNET_STORAGE_DIR = magasin;   // convention lue par le code
});

afterAll(() => {
  rmSync(magasin, { recursive: true, force: true });
});
```

> ⚠️ **Le point d'honnêteté à faire dire au débrief.** Ce mécanisme ne fonctionne que si **le code
> du produit lit la variable**. Une cordée qui écrit ce bloc sans avoir vérifié que la couche de
> stockage l'honore a écrit un vœu, pas une isolation — et son `git status` restera sale. C'est
> exactement l'avertissement posé en M6.3 sur les conventions du workflow : *« écrire l'un sans
> l'autre, c'est écrire un vœu. »* La cordée qui le découvre seule et l'écrit dans la section 5
> (*« ce que nous n'avons pas pu faire »*) est **mieux notée** que celle qui prétend avoir isolé.

---

### 6.6 🟢 Artefact 7 — les suites vertes de Z1

| | |
|---|---|
| **Verdict de départ et d'arrivée** | **PASS** |
| **Catégorie** | **Aucune.** Ce sont les **étalons** du dépôt : features #1 *Création de compte* et #2 *Login*, testées et saines. |
| **Pourquoi elles figurent quand même au tableau** | Parce que la règle est *« une ligne par artefact, verts compris »*. Le travail attendu tient en une phrase par ligne : **d'où vient l'attendu ?** Pour #2, la réponse est dans le contrat, §Auth : *200 → `{ accessToken, user: { id, email, name } }`*, *401 si identifiants invalides*. Oracle extérieur → vert **justifié**. |
| **Ce que cela apprend au col** | Que le tableau n'est pas un tableau d'échecs, mais un tableau de **verdicts qualifiés**. Trois verts au départ : deux justifiés (#1, #2), un injustifié (#4). Une cordée qui le formule ainsi a compris tout le module M1. |

---

### 6.7 Le tableau de synthèse du corrigé

| # | Artefact | Départ | Catégorie | Arrivée — parcours honnête | Arrivée — parcours maximal |
|---|---|---|---|---|---|
| 1 | `journeys.create-validation.spec.ts` | FAIL | 🔴 #6 | **FAIL**, documenté | VERT, par correction du service |
| 2 | `steps.add-order.spec.ts` | FAIL | 🔴 #8 | **FAIL**, documenté | VERT, par correction du service |
| 3 | `e2e/tests/add-step-order.spec.ts` | FAIL | 🔴 #8 | **FAIL**, documenté | VERT, même correction |
| 4 | `journeys.update.spec.ts` | **PASS** | 🟡 #7 | **FAIL** *(réécrit, donc devenu juste)* | VERT, par correction de la fusion |
| 5 | `e2e/tests/place-search.spec.ts` | variable | 🌀 + 🌍 | **VERT et stable** (double) + contrat séparé | idem |
| 6 | *résidu du magasin* | sale | 📁 | `git status` **propre** | idem |
| 7 | suites vertes de Z1 | PASS | — | PASS, oracle cité | idem |

> **La lecture à faire au tableau, au débrief, en trente secondes.**
> Au départ : **3 rouges, 3 verts, 1 état sale.**
> À l'arrivée, parcours honnête : **4 rouges, 3 verts, 1 état propre** — et **zéro échec
> inexpliqué.**
> *« Vous avez un rouge de plus qu'en arrivant, et la voie est franchie. Si quelqu'un vous avait
> demandé un tableau de bord vert, vous auriez perdu quatre preuves en une heure. »*

---

## 7. 🔐 Ce que le formateur observe pendant l'épreuve

### 7.1 La grille d'observation

À remplir en circulant, une colonne par cordée. Ces observations ne notent pas : elles alimentent
le débrief et permettent de nommer des comportements sans nommer de personnes.

| # | Ce qu'on observe | Ce que cela signifie |
|---|---|---|
| **O1** | **Les quatre premières minutes.** La cordée exécute-t-elle, ou discute-t-elle ? | Une cordée qui discute plus de trois minutes avant de lancer une commande classera à la lecture. |
| **O2** | **Le nombre de lignes ouvertes en phase 1.** 3 ou 7 ? | Le discriminant le plus rapide du col. À 3, la cordée ne classe que le rouge. |
| **O3** | **Le nombre d'exécutions du fichier instable.** 3 ou 20 ? | Un décompte insuffisant coûte 6 PR en C2 et se voit dans le document. |
| **O4** | **Le moment où quelqu'un dit « on n'a qu'à… ».** Suivi de quoi ? | *« …mettre un retry »* → **−50** ; *« …changer l'assertion »* → **−40** ; *« …refaire le double »* → la cordée a compris. |
| **O5** | **La réaction au test qui devient rouge.** Soulagement ou panique ? | La panique signale que le critère intériorisé est encore « le nombre de verts ». À traiter au débrief, pas pendant. |
| **O6** | **Qui touche au clavier.** Un seul, ou trois en rotation ? | Un rôle de Manipulateur qui ne tourne pas produit une cordée à un apprenant. |
| **O7** | **L'usage de l'IA.** Pour chercher, ou pour rendre ? | Une cordée qui colle une sortie de LLM dans le post-mortem sans la relire perd **−20 PR**, et cela se détecte en trois questions au débrief. |

### 7.2 Les relances — quoi dire, quand, et à qui

| Minute | Relance | À qui | Pourquoi elle est là |
|---|---|---|---|
| **8** | *« Combien de lignes avez-vous ouvertes ? Est-ce que les vertes en font partie ? »* | Salle entière | C'est l'unique perche sur l'artefact 4. Elle ne nomme rien : elle rappelle une règle du livrable. |
| **20** | *« Lesquelles de vos lignes ont un signal qui est une manipulation, et lesquelles ont un signal qui est une opinion ? »* | Salle entière | Rattrape les cordées qui classent à la lecture, sans les désigner. |
| **30** | *« Si votre nombre de tests rouges n'a pas augmenté à un moment de cette heure, posez-vous une question. »* | Salle entière, **une seule fois** | La mise en garde centrale du col. Ne jamais la développer, ne jamais répondre à *« pourquoi ? »*. |
| **48** | *« Vos preuves d'arrivée sont-elles de la même nature que vos preuves de départ ? »* | Salle entière | Beaucoup de cordées prouvent le départ avec 20 exécutions et l'arrivée avec une seule. |
| **au besoin** | *« Quelle ligne du contrat fonde cet attendu ? »* | Cordée, en privé | La seule relance individuelle autorisée. Elle débloque sans donner la réponse. |

### 7.3 Les trois incidents prévisibles et leur traitement

| Incident | Signe | Traitement |
|---|---|---|
| **Une cordée verdit tout en dix minutes** | Elle a fini très tôt et son tableau ne compte que des verts | **Ne rien dire pendant l'épreuve.** Le `git diff` fera le travail au débrief. Lui proposer, à mi-parcours, une piste de bonus : *« il vous reste quarante minutes — le dépôt contient des défauts que personne ne prouve. »* |
| **Nominatim répond parfaitement ce jour-là** | Les 20 exécutions passent toutes | Le dire à la salle : *« vous ne pouvez pas prouver 🌀 aujourd'hui par la répétition. Prouvez 🌍 autrement : coupez le réseau. »* La catégorie reste attribuable, le signal change. Ne pas pénaliser. |
| **Une cordée bloque sur l'isolation du magasin** | Elle passe 25 minutes sur la bissection | Relance individuelle : *« vous avez trois minutes pour décider si vous continuez ou si vous écrivez cette ligne dans la section 5. Les deux sont notés. »* La dette écrite vaut mieux que le blocage. |

---

## 8. 🔐 Le débrief — 15 minutes

### 8.1 Déroulé minuté

| Temps | Ce que fait le formateur | Ce que font les participants |
|---|---|---|
| **0-2** *(2)* | Projette le **tableau de la mesure** (§8.2), vide. Demande à chaque cordée deux chiffres et deux seulement : **rouges au départ**, **rouges à l'arrivée**. Les écrit. Ne commente pas. | Annoncent. Constatent que les colonnes ne vont pas dans le même sens d'une cordée à l'autre. |
| **2-6** *(4)* | **Le corrigé, artefact par artefact**, dans l'ordre du §6.7. Ne s'attarde que sur l'artefact 4. Fait dire par la salle ce que la réécriture du double a produit. | Comparent avec leur propre tableau. Une cordée au moins découvre qu'elle n'a pas ouvert de ligne pour le test vert. |
| **6-9** *(3)* | **Le `git diff`.** Ouvre le diff d'une cordée volontaire, à l'écran, et cherche à voix haute les trois motifs : `skip`, `retries`, lignes `expect` modifiées. Applique les malus **sans commentaire moral**. | Regardent. Certains découvrent un malus qu'ils n'avaient pas anticipé. |
| **9-12** *(3)* | **Les trois phrases du débrief** (§8.3), dites dans l'ordre, sans les commenter. | Écoutent. Notent. |
| **12-14** *(2)* | **Scoreboard.** Annonce les scores du col, les badges, met à jour `CARNET-DE-BORD.md` à voix haute. | Entendent leur score, contestent un point au maximum — arbitré en 20 secondes. |
| **14-15** *(1)* | **La transition vers le J4** (§8.4). Une phrase, et une seule. | Rangent. |

**Contrôle : 2 + 4 + 3 + 3 + 2 + 1 = 15 min ✓**

### 8.2 Le tableau de la mesure — ce qu'on écrit au tableau, et ce qu'il démontre

| Cordée | Rouges au départ | Rouges à l'arrivée | Échecs inexpliqués | Verdict |
|---|---|---|---|---|
| 🧭 BOUSSOLE | 3 | | | |
| 🔦 LANTERNE | 3 | | | |
| ⛏️ PIOLET | 3 | | | |

**Ce que le tableau démontre**, et c'est le seul enseignement qu'on veut voir sortir de l'heure :
la colonne « rouges à l'arrivée » **n'est pas un indicateur de qualité**. Une cordée à 0 rouge peut
être la dernière du classement ; une cordée à 4 rouges peut avoir le score maximal. La **seule**
colonne qui décide est la troisième, et elle doit valoir **0** partout.

> À dire en montrant la troisième colonne : *« voilà la colonne que votre direction devrait vous
> demander. Elle ne vous la demandera jamais, parce qu'elle ne sait pas qu'elle existe. C'est
> votre travail de la lui apprendre — et c'est exactement ce que vous ferez demain après-midi
> devant le comité. »*

### 8.3 Les trois phrases du débrief

Dites dans cet ordre, sans être commentées, avec un temps d'arrêt entre chacune.

1. > *« Une suite verte n'est pas un objectif. C'est un effet secondaire. L'objectif, c'est de ne
   > plus avoir un seul échec dont vous ne savez pas dire pourquoi il est là. »*

2. > *« Le test que vous avez réécrit ce soir était vert ce matin, et il ment depuis lundi. Vous
   > l'avez rendu rouge. C'est le geste le plus difficile de la formation, parce qu'il coûte tout
   > de suite et qu'il rapporte plus tard. »*

3. > *« Et pour le `retry` : je ne vous l'interdis pas dans votre vie professionnelle. Je vous
   > interdis de croire qu'il répare quelque chose. Gardez-le comme thermomètre. Ne l'utilisez
   > jamais comme médicament. »*

### 8.4 La transition vers le Jour 4

> *« Vous avez passé trois jours à regarder si le produit fait ce qu'il dit. Demain, on regarde
> ce qu'il fait quand personne ne le lui a demandé : quand mille personnes arrivent en même temps,
> quand quelqu'un s'intéresse à vos jetons de réinitialisation, et quand l'utilisateur n'a pas de
> souris. Et vous découvrirez demain matin, en dix minutes, quelque chose que l'IA ne verra pas —
> et qu'aucune relecture de code ne donnera. »*

---

## 9. Repli et incidents matériels

| Incident | Repli |
|---|---|
| **Aucun réseau dans la salle** | La catégorie 🌍 se prouve **par l'absence** : la suite E2E échoue immédiatement et systématiquement. C'est un signal valide. Le double reste écrivable et vérifiable hors ligne — c'est même la meilleure preuve qu'il fonctionne. Le test de contrat séparé est écrit **sans être exécuté**, et la cordée l'indique. |
| **Playwright non installé sur un poste** | La cordée travaille sur les artefacts 1, 2, 4, 6 et 7, qui ne demandent que `npm run test:backend` et `git status`. Elle traite les artefacts 3 et 5 **sur le papier**, en écrivant le geste sans l'exécuter, et le signale en section 5. Le barème perd au maximum 10 PR. |
| **Un poste a le dépôt déjà modifié** *(par un exercice du matin)* | Réinitialiser avant le col : `git stash` de tout le travail de M5 et M6.3, qui vit dans un dépôt d'entraînement séparé. Ce contrôle figure en §0.6 du module M6. |
| **Le temps déborde en phase 3** | Couper à 42 min sans exception, et rappeler que la phase 4 (la preuve) **rapporte davantage** que la phase 3 (les gestes) : un geste non prouvé ne rapporte rien, une preuve sans geste rapporte le classement. |
| **Une seule cordée dans la salle** *(groupe de 3, cordées solo)* | Le col se joue en coopératif : les trois participants se répartissent les sept artefacts et se relisent en phase 5. Le barème est appliqué au collectif, l'entraide vaut **+10 PR**. |
| **Un participant a corrigé un défaut du code hors protocole** | Ne pas sanctionner : faire **rétablir le code**, faire écrire le test rouge, puis refaire la correction. Le temps perdu est l'enseignement, et il coûte moins cher qu'un discours sur la méthode. |
