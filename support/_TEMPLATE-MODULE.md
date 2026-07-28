# GABARIT DE MODULE — à respecter strictement

> Document interne de production du support. Ne pas distribuer aux participants.
> Toute rédaction de module doit suivre ce gabarit section par section, dans cet ordre.

---

## Contraintes de fond non négociables

1. **Langue** : français professionnel. Vocabulaire de test conforme au glossaire ISTQB.
2. **Stack** : tous les exemples de code sont en **Angular (TypeScript)** ou **.NET (C#)**,
   avec Playwright pour l'E2E, xUnit/FluentAssertions pour le back, Testing Library pour le front.
   Aucun exemple en Python/Java sauf pour illustrer un outil qui n'existe pas ailleurs.
3. **Fil rouge** : chaque exemple et chaque exercice s'ancre sur le projet **SkyRetail**
   et ses 4 features (F1 moteur de remises, F2 tunnel de commande, F3 catalogue/recherche,
   F4 espace client/RGPD) et sur les 9 bugs plantés (BUG-101 à BUG-402).
   Voir `00-fil-rouge-qa-rescue-mission.md`.
4. **Outil IA** : Claude Code est le fil conducteur. Les concurrents sont cités en comparaison,
   jamais comme outil principal d'un exercice (sauf M5, dédié au panorama).
5. **Sourçage** : chaque **notion** du module se termine par une liste d'au **minimum 10 sources
   différentes et vérifiées**, prises dans les fichiers `recherche/sources-jourN.md`.
   Format imposé : `[S-xx] **Titre** — URL — *type, année* — apport en une phrase, avec un chiffre si disponible.`
   **Ne jamais inventer une URL.** Si une source manque, dire « source à compléter ».
6. **Chiffres** : toute donnée chiffrée est référencée `[S-xx]`. Pas de chiffre non sourcé.
7. **Honnêteté** : les limites, échecs et coûts sont dits. Un support qui ne présente que
   les succès de l'IA est pédagogiquement inutilisable en QA.
8. **Volume** : entre **15 et 30 pages A4 équivalentes** par module (≈ 7 000 à 13 500 mots),
   hors listes de sources, sur une base de conversion de **450 mots par page A4** (texte mixte
   avec code et tableaux).
   Ce calibrage traduit le statut du support : **document de référence exhaustif**, et non
   support de projection (voir `README.md` §3, encadré « Statut du document »). Chaque module
   contient délibérément plus de matière que ce qui sera couvert en séance — le formateur y
   puise, il ne le déroule pas. Un module en deçà de 15 pages est probablement sous-sourcé ou
   sous-exemplifié ; au-delà de 30, il faut extraire une annexe.

---

## Structure imposée

```markdown
# Module Mxx — <Titre>

> **Jour n** · **Durée : Xh XX** · **QA Credits en jeu : nnn**
> *Fil rouge : <une phrase situant le module dans la mission SkyRetail>*

---

## 0. Carte du module

### 0.1 Objectifs pédagogiques
À l'issue de ce module, le·a participant·e sera capable de :
- <verbe d'action à l'infinitif, observable et évaluable> — 4 à 6 objectifs

### 0.2 Prérequis du module
### 0.3 Position dans le fil rouge
| Avant ce module | Après ce module |
### 0.4 Découpage horaire
| Séquence | Contenu | Durée |
### 0.5 Notions couvertes
Liste numérotée N1, N2, N3… (2 à 4 notions par module). Chacune aura sa liste de sources.

---

## 1. Partie théorique

Pour CHAQUE notion N1, N2, N3… :

### 1.n Notion n — <titre>

#### 1.n.1 De quoi parle-t-on
Définition rigoureuse. Reprendre la définition normative (ISTQB, ISO, W3C, OWASP) quand elle existe,
avec la citation exacte entre guillemets et sa référence.

#### 1.n.2 Ce que dit l'état de l'art
Développement de fond : mécanismes, chiffres sourcés, résultats d'études, comparaisons.
Minimum 500 mots par notion. Utiliser des tableaux comparatifs, des schémas ASCII/Mermaid
quand cela clarifie.

#### 1.n.3 Application au contexte SkyRetail
Transposition concrète sur le projet fil rouge.

#### 1.n.4 ⚠️ Pièges et anti-patterns
2 à 4 anti-patterns documentés, avec pour chacun : symptôme, cause, contre-mesure.

#### 1.n.5 📊 Chiffres à retenir
Encadré de 3 à 5 chiffres sourcés, projetables tels quels.

---

## 2. Trois exemples concrets

Chaque exemple comporte : contexte, prompt utilisé (le cas échéant), code produit,
**analyse critique de ce que l'IA a bien fait ET de ce qu'elle a raté**, et l'enseignement.

### 🔍 Exemple A — <titre> *(démonstration guidée, 10-12 min)*
**Contexte** · **Ce qu'on montre** · **Déroulé pas à pas** · **Code** · **Analyse critique** · **Ce qu'on retient**

### 🔍 Exemple B — <titre> *(variante ou approfondissement, 8-10 min)*

### 🔍 Exemple C — <titre> *(cas d'entreprise / passage à l'échelle, 8-10 min)*

---

## 3. Quatre exercices

Format IMPOSÉ pour chacun des 4 exercices :

### 🧪 Exercice Mxx-n — « <intitulé accrocheur> »

| | |
|---|---|
| **Difficulté** | ⭐ / ⭐⭐ / ⭐⭐⭐ / ⭐⭐⭐⭐ |
| **Durée cible** | n min |
| **Modalité** | individuel / binôme / squad |
| **Matériel** | fichiers précis du dépôt SkyRetail |
| **QA Credits** | 10 / 20 / 40 / 80 |

**Énoncé**
<consigne claire, 3 à 8 lignes>

**✅ Résultat attendu**
Description **vérifiable et objective** de ce qui doit être produit. Obligatoirement :
- les artefacts (chemins de fichiers exacts),
- les critères mesurables (nombre de tests, seuils de couverture, assertions présentes,
  sortie console attendue, temps d'exécution),
- ce qui invalide l'exercice (conditions d'échec).
Utiliser une case à cocher par critère.

**💡 Indice** *(à ne donner qu'après 1/3 du temps écoulé)*

**🔑 Solution de référence**
<code ou démarche corrigée, commentée>

**🎓 Ce que l'exercice enseigne vraiment**

> Progression imposée : ⭐ Découverte (application directe, guidée) →
> ⭐⭐ Application (transposition simple, autonomie partielle) →
> ⭐⭐⭐ Transfert (situation nouvelle, choix à faire) →
> ⭐⭐⭐⭐ Défi (ambigu, contradictoire, ou nécessitant de prendre en défaut l'IA).
> Le 4ᵉ exercice doit toujours confronter le participant à une **limite** de l'IA générative.

**Exercice bonus ⭐⭐⭐⭐⭐** (facultatif, pour les squads en avance) — format allégé, 5 lignes.

---

## 4. Débriefing

### 4.1 Les 5 erreurs les plus fréquentes sur ce module
### 4.2 Questions de contrôle (5 questions, avec réponses)
### 4.3 Ce qu'on retient — 5 puces maximum
### 4.4 Transition vers le module suivant (2 lignes narratives, fil rouge)

---

## 5. Sources

### Sources de la notion N1 — <titre>
[S-01] **Titre exact** — https://url — *type, année* — apport en une phrase avec chiffre.
… (minimum 10)

### Sources de la notion N2 — <titre>
… (minimum 10)

*(une section par notion ; une même source peut servir deux notions mais doit alors être
recomptée et réécrite dans les deux listes)*
```

---

## Règles de style

- Phrases courtes. Pas de remplissage. Pas de « il est important de noter que ».
- Les blocs de code sont **exécutables** et commentés en français.
- Les tableaux sont préférés aux listes à puces pour toute comparaison.
- Les encadrés utilisent les émojis conventionnels du support : 📘 théorie, 🔍 exemple,
  🧪 exercice, ⚠️ piège, 🎯 fil rouge, 📊 chiffre, 💡 indice, 🔑 solution, ♿ accessibilité, 🔐 sécurité.
- Les mentions « ⚠️ À jour au 07/2026 » signalent les corrections d'idées reçues.
- Jamais de tutoiement. Écriture inclusive légère (« le·a participant·e »), conforme au style Human Coders.
