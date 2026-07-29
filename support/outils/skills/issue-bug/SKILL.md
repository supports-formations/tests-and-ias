---
name: fiche-anomalie
description: Rédige et enrichit des fiches d'anomalie (bug reports) structurées à partir d'un stack trace, d'une capture d'écran, ou d'une description orale/informelle. Utiliser systématiquement dès qu'un utilisateur rapporte un bug, une erreur, un comportement inattendu, ou colle un stack trace/log d'erreur, même sans demande explicite de "fiche" ou "ticket".
---

# Rédaction de fiche d'anomalie

## Format de sortie obligatoire

- **Titre** : `[Module] Verbe à l'infinitif décrivant le symptôme` (max 80 caractères)
  Exemple : `[Paiement] Échec de validation CB avec montant à 3 décimales`
- **Étapes de reproduction** : liste numérotée, actions concrètes, données de test explicites
- **Résultat attendu** vs **Résultat obtenu** : deux blocs distincts, jamais fusionnés
- **Environnement** : navigateur/OS/version app (déduire du contexte si absent, sinon marquer `À confirmer`)
- **Sévérité suggérée** : voir taxonomie ci-dessous — toujours justifier en une phrase
- **Tags** : 2 à 5 labels parmi la liste autorisée (voir `references/tags.md`)
- **Pièces jointes suggérées** : préciser si capture/logs supplémentaires seraient utiles

## Taxonomie de sévérité (obligatoire, ne pas inventer d'autres niveaux)

| Niveau | Critère |
|---|---|
| Bloquant | Fonctionnalité critique inutilisable, pas de contournement |
| Majeur | Fonctionnalité importante dégradée, contournement possible mais coûteux |
| Mineur | Impact limité, contournement simple |
| Cosmétique | Aucun impact fonctionnel |

## Règles de nommage et champs Jira obligatoires

- Projet : `QA`
- Type d'issue : `Bug`
- Champs obligatoires à toujours proposer : `Summary`, `Description`, `Severity`, `Component`, `Affects Version`, `Labels`
- Ne jamais assigner de sévérité "Bloquant" sans citer explicitement l'impact utilisateur dans la justification
- Si l'info est absente (version, environnement), écrire `À confirmer` — ne jamais halluciner une valeur

## Traitement des entrées

- **Stack trace** : identifier la ligne racine de l'erreur, ne pas coller le stack complet dans le titre
- **Capture d'écran** : décrire l'état visuel observé, comparer avec le comportement attendu du composant UI
- **Description orale/informelle** : reformuler en langage neutre et factuel, retirer le ton émotionnel, ne pas ajouter de détails non mentionnés