---
name: plan-de-test
description: Génère un plan de test structuré à partir d'une user story ou d'un epic Jira, en s'appuyant sur le code existant du repo pour identifier des cas de test pertinents (pas génériques). À utiliser en amont de sprint dès qu'on demande un plan de test, une stratégie de test, ou "que faut-il tester" pour une story/epic.
---

# Génération de plan de test

## Règles strictes

- Ne jamais proposer de cas de test génériques ("tester les champs vides",
  "tester la connexion") sans les rattacher à un élément concret du code
  ou de la story (nom du champ réel, endpoint réel, règle métier réelle).
- Si la story ne précise pas les critères d'acceptation, le signaler
  explicitement comme un risque plutôt que de les inventer.
- Distinguer clairement ce qui vient de la story (exigence explicite) de
  ce qui vient de l'analyse du code (déduction technique) — toujours
  attribuer la source.

## Méthode

1. Lire la story/epic (titre, description, critères d'acceptation)
2. Identifier dans le repo le code concerné (composants, endpoints,
   validations déjà en place liés au périmètre de la story)
3. Repérer les règles métier déjà codées mais non mentionnées dans la
   story (ex. une validation de montant max déjà présente dans le code
   mais absente des critères d'acceptation) — ce sont souvent les cas
   limites les plus précieux à tester
4. Construire le plan selon le format ci-dessous

## Format de sortie

### Périmètre
Ce qui est couvert / explicitement hors périmètre

### Stratégie
Niveaux de test nécessaires (unitaire / intégration / E2E) selon la
nature du changement

### Cas de test

| # | Type | Description | Source |
|---|------|-------------|--------|
| 1 | Nominal | ... | Story (critère d'acceptation X) |
| 2 | Limite | ... | Code (validation existante dans X.js:42) |
| 3 | Erreur | ... | Déduction (endpoint retourne 4 codes d'erreur non testés) |

### Environnements requis
Données de test, comptes, configurations nécessaires

### Risques identifiés
Zones d'ambiguïté dans la story, dépendances externes, code legacy
touché sans tests existants