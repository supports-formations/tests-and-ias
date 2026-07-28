---
name: tdd-feature
description: Développe une feature en TDD strict (Red-Green-Refactor), un micro-cycle à la fois, avec validation utilisateur entre chaque étape. Utiliser quand l'utilisateur donne une feature à implémenter dans ce projet.
---

# TDD Feature — protocole Red-Green-Refactor

Tu dois développer la feature demandée en respectant STRICTEMENT le cycle RGR, un micro-cycle à la fois. Interdiction d'écrire plusieurs tests ou plusieurs fonctionnalités d'un coup.

## Étape 0 — Découper

Avant tout code, découpe la feature en la plus petite liste de comportements testables possible (une phrase par comportement). Affiche cette liste à l'utilisateur et annonce lequel tu attaques en premier. N'écris aucun code à cette étape.

## Pour CHAQUE comportement de la liste, répète ce cycle :

### 1. RED
- Écris UN SEUL test qui exprime ce comportement, et rien d'autre (pas de code de production).
- Lance la commande de test (`npm test`).
- Montre la sortie prouvant que le test échoue, et pourquoi (erreur de compilation ou assertion qui échoue).
- Si le test passe déjà sans code de prod, c'est une erreur — corrige le test avant de continuer.
- **Arrête-toi ici.** N'écris pas encore le code de production.

### 2. GREEN
- Écris le code de production MINIMAL pour faire passer ce test. Pas d'anticipation sur les cas suivants, pas de généralisation prématurée.
- Lance les tests, montre qu'ils passent tous (pas seulement le nouveau).
- **Arrête-toi ici.** Ne passe pas au refactor sans avoir montré le vert.

### 3. REFACTOR
- Regarde le code de prod ET le code de test : y a-t-il duplication, nommage à améliorer, structure à clarifier ?
- Si oui, refactore par petits pas, en relançant les tests après chaque changement pour rester vert en continu.
- Si non, dis-le explicitement ("rien à refactorer") — ne force pas un refactor inutile.

### 4. Commit
- Propose un commit séparé pour chaque étape franchie (au minimum un commit pour Green, éventuellement un pour Refactor si distinct). Ne commit jamais du code qui casse les tests.
- Ne commit que si l'utilisateur a validé — voir Checkpoints.

## Checkpoints obligatoires

Après RED et après GREEN, arrête-toi et attends une confirmation explicite de l'utilisateur avant de continuer à l'étape suivante ou au comportement suivant. Ne prends jamais l'initiative d'enchaîner plusieurs cycles RGR sans validation intermédiaire, sauf si l'utilisateur te dit explicitement "enchaîne" ou "continue sans t'arrêter".

Un hook `Stop` relance automatiquement `npm test` à chaque fois que tu t'arrêtes (donc à chaque checkpoint RED/GREEN/REFACTOR), mais seulement s'il y a un changement `.ts` non commité — il ne se déclenche jamais pendant l'édition elle-même, seulement au point de pause. Son verdict fait foi : ne déclare jamais un test vert sans que cette sortie le confirme.

## Règles dures

- Jamais plus d'un test nouveau à la fois.
- Jamais de code de production écrit avant d'avoir vu le test échouer pour de vrai (sortie de commande à l'appui, pas une supposition).
- Jamais de saut direct à une implémentation "complète" même si la solution te semble évidente.
- Si l'utilisateur demande une feature large, redécoupe-la — ne code jamais la feature entière dans un seul message.
