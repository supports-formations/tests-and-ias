# Annexe B — Bibliothèque de prompts de QA

**Formation « Test logiciel avec IA générative »** — Human Coders · Evan BOISSONNOT
**Version 1.0 — juillet 2026** · 30 prompts versionnés, prêts à l'emploi

---

## Mode d'emploi

### Ce que cette bibliothèque est

Trente artefacts **versionnés**, à copier dans `prompts/` de votre dépôt et à traiter comme du
code : revue, numéro de version, jeu d'évals. Ce ne sont pas des messages de chat.

### La structure commune — les cinq blocs de M4

Tous les prompts suivent le gabarit enseigné en M4 : `<role>`, `<documents>`, `<constraints>`,
`<output_format>`, `<examples>`, et **`<task>` en dernier**.

| Bloc | Rôle | Erreur fréquente |
|---|---|---|
| `<role>` | Fixe le référentiel de vocabulaire et le niveau d'exigence | Le décorer (« tu es un expert mondial ») au lieu de le contraindre |
| `<documents>` | Fournit la **source de vérité indépendante du code** | La placer après la tâche — les documents vont **en haut** |
| `<constraints>` | Interdit ce qui produit du plausible-mais-faux | Formuler en souhait (« essaie de… ») au lieu d'une interdiction vérifiable |
| `<output_format>` | Rend la sortie parsable, donc évaluable | Ne pas préciser de chemin de fichier exact |
| `<examples>` | Fixe un style (1 exemple) ou une taxonomie (3 à 5) | En mettre quinze : le modèle clone au lieu de généraliser |
| `<task>` | La consigne, **toujours en dernier** | La mettre au début |

### Les quatre règles non négociables

| # | Règle | Pourquoi |
|---|---|---|
| 1 | **Toute valeur attendue cite sa source** en commentaire (`// CDC v4.0 §3.1 : « … »`) | C'est ce qui distingue un test d'un test tautologique |
| 2 | **Une interdiction de lecture** du code testé quand la spécification existe | C'est cette ligne, pas la politesse du prompt, qui casse la tautologie |
| 3 | **Une variable `{{PLACEHOLDER}}` au minimum** | C'est la convention de variabilisation de l'outillage d'évals ; sans elle, le prompt n'est pas un template |
| 4 | **Aucune sortie n'est réputée exécutée** tant que la sortie du runner n'a pas été lue | Une sortie d'outil se vérifie, elle ne se croit jamais sur parole |

### Convention de nommage et de version

```
prompts/
├── requirements-extract.v1.0.md
├── generate-unit-tests-dotnet.v1.0.md
├── ...
└── evals/                      # un fichier d'évals par prompt, cf. M10
```

| Élément | Règle |
|---|---|
| Nom | en anglais, en kebab-case, sans accent |
| Version | `vMAJEUR.MINEUR` — MINEUR pour une reformulation, **MAJEUR dès que la sortie attendue change** |
| Suppression | **jamais** : la v1.0 naïve reste comme ligne de base de comparaison |
| Changement de version | ⚠️ impose de **rejouer le jeu d'évals** avant merge (M10) |

### Table de correspondance

| # | Prompt | Usage | Module |
|---|---|---|---|
| P-01 | `requirements-extract` | Analyse d'exigences | M2 |
| P-02 | `requirements-ambiguity-audit` | Analyse d'exigences | M2 |
| P-03 | `requirements-testability` | Analyse d'exigences | M2 |
| P-04 | `generate-unit-tests-dotnet` | Tests unitaires .NET | M4 |
| P-05 | `generate-tests-by-technique` | Tests unitaires .NET | M2 |
| P-06 | `write-property-fscheck` | Tests unitaires .NET | M3 |
| P-07 | `kill-surviving-mutant` | Tests unitaires .NET | M3 |
| P-08 | `generate-e2e-from-snapshot` | E2E Playwright | M5 |
| P-09 | `audit-locators` | E2E Playwright | M5 |
| P-10 | `test-idempotence-concurrency` | E2E Playwright | M7 |
| P-11 | `gherkin-to-playwright` | E2E Playwright | M2 |
| P-12 | `generate-gherkin` | Gherkin | M2 |
| P-13 | `review-gherkin-diff` | Gherkin | M2 |
| P-14 | `generate-test-data-bogus` | Données de test | M3 |
| P-15 | `qualify-dataset-gdpr` | Données de test | M11 |
| P-16 | `synthesize-dataset-from-schema` | Données de test | M3 |
| P-17 | `build-failure-dossier` | Diagnostic d'échec | M7 |
| P-18 | `root-cause-hypotheses` | Diagnostic d'échec | M7 |
| P-19 | `classify-flaky-taxonomy` | Flakiness | M7 |
| P-20 | `deflake-plan` | Flakiness | M7 |
| P-21 | `review-tests-8points` | Revue de tests | M2 |
| P-22 | `detect-tautological-tests` | Revue de tests | M1 |
| P-23 | `generate-k6-open-model` | Charge | M9 |
| P-24 | `security-review-owasp-2025` | Sécurité | M9 |
| P-25 | `triage-dast-findings` | Sécurité | M9 |
| P-26 | `a11y-audit-and-blindspots` | Accessibilité | M9 |
| P-27 | `campaign-summary` | Synthèse de campagne | M3 |
| P-28 | `risk-prioritization` | Priorisation par risques | M12 |
| P-29 | `acceptance-dossier` | Dossier de recette | M12 |
| P-30 | `ai-human-traceability` | Dossier de recette | M12 |

---

# 1. Analyse d'exigences

## 🧪 P-01 · `requirements-extract` · **v1.0**

**Quand l'utiliser** — Vous recevez un document métier non structuré (cahier des charges, note
de cadrage, compte rendu d'atelier) et vous devez en sortir une liste d'exigences numérotées
et traçables. **Premier prompt de toute campagne.**

```text
<role>
Tu es analyste de test. Référentiel de vocabulaire : glossaire ISTQB.
Tu n'inventes jamais une valeur numérique : toute valeur que tu écris doit être
recopiable telle quelle depuis le document source.
</role>

<documents>
  <document index="1">
    <source>{{CHEMIN_DOCUMENT}} — {{SECTION}}</source>
    <document_content>{{CONTENU}}</document_content>
  </document>
</documents>

<constraints>
- Une exigence = un comportement vérifiable. Si une phrase en contient deux, tu la scindes.
- La colonne « énoncé » contient une CITATION LITTÉRALE entre guillemets, jamais une reformulation.
- Interdiction absolue d'écrire un nombre, un pourcentage, un seuil ou une durée
  qui ne figure pas dans le document 1.
- Si le document est silencieux sur un point nécessaire, tu ne complètes pas :
  tu écris « SILENCE » et tu formules la question à poser au métier.
- Numérotation continue, sans trou, préfixe {{PREFIXE_EXIGENCE}}.
</constraints>

<output_format>
Un tableau Markdown à 5 colonnes :
| ID | Énoncé (citation littérale) | Acteur | Donnée / seuil cité | Source (§ du document) |
Puis une section ## Silences détectés, une ligne par silence, au format :
- SILENCE-nn — <ce qui manque> — Question au métier : « … »
Écrire le résultat dans {{CHEMIN_SORTIE}}.
</output_format>

<examples>
<example>
| EX-101 | « Le tunnel de commande doit permettre de valider en une seule étape » | Client connecté | — | §2.1 |
</example>
</examples>

<task>
Extrais les exigences du document 1 uniquement.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Chaque énoncé est **retrouvable par recherche textuelle** dans le document source.
- [ ] Aucune valeur numérique du tableau n'est absente du document (test : `grep` la valeur).
- [ ] La numérotation n'a pas de trou.
- [ ] Au moins un `SILENCE` est remonté — un document métier réel en contient toujours.

**⚠️ Piège connu** — Le modèle **comble les silences** par des valeurs plausibles issues de son
entraînement (« délai standard de 30 jours », « TVA à 20 % »). C'est la contrainte
d'interdiction de valeur non citée qui l'en empêche, pas la demande d'être rigoureux. Vérifiez
systématiquement les chiffres.

**Module associé** — M2, exercice M2-1.

---

## 🧪 P-02 · `requirements-ambiguity-audit` · **v1.0**

**Quand l'utiliser** — Après P-01, pour chercher les ambiguïtés, les silences et surtout les
**contradictions** entre exigences. C'est le prompt qui fait tomber le conflit EX-003 / EX-014.

```text
<role>
Tu es analyste de test spécialisé en qualité des exigences.
Tu construis une table de décision AVANT de conclure : c'est la seule technique
capable de révéler une contradiction entre deux exigences.
</role>

<documents>
  <document index="1">
    <source>Liste d'exigences extraites — {{CHEMIN_EXIGENCES}}</source>
    <document_content>{{EXIGENCES}}</document_content>
  </document>
</documents>

<constraints>
- Étape 1 obligatoire : construire la table de décision GLOBALE (conditions × actions)
  couvrant toutes les exigences fournies. Tu l'affiches.
- Étape 2 : chercher les colonnes ayant des conditions IDENTIQUES et des actions DIVERGENTES.
  Chacune est une contradiction.
- Une ambiguïté n'est pas une contradiction : distingue les trois catégories
  AMBIGUITE / SILENCE / CONTRADICTION.
- Tu ne proposes JAMAIS de résolution. Tu formules la question à poser au métier.
- Si tu n'en trouves aucune, tu écris « aucune détectée » et tu expliques
  quelle information te manquerait pour en trouver.
</constraints>

<output_format>
## 1. Table de décision globale
<tableau>
## 2. Constats
| ID | Type (AMBIGUITE/SILENCE/CONTRADICTION) | Exigences concernées | Preuve (les deux colonnes de la table) | Question au métier |
Écrire dans {{CHEMIN_SORTIE}}.
</output_format>

<task>
Audite la liste d'exigences du document 1.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] La table de décision est **présente et complète** — sans elle, la détection est du hasard.
- [ ] Chaque `CONTRADICTION` cite **deux colonnes** de la table, pas une intuition.
- [ ] Aucune résolution n'est proposée : uniquement des questions au métier.
- [ ] Les trois catégories sont utilisées (une sortie 100 % `AMBIGUITE` est suspecte).

**⚠️ Piège connu** — Sans l'étape « table de décision d'abord », le modèle **ne signale pas les
contradictions** même quand les deux exigences sont dans son contexte : il les traite
séquentiellement et les harmonise silencieusement. C'est exactement l'échec constaté en M2-4.

**Module associé** — M2, exercice M2-4 et Boss J1.

---

## 🧪 P-03 · `requirements-testability` · **v1.0**

**Quand l'utiliser** — Pour trancher, exigence par exigence, ce qui est testable en l'état et
ce qui ne l'est pas. C'est le livrable attendu par un comité d'architecture.

```text
<role>
Tu es responsable de test. Tu qualifies la testabilité, tu ne la présumes pas.
Une exigence est testable si et seulement si on peut écrire son ORACLE
sans lire le code de production.
</role>

<documents>
  <document index="1">
    <source>{{CHEMIN_EXIGENCES}}</source>
    <document_content>{{EXIGENCES}}</document_content>
  </document>
</documents>

<constraints>
- Critère unique de testabilité : « puis-je écrire le résultat attendu à partir de ce document,
  sans ouvrir le code ? ». Applique-le littéralement.
- Interdiction de proposer « on regardera le comportement actuel » comme oracle.
- Type de test parmi : unitaire | intégration | API/contrat | E2E | charge | sécurité |
  accessibilité | conformité. Un seul type principal par exigence.
- Priorité parmi : bloquante | majeure | mineure — avec la conséquence métier qui la justifie.
- Pour chaque « non testable », la question au métier est OBLIGATOIRE et rédigée
  telle qu'elle serait envoyée.
</constraints>

<output_format>
| ID | Testable (oui/non) | Type de test | Priorité | Oracle (artefact nommé) | Question au métier si non |
La colonne « Oracle » cite un artefact existant : « {{CHEMIN_DOCUMENT}} §x », « openapi.yaml »,
« RGPD art. 15 », « WCAG 2.1.1 ». Jamais « le code », jamais « le comportement actuel ».
Écrire dans {{CHEMIN_SORTIE}}.
</output_format>

<task>
Qualifie la testabilité de chaque exigence du document 1.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Aucune ligne n'a « le code » ou « le comportement actuel » comme oracle.
- [ ] Au moins deux exigences sont classées **non testables en l'état** — un document métier
      réel en contient toujours.
- [ ] Chaque priorité est justifiée par une conséquence métier nommée, pas par un adjectif.

**⚠️ Piège connu** — Le modèle a tendance à déclarer **tout testable**, parce qu'il peut toujours
imaginer un test. Le critère « sans ouvrir le code » est ce qui rétablit la sévérité.

**Module associé** — M2, Boss J1.

---

# 2. Génération de tests unitaires .NET

## 🧪 P-04 · `generate-unit-tests-dotnet` · **v1.0**

**Quand l'utiliser** — Le prompt de référence du support. Génération de tests xUnit +
FluentAssertions à partir de la **spécification**, pas du code.

```text
<role>
Tu es ingénieur QA senior. Référentiel : ISTQB CTFL v4.0.1 pour le vocabulaire,
xUnit v3 + FluentAssertions pour le code.
Tu ne rédiges JAMAIS un résultat attendu qui ne soit pas traçable
vers une ligne du document de spécification.
</role>

<documents>
  <document index="1">
    <source>{{CHEMIN_SPEC}} — {{SECTION_SPEC}}</source>
    <document_content>{{CONTENU_SPEC}}</document_content>
  </document>
  <document index="2">
    <source>{{CHEMIN_INTERFACE}} (signatures uniquement)</source>
    <document_content>{{SIGNATURES}}</document_content>
  </document>
</documents>

<constraints>
- N'ouvre PAS {{FICHIER_SOUS_TEST}}. La source de vérité est le document 1.
- Un comportement = un test. Pas de test à cinq assertions.
- Interdiction de mocker {{INTERFACE_DOMAINE}} : le domaine se teste avec des règles réelles.
- Chaque [Fact] est précédé d'un commentaire // {{REF_SPEC}} : « <citation exacte> ».
- Si le document 1 est ambigu sur un cas, produis
  [Fact(Skip = "ambiguïté {{ID_AMBIGUITE}}")] et liste la question à poser au métier.
- Aucun nombre magique : toute constante attendue est nommée ou commentée avec sa source.
</constraints>

<output_format>
Un seul fichier C#, chemin exact {{CHEMIN_FICHIER_TEST}}.
Termine par un bloc <questions_metier> listant les ambiguïtés détectées.
</output_format>

<examples>
<example>
// CDC v4.0 §3.1 : « la TVA est calculée ligne à ligne, arrondi bancaire »
[Fact]
public void Compute_WithThreeLines_RoundsVatPerLineUsingBankersRounding() { … }
</example>
</examples>

<task>
Produis la suite de tests de {{CLASSE_SOUS_TEST}} à partir du document 1 uniquement.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Chaque `[Fact]` porte un commentaire citant la spécification, **avec citation littérale**.
- [ ] Aucune valeur attendue n'est justifiable uniquement par le code.
- [ ] Le fichier **compile** puis `dotnet test` s'exécute — les trois chiffres à relever :
      *générés / compilent / passent*.
- [ ] Au moins un test est **rouge** si le code contient un défaut : une suite 100 % verte du
      premier coup sur du code réel est un signal d'alerte, pas un succès.

**⚠️ Piège connu** — C'est **le** prompt qui produit des tests tautologiques si on retire la
ligne `N'ouvre PAS {{FICHIER_SOUS_TEST}}`. Sans elle, le modèle lit le code, en dérive l'attendu
et écrit des tests verts qui **figent le défaut**. Testez la version sans la contrainte une fois,
pour voir.

**Module associé** — M4, exemple B et exercice M4-1.

---

## 🧪 P-05 · `generate-tests-by-technique` · **v1.0**

**Quand l'utiliser** — Quand la génération spontanée produit un échantillonnage arbitraire de
cas. Ce prompt **impose** les techniques ISTQB de conception.

```text
<role>
Tu es ingénieur QA. Tu appliques explicitement trois techniques de conception de test
et tu justifies chaque cas par la technique qui l'a produit.
</role>

<documents>
  <document index="1">
    <source>{{CHEMIN_SPEC}} — règle métier {{NOM_REGLE}}</source>
    <document_content>{{CONTENU_SPEC}}</document_content>
  </document>
</documents>

<constraints>
- ÉTAPE 1 — Classes d'équivalence : liste les partitions VALIDES et INVALIDES du domaine
  d'entrée. Tu les affiches avant tout code.
- ÉTAPE 2 — Valeurs limites : pour chaque frontière, produis TROIS points
  (limite-1, limite, limite+1). Aucune frontière ne peut être omise.
- ÉTAPE 3 — Table de décision : si la règle combine plusieurs conditions,
  énumère les combinaisons et marque celles qui ne sont pas spécifiées.
- Une partition invalide non spécifiée par le document 1 donne
  [Fact(Skip = "ambiguïté {{ID_AMBIGUITE}}")], jamais un comportement supposé.
- Interdiction de produire un [Theory] avec moins de {{NB_MIN_INLINEDATA}} [InlineData].
</constraints>

<output_format>
## 1. Partitions
## 2. Frontières et leurs trois points
## 3. Table de décision (si applicable)
## 4. Code — fichier {{CHEMIN_FICHIER_TEST}}
Chaque [InlineData] porte en commentaire la partition ou la frontière dont il provient.
</output_format>

<task>
Conçois la suite de tests de {{NOM_REGLE}} en appliquant les trois techniques dans l'ordre.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Les trois points de **chaque** frontière sont présents (comptez-les).
- [ ] Au moins une partition **invalide** est traitée (négatif, `null`, zéro).
- [ ] Chaque `[InlineData]` est rattaché à une partition ou une frontière nommée.
- [ ] Le nombre de cas aux bornes est **strictement supérieur** à celui d'une génération libre.

**⚠️ Piège connu** — Le modèle produit spontanément les cas « du milieu » des partitions, qui ne
révèlent presque jamais de défaut, et **saute les frontières**. Sans l'étape 2 explicite, vous
obtenez une suite volumineuse et peu sensible.

**Module associé** — M2, exercice M2-3.

---

## 🧪 P-06 · `write-property-fscheck` · **v1.0**

**Quand l'utiliser** — Pour chercher un défaut qu'aucun cas d'exemple ne trouvera : arrondi,
cumul, invariance par permutation, réversibilité.

```text
<role>
Tu es ingénieur QA spécialisé en property-based testing.
Une propriété exprime une RELATION invariante, jamais un calcul.
</role>

<documents>
  <document index="1">
    <source>{{CHEMIN_SPEC}} — {{SECTION_SPEC}}</source>
    <document_content>{{CONTENU_SPEC}}</document_content>
  </document>
</documents>

<constraints>
- Interdiction absolue de réimplémenter le calcul dans la propriété :
  le corps de la propriété ne doit contenir aucune constante de calcul du domaine
  (ni {{CONSTANTE_INTERDITE_1}}, ni {{CONSTANTE_INTERDITE_2}}).
- Chaque propriété exprime l'une des relations suivantes, et tu nommes laquelle :
  invariance (par permutation, par découpage), réversibilité, monotonie,
  idempotence, cohérence entre deux chemins de calcul.
- Les générateurs sont BORNÉS : montants réalistes, longueur de collection plafonnée
  à {{TAILLE_MAX}}. Une propriété qui explore l'infini ne finit pas.
- Tu proposes {{NB_PROPRIETES}} propriétés et tu indiques pour chacune
  le défaut qu'elle est censée révéler.
- FsCheck.Xunit, attribut [Property(MaxTest = {{MAX_TEST}})], catégorie "Property".
</constraints>

<output_format>
Fichier C# unique, chemin {{CHEMIN_FICHIER_TEST}}.
Avant le code, un tableau : | Propriété | Relation exprimée | Défaut visé | Générateur et bornes |
</output_format>

<examples>
<example>
// Relation : invariance par découpage — CDC §3.1
// Σ TVA(ligne) doit égaler TVA(Σ lignes) quel que soit le découpage du panier
[Property(MaxTest = 500)]
public Property Vat_IsInvariantUnderLineSplitting(NonEmptyArray<decimal> lines) { … }
</example>
</examples>

<task>
Écris les propriétés de {{CLASSE_SOUS_TEST}} à partir du document 1.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Le corps d'au moins une propriété ne contient **aucune constante de calcul** du domaine
      (vérifiable par `grep`).
- [ ] Les générateurs sont bornés — sinon l'exécution ne termine pas.
- [ ] Au moins une propriété est **falsifiée** : consignez le contre-exemple minimal après
      *shrinking* **et la graine**.
- [ ] Sur les propriétés proposées, au moins une est **rejetée par vous**, avec le motif.

**⚠️ Piège connu** — Le modèle écrit des propriétés qui **réimplémentent le calcul** :
`Assert(result == amount * 0.8m)`. C'est une tautologie déguisée en propriété — elle passe
toujours et ne teste rien. La contrainte d'interdiction de constante est indispensable.

**Module associé** — M3, exercice M3-2.

---

## 🧪 P-07 · `kill-surviving-mutant` · **v1.0**

**Quand l'utiliser** — Après une campagne Stryker, pour écrire les tests qui tuent les mutants
survivants — c'est-à-dire pour combler exactement ce que rien ne vérifie.

```text
<role>
Tu es ingénieur QA. Un mutant survivant désigne une modification du code de production
qu'AUCUNE assertion ne détecte. Ton travail est d'écrire l'assertion manquante.
</role>

<documents>
  <document index="1">
    <source>Rapport Stryker — mutants survivants</source>
    <document_content>{{RAPPORT_MUTANTS}}</document_content>
  </document>
  <document index="2">
    <source>{{CHEMIN_SPEC}} — comportement attendu de la zone mutée</source>
    <document_content>{{CONTENU_SPEC}}</document_content>
  </document>
</documents>

<constraints>
- Pour CHAQUE mutant, tu écris d'abord en une phrase : « la survie de ce mutant prouve que … ».
- L'assertion nouvelle dérive du document 2, jamais du code muté ni du code original.
- Interdiction de modifier un test existant : tu ajoutes.
- Interdiction de baisser un seuil, d'ajouter un [Skip] ou d'élargir une tolérance.
- Si le mutant est ÉQUIVALENT (aucun comportement observable ne change),
  tu le déclares et tu justifies — c'est une réponse valide.
</constraints>

<output_format>
| Mutant | Fichier:ligne | Mutation | Ce que sa survie prouve | Test ajouté | Équivalent ? |
Puis le code des tests ajoutés, chemin {{CHEMIN_FICHIER_TEST}}.
</output_format>

<task>
Écris les tests qui tuent les mutants du document 1.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Une **seconde exécution de Stryker** confirme que chaque mutant visé est tué.
- [ ] Le score de mutation augmente d'au moins **5 points**.
- [ ] Aucun test ajouté n'est tautologique — appliquez P-21 dessus.
- [ ] Les mutants déclarés équivalents le sont vraiment (relecture humaine obligatoire).

**⚠️ Piège connu** — Le modèle « tue » le mutant en asserant la valeur produite par le code
**original**, ce qui est encore une tautologie. Le document 2 (la spécification) est ce qui
l'empêche. Et méfiez-vous des mutants déclarés équivalents un peu vite : c'est la sortie de
secours facile.

**Module associé** — M3, exercice M3-3.

---

# 3. Génération d'E2E Playwright

## 🧪 P-08 · `generate-e2e-from-snapshot` · **v1.0**

**Quand l'utiliser** — Écrire un test E2E dont **tous** les locators proviennent du DOM réel.
Nécessite Playwright MCP branché, ou un snapshot d'accessibilité collé dans le prompt.

```text
<role>
Tu es ingénieur QA E2E. Tu n'écris JAMAIS un locator que tu n'as pas lu
dans le snapshot d'accessibilité fourni.
</role>

<documents>
  <document index="1">
    <source>Snapshot d'accessibilité de {{URL_PAGE}}</source>
    <document_content>{{SNAPSHOT}}</document_content>
  </document>
  <document index="2">
    <source>{{CHEMIN_SPEC}} — parcours attendu</source>
    <document_content>{{CONTENU_SPEC}}</document_content>
  </document>
</documents>

<constraints>
- Hiérarchie de locators imposée, dans cet ordre :
  1. getByRole(rôle, { name }) — à privilégier toujours
  2. getByTestId — si le rôle est ambigu
  3. getByText — en dernier recours
  Interdiction de : sélecteur CSS positionnel (nth-child, >), XPath absolu, classe de style.
- Chaque locator est accompagné en commentaire de sa référence dans le snapshot (ex. // e17).
- Interdiction de page.waitForTimeout(). On attend un ÉTAT observable
  (expect(...).toBeVisible(), toBeDisabled(), toHaveURL(...)).
- Si un élément n'est adressable ni par rôle+nom ni par testid, tu le SIGNALES
  et tu proposes le data-testid à ajouter côté front. Tu n'inventes pas de contournement.
- L'assertion finale porte sur un effet métier vérifiable du document 2,
  pas sur la présence d'un élément d'interface.
</constraints>

<output_format>
Fichier TypeScript unique, chemin {{CHEMIN_SPEC_E2E}}.
Puis un tableau de traçabilité :
| Locator | Référence snapshot | Type (rôle/testid/texte) |
Puis une section ## Éléments non adressables proprement.
</output_format>

<task>
Écris le test E2E du parcours {{NOM_PARCOURS}} à partir des documents 1 et 2.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] `npx playwright test` s'exécute et affiche un résultat — **vert ou rouge, mais exécuté**.
- [ ] Le tableau de traçabilité n'a **aucune ligne vide**.
- [ ] **Zéro** locator CSS positionnel, **zéro** `waitForTimeout` (vérifiable par `grep`).
- [ ] Au moins un élément est signalé comme non adressable proprement — c'est presque toujours
      le cas sur une application réelle.

**⚠️ Piège connu** — Sans snapshot, le modèle produit des locators **statistiquement plausibles**
(`.checkout-primary`, `#submit-btn`) qui n'existent pas. Il n'a pas menti : il a produit ce que
contient un tunnel de commande *en général*. Le problème est qu'il n'a jamais regardé le vôtre.

**Module associé** — M5, exemple A et exercice M5-2.

---

## 🧪 P-09 · `audit-locators` · **v1.0**

**Quand l'utiliser** — Auditer une suite E2E existante avant de la reprendre : combien de
locators sont fragiles, et lesquels.

```text
<role>
Tu es auditeur de suites E2E. Tu classes, tu ne réécris pas.
</role>

<documents>
  <document index="1">
    <source>Suite E2E — {{CHEMIN_SUITE}}</source>
    <document_content>{{CODE_SUITE}}</document_content>
  </document>
  <document index="2">
    <source>Snapshot d'accessibilité de référence</source>
    <document_content>{{SNAPSHOT}}</document_content>
  </document>
</documents>

<constraints>
- Classe chaque locator en : ROBUSTE (rôle+nom) | ACCEPTABLE (testid) |
  FRAGILE (texte seul) | INTERDIT (CSS positionnel, XPath, classe de style).
- Pour chaque INTERDIT, indique s'il existe un équivalent ROBUSTE dans le document 2.
  Si oui, cite la référence. Si non, écris « nécessite un data-testid côté front ».
- Signale séparément tout waitForTimeout, Thread.Sleep, retry local ou .skip.
- Ne propose AUCUNE réécriture : c'est un audit, pas une correction.
</constraints>

<output_format>
| Fichier:ligne | Locator | Classe | Équivalent robuste disponible | Action |
Puis un compte : nombre par classe, et le pourcentage d'INTERDIT.
Puis une section ## Attentes non déterministes détectées.
</output_format>

<task>
Audite les locators de la suite du document 1.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Le compte par classe est **cohérent avec un `grep` manuel** sur deux ou trois motifs.
- [ ] Chaque équivalent robuste proposé existe réellement dans le snapshot.
- [ ] Aucune réécriture n'a été produite (sinon le modèle a débordé de son rôle).

**⚠️ Piège connu** — Le modèle veut **corriger**. S'il corrige, vous perdez le diagnostic et
vous héritez d'un diff que personne n'a demandé. La contrainte « ne propose aucune réécriture »
est nécessaire et souvent insuffisante : relisez.

**Module associé** — M5, exercice M5-2.

---

## 🧪 P-10 · `test-idempotence-concurrency` · **v1.0**

**Quand l'utiliser** — Pour révéler un défaut de double soumission ou de concurrence, invisible
aux tests séquentiels. C'est le prompt qui fait tomber BUG-201.

```text
<role>
Tu es ingénieur QA. Tu écris des tests qui provoquent la condition de course,
tu ne l'attends pas.
</role>

<documents>
  <document index="1">
    <source>{{CHEMIN_SPEC}} — règle d'unicité / d'idempotence</source>
    <document_content>{{CONTENU_SPEC}}</document_content>
  </document>
  <document index="2">
    <source>Contrat API — {{CHEMIN_OPENAPI}}</source>
    <document_content>{{EXTRAIT_OPENAPI}}</document_content>
  </document>
</documents>

<constraints>
- Produis DEUX tests : un E2E (double interaction rapide, {{DELAI_MS}} ms d'écart)
  et un test d'API (N requêtes parallèles, N = {{NB_PARALLELE}}).
- L'assertion porte sur l'ÉTAT FINAL du système (nombre d'entités créées),
  jamais sur la réponse HTTP seule.
- Interdiction de waitForTimeout et de retry : le test doit être déterministe
  dans sa provocation, même s'il révèle un comportement non déterministe.
- Le test doit rester ROUGE tant que le défaut n'est pas corrigé,
  y compris si un autre test du même fichier ajoute une attente.
- Précise en commentaire quelle couche doit être corrigée (front, API, ou les deux).
</constraints>

<output_format>
Deux fichiers : {{CHEMIN_E2E}} et {{CHEMIN_TEST_API}}.
Puis une section ## Diagnostic : quelle couche, pourquoi une seule ne suffit pas.
</output_format>

<task>
Écris les tests d'idempotence de {{NOM_OPERATION}}.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Le test est **rouge** sur la branche non corrigée, y compris avec un `waitForTimeout`
      ajouté ailleurs dans le fichier.
- [ ] L'assertion compte des **entités**, pas des codes HTTP.
- [ ] Après correction, `--repeat-each=20 --workers=4` affiche **20/20, 0 flaky**.
- [ ] Le diagnostic identifie **deux couches** : un correctif front seul ou API seul ne suffit
      généralement pas.

**⚠️ Piège connu** — Le modèle propose de « corriger » en désactivant le bouton après un délai.
C'est un contournement, pas une correction : l'état de soumission doit être positionné
**synchroniquement**, et l'API doit porter une clé d'idempotence.

**Module associé** — M7, exercice M7-4.

---

## 🧪 P-11 · `gherkin-to-playwright` · **v1.0**

**Quand l'utiliser** — Deuxième étape du pipeline en deux temps : exigence → Gherkin (P-12),
puis Gherkin → code. Le découpage produit de meilleurs résultats que la génération directe.

```text
<role>
Tu es ingénieur QA E2E. Tu traduis un scénario Gherkin en test exécutable
sans en changer le sens ni en ajouter d'étape.
</role>

<documents>
  <document index="1">
    <source>Scénarios Gherkin revus — {{CHEMIN_FEATURE}}</source>
    <document_content>{{GHERKIN}}</document_content>
  </document>
  <document index="2">
    <source>Snapshot d'accessibilité de {{URL_PAGE}}</source>
    <document_content>{{SNAPSHOT}}</document_content>
  </document>
</documents>

<constraints>
- Une étape Gherkin = une action ou une assertion. Tu ne fusionnes pas.
- Si une étape n'est pas réalisable avec le snapshot du document 2,
  tu le SIGNALES et tu laisses un test.fixme() commenté. Tu n'inventes pas de locator.
- Le commentaire de traçabilité // Traçabilité : {{PREFIXE_EXIGENCE}}-nnn
  est reporté du Gherkin vers le fichier de test.
- Mêmes règles de locators que P-08 : rôle+nom > testid > texte. Rien d'autre.
- Interdiction d'ajouter une étape « de confort » absente du scénario.
</constraints>

<output_format>
Fichier TypeScript, chemin {{CHEMIN_SPEC_E2E}}.
Puis un tableau : | Étape Gherkin | Ligne de code correspondante | Locator utilisé |
</output_format>

<task>
Traduis les scénarios du document 1.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Le nombre d'étapes Gherkin **égale** le nombre de lignes du tableau de correspondance.
- [ ] Aucune étape n'a été ajoutée ni fusionnée.
- [ ] Les commentaires de traçabilité sont présents dans le fichier produit.

**⚠️ Piège connu** — Le modèle **ajoute des étapes de confort** (accepter les cookies, attendre
le chargement, se connecter) qui n'étaient pas dans le scénario. Elles rendent le test vert et
le scénario faux : le comportement testé n'est plus celui qui a été validé par le métier.

**Module associé** — M2, exemple B.

---

# 4. Génération de Gherkin

## 🧪 P-12 · `generate-gherkin` · **v1.0**

**Quand l'utiliser** — Première étape du pipeline en deux temps. Produire des scénarios lisibles
par le métier à partir d'exigences.

```text
<role>
Tu es business analyst. Tu écris du Gherkin DÉCLARATIF (le quoi),
jamais impératif (le comment : « je clique sur… », « je saisis dans le champ… »).
</role>

<documents>
  <document index="1">
    <source>{{CHEMIN_EXIGENCES}} — exigences {{PLAGE_EXIGENCES}}</source>
    <document_content>{{EXIGENCES}}</document_content>
  </document>
</documents>

<constraints>
- Un Then est VÉRIFIABLE : il énonce un état observable, jamais une intention
  (« la commande est enregistrée », pas « tout se passe bien »).
- Interdiction d'écrire un Given/When/Then contenant un sélecteur, un identifiant technique
  ou un nom de champ d'interface.
- Aucune valeur numérique absente du document 1.
- Factorise la combinatoire en Scenario Outline + Examples dès que deux scénarios
  ne diffèrent que par une valeur.
- Chaque scénario porte un commentaire # Traçabilité : {{PREFIXE_EXIGENCE}}-nnn.
- Produis {{NB_SCENARIOS}} scénarios minimum. Si le document 1 n'en permet pas autant,
  tu le dis et tu expliques ce qui manque.
</constraints>

<output_format>
Un fichier .feature par exigence majeure, chemin {{REPERTOIRE_FEATURES}}.
Langue : français (# language: fr).
</output_format>

<examples>
<example>
# Traçabilité : EX-107
Scénario: Le plafond de remise s'applique au cumul
  Étant donné un panier éligible à deux remises cumulables
  Quand le cumul dépasse le plafond contractuel
  Alors la remise appliquée est égale au plafond
</example>
</examples>

<task>
Génère les scénarios des exigences du document 1.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] `npx @cucumber/gherkin-utils format {{REPERTOIRE_FEATURES}}/*.feature` s'exécute **sans erreur**.
- [ ] Aucun `Then` n'est invérifiable (« tout fonctionne », « l'utilisateur est satisfait »).
- [ ] Aucun sélecteur ni nom de champ technique dans les étapes.
- [ ] Chaque scénario porte son commentaire de traçabilité.

**⚠️ Piège connu** — Sans la contrainte « déclaratif », le modèle écrit du Gherkin impératif qui
décrit une interface plutôt qu'un comportement. Ces scénarios cassent au premier changement
d'écran et deviennent illisibles par le métier — c'est-à-dire qu'ils perdent leur seule raison
d'être.

**Module associé** — M2, exercice M2-2.

---

## 🧪 P-13 · `review-gherkin-diff` · **v1.0**

**Quand l'utiliser** — Immédiatement après P-12. **Le livrable, c'est le diff**, pas le Gherkin.

```text
<role>
Tu es relecteur de spécifications exécutables. Tu produis un DIFF commenté,
pas une nouvelle version silencieuse.
</role>

<documents>
  <document index="1">
    <source>Gherkin BRUT généré — {{CHEMIN_BRUT}}</source>
    <document_content>{{GHERKIN_BRUT}}</document_content>
  </document>
  <document index="2">
    <source>Exigences sources — {{CHEMIN_EXIGENCES}}</source>
    <document_content>{{EXIGENCES}}</document_content>
  </document>
</documents>

<constraints>
- Chaque correction est classée dans EXACTEMENT une catégorie :
  GHERKIN_IMPERATIF | THEN_NON_VERIFIABLE | VALEUR_INVENTEE |
  COMBINATOIRE_NON_FACTORISEE | TRACABILITE_ABSENTE | SCENARIO_HORS_PERIMETRE.
- Pour VALEUR_INVENTEE, tu cites la valeur et tu prouves son absence du document 2.
- Tu produis {{NB_CORRECTIONS_MIN}} corrections minimum.
  Si tu n'en trouves pas autant, tu justifies pourquoi le brut était déjà conforme.
- Tu ne supprimes jamais un scénario sans le signaler explicitement.
</constraints>

<output_format>
| # | Ligne brute | Ligne corrigée | Catégorie | Justification (référence document 2) |
Puis le fichier revu complet, chemin {{CHEMIN_REVU}}.
</output_format>

<task>
Révise le Gherkin du document 1 au regard du document 2.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Les deux fichiers (brut et revu) **coexistent** dans le dépôt — le brut ne se supprime pas.
- [ ] Chaque `VALEUR_INVENTEE` est vérifiable par recherche textuelle dans les exigences.
- [ ] Au moins trois corrections, réparties sur au moins deux catégories.

**⚠️ Piège connu** — Le modèle **réécrit tout et présente le résultat comme le brut amélioré**,
sans montrer ce qu'il a changé. Vous perdez alors la seule information de valeur : ce que la
génération brute avait raté. Gardez toujours les deux versions.

**Module associé** — M2, exercice M2-2 et Boss J1.

---

# 5. Données de test

## 🧪 P-14 · `generate-test-data-bogus` · **v1.0**

**Quand l'utiliser** — Produire un jeu de données déterministe, sans donnée personnelle, avec
toutes les partitions représentées.

```text
<role>
Tu es ingénieur QA. Un jeu de données de test est REPRODUCTIBLE et NE CONTIENT
aucune donnée personnelle réelle.
</role>

<documents>
  <document index="1">
    <source>Schéma de l'entité — {{CHEMIN_ENTITE}}</source>
    <document_content>{{SCHEMA}}</document_content>
  </document>
  <document index="2">
    <source>Partitions à couvrir — {{CHEMIN_PARTITIONS}}</source>
    <document_content>{{PARTITIONS}}</document_content>
  </document>
</documents>

<constraints>
- Graine CONSTANTE et versionnée : UseSeed({{GRAINE}}). Elle apparaît en clair dans le code.
- Tous les e-mails générés sur un domaine réservé : *.test, *.invalid ou example.com.
  Aucun domaine réel, même inexistant.
- Aucun numéro de téléphone, IBAN, NIR ou identifiant national réaliste :
  utilise les plages réservées ou des formats manifestement fictifs.
- Toutes les partitions du document 2 doivent être représentées dans le jeu produit.
  Tu ajoutes une assertion qui le vérifie.
- Tu écris un test Faker_IsDeterministic_AcrossRuns qui compare deux générations.
</constraints>

<output_format>
Fichier C#, chemin {{CHEMIN_FAKER}}.
Puis un tableau : | Partition | Nombre d'instances générées | Assertion de vérification |
</output_format>

<task>
Écris le générateur de {{NOM_ENTITE}} couvrant les partitions du document 2.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] `Faker_IsDeterministic_AcrossRuns` **passe** : deux générations sont strictement identiques.
- [ ] **Aucun** e-mail sur un domaine réel (vérifiable par `grep -v` sur les domaines autorisés).
- [ ] Toutes les partitions sont présentes, assertion à l'appui.
- [ ] La graine est en clair et versionnée.

**⚠️ Piège connu** — Le modèle génère des données **réalistes**, ce qui est exactement le
problème : un e-mail réaliste est un e-mail qui peut appartenir à quelqu'un. Le réalisme utile
porte sur la **structure** (longueurs, formats, distributions), pas sur la vraisemblance des
valeurs.

**Module associé** — M3, exercice M3-1.

---

## 🧪 P-15 · `qualify-dataset-gdpr` · **v1.0**

**Quand l'utiliser** — Avant d'envoyer quoi que ce soit à un fournisseur de modèle, ou avant de
réutiliser un extrait de production « anonymisé ».

```text
<role>
Tu es analyste conformité. Tu appliques le test à trois critères
et tu ne conclus « anonyme » que si les TROIS échouent pour un attaquant raisonnable.
</role>

<documents>
  <document index="1">
    <source>Description du jeu de données — {{CHEMIN_DESCRIPTION}}</source>
    <document_content>{{DESCRIPTION_CHAMPS}}</document_content>
  </document>
  <document index="2">
    <source>Contexte de traitement (finalité, destinataires, durée)</source>
    <document_content>{{CONTEXTE}}</document_content>
  </document>
</documents>

<constraints>
- Traite EXPLICITEMENT les trois critères, dans cet ordre :
  1. INDIVIDUALISATION — peut-on isoler un individu ?
  2. CORRÉLATION — peut-on relier deux enregistrements du même individu ?
  3. INFÉRENCE — peut-on déduire une information sur un individu ?
- Si UN SEUL critère est satisfait, la conclusion est « pseudonymisé », pas « anonyme ».
- Nomme au moins un champ ou une COMBINAISON de champs résiduellement identifiante.
- Conclusion en une phrase, puis la CONSÉQUENCE opérationnelle
  (données soumises au RGPD ou non, base légale nécessaire, durée de conservation).
- Interdiction de conclure « anonyme » si le jeu provient d'un extrait de production.
</constraints>

<output_format>
## 1. Inventaire des champs et de leur sensibilité
## 2. Test à trois critères — un paragraphe par critère, avec verdict
## 3. Qualification retenue (personnel | pseudonymisé | anonyme | fictif)
## 4. Conséquence opérationnelle
## 5. Ce que je ne peux pas déterminer sans information supplémentaire
Écrire dans {{CHEMIN_SORTIE}}.
</output_format>

<task>
Qualifie le jeu de données du document 1 dans le contexte du document 2.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Les **trois** critères sont traités, chacun avec un verdict argumenté.
- [ ] Au moins une **combinaison** de champs identifiante est nommée (typiquement : code postal
      + date de naissance + montant).
- [ ] La qualification est cohérente avec les verdicts : un seul critère satisfait ⇒
      « pseudonymisé ».
- [ ] La section 5 n'est pas vide : il y a toujours quelque chose que le modèle ne peut pas savoir.

**⚠️ Piège connu** — Le modèle conclut **« anonyme »** dès que les noms sont remplacés par des
UUID. C'est faux : c'est une pseudonymisation, réversible par recoupement, et les données
restent soumises au RGPD. C'est l'erreur de qualification la plus coûteuse en conformité.

**Module associé** — M11, exercice M11-1.

---

## 🧪 P-16 · `synthesize-dataset-from-schema` · **v1.0**

**Quand l'utiliser** — Quand vous avez besoin d'un volume réaliste (test de charge, recherche
full-text) sans partir d'un extrait de production.

```text
<role>
Tu es ingénieur données de test. Tu génères depuis le SCHÉMA,
jamais depuis un échantillon de production.
</role>

<documents>
  <document index="1">
    <source>Schéma relationnel — {{CHEMIN_SCHEMA}}</source>
    <document_content>{{SCHEMA_SQL}}</document_content>
  </document>
  <document index="2">
    <source>Caractéristiques statistiques cibles</source>
    <document_content>{{DISTRIBUTIONS}}</document_content>
  </document>
</documents>

<constraints>
- Volume cible : {{VOLUME}} enregistrements dans la table principale, avec les tables
  liées cohérentes (aucune violation de contrainte d'intégrité).
- Respecte les distributions du document 2 (longueurs de texte, cardinalités,
  taux de valeurs nulles) — c'est ce qui rend le test de charge représentatif.
- Aucune donnée personnelle plausible : voir les règles de P-14.
- Le script doit être IDEMPOTENT : deux exécutions produisent la même base.
- Interdiction de générer par appels au modèle ligne à ligne :
  produis un script exécutable ({{LANGAGE_SCRIPT}}), pas des données inline.
</constraints>

<output_format>
Script exécutable, chemin {{CHEMIN_SCRIPT}}.
Puis un tableau : | Table | Volume | Distribution appliquée | Contrainte vérifiée |
Puis la commande de vérification du volume produit.
</output_format>

<task>
Écris le script de génération du jeu de données {{NOM_JEU}}.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Le script produit **exactement** le volume annoncé (vérifiez par `COUNT(*)`).
- [ ] Aucune violation de contrainte d'intégrité au chargement.
- [ ] Deux exécutions produisent des bases identiques.
- [ ] Les distributions sont respectées — un catalogue où tous les libellés font 12 caractères
      ne teste pas la recherche full-text.

**⚠️ Piège connu** — Le modèle produit des données **trop régulières** : longueurs uniformes,
absence de valeurs nulles, cardinalités égales. Un test de charge sur ces données donne des
temps de réponse flatteurs et faux. C'est ainsi qu'un défaut de complexité algorithmique passe
inaperçu jusqu'en production.

**Module associé** — M3, M9.

---

# 6. Diagnostic d'échec

## 🧪 P-17 · `build-failure-dossier` · **v1.0**

**Quand l'utiliser** — **Avant** de demander un diagnostic. Ce prompt constitue le dossier ;
c'est P-18 qui l'analyse. La séparation est volontaire.

```text
<role>
Tu es ingénieur QA. Tu constitues un dossier d'échec NORMALISÉ et COURT.
Une trace complète de 40 000 tokens produit un diagnostic générique et une facture réelle.
</role>

<documents>
  <document index="1">
    <source>Sortie du runner — {{CHEMIN_JUNIT}}</source>
    <document_content>{{JUNIT_XML}}</document_content>
  </document>
  <document index="2">
    <source>Extrait de trace — {{CHEMIN_TRACE}} (dernières actions avant l'échec)</source>
    <document_content>{{EXTRAIT_TRACE}}</document_content>
  </document>
  <document index="3">
    <source>Diff limité au système sous test</source>
    <document_content>{{GIT_DIFF_SUT}}</document_content>
  </document>
</documents>

<constraints>
- Le dossier fait au maximum {{MAX_LIGNES}} lignes. Tu élagues, tu ne recopies pas.
- Sept sections numérotées, dans cet ordre :
  1. Identification (test, fichier, date, branche, run)
  2. Reproductibilité (résultat de --repeat-each, n échecs sur N — les N statuts listés)
  3. Message d'erreur BRUT, non reformulé
  4. Historique du SUT (git log -1 et diff, LIMITÉS au chemin du SUT)
  5. Contexte d'exécution (workers, TZ, versions)
  6. Ce qui a déjà été écarté
  7. Ce qui manque au dossier
- Interdiction de formuler une hypothèse de cause : ce n'est pas l'objet de ce prompt.
- Interdiction de reformuler un message d'erreur : il est recopié tel quel.
</constraints>

<output_format>
Fichier Markdown, chemin {{CHEMIN_DOSSIER}}.
</output_format>

<task>
Constitue le dossier d'échec du test {{NOM_TEST}}.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] `wc -l` sur le fichier renvoie **≤ {{MAX_LIGNES}}**.
- [ ] La section 2 contient un `--repeat-each` **réellement exécuté**, avec les N statuts listés.
- [ ] La section 4 est limitée au chemin du SUT, pas au dépôt entier.
- [ ] Aucune hypothèse de cause n'a été formulée.

**⚠️ Piège connu** — L'erreur n°1 du module M7 : envoyer la trace entière. Le prompt fait 40 000
tokens, la réponse est générique, la facture est réelle. Un dossier de 200 lignes donne un
meilleur résultat pour un centième du coût.

**Module associé** — M7, exercice M7-1.

---

## 🧪 P-18 · `root-cause-hypotheses` · **v1.0**

**Quand l'utiliser** — Sur le dossier produit par P-17. Il produit des **hypothèses classées
avec leur commande de réfutation**, jamais une conclusion.

```text
<role>
Tu es ingénieur de diagnostic. Tu produis des HYPOTHÈSES RÉFUTABLES,
chacune accompagnée de la commande qui permet de la trancher.
Une hypothèse sans commande de réfutation n'est pas une hypothèse, c'est une opinion.
</role>

<documents>
  <document index="1">
    <source>Dossier d'échec normalisé — {{CHEMIN_DOSSIER}}</source>
    <document_content>{{DOSSIER}}</document_content>
  </document>
</documents>

<constraints>
- Produis {{NB_HYPOTHESES}} hypothèses, classées par probabilité DÉCROISSANTE.
- Chaque hypothèse comporte : la cause supposée, le mécanisme, la commande exacte
  qui la confirme ou l'infirme, et le résultat attendu de cette commande dans les deux cas.
- Chaque hypothèse est rattachée à une catégorie :
  VRAI_BUG_PRODUIT | TEST_FAUX | FLAKY | ENVIRONNEMENT.
- Interdiction de conclure. Tu écris explicitement :
  « Ces hypothèses ne sont pas des conclusions. Exécutez les commandes. »
- Si le dossier est insuffisant, tu listes ce qui manque au lieu de deviner.
</constraints>

<output_format>
| # | Hypothèse | Catégorie | Mécanisme | Commande de réfutation | Attendu si vraie | Attendu si fausse |
Puis ## Ce qui manque au dossier.
</output_format>

<task>
Propose les hypothèses de cause racine pour le dossier du document 1.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] **Chaque** hypothèse a une commande exacte, copiable-collable.
- [ ] Les deux attendus (si vraie / si fausse) sont distincts — sinon la commande ne discrimine rien.
- [ ] Les quatre catégories ne sont pas toutes « FLAKY ».
- [ ] Vous avez **exécuté** au moins les deux premières commandes avant de retenir une hypothèse.

**⚠️ Piège connu** — La **sur-explication** est documentée : le modèle produit une justification
structurée et convaincante **y compris quand il se trompe**. La narration n'est pas une preuve.
Exigez toujours la commande de reproduction, et exécutez-la.

**Module associé** — M7, exemple A.

---

# 7. Analyse de flakiness

## 🧪 P-19 · `classify-flaky-taxonomy` · **v1.0**

**Quand l'utiliser** — Sur un lot d'échecs, pour passer de « N échecs » à « k causes racines ».

```text
<role>
Tu es ingénieur QA spécialisé en stabilité de suite.
Un test flaky produit des RÉSULTATS DIFFÉRENTS sur le MÊME code.
Un test qui échoue systématiquement n'est pas flaky : c'est un échec.
</role>

<documents>
  <document index="1">
    <source>Lot d'échecs — {{CHEMIN_ECHECS}}</source>
    <document_content>{{ECHECS}}</document_content>
  </document>
</documents>

<constraints>
- Taxonomie imposée, une catégorie par échec :
  ATTENTE_IMPLICITE | ORDRE_EXECUTION | FUSEAU_LOCALISATION |
  CONCURRENCE | RESSOURCE_PARTAGEE | INFRASTRUCTURE | NON_FLAKY.
- Pour chaque échec, tu fournis le DISCRIMINANT : la commande qui prouve la catégorie
  (--workers=1, --repeat-each=N, TZ=..., ordre inversé, isolation de la base).
- Le résultat s'exprime en « n échecs sur N exécutions », jamais en « ça passe / ça passe pas ».
- Aucune contre-mesure proposée ne peut être : waitForTimeout, Thread.Sleep,
  retries, [Skip], ou l'augmentation d'un timeout global.
- Si plusieurs échecs partagent une cause, tu le SIGNALES et tu nommes la cause commune.
</constraints>

<output_format>
| Test | Catégorie | Discriminant appliqué | Commande exacte | Résultat (n/N) | Contre-mesure |
Puis ## Causes communes : une ligne par groupe, avec le nombre de tests concernés.
</output_format>

<task>
Classe les échecs du document 1.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Au moins **trois catégories distinctes** apparaissent — un lot 100 % `ATTENTE_IMPLICITE`
      signale un classement paresseux.
- [ ] Chaque ligne porte une commande reproductible.
- [ ] Chaque résultat est exprimé en `n/N`.
- [ ] **Aucune** contre-mesure interdite (vérifiable par `grep`).
- [ ] Les causes communes sont identifiées : sur un lot réel, une seule cause explique souvent
      plus de la moitié des symptômes.

**⚠️ Piège connu** — Classer « flaky » un test qui échoue systématiquement. C'est l'erreur de
vocabulaire la plus coûteuse du module : elle envoie un **vrai défaut** en quarantaine, où il
attend la production.

**Module associé** — M7, exercice M7-3.

---

## 🧪 P-20 · `deflake-plan` · **v1.0**

**Quand l'utiliser** — Après P-19, pour produire un plan de traitement avec arbitrage explicite
correction / quarantaine datée / suppression.

```text
<role>
Tu es responsable de la stabilité de la suite. Tu arbitres, et tu assumes chaque arbitrage
avec une date et un propriétaire.
</role>

<documents>
  <document index="1">
    <source>Classement taxonomique — {{CHEMIN_TAXONOMIE}}</source>
    <document_content>{{TAXONOMIE}}</document_content>
  </document>
  <document index="2">
    <source>Criticité métier des parcours concernés</source>
    <document_content>{{CRITICITE}}</document_content>
  </document>
</documents>

<constraints>
- Trois décisions possibles seulement : CORRIGER | QUARANTAINE_DATEE | SUPPRIMER.
- Une QUARANTAINE_DATEE exige OBLIGATOIREMENT : une date de sortie, un propriétaire nommé,
  et le risque accepté pendant la quarantaine. Sans les trois, la décision est refusée.
- SUPPRIMER n'est admissible que si le test est redondant avec un autre test nommé.
- Pour CORRIGER, indique la couche à modifier et l'effort estimé en demi-journées.
- Interdiction de proposer un retry, global ou local, comme décision.
- Ordonne le plan par ratio (risque évité / effort), et affiche le ratio.
</constraints>

<output_format>
| Test | Décision | Justification | Propriétaire | Date | Effort | Risque accepté | Ratio |
Puis ## Ce que ce plan ne traite pas, et pourquoi.
</output_format>

<task>
Produis le plan de traitement des tests du document 1.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Chaque `QUARANTAINE_DATEE` a **ses trois éléments** : date, propriétaire, risque.
- [ ] Chaque `SUPPRIMER` cite le test redondant qui le remplace.
- [ ] Aucun `retry` proposé.
- [ ] La section « ce que ce plan ne traite pas » n'est pas vide.

**⚠️ Piège connu** — La quarantaine sans date est une **suppression déguisée**, et elle est
pire : elle laisse croire que la couverture existe. Le prompt refuse la décision si les trois
éléments manquent ; vérifiez que le modèle ne les a pas inventés (un propriétaire nommé
« l'équipe QA » n'est pas un propriétaire).

**Module associé** — M7, §N2.

---

# 8. Revue de tests

## 🧪 P-21 · `review-tests-8points` · **v1.0**

**Quand l'utiliser** — Avant tout commit de tests générés. C'est la grille appliquée par le
Copilote du squad.

```text
<role>
Tu es relecteur de tests. Tu appliques une grille en 8 points, sans en sauter aucun,
et tu produis un verdict par point avec une preuve.
</role>

<documents>
  <document index="1">
    <source>Suite de tests à réviser — {{CHEMIN_SUITE}}</source>
    <document_content>{{CODE_TESTS}}</document_content>
  </document>
  <document index="2">
    <source>Spécification source — {{CHEMIN_SPEC}}</source>
    <document_content>{{SPEC}}</document_content>
  </document>
</documents>

<constraints>
Applique EXACTEMENT ces 8 points, dans cet ordre, à chaque test :
1. ORACLE — le résultat attendu dérive-t-il du document 2 ou du code ? (cite la ligne)
2. TRAÇABILITÉ — le test cite-t-il son exigence ?
3. UNICITÉ — un comportement par test, ou assertion roulette ?
4. NOMMAGE — le nom décrit-il le comportement et l'attendu ?
5. NOMBRES MAGIQUES — toute constante est-elle justifiée ou nommée ?
6. MOCKING — le test vérifie-t-il un comportement ou une implémentation ?
7. DÉTERMINISME — dépendance à l'heure, à l'ordre, au fuseau, à une ressource partagée ?
8. VALEUR — que casserait ce test que les autres ne cassent pas ?
- Verdict par point : OK | À CORRIGER | BLOQUANT, avec la preuve (ligne citée).
- Le point 1 est BLOQUANT par nature : un test dont l'oracle est le code est refusé.
- Tu ne corriges pas. Tu signales.
</constraints>

<output_format>
| Test | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | Verdict global |
Puis, pour chaque BLOQUANT : le détail, la ligne fautive, et ce qu'il faudrait à la place.
</output_format>

<task>
Révise la suite du document 1.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Les 8 points sont traités pour **chaque** test — aucune case vide.
- [ ] Chaque verdict `BLOQUANT` cite une ligne réelle du code.
- [ ] Le point 8 (« que casserait ce test ? ») a une réponse concrète : si la réponse est
      « rien », le test est à supprimer, pas à corriger.

**⚠️ Piège connu** — Le modèle est **complaisant** en revue : il valide plus facilement du code
qu'il aurait pu produire. Deux contre-mesures : faire réviser par un **subagent séparé** (avec
`Edit`, `Write` et `Bash` retirés de ses outils), et exiger une preuve citée par point.

**Module associé** — M2, §N3.

---

## 🧪 P-22 · `detect-tautological-tests` · **v1.0**

**Quand l'utiliser** — Sur une suite existante, pour mesurer combien de tests figent le
comportement au lieu de le valider. C'est l'audit qui ouvre les yeux d'une équipe.

```text
<role>
Tu es auditeur de suites de tests. Tu classes chaque valeur attendue selon SON ORIGINE.
</role>

<documents>
  <document index="1">
    <source>Suite de tests — {{CHEMIN_SUITE}}</source>
    <document_content>{{CODE_TESTS}}</document_content>
  </document>
  <document index="2">
    <source>Spécification disponible — {{CHEMIN_SPEC}}</source>
    <document_content>{{SPEC}}</document_content>
  </document>
</documents>

<constraints>
- Pour chaque assertion, classe la valeur attendue en :
  (S) SPÉCIFICATION — retrouvable dans le document 2, tu cites la ligne ;
  (C) CODE — dérivée de l'implémentation, donc TAUTOLOGIQUE ;
  (I) INCONNUE — impossible de trancher, tu dis pourquoi.
- Une valeur classée (S) DOIT être accompagnée de sa citation littérale.
  Sans citation, elle est reclassée (I).
- Aucun trou : chaque test de la suite apparaît dans le tableau.
- Termine par le taux : nombre de (C) / nombre total d'assertions.
- Réécris UN test de la catégorie (C) en catégorie (S), à titre d'exemple,
  et indique s'il devient rouge.
</constraints>

<output_format>
| Test | Assertion | Valeur attendue | Origine (S/C/I) | Citation ou justification |
Puis ## Taux de tautologie : x %
Puis ## Exemple de réécriture, avec le statut du test réécrit.
</output_format>

<task>
Audite l'origine des valeurs attendues de la suite du document 1.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] **Aucun trou** : chaque test est classé.
- [ ] Chaque `(S)` porte une citation littérale vérifiable par recherche textuelle.
- [ ] Le test réécrit a été **exécuté** et son statut consigné.
- [ ] Le taux de tautologie est calculé, pas estimé.

**⚠️ Piège connu** — Le modèle classe `(S)` par défaut, parce que la valeur « semble
raisonnable ». La règle « pas de citation ⇒ reclassé `(I)` » est ce qui rétablit la rigueur.
Sur une suite générée sans contrainte d'oracle, attendez-vous à un taux de `(C)` très élevé.

**Module associé** — M1, exercice M1-2.

---

# 9. Scénario de charge

## 🧪 P-23 · `generate-k6-open-model` · **v1.0**

**Quand l'utiliser** — Écrire un test de **capacité**. Le modèle ouvert n'est pas une préférence
de style : c'est ce qui distingue un test de capacité d'un test de débit auto-régulé.

```text
<role>
Tu es ingénieur performance. Un test de CAPACITÉ utilise un exécuteur à TAUX D'ARRIVÉE
(modèle ouvert). Un test « N utilisateurs virtuels » (modèle fermé) ne prouve rien
sur la capacité : le débit s'auto-régule quand le système ralentit.
</role>

<documents>
  <document index="1">
    <source>Contrat de l'endpoint — {{CHEMIN_OPENAPI}}</source>
    <document_content>{{EXTRAIT_OPENAPI}}</document_content>
  </document>
  <document index="2">
    <source>Charge de référence métier</source>
    <document_content>{{CHARGE_METIER}}</document_content>
  </document>
</documents>

<constraints>
- Exécuteur : constant-arrival-rate ou ramping-arrival-rate UNIQUEMENT.
  constant-vus seul est refusé.
- Seuils exprimés en p(95) et p(99). Interdiction d'exprimer un seuil sur avg.
- Paliers : {{NB_PALIERS}} paliers croissants couvrant de {{TAUX_MIN}} à {{TAUX_MAX}} req/s,
  chacun d'une durée suffisante pour atteindre un régime stable ({{DUREE_PALIER}}).
- preAllocatedVUs et maxVUs dimensionnés et JUSTIFIÉS en commentaire.
- Le script sort en échec (code de sortie non nul) si un seuil est dépassé.
- Ajoute un commentaire indiquant quelle métrique serveur relever pendant le tir.
- Version de k6 ciblée : {{VERSION_K6}}. N'utilise aucune option obsolète.
</constraints>

<output_format>
Fichier TypeScript, chemin {{CHEMIN_SCRIPT_K6}}.
Puis un tableau : | Palier | Taux (req/s) | Durée | Seuil p95 | Seuil p99 | Taux d'erreur max |
Puis la commande d'exécution et la façon de lire le code de sortie.
</output_format>

<task>
Écris le scénario de charge de {{NOM_ENDPOINT}}.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] L'exécuteur est bien **à taux d'arrivée** (`grep -c "arrival-rate"` ≥ 1).
- [ ] Aucun seuil sur `avg`.
- [ ] Le code de sortie est **non nul** quand un seuil est dépassé (testez en abaissant un seuil).
- [ ] `preAllocatedVUs` est justifié : sous-dimensionné, l'outil devient le goulot d'étranglement.
- [ ] Aucune option obsolète pour la version de k6 visée.

**⚠️ Piège connu** — Le modèle génère par défaut du `constant-vus`, parce que c'est ce que
contiennent la plupart des tutoriels indexés. Et il génère des scripts pour des versions
anciennes de k6 : ⚠️ **la documentation a migré et l'outil est passé en v2.x** — vérifiez les
options.

**Module associé** — M9, exercices M9-1 et M9-3.

---

# 10. Revue de sécurité

## 🧪 P-24 · `security-review-owasp-2025` · **v1.0**

**Quand l'utiliser** — Revue ciblée d'un périmètre de code, rattachée à un référentiel daté.

```text
<role>
Tu es auditeur en sécurité applicative. Tu rattaches chaque constat
à une catégorie OWASP Top 10 AVEC SON MILLÉSIME et à une exigence ASVS avec son identifiant.
Un constat sans référentiel n'est pas un constat.
</role>

<documents>
  <document index="1">
    <source>Code du périmètre — {{CHEMIN_PERIMETRE}}</source>
    <document_content>{{CODE}}</document_content>
  </document>
  <document index="2">
    <source>Contrat d'API et modèle de données</source>
    <document_content>{{OPENAPI_ET_SCHEMA}}</document_content>
  </document>
  <document index="3">
    <source>Règles métier de confidentialité</source>
    <document_content>{{REGLES_METIER}}</document_content>
  </document>
</documents>

<constraints>
- Chaque catégorie citée porte son millésime : « A05:2025 – Injection », jamais « A03 ».
  ⚠️ La numérotation a changé entre 2021 et 2025.
- Chaque constat porte un identifiant d'exigence ASVS de la forme v5.0.0-x.y.z.
- Pour chaque constat : fichier:ligne, mécanisme d'exploitation, impact métier,
  et le TEST à écrire pour le verrouiller (pas seulement la correction).
- Traite explicitement les FUITES DE DONNÉES par règle métier :
  un champ correctement typé et correctement autorisé peut néanmoins
  exposer une donnée d'un autre utilisateur. Aucun scanner ne le voit.
- Classe la confiance de chaque constat : CERTAIN | PROBABLE | À_VÉRIFIER.
- Interdiction d'affirmer l'absence de vulnérabilité : tu dis ce que tu n'as pas pu examiner.
</constraints>

<output_format>
| # | Constat | Fichier:ligne | OWASP (avec millésime) | ASVS | Impact | Confiance | Test à écrire |
Puis ## Périmètre non examiné.
</output_format>

<task>
Audite le périmètre du document 1 au regard des documents 2 et 3.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] **Chaque** catégorie OWASP porte son millésime.
- [ ] Chaque constat propose un **test**, pas seulement une correction — sinon la régression
      reviendra.
- [ ] La section « périmètre non examiné » n'est pas vide.
- [ ] Les constats `CERTAIN` sont rejouables : demandez la requête ou le scénario.

**⚠️ Piège connu** — Le modèle est bon sur les vulnérabilités **de forme** (injection,
désérialisation, secrets en dur) et mauvais sur les fuites **par règle métier**. Aucun scanner
ni aucun LLM ne sait qu'un champ donné ne doit contenir que l'identifiant du titulaire : cet
oracle est réglementaire ou contractuel, il faut le lui fournir (document 3).

**Module associé** — M9, exemple B et exercice M9-4.

---

## 🧪 P-25 · `triage-dast-findings` · **v1.0**

**Quand l'utiliser** — Après un scan DAST, pour trier vrais positifs et faux positifs sans
supprimer les alertes gênantes.

```text
<role>
Tu es analyste sécurité. Tu tries, tu justifies, et tu n'ignores jamais une alerte
sans écrire pourquoi.
</role>

<documents>
  <document index="1">
    <source>Rapport de scan — {{CHEMIN_RAPPORT}}</source>
    <document_content>{{ALERTES}}</document_content>
  </document>
  <document index="2">
    <source>Contexte applicatif (authentification, en-têtes, reverse proxy)</source>
    <document_content>{{CONTEXTE_APP}}</document_content>
  </document>
</documents>

<constraints>
- Verdict par alerte : VP (vrai positif) | FP (faux positif) | À_VÉRIFIER.
- Un FP exige une justification TECHNIQUE vérifiable (en-tête posé par le proxy,
  endpoint hors périmètre, protection en amont) — jamais « peu probable » ou « acceptable ».
- Chaque catégorie citée porte son millésime OWASP.
- Pour chaque FP retenu, produis la ligne de fichier d'exclusion au format
  <id> IGNORE (<motif>) et le motif en clair.
- Explique le CODE DE SORTIE obtenu par l'outil et pourquoi un `set -e` naïf casse le job.
- Interdiction d'ignorer une alerte de sévérité haute sans un VP/FP argumenté.
</constraints>

<output_format>
| ID | Alerte | VP/FP/À_VÉRIFIER | Justification | Catégorie OWASP (millésimée) | Ligne d'exclusion |
Puis ## Interprétation du code de sortie.
Puis ## Alertes conservées et pourquoi.
</output_format>

<task>
Trie les alertes du document 1 dans le contexte du document 2.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Chaque `FP` a une justification **technique et vérifiable**, pas une appréciation.
- [ ] Le fichier d'exclusion produit est au bon format et chaque ligne est commentée.
- [ ] Le code de sortie de l'outil est expliqué — il n'est pas binaire.
- [ ] Aucune alerte de sévérité haute n'a été silencieusement écartée.

**⚠️ Piège connu** — Le modèle qualifie volontiers de FP tout ce qui est difficile à corriger.
Et il cite des catégories OWASP **sans millésime**, ce qui rend le rapport inexploitable en
audit : Injection est passée de A03:2021 à A05:2025 et le SSRF a disparu comme catégorie.

**Module associé** — M9, exercice M9-2.

---

# 11. Audit d'accessibilité

## 🧪 P-26 · `a11y-audit-and-blindspots` · **v1.0**

**Quand l'utiliser** — Pour produire un test d'accessibilité **et** la liste de ce que
l'automatisation ne voit pas. La seconde partie est la plus importante.

```text
<role>
Tu es auditeur en accessibilité numérique. Tu produis des tests automatisés
ET la liste explicite de ce qu'ils ne détecteront pas.
L'automatisation couvre une part minoritaire des critères.
</role>

<documents>
  <document index="1">
    <source>Composant / page — {{CHEMIN_COMPOSANT}}</source>
    <document_content>{{CODE_COMPOSANT}}</document_content>
  </document>
  <document index="2">
    <source>Parcours utilisateur attendu</source>
    <document_content>{{PARCOURS}}</document_content>
  </document>
</documents>

<constraints>
- Produis DEUX tests distincts :
  1. un test @axe-core/playwright sur le périmètre ;
  2. un test de parcours AU CLAVIER SEUL (Tab, Shift+Tab, Entrée, Échap),
     SANS aucun page.click().
- Chaque assertion cite son critère : WCAG (numéro) et RGAA (numéro de critère).
- Section obligatoire « Ce que ces tests ne détectent pas », listant au minimum :
  pertinence des alternatives textuelles, ordre de lecture, cohérence des intitulés,
  compréhensibilité des messages d'erreur, contenus non textuels.
- Interdiction d'écrire « conforme » : le vocabulaire autorisé est
  « aucune violation détectée par <outil> sur <périmètre> ».
- Indique la version de l'outil utilisée : le catalogue de règles évolue.
</constraints>

<output_format>
Deux fichiers : {{CHEMIN_TEST_AXE}} et {{CHEMIN_TEST_CLAVIER}}.
Puis | Critère | Outil | Détectable automatiquement ? | Test associé |
Puis ## Ce que ces tests ne détectent pas.
</output_format>

<task>
Produis l'audit d'accessibilité de {{NOM_COMPOSANT}}.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Le test clavier ne contient **aucun** `page.click()` (vérifiable par `grep`).
- [ ] Chaque assertion cite un critère WCAG **et** RGAA.
- [ ] La section « ce que ces tests ne détectent pas » comporte au moins cinq entrées.
- [ ] Le mot « conforme » n'apparaît nulle part.

**⚠️ Piège connu** — « axe vert » ou « Lighthouse 100 » sont pris pour une conformité. Ils ne le
sont pas : l'automatisation détecte une part minoritaire des problèmes, le catalogue de règles
ne couvre presque pas WCAG 2.2, et le score Lighthouse **exclut les audits manuels de son
calcul**. Un composant peut passer tous les tests automatiques et rester inutilisable au clavier.

**Module associé** — M9, exemple C et exercice M9-4.

---

# 12. Synthèse de campagne

## 🧪 P-27 · `campaign-summary` · **v1.0**

**Quand l'utiliser** — Produire une synthèse d'exécution lisible par un chef de projet, à partir
de sorties **structurées** — jamais à partir d'une impression.

```text
<role>
Tu es rédacteur de rapports de test. Tu synthétises des SORTIES STRUCTURÉES.
Tout chiffre que tu écris provient d'un des documents fournis, et tu cites lequel.
</role>

<documents>
  <document index="1">
    <source>Résultats d'exécution — {{CHEMIN_JUNIT}}</source>
    <document_content>{{JUNIT_XML}}</document_content>
  </document>
  <document index="2">
    <source>Couverture — {{CHEMIN_COUVERTURE}}</source>
    <document_content>{{COBERTURA}}</document_content>
  </document>
  <document index="3">
    <source>Score de mutation — {{CHEMIN_MUTATION}}</source>
    <document_content>{{RAPPORT_STRYKER}}</document_content>
  </document>
</documents>

<constraints>
- Chaque chiffre est suivi de sa source entre parenthèses : (doc 1), (doc 2), (doc 3).
- Interdiction d'écrire un chiffre absent des documents, y compris une moyenne
  que tu aurais calculée sans que les données le permettent.
- Tu signales explicitement ce qui MANQUE : tests non exécutés, tests ignorés,
  périmètre non couvert par la mesure.
- Structure imposée : 1. Verdict en une phrase · 2. Chiffres clés · 3. Ce qui a échoué
  et pourquoi · 4. Ce qui n'a pas été mesuré · 5. Décision proposée.
- La section 4 ne peut jamais être vide.
- Langage accessible à un lecteur non technique, sans perdre la précision des chiffres.
</constraints>

<output_format>
Fichier Markdown, chemin {{CHEMIN_SYNTHESE}}, maximum {{MAX_MOTS}} mots.
</output_format>

<task>
Rédige la synthèse de la campagne {{NOM_CAMPAGNE}}.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] **Chaque** chiffre porte sa source ; vérifiez-en trois au hasard dans les fichiers bruts.
- [ ] La section 4 (« ce qui n'a pas été mesuré ») mentionne au minimum les tests ignorés.
- [ ] Le verdict tient en une phrase.
- [ ] La couverture et le score de mutation sont présentés **côte à côte**, pas séparément.

**⚠️ Piège connu** — La synthèse est l'endroit où les hallucinations passent le plus facilement :
sur des résumés de rapports de défauts générés par LLM, on mesure des **omissions dans près de
la moitié des cas** et une part non négligeable de contenu **fabriqué**. La règle « chaque
chiffre cite sa source » est la seule contre-mesure efficace, et elle se vérifie.

**Module associé** — M3, exercice M3-4.

---

# 13. Priorisation par les risques

## 🧪 P-28 · `risk-prioritization` · **v1.0**

**Quand l'utiliser** — Construire la matrice de risques du dossier de recette. ⚠️ L'impact
métier **ne se délègue pas** à un modèle : ce prompt le prend en entrée.

```text
<role>
Tu es responsable de test. Tu calcules la PROBABILITÉ à partir de signaux mesurables,
et tu prends l'IMPACT en entrée : l'impact métier est coté et signé par le métier,
jamais estimé par toi.
</role>

<documents>
  <document index="1">
    <source>Signaux techniques par composant — {{CHEMIN_SIGNAUX}}</source>
    <document_content>{{CHURN_COMPLEXITE_AUTEURS_ECHECS}}</document_content>
  </document>
  <document index="2">
    <source>Cotation d'impact métier, signée — {{CHEMIN_IMPACT}}</source>
    <document_content>{{IMPACT_SIGNE}}</document_content>
  </document>
  <document index="3">
    <source>Défauts connus et leur localisation</source>
    <document_content>{{DEFAUTS}}</document_content>
  </document>
</documents>

<constraints>
- Interdiction absolue d'inventer ou de modifier une cote d'impact :
  elle vient du document 2, avec son auteur et sa date.
- La probabilité se calcule à partir des signaux du document 1 :
  churn relatif, complexité, nombre d'auteurs, historique d'échecs DÉ-FLAKÉ.
  Tu explicites la formule.
- ⚠️ Un historique d'échecs non nettoyé des flaky rend le calcul invalide :
  si le document 1 ne précise pas que l'historique est dé-flaké, tu le signales
  et tu marques le résultat comme non fiable.
- Vérifie la DISPERSION : si tous les scores sont proches, la priorisation est
  sans objet et tu dois le dire.
- Chaque défaut du document 3 est positionné dans la matrice, ou son absence est justifiée.
- Quadrants I à IV, avec la couverture de test associée à chaque risque.
</constraints>

<output_format>
| ID | Risque | Composant | Défaut | P | I | Score | Quadrant | Couverture associée | Statut |
Puis ## Formule de probabilité utilisée
Puis ## Vérification de dispersion (min, max, écart-type)
Puis ## Ce que cette matrice ne dit pas.
</output_format>

<task>
Construis la matrice de risques du périmètre {{NOM_PERIMETRE}}.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Aucune cote d'impact n'a été modifiée ni inventée (comparez au fichier signé).
- [ ] La formule de probabilité est explicite et recalculable à la main sur une ligne.
- [ ] La dispersion est vérifiée : des scores tous équivalents signifient que la priorisation
      ne sert à rien.
- [ ] Chaque défaut connu est positionné, ou son absence justifiée.

**⚠️ Piège connu** — Deux pièges cumulés. D'abord, le modèle **cote l'impact tout seul** si on
ne le lui interdit pas : l'impact métier n'est pas une donnée technique, il engage une
responsabilité. Ensuite, la priorisation apprise sur un historique **non dé-flaké** apprend le
bruit — dans un grand dépôt, une large majorité des transitions vert→rouge impliquent un test
flaky.

**Module associé** — M12, exercices M12-1 et M12-2.

---

# 14. Dossier de recette

## 🧪 P-29 · `acceptance-dossier` · **v1.0**

**Quand l'utiliser** — Rédiger le `DOSSIER-DE-RECETTE.md` à partir des preuves collectées.
C'est un prompt de **mise en forme**, pas de production de contenu.

```text
<role>
Tu es responsable de recette. Tu rédiges un dossier destiné à un comité de décision.
Tu ne produis AUCUN chiffre : tu mets en forme ceux qui te sont fournis.
</role>

<documents>
  <document index="1">
    <source>Preuves collectées (couverture, mutation, p95, sécurité, a11y, evals)</source>
    <document_content>{{PREUVES}}</document_content>
  </document>
  <document index="2">
    <source>Matrice de risques</source>
    <document_content>{{MATRICE}}</document_content>
  </document>
  <document index="3">
    <source>Traçabilité IA / humain</source>
    <document_content>{{TRACABILITE}}</document_content>
  </document>
  <document index="4">
    <source>Conformité (données, base légale, rétention, AI Act)</source>
    <document_content>{{CONFORMITE}}</document_content>
  </document>
</documents>

<constraints>
- Sept sections, dans cet ordre imposé — c'est l'ordre de lecture du comité :
  1. Recommandation (Go | Go conditionnel | No-Go) en UNE phrase, en tête de document
  2. Cartographie des risques
  3. Preuves, chacune avec SA COMMANDE DE VÉRIFICATION
  4. Ce que l'IA a fait, ce que l'humain a validé
  5. Conformité
  6. Coût et ROI, coûts cachés inclus
  7. Dettes ouvertes — ce qui n'a pas été testé, ET POURQUOI
- Un « Go conditionnel » exige TROIS conditions nommées, vérifiables, avec responsable et échéance.
- La section 7 ne peut jamais être vide. Écrire « on a tout testé » est interdit.
- Chaque preuve de la section 3 porte la commande qui permet de la rejouer.
- Interdiction d'écrire un chiffre absent du document 1.
- Termine par : « Ce qui nous ferait changer d'avis : … »
</constraints>

<output_format>
Fichier Markdown, chemin {{CHEMIN_DOSSIER}}, {{NB_PAGES}} pages maximum.
</output_format>

<task>
Rédige le dossier de recette de {{NOM_RELEASE}}.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] La recommandation est en **tête** de document et tient en une phrase.
- [ ] Chaque preuve porte une commande rejouable — testez-en deux en direct.
- [ ] La section 7 liste des dettes réelles, avec un responsable et une échéance.
- [ ] La phrase « ce qui nous ferait changer d'avis » est présente et concrète.
- [ ] Aucun chiffre inventé : comparez au document de preuves.

**⚠️ Piège connu** — Le modèle **embellit** : il transforme « 41 % de score de mutation » en
« couverture de test solide ». La contrainte « aucun chiffre absent du document 1 » ne suffit
pas toujours ; relisez les adjectifs. Un dossier qui ne contient aucune mauvaise nouvelle est
un dossier qui ne sera pas cru.

**Module associé** — M12, Boss final.

---

## 🧪 P-30 · `ai-human-traceability` · **v1.0**

**Quand l'utiliser** — Produire le tableau que le comité demandera systématiquement : qu'a
produit l'IA, qu'a validé l'humain, et qu'a-t-on rejeté.

```text
<role>
Tu es responsable de la traçabilité d'une chaîne de test augmentée.
Tu distingues PRODUIT, RETENU et REJETÉ, avec des volumes.
</role>

<documents>
  <document index="1">
    <source>Journal des générations (dates, prompts, volumes)</source>
    <document_content>{{JOURNAL_GENERATIONS}}</document_content>
  </document>
  <document index="2">
    <source>Historique des revues et des pull requests</source>
    <document_content>{{HISTORIQUE_REVUES}}</document_content>
  </document>
</documents>

<constraints>
- Une ligne par type d'artefact, avec : produit par (agent | humain | mixte),
  volume brut, volume retenu, volume rejeté, validé par (personne nommée),
  motif principal de rejet.
- Les décisions NON DÉLÉGABLES apparaissent explicitement avec la mention
  « Humain uniquement » : cotation d'impact métier, décision Go/No-Go,
  modification du code de production.
- Les volumes sont LUS dans les documents, jamais estimés.
  Si un volume manque, tu écris « non tracé » — c'est une information en soi.
- Chaque motif de rejet est une catégorie, pas une phrase :
  TAUTOLOGIE | SELECTEUR_NON_VERIFIE | REDONDANCE | HORS_PERIMETRE |
  MODELE_DE_CHARGE_INVALIDE | AUTRE (précisé).
- Termine par le taux de rejet global et son interprétation en une phrase.
</constraints>

<output_format>
| Artefact | Produit par | Brut | Retenu | Rejeté | Validé par | Motif principal |
Puis ## Taux de rejet global : x %
Puis ## Décisions non délégables
Puis ## Ce qui n'est pas tracé.
</output_format>

<task>
Produis le tableau de traçabilité de la campagne {{NOM_CAMPAGNE}}.
</task>
```

**✅ Ce qu'il faut vérifier dans la sortie**

- [ ] Chaque ligne nomme une **personne**, pas une équipe.
- [ ] Les décisions non délégables sont présentes et marquées « Humain uniquement ».
- [ ] Les volumes sont lus, pas estimés — « non tracé » est une réponse acceptable et honnête.
- [ ] Le taux de rejet est calculé. Un taux de 0 % signifie que la revue n'a pas eu lieu.

**⚠️ Piège connu** — Un tableau de traçabilité **flatteur** (100 % retenu, 0 % rejeté) est le
signal le plus fiable qu'aucune revue n'a été faite. En comité, c'est exactement ce qui sera
relevé. Un taux de rejet élevé n'est pas un aveu de faiblesse : c'est la preuve que le
relecteur a fait son travail.

**Module associé** — M12, Boss final, critère 3 du barème.

---

# Annexe de l'annexe — check-list d'adoption

Avant de considérer un prompt comme adopté dans votre dépôt :

| # | Vérification | Pourquoi |
|---|---|---|
| 1 | Le prompt est dans `prompts/`, versionné, et la v1.0 naïve est conservée | Sans ligne de base, aucune comparaison n'est possible |
| 2 | Au moins **3 cas d'évals** existent, dont **un cas de contrôle négatif** | Un eval qui ne peut pas échouer ne vaut rien — c'est la tautologie appliquée aux prompts |
| 3 | Le jeu d'évals est rejoué **à chaque changement de version** de prompt ou de modèle | C'est le mécanisme de non-régression (M10) |
| 4 | Le prompt contient au moins **une interdiction vérifiable** | « Essaie de… » n'est pas une contrainte |
| 5 | Le format de sortie précise un **chemin de fichier exact** | Une sortie non localisée n'est pas évaluable en CI |
| 6 | Un **propriétaire** est nommé pour le prompt | Un artefact sans propriétaire n'est pas maintenu |

---

*Les sources qui fondent les conventions de cette bibliothèque (structure de prompt, position
des documents longs, nombre d'exemples, variabilisation, évaluation) sont référencées dans
`annexes/annexe-D-bibliographie-complete.md`, sections « Documentation officielle des outils »
et « Recherche académique ».*
