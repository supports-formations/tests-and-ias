---
name: detection-doublons
description: Recherche des tickets Github similaires avant la création d'une nouvelle fiche d'anomalie, par similarité sémantique (pas seulement mots-clés). À utiliser systématiquement avant toute création de ticket bug, dans le cadre du skill fiche-anomalie.
---

# Détection de doublons

## Règles strictes

- Ne jamais affirmer "c'est un doublon" de façon catégorique — toujours
  formuler en "possible doublon" avec un niveau de confiance et la
  justification précise de la ressemblance.
- Comparer sur le fond (symptôme, composant touché, conditions de
  déclenchement), jamais uniquement sur la formulation du titre.
- Un ticket fermé/résolu il y a longtemps qui ressemble au nouveau bug
  n'est pas un doublon à fusionner mais une régression potentielle —
  le signaler comme tel, catégorie différente d'un doublon actif.
- Si aucun candidat sérieux n'est trouvé, le dire clairement plutôt que
  de forcer un rapprochement avec le ticket le "moins différent".

## Méthode

1. Extraire du nouveau signalement : composant/module concerné, symptôme
   principal, mots-clés techniques (nom de fonction, message d'erreur)
2. Interroger Github avec un JQL large sur le composant et une fenêtre
   temporelle raisonnable (ex. 6 derniers mois), statut ouvert ET fermé
3. Pour chaque candidat retourné, comparer :
   - Le symptôme observé (pas juste le titre)
   - Le composant/fichier technique si stack trace disponible
   - Les conditions de déclenchement (étapes de reproduction)
4. Classer chaque candidat : Doublon probable / Régression possible /
   Lié mais distinct / Non pertinent
5. Ne retenir dans le rapport final que "Doublon probable" et
   "Régression possible", avec justification

## Format de sortie

Pour chaque candidat retenu :
- Ticket : [clé] — [titre]
- Statut : Ouvert / Fermé (résolu le [date] si fermé)
- Catégorie : Doublon probable / Régression possible
- Justification : phrase précise de ce qui rapproche les deux tickets
- Niveau de confiance : Élevé / Moyen / Faible