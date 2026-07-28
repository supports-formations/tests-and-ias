# Module M03 — Données de test et documentation générées

> **Jour 1** · **Durée : 1 h 30** (dont 30 min de Boss J1) · **QA Credits en jeu : 300**
> *Fil rouge : les scénarios existent, les exigences sont tracées. Il manque de quoi les exécuter — et de quoi prouver, à 17 h, que la Task Force n'a pas seulement produit du volume.*

---

## 0. Carte du module

### 0.1 Objectifs pédagogiques

À l'issue de ce module, le·a participant·e sera capable de :

- **Produire** un jeu de données de test **reproductible** avec Bogus/Faker, en maîtrisant la graine, et **justifier** l'interdiction des données de production au regard de la recommandation CNIL ;
- **Écrire** une propriété au sens du property-based testing (FsCheck en .NET, fast-check en TypeScript) et **exploiter** le contre-exemple minimal produit par le *shrinking* ;
- **Exécuter** une campagne de mutation testing avec Stryker.NET, **interpréter** l'écart entre couverture et score de mutation, et **écrire** les tests qui tuent les mutants survivants ;
- **Distinguer** ce qu'un agent de synthèse peut légitimement produire à partir de sorties structurées (JUnit XML, Cobertura, Allure) de ce qu'il fabrique ;
- **Auditer** un rapport d'anomalie généré par IA et y **identifier** les informations manquantes et le contenu inventé.

### 0.2 Prérequis du module

- M2 terminé : exigences extraites, scénarios Gherkin revus.
- Docker démarré (Testcontainers PostgreSQL).
- Paquets installés : `Bogus`, `FsCheck.Xunit`, `dotnet-stryker`, `dotnet-coverage`, `fast-check`.

### 0.3 Position dans le fil rouge

| Avant ce module | Après ce module |
|---|---|
| Les tests s'exécutent sur des données codées en dur, différentes chez chaque participant | Un jeu de données déterministe, versionné, sans donnée personnelle |
| Personne ne sait si les tests écrits vérifient quelque chose | Le score de mutation le dit, chiffre en main |
| BUG-102 n'a été trouvé qu'à la main, par un squad | Une propriété le trouve seule, en quelques secondes |
| Le livrable est un tas de fichiers | Un dossier de plan de test défendable devant un comité d'architecture |

### 0.4 Découpage horaire

| Séquence | Contenu | Durée |
|---|---|---|
| S0 | La Carte | 2 min |
| S1 | **N1** — Jeux de données de test | 6 min |
| S2 | **N2** — Property-based testing, fuzzing assisté, mutation testing | 8 min |
| S3 | **N3** — Documentation et reporting de test assistés | 5 min |
| S4 | 🔍 Exemple A — Bogus, graine et la donnée qui n'aurait pas dû exister | 5 min |
| S5 | 🔍 Exemple B — une propriété FsCheck trouve BUG-102 en 4 secondes | 5 min |
| S6 | 🔍 Exemple C — 78 % de couverture, 41 % de score de mutation | 5 min |
| S7 | 🧪 Exercices M3-1 à M3-4 | 18 min |
| S8 | 👑 **Boss J1 — « Le Cahier des Charges Fantôme »** | 30 min |
| S9 | Débriefing de journée + scoreboard | 6 min |
| **Total** | **Somme des séquences S0 → S9** | **90 min = 1 h 30** ✅ *conforme à la durée annoncée en en-tête (dont 30 min de Boss J1)* |

> ⏱️ **Régulation du temps.** Les exercices ⭐ et ⭐⭐ sont menés **en parallèle par les squads** (chaque squad n'en traite qu'un des deux, puis restitue en 2 min à l'autre). Les durées cibles indiquées par exercice supposent ce fonctionnement. L'exercice bonus ⭐⭐⭐⭐⭐ est **hors séance**.

### 0.5 Notions couvertes

| # | Notion |
|---|---|
| **N1** | Jeux de données de test — Bogus/Faker, graine et reproductibilité, SDV, interdiction des données de production, recommandation CNIL |
| **N2** | Property-based testing, fuzzing assisté et mutation testing — FsCheck/fast-check, Stryker.NET, OSS-Fuzz-Gen, Fuzz4All |
| **N3** | Documentation et reporting de test assistés — rapports d'anomalie, LIBRO, hallucinations de synthèse, JUnit XML/Allure/Coverlet, ISO/IEC/IEEE 29119-3 |

---

## 1. Partie théorique

### 1.1 Notion N1 — Jeux de données de test

#### 1.1.1 De quoi parle-t-on

Un **jeu de données de test** est l'ensemble des données consommées et produites par l'exécution d'un test. **ISO/IEC/IEEE 29119-3** [S-06] le traite comme un artefact documentaire à part entière : il doit être identifié, versionné et rattaché aux cas de test qu'il sert.

Trois exigences non négociables le caractérisent :

| Exigence | Signification | Conséquence pratique |
|---|---|---|
| **Reproductibilité** | Deux exécutions produisent le même jeu | Une graine (*seed*) fixée et versionnée |
| **Représentativité** | Le jeu couvre les partitions et les bornes du domaine | Généré depuis les classes d'équivalence de M2, pas au hasard |
| **Licéité** | Aucune donnée personnelle réelle | Données fictives ou anonymisées |

La troisième n'est pas une préférence d'ingénierie. La CNIL recommande explicitement d'effectuer les tests *« dans un environnement distinct de la production […] et sur des données fictives ou anonymisées »* [S-03]. Sur une plateforme comme SkyRetail — 340 000 clients actifs — copier la base de production dans un environnement de recette est un traitement de données personnelles sans base légale adaptée, et une exposition inutile.

Deux familles d'outillage répondent au besoin :

| Famille | Outil | Principe | Quand l'utiliser |
|---|---|---|---|
| **Génération par règles** | Bogus (.NET), Faker (JS/Python) [S-01] | Des *fakers* typés produisent des valeurs réalistes selon une locale ; `seed()` garantit la reproductibilité | Cas nominal : 95 % des besoins de test |
| **Génération statistique** | SDV — Synthetic Data Vault [S-02] | GaussianCopula, CTGAN : apprend la distribution d'un jeu réel et en synthétise un équivalent, **avec évaluation de fidélité** | Quand la **distribution** compte : tests de charge, de recherche, de recommandation |

#### 1.1.2 Ce que dit l'état de l'art

**La graine est le cœur du sujet.** Faker et Bogus exposent `seed()` qui garantit la reproductibilité du jeu de test [S-01]. Un test qui échoue sur un jeu non graine est un test qu'on ne peut pas rejouer, donc pas diagnostiquer — c'est un flaky de plus. La même exigence structure le property-based testing : Hypothesis affiche systématiquement la graine du contre-exemple pour permettre le rejeu [S-04], et fast-check en fait autant côté TypeScript [S-05].

**L'IA générative apporte peu sur ce terrain, et un risque net.** Demander à un LLM « génère-moi 200 clients de test » produit trois problèmes :

1. **Non-reproductibilité.** Deux appels donnent deux jeux différents ; il n'y a pas de graine. Le jeu doit alors être figé dans un fichier — ce qui n'est plus de la génération mais du copier-coller versionné.
2. **Réalisme excessif.** Les modèles produisent des données *plausibles* : adresses e-mail sur des domaines réels, numéros de téléphone au format national valide, parfois des IBAN à clé de contrôle correcte. Ces valeurs peuvent correspondre à des personnes réelles. Anthropic documente que les techniques de réduction d'hallucination *« réduisent significativement les hallucinations mais ne les éliminent pas entièrement »* [S-09] : ce qui vaut pour les faits vaut pour les identités.
3. **Volume vs distribution.** Un LLM produit 200 lignes qui se ressemblent. Les bornes, les valeurs nulles, les chaînes vides, les caractères non latins — c'est-à-dire précisément ce qui casse — sont sous-représentés.

**Où l'IA est réellement utile.** Non pas à produire les données, mais à produire **le générateur** : le `Faker<T>` typé, les règles, la couverture des partitions identifiées en M2. Le générateur, lui, est déterministe, relisible, versionné et testable.

**Le piège des données magiques.** Les tests générés par LLM présentent massivement le smell **Magic Number Test** — des valeurs numériques non expliquées [S-12]. Une donnée de test sans justification est une dette : personne n'osera la changer, parce que personne ne saura pourquoi elle vaut `4242`.

**La frontière avec les test doubles.** Une donnée de test n'est pas un mock. Fowler distingue les **5 types de test doubles** (Dummy, Fake, Stub, Spy, Mock) et alerte sur le couplage excessif à l'implémentation [S-11] ; Google documente que l'abus du mocking a *« pollué »* sa base de tests, au point que certains ingénieurs ont déclaré **« no more mocks! »** [S-10]. La bonne stratégie sur SkyRetail est un **fake** de base de données réel — PostgreSQL éphémère via Testcontainers — alimenté par un jeu Bogus graine, plutôt qu'une pile de mocks.

**Le risque de chaîne d'approvisionnement.** Ajouter un paquet suggéré par un modèle sans vérification est une pratique mesurée comme dangereuse : sur **576 000 échantillons** générés par 16 LLM, **5,2 %** des paquets recommandés par les modèles commerciaux et **21,7 %** pour les open source sont **inexistants**, pour **205 474 noms hallucinés uniques** [S-07]. Le cadre de rattachement est OWASP Top 10 for LLM Applications 2025 [S-08], qui traite également la divulgation d'informations sensibles — pertinent dès qu'on colle un extrait de base dans un prompt.

#### 1.1.3 Application au contexte SkyRetail

La base de production contient 340 000 clients. Elle est **hors de portée** de la formation, et c'est une règle du jeu assortie d'un malus de **−50 QAC**.

Le jeu de référence attendu, `backend/SkyRetail.Tests/Data/CustomerFaker.cs` :

```csharp
using Bogus;

public static class SkyRetailFakers
{
    // La graine est une constante versionnée : tout le monde obtient le même jeu.
    public const int Seed = 20260728;

    public static Faker<Customer> Customer() => new Faker<Customer>("fr")
        .UseSeed(Seed)
        .RuleFor(c => c.Id,        f => f.IndexGlobal)
        // Domaine réservé RFC 2606 : aucun e-mail ne peut appartenir à une personne réelle.
        .RuleFor(c => c.Email,     f => $"{f.Internet.UserName()}@example.test")
        .RuleFor(c => c.FirstName, f => f.Name.FirstName())
        .RuleFor(c => c.LastName,  f => f.Name.LastName())
        .RuleFor(c => c.CreatedAt, f => f.Date.PastOffset(3))
        .RuleFor(c => c.OrderCount, f => f.Random.Int(0, 40));

    // Couverture explicite des partitions identifiées en M2 (§1.3.3) :
    // [0;50[ · [50;200[ · [200;+∞[ · bornes 49,99 / 50,00 / 50,01 / 199,99 / 200,00 / 200,01
    public static Faker<Cart> CartInTier(decimal min, decimal max) => new Faker<Cart>()
        .UseSeed(Seed)
        .CustomInstantiator(f => CartBuilder.New()
            .WithLine("SKU-" + f.Random.Int(1, 999), f.Random.Decimal(min, max))
            .Build());
}
```

Trois points à faire remarquer en séance : (1) la graine est **une constante du dépôt**, pas un paramètre d'exécution ; (2) le domaine `example.test` est réservé par la RFC 2606, donc structurellement non attribuable ; (3) les générateurs sont **alignés sur les partitions de M2** — c'est la continuité entre conception et données.

#### 1.1.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Le jeu non graine** | Le test passe 9 fois sur 10 ; le rapport d'échec n'est pas rejouable | `new Faker<T>()` sans `UseSeed` | Graine constante versionnée ; en PBT, journaliser la graine du contre-exemple [S-04][S-05] |
| **La donnée trop réaliste** | Un e-mail de test rebondit vers une vraie boîte | Le modèle produit du plausible, et le plausible existe parfois | Domaines réservés (`example.test`, `example.com`), préfixe explicite, revue du Copilote ; recommandation CNIL [S-03] |
| **L'extrait de production dans le prompt** | « Je colle 20 lignes de la base pour qu'il comprenne le format » | Confort ; méconnaissance du risque de divulgation [S-08] | Interdit. Fournir le **schéma**, jamais les lignes. **−50 QAC** |
| **La donnée magique** | `Assert(total == 4242)` sans explication | Magic Number Test [S-12] | Toute constante de test porte un nom et une justification : `const decimal TierTwoLowerBound = 50.00m;` |

#### 1.1.5 📊 Chiffres à retenir

- **340 000 clients** en production chez SkyRetail — et **0** autorisé dans un environnement de test : recommandation CNIL de tester sur des données **fictives ou anonymisées** [S-03].
- **5,2 % / 21,7 %** de paquets hallucinés (commerciaux / open source) sur 576 000 échantillons ; **205 474 noms uniques** [S-07].
- **1 graine** suffit à rendre un jeu de 200 000 lignes rejouable à l'identique [S-01].
- SDV évalue la **fidélité statistique** du jeu synthétisé — c'est ce qui le distingue d'un générateur par règles [S-02].
- **5 types de test doubles** distingués par Fowler [S-11] ; Google documente le coût de leur abus [S-10].

---

### 1.2 Notion N2 — Property-based testing, fuzzing assisté et mutation testing

#### 1.2.1 De quoi parle-t-on

Trois techniques, un objectif commun : **cesser de choisir les cas de test à la main**.

| Technique | Question posée | Ce qu'elle produit |
|---|---|---|
| **Property-based testing (PBT)** | « Quelle propriété doit rester vraie pour **toute** entrée valide ? » | Des centaines de cas générés, et un **contre-exemple minimal** en cas d'échec |
| **Fuzzing** | « Que se passe-t-il sur des entrées **invalides, aléatoires ou hostiles** ? » | Des plantages, fuites mémoire, codes de statut inattendus |
| **Mutation testing** | « Si j'introduis un défaut, mes tests le voient-ils ? » | Un **score de mutation** : le pourcentage de défauts détectés |

Le PBT inverse la charge : au lieu d'écrire `Assert(f(2) == 4)`, on écrit *« pour tout x, f(x) est pair »* et le moteur cherche un contre-exemple. Son mécanisme décisif est le **shrinking** : à la découverte d'un échec, le moteur réduit automatiquement l'entrée jusqu'au contre-exemple minimal [S-04]. Un panier de 47 lignes qui échoue devient « 7 lignes à 0,625 € » — un cas lisible et débuggable.

Le mutation testing répond à la question que la couverture ne pose pas. La couverture mesure **l'exécution** ; le score de mutation mesure **la vérification**. PIT le formule directement : le **pourcentage de mutants tués** mesure la qualité réelle des assertions [S-14]. C'est la métrique qui ferme l'*oracle gap* [S-22] identifié en M1.

#### 1.2.2 Ce que dit l'état de l'art

**Le fuzzing assisté par LLM est la réussite industrielle la moins contestable du domaine.** Google a mesuré, sur son programme OSS-Fuzz : **26 nouvelles vulnérabilités**, dont **CVE-2024-9143 dans OpenSSL, non détectée depuis environ vingt ans** ; couverture étendue à **272 projets C/C++** pour **+370 000 lignes** [S-16]. Le mécanisme est précis : le LLM n'est pas le fuzzer, il **écrit le harnais** — la fonction d'entrée qui expose le code au fuzzer. C'est un travail fastidieux, répétitif, à fort besoin de contexte : le profil exact d'une tâche où un LLM excelle. Le dépôt officiel mesure **30 bugs/vulnérabilités découverts** et un gain de couverture jusqu'à **+29 %** face aux harnais écrits par des humains [S-15].

Les résultats académiques convergent : **Fuzz4All** identifie **98 bugs** dans GCC, Clang, Z3, CVC5, OpenJDK et Qiskit, dont **64 confirmés inconnus** [S-17] ; **TitanFuzz** gagne **+30,38 %** et **+50,84 %** de couverture sur TensorFlow et PyTorch pour **65 bugs** détectés (41 inconnus) [S-18] ; **ChatAFL** obtient **+5,8 %** de couverture de branches contre AFLNet et **+6,7 %** contre NSFuzz sur du fuzzing de protocole [S-19]. Google prolonge avec l'agent **Big Sleep**, qui découvre **CVE-2025-6965 (SQLite)** avant exploitation et signale **20 vulnérabilités** dans FFmpeg, ImageMagick et d'autres [S-21].

**Le mutation testing, lui, est mûr et outillé.** Stryker couvre JS/TS **et .NET (Stryker.NET)**, avec plus de **30 opérateurs de mutation** et une exécution parallélisée [S-13]. Les opérateurs pertinents pour SkyRetail sont immédiats à comprendre :

| Opérateur | Mutation | Ce qu'il révèle sur F1 |
|---|---|---|
| Relationnel | `<` → `<=` | Les paliers de remise sont-ils testés **aux bornes** ? |
| Arithmétique | `+` → `-` | Le cumul est-il vérifié, ou seulement exécuté ? |
| Littéral | `0.30m` → `0.31m` | Le plafond est-il assorti d'une assertion ? |
| Conditionnel | `if (cond)` → `if (true)` | La branche « précommande » (BUG-103) est-elle vérifiée ? |

L'IA générative entre par une porte nouvelle : **LLMorpheus** produit des mutants *ressemblant à de vrais bugs historiques*, évalué sur **13 packages** JavaScript, et génère des mutations **impossibles à produire avec StrykerJS** [S-20]. C'est la même intuition que Meta ACH vue en M1 : le mutant réaliste est un meilleur test du test que le mutant syntaxique.

**Où le LLM aide vraiment en PBT.** Écrire une propriété est difficile ; c'est un exercice d'abstraction. Un LLM est bon pour **proposer des candidats de propriétés** à partir d'une spécification, et l'humain choisit. Les familles classiques, à faire mémoriser :

| Famille de propriété | Formulation | Application SkyRetail |
|---|---|---|
| **Invariant** | `P(f(x))` est toujours vrai | Le taux de remise est toujours dans `[0 ; 0,30]` |
| **Aller-retour** | `decode(encode(x)) == x` | Sérialisation JSON d'une commande |
| **Idempotence** | `f(f(x)) == f(x)` | Appliquer deux fois le moteur de remises |
| **Commutativité** | `f(a,b) == f(b,a)` | **L'ordre d'application des règles ne doit rien changer → BUG-101** |
| **Cohérence d'agrégat** | `sum(f(xᵢ)) == f(sum(xᵢ))` | **Somme des TVA de lignes vs TVA du total → BUG-102** |

Les deux dernières lignes sont l'arme du module : **deux propriétés génériques détectent deux des trois défauts de F1**, sans qu'aucun cas de test n'ait été choisi à la main.

#### 1.2.3 Application au contexte SkyRetail

Trois usages immédiats, par ordre de rentabilité :

1. **PBT sur F1.** La propriété de commutativité trouve BUG-101 ; la propriété de cohérence d'agrégat trouve BUG-102. Coût : deux propriétés, ~20 lignes.
2. **Mutation testing sur `SkyRetail.Domain`.** Après M1 et M2, la couverture du domaine sera montée. Stryker dira ce qu'elle vaut. L'écart attendu est de l'ordre de **35 à 40 points** entre couverture et score de mutation.
3. **Fuzzing d'API sur F3.** Le contrat OpenAPI définit les bornes ; le fuzzing les franchit. `page=-1` → 500 au lieu de 400, c'est **BUG-301**, déjà vu en M2 par le contrat ; le fuzzing le retrouverait sans contrat.

Commandes de référence :

```bash
# Mutation testing du domaine — casse le build sous 40 % de score
dotnet stryker --project SkyRetail.Domain --threshold-break 40 --reporter html --reporter json

# PBT .NET
dotnet test --filter "Category=Property"

# PBT front
npx vitest run src/app/checkout/pricing.property.spec.ts
```

#### 1.2.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **La propriété tautologique** | La propriété réimplémente la fonction testée : `sut.Vat(x).Should().Be(x * 0.2m)` | Même mécanisme qu'en M1 : l'oracle vient du code | La propriété doit exprimer une **relation** (invariant, symétrie, aller-retour), jamais un calcul |
| **Le score de mutation comme objectif de vanité** | Le squad vise 90 % et écrit des tests qui tuent des mutants sans valeur métier | Confusion métrique/objectif | Cibler les **mutants survivants sur le code à risque** (moteur de prix, RGPD), pas le score global |
| **Le shrinking ignoré** | Le contre-exemple rapporté fait 47 lignes ; personne ne le lit | Shrinking désactivé ou contre-exemple non journalisé | Toujours consigner le contre-exemple **minimal** et sa graine dans le rapport [S-04][S-05] |
| **Fuzzer sans oracle** | Le fuzzer tourne 20 minutes, ne trouve « rien » | Sans critère d'échec, seul un crash est détecté | Définir l'oracle : codes de statut du contrat, invariants, absence de 5xx |

#### 1.2.5 📊 Chiffres à retenir

- **CVE-2024-9143 (OpenSSL)**, non détectée depuis **~20 ans**, trouvée par fuzzing assisté par LLM ; **26 vulnérabilités** au total, **272 projets**, **+370 000 lignes** de couverture [S-16].
- **+29 %** de couverture des harnais générés par LLM face aux harnais humains ; **30 bugs** découverts [S-15].
- **98 bugs** trouvés par Fuzz4All dans 6 systèmes majeurs, dont **64 inconnus** [S-17] ; **65 bugs** par TitanFuzz avec **+30,38 % / +50,84 %** de couverture [S-18].
- **30+ opérateurs de mutation** dans Stryker, disponible pour **.NET et JS/TS** [S-13] ; le **pourcentage de mutants tués** mesure la qualité des assertions [S-14].
- **13 packages** évalués par LLMorpheus, produisant des mutants réalistes **impossibles à générer avec StrykerJS** [S-20].

---

### 1.3 Notion N3 — Documentation et reporting de test assistés

#### 1.3.1 De quoi parle-t-on

**ISO/IEC/IEEE 29119-3** [S-06] normalise l'ensemble de la documentation de test : plan de test, spécification de conception, spécification des cas de test, **rapport d'incident**, rapport d'exécution, rapport de synthèse. Ce sont des gabarits — donc exactement le type de production où un LLM est à son avantage : structure connue, contenu à transposer.

La distinction opératoire du module :

| L'agent **transforme** | L'agent **fabrique** |
|---|---|
| Une entrée structurée existante (JUnit XML, Cobertura, trace Playwright, log) vers un format lisible | Une explication, une cause racine, un impact métier |
| Vérifiable ligne à ligne contre la source | Invérifiable sans relecture experte |
| Risque faible | **Risque d'hallucination élevé** |

Toute la discipline de la notion tient à savoir de quel côté de ce trait on se situe.

#### 1.3.2 Ce que dit l'état de l'art

**L'entrée doit être structurée.** Les frameworks fournissent déjà tout ce qu'il faut : Playwright expose des reporters `list`, `dot`, `html`, `json` et **JUnit XML**, combinables [S-29] ; Cucumber fournit `json` et `junit` parmi ses formatters [S-30] ; JaCoCo publie une **DTD XML publique** de ses rapports, dont l'équivalent .NET est Coverlet [S-31] ; Coverage.py produit texte, HTML, XML, LCOV et **JSON** [S-32] ; Allure agrège **30+ intégrations** avec Quality Gate et analyse de stabilité [S-28]. Un agent de synthèse ne doit jamais lire une sortie console : il lit un XML ou un JSON, dont chaque affirmation est traçable.

**Le point fort documenté : reproduire un bug depuis son rapport.** LIBRO génère un test reproduisant le défaut **à partir du seul rapport de bug**, pour **33 % des cas (251 sur 750)** de Defects4J [S-23]. C'est un chiffre modeste et remarquable à la fois : un tiers des rapports de bug contient assez d'information pour qu'une machine reconstruise le cas de test. Sur SkyRetail, cela s'applique directement aux **3 post-mortems de production v3.9** de `docs/incidents/`, qui n'ont aucun test de non-régression associé.

**Le point fort suivant : le triage.** CUPID améliore la détection de doublons de rapports de bug de **+5 à 8 %** de Recall Rate@10 face à l'état de l'art, et jusqu'à **+82 %** face aux approches deep learning [S-25]. Sur la qualité rédactionnelle, un Qwen 2.5 fine-tuné atteint **77 % de score CTQRS**, contre **75 %** pour ChatGPT-4o en few-shot [S-26] — un rapport d'anomalie généré est donc, en moyenne, **mieux structuré** qu'un rapport humain pressé.

**Le point faible, mesuré et sévère.** Environ **47,9 %** des résumés de rapports de bug générés par LLM contiennent des **informations manquantes**, et **12,3 %** du contenu est **fabriqué** [S-24]. Ce sont les deux chiffres à graver : *un résumé sur deux est incomplet, un huitième du contenu est inventé*. Appliqué à un rapport d'anomalie de 40 lignes, cela signifie **environ 5 lignes fausses** — et rien ne les distingue visuellement des 35 autres.

Les éditeurs le reconnaissent dans leur propre documentation : GitHub indique que la génération de résumés de pull request est **disponible uniquement en anglais** et que les résumés sont **à relire avant publication** [S-35]. Google publie **8 critères de revue** applicables tels quels [S-33]. Anthropic documente la **méta-summarization** (découpage puis fusion) pour les corpus volumineux, avec un chiffrage de coût explicite : 1 000 documents de 300 000 caractères représentent **438,75 $** avec un modèle haut de gamme contre **87,75 $** avec un modèle léger [S-34] — soit un facteur **5** sur une tâche de synthèse, argument direct pour le choix de modèle en M8. Sur la compression d'entrée, ShortenDoc réduit les docstrings de **25 à 40 %** sans dégrader la qualité du code généré [S-37] : le contexte se paie, et il se taille.

**Le climat professionnel, à ne pas ignorer.** **61 %** des équipes adoptent le testing piloté par IA, et les testeurs qui l'utilisent sont **deux fois plus susceptibles** de craindre d'être remplacés [S-36]. Ce chiffre a sa place dans un module sur la documentation : c'est précisément sur les tâches rédactionnelles que l'inquiétude se cristallise, et c'est précisément là que la relecture experte reste indispensable.

#### 1.3.3 Application au contexte SkyRetail

Chaîne de synthèse recommandée pour le dossier de recette :

```
dotnet test --logger "junit;LogFilePath=artifacts/tests.xml"
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura
dotnet stryker --reporter json                    → artifacts/mutation-report.json
npx playwright test --reporter=junit,html         → artifacts/e2e.xml
                       │
                       ▼
        ┌──────────────────────────────┐
        │  Agent de synthèse (M6)      │
        │  entrée : XML + JSON UNIQUEMENT │
        │  interdit : sortie console brute │
        └──────────────┬───────────────┘
                       ▼
        rapport-recette.md  +  matrice de traçabilité EX ↔ test
```

Règle de garde à imposer dès aujourd'hui, et qui sera codée dans l'agent en M6 :

> **Toute affirmation du rapport doit citer sa source dans un fichier d'artefact.** Un chiffre sans `artifacts/…` en référence est une hallucination jusqu'à preuve du contraire.

#### 1.3.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Le rapport plausible** | Le rapport mentionne un test `OrderIdempotencyTests` qui n'existe pas | 12,3 % de contenu fabriqué [S-24] | Vérification automatique : chaque nom de test cité doit exister dans `tests.xml` |
| **L'omission silencieuse** | Les 9 tests `[Skip]` ne figurent nulle part dans la synthèse | 47,9 % de résumés à information manquante [S-24] | Imposer les rubriques obligatoires du gabarit 29119-3 [S-06], y compris « tests non exécutés » |
| **La cause racine inventée** | « L'échec est dû à une latence réseau » — sans aucune trace réseau en entrée | L'agent comble, comme en M2 | Séparer strictement *constat* (traçable) et *hypothèse* (marquée comme telle) |
| **La console comme entrée** | On colle 2 000 lignes de sortie `dotnet test` dans le prompt | Facilité ; coût en tokens ; ambiguïté | Utiliser JUnit XML / JSON [S-29][S-31][S-32] ; compresser l'entrée [S-37] |

#### 1.3.5 📊 Chiffres à retenir

- **47,9 %** des résumés de rapports de bug générés contiennent des informations **manquantes** ; **12,3 %** du contenu est **fabriqué** [S-24].
- **33 %** des rapports de bug (251 sur 750, Defects4J) permettent à LIBRO de générer un test reproduisant le défaut [S-23].
- **+5 à 8 %** de Recall Rate@10 sur la détection de doublons, jusqu'à **+82 %** face au deep learning [S-25].
- **77 % vs 75 %** de score CTQRS : un modèle fine-tuné dépasse légèrement ChatGPT-4o en few-shot sur la qualité de rapport [S-26].
- **438,75 $ contre 87,75 $** pour synthétiser 1 000 documents de 300 000 caractères selon le modèle retenu — facteur **5** [S-34].

---

## 2. Trois exemples concrets

### 🔍 Exemple A — « La graine, et la donnée qui n'aurait pas dû exister » *(démonstration guidée, 5 min)*

**Contexte.** Le squad a besoin de 200 clients pour tester la recherche du catalogue (F3). Deux voies s'offrent : demander les données au modèle, ou lui demander le générateur.

**Voie 1 — demander les données.**

```text
Génère 200 clients de test pour SkyRetail au format JSON :
id, email, prénom, nom, ville, date d'inscription, nombre de commandes.
```

Sortie (extrait) :

```json
[
  { "id": 1, "email": "marie.dupont@gmail.com",     "firstName": "Marie",  "city": "Lyon" },
  { "id": 2, "email": "j.martin@orange.fr",         "firstName": "Jean",   "city": "Nantes" },
  { "id": 3, "email": "sophie.bernard@wanadoo.fr",  "firstName": "Sophie", "city": "Lille" }
]
```

**Analyse critique.** Le jeu est utilisable en apparence et défaillant sur quatre plans.

| Défaut | Constat | Gravité |
|---|---|---|
| **Domaines réels** | `gmail.com`, `orange.fr`, `wanadoo.fr` : ces adresses peuvent appartenir à des personnes réelles | 🔴 Un test d'envoi d'e-mail en recette contacte un tiers |
| **Non reproductible** | Un second appel produit 200 autres clients | 🔴 Aucun échec n'est rejouable |
| **Distribution plate** | Aucune ville hors de France, aucun caractère non latin, aucun nom à apostrophe, aucun champ vide | 🟠 Les cas qui cassent sont absents |
| **Bornes absentes** | `orderCount` entre 1 et 20 ; jamais 0, jamais 10 000 | 🟠 Les partitions de M2 ne sont pas couvertes |

Le premier point est le seul qui compte juridiquement : la CNIL recommande des données **fictives ou anonymisées** [S-03], et « plausible » n'est pas « fictif ».

**Voie 2 — demander le générateur.**

```text
Écris un Faker<Customer> Bogus (C#, locale fr) pour SkyRetail. Contraintes :
- graine constante versionnée dans le code ;
- e-mails exclusivement sur un domaine réservé RFC 2606 (.test / example.com) ;
- couvre explicitement les partitions : orderCount = 0, 1, 39, 40 ;
- inclus des noms avec apostrophe et caractères accentués ;
- ajoute un test xUnit prouvant que deux générations successives sont identiques.
```

Sortie utile (extrait) :

```csharp
// backend/SkyRetail.Tests/Data/CustomerFaker.cs
public static class CustomerFaker
{
    public const int Seed = 20260728;   // versionné : la reproductibilité est un artefact du dépôt

    public static Faker<Customer> Default => new Faker<Customer>("fr")
        .UseSeed(Seed)
        .RuleFor(c => c.Id,    f => f.IndexGlobal)
        .RuleFor(c => c.Email, f => $"user{f.IndexGlobal}@example.test")   // RFC 2606
        .RuleFor(c => c.LastName, f => f.PickRandom(
            "Dupont", "O'Connell", "Müller", "Nguyễn", "Šimek"))           // jeux de caractères
        .RuleFor(c => c.OrderCount, f => f.PickRandom(0, 1, 39, 40));      // partitions de M2
}
```

```csharp
// Le test qui prouve la reproductibilité — c'est LUI le livrable
[Fact]
public void Faker_IsDeterministic_AcrossRuns()
{
    var first  = CustomerFaker.Default.Generate(200);
    var second = CustomerFaker.Default.Generate(200);

    second.Should().BeEquivalentTo(first,
        "un jeu de données non reproductible rend tout échec non rejouable");
}
```

**Ce qu'on retient.** Demander **le générateur** plutôt que **les données** résout d'un coup la reproductibilité, la licéité et la couverture des partitions. Le générateur est du code : il se relit, se versionne, se teste. Un fichier JSON de 200 lignes produit par un LLM n'est rien de tout cela.

---

### 🔍 Exemple B — « Une propriété trouve en 4 secondes ce qu'un squad a mis 10 minutes à trouver » *(approfondissement, 5 min)*

**Contexte.** En M1-4, un squad a trouvé BUG-102 à la main, en construisant patiemment un panier de sept lignes à 0,625 €. On refait le travail avec une propriété.

**Prompt.**

```text
Propose 5 propriétés (au sens property-based testing) vérifiables sur le calcul
de prix de SkyRetail, dérivées de docs/cdc-v4.0.md §3.1-3.2.
Contrainte : chaque propriété doit exprimer une RELATION (invariant, symétrie,
aller-retour, idempotence, cohérence d'agrégat) et ne jamais réimplémenter le calcul.
```

Sortie retenue après revue :

| # | Propriété | Famille | Ce qu'elle attaque |
|---|---|---|---|
| P1 | Le taux de remise appartient toujours à `[0 ; 0,30]` | Invariant | Plafond → BUG-103 |
| P2 | Le résultat ne dépend pas de l'ordre d'évaluation des règles | Commutativité | **BUG-101** |
| P3 | `Σ TVA(ligne) == TVA(Σ lignes)` | Cohérence d'agrégat | **BUG-102** |
| P4 | Appliquer deux fois le moteur donne le même résultat | Idempotence | Effets de bord |
| P5 | Le total TTC est toujours ≥ au total HT | Invariant | Signe, arrondi |

**Implémentation .NET (P3) :**

```csharp
// backend/SkyRetail.Tests/Pricing/PricingProperties.cs
using FsCheck;
using FsCheck.Xunit;

public class PricingProperties
{
    // Générateur borné : montants réalistes, 1 à 20 lignes de panier
    private static Arbitrary<decimal[]> CartLines() =>
        Gen.Choose(1, 20)
           .SelectMany(n => Gen.ArrayOf(n, Gen.Choose(1, 100_000)
                                            .Select(c => c / 100m)))   // 0,01 € → 1 000,00 €
           .ToArbitrary();

    // P3 — Cohérence d'agrégat. Oracle : CDC §3.1, arrondi bancaire.
    // La propriété n'implémente AUCUN calcul de TVA : elle exprime une relation.
    [Property(Arbitrary = new[] { typeof(PricingProperties) }, MaxTest = 500)]
    public Property VatOfSum_EqualsSumOfVat(decimal[] lines)
    {
        var sut = new VatCalculator(vatRate: 0.20m);

        var sumOfVat = lines.Sum(sut.VatFor);
        var vatOfSum = sut.VatFor(lines.Sum());

        return (Math.Abs(sumOfVat - vatOfSum) <= 0.005m)
            .Label($"Σ TVA(ligne) = {sumOfVat} ≠ TVA(Σ) = {vatOfSum} sur {lines.Length} lignes");
    }
}
```

**Exécution :**

```
Falsifiable, after 37 tests (12 shrinks):
  Σ TVA(ligne) = 0,91 ≠ TVA(Σ) = 0,88 sur 7 lignes
Original:
  [0,625; 0,625; 0,625; 0,625; 0,625; 0,625; 0,625]
Seed: (1247839021, 297461102)
Elapsed: 00:00:04.12
```

**Équivalent TypeScript (fast-check), pour le calcul côté panier Angular :**

```typescript
// frontend/src/app/checkout/pricing.property.spec.ts
import fc from 'fast-check';
import { vatFor } from './pricing';

it('la TVA de la somme égale la somme des TVA', () => {
  fc.assert(
    fc.property(
      fc.array(fc.integer({ min: 1, max: 100_000 }).map(c => c / 100), { minLength: 1, maxLength: 20 }),
      (lines) => {
        const sumOfVat = lines.reduce((acc, l) => acc + vatFor(l), 0);
        const vatOfSum = vatFor(lines.reduce((a, b) => a + b, 0));
        return Math.abs(sumOfVat - vatOfSum) <= 0.005;
      },
    ),
    { numRuns: 500, seed: 20260728 },   // graine fixée : le contre-exemple est rejouable
  );
});
```

**Analyse critique.**

| Ce que le PBT apporte | Ses limites |
|---|---|
| **12 shrinks** : le contre-exemple minimal est directement lisible (7 lignes identiques) | La propriété doit être **écrite par un humain** — c'est un exercice d'abstraction, et c'est le vrai coût |
| La graine est journalisée : le contre-exemple est rejouable [S-04][S-05] | Une propriété mal formulée est une propriété tautologique : si elle réimplémente `VatFor`, elle passe toujours |
| 500 cas explorés en 4 secondes contre ~10 minutes de recherche humaine | Le générateur doit être borné, sinon le contre-exemple est absurde (montants à 14 chiffres) |
| P2 trouve BUG-101 sans jamais avoir lu le code | Aucune couverture des cas hors du domaine du générateur |

**Ce qu'on retient.** L'IA est un bon **proposeur de propriétés** et un mauvais **oracle**. La valeur est dans la relation exprimée, et c'est un humain qui décide de la relation. Une fois écrite, la propriété travaille pour toujours : elle testera aussi les paniers que personne n'a imaginés.

---

### 🔍 Exemple C — « 78 % de couverture, 41 % de score de mutation » *(cas d'entreprise, 5 min)*

**Contexte.** Fin de matinée. Les squads ont généré des tests. La couverture du domaine est passée de 12 % à **78 %**. C'est le moment de poser la question du comité de J4.

```bash
dotnet stryker --project SkyRetail.Domain --reporter html --reporter json
```

**Sortie :**

```
Killed:    112
Survived:   84
No coverage: 27
Timeout:     4
Mutation score: 41,3 %

Fichiers les plus faibles :
  Pricing/DiscountEngine.cs   score 28,4 %  (31 survivants)
  Pricing/VatCalculator.cs    score 33,0 %  (12 survivants)
  Pricing/DiscountTiers.cs    score 71,2 %  ( 6 survivants)
```

**Trois mutants survivants, commentés :**

```csharp
// Mutant #47 — SURVIVANT — DiscountEngine.cs:34
- rate = Math.Min(rate, 0.30m);
+ rate = Math.Min(rate, 0.31m);
// Aucun test ne vérifie la VALEUR du plafond. Il est exécuté, jamais assuré.

// Mutant #52 — SURVIVANT — DiscountEngine.cs:22
- if (applied.Any(a => a.Rule.ExcludedCodes.Contains(rule.Code))) continue;
+ if (false) continue;
// La règle d'exclusivité peut être SUPPRIMÉE sans qu'un seul test ne rougisse.
// C'est BUG-101, vu depuis l'autre bout : le code est couvert et non vérifié.

// Mutant #61 — SURVIVANT — VatCalculator.cs:14
- MidpointRounding.AwayFromZero
+ MidpointRounding.ToEven
// Le mode d'arrondi peut être changé sans conséquence sur la suite.
// Aucun test ne distingue les deux comportements → BUG-102 est invisible.
```

**Analyse critique.** L'écart 78 % − 41,3 % = **36,7 points** est la mesure directe de l'*oracle gap* [S-22]. Le mutant #52 est le plus parlant : on peut **supprimer purement et simplement la règle d'exclusivité** — la ligne de code qui contient BUG-101 — et la suite reste verte. Une couverture de 78 % ne dit rien de cela ; le score de mutation le dit en une ligne.

| Métrique | Ce qu'elle mesure | Ce qu'elle ne mesure pas |
|---|---|---|
| Couverture de lignes 78 % | Le code a été **exécuté** | Qu'il ait été **vérifié** |
| Score de mutation 41,3 % | La proportion de défauts introduits **détectés** | Les défauts que Stryker ne sait pas générer (logique métier absente, exigence oubliée) |
| `No coverage: 27` | 27 mutants sur du code jamais atteint | — |

**Ce qu'on retient.** C'est la réponse à la question piège n°1 du comité de J4 : *« Vous me dites 78 % de couverture. Si je supprime la ligne 42 de `DiscountEngine.cs`, combien de vos tests tombent ? »* La réponse honnête, aujourd'hui, est **zéro** — et il vaut mieux l'avoir mesurée soi-même. Le mutation testing est la **porte 4** du filtre de Meta vu en M1 : c'est le seul rempart automatisable contre le test tautologique.

---

## 3. Quatre exercices

### 🧪 Exercice M3-1 — « La graine »

| | |
|---|---|
| **Difficulté** | ⭐ |
| **Durée cible** | 4 min |
| **Modalité** | squad |
| **Matériel** | `backend/SkyRetail.Tests/Data/`, paquet `Bogus` |
| **QA Credits** | 10 |

**Énoncé**
Produisez un générateur Bogus de 200 clients SkyRetail, reproductible, sans donnée personnelle plausible, couvrant les partitions de `orderCount` définies en M2. Prouvez la reproductibilité par un test.

**✅ Résultat attendu**
- [ ] `backend/SkyRetail.Tests/Data/CustomerFaker.cs` avec une graine **constante et versionnée**.
- [ ] Tous les e-mails générés sur un domaine réservé (`*.test`, `example.com`) — vérifiable par `Should().OnlyContain(c => c.Email.EndsWith(".test"))`.
- [ ] Les partitions `orderCount ∈ {0, 1, 39, 40}` sont toutes représentées dans les 200 clients.
- [ ] Un test `Faker_IsDeterministic_AcrossRuns` passe : deux générations de 200 clients sont strictement équivalentes.
- **Invalide** : un seul e-mail sur un domaine réel ; ou absence de graine ; ou test de déterminisme absent.

**💡 Indice** *(après 1 min 30)*
La reproductibilité est un **test**, pas une intention. Si vous ne l'avez pas écrit, vous ne l'avez pas.

**🔑 Solution de référence** — voir le code de l'exemple A, voie 2. Le point noté est le test de déterminisme : sans lui, l'exercice est réputé non réalisé.

**🎓 Ce que l'exercice enseigne vraiment**
Que la reproductibilité d'un jeu de données n'est pas une propriété qu'on affirme, mais une propriété qu'on assure. Et que la conformité CNIL [S-03] se règle par une ligne de code — un domaine réservé — pas par une note dans le plan de test.

---

### 🧪 Exercice M3-2 — « Écrire une propriété »

| | |
|---|---|
| **Difficulté** | ⭐⭐ |
| **Durée cible** | 4 min |
| **Modalité** | binôme (rotation Pilote/Copilote) |
| **Matériel** | `backend/SkyRetail.Domain/Pricing/`, `FsCheck.Xunit` (ou `fast-check` côté front) |
| **QA Credits** | 20 |

**Énoncé**
Faites proposer par Claude Code cinq propriétés du moteur de prix, dérivées de `docs/cdc-v4.0.md` §3.1-3.2. Rejetez celles qui réimplémentent le calcul. Implémentez-en **deux**, dont obligatoirement une **relation** (commutativité, idempotence ou cohérence d'agrégat). Consignez le contre-exemple minimal et la graine.

**✅ Résultat attendu**
- [ ] `backend/SkyRetail.Tests/Pricing/PricingProperties.cs` contient **2 propriétés** exécutables, taguées `Category=Property`.
- [ ] Au moins une propriété exprime une **relation**, pas un calcul — vérifiable : le corps de la propriété ne contient ni `* 0.20m` ni `+ 0.10m`.
- [ ] Le générateur est **borné** (montants réalistes, longueur de panier plafonnée).
- [ ] Au moins une propriété est **falsifiée** ; le contre-exemple minimal après *shrinking* et la graine sont consignés dans `boss-j1/proprietes.md`.
- [ ] Sur les 5 propriétés proposées par l'IA, au moins **une rejetée**, avec le motif du rejet.
- **Invalide** : propriété tautologique (réimplémente le calcul) ; ou contre-exemple non réduit ; ou graine absente.

**💡 Indice** *(après 2 min)*
Le test de tautologie est simple : si la propriété continue de passer alors que vous cassez volontairement le calcul dans le code de production, elle ne teste rien.

**🔑 Solution de référence** — voir l'exemple B (P2 et P3). Un motif de rejet typique :

> *Propriété rejetée : « pour tout x, VatFor(x) == Math.Round(x * 0.20m, 2) ». Elle réimplémente la fonction testée ; elle passera quel que soit le mode d'arrondi retenu. C'est l'anti-pattern tautologique de M1, transposé au PBT.*

**🎓 Ce que l'exercice enseigne vraiment**
Que le PBT déplace l'effort de la **sélection de cas** vers la **formulation de la relation** — et que la relation est le lieu exact où l'expertise métier est irremplaçable. L'IA propose cinq candidats en dix secondes ; savoir lequel n'est pas une tautologie prend dix minutes de réflexion humaine.

---

### 🧪 Exercice M3-3 — « Tuer les survivants »

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐ |
| **Durée cible** | 5 min |
| **Modalité** | squad |
| **Matériel** | `dotnet-stryker`, `SkyRetail.Domain`, la suite de tests produite depuis M1 |
| **QA Credits** | 40 |

**Énoncé**
Lancez Stryker.NET sur `SkyRetail.Domain`. Relevez couverture et score de mutation. Choisissez **trois mutants survivants** sur le code à plus fort risque métier (moteur de prix). Pour chacun : expliquez ce qu'il révèle, écrivez le test qui le tue, et relancez pour prouver le gain.

**✅ Résultat attendu**
- [ ] `boss-j1/mutation.md` contient le tableau avant/après : *couverture · score de mutation · killed · survived · no coverage*.
- [ ] **Trois mutants survivants** documentés : fichier, ligne, mutation appliquée, et **ce que sa survie prouve** en une phrase.
- [ ] Trois nouveaux tests écrits ; chacun **tue** son mutant (vérifié par une seconde exécution de Stryker).
- [ ] Le score de mutation augmente d'au moins **5 points**.
- [ ] Aucun nouveau test n'est tautologique — le Copilote applique la grille en 8 points de M2.
- **Invalide** : score amélioré par ajout d'assertions sans rapport avec les mutants ; ou tests ciblant des mutants sur du code sans enjeu (`ToString`, getters) ; ou seconde exécution non fournie.

**💡 Indice** *(après 2 min 30)*
Ouvrez le rapport HTML de Stryker et triez par fichier, pas par nombre de survivants. Un survivant dans `DiscountEngine.cs` vaut dix survivants dans un DTO.

**🔑 Solution de référence**

```csharp
// Tue le mutant #47 (plafond 0.30m → 0.31m)
[Fact]
public void Compute_WhenDiscountsExceedCap_ClampsAtThirtyPercent()
{
    var cart = CartBuilder.New().WithEligibleDiscounts(0.15m, 0.15m, 0.10m).Build();
    var rate = new DiscountEngine(DiscountRules.All).Compute(cart).TotalDiscountRate;

    rate.Should().Be(0.30m, "CDC §3.2 : le cumul total est plafonné à 30 %");
}

// Tue le mutant #52 (suppression du contrôle d'exclusivité) — et découvre BUG-101
[Theory]
[InlineData(new[] { "FLASH15", "WELCOME10" })]   // ordre 1
[InlineData(new[] { "WELCOME10", "FLASH15" })]   // ordre 2 — l'ordre ne doit rien changer
public void Compute_MutuallyExclusiveRules_NeverStack(string[] order)
{
    var rate = new DiscountEngine(DiscountRules.InOrder(order))
                   .Compute(CartBuilder.New().ForNewCustomer().DuringFlashSale().Build())
                   .TotalDiscountRate;

    rate.Should().Be(0.15m, "EX-003 : WELCOME10 et FLASH15 ne sont pas cumulables");
}

// Tue le mutant #61 (AwayFromZero → ToEven) — voir M1-4
```

Résultat attendu : score de mutation de **41,3 % à ~52 %**, et **deux tests rouges** — c'est-à-dire deux défauts trouvés.

**🎓 Ce que l'exercice enseigne vraiment**

1. Que la question « mes tests servent-ils à quelque chose ? » a une **réponse chiffrée et automatisable**.
2. Que le mutant survivant est un **guide de rédaction de test** : il désigne exactement ce qui n'est pas vérifié, ce qu'aucun rapport de couverture ne fait.
3. Que le score de mutation est la seule métrique qu'un test tautologique ne peut pas faire monter — d'où sa place comme porte 4 du filtre de Meta [S-22].

**Exercice bonus ⭐⭐⭐⭐⭐** — Faire générer par Claude Code **trois mutants de type « bug historique réaliste »** sur `DiscountEngine.cs`, à la manière de LLMorpheus [S-20], que Stryker ne sait pas produire (inversion de deux paramètres, mauvaise variable de boucle, condition intervertie). Vérifier si la suite les attrape.

---

### 🧪 Exercice M3-4 — « Le rapport qui invente » 🎯

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐⭐ |
| **Durée cible** | 5 min (+ 5 min de Contre-Test) |
| **Modalité** | squad |
| **Matériel** | `artifacts/tests.xml` (JUnit), rapport Coverlet, rapport JSON Stryker, `docs/incidents/` |
| **QA Credits** | 80 |

**Énoncé**
Faites produire par Claude Code un rapport d'anomalie complet sur BUG-102, à partir de vos artefacts d'exécution, au gabarit ISO/IEC/IEEE 29119-3. Puis **auditez-le** : identifiez chaque affirmation **non traçable** à un artefact et chaque **omission**. La littérature annonce ~47,9 % de résumés à information manquante et 12,3 % de contenu fabriqué : vérifiez sur votre cas.

**✅ Résultat attendu**
- [ ] `boss-j1/anomalie-BUG-102.md` généré, comportant au minimum : identifiant, résumé, sévérité, étapes de reproduction, résultat attendu, résultat obtenu, environnement, artefacts joints.
- [ ] `boss-j1/audit-rapport.md` classe **chaque affirmation** du rapport en trois catégories : **(T)** traçable à un artefact nommé, **(H)** hypothèse marquée comme telle, **(F)** fabriquée.
- [ ] Au moins **une affirmation de catégorie (F)** est identifiée, avec la preuve de sa fausseté (le fichier ou la ligne qui la contredit).
- [ ] Au moins **une omission** est identifiée parmi : les 9 tests `[Skip]`, la graine du contre-exemple, le score de mutation, les tests non exécutés.
- [ ] Le rapport corrigé cite, pour chaque chiffre, le chemin d'artefact source (`artifacts/…`).
- **Invalide** : audit sans preuve ; ou rapport ne citant aucun artefact ; ou catégorie (F) déclarée sans contre-preuve.

**💡 Indice** *(après 2 min)*
Les fabrications les plus fréquentes portent sur trois objets : un **nom de test qui n'existe pas**, une **cause racine** présentée comme un fait, et un **chiffre de couverture** légèrement différent du rapport réel. Cherchez d'abord ces trois-là. `grep` le nom de chaque test cité dans `artifacts/tests.xml` : c'est vérifiable en cinq secondes.

**🔑 Solution de référence**

Extrait de rapport généré, annoté :

```markdown
## BUG-102 — Écart d'arrondi de TVA sur les paniers multi-lignes

**Sévérité** : majeure                                     ← (H) non justifiée : aucune règle
                                                              de sévérité n'a été fournie
**Détecté par** : `VatRoundingTests.TotalVat_OnSevenHalfCentLines`   ← (T) présent dans tests.xml
**Couverture de VatCalculator** : 94 %                     ← (F) le rapport Cobertura indique 87,2 %
**Cause racine** : usage de `MidpointRounding.AwayFromZero`
  au lieu de l'arrondi bancaire                            ← (T) vérifiable ligne 14
**Impact estimé** : environ 4 200 € d'écart annuel de facturation  ← (F) AUCUNE donnée d'entrée
                                                              ne permet ce calcul
**Introduit par** : le commit de refonte v4.0              ← (F) aucun `git blame` n'a été fourni
```

Audit attendu :

| Affirmation | Cat. | Preuve |
|---|---|---|
| Test `TotalVat_OnSevenHalfCentLines` | **(T)** | présent dans `artifacts/tests.xml` |
| Couverture 94 % | **(F)** | `artifacts/coverage.cobertura.xml` → 87,2 % |
| Impact 4 200 €/an | **(F)** | aucun volume de commandes en entrée |
| Introduit par le commit v4.0 | **(F)** | aucun historique Git fourni au modèle |
| Sévérité majeure | **(H)** | plausible, mais non fondée sur une échelle documentée |

Omissions attendues : la **graine** du contre-exemple, le **score de mutation** de `VatCalculator` (33 %), les **9 tests `[Skip]`**, et le fait que la correction n'a **pas** été commitée.

Ratio observé en séance : typiquement **3 à 5 affirmations fabriquées** sur 12 à 15 — soit **20 à 35 %**, à comparer aux 12,3 % de la littérature [S-24]. L'écart s'explique : notre entrée est plus pauvre que celle des jeux d'évaluation. **Moins on donne d'artefacts, plus le modèle comble.**

**🎓 Ce que l'exercice enseigne vraiment**

1. **Un rapport de test généré est un document à charge de preuve.** Chaque chiffre doit pointer un fichier. C'est la règle de garde qui sera codée dans l'agent en M6.
2. **Les fabrications sont plausibles par construction** — « 4 200 € d'écart annuel » est exactement le genre de phrase qu'un comité retient. C'est ce qui les rend dangereuses, et c'est pourquoi elles se traquent par vérification systématique, pas par relecture attentive.
3. **L'omission est aussi grave que la fabrication, et moins visible.** Les 9 tests `[Skip]` absents d'un rapport de recette, ce sont 9 zones non testées dont le comité de Go/No-Go ne saura rien.

**Contre-Test (5 min).** Le squad adverse doit trouver **une affirmation supplémentaire** de catégorie (F) que le défenseur a classée (T) ou (H). +20 QAC s'il y parvient. C'est le meilleur entraînement possible à la relecture d'un livrable d'IA.

---

## 4. 👑 Boss J1 — « Le Cahier des Charges Fantôme »

> **Durée : 30 min · 150 QAC · Modalité : squad**

### 4.1 Mise en situation

> Il est 17 h. Le métier vous envoie les **6 pages** du cahier des charges v4.0 — celles que vous découpez depuis M2. Le comité d'architecture est demain matin à 9 h. Il ne veut ni votre couverture, ni vos tests. Il veut une seule chose : **ce qui est testable, et ce qui ne l'est pas**.

### 4.2 Déroulé minuté

| Temps | Séquence | Ce que fait le squad |
|---|---|---|
| 0-3 min | Cadrage | Répartition Pilote/Copilote, choix de la stratégie de découpage (par section ou par feature) |
| 3-12 min | Extraction | Passage des 6 pages en extraction assistée, avec la contrainte `[ABSENT]` de M2 ; production des EX-001…EX-0nn |
| 12-18 min | Chasse aux ambiguïtés | Construction de la table de décision globale ; recherche des contradictions et des silences |
| 18-26 min | Gherkin | Génération, conservation du brut, revue, diff commenté |
| 26-30 min | Consolidation | Assemblage de `boss-j1/plan-de-test-v4.md`, validation syntaxique, commit |

**Règle d'animation** : le formateur annonce le temps restant à 15, 10 et 5 minutes. À 26 min, plus aucune génération n'est autorisée — seulement de la consolidation. C'est volontaire : le réflexe de « relancer une génération » à trois minutes de la fin est exactement ce que le boss cherche à casser.

### 4.3 Livrable attendu

1. **`boss-j1/plan-de-test-v4.md`** contenant :
   - la liste des exigences extraites, numérotées **EX-001** à **EX-0nn** ;
   - pour chacune : testable **oui/non**, type de test, priorité, et **la question à poser au métier** si non testable ;
2. **la liste des ambiguïtés** détectées — le cahier des charges en contient **7** délibérées ;
3. **au moins 12 scénarios Gherkin** générés **puis revus**, avec la mention explicite de ce qui a été **corrigé** par rapport à la sortie brute du LLM.

### 4.4 Barème

| Critère | Points |
|---|---|
| ≥ 90 % des exigences extraites | 40 |
| ≥ 5 ambiguïtés sur 7 détectées | 40 |
| 12 scénarios Gherkin valides syntaxiquement (`npx @cucumber/gherkin-utils` passe) | 30 |
| Diff explicite entre sortie brute et version revue | 40 |
| **Bonus** : avoir détecté que l'exigence **EX-014 contredit EX-003** | **+30** |
| **Malus** : une valeur numérique figure dans le livrable sans exister dans le CDC | **−20** |
| **Malus** : sortie brute non conservée (diff impossible à vérifier) | **−40** |

Seuil de réussite du boss : **120 points sur 150** hors bonus.

### 4.5 Corrigé du formateur — les 7 ambiguïtés

À ne divulguer qu'au débriefing. Toute ambiguïté trouvée **en plus** de ces sept, si elle est fondée, vaut +10 QAC.

| # | Section | Extrait | Nature | Question attendue |
|---|---|---|---|---|
| **AMB-1** | §3.2 | « les clients **fidèles** » | Terme métier non défini | Fidèle = combien de commandes, sur quelle période, avec quel montant minimum ? |
| **AMB-2** | §3.2 | « une remise **intéressante** » | Adjectif non quantifié | Quel taux exact, et sur quelle assiette (HT ou TTC) ? |
| **AMB-3** | §3.2 | « les commandes **importantes** » | Seuil implicite | À partir de quel montant, HT ou TTC, avant ou après remise ? |
| **AMB-4** | §3.2 | « pendant les **périodes promotionnelles** » | Dépendance temporelle floue | Défini par qui, dans quel fuseau horaire, avec quelle granularité (jour, heure) ? |
| **AMB-5** | §3.2 | « les articles en précommande sont traités **normalement** » | Comportement non spécifié | Si c'est identique aux autres articles, pourquoi le mentionner ? **→ trace de BUG-103** |
| **AMB-6** | §3.1 | Aucune mention du **mode d'arrondi** de la TVA | Silence normatif | Arrondi bancaire ou arrondi commercial ? Par ligne ou sur le total ? **→ trace de BUG-102** |
| **AMB-7** | §2 | « le paiement est confirmé **rapidement** » | Exigence non fonctionnelle non chiffrée | Quel p95 acceptable, mesuré où (client, serveur) ? |

**La contradiction (bonus +30) :**

> **EX-003** (§3.2) : « Le cumul total des remises est plafonné à 30 %. »
> **EX-014** (§4.4) : « Lors du Black Friday, la remise cumulée peut atteindre 40 % sur la catégorie Électronique. »

Elles sont séparées de deux pages. Aucun squad ne la trouve par lecture linéaire ; on la trouve en construisant la **table de décision globale**. C'est l'enseignement à énoncer au débriefing.

### 4.6 Ce que le boss évalue réellement

| En apparence | En réalité |
|---|---|
| La capacité à produire vite un plan de test | La capacité à **résister** à la production : le squad qui génère 40 scénarios en 10 minutes n'aura pas le temps de les réviser, et perdra 40 points sur le diff |
| L'exhaustivité de l'extraction | La discipline du `[ABSENT]` : ne pas combler les trous |
| La maîtrise du Gherkin | La compréhension que **supprimer un scénario est une correction valide** |
| Le travail sur les exigences | La capacité à formuler une **question au métier** plutôt qu'une hypothèse |

---

## 5. Débriefing

### 5.1 Les cinq erreurs les plus fréquentes sur ce module

| # | Erreur | Correction |
|---|---|---|
| 1 | **Demander les données au lieu du générateur** | Le générateur est du code : reproductible, versionné, relisible. Un JSON de 200 lignes n'est rien de tout cela — et il contient des domaines réels [S-03]. |
| 2 | **La propriété tautologique** | Si la propriété réimplémente le calcul, elle passera quel que soit le bug. Une propriété exprime une **relation**. |
| 3 | **Viser un score de mutation global** | Un score de 90 % sur des DTO ne protège rien. Cibler les survivants sur le **code à risque métier**. |
| 4 | **Coller la sortie console dans le prompt** | Utiliser JUnit XML / Cobertura / JSON [S-29][S-31] : traçable, compact, vérifiable. |
| 5 | **Relire un rapport généré au lieu de le vérifier** | 12,3 % de contenu fabriqué [S-24] : la relecture attentive ne suffit pas, il faut confronter chaque affirmation à un artefact. |

### 5.2 Questions de contrôle

1. **Pourquoi une graine constante est-elle une exigence et non un confort ?**
   → Parce qu'un échec sur un jeu non graine n'est pas rejouable, donc pas diagnosticable : c'est un flaky par construction. Faker/Bogus [S-01] et les moteurs de PBT [S-04][S-05] exposent tous une graine pour cette raison.

2. **Que dit la CNIL sur les environnements de test, et quelle conséquence de code en tirez-vous ?**
   → De tester *« dans un environnement distinct de la production […] et sur des données fictives ou anonymisées »* [S-03]. Conséquence : domaines réservés RFC 2606, aucun extrait de production dans un prompt, jeu généré par règles.

3. **Quelle est la différence entre couverture et score de mutation, et quel écart avez-vous mesuré ?**
   → La couverture mesure l'exécution, le score de mutation mesure la vérification [S-14][S-22]. Écart observé sur `SkyRetail.Domain` : 78 % contre 41,3 %, soit **36,7 points**.

4. **Citez un résultat industriel du fuzzing assisté par LLM et expliquez le rôle exact du modèle.**
   → CVE-2024-9143 dans OpenSSL, non détectée depuis ~20 ans, parmi 26 vulnérabilités sur 272 projets [S-16]. Le modèle n'est pas le fuzzer : il **écrit le harnais**, avec un gain de couverture jusqu'à +29 % face aux harnais humains [S-15].

5. **Quels sont les deux chiffres à retenir sur les résumés de bugs générés, et quelle procédure en découle ?**
   → **47,9 %** contiennent des informations manquantes, **12,3 %** du contenu est fabriqué [S-24]. Procédure : classer chaque affirmation en traçable / hypothèse / fabriquée, et exiger un chemin d'artefact pour chaque chiffre.

### 5.3 Ce qu'on retient

- **Demander le générateur, pas les données** : reproductibilité, licéité et couverture des partitions se règlent d'un coup.
- Une **propriété** exprime une relation, jamais un calcul. Deux propriétés génériques — commutativité et cohérence d'agrégat — détectent deux des trois défauts de F1.
- Le **score de mutation** est la seule métrique qu'un test tautologique ne peut pas faire monter. Écart mesuré : **78 % → 41,3 %**.
- Un **rapport généré est un document à charge de preuve** : chaque chiffre cite un artefact, ou il est présumé faux.
- Le fuzzing assisté par LLM est la réussite industrielle la mieux documentée du domaine — parce que le modèle y fait ce qu'il fait de mieux : **écrire le harnais**, pas décider.

### 5.4 Transition vers J2

> Fin de la première journée. Vous savez ce que vous avez, ce que l'IA sait faire, et ce qu'elle invente. Vous avez un plan de test, des questions pour le métier et deux défauts confirmés. Mais tout cela s'est fait **prompt par prompt, à la main, sur vos claviers**. Demain, la Task Force monte l'atelier : prompts industrialisés, outillage agentique, et un agent maison qui travaille sans vous. J2 s'appelle *L'Arsenal*.

---

## 6. Sources

### Sources de la notion N1 — Jeux de données de test

[S-01] **Faker documentation** — https://faker.readthedocs.io/ (portage .NET : https://github.com/bchavez/Bogus) — *doc officielle, 2026* — génération de données factices réalistes par règles typées ; `seed()` garantit la **reproductibilité** du jeu de test.

[S-02] **SDV — Synthetic Data Vault** — https://docs.sdv.dev/sdv — *doc officielle, 2026* — génération de données tabulaires synthétiques (GaussianCopula, CTGAN) **avec évaluation statistique de fidélité** : le seul outil du corpus qui mesure la représentativité du jeu produit.

[S-03] **CNIL — Sécurité : Encadrer les développements informatiques** — https://www.cnil.fr/fr/securite-encadrer-les-developpements-informatiques — *guide officiel de l'autorité française, 2024* — recommandation explicite d'effectuer les tests *« dans un environnement distinct de la production […] et sur des données fictives ou anonymisées »*.

[S-04] **Hypothesis documentation** — https://hypothesis.readthedocs.io/ — *doc officielle, 2026* — PBT de référence : `@given` génère des centaines de cas et le **shrinking** produit le contre-exemple minimal, avec la graine permettant le rejeu.

[S-05] **fast-check** — https://fast-check.dev/ — *doc officielle, 2026* — équivalent QuickCheck pour JS/TS, paramètre `seed` pour la reproductibilité ; a permis de détecter des bugs dans **Jest, TypeScript et Ramda**.

[S-06] **ISO/IEC/IEEE 29119-3 — Software testing — Part 3: Test documentation** — https://www.iso.org/standard/79429.html — *norme internationale, 2021* — traite le jeu de données de test comme un artefact documentaire identifié, versionné et rattaché aux cas de test.

[S-07] **We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs** — https://arxiv.org/abs/2406.10279 — *papier arXiv (USENIX Security 2025), 2024* — **5,2 %** (modèles commerciaux) et **21,7 %** (open source) de paquets inexistants sur 576 000 échantillons ; **205 474 noms hallucinés uniques**. À opposer à tout `dotnet add package` suggéré.

[S-08] **OWASP Top 10 for LLM Applications 2025** — https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/ — *référentiel de sécurité officiel, 2025* — cadre les **10 risques critiques**, dont la divulgation d'informations sensibles : rattachement normatif de l'interdiction de coller un extrait de base de production dans un prompt.

[S-09] **Reduce hallucinations — Documentation officielle Anthropic** — https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations — *doc officielle éditeur, 2026* — techniques de réduction, **avec l'aveu explicite** qu'elles *« réduisent significativement les hallucinations mais ne les éliminent pas entièrement »* : vaut pour les faits comme pour les identités générées.

[S-10] **Software Engineering at Google — Chapitre 13, Test Doubles** — https://abseil.io/resources/swe-book/html/ch13.html — *chapitre officiel en accès libre, 2020* — Google documente que l'abus du mocking a **« pollué »** sa base de tests (« no more mocks! ») : argument en faveur d'un fake de base réel alimenté par un jeu graine.

[S-11] **Mocks Aren't Stubs (Martin Fowler)** — https://martinfowler.com/articles/mocksArentStubs.html — *article de référence, 2007* — distingue les **5 types de test doubles** (Dummy, Fake, Stub, Spy, Mock) : cadre la frontière entre donnée de test et double de test.

[S-12] **Test smells in LLM-Generated Unit Tests** — https://arxiv.org/abs/2410.10628 — *papier arXiv, 2024* — sur **20 505 suites générées**, le smell **Magic Number Test** est systématique : une donnée de test sans justification est une dette de maintenance.

### Sources de la notion N2 — Property-based testing, fuzzing assisté et mutation testing

[S-04] **Hypothesis documentation** — https://hypothesis.readthedocs.io/ — *doc officielle, 2026* — mécanisme du **shrinking** : réduction automatique de l'entrée jusqu'au contre-exemple minimal, ce qui rend un échec de PBT lisible et débuggable.

[S-05] **fast-check** — https://fast-check.dev/ — *doc officielle, 2026* — implémentation JS/TS pour la partie Angular du fil rouge ; bugs détectés dans **Jest, TypeScript et Ramda**.

[S-13] **Stryker Mutator — Documentation** — https://stryker-mutator.io/docs/ — *doc officielle, 2026* — mutation testing JS/TS **et .NET (Stryker.NET)** ; **plus de 30 opérateurs de mutation**, exécution parallélisée, rapports HTML et JSON.

[S-14] **PIT Mutation Testing** — https://pitest.org/ — *doc officielle, 2026* — le **pourcentage de mutants tués** mesure la qualité réelle des assertions, là où la couverture de lignes ne mesure que l'exécution.

[S-15] **google/oss-fuzz-gen (dépôt officiel)** — https://github.com/google/oss-fuzz-gen — *dépôt officiel Google, 2024-2026* — génération de **harnais de fuzzing par LLM** : **30 bugs/vulnérabilités** découverts, gain de couverture jusqu'à **+29 %** face aux harnais humains.

[S-16] **Leveling Up Fuzzing: Finding more vulnerabilities with AI (Google Security Blog)** — https://security.googleblog.com/2024/11/leveling-up-fuzzing-finding-more.html — *blog officiel Google, 2024* — **26 nouvelles vulnérabilités**, dont **CVE-2024-9143 dans OpenSSL non détectée depuis ~20 ans** ; **272 projets C/C++**, **+370 000 lignes** de couverture.

[S-17] **Fuzz4All: Universal Fuzzing with Large Language Models** — https://arxiv.org/abs/2308.04748 — *papier arXiv (ICSE 2024), 2023* — **98 bugs** identifiés dans GCC, Clang, Z3, CVC5, OpenJDK et Qiskit, dont **64 confirmés inconnus**.

[S-18] **Large Language Models are Zero-Shot Fuzzers (TitanFuzz)** — https://arxiv.org/abs/2212.14834 — *papier arXiv (ISSTA 2023), 2022* — **+30,38 %** et **+50,84 %** de couverture sur TensorFlow et PyTorch, **65 bugs** détectés dont 41 inconnus.

[S-19] **ChatAFL — Large Language Model guided Protocol Fuzzing (NDSS'24)** — https://github.com/ChatAFLndss/ChatAFL — *dépôt officiel de l'article NDSS 2024, 2024* — **+5,8 %** de couverture de branches vs AFLNet, **+6,7 %** vs NSFuzz sur du fuzzing de protocole.

[S-20] **LLMorpheus: Mutation Testing using Large Language Models** — https://arxiv.org/abs/2404.09952 — *papier arXiv, 2024* — évalué sur **13 packages** JavaScript ; produit des mutants ressemblant à de vrais bugs historiques, **impossibles à générer avec StrykerJS**.

[S-21] **A summer of security: empowering cyber defenders with AI (Big Sleep)** — https://blog.google/innovation-and-ai/technology/safety-security/cybersecurity-updates-summer-2025/ — *communiqué officiel Google, 2025* — l'agent **Big Sleep** découvre **CVE-2025-6965 (SQLite)** avant exploitation ; **20 vulnérabilités** signalées dans FFmpeg, ImageMagick et d'autres.

[S-22] **The Oracle Gap: Comparing Coverage and Mutation Score** — https://arxiv.org/abs/2309.02395 — *papier arXiv, 2023* — introduit l'**« oracle gap »** : une forte couverture coexiste couramment avec des oracles faibles — mesuré à 36,7 points d'écart sur `SkyRetail.Domain`.

### Sources de la notion N3 — Documentation et reporting de test assistés

[S-23] **Large Language Models are Few-shot Testers (LIBRO)** — https://arxiv.org/abs/2209.11515 — *papier arXiv (ICSE 2023), 2022* — génère un test reproduisant le bug **à partir du seul rapport de bug** pour **33 % des cas (251 sur 750)** de Defects4J.

[S-24] **Empirical Analysis and Detection of Hallucinations in LLM-Generated Bug Report Summaries** — https://arxiv.org/abs/2605.24137 — *papier arXiv, 2026* — **~47,9 %** des résumés générés contiennent des informations **manquantes** et **12,3 %** du contenu est **fabriqué** : les deux chiffres qui fondent la procédure d'audit du module.

[S-25] **CUPID: Leveraging ChatGPT for More Accurate Duplicate Bug Report Detection** — https://arxiv.org/abs/2308.10022 — *papier arXiv, 2023* — **+5 à 8 %** de Recall Rate@10 face à l'état de l'art, jusqu'à **+82 %** face aux approches deep learning.

[S-26] **Can We Enhance Bug Report Quality Using LLMs?** — https://arxiv.org/abs/2504.18804 — *papier arXiv, 2025* — un Qwen 2.5 fine-tuné atteint **77 % de score CTQRS** contre **75 %** pour ChatGPT-4o en few-shot : un rapport généré est en moyenne mieux structuré qu'un rapport humain pressé.

[S-06] **ISO/IEC/IEEE 29119-3 — Software testing — Part 3: Test documentation** — https://www.iso.org/standard/79429.html — *norme internationale, 2021* — gabarits normatifs des rapports d'incident, d'exécution et de synthèse : la structure que l'agent doit remplir, et dont les rubriques obligatoires empêchent l'omission.

[S-28] **Allure Report Documentation** — https://allurereport.org/docs/ — *doc officielle, 2026* — **30+ intégrations** de frameworks avec Quality Gate et analyse de stabilité : format d'agrégation exploitable comme entrée d'agent.

[S-29] **Reporters | Playwright** — https://playwright.dev/docs/test-reporters — *doc officielle, 2026* — reporters `list`, `dot`, `html`, `json` et **JUnit XML** combinables : entrée structurée idéale pour un LLM de synthèse, à préférer à la sortie console.

[S-30] **Reporting | Cucumber** — https://cucumber.io/docs/cucumber/reporting/ — *doc officielle, 2026* — formatters `message / progress / pretty / html / json / junit / testng`.

[S-31] **JaCoCo — Documentation** — https://www.jacoco.org/jacoco/trunk/doc/ (équivalent .NET : https://github.com/coverlet-coverage/coverlet) — *doc officielle, 2026* — compteurs de couverture et **DTD XML publique** des rapports : chaque chiffre du rapport de synthèse est traçable à un nœud XML.

[S-32] **Coverage.py Documentation** — https://coverage.readthedocs.io/ — *doc officielle, 2026* — rapports texte, HTML, XML, LCOV et **JSON** : illustre la disponibilité universelle d'un format machine pour la couverture.

[S-33] **Introduction — Google Engineering Practices (Code Review)** — https://google.github.io/eng-practices/review/ — *doc officielle Google, 2026* — **8 critères de revue** (Design, Functionality, Complexity, Tests, Naming, Comments, Style, Documentation) applicables à la relecture d'un rapport généré.

[S-34] **Legal summarization — Claude Platform Docs (Anthropic)** — https://platform.claude.com/docs/en/about-claude/use-case-guides/legal-summarization — *doc officielle Anthropic, 2026* — technique de **méta-summarization** (chunking puis fusion) ; 1 000 documents de 300 000 caractères = **438,75 $** en modèle haut de gamme contre **87,75 $** en modèle léger.

[S-35] **Creating a pull request summary with GitHub Copilot** — https://docs.github.com/copilot/using-github-copilot/creating-a-pull-request-summary-with-github-copilot — *doc officielle GitHub, 2026* — génération **disponible uniquement en anglais** et résumés **à relire avant publication** : aveu éditeur sur la non-livrabilité directe d'une synthèse générée.

[S-36] **Katalon's 2025 State of Software Quality Report** — https://katalon.com/resources-center/blog/2025-state-of-software-quality-report — *rapport industrie, 1 500 professionnels QA, 2025* — **61 %** des équipes adoptent le testing piloté par IA ; les testeurs qui l'utilisent sont **deux fois plus susceptibles** de craindre d'être remplacés.

[S-37] **Less is More: DocString Compression in Code Generation** — https://arxiv.org/abs/2410.22793 — *papier arXiv (ACM TOSEM), 2024* — ShortenDoc compresse les docstrings de **25 à 40 %** sans dégrader la qualité du code généré : le contexte fourni à un agent de synthèse se taille sans perte.
