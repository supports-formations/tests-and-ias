# Sorties chienne

App React/TypeScript qui permet de tracer toutes les balades faites avec son animal de compagnie (chien). Tests avec Vitest (`npm test` = `vitest run`).

## Contexte produit

- Pas de back office pour la démo : toute la donnée vit côté client + Firebase (Firestore probable).
- Phase 1 : pas d'accès Firebase réel, on travaille avec un **mock** de la couche données (même interface que la future implémentation Firebase, pour permettre un swap sans toucher aux composants).
- Le swap mock → Firebase réel se fera une fois la démo validée ; ne pas coder de logique spécifique Firebase tant que le mock suffit.

## Méthode de travail : TDD strict (Red-Green-Refactor)

Toute nouvelle feature doit être développée avec le skill `tdd-feature` (invoqué automatiquement ou via `/tdd-feature`). Règles non négociables :

- Un seul test à la fois. Jamais de code de production écrit avant d'avoir vu ce test échouer réellement (sortie de `npm test` à l'appui).
- Code de production minimal pour passer le test en cours — pas d'anticipation des cas suivants.
- Refactor seulement quand il y a une vraie raison (duplication, nommage, structure) ; dire explicitement "rien à refactorer" sinon.
- Un commit par étape franchie (au minimum un par Green).
- Un hook `Stop` relance automatiquement `npm test`, mais seulement à la fin d'un tour (pause/checkpoint) et seulement s'il y a un changement `.ts` non commité — jamais à chaque édition. Son résultat fait foi, ne jamais affirmer qu'un test passe sans que cette sortie le confirme.
- Ne jamais coder une feature entière en un seul message : la découper d'abord en comportements testables unitaires.
