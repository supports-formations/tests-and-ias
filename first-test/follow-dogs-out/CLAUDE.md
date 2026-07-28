# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Product context, TDD method, and non-negotiable workflow rules live in the parent `CLAUDE.md` (`../CLAUDE.md`) — read that first. This file only covers what's specific to the `follow-dogs-out` app.

## Commands

- `npm run dev` — start the dev server (React Router / Vite, HMR) at `http://localhost:5173`.
- `npm run build` — production build (`react-router build`).
- `npm start` — serve the production build (`react-router-serve ./build/server/index.js`).
- `npm run typecheck` — regenerate React Router types (`react-router typegen`) then run `tsc`.
- Vitest is not yet installed in `package.json`, even though the parent `CLAUDE.md` specifies `npm test` (`vitest run`) as the test runner. Before writing the first test, add Vitest (and its config) rather than assuming it is already wired up.

## Architecture

This is a React Router v8 app in **Framework Mode** (`@react-router/dev`, `app/routes.ts`, route modules under `app/routes/`, typed route args via `./+types/*`). Current state is close to the stock React Router template — route tree and data layer are not yet built out:

- `app/routes.ts` — the route table (`RouteConfig`). Add new routes here (e.g. `route("path", "routes/file.tsx")`), not by convention-based file discovery.
- `app/routes/*.tsx` — route modules. Each exports a default component and can export `meta`, `loader`, `action`, etc., typed against the generated `Route` namespace from `./+types/<routename>`.
- `app/root.tsx` — root layout (`Layout`/`App`/`ErrorBoundary`), holds document-level `<html>`/`<head>`/`<body>` and global error handling.
- `~/*` path alias maps to `app/*` (see `tsconfig.json`).
- Styling is Tailwind CSS v4 via `@tailwindcss/vite` (see `vite.config.ts`, `app/app.css`) — no separate Tailwind config file.

### Data layer (per parent CLAUDE.md)

There is no data/mock layer implemented yet. When building the walk-tracking feature, the data layer must be built as a **mock with the same interface Firebase/Firestore will eventually have**, so components can be written against that interface and swapped later without changes. Don't add real Firebase code until the mock is validated.

## React Router reference

A bundled skill at `.agents/skills/react-router/SKILL.md` documents React Router's modes in depth (Framework/Data/Declarative/RSC) with per-mode reference docs under `.agents/skills/react-router/references/`. This app is Framework Mode — read `references/framework-mode.md` for anything involving routes, loaders, actions, or navigation.
