---
name: generation-tests-unitaires
description: Génère des tests unitaires pour du code source non testé ou sous-testé, ancrés dans la logique réelle du code (branches, exceptions, cas limites effectivement gérés). Utiliser dès qu'une fonction/classe sans test est détectée, ou sur demande explicite de génération de tests.
---

# Génération de tests unitaires

## Règles strictes

- Ne jamais générer un test qui vérifie juste que la fonction "ne plante
  pas" — chaque test doit vérifier un comportement précis lié à la logique
  réelle du code.
- Identifier tous les chemins conditionnels (if/else, switch, try/catch,
  early return) et générer un cas de test par chemin distinct.
- Ne jamais halluciner un comportement non présent dans le code — si un
  cas limite n'est pas clair, générer le test avec un commentaire
  "À confirmer : comportement non explicite dans le code".
- Respecter le framework et les conventions déjà utilisés dans le repo.

## Méthode

1. Identifier dans le diff de la PR les fichiers de code modifiés/ajoutés
   sans fichier de test correspondant modifié en parallèle
2. Pour chaque fichier concerné, lire la logique et les fichiers de test
   voisins pour copier le style
3. Générer les cas : nominal, chaque branche, valeurs limites, exceptions
4. Exécuter les tests générés pour vérifier qu'ils passent
5. Modifier temporairement une ligne du code testé pour confirmer qu'au
   moins un test échoue, puis annuler la modification
6. Ne proposer que les tests validés par les étapes 4 et 5

## Format de sortie
Le fichier de test complet, précédé d'un résumé (cas générés par
catégorie, cas "À confirmer", confirmation d'exécution réussie).