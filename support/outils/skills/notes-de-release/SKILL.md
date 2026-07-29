---
name: notes-de-release
description: Génère des notes de release / changelog à partir des tickets Github fermés sur une période donnée, en deux versions (technique pour l'équipe dev, simplifiée pour PO/management). À utiliser en fin de sprint ou avant un déploiement, dès qu'on demande un changelog, des notes de version, ou une synthèse de ce qui a été livré.
---

# Génération de notes de release

## Règles strictes

- Ne jamais lister un ticket dont le statut n'est pas explicitement
  "Résolu/Fermé/Déployé" — un ticket "En cours" ne figure jamais dans
  les notes, même s'il semble proche de la fin.
- Distinguer strictement 3 catégories : Fonctionnalités livrées / Bugs
  corrigés / Changements techniques internes (refactoring, dette).
  Ne jamais mélanger un bug corrigé avec une nouveauté.
- La version PO/management ne doit contenir aucun terme technique brut
  (nom de fichier, nom de fonction, stack) — reformuler en impact
  utilisateur ou métier.
- Si un ticket n'a pas de description exploitable (titre seul, vague),
  le signaler dans une section "À clarifier" plutôt que d'inventer
  une description plausible.

## Méthode

1. Récupérer les tickets fermés sur la période (sprint ou plage de dates)
2. Classer par catégorie (Fonctionnalité / Bug / Technique)
3. Pour chaque ticket, extraire l'essentiel factuel (titre, description,
   éventuellement le résumé des commentaires de clôture)
4. Rédiger la version technique : précise, peut citer composants/API
5. Rédiger la version simplifiée : reformuler en "ce qui change pour
   l'utilisateur", sans jargon
6. Regrouper les tickets liés/redondants en une seule entrée plutôt que
   de lister chaque ticket individuellement s'ils couvrent le même sujet

## Format de sortie

### Version technique (équipe dev)
- **Fonctionnalités** : [ticket] — description technique
- **Corrections** : [ticket] — cause + résolution en une phrase
- **Technique/interne** : [ticket] — nature du changement

### Version simplifiée (PO / management)
- Ce qui est nouveau : ...
- Ce qui est corrigé : ...
(pas de section technique interne — non pertinente pour ce public)

### À clarifier
Tickets sans description exploitable, à vérifier avant publication