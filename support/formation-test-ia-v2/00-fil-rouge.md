# Fil rouge V2 — **L'EXPÉDITION** · projet *Carnet de voyage*

> Document de référence du dispositif ludo-pédagogique de la V2.
> Lu par le formateur **avant** la session. Les sections §1, §3 et §5 sont projetées aux
> participants au Brief du Jour 1.

---

## 1. Le pitch (à lire à voix haute, J1 · 09:00)

> Vous rejoignez l'équipe qui reprend **Carnet de voyage** : un back-office où un utilisateur
> crée un compte, consigne ses **voyages** — dates, destination, note, commentaires — et à
> l'intérieur de chaque voyage ses **étapes** : les lieux visités, avec photos et commentaires.
> Une carte affiche les voyages et trace l'itinéraire entre les étapes.
>
> Le produit fonctionne. Il est même agréable. Et personne ne sait dans quel état il est.
>
> La v1 a été livrée vite. Ce qu'on vous laisse :
>
> - des fonctionnalités **saines et bien couvertes** — elles existent, elles servent de repère ;
> - des fonctionnalités **sans le moindre test** ;
> - des tests qui **existent et qui mentent** — faux positifs, instables, verts pour de mauvaises raisons ;
> - des **bugs**, certains évidents, d'autres logés dans des angles morts ;
> - deux dépendances externes gratuites — **Nominatim** pour le géocodage, **OSRM** pour
>   l'itinéraire — sur lesquelles vous n'avez aucun pouvoir ;
> - une « base de données » qui est un **dossier de fichiers Markdown** relus par `gray-matter`.
>
> Vous partez en expédition dans ce code. Quatre jours. Une carte à dresser, des pièges à
> repérer, un carnet de route à rapporter.
>
> **Objectif final : produire le carnet de route qui dit ce qui est couvert, ce qui ne l'est pas,
> ce que ça coûte — et le défendre devant un comité de mise en ligne.**

### 1.1 Pourquoi ce fil rouge fonctionne

| Contrainte pédagogique | Réponse du projet |
|---|---|
| Un exercice jouet ne transfère pas | Vrai back-office, vraie base de code, vraies dépendances externes |
| L'IA produit du plausible mais faux | Le dépôt contient des **tests qui mentent** : l'IA les lit et les reproduit |
| Un anti-pattern raconté ne protège pas | Les défauts sont **déjà là** : le participant tombe dedans sans mise en scène |
| Les participants ont des niveaux hétérogènes | Zones de difficulté croissante — de l'auth (simple) aux proxies externes (dur) |
| La flakiness doit être vécue, pas décrite | Nominatim et OSRM sont des services publics réels : la flakiness est **native** |
| Il faut un référentiel pour juger | Les fonctionnalités **saines** servent d'étalon : « voilà à quoi ressemble un bon test ici » |
| Il faut évaluer (Qualiopi) | Score, micro-évaluations, 4 boss, carnet de route final |

> 🎯 **Le cadeau pédagogique du projet** : la coexistence des quatre états — *sain / non testé /
> testé mais faux / bugué*. C'est exactement la matrice de départ d'une mission QA réelle,
> et elle offre les quatre situations d'apprentissage sans qu'on ait à les fabriquer.

---

## 2. Métaphore et progression

Le produit est un carnet de voyage. Le dispositif l'est aussi : on tient le **carnet de bord
de l'expédition qualité**, et chaque journée est une étape avec son col à franchir.

| Jour | Étape | Verbe | Col à franchir (boss) |
|---|---|---|---|
| **J1** | 🏕️ **Le camp de base** | COMPRENDRE | *L'Inventaire* — dresser la carte du terrain |
| **J2** | 🎒 **L'équipement** | OUTILLER | *L'Éclaireur* — un agent qui marche devant |
| **J3** | ⛰️ **L'ascension** | INDUSTRIALISER | *Le Passage difficile* — remettre la voie au vert |
| **J4** | 🏔️ **Le sommet** | DÉCIDER | *Le Comité de mise en ligne* — soutenance |

---

## 3. Les six zones du terrain

Chaque zone est un couple *module fonctionnel × valeur pédagogique*. Toutes les notions et
tous les exercices s'y ancrent. Les zones sont ordonnées par difficulté d'accès.

| Zone | Périmètre technique | Ce qu'elle sert à enseigner | Difficulté |
|---|---|---|---|
| **Z1 — Le poste de garde** | `backend/auth` (register, login JWT, forgot/reset) + pages front | Cas limites, règles de validation, tests unitaires, **tests qui mentent par sur-mock** | ⭐ |
| **Z2 — Les voyages** | `backend/journeys` (CRUD, note, commentaires) + liste et détail front | Oracle métier, tests d'intégration API, **couverture trompeuse** | ⭐⭐ |
| **Z3 — Les étapes** | `backend/steps` (imbriqué sous journey, photos, commentaires) | Relations, données de test, effets de bord, cas d'imbrication | ⭐⭐ |
| **Z4 — Le magasin** | `backend/storage` (repository maison, fichiers `.md` + `gray-matter`) | **Isolation des tests**, fixtures, état partagé, concurrence, nettoyage | ⭐⭐⭐ |
| **Z5 — Le monde extérieur** | `backend/places` → Nominatim · `backend/map` → OSRM | **Flakiness native**, test doubles, tests de contrat, résilience, timeouts | ⭐⭐⭐⭐ |
| **Z6 — La vitrine** | `frontend` React/Vite, `PlaceSearchInput`, carte Leaflet · `e2e/` Playwright | Testing Library, E2E, sélecteurs, **sélecteur halluciné**, accessibilité | ⭐⭐⭐ |

### 3.1 La matrice de départ — l'état des quatre terrains

C'est le document que les participants produisent au **Boss J1**. Le formateur en détient la
version de référence, complétée depuis `docs/stats.md`.

| État | Ce que c'est | À quoi il sert en formation |
|---|---|---|
| 🟢 **Sain** | Fonctionnalité testée, tests justes | **L'étalon.** On l'analyse pour extraire « à quoi ressemble un bon test ici » |
| ⚪ **Non testé** | Fonctionnalité sans aucun test | **Le terrain d'exercice.** C'est là qu'on génère avec l'IA et qu'on vérifie |
| 🟡 **Testé mais faux** | Tests verts pour de mauvaises raisons, flaky, tautologiques | **Le piège.** L'IA lit ces tests et en produit de semblables |
| 🔴 **Bugué** | Défaut présent, détectable ou non par les tests actuels | **La preuve.** Un test qui ne tombe pas sur un bug connu ne teste rien |

> ⚠️ **À compléter depuis le dépôt.** Le tableau nominatif des fonctionnalités, de leur état et
> des défauts associés se construit à partir de `docs/stats.md`. Voir §8 — *ce qu'il reste à
> instancier*. Sans ce tableau, les notions de type « piège » (M1.1, M5.1, M5.4, M7.1) et les
> quatre boss n'ont pas d'oracle.

### 3.2 Ce que la « base de données Markdown » offre pédagogiquement

Le choix de `gray-matter` sur des fichiers `.md` n'est pas un défaut du projet : c'est une
aubaine. Il rend **visible** ce qui est habituellement caché dans une base.

| Notion enseignée | Ce que le stockage Markdown permet de montrer |
|---|---|
| Isolation des tests | On **voit** les fichiers créés par un test. Un test qui ne nettoie pas se constate à l'œil |
| Fixtures et jeux de données | Un jeu de données = un dossier versionné, lisible, diffable |
| Effets de bord | Deux tests qui écrivent le même fichier : le conflit est physique, pas abstrait |
| Ordre d'exécution | La dépendance à l'ordre se démontre en supprimant un fichier |
| Reproductibilité | `git status` après une exécution de tests = l'état résiduel, en clair |

---

## 4. Stack et outillage

| Couche | Technologie | Outils de test mobilisés en formation |
|---|---|---|
| **Back** | NestJS — API REST sur `http://localhost:3000/api` | Jest, `@nestjs/testing`, supertest, nock ou msw pour les proxies |
| **Front** | React + Vite — `http://localhost:5173` | Vitest, React Testing Library, `@testing-library/user-event` |
| **E2E** | Playwright — pilote front + back ensemble | `@playwright/test`, trace viewer, `@axe-core/playwright` |
| **Stockage** | Fichiers `.md` + frontmatter YAML via `gray-matter` | Fixtures de fichiers, isolation par répertoire temporaire |
| **Externe** | Nominatim (OSM) · OSRM — gratuits, sans clé | Tests de contrat, doubles, timeouts, résilience |
| **Docs** | `docs/API-CONTRACT.md` · `docs/stats.md` | Source d'exigences pour la génération de tests (M2) |
| **IA** | Claude Code + MCP (Playwright MCP) | Fil conducteur de tous les modules |

> 📌 **Conséquence sur le support** : tout le code du support V2 est en **TypeScript**.
> Les exemples .NET/C# et Angular de la V1 ne sont pas repris — ils restent consultables
> dans le fonds documentaire mais ne sont plus projetés.

---

## 5. Règles du jeu

### 5.1 Les cordées

Groupes Human Coders : 3 à 6 participants. Constitution au Brief du J1.

| Effectif | Organisation |
|---|---|
| 3 | 3 cordées solo, entraide autorisée, cols en coopératif |
| 4 | 2 cordées de 2 |
| 5 | 1 cordée de 3 + 1 de 2 |
| 6 | 3 cordées de 2 |

**Noms de cordée** (tirage au sort au Brief J1) :

- 🧭 **Cordée BOUSSOLE** — *« Un test qui ne peut pas échouer n'indique aucune direction. »*
- 🔦 **Cordée LANTERNE** — *« Le bug est là. Il faut juste l'éclairer. »*
- ⛏️ **Cordée PIOLET** — *« En production, personne ne relance le pipeline. »*

À chaque notion : un **Pilote** au clavier, un **Copilote** relecteur. **Rotation imposée à
chaque notion** — c'est le mécanisme qui empêche qu'un seul participant fasse la formation.

### 5.2 Le score — les Points de Repère (PR)

| Source | Gain |
|---|---|
| Micro-évaluation réussie (QCM éclair ou exercice court) | **10 PR** |
| Restitution de pédagogie inversée jugée complète | **20 PR** |
| Jeu sérieux remporté | **15 PR** |
| **QCM long** de fin de module (au prorata des bonnes réponses) | **0 à 50 PR** |
| 🏆 **Col franchi** (boss J1, J2, J3) | **100 PR** |
| 🏔️ **Sommet** (boss final) | **200 PR** |
| 🎖️ **Badge obtenu** (voir §5.3) | **10 PR** |
| Défaut non listé dans l'énoncé, découvert et prouvé par un test | **+40 PR** |
| Aide à une autre cordée, validée par elle | **+10 PR** |

**Malus — le Lest**, appliqué sans discussion :

| Infraction | Malus |
|---|---|
| Test tautologique livré (l'attendu vient du code, pas d'une source) | **−30 PR** |
| Sélecteur inventé, jamais exécuté contre le vrai DOM | **−30 PR** |
| Test mis en `.skip` ou supprimé pour faire passer la suite | **−40 PR** |
| Couverture augmentée sans une seule assertion nouvelle | **−25 PR** |
| Test qui laisse des fichiers `.md` résiduels dans le magasin | **−20 PR** |
| Appel réel à Nominatim ou OSRM dans un test unitaire | **−20 PR** |
| Livrable collé d'un LLM sans relecture, détecté au débrief | **−20 PR** |

> 🎯 **Intention** : le score ne récompense pas la vitesse de production. Il récompense
> **le jugement**. Une cordée qui génère 200 tests en dix minutes et en livre 40 tautologiques
> finit dernière. C'est le message central de la formation, et il est inscrit dans le barème.

### 5.3 Les badges

| Badge | Condition |
|---|---|
| 🧭 **Le Cartographe** | Premier à compléter la matrice des quatre états sur une zone |
| 🔦 **L'Éclaireur** | Premier à prouver un bug par un test rouge |
| 🪤 **Le Démineur** | Démasquer un test qui ment et expliquer *pourquoi* il ment |
| 🧊 **Le Stabilisateur** | Éliminer la cause racine d'un test instable — pas un retry |
| 🎭 **Le Doubleur** | Neutraliser proprement Nominatim ou OSRM dans une suite |
| 🧹 **Le Gardien du magasin** | Rendre une suite parfaitement isolée : `git status` propre après exécution |
| ♿ **L'Hospitalier** | Zéro violation axe critique sur un parcours complet |
| 💰 **Le Frugal** | Même résultat qu'une autre cordée, avec moins de tokens |
| 🎓 **Le Guide** | Expliquer une notion à une autre cordée, jugé clair par elle |
| 🏔️ **Le Sommet** | Meilleur score final — trophée remis en clôture |

### 5.4 Affichage

`CARNET-DE-BORD.md` à la racine du dépôt partagé, mis à jour **à voix haute en 60 secondes**
à la fin de chaque module.

```markdown
| Cordée      | J1 | J2 | J3 | J4 | Total | Badges   |
|-------------|----|----|----|----|-------|----------|
| 🧭 BOUSSOLE |    |    |    |    |       |          |
| 🔦 LANTERNE |    |    |    |    |       |          |
| ⛏️ PIOLET   |    |    |    |    |       |          |
```

---

## 6. Les quatre cols

### 6.1 🏆 Col J1 — **« L'Inventaire »** · 60 min · 100 PR

*Fin du module M2. On ne peut pas tester ce qu'on n'a pas cartographié.*

**Mise en situation.** Le comité veut savoir, demain matin, **dans quel état est le produit**.
Pas une opinion : un document.

**Livrable** — `carnet/j1-inventaire.md`

1. La **matrice des quatre états** sur les six zones : pour chaque fonctionnalité,
   🟢 sain · ⚪ non testé · 🟡 testé mais faux · 🔴 bugué — avec la **preuve** de chaque classement
   (nom du test, sortie de commande, extrait de `API-CONTRACT.md`).
2. La liste des **exigences testables** extraites de `docs/API-CONTRACT.md`, numérotées `EX-001…`,
   avec pour chacune : testable oui/non, type de test, priorité.
3. Les **ambiguïtés** du contrat d'API : ce qui n'est pas spécifié et que l'IA comblera seule
   si on ne l'encadre pas.
4. **Trois tests suspects** identifiés, avec l'explication de *pourquoi* on les suspecte.

**Barème** — 100 PR

| Critère | PR |
|---|---|
| Matrice complète sur les 6 zones, chaque classement prouvé | 30 |
| ≥ 90 % des exigences du contrat extraites et statuées | 25 |
| Ambiguïtés réelles identifiées (pas des reformulations) | 20 |
| Trois tests suspects, avec démonstration | 20 |
| Format exploitable par un non-technicien | 5 |
| **Bonus** — un défaut trouvé et prouvé par un test rouge | +40 |

---

### 6.2 🏆 Col J2 — **« L'Éclaireur »** · 60 min · 100 PR

*Fin du module M4. Un agent qui marche devant et rapporte ce qu'il voit.*

**Mise en situation.** Vous partez en congés vendredi. L'agent doit tourner sans vous sur une
zone **non testée** tirée au sort.

**Livrable** — un agent (Claude Code : `CLAUDE.md` + skill + subagent + hooks) qui, sur une
commande unique :

1. lit l'exigence dans `docs/API-CONTRACT.md`,
2. génère les tests correspondants (Jest + supertest, ou Vitest + RTL),
3. **les exécute réellement**,
4. en cas d'échec, distingue « le test est faux » de « le code est faux »,
5. produit `carnet/j2-rapport-agent.md` lisible par un chef de projet.

**Barème** — 100 PR

| Critère | PR |
|---|---|
| L'agent s'exécute de bout en bout sans intervention | 30 |
| Les tests générés sont **réellement exécutés** (preuve : sortie du runner) | 25 |
| L'agent distingue test faux / code faux | 20 |
| Garde-fou : refus de modifier le code de production sans validation | 15 |
| Rapport compréhensible par un non-technicien | 10 |
| **Malus** — l'agent modifie silencieusement une assertion pour verdir | **−60** |

> ⚠️ Statistiquement, au moins une cordée se fait prendre par le malus. C'est prévu :
> le débrief en tire l'enseignement central sur les boucles de vérification.

---

### 6.3 🏆 Col J3 — **« Le Passage difficile »** · 60 min · 100 PR

*Fin du module M6. La voie est rouge. On ne contourne pas, on stabilise.*

**Mise en situation.** La suite complète est instable. Une partie des échecs vient du **monde
extérieur** (Z5), une autre de **tests qui mentent** (🟡), une autre de **vrais bugs** (🔴),
une dernière du **magasin** mal isolé (Z4). Interdiction de supprimer ou de `.skip` un test.

**Livrable** — suite au vert + `carnet/j3-post-mortem.md` classant **chaque échec** dans :

| Catégorie | Signal qui discrimine |
|---|---|
| 🔴 **Vrai bug produit** | Échoue systématiquement, y compris hors CI ; le produit dévie du contrat |
| 🟡 **Test faux** | L'oracle vient du code ; l'exécution en série ne change rien |
| 🌀 **Instable** | Le résultat varie sur le même code ; se prouve par répétition |
| 🌍 **Extérieur** | L'échec suit la disponibilité de Nominatim/OSRM, pas le test |
| 📁 **Magasin** | L'échec dépend de l'ordre ou d'un fichier `.md` laissé par un autre test |

**Barème** — 100 PR

| Critère | PR |
|---|---|
| Suite au vert sans `.skip` ni suppression | 30 |
| Classement correct des échecs, avec preuve par catégorie | 30 |
| Neutralisation propre du monde extérieur (double, pas retry) | 20 |
| Isolation du magasin rétablie — `git status` propre après exécution | 15 |
| Temps d'exécution de la suite réduit | 5 |
| **Malus** — retry global ajouté pour masquer l'instabilité | **−50** |

---

### 6.4 🏔️ Col final J4 — **« Le Comité de mise en ligne »** · 60 min · 200 PR

*Fin du module M8. Dix minutes par cordée devant le comité — le formateur en directeur
technique, les autres cordées en métier et en DPO.*

**Livrable** — `carnet/CARNET-DE-ROUTE.md`, 4 à 6 pages :

1. **Recommandation** : Go / Go conditionnel / No-Go, assumée en une phrase.
2. **Carte des risques** : probabilité × impact sur les six zones, avec la couverture associée.
3. **Preuves** : couverture, tests ajoutés, défauts prouvés, résultats non fonctionnels.
4. **Ce que l'IA a fait, ce que l'humain a validé** — tableau de traçabilité.
5. **Conformité** : données utilisées, ce qui sort du SI quand on prompte, rétention.
6. **Coût** : tokens consommés, temps humain économisé, dette de maintenance créée.
7. **Dettes ouvertes** : ce qui n'a pas été testé, et pourquoi c'est un choix et pas un oubli.

**Les trois questions du comité** — posées à chaque cordée :

1. *« Vous annoncez X % de couverture. Si je casse une ligne de `journeys.service.ts`,
   combien de vos tests tombent ? »* → écart couverture / capacité de détection.
2. *« Ces tests, qui les maintient dans six mois quand le modèle aura changé de version ? »*
   → dérive de modèle et coût de maintenance.
3. *« Vos tests appellent-ils Nominatim ? Que se passe-t-il le jour où le service est en panne
   pendant votre release ? »* → dépendances externes et résilience.

**Barème** — 200 PR

| Critère | PR |
|---|---|
| Recommandation claire, défendue sous contradiction | 40 |
| Carte des risques cohérente avec les preuves apportées | 40 |
| Traçabilité IA / humain complète | 35 |
| Volet conformité correct | 25 |
| Chiffrage honnête, coûts cachés compris | 25 |
| Réponses aux trois questions du comité | 35 |

---

## 7. Rituels d'animation

| Moment | Rituel | Durée |
|---|---|---|
| Ouverture de journée | **Le Brief** — où on en est, score de la veille, l'étape du jour | 15 min |
| Début de notion | **Le Repère** — l'objectif en une phrase, ce qu'on saura faire dans 40 min | 1 min |
| Fin de notion | **La micro-évaluation** — QCM éclair ou exercice court | 5-15 min |
| Après un jeu sérieux | **Le Débrief du jeu** — nommer ce qui vient d'être vécu | 5 min |
| Fin de module | **Le Carnet de bord** — score à voix haute | 1 min |
| Fin de journée | **Le Débrief** — 1 chose apprise, 1 surprenante, 1 doute, par personne | 15 min |
| Clôture J4 | **Le Sommet** — trophée, tour de table « ce que je fais lundi matin » | 15 min |

---

## 8. Ce qu'il reste à instancier depuis le dépôt

Ces éléments conditionnent la précision des exercices. Deux fichiers du projet les contiennent.

| Élément | Source | Ce qu'il verrouille |
|---|---|---|
| **Tableau nominatif fonctionnalité → état → test** | `docs/stats.md` | La matrice §3.1, le Boss J1, les notions « piège » |
| **Liste des défauts, leur nature, leur difficulté** | `docs/stats.md` | Les notions M1.1, M5.1, M5.4, M7.1 et les 4 boss |
| **Liste des tests qui mentent, et *pourquoi* ils mentent** | `docs/stats.md` + lecture du code | La notion M1.1 (le piège fondateur) et le Boss J3 |
| **Routes, payloads, types** | `docs/API-CONTRACT.md` | Les exigences `EX-001…` du Boss J1, la notion M2.1 |
| **Ambiguïtés réelles du contrat** | `docs/API-CONTRACT.md` | La notion M2.3 et le Boss J1 |
| **Commandes exactes de test** | `package.json` des trois dossiers | Toutes les notions SOLO |
| **État du pipeline CI** | `.github/workflows/` s'il existe | La notion M6.3 et le Boss J3 |

> Sans ces éléments, le support s'écrit avec des **emplacements réservés** et le formateur les
> complète. Avec eux, chaque exercice porte un résultat attendu vérifiable au caractère près.
> C'est la différence entre un support utilisable et un support opposable.
