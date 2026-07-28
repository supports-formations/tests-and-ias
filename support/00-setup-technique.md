# Setup technique — à réaliser AVANT le jour 1

> ⏱️ Comptez **45 minutes**. À envoyer aux participants **une semaine avant** la session.
> Le module M0 ne prévoit que **15 minutes** de vérification, pas d'installation.

---

## 1. Poste de travail

| Élément | Version minimale | Vérification |
|---|---|---|
| **.NET SDK** | 8.0 (9.0 recommandé) | `dotnet --info` |
| **Node.js** | 20 LTS (22 recommandé) | `node -v` |
| **Angular CLI** | 18+ | `npx ng version` |
| **Git** | 2.40+ | `git --version` |
| **Docker Desktop / Podman** | à jour, **démarré** | `docker run --rm hello-world` |
| **IDE** | VS Code, Visual Studio 2022, ou Rider | — |
| **Navigateurs Playwright** | installés | `npx playwright install --with-deps` |
| **Droits** | installation de paquets npm/NuGet autorisée | — |
| **RAM** | 16 Go (8 Go = dégradé, Testcontainers pénible) | — |

> ⚠️ **Docker est indispensable** : Testcontainers (PostgreSQL éphémère) est utilisé dès M3.
> En environnement d'entreprise verrouillé, prévoir une alternative : instance PostgreSQL
> partagée fournie par le formateur, ou base SQLite in-memory (mode dégradé documenté en M3).

---

## 2. Comptes et accès

| Service | Nécessité | Remarque |
|---|---|---|
| **Claude Code** (Claude Pro/Max ou clé API Anthropic) | **obligatoire** | Fil conducteur de toute la formation |
| **GitHub** | obligatoire | Fork du dépôt + GitHub Actions (M8) |
| **GitLab** | optionnel | Uniquement si l'entreprise est sur GitLab CI (variante fournie en M8) |
| **GitHub Copilot** | optionnel | Pour la comparaison en M5 ; une licence par squad suffit |
| **Compte d'un outil QA IA** (mabl, Applitools, testRigor…) | optionnel | Essais gratuits ; sinon démonstration par le formateur |

### 2.1 Installation de Claude Code

```bash
npm install -g @anthropic-ai/claude-code
claude --version
cd /chemin/vers/skyretail
claude
```

Vérification attendue : la commande `/status` affiche un compte authentifié et le répertoire
de travail. En cas de proxy d'entreprise, configurer `HTTPS_PROXY` avant le lancement.

> ⚠️ **À jour au 07/2026** — la documentation officielle de Claude Code est sur
> `https://code.claude.com/docs/en/` (l'API est documentée sur `https://platform.claude.com/docs/`).
> Les anciens liens `docs.anthropic.com` redirigent mais le contenu a été réécrit.

### 2.2 Budget API

Ordre de grandeur observé pour les 21 h, par participant, avec discipline de contexte :

| Poste | Estimation |
|---|---|
| Modules 1 à 4 (exploration, génération) | 3 à 6 $ |
| Modules 5 à 6 (agent, itérations) | 8 à 15 $ |
| Modules 7 à 9 (CI, diagnostic, non-fonctionnel) | 6 à 12 $ |
| Modules 10 à 12 (evals, synthèse) | 4 à 8 $ |
| **Total indicatif** | **20 à 40 $ / participant** |

Ces chiffres varient d'un facteur 3 selon le modèle choisi et l'hygiène de contexte —
c'est précisément l'objet du module M4 (§ économie de tokens). Un abonnement Claude Max
couvre confortablement la session.

---

## 3. Le dépôt SkyRetail

```bash
git clone <URL-fournie-par-le-formateur> skyretail
cd skyretail
git checkout formation/j1-start
```

### 3.1 Arborescence

```
skyretail/
├── CLAUDE.md                     # vide au départ — construit en M4
├── docs/
│   ├── cdc-v4.0.md               # cahier des charges (remis en M2)
│   ├── openapi.yaml              # spécification API (23 endpoints)
│   └── incidents/                # 3 post-mortems de production v3.9
├── backend/
│   ├── SkyRetail.Domain/         # F1 — moteur de remises
│   ├── SkyRetail.Api/            # F3, F4 — Web API .NET
│   ├── SkyRetail.Infrastructure/ # EF Core + PostgreSQL
│   └── SkyRetail.Tests/          # xUnit — 47 tests, 9 en [Skip]
├── frontend/
│   ├── src/app/checkout/         # F2 — tunnel de commande
│   ├── src/app/account/          # F4 — espace client
│   └── src/app/**/*.spec.ts      # 0 test réel (squelettes vides)
├── e2e/                          # dossier vide — créé en M2
├── .github/workflows/ci.yml      # pipeline de 34 min
└── docker-compose.yml            # PostgreSQL + seed
```

### 3.2 Démarrage

```bash
# Base de données
docker compose up -d

# Back-end
cd backend && dotnet restore && dotnet build
dotnet run --project SkyRetail.Api        # http://localhost:5080

# Front-end
cd ../frontend && npm ci
npm start                                  # http://localhost:4200

# Tests existants (doivent tourner, même en échec partiel)
cd ../backend && dotnet test
```

### 3.3 État initial à constater (sert d'exercice M0-1)

| Indicateur | Valeur attendue |
|---|---|
| Tests back-end | 47 (dont 9 `[Skip]`) |
| Tests front-end réels | 0 |
| Tests E2E | 0 |
| Couverture back-end | ~12 % |
| Durée du pipeline CI | ~34 min |
| Endpoints documentés en OpenAPI | 23 |

---

## 4. Outillage de test à installer

### 4.1 Back-end .NET

```bash
cd backend/SkyRetail.Tests
dotnet add package xunit
dotnet add package FluentAssertions
dotnet add package NSubstitute
dotnet add package Microsoft.AspNetCore.Mvc.Testing   # WebApplicationFactory
dotnet add package Testcontainers.PostgreSql
dotnet add package Verify.Xunit                        # tests d'instantané
dotnet add package Bogus                               # données synthétiques
dotnet add package FsCheck.Xunit                       # property-based testing
dotnet tool install --global dotnet-stryker            # mutation testing
dotnet tool install --global dotnet-coverage
```

### 4.2 Front-end Angular

```bash
cd frontend
npm i -D @testing-library/angular @testing-library/jest-dom
npm i -D @playwright/test
npx playwright install --with-deps
npm i -D @axe-core/playwright
npm i -D fast-check                                    # property-based testing TS
```

### 4.3 Non-fonctionnel (J3)

```bash
# Charge — au choix
brew install k6            # ou : winget install k6 / choco install k6
dotnet add package NBomber  # variante .NET native

# Sécurité
docker pull ghcr.io/zaproxy/zaproxy:stable

# Accessibilité
npm i -D @axe-core/cli lighthouse
```

### 4.4 MCP (module M5)

```bash
claude mcp add playwright npx @playwright/mcp@latest
claude mcp list
```

---

## 5. Checklist de vérification (M0, 15 min)

À faire cocher par chaque participant à voix haute :

- [ ] `dotnet test` s'exécute et affiche **47 tests**
- [ ] `npm start` sert l'application sur `http://localhost:4200`
- [ ] `docker compose ps` montre PostgreSQL en `healthy`
- [ ] `npx playwright test --list` ne renvoie pas d'erreur d'installation
- [ ] `claude` démarre et `/status` affiche un compte authentifié
- [ ] `claude mcp list` affiche `playwright`
- [ ] `git status` est propre sur `formation/j1-start`

**Si une case n'est pas cochée** : binômage immédiat, pas de dépannage individuel en séance.
Le devcontainer (`.devcontainer/devcontainer.json`, fourni dans le dépôt) est la solution
de repli — il embarque toute la chaîne.

---

## 6. Hygiène de sécurité pendant la formation

Ces règles sont énoncées en M0 et **appliquées via le barème de malus** (voir fil rouge §4.2) :

1. **Aucune donnée réelle** d'entreprise dans un prompt. Le dépôt SkyRetail est le seul terrain.
2. **Aucun secret commité.** Les clés vont dans `.env` (déjà dans `.gitignore`) et,
   en CI, dans les secrets GitHub — jamais en clair dans un workflow.
3. **Permissions Claude Code restreintes.** Le fichier `.claude/settings.json` du dépôt
   contient déjà une politique `permissions.deny` interdisant la lecture de `**/.env`,
   `**/*.pem` et `**/secrets/**`.
   > ⚠️ **À jour au 07/2026** — le fichier `.claudeignore` **n'existe pas** ;
   > le mécanisme officiel est `permissions.deny` dans `.claude/settings.json`.
   > Le champ `ignorePatterns` est déprécié.
4. **Pas d'exécution d'un serveur MCP tiers non vérifié.** Le sujet est traité en M11
   (chaîne d'approvisionnement, serveurs MCP malveillants) ; en séance, seuls les serveurs
   officiels Microsoft/Anthropic/GitHub sont autorisés.
5. **Revue avant commit.** Aucun code généré par IA n'est poussé sans relecture par le Copilote
   du squad. C'est une règle du jeu, et c'est aussi la pratique attendue en entreprise.
