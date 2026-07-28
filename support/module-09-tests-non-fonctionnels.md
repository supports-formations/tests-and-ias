# Module M09 — Tests non fonctionnels : performance, sécurité, accessibilité

> **Jour 3** · **Durée : 2 h 00** *(dont Boss J3, 45 min)* · **QA Credits en jeu : 300** *(150 exercices + 150 boss)*
> *Fil rouge : ce qui fera tomber SkyRetail le Black Friday n'est pas une remise mal calculée. C'est une recherche à 4 secondes (BUG-302), un identifiant d'un autre client dans un export RGPD (BUG-401), et un formulaire de suppression de compte inutilisable au clavier (BUG-402). Trois défauts que la suite fonctionnelle ne verra jamais.*

---

## 0. Carte du module

### 0.1 Objectifs pédagogiques

À l'issue de ce module, le·a participant·e sera capable de :

- **Modéliser** une charge réaliste en distinguant modèle ouvert et modèle fermé, et **expliquer** pourquoi un test « N utilisateurs virtuels » ne prouve rien sur la capacité d'une API ;
- **Écrire** un test de charge k6 (TypeScript) ou NBomber (C#) avec des seuils exprimés en p95/p99 exploitables comme quality gate en CI ;
- **Situer** un cas de test de sécurité dans l'**OWASP Top 10:2025** (dont la numérotation a changé) et dans l'**ASVS v5.0.0**, et **combiner** SAST, DAST et analyse de dépendances dans un pipeline ;
- **Distinguer** les obligations WCAG 2.2, RGAA 4.1.2 et European Accessibility Act applicables à un e-commerce français, et **chiffrer** ce que l'automatisation détecte réellement ;
- **Écrire** un test `@axe-core/playwright` et un test de régression visuelle `toHaveScreenshot` avec un seuil calibré et non désactivé ;
- **Classer** 19 échecs de pipeline en quatre catégories et **défendre** ce classement sous contradiction.

### 0.2 Prérequis du module

- M07 : taxonomie de flakiness, dossier d'échec, clustering.
- M08 : pipeline shardé, agent en CI, budget mesuré.
- Outillage non fonctionnel installé (voir `00-setup-technique.md` §4.3) : k6, NBomber, image ZAP, `@axe-core/playwright`, `@axe-core/cli`, Lighthouse.
- Base SkyRetail seedée avec le catalogue étendu (`docker compose --profile perf up -d`, 12 000 produits).

### 0.3 Position dans le fil rouge

| Avant ce module | Après ce module |
|---|---|
| La suite ne teste que le fonctionnel — 0 test de charge, 0 scan, 0 assertion d'accessibilité | Les trois familles non fonctionnelles sont dans le pipeline, avec des seuils chiffrés |
| BUG-302 est invisible : « la recherche est rapide » (1 200 produits en dev) | p95 mesuré à 12 000 produits, courbe de dégradation tracée, seuil de rupture connu |
| BUG-401 est invisible : le test « l'export fonctionne » est vert | Un test de conformité RGPD échoue et nomme le champ fautif |
| BUG-402 est invisible : la page « s'affiche bien » | axe-core trouve le label manquant, un test clavier trouve l'inatteignabilité |
| 19 échecs, aucune méthode de tri | Post-mortem en 4 catégories, pipeline vert sans skip |

### 0.4 Découpage horaire

| Séquence | Contenu | Durée |
|---|---|---|
| S0 | La Carte : ce qui tombe en production | 2 min |
| S1 | **N1** — Performance et charge | 11 min |
| S2 | **N2** — Sécurité applicative | 11 min |
| S3 | **N3** — Accessibilité et régression visuelle | 11 min |
| S4 | 🔍 Exemple A — BUG-302 démasqué par un test de capacité | 6 min |
| S5 | 🔍 Exemple B — BUG-401 et les limites du LLM en sécurité | 4 min |
| S6 | 🔍 Exemple C — BUG-402 : ce qu'axe-core voit et ne voit pas | 4 min |
| S7 | 🧪 Exercices M9-1 à M9-4 | 23 min |
| S8 | 🏆 **Boss J3 — « Le Pipeline Rouge »** | 45 min |
| S9 | Débriefing de journée + scoreboard | 3 min |
| **Total** | **Somme des séquences S0 → S9** | **120 min = 2 h 00** ✅ *conforme à la durée annoncée en en-tête (dont 45 min de Boss J3)* |

> ⏱️ **Régulation du temps.** Les exercices ⭐ et ⭐⭐ sont menés **en parallèle par les squads** (chaque squad n'en traite qu'un des deux, puis restitue en 2 min à l'autre). Les durées cibles indiquées par exercice supposent ce fonctionnement. L'exercice bonus ⭐⭐⭐⭐⭐ est **hors séance**.

### 0.5 Notions couvertes

| # | Notion |
|---|---|
| **N1** | Performance et charge — k6, NBomber, modélisation ouverte/fermée, paliers, percentiles, génération de scénarios par IA |
| **N2** | Sécurité applicative — OWASP Top 10:2025, ASVS v5.0.0, DAST/SAST/SCA, revue de sécurité assistée et ses limites |
| **N3** | Accessibilité et régression visuelle — WCAG 2.2, RGAA 4.1.2, EAA, axe-core et sa couverture réelle, `toHaveScreenshot`, Visual AI |

---

## 1. Partie théorique

### 1.1 Notion N1 — Performance et charge

#### 1.1.1 De quoi parle-t-on

L'ISO/IEC 25010 range l'**efficacité de performance** (*performance efficiency*) parmi les caractéristiques de qualité produit, avec trois sous-caractéristiques : comportement temporel, utilisation des ressources, capacité. Un **test de performance** vérifie ces propriétés sous une charge définie.

Il faut d'emblée séparer trois objets que les stagiaires confondent :

| Objet | Unité de mesure | Outil type | Question posée |
|---|---|---|---|
| **Micro-benchmark** | nanosecondes, allocations | BenchmarkDotNet [S-12] | Cette méthode est-elle plus rapide que cette autre ? |
| **Test de charge** | p95, débit, taux d'erreur | k6 [S-01], NBomber [S-10] | Le système tient-il la charge cible ? |
| **Profilage / observation** | compteurs runtime | `dotnet-counters` [S-13] | Où passe le temps quand ça ralentit ? |

BenchmarkDotNet **refuse de s'exécuter hors configuration Release** [S-12] — garde-fou anti-mesure de code non optimisé. C'est un excellent rappel : un chiffre de performance sans conditions de mesure explicites n'est pas un chiffre.

#### 1.1.2 Ce que dit l'état de l'art

**Le concept qui décide de tout : modèle ouvert vs modèle fermé.** C'est le point que les participants ratent le plus, et il conditionne la validité de tout le reste.

Dans un **modèle fermé** — « 100 utilisateurs virtuels » — les itérations d'un VU ne démarrent que quand la précédente se termine [S-06]. Conséquence : **si le système ralentit, le débit d'arrivée baisse automatiquement**. Le test s'auto-régule et masque la dégradation. C'est la **coordinated omission**, signalée indépendamment par k6 [S-06] et par JMeter, dont le manuel y consacre un avertissement explicite en §16.2 [S-09].

Dans un **modèle ouvert** — « 200 requêtes par seconde » — les arrivées sont indépendantes du temps de réponse. Si le système ralentit, la file grossit : c'est ce qui se passe réellement un jour de Black Friday. k6 implémente le modèle ouvert via **deux exécuteurs** : `constant-arrival-rate` et `ramping-arrival-rate` [S-06]. Gatling expose la même dualité par `injectOpen` / `injectClosed`, avec une API de paliers très lisible : `incrementUsersPerSec(5.0).times(5).eachLevelLasting(10)…` [S-07].

> 🎯 **La phrase à dire.** « Un test à 100 VUs ne mesure pas votre capacité. Il mesure le débit que votre système *accepte de vous donner*. Pour mesurer une capacité, il faut imposer un taux d'arrivée. »

**Les types de test sont normalisés.** k6 publie un tableau qui sert de vocabulaire commun [S-02] :

| Type | Charge | Durée | Ce qu'on cherche |
|---|---|---|---|
| **Smoke** | très faible | secondes à minutes | Le script est-il correct ? |
| **Average-load** | charge nominale | 5-60 min | Le système tient-il l'ordinaire ? |
| **Stress** | au-dessus de la moyenne | 5-60 min | Que se passe-t-il en pic prévisible ? |
| **Spike** | très haute | quelques minutes | Résistance à un pic brutal |
| **Soak** | moyenne | plusieurs heures | Fuites mémoire, dérive |
| **Breakpoint** | croissante jusqu'à rupture | variable | **Où casse-t-on ?** |

Pour BUG-302, le type pertinent est le **breakpoint** : on ne cherche pas à valider un SLO, on cherche le point de rupture en fonction de la taille du catalogue.

**Les percentiles, et pourquoi jamais la moyenne.** Gatling l'écrit sans détour : « variance et écart-type n'ont de sens que sur des distributions gaussiennes, **rarement rencontrées en test de charge** » — les distributions réelles sont multimodales, à valeurs extrêmes ou à longue traîne, et la moyenne arithmétique est très sensible aux outliers [S-08].

| Percentile | Lecture | Usage |
|---|---|---|
| **p50** (médiane) | La moitié des utilisateurs sont mieux servis | Ressenti « normal », pas un SLO |
| **p95** | 1 requête sur 20 est plus lente | **Le seuil de contrat usuel** |
| **p99** | 1 sur 100 | Détecte les longues traînes (GC, verrous) |
| **p99,9** | 1 sur 1 000 | Pertinent au-delà de ~100 000 req/jour |

k6 encode ces seuils directement : `thresholds: { http_req_duration: ['p(95)<200'] }`, avec une sortie console explicite `✓ 'p(95)<200' p(95)=148.21ms`, et — point décisif pour la CI — **un seuil échoué fait sortir k6 avec un code retour non nul** [S-01]. Des seuils par tag sont possibles : `'http_req_duration{type:API}': ['p(95)<500']`. Artillery encode la même chose en YAML via le plugin `ensure` [S-15].

**Où exécuter les tests de charge ?** Grafana donne une réponse contre-intuitive et chiffrée [S-04] : un test de charge dure typiquement **3 à 15 minutes**, et Grafana **déconseille de lancer les gros tests dans un pipeline de déploiement automatique**. La cadence recommandée est : en pré-production **2 à 3 exécutions par jour** ; en production, un **smoke test toutes les 5 minutes** avec alerte après **6 échecs consécutifs**.

Le réflexe « on met le test de charge dans la PR » est donc à combattre. Ce qui va dans la PR, c'est le **smoke de performance** (30 secondes, quelques VUs, vérification que le script tourne et que rien n'a explosé d'un facteur 10). Le test de capacité va en nocturne, sur un environnement dimensionné.

> ⚠️ **À jour au 07/2026** — la documentation k6 a quitté `k6.io/docs` pour `grafana.com/docs/k6/latest/` [S-01], et **k6 est passé en v2.x** (dernière release vérifiée **v2.1.0**) [S-03] : les scripts générés par un LLM à partir de tutoriels v0.4x ou v1.x utilisent des options obsolètes. Autre piège : **`abortOnFail` n'est évalué qu'à intervalle régulier**, l'arrêt pouvant être retardé jusqu'à **60 secondes** — ne pas promettre un « fail fast » instantané.

**L'écosystème .NET.** NBomber permet d'écrire les tests de charge **dans la même solution** que les tests unitaires : `Simulation.Inject(rate: 10, interval: TimeSpan.FromSeconds(1), during: TimeSpan.FromSeconds(30))` est un modèle ouvert à 10 requêtes/seconde pendant 30 secondes, avec intégration CI/CD annoncée via **runners xUnit et NUnit** [S-10]. Le dépôt officiel (dernière release **v6.5.0**) contient les exemples C# dans `examples/Demo` [S-11] — à donner en contexte à Claude Code **plutôt que de laisser le modèle inventer l'API NBomber**.

Pendant le tir, `dotnet-counters` observe le côté serveur : `dotnet-counters collect --process-id <pid> --refresh-interval 3 --format csv`, avec les compteurs .NET 9+ exposés en Meter (`dotnet.gc.pause.time`, `dotnet.thread_pool.queue.length`, `dotnet.monitor.lock_contentions`) [S-13]. C'est ce qui permet de dire *pourquoi* le p95 dérape, et non seulement *qu'il* dérape.

**La génération de scénarios par IA.** L'usage le plus rentable n'est pas « écris-moi un test k6 » — c'est **dériver un profil de charge réaliste à partir des logs d'accès**. La démarche :

1. Extraire du log d'accès (nginx, Application Insights) la distribution des endpoints sur 24 h.
2. Extraire la distribution horaire du trafic (le pic SkyRetail est à 20 h 30, et ×7,5 le Black Friday).
3. Donner au LLM ces deux distributions **agrégées et anonymisées** — pas les logs bruts — et lui demander un scénario `ramping-arrival-rate` respectant les proportions.
4. **Relire** : un LLM produit volontiers des `sleep()` uniformes qui lissent artificiellement la charge, et oublie les corrélations (un `POST /orders` suppose un panier constitué).

> 📘 **Limite assumée du corpus.** Aucun travail académique **spécifique** à la génération de tests de performance par LLM n'a pu être vérifié dans cette collecte. Le seul ancrage vérifié est un cadrage général LLM4SE — une revue systématique de **395 articles** couvrant janvier 2017 à janvier 2024 [S-17]. Il faut donc présenter la génération de scénarios de charge par IA comme une **pratique de terrain**, pas comme un résultat établi.

**Le budget front, l'autre moitié.** Un p95 API à 200 ms ne sert à rien si le bundle Angular fait 3 Mo. web.dev fixe des valeurs de départ : **moins de 5 s de Time to Interactive** et **moins de 170 Ko de ressources du chemin critique** (compressées), calibrées sur un mobile de référence en 3G [S-16]. Les deux budgets — front et back — vivent dans le même pipeline.

#### 1.1.3 Application au contexte SkyRetail — BUG-302

**Le défaut.** `ProductSearchService` réalise un filtrage en mémoire avec une comparaison croisée qui dégénère en **O(n²)** au-delà de 5 000 produits.

```csharp
// backend/SkyRetail.Api/Services/ProductSearchService.cs — état AVANT correction
public IReadOnlyList<Product> Search(string query)
{
    var all = _db.Products.AsNoTracking().ToList();     // ⚠️ 1. tout le catalogue en mémoire
    var terms = Tokenize(query);

    return all
        // ⚠️ 2. pour CHAQUE produit, on reparcourt TOUS les produits pour calculer
        //       un score de pertinence relatif → O(n²)
        .Select(p => new { p, Score = terms.Sum(t => RelevanceAgainstCorpus(p, t, all)) })
        .Where(x => x.Score > 0)
        .OrderByDescending(x => x.Score)
        .Take(50).Select(x => x.p).ToList();
}
```

**Pourquoi personne ne l'a vu.** Le seed de développement contient **1 200 produits**. À 1 200, le p95 est à 180 ms — parfaitement acceptable. À 12 000 (production), il dépasse **4 secondes**. La dégradation n'est pas linéaire, elle est quadratique : **c'est exactement le type de défaut qu'un test fonctionnel ne peut pas détecter**, quel que soit le nombre de cas de test.

**Le protocole de mesure** — un breakpoint sur la taille du catalogue, pas sur le nombre d'utilisateurs :

| Taille du catalogue | p50 attendu | p95 attendu | Verdict |
|---|---|---|---|
| 1 200 | 60 ms | 180 ms | ✅ |
| 3 000 | 140 ms | 520 ms | ✅ |
| 5 000 | 380 ms | 1 400 ms | ⚠️ point d'inflexion |
| 8 000 | 1 100 ms | 2 900 ms | ❌ |
| 12 000 | 2 200 ms | **> 4 000 ms** | ❌ **BUG-302** |

Le seuil de contrat retenu pour SkyRetail est `p(95) < 800` sur `/api/products/search` [S-01]. La correction (index full-text PostgreSQL `tsvector` + `GIN`, filtrage côté base) ramène le p95 à 90 ms à 12 000 produits.

#### 1.1.4 ⚠️ Pièges et anti-patterns

**A1 — Le test de charge en modèle fermé présenté comme un test de capacité.**
*Symptôme* : « on a testé à 200 VUs, ça tient ». Le p95 est bon, la production tombe quand même.
*Cause* : coordinated omission — le débit s'auto-régule quand le système ralentit [S-06], [S-09].
*Contre-mesure* : exécuteurs `constant-arrival-rate` / `ramping-arrival-rate` [S-06], ou `injectOpen` chez Gatling [S-07].

**A2 — Le pilotage à la moyenne.**
*Symptôme* : « temps de réponse moyen : 210 ms », alors qu'un utilisateur sur vingt attend 4 secondes.
*Cause* : les distributions de latence ne sont pas gaussiennes [S-08].
*Contre-mesure* : p95 et p99 dans le contrat, jamais la moyenne. Et un histogramme dans le rapport.

**A3 — Le tir JMeter en interface graphique.**
*Symptôme* : les chiffres du poste de développement ne ressemblent à rien.
*Cause* : le manuel JMeter interdit explicitement les listeners « View Results Tree » / « in Table » pendant le tir et impose le mode CLI (`jmeter -n -t test.jmx -l test.jtl`) [S-09].
*Contre-mesure* : CLI, sortie CSV plutôt que XML, version à jour (jamais plus de 3 versions de retard [S-09]).

**A4 — Le gros test de charge dans la pull request.**
*Symptôme* : le pipeline passe de 13 à 40 minutes ; l'équipe désactive le test au bout d'une semaine.
*Cause* : un test de charge dure 3 à 15 minutes et Grafana **déconseille** de le mettre dans un pipeline de déploiement automatique [S-04].
*Contre-mesure* : smoke de performance en PR (30 s), test de capacité en nocturne, smoke de production toutes les 5 minutes avec alerte après 6 échecs consécutifs [S-04].

#### 1.1.5 📊 Chiffres à retenir

| Chiffre | Signification | Source |
|---|---|---|
| **3 à 15 minutes** | Durée typique d'un test de charge — d'où le refus de le mettre en PR | [S-04] |
| **toutes les 5 min / 6 échecs** | Cadence recommandée du smoke de production et seuil d'alerte | [S-04] |
| **p95 > 4 s à 12 000 produits** | BUG-302 : dégradation quadratique de la recherche full-text | fil rouge |
| **< 170 Ko / < 5 s TTI** | Budget de performance front de départ (mobile de référence, 3G) | [S-16] |
| **jusqu'à 60 s de retard** | Latence maximale de prise en compte de `abortOnFail` chez k6 | [S-01] |

---

### 1.2 Notion N2 — Sécurité applicative

#### 1.2.1 De quoi parle-t-on

Le **test de sécurité applicative** vérifie qu'une application résiste à un usage malveillant. Il se décompose en quatre familles outillées, qui ne trouvent pas les mêmes choses :

| Famille | Sigle | Principe | Trouve | Ne trouve pas |
|---|---|---|---|---|
| Analyse statique | **SAST** | Lit le code sans l'exécuter | Injections, flux de données douteux | Failles de logique métier |
| Analyse dynamique | **DAST** | Attaque l'application en cours d'exécution | En-têtes, XSS réfléchi, config | Ce que le crawler n'atteint pas |
| Analyse de composition | **SCA** | Compare les dépendances aux bases de vulnérabilités | CVE connues | Vulnérabilité inédite |
| Test manuel / pentest | — | Raisonnement humain | **Logique métier, contrôle d'accès** | Rien — mais coûte cher |

BUG-401 appartient à la quatrième ligne. C'est le message central de la notion : **la faille la plus grave de SkyRetail n'est détectable par aucun des trois outils automatiques.**

#### 1.2.2 Ce que dit l'état de l'art

> ⚠️ **À jour au 07/2026 — L'OWASP Top 10:2025 est PUBLIÉ, et toute la numérotation a changé.**
> Ne jamais dire « A03 = Injection » sans préciser l'année.

La 8ᵉ édition est construite sur des données de **plus de 2,8 millions d'applications** ; **589 CWE** ont été analysés, dont **248 répartis dans les 10 catégories** (moyenne de 25 CWE par catégorie, plafond fixé à 40) [S-18]. Le tableau de correspondance à projeter :

| 2021 [S-19] | 2025 [S-18] | Changement |
|---|---|---|
| A01 Broken Access Control | **A01** Broken Access Control | Inchangé — et **absorbe le SSRF** |
| A02 Cryptographic Failures | **A04** | Descend |
| **A03 Injection** | **A05** | ⚠️ **Descend de deux rangs** |
| A04 Insecure Design | **A06** | Descend |
| A05 Security Misconfiguration | **A02** | ⚠️ **Monte de trois rangs** |
| — | **A03 Software Supply Chain Failures** | 🆕 **Nouvelle catégorie** |
| A10 SSRF | *(supprimé)* | ⚠️ **N'existe plus comme catégorie autonome** |
| — | **A10 Mishandling of Exceptional Conditions** | 🆕 **Nouvelle catégorie** |

La nouvelle catégorie **A03:2025 Software Supply Chain Failures** est instructive : elle est classée **#1 par exactement 50 % des répondants** de l'enquête communautaire, alors que seuls **11 CVE** portent les CWE associés [S-20]. Autrement dit, c'est une catégorie créée par le **jugement des praticiens**, pas par les données. L'exemple cité est le ver npm auto-propageant **Shai-Hulud (2025)**, qui a atteint **plus de 500 versions de paquets** avant d'être stoppé.

> 📘 **Incohérence à connaître.** La page A03:2025 annonce dans son texte « the highest average incidence rate at **5,19 %** » alors que le tableau juste en dessous indique **5,72 %**. Citer le tableau [S-20].

**Le Top 10 sensibilise ; l'ASVS teste.** C'est la distinction opérationnelle à faire passer. L'**OWASP ASVS est en version 5.0.0** depuis le **30 mai 2025** — et non plus 4.0.3 d'octobre 2021 — ce qui signifie que **tous les identifiants d'exigences ont changé** [S-21]. Le format de référence est `v<version>-<chapitre>.<section>.<exigence>` : par exemple `v5.0.0-1.2.5` = protection contre l'injection de commandes OS. Un PDF français officiel existe.

L'ASVS fournit des exigences **testables une par une**, ce qui en fait une bien meilleure source de cas de test générés que le Top 10. Le prompt utile n'est pas « génère des tests de sécurité », c'est « pour l'exigence ASVS `v5.0.0-x.y.z`, écris un test xUnit contre `/api/me/export` ».

Il faut aussi couvrir le risque introduit par l'outil de formation lui-même : l'**OWASP Top 10 for LLM Applications & Generative AI (2025)** liste LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM03 Supply Chain, LLM05 Improper Output Handling, LLM06 Excessive Agency, et les nouveautés 2025 **LLM07 System Prompt Leakage** et **LLM08 Vector and Embedding Weaknesses** [S-22]. LLM01 est exactement l'exercice M8-4.

**DAST en CI.** ZAP se pilote entièrement par **un seul fichier YAML** (Automation Framework), avec des jobs `openapi`, `spiderAjax`, `activeScan`, `report` [S-23]. Deux détails opérationnels : le job `openapi` attaque directement le Swagger de l'API .NET, `spiderAjax` crawle la SPA Angular — les deux briques exactes de SkyRetail. Et les **codes de sortie sont normalisés : 0** (plan OK), **1** (erreur), **2** (avertissements) — ZAP sortant en **2 même si `failOnWarning: false`**, ce qui casse un `set -e` naïf.

L'action GitHub officielle [S-24] exécute un ZAP Baseline scan et **maintient automatiquement une issue GitHub** listant les alertes, fermée quand il n'en reste aucune. Les faux positifs se filtrent par un fichier TSV `.zap/rules.tsv` au format `10011 IGNORE (Cookie Without Secure Flag)` — support d'exercice idéal sur le tri des faux positifs.

**SAST.** CodeQL traite le code comme une base de données interrogeable et couvre nativement les deux langages de SkyRetail — **C#** et **JavaScript/TypeScript** ; la documentation précise explicitement que **PHP et Scala ne sont pas supportés** [S-25]. Semgrep est le complément léger : `pipx install semgrep` (Python 3.10+) puis `semgrep ci`, avec un argument de conformité qui compte en entreprise française — **seuls les *findings* sont envoyés à la plateforme, jamais le code** [S-26].

**SCA — et deux pièges d'examen.** Côté .NET, `NuGetAuditMode` vaut **`all` par défaut dès que le projet cible `net10.0` ou supérieur**, sinon `direct` ; les avertissements sont codifiés **NU1901 (low) → NU1904 (critical)** [S-28]. On fait échouer la CI sur les seules vulnérabilités élevées :

```xml
<WarningsAsErrors>$(WarningsAsErrors);NU1903;NU1904</WarningsAsErrors>
```

⚠️ Piège : pour `dotnet list package --vulnerable`, **`--include-transitive` n'est pas activé par défaut** — or la majorité des vulnérabilités NuGet sont transitives [S-28]. Côté npm, `--audit-level=moderate` **change le seuil d'échec sans filtrer le rapport affiché** [S-29] : deuxième piège classique. Enfin, Dependabot ne déclenche une alerte que dans **deux cas** — ajout d'une vulnérabilité à la GitHub Advisory Database, ou modification du graphe de dépendances [S-30] — ce qui explique qu'un scan vert hier soit rouge aujourd'hui **sans changement de code**. C'est un test non déterministe dans le temps, à traiter comme tel.

**Ce que le LLM sait faire en sécurité — et ce qu'il ne sait pas.** Anthropic a introduit une commande `/security-review` couvrant injection SQL, XSS, failles d'authentification/autorisation, données mal manipulées et dépendances vulnérables, et documente **deux prises réelles sur son propre code** : une **RCE exploitable par DNS rebinding** et une **SSRF sur un proxy de credentials**, toutes deux corrigées avant merge [S-31]. L'action associée est *diff-aware* (elle n'analyse que les fichiers modifiés d'une PR), avec un timeout par défaut de **20 minutes** et un filtrage de faux positifs configurable [S-32].

Deux limites, à énoncer aussi fort que les résultats :

1. ⚠️ Le README officiel avertit que **l'action n'est pas durcie contre l'injection de prompt et ne doit servir qu'à relire des PR de confiance** [S-32]. C'est l'exercice M8-4, appliqué à la sécurité.
2. Sur le pentest, PentestGPT mesure un gain de **+228,6 % de complétion de tâches** face au modèle de référence, mais relève que les LLM réussissent les **sous-tâches** (usage d'outils, lecture de sorties) et **échouent à maintenir une vision intégrée du scénario global** [S-33]. C'est précisément ce qu'exige BUG-401.

**Le cadre français.** L'ANSSI publie un guide DevSecOps dans sa collection « Les Essentiels » (v1.0, 13 mars 2024), en précisant que ces documents énoncent des **bonnes pratiques indépendantes et complémentaires**, et non des recommandations techniques détaillées [S-34]. Et le **Guide RGPD de l'équipe de développement** de la CNIL, en **18 fiches**, comporte une fiche **11 « Tester vos applications »** — la seule source française qui relie explicitement tests applicatifs et conformité RGPD (données de test, minimisation) [S-35].

#### 1.2.3 Application au contexte SkyRetail — BUG-401

**Le défaut.** L'export RGPD de l'espace client inclut, dans le champ `referrerId`, **l'identifiant interne d'un autre utilisateur** — celui qui a parrainé le compte.

```csharp
// backend/SkyRetail.Api/Controllers/MeController.cs — état AVANT correction
[HttpGet("export")]
public async Task<IActionResult> Export(CancellationToken ct)
{
    var userId = User.GetUserId();
    var me = await _db.Users
        .Include(u => u.Orders).Include(u => u.Addresses)
        .SingleAsync(u => u.Id == userId, ct);

    // ⚠️ BUG-401 : projection « tout l'objet », sans liste blanche de champs.
    //    `ReferrerId` est l'identifiant INTERNE d'un AUTRE utilisateur.
    //    → divulgation de donnée à caractère personnel d'un tiers.
    return File(JsonSerializer.SerializeToUtf8Bytes(me), "application/json", "export-rgpd.json");
}
```

**Pourquoi les trois familles d'outils passent à côté.**

| Outil | Verdict | Pourquoi |
|---|---|---|
| **SAST** (CodeQL, Semgrep) | ✅ vert | Aucun flux « source non fiable → sink dangereux ». Le code est correct au sens du langage. |
| **DAST** (ZAP) | ✅ vert | La réponse est un 200 avec du JSON bien formé. ZAP n'a aucun oracle sur la propriété des données. |
| **SCA** (NuGet, npm) | ✅ vert | Aucune dépendance n'est en cause. |
| **LLM (`/security-review`)** | ⚠️ variable | Détecte parfois « exposition potentielle de champ interne » ; ne dit **jamais** que c'est l'identifiant d'un tiers, faute de connaître le modèle de données. |
| **Test de conformité écrit par un humain** | ❌ **rouge** | Seul oracle valable : RGPD art. 15 — l'export porte sur les données **de la personne concernée**. |

C'est la démonstration à faire en direct. Elle correspond au constat de PentestGPT : le LLM réussit les sous-tâches et échoue sur la **vision intégrée** [S-33]. Ici, « intégrée » veut dire : comprendre que `ReferrerId` désigne une personne, et que cette personne n'est pas le demandeur.

**Le test qui l'attrape** — l'oracle vient du droit, pas du code :

```csharp
// backend/SkyRetail.Tests/Rgpd/ExportConformiteTests.cs
public class ExportConformiteTests : IClassFixture<SkyRetailFactory>
{
    // Liste blanche dérivée de la fiche 11 du guide CNIL et de l'art. 15 RGPD :
    // l'export ne contient QUE des données relatives à la personne concernée.
    private static readonly string[] ChampsAutorises =
        ["id", "email", "nom", "prenom", "adresses", "commandes", "createdAt", "consentements"];

    [Fact]
    public async Task Export_NeContientAucunIdentifiantDUnTiers()
    {
        var (client, moi, unAutre) = await _factory.WithTwoUsersAsync(parrain: true);
        var json = await client.GetStringAsync("/api/me/export");
        using var doc = JsonDocument.Parse(json);

        // 1. Aucun champ hors liste blanche.
        var champsInattendus = doc.RootElement.EnumerateObject()
            .Select(p => p.Name)
            .Except(ChampsAutorises, StringComparer.OrdinalIgnoreCase)
            .ToArray();
        champsInattendus.Should().BeEmpty(
            "l'export RGPD est une liste blanche, jamais une sérialisation d'entité");

        // 2. Aucun identifiant d'un autre utilisateur, où qu'il soit dans l'arbre.
        json.Should().NotContain(unAutre.Id.ToString(),
            "l'identifiant d'un tiers dans l'export d'une personne est une violation de l'art. 15");
    }
}
```

Deux assertions, deux niveaux : la première est **structurelle** (liste blanche) et empêche toute récidive ; la seconde est **factuelle** et attrape BUG-401 aujourd'hui.

#### 1.2.4 ⚠️ Pièges et anti-patterns

**B1 — Citer une catégorie OWASP sans son millésime.**
*Symptôme* : un rapport de recette mentionne « A03 Injection ».
*Cause* : la numérotation a intégralement changé entre 2021 et 2025 ; Injection est passée de **A03:2021 à A05:2025**, et le **SSRF a disparu** comme catégorie autonome [S-18], [S-19].
*Contre-mesure* : toujours écrire « A05:2025 – Injection ». Et prévoir un exercice de re-mapping, car **la majorité des outils d'audit mappent encore sur 2021**.

**B2 — Le scan vert pris pour une preuve d'absence de faille.**
*Symptôme* : « CodeQL, ZAP et npm audit sont verts, donc c'est sûr ».
*Cause* : ces outils ne portent aucun oracle sur la **logique métier** ni sur le **contrôle d'accès**. BUG-401 en est la démonstration.
*Contre-mesure* : dériver des cas de test des exigences **ASVS v5.0.0** [S-21], testables une par une, et écrire au moins un test de conformité par droit RGPD exercé.

**B3 — `--include-transitive` et `--audit-level` mal compris.**
*Symptôme* : 0 vulnérabilité annoncée, 14 dans la réalité.
*Cause* : `dotnet list package --vulnerable` **n'inclut pas les transitives par défaut** [S-28] ; `npm audit --audit-level` **ne filtre pas le rapport**, il ne change que le seuil du code de sortie [S-29].
*Contre-mesure* : `--include-transitive` explicite ; `WarningsAsErrors` sur NU1903/NU1904 ; lecture du rapport, pas seulement du code retour.

**B4 — Lancer la revue de sécurité IA sur une PR externe.**
*Symptôme* : l'action est branchée sur toutes les PR, y compris celles de contributeurs inconnus.
*Cause* : le README officiel prévient que l'action **n'est pas durcie contre l'injection de prompt** [S-32].
*Contre-mesure* : PR de confiance uniquement ; et les garde-fous architecturaux de M08 (pas d'ingestion de l'entrée hostile, pas de `Bash`, pas de secret).

#### 1.2.5 📊 Chiffres à retenir

| Chiffre | Signification | Source |
|---|---|---|
| **2,8 millions d'applications** | Base de données de l'OWASP Top 10:2025 ; 589 CWE analysés, 248 classés | [S-18] |
| **A03:2021 → A05:2025** | Injection descend de deux rangs ; le SSRF disparaît comme catégorie | [S-18], [S-19] |
| **50 % des répondants** | Placent Software Supply Chain Failures en n°1 — pour **11 CVE** seulement | [S-20] |
| **v5.0.0 depuis le 30/05/2025** | Version courante de l'ASVS : tous les identifiants d'exigences ont changé | [S-21] |
| **+228,6 %** | Gain de complétion de tâches de PentestGPT — mais échec sur la vision globale | [S-33] |

---

### 1.3 Notion N3 — Accessibilité et régression visuelle

#### 1.3.1 De quoi parle-t-on

Les **WCAG 2.2** sont une **Recommandation du W3C du 12 décembre 2024** (la première Recommandation datant d'octobre 2023) ; la page signale explicitement l'existence d'**errata** [S-36]. C'est la norme de référence internationale.

Deux précisions qui évitent des erreurs coûteuses en clientèle :

- **WCAG 3.0 est un Working Draft** (dernière version du 3 mars 2026) : **non normatif, aucune obligation de conformité** [S-37]. Interdire de bâtir un plan de test dessus.
- **En France, la norme opposable reste WCAG 2.1 niveaux A et AA**, via EN 301 549 V2.1.2 référencée par le RGAA [S-40]. Tester en 2.2 est une bonne pratique, pas une obligation.

#### 1.3.2 Ce que dit l'état de l'art

**Le cadre français.** ⚠️ **Le RGAA courant est la version 4.1.2** — et non 4.1 — avec **13 thématiques et 106 critères** de contrôle et leurs tests associés [S-39].

Le champ d'application est chiffré : l'article 47 de la loi n° 2005-102 assujettit les entreprises **à partir de 250 millions d'euros de chiffre d'affaires** (moyenne des 3 derniers exercices), la norme de référence étant **EN 301 549 V2.1.2 (2018-08)**, soit **WCAG 2.1 A et AA** [S-40]. La déclaration d'accessibilité ne connaît que **trois états** : conformité **totale**, **partielle (≥ 50 % des critères)** ou **non-conformité (< 50 % ou absence d'audit valide)** ; sa validité est de **3 ans**, ou **18 mois après publication d'une nouvelle version du référentiel** ; la réponse aux réclamations est due sous **1 semaine**, avec saisine possible du **Défenseur des droits** [S-41].

Le **RGAA 5 est en cours de rédaction, publication prévue fin 2026** : il désignera l'**Arcom** comme autorité de contrôle, créera un téléservice de dépôt des déclarations, et intégrera **WCAG 2.2** ainsi que des critères pour applications mobiles et documents bureautiques [S-42]. Rappel de contexte donné par la même source : **12 à 15 millions de personnes handicapées en France**.

> ⚠️ **À jour au 07/2026** — l'**Arcom n'est pas encore formellement l'autorité de contrôle** : c'est une évolution annoncée du RGAA 5 ; le RGAA 4.1.2 en vigueur renvoie au **Défenseur des droits** [S-42].
> ⚠️ **Ne citez aucun montant de sanction de mémoire.** Le montant du décret n° 2019-768 n'a pas pu être vérifié dans cette collecte (Légifrance ne restitue pas son contenu aux clients non-navigateur) et la page DINUM sur le cadre légal **ne chiffre aucun montant**. À confirmer manuellement avant impression du support.

**Le cadre européen — et pourquoi SkyRetail est concerné.** La directive (UE) 2016/2102 vise le **secteur public** (standard applicable EN 301 549 v3.2.1, qui intègre WCAG 2.1 AA verbatim). L'**European Accessibility Act — directive (UE) 2019/882** vise le secteur **public et privé**, avec WCAG 2.2, et son périmètre inclut explicitement l'**e-commerce**, les services bancaires, les e-books, les smartphones, la billettique et les transports [S-38], [S-43]. Métadonnées vérifiées sur EUR-Lex : document du **17 avril 2019**, publication au JO du **7 juin 2019**, entrée en vigueur le **27 juin 2019** [S-44] ; les États membres devaient transposer **pour juin 2022** [S-43].

L'exemption **microentreprises** est chiffrée : **moins de 10 salariés ET moins de 2 M€** de chiffre d'affaires ou de bilan annuel ; et les sanctions **ne sont pas chiffrées dans la directive**, qui impose seulement des sanctions « effective, proportionate and dissuasive », le montant relevant de chaque État membre [S-45].

> ⚠️ **La date d'application du 28 juin 2025 n'a pas pu être extraite d'une source primaire** dans cette collecte : EUR-Lex ne restitue pas le corps du texte au fetch. Elle figure à l'article 31 de la directive, à lire dans un navigateur avant diffusion [S-44].

**Conclusion pour SkyRetail** : plateforme e-commerce B2C privée → **hors champ du RGAA** si le chiffre d'affaires est sous 250 M€, mais **dans le champ de l'EAA**. C'est un raisonnement de deux minutes que tout·e QA doit savoir tenir.

**Ce que l'automatisation détecte réellement — le chiffre le plus important du module.** axe-core revendique : *« With axe-core, you can find **on average 57 % of WCAG issues automatically** »*, avec **zéro faux positif** revendiqué et **13,1 millions de dépôts dépendants** (release 4.12.0 du 1er juin 2026) [S-46].

Mais l'étude Deque qui produit ce chiffre est plus nuancée [S-54] : sur **13 000+ pages/états et 294 958 problèmes**, **57,38 %** des *problèmes* ont été trouvés automatiquement — **mais seulement 16 des 50 critères de succès WCAG 2.1 AA** ont produit des problèmes automatisés (soit ~32 %, d'où le fameux « 20-30 % » entendu ailleurs). Trois critères sont **100 % manuels** : 2.4.3 Focus Order, 2.4.7 Focus Visible, 1.4.11 Non-text Contrast.

> 📘 **« 57 % » et « 30 % » ne se contredisent pas.** 57,38 % = part des **problèmes** détectés automatiquement. ~32 % = part des **critères de succès** touchés. Toujours préciser l'unité. C'est la source qui réconcilie les deux chiffres [S-54].

⚠️ Et un décompte plus tranchant encore, effectué sur le catalogue de règles axe-core [S-47] : **105 règles documentées**, dont 60 WCAG 2.0 A/AA, **2 WCAG 2.1**, et **une seule règle WCAG 2.2** (`target-size`), plus 27 « best practices », 3 AAA, 7 expérimentales et 5 dépréciées. Autrement dit : **un pipeline « axe vert » ne dit strictement rien de la conformité WCAG 2.2.**

L'ampleur du problème est donnée par le **WebAIM Million 2026** [S-53] : **95,9 % des 1 000 000 pages d'accueil** présentent des échecs WCAG 2 **détectables automatiquement** (en hausse depuis 94,8 % en 2025), avec **56,1 erreurs par page** en moyenne. Six types d'erreurs concentrent **96 %** du total : contraste (83,9 %), alternative textuelle manquante (53,1 %), labels (51 %). Détail contre-intuitif : les pages utilisant ARIA comptent **59,1 erreurs contre 42** sans ARIA.

**L'outillage.** Playwright documente la recette officielle avec **`@axe-core/playwright`** (`AxeBuilder` : `.include()`, `.exclude()`, `.disableRules()`, `.withTags()`), avec filtrage par `withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa'])` — et un encadré *Disclaimer* explicite : *« many accessibility problems can only be discovered through manual testing »* [S-48]. Storybook expose le même moteur via `@storybook/addon-a11y`, avec `parameters.a11y.test` acceptant `'off' | 'todo' | 'error'` — **seul `'error'` fait échouer la CI**, et la **règle `region` est désactivée par défaut** [S-65].

Deux autres outils, deux pièges :

- **Lighthouse** : le score d'accessibilité est une **moyenne pondérée d'audits binaires** (pass/fail, sans point partiel), pondérés 3, 7 ou 10 selon l'impact ; **55 audits** figurent dans le tableau, et les **audits manuels et « best practices » ne comptent pas dans le score** [S-49]. Un **Lighthouse 100 ne prouve rien** et ne doit jamais devenir un KPI contractuel. Lighthouse CI fournit néanmoins un gate versionnable (`lhci autorun`) explicitement annoncé pour « prevent regressions in accessibility » [S-50].
- **pa11y** : deux runners cumulables — `htmlcs` (par défaut) et `axe` — standards WCAG2A/AA/AAA, **exit code 2** en cas d'erreur, `--threshold N` pour tolérer une dette connue [S-51]. Le double runner illustre bien que **deux moteurs ne trouvent pas les mêmes défauts**.

Côté Angular, la documentation officielle (v22) donne les leviers : package CDK **`a11y`** (`LiveAnnouncer` pour les régions `aria-live`, directive **`cdkTrapFocus`**), **Angular Aria** pour les composants headless (accordion, combobox, listbox, menu, tabs, toolbar), `RouterLinkActive` avec **`ariaCurrentWhenActive`**, et l'obligation de **gérer le focus après `NavigationEnd`** [S-52]. Les trois bugs d'accessibilité les plus fréquents d'une SPA Angular sont traités là, avec du code.

**Le pont IA.** Deque publie un **serveur MCP** exposant le moteur axe DevTools et la base Deque University aux agents (Claude Code, Copilot, Cursor, Windsurf, VS Code), avec **revue / acceptation / rejet des correctifs dans l'IDE** [S-55]. C'est le bon modèle : l'agent **propose**, le moteur déterministe **vérifie**.

**Régression visuelle.** Playwright compare des captures : le nom du golden est `example-test-1-chromium-darwin.png`, le suffixe navigateur+plateforme étant ajouté automatiquement « car les captures diffèrent entre navigateurs et plateformes du fait du rendu, des polices, etc. » ; l'encadré d'avertissement liste OS, version, réglages, matériel, **source d'alimentation (batterie vs secteur)** et mode headless comme causes de variation [S-56].

Le paramètre qui compte est `threshold` [S-57] : c'est une **différence de couleur perçue en espace YIQ**, entre 0 (strict) et 1 (laxiste), **valeur par défaut `0.2`**. `maxDiffPixels` et `maxDiffPixelRatio` sont **non définis par défaut**, `animations: "disabled"` et `caret: "hide"` sont les défauts, le masque est rose `#FF00FF` et `scale: "css"`.

> ⚠️ **Confusion classique.** Le `threshold: 0.2` de Playwright n'est **pas** le `misMatchThreshold: 0.1` de BackstopJS. Le premier est une **tolérance colorimétrique par pixel**, le second un **pourcentage de pixels différents sur l'image** [S-57], [S-63]. Les deux « seuils » ne mesurent pas la même chose.

La réponse au problème des snapshots dépendants de l'OS est l'**image Docker officielle** `mcr.microsoft.com/playwright:v1.62.0-noble` : on génère et on rejoue les baselines dans le même conteneur qu'en CI ; `--ipc=host` est recommandé sous peine de crash mémoire de Chromium, et **Alpine/musl n'est pas supporté** [S-58].

Face au diff pixel, la comparaison **perceptuelle**. Applitools décrit son moteur Visual AI comme « un réseau de **centaines d'algorithmes** » mêlant règles codées et apprentissage profond, ayant analysé **plus d'un milliard d'images** [S-59] ; son Ultrafast Grid annonce **30× plus rapide** et une réduction de maintenance d'un facteur **3,8×** en uploadant des **DOM snapshots** (pas des captures) rendus en parallèle dans des conteneurs [S-60]. Percy apporte le workflow d'approbation (auto-approbation par défaut sur la branche principale, **builds du plan gratuit expirés au bout de 30 jours** contre **1 an d'historique** ailleurs) [S-61]. Chromatic est le seul à **chiffrer le coût** : un snapshot capturé = **1 facturé**, un turbosnap copié depuis la baseline = **0,2** ; un Storybook de 50 stories dont 10 impactées coûte **18 snapshots** (10 × 1 + 40 × 0,2) [S-62]. Et son guide de débogage liste les causes d'instabilité visuelle : fenêtre de capture de **15 secondes**, viewport par défaut **900 px**, **emojis rendus sous Linux** (« aucune solution de contournement »), polices web chargées tardivement [S-64].

#### 1.3.3 Application au contexte SkyRetail — BUG-402

**Le défaut**, déjà croisé en M07 :

```html
<!-- frontend/src/app/account/delete-account.component.html — v4.0, AVANT correction -->
<span class="field-hint">Confirmez la suppression de votre compte</span>
<input id="confirm-delete" type="text" [(ngModel)]="confirmation" />
<div class="btn btn--danger" (click)="onDelete()">Fermer mon compte</div>
```

Deux défauts distincts, et c'est tout l'intérêt du cas :

| Défaut | Critère | Détecté par axe-core ? |
|---|---|---|
| Champ sans `<label for>` associé | WCAG 1.3.1 / 4.1.2 · RGAA 11.1 | ✅ **Oui** — règle `label` |
| `<div>` cliquable sans rôle ni `tabindex` → inatteignable au clavier | WCAG 2.1.1 · RGAA 7.3 | ❌ **Non** de façon fiable — l'ordre de focus est **100 % manuel** [S-54] |

**Il faut donc deux tests, pas un.**

```ts
// e2e/a11y/delete-account.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('F4 — suppression de compte, accessibilité', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mon-compte/suppression');
  });

  // ── Test 1 : ce qu'axe SAIT détecter (≈ 57 % des problèmes, ~32 % des critères) [S-54]
  test('aucune violation axe de niveau critique ou sérieux', async ({ page }) => {
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])   // norme opposable en France [S-40]
      .analyze();

    const bloquantes = violations.filter((v) => ['critical', 'serious'].includes(v.impact ?? ''));
    expect(
      bloquantes.map((v) => `${v.id} → ${v.nodes.length} nœud(s)`),
      'violations bloquantes',
    ).toEqual([]);
  });

  // ── Test 2 : ce qu'axe NE détecte PAS — l'atteignabilité au clavier.
  //    2.4.3 Focus Order et 2.4.7 Focus Visible sont 100 % manuels selon Deque [S-54].
  test('le bouton de suppression est atteignable et activable au clavier', async ({ page }) => {
    await page.getByRole('textbox').first().focus();
    await page.keyboard.type('SUPPRIMER');

    // On tabule au maximum 10 fois : le contrôle doit être atteint.
    let atteint = false;
    for (let i = 0; i < 10 && !atteint; i++) {
      await page.keyboard.press('Tab');
      atteint = await page.evaluate(() =>
        (document.activeElement?.textContent ?? '').includes('mon compte'),
      );
    }
    expect(atteint, 'le contrôle de suppression doit être dans l\'ordre de tabulation').toBe(true);

    await page.keyboard.press('Enter');
    await expect(page.getByRole('alert')).toContainText(/compte.*supprim/i);
  });
});
```

**La correction** rend les deux tests verts et respecte les recommandations Angular [S-52] :

```html
<label for="confirm-delete">Confirmez la suppression de votre compte</label>
<input id="confirm-delete" type="text" [(ngModel)]="confirmation"
       aria-describedby="confirm-help" />
<p id="confirm-help">Saisissez SUPPRIMER pour confirmer.</p>
<button type="button" class="btn btn--danger"
        [disabled]="confirmation !== 'SUPPRIMER'"
        (click)="onDelete()">Fermer mon compte</button>
```

#### 1.3.4 ⚠️ Pièges et anti-patterns

**C1 — « axe est vert, donc c'est conforme. »**
*Symptôme* : une déclaration d'accessibilité fondée sur un rapport axe.
*Cause* : axe détecte **57 % des problèmes** mais ne touche que **16 des 50 critères** WCAG 2.1 AA [S-54], et **une seule règle** relève de WCAG 2.2 [S-47].
*Contre-mesure* : audit manuel obligatoire sur les critères non automatisables ; et une déclaration RGAA suppose un audit valide couvrant les **106 critères** [S-39], [S-41].

**C2 — Le score Lighthouse comme KPI contractuel.**
*Symptôme* : « objectif : 100 en accessibilité » dans un cahier des charges.
*Cause* : audits binaires, pondérés, avec les audits manuels et « best practices » **exclus du calcul** [S-49].
*Contre-mesure* : contractualiser sur des **critères RGAA/WCAG nommés**, pas sur un score composite.

**C3 — Le seuil de régression visuelle relevé jusqu'à ce que ça passe.**
*Symptôme* : `threshold: 0.6`. Plus aucun test visuel n'échoue.
*Cause* : confusion entre tolérance colorimétrique (Playwright, YIQ, défaut **0,2**) et pourcentage de pixels (BackstopJS, défaut **0,1**) [S-57], [S-63] ; et méconnaissance des vraies causes d'instabilité.
*Contre-mesure* : traiter la cause — conteneur identique en local et en CI [S-58], `animations: 'disabled'`, masques sur les zones volatiles, `<link rel="preload">` sur les polices [S-64] — puis **redescendre** le seuil.

**C4 — Générer les baselines visuelles sur le poste de développement.**
*Symptôme* : tous les snapshots échouent en CI, jamais en local.
*Cause* : le rendu dépend de l'OS, des polices, du matériel — et même de la **source d'alimentation** [S-56] ; les **emojis sont rendus différemment sous Linux**, sans contournement possible [S-64].
*Contre-mesure* : générer et rejouer dans l'image Docker officielle Playwright [S-58]. Le suffixe `-chromium-darwin` du nom de fichier est un avertissement, pas un détail.

#### 1.3.5 📊 Chiffres à retenir

| Chiffre | Signification | Source |
|---|---|---|
| **106 critères, 13 thématiques** | RGAA **4.1.2** — version courante (pas 4.1) ; RGAA 5 annoncé pour fin 2026 | [S-39], [S-42] |
| **57,38 % des problèmes / 16 critères sur 50** | Ce que l'automatisation détecte réellement — deux unités de mesure différentes | [S-54] |
| **1 seule règle WCAG 2.2** (`target-size`) sur 105 | Couverture axe-core de WCAG 2.2 : quasi nulle | [S-47] |
| **95,9 %** des 1 M pages d'accueil | Taux d'échec WCAG 2 détectable automatiquement (56,1 erreurs/page) | [S-53] |
| **`threshold` = 0,2 par défaut (YIQ)** | Tolérance colorimétrique de `toHaveScreenshot` — ≠ % de pixels | [S-57] |

---

## 2. Trois exemples concrets

### 🔍 Exemple A — BUG-302 démasqué par un test de capacité *(démonstration guidée, 6 min)*

**Contexte.** « La recherche est rapide, on l'a testée. » Elle l'est — sur 1 200 produits.

**Ce qu'on montre.** Qu'un test en modèle fermé aurait conclu que tout va bien, et qu'un test en modèle ouvert révèle la rupture.

**Le script k6** — noter les deux scénarios opposés :

```ts
// perf/search-breakpoint.ts — k6 v2.x  (⚠️ doc sur grafana.com/docs/k6/latest [S-01])
import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';

const dureeRecherche = new Trend('recherche_duree', true);

export const options = {
  scenarios: {
    // ❌ CE QU'ON FAIT D'HABITUDE — modèle FERMÉ.
    //    Si l'API ralentit, le débit baisse tout seul : coordinated omission. [S-06] [S-09]
    ferme_trompeur: {
      executor: 'constant-vus', vus: 50, duration: '2m', exec: 'chercher',
      tags: { modele: 'ferme' },
    },
    // ✅ CE QU'IL FAUT FAIRE — modèle OUVERT, paliers de taux d'arrivée. [S-06]
    ouvert_breakpoint: {
      executor: 'ramping-arrival-rate',
      startTime: '2m',
      startRate: 20, timeUnit: '1s',
      preAllocatedVUs: 50, maxVUs: 500,
      stages: [
        { target: 40,  duration: '1m' },   // trafic nominal
        { target: 80,  duration: '1m' },   // pic du soir
        { target: 150, duration: '1m' },   // Black Friday
        { target: 300, duration: '1m' },   // au-delà : on cherche la rupture
      ],
      exec: 'chercher',
      tags: { modele: 'ouvert' },
    },
  },
  thresholds: {
    // Un seuil échoué fait sortir k6 avec un code retour NON NUL. [S-01]
    'http_req_duration{modele:ouvert}': ['p(95)<800', 'p(99)<2000'],
    'http_req_failed{modele:ouvert}': ['rate<0.01'],
  },
};

export function chercher() {
  const res = http.get(`${__ENV.BASE_URL}/api/products/search?q=chaussure+running`, {
    tags: { name: 'search' },
  });
  dureeRecherche.add(res.timings.duration);
  check(res, {
    'statut 200': (r) => r.status === 200,
    'au moins 1 résultat': (r) => (r.json('items') as unknown[]).length > 0,
  });
}
```

**Résultats sur SkyRetail (catalogue à 12 000 produits).**

```
scenario: ferme_trompeur   (constant-vus 50)
  http_req_duration.......: avg=980ms  p(50)=910ms  p(95)=1.62s   ← « ça passe, non ? »
  http_reqs...............: 3 061   25.5/s          ← ⚠️ débit RÉEL bien plus bas que prévu
  iterations..............: 3 061

scenario: ouvert_breakpoint (ramping-arrival-rate 20→300/s)
  http_req_duration.......: avg=3.41s  p(50)=2.20s  p(95)=4.87s  p(99)=9.12s
  http_req_failed.........: 6.42 % ✗  'rate<0.01'
  ✗ 'p(95)<800' p(95)=4870.12ms
  ✗ 'p(99)<2000' p(99)=9121.44ms
  running (05m00.0s), exit status 99
```

**Analyse critique.**

*Ce que le modèle fermé raconte.* Un p95 à 1,62 s : mauvais, mais pas alarmant. Et surtout un **débit observé de 25,5 requêtes/seconde** alors qu'on croyait « tester avec 50 utilisateurs ». Le test s'est auto-limité : le système a imposé son rythme. **C'est la coordinated omission en une ligne de sortie** [S-06], [S-09].

*Ce que le modèle ouvert révèle.* p95 à **4,87 s**, p99 à **9,12 s**, **6,42 % d'erreurs**, et un code de sortie non nul exploitable directement en CI [S-01]. On voit aussi *où* ça casse : la courbe décroche entre les paliers 80/s et 150/s.

*Ce que l'IA a bien fait, et raté.* Sur ce cas, une génération naïve de script k6 par LLM produit systématiquement quatre défauts, à faire chercher aux participants :

1. Un scénario `constant-vus` — le modèle fermé, parce que c'est la forme la plus représentée dans les tutoriels.
2. Un `sleep(1)` uniforme entre les itérations, qui lisse artificiellement la charge.
3. Des seuils sur la **moyenne** (`avg<500`) — contredit par Gatling sur la non-normalité des distributions [S-08].
4. Des options de **k6 v0.4x/v1.x**, obsolètes depuis le passage en v2.x [S-03].

Il faut donc lui donner le contexte : la version installée, la page « open vs closed » [S-06], et l'exigence explicite « exécuteur à taux d'arrivée, seuils en percentiles ».

*Le côté serveur, pour dire pourquoi.* Pendant le tir :

```bash
dotnet-counters collect --process-id $(pgrep -f SkyRetail.Api) \
  --refresh-interval 3 --format csv --output artifacts/counters.csv
# Observé : dotnet.thread_pool.queue.length monte à 340 ; dotnet.gc.pause.time × 6.
# Diagnostic : le thread pool est saturé par des requêtes qui matérialisent
# tout le catalogue en mémoire (O(n²) côté CPU + pression GC). [S-13]
```

*Ce qu'on retient.* Un test de charge sans exécuteur à taux d'arrivée ne mesure pas une capacité. Et la courbe de dégradation en fonction du **volume de données** est un axe de test à part entière — celui que la suite fonctionnelle, exécutée sur un seed de 1 200 lignes, ne pourra jamais explorer.

---

### 🔍 Exemple B — BUG-401 et les limites du LLM en sécurité *(4 min)*

**Contexte.** On soumet `MeController.cs` à quatre analyses successives et l'on compare les verdicts.

**Déroulé.**

```bash
# 1. SAST — CodeQL couvre nativement C# [S-25]
gh codeql database create db --language=csharp && gh codeql database analyze db --format=sarif-latest
# → 0 alerte sur MeController.cs

# 2. SAST léger — Semgrep [S-26]
semgrep ci --config auto backend/SkyRetail.Api/Controllers/MeController.cs
# → 0 finding

# 3. DAST — ZAP, job `openapi` sur le Swagger de l'API [S-23]
docker run --rm -v $(pwd)/zap:/zap/wrk ghcr.io/zaproxy/zaproxy:stable \
  zap.sh -cmd -autorun /zap/wrk/plan.yaml
# → exit 2 (avertissements) : 3 alertes d'en-têtes, 0 sur /api/me/export

# 4. Revue de sécurité assistée [S-31] [S-32]
claude -p "/security-review" --bare --allowedTools "Read Grep Glob"
```

**Sortie typique de la revue assistée (condensée).**

```
🟡 MeController.Export — sérialisation directe de l'entité `User`
   Une projection explicite est préférable : l'entité peut contenir des champs
   internes (clés techniques, horodatages, indicateurs) non destinés à l'export.
   Suggestion : introduire un DTO ExportDto.
```

**Analyse critique.**

*Ce que l'IA a bien fait.* Elle est la **seule des quatre** à avoir signalé quelque chose. Le diagnostic « sérialisation directe d'entité » est juste, générique et correct, et la contre-mesure proposée (DTO explicite) **aurait effectivement corrigé BUG-401**. Sur ses propres bases de code, Anthropic documente deux prises réelles de ce type — une RCE par DNS rebinding et une SSRF sur un proxy de credentials, corrigées avant merge [S-31].

*Ce qu'elle a raté — et c'est l'essentiel.* Elle a classé l'alerte en **🟡 Nit**. Elle n'a **pas** dit :

- que `ReferrerId` désigne **une autre personne physique** ;
- que l'export est un **droit d'accès au sens de l'article 15 du RGPD**, et que sa portée est juridiquement bornée à la personne concernée ;
- que la conséquence est une **violation de données à caractère personnel**, notifiable.

Pour dire cela, il aurait fallu connaître le modèle de données **et** le cadre juridique **et** faire le lien entre les deux. C'est exactement la limite mesurée sur PentestGPT : les LLM réussissent les sous-tâches et **échouent à maintenir une vision intégrée du scénario global** [S-33].

*L'expérience à faire en direct.* Relancer la revue en ajoutant **une ligne** de contexte :

```
Contexte métier obligatoire : cette application est soumise au RGPD.
`User.ReferrerId` est l'identifiant interne d'un AUTRE utilisateur (le parrain).
L'endpoint /api/me/export implémente le droit d'accès de l'article 15.
```

Le verdict passe de 🟡 à 🔴, avec une analyse correcte. **Le modèle n'a pas changé, le contexte a changé.** C'est le cœur du Jour 2 (context engineering) appliqué à la sécurité, et l'argument le plus solide en faveur d'un fichier `.claude/commands/security-review.md` maison, enrichi des exigences ASVS v5.0.0 [S-21], [S-32].

*Ce qu'on retient.* Trois règles :

- Un scan vert n'est **pas** une preuve d'absence de faille : SAST, DAST et SCA n'ont aucun oracle sur la **logique métier** et le **contrôle d'accès**.
- Le LLM est le meilleur des quatre outils **sur ce cas précis**, et reste insuffisant seul — et l'action officielle n'est **pas durcie contre l'injection de prompt** [S-32].
- Le seul oracle valable pour BUG-401 est **juridique** : RGPD art. 15, fiche 11 du guide CNIL [S-35]. Un oracle qui ne se trouve pas dans le code.

---

### 🔍 Exemple C — Ce qu'axe-core voit et ne voit pas *(4 min)*

**Contexte.** On exécute axe-core sur la page de suppression de compte v4.0 (BUG-402) et l'on confronte le résultat à un audit manuel de 3 minutes.

**Sortie d'`@axe-core/playwright`.**

```
2 violations (wcag2a, wcag2aa, wcag21a, wcag21aa)

  [serious] label — Form elements must have labels
     → input#confirm-delete
     helpUrl: <lien Deque University fourni par axe-core, règle `label`>  [S-46]

  [moderate] color-contrast — Elements must have sufficient contrast
     → .field-hint  (ratio 3.9:1, requis 4.5:1)

0 violations of impact "critical"
```

**Audit manuel, 3 minutes, une tabulation.**

| Constat | Critère | axe l'a vu ? |
|---|---|---|
| Champ sans `<label>` | WCAG 1.3.1 / 4.1.2 · RGAA 11.1 | ✅ oui |
| Contraste du texte d'aide à 3,9:1 | WCAG 1.4.3 · RGAA 3.2 | ✅ oui |
| **Le contrôle « Fermer mon compte » n'est pas dans l'ordre de tabulation** | WCAG **2.1.1** · RGAA 7.3 | ❌ **non** |
| **Aucun indicateur de focus visible sur le champ** | WCAG **2.4.7** | ❌ **non** — critère 100 % manuel [S-54] |
| **Aucun message d'alerte annoncé après suppression** | WCAG 4.1.3 | ❌ **non** |

**Analyse critique.**

*Ce qu'axe fait très bien.* Deux violations réelles, sans faux positif — le projet revendique **zéro faux positif** [S-46] — avec un lien de documentation exploitable et un niveau d'impact. En 40 millisecondes, sans intervention. Le rapport WebAIM montre d'ailleurs que ces deux familles (contraste 83,9 %, labels 51 %) concentrent l'essentiel des erreurs du web réel [S-53].

*Ce qu'il ne peut pas faire.* Les trois lignes rouges du tableau sont les **plus graves** : un formulaire de suppression de compte inatteignable au clavier est inutilisable, pas seulement inconfortable. Or l'ordre de focus (2.4.3) et la visibilité du focus (2.4.7) sont **100 % manuels** selon l'étude Deque [S-54]. Et le décompte des règles est sans appel : **une seule règle axe relève de WCAG 2.2** sur 105 [S-47].

*Le piège du chiffre.* Un participant dira « donc axe couvre 57 % ». Il faut répondre précisément : **57,38 % des problèmes**, mais **16 des 50 critères** WCAG 2.1 AA — soit ~32 % [S-54]. Sur SkyRetail, axe a trouvé **2 problèmes sur 5**, soit 40 %. La statistique est cohérente ; la conclusion opérationnelle est qu'**il faut les deux**.

*L'apport de l'IA, bien cadré.* Le serveur MCP axe de Deque [S-55] permet de faire corriger les violations par un agent dans l'IDE, avec **acceptation ou rejet explicite** de chaque correctif, puis re-vérification par `@axe-core/playwright`. C'est le bon modèle : **l'agent propose, le moteur déterministe tranche**. Exactement l'inverse du self-healing silencieux de M07.

*Ce qu'on retient.* Un pipeline d'accessibilité tient en trois étages : (1) axe-core en gate bloquant sur critical/serious ; (2) **un test clavier explicite** par parcours critique ; (3) un audit manuel des critères non automatisables, tracé dans la déclaration d'accessibilité [S-41]. Le premier étage seul donne un faux sentiment de conformité.

---

## 3. Quatre exercices

### 🧪 Exercice M9-1 — « Le premier seuil — et la borne oubliée » 🎯

| | |
|---|---|
| **Difficulté** | ⭐ |
| **Durée cible** | 5 min |
| **Modalité** | individuel |
| **Matériel** | `perf/`, API démarrée sur `http://localhost:5080`, k6 installé, `docs/openapi.yaml` |
| **QA Credits** | 10 |

**Énoncé**
Écrivez un smoke de performance k6 sur `GET /api/products` : 5 VUs pendant 30 secondes, avec un seuil `p(95) < 300` et un seuil de taux d'erreur `< 1 %`. Le scénario doit appeler **deux** URL : la page nominale `?page=1&size=20`, et la **borne hors domaine** `?page=-1`, pour laquelle `docs/openapi.yaml` spécifie un `400 Bad Request`. Exécutez, relevez le code de sortie, puis **abaissez le seuil de latence jusqu'à le faire échouer** et vérifiez que le code de sortie devient non nul.

**✅ Résultat attendu**
- [ ] `perf/smoke-products.ts` existe et déclare `thresholds` avec **`p(95)`** — pas `avg`.
- [ ] Le scénario contient un `check` sur `?page=-1` qui **exige `status === 400`** ; ce check est **rouge** : l'API renvoie **500** — c'est **BUG-301**, consigné comme tel.
- [ ] Première exécution : sortie console contenant `✓ 'p(95)<300'` et le `✗ statut 400 sur page négative`, `echo $?` renvoie une valeur **non nulle** (le seuil `checks` a sauté, pas le seuil de latence).
- [ ] Seconde exécution (seuil de latence abaissé) : sortie contenant `✗ 'p(95)<…'` et `echo $?` **non nul**.
- [ ] `boss-j3/perf-smoke.md` consigne les deux codes de sortie, le p95 mesuré, **et la fiche BUG-301** : URL, statut obtenu, statut spécifié, ligne de `docs/openapi.yaml` qui fait foi.
- **Invalide** : seuil exprimé sur la moyenne ; ou code de sortie non relevé ; ou `?page=-1` absent du scénario ; ou l'écart 500/400 constaté mais **non consigné** comme défaut ; ou script utilisant une option obsolète de k6 v0.4x/v1.x.

**💡 Indice** *(après 2 min)*
La syntaxe exacte est `thresholds: { http_req_duration: ['p(95)<300'] }` [S-01]. Le code de sortie non nul est **le** mécanisme qui transforme un test de charge en quality gate CI — sans lui, le job reste vert quoi qu'il arrive. Pour la borne : un `check()` ne fait **pas** échouer k6 par lui-même ; il faut un seuil `checks: ['rate==1.00']`. Et un `500` n'est pas « une erreur de plus » : `400` dit « ta requête est invalide », `500` dit « je me suis cassé » — ce n'est pas le même contrat, ni la même page d'incident à 3 h du matin.

**🔑 Solution de référence**

```ts
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 5, duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<300'],   // percentile, jamais la moyenne [S-08]
    http_req_failed:   ['rate<0.01'],
    checks:            ['rate==1.00'],  // sans ce seuil, un check rouge ne casse pas le job
  },
};

export default function () {
  http.get(`${__ENV.BASE_URL}/api/products?page=1&size=20`);

  // Borne hors domaine : le contrat OpenAPI spécifie 400. L'API renvoie 500 → BUG-301.
  const res = http.get(`${__ENV.BASE_URL}/api/products?page=-1`);
  check(res, { 'statut 400 sur page négative': (r) => r.status === 400 });
}
```

Fiche de défaut attendue dans `boss-j3/perf-smoke.md` :

> **BUG-301** — `GET /api/products?page=-1` renvoie **500 Internal Server Error**.
> Attendu : **400 Bad Request** (`docs/openapi.yaml`, réponse `400` déclarée sur `/products`).
> Impact : une borne non validée remonte en exception non gérée — bruit d'astreinte, fuite
> potentielle de détail technique dans le corps de la réponse (à recouper avec M9-2, A10:2025).

**🎓 Ce que l'exercice enseigne vraiment**
Qu'un test de performance ne devient un **test** qu'au moment où il porte un seuil et un code de sortie. Sans cela, c'est une mesure — utile, mais qui n'échoue jamais, donc qui ne protège de rien. Et qu'un scénario de charge est le **plus mauvais endroit où découvrir** un défaut fonctionnel comme BUG-301 : il aurait dû tomber en test de contrat (M2) ou en fuzzing (M3). Qu'il n'y soit pas tombé est l'information la plus utile de l'exercice.

---

### 🧪 Exercice M9-2 — « Le scan et ses faux positifs »

| | |
|---|---|
| **Difficulté** | ⭐⭐ |
| **Durée cible** | 6 min |
| **Modalité** | binôme (rotation Pilote/Copilote) |
| **Matériel** | `docs/openapi.yaml`, image `ghcr.io/zaproxy/zaproxy:stable`, `zap/plan.yaml` |
| **QA Credits** | 20 |

**Énoncé**
Exécutez un scan ZAP en Automation Framework sur l'API SkyRetail (job `openapi` sur le Swagger). Triez les alertes : pour chacune, décidez **vrai positif** ou **faux positif**, avec une justification en une ligne. Matérialisez les faux positifs dans `.zap/rules.tsv`. Puis re-mappez chaque vrai positif sur l'**OWASP Top 10:2025** — et non 2021.

**✅ Résultat attendu**
- [ ] `zap/plan.yaml` contient au minimum les jobs `openapi`, `activeScan` et `report`.
- [ ] `boss-j3/scan-securite.md` liste les alertes avec 5 colonnes : *ID · Alerte · VP/FP · Justification · Catégorie **2025***.
- [ ] Chaque catégorie citée porte son millésime (`A05:2025 – Injection`, pas « A03 »).
- [ ] `.zap/rules.tsv` contient au moins **une** ligne `IGNORE` au format `<id> IGNORE (<motif>)`, justifiée dans le document.
- [ ] Le document explique le **code de sortie** obtenu par ZAP (**0**, **1** ou **2**) et pourquoi un `set -e` naïf casse ici.
- **Invalide** : toutes les alertes classées en faux positif ; ou numérotation OWASP sans année ; ou aucune justification.

**💡 Indice** *(après 3 min)*
ZAP sort en **code 2 même si `failOnWarning: false`** [S-23] : il faut donc traiter explicitement ce code dans le script. Et pour le re-mapping : **Injection est passée de A03:2021 à A05:2025**, **Security Misconfiguration de A05:2021 à A02:2025**, et le **SSRF n'existe plus** comme catégorie autonome [S-18], [S-19].

**🔑 Solution de référence**

```yaml
# zap/plan.yaml
env:
  contexts: [{ name: skyretail, urls: ["http://host.docker.internal:5080"] }]
jobs:
  - type: openapi          # attaque directement le Swagger de l'API .NET [S-23]
    parameters: { apiFile: "/zap/wrk/openapi.yaml", targetUrl: "http://host.docker.internal:5080" }
  - type: activeScan
    parameters: { context: skyretail, maxRuleDurationInMins: 3 }
  - type: report
    parameters: { template: "traditional-json", reportFile: "zap-report.json" }
```

```bash
set -o pipefail                 # mais PAS set -e brut : ZAP sort en 2 sur avertissement [S-23]
docker run --rm -v "$PWD/zap:/zap/wrk" ghcr.io/zaproxy/zaproxy:stable zap.sh -cmd -autorun /zap/wrk/plan.yaml
rc=$?; case $rc in 0) echo "OK";; 2) echo "::warning::avertissements ZAP";; *) exit "$rc";; esac
```

Tri typique sur SkyRetail : 3 vrais positifs (en-tête `Content-Security-Policy` absent → **A02:2025 Security Misconfiguration** ; cookie sans `Secure` → A02:2025 ; message d'erreur détaillé sur `/api/products?page=-1` → **A10:2025 Mishandling of Exceptional Conditions**, et c'est BUG-301) et 2 faux positifs liés au serveur de développement.

**🎓 Ce que l'exercice enseigne vraiment**
Que le travail de sécurité n'est pas de lancer un scanner mais de **trier sa sortie**, et que la classification a une valeur de communication : dire « A02:2025 » à un développeur lui donne une famille de contre-mesures, alors que « alerte 10038 » ne lui donne rien. Et que la numérotation change — ce qui condamne les supports non datés.

---

### 🧪 Exercice M9-3 — « Le mur des 5 000 produits »

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐ |
| **Durée cible** | 6 min |
| **Modalité** | squad |
| **Matériel** | `perf/`, `docker compose --profile perf`, `ProductSearchService.cs`, `dotnet-counters` |
| **QA Credits** | 40 |

**Énoncé**
Tracez la **courbe de dégradation** de `/api/products/search` en fonction de la taille du catalogue : 1 200, 3 000, 5 000, 8 000 et 12 000 produits. Vous devez utiliser un exécuteur à **taux d'arrivée** et non un nombre de VUs, et corréler au moins une métrique serveur. Identifiez le point d'inflexion et **qualifiez** la complexité observée (linéaire ? quadratique ?).

**✅ Résultat attendu**
- [ ] `boss-j3/courbe-bug302.md` contient un tableau *Taille du catalogue · p50 · p95 · p99 · taux d'erreur*, avec **5 points** mesurés.
- [ ] Le script k6 utilise `constant-arrival-rate` ou `ramping-arrival-rate` — `constant-vus` seul est refusé.
- [ ] Le point d'inflexion est identifié et **justifié par les chiffres** (le rapport p95(12 000)/p95(1 200) est calculé et comparé au rapport des tailles).
- [ ] Au moins une métrique serveur est jointe (`dotnet.thread_pool.queue.length` ou `dotnet.gc.pause.time`), relevée pendant le tir [S-13].
- [ ] Le document conclut explicitement : « la dégradation est **supra-linéaire** », avec le calcul à l'appui.
- [ ] Le document énonce pourquoi aucun test fonctionnel n'aurait pu détecter ce défaut.
- **Invalide** : mesures en modèle fermé uniquement ; ou moins de 4 points ; ou conclusion « c'est lent » sans qualification de la complexité.

**💡 Indice** *(après 3 min)*
Le raisonnement tient en une division. Le catalogue est multiplié par **10** (1 200 → 12 000). Si le p95 est multiplié par ~10, c'est linéaire. S'il est multiplié par **~27**, ce n'est pas linéaire — et l'ordre de grandeur oriente vers un O(n²) tempéré par les caches. Servez-vous de `dotnet-counters` pour dire *où* part le temps [S-13].

**🔑 Solution de référence**

| Catalogue | p50 | p95 | p99 | Erreurs | Ratio p95 / base |
|---|---|---|---|---|---|
| 1 200 | 60 ms | 180 ms | 310 ms | 0 % | ×1 |
| 3 000 | 140 ms | 520 ms | 900 ms | 0 % | ×2,9 |
| 5 000 | 380 ms | 1 400 ms | 2 300 ms | 0 % | ×7,8 |
| 8 000 | 1 100 ms | 2 900 ms | 5 100 ms | 0,4 % | ×16,1 |
| 12 000 | 2 200 ms | **4 870 ms** | 9 120 ms | 6,4 % | **×27,1** |

Catalogue × 10 → p95 × 27,1. Une dégradation linéaire aurait donné ×10. On est en régime **supra-linéaire**, cohérent avec un `Select` imbriqué sur la collection complète : c'est **BUG-302**. Côté serveur, `dotnet.thread_pool.queue.length` monte à 340 et `dotnet.gc.pause.time` est multiplié par 6 — le CPU est saturé, pas le réseau ni la base.

Correction : index full-text PostgreSQL (`tsvector` + index `GIN`), filtrage et tri **côté base**, pagination réelle. p95 mesuré après correction : **90 ms à 12 000 produits**.

**🎓 Ce que l'exercice enseigne vraiment**
Que le **volume de données** est une dimension de test à part entière, au même titre que le nombre d'utilisateurs. Et qu'un test fonctionnel — quel qu'en soit le nombre — exécuté sur un seed de 1 200 lignes ne peut structurellement pas détecter une complexité algorithmique. C'est le meilleur argument, en formation, pour ne pas réduire la QA au fonctionnel.

---

### 🧪 Exercice M9-4 — « Le vert trompeur » 🎯

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐⭐ |
| **Durée cible** | 6 min (+ 5 min de Contre-Test) |
| **Modalité** | squad |
| **Matériel** | `frontend/src/app/account/`, `e2e/a11y/`, `@axe-core/playwright`, `MeController.cs` |
| **QA Credits** | 80 |

**Énoncé**
Le parcours F4 (espace client) est **vert** : la suite fonctionnelle passe, axe-core ne remonte aucune violation `critical`, ZAP est propre, le rapport Lighthouse affiche **100** en accessibilité.

Il contient pourtant **deux défauts graves** : BUG-401 (fuite de l'identifiant d'un tiers dans l'export RGPD) et BUG-402 (formulaire de suppression inatteignable au clavier).

Trois livrables :

1. **Écrire les deux tests qui échouent** — un test de conformité RGPD en C#, un test clavier en TypeScript. Aucun des deux ne doit dépendre d'axe-core ni d'un scanner.
2. **Démontrer** que les outils automatiques ne les trouvent pas : produire les sorties de CodeQL/Semgrep, ZAP, axe-core et Lighthouse sur la page fautive, avec leurs verdicts.
3. **Documenter l'oracle** de chacun des deux tests : d'où vient le résultat attendu ? La réponse « du code » est interdite, et invalide l'exercice.

**✅ Résultat attendu**
- [ ] `backend/SkyRetail.Tests/Rgpd/ExportConformiteTests.cs` contient un test **rouge** sur `formation/j3-pipeline-rouge`, avec **deux assertions** : liste blanche de champs **et** absence de l'identifiant d'un autre utilisateur.
- [ ] `e2e/a11y/delete-account.spec.ts` contient un test **rouge** qui atteint le contrôle de suppression **uniquement au clavier** (`Tab` puis `Enter`), sans aucun `page.click()`.
- [ ] `boss-j3/vert-trompeur.md` contient un tableau *Outil · Verdict · Pourquoi il ne voit pas* pour **au moins 4 outils**, chacun avec la sortie réelle jointe.
- [ ] Le document cite le chiffre **57,38 % des problèmes / 16 critères sur 50** avec sa source, et explique pourquoi un Lighthouse à 100 ne vaut pas conformité [S-49], [S-54].
- [ ] L'oracle de chaque test est nommé : **RGPD art. 15** (et/ou fiche 11 du guide CNIL [S-35]) pour BUG-401 ; **WCAG 2.1.1 / RGAA 7.3** pour BUG-402. Une exigence **ASVS v5.0.0** citée avec son identifiant `v5.0.0-x.y.z` vaut bonus.
- [ ] Les deux tests deviennent **verts** après correction, et la correction est présentée en diff sans être commitée sur la branche de départ.
- **Invalide** : test rendu rouge en modifiant du code de production ; oracle « dérivé du code » ; ou test clavier utilisant un `click()` ; ou moins de 4 outils confrontés.

**💡 Indice** *(après 4 min)*
Pour BUG-401, la question n'est pas « l'export fonctionne-t-il ? » mais **« à qui appartient chaque donnée exportée ? »**. Créez deux utilisateurs, l'un parrainé par l'autre, et cherchez l'identifiant du second dans l'export du premier — une simple recherche de sous-chaîne suffit. Pour BUG-402, n'utilisez que `keyboard.press('Tab')` : si vous devez cliquer pour atteindre le bouton, l'utilisateur au clavier aussi — et il ne peut pas.

**🔑 Solution de référence**

Les deux tests figurent en §1.2.3 et §1.3.3. Le tableau de confrontation attendu :

| Outil | Verdict | Pourquoi il ne voit pas |
|---|---|---|
| **CodeQL / Semgrep** (SAST) | ✅ vert | Aucun flux source→sink dangereux ; le code est correct au sens du langage [S-25], [S-26] |
| **ZAP** (DAST) | ✅ vert sur `/api/me/export` | 200 + JSON bien formé ; ZAP n'a aucun oracle sur la **propriété** des données [S-23] |
| **npm audit / NuGet audit** (SCA) | ✅ vert | Aucune dépendance en cause [S-28], [S-29] |
| **axe-core** | 2 violations, **0 critical** | L'ordre de focus (2.4.3) et la visibilité du focus (2.4.7) sont **100 % manuels** [S-54] ; une seule règle axe relève de WCAG 2.2 [S-47] |
| **Lighthouse** | **100** | Audits binaires pondérés ; **audits manuels et best practices exclus du calcul** [S-49] |
| **`/security-review`** | 🟡 Nit | Signale la sérialisation d'entité mais ignore la portée juridique — limite de la « vision intégrée » [S-33] |
| **Test de conformité humain** | ❌ **rouge** | Oracle externe au code : RGPD art. 15 et WCAG 2.1.1 |

**🎓 Ce que l'exercice enseigne vraiment**

Trois choses, dans cet ordre.

1. **Le vert n'est pas une preuve.** Six outils verts et deux défauts graves. La question de la QA n'est pas « les outils sont-ils verts ? » mais « **quel oracle ont-ils appliqué ?** ». Un outil sans oracle sur la propriété des données ne peut pas détecter une fuite de données.
2. **La limite de l'IA est ici structurelle, pas conjoncturelle.** Le LLM a été le meilleur des outils automatiques sur BUG-401 — et il a classé l'alerte en « Nit ». Il lui manquait la sémantique métier (`ReferrerId` désigne une personne) et le cadre juridique (l'article 15 borne la portée de l'export). Aucune amélioration de modèle ne comble cela seule : c'est au **contexte** de le fournir, et le contexte est un choix humain.
3. **Les oracles non fonctionnels sont ailleurs.** Ils sont dans un règlement européen, dans une recommandation W3C, dans un référentiel DINUM. C'est ce qui rend ces tests robustes : leur résultat attendu ne bougera pas parce que quelqu'un a refactoré une classe.

**Exercice bonus ⭐⭐⭐⭐⭐** — Ajoutez la régression visuelle sur le tunnel F2 avec `toHaveScreenshot`, en générant les baselines dans l'image Docker officielle Playwright [S-58]. Calibrez `threshold` **en le baissant** (pas en le montant) après avoir traité les causes d'instabilité (animations, polices, contenus datés). Documentez la différence entre `threshold` (YIQ, Playwright) et `misMatchThreshold` (% de pixels, BackstopJS) [S-57], [S-63], puis chiffrez ce que coûterait la même couverture chez Chromatic (1 snapshot capturé = 1, turbosnap = 0,2) [S-62].

---

## 4. 🏆 Boss J3 — « Le Pipeline Rouge » *(45 min, 150 QAC)*

### 4.1 Mise en situation *(à lire à voix haute)*

> **22 h 40.** La branche `release/v4.0` est rouge. **47 tests, 19 en échec.** Le go-live est demain à 8 h.
>
> Vous n'avez le droit ni de supprimer un test, ni de le passer en `[Skip]` ou `test.skip`.
> Le directeur technique vous demande un **post-mortem** et un **pipeline vert** — dans cet ordre.

### 4.2 Déroulé imposé

| Phase | Durée | Attendu |
|---|---|---|
| **P1 — Collecte** | 5 min | `git checkout formation/j3-pipeline-rouge`, exécution complète, récupération de `results.xml` et des traces |
| **P2 — Clustering** | 5 min | Normalisation des 19 messages (méthode M07 exemple B) → 5 à 7 clusters |
| **P3 — Classement** | 15 min | Chaque échec rangé dans **une** des 4 catégories, avec un **discriminant exécuté** |
| **P4 — Correction** | 15 min | Pipeline vert, sans `skip`, sans suppression, sans `retries` global |
| **P5 — Restitution** | 5 min | `boss-j3/post-mortem.md` + soutenance de 2 min par squad |

### 4.3 Livrable

Un fichier `boss-j3/post-mortem.md` classant les **19 échecs** — identifiés **E-01 à E-19** dans le
corrigé — en **quatre catégories** :

| Catégorie | Effectif attendu | Définition opérationnelle |
|---|---|---|
| **Vrai bug produit** | **4** | Le défaut est dans le code de production. Corriger le test ne protège pas l'utilisateur. |
| **Test faux** | **6** | Assertion erronée ou donnée périmée. Le produit est conforme à la spécification. |
| **Flaky** | **7** | Résultat variable à code et données constants. |
| **Environnement** | **2** | L'échec suit le runner, pas le test. |

Chaque ligne doit porter : *nom du test · catégorie · cause racine · discriminant exécuté (commande) · correctif · fichier touché*.

### 4.4 Barème *(150 points)*

| Critère | Points |
|---|---|
| Pipeline vert sans `skip` ni suppression de test | **50** |
| Classement des échecs : **3 pts × 19 échecs** (E-01 → E-19), un seul classement par échec, plafond **57** | **57** |
| Cause racine de **BUG-202** identifiée — et **non contournée** par un `waitForTimeout` | **30** |
| Temps de pipeline réduit **sous 20 minutes** | **13** |
| **Malus** : ajout d'un `retry` global pour masquer la flakiness | **−60** |
| **Bonus** : avoir remarqué que **E-08**, présumé « environnement », est en réalité un test faux | +20 |

> 🧮 **Comment appliquer les 57 points.** Le corrigé énumère **exactement 19 lignes**, une par échec,
> et chaque échec appartient à **une et une seule** catégorie. Le formateur compare ligne à ligne le
> `post-mortem.md` du squad au tableau d'index de §4.6 : **3 points par identifiant correctement
> catégorisé**, 0 sinon, **sans point négatif**. 19 × 3 = **57**, le plafond est donc atteint
> uniquement par un sans-faute. Un échec regroupé par le squad avec un autre (« ces deux-là, c'est
> la même chose ») compte pour **un seul** identifiant classé : c'est la règle qui évite les
> décomptes ambigus.

### 4.5 🔑 Corrigé complet — les 19 échecs, un par un

> 🧭 **Deux populations à ne pas confondre — à dire avant de distribuer le corrigé.**
>
> | | Suite historique (`main`) | Branche du boss (`formation/j3-pipeline-rouge`) |
> |---|---|---|
> | **Volume** | 47 tests, dont **12 marqués flaky** et 9 en `[Skip]` depuis 14 mois | 47 tests, **19 en échec** sur l'exécution du soir |
> | **Origine** | Dette laissée par l'équipe QA partie ; travaillée en **M07** | Instantané fabriqué pour le boss ; travaillé **ici** |
> | **Rôle de BUG-202** | **Cause racine de 7 des 12 flaky** (cf. `00-fil-rouge` §3.1 et M07 §1.2.3) | **Cause racine d'un seul échec, E-01**, classé « vrai bug produit » |
> | **Catégorie « flaky »** | les 12 tests de la quarantaine | **7 échecs** parmi les 19, sans recouvrement d'identifiants avec les 12 |
>
> Les deux « 7 » du support **ne désignent pas les mêmes tests**. Un squad qui transpose « 7 flaky =
> BUG-202 » depuis M07 vers le boss se trompe sur 6 des 7 lignes. La branche du boss a été construite
> avec **un seul** test de non-régression sur BUG-202 (E-01) : c'est lui qui vaut les 30 points.

#### Catégorie 1 — Vrai bug produit — **4 échecs** (E-01 → E-04)

Le défaut est dans le code de production : corriger le test ne protège pas l'utilisateur.
Discriminant : **le test est juste, et il a raison d'être rouge.**

| ID | Test | Symptôme (message d'exécution) | Cause racine | Action correcte |
|---|---|---|---|---|
| **E-01** | `PaymentE2E.BoutonDesactiveApresSoumission` | `expect(locator).toBeDisabled() timed out` | **BUG-202** — `debounceTime(400)` retarde l'état de soumission ; le bouton reste actif 400 ms | `submitting.set(true)` **synchrone** + `exhaustMap` côté Angular **et** clé d'idempotence côté API |
| **E-02** | `SearchPerfTests.P95SousLeSeuil` | `p(95)=4870ms > 800ms` | **BUG-302** — recherche full-text en O(n²) au-delà de 5 000 produits | Index `tsvector` + `GIN`, filtrage et tri côté base ; seuil rejoué avec le même exécuteur à taux d'arrivée |
| **E-03** | `ExportConformiteTests.PasDIdentifiantDeTiers` | `Expected string not to contain "8f3c…"` | **BUG-401** — sérialisation directe de l'entité `User`, `ReferrerId` inclus dans l'export RGPD | DTO d'export en **liste blanche** ; test structurel de non-régression sur le schéma de l'export |
| **E-04** | `A11yTests.SuppressionAtteignableAuClavier` | `expected true, received false` | **BUG-402** — `<div>` cliquable sans rôle ni `tabindex`, `<label for>` supprimé à la refonte v4.0 | `<button>` + `<label for>` ; `cdkTrapFocus` sur la modale ; assertion axe-core conservée |

> 🎯 **Point de barème (30 pts).** Le squad doit démontrer que la correction de **E-01** touche **le code de production** et non le test, et qu'un `waitForTimeout(500)` laisse le défaut intact côté utilisateur. La preuve attendue est le test `double-submit.spec.ts` de M7-4, rouge avant correction, vert après, **sans temporisation**.
>
> ⚠️ **E-01 est le seul échec de la branche imputable à BUG-202.** Les 6 autres échecs du tunnel F2 (E-09, E-11, E-12, E-17 et, par ricochet lexical, E-02 et E-04) partagent son *template* de message mais **pas** sa cause. Voir l'encadré des deux populations ci-dessus.

#### Catégorie 2 — Test faux — **6 échecs** (E-05 → E-10)

Le produit est conforme ; c'est le test qui affirme une contre-vérité.
Discriminant : **le test échoue 10 fois sur 10** — un test faux n'est jamais flaky.

| ID | Test | Symptôme (message d'exécution) | Cause racine | Action correcte |
|---|---|---|---|---|
| **E-05** | `DiscountEngineTests.PlafondRemise25Pourcent` | `Expected: 25 Actual: 30` | Donnée périmée : le CDC v4.0 §3.2 porte le plafond à **30 %** ; le test date de la v3.9 | Corriger l'assertion et **citer** `CDC v4.0 §3.2` en commentaire du test |
| **E-06** | `ProductApiTests.CatalogueContient1200Produits` | `Expected: 1200 Actual: 1500` | Donnée périmée : le seed du catalogue est passé à **1 500** | Assertion sur une **propriété** (`> 0`, pagination cohérente), pas sur un *magic number* |
| **E-07** | `OrderTotalTests.PortGratuitDes50Euros` | `Expected: 0 Actual: 4.90` | Seuil de franco de port passé à **60 €** en v4.0 | Corriger et **paramétrer** le seuil depuis la configuration, pas en dur dans le test |
| **E-08** | `OrderRepositoryTests.CommandeRetrouveeParId` | `connect ECONNREFUSED 127.0.0.1:5432` | **Faux ami** : la chaîne de connexion est **codée en dur** dans le test au lieu d'être lue sur la fixture Testcontainers, qui expose un port dynamique. Échoue **10/10 sur tous les runners, et aussi en local** | Lire `fixture.ConnectionString` ; interdire toute chaîne littérale par une règle d'analyse |
| **E-09** | `CheckoutE2E.LibelleBoutonValider` | `expected "Valider" received "Payer"` | Le libellé v4.0 est « Payer » ; le test attend « Valider » | `getByRole('button', { name: /payer/i })` et **valider le libellé auprès du métier** |
| **E-10** | `TvaTests.TauxReduit` | `Expected: 10.55 Actual: 10.06` | Erreur d'unité dans le test : `5.5` utilisé comme 5,5 au lieu de 0,055 | Corriger le calcul **du test** et ajouter un cas paramétré par taux |

> ⚠️ **Piège de barème n° 1.** **E-05** tente les squads : « c'est un bug, le moteur applique 30 % alors que le test dit 25 % ». Non — c'est **le test** qui est périmé, et le CDC fait foi. Confondre les deux, c'est appliquer 25 % en production. Un squad qui reclasse E-05 en « bug produit » perd 3 points.
>
> 🎓 **Bonus de +20 points — E-08.** Le message `ECONNREFUSED` le fait ressembler à de l'environnement, et c'est ainsi qu'il est classé par la quasi-totalité des squads. Le discriminant qui le démasque tient en une commande : il échoue **aussi hors CI**, sur le poste du participant, **10 fois sur 10**. Un échec d'environnement, par définition, **suit le runner**. Les squads qui l'attrapent gagnent 20 points.

#### Catégorie 3 — Flaky — **7 échecs** (E-11 → E-17)

Discriminant : **résultat variable à code et données constants**, sur au moins 10 exécutions.
Correctif : **jamais un `retry`** — toujours la suppression de la source de variabilité.

| ID | Test | Symptôme (message d'exécution) | Cause racine (taxonomie M07) · discriminant exécuté | Action correcte |
|---|---|---|---|---|
| **E-11** | `CheckoutE2E.RedirectionConfirmation` | `Timed out waiting for expect(page).toHaveURL` | **Attente implicite** · `--repeat-each=10` → 3/10 | Remplacer `waitForTimeout` par `waitForResponse` + assertion d'état |
| **E-12** | `OrderHistoryE2E.HistoriqueA3Lignes` | `expected 3 received 4` | **Ordre d'exécution** (*state leak*) · passe seul, échoue en suite | Fabriquer les données **dans** le test ; isolation par utilisateur dédié |
| **E-13** | `SearchApiTests.PaginationConcurrente` | `connect ECONNREFUSED 127.0.0.1:5432` | **Concurrence** : le pool de connexions est épuisé par le parallélisme, pas par le runner · `--workers=1` → 0/10 | Réduire la portée du parallélisme ; collection xUnit dédiée ; dimensionner le pool |
| **E-14** | `OrderExpiryTests.CommandeExpireApres30Jours` | `Expected date 2026-08-27T00:00:00Z to equal 2026-08-26T22:00:00Z` | **Fuseau horaire** · `TZ=Pacific/Auckland` → 10/10 d'échec | Injecter `TimeProvider`, figer l'horloge, raisonner en UTC |
| **E-15** | `SeedTests.CatalogueInitial` | `relation "orders" does not exist` | **Ressource partagée** : base commune entre shards, un shard voisin rejoue le schéma en cours de route · échoue selon l'ordonnancement des shards | Un conteneur **par classe** (Testcontainers), plus de base partagée |
| **E-16** | `ReportTests.RapportHebdo` | `Expected date 2026-07-27T00:00:00Z to equal 2026-07-20T00:00:00Z` | **Donnée dépendante du calendrier** · échoue le lundi uniquement | Fixer la date de référence dans le test ; tester la fonction de bornage, pas « aujourd'hui » |
| **E-17** | `CartE2E.PanierPersisteApresRefresh` | `Timed out waiting for locator('.cart__line-a3f9')` | **Sélecteur DOM instable** · casse après chaque rebuild (classe CSS générée) | `getByRole` / `data-testid` — **pas** de self-healing (cf. M07 Exemple C) |

> ⚠️ **Malus de −60 points.** Un `retries: 3` global verdit **les sept** en une ligne. Il verdit aussi **E-01** (BUG-202) et masque un défaut de production. C'est la raison d'être du malus, et le débriefing doit le dire explicitement.
>
> 📌 **Sept causes, sept correctifs.** Les 7 flaky de la branche ont **7 causes distinctes** — c'est délibéré : le boss vérifie la maîtrise de la taxonomie de M07, pas la répétition d'un seul diagnostic. C'est l'inverse exact de la suite historique, où **une** cause (BUG-202) en explique 7.

#### Catégorie 4 — Environnement — **2 échecs** (E-18, E-19)

Discriminant : **l'échec suit le runner, pas le test.** Il disparaît sur un autre runner
ou après remise en état de l'infrastructure, **sans toucher une ligne de code ni de test**.

| ID | Test | Symptôme (message d'exécution) | Cause racine | Action correcte |
|---|---|---|---|---|
| **E-18** | `IntegrationFixture.ConnexionAuServeurDeTest` | `connect ECONNREFUSED 127.0.0.1:5432` | Le service PostgreSQL du job n'est **pas prêt** au démarrage de la suite ; le port 5432 est par ailleurs occupé sur ce runner | `services:` avec `--health-cmd pg_isready` **et** attente explicite ; ports dynamiques via Testcontainers |
| **E-19** | `MigrationTests.SchemaAJour` | `relation "orders" does not exist` | Migration EF Core non jouée avant les tests dans le job du soir | Étape `dotnet ef database update` dans le job, ou `EnsureCreated` en fixture |

> 🪤 **Piège de barème n° 2 — les trois `ECONNREFUSED`.** La branche en contient **trois** (E-08, E-13, E-18), rangés dans **trois catégories différentes**. Le squad qui classe le cluster entier en « environnement » marque **3 points sur 9**. Le discriminant tient en deux commandes : rejouer hors CI (E-08 échoue quand même → test faux) et rejouer `--workers=1` (E-13 passe → flaky). Seul E-18 disparaît en changeant de runner.

### 4.6 Index des 19 échecs — grille de correction

Tableau de référence du formateur : **3 points par ligne correctement catégorisée**, 57 au total.
La dernière colonne réconcilie le corrigé avec le clustering de **M07 Exemple B** (6 clusters).

| ID | Test | Catégorie | Cluster M07 |
|---|---|---|---|
| E-01 | `PaymentE2E.BoutonDesactiveApresSoumission` | Vrai bug produit (BUG-202) | 1 |
| E-02 | `SearchPerfTests.P95SousLeSeuil` | Vrai bug produit (BUG-302) | 1 |
| E-03 | `ExportConformiteTests.PasDIdentifiantDeTiers` | Vrai bug produit (BUG-401) | 6 |
| E-04 | `A11yTests.SuppressionAtteignableAuClavier` | Vrai bug produit (BUG-402) | 1 |
| E-05 | `DiscountEngineTests.PlafondRemise25Pourcent` | Test faux | 2 |
| E-06 | `ProductApiTests.CatalogueContient1200Produits` | Test faux | 2 |
| E-07 | `OrderTotalTests.PortGratuitDes50Euros` | Test faux | 2 |
| E-08 | `OrderRepositoryTests.CommandeRetrouveeParId` | Test faux *(faux ami « environnement », +20)* | 3 |
| E-09 | `CheckoutE2E.LibelleBoutonValider` | Test faux | 1 |
| E-10 | `TvaTests.TauxReduit` | Test faux | 2 |
| E-11 | `CheckoutE2E.RedirectionConfirmation` | Flaky — attente implicite | 1 |
| E-12 | `OrderHistoryE2E.HistoriqueA3Lignes` | Flaky — ordre d'exécution | 1 |
| E-13 | `SearchApiTests.PaginationConcurrente` | Flaky — concurrence | 3 |
| E-14 | `OrderExpiryTests.CommandeExpireApres30Jours` | Flaky — fuseau horaire | 5 |
| E-15 | `SeedTests.CatalogueInitial` | Flaky — ressource partagée | 4 |
| E-16 | `ReportTests.RapportHebdo` | Flaky — donnée calendaire | 5 |
| E-17 | `CartE2E.PanierPersisteApresRefresh` | Flaky — sélecteur instable | 1 |
| E-18 | `IntegrationFixture.ConnexionAuServeurDeTest` | Environnement | 3 |
| E-19 | `MigrationTests.SchemaAJour` | Environnement | 4 |

**Contrôle de somme : 4 + 6 + 7 + 2 = 19 échecs · 7 + 4 + 3 + 2 + 2 + 1 = 19 (clusters 1 à 6).**
Aucune ligne ne regroupe plusieurs tests : un identifiant = un test = 3 points.

### 4.7 Grille de synthèse à afficher au débriefing

```
19 échecs (branche formation/j3-pipeline-rouge)
├── 4 vrais bugs produit   ← E-01..E-04 : BUG-202, BUG-302, BUG-401, BUG-402
├── 6 tests faux           ← E-05..E-10 : le produit est conforme, l'assertion ne l'est pas
├── 7 flaky                ← E-11..E-17 : 7 causes distinctes, 0 retry
└── 2 environnement        ← E-18, E-19 : l'échec suit le runner

Trois ECONNREFUSED, trois catégories : E-08 (test faux), E-13 (flaky), E-18 (environnement).
Un seul échec porte BUG-202 : E-01. Les 7 flaky de BUG-202 sont sur `main`, pas ici.

Le seul chiffre à retenir : 4 défauts sur 19 échecs.
Un pipeline rouge ne dit pas combien de bugs vous avez.
Il dit combien de questions vous devez poser.
```

---

## 5. Débriefing

### 5.1 Les 5 erreurs les plus fréquentes sur ce module

1. **Tester la charge en modèle fermé.** « 100 VUs » n'est pas une capacité : le débit s'auto-régule quand le système ralentit [S-06], [S-09]. Toujours un exécuteur à taux d'arrivée pour un test de capacité.
2. **Piloter à la moyenne.** Les distributions de latence ne sont pas gaussiennes [S-08]. p95 et p99, jamais `avg`.
3. **Citer une catégorie OWASP sans son millésime.** Injection est passée de **A03:2021 à A05:2025** et le SSRF a disparu comme catégorie [S-18], [S-19].
4. **Prendre « axe vert » ou « Lighthouse 100 » pour une conformité.** 57,38 % des problèmes, **16 critères sur 50** [S-54], **une seule règle WCAG 2.2** sur 105 [S-47], et un score Lighthouse qui exclut les audits manuels du calcul [S-49].
5. **Monter le seuil de régression visuelle jusqu'à ce que ça passe.** On traite les causes d'instabilité — conteneur identique [S-58], animations désactivées, polices préchargées [S-64] — puis on **redescend** le seuil.

### 5.2 Questions de contrôle

**Q1 — Pourquoi un test « 200 VUs » ne prouve-t-il rien sur la capacité de l'API ?**
*Réponse* : parce qu'en modèle fermé, une nouvelle itération ne démarre qu'à la fin de la précédente [S-06]. Si l'API ralentit, le débit d'arrivée baisse mécaniquement : le test masque la dégradation. C'est la **coordinated omission**, signalée indépendamment par k6 [S-06] et JMeter [S-09]. Pour mesurer une capacité, il faut imposer un **taux d'arrivée** (`constant-arrival-rate` / `ramping-arrival-rate`).

**Q2 — SkyRetail est un e-commerce privé à 180 M€ de chiffre d'affaires. Quelles obligations d'accessibilité ?**
*Réponse* : **hors du champ du RGAA**, dont l'assujettissement des entreprises commence à **250 M€** de chiffre d'affaires [S-40]. Mais **dans le champ de l'European Accessibility Act**, qui vise le secteur privé et cite explicitement l'e-commerce [S-43] ; l'exemption ne concerne que les microentreprises (**< 10 salariés et < 2 M€**) [S-45]. Les sanctions ne sont pas chiffrées par la directive, elles relèvent du droit national [S-45].

**Q3 — Notre pipeline affiche 0 violation axe-core. Peut-on écrire « conforme WCAG 2.2 » ?**
*Réponse* : **non.** axe-core compte **105 règles documentées, dont une seule relève de WCAG 2.2** (`target-size`) [S-47], et l'automatisation ne touche que **16 des 50 critères** WCAG 2.1 AA [S-54]. Une déclaration RGAA suppose un audit valide sur les **106 critères** du référentiel 4.1.2 [S-39], [S-41].

**Q4 — Pourquoi aucun scanner n'a détecté BUG-401 ?**
*Réponse* : parce qu'aucun ne dispose d'un oracle sur la **propriété des données**. SAST ne voit pas de flux dangereux [S-25], DAST voit un 200 bien formé [S-23], SCA ne voit aucune dépendance en cause [S-28]. Le LLM signale la sérialisation d'entité mais la classe en « Nit », faute de vision intégrée — limite mesurée sur PentestGPT [S-33]. L'oracle est **juridique** : article 15 du RGPD, fiche 11 du guide CNIL [S-35].

**Q5 — Faut-il mettre le test de charge dans la pull request ?**
*Réponse* : **non pour le test de capacité.** Il dure 3 à 15 minutes et Grafana déconseille explicitement de le placer dans un pipeline de déploiement automatique [S-04]. La répartition recommandée : **smoke de performance en PR** (30 s), **test de capacité en nocturne** (2 à 3 exécutions/jour en pré-production), **smoke de production toutes les 5 minutes** avec alerte après 6 échecs consécutifs [S-04].

### 5.3 Ce qu'on retient

- Un test de charge n'est un **test** que s'il porte un seuil en percentile et sort en code non nul [S-01]. Et il ne mesure une **capacité** que s'il impose un taux d'arrivée [S-06].
- **Le vert n'est pas une preuve.** Sur F4, six outils verts et deux défauts graves : la bonne question n'est pas « les scanners passent-ils ? » mais « **quel oracle ont-ils appliqué ?** ».
- La numérotation **OWASP a changé en 2025** ; l'**ASVS est en v5.0.0** ; le **RGAA courant est 4.1.2** — trois faits qui périment la moitié des supports en circulation.
- L'automatisation d'accessibilité détecte **57,38 % des problèmes** mais seulement **16 critères sur 50** [S-54] : la question à poser au client est toujours *« 57 % de quoi ? »*.
- Sur 19 échecs de pipeline, **4 sont des défauts produit**. Un pipeline rouge ne dit pas combien de bugs vous avez : il dit combien de questions vous devez poser.

### 5.4 Transition vers le module suivant

Le pipeline est vert, rapide, et couvre enfin ce qui fait tomber la production. La Task Force a un dossier de preuves.

Reste la question que posera le comité demain matin : **« Ces 340 tests, qui les maintient dans six mois quand le modèle aura changé de version ? »** Le Jour 4 ouvre sur la gouvernance, la dérive, la conformité — et le Go/No-Go.

---

## 6. Sources

### Sources de la notion N1 — Performance et charge

[S-01] **Thresholds — Grafana k6 documentation** — https://grafana.com/docs/k6/latest/using-k6/thresholds/ — *documentation officielle, doc « latest », consultée juillet 2026* — syntaxe `thresholds: { http_req_duration: ['p(95)<200'] }`, sortie `✓ 'p(95)<200' p(95)=148.21ms`, et surtout : **un seuil échoué fait sortir k6 avec un code retour non nul** ; seuils par tag possibles. ⚠️ `abortOnFail` n'est évalué qu'à intervalle régulier — arrêt retardé jusqu'à **60 secondes**.

[S-02] **Load test types — Grafana k6 documentation** — https://grafana.com/docs/k6/latest/testing-guides/test-types/ — *guide officiel, doc « latest »* — tableau normatif : Smoke, Average-load, **Stress (5-60 min)**, Soak (plusieurs heures), Spike (quelques minutes), Breakpoint (montée jusqu'à rupture) — le vocabulaire commun à poser avant d'écrire le premier script.

[S-03] **k6 — dépôt officiel Grafana** — https://github.com/grafana/k6 — *dépôt GitHub, dernière release **v2.1.0*** — binaire Go, scripts JS ; ⚠️ le passage en **v2.x** rend obsolètes les options des tutoriels v0.4x/v1.x, ce qui est exactement l'erreur que produit un LLM entraîné sur des contenus antérieurs.

[S-04] **Automated performance testing — Grafana k6** — https://grafana.com/docs/k6/latest/testing-guides/automated-performance-testing/ — *guide officiel, doc « latest »* — un test de charge dure **3 à 15 minutes**, d'où le **déconseil explicite de lancer les gros tests dans un pipeline de déploiement automatique** ; en pré-production 2 à 3 exécutions/jour, en production smoke **toutes les 5 minutes** avec alerte après **6 échecs consécutifs**.

[S-05] **setup-k6-action — GitHub Action officielle Grafana** — https://github.com/grafana/setup-k6-action — *dépôt GitHub / action CI, dernière release **v1.2.1*** — action maintenue par Grafana pour installer et exécuter k6 dans GitHub Actions (complément de `grafana/run-k6-action`) : le job échoue automatiquement dès qu'un threshold est dépassé.

[S-06] **Open and closed models — Grafana k6** — https://grafana.com/docs/k6/latest/using-k6/scenarios/concepts/open-vs-closed/ — *documentation officielle, doc « latest »* — en modèle fermé « les itérations VU ne démarrent que quand la précédente se termine », d'où la **coordinated omission** ; k6 implémente le modèle ouvert par deux exécuteurs, **`constant-arrival-rate`** et **`ramping-arrival-rate`**.

[S-07] **Injection — Gatling documentation** — https://docs.gatling.io/concepts/injection/ — *documentation officielle, modifiée le 2026-07-02* — API explicite **`injectOpen` vs `injectClosed`** en Java/JavaScript/Kotlin/Scala ; exemple de test de capacité en paliers : `incrementUsersPerSec(5.0).times(5).eachLevelLasting(10)…` → 10, 15, 20, 25 puis 30 utilisateurs arrivant par seconde.

[S-08] **Metrics and analysis of load testing, mean and standard deviation — Gatling** — https://docs.gatling.io/testing-concepts/mean-and-sd/ — *documentation officielle, publiée 2025-02-27, modifiée 2026-07-13* — « variance et écart-type n'ont de sens que sur des distributions gaussiennes, **rarement rencontrées en test de charge** » ; les distributions réelles sont multimodales ou à longue traîne, et la moyenne est très sensible aux outliers.

[S-09] **Apache JMeter User's Manual: Best Practices (§16)** — https://jmeter.apache.org/usermanual/best-practices.html — *documentation officielle ASF, © 1999-2024* — mode CLI obligatoire pour la charge (`jmeter -n -t test.jmx -l test.jtl`), interdiction des listeners « View Results Tree/Table » pendant le tir, sortie CSV plutôt que XML, jamais plus de **3 versions** de retard, et avertissement explicite sur la **coordinated omission** en §16.2.

[S-10] **Overview — NBomber** — https://nbomber.com/docs/getting-started/overview — *documentation officielle, site © 2026 (NBomber Studio 0.8.2, 10 juillet 2026)* — API minimale C#/F# : `Simulation.Inject(rate: 10, interval: TimeSpan.FromSeconds(1), during: TimeSpan.FromSeconds(30))` — modèle ouvert à 10 req/s ; intégration CI/CD via **runners xUnit et NUnit**, donc tests de charge dans la même solution que les tests unitaires.

[S-11] **NBomber — dépôt officiel PragmaticFlow** — https://github.com/PragmaticFlow/NBomber — *dépôt GitHub, dernière release **v6.5.0*** — les exemples C# vivent dans `examples/Demo` sur la branche `dev` : source d'exemples exécutables à fournir en contexte plutôt que de laisser un LLM inventer l'API NBomber.

[S-12] **BenchmarkDotNet — Overview** — https://benchmarkdotnet.org/articles/overview.html — *documentation officielle .NET Foundation, © 2013-2024* — l'outil **refuse de s'exécuter hors configuration Release** (garde-fou anti-mesure de code non optimisé) ; `MemoryDiagnoser` ajoute Gen 0 / Allocated — distingue nettement micro-benchmark (méthode) et test de charge (système).

[S-13] **Investigate performance counters (dotnet-counters)** — https://learn.microsoft.com/en-us/dotnet/core/diagnostics/dotnet-counters — *documentation Microsoft Learn, ms.date 2025-09-06, page MAJ 2025-12-03* — `dotnet-counters collect --process-id <pid> --refresh-interval 3 --format csv` ; compteurs .NET 9+ en Meter (`dotnet.gc.pause.time`, `dotnet.thread_pool.queue.length`, `dotnet.monitor.lock_contentions`) — corrèle un p95 qui dérape avec la file du thread pool ou les pauses GC.

[S-14] **What is Locust? — Locust documentation** — https://docs.locust.io/en/stable/what-is-locust.html — *documentation officielle, version stable **2.46.2** (© 2009-2026)* — scénarios en Python pur, chaque utilisateur dans son propre greenlet (gevent) ; la page `ai-docs.html` est un exemple concret de **documentation optimisée pour être ingérée par un agent**.

[S-15] **Run Your First Artillery Test — Artillery docs** — https://www.artillery.io/docs/get-started/first-test — *documentation officielle, MAJ 27 mars 2026* — le plugin `ensure` encode les quality gates en YAML (`http.response_time.p99: 100`, `p95: 75`, `apdex.threshold: 100`) ; phases avec `arrivalRate` + `rampTo` (modèle ouvert) — « scénario réaliste » ≠ « script complexe ».

[S-16] **Performance budgets 101 — web.dev** — https://web.dev/articles/performance-budgets-101 — *article Google/Chrome, dernière MAJ 2018-11-05* — valeurs de départ chiffrées : **< 5 s de Time to Interactive** et **< 170 Ko de ressources du chemin critique** (compressées) sur un mobile de référence en 3G ; relie le budget front (taille de bundle Angular) au budget back (p95 API) dans le même pipeline.

[S-17] **Large Language Models for Software Engineering: A Systematic Literature Review** — https://arxiv.org/abs/2308.10620 — *Hou et al., arXiv cs.SE, v6 du 10/04/2024* — **395 articles analysés** de janvier 2017 à janvier 2024 ; ⚠️ utilisable comme **cadrage LLM4SE général uniquement** — aucun travail spécifique à la génération de tests de performance par LLM n'a pu être vérifié dans cette collecte.

---

### Sources de la notion N2 — Sécurité applicative

[S-18] **OWASP Top 10:2025 — Introduction** — https://owasp.org/Top10/2025/0x00_2025-Introduction/ — *standard OWASP, 2025 (version finale publiée)* — 8ᵉ édition bâtie sur **plus de 2,8 millions d'applications** ; **589 CWE analysés, 248 répartis** dans les 10 catégories ; deux nouvelles catégories (A03 Software Supply Chain Failures, A10 Mishandling of Exceptional Conditions) et **le SSRF fusionné dans A01**.

[S-19] **OWASP Top 10:2021 (avec traduction française officielle)** — https://owasp.org/Top10/2021/ — *standard OWASP, 2021* — liste 2021 complète (A01 Broken Access Control … A10 SSRF), version française sur `/Top10/2021/fr/` ; indispensable car **la majorité des outils d'audit mappent encore sur 2021** — support de l'exercice de re-mapping.

[S-20] **A03:2025 – Software Supply Chain Failures** — https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/ — *standard OWASP, 2025* — catégorie classée **#1 par exactement 50 % des répondants** de l'enquête communautaire alors que seuls **11 CVE** portent les CWE associés ; cite le ver npm auto-propageant **Shai-Hulud (2025)**, qui a atteint **plus de 500 versions de paquets**. ⚠️ Incohérence interne : 5,19 % dans le texte, **5,72 % dans le tableau** — citer le tableau.

[S-21] **OWASP Application Security Verification Standard (ASVS) 5.0.0** — https://owasp.org/www-project-application-security-verification-standard/ — *standard OWASP, v5.0.0 publiée le **30 mai 2025*** — la version courante est **5.0.0** (plus 4.0.3) et **tous les identifiants d'exigences ont changé** ; format `v<version>-<chapitre>.<section>.<exigence>` (ex. `v5.0.0-1.2.5`) ; PDF français officiel disponible — exigences **testables une par une**.

[S-22] **OWASP Top 10 for LLM Applications & Generative AI (2025)** — https://genai.owasp.org/llm-top-10/ — *standard OWASP GenAI Security Project, 2025* — LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM05 Improper Output Handling, LLM06 Excessive Agency, et les nouveautés 2025 **LLM07 System Prompt Leakage** et **LLM08 Vector and Embedding Weaknesses** ; traduction française listée.

[S-23] **ZAP – Automation Framework** — https://www.zaproxy.org/docs/automate/automation-framework/ — *documentation outil, maintenue 2026* — pilotage complet par **un seul fichier YAML** ; jobs `openapi` (attaque le Swagger .NET), `spiderAjax` (crawle la SPA Angular), `activeScan`, `report` ; codes de sortie normalisés **0 / 1 / 2**, ZAP sortant en **2 même si `failOnWarning: false`**.

[S-24] **zaproxy/action-baseline — GitHub Action ZAP** — https://github.com/zaproxy/action-baseline — *dépôt GitHub officiel ZAP, v0.15.0, Apache-2.0* — exécute le ZAP Baseline scan et **maintient automatiquement une issue GitHub** listant les alertes (fermée à 0 alerte) ; filtrage des faux positifs par `.zap/rules.tsv` au format `10011 IGNORE (Cookie Without Secure Flag)`.

[S-25] **Code scanning with CodeQL** — https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning — *documentation GitHub, à jour 2026* — le code est traité comme une base de données interrogeable ; langages supportés dont **C#** et **JavaScript/TypeScript** — les deux de SkyRetail ; ⚠️ **PHP et Scala ne sont explicitement PAS supportés**.

[S-26] **Semgrep — Quickstart** — https://semgrep.dev/docs/getting-started/quickstart — *documentation outil, MAJ 28 avril 2026* — installation `pipx install semgrep` (Python 3.10+), puis `semgrep ci` ; point de conformité déterminant en entreprise française : **seuls les *findings* sont envoyés à la plateforme, jamais le code**.

[S-27] **Copilot Autofix pour code scanning (usage responsable)** — https://docs.github.com/en/code-security/concepts/code-scanning/autofix-for-code-scanning — *documentation GitHub (transparency note), 2026* — génère les correctifs par LLM à partir des alertes CodeQL au format SARIF ; supporte C# et TypeScript ; limites documentées : **non-déterminisme** (mêmes alertes, suggestions différentes) et **revue humaine obligatoire**.

[S-28] **Auditing package dependencies for security vulnerabilities (NuGet / .NET)** — https://learn.microsoft.com/en-us/nuget/concepts/auditing-packages — *documentation Microsoft Learn, MAJ 5 mai 2026* — `NuGetAuditMode` vaut **`all` par défaut dès `net10.0`**, sinon `direct` ; avertissements **NU1901 (low) → NU1904 (critical)** ; ⚠️ pour `dotnet list package --vulnerable`, **`--include-transitive` n'est pas activé par défaut** alors que la majorité des vulnérabilités sont transitives.

[S-29] **npm-audit (npm CLI v11)** — https://docs.npmjs.com/cli/v11/commands/npm-audit — *documentation npm, v11.17.0, éditée le 20 avril 2026* — `npm audit` sort en 0 sans vulnérabilité ; ⚠️ **`--audit-level=moderate` change le seuil d'échec sans filtrer le rapport affiché** ; `npm audit signatures` vérifie les attestations de provenance Sigstore.

[S-30] **Dependabot alerts** — https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-alerts — *documentation GitHub, 2026* — une alerte n'est déclenchée que dans **deux cas** : ajout d'une vulnérabilité à la GitHub Advisory Database, ou modification du graphe de dépendances — d'où un scan vert hier et rouge aujourd'hui **sans changement de code**.

[S-31] **Automate security reviews with Claude Code** — https://claude.com/blog/automate-security-reviews-with-claude-code — *annonce produit Anthropic, 6 août 2025* — introduit `/security-review` (injection SQL, XSS, authentification/autorisation, données mal manipulées, dépendances) ; deux prises réelles documentées sur le code d'Anthropic : une **RCE exploitable par DNS rebinding** et une **SSRF sur un proxy de credentials**, corrigées avant merge.

[S-32] **anthropics/claude-code-security-review** — https://github.com/anthropics/claude-code-security-review — *dépôt GitHub officiel, MIT, 4,5k étoiles* — action *diff-aware* (n'analyse que les fichiers modifiés), filtrage de faux positifs configurable, timeout par défaut de **20 minutes** ; ⚠️ avertissement explicite du README : **l'action n'est pas durcie contre l'injection de prompt et ne doit servir qu'à relire des PR de confiance**.

[S-33] **PentestGPT: An LLM-empowered Automatic Penetration Testing Tool** — https://arxiv.org/abs/2308.06782 — *article arXiv (cs.SE/cs.CR), v2 du 2 juin 2024* — architecture à trois modules ; gain mesuré de **+228,6 % de complétion de tâches** face au modèle GPT de référence ; constat décisif : les LLM réussissent les sous-tâches mais **échouent à maintenir une vision intégrée du scénario global** — exactement la limite sur BUG-401.

[S-34] **Les Essentiels de l'ANSSI — DevSecOps** — https://messervices.cyber.gouv.fr/guides/devsecops — *guide ANSSI (collection « Les Essentiels »), publié le 13 mars 2024, v1.0* — l'ANSSI précise que « Les Essentiels » énoncent des **bonnes pratiques indépendantes et complémentaires**, et non des recommandations détaillées : caution institutionnelle française pour le volet CI/CD sécurisée.

[S-35] **Guide RGPD de l'équipe de développement (CNIL)** — https://github.com/LINCnil/Guide-RGPD-du-developpeur — *guide CNIL, dépôt officiel LINCnil, GPLv3 + Licence Ouverte 2.0* — **18 fiches thématiques**, dont la fiche **11 « Tester vos applications »**, la fiche 09 « Maîtriser vos bibliothèques et vos SDK » et la fiche 18 « Se prémunir contre les attaques » : seule source française reliant explicitement tests applicatifs et conformité RGPD — l'oracle de BUG-401.

---

### Sources de la notion N3 — Accessibilité et régression visuelle

[S-36] **Web Content Accessibility Guidelines (WCAG) 2.2** — https://www.w3.org/TR/WCAG22/ — *Recommandation W3C, 12 décembre 2024* — statut vérifié : **W3C Recommendation du 12/12/2024** (version datée `REC-WCAG22-20241212`, première REC en octobre 2023) ; la page signale « Errata exists », ce qui justifie de figer la version datée dans la définition de « fait ».

[S-37] **W3C Accessibility Guidelines (WCAG) 3.0** — https://www.w3.org/TR/wcag-3.0/ — *Working Draft, 3 mars 2026* — toujours **Working Draft** (`WD-wcag-3.0-20260303`), donc **non normatif, aucune obligation de conformité** : à mentionner en veille, jamais comme base d'un plan de test.

[S-38] **European Union — Web Accessibility Policies (W3C WAI)** — https://www.w3.org/WAI/policies/european-union/ — *fiche officielle W3C WAI, MAJ 23 juillet 2025* — directive **(UE) 2016/2102** (secteur public) avec standard **EN 301 549 v3.2.1** intégrant WCAG 2.1 AA verbatim ; l'**EAA (2019/882)** y est fichée « Date enacted 2019-06-27 », scope public **et** privé, WCAG 2.2.

[S-39] **Critères et tests — RGAA** — https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/ — *référentiel officiel DINUM, RGAA **4.1.2*** — ⚠️ la version courante est **4.1.2** (et non 4.1) ; **13 thématiques, 106 critères** de contrôle et leurs tests associés : la base de la matrice de traçabilité « critère RGAA ↔ cas de test ».

[S-40] **Rappel du champ d'application — RGAA** — https://accessibilite.numerique.gouv.fr/obligations/champ-application/ — *obligations légales, RGAA 4.1.2* — article 47 de la loi n° 2005-102 : assujettissement des entreprises **à partir de 250 M€ de chiffre d'affaires** (moyenne des 3 derniers exercices) ; norme de référence **EN 301 549 V2.1.2 (2018-08)**, soit **WCAG 2.1 A et AA** — la norme opposable en France n'est donc pas 2.2.

[S-41] **Déclaration d'accessibilité — RGAA** — https://accessibilite.numerique.gouv.fr/obligations/declaration-accessibilite/ — *obligations légales, RGAA 4.1.2* — trois états seulement : conformité **totale / partielle (≥ 50 % des critères) / non-conformité (< 50 % ou audit invalide)** ; validité **3 ans** ou **18 mois** après une nouvelle version du référentiel ; réponse aux réclamations sous **1 semaine**, puis **Défenseur des droits**.

[S-42] **Nouvelle version du RGAA — DesignGouv (DINUM)** — https://design.numerique.gouv.fr/articles/2026-03-02-rgaa5/ — *article officiel, publié le 2 mars 2026* — le **RGAA 5 est en cours de rédaction, publication prévue fin 2026** : désignation de l'**Arcom** comme autorité de contrôle, téléservice de dépôt des déclarations, intégration de **WCAG 2.2** ; rappel : **12 à 15 millions de personnes handicapées en France**.

[S-43] **European Accessibility Act (EAA) — Commission européenne** — https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/european-accessibility-act-eaa_en — *page officielle CE, consultée le 28/07/2026* — périmètre listé incluant explicitement l'**e-commerce**, les services bancaires, e-books, smartphones, DAB, billettique, transports ; transposition due **pour juin 2022** — c'est ce qui rend un e-commerce privé concerné, contrairement au seul RGAA public.

[S-44] **Directive (UE) 2019/882 du 17 avril 2019 (texte officiel)** — https://eur-lex.europa.eu/eli/dir/2019/882/oj/eng — *EUR-Lex, texte primaire* — métadonnées ELI vérifiées : document du **17 avril 2019**, publication au JO du **7 juin 2019**, entrée en vigueur le **27 juin 2019** ; ⚠️ le corps du texte n'est pas restitué au fetch — la **date d'application figure à l'article 31** et doit être lue dans un navigateur avant diffusion du support.

[S-45] **The European Accessibility Act (EAA) — Deque** — https://www.deque.com/accessibility-compliance/european-accessibility-act-eaa/ — *synthèse éditeur, MAJ 29 juin 2026* — exemption **microentreprises : moins de 10 salariés ET moins de 2 M€** de CA ou de bilan annuel ; les sanctions **ne sont pas chiffrées dans la directive**, qui impose seulement des sanctions « effective, proportionate and dissuasive » relevant de chaque État membre.

[S-46] **dequelabs/axe-core** — https://github.com/dequelabs/axe-core — *dépôt officiel Deque, MPL-2.0, release **4.12.0 du 1er juin 2026*** — le README affirme « With axe-core, you can find **on average 57 % of WCAG issues automatically** » ; le projet revendique **zéro faux positif** et **13,1 millions** de dépôts dépendants.

[S-47] **axe-core — Rule Descriptions** — https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md — *catalogue de règles généré automatiquement, branche `develop`* — décompte effectué sur le fichier : **105 règles documentées** — 60 WCAG 2.0 A/AA, 2 WCAG 2.1, **une seule WCAG 2.2 (`target-size`)**, 27 best practices, 3 AAA, 7 expérimentales, 5 dépréciées : l'argument massue contre « 100 % vert = conforme ».

[S-48] **Accessibility testing — Playwright** — https://playwright.dev/docs/accessibility-testing — *documentation officielle Microsoft, Playwright stable, 2026* — recette officielle avec **`@axe-core/playwright`** (`AxeBuilder` : `.include()`, `.exclude()`, `.disableRules()`, `.withTags()`), filtrage par `withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa'])` ; encadré *Disclaimer* explicite : *« many accessibility problems can only be discovered through manual testing »*.

[S-49] **Lighthouse accessibility score — Chrome for Developers** — https://developer.chrome.com/docs/lighthouse/accessibility/scoring — *documentation Google, MAJ 22 octobre 2025* — le score est une **moyenne pondérée d'audits pass/fail sans point partiel**, pondérés 3, 7 ou 10 ; **55 audits** au tableau, et les **audits manuels et « best practices » ne comptent pas dans le score** — pourquoi un 100 ne prouve rien et ne doit pas devenir un KPI contractuel.

[S-50] **GoogleChrome/lighthouse-ci** — https://github.com/GoogleChrome/lighthouse-ci — *dépôt officiel Google, `@lhci/cli@0.15.x`* — workflow GitHub Actions clé en main (`npm install -g @lhci/cli@0.15.x` puis **`lhci autorun`**), annoncé explicitement pour « **prevent regressions in accessibility**, SEO, offline support, and performance » : la brique quality gate, assertions versionnées dans le dépôt.

[S-51] **pa11y/pa11y** — https://github.com/pa11y/pa11y — *dépôt officiel, LGPL-3.0, **Pa11y 9** (Node 20, 22 ou 24)* — **deux runners** cumulables, `htmlcs` (par défaut) et `axe` ; standards WCAG2A / WCAG2AA (défaut) / WCAG2AAA ; **exit code 2** en cas d'erreurs, `--threshold N` pour tolérer une dette connue — le double runner démontre que deux moteurs ne trouvent pas les mêmes défauts.

[S-52] **Accessibility in Angular** — https://angular.dev/best-practices/a11y — *documentation officielle, Angular **v22*** — package CDK **`a11y`** (`LiveAnnouncer`, directive **`cdkTrapFocus`**), **Angular Aria** (directives headless : accordion, combobox, listbox, menu, tabs, toolbar), `RouterLinkActive` avec **`ariaCurrentWhenActive`**, et obligation de **gérer le focus après `NavigationEnd`**.

[S-53] **The WebAIM Million — rapport 2026** — https://webaim.org/projects/million/ — *étude annuelle WebAIM (Utah State University), données février 2026, page MAJ 30 mars 2026* — **95,9 % des 1 000 000 pages d'accueil** présentent des échecs WCAG 2 **détectables automatiquement** (94,8 % en 2025) ; **56,1 erreurs par page** ; 6 types concentrent **96 %** du total (contraste 83,9 %, alt manquant 53,1 %, labels 51 %) ; pages avec ARIA : **59,1 erreurs contre 42**.

[S-54] **The Automated Accessibility Coverage Report — Deque** — https://www.deque.com/automated-accessibility-coverage-report/ — *étude sur données d'audit, MAJ 10 juillet 2026* — sur **13 000+ pages/états et 294 958 problèmes**, **57,38 %** des **problèmes** trouvés automatiquement — **mais seulement 16 des 50 critères** de succès WCAG 2.1 AA (d'où le « 20-30 % » quand on compte en critères) ; **100 % manuel** pour 2.4.3 Focus Order, 2.4.7 Focus Visible et 1.4.11 Non-text Contrast.

[S-55] **Axe MCP Server — Deque** — https://www.deque.com/axe/mcp-server/ — *page produit, MAJ 17 juillet 2026* — serveur **MCP** exposant le moteur axe DevTools et la base Deque University aux agents (Claude Code, Copilot, Cursor, Windsurf, VS Code), avec **revue / acceptation / rejet des correctifs dans l'IDE** : le modèle « l'agent propose, le moteur déterministe tranche ».

[S-56] **Visual comparisons | Playwright** — https://playwright.dev/docs/test-snapshots — *documentation officielle, docs stable v1.62 (© 2026)* — le golden se nomme `example-test-1-chromium-darwin.png`, le suffixe navigateur+plateforme étant ajouté automatiquement ; l'encadré *warning* liste OS, version, réglages, matériel, **source d'alimentation (batterie vs secteur)** et mode headless comme causes de variation.

[S-57] **PageAssertions (`toHaveScreenshot`) | Playwright** — https://playwright.dev/docs/api/class-pageassertions — *référence API, v1.62* — `threshold` = différence de couleur perçue en espace **YIQ**, entre 0 et 1, **valeur par défaut `0.2`** ; `maxDiffPixels` et `maxDiffPixelRatio` **non définis par défaut** ; `animations: "disabled"` et `caret: "hide"` par défaut ; masque rose `#FF00FF` ; `scale: "css"`.

[S-58] **Docker | Playwright** — https://playwright.dev/docs/docker — *documentation officielle, v1.62* — image `mcr.microsoft.com/playwright:v1.62.0-noble` (Ubuntu 24.04), tags `noble` / `jammy` / `resolute` ; **`--ipc=host` recommandé** sous peine de crash mémoire de Chromium ; **Alpine/musl non supporté** — LA solution au problème des snapshots dépendants de l'OS.

[S-59] **Platform – Validate – Visual AI (Applitools)** — https://applitools.com/platform/validate/visual-ai — *page produit, MAJ 2024-02-16* — moteur décrit comme « un réseau de **centaines d'algorithmes** » mêlant règles codées et apprentissage profond, ayant **analysé plus d'un milliard d'images** ; intégration revendiquée en « trois lignes de code » remplaçant les assertions — contraste pédagogique avec le diff pixel de Playwright.

[S-60] **Platform – Ultrafast Test Grid (Applitools)** — https://applitools.com/platform/ultrafast-grid — *page produit, MAJ 2024-12-13* — annonce **30× plus rapide** et une réduction de maintenance d'un facteur **3,8×** ; principe : uploader des **DOM snapshots** (pas des captures) rendus en parallèle **dans des conteneurs, pas des VM**, avec cache des ressources inchangées.

[S-61] **Visual Testing with Percy | BrowserStack Docs** — https://www.browserstack.com/docs/percy/overview/visual-testing-basics — *documentation officielle, sans date* — **projets illimités sur tous les plans**, builds du plan gratuit **expirés au bout de 30 jours** contre **1 an d'historique** ailleurs ; auto-approbation par défaut sur la branche principale ; « changes requested » reportés tant que le diff est identique — le workflow d'approbation qu'un simple `toHaveScreenshot` n'offre pas.

[S-62] **Introduction to TurboSnap • Chromatic docs** — https://www.chromatic.com/docs/turbosnap — *documentation officielle, sans date* — tarification vérifiée : snapshot capturé = **1 facturé**, turbosnap (copié depuis la baseline) = **0,2** ; exemple : Storybook de 50 stories dont 10 impactées → **18 snapshots facturés** ; rebuild complet forcé si `preview.js`, la config Storybook ou le lockfile changent.

[S-63] **garris/BackstopJS (GitHub)** — https://github.com/garris/BackstopJS — *dépôt officiel, README courant* — défauts documentés : **`misMatchThreshold` = 0.1** (soit 0,10 % de **pixels différents** tolérés, calcul délégué à Resemble.js) et **`requireSameDimensions` = true** ; moteurs `puppeteer` ou `playwright` — ⚠️ à ne pas confondre avec le `threshold: 0.2` colorimétrique de Playwright.

[S-64] **Unstable tests debugging • Chromatic docs** — https://www.chromatic.com/docs/unstable-tests — *documentation officielle, sans date* — fenêtre de capture de **15 secondes**, hauteur de viewport par défaut **900 px** ; **les emojis sont rendus sous Linux** et différeront toujours de macOS/Windows (« aucune solution de contournement ») ; polices web chargées tardivement → `<link rel="preload">` : le catalogue prêt à l'emploi des causes de flakiness visuelle.

[S-65] **Accessibility tests | Storybook docs** — https://storybook.js.org/docs/writing-tests/accessibility-testing — *documentation officielle, Storybook 10.5* — l'addon `@storybook/addon-a11y` s'appuie sur **axe-core** (jusqu'à **57 % des problèmes WCAG**, étude Deque citée) ; `parameters.a11y.test` accepte `'off' | 'todo' | 'error'` — **seul `'error'` fait échouer la CI** ; la **règle `region` est désactivée par défaut** ; rulesets par défaut WCAG 2.0/2.1 A & AA + best practices.
