# Gabarit de NOTION — contrat pédagogique de la V2

> Document de production interne. C'est la brique élémentaire du support V2.
> **Une notion = un objectif d'apprentissage = une modalité = une micro-évaluation.**
> Si l'un des quatre manque, ce n'est pas une notion : c'est du remplissage.

---

## 1. Ce qui change par rapport à la V1

| | V1 | V2 |
|---|---|---|
| Unité de base | le **module** (15-30 p.) | la **notion** (2-4 p., 30-40 min) |
| Logique d'écriture | exhaustivité — tout dire sur le sujet | progression — une chose à la fois, apprise et vérifiée |
| Modalité | toujours la même : théorie → 3 exemples → 4 exercices | **choisie** selon l'objectif visé, et justifiée |
| Évaluation | 4 exercices en fin de module | **micro-évaluation à chaque notion** + boss/QCM en fin de module |
| Rôle du formateur | puiser dans un manuel | **dérouler un scénario minuté** |
| Ce que voit le participant | 520 pages | une notion à la fois, avec une victoire à la fin |

**Le test de recevabilité d'une notion** : un participant doit pouvoir répondre, à la fin,
à la question *« qu'est-ce que je sais faire maintenant que je ne savais pas faire il y a 35 minutes ? »*
en une phrase, sans consulter ses notes.

---

## 2. Structure imposée d'une notion

Chaque notion s'écrit dans cet ordre exact. Aucune section n'est facultative.

```markdown
### Notion Mx.n — « <titre parlant, orienté capacité, pas orienté thème> »

|  |  |
|---|---|
| **Durée** | nn min |
| **Modalité** | Descendant / Pédagogie inversée / Jeu sérieux / Exercice solo / Exercice de groupe |
| **Objectif d'apprentissage** | À l'issue, le·a participant·e est capable de <verbe observable> |
| **Niveau visé (Bloom)** | Connaître · Comprendre · Appliquer · Analyser · Évaluer · Créer |
| **Micro-évaluation** | QCM éclair (n questions) / Exercice court (nn min) |
| **Ancrage fil rouge** | <zone(s) `Z1`-`Z6` du *Carnet de voyage* · état du terrain 🟢 ⚪ 🟡 🔴 · ce que la notion fait avancer dans le projet> |
| **Prérequis** | <notion(s) dont celle-ci dépend, ou « aucun »> |

#### ▸ Pourquoi cette modalité
Deux à quatre phrases. **Obligatoire.** On justifie le choix par l'objectif, pas par le confort.
Renvoi explicite à un critère de `00-grille-modalites.md`.
Exemple attendu : « L'objectif est de se méfier d'un piège. Un piège raconté ne protège pas :
on le fait vivre. Donc jeu sérieux, pas descendant. » (critère D-4)

#### ▸ Ce qu'il faut avoir compris à la fin
Encadré de **3 à 5 puces maximum**. C'est le noyau irréductible.
Si la notion en compte plus de 5, elle doit être coupée en deux notions.

#### ▸ Déroulé minuté
Tableau à trois colonnes, une ligne par étape de 3 à 10 minutes.

| Temps | Le formateur | Les participants |
|---|---|---|
| 0-4 | <ce qu'il dit, montre, projette — verbatim des questions clés> | <ce qu'ils font, à quoi ils répondent> |

Règles :
- une ligne descendante ne dépasse jamais **12 minutes** sans interaction ;
- la première ligne n'est **jamais** « le formateur explique » — c'est une question, un chiffre
  qui surprend, un échec projeté, un vote à main levée ;
- la dernière ligne avant la micro-évaluation est toujours une **synthèse par les participants**,
  pas par le formateur.

#### ▸ Contenu à transmettre
Le fond, écrit de façon **projetable et dicible**. Pas un article : des phrases qu'on peut dire
à voix haute. Tableaux comparatifs plutôt que paragraphes. Chaque chiffre porte sa référence
`[S-xx]` renvoyant à `annexes/reference-v1/`.
**Plafond : 700 mots.** Au-delà, c'est du manuel, pas du scénario.

#### ▸ 🖼️ Diagramme
Un diagramme par notion **quand il clarifie** — jamais décoratif. Fourni en trois éléments :
1. le fichier SVG (`diagrammes/Mx-n-nom.svg`), imprimable et projetable ;
2. la source Mermaid ou le descriptif de construction, pour que le formateur puisse le modifier ;
3. **l'explication du diagramme** : ce qu'on montre en premier, dans quel ordre on le dévoile,
   la phrase à dire sur chaque élément, et l'erreur d'interprétation à prévenir.

#### ▸ 🔍 Démonstration / exemple
**Un seul** exemple, exécutable, ancré sur une zone `Z1`-`Z6` du projet fil rouge.
Comporte : le point de départ, le geste exact (commande, prompt, clic), le résultat obtenu,
et **ce que l'exemple révèle** — y compris quand l'IA se trompe.
Pour une démo live : la liste des choses qui peuvent rater et le repli associé.
**Contrainte de stack : tout le code est en TypeScript** (voir §6).

#### ▸ ✅ Micro-évaluation
**Variante A — QCM éclair** (2 à 3 questions, 3 à 4 réponses chacune) :
pour chaque question, l'énoncé, les options, **la bonne réponse**, et surtout
**pourquoi chaque distracteur est faux** — c'est là que se joue l'apprentissage.

**Variante B — Exercice court** (5 à 15 min) :
énoncé en 3 lignes maximum · matériel · **résultat attendu vérifiable** (case à cocher) ·
solution de référence · l'erreur que 80 % des groupes commettent.

Règle : un QCM ne valide qu'un objectif de niveau *Connaître* ou *Comprendre*.
Dès *Appliquer*, la micro-évaluation est un exercice.

#### ▸ 🔗 Ressources
3 à 6 liens **vérifiés**, avec pour chacun : à qui il s'adresse (le curieux / celui qui veut
approfondir / la référence normative) et ce qu'il faut y lire précisément.
Aucune URL inventée.

#### ▸ ⚠️ Pièges d'animation
2 à 4 lignes : ce qui rate habituellement sur cette notion, la question qui revient toujours
et sa réponse courte, et le signe qu'il faut passer à la suite.
```

---

## 3. Structure imposée d'un MODULE

```markdown
# Module Mx — « <titre> »
> **Jour n · demi-journée matin|après-midi · nnn min · n notions**
> *Promesse au participant : « À la fin de ce module, vous saurez … »*

## 0. Carte du module
- Objectif terminal du module (un seul, formulé en capacité observable)
- Position dans le fil rouge : ce qui existe avant / ce qui existe après
- Les n notions, leur modalité, leur durée (tableau récapitulatif)
- Minutage de la demi-journée, à la minute

## 1..n  Les notions (gabarit ci-dessus)

## Boss OU QCM long
```

**Règle de clôture de module** :
- module de **matin** → **QCM long** (12 à 15 questions, 20 min, correction commentée) ;
- module d'**après-midi** → **BOSS** (TP de 60 min, scénarisé, avec barème et corrigé).

Un module ne se termine **jamais** sans une victoire mesurable.

---

## 4. Les cinq interdits d'écriture

1. **Interdit d'écrire une notion sans avoir écrit son objectif d'abord.** L'objectif commande
   la modalité, qui commande le déroulé, qui commande le contenu. Jamais l'inverse.
2. **Interdit de dépasser 700 mots de contenu transmis** par notion. Le surplus va dans
   `annexes/reference-v1/` et est cité en lien, pas recopié.
3. **Interdit de deux notions consécutives de même modalité** (voir règles de rythme).
4. **Interdit d'un exemple qui marche du premier coup** sur les notions portant un anti-pattern :
   l'échec est le support pédagogique.
5. **Interdit d'une micro-évaluation dont le résultat n'est pas vérifiable** par le formateur
   en moins de 60 secondes.

---

## 5. Convention de nommage

| Objet | Format | Exemple |
|---|---|---|
| Module | `module-Mx-<slug>.md` | `module-M3-parler-a-la-machine.md` |
| Notion | `Mx.n` | `M3.2` |
| Diagramme | `diagrammes/Mx-n-<slug>.svg` | `diagrammes/M3-2-les-cinq-blocs.svg` |
| QCM long | `qcm/qcm-Mx.md` | `qcm/qcm-M3.md` |
| Boss | `boss/boss-Jn-<slug>.md` | `boss/boss-J2-eclaireur.md` |
| Source V1 | `[S-xx]` → `annexes/reference-v1/` | — |

Le format est inchangé. Seuls les slugs sont désormais ceux des quatre cols réels :
`boss-J1-inventaire` · `boss-J2-eclaireur` · `boss-J3-passage-difficile` ·
`boss-J4-comite-mise-en-ligne`.

---

## 6. Contrainte de stack et ancrage fil rouge

Le projet fil rouge est **Carnet de voyage** (voir `00-fil-rouge.md`). Deux contraintes
s'appliquent à **tout** exemple, démonstration, exercice et corrigé de la V2.

### 6.1 Le code est en TypeScript — sans exception

| Couche du projet | Ce qu'on écrit dans les notions |
|---|---|
| Back — NestJS, API REST | Jest · `@nestjs/testing` · supertest |
| Front — React + Vite | Vitest · React Testing Library · `@testing-library/user-event` |
| E2E | `@playwright/test` · `@axe-core/playwright` |
| Stockage — fichiers `.md` + `gray-matter` | Fixtures de fichiers, isolation par répertoire temporaire |
| Dépendances externes — Nominatim, OSRM | Test doubles, tests de contrat, timeouts |

**Interdit** : tout exemple en C#/.NET, xUnit, NUnit, Angular ou Jasmine/Karma. Ces contenus
de la V1 restent consultables dans `annexes/reference-v1/` et sont cités en lien, jamais recopiés
ni projetés. Une notion qui a besoin d'un exemple hors stack est une notion mal ancrée.

### 6.2 L'ancrage se fait sur une zone `Z1`-`Z6`

| Zone | Périmètre | Ce qu'elle sert à enseigner |
|---|---|---|
| **Z1** | `backend/auth` + pages front | Cas limites, validation, tests qui mentent par sur-mock |
| **Z2** | `backend/journeys` + liste et détail front | Oracle métier, intégration API, couverture trompeuse |
| **Z3** | `backend/steps` | Relations, données de test, effets de bord |
| **Z4** | `backend/storage` (`.md` + `gray-matter`) | Isolation, fixtures, état partagé, nettoyage |
| **Z5** | `backend/places` → Nominatim · `backend/map` → OSRM | Flakiness native, doubles, contrat, résilience |
| **Z6** | `frontend` React/Vite · `e2e/` Playwright | Testing Library, E2E, sélecteurs, accessibilité |

Règles d'écriture :

- la ligne **Ancrage fil rouge** du tableau d'en-tête nomme la ou les zones **et** l'état du
  terrain visé : 🟢 sain (l'étalon) · ⚪ non testé (le terrain d'exercice) · 🟡 testé mais faux
  (le piège) · 🔴 bugué (la preuve) ;
- l'ancrage est **motivé** : on écrit en une phrase *pourquoi* cette notion se joue sur cette
  zone. Un ancrage décoratif est un ancrage refusé en relecture ;
- une notion portant un anti-pattern (critère `D-4`) s'ancre sur du 🟡 ou du 🔴 — jamais sur
  du 🟢 : le piège doit exister avant la séance ;
- **aucun nom de fichier de code, aucune route, aucun nom de test précis n'est écrit tant qu'il
  n'a pas été relevé dans le dépôt.** On reste au niveau de la zone et du module fonctionnel.
