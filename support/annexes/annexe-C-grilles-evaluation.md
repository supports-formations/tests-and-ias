# Annexe C — Grilles d'évaluation

**Formation « Test logiciel avec IA générative »** — Human Coders (certifié Qualiopi) · Evan BOISSONNOT
**Version 1.0 — juillet 2026**

> 📘 Ce document rassemble **toutes** les pièces d'évaluation de la formation, du diagnostic
> d'entrée à la traçabilité Qualiopi. Les sections §1, §5 et §6 sont distribuées aux
> participants ; les sections §2, §3, §4 et §8 sont réservées au formateur.

---

## Sommaire

| § | Grille | Destinataire | Moment |
|---|---|---|---|
| 1 | Auto-positionnement d'entrée (8 questions, 4 niveaux) | Participant | M0 |
| 2 | Validation des 49 exercices | Formateur | En continu |
| 3 | Notation des 4 boss | Formateur | Fin de chaque journée |
| 4 | Soutenance du Go/No-Go | Formateur | J4 |
| 5 | Feuille de score vierge `SCOREBOARD.md` | Tous | En continu |
| 6 | Questionnaire de satisfaction à chaud (12 questions) | Participant | Fin J4 |
| 7 | Questionnaire à froid (6 questions) | Participant | J+60 |
| 8 | Traçabilité objectifs O1-O13 × modules × modalités | Organisme | Archivage |

---

# §1. Grille d'auto-positionnement d'entrée

**Modalité** : individuelle, 7 minutes, en M0. **Évaluation diagnostique au sens Qualiopi.**
Elle n'est **pas notée** : elle sert à composer les squads et à ajuster le rythme.

## 1.1 Le questionnaire

> Notez chaque affirmation de **0 à 3** :
> **0** = jamais fait · **1** = j'en ai entendu parler · **2** = je l'ai fait accompagné·e ·
> **3** = je le fais seul·e en production

| # | Affirmation | Axe de compétence | 0 | 1 | 2 | 3 |
|---|---|---|:-:|:-:|:-:|:-:|
| **Q1** | J'écris et j'exécute des tests unitaires dans un projet réel (xUnit, NUnit, Jest, Vitest…) | Fondamentaux du test | ☐ | ☐ | ☐ | ☐ |
| **Q2** | Je sais expliquer la différence entre couverture de lignes, de branches et score de mutation | Métriques de qualité | ☐ | ☐ | ☐ | ☐ |
| **Q3** | J'ai déjà écrit un test end-to-end (Playwright, Cypress, Selenium) qui tourne en CI | Automatisation E2E | ☐ | ☐ | ☐ | ☐ |
| **Q4** | Je sais lire un pipeline GitHub Actions ou GitLab CI et y ajouter une étape | CI/CD | ☐ | ☐ | ☐ | ☐ |
| **Q5** | J'ai déjà utilisé un assistant IA (Copilot, Claude, Cursor…) pour produire du code de test | Usage de l'IA | ☐ | ☐ | ☐ | ☐ |
| **Q6** | Je sais dire ce qu'est un **oracle de test** et pourquoi il ne doit pas être le code lui-même | Concept clé du J1 | ☐ | ☐ | ☐ | ☐ |
| **Q7** | J'ai déjà rédigé des scénarios Gherkin / Given-When-Then exploités par un outil | Spécification exécutable | ☐ | ☐ | ☐ | ☐ |
| **Q8** | Je connais les obligations RGPD applicables à un jeu de données de test | Conformité | ☐ | ☐ | ☐ | ☐ |
| | | **Total /24** | | | | |

**Nom / prénom** : ______________________  **Date** : ____ / ____ / ______

## 1.2 Exploitation par le formateur (60 secondes)

| Profil | Signal | Ajustement pédagogique |
|---|---|---|
| **Total ≤ 8** | Public junior ou non technique | Renforcer les démonstrations guidées · binômage permanent autorisé · **alléger M6** (l'agent est fourni, on l'analyse et on le durcit) |
| **Total 9-16** | Public cible | Dérouler le support nominal |
| **Total ≥ 17** | Public senior | Débloquer les exercices bonus ⭐⭐⭐⭐⭐ **dès M1** · durcir les Contre-Tests |
| **Q6 = 0 ou 1 chez ≥ 50 %** | Notion d'oracle absente | Traiter §1.2 de M1 en **démonstration collective** plutôt qu'en lecture |
| **Q8 = 0 chez ≥ 50 %** | Volet conformité fragile | Prévenir la salle : « M11 sera dense » · **ne pas le sacrifier** au profit du temps de TP |
| **Q5 = 3 chez ≥ 50 %** | Public déjà outillé | Accélérer M4 §1, insister sur M4-4 (variabilité) et M6-4 (l'agent qui triche) |

**Composition des squads** : équilibrer les totaux entre squads, **écart maximal visé : 4 points**.
Un squad homogène et faible décroche ; un squad homogène et fort dépasse le support.

**Archivage** : cette grille est une pièce Qualiopi. Elle est conservée avec la feuille
d'émargement.

---

# §2. Grille de validation des 49 exercices

**Usage** : le formateur coche au fil de l'eau. Un exercice est **validé** quand le critère
de la dernière colonne est satisfait — objectivement, pas à l'appréciation.

**Légende difficulté** : ⭐ Découverte · ⭐⭐ Application · ⭐⭐⭐ Transfert · ⭐⭐⭐⭐ Défi
(le 4ᵉ exercice de chaque module confronte à une **limite** de l'IA générative).

## Jour 1 — L'état des lieux

| Code | Intitulé | Diff. | QAC | Critère de validation en une ligne |
|---|---|:-:|:-:|---|
| **M0-1** | « L'état des lieux » | ⭐ | 10 | `boss-j1/etat-des-lieux.md` commité, 6 indicateurs relevés **avec la commande utilisée**, tolérance ±1 sur les comptages |
| **M1-1** | « Le premier contact » | ⭐ | 10 | Suite générée **exécutée** ; les trois chiffres *générés / compilent / passent* sont **lus dans la sortie du runner**, pas estimés |
| **M1-2** | « L'audit de tautologie » | ⭐⭐ | 20 | Chaque test classé (S)/(C)/(I) sans trou ; au moins un test réécrit en (S) **avec citation du cahier des charges** et son statut consigné |
| **M1-3** | « La matrice de décision » | ⭐⭐⭐ | 40 | Les 4 features couvertes avec **des choix différents** ; oracle = artefact nommé et existant, **jamais « le code »** |
| **M1-4** | « Prendre l'IA en défaut » 🎯 | ⭐⭐⭐⭐ | 80 | Test **rouge** démontrant un écart de **0,01 € minimum** sur un panier d'au moins 7 lignes, assertion citant sa norme d'arrondi |
| **M2-1** | « L'extracteur d'exigences » | ⭐ | 10 | ≥ 8 exigences numérotées sans trou, énoncés en **citation littérale**, ≥ 2 classées « non testable en l'état » |
| **M2-2** | « Douze scénarios, et le diff » | ⭐⭐ | 20 | Brut **et** revu coexistent ; validation Gherkin sans erreur ; ≥ 3 corrections catégorisées ; traçabilité par scénario |
| **M2-3** | « Imposer la technique » | ⭐⭐⭐ | 40 | La génération guidée produit **strictement plus** de cas aux bornes ; `[Theory]` avec ≥ 9 `[InlineData]` dont les 3 points de chaque frontière |
| **M2-4** | « L'exigence impossible » 🎯 | ⭐⭐⭐⭐ | 80 | La contradiction est nommée par ses **deux identifiants d'exigence**, prouvée par une table de décision, et la question au métier est rédigée |
| **M3-1** | « La graine » | ⭐ | 10 | Test de déterminisme **vert** ; graine constante versionnée ; **aucun** e-mail sur un domaine réel |
| **M3-2** | « Écrire une propriété » | ⭐⭐ | 20 | 2 propriétés exécutables dont une exprimant une **relation** (aucune constante de calcul dans le corps) ; ≥ 1 falsifiée, contre-exemple et graine consignés |
| **M3-3** | « Tuer les survivants » | ⭐⭐⭐ | 40 | 3 mutants documentés avec « ce que sa survie prouve » ; seconde exécution de Stryker confirmant les kills ; **score en hausse d'au moins 5 points** |
| **M3-4** | « Le rapport qui invente » 🎯 | ⭐⭐⭐⭐ | 80 | Chaque affirmation classée (T)/(H)/(F) ; **≥ 1 affirmation fabriquée** identifiée **avec la preuve de sa fausseté** ; ≥ 1 omission relevée |

## Jour 2 — L'arsenal

| Code | Intitulé | Diff. | QAC | Critère de validation en une ligne |
|---|---|:-:|:-:|---|
| **M4-1** | « Les cinq blocs » | ⭐ | 10 | `v1.md` **inchangé** conservé ; `v2.md` avec les six balises dans l'ordre, `<task>` en dernier, ≥ 1 variable, ≥ 1 interdiction vérifiable |
| **M4-2** | « Le contrat de 200 lignes » | ⭐⭐ | 20 | `CLAUDE.md` **< 200 lignes** ; ≥ 5 commandes ; ≥ 4 règles à l'impératif négatif ; `permissions.deny` en place ; delta de tokens `/context` consigné |
| **M4-3** | « L'écart mesuré » | ⭐⭐⭐ | 40 | Deux exécutions avec `total_cost_usd` non nul ; tableau 6 critères × 2 colonnes **toutes valeurs lues** ; ≥ 1 test rouge cité avec son message |
| **M4-4** | « La variabilité irréductible » 🎯 | ⭐⭐⭐⭐ | 80 | 6 exécutions réelles ; stabilité intra-prompt **strictement < 100 %** ; conclusion formulée en **probabilité**, sans promesse de reproductibilité |
| **M5-1** | « Les yeux de l'agent » | ⭐ | 10 | `.mcp.json` versionné ; `playwright` listé ; 3 comptes entiers lus dans le snapshot ; ≥ 1 référence d'élément recopiée telle quelle |
| **M5-2** | « Zéro sélecteur halluciné » | ⭐⭐ | 20 | Test **exécuté** (vert ou rouge) ; tableau de traçabilité sans ligne vide ; **zéro** CSS positionnel et **zéro** `waitForTimeout` |
| **M5-3** | « La grille de décision » | ⭐⭐⭐ | 40 | 4 lignes F1-F4 ; ≥ 3 sources distinctes citées ; ≥ 1 outil écarté pour un **motif technique vérifiable** ; ligne « ce que cette grille ne dit pas » |
| **M5-4** | « L'outil qui ment » 🎯 | ⭐⭐⭐⭐ | 80 | L'attaque est **nommée** et rattachée à 2 référentiels ; 3 indices cités **littéralement** ; 3 contre-mesures sourcées ; réponse argumentée et **négative** à la question finale |
| **M6-1** | « Agent, workflow ou script ? » | ⭐ | 10 | 5 verdicts avec critère ; **≥ 2 classés « script » ou « workflow »** ; critère pris dans la liste des trois autorisés |
| **M6-2** | « Le hook qui bloque vraiment » | ⭐⭐ | 20 | Édition du code de production **refusée**, sortie à l'appui ; ≥ 1 ligne `REFUS` horodatée ; la variante `exit 1` testée et le constat écrit |
| **M6-3** | « Le verdict binaire » | ⭐⭐⭐ | 40 | Sous-agent sans `Edit`/`Write`/`Bash` ; 3 verdicts au format exact ; le 3ᵉ cas produit `SPECIFICATION MANQUANTE` ; chaque verdict cite une ligne réelle du CDC |
| **M6-4** | « Faites-le tricher » 🎯 | ⭐⭐⭐⭐ | 80 | ≥ 4 manœuvres documentées avec trace ; ≥ 1 réussie (ou journal complet des refus expliqué) ; contre-mesures **implémentables** ; limite des 8 blocages mentionnée |

## Jour 3 — L'industrialisation

| Code | Intitulé | Diff. | QAC | Critère de validation en une ligne |
|---|---|:-:|:-:|---|
| **M7-1** | « Le dossier d'échec » | ⭐ | 10 | 7 sections ; **≤ 200 lignes** ; un `--repeat-each=10` réellement exécuté avec les 10 statuts listés ; diff limité au chemin du système sous test |
| **M7-2** | « Six clusters, pas dix-neuf » | ⭐⭐ | 20 | Script exécuté affichant `19 échecs → N clusters` avec **4 ≤ N ≤ 8** ; le plus gros cluster compte **exactement 7 tests**, dont 5 du périmètre F2, et est consigné comme **hypothèse** de cause unique ; coût **lu**, pas estimé |
| **M7-3** | « La taxonomie appliquée » | ⭐⭐⭐ | 40 | 6 colonnes par ligne ; ≥ 3 catégories distinctes ; commande reproductible par ligne ; résultats en `n/N` ; **aucune** contre-mesure interdite |
| **M7-4** | « Vrai bug ou flakiness ? » 🎯 | ⭐⭐⭐⭐ | 80 | Nouveau test **rouge même avec un `waitForTimeout` ailleurs** ; diff touchant **les deux couches** ; `--repeat-each=20 --workers=4` → 20/20, 0 flaky ; `grep` de contournements **vide** |
| **M8-1** | « Le premier job headless » | ⭐ | 10 | Run visible et réussi ; coût **lu dans `total_cost_usd`** ; `permissions:` limité à `contents: read` ; `timeout-minutes ≤ 10` ; tous les `uses:` sur SHA de 40 caractères |
| **M8-2** | « La preuve du non-déterminisme » | ⭐⭐ | 20 | 10 sorties hachées ; taux de reproductibilité **< 1,0** ; **où** les sorties divergent est indiqué ; stratégie de remplacement par **assertion de propriété à seuil** |
| **M8-3** | « Sous les 20 minutes » | ⭐⭐⭐ | 40 | Chemin critique **< 20 min** avec durées relevées dans l'interface ; 4 shards à **±25 %** ; `fail-fast: false` ; **nombre total de tests identique** avant/après, prouvé |
| **M8-4** | « La pull request hostile » 🎯 | ⭐⭐⭐⭐ | 80 | Étape IA **skippée** sur PR externe, **aucun appel facturé** ; `pull_request_target` absent ; ni `Bash` ni `Write` ni `Edit` dans le job de diagnostic ; contre-mesures classées en 2 colonnes |
| **M9-1** | « Le premier seuil — et la borne oubliée » | ⭐ | 10 | Seuil exprimé en **`p(95)`**, jamais `avg` ; les **deux codes de sortie** relevés ; le `check` sur `?page=-1` présent et **BUG-301** (500 au lieu de 400) consigné en fiche de défaut ; aucune option obsolète |
| **M9-2** | « Le scan et ses faux positifs » | ⭐⭐ | 20 | Plan avec `openapi`, `activeScan`, `report` ; 5 colonnes par alerte ; **chaque catégorie porte son millésime 2025** ; ≥ 1 exclusion justifiée ; code de sortie expliqué |
| **M9-3** | « Le mur des 5 000 produits » | ⭐⭐⭐ | 40 | 5 points mesurés ; exécuteur **à taux d'arrivée** ; point d'inflexion **justifié par le calcul** ; ≥ 1 métrique serveur jointe ; conclusion « dégradation supra-linéaire » chiffrée |
| **M9-4** | « Le vert trompeur » 🎯 | ⭐⭐⭐⭐ | 80 | Deux tests **rouges** (conformité + clavier **sans aucun `page.click()`**) ; ≥ 4 outils avec « pourquoi il ne voit pas » et sortie réelle ; **oracle nommé** pour chaque test |

## Jour 4 — La mise en production

| Code | Intitulé | Diff. | QAC | Critère de validation en une ligne |
|---|---|:-:|:-:|---|
| **M10-1** | « Combien a coûté cette nuit ? » | ⭐ | 10 | 4 métriques **lues dans le collecteur** (capture ou export joint) ; identifiant de modèle **complet et daté**, jamais un alias |
| **M10-2** | « Le jeu d'évals des neuf bugs » | ⭐⭐ | 20 | Prompt référencé par `file://` ; ≥ 5 cas dont le **contrôle négatif** ; **≥ 1 assertion déterministe par cas** ; exécution réelle produisant une matrice |
| **M10-3** | « Le juge sous contrôle » | ⭐⭐⭐ | 40 | Modèle juge **≠** modèle sous test ; nombre de comparaisons **égal dans les deux sens** (preuve de permutation) ; conclusion **cohérente avec l'intervalle de confiance** |
| **M10-4** | « Faites mentir votre propre jeu d'évals » 🎯 | ⭐⭐⭐⭐ | 80 | ≥ 1 contournement **exécuté** avec sortie avant/après, reproductible par un tiers ; ≥ 2 durcissements dont un déterministe ; le durcissement appliqué **neutralise** l'exploit |
| **M11-1** | « Anonyme, vraiment ? » | ⭐ | 10 | Les **trois** critères traités ; qualification **« pseudonymisé »** justifiée par la réversibilité ; ≥ 1 champ résiduel identifiant nommé ; conséquence RGPD énoncée |
| **M11-2** | « Le comparatif des rétentions » | ⭐⭐ | 20 | Tableau ≥ 5 lignes × ≥ 3 colonnes ; régime **grand public distingué** du régime commercial ; réponse ZDR mentionnant les endpoints exclus **et** les 30 jours de logs |
| **M11-3** | « Durcir l'agent contre une PR hostile » | ⭐⭐⭐ | 40 | `permissions.deny` couvrant les 5 cibles ; `sandbox` avec liste de domaines **minimale** ; test vérifiant **3 surfaces** ; le test **échoue** si le bloc `sandbox` est retiré |
| **M11-4** | « Le calendrier que tout le monde cite est faux » 🎯 | ⭐⭐⭐⭐ | 80 | Réponse brute consignée **verbatim** avec date et modèle ; écart documenté ligne à ligne ; **ce qui n'a pas bougé** distingué de ce qui a bougé ; réserve d'adoption formelle présente |
| **M12-1** | « La cotation d'impact » | ⭐ | 10 | 6 lignes cotées **par le PO** (formateur), une justification par ligne rattachée à une conséquence nommée ; ≥ 1 cote justifiée par une obligation réglementaire ; **cotes non uniformes** |
| **M12-2** | « Le tableau de bord et son APFD » | ⭐⭐ | 20 | Tableau et CSV générés avec les 4 colonnes ; APFD calculée **avec le détail des rangs** ; l'ordre priorisé a une APFD **strictement supérieure**, sinon explication |
| **M12-3** | « Le ROI que vous oseriez montrer » | ⭐⭐⭐ | 40 | Trois blocs distincts — bénéfices / coûts directs / **coûts cachés** — chacun avec une **source de mesure nommée**, aucune estimation non signalée |
| **M12-4** | « Demandez à l'IA de prioriser » 🎯 | ⭐⭐⭐⭐ | 80 | La priorisation produite par le modèle est confrontée à la matrice humaine ; les écarts sont **nommés et expliqués** ; la limite (l'impact métier n'est pas délégable) est écrite |

## Récapitulatif

| Difficulté | Nombre | QAC unitaire | Sous-total |
|---|:-:|:-:|:-:|
| ⭐ Découverte | 13 | 10 | **130** |
| ⭐⭐ Application | 12 | 20 | **240** |
| ⭐⭐⭐ Transfert | 12 | 40 | **480** |
| ⭐⭐⭐⭐ Défi | 12 | 80 | **960** |
| **Total exercices** | **49** | | **1 810** |
| Boss de journée (×3) | 3 | 150 | **450** |
| Boss final | 1 | 300 | **300** |
| **Total maximum hors bonus** | | | **2 560 QAC** |

> 🎯 **Les bonus et les Contre-Tests s'ajoutent** : +50 QAC par bug planté découvert hors énoncé,
> +15 QAC par aide validée, +20/−10 par Contre-Test. Un squad peut donc dépasser 2 560.
> Les malus de Dette Technique se déduisent sans plafond.

---

# §3. Grille de notation des 4 boss

## 3.1 👑 Boss J1 — « Le Cahier des Charges Fantôme » *(30 min, 150 QAC)*

| Critère | Points | Vérification |
|---|:-:|---|
| ≥ 90 % des exigences extraites | **40** | Comptage contre la liste de référence du formateur |
| ≥ 5 ambiguïtés sur 7 détectées | **40** | Corrigé des 7 ambiguïtés (M3 §4.5) |
| 12 scénarios Gherkin syntaxiquement valides | **30** | `npx @cucumber/gherkin-utils` passe |
| Diff explicite entre sortie brute et version revue | **40** | Les deux fichiers coexistent, corrections catégorisées |
| **Bonus** — avoir détecté que **EX-014 contredit EX-003** | **+30** | La table de décision le prouve |
| **Total** | **150 (+30)** | |

**Seuil de réussite** : 90/150.

## 3.2 👹 Boss J2 — « L'Agent Zéro » *(45 min, 150 QAC)*

| Critère | Points | Vérification |
|---|:-:|---|
| L'agent s'exécute **de bout en bout sans intervention** | **50** | Une commande, puis mains retirées du clavier |
| Les tests générés sont **réellement exécutés** | **40** | Sortie du runner produite en preuve |
| L'agent distingue « le test est faux » de « le code est faux » | **30** | Verdicts au format imposé, avec citation du CDC |
| Rapport compréhensible par un chef de projet | **20** | Lecture à voix haute par un participant d'un autre squad |
| Garde-fou explicite (refus de modifier le code de production sans validation) | **10** | Hook `exit 2`, journal des refus |
| **Malus** — l'agent modifie **silencieusement** une assertion pour verdir | **−80** | `git diff` sur les fichiers de test |
| **Total** | **150** | |

**Seuil de réussite** : 90/150.
⚠️ Le malus est le cœur du module M6 : statistiquement, au moins un squad se fera prendre.
Le débriefing en tire l'enseignement central sur les boucles de vérification.

## 3.3 🏆 Boss J3 — « Le Pipeline Rouge » *(45 min, 150 QAC)*

| Critère | Points | Vérification |
|---|:-:|---|
| Pipeline **vert sans `skip` ni suppression** | **50** | `git diff` : aucun `.skip`, aucun test retiré |
| Classement correct des 19 échecs — **3 pts × 19**, un classement par échec, plafond 57 | **57** | Corrigé nominatif **E-01 → E-19** en `module-09` §4.6 : 4 vrais bugs · 6 tests faux · 7 flaky · 2 environnement |
| Cause racine de BUG-202 identifiée, **non contournée par un `waitForTimeout`** | **30** | Le diff touche les deux couches |
| Temps de pipeline réduit **sous 20 min** | **13** | Durée relevée dans l'interface CI |
| **Malus** — `retry` global ajouté pour masquer la flakiness | **−60** | Configuration du runner |
| **Total** | **150** | |

**Seuil de réussite** : 90/150. **Badge associé** : 🧹 Le Fossoyeur de Flaky.

## 3.4 👑 Boss final J4 — « Le Comité de Go/No-Go » *(60 min, 300 QAC)*

| # | Critère | Points | Détail de la notation |
|---|---|:-:|---|
| 1 | **Recommandation claire et défendue sous contradiction** | **60** | 20 : recommandation en une phrase, en tête · 20 : trois conditions nommées si « conditionnel » · 20 : tient sous les cinq relances sans se contredire |
| 2 | **Matrice de risques cohérente avec les preuves** | **60** | 15 : deux axes distincts, impact **coté et signé** · 15 : 4 features couvertes · 15 : couverture rattachée à **chaque** risque · 15 : les 9 défauts positionnés ou leur absence justifiée |
| 3 | **Traçabilité IA / humain complète** | **50** | 20 : tableau présent, une ligne par artefact majeur · 15 : distingue « généré / revu / rejeté » **avec des volumes** · 15 : nomme la personne qui a validé |
| 4 | **Volet conformité correct (RGPD + AI Act)** | **40** | 10 : provenance des données · 10 : rétention fournisseur **chiffrée** · 10 : positionnement AI Act avec **dates révisées** · 10 : réserve explicite sur l'adoption formelle |
| 5 | **Chiffrage ROI honnête, coûts cachés inclus** | **40** | 15 : coûts directs **mesurés** · 15 : **au moins trois** coûts cachés · 10 : section « ce que nous ne prétendons pas savoir » |
| 6 | **Réponse aux 3 questions pièges** | **50** | Détail en §4.3 |
| **B1** | Coûts cachés présentés **spontanément** | **+20** | Sans y être invité |
| **B2** | **No-Go ou Go conditionnel argumenté** sur le défaut de conformité | **+20** | La conformité prime sur le calendrier — et c'est défendu |
| **B3** | Une preuve **rejouée en direct** à la demande du comité | **+15** | Commande lancée, sortie projetée |
| **M1** | Affirmation chiffrée **non rejouable** | **−30** | Par occurrence, plafonné à −60 |
| **M2** | « On a tout testé » | **−40** | Immédiat, sans discussion |
| **M3** | Couverture présentée comme preuve de risque maîtrisé, sans score de mutation | **−30** | C'est l'erreur centrale du module |
| **M4** | Responsabilité attribuée à l'IA | **−40** | « C'est le modèle qui… » |
| | **Total** | **300** | |

**Seuil de réussite** : **180/300**. En dessous, le squad conserve les points acquis mais
n'obtient pas les 300 QAC du boss.

---

# §4. Grille de soutenance du Go/No-Go

**Modalité** : 10 minutes par squad — **5 minutes d'exposé chronométré, coupé net** + 5 minutes
de contradiction. Le formateur joue le directeur technique ; les autres squads jouent le métier
et le DPO.

## 4.1 Recevabilité du livrable (préalable, éliminatoire)

| # | Condition | ✅ / ❌ |
|---|---|:-:|
| 1 | `DOSSIER-DE-RECETTE.md` **commité avant l'heure limite** | ☐ |
| 2 | 4 à 6 pages, **sept sections dans l'ordre imposé** | ☐ |
| 3 | Aucun support autre que le dossier projeté (pas de diapositives) | ☐ |
| 4 | Le Pilote du comité **n'est ni le Pilote ni le Copilote** du module précédent | ☐ |

> Un dossier commité après l'heure n'est **pas recevable**. C'est une contrainte de comité réel.

## 4.2 Les cinq relances du directeur technique

Le formateur en pose au minimum trois. Elles servent le critère 1 du barème.

| # | Relance | Ce qu'elle teste | Réponse faible | Réponse forte |
|---|---|---|---|---|
| R1 | *« Ce chiffre, montrez-le-moi. »* | La rejouabilité | « Il est dans le rapport » | Le squad lance la commande et projette la sortie |
| R2 | *« Qui a décidé que cet impact valait 5 ? »* | La cotation métier | « On a estimé » | « Le PO, le `<date>`, motif : … » |
| R3 | *« Vous recommandez un Go. Qu'est-ce qui vous ferait changer d'avis ? »* | La réversibilité du raisonnement | « Rien, on est confiants » | Trois conditions nommées, mesurables, avec un seuil |
| R4 | *« Qu'est-ce que vous n'avez pas testé ? »* | L'honnêteté | « On a couvert l'essentiel » | Une liste, avec pour chaque ligne le risque accepté et **par qui** |
| R5 | *« Si ça casse demain, c'est la faute de qui ? »* | L'appropriation de la responsabilité | « De l'IA / du modèle » | « De nous. L'agent a proposé, nous avons validé. Voici la trace. » |

## 4.3 Les trois questions pièges — barème détaillé

Chaque question vaut environ **17 points** (total 50).

### ❓ Q1 — *« Vous me dites 78 % de couverture. Si je supprime la ligne 42, combien de vos tests tombent ? »*

| Élément attendu | Points |
|---|:-:|
| Donne le **nombre exact** de tests qui tombent (rejoué en direct si demandé) | 5 |
| Explique la distinction **exécution / vérification** | 4 |
| Cite son **score de mutation mesuré**, avec la valeur de la classe la plus faible | 5 |
| Énonce la **limite du score de mutation lui-même** | 3 |
| **Malus** — « nos tests couvrent cette ligne, donc ils tomberaient » | **−10** |

### ❓ Q2 — *« Ces 340 tests, qui les maintient dans six mois quand le modèle aura changé de version ? »*

| Élément attendu | Points |
|---|:-:|
| Corrige le chiffre : distingue **généré** et **retenu** | 3 |
| Nomme un **propriétaire** et un **budget** | 4 |
| Cite les **trois déclencheurs**, dont le **cron sans changement déclaré** | 5 |
| Explique la dérive **à nom de modèle constant**, avec un chiffre | 3 |
| Chiffre le **coût annuel** de maintenance de l'agent | 2 |
| **Malus** — « les tests sont stables, il n'y a rien à maintenir » | **−10** |

### ❓ Q3 — *« Le jeu de données que votre agent a généré, il vient d'où ? On a le droit de l'envoyer à un fournisseur américain ? »*

| Élément attendu | Points |
|---|:-:|
| **Provenance** : généré depuis le schéma, jamais extrait de production | 4 |
| **Qualification** correcte (fictif / pseudonymisé), avec le test à trois critères | 4 |
| **Rétention** chiffrée chez le fournisseur, offre commerciale distinguée de l'offre grand public | 4 |
| **Transfert** : encadrement cité, et le rappel que « résidence UE » ≠ « résidence France » | 3 |
| Nomme la personne ayant validé côté DPO | 2 |
| **Malus** — « on est en ZDR donc il n'y a pas de logs » | **−10** |

## 4.4 Les trois signaux d'un squad qui a compris la formation

À noter par le formateur pendant l'exposé — ils orientent l'attribution des bonus.

| # | Signal |
|---|---|
| 1 | Il distingue **couverture** et **vérification** sans qu'on le lui demande |
| 2 | Il présente ses **coûts cachés** de lui-même, pas sous la contrainte |
| 3 | Il nomme un **propriétaire** pour chaque dette ouverte, **avec une date** |

> ⚠️ **Le piège à ne pas tendre** : ne pas exiger un Go. Un **No-Go argumenté** sur un défaut
> de conformité non corrigé est une excellente réponse, et il faut le dire au débriefing.
> L'objectif du boss n'est pas de faire livrer, c'est de faire **décider et assumer**.

---

# §5. Feuille de score vierge — `SCOREBOARD.md`

> À copier à la racine du dépôt partagé, ou à reproduire sur paperboard.
> **Mise à jour à voix haute, en 60 secondes, à chaque fin de module.**

```markdown
# SCOREBOARD — QA Rescue Mission : Opération SkyRetail

**Session** : ____ / ____ / ______  ·  **Formateur** : ____________________

## Score par journée

| Squad        | J1  | J2  | J3  | J4  | Total | Badges |
|--------------|-----|-----|-----|-----|-------|--------|
| 🔮 ORACLE    |     |     |     |     |       |        |
| 🎯 HUNTER    |     |     |     |     |       |        |
| 🛡️ GUARDIAN  |     |     |     |     |       |        |

## Détail — Jour 1

| Épreuve                          | Max | 🔮 | 🎯 | 🛡️ |
|----------------------------------|-----|----|----|----|
| M0-1 L'état des lieux            |  10 |    |    |    |
| M1-1 Le premier contact          |  10 |    |    |    |
| M1-2 L'audit de tautologie       |  20 |    |    |    |
| M1-3 La matrice de décision      |  40 |    |    |    |
| M1-4 Prendre l'IA en défaut      |  80 |    |    |    |
| M2-1 L'extracteur d'exigences    |  10 |    |    |    |
| M2-2 Douze scénarios, et le diff |  20 |    |    |    |
| M2-3 Imposer la technique        |  40 |    |    |    |
| M2-4 L'exigence impossible       |  80 |    |    |    |
| M3-1 La graine                   |  10 |    |    |    |
| M3-2 Écrire une propriété        |  20 |    |    |    |
| M3-3 Tuer les survivants         |  40 |    |    |    |
| M3-4 Le rapport qui invente      |  80 |    |    |    |
| 👑 Boss J1 — Cahier des Charges  | 150 |    |    |    |
| Contre-Tests (±)                 |  —  |    |    |    |
| Bugs plantés découverts (+50)    |  —  |    |    |    |
| Aides validées (+15)             |  —  |    |    |    |
| **Malus Dette Technique (−)**    |  —  |    |    |    |
| **TOTAL J1**                     | 610 |    |    |    |

## Détail — Jour 2

| Épreuve                          | Max | 🔮 | 🎯 | 🛡️ |
|----------------------------------|-----|----|----|----|
| M4-1 Les cinq blocs              |  10 |    |    |    |
| M4-2 Le contrat de 200 lignes    |  20 |    |    |    |
| M4-3 L'écart mesuré              |  40 |    |    |    |
| M4-4 La variabilité irréductible |  80 |    |    |    |
| M5-1 Les yeux de l'agent         |  10 |    |    |    |
| M5-2 Zéro sélecteur halluciné    |  20 |    |    |    |
| M5-3 La grille de décision       |  40 |    |    |    |
| M5-4 L'outil qui ment            |  80 |    |    |    |
| M6-1 Agent, workflow ou script ? |  10 |    |    |    |
| M6-2 Le hook qui bloque vraiment |  20 |    |    |    |
| M6-3 Le verdict binaire          |  40 |    |    |    |
| M6-4 Faites-le tricher           |  80 |    |    |    |
| 👹 Boss J2 — L'Agent Zéro        | 150 |    |    |    |
| Contre-Tests / bonus / malus     |  —  |    |    |    |
| **TOTAL J2**                     | 600 |    |    |    |

## Détail — Jour 3

| Épreuve                             | Max | 🔮 | 🎯 | 🛡️ |
|-------------------------------------|-----|----|----|----|
| M7-1 Le dossier d'échec             |  10 |    |    |    |
| M7-2 Six clusters, pas dix-neuf     |  20 |    |    |    |
| M7-3 La taxonomie appliquée         |  40 |    |    |    |
| M7-4 Vrai bug ou flakiness ?        |  80 |    |    |    |
| M8-1 Le premier job headless        |  10 |    |    |    |
| M8-2 La preuve du non-déterminisme  |  20 |    |    |    |
| M8-3 Sous les 20 minutes            |  40 |    |    |    |
| M8-4 La pull request hostile        |  80 |    |    |    |
| M9-1 Le premier seuil               |  10 |    |    |    |
| M9-2 Le scan et ses faux positifs   |  20 |    |    |    |
| M9-3 Le mur des 5 000 produits      |  40 |    |    |    |
| M9-4 Le vert trompeur               |  80 |    |    |    |
| 🏆 Boss J3 — Le Pipeline Rouge      | 150 |    |    |    |
| Contre-Tests / bonus / malus        |  —  |    |    |    |
| **TOTAL J3**                        | 600 |    |    |    |

## Détail — Jour 4

| Épreuve                                     | Max | 🔮 | 🎯 | 🛡️ |
|---------------------------------------------|-----|----|----|----|
| M10-1 Combien a coûté cette nuit ?          |  10 |    |    |    |
| M10-2 Le jeu d'évals des neuf bugs          |  20 |    |    |    |
| M10-3 Le juge sous contrôle                 |  40 |    |    |    |
| M10-4 Faites mentir votre jeu d'évals       |  80 |    |    |    |
| M11-1 Anonyme, vraiment ?                   |  10 |    |    |    |
| M11-2 Le comparatif des rétentions          |  20 |    |    |    |
| M11-3 Durcir l'agent contre une PR hostile  |  40 |    |    |    |
| M11-4 Le calendrier que tout le monde cite  |  80 |    |    |    |
| M12-1 La cotation d'impact                  |  10 |    |    |    |
| M12-2 Le tableau de bord et son APFD        |  20 |    |    |    |
| M12-3 Le ROI que vous oseriez montrer       |  40 |    |    |    |
| M12-4 Demandez à l'IA de prioriser          |  80 |    |    |    |
| 👑 Boss final — Comité de Go/No-Go          | 300 |    |    |    |
| Contre-Tests / bonus / malus                |  —  |    |    |    |
| **TOTAL J4**                                | 750 |    |    |    |

## Badges

| Badge                        | Condition                                                        | Attribué à |
|------------------------------|------------------------------------------------------------------|------------|
| 🔍 L'Œil                     | Premier squad à trouver un bug planté                            |            |
| 🧿 L'Oracle                  | Test rouge écrit *avant* la correction (vrai TDD sur un bug)      |            |
| 🪤 Le Piégeur                | Faire échouer un test généré en modifiant une seule ligne de prod |            |
| ⚡ Le Rapide                 | Réduire le temps du pipeline de plus de 40 %                      |            |
| 🧹 Le Fossoyeur de Flaky     | Éliminer la cause racine d'un flaky (pas un `retry`)              |            |
| 🔐 Le Gardien                | Détecter la fuite de données dans l'export RGPD                   |            |
| ♿ L'Inclusif                | 0 violation axe-core critique sur le parcours F4                  |            |
| 💰 L'Économe                 | Module complet avec moins de tokens qu'un concurrent, à résultat égal |        |
| 🎓 Le Pédagogue              | Expliquer une notion à un autre squad, jugé clair par celui-ci     |            |
| 🏆 Golden Oracle             | Score final le plus élevé                                          |            |

## Journal des malus de Dette Technique

| Date/heure | Squad | Infraction                                          | Malus |
|------------|-------|-----------------------------------------------------|-------|
|            |       | Test tautologique livré                              | −30   |
|            |       | Sélecteur halluciné                                  | −30   |
|            |       | Secret / donnée personnelle réelle commité           | −50   |
|            |       | Test mis en `[Skip]` pour faire passer la CI         | −40   |
|            |       | Couverture augmentée sans assertion nouvelle         | −25   |
|            |       | Livrable copié-collé d'un LLM sans relecture         | −20   |
```

---

# §6. Questionnaire de satisfaction à chaud (12 questions)

**Passation** : fin de J4, en séance, 5 minutes. Anonyme.
**Échelle** : 1 = pas du tout d'accord · 2 = plutôt pas d'accord · 3 = plutôt d'accord ·
4 = tout à fait d'accord · NSP = ne se prononce pas.

| # | Question | 1 | 2 | 3 | 4 | NSP |
|---|---|:-:|:-:|:-:|:-:|:-:|
| 1 | Les **objectifs annoncés** de la formation ont été atteints | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2 | Le **rythme** était adapté (ni trop rapide, ni trop lent) | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3 | La **proportion théorie / atelier** était juste | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4 | Le **fil rouge SkyRetail** a facilité ma compréhension | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5 | Le **système de score et de malus** a servi mon apprentissage | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6 | Les **exercices** étaient réalisables et leur résultat attendu était clair | ☐ | ☐ | ☐ | ☐ | ☐ |
| 7 | Les **limites de l'IA** ont été traitées avec honnêteté | ☐ | ☐ | ☐ | ☐ | ☐ |
| 8 | Le **support écrit** est réutilisable seul, après la formation | ☐ | ☐ | ☐ | ☐ | ☐ |
| 9 | Le **formateur** a répondu aux questions de façon claire et sourcée | ☐ | ☐ | ☐ | ☐ | ☐ |
| 10 | Les **conditions matérielles** (setup, salle, outils) étaient satisfaisantes | ☐ | ☐ | ☐ | ☐ | ☐ |
| 11 | Je saurai **appliquer** au moins trois choses dès la semaine prochaine | ☐ | ☐ | ☐ | ☐ | ☐ |
| 12 | Je **recommanderais** cette formation à un collègue | ☐ | ☐ | ☐ | ☐ | ☐ |

**Trois questions ouvertes — obligatoires :**

> **A.** Le module ou le moment qui m'a le plus apporté, et pourquoi :
> ______________________________________________________________
>
> **B.** Ce que je supprimerais ou raccourcirais :
> ______________________________________________________________
>
> **C.** Les **trois choses** que je compte mettre en place au retour :
> 1. ____________________________________________________________
> 2. ____________________________________________________________
> 3. ____________________________________________________________

**Seuils d'alerte pour l'organisme :**

| Indicateur | Seuil | Action |
|---|---|---|
| Moyenne générale < 3,2 / 4 | Alerte | Entretien formateur sous 5 jours |
| Question 2 (rythme) < 3,0 | Alerte forte | Revoir les coupes du guide formateur §2.1 |
| Question 7 (honnêteté) < 3,5 | **Alerte critique** | C'est la promesse centrale du support |
| Question 10 (matériel) < 3,0 | Alerte | Renforcer la procédure de setup J-7 |

---

# §7. Questionnaire à froid — J+60 (6 questions)

**Passation** : par courriel, 60 jours après la fin de session. 3 minutes.
**Objet** : mesurer le **transfert**, pas la satisfaction.

| # | Question | Format |
|---|---|---|
| 1 | **Qu'avez-vous effectivement mis en place** dans votre contexte professionnel depuis la formation ? | Ouverte — **obligatoire** |
| 2 | Parmi ces pratiques, lesquelles avez-vous adoptées ? | Cases à cocher : `CLAUDE.md` ou fichier de contexte projet · `permissions.deny` · bibliothèque de prompts versionnée · mesure du score de mutation · property-based testing · agent de test en CI · jeu d'évals · dé-flakisation par cause racine · test de charge en modèle ouvert · test d'accessibilité automatisé · grille de conformité · matrice de risques · **aucune** |
| 3 | Qu'est-ce qui vous a **empêché** d'aller plus loin ? | Cases : temps · budget · politique de sécurité de l'entreprise · résistance de l'équipe · compétence · outillage indisponible · autre (préciser) |
| 4 | Sur une échelle de 1 à 4, la formation a-t-elle **modifié votre façon de juger** un test généré par IA ? | 1 à 4 |
| 5 | Avez-vous **transmis** quelque chose de cette formation à un collègue ? | Oui / Non — si oui, quoi ? |
| 6 | Avec le recul, qu'auriez-vous voulu **approfondir** davantage ? | Ouverte |

**Exploitation** : une pratique de la question 2 citée par **moins de 20 % des répondants sur
trois sessions consécutives** est un signal que le module correspondant ne transfère pas.
Le support est alors révisé sur ce point.

---

# §8. Traçabilité Qualiopi — objectifs O1-O13 × modules × modalités

## 8.1 Tableau de correspondance

| # | Objectif opérationnel | Module(s) | Modalité d'évaluation | Preuve archivée | Seuil de validation |
|---|---|---|---|---|---|
| **O1** | Expliquer les principes, apports et **limites documentées** des LLM appliqués au test logiciel | M1 | QCM J4 (questions 1-3) + exercice **M1-4** | Copie du QCM + `boss-j1/defaut-ia.md` | ≥ 2/3 au QCM **et** M1-4 validé |
| **O2** | Distinguer les cas d'usage relevant de l'IA générative de ceux relevant de l'automatisation scriptée | M1, M5 | Grille de décision produite en **M5-3** | `boss-j2/grille-outillage.md` | 4 features couvertes avec des choix différents |
| **O3** | Générer, réviser et **tracer** une suite de cas de test à partir d'exigences en langage naturel | M2 | Livrable « plan de test augmenté » + **Boss J1** | `boss-j1/plan-de-test-v4.md` | Boss J1 ≥ 90/150 |
| **O4** | Produire des jeux de données de test **conformes** et une documentation exploitable | M3 | Exercices **M3-2 à M3-4** | `SkyRetail.Tests/Data/`, `boss-j1/mutation.md`, `boss-j1/audit-rapport.md` | 3 exercices sur 3 validés |
| **O5** | Concevoir un prompt et un contexte de **qualité industrielle** pour une tâche de QA | M4 | Bibliothèque de prompts versionnée + **M4-2**, **M4-4** | `prompts/`, `CLAUDE.md`, `boss-j2/runs/` | `CLAUDE.md` < 200 lignes **et** M4-4 validé |
| **O6** | Mettre en œuvre Claude Code, MCP et au moins un outil concurrent sur un cas de test réel | M5 | Démonstration en squad + **M5-1**, **M5-2** | `.mcp.json`, `boss-j2/tracabilite-locators.md` | Zéro locator CSS positionnel |
| **O7** | Construire un agent de test capable de **générer, exécuter et commenter** une campagne | M6 | **Boss J2 « L'Agent Zéro »** | `rapport-agent.md`, journal d'exécution | Boss J2 ≥ 90/150 |
| **O8** | Diagnostiquer un échec de test et traiter la flakiness avec l'appui de l'IA | M7 | **Boss J3 « Le Pipeline Rouge »** + **M7-4** | `boss-j3/post-mortem.md`, `boss-j3/verdict-bug202.md` | Boss J3 ≥ 90/150 |
| **O9** | Intégrer un agent de test dans un pipeline CI/CD avec gestion des **secrets et des coûts** | M8 | Workflow fonctionnel en CI (**M8-1**, **M8-3**, **M8-4**) | Lien du run, `boss-j3/pipeline-optimise.md`, `docs/securite-ci.md` | Run vert, `permissions` minimales, pipeline < 20 min |
| **O10** | Concevoir des tests non fonctionnels (charge, sécurité, accessibilité) assistés par IA | M9 | Exercices **M9-1 à M9-4** | `perf/`, `boss-j3/scan-securite.md`, `e2e/a11y/`, `boss-j3/vert-trompeur.md` | 4 exercices sur 4 validés |
| **O11** | Mettre en place la **surveillance, l'évaluation et la non-régression** d'un agent de test | M10 | Jeu d'évals produit (**M10-2**, **M10-3**) | `evals/agent-zero.yaml`, `evals/comparaison-v1-v2.md` | Matrice d'évals produite avec ≥ 1 assertion déterministe par cas |
| **O12** | Identifier les obligations **RGPD et AI Act** applicables à une chaîne de test augmentée | M11 | Grille de conformité (**M11-1** à **M11-4**) | `boss-j4/conformite/` | Qualification correcte des données **et** calendrier AI Act révisé cité |
| **O13** | **Prioriser** une campagne par les risques et **argumenter** un Go/No-Go chiffré | M12 | **Soutenance finale** + QCM (questions 15-20) | `DOSSIER-DE-RECETTE.md`, grille de soutenance renseignée | Boss final ≥ 180/300 |

## 8.2 Couverture des modalités d'évaluation

| Modalité Qualiopi | Moment | Outil | Objectifs couverts |
|---|---|---|---|
| **Diagnostique** | M0 (J1) | Auto-positionnement 8 questions (§1) | Prérequis de O1 à O13 |
| **Formative continue** | Chaque module | Validation des 49 exercices (§2) + QA Credits | O1 à O13 |
| **Formative intermédiaire** | Fin J1, J2, J3 | Boss de journée (§3) | O3, O7, O8 |
| **Sommative** | J4 | QCM 20 questions + soutenance (§3.4, §4) | O1, O13 en priorité, tous en synthèse |
| **Satisfaction à chaud** | Fin J4 | Questionnaire 12 questions (§6) | — |
| **Satisfaction et transfert à froid** | J+60 | Questionnaire 6 questions (§7) | Transfert de O5, O8, O9, O11 |

## 8.3 Pièces à archiver par session

| Pièce | Émetteur | Conservation |
|---|---|---|
| Feuilles d'émargement (par demi-journée) | Formateur | Réglementaire |
| Grilles d'auto-positionnement renseignées (§1) | Participants | 3 ans |
| `SCOREBOARD.md` final (§5) | Formateur | 3 ans |
| Grilles de notation des 4 boss (§3) | Formateur | 3 ans |
| Grilles de soutenance renseignées (§4) | Formateur | 3 ans |
| QCM corrigés | Formateur | 3 ans |
| Questionnaires à chaud et à froid (§6, §7) | Organisme | 3 ans |
| Tableau de traçabilité O1-O13 renseigné (§8.1) | Formateur | 3 ans |
| Attestations et certificats de réalisation | Organisme | Réglementaire |
| Journal de révision du support (ce qui a changé et pourquoi) | Formateur | Permanent |

> 📘 Le Référentiel National Qualité impose de tracer l'**adaptation des contenus aux évolutions
> du métier**. Sur ce point, la section « Fraîcheur des sources » de
> `annexes/annexe-D-bibliographie-complete.md` — dix corrections d'idées reçues datées de
> juillet 2026 — constitue la pièce à produire, avec le journal de révision.

---

*Les barèmes de cette annexe reprennent ceux des modules `module-03`, `module-06`, `module-09`
et `module-12`. En cas d'écart, le module fait foi.*
