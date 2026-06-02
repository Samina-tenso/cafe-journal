# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

### Frontend (run from repo root)
```bash
npm run dev              # start Next.js dev server (port 3000)
npm run dev:backend      # start FastAPI dev server (port 8000)
```

Or run frontend directly from `frontend/`:
```bash
cd frontend && npm run dev
cd frontend && npm run build
cd frontend && npm run lint
cd frontend && npm run format     # prettier --write .
```

### Backend
```bash
# Activate the venv first:
source scripts/activate_backend_venv.sh

# Run the server (same as npm run dev:backend):
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000

# Create DB tables (run once, or after model changes):
python backend/scripts/create_tables.py

# Install backend dependencies:
pip install -r backend/requirements.txt
```

### Environment
Copy `.env.example` to `.env` (root) and `backend/.env.local`:
```
DATABASE_URL=postgresql://app:secret@localhost:5432/cafeapp
NEXT_PUBLIC_API_URL=http://localhost:8000
```
`DEV=true` (default) disables SSL for the DB connection and opens CORS to `*`. Set `ALLOWED_ORIGINS` to a comma-separated list to restrict origins in production.

---

## Architecture

This is a monorepo with two independently-runnable packages:

```
frontend/   — Next.js 16 App Router (React 19, TypeScript, TailwindCSS 4)
backend/    — FastAPI + SQLModel + PostgreSQL
types/      — Shared domain types (TypeScript, not used by backend)
```

### Data flow
```
Browser
  → TanStack Query (server state, cache, mutations)
  → frontend/lib/api.ts (typed fetch wrapper, NEXT_PUBLIC_API_URL)
  → FastAPI (backend/app/main.py)
  → SQLModel session (backend/app/db.py)
  → PostgreSQL
```

### Frontend layers
- **`frontend/lib/api.ts`** — raw `fetch` wrapper; all API calls go through `api.*` methods here.
- **`frontend/hooks/useCafes.ts`** — TanStack Query hooks (`useCafes`, `useCafe`, `useCreateCafe`, etc.); components should use these, not `api` directly.
- **`frontend/providers/QueryProvider.tsx`** — wraps the app with `QueryClientProvider`; must be present in the layout tree.
- **`frontend/types/cafe.ts`** — TypeScript types that mirror backend schemas (`Cafe`, `CafeCreate`, `CafeUpdate`).
- **`types/domain.ts`** — fuller domain model (Location, Visit, Photo, SyncMetadata) for future features.

### Backend layers
- **`backend/app/models.py`** — SQLModel table models (`Cafe`, `Location`); UUIDs as string PKs.
- **`backend/app/schemas.py`** — Pydantic request/response schemas (`CafeCreate`, `CafeRead`, `CafeUpdate`).
- **`backend/app/routers/cafes.py`** — CRUD router mounted at `/cafes`.
- **`backend/app/db.py`** — engine and `get_session` dependency; reads `DATABASE_URL` from env.
- **`backend/app/sync/`** — offline sync engine (in progress): `SyncEngine.ts`, `ChangeLog.ts`, `event.ts`.

### Key conventions
- The frontend `node_modules` lives inside `frontend/`; the root `node_modules` is only for repo tooling (husky, lint-staged).
- Husky pre-commit hook is active. Root `lint-staged` is a no-op placeholder; linting runs from `frontend/`.
- Next.js uses Turbopack in dev (`next dev` defaults to Turbopack in Next 16). The `turbopack.root` config in `frontend/next.config.ts` anchors the workspace root to `frontend/` to avoid lockfile conflicts with the monorepo.
- **Before writing any Next.js code**, read the relevant guide in `frontend/node_modules/next/dist/docs/` — Next.js 16 has breaking changes from earlier versions.
