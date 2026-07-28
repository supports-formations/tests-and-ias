# Module M12 — Priorisation par les risques, ROI et Go/No-Go final

> **Jour 4** · **Durée : 2 h 30** · **QA Credits en jeu : 150 + 300 (boss final)**
> *Fil rouge : dernière séquence. La Task Force a des tests, un agent, un pipeline, une grille de conformité. Il lui manque la seule chose que le comité attend vraiment : **une décision argumentée**. Ce module produit le tableau de bord de priorisation, le chiffrage honnête, et met chaque squad face au Comité de Go/No-Go.*

---

## 0. Carte du module

### 0.1 Objectifs pédagogiques

À l'issue de ce module, le·a participant·e sera capable de :

- **Construire** une matrice de risque produit à deux axes (probabilité de défaut × impact métier) et **positionner** un backlog de test dans les quatre quadrants PRISMA ;
- **Alimenter** un tableau de bord de priorisation avec des prédicteurs mesurables — code churn relatif, complexité, nombre d'auteurs, historique d'échecs dé-flaké — et **calculer** l'APFD pour comparer deux ordonnancements ;
- **Distinguer** couverture de code et score de mutation, et **répondre** à la question « si je supprime la ligne 42, combien de vos tests tombent ? » ;
- **Chiffrer** un ROI de stratégie QA augmentée incluant les coûts cachés, en citant les cinq métriques DORA et sans recourir au ratio 1:10:100 ;
- **Argumenter** une recommandation Go / Go conditionnel / No-Go devant contradiction, et **formuler** un plan de montée en compétence de l'équipe.

### 0.2 Prérequis du module

- M10 : jeu d'évals de l'Agent Zéro, télémétrie de coût active.
- M11 : grille de conformité renseignée, positionnement AI Act écrit.
- M9 : preuves non fonctionnelles disponibles (p95, axe-core, scan sécurité).
- Dépôt `skyretail` avec historique Git complet (le churn s'y calcule).
- Stryker.NET installé (`dotnet tool restore`).

### 0.3 Position dans le fil rouge

| Avant ce module | Après ce module |
|---|---|
| Le squad a des preuves éparses : couverture, p95, violations a11y, evals | Un `DOSSIER-DE-RECETTE.md` qui les relie à des **risques** et à une **décision** |
| « On a 78 % de couverture » est présenté comme un résultat | Le squad sait que 78 % de couverture avec 41 % de score de mutation est un aveu, pas un résultat |
| Le ROI est un ressenti : « on a gagné un temps fou » | Un chiffre avec ses coûts cachés, confronté au seul RCT publié sur des devs expérimentés |
| Le comité est une épreuve à subir | Le comité est la démonstration que la valeur d'un·e QA est le **jugement**, pas la production |

### 0.4 Découpage horaire

| Séquence | Contenu | Durée |
|---|---|---|
| S0 | La Carte : ce que le comité va demander | 3 min |
| S1 | **N1** — Priorisation des tests par les risques | 13 min |
| S2 | **N2** — Mesurer la valeur | 13 min |
| S3 | **N3** — Le métier de testeur augmenté | 9 min |
| S4 | 🔍 Exemple A — le tableau de bord de priorisation, en direct | 6 min |
| S5 | 🔍 Exemple B — la ligne 42 : couverture contre mutation | 5 min |
| S6 | 🔍 Exemple C — le ROI honnête de la Task Force | 4 min |
| S7 | 🧪 Exercices M12-1 à M12-4 | 23 min |
| S8 | Préparation du dossier de recette (temps de squad) | 4 min |
| S9 | 👑 **Boss final — Le Comité de Go/No-Go** (§6) | 60 min |
| S10 | 🎓 **Clôture** — QCM, Golden Oracle, tour de table (§7) | 10 min |
| **Total** | **Somme des séquences S0 → S10** | **150 min = 2 h 30** ✅ *conforme à la durée annoncée en en-tête (dont 60 min de Boss final)* |

> ⏱️ **Régulation du temps.** Les exercices ⭐ et ⭐⭐ sont menés **en parallèle par les squads** (chaque squad n'en traite qu'un des deux, puis restitue en 2 min à l'autre). Les durées cibles indiquées par exercice supposent ce fonctionnement. L'exercice bonus ⭐⭐⭐⭐⭐ est **hors séance**.

### 0.5 Notions couvertes

| # | Notion |
|---|---|
| **N1** | Priorisation des tests par les risques — risk-based testing, matrice probabilité × impact, defect prediction, churn et complexité, tableau de bord de priorisation |
| **N2** | Mesurer la valeur — métriques DORA, couverture vs score de mutation, coût de la non-qualité, ROI honnête et coûts cachés |
| **N3** | Le métier de testeur augmenté — évolution des rôles, ce que l'IA ne remplace pas, plan de montée en compétence, ce qu'on fait lundi matin |

---

## 1. Partie théorique

### 1.1 Notion N1 — Priorisation des tests par les risques

#### 1.1.1 De quoi parle-t-on

Le **test basé sur les risques** est défini académiquement comme l'usage de (ré)évaluations du risque pour piloter **toutes les phases** du processus de test [S-02]. La taxonomie de référence structure le domaine en trois classes de premier niveau : **risk drivers**, **risk assessment**, **risk-based test process**.

Côté référentiel professionnel, ce n'est pas une pratique optionnelle : le syllabus **CTAL-TM v3.0** contient une section entière *« Risk-based Testing »* — le test comme activité de mitigation du risque, identification et évaluation des risques qualité, techniques, métriques de succès — et l'un de ses business outcomes est *« Organize risk identification and risk assessment sessions… and use the results to guide testing »* [S-19]. Le test basé sur les risques est donc un geste **normé**, antérieur de vingt ans à l'IA générative [S-04].

Deux axes, et deux seulement, dans la méthode la plus directement transposable — PRISMA [S-01] :

| Axe | Ce qu'il mesure | Qui le cote |
|---|---|---|
| **Probabilité de défauts** (risque technique) | Complexité, churn, nouveauté, dette, nombre d'auteurs | La **tech** |
| **Impact des défauts** (risque métier) | Chiffre d'affaires, image, réglementation, volume d'utilisateurs touchés | Le **métier** |

Le croisement produit une **matrice à quatre quadrants**, chacun associé à une profondeur et à un type de test différenciés. C'est le format exact que le comité de Go/No-Go attend.

⚠️ **Un prérequis souvent oublié.** Felderer & Ramler l'énoncent explicitement : le risk-based testing suppose une **distribution non homogène du risque** dans le produit [S-03]. Si le risque est uniformément réparti, la priorisation n'apporte rien. Il faut le vérifier avant de vendre la démarche — et sur SkyRetail, c'est vérifié : F1 concentre la logique métier monétaire, F4 concentre le risque réglementaire, F3 est du CRUD documenté.

#### 1.1.2 Ce que dit l'état de l'art

**Le gisement de valeur non exploité — le chiffre qui ouvre le module.** Le State of Testing 2026 mesure **76,8 % d'adoption de l'IA** en QA, mais ventile l'usage : **70 % des équipes utilisent l'IA pour créer des cas de test, et seulement 19,9 % pour l'identification des risques** [S-20]. Le même rapport ajoute que **56 % des équipes sont évaluées sur la couverture de test, 8,6 % sur le business impact et 4,5 % sur le NPS**. Les auteurs nomment cela le *« Faster Horse »* : la profession a demandé un cheval plus rapide, et elle optimise une usine à cas de test au lieu d'en sortir.

C'est exactement le message central de la journée. **La production de tests est là où l'IA apporte du volume ; la priorisation est là où elle apporterait de la valeur — et presque personne ne l'y emploie.**

**Les prédicteurs qui marchent, et à quel prix.** La bonne nouvelle est qu'on n'a pas besoin d'un modèle sophistiqué pour commencer.

| Prédicteur | Résultat mesuré | Source | Coût de collecte |
|---|---|---|---|
| **Code churn relatif** | Discrimine les binaires fault-prone avec **89,0 % d'exactitude** sur Windows Server 2003 | [S-05] | `git log` — gratuit |
| **Complexité** | Corrélée aux entités fault-prone, mais *« there is no single set of complexity metrics that could act as a universally best defect predictor »* | [S-06] | Analyseur statique |
| **Prédiction au niveau du changement (JIT)** | **68 % d'exactitude, 64 % de rappel** ; **20 % de l'effort d'inspection → 35 % des changements fautifs** identifiés | [S-07] | Historique Git + métadonnées |
| **Proximité, fréquence de modification, nombre d'auteurs** | Le code modifié récemment par **plus de 3 développeurs casse plus souvent** | [S-13] | `git log` — gratuit |

Le point décisif de [S-05] est que ce sont les mesures **relatives** (churn normalisé par la taille) et non absolues qui sont prédictives — un fichier de 5 000 lignes qui bouge de 200 lignes est moins suspect qu'un fichier de 200 lignes réécrit entièrement.

⚠️ **Deux nuances d'honnêteté à énoncer avant de vendre la démarche.** D'abord, un modèle de prédiction **se recalibre par projet** : les seuils d'un autre contexte ne se transfèrent pas [S-06]. Ensuite, la méta-analyse de 67 études de JIT-SDP montre que la performance prédictive **corrèle avec le taux de changements défectueux du projet** [S-08] : ces techniques marchent bien sur du code déjà bogué, moins bien sur une base saine. Sur SkyRetail — 12 % de couverture, 3 incidents ouverts, une refonte à chaud — le terrain est favorable. Sur un produit mature, il le serait moins.

**Le dé-flaking est un prérequis, pas une option.** Chez Google, **environ 1,5 % de toutes les exécutions de tests remontent un résultat flaky**, **près de 16 % des tests présentent un certain niveau d'instabilité**, et surtout **environ 84 % des transitions pass → fail observées impliquent un test flaky** [S-16]. Un modèle de priorisation entraîné sur un historique d'échecs non nettoyé apprend donc, à 84 %, à prioriser le **bruit**. C'est le travail fait en J3 sur BUG-202 qui rend ce module possible.

**Comment on mesure qu'une priorisation est bonne.** La métrique canonique est l'**APFD — Average Percentage of Faults Detected** [S-09] : une APFD proche de 100 % signifie que les tests détectant les défauts sont exécutés très tôt dans la séquence. Sans elle, « priorisation IA » contre « priorisation manuelle » est une conversation d'opinion. Formule usuelle, pour `n` tests et `m` défauts, `TF_i` étant le rang du premier test détectant le défaut `i` :

```
APFD = 1 − (TF₁ + TF₂ + … + TF_m) / (n × m) + 1 / (2n)
```

⚠️ Et un antidote au discours « l'outil trouve le bon ordre » : la famille d'études empiriques de référence établit qu'**aucune technique de priorisation n'est universellement supérieure** — le choix dépend de l'objectif, détecter vite ou couvrir large [S-10].

**Ce que fait l'industrie, avec les bons chiffres.** Meta a industrialisé la **sélection prédictive de tests** par apprentissage sur l'historique d'exécutions : le système **divise par deux le coût total d'infrastructure de test**, tout en garantissant que **plus de 95 % des échecs de test individuels et plus de 99,9 % des changements fautifs** sont remontés [S-11]. La version vulgarisée donne la formulation à retenir devant un management : *« catch more than 99.9 percent of all regressions… while running just a third of all tests »* [S-12].

⚠️ **Ne pas sur-vendre.** Le chiffre est **> 95 % des échecs de test individuels** et **> 99,9 % des changements fautifs** : ce n'est pas « 99,9 % des échecs de test ». La confusion est très répandue dans les articles de seconde main [S-11]. Le compromis est explicite et **assumé** : on accepte de rater environ 5 % des échecs individuels pour diviser le coût par deux.

Point encourageant pour une stack Angular + .NET où la couverture est coûteuse à collecter : Google montre qu'on peut combiner sélection en pre-submit et priorisation en post-submit avec des algorithmes *« relatively inexpensive »* qui **ne s'appuient pas sur la couverture de code** [S-14]. Et côté outillage natif .NET, Test Impact Analysis d'Azure Pipelines sélectionne le sous-ensemble de tests requis avec un **repli automatique sur l'exécution complète** quand il ne sait pas raisonner sur un changement [S-15] — ce mécanisme de fallback est le point de sécurité à souligner. ⚠️ Rappel de M8 : ses limitations de support sur les projets .NET modernes doivent être vérifiées avant de bâtir une stratégie dessus.

**Et l'IA, dans tout ça ?** Deux usages documentés, très différents de « générer des tests ».

1. **L'apprentissage par renforcement sur trois signaux triviaux.** Retecs sélectionne et priorise les cas de test *« according to their duration, previous last execution and failure history »*, validé sur **trois études de cas industrielles** [S-17]. Trois colonnes que tout runner produit déjà. C'est le modèle de départ à faire implémenter — pas un LLM.
2. **Le LLM comme outil d'ordonnancement, pas de génération.** LLMPrior regroupe les rapports de test par clustering puis les priorise algorithmiquement, et surpasse l'état de l'art antérieur [S-18]. Le geste est exactement celui du jour 4 : **l'IA ordonne un backlog, elle ne le fabrique pas**.

#### 1.1.3 Application au contexte SkyRetail — le tableau de bord de priorisation

C'est le livrable demandé par le programme. Il se compose d'un **script** et d'un **format de sortie**, tous deux versionnés.

**Le modèle de score.** Deux axes, cotés 1 à 5, produit dans une matrice PRISMA à quatre quadrants [S-01].

```
Probabilité (technique, calculée)  =  0,40 × churn_relatif_norm
                                    + 0,25 × complexite_norm
                                    + 0,15 × auteurs_norm            [S-13]
                                    + 0,20 × echecs_deflakes_norm    [S-16]

Impact (métier, coté à la main par le PO)  ∈ {1 … 5}

Risque = Probabilité × Impact         →   quadrant PRISMA
```

L'impact **n'est pas calculable**. Il est coté par le métier, en séance, et il est daté et signé. C'est la première chose que le comité vérifiera.

**Le script.**

```powershell
# scripts/tableau-priorisation.ps1
# Tableau de bord de priorisation des tests — SkyRetail v4.0
# Entrées  : historique Git (churn, auteurs), rapport de couverture, historique de tests dé-flaké,
#            fichier d'impact métier coté par le PO.
# Sorties  : boss-j4/tableau-priorisation.csv  (machine)
#            boss-j4/tableau-priorisation.md   (humain, projetable au comité)
# Aucun appel LLM : la priorisation doit être reproductible et auditable.

param(
  [string]$Depuis   = "6 months ago",
  [string]$Impacts  = "governance/impact-metier.csv",   # chemin;feature;impact(1-5);cote_par;date
  [string]$Historique = "artifacts/test-history.csv",   # chemin;echecs_hors_flaky
  [string]$SortieDir = "boss-j4"
)

# --- 1) Churn relatif : lignes modifiées / lignes du fichier. C'est le RELATIF qui prédit. [S-05]
$churn = @{}
git log --since=$Depuis --numstat --pretty=format:"%H|%an" |
  ForEach-Object {
    if ($_ -match '^\w{40}\|(.+)$') { $auteur = $Matches[1] }
    elseif ($_ -match '^(\d+)\s+(\d+)\s+(.+)$') {
      $f = $Matches[3]
      if (-not $churn.ContainsKey($f)) { $churn[$f] = @{ Lignes = 0; Auteurs = @{} } }
      $churn[$f].Lignes += [int]$Matches[1] + [int]$Matches[2]
      $churn[$f].Auteurs[$auteur] = $true
    }
  }

# --- 2) Complexité : proxy simple et transparent (points de décision par fichier).
#     Volontairement lisible plutôt que sophistiqué : un score qu'on ne sait pas expliquer
#     n'est pas défendable en comité. [S-06] : pas de jeu de métriques universellement meilleur.
function Get-Complexite($chemin) {
  if (-not (Test-Path $chemin)) { return 0 }
  $src = Get-Content $chemin -Raw
  ([regex]::Matches($src, '\b(if|else if|for|foreach|while|case|catch|\?\?|&&|\|\|)\b')).Count
}

$impacts    = Import-Csv $Impacts
$historique = @{}
if (Test-Path $Historique) { Import-Csv $Historique | ForEach-Object { $historique[$_.chemin] = [int]$_.echecs_hors_flaky } }

$lignes = foreach ($i in $impacts) {
  $c = $churn[$i.chemin]
  $taille = if (Test-Path $i.chemin) { (Get-Content $i.chemin).Count } else { 1 }
  [pscustomobject]@{
    Chemin        = $i.chemin
    Feature       = $i.feature
    ChurnRelatif  = if ($c) { [math]::Round($c.Lignes / [math]::Max($taille,1), 3) } else { 0 }
    Auteurs       = if ($c) { $c.Auteurs.Count } else { 0 }
    Complexite    = Get-Complexite $i.chemin
    EchecsReels   = if ($historique.ContainsKey($i.chemin)) { $historique[$i.chemin] } else { 0 }
    ImpactMetier  = [int]$i.impact
    CotePar       = $i.cote_par
  }
}

# --- 3) Normalisation min-max sur 1..5, PAR PROJET (les seuils ne se transfèrent pas [S-06]).
function Norm($vals, $v) {
  $min = ($vals | Measure-Object -Minimum).Minimum
  $max = ($vals | Measure-Object -Maximum).Maximum
  if ($max -eq $min) { return 3 }
  [math]::Round(1 + 4 * ($v - $min) / ($max - $min), 2)
}

$resultat = $lignes | ForEach-Object {
  $p = 0.40 * (Norm ($lignes.ChurnRelatif) $_.ChurnRelatif) `
     + 0.25 * (Norm ($lignes.Complexite)   $_.Complexite)   `
     + 0.15 * (Norm ($lignes.Auteurs)      $_.Auteurs)      `
     + 0.20 * (Norm ($lignes.EchecsReels)  $_.EchecsReels)
  $p = [math]::Round($p, 2)
  $risque = [math]::Round($p * $_.ImpactMetier, 2)
  $quadrant = if ($p -ge 3 -and $_.ImpactMetier -ge 3) { "I  — test approfondi + mutation" }
         elseif ($p -lt  3 -and $_.ImpactMetier -ge 3) { "II — test standard, oracle métier" }
         elseif ($p -ge 3 -and $_.ImpactMetier -lt  3) { "III— test technique, PBT/fuzzing" }
         else                                           { "IV — test minimal, revue seule" }
  $_ | Add-Member Probabilite $p -PassThru |
       Add-Member Risque $risque -PassThru |
       Add-Member Quadrant $quadrant -PassThru
}

New-Item -ItemType Directory -Force -Path $SortieDir | Out-Null
$resultat | Sort-Object Risque -Descending |
  Export-Csv "$SortieDir/tableau-priorisation.csv" -NoTypeInformation -Encoding utf8

# --- 4) Rendu Markdown projetable
$md = @("# Tableau de bord de priorisation — SkyRetail v4.0",
        "",
        "> Généré le $(Get-Date -Format 'yyyy-MM-dd HH:mm') · fenêtre d'historique : $Depuis",
        "> Probabilité = 0,40·churn + 0,25·complexité + 0,15·auteurs + 0,20·échecs (hors flaky)",
        "> Impact métier coté à la main — voir colonne « Coté par ».",
        "",
        "| Rang | Chemin | Feature | Prob. | Impact | Risque | Quadrant | Coté par |",
        "|---|---|---|---|---|---|---|---|")
$rang = 1
$resultat | Sort-Object Risque -Descending | ForEach-Object {
  $md += "| $rang | ``$($_.Chemin)`` | $($_.Feature) | $($_.Probabilite) | $($_.ImpactMetier) | **$($_.Risque)** | $($_.Quadrant) | $($_.CotePar) |"
  $rang++
}
$md -join "`n" | Set-Content "$SortieDir/tableau-priorisation.md" -Encoding utf8
Write-Host "OK — $SortieDir/tableau-priorisation.{csv,md}"
```

**Le format de sortie**, tel qu'il sera projeté au comité :

```markdown
# Tableau de bord de priorisation — SkyRetail v4.0

| Rang | Chemin | Feature | Prob. | Impact | Risque | Quadrant | Coté par |
|---|---|---|---|---|---|---|---|
| 1 | `Domain/Pricing/DiscountEngine.cs`   | F1 | 4,72 | 5 | **23,60** | I  — test approfondi + mutation | PO Pricing, 27/07 |
| 2 | `Domain/Pricing/VatCalculator.cs`    | F1 | 3,80 | 5 | **19,00** | I  — test approfondi + mutation | PO Pricing, 27/07 |
| 3 | `checkout/order-submit.component.ts` | F2 | 4,10 | 4 | **16,40** | I  — test approfondi + mutation | PO Checkout, 27/07 |
| 4 | `Api/Me/GdprExportService.cs`        | F4 | 3,15 | 5 | **15,75** | I  — test approfondi + mutation | DPO, 27/07 |
| 5 | `Api/Catalog/SearchService.cs`       | F3 | 2,90 | 4 | **11,60** | II — test standard, oracle métier | PO Catalogue, 27/07 |
| … | … | … | … | … | … | … | … |
```

Deux propriétés du livrable méritent d'être défendues en comité : il est **reproductible** (aucun appel LLM, même entrée → même sortie) et il est **auditable** (chaque coefficient est lisible et chaque cote d'impact est signée et datée).

#### 1.1.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Prioriser sur un historique non dé-flaké** | Le modèle remonte toujours les mêmes tests E2E instables | **84 %** des transitions pass → fail impliquent un flaky [S-16] | Dé-flaker d'abord (J3), n'alimenter le modèle qu'avec les échecs réels |
| **Recopier les seuils d'un autre projet** | Le score classe tout en quadrant I | *« no single set of complexity metrics… universally best »* [S-06] ; la performance JIT dépend du taux de défauts du projet [S-08] | Normalisation min-max **par projet**, recalibrée à chaque trimestre |
| **Laisser l'IA coter l'impact métier** | Une matrice élégante que personne n'assume | L'impact est une **décision**, pas une donnée | Cote signée et datée par le PO / le DPO ; colonne « Coté par » obligatoire |
| **Vendre le RBT sans vérifier l'hétérogénéité** | La priorisation ne change rien à l'ordre | Prérequis explicite du RBT : distribution non homogène du risque [S-03] | Mesurer la dispersion des scores avant d'engager la démarche |
| **Sur-citer Meta** | « Un tiers des tests, 99,9 % des échecs » | Le chiffre est **> 95 %** des échecs *individuels* et **> 99,9 %** des *changements fautifs* [S-11] | Citer les deux taux ensemble, et le compromis assumé |

#### 1.1.5 📊 Chiffres à retenir

- **70 % des équipes utilisent l'IA pour créer des cas de test, 19,9 % pour identifier des risques** — et **56 %** sont évaluées sur la couverture contre **8,6 %** sur le business impact [S-20].
- **89,0 %** d'exactitude du churn **relatif** pour discriminer les binaires fault-prone [S-05].
- **20 % de l'effort d'inspection → 35 % des changements fautifs** identifiés (JIT defect prediction) [S-07].
- **Coût d'infrastructure de test ÷ 2**, avec **> 95 %** des échecs individuels et **> 99,9 %** des changements fautifs conservés [S-11], [S-12].
- **84 %** des transitions pass → fail impliquent un test flaky : le dé-flaking est un **prérequis** de toute priorisation apprise [S-16].

---

### 1.2 Notion N2 — Mesurer la valeur d'une stratégie QA augmentée

#### 1.2.1 De quoi parle-t-on

Mesurer la valeur d'une chaîne de test augmentée, c'est répondre à trois questions distinctes que l'on confond en permanence :

| Question | Ce qu'on mesure | Cadre |
|---|---|---|
| **Livre-t-on mieux ?** | Performance de livraison logicielle | **DORA**, 5 métriques [S-21] |
| **Nos tests détectent-ils quelque chose ?** | Qualité de la vérification | **Score de mutation**, pas la couverture [S-37] |
| **Le jeu en vaut-il la chandelle ?** | Coût total contre bénéfice net | ROI avec coûts cachés [S-25], [S-33] |

> ⚠️ **À jour au 07/2026 — « les 4 métriques DORA » est faux depuis 2024.** DORA en utilise **cinq**, réparties en *throughput* (change lead time, deployment frequency, failed deployment recovery time) et *instability* (change fail rate, **deployment rework rate**) [S-21]. Le *time to restore* a été redéfini en **failed deployment recovery time** dès 2023, et DORA reconnaît elle-même que **le rapport 2021 avait appelé à tort la « reliability » la cinquième métrique** [S-22]. Enfin, **le dernier rapport publié est celui de 2025** — aucune édition 2026 au 28/07/2026 [S-23].

#### 1.2.2 Ce que dit l'état de l'art

**Le cadre de mesure, et ses garde-fous.** Le guide DORA liste **sept pièges d'usage explicites**, dont la loi de Goodhart, la tentation de la *« one metric to rule them all »*, et les comparaisons entre applications hétérogènes [S-21]. Le rapport 2025 pose la thèse à retenir : **« AI's primary role is as an amplifier »** — l'IA amplifie les forces *et* les faiblesses organisationnelles existantes, et les meilleurs retours ne viennent pas des outils mais du système sociotechnique sous-jacent [S-24]. Transposé à SkyRetail : **l'IA ne répare pas une stratégie de test défaillante, elle l'accélère.**

Pour dépasser la seule livraison, deux cadres complémentaires. **SPACE** définit cinq dimensions — Satisfaction & well-being, Performance, Activity, Communication & collaboration, Efficiency & flow — et recommande d'en combiner **au moins trois, dont au moins une mesure perceptuelle** [S-26]. **DevEx** en propose trois : **feedback loops, cognitive load, flow state** [S-27] ; *feedback loops* est précisément le concept qui relie temps d'exécution des tests, flakiness et satisfaction des développeurs. Chiffres citables : **78 % des organisations sondées par Gartner ont une initiative DevEx** ; cas eBay : **×2 sur la fréquence de release et ÷6 sur le lead time de déploiement** [S-27].

Et une mise en garde méthodologique de DORA elle-même : *« it is a common misconception that logs-based metrics are objective »* ; sur l'IA, la recommandation n'est pas de jeter le cadre mais d'**ajouter quelques mesures** (taux d'acceptation des suggestions, confiance) en **gardant la baseline** [S-28]. Enfin, un chiffre qui devrait précéder tout atelier « on va mesurer votre QA » : **66 % des développeurs ne croient pas — ou ne sont pas sûrs — que les métriques actuelles reflètent leur contribution réelle** [S-29]. La légitimité perçue de la mesure est une condition de son efficacité.

**Couverture contre score de mutation — la question piège n° 1 du comité.** *« Vous me dites 78 % de couverture. Si je supprime la ligne 42 de `DiscountEngine.cs`, combien de vos tests tombent ? »*

La réponse rigoureuse tient en trois affirmations sourcées.

1. La couverture mesure **l'exécution**, pas la **vérification**. Un test sans assertion couvre exactement autant qu'un test qui en contient dix.
2. La **détection de mutants corrèle avec la détection de défauts réels, indépendamment de la couverture de code** — expérimentation sur **357 défauts réels** dans **5 applications open source** totalisant **321 000 lignes** [S-37]. C'est la justification scientifique d'utiliser le score de mutation comme indicateur de risque résiduel.
3. ⚠️ Mais **le score de mutation n'est pas non plus une mesure absolue du risque** : la corrélation entre mutants et défauts réels est fortement affectée par la **taille de la suite de tests**, facteur de confusion documenté [S-38]. Ni la couverture ni le score de mutation ne mesurent directement le risque résiduel.

Le mutation testing est industrialisable : chez Google, il est utilisé par **6 000 ingénieurs** sur tous les changements qu'ils écrivent ou revoient, touchant **plus de 14 000 auteurs de code**, et traite **environ 30 % de tous les diffs** pour lesquels la couverture d'instructions est calculée [S-36]. La clé du passage à l'échelle : ne présenter que **quelques mutants pertinents par diff**, pendant la revue de code — mode d'emploi directement transposable avec un agent IA.

**Le coût de la non-qualité — et le mythe qu'il faut abandonner.**

> ⚠️ **À jour au 07/2026 — le ratio 1:10:100 de Boehm est un « leprechaun ».** La courbe exponentielle du coût de correction d'un défaut selon la phase est un artefact documenté : Bossavit remonte aux sources primaires (chapitre 10 *« The cost of defects: an illustrated history »* et annexe B, *« bibliographical analysis for the defect-cost-increase curve »*) et montre la fabrication du chiffre par citations en cascade [S-31]. **À enseigner comme un ordre d'idée qualitatif — « corriger tard coûte plus cher » — jamais comme un ratio chiffré.** Corollaire direct : **ne pas construire un ROI de shift-left sur ce ratio.**

Le seul chiffre macro utilisable est celui du CISQ : **au moins 2 410 milliards de dollars** de coût de la mauvaise qualité logicielle **aux États-Unis**, dont **environ 1 520 milliards de dette technique accumulée**, sur un PIB projeté de 23,35 T$ [S-30]. ⚠️ Il se cite avec quatre précautions : c'est un coût **américain**, une estimation **2022**, un total **incluant un stock de dette technique** (pas un flux annuel de bugs), et il est construit à partir de sources publiques secondaires. Dire « la non-qualité logicielle coûte 2 400 milliards par an » est une triple erreur.

**L'IA accélère-t-elle ? La réponse honnête est « mesurez chez vous ».** C'est le passage le plus important du module, et le plus inconfortable.

| Étude | Population | Résultat | Ce qu'elle établit |
|---|---|---|---|
| GitHub Copilot, RCT [S-32] | Développeurs sur une tâche cadrée (serveur HTTP JavaScript) | **55,8 % plus vite** que le groupe contrôle | L'effet est réel sur des tâches nouvelles et bornées, surtout pour les profils juniors |
| **METR 2025**, RCT [S-33] | **16 développeurs expérimentés**, **246 issues réelles**, dépôts 22k+ étoiles | **+19 % de temps** *avec* l'IA | Sur du code qu'on connaît bien, l'effet peut s'inverser |
| METR, mise à jour fév. 2026 [S-34] | 57 devs, 143 dépôts, 800+ tâches | **−18 %** (IC −38 % à +9 %) et **−4 %** (IC −15 % à +9 %) | Accélération probable mais **non concluante** |
| METR, enquête mai 2026 [S-35] | 349 travailleurs techniques | **1,4×–2× de valeur** contre **3× de vitesse** | L'écart vitesse/valeur est le résultat central |

Le chiffre le plus utile de tout le module est l'**écart perception / réalité** de [S-33] : les développeurs anticipaient **+24 % de gain**, ont mis **19 % de temps en plus**, et **croyaient encore après coup avoir gagné 20 %** — soit **plus de 40 points de pourcentage de surestimation**.

⚠️ **Et il faut être honnête sur cette étude aussi.** METR affiche elle-même un bandeau *« These results are out of date »* [S-33], et son propre suivi de 2026 estime un effet probablement positif — mais non concluant, notamment parce que **30 à 50 % des développeurs déclarent ne plus soumettre certaines tâches parce qu'ils refusent de les faire sans IA**, ce qui biaise l'estimation [S-34]. La conclusion pédagogique n'est donc **ni** « l'IA ralentit » **ni** « l'IA accélère » : c'est **« mesurez sur vos propres métriques de livraison »**.

Le corollaire QA est direct : générer 10× plus de tests n'est un succès que si le **taux de détection de défauts réels** progresse. C'est le piège *Faster Horse* de N1 [S-20], et c'est l'écart vitesse/valeur de [S-35].

**Le cadre de calcul du ROI.** DORA publie depuis avril 2026 un rapport et un calculateur dédiés, qui intègrent explicitement la gestion du **« productivity dip »** initial d'un déploiement [S-25]. C'est la trame à utiliser devant un DAF — et le *productivity dip* est précisément le poste que les ROI maison oublient.

#### 1.2.3 Application au contexte SkyRetail — le ROI honnête

Le tableau ci-dessous est la section 6 du dossier de recette. Les colonnes « source » renvoient à des mesures faites pendant la formation, pas à des estimations.

| Poste | Mesure | Source de la mesure |
|---|---|---|
| **Bénéfices** | | |
| Tests unitaires et E2E ajoutés | 340 tests, dont 187 conservés après filtre | Runner, rapport de couverture |
| Défauts détectés avant production | 7 sur 9 défauts plantés | Jeu d'évals M10 + campagnes |
| Couverture back-end | 12 % → 61 % | Coverlet |
| Score de mutation `SkyRetail.Domain` | 0 % (non mesuré) → **41 %** | Stryker.NET |
| Pipeline | 34 min → 17 min | GitHub Actions |
| **Coûts directs** | | |
| Consommation LLM (4 jours, 3 squads) | 214 $ | `claude_code.cost.usage` [M10] |
| Temps humain de production | 3 × 4 j × 5 h 15 | Planning |
| **Coûts cachés — la partie que personne ne chiffre** | | |
| Temps humain de **supervision** | 6 h 40 cumulées | `claude_code.tool.blocked_on_user` [M10] |
| Tests générés **rejetés** en revue | 153 sur 340 (45 %) | Journal de revue |
| Dette de maintenance créée | 187 tests à maintenir, propriétaire nommé | Plan de maintenance M10 |
| Coût de rejeu du jeu d'évals | ~4 $ × 52 semaines = 208 $/an | Jeu d'évals M10 |
| **Productivity dip** initial | 1,5 jour-homme d'apprentissage outillage | Observation, cadre [S-25] |
| **Ce qu'on ne prétend pas savoir** | | |
| Gain de vitesse net des développeurs | **non mesuré** — pas de baseline pré-IA | Réserve explicite, cf. [S-33], [S-34] |

**La phrase à écrire dans le dossier**, et à défendre : *« Nous ne revendiquons aucun gain de vitesse chiffré, faute de baseline. Nous revendiquons un gain de couverture de vérification mesuré au score de mutation, et une réduction de moitié du temps de pipeline. Le seul RCT publié sur des développeurs expérimentés mesure +19 % de temps avec l'IA, avec plus de 40 points d'écart entre perception et réalité [S-33] ; nous n'avons pas les données pour affirmer que notre cas est différent. »*

C'est cette phrase qui distingue, devant un comité, un dossier crédible d'une plaquette.

#### 1.2.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **« Les 4 métriques DORA »** | Une slide recopiée depuis 2019 | DORA en compte **5** depuis 2024, et le *time to restore* a été redéfini en 2023 [S-21], [S-22] | Reprendre le guide officiel ; citer l'édition **2025** comme la dernière [S-23] |
| **Bâtir le ROI sur le 1:10:100** | Un ROI spectaculaire et indéfendable | Le ratio de Boehm est un artefact documenté [S-31] | « Corriger tard coûte plus cher » qualitativement ; ROI chiffré sur des mesures locales [S-25] |
| **Citer le CISQ comme un flux annuel mondial** | « La non-qualité coûte 2 400 Md$ par an » | Coût **US**, **2022**, incluant un **stock** de 1,52 T$ de dette technique [S-30] | Citer les quatre précautions avec le chiffre, ou ne pas le citer |
| **Confondre vitesse et valeur** | « On produit 10× plus de tests » | 3× en vitesse mais 1,4–2× en valeur [S-35] ; et 56 % des équipes évaluées sur la couverture [S-20] | Indicateur de succès = défauts réels détectés, pas volume produit |
| **Annoncer un gain sans baseline** | « On a gagné 40 % de temps » | Écart perception/réalité de **plus de 40 points** mesuré [S-33] | Soit une baseline mesurée avant, soit une réserve explicite au dossier |

#### 1.2.5 📊 Chiffres à retenir

- **5 métriques DORA** (throughput : change lead time, deployment frequency, failed deployment recovery time ; instability : change fail rate, **deployment rework rate**) ; dernier rapport **2025** [S-21], [S-23].
- **METR 2025 : +19 % de temps** chez des développeurs expérimentés qui **croyaient avoir gagné 20 %** et anticipaient +24 % — **plus de 40 points d'écart** perception/réalité [S-33].
- **3× de vitesse, 1,4× à 2× de valeur** — l'écart central de l'enquête METR de mai 2026 [S-35].
- **357 défauts réels, 5 applications, 321 000 lignes** : la détection de mutants corrèle avec la détection de défauts réels **indépendamment de la couverture** [S-37].
- **2,41 T$** de coût de la mauvaise qualité logicielle — **aux États-Unis, en 2022, dont 1,52 T$ de dette technique accumulée** [S-30].

---

### 1.3 Notion N3 — Le métier de testeur augmenté

#### 1.3.1 De quoi parle-t-on

La question n'est pas « l'IA va-t-elle remplacer les testeurs ». Elle est : **quelles tâches du métier deviennent bon marché, et où se déplace la valeur ?**

Le cadrage institutionnel le plus solide vient de l'OIT : **1 travailleur sur 4 dans le monde** occupe un emploi présentant une exposition à la GenAI, **3,3 % de l'emploi mondial** dans la catégorie d'exposition la plus élevée, et la conclusion est explicite — **la transformation des emplois est l'impact le plus probable, pas leur disparition** [S-48]. La publication OIT la plus récente affine : **30–32 % de l'emploi exposé dans les pays à haut revenu contre 10–15 % dans les pays à bas revenu**, et **441,8 millions d'emplois** relèvent de gradients d'« augmentation » [S-49].

#### 1.3.2 Ce que dit l'état de l'art

**Le paradoxe de l'anxiété.** Le State of Testing 2026 mesure **65,6 % de professionnels « Very Concerned »** pour l'avenir du métier — mais les **utilisateurs actifs d'IA sont 17 % moins anxieux et 4× plus souvent « Zero Concern »** [S-43]. Le rapport nomme cela l'*« AI Paradox »*. Il relève aussi un écart hiérarchique net : **68,9 % des praticiens** contre **55,6 % des leaders** — l'inquiétude est plus forte là où l'on exécute.

**Ce que le marché valorise, mesuré.** Deux séries de chiffres à projeter ensemble.

| Indicateur | Valeur | Source |
|---|---|---|
| Écart salarial utilisateurs d'IA / non-utilisateurs | ~45 400 $ contre ~35 800 $, soit **+27 %** | [S-43] |
| Prime « leadership » chez les 10+ ans d'expérience | **+10,6 %** | [S-43] |
| Pénalité « exécution technique » chez les 10+ ans | **−13,8 %** | [S-43] |
| La GenAI devient la **compétence n° 1** attendue d'un quality engineer | **63 %**, devant les compétences QE cœur (60 %) ; soft skills 5ᵉ (51 %) | [S-44] |
| Organisations expérimentant la GenAI en QA / l'ayant **passée à l'échelle** | **43 % / 15 %** | [S-44] |
| Données de test synthétiques, premier cas d'usage GenAI | **14 % (2024) → 25 % (2025)** | [S-44] |

Le couple **+10,6 % / −13,8 %** est le signal le plus clair de la séquence : à ancienneté égale, la rémunération se déplace du **faire** vers le **décider**. Et le couple **43 % / 15 %** est le meilleur antidote au discours « tout le monde a déjà basculé ».

**Ce que l'IA ne remplace pas — et ce n'est pas une consolation, c'est une description de poste.**

| Ce qui devient bon marché | Ce qui devient rare et cher |
|---|---|
| Écrire du code de test idiomatique | Décider **quoi** tester — la priorisation (19,9 % [S-20]) |
| Produire des données de test structurées | Fournir l'**oracle** : d'où vient le résultat attendu |
| Rédiger un rapport d'anomalie lisible | Trancher qu'une spécification est **contradictoire** |
| Traduire un test d'un framework à un autre | Porter la **responsabilité** de la décision devant un comité |
| Suggérer des correctifs plausibles | Détenir le **contexte métier** que personne n'a écrit |

Ce tableau n'est pas une opinion. Il est adossé à quatre résultats.

1. **La frustration n° 1 des développeurs est *« AI solutions that are almost right, but not quite »* — 66 %**, suivie de *« debugging AI-generated code is more time-consuming »* — **45,2 %** [S-45]. « Presque juste mais pas tout à fait » est *exactement* la définition du travail de testeur.
2. **La défiance croît avec l'usage** : **46 %** se défient de l'exactitude des sorties contre **33 %** qui leur font confiance, et seulement **3,1 % « highly trust »** — 2,5 % chez les expérimentés, qui affichent le plus fort taux de défiance à 20,7 % [S-45]. La raison n° 1 de demander de l'aide à un humain reste *« quand je ne fais pas confiance aux réponses de l'IA »* (**75,3 %**).
3. **L'agentique introduit des décisions non exigées par la spécification.** L'étude la plus récente sur le TDD assisté établit que les workflows agentiques produisent du code rapidement et fonctionnellement correct **mais introduisent des décisions d'implémentation non demandées, créant des « untested decision points »**, alors que **les workflows collaboratifs produisent des suites de tests de meilleure qualité et mieux organisées** [S-52]. C'est la justification empirique du human-in-the-loop **sur la conception des tests**, même quand l'agent code bien.
4. **Un feedback d'IA n'a de valeur que s'il est actionnable.** Sur **54 791 commentaires de revue générés par 5 agents sur 342 dépôts**, le meilleur prédicteur de résolution est la **présence d'une suggestion de code inline** ; les commentaires longs et complexes sont ignorés, et les 10 motifs de non-résolution les plus fréquents sont les **suggestions incorrectes** et les **décisions de conception intentionnelles** [S-54].

**Le référentiel de compétences.** Pour structurer un plan de montée en compétence, deux modules ISTQB, à ne pas confondre : **CT-GenAI** couvre le test **avec** l'IA générative — prompt engineering pour le test, gestion des risques (hallucinations, biais, données personnelles, sécurité, consommation énergétique), « AI Regulations, Standards and Best Practice Frameworks » — examen **40 questions, 30/46 (65 %), 60 min**, avec **23 678 téléchargements du syllabus** affichés, bon proxy de l'intérêt du marché [S-41]. **CT-AI v2.0** couvre le test **des** systèmes d'IA [S-42]. En France, le passage se fait via le **CFTL**, unique représentant ISTQB pour la France et les pays francophones sans comité, qui accrédite formateurs et organismes [S-56].

Pour situer la maturité de l'organisation, **TMMi** offre cinq niveaux (Initial, Managed, Defined, Measured, Optimization) [S-55], avec un document dédié *« Testing AI-systems and TMMi »* ; l'adoption progresse (**135 évaluations en 2024, +75 %**). Le cadre sert à répondre à « où l'IA peut-elle nous aider, compte tenu de notre niveau actuel ? » — la réponse étant rarement « partout ».

**Et le point aveugle des rapports d'éditeurs : les conditions de travail.** Le rapport officiel français sur IA et travail insiste sur des risques que les enquêtes de marché n'abordent pas — **perte d'autonomie, surcharge mentale liée à la prise en charge des tâches complexes, intensification** [S-51]. ⚠️ Limite à annoncer : le corps du rapport date de 2018 ; on l'utilise pour le **cadre d'analyse**, pas pour des chiffres 2026. Le FMI ajoute la dimension des effets différenciés : les économies avancées ressentent bénéfices et écueils plus tôt du fait de leur structure d'emploi **à forte intensité cognitive**, et **femmes et diplômés du supérieur sont plus exposés mais aussi mieux placés pour en tirer parti**, tandis que les travailleurs âgés s'adaptent moins facilement [S-50]. Enfin, le WEF fournit le cadre général de recomposition des compétences, sur **plus de 1 000 employeurs représentant plus de 14 millions de travailleurs, 22 clusters industriels, 55 économies**, à horizon 2025-2030 [S-47].

#### 1.3.3 Application au contexte SkyRetail — le plan de montée en compétence

Livrable de la notion, à annexer au dossier de recette. Trois horizons, des critères vérifiables.

| Horizon | Objectif | Action concrète | Critère de réussite |
|---|---|---|---|
| **Lundi matin** | Ne pas perdre l'acquis | Committer `evals/agent-zero.yaml`, `scripts/tableau-priorisation.ps1`, `.claude/settings.json` durci et le contrat de journalisation | Les 4 fichiers sont dans `main` avant mercredi |
| **Semaine 1** | Rendre la mesure routinière | Brancher le jeu d'évals sur la CI ; mesurer la baseline des **5 métriques DORA** [S-21] | Un run d'évals par PR ; une baseline datée en `governance/` |
| **Mois 1** | Déplacer l'usage vers le risque | Passer du « générer des tests » (70 %) à « identifier les risques » (19,9 %) [S-20] : première session de cotation d'impact avec le PO | `governance/impact-metier.csv` signé, tableau de priorisation rejoué |
| **Trimestre 1** | Consolider la compétence | Un membre de l'équipe prépare **CT-GenAI** [S-41], via le CFTL [S-56] ; auto-positionnement TMMi [S-55] | Inscription faite ; niveau TMMi cible identifié |
| **Continu** | Ne pas dériver | Cron hebdomadaire d'évals ; revue trimestrielle du score de mutation ; registre de modèles tenu | Aucun modèle « INCONNU » dans `audit-modeles.csv` |

**Les trois rôles que la Task Force laisse derrière elle**, nommés dans le dossier :

| Rôle | Responsabilité | Pourquoi il ne peut pas être tenu par l'IA |
|---|---|---|
| **Propriétaire de l'agent** | Registre de modèles, jeu d'évals, budget de rejeu | Une responsabilité s'assume, elle ne se délègue pas à un outil |
| **Détenteur de l'oracle** | Valide que chaque résultat attendu vient d'une source indépendante du code | C'est la définition ISTQB de l'oracle : *« should not be the code »* |
| **Coteur d'impact** (PO / DPO) | Signe et date l'axe métier de la matrice de risque | L'impact est une décision d'entreprise, pas une donnée |

#### 1.3.4 ⚠️ Pièges et anti-patterns

| Anti-pattern | Symptôme | Cause | Contre-mesure |
|---|---|---|---|
| **Mesurer sa contribution en volume produit** | « J'ai livré 340 tests » | La pénalité « exécution technique » est de **−13,8 %** chez les seniors, la prime « leadership » de **+10,6 %** [S-43] | Se mesurer en défauts réels détectés et en décisions documentées |
| **Croire que tout le monde a déjà basculé** | Décisions prises sous pression de FOMO | **43 % expérimentent, 15 % à l'échelle** [S-44] | Citer le couple 43/15 avant toute décision d'outillage |
| **Laisser l'agent décider seul de la conception des tests** | Suite verte mais pleine d'*untested decision points* | Les workflows agentiques introduisent des décisions non exigées par la spécification [S-52] | Workflow **collaboratif** sur la conception ; agentique sur la mécanique |
| **Produire des revues IA verbeuses** | Les commentaires sont ignorés | Le meilleur prédicteur de résolution est la **suggestion de code inline** ; les commentaires longs sont ignorés [S-54] | Format imposé : court, situé, avec un patch applicable |
| **Ignorer les conditions de travail** | L'équipe décroche silencieusement | Surcharge mentale et intensification documentées [S-51] ; **66 %** ne croient pas aux métriques actuelles [S-29] | Une mesure perceptuelle dans le tableau de bord (SPACE : au moins une [S-26]) |

#### 1.3.5 📊 Chiffres à retenir

- **65,6 %** de professionnels du test « Very Concerned » — mais les utilisateurs actifs d'IA sont **17 % moins anxieux** et **4× plus souvent « Zero Concern »** [S-43].
- **+10,6 % de prime « leadership » contre −13,8 % de pénalité « exécution technique »** chez les 10+ ans d'expérience [S-43].
- **43 % expérimentent la GenAI en QA, 15 % l'ont passée à l'échelle** ; la GenAI est désormais la **compétence n° 1** attendue d'un quality engineer (**63 %**) [S-44].
- **66 %** : *« AI solutions that are almost right, but not quite »*, frustration n° 1 des développeurs ; **3,1 %** seulement font « highly trust » aux sorties d'IA [S-45].
- **1 travailleur sur 4** exposé à la GenAI dans le monde ; conclusion de l'OIT : **transformation, pas disparition** [S-48].

---

## 2. Trois exemples concrets

### 🔍 Exemple A — « Le tableau de bord de priorisation, en direct » *(démonstration guidée, 6 min)*

**Contexte.** Il reste 6 heures avant le comité et 40 % du périmètre non testé. Par quoi commencer ?

**Ce qu'on montre.** Que la priorisation utile se calcule avec `git log` et une réunion de 20 minutes avec le métier — pas avec un LLM.

**Déroulé pas à pas.**

1. **Cotation d'impact avec le PO** (à faire en salle, 3 minutes chrono). Quatre features, une échelle 1-5, une justification par ligne.

```csv
# governance/impact-metier.csv
chemin;feature;impact;cote_par;date
backend/SkyRetail.Domain/Pricing/DiscountEngine.cs;F1;5;PO Pricing;2026-07-27
backend/SkyRetail.Domain/Pricing/VatCalculator.cs;F1;5;PO Pricing;2026-07-27
frontend/src/app/checkout/order-submit.component.ts;F2;4;PO Checkout;2026-07-27
backend/SkyRetail.Api/Catalog/SearchService.cs;F3;4;PO Catalogue;2026-07-27
backend/SkyRetail.Api/Me/GdprExportService.cs;F4;5;DPO;2026-07-27
frontend/src/app/account/delete-account.component.ts;F4;3;DPO;2026-07-27
```

2. **Exécution du script.**

```powershell
pwsh ./scripts/tableau-priorisation.ps1 -Depuis "6 months ago"
```

3. **Lecture du résultat.** Le classement obtenu diffère de l'intuition sur deux points, et ce sont les deux qui comptent.

| Rang | Fichier | Prob. | Impact | Risque | Ce que l'intuition disait |
|---|---|---|---|---|---|
| 1 | `DiscountEngine.cs` | 4,72 | 5 | **23,60** | ✅ « on savait » |
| 2 | `VatCalculator.cs` | 3,80 | 5 | **19,00** | ❌ « c'est une classe triviale » |
| 3 | `order-submit.component.ts` | 4,10 | 4 | **16,40** | ✅ |
| 4 | `GdprExportService.cs` | 3,15 | 5 | **15,75** | ❌ « ça n'a pas bougé depuis un an » |
| 5 | `SearchService.cs` | 2,90 | 4 | **11,60** | ✅ |

**Analyse critique.**

| Ce que le calcul apporte | Ce qu'il ne dit pas |
|---|---|
| `VatCalculator.cs` remonte parce que son **churn relatif** est élevé (petite classe, réécrite) — c'est BUG-102 | Il ne sait pas **pourquoi** il y a un risque : le calcul dit « regardez ici », pas « voici le bug » |
| `GdprExportService.cs` remonte par son **impact 5**, coté par le DPO, malgré un churn faible — c'est BUG-401 | Il ne remplace pas la revue de sécurité qui trouvera la fuite de `referrerId` |
| L'ordre est **reproductible** et **auditable** : aucun appel LLM | Il dépend entièrement de la qualité de la cotation d'impact — garbage in, garbage out |

Le fait que les deux « surprises » du classement correspondent exactement aux deux bugs les plus coûteux du dépôt n'est pas de la chance : c'est ce que mesurent le churn relatif [S-05] et la cotation d'impact [S-01].

**Ce qu'on retient.** La priorisation par les risques n'est ni de l'IA ni de la magie : c'est **`git log` + une réunion**. Et c'est le geste que **19,9 % des équipes seulement** outillent [S-20] — donc c'est là qu'est le gisement de valeur, pas dans la génération de plus de tests.

---

### 🔍 Exemple B — « La ligne 42 » *(variante, 5 min)*

**Contexte.** Le squad annonce **78 % de couverture** sur `SkyRetail.Domain`. Le comité pose sa question. On y répond en direct.

**Déroulé.**

```csharp
// backend/SkyRetail.Domain/Pricing/DiscountEngine.cs — extrait
40:  foreach (var rule in _rules.OrderBy(r => r.Priority))
41:  {
42:      if (applied.Any(a => rule.ExcludedCodes.Contains(a.Code))) continue;  // ← la ligne 42
43:      applied.Add(rule);
44:  }
```

Étape 1 — on supprime la ligne 42 et on relance :

```bash
dotnet test --filter "FullyQualifiedName~Pricing"
# Passed! - Failed: 1, Passed: 86, Skipped: 0
```

**Un seul test tombe sur 87.** La couverture n'a pas bougé : la ligne était couverte avant, la boucle est toujours exécutée. Le code est faux, la couverture est identique.

Étape 2 — on mesure la bonne chose :

```bash
dotnet stryker --project SkyRetail.Domain --threshold-break 40 --reporter html --reporter progress
```

```
Mutation score : 41.3 %
Killed: 219   Survived: 288   Timeout: 12   No coverage: 37
Fichier le plus faible : Pricing/DiscountEngine.cs — 22.8 % (61 mutants survivants)
```

**78 % de couverture, 41 % de score de mutation, et 22,8 % sur la classe la plus critique.** Voilà la réponse honnête.

**Analyse critique.**

| Ce que la couverture a mesuré | Ce que le score de mutation a mesuré |
|---|---|
| Que 78 % des lignes ont été **exécutées** | Que 58,7 % des mutations introduites **survivent** — donc ne sont pas vérifiées |
| Rien sur la présence ou la pertinence des assertions | Que `DiscountEngine` est **le point faible**, avec 61 mutants survivants |
| Une valeur stable après suppression d'une ligne fonctionnelle | Une valeur qui s'effondrerait si l'on retirait les assertions |

⚠️ **Et la nuance qui évite de remplacer un dogme par un autre.** Le score de mutation corrèle avec la détection de défauts réels **indépendamment de la couverture** [S-37] — mais cette corrélation est elle-même **confondue par la taille de la suite de tests** [S-38]. Ni l'un ni l'autre ne mesure directement le risque résiduel. Ce qu'on peut affirmer devant un comité : *« la couverture nous dit ce qui est exécuté ; le score de mutation nous dit ce qui est vérifié ; le risque résiduel, nous l'estimons par la matrice, pas par un pourcentage. »*

**Ce qu'on retient.** La réponse attendue à la question piège n° 1 n'est **pas** un chiffre de couverture. C'est : *« un seul test tombe, et c'est précisément le problème — voici notre score de mutation, voici la classe la plus faible, et voici ce que nous en faisons. »* Le mutation testing est industrialisable : **6 000 ingénieurs chez Google, ~30 % des diffs**, à condition de ne présenter que quelques mutants pertinents par diff [S-36].

---

### 🔍 Exemple C — « Le ROI honnête » *(cas d'entreprise, 4 min)*

**Contexte.** Le directeur financier veut savoir si la licence se renouvelle. Deux dossiers lui sont présentés.

**Dossier 1 — celui qui ne passe pas.**

> « Nous avons multiplié la couverture par 5 et généré 340 tests en 4 jours. En appliquant le ratio 1:10:100, chaque défaut détecté en test économise 100× son coût en production. ROI : ×47. »

Trois erreurs, chacune fatale devant un ingénieur :

| Erreur | Pourquoi elle est fatale |
|---|---|
| Le ratio **1:10:100** est un artefact documenté, reconstruit à partir de sources primaires par Bossavit [S-31] | Le DAF ne le sait peut-être pas ; un ingénieur de la salle, oui |
| **340 tests** est une mesure de production, pas de vérification | 153 ont été rejetés en revue ; le chiffre défendable est 187 |
| Aucun coût caché | Supervision, dette de maintenance, rejeu d'évals, *productivity dip* [S-25] |

**Dossier 2 — celui qui passe.**

> « Coûts directs mesurés : 214 $ de LLM sur 4 jours. Coûts cachés mesurés : 6 h 40 de supervision humaine (`claude_code.tool.blocked_on_user`), 45 % de tests générés rejetés en revue, 208 $/an de rejeu du jeu d'évals, et une dette de maintenance de 187 tests avec un propriétaire nommé.
>
> Bénéfices mesurés : score de mutation passé de non mesuré à 41 %, 7 défauts sur 9 détectés avant production dont un défaut de conformité RGPD, pipeline de 34 à 17 minutes.
>
> Ce que nous ne prétendons pas savoir : nous n'avons pas de baseline de vélocité avant IA. Le seul essai randomisé publié sur des développeurs expérimentés mesure **+19 % de temps** avec l'IA, chez des participants qui croyaient avoir gagné 20 % [S-33]. Nous recommandons de mesurer nos **cinq métriques DORA** [S-21] sur le prochain trimestre avant toute extrapolation. »

**Analyse critique.**

| Ce que le dossier 2 perd | Ce qu'il gagne |
|---|---|
| L'effet d'annonce : pas de « ×47 » | La crédibilité — chaque chiffre est traçable à une mesure |
| La simplicité | La capacité à survivre à une question de suivi |
| — | Un plan de mesure pour le trimestre suivant, avec le *productivity dip* anticipé [S-25] |

**Ce qu'on retient.** Un ROI honnête est **moins spectaculaire et infiniment plus solide**. L'écart perception/réalité de plus de 40 points mesuré par METR [S-33] n'est pas un argument contre l'IA : c'est un argument **pour la mesure**. Et la thèse DORA 2025 tient en une phrase à citer au comité : **« AI's primary role is as an amplifier »** [S-24] — ce qui signifie que le ROI dépend davantage de ce que l'organisation était avant que de l'outil qu'elle achète.

---

## 3. Quatre exercices

### 🧪 Exercice M12-1 — « La cotation d'impact »

| | |
|---|---|
| **Difficulté** | ⭐ |
| **Durée cible** | 4 min |
| **Modalité** | squad, avec le formateur dans le rôle du PO |
| **Matériel** | `governance/impact-metier.csv` (vide), `docs/cdc-v4.0.md` |
| **QA Credits** | 10 |

**Énoncé**
Cotez l'impact métier (1 à 5) des 6 composants listés dans le fichier fourni. Chaque cote porte **une justification d'une ligne** rattachée à une conséquence concrète (chiffre d'affaires, obligation légale, image, volume d'utilisateurs). Le formateur joue le PO et répondra à vos questions — mais ne cotera pas à votre place.

**✅ Résultat attendu**
- [ ] `governance/impact-metier.csv` complété : 6 lignes, colonnes `chemin;feature;impact;cote_par;date`.
- [ ] Un fichier `governance/impact-justifications.md` avec **une justification par ligne**, rattachée à une conséquence nommée.
- [ ] Au moins **une** cote justifiée par une obligation **réglementaire** (F4).
- [ ] Les cotes ne sont **pas toutes identiques** : la dispersion est le prérequis du risk-based testing.
- **Invalide** : cotes attribuées sans interroger le PO ; ou six fois la même valeur.

**💡 Indice** *(après 1 min 30)*
Une bonne question au PO n'est pas « c'est important ? » mais « combien de commandes sont concernées par jour, et que se passe-t-il si c'est faux pendant une semaine ? ».

**🔑 Solution de référence**
Cotation de référence : `DiscountEngine` 5 (impacte le prix payé sur 12 000 commandes/jour), `VatCalculator` 5 (écart comptable, enjeu fiscal), `GdprExportService` 5 (obligation légale, violation notifiable), `order-submit` 4 (double facturation, image), `SearchService` 4 (taux de conversion), `delete-account` 3 (obligation légale mais volume faible). ⚠️ Si tout est coté 5, la matrice est inutile : le RBT suppose une **distribution non homogène** [S-03].

**🎓 Ce que l'exercice enseigne vraiment**
Que l'axe métier de la matrice de risque **n'est pas calculable** et ne peut pas être délégué — ni à un outil, ni à l'IA. C'est une décision d'entreprise, signée et datée. C'est aussi la ligne du dossier que le comité vérifiera en premier.

---

### 🧪 Exercice M12-2 — « Le tableau de bord et son APFD »

| | |
|---|---|
| **Difficulté** | ⭐⭐ |
| **Durée cible** | 6 min |
| **Modalité** | binôme (rotation Pilote/Copilote) |
| **Matériel** | `scripts/tableau-priorisation.ps1`, `governance/impact-metier.csv`, `artifacts/test-history.csv` |
| **QA Credits** | 20 |

**Énoncé**
Exécutez le tableau de bord. Puis comparez deux ordonnancements sur les **9 bugs plantés** : (A) l'ordre alphabétique des fichiers, (B) l'ordre par score de risque décroissant. Calculez l'**APFD** des deux, et concluez.

**✅ Résultat attendu**
- [ ] `boss-j4/tableau-priorisation.md` et `.csv` générés, avec les colonnes Probabilité / Impact / Risque / Quadrant.
- [ ] `boss-j4/apfd.md` contient les deux valeurs d'APFD, avec le détail du calcul (rangs `TF_i` des 9 défauts).
- [ ] L'APFD de l'ordre (B) est **strictement supérieure** à celle de l'ordre (A) — sinon, expliquer pourquoi.
- [ ] Une phrase identifie le composant que le classement fait remonter **contre l'intuition** du squad.
- **Invalide** : APFD annoncée sans les rangs ; ou tableau généré sans le fichier d'impact renseigné en M12-1.

**💡 Indice** *(après 2 min 30)*
`APFD = 1 − (ΣTF_i)/(n×m) + 1/(2n)`, où `n` est le nombre de tests dans la séquence, `m` le nombre de défauts, et `TF_i` le rang du **premier** test qui détecte le défaut `i`.

**🔑 Solution de référence**
Sur la séquence de référence du dépôt, l'ordre alphabétique donne une APFD de l'ordre de 0,52 ; l'ordre par risque, de l'ordre de 0,81. Le composant contre-intuitif est `VatCalculator.cs` (churn relatif élevé sur une petite classe → BUG-102) ou `GdprExportService.cs` (impact 5 malgré un churn faible → BUG-401). ⚠️ Rappel à faire : **aucune technique de priorisation n'est universellement supérieure** [S-10] — l'APFD mesure « détecter vite », pas « couvrir large ».

**🎓 Ce que l'exercice enseigne vraiment**
Qu'une priorisation se **mesure**. Sans APFD, « notre ordre est meilleur » est une opinion ; avec, c'est un résultat comparable [S-09]. Et que les trois signaux qui suffisent à démarrer — durée, dernière exécution, historique d'échecs — sont ceux que tout runner produit déjà [S-17].

---

### 🧪 Exercice M12-3 — « Le ROI que vous oseriez montrer »

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐ |
| **Durée cible** | 6 min |
| **Modalité** | squad |
| **Matériel** | `boss-j4/observabilite.md` (M10), journal de revue, rapport Stryker |
| **QA Credits** | 40 |

**Énoncé**
Produisez `boss-j4/roi.md` : bénéfices mesurés, coûts directs mesurés, **coûts cachés mesurés**, et une section explicite « ce que nous ne prétendons pas savoir ». Interdiction d'utiliser le ratio 1:10:100. Terminez par la ligne de mesure que vous recommandez pour le trimestre suivant.

**✅ Résultat attendu**
- [ ] `boss-j4/roi.md` distingue trois blocs : bénéfices / coûts directs / **coûts cachés**, chacun avec une **source de mesure** nommée.
- [ ] Au moins **trois** coûts cachés chiffrés, dont le temps humain de supervision issu de la télémétrie M10.
- [ ] Une section « réserves » citant l'absence de baseline et le résultat METR (**+19 %**, écart de plus de 40 points).
- [ ] La recommandation de mesure nomme les **5 métriques DORA** (et non 4).
- [ ] Aucune mention du ratio 1:10:100, ni du CISQ présenté comme un flux annuel mondial.
- **Invalide** : un ROI exprimé en multiplicateur sans dénominateur explicite ; ou l'absence de la section « réserves ».

**💡 Indice** *(après 3 min)*
Le coût caché le plus facile à oublier est déjà dans votre télémétrie : `claude_code.tool.blocked_on_user`. Le deuxième est le taux de rejet en revue. Le troisième est le rejeu annuel de votre jeu d'évals.

**🔑 Solution de référence**
Voir le tableau du §1.2.3 et le « dossier 2 » de l'exemple C. Points de correction du formateur : la présence des trois coûts cachés, la formulation de la réserve METR, et l'énoncé correct des **cinq** métriques DORA avec le *deployment rework rate* [S-21], [S-22].

**🎓 Ce que l'exercice enseigne vraiment**
Qu'un ROI se défend par ce qu'il **refuse d'affirmer** autant que par ce qu'il affirme. Et que la mesure de la valeur en QA a un piège structurel documenté : **3× de vitesse pour 1,4–2× de valeur** [S-35], parce qu'on substitue vers des tâches devenues bon marché mais peu importantes.

---

### 🧪 Exercice M12-4 — « Demandez à l'IA de prioriser » ⭐⭐⭐⭐

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐⭐ |
| **Durée cible** | 7 min |
| **Modalité** | squad, puis Contre-Test croisé |
| **Matériel** | dépôt complet, `boss-j4/tableau-priorisation.md`, Claude Code |
| **QA Credits** | 80 |

**Énoncé**
Demandez à Claude Code : *« Analyse ce dépôt et donne-moi les 5 composants les plus risqués à tester en priorité, avec un score. »* Ne lui fournissez **ni** le fichier d'impact métier **ni** l'historique de tests. Comparez son classement au vôtre. Puis répondez par écrit à trois questions : (1) où l'IA a-t-elle raison ? (2) qu'est-ce qu'elle **ne peut structurellement pas** savoir ? (3) que se passe-t-il si vous lui donnez le fichier d'impact ?

**✅ Résultat attendu**
- [ ] `boss-j4/priorisation-ia.md` contient le classement brut de l'IA, **verbatim**, avec la date et l'identifiant complet du modèle.
- [ ] Un tableau de comparaison rang par rang avec `tableau-priorisation.md`.
- [ ] Les trois questions sont traitées ; la réponse à (2) nomme au moins **deux** informations structurellement inaccessibles au modèle.
- [ ] Le troisième tour (avec le fichier d'impact fourni) est exécuté et son résultat consigné.
- [ ] Une conclusion en une phrase sur la répartition des rôles humain / IA dans la priorisation.
- **Invalide** : classement de l'IA reformulé au lieu d'être cité ; ou absence du troisième tour.

**💡 Indice** *(après 3 min)*
L'IA lit le code. Elle ne lit ni votre chiffre d'affaires, ni votre registre d'incidents, ni ce que le PO a dit en réunion il y a deux heures.

**🔑 Solution de référence**

**Ce que l'IA fait bien.** Elle identifie la complexité cyclomatique, les classes longues, l'absence de tests, les motifs suspects (`catch {}` vide, arithmétique flottante sur des montants). Sur SkyRetail, elle remonte généralement `DiscountEngine.cs` en tête — et elle a raison. Elle produit aussi une justification lisible, ce que le script ne fait pas.

**Ce qu'elle ne peut structurellement pas savoir** — et c'est le cœur de l'exercice :

| Information manquante | Pourquoi elle est inaccessible | Conséquence observée |
|---|---|---|
| L'**impact métier** | Il n'est écrit nulle part dans le dépôt : c'est une décision du PO [S-01] | `GdprExportService.cs` est sous-classé ou absent du top 5 |
| Le **churn relatif** | Il est dans l'historique Git, pas dans les fichiers | `VatCalculator.cs` est jugé « trivial » — c'est BUG-102 |
| L'**historique d'échecs dé-flaké** | Il est dans les artefacts de CI [S-16] | Le modèle propose de prioriser des tests instables |
| Les **3 incidents de production ouverts** | Ils sont dans l'outil de ticketing | Aucun poids donné aux zones ayant déjà cassé |

**Le troisième tour.** Quand on fournit `impact-metier.csv`, le classement de l'IA **converge nettement** avec le tableau de bord. C'est le résultat pédagogique : le modèle n'est pas mauvais en priorisation, **il est aveugle aux entrées qu'on ne lui donne pas**. Et l'entrée décisive — l'impact métier — est précisément celle qui n'existe que si un humain la produit.

**🎓 Ce que l'exercice enseigne vraiment**

Quatre enseignements, dans cet ordre.

1. **La limite exposée n'est pas une hallucination, c'est un manque d'information.** Aucune amélioration de modèle ne la corrigera : l'impact métier n'est pas dans le code.
2. **C'est exactement le geste que 19,9 % des équipes outillent** [S-20], et c'est là que se trouve la valeur non captée — pendant que 70 % génèrent plus de cas de test.
3. **La bonne architecture est hybride** : le score technique se calcule (reproductible, auditable), l'impact se cote (humain, signé), et l'IA sert à **expliquer** et à **ordonner**, pas à décider. C'est le modèle de LLMPrior — regrouper puis prioriser algorithmiquement [S-18].
4. **C'est la description de poste du testeur augmenté.** Ce que l'IA ne remplace pas ici, ce n'est pas une compétence technique : c'est l'accès au contexte et la responsabilité de la décision.

**Contre-Test (5 min).** Le squad adverse dispose de 5 minutes pour montrer que votre tableau de bord classe **mal** un composant : soit en exhibant un bug dans un composant que vous avez mis en quadrant IV, soit en montrant qu'un poids du score est arbitraire et inversable. Contre-test réussi : **+20 QAC** à l'attaquant, **−10** au défenseur.

**Exercice bonus ⭐⭐⭐⭐⭐** — Implémentez le modèle Retecs [S-17] sur les trois signaux (durée, dernière exécution, historique d'échecs) à partir des artefacts de CI, et comparez son APFD à celle de votre tableau de bord après 5 cycles simulés. Concluez sur le rapport coût/bénéfice d'un modèle appris par rapport à une formule fixe.

---

## 4. Débriefing

### 4.1 Les cinq erreurs les plus fréquentes sur ce module

| # | Erreur | Correction |
|---|---|---|
| 1 | **Présenter la couverture comme une mesure de risque.** | La couverture mesure l'exécution. Le score de mutation corrèle avec la détection de défauts réels **indépendamment de la couverture** [S-37] — mais il est lui-même confondu par la taille de la suite [S-38]. Ni l'un ni l'autre n'est le risque résiduel. |
| 2 | **Laisser l'IA coter l'impact métier.** | L'impact est une décision signée et datée [S-01]. Une matrice que personne n'assume n'est pas défendable devant un comité. |
| 3 | **Bâtir le ROI sur le 1:10:100.** | Artefact documenté [S-31]. Le ROI se construit sur des mesures locales, avec les coûts cachés et le *productivity dip* [S-25]. |
| 4 | **Annoncer un gain de vitesse sans baseline.** | Écart perception/réalité de **plus de 40 points** mesuré [S-33] ; et l'effet 2026 est **non concluant** du fait de biais de sélection [S-34]. Mesurez vos 5 DORA [S-21]. |
| 5 | **Prioriser sur un historique non dé-flaké.** | **84 %** des transitions pass → fail impliquent un flaky [S-16] : le modèle apprend le bruit. |

### 4.2 Questions de contrôle

1. **Quels sont les deux axes d'une matrice de risque produit, et qui cote chacun ?**
   → Probabilité de défauts (risque **technique**, coté par la tech, calculable à partir du churn relatif, de la complexité, du nombre d'auteurs et des échecs réels) et impact des défauts (risque **métier**, coté par le PO/DPO, non calculable) [S-01].

2. **Pourquoi le dé-flaking est-il un prérequis de toute priorisation apprise ?**
   → Parce que **84 %** des transitions pass → fail impliquent un test flaky [S-16] : un modèle entraîné sur un historique non nettoyé apprend à prioriser l'instabilité, pas le risque.

3. **Que répondez-vous à « 78 % de couverture, si je supprime la ligne 42, combien de tests tombent ? »**
   → Le nombre exact (un seul dans notre cas), suivi de : la couverture mesure l'exécution, pas la vérification ; notre score de mutation est de 41,3 %, avec 22,8 % sur `DiscountEngine.cs` ; voici le plan de renforcement ciblé sur les mutants survivants [S-36], [S-37].

4. **Combien de métriques DORA, et quelle est la dernière édition publiée ?**
   → **Cinq** : change lead time, deployment frequency, failed deployment recovery time (throughput) ; change fail rate et **deployment rework rate** (instability). Dernière édition : **2025** [S-21], [S-22], [S-23].

5. **Que mesure exactement l'étude METR 2025, et quelle en est la conclusion pédagogique ?**
   → Un RCT sur **16 développeurs expérimentés** et **246 issues réelles** : **+19 % de temps** avec l'IA, alors qu'ils anticipaient +24 % et croyaient encore après coup avoir gagné 20 % [S-33]. La conclusion n'est ni « l'IA ralentit » ni « l'IA accélère » — METR a elle-même marqué le résultat obsolète [S-34] — c'est **« mesurez sur vos propres métriques de livraison »**.

### 4.3 Ce qu'on retient

- **La priorisation par les risques est le gisement non exploité** : 70 % des équipes utilisent l'IA pour créer des cas de test, **19,9 %** pour identifier les risques [S-20].
- **L'impact métier ne se calcule pas** : il se cote, se signe et se date. C'est la ligne qui rend une matrice défendable [S-01].
- **Couverture ≠ vérification ≠ risque résiduel** — trois choses distinctes, et aucun pourcentage ne mesure la troisième [S-37], [S-38].
- **Un ROI honnête inclut ses coûts cachés et ses réserves** ; l'écart perception/réalité mesuré est de **plus de 40 points** [S-33].
- **Ce que l'IA ne remplace pas** : l'oracle, le contexte métier, le jugement de priorisation et la responsabilité de la décision — et c'est exactement ce que le comité va vous demander.

### 4.4 Transition vers le boss final

> Vous avez le tableau de priorisation, le score de mutation, la grille de conformité et un ROI que vous osez montrer. Il ne reste plus qu'à le dire à voix haute, devant quelqu'un qui a le droit de ne pas être d'accord. **Le comité vous attend.**

---

## 5. Sources

### Sources de la notion N1 — Priorisation des tests par les risques

[S-01] **Practical Risk-Based Testing — Product RISk MAnagement: the PRISMA® method (v1.5)** — https://www.erikvanveenendaal.nl/site/wp-content/uploads/PRISMA-white-paper-v1.5.pdf — *livre blanc industriel (Erik van Veenendaal), v1.5, janvier 2018* — cotation sur **deux axes** (probabilité de défauts = risque technique ; impact = risque métier) et **matrice à quatre quadrants** ; retours d'expérience : **+10 % de Defect Detection Percentage** et note d'utilité **7,5/10** auprès d'une vingtaine d'entreprises.

[S-02] **A taxonomy of risk-based testing (Felderer & Schieferdecker)** — https://link.springer.com/article/10.1007/s10009-014-0332-3 — *article évalué par les pairs, Int. J. Softw. Tools Technol. Transf. 16(5):559-568, 2014* — taxonomie de référence en **trois classes** : risk drivers, risk assessment, risk-based test process ; définit le RBT comme l'usage de (ré)évaluations du risque pour piloter **toutes les phases** du processus de test.

[S-03] **Integrating risk-based testing in industrial test processes (Felderer & Ramler)** — https://link.springer.com/article/10.1007/s11219-013-9226-y — *article évalué par les pairs, Software Quality Journal 22(3):543-575, 2014* — identifie les prérequis du RBT en industrie : **distribution non homogène du risque** dans le produit et combinaison d'une vue technique et d'une vue métier ; bénéfices constatés : détection plus rapide et livraison plus précoce.

[S-04] **Risk-Based E-Business Testing (Gerrard & Thompson)** — https://openlibrary.org/isbn/1580533140 — *ouvrage, Artech House, 1re édition, 2002, 430 p. (ISBN-13 9781580533140)* — ouvrage fondateur du risk-based testing appliqué : inventaire de risques, matrice risque/test, et principe que la stratégie de test se déduit des risques et non de l'exhaustivité. ⚠️ *Réserve : `gerrardconsulting.com` n'héberge plus de contenu — ne pas le citer.*

[S-05] **Use of Relative Code Churn Measures to Predict System Defect Density (Nagappan & Ball)** — https://www.microsoft.com/en-us/research/publication/use-of-relative-code-churn-measures-to-predict-system-defect-density/ — *papier de recherche (ICSE 2005), Microsoft Research* — sur **Windows Server 2003**, le churn **relatif** discrimine les binaires fault-prone avec **89,0 % d'exactitude** ; ce sont les mesures relatives (normalisées par la taille), pas absolues, qui sont prédictives.

[S-06] **Mining Metrics to Predict Component Failures (Nagappan, Ball & Zeller)** — https://www.microsoft.com/en-us/research/publication/mining-metrics-to-predict-component-failures/ — *papier de recherche (ICSE 2006 / MSR-TR-2005-149), novembre 2005* — sur **cinq systèmes Microsoft** : corrélation entre entités fault-prone et complexité, mais **« there is no single set of complexity metrics that could act as a universally best defect predictor »** — les prédicteurs ne se transfèrent qu'entre projets similaires.

[S-07] **A Large-Scale Empirical Study of Just-in-Time Quality Assurance (Kamei et al.)** — https://posl.ait.kyushu-u.ac.jp/~kamei/publications/Kamei_TSE2013.pdf — *papier évalué par les pairs, IEEE TSE 39(6):757-773, juin 2013* — papier fondateur du **JIT defect prediction** : **68 % d'exactitude, 64 % de rappel** ; en évaluation sensible à l'effort, **20 % de l'effort d'inspection permet d'identifier 35 % des changements fautifs**.

[S-08] **A Systematic Survey of Just-in-Time Software Defect Prediction (Zhao, Damevski & Chen)** — https://api.crossref.org/works/10.1145/3567550 — *revue systématique évaluée par les pairs, ACM Computing Surveys 55(10), art. 201, 2023* — synthèse de **67 études** : la performance prédictive **corrèle avec le taux de changements défectueux** du projet — ces techniques marchent mieux sur du code déjà bogué. ⚠️ *Réserve : DOI inaccessible depuis le bac à sable, résumé lu via l'API Crossref.*

[S-09] **Prioritizing Test Cases For Regression Testing (Rothermel, Untch, Chu & Harrold)** — https://dblp.org/rec/journals/tse/RothermelUCH01.html — *papier canonique, IEEE Trans. Software Eng. 27(10):929-948, 2001, DOI 10.1109/32.962562* — introduit la métrique **APFD (Average Percentage of Faults Detected)**, étalon d'évaluation de toute technique de priorisation. ⚠️ *Réserve de vérification : texte intégral sous paywall IEEE, seule la notice bibliographique a pu être lue.*

[S-10] **Test Case Prioritization: A Family of Empirical Studies (Elbaum, Malishevsky & Rothermel)** — https://dblp.org/rec/journals/tse/ElbaumMR02.html — *IEEE Trans. Software Eng. 28(2):159-182, 2002, DOI 10.1109/32.988497* — compare systématiquement les techniques (aléatoire, couverture totale, couverture additionnelle, probabilité d'exposition de faute) et établit qu'**aucune n'est universellement supérieure** : le choix dépend de l'objectif. ⚠️ *Réserve : paywall, notice seule.*

[S-11] **Predictive Test Selection (Machalica, Samylkin, Porth & Chandra — Meta)** — https://arxiv.org/abs/1810.05286 — *préprint arXiv (cs.SE), v2 mai 2019* — sélection de tests par apprentissage sur l'historique : **coût total d'infrastructure de test divisé par deux**, avec **plus de 95 % des échecs de test individuels** et **plus de 99,9 % des changements fautifs** toujours remontés.

[S-12] **Predictive test selection: A more efficient way to ensure reliability of code changes (Meta Engineering)** — https://engineering.fb.com/2018/11/21/developer-tools/predictive-test-selection/ — *billet d'ingénierie officiel, 21 novembre 2018* — formulation vulgarisée à retenir : *« catch more than 99.9 percent of all regressions before they are visible… while running just a **third of all tests** that transitively depend on modified code »*.

[S-13] **Taming Google-Scale Continuous Testing (Memon et al.)** — https://research.google/pubs/taming-google-scale-continuous-testing/ — *papier évalué par les pairs (ICSE-SEIP 2017), Google Research* — trois signaux exploitables directement : **proximité** du test au code testé, **fréquence de modification** des fichiers, et le fait que **le code modifié récemment par plus de 3 développeurs casse plus souvent**.

[S-14] **Techniques for Improving Regression Testing in Continuous Integration Development Environments (Elbaum, Rothermel & Penix)** — https://research.google/pubs/techniques-for-improving-regression-testing-in-continuous-integration-development-environments/ — *papier évalué par les pairs (FSE 2014), Google* — combine sélection en pre-submit et priorisation en post-submit avec des algorithmes *« relatively inexpensive »* qui **ne s'appuient pas sur la couverture de code** — décisif quand la couverture est coûteuse à collecter sur une stack Angular + .NET.

[S-15] **Test Impact Analysis (TIA) — Azure Pipelines** — https://learn.microsoft.com/en-us/azure/devops/pipelines/test/test-impact-analysis?view=azure-devops — *doc officielle produit (Microsoft), 2026* — TIA *« automatically selects only the subset of tests required to validate the code being committed »*, avec un **repli automatique sur l'exécution complète** quand l'outil ne sait pas raisonner sur un changement : le mécanisme de fallback est le point de sécurité à souligner.

[S-16] **Flaky Tests at Google and How We Mitigate Them (John Micco)** — https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html — *billet d'ingénierie officiel (Google Testing Blog), 27 mai 2016* — **~1,5 %** des exécutions de tests remontent un résultat flaky ; **~16 %** des tests présentent une instabilité ; **~84 %** des transitions pass → fail impliquent un test flaky — d'où le dé-flaking comme prérequis de toute priorisation apprise.

[S-17] **Reinforcement Learning for Automatic Test Case Prioritization and Selection in CI (Spieker, Gotlieb, Marijan & Mossige)** — https://arxiv.org/abs/1811.04122 — *préprint arXiv de l'article ISSTA 2017, DOI 10.1145/3092703.3092709* — méthode **Retecs** : sélection et priorisation *« according to their duration, previous last execution and failure history »*, validée sur **trois études de cas industrielles** — trois signaux triviaux suffisent à démarrer.

[S-18] **Redefining Crowdsourced Test Report Prioritization with a Large Language Model (LLMPrior)** — https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4741001 — *préprint (version de revue : Information and Software Technology, 2025, DOI 10.1016/j.infsof.2024.107629)* — LLM utilisé pour **regrouper les rapports de test puis les prioriser algorithmiquement** ; les auteurs rapportent un dépassement de l'état de l'art antérieur. ⚠️ *Réserve : version publiée sous paywall, résumé lu sur SSRN.*

[S-19] **Certified Tester Advanced Level Test Management (CTAL-TM) v3.0 — ISTQB** — https://istqb.org/certifications/certified-tester-advanced-level-test-management-ctal-tm-v3-0/ — *page officielle de certification / syllabus, MAJ 24/07/2026* — contient une section entière **« Risk-based Testing »** ; business outcome : *« Organize risk identification and risk assessment sessions… and use the results to guide testing »* ; examen **50 questions, 88 points, passage 58, 120 min**.

[S-20] **The 2026 State of Testing™ Report (PractiTest × Tea-time with Testers)** — https://www.practitest.com/state-of-testing/ — *enquête sectorielle mondiale, 13ᵉ édition, page MAJ 22 juin 2026* — le « Faster Horse » : **70 % utilisent l'IA pour créer des cas de test, 19,9 % seulement pour l'identification des risques** ; **56 %** des équipes évaluées sur la couverture, **8,6 %** sur le business impact, **4,5 %** sur le NPS.

### Sources de la notion N2 — Mesurer la valeur d'une stratégie QA augmentée

[S-21] **DORA's software delivery performance metrics** — https://dora.dev/guides/dora-metrics/ — *guide de référence (Google Cloud / DORA), MAJ 5 janvier 2026* — **cinq** métriques : *throughput* (change lead time, deployment frequency, failed deployment recovery time) et *instability* (change fail rate, **deployment rework rate**) ; liste **7 pièges d'usage** explicites dont la loi de Goodhart et la « one metric to rule them all ».

[S-22] **A history of DORA's software delivery metrics** — https://dora.dev/insights/dora-metrics-history/ — *article de recherche vulgarisé (DORA), 2 janvier 2026* — retrace 2014 → 2024 : MTTR redéfini en *failed deployment recovery time* en 2023, ajout du *deployment rework rate* en 2024 ; DORA écrit que le rapport 2021 avait **« inexactement »** appelé la reliability la cinquième métrique.

[S-23] **DORA Research: 2025 (Overview)** — https://dora.dev/research/2025/ — *page programme de recherche (DORA), édition 2025* — l'archive complète liste les éditions 2014 → **2025** ; **aucune édition 2026 n'est publiée au 28/07/2026** : l'édition 2025 est bien la dernière.

[S-24] **State of AI-assisted Software Development 2025 (2025 DORA Report)** — https://dora.dev/research/2025/dora-report/ — *rapport annuel (Google Cloud, IT Revolution, GitHub, GitLab), 2025* — thèse centrale : **« AI's primary role is as an amplifier »** — l'IA amplifie les forces *et* les faiblesses organisationnelles ; les meilleurs retours viennent du système sociotechnique, pas des outils. Version abrégée disponible en français.

[S-25] **ROI of AI-assisted Software Development report (DORA)** — https://dora.dev/ai/roi/report/ — *rapport + calculateur (DORA / Google Cloud), MAJ 22 avril 2026* — publication DORA **2026** la plus récente : cadre pratique de calcul du ROI de l'IA incluant explicitement la gestion du **« productivity dip »** initial ; calculateur interactif fourni.

[S-26] **The SPACE of Developer Productivity** — https://cacm.acm.org/practice/the-space-of-developer-productivity/ — *article académique/praticien (Communications of the ACM, Forsgren, Storey, Maddila, Zimmermann, Houck, Butler), 2021* — cinq dimensions (Satisfaction, Performance, Activity, Communication, Efficiency & flow) ; recommande d'en combiner **au moins trois, dont au moins une mesure perceptuelle** ; démonte 5 mythes. ⚠️ *L'URL `queue.acm.org/detail.cfm?id=3454124` ne renvoie aucun contenu — utiliser celle-ci.*

[S-27] **DevEx: What Actually Drives Productivity** — https://queue.acm.org/detail.cfm?id=3595878 — *article académique/praticien (ACM Queue vol. 21 n°2, Noda, Storey, Forsgren, Greiler), 2023* — trois dimensions : **feedback loops, cognitive load, flow state** ; **78 %** des organisations sondées par Gartner ont une initiative DevEx ; cas eBay : **×2** sur la fréquence de release et **÷6** sur le lead time de déploiement.

[S-28] **Choosing measurement frameworks to fit your organizational goals (DORA 2025)** — https://dora.dev/research/2025/measurement-frameworks/ — *chapitre du rapport DORA 2025, MAJ 26 août 2025* — quand choisir SPACE / DevEx / H.E.A.R.T / DORA ; rappelle que **« it is a common misconception that logs-based metrics are objective »** ; sur l'IA : ne pas jeter le cadre, **ajouter** quelques mesures et **garder la baseline**.

[S-29] **The State of Developer Ecosystem Report 2025 (JetBrains)** — https://www.jetbrains.com/lp/devecosystem-2025/ — *enquête sectorielle, avril–juin 2025, **24 534 répondants** après nettoyage* — **66 % des développeurs ne croient pas — ou ne sont pas sûrs — que les métriques actuelles reflètent leur contribution réelle**, et réclament de la transparence sur les processus de mesure ; données brutes anonymisées téléchargeables.

[S-30] **Cost of Poor Software Quality in the U.S.: A 2022 Report (CISQ)** — https://www.it-cisq.org/the-cost-of-poor-quality-software-in-the-us-a-2022-report/ — *rapport (Consortium for Information & Software Quality, Herb Krasner), novembre 2022* — **au moins 2 410 milliards de $** de coût de la mauvaise qualité logicielle **aux États-Unis**, dont **~1 520 milliards de dette technique accumulée**, sur un PIB projeté de 23,35 T$ ; dernière édition d'une série biennale (2022 / 2020 / 2018).

[S-31] **The Leprechauns of Software Engineering (Laurent Bossavit)** — https://leanpub.com/leprechauns — *ouvrage, 158 p., page MAJ 20 décembre 2025* — le **chapitre 10 « The cost of defects: an illustrated history »** et l'**annexe B** retracent la fabrication du mythe **1:10:100** par citations en cascade et remontent aux sources primaires ; le ch. 5 fait le même travail sur le mythe du 10x. Extrait gratuit téléchargeable.

[S-32] **The Impact of AI on Developer Productivity: Evidence from GitHub Copilot** — https://arxiv.org/abs/2302.06590 — *expérience contrôlée (Peng, Kalliamvakou, Cihon, Demirer — GitHub/Microsoft/MIT), février 2023* — le groupe avec Copilot termine la tâche (serveur HTTP JavaScript) **55,8 % plus vite** que le groupe contrôle ; effets hétérogènes favorables aux profils juniors.

[S-33] **Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity (METR)** — https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ — *RCT (16 devs expérimentés, 246 issues réelles, dépôts 22k+ étoiles), 10 juillet 2025* — avec accès aux outils IA, les développeurs mettent **19 % de temps en plus** ; ils anticipaient **+24 %** de gain et croyaient encore après coup avoir gagné **20 %** — **plus de 40 points d'écart** perception/réalité. ⚠️ METR affiche elle-même un bandeau *« These results are out of date »*.

[S-34] **We are Changing our Developer Productivity Experiment Design (METR)** — https://metr.org/blog/2026-02-24-uplift-update/ — *note méthodologique (57 devs, 143 dépôts, 800+ tâches), 24 février 2026* — **−18 %** (IC −38 % à +9 %) pour les devs initiaux et **−4 %** (IC −15 % à +9 %) pour les nouveaux : accélération probable mais **non concluante** ; cause : **30 à 50 % des devs refusent de faire certaines tâches sans IA**, biaisant l'estimation. Mentionne que **~4 % des commits GitHub** seraient écrits par Claude Code.

[S-35] **Measuring the Self-Reported Impact of Early-2026 AI on Technical Worker Productivity (METR)** — https://metr.org/blog/2026-05-11-ai-usage-survey/ — *enquête (349 travailleurs techniques, fév.–avr. 2026), 11 mai 2026* — médiane **1,4× à 2× de gain de « valeur »** contre **3× de gain de « vitesse »** : l'écart valeur/vitesse est le résultat central ; trajectoire déclarée 1,3× (mars 2025) → 2× (mars 2026) → 2,5× attendu (mars 2027).

[S-36] **State of Mutation Testing at Google (Petrović & Ivanković)** — https://research.google/pubs/state-of-mutation-testing-at-google/ — *papier évalué par les pairs (ICSE-SEIP 2018), Google Research* — mutation testing utilisé par **6 000 ingénieurs**, touchant **plus de 14 000 auteurs de code**, sur **~30 % de tous les diffs** pour lesquels la couverture d'instructions est calculée ; la clé du passage à l'échelle est de ne présenter que quelques **mutants pertinents par diff**, pendant la revue.

[S-37] **Are Mutants a Valid Substitute for Real Faults in Software Testing? (Just et al.)** — https://homes.cs.washington.edu/~rjust/publ/mutants_real_faults_fse_2014.pdf — *papier évalué par les pairs (FSE 2014, ACM SIGSOFT Distinguished Paper)* — **357 défauts réels**, **5 applications** open source, **321 000 lignes** : corrélation statistiquement significative entre détection de mutants et détection de défauts réels, **indépendamment de la couverture de code**.

[S-38] **Are mutation scores correlated with real fault detection? (Papadakis, Shin, Yoo & Bae)** — https://dblp.org/rec/conf/icse/PapadakisSYB18.html — *ICSE 2018, pp. 537-548, DOI 10.1145/3180155.3180183* — nuance le résultat précédent : la corrélation, si elle existe, est fortement affectée par la **taille de la suite de tests** (facteur de confusion) — le contrepoint indispensable pour ne pas survendre le score de mutation. ⚠️ *Réserve : paywall ACM, notice seule.*

[S-39] **The Kirkpatrick Model** — https://www.kirkpatrickpartners.com/the-kirkpatrick-model/ — *référentiel d'évaluation de la formation, **révision 2026*** — 4 niveaux (Reaction / Learning / Behavior / Results) avec la règle **« commencer par le niveau 4 »** ; nouveauté 2026 : ajout du **« Performance Environment »** ; abandon du ROI seul au profit de **ROE, ROP et cROI** (*« results are rarely caused by a single program »*).

[S-40] **Accueil — France compétences** — https://www.francecompetences.fr/ — *site de l'institution nationale de la formation professionnelle et de l'apprentissage, page MAJ 4 mai 2026* — autorité française de référence pour le RNCP/RS et les travaux qualité. ⚠️ **Réserve d'honnêteté** : la source canonique du **Référentiel National Qualité (Qualiopi)** sur `travail-emploi.gouv.fr` renvoie un écran anti-bot et Legifrance une réponse vide au 28/07/2026 — **la version du RNQ en vigueur et sa date d'entrée en application ne sont pas confirmées ici** et doivent être vérifiées manuellement en navigateur. Ne pas confondre **Qualiopi** (organisme de formation) et **RNCP/RS** (certification professionnelle).

### Sources de la notion N3 — Le métier de testeur augmenté

[S-41] **Certified Tester Specialist Level – Testing with Generative AI (CT-GenAI) — ISTQB** — https://istqb.org/certifications/gen-ai/ — *page officielle de certification / syllabus v1.1, publié 17/07/2025, page MAJ 24/07/2026* — dédiée à l'**usage** de la GenAI sur tout le cycle de test ; gestion des risques (hallucinations, erreurs de raisonnement, biais, données personnelles, sécurité, consommation énergétique) et « AI Regulations, Standards and Best Practice Frameworks » ; examen **40 questions, 30/46 (65 %)** ; **23 678 téléchargements** du syllabus affichés.

[S-42] **Certified Tester AI Testing (CT-AI) Version 2.0 — ISTQB** — https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/ — *page officielle, MAJ 24 juillet 2026* — porte sur le test **DES** systèmes d'IA (comportement probabiliste, non-déterminisme, dépendance aux données) et les caractéristiques qualité de l'**ISO/IEC 25059** ; examen **40 questions, 29/44 points, 60 min** ; v1.0 anglaise retirée le **21 avril 2027**.

[S-43] **The 2026 State of Testing™ Report (PractiTest)** — https://www.practitest.com/state-of-testing/ — *enquête sectorielle mondiale, 13ᵉ édition, page MAJ 22 juin 2026* — **76,8 %** d'adoption de l'IA en QA ; **65,6 % « Very Concerned »** pour l'avenir du métier, mais les utilisateurs actifs d'IA sont **17 % moins anxieux** et **4× plus souvent « Zero Concern »** (« AI Paradox ») ; écart **68,9 %** praticiens vs **55,6 %** leaders ; salaires ~45 400 $ vs ~35 800 $ (**+27 %**) ; **prime « leadership » +10,6 %** contre **pénalité « exécution technique » −13,8 %** chez les 10+ ans.

[S-44] **World Quality Report 2025-26 (Capgemini / Sogeti)** — https://www.capgemini.com/insights/research-library/world-quality-report-2025-26/ — *rapport annuel, 17ᵉ édition, page MAJ 10 mars 2026* — **43 %** des organisations expérimentent la GenAI en QA mais **15 %** seulement l'ont passée à l'échelle ; **60 %** peinent sur des données de test sécurisées, **58 %** sur l'adoption des outils ; données synthétiques **14 % (2024) → 25 % (2025)** ; la **GenAI devient la compétence n° 1** attendue d'un quality engineer (**63 %**), devant les compétences QE cœur (60 %), soft skills 5ᵉ (51 %).

[S-45] **Stack Overflow Developer Survey 2025 — AI** — https://survey.stackoverflow.co/2025/ai — *enquête développeurs, 2025 (dernière édition consultable au 28/07/2026)* — **84 %** utilisent ou prévoient d'utiliser l'IA, **51 %** quotidiennement ; **46 %** se défient de l'exactitude contre **33 %** qui font confiance, **3,1 %** seulement « highly trust » ; frustration n° 1 : *« AI solutions that are almost right, but not quite »* — **66 %** ; *« debugging AI-generated code is more time-consuming »* — **45,2 %** ; raison n° 1 de demander de l'aide à un humain : *« quand je ne fais pas confiance aux réponses de l'IA »* (**75,3 %**).

[S-46] **The State of Developer Ecosystem Report 2025 — Artificial Intelligence (JetBrains)** — https://devecosystem-2025.jetbrains.com/artificial-intelligence — *enquête développeurs, 24 534 répondants, avril–juin 2025* — volet IA du rapport ; fournit le chiffre transversal **66 %** de développeurs qui ne croient pas / ne sont pas sûrs que les métriques actuelles reflètent leur contribution ; données brutes ouvertes (`RawData.zip`) exploitables en TP.

[S-47] **The Future of Jobs Report 2025 (World Economic Forum)** — https://www.weforum.org/publications/the-future-of-jobs-report-2025/ — *rapport, publié le 7 janvier 2025 (dernière édition au 28/07/2026)* — base : **plus de 1 000 employeurs représentant plus de 14 millions de travailleurs, 22 clusters industriels, 55 économies**, horizon 2025-2030 ; référence pour situer le métier de testeur dans la recomposition générale des compétences.

[S-48] **Generative AI and Jobs: A Refined Global Index of Occupational Exposure (ILO Working Paper 140)** — https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure — *working paper (OIT × NASK), 20 mai 2025, page MAJ 02/03/2026* — 29 753 tâches, **52 558 points de données sur 2 861 tâches** : **1 travailleur sur 4** dans le monde occupe un emploi exposé à la GenAI ; **3,3 %** de l'emploi mondial dans la catégorie d'exposition la plus élevée ; **11 %** dans les pays à bas revenu contre **34 %** dans les pays à haut revenu ; conclusion : **transformation des emplois, pas disparition**.

[S-49] **Disruption without dividend? (ILO Working Paper 166)** — https://www.ilo.org/publications/disruption-without-dividend-how-digital-divide-and-task-differences-split — *working paper (OIT), 17 mars 2026* — publication OIT la plus récente : **30–32 %** de l'emploi exposé dans les pays à haut revenu contre **10–15 %** dans les pays à bas revenu ; **441,8 millions d'emplois** relèvent de gradients d'« augmentation », dont **~66,9 millions sans accès à Internet** ; les indices d'exposition standards **surestiment** l'impact dans les pays en développement.

[S-50] **Gen-AI: Artificial Intelligence and the Future of Work (FMI)** — https://www.imf.org/en/Publications/Staff-Discussion-Notes/Issues/2024/01/14/Gen-AI-Artificial-Intelligence-and-the-Future-of-Work-542379 — *Staff Discussion Note 2024/001, 41 p., 14 janvier 2024* — les économies avancées ressentent bénéfices et écueils plus tôt du fait de leur structure d'emploi **à forte intensité cognitive** ; **femmes et diplômés du supérieur plus exposés mais mieux placés** pour en tirer parti ; les travailleurs âgés s'adaptent moins facilement.

[S-51] **Intelligence artificielle et travail (France Stratégie / Haut-commissariat à la Stratégie et au Plan)** — https://www.strategie-plan.gouv.fr/publications/intelligence-artificielle-travail — *rapport officiel français, publié 28/03/2018, MAJ 20/05/2025* — trois axes : prospective de branche, **formation des travailleurs aux enjeux techniques, juridiques, économiques et éthiques de l'IA**, sécurisation des parcours ; insiste sur les **risques de conditions de travail** (perte d'autonomie, surcharge mentale, intensification). ⚠️ Limite à annoncer : corps du rapport daté de 2018 — à utiliser pour le cadre d'analyse, pas pour des chiffres 2026. ⚠️ `strategie.gouv.fr` redirige désormais vers `strategie-plan.gouv.fr`.

[S-52] **Vibe Coding: An Experiment with Test-Driven Development (Mock & Russo)** — https://arxiv.org/abs/2607.22406 — *étude académique, soumise le 24 juillet 2026* — compare 4 modèles d'interaction (solo / collaboratif humain-LLM / entièrement automatisé / agentique) sur des workflows TDD : les workflows **agentiques** produisent du code rapide et fonctionnellement correct **mais introduisent des décisions non exigées par la spécification, créant des « untested decision points »** ; les workflows **collaboratifs** produisent des suites de tests **de meilleure qualité et mieux organisées**.

[S-53] **How Do AI Coding Agents Contribute to Software Development? An Empirical Study of Agentic Pull Requests** — https://arxiv.org/abs/2607.21832 — *étude longitudinale (Polytechnique Montréal, dataset AIDev), soumise le 23 juillet 2026* — compare PR agentiques et PR humaines dans le temps : taux de merge, types de tâches confiées aux agents, et caractéristiques ayant des implications sur la **qualité logicielle** ; perspective explicitement nuancée sur bénéfices et limites en conditions réelles.

[S-54] **« Go Home Copilot, You're Drunk »: Understanding Developer Responses to Agent-Generated Code Review Comments** — https://arxiv.org/abs/2607.21997 — *étude académique à grande échelle (SMU), soumise le 24 juillet 2026* — **54 791 commentaires** produits par **5 agents** (Copilot, Cursor, Codex, Devin, Claude) sur **342 dépôts** ; Copilot concentre **72,9 %** des commentaires résolus ; card sorting sur **470 discussions non résolues** → **10 motifs**, les plus fréquents étant les **suggestions incorrectes** et les **décisions de conception intentionnelles** ; le meilleur prédicteur de résolution est la **présence d'une suggestion de code inline**.

[S-55] **TMMi Model + TMMi Documents** — https://www.tmmi.org/tmmi-model/ — *documentation officielle du modèle de maturité du test, MAJ 01/07/2026* — cinq niveaux (Initial, Managed, Defined, Measured, Optimization) ; la version courante est le **TMMi Framework Model v2.0**, qui intègre Agile/DevOps et une connexion explicite au Quality Engineering et à l'IA, avec un document dédié **« Testing AI-systems and TMMi – V1.0 »** ; adoption : **135 évaluations en 2024 (+75 %)**.

[S-56] **CFTL — Comité Français des Tests Logiciels** — https://cftl.fr/ — *site officiel du member board français de l'ISTQB, MAJ 09/03/2026* — le CFTL agit *« en tant qu'unique représentant de l'ISTQB® … en France et dans tous les pays francophones ne possédant pas de comité »* : il fait administrer les examens et accrédite formateurs et organismes ; la page pédagogique associée avance **plus d'un million de personnes certifiées ISTQB** dans le monde. ⚠️ *Réserve : `glossary.istqb.org` est une SPA JavaScript renvoyant un corps vide au fetch — ne pas citer de définition verbatim sans vérification en navigateur.*

---

## 6. 👑 Boss final — « Le Comité de Go/No-Go » *(60 min, 300 QAC)*

> Section hors gabarit standard. Elle est destinée au **formateur** ; les §6.1 à §6.3 sont projetés aux participants, les §6.5 et §6.6 ne le sont **qu'après** le passage de tous les squads.

### 6.1 Mise en situation *(à lire à voix haute, 2 min)*

> Il est 16 h 40. La v4.0 part en production demain matin à 8 h.
>
> Le comité de direction est réuni. Il comprend le **directeur technique**, qui a signé le budget de la Task Force et devra assumer la décision devant le comex ; le **métier**, qui a promis la nouvelle grille de remises aux 340 000 clients ; et le **DPO**, qui a lu la presse sur les fuites de données et n'a pas envie d'y figurer.
>
> Chaque squad dispose de **10 minutes**. Cinq minutes pour exposer, cinq pour tenir sous contradiction.
>
> Le comité ne vous demande pas si vous avez bien travaillé. Il vous demande **une décision**, et il vous demande de l'assumer.

### 6.2 Consignes aux squads *(projetées, distribuées en début de M12)*

**Livrable unique** : `DOSSIER-DE-RECETTE.md`, 4 à 6 pages, commité sur la branche du squad avant le début du comité. Un dossier commité après l'heure n'est pas recevable.

**Sept sections obligatoires** — l'ordre est imposé, il est celui dans lequel le comité lit :

| § | Contenu | Longueur indicative |
|---|---|---|
| 1 | **Recommandation** : Go, Go conditionnel ou No-Go — assumée en **une phrase**, en tête de document | 3 lignes |
| 2 | **Cartographie des risques** : matrice probabilité × impact sur les 4 features, avec la **couverture de test associée à chaque risque** | 1 page |
| 3 | **Preuves** : couverture, score de mutation, charge (p95), scan sécurité, violations a11y | 1 page |
| 4 | **Ce que l'IA a fait, ce que l'humain a validé** : tableau de traçabilité | ½ page |
| 5 | **Conformité** : données de test, base légale, rétention fournisseur, positionnement AI Act | 1 page |
| 6 | **Coût et ROI** : tokens consommés, temps humain, **dette de maintenance créée** | ½ page |
| 7 | **Dettes ouvertes** : ce qui n'a pas été testé, et **pourquoi** | ½ page |

**Règles de soutenance.**

- **Le Pilote du comité n'est ni le Pilote ni le Copilote du module précédent.** Rotation obligatoire : c'est le mécanisme qui empêche qu'un seul participant porte la formation.
- Un **seul** support autorisé : le `DOSSIER-DE-RECETTE.md` projeté. Pas de slides.
- Toute affirmation chiffrée doit pouvoir être **rejouée en direct** si le comité le demande (commande, fichier, capture).
- « Je ne sais pas » est une réponse **acceptée et valorisée**. « On pense que » sans preuve ne l'est pas.
- Le squad qui répond « on a tout testé » perd immédiatement les points du critère « dettes ouvertes ».

**Ce que le comité juge — annoncé d'avance, sans ambiguïté** : la **qualité du raisonnement sous contradiction**, pas le volume de travail. Un squad qui recommande un No-Go bien argumenté marque plus qu'un squad qui recommande un Go non défendable.

### 6.3 Déroulé minuté

| Temps | Séquence | Qui | Détail |
|---|---|---|---|
| **T0 → T+5** | Installation et distribution des rôles | Formateur | Le formateur endosse le rôle de **directeur technique**. Les squads qui ne passent pas reçoivent un rôle : **métier** (F1/F2) ou **DPO** (F4) — avec deux questions préparées chacun |
| **T+5 → T+15** | **Passage du squad 1** | Squad 1 | 5 min d'exposé chronométré (coupé net à 5 min) + 5 min de contradiction |
| **T+15 → T+25** | **Passage du squad 2** | Squad 2 | idem |
| **T+25 → T+35** | **Passage du squad 3** | Squad 3 | idem |
| **T+35 → T+44** | **Les trois questions pièges** | Formateur | Tour rapide : 3 min par squad, les 3 questions posées à chacun. Aucun temps de préparation |
| **T+44 → T+50** | **Délibération** | Formateur (huis clos) | Pendant ce temps, chaque squad rédige en 5 lignes : *« la chose que nous referions autrement »* — c'est noté au critère 6 |
| **T+50 → T+58** | **Verdict et barème à voix haute** | Formateur | Chaque critère est annoncé et justifié en une phrase. Aucune note globale sans justification |
| **T+58 → T+60** | Attribution des QAC, mise à jour du `SCOREBOARD.md` | Formateur | Puis enchaînement direct sur la clôture (§7) |

**Chronométrage** : les 5 minutes d'exposé sont coupées **net**. C'est une contrainte pédagogique assumée — un comité réel coupe aussi. Les squads qui n'ont pas atteint la recommandation en 5 minutes découvrent qu'ils l'avaient mise à la fin.

### 6.4 Rôle du formateur

**Pendant l'exposé.** Ne rien dire. Prendre des notes visibles. Le silence est un outil : il révèle les squads qui meublent.

**Pendant la contradiction.** Le directeur technique n'est ni hostile ni complaisant. Il est **exigeant sur la traçabilité**. Cinq relances à avoir en poche :

| Relance | Ce qu'elle teste | Réponse faible | Réponse forte |
|---|---|---|---|
| *« Ce chiffre, montrez-le-moi. »* | La rejouabilité | « Il est dans le rapport » | Le squad lance la commande et projette la sortie |
| *« Qui a décidé que cet impact valait 5 ? »* | La cotation métier [S-01] | « On a estimé » | « Le PO Pricing, le 27/07, motif : impacte le prix payé sur 12 000 commandes/jour » |
| *« Vous recommandez un Go. Qu'est-ce qui vous ferait changer d'avis ? »* | La réversibilité du raisonnement | « Rien, on est confiants » | Trois conditions nommées, mesurables, avec un seuil |
| *« Qu'est-ce que vous n'avez pas testé ? »* | L'honnêteté | « On a couvert l'essentiel » | Une liste, avec pour chaque ligne le risque accepté et par qui |
| *« Si ça casse demain, c'est la faute de qui ? »* | L'appropriation de la responsabilité | « De l'IA / du modèle » | « De nous. L'agent a proposé, nous avons validé. Voici la trace. » |

**Le piège à ne pas tendre.** Ne pas exiger un Go. Un No-Go argumenté sur BUG-401 non corrigé est une **excellente** réponse, et il faut le dire au débriefing. L'objectif du boss n'est pas de faire livrer, c'est de faire **décider et assumer**.

**Ce que le formateur doit repérer et noter** — les trois signaux qui distinguent un squad qui a compris la formation :

1. Il distingue **couverture** et **vérification** sans qu'on le lui demande.
2. Il présente ses **coûts cachés** de lui-même, pas sous la contrainte.
3. Il nomme un **propriétaire** pour chaque dette ouverte, avec une date.

### 6.5 Barème complet — 300 QAC

| # | Critère | Points | Détail de la notation |
|---|---|---|---|
| 1 | **Recommandation claire et défendue sous contradiction** | **60** | 20 : recommandation en une phrase, en tête de document · 20 : trois conditions nommées si « conditionnel » · 20 : tient sous les cinq relances sans se contredire |
| 2 | **Matrice de risques cohérente avec les preuves** | **60** | 15 : deux axes distincts, impact **coté et signé** [S-01] · 15 : les 4 features couvertes · 15 : la couverture de test est **rattachée à chaque risque** · 15 : les 9 défauts sont positionnés (ou l'absence est justifiée) |
| 3 | **Traçabilité IA / humain complète** | **50** | 20 : tableau présent, une ligne par artefact majeur · 15 : distingue « généré », « revu », « rejeté » avec des **volumes** · 15 : nomme la personne qui a validé |
| 4 | **Volet conformité correct (RGPD + AI Act)** | **40** | 10 : provenance des données de test · 10 : rétention fournisseur **chiffrée** · 10 : positionnement AI Act avec les **dates révisées** · 10 : réserve explicite sur l'adoption formelle |
| 5 | **Chiffrage ROI honnête, coûts cachés inclus** | **40** | 15 : coûts directs mesurés (pas estimés) · 15 : **au moins trois coûts cachés** · 10 : section « ce que nous ne prétendons pas savoir » |
| 6 | **Réponse aux 3 questions pièges** | **50** | Voir §6.7 — barème détaillé par question |
| | **Bonus** | | |
| B1 | Le squad présente ses coûts cachés **spontanément** | **+20** | Sans y être invité |
| B2 | Le squad recommande un **No-Go ou un Go conditionnel argumenté** sur BUG-401 | **+20** | La conformité prime sur le calendrier — et c'est défendu |
| B3 | Le squad rejoue une preuve **en direct** à la demande du comité | **+15** | Commande lancée, sortie projetée |
| | **Malus** | | |
| M1 | Affirmation chiffrée non rejouable | **−30** | Par occurrence, plafonné à −60 |
| M2 | « On a tout testé » | **−40** | Immédiat, sans discussion |
| M3 | Le score de mutation n'est pas mesuré, mais la couverture est présentée comme preuve de risque maîtrisé | **−30** | C'est l'erreur centrale du module |
| M4 | Responsabilité attribuée à l'IA | **−40** | « C'est le modèle qui… » |

**Seuil de réussite du boss** : 180/300. En dessous, le squad conserve les points acquis mais n'obtient pas les 300 QAC du boss.

### 6.6 Corrigé de référence — `DOSSIER-DE-RECETTE.md`

> Rédigé **en entier**, tel qu'un excellent squad le produirait. À ne distribuer **qu'après** le passage de tous les squads. Le formateur peut le projeter en comparaison ligne à ligne.

---

```markdown
# DOSSIER DE RECETTE — SkyRetail v4.0

**Émetteur** : Task Force QA (Squad GUARDIAN) · **Date** : 28 juillet 2026, 16 h 30
**Destinataire** : Comité de Go/No-Go · **Périmètre** : release v4.0, features F1 à F4
**Auteur du dossier** : <nom> · **Relecteur** : <nom> · **Version** : 1.0 (figée avant comité)

---

## 1. Recommandation

> **GO CONDITIONNEL** sur F1, F2 et F3. **NO-GO sur la fonction d'export de données
> personnelles de F4**, à livrer désactivée par feature flag jusqu'à correction et
> vérification de la fuite d'identifiant tiers (R-08 / BUG-401).

Trois conditions, toutes vérifiables, toutes bloquantes :

| # | Condition | Vérifiable par | Responsable | Échéance |
|---|---|---|---|---|
| C1 | `Features:GdprExport` livré à `false` en production | Configuration de déploiement + test de fumée | Lead back-end | avant mise en production |
| C2 | Le test `Export_NeContientAucunIdentifiantTiers` est vert et non ignoré | `dotnet test --filter Gdpr` | QA | avant réactivation du flag |
| C3 | Astreinte renforcée sur les 48 h suivant la mise en production, avec seuil d'alerte p95 `/api/products/search` à 800 ms | Tableau de bord APM | SRE | J+2 |

**Ce qui nous ferait changer d'avis et passer en No-Go global** : la découverte d'un second
défaut de conformité, ou l'impossibilité de désactiver la fonction d'export par configuration.

---

## 2. Cartographie des risques

**Méthode.** Matrice à deux axes [PRISMA] : *probabilité de défauts* (risque technique,
calculée par `scripts/tableau-priorisation.ps1` — churn relatif, complexité, nombre d'auteurs,
échecs réels hors flaky) × *impact des défauts* (risque métier, **coté et signé** par le PO et
le DPO le 27/07/2026, fichier `governance/impact-metier.csv`).

**Prérequis vérifié** : la distribution du risque est non homogène (scores de 2,4 à 23,6),
condition d'utilité de la priorisation par les risques.

| ID | Risque | Feature | Défaut | P | I | Score | Quadrant | Couverture de test associée | Statut |
|---|---|---|---|---|---|---|---|---|---|
| R-01 | Deux remises exclusives se cumulent selon l'ordre d'application → perte de marge | F1 | BUG-101 | 4 | 5 | **20** | I | 14 tests unitaires xUnit + 1 propriété FsCheck (exclusivité invariante par permutation) | ✅ corrigé — test rouge écrit **avant** correctif |
| R-02 | Arrondi TVA au demi-centime supérieur → écart comptable au-delà de 7 lignes | F1 | BUG-102 | 4 | 5 | **20** | I | Test paramétré 200 paniers + propriété `Σ TVA(ligne) == TVA(Σ lignes)` | ✅ corrigé (`MidpointRounding.ToEven`) |
| R-03 | Plafond de remise 30 % non appliqué si le panier contient une précommande | F1 | BUG-103 | 3 | 5 | **15** | I | Analyse de branches + 6 tests sur `IsPreOrder` | ✅ corrigé |
| R-04 | Double-clic sur « Valider » → deux commandes créées (pas d'idempotence) | F2 | BUG-201 | 4 | 4 | **16** | I | E2E Playwright (double clic 50 ms) + test de concurrence 20 requêtes parallèles | ✅ corrigé (clé d'idempotence côté API) |
| R-05 | Bouton « Payer » actif 400 ms après soumission → cause racine de 7 des 12 tests flaky | F2 | BUG-202 | 5 | 3 | **15** | I | Trace Playwright, assertion sur l'état `disabled` immédiat | ✅ **cause racine** corrigée, aucun `retry` ajouté |
| R-06 | `GET /api/products?page=-1` renvoie 500 au lieu de 400 | F3 | BUG-301 | 3 | 2 | **6** | III | Test de contrat OpenAPI + fuzzing de paramètres | ✅ corrigé |
| R-07 | Recherche full-text en O(n²) au-delà de 5 000 produits → p95 > 4 s | F3 | BUG-302 | 4 | 4 | **16** | I | k6 en modèle ouvert, seuil `p(95) < 800` à 12 000 produits | ✅ corrigé (index `tsvector` + GIN) — p95 mesuré à **90 ms** |
| R-08 | **L'export RGPD contient l'identifiant interne d'un autre utilisateur (`referrerId`)** | F4 | BUG-401 | 3 | 5 | **15** | I | Test de conformité `Export_NeContientAucunIdentifiantTiers` | 🔴 **NON corrigé — bloquant, voir §1** |
| R-09 | Formulaire de suppression de compte sans `<label>` associé et inatteignable au clavier | F4 | BUG-402 | 2 | 4 | **8** | II | `@axe-core/playwright` + test d'atteignabilité clavier explicite | ✅ corrigé |
| R-10 | **Risque résiduel de vérification** : score de mutation à 41,3 % sur le domaine | transverse | — | 3 | 4 | **12** | I | Stryker.NET, rapport HTML joint | ⚠️ **ouvert et assumé** — voir §7 |
| R-11 | Dérive du modèle appelé par l'agent de test → régression silencieuse des générations | transverse | — | 3 | 3 | **9** | II | Jeu d'évals 10 cas (`evals/agent-zero.yaml`) + registre de modèles + test de garde à 90 j | ⚠️ maîtrisé, propriétaire nommé |
| R-12 | Pic Black Friday à 90 000 commandes/jour (7,5× le nominal) | F2 + F3 | — | 3 | 5 | **15** | I | Test de charge à 3× seulement ; extrapolation non validée | ⚠️ **partiel — voir §7** |

**Lecture de la matrice.** Onze des douze risques sont en quadrant I ou II — c'est cohérent
avec un produit en refonte à chaud. Le seul risque de score élevé encore **ouvert et non
mitigé** est R-08, ce qui fonde la recommandation du §1. R-10 et R-12 sont ouverts mais
**mitigés par une décision explicite** (voir §7).

---

## 3. Preuves

Toutes les valeurs ci-dessous sont rejouables par les commandes indiquées.

| Preuve | Avant (J1) | Après (J4) | Commande de vérification |
|---|---|---|---|
| Couverture de lignes back-end | 12 % | **61 %** | `dotnet test /p:CollectCoverage=true` |
| Couverture front-end | 0 % | **34 %** | `ng test --code-coverage` |
| **Score de mutation** `SkyRetail.Domain` | non mesuré | **41,3 %** | `dotnet stryker --project SkyRetail.Domain` |
| dont `Pricing/DiscountEngine.cs` | non mesuré | **68,4 %** (22,8 % avant renforcement ciblé) | rapport Stryker HTML |
| Tests en `[Skip]` | 9 | **0** | `grep -r "Skip" SkyRetail.Tests/` |
| Tests flaky identifiés | 12 | **1** (en quarantaine tracée) | Historique CI, 20 exécutions |
| Durée de pipeline | 34 min | **17 min** | GitHub Actions |
| Charge — p95 `/api/products/search` à 12 000 produits | 4,87 s | **90 ms** | `k6 run perf/search-breakpoint.ts` |
| Charge — taux d'erreur au palier 150 req/s | 6,42 % | **0,04 %** | idem |
| Sécurité — findings critiques (scan) | non mesuré | **0** | rapport de scan joint |
| Sécurité — test d'injection indirecte sur PR de fork | inexistant | **vert** | `PromptInjectionGuardTests` |
| Accessibilité — violations axe-core critiques/sérieuses sur le parcours F4 | non mesuré | **0** | `npx playwright test a11y` |
| Jeu d'évals de l'agent — rappel / précision | inexistant | **7/9 · 100 %** | `npx promptfoo eval -c evals/agent-zero.yaml` |

**Réserves de lecture, énoncées volontairement :**

- **61 % de couverture ne signifie pas 61 % de risque couvert.** La couverture mesure
  l'exécution. Notre indicateur de vérification est le score de mutation, à **41,3 %**.
- **Zéro violation axe-core ne signifie pas conformité WCAG 2.2.** L'outil détecte environ
  57 % des problèmes et son catalogue ne comporte qu'**une seule règle** WCAG 2.2. Un audit
  manuel reste nécessaire — il est en dette ouverte (§7).
- **7/9 sur le jeu d'évals** : les deux cas non détectés par l'agent seul (BUG-202 et BUG-401)
  l'ont été par un humain. C'est précisément le périmètre où l'agent n'est pas autonome.

---

## 4. Ce que l'IA a fait, ce que l'humain a validé

| Artefact | Produit par | Volume brut | Retenu | Rejeté | Validé par | Motif principal de rejet |
|---|---|---|---|---|---|---|
| Tests unitaires .NET (F1, F3) | Agent Zéro | 214 | **121** | 93 | <nom>, revue de PR | Assertion dérivée du code (tautologie), pas de la spécification |
| Tests E2E Playwright (F2) | Agent Zéro + codegen | 68 | **41** | 27 | <nom> | Sélecteurs non confrontés au DOM réel |
| Scénarios de charge k6 (F3) | Agent Zéro | 9 | **4** | 5 | <nom> | Modèle fermé au lieu d'un exécuteur à taux d'arrivée |
| Tests a11y (F4) | Agent Zéro | 12 | **9** | 3 | <nom> | Tests redondants avec la règle axe par défaut |
| Jeux de données de test | Agent Zéro | 1 seed | **1 seed** | 0 | <nom> + DPO | — (généré depuis le schéma, jamais extrait de production) |
| **Cotation d'impact métier** | **Humain uniquement** | — | 6 lignes | — | **PO Pricing, PO Checkout, PO Catalogue, DPO** | Non délégable |
| **Décision Go / No-Go** | **Humain uniquement** | — | — | — | **Task Force QA** | Non délégable |
| Correctifs de production | **Humain uniquement** | 8 correctifs | 8 | — | Lead back-end / lead front | L'agent est configuré pour proposer, jamais pour modifier le code de production |

**Total** : 303 artefacts générés, **176 retenus (58 %)**, 127 rejetés en revue humaine.

**Le garde-fou qui a servi** : un hook `PreToolUse` bloque toute écriture de l'agent hors du
répertoire de tests et toute modification d'assertion existante. Il s'est déclenché **4 fois**
pendant la semaine — journal joint. Aucune assertion n'a été modifiée silencieusement.

---

## 5. Conformité

| # | Exigence | Réponse | Preuve | Statut |
|---|---|---|---|---|
| C-1 | Provenance des données de test | Générées synthétiquement depuis le schéma PostgreSQL ; **aucune extraction de production**. Au sens de la doctrine CNIL, des données fictives de même structure non liées à une personne ne sont pas des données personnelles | `data/seed-synthetique.sql`, script versionné | ✅ |
| C-2 | Test d'anonymat à trois critères | Individualisation : non · Corrélation : non · Inférence : non | `tests/AnonymisationChecklist.md`, contresigné DPO | ✅ |
| C-3 | Base légale | Sans objet en pratique (aucune donnée personnelle traitée) ; intérêt légitime documenté au registre pour le traitement de recette | Registre des traitements, fiche « recette v4.0 » | ✅ |
| C-4 | AIPD | Non requise — décision motivée et datée du DPO au 26/07/2026 | Note DPO | ✅ |
| C-5 | Sous-traitance art. 28 | DPA signé ; clauses contractuelles types (UE) 2021/914 modules 2 et 3 ; entité contractante irlandaise pour l'EEE ; notification de violation sous 48 h | Copie du DPA | ✅ |
| C-6 | Rétention fournisseur | **Configurée à 30 jours** — le réglage par défaut est une rétention indéfinie, il ne se présume pas | Capture de configuration + journal d'audit | ✅ |
| C-7 | Résidence des données et d'inférence | UE, configurée via le fournisseur cloud. ⚠️ « UE » ne signifie pas « France » : l'inférence peut avoir lieu dans un autre État membre | Capture de configuration de région | ⚠️ documenté |
| C-8 | Périmètre réel des données transmises | `permissions.deny` sur `.env`, `appsettings.Production.json`, `~/.ssh` ; sandbox avec `credentials.mode: "deny"` ; politique de fichiers ouverts diffusée à l'équipe | `.claude/settings.json` versionné | ✅ |
| C-9 | Prompt injection indirecte | L'agent s'exécute sans secrets et sans réseau sortant hors registres de paquets sur toute PR issue d'un fork ; son rapport est traité comme une donnée non fiable | Workflow CI + `PromptInjectionGuardTests` (canari) | ✅ |
| C-10 | Supply chain | Vérification d'existence de chaque dépendance suggérée (taux d'hallucination de paquets documenté à 5,2 % / 21,7 % selon le type de modèle) ; serveurs MCP épinglés et réapprouvés à tout changement de description | Étape `verify-deps` du pipeline | ✅ |
| C-11 | **Positionnement AI Act** | L'Agent Zéro **n'est pas un système d'IA à haut risque** dans le contexte SkyRetail : il ne relève ni de l'annexe III, ni de l'annexe I. Obligations de transparence de l'article 50 examinées — **échéance 2 août 2026, inchangée**. Le haut risque annexe III est reporté au **2 décembre 2027** et l'annexe I au **2 août 2028**, dates issues de l'**accord politique du 7 mai 2026, en attente d'adoption formelle** | Sortie du Compliance Checker officiel + arbre de décision joint | ✅ |
| C-12 | Cadre de management | **Alignement volontaire** avec ISO/IEC 42001. Nous ne revendiquons **aucune présomption de conformité** à l'AI Act : seules les normes harmonisées CEN-CENELEC référencées au JOUE la conféreront | Note de positionnement | ⚠️ déclaratif, assumé |
| C-13 | **Violation de données potentielle** | BUG-401 qualifié comme violation au sens de l'art. 33 s'il atteignait la production : l'export livre l'identifiant interne d'un tiers | Test de non-régression bloquant | 🔴 **bloquant — fonde le No-Go partiel du §1** |

---

## 6. Coût et ROI

**Ce que nous avons mesuré.**

| Poste | Valeur | Source de la mesure |
|---|---|---|
| Consommation LLM, 4 jours, 1 squad | **71 $** (214 $ pour les 3 squads) | `claude_code.cost.usage` |
| Tokens consommés | 41,2 M dont 33,8 M en lecture de cache | `claude_code.token.usage` |
| Temps humain de production | 4 j × 5 h 15 × 2 personnes | Planning |
| **Temps humain de supervision** | **2 h 15** (attente de décisions de permission) | `claude_code.tool.blocked_on_user` |
| **Taux de rejet en revue** | **42 %** (127 artefacts sur 303) | Journal de revue |
| **Dette de maintenance créée** | **176 tests** à maintenir, propriétaire nommé (voir §7) | Plan de maintenance |
| **Coût de rejeu du jeu d'évals** | ~3,80 $ par run × 52 semaines = **≈ 198 $/an** | `evals/agent-zero.yaml` |
| **Productivity dip** initial | ≈ 1,5 jour-homme (prise en main de l'outillage) | Observation, cadre DORA ROI 2026 |

**Ce que nous ne prétendons pas savoir.**

> Nous ne revendiquons **aucun gain de vitesse chiffré**, faute de baseline mesurée avant
> l'introduction de l'IA. Le seul essai randomisé publié sur des développeurs expérimentés
> travaillant sur leur propre code mesure **+19 % de temps** avec les outils d'IA, chez des
> participants qui anticipaient +24 % de gain et croyaient encore, après coup, avoir gagné
> 20 % — soit plus de 40 points d'écart entre perception et réalité. Nous n'avons pas les
> données pour affirmer que notre cas est différent.
>
> Ce que nous revendiquons est mesuré : un score de mutation passé de « non mesuré » à
> **41,3 %**, **7 défauts sur 9 détectés avant production** dont un défaut de conformité,
> et un **pipeline divisé par deux**.

**Recommandation de mesure pour le trimestre suivant** : établir la baseline des **cinq**
métriques DORA (change lead time, deployment frequency, failed deployment recovery time,
change fail rate, deployment rework rate), plus deux indicateurs QA — score de mutation et
taux de détection de défauts avant production — et ne conclure qu'à T+3 mois.

---

## 7. Dettes ouvertes

| # | Ce qui n'a pas été testé | Pourquoi | Risque accepté par | Échéance |
|---|---|---|---|---|
| D-1 | **BUG-401 non corrigé** (fuite d'identifiant tiers dans l'export RGPD) | Correction identifiée mais non validée ; le délai ne permet pas la vérification | **No-Go partiel — non accepté**, la fonction part désactivée | avant réactivation du flag |
| D-2 | Score de mutation à **41,3 %** : 288 mutants survivent | Le renforcement a été ciblé sur `DiscountEngine` (68,4 %) faute de temps | Directeur technique | 60 % sur le domaine à T+1 mois |
| D-3 | Charge validée à **3×** le nominal, pas à **7,5×** (pic Black Friday) | Environnement de charge non dimensionné pour 90 000 commandes/jour | Métier | test à 7,5× avant le 1er novembre |
| D-4 | **Audit d'accessibilité manuel** non réalisé | L'automatisation ne couvre qu'environ 57 % des problèmes et une seule règle WCAG 2.2 | DPO + métier | audit externe à T+2 mois |
| D-5 | Aucune baseline de vélocité avant IA | Non anticipé au démarrage de la mission | Task Force | mesure DORA sur T+3 mois |
| D-6 | Parcours de paiement en conditions réelles (PSP en sandbox uniquement) | Pas d'accès à l'environnement de préproduction du prestataire | Directeur technique | avant la prochaine release majeure |
| D-7 | **Maintenance des 176 tests générés** | — | **Propriétaire nommé : <nom>, avec un budget de 0,5 j/semaine** ; registre de modèles, jeu d'évals rejoué à chaque montée de version et en cron hebdomadaire, test de garde échouant 90 jours avant retrait du modèle | continu |

**Signature.** Task Force QA — Squad GUARDIAN, 28/07/2026, 16 h 30.
Ce dossier engage ses auteurs. La décision finale appartient au comité.
```

---

### 6.7 Les trois questions pièges — réponses attendues et barème

Chaque question vaut **~17 points** (total 50, arrondi par le formateur).

---

#### ❓ Question 1 — *« Vous me dites 78 % de couverture. Si je supprime la ligne 42 de `DiscountEngine.cs`, combien de vos tests tombent ? »*

**Ce qu'elle teste** : la compréhension de l'écart entre couverture et score de mutation, et l'honnêteté sur ce que mesure un pourcentage.

**Réponse de référence.**

> « Un seul test tombe sur 87 — et c'est exactement le problème que vous pointez. La couverture
> mesure ce qui est **exécuté**, pas ce qui est **vérifié** : la ligne 42 est dans une boucle
> couverte, la supprimer ne change pas le pourcentage de couverture d'un point.
>
> Ce que nous mesurons pour répondre à votre question, c'est le **score de mutation** : 41,3 %
> sur le domaine, et 68,4 % sur `DiscountEngine.cs` après renforcement ciblé — il était à 22,8 %.
> Cela signifie que 288 mutations survivent encore à notre suite : elles sont dans la dette
> ouverte D-2, avec un objectif de 60 % à un mois.
>
> Et je précise une limite, parce qu'elle est documentée : le score de mutation n'est pas non
> plus une mesure directe du risque résiduel — sa corrélation avec les défauts réels est
> influencée par la taille de la suite de tests. Notre estimation du risque résiduel, c'est
> la matrice du §2, pas un pourcentage. »

| Barème | Points |
|---|---|
| Donne le **nombre exact** de tests qui tombent (rejoué en direct si demandé) | 5 |
| Explique la distinction exécution / vérification | 4 |
| Cite son **score de mutation** mesuré, avec la valeur de la classe la plus faible | 5 |
| Énonce la **limite** du score de mutation lui-même | 3 |
| **Malus** : répond « nos tests couvrent cette ligne, donc ils tomberaient » | −10 |

---

#### ❓ Question 2 — *« Ces 340 tests, qui les maintient dans six mois quand le modèle aura changé de version ? »*

**Ce qu'elle teste** : la compréhension de la dérive de modèle et du coût de maintenance — c'est-à-dire si le squad a livré un outil ou un actif.

**Réponse de référence.**

> « D'abord une correction de chiffre : ce ne sont pas 340 tests, ce sont **176**. Nous en avons
> généré 303 et rejeté 127 en revue humaine, soit 42 %. Le chiffre de 340 serait une mesure de
> production, pas de vérification.
>
> Ensuite, la maintenance a **un propriétaire nommé** — <nom> — avec un budget de 0,5 jour par
> semaine inscrit au §7, ligne D-7. Ce n'est pas une intention, c'est une ligne de plan de charge.
>
> Ensuite, elle est **outillée sur trois déclencheurs** :
>
> 1. **Changement de prompt ou de skill** → le jeu d'évals de dix cas se rejoue sur la pull
>    request ; il contient les neuf défauts plantés et un cas de contrôle négatif qui vérifie
>    l'absence de faux positifs. Une régression de plus d'un cas bloque la PR.
> 2. **Changement de version de modèle** → un test de garde échoue **90 jours avant** la date de
>    retrait annoncée. Le préavis éditeur est de 60 jours ; chez un autre fournisseur, le retrait
>    est programmé 18 mois après la mise à disposition générale et l'inférence renvoie ensuite
>    une erreur définitive. Nous tenons un registre de modèles versionné, et l'audit hebdomadaire
>    signale tout modèle non répertorié.
> 3. **Aucun changement déclaré** → cron hebdomadaire. C'est le déclencheur le plus important,
>    parce qu'un service peut dériver sans que le nom du modèle change : l'étude de référence
>    mesure une exactitude passée de **84 % à 51 %** sur une même tâche en trois mois.
>
> Enfin, le coût est chiffré : **environ 198 dollars par an** de rejeu du jeu d'évals, plus le
> demi-jour hebdomadaire. Nous épinglons l'identifiant complet et daté du modèle, jamais un alias,
> et nous figeons les artefacts — prompts, réponses, rapports — parce que la disponibilité d'un
> modèle n'est pas garantie dans la durée. »

| Barème | Points |
|---|---|
| Corrige le chiffre : distingue **généré** et **retenu** | 3 |
| Nomme un **propriétaire** et un **budget** | 4 |
| Cite les **trois déclencheurs**, dont le cron sans changement déclaré | 5 |
| Explique la dérive à nom de modèle constant, avec un chiffre | 3 |
| Chiffre le coût annuel de maintenance de l'agent | 2 |
| **Malus** : « les tests sont stables, il n'y a rien à maintenir » | −10 |

---

#### ❓ Question 3 — *« Le jeu de données que votre agent a généré, il vient d'où ? On a le droit de l'envoyer à un fournisseur américain ? »*

**Ce qu'elle teste** : le volet RGPD — provenance, qualification, rétention, transfert.

**Réponse de référence.**

> « Il vient du **schéma** de la base, pas de la base. Il a été généré synthétiquement à partir
> de la structure PostgreSQL, avec des identifiants tirés d'un espace disjoint de la production
> et des distributions perturbées. Le script est versionné, le seed est reproductible.
>
> Nous l'avons qualifié avec le **test à trois critères** : pas d'individualisation, pas de
> corrélation possible avec un jeu réel, pas d'inférence. Ce ne sont donc pas des données
> personnelles — la doctrine de l'autorité française recommande explicitement de tester sur
> des données fictives de même structure, non liées à une personne. La check-list est
> contresignée par notre DPO, pièce C-2 du §5.
>
> Et je précise ce que nous **n'avons pas fait** : nous n'avons pas repris un extrait de recette
> pseudonymisé. Remplacer les noms par des identifiants opaques est une **pseudonymisation**,
> qui est réversible — les données restent personnelles. C'est un piège dans lequel l'équipe
> précédente était tombée : nous avons écarté leur fichier.
>
> Sur le transfert : la question ne se pose pas puisqu'il n'y a pas de données personnelles.
> Mais si elle se posait, nous serions couverts : contrat de sous-traitance au titre de
> l'article 28 signé, clauses contractuelles types de 2021 modules 2 et 3, entité contractante
> établie dans l'Union pour l'Espace économique européen, notification de violation sous 48 heures,
> et résidence d'inférence configurée en Europe. Avec une réserve que nous documentons en C-7 :
> « résidence UE » ne veut pas dire « résidence France » — le traitement peut avoir lieu dans un
> autre État membre.
>
> Dernier point, sur la rétention : elle est **configurée à 30 jours**. Ce n'est pas le défaut —
> le défaut chez ce fournisseur est une conservation indéfinie tant qu'aucune durée n'est fixée.
> La rétention se configure, elle ne se présume pas. Et si quelqu'un me dit « on est en Zero Data
> Retention, donc il n'y a pas de logs », la réponse est non : le ZDR s'applique endpoint par
> endpoint et les journaux de détection d'abus sont conservés jusqu'à 30 jours. »

| Barème | Points |
|---|---|
| Provenance précise : **schéma**, pas base ; script versionné | 4 |
| Applique le **test à trois critères** et conclut « non personnelles » | 4 |
| Distingue explicitement anonymisation et **pseudonymisation** | 3 |
| Traite le transfert : art. 28, CCT, entité UE, résidence d'inférence | 3 |
| Cite la **rétention configurée** et corrige le mythe du ZDR | 3 |
| **Malus** : « on a anonymisé un extrait de prod » | −15 |

---

### 6.8 Débriefing du boss *(intégré au §7, 5 min)*

Trois constats à faire à voix haute, quels que soient les scores :

1. **Le squad qui a recommandé un No-Go partiel a le dossier le plus solide.** Non parce que
   No-Go est la bonne réponse, mais parce qu'il a fait primer une contrainte de conformité sur
   un calendrier commercial, et qu'il l'a défendu.
2. **La question qui a fait le plus de dégâts est la deuxième.** Presque tous les squads ont un
   plan de test ; presque aucun n'avait, avant ce module, un plan de **maintenance** avec un
   propriétaire et un budget. C'est le passage de l'outil à l'actif.
3. **Aucun squad n'a été mis en difficulté sur la production d'artefacts.** Tous l'ont été sur
   la **justification**. C'est la démonstration finale de la formation : ce qui devient rare
   n'est pas la capacité à produire des tests, c'est la capacité à dire d'où vient un chiffre
   et à en assumer les conséquences.

---

## 7. 🎓 Clôture de la formation *(20 min)*

### 7.1 QCM sommatif — 20 questions

**Modalités.** 12 minutes, individuel, sans support. Une seule bonne réponse par question.
**Barème** : 1 point par bonne réponse. **Seuil de validation des acquis : 14/20.**
Le QCM est une évaluation **sommative** au sens du dispositif décrit dans le README (§5.2) ;
il ne rapporte pas de QA Credits et ne modifie pas le classement.

> **Consigne à lire** : « Ce QCM ne sert pas à vous classer. Il sert à vérifier que vous
> repartez avec les corrections d'idées reçues — c'est-à-dire avec ce que vous ne trouverez
> pas dans un tutoriel de 2024. »

---

**Q1.** Selon le glossaire ISTQB, un oracle de test est une source permettant de déterminer les résultats attendus, **mais** :
A. il doit être automatisé
B. **il ne doit pas être le code**
C. il doit être validé par le développeur
D. il doit être exprimé en Gherkin

**Q2.** Dans le retour industriel de Meta sur TestGen-LLM, quelle est la cascade correcte ?
A. 100 % compilent, 75 % passent, 57 % augmentent la couverture
B. 75 % compilent, 25 % passent, 57 % acceptés
C. **75 % compilent, 57 % passent de façon fiable, 25 % augmentent la couverture, 73 % des recommandations acceptées**
D. 73 % compilent, 57 % passent, 25 % acceptés

**Q3.** Un test généré qui passe du premier coup sur une classe jamais testée est :
A. un succès de la génération
B. **un signal d'alerte : l'attendu a probablement été dérivé de l'implémentation**
C. la preuve que le code est correct
D. la preuve que la couverture est suffisante

**Q4.** Selon la documentation Playwright, la façon la plus résiliente de cibler un élément est :
A. un sélecteur CSS `nth-child`
B. un XPath absolu
C. **un test id**
D. une classe générée par le framework

**Q5.** Concernant le déterminisme d'un LLM :
A. `temperature = 0` garantit une sortie identique à chaque appel
B. **`temperature = 0` ne garantit pas le déterminisme** — et ce paramètre est déprécié sur les modèles Claude les plus récents
C. le déterminisme s'obtient avec `top_k = 1`
D. le déterminisme est garanti si le prompt est identique

**Q6.** Pour empêcher Claude Code d'accéder à certains fichiers, le mécanisme officiel est :
A. un fichier `.claudeignore` à la racine
B. **une règle `permissions.deny` dans `.claude/settings.json`**
C. le fichier `.gitignore`
D. la variable d'environnement `CLAUDE_EXCLUDE`

**Q7.** La révision courante de la spécification Model Context Protocol au 28/07/2026 est :
A. 2025-03-26
B. 2025-06-18
C. **2025-11-25**
D. 2026-01-15

**Q8.** Chez Google, la proportion de transitions pass → fail qui impliquent un test flaky est d'environ :
A. 15 %
B. 45 %
C. 64 %
D. **84 %**

**Q9.** Au 28/07/2026, quelle affirmation est exacte ?
A. Il existe une édition 2026 du OWASP Top 10 for LLM Applications
B. **L'édition courante du Top 10 LLM est 2025 ; le document de décembre 2025 est le Top 10 for Agentic Applications, une liste distincte**
C. Le Top 10 LLM et le Top 10 Agentic ont fusionné
D. Le Top 10 Agentic remplace le Top 10 web

**Q10.** Le taux moyen de paquets hallucinés par les LLM générateurs de code est d'au moins :
A. 20 % pour tous les modèles
B. **5,2 % pour les modèles commerciaux et 21,7 % pour les modèles open source**
C. 1 % tous modèles confondus
D. 21,7 % pour les modèles commerciaux et 5,2 % pour les modèles open source

**Q11.** Activer le Zero Data Retention chez OpenAI signifie :
A. aucune donnée n'est conservée nulle part
B. **le ZDR s'applique endpoint par endpoint, et les journaux de détection d'abus sont générés par défaut et conservés jusqu'à 30 jours**
C. les logs sont conservés 7 jours
D. le ZDR couvre tous les endpoints, y compris `/v1/files`

**Q12.** Chez Anthropic, la rétention des données sur une offre entreprise, si aucune durée personnalisée n'est configurée, est :
A. 30 jours
B. 90 jours
C. **indéfinie**
D. 24 heures

**Q13.** Remplacer les noms par des identifiants opaques dans un jeu de test produit des données :
A. anonymes, donc hors RGPD
B. **pseudonymisées, donc toujours personnelles et soumises au RGPD**
C. anonymes si les identifiants sont des UUID
D. hors périmètre si elles restent dans l'entreprise

**Q14.** Au 28/07/2026, concernant le calendrier de l'AI Act :
A. le haut risque annexe III s'applique au 2 août 2026
B. tout l'AI Act a été reporté à 2028
C. **le 2 août 2026 est inchangé (art. 50, bacs à sable) ; le haut risque annexe III est reporté au 2 décembre 2027 et l'annexe I au 2 août 2028, dates issues de l'accord politique du 7 mai 2026**
D. l'AI Act a été abrogé par l'omnibus

**Q15.** L'édition en vigueur d'ISO/IEC 25010 et son nombre de caractéristiques de qualité produit :
A. édition 2011, 8 caractéristiques
B. **édition 2023, 9 caractéristiques**
C. édition 2023, 8 caractéristiques
D. édition 2024, 10 caractéristiques

**Q16.** La certification ISTQB qui porte sur le test **avec** l'IA générative est :
A. CT-AI
B. CTAL-TAE
C. **CT-GenAI**
D. CTFL v4.0

**Q17.** Le nombre de métriques DORA et la dernière édition du rapport publiée :
A. 4 métriques, rapport 2024
B. **5 métriques, rapport 2025**
C. 5 métriques, rapport 2026
D. 4 métriques, rapport 2026

**Q18.** L'essai randomisé METR de 2025 sur des développeurs expérimentés travaillant sur leurs propres dépôts a mesuré :
A. −55 % de temps avec l'IA
B. aucun effet mesurable
C. **+19 % de temps avec l'IA, alors que les participants croyaient avoir gagné 20 %**
D. −19 % de temps avec l'IA

**Q19.** Le ratio 1:10:100 sur le coût de correction d'un défaut selon la phase :
A. est validé par une méta-analyse récente
B. **est un artefact documenté, à n'employer que qualitativement, jamais comme ratio chiffré**
C. vaut uniquement pour les projets en cascade
D. a été révisé à 1:5:25

**Q20.** Selon le State of Testing 2026, la proportion d'équipes qui utilisent l'IA pour **identifier des risques** est de :
A. 70 %
B. 56 %
C. **19,9 %**
D. 76,8 %

---

#### Corrigé et justifications

| Q | Réponse | Justification en une ligne | Module |
|---|---|---|---|
| 1 | **B** | *« a source to determine expected results […] but should not be the code »* — c'est l'axe de toute la formation | M1 |
| 2 | **C** | 75 / 57 / 25 / 73 : les 73 % portent sur les **survivants** du filtre, pas sur la production brute | M1 |
| 3 | **B** | Le générateur est optimisé pour produire des tests **qui passent** : il calcule l'attendu en exécutant le code | M1 |
| 4 | **C** | *« Testing by test ids is the most resilient way of testing »* ; les sélecteurs CSS longs sont qualifiés de *bad practice* | M1, M5 |
| 5 | **B** | Le déterminisme n'est pas garanti ; et `temperature`, `top_p`, `top_k` sont dépréciés à partir de Claude Opus 4.7 (erreur 400) | M4, M10 |
| 6 | **B** | `.claudeignore` **n'existe pas** dans Claude Code ; le mécanisme officiel est `permissions.deny` | M5, M11 |
| 7 | **C** | Beaucoup de tutoriels citent encore 2025-06-18 ; vérifier via `/specification/latest` | M5, M11 |
| 8 | **D** | ~1,5 % des runs flaky, ~16 % des tests instables, **~84 %** des transitions pass → fail | M7, M12 |
| 9 | **B** | Deux référentiels distincts, à ne jamais fusionner ; citer le préfixe complet (`LLM01:2025`) | M9, M11 |
| 10 | **B** | 576 000 échantillons, 16 LLM, 205 474 noms uniques — le « 20 % pour tous » est faux | M11 |
| 11 | **B** | ZDR sur `/v1/chat/completions` et `/v1/responses` uniquement ; 5 endpoints exclus | M11 |
| 12 | **C** | Le minimum **configurable** est 30 jours ; le **défaut** est indéfini. La rétention se configure | M11 |
| 13 | **B** | La pseudonymisation est **réversible** ; l'anonymisation est irréversible et fait sortir du RGPD | M11 |
| 14 | **C** | Accord politique du 7 mai 2026 — et « accord politique ≠ texte en vigueur » | M11 |
| 15 | **B** | L'édition 2011 est retirée depuis le 04/03/2024 ; la qualité en utilisation a migré vers 25019:2023 | M11 |
| 16 | **C** | CT-AI porte sur le test **des** systèmes d'IA ; CT-GenAI sur le test **avec** l'IA générative | M11, M12 |
| 17 | **B** | 5 métriques depuis 2024 (ajout du *deployment rework rate*) ; aucune édition 2026 publiée | M12 |
| 18 | **C** | Plus de 40 points d'écart perception/réalité — METR a depuis marqué ce résultat obsolète | M12 |
| 19 | **B** | Artefact reconstruit par analyse bibliographique : ne jamais bâtir un ROI dessus | M12 |
| 20 | **C** | Contre **70 %** pour créer des cas de test : c'est le gisement de valeur non capté | M1, M12 |

**Grille de lecture pour le formateur.**

| Score | Interprétation | Ce qu'on propose |
|---|---|---|
| 18–20 | Maîtrise, y compris des corrections d'idées reçues | Orienter vers CT-GenAI |
| 14–17 | Acquis validés | Relire les encadrés ⚠️ « À jour au 07/2026 » |
| 10–13 | Acquis partiels | Reprendre M1 (oracle) et M12 (couverture vs mutation) |
| < 10 | Acquis fragiles | Proposer un accompagnement individuel ; vérifier les prérequis d'entrée |

---

### 7.2 Remise du trophée 🏆 Golden Oracle *(5 min)*

**Rituel.** Le formateur met à jour le `SCOREBOARD.md` une dernière fois, à voix haute,
colonne par colonne — J1, J2, J3, J4, boss final, badges.

```markdown
| Squad       | J1  | J2  | J3  | J4  | Boss final | Total | Badges                  |
|-------------|-----|-----|-----|-----|------------|-------|-------------------------|
| 🔮 ORACLE   | 210 | 245 | 190 | 220 |    255     |  1120 | 🔍 🧿 🧹 💰              |
| 🎯 HUNTER   | 180 | 220 | 235 | 195 |    240     |  1070 | 🪤 ⚡ 🎓                 |
| 🛡️ GUARDIAN | 235 | 200 | 215 | 240 |    285     |  1175 | 🔍 ⚡ 🔐 ♿              |
```

**Trois remises, dans cet ordre — l'ordre compte.**

1. **Les badges d'abord.** Chaque badge est nommé, avec le geste précis qui l'a débloqué :
   *« 🧿 L'Oracle, à ORACLE, pour avoir écrit le test rouge de BUG-102 avant de toucher au
   code d'arrondi. »* Les badges valorisent des **comportements**, pas des scores — c'est
   ce qui permet de récompenser chaque squad.

2. **Le 🏆 Golden Oracle ensuite**, au squad du score le plus élevé. Formule de remise :

   > « Le Golden Oracle ne récompense pas le squad qui a produit le plus de tests. Il récompense
   > celui qui a le mieux su dire, à chaque fois, **d'où venait le résultat attendu**. C'est le
   > seul geste de cette formation qu'aucun outil ne fera à votre place. »

3. **La mention spéciale enfin**, à discrétion du formateur : le squad qui a le plus progressé,
   ou celui qui a produit le meilleur Contre-Test de la semaine.

> ⚠️ **Plan B** en cas de tension liée au classement : ne remettre que les badges, rappeler que
> le score est **collectif par squad** et que les Contre-Tests rapportent aux deux camps.

---

### 7.3 Tour de table — « ce que je fais lundi matin » *(6 min)*

**Format imposé.** Chaque participant, à tour de rôle, **une phrase**, structurée :

> *« Lundi matin, je [verbe d'action] [artefact précis] pour [effet attendu]. »*

**Trois règles.**

- Pas de généralité (« je vais utiliser plus l'IA » est refusé et reformulé).
- L'action doit être réalisable **avant vendredi** de la semaine suivante.
- Le formateur note les engagements dans un fichier partagé — c'est la base de la mesure de
  **niveau 3 (Behavior)** du modèle de Kirkpatrick [S-39], celle qu'on ira vérifier à J+60.

**Exemples d'engagements attendus**, à donner comme amorces si le tour démarre lentement :

| Engagement | Effet visé | Vérifiable à J+60 ? |
|---|---|---|
| « Je lance `dotnet stryker` sur notre module de calcul et je publie le score à l'équipe » | Substituer une mesure de vérification à une mesure d'exécution | ✅ |
| « J'ouvre une réunion de 30 minutes avec mon PO pour coter l'impact métier de nos 6 composants critiques » | Créer l'axe métier de la matrice de risque | ✅ |
| « J'écris le test de garde qui échoue 90 jours avant le retrait du modèle qu'on appelle » | Transformer une dépréciation subie en migration planifiée | ✅ |
| « Je fais l'inventaire des jeux de test issus d'un dump de prod et j'applique le test à trois critères » | Qualifier juridiquement nos données de test | ✅ |
| « Je mesure notre baseline sur les 5 métriques DORA avant d'annoncer quoi que ce soit sur l'IA » | Se donner les moyens d'un ROI honnête | ✅ |

> 🎯 **Message de clôture du formateur.**
>
> « Vous êtes arrivés lundi avec une inquiétude : est-ce que l'IA va faire votre travail ?
>
> Elle en fait une partie, et elle la fait vite. Elle écrit du code de test idiomatique, elle
> produit des données, elle rédige des rapports lisibles. Ce qu'elle n'a pas fait cette semaine,
> vous l'avez vu à chaque module : elle n'a pas su dire d'où venait un résultat attendu, elle
> n'a pas su coter un impact métier, elle n'a pas su décider quoi ne pas tester, et elle n'a
> assumé aucune décision devant le comité.
>
> **Ce sont les quatre choses qui définissent votre métier.** Elles ne sont pas des restes :
> ce sont exactement les tâches dont la valeur augmente à mesure que le reste devient bon marché.
>
> Bon retour, et lundi : commencez par le score de mutation. »

---

### 7.4 Ressources pour continuer

**À lire dans les deux semaines** *(par ordre de rentabilité)*

| Ressource | Pourquoi celle-là d'abord | Référence |
|---|---|---|
| **Syllabus CT-GenAI** (téléchargeable gratuitement) | C'est le référentiel qui couvre exactement le périmètre de ces quatre jours | [S-41] |
| **DORA — guide des métriques** + calculateur de ROI | Pour poser votre baseline avant toute annonce | [S-21], [S-25] |
| **PRISMA (livre blanc, gratuit)** | La méthode de priorisation la plus directement applicable lundi | [S-01] |
| **OWASP Top 10 for Agentic Applications** | Le référentiel de sécurité pertinent pour un agent de test | *(M11, S-21)* |
| **Le Leprechauns of Software Engineering**, ch. 10 et annexe B | Pour ne plus jamais citer un chiffre de folklore en réunion | [S-31] |

**À suivre dans la durée** *(pages vivantes, pas PDF figés)*

| Sujet | Où | Fréquence conseillée |
|---|---|---|
| Dépréciations de modèles | Page officielle de dépréciations de votre fournisseur | mensuelle |
| Sécurité agentique | Page de l'Agentic Security Initiative d'OWASP | trimestrielle |
| Calendrier AI Act | Page officielle de la Commission + AI Act Service Desk | trimestrielle |
| Conventions d'observabilité GenAI | Dépôt `open-telemetry/semantic-conventions-genai` | semestrielle |
| Doctrine française | Hub IA de la CNIL | semestrielle |

⚠️ **Deux mises en garde à répéter en clôture.**

1. **Vérifiez toujours la date de mise à jour d'une source réglementaire.** Le tracker AI Act
   le plus cité au monde est figé au 1er août 2024 — c'est l'exercice M11-4.
2. **Les URL bougent.** La documentation d'Anthropic a migré vers `platform.claude.com` (API)
   et `code.claude.com` (Claude Code) ; PyRIT est passé de l'organisation Azure à Microsoft ;
   France Stratégie est devenu le Haut-commissariat à la Stratégie et au Plan. Tout support de
   cours contenant les anciennes adresses est à repasser.

**Certification.** Le passage de CT-GenAI en France se fait via le **CFTL**, unique représentant
de l'ISTQB pour la France et les pays francophones sans comité national [S-56]. Prérequis :
CTFL v4.0.

**Les artefacts que vous emportez** — tous versionnés dans votre dépôt de squad :

```
skyretail/
├── DOSSIER-DE-RECETTE.md              ← le livrable du comité
├── evals/agent-zero.yaml              ← le jeu d'évals des 9 bugs + contrôle négatif
├── scripts/tableau-priorisation.ps1   ← le tableau de bord de priorisation
├── scripts/audit-modeles.ps1          ← l'audit de dépréciation multi-dépôts
├── governance/impact-metier.csv       ← la cotation d'impact, signée et datée
├── governance/model-registry.csv      ← le registre de modèles
├── .claude/settings.json              ← permissions + sandbox durcis
├── .claude/skills/agent-zero/         ← l'agent
└── boss-j4/                           ← observabilité, ROI, APFD, conformité
```

---

### 7.5 Questionnaire de satisfaction

**Modalités.** À chaud, en fin de J4, **anonyme**, 4 minutes. Puis **à froid à J+60** (versions
courte de 6 questions). Le dispositif suit les quatre niveaux du modèle de Kirkpatrick [S-39],
qui recommande de **partir du niveau 4 et de remonter**, et qui a introduit en 2026 le facteur
**« Performance Environment »** — c'est-à-dire le fait que le transfert dépend du contexte de
retour au poste, pas seulement de la formation.

#### À chaud — 12 questions

**Niveau 1 — Réaction** *(échelle 1 à 5)*

1. La formation a répondu aux attentes annoncées dans le programme.
2. Le rythme (4 journées de 5 h 15) était adapté au contenu.
3. Le fil rouge SkyRetail a facilité ma compréhension.
4. Le dispositif de scoring (QA Credits, badges, boss) a soutenu mon engagement.

**Niveau 2 — Apprentissage** *(échelle 1 à 5, puis ouvert)*

5. Je sais expliquer pourquoi un LLM ne peut pas servir d'oracle de test.
6. Je sais distinguer couverture de code et score de mutation, et dire ce que chacun mesure.
7. Je sais qualifier un jeu de données de test au regard du RGPD.
8. Je sais construire une matrice de risque à deux axes et l'alimenter.
9. *Ouvert* : **quelle idée reçue avez-vous dû abandonner cette semaine ?**

**Niveau 3 — Intention de transfert** *(ouvert)*

10. Quelle est l'action précise que vous mettrez en œuvre lundi matin ?
11. Quel obstacle anticipez-vous dans votre organisation pour la mettre en œuvre ?
    *(question « Performance Environment » — la plus prédictive du transfert réel)*

**Ouvert final**

12. Qu'auriez-vous supprimé du programme, et qu'auriez-vous voulu approfondir ?

#### À froid — J+60, 6 questions

1. L'action annoncée en clôture a-t-elle été réalisée ? *(oui / partiellement / non)*
2. Si non ou partiellement : quel a été l'obstacle principal ?
3. Utilisez-vous aujourd'hui un jeu d'évals, un tableau de priorisation ou un score de mutation
   qui n'existait pas avant la formation ? *(cocher)*
4. Un défaut a-t-il été détecté avant production grâce à une pratique issue de la formation ?
   *(oui / non / je ne sais pas — décrire si oui)*
5. Recommanderiez-vous cette formation à un collègue ? *(0 à 10)*
6. Qu'ajouteriez-vous au programme au vu de votre pratique des deux derniers mois ?

> ⚠️ **Réserve d'honnêteté sur le cadre qualité.** Ce dispositif d'évaluation est conçu pour
> documenter l'adaptation des contenus aux évolutions du métier et le suivi des acquis. Il est
> présenté ici **sans revendiquer la conformité à une version précise du Référentiel National
> Qualité** : la version en vigueur du RNQ et sa date d'entrée en application **n'ont pas pu
> être confirmées** à la date de rédaction de ce support (les sources officielles renvoient un
> écran anti-bot ou une réponse vide, voir [S-40]). Cette vérification doit être faite
> manuellement par l'organisme avant toute mention en convention. À ne pas confondre non plus :
> **Qualiopi** atteste de la conformité d'un **organisme de formation** au RNQ et conditionne
> l'accès aux fonds publics et mutualisés ; ce n'est ni un label de qualité pédagogique, ni une
> certification du contenu, ni une équivalence ISO 9001 — et c'est distinct du **RNCP/RS**,
> qui relève de France compétences [S-40].

---

> 🏁 **Fin du support.** Quatre jours, 21 heures, 13 modules, quatre boss, neuf bugs plantés.
> Ce qui reste, ce n'est pas la suite de tests : c'est la capacité à dire d'où vient un chiffre.

---
