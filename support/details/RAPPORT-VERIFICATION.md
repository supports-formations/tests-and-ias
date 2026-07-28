# Rapport de vérification qualité — Formation « Tester avec l'IA générative »

> Audit final réalisé le **28/07/2026**. **Passe de correction des anomalies résiduelles appliquée le 28/07/2026**
> (détail en fin de document, § « Récapitulatif des corrections appliquées »).
> Périmètre : 13 `module-*.md`, `README.md`,
> `00-fil-rouge-qa-rescue-mission.md`, `00-guide-formateur.md`, `00-setup-technique.md`,
> `annexes/annexe-A à D`. Corpus de référence : `recherche/sources-jour1..4.md`.
> Posture : relecture exigeante. Les points conformes sont attestés par des mesures, pas par présomption.

## Synthèse des verdicts

| Contrôle | Objet | Verdict |
|---|---|---|
| **C1** | Conformité au gabarit | ✅ conforme *(Boss J3 remonté en `##` le 28/07/2026 ; 2 écarts de forme justifiés)* |
| **C2** | Intégrité des sources | ✅ conforme *(1 URL corrigée, 3 points de vigilance)* |
| **C3** | Cohérence du fil rouge | ✅ conforme *(corrigé du Boss J3 réécrit en 19 échecs nominatifs E-01→E-19 le 28/07/2026)* |
| **C4** | Cohérence horaire | ✅ conforme *(36 durées d'exemples alignées ; durées de M11 rééquilibrées le 28/07/2026, somme inchangée)* |
| **C5** | Cohérence technique | ✅ conforme *(21 chemins préfixés `backend/` et glossaire complété le 28/07/2026)* |
| **C6** | Contrôle de fond par sondage (M1, M6, M12) | ✅ conforme *(indice de M1-4 rectifié le 28/07/2026)* |
| **C7** | Volume | ✅ seuil largement dépassé — statut « document de référence » désormais documenté et gabarit recalibré (15-30 p./module) le 28/07/2026 |

---

# C1 — Conformité au gabarit

**Verdict : ✅ conforme.**

## Constats chiffrés

| Contrôle | Résultat |
|---|---|
| Section `## 0. Carte du module` avec 0.1 → 0.5 | **13/13** modules |
| Notions déclarées en 0.5 et développées en §1 | **3 notions × 12 modules** (M00 exempté) |
| Sous-sections `1.n.1` à `1.n.5` complètes | **36/36 notions** — aucun manque |
| Exactement 3 exemples A/B/C | **12/12** modules concernés |
| Exactement 4 exercices ⭐/⭐⭐/⭐⭐⭐/⭐⭐⭐⭐ | **12/12** modules — progression respectée, aucune difficulté dupliquée ou manquante |
| Exercices dotés des 8 champs (intitulé, difficulté, durée, QAC, énoncé, résultat attendu, indice, solution) | **49/49 exercices** — aucun champ manquant |
| Section Débriefing avec 4.1 → 4.4 | **12/12** modules concernés |
| Sources ≥ 10 par notion | **36/36 notions** — minimum observé **12**, maximum **39**, total **676 entrées** dans les modules |

## Anomalies

| # | Fichier · ligne | Constat | Gravité |
|---|---|---|---|
| C1-1 | `module-09-tests-non-fonctionnels.md:961` | Le Boss J3 était un titre de **niveau 3** (`### 🏆 Boss J3`) imbriqué dans `## 3. Quatre exercices`, alors que les Boss J1 (`module-03:752`), J2 (`module-06:880`) et final (`module-12:935`) sont des sections de **niveau 2**. Écart de structure sans impact pédagogique, mais qui casse la table des matières générée. | **✅ corrigé le 28/07/2026** — le boss devient `## 4. 🏆 Boss J3` avec sous-sections `4.1` à `4.7`, sur le modèle de M3/M6 ; `## 4. Débriefing` → `## 5.` (et `4.1-4.4` → `5.1-5.4`), `## 5. Sources` → `## 6.` Aucune référence externe à ces numéros de section n'existait dans le support (vérifié) |
| C1-2 | `module-03`, `module-06`, `module-09`, `module-12` | La numérotation des sections dérive du gabarit (`## 4. Boss` puis `## 5. Débriefing` / `## 6. Sources`) pour insérer les boss. **Justifié** : le gabarit ne prévoyait pas les boss de journée. Non conforme au gabarit strict, cohérent avec le fil rouge. | acceptable |
| C1-3 | `module-00-briefing-mission.md` | Format allégé assumé : pas de §1 théorique en 5 sous-sections, 1 seul exercice, débriefing à 2 rubriques. **Hors périmètre du gabarit** par construction. | acceptable |

---

# C2 — Intégrité des sources

**Verdict : ✅ conforme.** C'est le contrôle le plus important : il est **passé**.

## Constats chiffrés

| Mesure | Valeur |
|---|---|
| URL extraites du corpus `recherche/sources-jour*.md` | **721 uniques** |
| Occurrences d'URL dans les 13 modules + 4 annexes | **1 310** |
| URL uniques citées dans le support | **632** |
| URL uniques **retrouvées dans le corpus** | **622** (98,4 %) |
| URL relevant de la liste tolérée (localhost, `example.com`, `host.docker.internal`, RFC 2606) | **14 occurrences** |
| **URL orphelines réelles (potentiellement inventées)** | **0** après correction |
| Références `[S-xx]` citées dans un corps de module et **absentes** de la liste de sources du module | **0** — vérifié sur les 13 modules |
| Collisions d'identifiant (`[S-xx]` désignant deux URL différentes dans un même module) | **0** |

## Anomalies

| # | Fichier · ligne | Constat | Traitement |
|---|---|---|---|
| C2-1 | `annexes/annexe-D-bibliographie-complete.md:756` | URL `https://docs.github.com/en/copilot/concepts/prompt-engineering` **absente du corpus**. Le corpus (`recherche/sources-jour2.md:615`) porte `https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering`. Segment `/prompting/` manquant → lien mort. | **✅ CORRIGÉ** |
| C2-2 | `annexes/annexe-D-bibliographie-complete.md:538` | `https://dotnet.testcontainers.org/modules/postgres/` : le corpus ne contient que la racine `https://dotnet.testcontainers.org/`. Sous-chemin **non vérifié dans le corpus**. Plausible, mais non attesté. | ⚠️ **à vérifier** avant impression — non corrigé (ce n'est pas une erreur démontrée) |
| C2-3 | `module-05-outillage-claude-code-mcp-panorama.md:72` | `https://code.claude.com/docs/en/` et `https://platform.claude.com/docs/` apparaissent comme URL racines. Le corpus atteste ces racines (`sources-jour2.md:12`, `sources-jour3.md:13`, `sources-jour4.md:26`) mais sous forme non préfixée par `https://`, et l'API est notée `platform.claude.com/docs/en/` (avec `/en/`). **Non-orphelines en substance.** | acceptable — signalé pour mémoire |
| C2-4 | 10 modules sur 13 | **46 entrées `[S-xx]` déclarées en §5 mais jamais citées dans le corps** : M4 (5), M5 (8), M6 (9), M7 (8), M8 (6), M9 (3), M10 (3), M12 (4). Conséquence mécanique de la règle « ≥ 10 sources par notion » : les listes contiennent plus de sources que le texte n'en mobilise. Aucune est fausse ; aucune n'est orpheline. | acceptable — **non corrigé** (retirer une source ferait passer certaines notions sous le seuil de 10) |

**Note méthodologique.** Les identifiants `[S-xx]` réutilisés d'une notion à l'autre au sein d'un même module (ex. `module-02` : S-02, S-04, S-05, S-07 à S-12) sont **conformes** au gabarit, qui impose la réécriture de la source dans chaque liste de notion. La vérification a confirmé que chaque identifiant dupliqué pointe **toujours vers la même URL**.

---

# C3 — Cohérence du fil rouge

**Verdict : ✅ conforme** après réécriture du corrigé du Boss J3 le 28/07/2026.

## 3.1 Les 9 bugs plantés — tous exploités

| Bug | Occurrences | Où il est réellement **exploité** (pas seulement mentionné) |
|---|---|---|
| BUG-101 | 36 | M1 Exemple A (démonstration fondatrice), M1-4 (voisinage), M3 Boss J1, **M6-3** (verdict « le code est faux »), M10 jeu d'évals |
| BUG-102 | 40 | **M1-4** (exercice ⭐⭐⭐⭐), **M3 Exemple B** (FsCheck), **M3-4** (rapport qui invente), M12-4 |
| BUG-103 | 15 | M1 §1.3.3 (couverture trompeuse), **M6-3** (verdict `SPECIFICATION MANQUANTE`), M3 Boss J1 (AMB-5) |
| BUG-201 | 19 | **M5 Exemple A / M5-1 / M5-2** (Playwright MCP sur F2), M7 §1.2.3 |
| BUG-202 | 32 | **M7 Exemple A** (dossier d'échec), **M7-4** (exercice ⭐⭐⭐⭐), **Boss J3** (30 pts du barème) |
| BUG-301 | 6 | M2 Exemple C (contrat OpenAPI), M3 §1.2.3 (fuzzing), M9-2 (tri ZAP), M10 éval E-06, M12 risque R-06 |
| BUG-302 | 15 | **M9 Exemple A** + **M9-3** (mur des 5 000 produits), **Boss J3** |
| BUG-401 | 45 | **M9 Exemple B / M9-4**, M11 §1.1.3, **Boss J4** (bonus B2), Boss J3 |
| BUG-402 | 24 | **M9 Exemple C / M9-4**, M7 Exemple C (self-healing masquant la régression), Boss J3 |

~~⚠️ **BUG-301 est le maillon faible** : 6 occurrences, jamais objet principal d'un exemple ni d'un exercice ; il n'apparaît qu'en illustration secondaire. Il reste exploité (critère rempli) mais un squad peut terminer les 4 jours sans jamais l'avoir cherché.~~ → **✅ corrigé le 28/07/2026.** L'exercice **M9-1** (⭐, 5 min) devient « **Le premier seuil — et la borne oubliée** » : le scénario k6 appelle désormais `GET /api/products?page=-1` avec un `check` exigeant `400`, un seuil `checks: ['rate==1.00']` qui fait échouer le job, et une **fiche de défaut BUG-301** obligatoire dans `boss-j3/perf-smoke.md`. La structure de l'exercice (8 champs, difficulté ⭐, durée 5 min, 10 QAC) est inchangée ; la grille d'annexe C §2 a été mise à jour en conséquence. BUG-301 est donc désormais l'objet principal d'un exercice, en plus de ses 6 occurrences d'illustration.

## 3.2 Les 4 features — toutes couvertes

| Feature | Modules porteurs | Verdict |
|---|---|---|
| F1 moteur de remises | M1, M3, M4, M6, M12 (12 mentions) | ✅ |
| F2 tunnel de commande | M1, M5, M7, M12 | ✅ |
| F3 catalogue/recherche | M2, M9 (BUG-301/302), M12 | ✅ |
| F4 espace client/RGPD | M5, M9, M11, M12 (12 mentions) | ✅ |

## 3.3 Les 4 boss — déroulé, barème et corrigé

| Boss | Emplacement | Déroulé minuté | Barème | Corrigé | Somme du barème |
|---|---|---|---|---|---|
| J1 « Cahier des Charges Fantôme » | `module-03:752` | ✅ 30 min | ✅ | ✅ (7 ambiguïtés AMB-1→7) | 40+40+30+40 = **150** ✅ |
| J2 « L'Agent Zéro » | `module-06:880` | ✅ B0→B5 = 4+18+7+8+5+3 = **45 min** | ✅ | ✅ (agent complet, prompts) | 50+40+30+20+10 = **150** ✅ |
| J3 « Le Pipeline Rouge » | `module-09:961` | ✅ P1→P5 = 5+5+15+15+5 = **45 min** | ✅ | ✅ (19 échecs détaillés) | 50+57+30+13 = **150** ✅ |
| J4 « Comité de Go/No-Go » | `module-12:935` | ✅ T0→T+60 = **60 min** | ✅ | ✅ (5 relances + 3 questions pièges) | 60+60+50+40+40+50 = **300** ✅ |

Les quatre barèmes sont **identiques** entre `00-fil-rouge-qa-rescue-mission.md §5`, les modules et `annexes/annexe-C-grilles-evaluation.md §3`.

## 3.4 QA Credits — arithmétique complète

| Niveau | Vérification | Résultat |
|---|---|---|
| Par module | En-tête = somme des 4 exercices (10+20+40+80 = 150) | **13/13 ✅** (M0 = 10 ; M3/M6/M9 = 300 avec boss ; M12 = « 150 + 300 ») |
| Par jour (annexe C §4) | J1 = 610, J2 = 600, J3 = 600, J4 = 750 | ✅ (10+150×3+150 / 150×3+150 / 150×3+150 / 150×3+300) |
| Total | Annexe C §2 récapitulatif : 13×10 + 12×20 + 12×40 + 12×80 = **1 810** ; + 3×150 + 300 = **2 560** | ✅ **cohérent** avec le fil rouge §4.2 et les 13 en-têtes de module |
| Nombre d'exercices | 49 annoncés en annexe C §2, §1 et §5 | ✅ **49 comptés** (1 + 12×4) |

## Anomalies

| # | Fichier · ligne | Constat | Traitement |
|---|---|---|---|
| **C3-1** | `module-09-tests-non-fonctionnels.md` §4.5-4.6 (ex-`:~1054`) vs `module-07-diagnostic-anomalies-flakiness.md:604` | **Le décompte des 19 échecs n'était pas réconcilié.** Le corrigé du Boss J3 énumérait 19 lignes numérotées 1→19, mais la ligne 18 portait `IntegrationFixture.*` **« (3 tests d'une même classe) »** — ce qui portait le total réel à **21 tests** pour 19 échecs annoncés, et à **4** échecs « Environnement » au lieu des **2** attendus par la grille. En parallèle, M7 Exemple B énonçait que le cluster ECONNREFUSED contient **un** échec d'environnement et **deux** échecs « dont la cause est ailleurs » — ces deux-là n'étaient reclassés nulle part. Le barème « 3 pts par échec bien classé, plafonné à 57 » devenait inapplicable. | **✅ corrigé le 28/07/2026.** Corrigé entièrement réécrit : **19 échecs nominatifs `E-01` → `E-19`**, **une ligne = un test** (plus aucun regroupement), répartition **4 / 6 / 7 / 2** conforme au fil rouge §5.3. Chaque échec porte les 6 champs exigés : identifiant · nom de test · symptôme (message d'exécution) · catégorie (par section) · cause racine · action correcte. Ajouts : §4.6 **index des 19 échecs** servant de grille de correction (3 pts × 19 = 57, règle « un échec regroupé = un seul identifiant classé ») et **colonne de réconciliation avec les 6 clusters de M07** (7+4+3+2+2+1 = 19). Le troisième `ECONNREFUSED` devient `E-08`, **test faux** (chaîne de connexion codée en dur), ce qui donne enfin un référent au bonus de +20 pts du barème ; `E-13` est le second (flaky, pool épuisé), `E-18` le seul vrai échec d'environnement. Barèmes de `00-fil-rouge §5.3` et `annexe-C §3.3` alignés sur la nouvelle numérotation |
| C3-2 | `module-07-diagnostic-anomalies-flakiness.md:604` | Coquille arithmétique : « les clusters 3 et 4 […] **deux plus deux** » alors que le cluster 3 compte **3** échecs et le cluster 4 en compte **2** (total 5, conforme au « on en compte 5 » de la phrase suivante). | **✅ CORRIGÉ** → « trois plus deux » |
| C3-3 | `00-fil-rouge-qa-rescue-mission.md:69` vs `module-09:~1050` | BUG-202 est décrit comme « **cause racine de 7 des 12 tests flaky** », et M7 Exemple B identifie « le cluster 1 à 7 éléments — la signature de BUG-202 ». Or dans le corrigé du Boss J3, BUG-202 est classé comme **1 seul** « vrai bug produit » (ligne 1), et les 7 « flaky » recensés ont **7 causes distinctes** sans rapport avec BUG-202. Les deux populations (12 tests flaky historiques du dépôt / 19 échecs de la branche `j3-pipeline-rouge`) n'étaient jamais explicitement distinguées pour le lecteur. | **✅ corrigé le 28/07/2026.** Un **tableau comparatif des deux populations** (volume, origine, rôle de BUG-202, module de traitement) est inséré en `module-07` §1.2.3 et repris en tête du corrigé `module-09` §4.5. BUG-202 y est désormais présenté de façon univoque : **cause racine de 7 des 12 flaky historiques de `main`** (M07), et **cause d'un seul échec, `E-01`, sur la branche du boss**, classé « vrai bug produit » et non « flaky » — conformément au corollaire n° 3 de M07 §1.2.1. Le §1.1.3 de M07 requalifie le cluster de 7 en **hypothèse** de cause unique, vérifiée sur `main` et **réfutée** sur la branche du boss ; l'analyse de l'Exemple B et le résultat attendu de M7-2 sont réécrits en conséquence. `00-fil-rouge §3.1`, `00-guide-formateur` (fiche M7) et `annexe-C §2` portent la même formulation |

---

# C4 — Cohérence horaire

**Verdict : ✅ conforme** après correction de 36 durées d'exemples.

## Constats chiffrés

**Somme des durées d'en-tête des 13 modules :**

| M0 | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 | M9 | M10 | M11 | M12 | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 45 | 90 | 90 | 90 | 90 | 105 | 120 | 90 | 105 | 120 | 90 | 75 | 150 | **1 260 min = 21 h 00** ✅ |

Répartition par jour : J1 = 45+90+90+90 = **5 h 15** · J2 = 90+105+120 = **5 h 15** · J3 = 90+105+120 = **5 h 15** · J4 = 90+75+150 = **5 h 15**. Cohérent avec `README.md:28` et `00-guide-formateur.md:125-148`.

**Somme du tableau 0.4 vs durée d'en-tête : 13/13 modules à écart nul.**

**Somme des durées cibles des 4 exercices vs ligne « exercices » (S7) du tableau 0.4 :**

| Module | S7 | Σ exercices | Verdict |
|---|---|---|---|
| M1 | 24 | 4+5+7+8 = 24 | ✅ |
| M2 | 23 | 4+5+7+7 = 23 | ✅ |
| M3 | 18 | 4+4+5+5 = 18 | ✅ |
| M4 | 27 | 5+6+7+9 = 27 | ✅ |
| M5 | 34 | 5+8+9+12 = 34 | ✅ |
| M6 | 23 | 4+5+6+8 = 23 | ✅ |
| M7 | 27 | 5+6+7+9 = 27 | ✅ |
| M8 | 32 | 6+7+9+10 = 32 | ✅ |
| M9 | 23 | 5+6+6+6 = 23 | ✅ |
| M10 | 26 | 5+7+7+7 = 26 | ✅ |
| M11 | 15 | 3+3+4+5 = 15 | ✅ *(rééquilibré le 28/07/2026 — somme inchangée)* |
| M12 | 23 | 4+6+6+7 = 23 | ✅ |

**13/13 conformes** (contrainte « ≤ », satisfaite à l'égalité partout — la marge est nulle, cf. réserve ci-dessous).

## Anomalies

| # | Fichier · ligne | Constat | Traitement |
|---|---|---|---|
| **C4-1** | 10 modules sur 12 — titres `### 🔍 Exemple A/B/C` | **Écart systématique** entre la durée annoncée dans le titre de chaque exemple et celle allouée par le tableau 0.4 (séquences S4/S5/S6). Exemples les plus graves : `module-12` annonçait 12+10+8 = **30 min** pour 6+5+4 = **15 min** budgétées (×2) ; `module-09` annonçait 11+«8-10»+«8-10» = jusqu'à **31 min** pour 6+4+4 = **14 min** (×2,2) ; `module-03` : 23 min annoncées pour 15 min budgétées. Seuls M6 et M11 étaient cohérents. Un formateur qui minute sur les titres explose le module. | **✅ CORRIGÉ** — les 36 durées de titre ont été alignées sur le tableau 0.4, qui est la référence (c'est lui qui somme à la durée contractuelle) |
| C4-2 | `module-11-confidentialite-conformite-ai-act.md:579` | L'exercice **M11-4** (⭐⭐⭐⭐, 80 QAC) a une durée cible de **3 min**, soit **moins** que M11-3 (⭐⭐⭐, 4 min) et que M11-1 (⭐, 4 min). La progression de difficulté n'est pas reflétée dans le temps alloué. M11 est le module le plus comprimé du support (15 min pour 4 exercices, contre 34 en M5). | **✅ corrigé le 28/07/2026** — durées redistribuées **3 / 3 / 4 / 5** (M11-1 → M11-4). La progression est désormais monotone croissante, la somme reste **15 min** et la ligne S7 du tableau 0.4 est inchangée. Aucun impact sur le minutage verrouillé à 21 h 00 |
| C4-3 | Tous les modules | La contrainte « Σ exercices ≤ S7 » est satisfaite **exactement à l'égalité** dans les 12 modules. Aucune marge de transition, de restitution ou de dépassement. Le dispositif ne tient que sous l'hypothèse de régulation rappelée sous chaque tableau (exercices ⭐ et ⭐⭐ menés en parallèle par les squads). Ce n'est pas une non-conformité, c'est un **risque d'exploitation** à assumer explicitement. | ⚠️ signalé |

---

# C5 — Cohérence technique

**Verdict : ✅ conforme.**

## 5.1 Langages des exemples de code

| Langage déclaré | Blocs |
|---|---|
| `csharp` | 22 |
| `typescript` + `ts` | 18 |
| `bash` | 33 |
| `yaml` | 11 |
| `json` | 7 |
| `powershell` | 5 |
| `html` / `xml` / `gherkin` / `promql` / `csv` | 5 / 2 / 1 / 1 / 1 |
| `text` / `markdown` (prompts, sorties, rapports) | 45 / 23 |
| **Python / Java / Ruby / Go / PHP** | **0** ✅ |

Vérification complémentaire : les 34 blocs de code **non étiquetés** ont été scannés à la recherche de motifs Python (`def `, `import `, `pytest`) et Java (`public class … {`, `import java.`). **Aucune occurrence.** Le stack contractuel (C#/.NET · TypeScript/Angular · Playwright · xUnit/FluentAssertions) est tenu sans exception sur l'ensemble du support.

## 5.2 Chemins du dépôt SkyRetail

Les **74 chemins distincts** cités dans les modules et annexes ont été confrontés à l'arborescence de `00-setup-technique.md §3.1`. **Aucun chemin contradictoire.** Les chemins non présents à l'état initial (`docs/securite-ci.md`, `docs/CONTRIBUTING.md`, `backend/ci.runsettings`, `e2e/**`, `boss-j*/**`) sont tous des **artefacts produits par les exercices**, ce qui est cohérent (`e2e/` est déclaré « dossier vide — créé en M2 »).

| # | Fichier | Constat | Traitement |
|---|---|---|---|
| C5-1 | `module-01` (l. 277, 281, 308, 315, 363, 525, 588, 634, 647, 689), `module-02` (l. 444, 522, 665, 674, 685, 759), `module-03` (l. 110, 367, 425, 565) | Les modules M1-M3 citent les chemins sous forme **abrégée** (`SkyRetail.Domain/Pricing/…`, `SkyRetail.Tests/…`) alors que M4-M12 utilisent la forme complète (`backend/SkyRetail.Domain/…`). Les deux formes coexistent parfois dans le même module (M1 l. 277 vs l. 518). Non erroné — relatif à `backend/` — mais un participant qui copie-colle depuis la racine du dépôt échoue. | **✅ corrigé le 28/07/2026** — les **21 occurrences** (10 en M1, 6 en M2, 7 en M3, dont deux sur une même ligne) sont préfixées `backend/`. Contrôle post-correction : plus aucune occurrence de `SkyRetail.<Projet>/` non préfixée dans M1-M3, et **zéro** `backend/backend/` dans l'ensemble du support. Les identifiants de namespace C# (`SkyRetail.Domain.Pricing`) n'ont pas été touchés |

## 5.3 Cohérence des avertissements « ⚠️ À jour au 07/2026 »

**56 avertissements** relevés. Croisement systématique des sujets récurrents :

| Sujet | Fichiers concernés | Verdict |
|---|---|---|
| `.claudeignore` **n'existe pas** ; mécanisme = `permissions.deny` ; `ignorePatterns` déprécié | `00-setup-technique.md:214`, `module-00:246`, `module-04:240`, `module-05:116`, `annexe-A:217` | ✅ **5 énoncés identiques**, aucune contradiction |
| `temperature = 0` ne garantit pas le déterminisme | `module-00:135`, `module-02:160`, `module-04:304-306`, `module-08`, `annexe-A:284` | ✅ cohérent |
| `temperature`/`top_p`/`top_k` **dépréciés sur Opus 4.7+, erreur 400** | `module-04:306`, `module-08:1160`, `module-10:347` | ✅ 3 énoncés identiques |
| OWASP **Top 10:2025** (renumérotation A03→A05 pour Injection, A03:2025 = supply chain) | `module-09:225-228`, `annexe-A:205` | ✅ cohérent |
| OWASP **Top 10 LLM 2025** : pas d'édition 2026 ; le doc de déc. 2025 est le Top 10 **Agentic**, liste distincte | `module-11:171`, `annexe-A:29`, `annexe-A:206` | ✅ cohérent |
| Calendrier **AI Act** post-omnibus du 7 mai 2026 (art. 50 = 2 août 2026 **inchangé** ; annexe III = 2 déc. 2027 ; annexe I = 2 août 2028) | `module-11:276-283, 302, 345, 355-363`, `annexe-C:218, 529` | ✅ **une seule source de vérité** (M11) ; aucune date contradictoire ailleurs dans le support |
| Migration doc Anthropic (`code.claude.com` / `platform.claude.com`) | `00-setup:50`, `module-05:72`, `module-08:119`, `sources-jour2/3/4` | ✅ cohérent |
| Dépréciation `claude-opus-4-1-20250805` (5 juin 2026 → retrait 5 août 2026, préavis 60 j) | `module-04:308`, `module-08:246`, `module-10:347` | ✅ 3 énoncés identiques |
| Métriques DORA = **5**, pas 4 | `module-12:300`, `annexe-A:81` | ✅ cohérent |

| # | Fichier | Constat | Traitement |
|---|---|---|---|
| C5-2 | `annexes/annexe-A-glossaire.md:284` (entrée « Temperature ») | L'entrée du glossaire ne mentionne **que** l'absence de déterminisme ; elle **omet** la dépréciation avec erreur 400 sur Opus 4.7+, pourtant affirmée trois fois dans les modules. Ce n'est pas une contradiction, c'est une **lacune** du glossaire sur le point le plus opérationnel. | **✅ corrigé le 28/07/2026** — l'entrée porte désormais les **deux** points : (1) `temperature = 0` ne garantit pas le déterminisme, avec la cause (infrastructure d'inférence) et la conséquence de test (jamais d'assertion sur l'égalité stricte d'une sortie) ; (2) `temperature` / `top_p` / `top_k` **rejetés avec une erreur 400 sur Claude Opus 4.7+**, avec le mode opératoire de reproductibilité de substitution (version de modèle figée + évaluation sur k exécutions). Renvois module mis à jour : **M4, M8, M10** |

---

# C6 — Contrôle de fond par sondage (module-01, module-06, module-12)

**Verdict : ✅ conforme.** Les trois modules ont été lus intégralement.

## 6.1 Justesse technique

| Module | Vérifications ponctuelles menées | Résultat |
|---|---|---|
| **M01** | Cascade Meta 75/57/25/73 % correctement présentée comme un **filtre en cascade** avec l'avertissement explicite que les 73 % portent sur les survivants (§1.1.4, ligne 154) · Définition ISTQB de l'oracle citée verbatim en anglais (§1.2.1) · Calcul de la solution M1-4 recalculé : 0,625 × 20 % = 0,125 → `ToEven` = 0,12, `AwayFromZero` = 0,13 ; 7 × 0,12 = **0,84** ✅ ; 7 × 0,13 = 0,91, écart cumulé **0,07 €** ✅ ; `InlineData(20 ; 2.40)` = 20 × 0,12 ✅ | ✅ juste |
| **M06** | Distinction workflow/agent citée verbatim [S-01] · Règle « seul `exit 2` bloque un hook » (§1.2.4, §1.2.5) · Code de sortie **9** de `dotnet test --minimum-expected-tests` · Ordre d'évaluation des permissions `allowedTools → disallowedTools → PreToolUse → canUseTool` · Avertissement v2.1.210 : seules `Edit(path)` et `Read(path)` sont réellement appliquées — cohérent avec `module-05:117` · `pass^k` de τ-bench correctement introduit | ✅ juste, et remarquablement à jour |
| **M12** | Formule APFD conforme à la littérature (`1 − ΣTF_i/(n·m) + 1/(2n)`) · Chiffres Meta présentés avec la mise en garde « > 95 % des échecs *individuels* / > 99,9 % des *changements fautifs* » (§1.1.4) — la sur-citation courante est explicitement dénoncée · Ratio 1:10:100 de Boehm présenté comme un *leprechaun* documenté, avec interdiction d'en tirer un ROI · CISQ cité avec ses 4 précautions | ✅ juste |

## 6.2 Caractère vérifiable des « Résultats attendus »

Les 12 exercices de M1, M6 et M12 ont tous un résultat attendu **objectivement vérifiable** : chemin de fichier exact, seuil numérique, sortie de commande à produire, et une ligne « **Invalide** : … » qui définit les conditions d'échec. Exemples de critères réellement opposables :

- M1-4 : « test **rouge** sur `formation/j1-start` », « écart ≥ 0,01 € sur ≥ 7 lignes », « **Invalide** : test rendu rouge en modifiant le code de production ».
- M6-2 : « la variante `exit 1` est testée : le journal montre la détection **mais l'édition a lieu** » — critère falsifiable en une exécution.
- M12-2 : « l'APFD de l'ordre (B) est **strictement supérieure** à celle de (A) — sinon, expliquer pourquoi », avec exigence du détail des rangs `TF_i`.

## 6.3 Progression réelle de difficulté

| Module | ⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | Verdict |
|---|---|---|---|---|---|
| M01 | Générer naïvement et **lire** trois chiffres | Classer l'origine de chaque attendu (S/C/I) | Choisir une famille d'outillage par feature, avec objection anticipée | Écrire le test rouge que le LLM ne pouvait pas trouver | ✅ progression réelle, pas cosmétique |
| M06 | Classer 5 besoins script/workflow/agent | Écrire un hook et **prouver** qu'il bloque | Construire un subagent à verdict trinaire avec citation du CDC | Faire tricher l'agent d'un squad adverse | ✅ |
| M12 | Coter l'impact métier en interrogeant le PO | Exécuter le tableau de bord et calculer 2 APFD | ROI avec coûts cachés et section « réserves » | Confronter la priorisation IA à la matrice humaine | ✅ |

## 6.4 Confrontation à une limite de l'IA au 4ᵉ exercice

| Exercice | Limite exposée | Verdict |
|---|---|---|
| **M1-4** | Un générateur optimisé pour produire des tests **qui passent** ne peut pas produire un test rouge ; l'oracle (norme d'arrondi bancaire) est **hors du code**. Réponse attendue explicitement rédigée en 3 lignes. | ✅ limite structurelle, pas anecdotique |
| **M6-4** | La manœuvre n°5 (épuisement du hook `Stop` après **8 blocages consécutifs**) est un **comportement documenté par l'éditeur**, sans contre-mesure de configuration. La réponse attendue à « peut-on garantir par la configuration qu'un agent ne trichera pas ? » est **non**, argumentée en 3 points. | ✅ excellent — la limite est irréductible et assumée |
| **M12-4** | Le modèle n'a accès ni à l'impact métier, ni au churn Git, ni à l'historique dé-flaké, ni au ticketing. « La limite exposée n'est pas une hallucination, c'est un **manque d'information** ; aucune amélioration de modèle ne la corrigera. » Le 3ᵉ tour (avec le fichier d'impact fourni) prouve la convergence. | ✅ démonstration rigoureuse |

## Anomalies

| # | Fichier · ligne | Constat | Traitement |
|---|---|---|---|
| C6-1 | `module-01-panorama-ia-generative-test.md:635` et `:642` | Le résultat attendu impose « un écart de **0,01 €** au minimum, sur un panier d'au moins **7 lignes** », et l'indice affirme qu'« un arrondi à mi-chemin **ne se voit pas sur une valeur isolée** : il se voit sur une accumulation ». **Techniquement inexact** avec la solution de référence fournie : sur **une seule** ligne à 0,625 €, `ToEven` donne 0,12 et `AwayFromZero` donne 0,13 — l'écart de 0,01 € est déjà visible (c'est d'ailleurs ce que montre `[InlineData(1, 0.12)]` ligne 674). L'exigence des 7 lignes est **pédagogiquement fondée** (elle force la démonstration de l'écart cumulé et colle à la description du fil rouge) mais l'indice, tel qu'il était écrit, énonçait une contre-vérité arithmétique. | **✅ corrigé le 28/07/2026** — l'indice dit maintenant l'exact : l'écart est **invisible sur les valeurs rondes couramment testées** (10 €, 19,99 €, 100 €), ce qui explique que la suite générée par le LLM soit verte ; il faut chercher les montants dont **la troisième décimale de la TVA tombe pile sur 5** (`x,xx5`), où l'écart d'un centime est visible **dès une seule ligne** (`0,625 € × 20 % = 0,125 €`, cf. `[InlineData(1, 0.12)]`) ; l'accumulation multi-lignes n'est plus présentée comme la condition d'apparition du défaut mais comme ce qui le rend **systématique** et indiscutable. Le résultat attendu (écart ≥ 0,01 € sur ≥ 7 lignes) est **inchangé** |
| C6-2 | `module-01:673-677` | Le `[Theory]` utilise `[InlineData(1, 0.12)]` avec un paramètre `decimal`. Les littéraux d'attribut C# étant des `double`, la conversion repose sur le mécanisme de conversion d'arguments de xUnit. Cela fonctionne en xUnit v2/v3 mais mérite un `[InlineData(1, "0.12")]` ou un `MemberData` en solution de référence projetée, sous peine de question en salle. | mineur — signalé, non corrigé |
| C6-3 | `module-12:258-262` | Le tableau de bord de priorisation projeté au comité était **trié incorrectement** : rangs 1→5 pour des risques 23,60 / 15,75 / 16,40 / 19,00 / 11,60, alors que le script `tableau-priorisation.ps1` fait explicitement `Sort-Object Risque -Descending`. Les produits `Probabilité × Impact` étaient tous exacts ; seul l'ordre des lignes était faux. | **✅ CORRIGÉ** — lignes réordonnées : 23,60 / 19,00 / 16,40 / 15,75 / 11,60 |

---

# C7 — Volume

**Verdict : ✅ le seuil de 80 pages est dépassé.** Le gabarit interne « 7 à 12 pages A4 par module »
n'était tenu par **aucun** module ; il a été **recalibré à 15-30 pages le 28/07/2026** pour refléter
le statut réel — et désormais explicité — du support. Les 12 modules pédagogiques (20,6 à 30,2 p.)
sont dans la nouvelle fourchette ; M00, format allégé assumé, en est exempté comme il l'était déjà.

## Constats chiffrés

Base de conversion : **450 mots / page A4** (texte mixte avec code et tableaux).

| Ensemble | Mots | Pages A4 |
|---|---|---|
| 13 modules `module-*.md` | 183 021 | **406,7** |
| 4 annexes A à D | 48 017 | **106,7** |
| Transverses (`README`, fil rouge, setup) | 6 741 | **15,0** |
| **Total support participant** | **237 779** | **528,4** |
| `00-guide-formateur.md` (document interne) | 12 644 | 28,1 |
| **Total général** | **250 423** | **556,5** |

> ✅ **Le seuil de 80 pages A4 est dépassé d'un facteur 6,6** sur le seul support participant.

## Détail par module (corps hors listes de sources)

Colonne « Gabarit » : ancienne contrainte 7-12 p. / **nouvelle contrainte 15-30 p.** (recalibrée le 28/07/2026).

| Module | Mots hors sources | Pages | Ancien gabarit 7-12 p | **Gabarit 15-30 p** |
|---|---|---|---|---|
| M00 | 4 449 | 9,9 | ✅ | ✅ *(format allégé assumé, hors gabarit)* |
| M01 | 9 274 | 20,6 | ❌ ×1,7 | ✅ |
| M02 | 9 751 | 21,7 | ❌ ×1,8 | ✅ |
| M03 | 9 339 | 20,8 | ❌ ×1,7 | ✅ |
| M04 | 11 365 | 25,3 | ❌ ×2,1 | ✅ |
| M05 | 12 929 | 28,7 | ❌ ×2,4 | ✅ |
| M06 | 13 376 | 29,7 | ❌ ×2,5 | ✅ |
| M07 | 10 790 | 24,0 | ❌ ×2,0 | ✅ |
| M08 | 11 729 | 26,1 | ❌ ×2,2 | ✅ |
| M09 | 13 585 | 30,2 | ❌ ×2,5 | ✅ *(en limite haute — à surveiller)* |
| M10 | 10 433 | 23,2 | ❌ ×1,9 | ✅ |
| M11 | 10 038 | 22,3 | ❌ ×1,9 | ✅ |
| M12 | 11 349 | 25,2 | ❌ ×2,1 | ✅ |
| **Total corps** | **138 407** | **307,6** | — | **12/12 conformes** |

> ℹ️ Mesures antérieures à la passe de correction du 28/07/2026, qui ajoute environ 1 800 mots
> (corrigé du Boss J3, encadrés de distinction des populations, encadré du `README`). M09 reste
> le module le plus volumineux et se rapproche du plafond de 30 pages.

## Anomalie

| # | Constat | Traitement |
|---|---|---|
| C7-1 | Le gabarit `_TEMPLATE-MODULE.md` §Contraintes-8 imposait **3 500 à 6 000 mots par module hors sources**. Les 12 modules pédagogiques font **9 274 à 13 585 mots**, soit **1,7 à 2,5 fois** la cible. Conséquence pratique : à 21 h de face-à-face pour 308 pages de corps, le support est **un document de référence à conserver, pas un support projetable intégralement**. Rien n'indiquait dans le `README` ni dans le guide formateur quelle fraction est destinée à la projection et quelle fraction relève de la lecture différée. | **✅ corrigé le 28/07/2026 — option « assumer et documenter » retenue.** (1) `README.md` §3 porte un encadré **« Statut du document : référence exhaustive, pas support de projection »** : ≈ **520 pages A4** pour le support participant, avec un tableau des trois usages — le formateur y **puise** le contenu de sa séance (le tableau §0.4 de chaque module reste le minutage de référence, le reste est du matériau mobilisable) ; le surplus permet l'**adaptation au niveau du groupe** ; le document sert de **documentation post-formation** aux participants. L'encadré indique explicitement qu'un jeu de slides doit être **dérivé** (§0, schémas de §1, énoncés de §3) et non projeté tel quel. (2) `_TEMPLATE-MODULE.md` §Contraintes-8 est recalibré à **15-30 pages A4 (≈ 7 000 à 13 500 mots) hors sources**, base 450 mots/page, avec la justification du statut et les deux garde-fous (< 15 p. = sous-sourcé ; > 30 p. = extraire une annexe). **Aucun contenu de module n'a été supprimé** |

---

# Récapitulatif des corrections appliquées

## Passe 1 — audit initial (28/07/2026)

| # | Fichier | Correction |
|---|---|---|
| 1 | `annexes/annexe-D-bibliographie-complete.md:756` | URL GitHub Copilot corrigée : `…/concepts/prompt-engineering` → `…/concepts/prompting/prompt-engineering` (conforme au corpus `sources-jour2.md:615`) |
| 2 | `module-07-diagnostic-anomalies-flakiness.md:604` | « deux plus deux » → « trois plus deux », et reformulation de la conséquence, pour rétablir l'arithmétique 3+2 = 5 |
| 3 | `module-12-priorisation-risques-roi-go-nogo.md:258-262` | Tableau de bord de priorisation réordonné par risque décroissant, conformément au `Sort-Object Risque -Descending` du script |
| 4 | 12 modules — 36 titres `### 🔍 Exemple A/B/C` | Durées annoncées dans les titres alignées sur les séquences S4/S5/S6 du tableau 0.4 |

## Passe 2 — traitement des anomalies résiduelles (28/07/2026)

| # | Anomalie | Fichiers | Correction |
|---|---|---|---|
| 5 | **C3-1** *(bloquante)* | `module-09` §4.5-4.6 · `00-fil-rouge §5.3` · `annexe-C §3.3` | Corrigé du Boss J3 réécrit : **19 échecs nominatifs E-01 → E-19**, une ligne = un test, répartition **4 / 6 / 7 / 2**. Six champs par échec (identifiant, test, symptôme, catégorie, cause racine, action correcte). Nouveau **§4.6 index/grille de correction** rendant le barème 3 × 19 = **57** directement applicable, avec réconciliation des 6 clusters de M07 (7+4+3+2+2+1 = 19). Le 3ᵉ `ECONNREFUSED` devient E-08 (test faux), référent du bonus +20 |
| 6 | **C3-3** | `module-07` §1.1.3, §1.2.3, Exemple B, M7-2 · `module-09` §4.5 · `00-fil-rouge §3.1` · `00-guide-formateur` · `annexe-C §2` | **Tableau de distinction des deux populations** (12 flaky historiques de `main` / 7 « flaky » parmi les 19 échecs de `formation/j3-pipeline-rouge`) inséré dans les deux modules. BUG-202 unifié : 7 des 12 flaky historiques ; **un seul** échec (E-01) sur la branche du boss, classé « vrai bug produit ». Le cluster de 7 est requalifié en **hypothèse** de cause unique — vérifiée sur `main`, réfutée sur la branche du boss |
| 7 | **C6-1** | `module-01` — indice de M1-4 | Indice rendu arithmétiquement exact : écart **invisible sur les valeurs rondes couramment testées**, visible **dès une ligne** sur les montants dont la 3ᵉ décimale de TVA tombe pile sur 5, **systématique** par accumulation multi-lignes. Résultat attendu inchangé |
| 8 | **C7-1** | `README.md` §3 · `_TEMPLATE-MODULE.md` §Contraintes-8 | Encadré **« Statut du document : référence exhaustive, pas support de projection »** (≈ 520 p., trois usages : le formateur y puise / adaptation au niveau du groupe / documentation post-formation). Contrainte de volume recalibrée à **15-30 pages par module** |
| 9 | **C4-2** | `module-11` | Durées des 4 exercices rééquilibrées **3 / 3 / 4 / 5** (progression monotone), **somme inchangée à 15 min**, ligne S7 du tableau 0.4 intacte |
| 10 | **C1-1** | `module-09` | Boss J3 remonté en `## 4. 🏆 Boss J3` avec sous-sections `4.1`-`4.7` ; débriefing → `## 5.`, sources → `## 6.` |
| 11 | **C3-1bis** | `module-09` — exercice M9-1 · `annexe-C §2` | **BUG-301 devient la cible d'un exercice ⭐** : M9-1 « Le premier seuil — et la borne oubliée » ajoute l'appel `?page=-1`, le `check` sur le statut 400, le seuil `checks: ['rate==1.00']` et la fiche de défaut obligatoire. Structure, difficulté, durée (5 min) et QAC inchangés |
| 12 | **C5-2** | `annexes/annexe-A-glossaire.md` | Entrée « Temperature » complétée : erreur **400** sur `temperature`/`top_p`/`top_k` en Opus 4.7+, et non-déterminisme résiduel à `temperature = 0` avec la conséquence de test |
| 13 | **C5-1** | `module-01`, `module-02`, `module-03` | **21 chemins** `SkyRetail.<Projet>/…` préfixés `backend/`. Contrôle : 0 occurrence non préfixée restante, 0 `backend/backend/` |

**Non touchés, conformément au périmètre de la passe** : aucune source, URL ni référence `[S-xx]` ;
aucune durée d'en-tête de module ; aucun tableau 0.4. Le minutage reste verrouillé à **21 h 00**.

# Récapitulatif des anomalies restantes

Ne subsistent que les points relevant d'un **choix du formateur** ou d'une **vérification externe**.

| # | Gravité | Objet | Décision attendue |
|---|---|---|---|
| **C4-3** | ⚠️ | Σ exercices = S7 exactement dans les 12 modules : aucune marge de dépassement. Le dispositif ne tient que sous l'hypothèse de régulation (exercices ⭐ et ⭐⭐ menés en parallèle par les squads), rappelée sous chaque tableau 0.4 | **Choix pédagogique** : assumer explicitement ce mode de régulation en ouverture de session, ou rogner du contenu pour dégager une marge — ce qui suppose de rouvrir le minutage verrouillé |
| **C2-2** | ⚠️ | `dotnet.testcontainers.org/modules/postgres/` : sous-chemin plausible mais non attesté dans le corpus de recherche | **Vérification manuelle** avant impression (hors périmètre : ne pas modifier une URL sans preuve) |
| **C2-4** | ℹ️ | 46 entrées `[S-xx]` déclarées en §5 mais jamais citées dans le corps — conséquence mécanique du seuil « ≥ 10 sources par notion » | Aucune action. En retirer ferait passer certaines notions sous le seuil |
| **C6-2** | ℹ️ | `[InlineData(1, 0.12)]` sur paramètre `decimal` : la conversion d'arguments xUnit fonctionne, mais peut susciter une question en salle | **Choix du formateur** : laisser tel quel, ou basculer en `MemberData` dans la solution projetée |
| **C1-2 / C1-3** | ℹ️ | Dérive de numérotation des sections pour insérer les boss (M3, M6, M9, M12) ; format allégé de M00 | Acceptés — le gabarit ne prévoyait pas les boss de journée |

---

*Rapport produit le 28/07/2026, mis à jour le 28/07/2026 après la passe de correction des anomalies
résiduelles. Contrôles C1, C2, C4, C5.1, C5.3, C7 automatisés et rejouables ; C3, C5.2 et C6 conduits
par lecture intégrale (module-01, module-06, module-12) et lecture ciblée (module-03, module-07,
module-09, module-11, annexes A et C).*
