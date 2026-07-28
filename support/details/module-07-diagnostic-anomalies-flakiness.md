# Module M07 — Diagnostic d'anomalies, flakiness et auto-réparation

> **Jour 3** · **Durée : 1 h 30** · **QA Credits en jeu : 150**
> *Fil rouge : l'agent de M6 sait générer et exécuter. Il ne sait pas encore répondre à la seule question qui compte à 22 h 40 devant un pipeline rouge — « ce test échoue-t-il parce que le produit est cassé, ou parce que le test est mal écrit ? ». BUG-202 est la cause racine de 7 des 12 tests flaky de SkyRetail. Ce module apprend à le prouver.*

---

## 0. Carte du module

### 0.1 Objectifs pédagogiques

À l'issue de ce module, le·a participant·e sera capable de :

- **Constituer** le jeu de données minimal (trace Playwright, JUnit XML, diff `git`, logs applicatifs) à fournir à un LLM pour obtenir un diagnostic d'échec exploitable, et **justifier** chaque pièce du dossier ;
- **Classer** un échec de test dans la taxonomie des causes de flakiness (attente implicite, ordre d'exécution, fuseau/localisation, concurrence, ressource partagée, infrastructure) et **nommer** la contre-mesure associée ;
- **Chiffrer** le coût d'un test flaky pour une organisation et **arbitrer** entre correction, quarantaine datée et suppression ;
- **Distinguer** une auto-réparation de sélecteur légitime d'un masquage de régression fonctionnelle, et **poser** les garde-fous qui rendent le self-healing acceptable en recette ;
- **Démontrer**, chiffres et trace à l'appui, qu'un `waitForTimeout` n'est pas une correction de flakiness.

### 0.2 Prérequis du module

- M06 terminé : l'agent de test personnalisé s'exécute de bout en bout sur un poste.
- Savoir lire une trace Playwright (`npx playwright show-trace`) et un rapport `--reporter=junit`.
- Dépôt `skyretail` sur la branche `formation/j3-pipeline-rouge` (19 échecs).
- Notions de M04 sur l'économie de tokens : une trace brute complète ne rentre pas dans un prompt.

### 0.3 Position dans le fil rouge

| Avant ce module | Après ce module |
|---|---|
| « 12 tests sont flaky, on les relance » — sans savoir pourquoi | Les 12 flaky sont ramenés à **3 causes racines**, dont une seule explique 7 d'entre eux |
| Le diagnostic d'un échec prend 20 à 40 min de lecture de logs | Un dossier d'échec normalisé est produit en < 3 min, le LLM propose une hypothèse classée |
| BUG-202 est invisible : « ça passe en local » | BUG-202 est reproduit à volonté, sa cause racine est écrite noir sur blanc |
| Le réflexe est `retries: 3` | Le réflexe est « quelle est l'attente implicite que j'ai écrite sans le savoir ? » |

### 0.4 Découpage horaire

| Séquence | Contenu | Durée |
|---|---|---|
| S0 | La Carte : le pipeline rouge, ce qui est en jeu | 2 min |
| S1 | **N1** — Analyse automatisée des échecs : parsing, clustering, RCA | 10 min |
| S2 | **N2** — Les tests flaky : taxonomie, détection, coût, quarantaine | 11 min |
| S3 | **N3** — Auto-réparation : self-healing par LLM et par hiérarchie de locators | 9 min |
| S4 | 🔍 Exemple A — le dossier d'échec de BUG-202, monté en direct | 10 min |
| S5 | 🔍 Exemple B — clustering des 19 échecs par message d'erreur | 7 min |
| S6 | 🔍 Exemple C — self-healing qui masque une régression réelle | 7 min |
| S7 | 🧪 Exercices M7-1 à M7-4 | 27 min |
| S8 | Contre-Test sur M7-4 + débriefing + scoreboard | 7 min |
| **Total** | **Somme des séquences S0 → S8** | **90 min = 1 h 30** ✅ *conforme à la durée annoncée en en-tête* |

> ⏱️ **Régulation du temps.** Les exercices ⭐ et ⭐⭐ sont menés **en parallèle par les squads** (chaque squad n'en traite qu'un des deux, puis restitue en 2 min à l'autre). Les durées cibles indiquées par exercice supposent ce fonctionnement. L'exercice bonus ⭐⭐⭐⭐⭐ est **hors séance**.

### 0.5 Notions couvertes

| # | Notion |
|---|---|
| **N1** | Analyse automatisée des échecs — parsing et clustering de logs, analyse sémantique des messages, root cause analysis assistée, constitution du dossier d'échec |
| **N2** | Les tests flaky — définition, taxonomie des causes, détection, coût économique, quarantaine et ses dangers |
| **N3** | Auto-réparation de tests — self-healing par LLM vs par hiérarchie de locators, garde-fous, et le danger de masquer une régression fonctionnelle |

---

## 1. Partie théorique

### 1.1 Notion N1 — Analyse automatisée des échecs

#### 1.1.1 De quoi parle-t-on

L'ISTQB distingue nettement trois objets qu'on confond systématiquement en salle machine : la **défaillance** (*failure*, le comportement observé qui s'écarte de l'attendu), le **défaut** (*defect / fault*, l'imperfection dans l'artefact qui cause la défaillance) et l'**erreur** (*error / mistake*, l'action humaine qui a produit le défaut). Un test rouge est une **défaillance observée** — rien de plus. Toute la difficulté du diagnostic tient dans le chemin qui va de la défaillance au défaut.

Ce chemin porte un nom dans la littérature industrielle : la **root cause analysis (RCA)**. Appliquée au test logiciel, elle se décompose en quatre étapes que l'IA générative n'automatise pas également :

| Étape | Ce qu'il faut produire | Automatisable ? |
|---|---|---|
| **Collecte** | Rassembler les artefacts de la défaillance (logs, trace, diff, environnement) | Totalement — c'est du script |
| **Normalisation** | Transformer des milliers de lignes hétérogènes en un nombre fini de *templates* | Très bien — c'est le rôle de Drain [S-01] |
| **Corrélation** | Rapprocher la défaillance d'un changement, d'un autre échec, d'un historique | Partiellement — c'est là que le LLM aide [S-05] |
| **Attribution** | Désigner le défaut, dans le code de production **ou** dans le code de test | **Non** — c'est un jugement, et c'est le sujet du module |

> 📘 **Formulation à retenir.** Le LLM ne trouve pas la cause racine. Il **classe des hypothèses** et rédige la narration qui les rend lisibles. La valeur est dans la collecte structurée en amont, pas dans le modèle.

#### 1.1.2 Ce que dit l'état de l'art

**Le parsing de logs est un problème résolu — et il est antérieur aux LLM.** L'algorithme **Drain** [S-01], publié à IEEE ICWS en 2017, construit un arbre de préfixes de profondeur fixe qui sépare la partie **constante** d'une ligne de log (le *template*) de ses parties **variables** (identifiants, timestamps, adresses). Sur le jeu HDFS de **11 millions de messages**, Drain atteint une **F-mesure de 0,99** et réduit le temps de traitement de **51,85 % à 81,47 %** par rapport à Spell. Le corpus de référence pour rejouer ces résultats est **Loghub** [S-02], téléchargé par **plus de 450 organisations**.

L'enseignement pour la QA est contre-intuitif et vaut de l'argent : **ne payez pas de tokens pour du parsing**. Un algorithme déterministe de 2017 fait le travail à 0,99 de F-mesure et coûte zéro. On garde le LLM pour l'étape suivante.

**L'analyse sémantique des messages, elle, bénéficie franchement des LLM.** **LogPrompt** [S-03] mesure l'écart entre un prompt naïf (« analyse ces logs ») et des stratégies de prompt spécialisées (chaîne de raisonnement, format contraint, in-context learning) : le gain est de **+380,7 %** sur la performance de la tâche, et l'approche dépasse de **55,9 %** des méthodes entraînées spécifiquement sur le domaine — **sans aucun entraînement in-domain**. Le survey de 2025 sur l'analyse de logs par LLM [S-04] confirme la structuration du champ en trois familles (fine-tuning, RAG, in-context learning) et pointe la même lacune partout : l'évaluation se fait sur des jeux publics, rarement sur des incidents réels.

**Le meilleur retour industriel disponible est RCACopilot** [S-05], déployé chez Microsoft. Le système route un incident vers un *handler* selon son type d'alerte, agrège des diagnostics runtime, puis **prédit la catégorie de cause racine** avec une narration explicative. Sur **un an d'incidents réels**, la précision de RCA plafonne à **0,766**. Le composant de collecte de diagnostics, lui, tourne **depuis plus de quatre ans en production**.

Deux lectures, et il faut donner les deux en séance :

- 0,766, c'est **remarquable** pour du triage : cela veut dire que trois incidents sur quatre arrivent chez la bonne équipe avec la bonne piste.
- 0,766, c'est **inacceptable** comme oracle : un défaut sur quatre est mal attribué. On ne ferme pas un ticket sur cette base.

**La localisation de fautes par LLM confirme le tableau.** L'étude comparative de 2025 [S-07] confronte **13 LLM** aux méthodes classiques SBFL (*spectrum-based*) et MBFL (*mutation-based*) : les modèles à raisonnement les surpassent nettement, mais au prix de deux défauts documentés — la **sur-explication** (le modèle produit une justification plausible même quand il se trompe) et un coût d'inférence élevé. La revue systématique sur la réparation automatique de programme [S-06] analyse **189 articles** et dégage **4 stratégies d'intégration** LLM+APR ; aucune ne se passe d'une boucle de vérification par exécution.

**Quelles données donner au LLM ?** C'est la question opérationnelle du module. La règle est : *le minimum qui permet de discriminer entre les hypothèses*. Voici le dossier d'échec normalisé que nous imposerons dans SkyRetail.

| Pièce | Source | Volume type | Ce qu'elle permet de discriminer |
|---|---|---|---|
| **Message + stack de l'assertion** | JUnit XML (`<failure message=...>`) | 5-40 lignes | Test faux vs bug produit |
| **Statut multi-exécutions** | `--repeat-each=N` / statut `flaky` Playwright [S-09] | 1 ligne | Déterministe vs flaky |
| **Extrait de trace** : les 5 actions autour de l'échec | Trace Playwright [S-08] | 30-80 lignes | Attente implicite, actionnabilité |
| **Requêtes réseau de la fenêtre d'échec** | Trace (onglet Network) | 10-30 lignes | Course client/serveur, 500 masqué |
| **Diff `git` du dernier commit touchant le SUT** | `git diff HEAD~1 -- <chemin>` | 20-100 lignes | Régression récente vs dette ancienne |
| **Historique d'échec du test** | rapport CI, tags Datadog [S-23] | 1 tableau | Nouveau flaky vs flaky connu |
| **Contexte d'exécution** | worker, shard, `TZ`, ordre | 6 lignes | Ordre d'exécution, fuseau, concurrence |

La **trace Playwright** [S-08] mérite un mot : elle contient un *film strip*, des **snapshots DOM complets action par action**, les logs réseau et console. C'est de la matière première idéale — et c'est aussi un fichier de plusieurs mégaoctets qu'il ne faut **jamais** injecter en entier. On extrait, on résume, on cite.

**Où l'IA est déjà branchée sur la CI.** GitLab a industrialisé un **Fix CI/CD Pipeline Flow** dans sa Duo Agent Platform, passé bêta en 18.2 et **GA en 18.8** [S-10]. Anthropic propose un service managé de revue multi-agents, chiffré publiquement : **15 à 25 $ par revue, 20 minutes en moyenne**, et un *check run* qui se termine toujours en conclusion `neutral` — donc **qui ne bloque jamais le merge** [S-11]. GitHub, de son côté, documente noir sur blanc la limite de Copilot Autofix : le mécanisme est **non déterministe** (une même alerte peut produire des suggestions différentes) et **la revue humaine est obligatoire** [S-12].

Enfin, un chiffre à garder pour N2 : Microsoft mesure sur ses tests de disponibilité qu'**environ 80 % des échecs disparaissent au retry** [S-15]. C'est la statistique qui rend le `retry` si tentant — et si dangereux.

#### 1.1.3 Application au contexte SkyRetail

La branche `formation/j3-pipeline-rouge` contient **47 tests, 19 en échec**. Le premier réflexe de squad est toujours le même : ouvrir les 19 logs. C'est 40 minutes perdues.

La démarche imposée est en trois temps :

```
┌─────────────────┐   ┌──────────────────┐   ┌─────────────────────┐
│ 1. COLLECTE     │   │ 2. NORMALISATION │   │ 3. ATTRIBUTION      │
│ script, 0 token │──▶│ clustering local │──▶│ LLM + humain        │
│                 │   │ 0 token          │   │ tokens ciblés       │
│ junit.xml       │   │ 19 échecs        │   │ 1 prompt / cluster  │
│ traces/*.zip    │   │ → 6 clusters     │   │ hypothèse + preuve  │
│ git diff        │   │ par template     │   │ demandée            │
└─────────────────┘   └──────────────────┘   └─────────────────────┘
```

Sur SkyRetail, la normalisation fait chuter 19 échecs à **6 signatures distinctes**. Six prompts au lieu de dix-neuf : c'est un facteur 3 sur le coût, et surtout un facteur bien supérieur sur la qualité, parce qu'un cluster de 7 échecs partageant le même template **est en soi une information** — sept tests différents qui échouent avec le même message forment une **hypothèse de cause unique**, à confirmer ou à réfuter.

C'est le cas sur la **suite historique** de SkyRetail (branche `main`) : BUG-202 est la cause racine de **7 des 12 tests flaky** hérités de l'ancienne équipe — sept tests du tunnel F2, sept messages différents en apparence, **un seul template** une fois les identifiants de commande masqués. L'hypothèse s'y vérifie, et c'est ce qui est démonté en §1.2.3.

> ⚠️ **Le mot « hypothèse » est essentiel.** Sur la **branche du boss** (`formation/j3-pipeline-rouge`), le même clustering produit lui aussi un cluster de 7 sur le tunnel F2 — mais **un seul** de ces 7 échecs relève de BUG-202. Le clustering est **lexical** ; il regroupe des messages, pas des causes. Le corrigé du Boss J3 (`module-09` §4.5) fait la démonstration complète.

#### 1.1.4 ⚠️ Pièges et anti-patterns

**A1 — Le dump intégral.**
*Symptôme* : le prompt contient 40 000 tokens de logs, la réponse est vague et coûte 0,60 $.
*Cause* : on confond « donner du contexte » et « donner tout ». Le modèle dilue son attention sur du bruit répété.
*Contre-mesure* : normaliser d'abord (Drain ou équivalent [S-01]), n'envoyer que les templates + un exemplaire par template + les compteurs.

**A2 — La sur-explication prise pour une preuve.**
*Symptôme* : le LLM produit une analyse de cause racine de 15 lignes, structurée, convaincante — et fausse.
*Cause* : documenté en 2025 [S-07] ; le modèle génère une justification plausible indépendamment de sa justesse. Le style ne corrèle pas avec l'exactitude.
*Contre-mesure* : exiger dans le prompt une **preuve exécutable** (« donne la commande qui reproduit l'échec en < 30 s ») et refuser toute hypothèse non reproduite.

**A3 — Le diagnostic sans le diff.**
*Symptôme* : le modèle attribue l'échec à une dette ancienne alors que le test est tombé au commit d'hier.
*Cause* : sans `git diff`, le LLM n'a aucun moyen de dater la régression ; il raisonne sur le code au présent.
*Contre-mesure* : le diff du dernier commit touchant le SUT est une **pièce obligatoire** du dossier d'échec.

**A4 — Le check run informatif pris pour un gate.**
*Symptôme* : « on a mis la revue IA en CI, elle n'a rien bloqué ». Normal : elle ne bloque pas.
*Cause* : le service de revue managé se termine en conclusion `neutral` par construction [S-11].
*Contre-mesure* : si l'on veut un blocage, on le code explicitement (parsing de la sévérité, `exit 1`). La règle de gating reste sous contrôle de la QA — voir M08.

#### 1.1.5 📊 Chiffres à retenir

| Chiffre | Signification | Source |
|---|---|---|
| **0,99** de F-mesure | Précision de Drain sur 11 M messages HDFS — le parsing n'a pas besoin de LLM | [S-01] |
| **+380,7 %** | Gain d'une stratégie de prompt spécialisée sur un prompt naïf en analyse de logs | [S-03] |
| **0,766** | Précision maximale de RCA de RCACopilot sur un an d'incidents Microsoft réels | [S-05] |
| **15-25 $ / 20 min** | Coût et durée moyens d'une revue de code multi-agents managée | [S-11] |
| **~80 %** | Part des échecs de tests de disponibilité qui disparaissent au retry | [S-15] |

---

### 1.2 Notion N2 — Les tests flaky

#### 1.2.1 De quoi parle-t-on

Un **test flaky** (ISTQB : *test intermittent*, littérature : *flaky test*) est un test qui **produit des résultats différents — passant et échouant — sur le même code de production et le même jeu de données, sans intervention**. La définition tient dans la clause finale : si le code change, ce n'est pas de la flakiness, c'est une régression.

Trois corollaires, à énoncer explicitement parce qu'ils sont contre-intuitifs :

1. **Un test flaky est un test faux.** Il affirme quelque chose qui n'est pas vrai en toutes circonstances. Ce n'est pas une nuisance d'infrastructure, c'est un défaut de conception de test.
2. **Un test flaky détruit la valeur des tests voisins.** Dès qu'une suite contient un rouge « normal », l'équipe cesse de lire les rouges.
3. **Un test flaky peut cacher un vrai bug.** C'est le cas de BUG-202 : la flakiness *est* le symptôme du défaut produit.

#### 1.2.2 Ce que dit l'état de l'art

**Les chiffres de Google font référence.** John Micco a publié en 2016 les trois nombres que tout le monde cite [S-16] :

| Mesure | Valeur |
|---|---|
| Exécutions de tests rendant un résultat flaky | **~1,5 %** |
| Tests présentant un niveau de flakiness | **~16 %** |
| Transitions pass→fail observées en CI impliquant un test flaky | **~84 %** |

Le troisième est le plus important et le moins compris. **84 % du temps, quand un test passe au rouge, ce n'est pas une régression.** C'est ce chiffre qui explique la culture du « relance et vois ». Et c'est aussi ce chiffre qui explique pourquoi les 16 % restants — les vraies régressions — passent inaperçues. Le billet de 2017 [S-17] détaille le pipeline Google : détection statistique, **mise en quarantaine automatique**, triage.

**La taxonomie des causes est stabilisée depuis 2014.** L'étude de Luo, Hariri, Eloussi et Marinov [S-18] a analysé **201 commits** corrigeant des tests flaky dans **51 projets open source**, classés par cause racine et par stratégie de correction. GitLab en a tiré une grille opérationnelle : **8 catégories étiquetées** dans son outillage [S-21]. Voici la synthèse utilisable en séance, avec la contre-mesure et le marqueur de reconnaissance.

| Cause | Marqueur de reconnaissance | Contre-mesure |
|---|---|---|
| **Attente implicite** (*improper synchronization*) | L'échec varie avec la charge de la machine ; ajouter un `sleep` « corrige » | Attendre un **état observable** (`toBeDisabled`, réponse réseau), jamais une durée |
| **Ordre d'exécution** (*state leak*) | Le test passe seul, échoue dans la suite ; `--shard` change le résultat | Isolation des données par test ; `testInfo.retry` pour nettoyer [S-25] |
| **Fuseau / localisation** (*datetime-sensitive*) | Échoue entre 23 h et 1 h, ou seulement en CI (UTC) | Figer `TZ`, `LANG` ; injecter l'horloge |
| **Concurrence** | Échoue au-delà de N workers ; jamais en `-parallel none` | Réduire la portée du parallélisme (xUnit collections [S-28], `MaxCpuCount` [S-29]) |
| **Ressource partagée** | Une même base, un même port, un même fichier | Testcontainers par classe ; ports dynamiques |
| **Données spécifiques** (*dataset-specific*) | Échoue après un reseed ; dépend d'un identifiant en dur | Fabriquer la donnée dans le test |
| **Sélecteur DOM instable** (*unreliable dom selector*) | Casse à chaque refonte CSS | Rôle accessible ou `data-testid` — sujet de N3 |
| **Infrastructure** (*unstable infrastructure*) | Corrélé à un runner, pas à un test | Hors périmètre du test : catégorie « Environnement » du Boss J3 |

**Le coût est mesuré, et il est plus élevé qu'on ne croit.** L'étude de cas industrielle de TU Munich / CQSE [S-19] chiffre deux choses :

- les tests flaky consomment **au moins 2,5 % du temps productif** de l'équipe ;
- un **relancement automatique coûte 0,02 centime**, une **investigation manuelle coûte 5,67 $**.

Le ratio est de l'ordre de **1 à 28 000**. C'est l'argument économique du `retry` — et c'est un piège de raisonnement. Le calcul n'est valable que si l'on suppose que le test relancé n'a rien d'important à dire. Or Google mesure que marquer un test « flaky » après trois échecs consécutifs **retarde la détection d'une vraie régression d'environ 45 minutes** pour un test d'intégration de 15 minutes [S-30]. Le coût réel du `retry` n'est pas les 0,02 centime : c'est le délai de détection multiplié par la probabilité que ce soit une vraie régression.

**La détection.** Trois familles coexistent, et elles ne coûtent pas la même chose.

| Approche | Principe | Coût | Limite |
|---|---|---|---|
| **Re-run dans la même exécution** | Azure Pipelines rejoue le test échoué ; s'il passe, tag `Flaky` [S-24] | Faible | Ne détecte pas les flaky d'ordre |
| **Re-run en process séparé** | GitLab rejoue une fois dans un process RSpec neuf [S-21] | Faible | Détecte l'état résiduel intra-process |
| **Historique statistique** | Datadog agrège sur les **5 000 derniers commits**, sort un test de la table après **30 jours** sans ré-échec [S-23] | Moyen | Nécessite un historique |
| **Classification par ML/LLM** | FlakyXbert, fine-tuning vs few-shot sur FlakyCat et IDoFT [S-20] | Élevé | Classe la *catégorie*, ne trouve pas la cause dans *votre* code |

Playwright fournit gratuitement le signal le plus utile : il classe en **trois** statuts — `passed`, **`flaky`** (échoué au premier run, passé au retry), `failed` [S-25]. Deux tags Datadog complètent l'arbitrage : `is_new_flaky` (on bloque la PR) vs `is_known_flaky` (on ne bloque pas) [S-23].

**La quarantaine et ses dangers.** La quarantaine est utile ; la quarantaine sans date d'expiration est un cimetière. GitLab impose un contrat chiffré [S-22] :

- *fast quarantine* : **3 jours maximum** ;
- *long-term quarantine* : **3 mois maximum**, avertissement une semaine avant, puis **suppression automatique du test** ;
- la merge request de quarantaine est **assignée automatiquement à un Engineering Manager**.

Ce dernier point est le vrai mécanisme : la quarantaine a un **propriétaire nommé**. Sans propriétaire, elle est gratuite, donc infinie.

> ⚠️ **À jour au 07/2026** — La gestion des tests flaky d'Azure DevOps n'existe **que sur Azure DevOps Services** (pas Server / on-premise), et **basculer entre détection système et détection custom efface tout l'historique de flakiness** [S-24].

#### 1.2.3 Application au contexte SkyRetail

SkyRetail hérite de **12 tests identifiés comme flaky** et **9 tests en `[Skip]` depuis 14 mois**. Les `[Skip]` sont une quarantaine sans date — exactement l'anti-pattern de [S-22]. Le malus du fil rouge (**−40 QAC** pour un `test.skip` posé pour faire passer la CI) sanctionne ce réflexe.

Le cœur du module est BUG-202. Voici le défaut, en Angular :

```ts
// frontend/src/app/checkout/payment/payment.component.ts — état AVANT correction
@Component({ selector: 'sr-payment', standalone: true, templateUrl: './payment.component.html' })
export class PaymentComponent {
  private readonly orders = inject(OrdersService);
  readonly submitting = signal(false);

  private readonly submit$ = new Subject<CartDto>();

  constructor() {
    this.submit$
      // ⚠️ DÉFAUT : le debounce de 400 ms retarde la mise à jour de `submitting`.
      //    Pendant ces 400 ms, le bouton reste ACTIF et cliquable.
      .pipe(debounceTime(400), switchMap((cart) => this.orders.create(cart)))
      .subscribe(() => this.submitting.set(false));
  }

  onSubmit(cart: CartDto): void {
    this.submit$.next(cart);          // `submitting` n'est PAS positionné ici
  }
}
```

```html
<!-- payment.component.html -->
<button type="submit" [disabled]="submitting()" (click)="onSubmit(cart())">Payer</button>
```

Les conséquences forment une famille d'échecs qui **paraissent indépendants**. Ce sont **7 des 12 tests flaky historiques** de la branche `main` — la population décrite par le fil rouge §3.1 :

| # | Test | Symptôme observé | Cause réelle |
|---|---|---|---|
| 1 | `payment.spec.ts › bouton désactivé après clic` | `expect(btn).toBeDisabled()` échoue 1 fois sur 4 | Le bouton est encore actif |
| 2 | `payment.spec.ts › une seule commande créée` | 2 commandes en base, aléatoirement | Double soumission possible |
| 3 | `order-history.spec.ts › historique à 3 lignes` | 4 lignes | Pollution par le test 2 |
| 4 | `checkout-flow.spec.ts › redirection confirmation` | timeout sur `toHaveURL` | Course avec le `switchMap` |
| 5 | `discount.spec.ts › remise appliquée une fois` | remise comptée deux fois | Double commande |
| 6 | `api-orders.spec.ts › POST idempotent` | 201 puis 201 au lieu de 409 | Pas de clé d'idempotence côté API |
| 7 | `metrics.spec.ts › compteur de conversions` | +2 au lieu de +1 | Double commande |

**Un défaut, sept tests rouges, cinq messages d'erreur différents.** C'est la démonstration centrale du module : sans clustering, on ouvre sept tickets ; avec clustering et corrélation, on en ouvre un.

Et l'essentiel : **ce n'est pas un problème de test.** C'est BUG-201 (double commande) et BUG-202 (bouton actif) qui se manifestent comme de la flakiness. Un `retries: 3` global les aurait tous verdis — et aurait envoyé en production une page de paiement qui crée deux commandes au double-clic. D'où le **malus de −60 points** au Boss J3.

> 🧭 **Deux populations de tests instables — à ne jamais confondre.**
> Le support manipule deux ensembles distincts, qui portent tous deux le chiffre 7. Ils **ne
> désignent pas les mêmes tests** et n'ont pas le même statut pédagogique.
>
> | | **A — Les 12 flaky historiques** | **B — Les 7 « flaky » du Boss J3** |
> |---|---|---|
> | **Où** | Suite existante, branche `main` — état initial du dépôt | Branche `formation/j3-pipeline-rouge`, 19 échecs |
> | **Effectif** | **12** tests marqués flaky (+ 9 en `[Skip]` depuis 14 mois) | **7** échecs classés « flaky » sur les 19 |
> | **Cause** | **7 des 12** ont **une seule** cause racine : **BUG-202** ; les 5 autres relèvent de causes indépendantes | **7 causes distinctes** (attente implicite, ordre d'exécution, concurrence, fuseau, ressource partagée, donnée calendaire, sélecteur) |
> | **Travaillé où** | Ici, en M07 : §1.2.3, Exemple A, exercice M7-4 | En M09 §4.5, corrigé du Boss J3 (`E-11` → `E-17`) |
> | **Rôle de BUG-202** | Cause racine de 7 tests | Cause racine d'**un seul** échec, **E-01**, qui n'est pas classé « flaky » mais **« vrai bug produit »** |
>
> **Le point qui compte.** BUG-202 est le même défaut dans les deux cas. Ce qui change, c'est le
> **nombre de tests qui le révèlent** : sept sur `main` (parce que sept tests traversent la fenêtre
> de 400 ms), un seul sur la branche du boss (parce qu'elle a été construite avec un unique test de
> non-régression ciblé). Un squad qui transpose mécaniquement « cluster de 7 = BUG-202 » depuis M07
> vers le Boss J3 se trompe sur **six** de ses sept lignes.
>
> **Et le corollaire du corollaire n° 3** (« un test flaky peut cacher un vrai bug ») : quand la
> flakiness est le symptôme d'un défaut de production, le classement correct n'est **pas** « flaky »,
> c'est **« vrai bug produit »**. C'est exactement ce qui arrive à E-01 au Boss J3.

#### 1.2.4 ⚠️ Pièges et anti-patterns

**B1 — Le `waitForTimeout` promu au rang de correctif.**
*Symptôme* : `await page.waitForTimeout(500)` ajouté après le clic ; le test devient vert ; le squad passe à autre chose.
*Cause* : la temporisation fixe masque la course sans la supprimer. Elle est calibrée sur la machine du développeur.
*Contre-mesure* : la seule attente légitime est une **attente d'état** (`await expect(btn).toBeDisabled()`, `page.waitForResponse`). Et surtout : le `waitForTimeout` ne corrige **rien côté produit** — l'utilisateur, lui, peut toujours double-cliquer.

**B2 — Le `retries` global.**
*Symptôme* : `retries: 3` dans `playwright.config.ts`, pipeline vert, moral en hausse.
*Cause* : le retry transforme un signal en silence. Google documente le retard de détection induit [S-30].
*Contre-mesure* : `retries: 1` maximum, **avec `trace: 'on-first-retry'`** [S-25] pour capturer la preuve, et une alerte sur le taux de statut `flaky`. Le retry est un **instrument de mesure**, pas un correctif.

**B3 — La quarantaine sans propriétaire ni date.**
*Symptôme* : 9 tests en `[Skip]` depuis 14 mois.
*Cause* : la quarantaine ne coûte rien à personne.
*Contre-mesure* : le contrat GitLab — 3 jours / 3 mois / suppression automatique, MR assignée nommément [S-22].

**B4 — Le flaky attribué à l'infrastructure par défaut.**
*Symptôme* : « c'est le runner » — sans preuve.
*Cause* : l'infrastructure est le seul suspect qu'on ne peut pas contredire en réunion.
*Contre-mesure* : exiger la corrélation runner/échec. Si l'échec suit le test et non le runner, ce n'est pas l'infrastructure. Le Boss J3 n'accorde que **2 échecs sur 19** à cette catégorie.

#### 1.2.5 📊 Chiffres à retenir

| Chiffre | Signification | Source |
|---|---|---|
| **~16 %** des tests / **~1,5 %** des exécutions | Ampleur de la flakiness chez Google | [S-16] |
| **~84 %** | Part des transitions pass→fail dues à un test flaky, pas à une régression | [S-16] |
| **2,5 %** du temps productif | Coût minimal des tests flaky mesuré en entreprise | [S-19] |
| **0,02 ct vs 5,67 $** | Coût d'un relancement automatique vs d'une investigation manuelle | [S-19] |
| **3 jours / 3 mois** | Durées maximales contractuelles de quarantaine chez GitLab, puis suppression | [S-22] |

---

### 1.3 Notion N3 — Auto-réparation de tests

#### 1.3.1 De quoi parle-t-on

Le **self-healing** (auto-réparation) désigne le mécanisme par lequel un outil de test, confronté à un élément d'interface introuvable, **substitue automatiquement un autre sélecteur** et poursuit l'exécution au lieu d'échouer.

Il faut immédiatement distinguer deux familles, parce qu'elles n'ont ni le même coût, ni le même profil de risque :

| | **Hiérarchie de locators** | **Self-healing par LLM** |
|---|---|---|
| Principe | Ordre de repli déterministe : rôle → label → testid → texte → XPath… | Le modèle « comprend » l'intention et propose un élément |
| Coût par réparation | **Nul** (pas d'appel API) [S-31] | Appel LLM, latence et facturation |
| Reproductibilité | Totale — même entrée, même sortie | Non garantie [S-40] |
| Portée | Sélecteur uniquement | Peut réécrire l'action, voire l'assertion |
| Risque principal | Repli sur un élément voisin | **Réécriture silencieuse d'une assertion** |

#### 1.3.2 Ce que dit l'état de l'art

**L'approche zéro-coût.** Un travail de 2026 [S-31] propose un self-healing **sans aucun appel API** : il extrait l'**arbre d'accessibilité du DOM** et construit une **hiérarchie de 10 niveaux de locators**. Résultat : **100 % de réussite sur 31 combinaisons** de changements d'interface, avec une guérison en **moins d'une seconde**. C'est le résultat le plus important du module, parce qu'il déplace la question : si un mécanisme déterministe et gratuit répare 100 % des cas testés, **à quoi sert le LLM ici ?**

La réponse honnête : à presque rien sur le cas nominal, et à quelque chose de dangereux sur les autres. Un sélecteur cassé est un problème **structurel** ; il se résout par une hiérarchie de repli, pas par de la génération. Le LLM devient utile quand l'élément a **changé de nature** (un `<select>` devenu un composant de liste combinée), ce qui n'est plus une réparation de sélecteur mais une **réécriture de test** — et donc une décision humaine.

**Ce que font les éditeurs.** mabl documente un mécanisme à deux étages [S-32] : d'abord un *standard auto-heal* par correspondance partielle d'attributs, puis un *advanced auto-heal* par IA générative — et le garde-fou est explicite : **mabl ne tente l'advanced auto-heal qu'après au moins 5 exécutions réussies du test dans un plan**, et si la confiance du *matching* est trop basse, **le step échoue plutôt que de se soigner à tort**. Applitools, sur son Execution Cloud, répare par comparaison d'attributs et **mémorise le « healed selector »**, l'ensemble étant activable par la variable `APPLITOOLS_USE_SELF_HEALING` [S-33]. Cypress expose `cy.prompt()`, qui fait de la résolution d'élément et de l'auto-healing par IA [S-37].

Trois enseignements se dégagent de ces implémentations :

1. **Le healing exige un historique.** Cinq exécutions réussies avant d'oser [S-32] : le mécanisme a besoin d'une baseline pour savoir à quoi l'élément ressemblait quand tout allait bien.
2. **Le healing doit pouvoir échouer.** Un healer qui réussit toujours ne réussit rien : il a juste supprimé la capacité d'échec du test.
3. **Le healing doit être visible.** Le sélecteur soigné est **mémorisé et rapportable** [S-33]. Un healing invisible est indétectable en revue.

**La prévention vaut mieux que la réparation.** Playwright est catégorique : *« Testing by test ids is the most resilient way of testing »*, et les sélecteurs CSS/XPath profonds sont qualifiés de *« bad practice that leads to unstable tests »* [S-34]. Le générateur `codegen` **priorise rôle, texte et test id** [S-35]. Cypress recommande les attributs `data-*` parce qu'ils *« will not change from CSS style or JS behavioral changes »* [S-38]. Autrement dit : la meilleure stratégie de self-healing est de ne pas en avoir besoin.

Playwright fournit d'ailleurs un agent `healer` dédié dans son triptyque *planner / generator / healer* [S-36] — présenté comme un assistant de maintenance, pas comme un mécanisme d'exécution silencieux. La nuance est capitale : un healer qui produit un **diff à relire** est un outil de QA ; un healer qui répare en vol est un masque.

**Le danger central : masquer une régression fonctionnelle réelle.** C'est le point du module à faire vivre, pas à raconter. Considérons le scénario suivant sur SkyRetail :

> Le bouton « Supprimer mon compte » (F4) est renommé « Fermer mon compte » **et** déplacé hors de l'ordre de tabulation (BUG-402). Le test E2E utilise `getByRole('button', { name: 'Supprimer mon compte' })`.

Un self-healing par similarité de texte trouve « Fermer mon compte », clique, **le test passe**. Or ce qui vient de se produire est une régression d'accessibilité **et** un changement de libellé non validé par le métier. Le healing a converti deux défauts en un test vert.

La revue systématique sur la réparation automatique [S-39] et la note de transparence de Copilot Autofix [S-40] convergent : la génération de correctif par LLM est **non déterministe** et exige une revue humaine. Ce qui vaut pour un correctif de sécurité vaut a fortiori pour un correctif de test — l'enjeu étant précisément de ne pas laisser un modèle décider si un écart est acceptable.

**Ce que le healing ne répare jamais.** Le tableau suivant clôt le sujet.

| Type de changement | Healing pertinent ? | Pourquoi |
|---|---|---|
| Classe CSS renommée | ✅ Oui | L'intention est inchangée |
| `id` généré dynamiquement | ✅ Oui | L'intention est inchangée |
| Bouton déplacé dans le DOM | ✅ Oui | L'intention est inchangée |
| **Libellé modifié** | ⚠️ À valider | Peut être une décision produit non testée |
| **Élément retiré de l'ordre de tabulation** | ❌ Non | C'est un **défaut** (BUG-402) |
| **Champ supprimé** | ❌ Non | C'est une régression fonctionnelle |
| **Assertion qui échoue** | ❌ Jamais | Ce n'est pas un problème de sélecteur |

La dernière ligne mérite d'être écrite au tableau : **le self-healing s'applique aux locators, jamais aux assertions.** Un outil — ou un agent — qui modifie une assertion pour faire passer un test a supprimé le test. C'est le malus de **−80 points** du Boss J2, et c'est le même principe ici.

#### 1.3.3 Application au contexte SkyRetail

La refonte v4.0 du tunnel de commande (F2) a cassé les sélecteurs. Le squad a trois stratégies possibles :

| Stratégie | Effort initial | Effort de maintenance | Risque de masquage |
|---|---|---|---|
| CSS profond + healing LLM activé | Nul | Nul en apparence | **Élevé** |
| Hiérarchie de locators déterministe [S-31] | Faible | Faible | Faible |
| `data-testid` posés dans les templates Angular [S-34] | Moyen (touche le code produit) | Très faible | **Nul** |

La politique retenue pour SkyRetail, à inscrire dans `CLAUDE.md` :

```markdown
## Politique de sélecteurs et de self-healing (SkyRetail)

1. Ordre de préférence : `getByRole` > `getByLabel` > `getByTestId` > `getByText`.
   Aucun sélecteur CSS de profondeur > 2. Aucun XPath.
2. Le self-healing d'exécution est INTERDIT en CI. Un sélecteur cassé fait échouer le test.
3. Le healing assisté est autorisé en local, en mode « proposition de diff » uniquement :
   l'agent produit un patch, un humain le relit et le commite.
4. Toute réparation de sélecteur doit être accompagnée de la réponse à :
   « le changement d'interface qui a cassé ce sélecteur était-il intentionnel ? »
5. Aucune assertion ne peut être modifiée par un mécanisme automatique.
```

#### 1.3.4 ⚠️ Pièges et anti-patterns

**C1 — Le healing activé en CI.**
*Symptôme* : les tests ne cassent plus jamais lors des refontes d'interface. L'équipe est ravie.
*Cause* : le healing d'exécution supprime le signal « l'interface a changé », qui est une information de recette.
*Contre-mesure* : healing en local et en mode diff, jamais en CI. Le sélecteur soigné doit être **commité par un humain**.

**C2 — Le healing sans baseline.**
*Symptôme* : le healer répare dès la première exécution, sur un test qui n'a jamais été vert.
*Cause* : il n'existe aucune référence de ce à quoi l'élément devait ressembler.
*Contre-mesure* : la règle mabl — pas de healing avancé avant **5 exécutions réussies** [S-32].

**C3 — Le healing qui glisse vers l'assertion.**
*Symptôme* : un agent, mis en boucle « corrige jusqu'à ce que ça passe », finit par changer `toBe(1)` en `toBe(2)`.
*Cause* : la fonction objectif de l'agent est « vert », pas « juste ».
*Contre-mesure* : garde-fou explicite dans le prompt système et **hook de refus d'édition** sur les fichiers de test lors d'une session de diagnostic (voir M06).

**C4 — Le taux de healing pris pour un KPI positif.**
*Symptôme* : « 8 900 000 auto-heals » affiché comme un argument de qualité.
*Cause* : confusion entre robustesse et opacité. Un taux de healing élevé mesure d'abord la **fragilité des sélecteurs**.
*Contre-mesure* : suivre le taux de healing comme une **dette**, avec un objectif de décroissance, et instrumenter chaque healing en `data-testid` posé.

#### 1.3.5 📊 Chiffres à retenir

| Chiffre | Signification | Source |
|---|---|---|
| **100 %** sur 31 combinaisons, **< 1 s** | Réussite d'un self-healing **sans appel API**, par hiérarchie de 10 niveaux de locators | [S-31] |
| **5 exécutions réussies** | Seuil minimal avant qu'un éditeur mature n'ose l'auto-réparation par IA générative | [S-32] |
| *« most resilient way of testing »* | Position officielle Playwright sur les test ids | [S-34] |
| **Non déterminisme** documenté | Une même alerte peut produire des correctifs différents ; revue humaine obligatoire | [S-40] |
| **189 articles** / 4 stratégies | Volume de la littérature LLM + réparation automatique de programme | [S-39] |

---

## 2. Trois exemples concrets

### 🔍 Exemple A — Le dossier d'échec de BUG-202, monté en direct *(démonstration guidée, 10 min)*

**Contexte.** Le test `e2e/checkout/payment.spec.ts › le bouton Payer est désactivé après soumission` échoue une fois sur quatre en CI, jamais en local. Le squad n'a que le message : `Timed out 5000ms waiting for expect(locator).toBeDisabled()`.

**Ce qu'on montre.** Comment passer d'un message d'erreur inutilisable à une cause racine prouvée, en dépensant moins de 3 000 tokens.

**Déroulé pas à pas.**

*Étape 1 — reproduire.* On ne diagnostique pas ce qu'on ne sait pas reproduire.

```bash
# 20 exécutions du seul test suspect, en isolation, avec trace systématique
npx playwright test e2e/checkout/payment.spec.ts \
  --grep "désactivé après soumission" \
  --repeat-each=20 --workers=4 --trace=on \
  --reporter=list,junit --output=artifacts/bug202
# Observé : 15 passed, 5 failed  → 25 % d'échec, reproductible
```

*Étape 2 — collecter, sans tout envoyer.* Un script d'extraction, pas un copier-coller.

```bash
#!/usr/bin/env bash
# scripts/dossier-echec.sh — produit un dossier d'échec de moins de 200 lignes
set -euo pipefail
OUT=artifacts/dossier-echec.md
{
  echo "## 1. Assertion en échec"
  # Uniquement les nœuds <failure>, pas les 47 <testcase> verts
  xmllint --xpath '//testcase[failure]' artifacts/bug202/results.xml 2>/dev/null | head -40

  echo -e "\n## 2. Statut multi-exécutions"
  echo "20 exécutions : 15 passed / 5 failed / 0 flaky-au-retry"

  echo -e "\n## 3. Cinq dernières actions avant l'échec (trace)"
  npx playwright show-trace --list artifacts/bug202/trace.zip 2>/dev/null | tail -5

  echo -e "\n## 4. Diff du dernier commit touchant le SUT"
  git log -1 --format='%h %ad %s' -- frontend/src/app/checkout/payment/
  git diff HEAD~1 -- frontend/src/app/checkout/payment/ | head -60

  echo -e "\n## 5. Contexte d'exécution"
  echo "workers=4 | shard=n/a | TZ=$(date +%Z) | node=$(node -v)"
} > "$OUT"
wc -l "$OUT"   # attendu : < 200
```

*Étape 3 — un seul prompt, avec une contrainte de preuve.*

```
Tu es ingénieur QA. Voici un dossier d'échec (ci-dessous).

Produis EXACTEMENT :
1. Trois hypothèses de cause racine, classées par probabilité décroissante.
2. Pour CHAQUE hypothèse : la commande shell ou le patch de test minimal
   qui la CONFIRME ou l'INFIRME en moins de 30 secondes.
3. Une ligne : « TEST FAUX » ou « BUG PRODUIT » ou « INDÉTERMINÉ ».

Contraintes :
- Interdiction de proposer un waitForTimeout, un retry ou un skip.
- Si le dossier ne permet pas de trancher, réponds INDÉTERMINÉ et dis
  précisément quelle pièce manque.

<dossier>…</dossier>
```

**Sortie typique du modèle (extrait réel condensé).**

```
H1 (p ≈ 0,7) — Le composant ne positionne pas l'état « soumission en cours »
   de façon synchrone. Le pipe RxJS contient debounceTime(400), donc `submitting`
   ne passe à true qu'après 400 ms.
   → Vérification : npx playwright test --grep "désactivé" --repeat-each=10 \
     --workers=1  (si le taux d'échec chute nettement, la course est confirmée)
   → Vérification 2 : lire payment.component.ts, chercher un opérateur temporel.

H2 (p ≈ 0,2) — Pollution d'état entre tests parallèles sur la même base.
   → Vérification : ajouter --fully-parallel=false ; comparer.

H3 (p ≈ 0,1) — Latence de l'API /api/orders sous charge CI.
   → Vérification : onglet Network de la trace, mesurer le TTFB du POST.

VERDICT : BUG PRODUIT
```

**Analyse critique.**

*Ce que l'IA a bien fait.* Elle a **hiérarchisé** trois hypothèses cohérentes avec la taxonomie, et surtout elle a proposé pour chacune une **vérification exécutable en moins de 30 secondes** — parce que le prompt l'exigeait. Le passage `--workers=1` est exactement le bon discriminant entre attente implicite et concurrence.

*Ce qu'elle a raté.* Trois choses, à montrer sans complaisance :

1. Le **verdict « BUG PRODUIT » est une conclusion, pas une observation** : à ce stade le modèle n'a rien exécuté. Il l'affirme sur la base de H1, qu'il n'a pas vérifiée. C'est la sur-explication documentée en [S-07].
2. Elle **n'a pas relié cet échec aux six autres** du même cluster. Le dossier ne contenait qu'un test — c'est notre faute, pas la sienne, et c'est l'objet de l'exemple B.
3. Elle **n'a rien dit de BUG-201** (double commande côté serveur), qui est l'autre moitié du défaut. Un LLM diagnostique le symptôme qu'on lui donne, pas le risque métier.

*Ce qu'on retient.* La qualité du diagnostic est **proportionnelle à la qualité du dossier**, pas à la puissance du modèle. Les trois contraintes du prompt — hypothèses classées, vérification exécutable, interdiction des faux correctifs — font 90 % du résultat.

---

### 🔍 Exemple B — Clustering des 19 échecs par signature *(approfondissement, 7 min)*

**Contexte.** La branche `formation/j3-pipeline-rouge` affiche 19 échecs. Personne ne sait s'il y a 19 problèmes ou 4.

**Ce qu'on montre.** Que la normalisation avant LLM divise le coût par 3 et **produit une information que le LLM n'aurait pas trouvée** : la taille des clusters.

**Code — normalisation locale, zéro token.**

```ts
// scripts/cluster-failures.ts — exécution : npx tsx scripts/cluster-failures.ts
import { readFileSync, writeFileSync } from 'node:fs';
import { XMLParser } from 'fast-xml-parser';

/** Masque les parties variables d'un message : c'est le principe de Drain [S-01],
 *  en version minimale suffisante pour une suite de 47 tests. */
function template(message: string): string {
  return message
    .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, '<UUID>')
    .replace(/\b\d{4}-\d{2}-\d{2}T[\d:.]+Z?\b/g, '<TIMESTAMP>')
    .replace(/\b\d+ms\b/g, '<DURATION>')
    .replace(/\b\d+\b/g, '<NUM>')
    .replace(/"[^"]{0,80}"/g, '"<STR>"')
    .replace(/\s+/g, ' ')
    .trim();
}

const xml = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@' })
  .parse(readFileSync('artifacts/results.xml', 'utf8'));

const cases: any[] = JSON.parse(JSON.stringify(xml)).testsuites.testsuite
  .flatMap((s: any) => (Array.isArray(s.testcase) ? s.testcase : [s.testcase]))
  .filter((c: any) => c?.failure);

const clusters = new Map<string, { count: number; tests: string[]; sample: string }>();
for (const c of cases) {
  const raw = c.failure['@message'] ?? String(c.failure['#text'] ?? '');
  const key = template(raw);
  const entry = clusters.get(key) ?? { count: 0, tests: [], sample: raw };
  entry.count++;
  entry.tests.push(c['@name']);
  clusters.set(key, entry);
}

const sorted = [...clusters.entries()].sort((a, b) => b[1].count - a[1].count);
writeFileSync(
  'artifacts/clusters.md',
  sorted
    .map(([tpl, e], i) => `### Cluster ${i + 1} — ${e.count} échec(s)\n\n**Template** : \`${tpl}\`\n\n**Tests** :\n${e.tests.map((t) => `- ${t}`).join('\n')}\n\n**Exemplaire** :\n\`\`\`\n${e.sample}\n\`\`\`\n`)
    .join('\n'),
);
console.log(`${cases.length} échecs → ${sorted.length} clusters`);
```

**Sortie sur SkyRetail.**

```
19 échecs → 6 clusters
Cluster 1 — 7 échec(s)  › template « expected <NUM> received <NUM> » / timeouts (5 sur le tunnel F2)
Cluster 2 — 4 échec(s)  › assertions de montant, template « Expected: <NUM> Actual: <NUM> »
Cluster 3 — 3 échec(s)  › « connect ECONNREFUSED <NUM>.<NUM>.<NUM>.<NUM>:<NUM> »
Cluster 4 — 2 échec(s)  › « relation "orders" does not exist »
Cluster 5 — 2 échec(s)  › « Expected date <TIMESTAMP> to equal <TIMESTAMP> »
Cluster 6 — 1 échec(s)  › « Cannot read properties of undefined (reading 'referrerId') »
```

**Analyse critique.**

*Ce que le clustering a bien fait.* Il a réduit 19 messages à **6 signatures** sans aucun modèle et sans aucun token, et il a fait apparaître **un cluster à 7 éléments** — c'est-à-dire une **hypothèse** de cause unique, gratuite, exploitable immédiatement. C'est le seul chiffre qui vaille d'être lu avant d'ouvrir un log.

*Ce qu'il a raté — et c'est le cœur de l'exemple.* Le clustering par template est **purement lexical**. Il sépare `Expected: 42` et `Timed out waiting for locator` alors que ce sont parfois deux manifestations du même défaut ; et surtout il **rassemble des causes différentes sous un message identique**. Sur cette branche, la démonstration est double :

- **Le cluster 1 (7 échecs) n'est pas « sept fois BUG-202 ».** L'hypothèse est séduisante — c'est celle qui se vérifie sur la suite historique de `main`, où BUG-202 explique effectivement 7 des 12 flaky (§1.2.3). Ici, elle est **fausse** : un seul de ces 7 échecs relève de BUG-202. Les six autres partagent son template, pas sa cause.
- **Les clusters 3 et 4 (`ECONNREFUSED`, migration non jouée) ne sont pas « cinq échecs d'environnement ».** Trois plus deux, soit bien plus que les **2 échecs « Environnement » attendus au Boss J3**. C'est un piège volontaire : le cluster 3 contient **un** `ECONNREFUSED` récurrent sur un seul runner (environnement), **un** dû à l'épuisement du pool sous parallélisme (flaky) et **un** dû à une chaîne de connexion codée en dur dans le test (test faux) ; le cluster 4 contient **une** migration non jouée (environnement) et **une** base partagée entre shards (flaky). Deux échecs d'environnement au total — pas cinq.

Autrement dit : le clustering réduit le volume, il **ne fait pas la corrélation causale**. C'est précisément le travail qu'on confie ensuite au LLM, cluster par cluster, avec **preuve exécutée** — et c'est le partage des rôles à retenir. Le corrigé complet des 19 échecs, identifiant par identifiant, est en `module-09` §4.5-4.6.

*Ce qu'on retient.* Six prompts au lieu de dix-neuf, et une information gratuite en prime : **un cluster de 7 est une hypothèse de cause unique**. Le coût passe d'environ 0,45 $ à 0,14 $ sur une exécution type, et le temps de 40 minutes à 12.

---

### 🔍 Exemple C — Quand le self-healing masque une régression *(cas d'entreprise, 7 min)*

**Contexte.** Une équipe de 40 personnes a activé le self-healing d'exécution sur sa suite E2E. Le taux de maintenance a chuté. Trois mois plus tard, un utilisateur signale qu'il ne peut plus supprimer son compte au clavier.

**Ce qu'on montre.** La séquence exacte par laquelle un test vert cache un défaut réel — transposée à F4 de SkyRetail (BUG-402).

**Le code avant.**

```html
<!-- frontend/src/app/account/delete-account.component.html — v3.9 -->
<label for="confirm-delete">Confirmez la suppression de votre compte</label>
<input id="confirm-delete" type="text" [(ngModel)]="confirmation" />
<button type="submit" [disabled]="confirmation !== 'SUPPRIMER'">Supprimer mon compte</button>
```

**Le code après refonte v4.0 — BUG-402.**

```html
<!-- v4.0 : le <label> a disparu, le bouton est devenu un <div> cliquable -->
<span class="field-hint">Confirmez la suppression de votre compte</span>
<input id="confirm-delete" type="text" [(ngModel)]="confirmation" />
<div class="btn btn--danger" (click)="onDelete()">Fermer mon compte</div>
<!--  ⚠️ plus de rôle button, plus de tabindex → inatteignable au clavier
      ⚠️ plus de <label for> → champ non nommé pour un lecteur d'écran        -->
```

**Le test, et ce qui se passe.**

```ts
// e2e/account/delete-account.spec.ts
test('un compte peut être supprimé après confirmation', async ({ page }) => {
  await page.goto('/mon-compte/suppression');
  await page.getByLabel('Confirmez la suppression de votre compte').fill('SUPPRIMER');
  await page.getByRole('button', { name: 'Supprimer mon compte' }).click();
  await expect(page.getByText('Votre compte a été supprimé')).toBeVisible();
});
```

| Sans self-healing | Avec self-healing par similarité |
|---|---|
| `getByLabel(...)` → **échec** : aucun label associé | Repli sur le texte voisin → trouve l'input |
| `getByRole('button', ...)` → **échec** : plus de rôle | Repli sur « élément cliquable au texte proche » → trouve le `<div>` |
| **Test rouge. BUG-402 détecté au jour 1.** | **Test vert. BUG-402 détecté par un utilisateur, 3 mois plus tard.** |

**Analyse critique.**

*Ce que l'outil a bien fait.* Il a fait exactement ce qu'on lui a demandé : maintenir l'exécution malgré un changement d'interface. Ce n'est pas un bug de l'outil. mabl, pour sa part, aurait probablement **refusé** de soigner ici : la confiance du *matching* entre « Supprimer mon compte » (rôle `button`) et « Fermer mon compte » (`div` sans rôle) est faible, et le mécanisme documenté fait **échouer le step plutôt que de se soigner à tort** [S-32].

*Ce qu'il a raté — et ce que l'équipe a raté.* Le healing a franchi **deux frontières** qu'il n'aurait jamais dû franchir :

1. Il a soigné une perte de **sémantique accessible** (label, rôle). Or l'arbre d'accessibilité n'est pas un détail d'implémentation : c'est **l'interface contractuelle** pour une partie des utilisateurs. Le contourner, c'est supprimer le test.
2. Il a soigné un **changement de libellé** — « Supprimer » → « Fermer ». Ce changement peut être parfaitement légitime, mais c'est une décision produit qui doit être **vue** par quelqu'un.

*Ce qu'on retient.* Trois règles, à afficher :

- Le self-healing est **acceptable sur la forme** d'un sélecteur (classe, `id`, position) ;
- il est **interdit sur la sémantique** (rôle, nom accessible, libellé visible) ;
- **tout healing doit produire un artefact relisible** — un diff, une ligne de rapport, une alerte. Un healing silencieux est un test supprimé.

Le corollaire chiffré : sur SkyRetail, `@axe-core/playwright` détecte BUG-402 en 40 millisecondes (M09). Il n'y avait **aucun** besoin d'un LLM ici — juste besoin de ne pas masquer le signal.

---

## 3. Quatre exercices

### 🧪 Exercice M7-1 — « Le dossier d'échec »

| | |
|---|---|
| **Difficulté** | ⭐ |
| **Durée cible** | 5 min |
| **Modalité** | individuel |
| **Matériel** | `artifacts/results.xml`, `artifacts/*.zip` (traces), branche `formation/j3-pipeline-rouge` |
| **QA Credits** | 10 |

**Énoncé**
Choisissez **un** des 19 tests en échec. Constituez son dossier d'échec normalisé en suivant les 7 pièces du tableau §1.1.2. Le dossier doit tenir en **moins de 200 lignes** et ne contenir **aucune trace brute**. Ne demandez rien à un LLM pour l'instant : cet exercice mesure votre capacité à réduire le bruit.

**✅ Résultat attendu**
- [ ] `boss-j3/dossiers/<nom-du-test>.md` existe et contient les **7 sections** numérotées.
- [ ] `wc -l` sur le fichier renvoie **≤ 200**.
- [ ] La section 2 contient un résultat de `--repeat-each=10` réellement exécuté (les 10 statuts sont listés).
- [ ] La section 4 contient un `git log -1` et un `git diff` **limités au chemin du SUT**, pas au dépôt entier.
- [ ] La section 7 mentionne au minimum : nombre de workers, valeur de `TZ`, version de Node.
- **Invalide** : dossier > 200 lignes ; trace `.zip` copiée telle quelle ; section 2 remplie sans exécution (chiffres inventés).

**💡 Indice** *(après 2 min)*
`npx playwright show-trace --list <trace.zip>` liste les actions sans ouvrir l'interface graphique. `xmllint --xpath '//testcase[failure]'` extrait uniquement les cas rouges du JUnit XML.

**🔑 Solution de référence**
Le script `scripts/dossier-echec.sh` de l'exemple A est la solution attendue. Le piège classique est la section 4 : `git diff HEAD~1` sans restriction de chemin ramène 800 lignes sur cette branche. La restriction `-- frontend/src/app/checkout/payment/` la ramène à 24.

**🎓 Ce que l'exercice enseigne vraiment**
Que le travail de diagnostic commence **avant** le prompt, et qu'il est essentiellement un travail de **sélection**. Un·e QA qui sait constituer un dossier d'échec de 200 lignes obtient de meilleurs diagnostics qu'un·e collègue disposant d'un meilleur modèle.

---

### 🧪 Exercice M7-2 — « Six clusters, pas dix-neuf »

| | |
|---|---|
| **Difficulté** | ⭐⭐ |
| **Durée cible** | 6 min |
| **Modalité** | binôme (rotation Pilote/Copilote) |
| **Matériel** | `artifacts/results.xml` (19 échecs), `scripts/` |
| **QA Credits** | 20 |

**Énoncé**
Écrivez — ou faites écrire, puis relisez — un script de clustering des 19 échecs par template de message. Produisez `boss-j3/clusters.md`. Puis, pour le **plus gros cluster uniquement**, rédigez le prompt de diagnostic et exécutez-le. Consignez le coût en tokens des deux approches : 19 prompts individuels (estimé) vs 6 prompts par cluster (mesuré).

**✅ Résultat attendu**
- [ ] `scripts/cluster-failures.ts` (ou `.csx`) s'exécute et affiche `19 échecs → N clusters` avec **4 ≤ N ≤ 8**.
- [ ] `boss-j3/clusters.md` contient, par cluster : le **template masqué**, le **compte**, la **liste nominative des tests**, un **exemplaire brut**.
- [ ] Le plus gros cluster compte **exactement 7 tests**, dont **5 du périmètre F2** (tunnel de commande) — les 2 autres n'y partagent que le template, pas la cause.
- [ ] `boss-j3/clusters.md` porte, pour ce cluster, la mention explicite : *« hypothèse de cause unique — à confirmer test par test »*. Le clustering est lexical, il ne prouve rien.
- [ ] `boss-j3/cout-diagnostic.md` compare les deux approches avec un chiffre de tokens **lu dans la sortie de l'outil** (`total_cost_usd` ou compteur de session), pas estimé.
- **Invalide** : masquage insuffisant (les UUID ou les timestamps apparaissent encore dans les templates → 19 clusters) ; ou coût estimé au doigt mouillé.

**💡 Indice** *(après 2 min 30)*
Si vous obtenez 19 clusters, votre fonction de masquage ne traite pas les nombres. Un message Playwright contient au minimum une durée (`5000ms`) et souvent un identifiant. Masquez `\d+` **après** avoir masqué les UUID et les timestamps, jamais avant.

**🔑 Solution de référence**
Le script de l'exemple B. Ordre de masquage impératif : UUID → timestamp ISO → durée `Nms` → nombres nus → chaînes entre guillemets. Inverser l'ordre détruit les UUID en `<NUM>-<NUM>-…` et fait exploser le nombre de clusters.

Coût typique mesuré : **0,14 $** pour 6 prompts de cluster contre **0,45 $** estimés pour 19 prompts individuels, soit **−69 %** — et surtout un temps de lecture humaine divisé par trois.

**🎓 Ce que l'exercice enseigne vraiment**
Que la première optimisation d'un pipeline de diagnostic IA est **algorithmique, pas prompt-ale**. Drain a 9 ans [S-01] et fait le travail à 0,99 de F-mesure pour zéro token. On garde le modèle pour ce qu'il est seul à savoir faire : raisonner sur un cluster, pas compter des lignes.

---

### 🧪 Exercice M7-3 — « La taxonomie appliquée »

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐ |
| **Durée cible** | 7 min |
| **Modalité** | squad |
| **Matériel** | `boss-j3/clusters.md` (M7-2), `playwright.config.ts`, `backend/SkyRetail.Tests/`, `.runsettings` |
| **QA Credits** | 40 |

**Énoncé**
Prenez les **6 échecs** du cluster 2 et du cluster 5. Pour chacun, déterminez **expérimentalement** — pas par lecture — sa catégorie dans la taxonomie §1.2.2, en appliquant au moins deux des trois discriminants suivants : exécution mono-worker, exécution en ordre inversé, exécution avec un fuseau horaire différent. Produisez une matrice de décision. Un squad adverse contestera votre classement au Contre-Test.

**✅ Résultat attendu**
- [ ] `boss-j3/taxonomie-flaky.md` contient une ligne par échec avec **6 colonnes** : *Test · Catégorie · Discriminant appliqué · Commande exacte · Résultat observé (n/N) · Contre-mesure proposée*.
- [ ] Au moins **trois catégories distinctes** apparaissent dans la matrice.
- [ ] Chaque ligne cite une **commande reproductible**, du type `npx playwright test --grep "…" --workers=1 --repeat-each=10` ou `TZ=Pacific/Auckland dotnet test --filter "…"`.
- [ ] Chaque résultat est exprimé en **n échecs sur N exécutions**, jamais en « ça passe » / « ça passe pas ».
- [ ] Aucune contre-mesure proposée n'est `waitForTimeout`, `retries`, `Thread.Sleep` ou `[Skip]`.
- **Invalide** : catégorie attribuée sans discriminant exécuté ; ou classement uniforme (tout en « attente implicite »).

**💡 Indice** *(après 3 min)*
Le discriminant le plus rentable est le fuseau : `TZ=Pacific/Auckland` fait apparaître instantanément les tests sensibles à la date, parce que la Nouvelle-Zélande est la veille ou le lendemain de l'Europe une bonne partie de la journée. Pour l'ordre d'exécution en .NET, `MaxCpuCount` est **sensible à la casse** — `MaxCPUCount` est silencieusement ignoré [S-29].

**🔑 Solution de référence**

| Test | Catégorie | Discriminant | Commande | Résultat | Contre-mesure |
|---|---|---|---|---|---|
| `DiscountEngineTests.CumulRemises` | Ordre d'exécution | ordre inversé | `dotnet test --filter "Discount" -- RunConfiguration.MaxCpuCount=1` | 0/10 seul, 6/10 en suite | Collection xUnit dédiée [S-28] ; état statique à supprimer |
| `VatTests.ArrondiFacture` | Test faux (pas flaky) | répétition | `dotnet test --filter "Arrondi" ` ×10 | 10/10 échecs | Corriger l'assertion — c'est BUG-102, pas de la flakiness |
| `OrderExpiryTests.CommandeExpire` | Fuseau | `TZ` | `TZ=Pacific/Auckland dotnet test --filter "Expiry"` | 0/10 en UTC, 10/10 en NZ | Injecter `TimeProvider`, figer l'horloge |
| `SearchApiTests.PaginationConcurrente` | Concurrence | mono-worker | `--workers=1` | 4/10 → 0/10 | Réduire la portée du parallélisme |
| `SeedTests.CatalogueInitial` | Ressource partagée | isolation | `docker compose down && up` entre runs | 3/10 → 0/10 | Testcontainers par classe |
| `ReportTests.RapportHebdo` | Fuseau + données | `TZ` + reseed | `TZ=UTC` + seed neuf | 2/10 → 0/10 | Fabriquer la donnée dans le test |

Le point à souligner au débriefing : la deuxième ligne **n'est pas un test flaky**. Elle échoue 10 fois sur 10. Un squad qui la range en « flaky » perd 3 points au Boss J3 — et surtout laisse passer BUG-102 en production.

**🎓 Ce que l'exercice enseigne vraiment**
Que la catégorie d'un échec **s'établit par expérience contrôlée**, pas par intuition ni par lecture du code. Trois variables — parallélisme, ordre, fuseau — suffisent à discriminer la grande majorité des cas. Et qu'un test qui échoue systématiquement n'est jamais flaky : c'est le piège de vocabulaire le plus coûteux du métier.

---

### 🧪 Exercice M7-4 — « Vrai bug ou flakiness ? » 🎯

| | |
|---|---|
| **Difficulté** | ⭐⭐⭐⭐ |
| **Durée cible** | 9 min (+ 5 min de Contre-Test) |
| **Modalité** | squad |
| **Matériel** | `e2e/checkout/payment.spec.ts`, `frontend/src/app/checkout/payment/payment.component.ts`, `backend/SkyRetail.Api/Controllers/OrdersController.cs` |
| **QA Credits** | 80 |

**Énoncé**
Le test `le bouton Payer est désactivé après soumission` échoue **une fois sur quatre**. Un membre de l'équipe propose d'ajouter `await page.waitForTimeout(500)` après le clic : « ça passe à tous les coups, et c'est une milliseconde de plus ».

Votre mission comporte **trois livrables indissociables** :

1. **Trancher** — vrai bug produit ou flakiness de test ? Avec une preuve expérimentale, pas une opinion.
2. **Démontrer que le `waitForTimeout` n'est pas une correction.** Il ne suffit pas de l'affirmer : produisez un test qui **passe avec le `waitForTimeout` en place** et qui **échoue quand même** parce que le défaut est toujours là.
3. **Corriger la cause racine** et prouver que le test initial passe **20 fois sur 20** sans aucune temporisation.

Contrainte : interdiction d'utiliser `retries`, `test.skip`, ou de modifier une assertion existante.

**✅ Résultat attendu**
- [ ] `boss-j3/verdict-bug202.md` contient le verdict, **daté et signé du squad**, avec la commande de reproduction et le taux d'échec avant correction (attendu : **4 à 6 sur 20**).
- [ ] Un **nouveau** test `e2e/checkout/double-submit.spec.ts` existe. Il double-clique sur « Payer » et assert qu'il n'existe **qu'une seule** commande. Il est **ROUGE** sur `formation/j3-pipeline-rouge`, **y compris si l'on ajoute `waitForTimeout(500)` dans l'autre test**.
- [ ] Le diff de correction touche **`payment.component.ts`** (état de soumission positionné **synchroniquement**) **et** `OrdersController.cs` (clé d'idempotence). Un seul des deux ne suffit pas.
- [ ] `npx playwright test e2e/checkout --repeat-each=20 --workers=4` affiche **20/20 passed, 0 flaky** sur les deux tests.
- [ ] Aucune occurrence de `waitForTimeout`, `Thread.Sleep`, `retries:` ou `.skip` dans le diff final : `git diff | grep -E "waitForTimeout|Thread.Sleep|retries:|\.skip" ` renvoie **vide**.
- [ ] `boss-j3/verdict-bug202.md` contient une section « Pourquoi le `waitForTimeout` ne corrige rien », en **trois arguments distincts** : côté utilisateur, côté pipeline, côté détection.
- **Invalide** : verdict sans taux d'échec mesuré ; correction côté test seul ; `double-submit.spec.ts` vert avant correction (le test ne prouve rien) ; ajout d'un `retries` quelque part.

**💡 Indice** *(après 4 min)*
Posez-vous la question qui tranche : *si je corrige le test, l'utilisateur est-il protégé ?* Ouvrez l'application, cliquez deux fois vite sur « Payer », et regardez `/api/orders`. Ce que vous verrez ne dépend d'aucun framework de test.

**🔑 Solution de référence**

*Le test qui survit au `waitForTimeout` :*

```ts
// e2e/checkout/double-submit.spec.ts
import { test, expect } from '@playwright/test';

test('un double-clic sur Payer ne crée qu\'une seule commande', async ({ page, request }) => {
  await page.goto('/checkout/paiement');
  const before = (await (await request.get('/api/orders?mine=true')).json()).length;

  const payer = page.getByRole('button', { name: 'Payer' });
  // Double-clic réel : deux clics dans la fenêtre de 400 ms du debounce.
  // `noWaitAfter` évite que Playwright n'attende la navigation entre les deux.
  await payer.click({ noWaitAfter: true });
  await payer.click({ noWaitAfter: true });

  await expect(page.getByRole('heading', { name: /confirmation/i })).toBeVisible();

  const after = (await (await request.get('/api/orders?mine=true')).json()).length;
  // ORACLE : la source est la règle métier « une soumission = une commande »
  // (CDC v4.0 §4.2), pas l'implémentation.
  expect(after - before).toBe(1);
});
```

Ce test est **rouge** sur la branche de départ (il crée 2 commandes), et il reste rouge quel que soit le nombre de `waitForTimeout` ajoutés ailleurs. C'est la démonstration demandée.

*La correction, côté Angular :*

```ts
onSubmit(cart: CartDto): void {
  if (this.submitting()) return;      // garde synchrone
  this.submitting.set(true);          // ← état positionné AVANT l'appel
  this.submit$.next(cart);
}
// et dans le constructeur : suppression de debounceTime(400),
// remplacé par exhaustMap qui ignore les soumissions concurrentes.
this.submit$.pipe(exhaustMap((cart) => this.orders.create(cart)))
  .subscribe({ next: () => this.router.navigate(['/confirmation']),
               error: () => this.submitting.set(false) });
```

*La correction, côté .NET — parce que le front n'est jamais une défense :*

```csharp
// backend/SkyRetail.Api/Controllers/OrdersController.cs
[HttpPost]
public async Task<IActionResult> Create(
    [FromBody] CreateOrderRequest request,
    [FromHeader(Name = "Idempotency-Key")] string? idempotencyKey,
    CancellationToken ct)
{
    if (string.IsNullOrWhiteSpace(idempotencyKey))
        return Problem(statusCode: 400, title: "Idempotency-Key requis");

    // Insertion conditionnelle : la contrainte d'unicité fait le travail,
    // y compris si deux requêtes arrivent en parallèle sur deux instances.
    var existing = await _orders.FindByIdempotencyKeyAsync(idempotencyKey, ct);
    if (existing is not null) return Conflict(new { existing.Id });   // 409, pas 201

    var order = await _orders.CreateAsync(request, idempotencyKey, ct);
    return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
}
```

*Les trois arguments contre le `waitForTimeout` :*

| Angle | Argument |
|---|---|
| **Utilisateur** | Le `waitForTimeout` vit dans le test. L'utilisateur, lui, double-clique et paie deux fois. Le défaut est intact. |
| **Pipeline** | 500 ms × 7 tests × 4 shards = **14 secondes** ajoutées à chaque exécution, et une temporisation calibrée sur la machine du développeur qui redeviendra insuffisante sur un runner chargé. |
| **Détection** | Le test devient **incapable d'échouer** sur cette classe de défaut. On n'a pas corrigé un test flaky : on a supprimé un test. |

**🎓 Ce que l'exercice enseigne vraiment**
Que la question « vrai bug ou flakiness ? » n'est **jamais** tranchée par le comportement du test, mais par le comportement du **produit**. Le test est un instrument de mesure ; quand l'instrument oscille, il faut se demander si c'est l'instrument qui vibre ou l'objet mesuré. Ici, l'objet mesuré vibre.

Et l'enseignement sur l'IA : soumettez cet échec à un LLM avec le seul message d'erreur, et il proposera dans la grande majorité des cas une **attente explicite** — ce qui est déjà mieux qu'un `waitForTimeout`, mais reste une correction de test. Il faut lui donner le composant Angular **et** le contrôleur .NET pour qu'il voie le défaut produit. C'est la limite du module : **un LLM diagnostique le périmètre qu'on lui donne, et ce périmètre est un choix humain.**

**Exercice bonus ⭐⭐⭐⭐⭐** — Activez un self-healing (Playwright `healer` agent [S-36] ou équivalent) sur `e2e/account/delete-account.spec.ts` après avoir appliqué la refonte BUG-402. Démontrez, captures à l'appui, que le test redevient vert alors que la page est inutilisable au clavier. Rédigez en 5 lignes la règle de politique qui aurait empêché ce faux vert.

---

## 4. Débriefing

### 4.1 Les 5 erreurs les plus fréquentes sur ce module

1. **Envoyer la trace entière au modèle.** Le prompt fait 40 000 tokens, la réponse est générique, la facture est réelle. Le dossier d'échec normalisé de §1.1.2 fait 200 lignes et donne un meilleur résultat.
2. **Appeler « flaky » un test qui échoue systématiquement.** C'est l'erreur de vocabulaire la plus coûteuse : elle envoie un vrai défaut en quarantaine. Un test flaky produit des **résultats différents** sur le **même code**.
3. **Corriger le test au lieu du produit.** Symptomatique quand l'échec est ambigu : le test est sous notre contrôle, le produit ne l'est pas. C'est confortable et c'est faux.
4. **Prendre la narration du LLM pour une preuve.** La sur-explication est documentée [S-07] : le modèle produit une justification structurée y compris quand il se trompe. Exigez une commande de reproduction.
5. **Activer le self-healing pour faire baisser un indicateur de maintenance.** L'indicateur baisse, le nombre de défauts détectés aussi. C'est l'exemple C.

### 4.2 Questions de contrôle

**Q1 — Un test échoue 1 fois sur 4 en CI, jamais en local. Est-il flaky ?**
*Réponse* : on ne peut pas le dire encore. « Flaky » suppose un résultat variable **à code et données constants**. Il faut d'abord vérifier que l'environnement CI n'introduit pas une variable (fuseau, parallélisme, base partagée, latence). Si la variabilité subsiste toutes variables contrôlées, alors oui — et il reste à déterminer si la cause est dans le test ou, comme pour BUG-202, dans le produit.

**Q2 — Pourquoi ne faut-il pas utiliser un LLM pour parser des logs ?**
*Réponse* : parce qu'un algorithme déterministe de 2017, Drain, atteint **0,99 de F-mesure** sur 11 millions de messages pour un coût nul [S-01]. Le LLM est pertinent en aval, sur l'**analyse sémantique** des templates obtenus — là où [S-03] mesure **+380,7 %** face à un prompt naïf.

**Q3 — Quel est le vrai coût d'un `retry` ?**
*Réponse* : pas les **0,02 centime** de calcul [S-19], mais le **retard de détection** d'une vraie régression — de l'ordre de 45 minutes pour un test d'intégration de 15 minutes [S-30] — multiplié par la probabilité que l'échec soit réel. Comme 84 % des transitions pass→fail sont dues à de la flakiness [S-16], il reste 16 % de cas où le retry masque une régression.

**Q4 — À quelle condition le self-healing est-il acceptable en recette ?**
*Réponse* : quatre conditions cumulatives. (1) Il porte sur la **forme** du sélecteur, jamais sur la sémantique accessible ni sur une assertion. (2) Il dispose d'une **baseline** — mabl exige 5 exécutions réussies [S-32]. (3) Il **peut échouer** quand la confiance est basse. (4) Il produit un **artefact relisible** — diff, rapport, alerte — validé par un humain avant commit.

**Q5 — Quel est le lien entre BUG-201 et BUG-202 ?**
*Réponse* : BUG-202 (le bouton reste actif 400 ms) est la **fenêtre d'exploitation** ; BUG-201 (double commande) en est la **conséquence métier**, rendue possible par l'absence de clé d'idempotence côté API. Corriger uniquement le front laisse l'API vulnérable à toute autre source de double soumission (retry réseau, deux onglets). C'est pourquoi l'exercice M7-4 exige les deux correctifs.

### 4.3 Ce qu'on retient

- La qualité d'un diagnostic assisté par IA dépend **du dossier d'échec**, pas du modèle : normaliser d'abord, prompter ensuite, et exiger une preuve exécutable.
- **84 %** des passages au rouge sont de la flakiness [S-16] — ce qui rend les 16 % restants d'autant plus dangereux à ignorer.
- Un test flaky est **un test faux** : il affirme quelque chose qui n'est pas vrai en toutes circonstances. La quarantaine est un délai, pas une solution — 3 jours ou 3 mois, avec un propriétaire nommé [S-22].
- Le self-healing s'applique **aux locators, jamais aux assertions**, jamais à la sémantique accessible. Un healing invisible est un test supprimé.
- `waitForTimeout` ne corrige rien : il déplace le problème du pipeline vers la production.

### 4.4 Transition vers le module suivant

L'agent sait maintenant diagnostiquer. Il tourne toujours sur un poste, lancé à la main, par une personne qui a le contexte en tête.

Dans quatre jours cette personne sera en congés, et le pipeline devra trancher tout seul. **M08 met l'agent dans la CI** — avec des secrets, un budget, un modèle épinglé et un garde-fou contre les contributeurs externes.

---

## 5. Sources

### Sources de la notion N1 — Analyse automatisée des échecs

[S-01] **Drain: An Online Log Parsing Approach with Fixed Depth Tree** — https://jiemingzhu.github.io/pub/pjhe_icws2017.pdf — *papier IEEE ICWS, 2017* — sur le jeu HDFS de **11 millions de messages**, atteint une **F-mesure de 0,99** et réduit le temps de traitement de **51,85 % à 81,47 %** face à Spell ; démontre que le parsing de logs ne nécessite aucun LLM.

[S-02] **Loghub — A Large Collection of System Log Datasets** — https://github.com/logpai/loghub — *dataset/benchmark officiel LogPai (ISSRE 2023), maintenu en continu* — logs bruts HDFS, BGL, Thunderbird, Windows ; **téléchargé par plus de 450 organisations**, ce qui en fait le corpus de référence pour rejouer les résultats de parsing.

[S-03] **Interpretable Online Log Analysis Using LLMs with Prompt Strategies (LogPrompt)** — https://arxiv.org/abs/2308.07610 — *papier arXiv → ICPC 2024* — les stratégies de prompt spécialisées améliorent la performance de **+380,7 %** face à un prompt simple et dépassent de **55,9 %** des approches entraînées, **sans aucun entraînement in-domain**.

[S-04] **LLM-based event log analysis techniques: A survey** — https://arxiv.org/abs/2502.00677 — *survey arXiv, 2025* — panorama structuré des trois familles d'approches (fine-tuning, RAG, in-context learning) et des lacunes d'évaluation sur incidents réels.

[S-05] **Automatic Root Cause Analysis via Large Language Models for Cloud Incidents (RCACopilot)** — https://arxiv.org/abs/2305.15778 — *papier arXiv, Microsoft + UIUC, EuroSys 2024* — précision de RCA **jusqu'à 0,766** évaluée sur **un an d'incidents réels Microsoft** ; le module de collecte de diagnostics est **en production depuis plus de quatre ans**, ce qui déplace la valeur vers la collecte structurée.

[S-06] **A Systematic Literature Review on Large Language Models for Automated Program Repair** — https://arxiv.org/abs/2405.01466 — *revue systématique arXiv, 2024* — analyse **189 articles** LLM+APR et dégage **4 stratégies d'intégration** ; aucune ne se passe d'une boucle de vérification par exécution.

[S-07] **Exploring the Potential and Limitations of LLMs for Novice Program Fault Localization** — https://arxiv.org/abs/2512.03421 — *papier arXiv comparatif, 2025* — **13 LLM** comparés à SBFL et MBFL : les modèles à raisonnement les surpassent nettement mais souffrent de **sur-explication** (justification plausible même en cas d'erreur) et de coûts d'inférence élevés.

[S-08] **Trace viewer | Playwright** — https://playwright.dev/docs/trace-viewer — *documentation officielle Microsoft, 2026* — rejeu post-mortem avec film strip, **snapshots DOM complets par action**, logs réseau et console : la matière première du dossier d'échec, à extraire et jamais à injecter brute.

[S-09] **Retries | Playwright** — https://playwright.dev/docs/test-retries — *documentation officielle Microsoft, 2026* — classement natif en **trois statuts** `passed` / `flaky` / `failed` et recommandation officielle `trace: 'on-first-retry'` : une métrique de flakiness gratuite en CI.

[S-10] **GitLab Duo Agent Platform** — https://docs.gitlab.com/user/duo_agent_platform/ — *documentation officielle GitLab, docs v19.3* — catalogue des flows dont le **Fix CI/CD Pipeline Flow** (bêta en 18.2, **GA en 18.8**), motorisé par Claude Sonnet 4 : cas documenté d'IA branchée nativement sur la réparation de pipeline.

[S-11] **Code Review — Claude Code** — https://code.claude.com/docs/en/code-review — *documentation officielle Anthropic (research preview), MAJ juillet 2026* — une revue multi-agents coûte **15 à 25 $** et dure **20 minutes** en moyenne ; le check run se termine en conclusion `neutral` et **ne bloque donc jamais le merge**.

[S-12] **Copilot Autofix pour code scanning (transparency note)** — https://docs.github.com/en/code-security/concepts/code-scanning/autofix-for-code-scanning — *documentation officielle GitHub, 2026* — limites documentées noir sur blanc : **non-déterminisme** (une même alerte peut produire des suggestions différentes) et **revue humaine obligatoire**.

[S-13] **Unhealthy tests — GitLab development docs** — https://docs.gitlab.com/development/testing_guide/unhealthy_tests — *documentation officielle GitLab v19.1, 2026* — les tests en échec sont **rejoués une fois dans un process séparé** ; 8 catégories de flakiness étiquetées, dont `improper synchronization` et `unreliable dom selector`, directement transposables à Playwright sur Angular.

[S-14] **OpenTelemetry semantic conventions 1.43.0** — https://opentelemetry.io/docs/specs/semconv/ — *spécification officielle, version 1.43.0 (distincte de la spec 1.59.0)* — le registre couvre les groupes `cicd` et `test` : le contrat de nommage sur lequel écrire des assertions de télémétrie de pipeline.

[S-15] **Application Insights availability tests** — https://learn.microsoft.com/en-us/azure/azure-monitor/app/availability — *documentation Microsoft Learn, MAJ 2026-02-27* — Microsoft mesure qu'**environ 80 % des échecs disparaissent au retry** (d'où l'exigence de 3 échecs consécutifs) : le chiffre qui rend le retry si tentant, et si dangereux.

---

### Sources de la notion N2 — Les tests flaky

[S-16] **Flaky Tests at Google and How We Mitigate Them** — https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html — *Google Testing Blog, mai 2016* — **~1,5 %** des exécutions rendent un résultat flaky, **~16 %** des tests présentent un niveau de flakiness, et **~84 % des transitions pass→fail** observées en CI impliquent un test flaky.

[S-17] **Where do our flaky tests come from?** — https://testing.googleblog.com/2017/04/where-do-our-flaky-tests-come-from.html — *Google Testing Blog, avril 2017* — décrit le pipeline Google de détection statistique, de **mise en quarantaine automatique** et de triage ; confirme le chiffre de **~16 % des tests** au comportement flaky.

[S-18] **An Empirical Analysis of Flaky Tests** — http://mir.cs.illinois.edu/marinov/publications/LuoETAL14FlakyTestsAnalysis.pdf — *Luo, Hariri, Eloussi, Marinov (UIUC), FSE 2014* — première étude extensive : **201 commits** corrigeant des tests flaky dans **51 projets open source**, classés par cause racine et par stratégie de correction ; la taxonomie de référence.

[S-19] **Cost of Flaky Tests in Continuous Integration: An Industrial Case Study** — https://mediatum.ub.tum.de/doc/1730194/1730194.pdf — *étude de cas industrielle, TU Munich / CQSE, ICST 2024* — les tests flaky consomment **au moins 2,5 % du temps productif** ; un relancement automatique coûte **0,02 centime** contre **5,67 $** pour une investigation manuelle.

[S-20] **An Analysis of LLM Fine-Tuning and Few-Shot Learning for Flaky Test Detection** — https://arxiv.org/abs/2502.02715 — *papier arXiv, ICST 2025* — compare fine-tuning et few-shot sur les jeux FlakyCat et IDoFT et introduit **FlakyXbert** ; classe la *catégorie* de flakiness, ne localise pas la cause dans un dépôt donné.

[S-21] **Unhealthy tests — GitLab development docs** — https://docs.gitlab.com/development/testing_guide/unhealthy_tests — *documentation officielle GitLab v19.1, 2026* — **8 catégories** étiquetées (`state leak`, `dataset-specific`, `random input`, `unreliable dom selector`, `datetime-sensitive`, `unstable infrastructure`, `improper synchronization`, `too-many-sql-queries`) et l'outil `scripts/rspec_bisect_flaky`.

[S-22] **Test Quarantine Process — GitLab Handbook** — https://handbook.gitlab.com/handbook/engineering/testing/quarantine-process/ — *handbook officiel GitLab, 2026* — **fast quarantine = 3 jours maximum**, **long-term = 3 mois maximum**, puis avertissement une semaine avant **suppression automatique du test** ; MR assignée automatiquement à un Engineering Manager.

[S-23] **Working with Flaky Tests — Datadog Test Optimization** — https://docs.datadoghq.com/tests/flaky_tests — *documentation officielle Datadog, 2026* — trois tags distincts `is_flaky` / `is_new_flaky` / `is_known_flaky` ; sortie automatique de la table après **30 jours** sans ré-échec ; détection sur les **5 000 derniers commits** ; permet de bloquer une PR sur un *nouveau* flaky seulement.

[S-24] **Manage flaky tests — Azure Pipelines** — https://learn.microsoft.com/en-us/azure/devops/pipelines/test/flaky-test-management?view=azure-devops — *documentation Microsoft Learn, MAJ 2025-05-28* — détection par re-run dans la même exécution VSTest ; ⚠️ **Azure DevOps Services uniquement** (pas Server), et **basculer entre détection système et custom efface tout l'historique**.

[S-25] **Retries (Playwright Test)** — https://playwright.dev/docs/test-retries — *documentation officielle Playwright, stable 2026* — `--retries=N`, statut natif **`flaky`**, `testInfo.retry` pour nettoyer un état serveur avant nouvelle tentative, et `test.describe.configure({ retries: 2 })` pour cibler un groupe plutôt que la suite entière.

[S-26] **Trace viewer | Playwright** — https://playwright.dev/docs/trace-viewer — *documentation officielle Microsoft, 2026* — snapshots DOM par action et logs réseau : le seul artefact qui permette de distinguer a posteriori une attente implicite d'une latence serveur.

[S-27] **Unstable tests debugging — Chromatic docs** — https://www.chromatic.com/docs/unstable-tests — *documentation officielle, 2026* — catalogue de causes d'instabilité : fenêtre de capture de **15 secondes**, viewport par défaut **900 px**, emojis rendus différemment sous Linux (« aucune solution de contournement »), polices web chargées tardivement.

[S-28] **Running Tests in Parallel (xUnit.net)** — https://xunit.net/docs/running-tests-in-parallel — *documentation officielle xUnit, Core Framework v2 2.8 / v3* — par défaut **chaque classe de test est une collection** (jamais parallèle en interne) ; depuis 2.8 l'algorithme par défaut est passé de `aggressive` à `conservative`, et `-parallel` accepte `none|collections|assemblies|all`.

[S-29] **Configure unit tests by using a .runsettings file** — https://learn.microsoft.com/en-us/visualstudio/test/configure-unit-tests-by-using-a-dot-runsettings-file?view=vs-2022 — *documentation Microsoft Learn, VS 2022* — `<MaxCpuCount>` pilote le parallélisme au niveau processus ; la doc avertit explicitement que le nom est **sensible à la casse** et que `MaxCPUCount` est silencieusement ignoré.

[S-30] **Taming Google-Scale Continuous Testing** — https://research.google/pubs/taming-google-scale-continuous-testing/ — *Memon et al., ICSE '17 (Google Research), 2017* — très peu de tests échouent un jour donné ; ceux qui échouent sont « plus proches » du code qu'ils testent ; le code modifié récemment par **plus de 3 développeurs** casse plus souvent ; documente le retard de détection induit par le marquage « flaky ».

---

### Sources de la notion N3 — Auto-réparation de tests

[S-31] **Beyond LLM-based test automation: A Zero-Cost Self-Healing Approach Using DOM Accessibility Tree Extraction** — https://arxiv.org/abs/2603.20358 — *papier arXiv, 2026* — self-healing **sans aucun appel API** via une hiérarchie de **10 niveaux de locators** extraite de l'arbre d'accessibilité : **100 % de réussite sur 31 combinaisons** de changements d'interface, guérison en **moins d'une seconde**.

[S-32] **How auto-heal works — mabl** — https://help.mabl.com/hc/en-us/articles/19078583792404-How-auto-heal-works — *documentation officielle éditeur, MAJ 7 mai 2026* — mécanisme à deux étages (standard puis **advanced auto-heal par IA générative**) ; garde-fous documentés : **pas d'advanced auto-heal avant 5 exécutions réussies**, et **le step échoue plutôt que de se soigner à tort** si la confiance est basse.

[S-33] **Self-Healing — Applitools Documentation (Execution Cloud)** — https://applitools.com/docs/eyes/concepts/test-execution/execution-cloud/self-healing — *documentation officielle éditeur, 2026* — réparation par comparaison d'attributs avec **mémorisation du « healed selector »**, activable par la variable `APPLITOOLS_USE_SELF_HEALING` : le healing est traçable, donc auditable.

[S-34] **Locators | Playwright** — https://playwright.dev/docs/locators — *documentation officielle Microsoft, 2026* — *« Testing by test ids is the most resilient way of testing »* ; les sélecteurs CSS/XPath longs y sont qualifiés de **« bad practice that leads to unstable tests »** : la prévention prime sur la réparation.

[S-35] **Test generator (codegen) | Playwright** — https://playwright.dev/docs/codegen — *documentation officielle Microsoft, 2026* — le générateur *« prioritise role, text and test id locators »* et désambiguïse automatiquement : la hiérarchie de repli est déjà dans l'outil, sans IA générative.

[S-36] **Playwright Test — Agents (planner / generator / healer)** — https://playwright.dev/docs/test-agents — *documentation officielle Microsoft, 2026* — triptyque d'agents dont un **`healer`** dédié à la maintenance : positionné comme assistant produisant un diff à relire, non comme mécanisme d'exécution silencieux.

[S-37] **Cypress AI Skills** — https://docs.cypress.io/app/tooling/ai-skills — *documentation officielle éditeur, 2026* — **3 skills IA officiels** (`cypress-author`, `cypress-explain`, `cypress-docs`) ; `cy.prompt()` réalise de la résolution d'élément et de l'auto-healing par IA — exemple de healing intégré au runtime.

[S-38] **Cypress best practices** — https://docs.cypress.io/app/core-concepts/best-practices — *documentation officielle éditeur, 2026* — recommande les attributs `data-*` (`data-cy`) parce qu'ils *« will not change from CSS style or JS behavioral changes »* : la stratégie de sélecteur qui rend le healing inutile.

[S-39] **A Systematic Literature Review on Large Language Models for Automated Program Repair** — https://arxiv.org/abs/2405.01466 — *revue systématique arXiv, 2024* — **189 articles** analysés, **4 stratégies d'intégration** ; établit qu'aucune approche de réparation par LLM n'est fiable sans boucle de vérification par exécution et validation humaine.

[S-40] **Copilot Autofix pour code scanning (usage responsable)** — https://docs.github.com/en/code-security/concepts/code-scanning/autofix-for-code-scanning — *documentation officielle GitHub (transparency note), 2026* — le correctif généré est **non déterministe** et la **revue humaine est obligatoire** ; ce qui vaut pour un correctif de sécurité vaut a fortiori pour un correctif de test.

[S-41] **Axe MCP Server — Deque** — https://www.deque.com/axe/mcp-server/ — *page produit, MAJ 17 juillet 2026* — expose le moteur axe DevTools et la base Deque University aux agents (Claude Code, Copilot, Cursor, VS Code) avec **revue / acceptation / rejet des correctifs dans l'IDE** : le modèle « proposition relisible » plutôt que réparation silencieuse.

[S-42] **dequelabs/axe-core** — https://github.com/dequelabs/axe-core — *dépôt officiel Deque, MPL-2.0, release 4.12.0 du 1er juin 2026* — moteur fondé sur l'arbre d'accessibilité ; revendique **zéro faux positif** et détecte *« on average 57% of WCAG issues automatically »* : la sémantique accessible est mesurable, donc jamais à « soigner ».

[S-43] **Platform – Validate – Visual AI (Applitools)** — https://applitools.com/platform/validate/visual-ai — *page produit, MAJ 2024-02-16* — moteur décrit comme « un réseau de **centaines d'algorithmes** » mêlant règles et apprentissage profond, ayant analysé **plus d'un milliard d'images** : contraste utile entre comparaison perceptuelle et repli de sélecteur.

[S-44] **Exploring the Potential and Limitations of LLMs for Novice Program Fault Localization** — https://arxiv.org/abs/2512.03421 — *papier arXiv comparatif, 2025* — la **sur-explication** documentée dans ce travail est exactement le risque du healing par LLM : une réparation accompagnée d'une justification convaincante et fausse.
