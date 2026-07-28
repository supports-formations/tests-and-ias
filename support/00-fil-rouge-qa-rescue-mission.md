# Fil rouge gamifié — QA RESCUE MISSION : Opération SkyRetail

> Document de référence du dispositif ludo-pédagogique.
> À lire par le formateur **avant** la session ; les sections §1, §3 et §4 sont projetées
> aux participants en M0.

---

## 1. Le pitch (à lire à voix haute en M0)

> **SkyRetail** est une plateforme e-commerce B2C : 340 000 clients actifs, 12 000 commandes
> par jour, un pic à 90 000 le Black Friday. Front **Angular**, back **.NET Web API**,
> base **PostgreSQL**.
>
> Il y a six mois, SkyRetail a été racheté. Le nouveau propriétaire a imposé une refonte
> du tunnel de commande et une nouvelle grille de remises. La version majeure **v4.0**
> part en production **dans quatre jours**.
>
> Problème : l'équipe QA historique — deux personnes — est partie il y a trois semaines.
> Ce qu'elles laissent derrière elles :
>
> - **12 %** de couverture de code sur le back-end, **0 %** sur le front,
> - **47 tests** dans la CI, dont **12 identifiés comme flaky** et **9 en `[Skip]`** depuis 14 mois,
> - **aucun** test end-to-end,
> - un cahier des charges de la v4.0 de **6 pages**, écrit par le métier, jamais relu par la tech,
> - **3 incidents de production** ouverts sur la v3.9, sans test de non-régression associé,
> - un pipeline GitHub Actions qui dure **34 minutes** et que tout le monde relance « au cas où ».
>
> Vous êtes la **Task Force QA**. Vous avez quatre jours, une licence Claude Code,
> et l'interdiction formelle de recruter.
>
> **Objectif : arriver au comité de Go/No-Go de J4 avec un dossier de recette défendable.**

---

## 2. Pourquoi ce fil rouge fonctionne pédagogiquement

| Contrainte pédagogique | Réponse du scénario |
|---|---|
| Les participants ont des niveaux hétérogènes | Le scénario a 4 features de difficulté croissante ; chaque squad choisit sa feature d'entrée |
| L'IA générative produit du plausible mais faux | Le dépôt contient des **bugs plantés** que l'IA ne détecte pas spontanément → l'anti-pattern est vécu, pas raconté |
| Le sujet est anxiogène (« l'IA va me remplacer ») | Le scénario met les participants en position d'**arbitre** de l'IA, pas de concurrent |
| 21 h, c'est long | Chaque journée a un **boss** avec une victoire nette et un score |
| Les exercices « jouets » ne transfèrent pas | Le dépôt SkyRetail est un vrai projet Angular/.NET avec de la dette réelle |
| Il faut évaluer (Qualiopi) | Le score QA Credits et les livrables du dossier de recette **sont** l'évaluation formative |

---

## 3. Les quatre features du produit (support de tous les exercices)

| Code | Feature | Périmètre technique | Ce qu'elle sert à enseigner |
|---|---|---|---|
| **F1** | **Moteur de remises** | Domaine .NET pur (`SkyRetail.Domain/Pricing`) — 6 règles cumulables, priorités, plafonds | Tests unitaires, oracle, property-based, mutation testing, tests tautologiques |
| **F2** | **Tunnel de commande** | Angular (`checkout/`) + API `/api/orders` | E2E Playwright, sélecteurs, flakiness, self-healing, régression visuelle |
| **F3** | **Catalogue & recherche** | API .NET documentée en OpenAPI, 23 endpoints | Tests d'API et de contrat, fuzzing, charge, génération depuis spécification |
| **F4** | **Espace client & RGPD** | Angular + API `/api/me`, export et suppression de données | Sécurité, accessibilité, conformité, données de test, priorisation par risques |

### 3.1 Les bugs plantés (à ne PAS divulguer aux participants)

Le dépôt contient **9 défauts délibérés**. Ils constituent l'oracle du formateur :
un squad qui les trouve tous a réellement réussi la mission.

| ID | Feature | Nature | Détectable par | Difficulté |
|---|---|---|---|---|
| BUG-101 | F1 | Deux remises « non cumulables » se cumulent quand elles sont appliquées dans l'ordre inverse | Test unitaire de règle métier, PBT | ⭐⭐ |
| BUG-102 | F1 | Arrondi TVA au demi-centime supérieur au lieu de l'arrondi bancaire → écart de 0,01 € au-delà de 7 lignes | PBT / test paramétré à fort volume | ⭐⭐⭐ |
| BUG-103 | F1 | Le plafond de remise (30 %) n'est pas appliqué si le panier contient un article en précommande | Analyse de couverture de branches | ⭐⭐⭐ |
| BUG-201 | F2 | Double-clic sur « Valider » crée deux commandes (pas d'idempotence) | E2E + test de concurrence | ⭐⭐ |
| BUG-202 | F2 | Le bouton « Payer » reste actif 400 ms après la soumission → **cause racine de 7 des 12 tests flaky historiques** de `main` (travaillés en M07) ; sur la branche du Boss J3, il n'est révélé que par **un seul** échec, `E-01`, classé « vrai bug produit » | Trace Playwright, analyse de flakiness | ⭐⭐⭐⭐ |
| BUG-301 | F3 | `GET /api/products?page=-1` renvoie 500 au lieu de 400 | Fuzzing / test de contrat OpenAPI | ⭐ |
| BUG-302 | F3 | La recherche full-text dégénère en O(n²) au-delà de 5 000 produits → p95 > 4 s sous charge | Test de charge k6/NBomber | ⭐⭐⭐ |
| BUG-401 | F4 | L'export RGPD inclut l'identifiant interne d'un **autre** utilisateur dans le champ `referrerId` | Revue de sécurité + test de conformité | ⭐⭐⭐⭐ |
| BUG-402 | F4 | Le formulaire de suppression de compte n'a pas de `<label>` associé et n'est pas atteignable au clavier | axe-core / test manuel a11y | ⭐ |

> ⚠️ **Piège volontaire** : sur BUG-102 et BUG-401, un LLM à qui l'on demande « génère les tests
> de cette classe » écrira des tests qui **passent** — c'est-à-dire qui figent le bug.
> C'est la démonstration centrale du module M1 (§ anti-pattern du test tautologique).

---

## 4. Règles du jeu

### 4.1 Les squads

Groupes Human Coders : 3 à 6 participants. Constitution en M0.

| Effectif | Organisation |
|---|---|
| 3 participants | 3 squads solo, entraide autorisée, boss en coopératif |
| 4 participants | 2 squads de 2 |
| 5 participants | 1 squad de 3 + 1 squad de 2 |
| 6 participants | 3 squads de 2 |

**Noms de squad imposés** (le tirage au sort fait partie du rituel de M0) :

- 🔮 **Squad ORACLE** — devise : *« Un test qui ne peut pas échouer ne teste rien. »*
- 🎯 **Squad HUNTER** — devise : *« Le bug existe. Il faut juste le provoquer. »*
- 🛡️ **Squad GUARDIAN** — devise : *« En production, personne ne relance le pipeline. »*

Chaque squad désigne à chaque module un **Pilote** (au clavier) et un **Copilote** (relecteur).
**Rotation obligatoire à chaque module** — c'est le mécanisme qui empêche qu'un seul participant
fasse toute la formation.

### 4.2 Le score : les QA Credits (QAC)

| Source | Gain |
|---|---|
| Exercice ⭐ réussi | **10 QAC** |
| Exercice ⭐⭐ réussi | **20 QAC** |
| Exercice ⭐⭐⭐ réussi | **40 QAC** |
| Exercice ⭐⭐⭐⭐ réussi | **80 QAC** |
| Boss de journée réussi | **150 QAC** |
| Boss final (Go/No-Go) | **300 QAC** |
| Découverte d'un bug planté non listé dans l'énoncé | **+50 QAC** |
| Aide apportée à un autre squad (validée par lui) | **+15 QAC** |

**Malus — la Dette Technique (DT)**, appliquée sans discussion par le formateur :

| Infraction | Malus |
|---|---|
| Test tautologique livré (assertion qui reproduit l'implémentation) | **−30 QAC** |
| Sélecteur halluciné : locator inventé par l'IA, jamais exécuté contre le vrai DOM | **−30 QAC** |
| Secret, token ou données personnelles réelles commités | **−50 QAC** |
| Test mis en `[Skip]` / `test.skip` pour faire passer la CI | **−40 QAC** |
| Couverture augmentée sans aucune assertion nouvelle | **−25 QAC** |
| Livrable copié-collé d'un LLM sans relecture (détecté au débriefing) | **−20 QAC** |

> 🎯 **Intention pédagogique du malus** : le score ne récompense pas la vitesse de production
> de l'IA, il récompense **le jugement**. Un squad qui génère 200 tests en 10 minutes et
> en livre 40 tautologiques finit dernier. C'est le message central de la formation.

### 4.3 Les badges (déblocables, cumulables, sans valeur en QAC)

| Badge | Condition d'obtention |
|---|---|
| 🔍 **L'Œil** | Premier squad à trouver un bug planté |
| 🧿 **L'Oracle** | Écrire un test qui échoue *avant* de corriger le code (vrai TDD sur un bug planté) |
| 🪤 **Le Piégeur** | Faire échouer un test généré par l'IA en modifiant une seule ligne de production |
| ⚡ **Le Rapide** | Réduire le temps du pipeline de plus de 40 % |
| 🧹 **Le Fossoyeur de Flaky** | Éliminer la cause racine d'un test flaky (pas un `retry`) |
| 🔐 **Le Gardien** | Détecter BUG-401 (fuite de données dans l'export RGPD) |
| ♿ **L'Inclusif** | Atteindre 0 violation axe-core critique sur le parcours F4 |
| 💰 **L'Économe** | Réaliser un module complet en consommant moins de tokens qu'un squad concurrent, à résultat égal |
| 🎓 **Le Pédagogue** | Expliquer une notion à un autre squad de façon jugée claire par celui-ci |
| 🏆 **Golden Oracle** | Score final le plus élevé — trophée remis en clôture |

### 4.4 Affichage du score

Un tableau `SCOREBOARD.md` est tenu à jour dans le dépôt partagé (ou sur un paperboard
en présentiel). Il est mis à jour **à chaque fin de module**, à voix haute, en 60 secondes.

```markdown
| Squad      | J1  | J2  | J3  | J4  | Total | Badges        |
|------------|-----|-----|-----|-----|-------|---------------|
| 🔮 ORACLE  | 210 |     |     |     |  210  | 🔍 🧿          |
| 🎯 HUNTER  | 180 |     |     |     |  180  | 🪤             |
| 🛡️ GUARDIAN| 235 |     |     |     |  235  | 🔍 ⚡          |
```

---

## 5. Les quatre boss

### 5.1 Boss J1 — « Le Cahier des Charges Fantôme » (30 min, 150 QAC)

**Mise en situation.** Le métier vous envoie les 6 pages du cahier des charges v4.0 à 17 h.
Le comité d'architecture est demain matin. Il veut savoir **ce qui est testable et ce qui ne l'est pas**.

**Livrable attendu.**

1. Un fichier `boss-j1/plan-de-test-v4.md` contenant :
   - la liste des exigences extraites, numérotées **EX-001** à **EX-0nn**,
   - pour chacune : testable **oui/non**, type de test, priorité, et **la question à poser au métier** si non testable ;
2. la liste des **ambiguïtés** détectées — le cahier des charges en contient **7** délibérées ;
3. au moins **12 scénarios Gherkin** générés puis **revus**, avec la mention explicite
   de ce qui a été **corrigé** par rapport à la sortie brute du LLM.

**Barème.**

| Critère | Points |
|---|---|
| ≥ 90 % des exigences extraites | 40 |
| ≥ 5 ambiguïtés sur 7 détectées | 40 |
| 12 scénarios Gherkin valides syntaxiquement (`npx @cucumber/gherkin-utils` passe) | 30 |
| Diff explicite entre sortie brute et version revue | 40 |
| **Bonus** : avoir détecté que l'exigence EX-014 contredit EX-003 | +30 |

---

### 5.2 Boss J2 — « L'Agent Zéro » (45 min, 150 QAC)

**Mise en situation.** Vous partez en congés vendredi. Votre agent doit pouvoir tourner sans vous.

**Livrable attendu.** Un agent (Claude Code : `CLAUDE.md` + skill + subagent, ou Agent SDK)
qui, lancé sur une commande unique, sait :

1. lire une exigence en langage naturel,
2. générer les tests correspondants (unitaires .NET **ou** E2E Playwright),
3. **les exécuter réellement**,
4. si échec, analyser et proposer une correction (du test **ou** du code, en le distinguant),
5. produire un rapport `rapport-agent.md` lisible par un humain non technique.

**Barème.**

| Critère | Points |
|---|---|
| L'agent s'exécute de bout en bout sans intervention | 50 |
| Les tests générés sont réellement exécutés (preuve : sortie du runner) | 40 |
| L'agent distingue « le test est faux » de « le code est faux » | 30 |
| Rapport compréhensible par un chef de projet | 20 |
| Garde-fou explicite (l'agent refuse de modifier le code de production sans validation) | 10 |
| **Malus** : l'agent modifie silencieusement une assertion pour faire passer un test | −80 |

> ⚠️ Le malus ci-dessus est le cœur du module M6. Statistiquement, au moins un squad
> se fera prendre. Le débriefing en tire l'enseignement central sur les boucles de vérification.

---

### 5.3 Boss J3 — « Le Pipeline Rouge » (45 min, 150 QAC)

**Mise en situation.** 22 h 40. La branche `release/v4.0` est rouge. 47 tests, 19 en échec.
Le go-live est demain 8 h. Vous n'avez pas le droit de supprimer ni de skipper un test.

**Livrable attendu.** Pipeline vert, avec un fichier `boss-j3/post-mortem.md` classant
les 19 échecs en **quatre catégories** :

| Catégorie | Attendu |
|---|---|
| **Vrai bug produit** | 4 échecs — dont BUG-202 et BUG-302 |
| **Test faux** (assertion erronée, donnée périmée) | 6 échecs |
| **Flaky** (attente implicite, ordre d'exécution, fuseau horaire) | 7 échecs |
| **Environnement** (port occupé, migration non jouée) | 2 échecs |

**Barème.**

| Critère | Points |
|---|---|
| Pipeline vert sans `skip` ni suppression | 50 |
| Classement correct des 19 échecs — 3 pts × 19, plafond 57 *(corrigé nominatif E-01 → E-19 en `module-09` §4.5-4.6)* | 57 |
| Cause racine de BUG-202 identifiée (et non contournée par un `waitForTimeout`) | 30 |
| Temps de pipeline réduit sous 20 min | 13 |
| **Malus** : ajout d'un `retry` global pour masquer la flakiness | −60 |

---

### 5.4 Boss final J4 — « Le Comité de Go/No-Go » (60 min, 300 QAC)

**Mise en situation.** Chaque squad passe **10 minutes** devant le comité —
joué par le formateur (rôle : directeur technique) et les autres squads (rôle : métier + DPO).

**Livrable attendu.** Un `DOSSIER-DE-RECETTE.md` de 4 à 6 pages, comportant :

1. **Recommandation** : Go, Go conditionnel, ou No-Go — assumée en une phrase ;
2. **Cartographie des risques** : matrice probabilité × impact sur les 4 features, avec la couverture de test associée à chaque risque ;
3. **Preuves** : couverture, score de mutation, résultats de charge (p95), scan sécurité, violations a11y ;
4. **Ce que l'IA a fait, ce que l'humain a validé** : tableau de traçabilité — c'est la question que posera le comité ;
5. **Conformité** : données de test utilisées, base légale, rétention chez le fournisseur de LLM, positionnement AI Act ;
6. **Coût et ROI** : tokens consommés, temps humain économisé, dette de maintenance créée ;
7. **Dettes ouvertes** : ce qui n'a pas été testé et pourquoi.

**Barème.**

| Critère | Points |
|---|---|
| Recommandation claire et défendue sous contradiction | 60 |
| Matrice de risques cohérente avec les preuves apportées | 60 |
| Traçabilité IA/humain complète | 50 |
| Volet conformité correct (RGPD + AI Act) | 40 |
| Chiffrage ROI honnête (y compris les coûts cachés) | 40 |
| Réponse aux 3 questions pièges du comité (§5.5) | 50 |

### 5.5 Les trois questions pièges du comité (à poser à chaque squad)

1. *« Vous me dites 78 % de couverture. Si je supprime la ligne 42 de `DiscountEngine.cs`,
   combien de vos tests tombent ? »*
   → teste la compréhension de l'écart couverture / score de mutation.
2. *« Ces 340 tests, qui les maintient dans six mois quand le modèle aura changé de version ? »*
   → teste la compréhension de la dérive de modèle et du coût de maintenance.
3. *« Le jeu de données que votre agent a généré, il vient d'où ? On a le droit de l'envoyer
   à un fournisseur américain ? »*
   → teste le volet RGPD / rétention / anonymisation.

---

## 6. Rituels d'animation

| Moment | Rituel | Durée |
|---|---|---|
| Ouverture de journée | **Le Brief** : rappel de la situation, score de la veille, objectif du jour | 5 min |
| Début de module | **La Carte** : où on est dans la mission, ce qui est en jeu | 2 min |
| Fin d'exercice ⭐⭐⭐ et ⭐⭐⭐⭐ | **Le Contre-Test** : un squad tente de casser la solution d'un autre | 5 min |
| Fin de module | **Le Scoreboard** : mise à jour à voix haute | 1 min |
| Fin de journée | **Le Debrief** : 1 chose apprise, 1 chose surprenante, 1 doute — par participant | 10 min |
| Clôture J4 | **Golden Oracle** + tour de table « ce que je fais lundi matin » | 15 min |

### 6.1 Le Contre-Test (mécanique clé)

Après chaque exercice difficile, un squad adverse dispose de **5 minutes** pour **faire échouer**
la solution livrée — en modifiant une ligne du code de production, en changeant une donnée,
ou en montrant que le test passe alors qu'il ne devrait pas.

- Contre-test réussi : **+20 QAC** à l'attaquant, **−10 QAC** au défenseur.
- Contre-test échoué : **+10 QAC** au défenseur.

C'est le dispositif qui transforme « j'ai généré des tests » en « mes tests tiennent ».

---

## 7. Progression narrative jour par jour

| Jour | Titre | État de la mission au départ | État à l'arrivée |
|---|---|---|---|
| **J1** | L'état des lieux | Personne ne sait ce qui est testé | Plan de test v4.0 tracé, ambiguïtés remontées au métier, premiers bugs suspectés |
| **J2** | L'arsenal | Tout se fait à la main, prompt par prompt | Un agent maison génère, exécute et commente |
| **J3** | L'industrialisation | L'agent tourne sur un poste | L'agent tourne dans la CI, pipeline vert, non-fonctionnel couvert |
| **J4** | La mise en production | Ça marche, mais personne ne sait si c'est tenable | Dossier de recette, décision Go/No-Go argumentée, gouvernance posée |

---

## 8. Matériel du formateur

| Élément | Où | Quand |
|---|---|---|
| Dépôt `skyretail` (branche `formation/j1-start`) | Git interne / archive fournie | avant J1 |
| Cahier des charges v4.0 (6 pages, 7 ambiguïtés) | `docs/cdc-v4.0.md` | remis en M2 |
| Branche `formation/j3-pipeline-rouge` (19 échecs) | dépôt | J3 uniquement |
| Corrigés des 9 bugs plantés | `SOLUTIONS/` (branche protégée) | jamais partagé |
| `SCOREBOARD.md` | racine du dépôt partagé | tenu en continu |
| Cartes de badges imprimées | présentiel | J1 |
| Grille de soutenance | `annexes/annexe-C-grilles-evaluation.md` | J4 |

---

## 9. Plan B

| Incident | Réaction |
|---|---|
| Pas de connexion / quota API épuisé | Basculer sur les **transcriptions pré-enregistrées** fournies dans `SOLUTIONS/transcripts/` : les exercices deviennent des analyses critiques de sorties d'IA réelles. Le contenu pédagogique tient sans API. |
| Un squad très en avance | Débloquer les **exercices bonus ⭐⭐⭐⭐⭐** (un par jour, listés en fin de module) ; ou le nommer arbitre des Contre-Tests |
| Un squad très en retard | Lui donner la branche `formation/checkpoint-Mxx` qui contient l'état attendu en fin de module précédent |
| Le dépôt ne compile pas chez un participant | Conteneur `devcontainer.json` fourni ; à défaut, binômage forcé |
| Tension liée au classement | Rappeler que le score est **collectif par squad** et que les Contre-Tests rapportent aux deux camps ; en dernier recours, masquer le classement et ne garder que les badges |
