# Cahier des charges fonctionnel — Carnet de voyage

## 1. Présentation générale

### 1.1 Contexte
« Carnet de voyage » est une application web permettant à un utilisateur de constituer, organiser et partager le récit de ses voyages : chaque voyage est structuré en étapes géolocalisées, illustrées de photos, enrichies de commentaires et d'une note personnelle, et visualisables sur une carte interactive avec calcul d'itinéraire.

### 1.2 Objectifs du produit
- Permettre à un utilisateur de conserver une trace structurée de ses voyages passés ou en cours.
- Offrir une visualisation géographique (carte, itinéraire) des voyages et de leurs étapes.
- Permettre l'enrichissement du carnet par des photos, des commentaires et une notation.
- Garantir la confidentialité des données : chaque utilisateur n'accède qu'à ses propres voyages.

### 1.3 Périmètre
Le périmètre couvre : la gestion de compte utilisateur (inscription, connexion, récupération de mot de passe), la gestion des voyages et de leurs étapes, la recherche de lieux, la consultation cartographique et le calcul d'itinéraire, ainsi que les commentaires et la notation.

Sont **hors périmètre** : la gestion de plusieurs profils/rôles (administrateur, modérateur), le partage de voyages entre utilisateurs, les notifications, la messagerie, et toute fonctionnalité de paiement.

## 2. Acteurs

| Acteur | Description |
|---|---|
| Voyageur (utilisateur inscrit) | Seul acteur du système. Crée un compte, gère ses voyages et étapes, consulte la carte. N'a accès qu'à ses propres données. |

Il n'existe pas de rôle administrateur ni de visiteur anonyme au-delà des écrans d'authentification : toute fonctionnalité métier nécessite d'être connecté.

## 3. Glossaire

| Terme | Définition |
|---|---|
| Voyage | Regroupement d'étapes autour d'une destination principale, borné par une date de début et une date de fin. |
| Étape | Lieu visité au sein d'un voyage, avec ses propres dates, photos et commentaires. |
| Lieu | Localisation géographique (nom + coordonnées) sélectionnée via la recherche pour définir une destination ou une étape. |
| Itinéraire | Tracé routier reliant les étapes d'un voyage, calculé automatiquement. |
| Note | Appréciation d'un voyage sur une échelle de 1 à 5. |

## 4. Besoins fonctionnels

### 4.1 Domaine : Gestion de compte et authentification

**Besoin F1 — Inscription**
Un utilisateur non inscrit doit pouvoir créer un compte en renseignant son nom, une adresse email et un mot de passe.
- Règle de gestion : l'adresse email doit être valide et unique dans le système.
- Règle de gestion : le mot de passe doit respecter une longueur minimale.
- Règle de gestion : en cas d'email déjà utilisé, l'inscription est refusée et l'utilisateur en est informé.

**Besoin F2 — Connexion**
Un utilisateur inscrit doit pouvoir se connecter avec son email et son mot de passe pour accéder à son espace personnel.
- Règle de gestion : en cas d'identifiants incorrects, l'accès est refusé sans préciser lequel des deux champs est erroné.

**Besoin F3 — Récupération de mot de passe**
Un utilisateur ayant oublié son mot de passe doit pouvoir demander sa réinitialisation à partir de son adresse email.
- Règle de gestion : la réponse à une demande de réinitialisation est identique que l'email existe ou non, afin de ne pas révéler l'existence d'un compte.
- Règle de gestion : le lien de réinitialisation transmis a une durée de validité limitée (1 heure) et n'est utilisable qu'une seule fois.

**Besoin F4 — Réinitialisation du mot de passe**
Un utilisateur muni d'un lien de réinitialisation valide doit pouvoir définir un nouveau mot de passe.
- Règle de gestion : un lien expiré ou déjà utilisé est refusé.

**Besoin F5 — Déconnexion**
Un utilisateur connecté doit pouvoir se déconnecter à tout moment, mettant fin à sa session.

**Besoin F6 — Confidentialité des données**
Toute donnée relative aux voyages (voyages, étapes, photos, commentaires) n'est accessible et modifiable que par son propriétaire.
- Règle de gestion : toute tentative d'accès à un voyage n'appartenant pas à l'utilisateur connecté est refusée.

### 4.2 Domaine : Gestion des voyages

**Besoin F7 — Consultation de la liste des voyages**
Un utilisateur connecté doit pouvoir consulter la liste de ses voyages, avec pour chacun : titre, destination, dates et note.

**Besoin F8 — Création d'un voyage**
Un utilisateur doit pouvoir créer un nouveau voyage en renseignant un titre, une date de début, une date de fin et une destination (recherchée via le besoin F14).
- Règle de gestion : la date de fin doit être postérieure ou égale à la date de début.
- Règle de gestion : le titre et la destination sont obligatoires.

**Besoin F9 — Consultation du détail d'un voyage**
Un utilisateur doit pouvoir consulter le détail d'un voyage : informations générales, note, commentaires et liste de ses étapes.

**Besoin F10 — Modification d'un voyage**
Un utilisateur doit pouvoir modifier les informations d'un voyage qu'il possède (titre, dates, destination), sans perte des étapes déjà associées.

**Besoin F11 — Notation d'un voyage**
Un utilisateur doit pouvoir attribuer une note de 1 à 5 à l'un de ses voyages, et la modifier ultérieurement.

**Besoin F12 — Commentaire sur un voyage**
Un utilisateur doit pouvoir ajouter un commentaire libre à l'un de ses voyages, horodaté.

### 4.3 Domaine : Gestion des étapes

**Besoin F13 — Ajout d'une étape**
Un utilisateur doit pouvoir ajouter une étape à un voyage, en renseignant un nom, un lieu (via recherche, besoin F14) et éventuellement des dates de début et de fin.
- Règle de gestion : les étapes d'un voyage sont conservées et présentées dans leur ordre chronologique d'ajout.

**Besoin F14 — Recherche de lieux**
Lors de la création d'un voyage ou d'une étape, l'utilisateur doit pouvoir rechercher un lieu par son nom et sélectionner la localisation correspondante (nom et coordonnées) parmi une liste de suggestions.

**Besoin F15 — Modification d'une étape**
Un utilisateur doit pouvoir modifier les informations d'une étape qu'il possède (nom, lieu, dates).

**Besoin F16 — Ajout de photo à une étape**
Un utilisateur doit pouvoir associer une ou plusieurs photos à une étape de voyage.

**Besoin F17 — Commentaire sur une étape**
Un utilisateur doit pouvoir ajouter un commentaire libre à une étape, horodaté et associé à son auteur.

### 4.4 Domaine : Carte et itinéraire

**Besoin F18 — Visualisation cartographique**
Un utilisateur doit pouvoir visualiser sur une carte interactive l'ensemble de ses voyages (destination) et des étapes associées, avec un descriptif au survol/clic de chaque marqueur.

**Besoin F19 — Calcul d'itinéraire**
Un utilisateur doit pouvoir sélectionner un voyage sur la carte et obtenir le tracé de l'itinéraire routier reliant ses étapes.
- Règle de gestion : le calcul d'itinéraire nécessite un minimum de deux étapes positionnées.

## 5. Exigences non fonctionnelles de premier niveau

*(Rappel : ce document est volontairement limité au périmètre fonctionnel. Les exigences techniques, de performance, de sécurité applicative ou d'architecture font l'objet d'un document séparé.)*

- Toutes les actions de gestion (création, modification) doivent restituer à l'utilisateur une confirmation ou un message d'erreur explicite.
- L'accès aux fonctionnalités de gestion de voyages est strictement conditionné à une authentification valide.

## 6. Synthèse des écrans attendus

| Écran | Fonctionnalités couvertes |
|---|---|
| Inscription | F1 |
| Connexion | F2 |
| Mot de passe oublié | F3 |
| Réinitialisation de mot de passe | F4 |
| Liste des voyages | F7 |
| Création / édition d'un voyage | F8, F10, F14 |
| Détail d'un voyage | F9, F11, F12, F13, F15, F16, F17 |
| Carte | F18, F19 |

## 7. Traçabilité

Chaque besoin fonctionnel listé en section 4 est identifié par une référence unique (F1 à F19), destinée à être reprise dans les phases ultérieures de conception, de développement et de recette (tests fonctionnels, cahier de recette).
