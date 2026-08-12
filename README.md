# XENOHURU

Open infrastructure journal and builder community site for African tourism systems — frontend SPA plus Express API workspace.

## Stack

- **pnpm** workspaces, Node.js 20+, TypeScript 5.9
- **Web:** Vite + React (`artifacts/xenohuru`) — deploy target for **Vercel**
- **API:** Express 5 (`artifacts/api-server`)
- **DB:** PostgreSQL + Drizzle ORM (`lib/db`)
- **Validation / codegen:** Zod, Orval from OpenAPI (`lib/api-spec`)
- **Tests:** Vitest (+ Supertest for the API)
- **CI:** GitHub Actions (`.github/workflows/ci.yml`)
- **Deps bot:** Dependabot (`.github/dependabot.yml`)

## Quick start

```bash
pnpm install
pnpm dev          # web on http://localhost:5173
pnpm dev:api      # API on http://localhost:5000 (default)
```

```bash
pnpm run typecheck
pnpm run test
pnpm run build:web
```

## Packages

| Path | Package | Role |
|------|---------|------|
| `artifacts/xenohuru` | `@workspace/xenohuru` | Main web app (Vercel) |
| `artifacts/api-server` | `@workspace/api-server` | Express API (`/api/healthz`, …) |
| `artifacts/mockup-sandbox` | `@workspace/mockup-sandbox` | Local UI mockup preview |
| `lib/db` | `@workspace/db` | Drizzle schema |
| `lib/api-spec` | `@workspace/api-spec` | OpenAPI + Orval codegen |
| `lib/api-zod` / `lib/api-client-react` | generated clients | Shared API types/hooks |

## Deploy on Vercel

1. Import this GitHub repo in [Vercel](https://vercel.com).
2. Framework preset: **Other** (or leave blank). Root directory: repo root.
3. Vercel reads `vercel.json`:
   - install: `pnpm install --frozen-lockfile`
   - build: `pnpm --filter @workspace/xenohuru run build`
   - output: `artifacts/xenohuru/dist`
4. SPA rewrites send all routes to `index.html`.
5. Optional env: `BASE_PATH=/` (default).

The Express API is **not** bundled into the Vercel static deploy. Run it on a Node host (Railway, Fly, Render, VPS) or add a separate Vercel serverless project later. Point the frontend at the API URL when you wire live data.

## Environment

Copy `.env.example` to `.env` as needed.

| Variable | Used by | Notes |
|----------|---------|--------|
| `PORT` | API / Vite | API default `5000`, web default `5173` |
| `BASE_PATH` | Vite | Default `/` |
| `DATABASE_URL` | `@workspace/db` | Postgres connection string |

## CI & bots

- **CI** runs on every push/PR to `main`/`master`: install → typecheck → unit tests → build web + API.
- **Dependabot** opens weekly PRs for npm and GitHub Actions updates.

## Scripts

- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks/Zod from OpenAPI
- `pnpm --filter @workspace/db run push` — push DB schema (dev)
