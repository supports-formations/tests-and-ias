# Test logiciel avec IA générative — **Support V2, scénario formateur**

**Organisme** : Human Coders (Qualiopi) · **Formateur** : Evan BOISSONNOT
**Durée** : **28 h — 4 jours × 7 h** (09:00-12:30 / 14:00-17:30)
**Structure** : 8 modules · **28 notions** · 4 QCM longs · 4 boss
**État** : 🟡 macro-conception livrée — en attente du **projet fil rouge** pour la micro-conception

---

## 1. Pourquoi une V2

La V1 est un **manuel de référence** : 520 pages, 520 sources vérifiées, 13 modules exhaustifs.
Elle est juste sur le fond et inutilisable pour apprendre. Le diagnostic tient en une phrase :

> **Elle est organisée par exhaustivité, pas par progression.**

| Symptôme V1 | Cause | Réponse V2 |
|---|---|---|
| « Imbitable pour qui veut se former » | L'unité de base est le module de 15-30 pages | L'unité devient la **notion** de 30-40 min, 2-4 pages |
| Le participant ne sait pas ce qu'il vient d'apprendre | Aucune vérification avant la fin du module | **Une micro-évaluation par notion** — 28 au total |
| Rythme plat | Une seule modalité, répétée 13 fois | **5 modalités**, choisies selon l'objectif, alternées par règle |
| Le formateur doit arbitrer en direct | Le support est un fonds, pas un scénario | **Déroulé minuté** : ce que dit le formateur, ce que font les participants |
| Pas de sentiment de progression | Pas de victoire intermédiaire | **8 clôtures** : 4 QCM longs + 4 boss |

La V1 n'est pas jetée : elle devient le **fonds documentaire** dans lequel la V2 puise,
référencé notion par notion. Les 520 sources vérifiées restent l'appareil critique du dispositif.

---

## 2. Les quatre documents de cadrage

À lire dans cet ordre. Ils constituent le contrat de production de la V2.

| Document | Ce qu'il fixe |
|---|---|
| **`00-gabarit-notion.md`** | La structure invariante d'une notion et d'un module. Les 5 interdits d'écriture. |
| **`00-grille-modalites.md`** | Quelle modalité pour quel objectif — 12 critères de décision. Les 10 règles de rythme. Le catalogue des 9 jeux sérieux. |
| **`00-architecture-28h.md`** | La carte des 8 modules et des 28 notions, avec modalité, durée et objectif de chacune. Le minutage vérifié à 1 680 min. |
| **`00-fil-rouge.md`** | ⏳ *à produire dès réception du projet* — pitch, features, défauts plantés, scénario des 4 boss, système de score. |

---

## 3. Le principe directeur

> **Objectif → Modalité → Déroulé → Contenu.** Jamais l'inverse.

On écrit d'abord ce que le participant doit être capable de faire. Ce verbe commande la modalité :
on n'apprend pas à *détecter un piège* en l'écoutant décrire, ni à *citer une norme* en la
découvrant pendant 40 minutes. La grille de décision rend ce choix explicite et opposable —
chaque notion cite le critère qui l'a produite.

**Trois convictions portées par le dispositif :**

1. **Un piège raconté ne protège de rien.** Les anti-patterns — test tautologique, sélecteur
   halluciné, retry qui masque — se vivent. Le participant y tombe, publiquement, sans enjeu,
   puis on nomme ce qui vient de se passer. C'est le critère `D-4` et le protocole en 5 temps.
2. **Une notion sans vérification n'a pas eu lieu.** 28 notions, 28 micro-évaluations.
   Un QCM éclair de 3 questions quand l'objectif est de connaître ; un exercice court dès qu'il
   s'agit de faire.
3. **Une journée se vit comme une session de jeu.** Ouverture qui accroche, alternance
   effort/récompense, montée en tension, boss final. Le squelette de journée et les règles
   de rythme R-1 à R-10 rendent cette courbe reproductible.

---

## 4. Architecture en un coup d'œil

| Jour | Verbe | Module matin (4 notions + QCM) | Module après-midi (3 notions + boss) |
|---|---|---|---|
| **J1** | COMPRENDRE | **M1** — Le test qui ment | **M2** — De l'exigence au test |
| **J2** | OUTILLER | **M3** — Parler à la machine | **M4** — L'atelier |
| **J3** | INDUSTRIALISER | **M5** — L'agent qui travaille seul | **M6** — Dans le pipeline |
| **J4** | DÉCIDER | **M7** — Ce que l'IA ne voit pas | **M8** — Décider |

**Répartition des modalités sur les 28 notions** — équilibre vérifié :

| Modalité | Notions | Part du temps |
|---|---|---|
| 🎲 Jeu sérieux | 7 | 24,6 % |
| 💻 Exercice solo | 6 | 22,3 % |
| 📊 Descendant | 6 | 21,0 % |
| 👥 Exercice de groupe | 5 | 17,8 % |
| 🔍 Pédagogie inversée | 4 | 14,3 % |

Le descendant représente **22,8 %** du temps pédagogique — plafond fixé à 35 %.

---

## 5. Arborescence cible

```
formation-test-ia-v2/
├── README.md                     ← vous êtes ici
├── 00-gabarit-notion.md          ✅ contrat d'écriture
├── 00-grille-modalites.md        ✅ décision pédagogique
├── 00-architecture-28h.md        ✅ carte des 28 notions
├── 00-fil-rouge.md               ⏳ en attente du projet
├── 00-guide-animation.md         ⏳ préparation J-15/J-1, plan B, gestion de groupe
│
├── module-M1-le-test-qui-ment.md          ⏳
├── module-M2-de-l-exigence-au-test.md     ⏳
├── module-M3-parler-a-la-machine.md       ⏳
├── module-M4-l-atelier.md                 ⏳
├── module-M5-l-agent-qui-travaille-seul.md ⏳
├── module-M6-dans-le-pipeline.md          ⏳
├── module-M7-ce-que-l-ia-ne-voit-pas.md   ⏳
├── module-M8-decider.md                   ⏳
│
├── diagrammes/                   ⏳ SVG imprimables + sources Mermaid + notice de dévoilement
├── qcm/                          ⏳ 4 QCM longs, corrigés commentés
├── boss/                         ⏳ 4 boss : scénario, barème, corrigé
└── annexes/
    ├── reference-v1/             → renvoi vers le fonds documentaire V1 et ses 520 sources
    ├── cheatsheet/               → le mémo 2 pages déjà produit
    └── grilles-evaluation.md     ⏳ suivi Qualiopi, positionnement, satisfaction
```

---

## 6. Ce qu'il me faut pour lancer la micro-conception

Le projet fil rouge conditionne l'écriture des 28 notions. Concrètement, j'ai besoin de :

1. **Le projet** — nom, domaine métier, pitch en quelques lignes.
2. **La stack réelle** — langages, frameworks de test, base de données, CI.
3. **Le périmètre fonctionnel** — 3 à 5 fonctionnalités qui serviront de terrain aux exercices.
4. **L'état de l'existant** — y a-t-il des tests ? un pipeline ? une spécification écrite ?
5. **Les défauts** — le dépôt contient-il des bugs exploitables, ou faut-il en planter ?
   *(Les notions « piège » en dépendent entièrement.)*
6. **La modalité** — projet commun fourni à tous, ou chaque participant sur son propre projet ?

Si le projet ne fournit pas tout, je complète : spécification avec ambiguïtés délibérées,
défauts plantés calibrés par difficulté, pipeline de départ. Dites-moi simplement ce qui existe.
