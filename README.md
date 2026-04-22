This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Cafe Journal ☕📍

A **mobile-first progressive web app** for logging, and discovering cafes you’ve visited.

The app focuses on **offline-first design**, **interactive maps**, and **rich media journaling**, allowing users to record cafe experiences even when offline and sync them when connectivity returns.

This project is designed as a **learning-focused fullstack system** demonstrating modern frontend architecture, API design, testing practices, and CI/CD workflows.

---

# ✨ Key Features

### Cafe Journaling

- Add, edit, and delete cafe entries
- Personal notes
- Photo uploads for each cafe visit
- Tagging and categorization

### Map Visualization

- Interactive cafe map view
- Cafe markers with quick previews
- Location-based cafe suggestions
- Geolocation integration

### Media Enhancements

- Image upload with preview
- Color extraction from photos
- Dynamic UI themes based on cafe images
- Animated mesh gradients representing cafe “vibes”

### Offline-first Experience

- Add cafes without internet connection
- Local storage via IndexedDB
- Automatic background sync when online
- PWA installable on mobile

### AI Features

- AI-generated vibe summaries for cafes
- Suggested tags based on notes
- Smart cafe discovery recommendations

---

# 🏗 Architecture

The system follows a **modern frontend + API backend architecture**.

```
Client (Next.js)
      ↓
TanStack Query (data fetching)
      ↓
REST API (FastAPI)
      ↓
PostgreSQL Database
```

## Architecture Principles

- **Separation of client state vs server state**
- **Offline-first design**
- **Incremental enhancement**
- **API-driven architecture**
- **Strong typing across the stack**

---

# 🧰 Tech Stack

## Frontend

- **Next.js (App Router)**
- **TypeScript**
- **TailwindCSS**
- **Zustand** (client state)
- **TanStack Query** (server state)
- **React Leaflet** (maps)

### Why this stack?

- Next.js enables hybrid rendering and modern routing
- TanStack Query provides caching and background fetching
- Zustand provides minimal global state management

---

## Backend

- **FastAPI**
- **PostgreSQL**
- **SQLModel / SQLAlchemy**
- **Pydantic validation**

### Responsibilities

- Cafe CRUD operations
- Image metadata storage
- User authentication
- AI integration endpoints

---

## Storage

- **PostgreSQL** → primary database
- **IndexedDB** → offline local storage
- **Object storage** (optional future) for images

---

## Maps & Geolocation

- **React Leaflet**
- **Leaflet**
- **OpenStreetMap tiles**

---

## Image Processing

- **node-vibrant / colorthief**
- **Canvas API**
  Used for extracting color palettes from cafe photos.

data flow

Upload photo
↓
extract palette
↓
store palette in Photo

---

## AI Integration

- OpenAI API

Example uses:

- Generate vibe descriptions
- Suggest tags from cafe notes
- Provide cafe recommendations

---

## Offline & PWA

- **next-pwa**
- **IndexedDB**
- **Service Workers**

Features:

- Offline cafe viewing
- Offline cafe creation
- Background synchronization

---

# 🔐 Authentication

The application includes user accounts.

Features:

- Secure login / signup
- JWT-based authentication
- User-specific cafe journals

Future enhancements:

- OAuth login (Google / Apple)
- Multi-device sync

---

# 🛡 Security Considerations

Security best practices applied:

- Request validation with Pydantic
- Sanitized user input
- File upload validation
- Rate limiting (future)
- Environment variable management

---

# 📊 Observability

Production-ready apps require visibility into errors and performance.

Potential integrations:

- **Sentry** → error monitoring
- **Loguru / structured logging**
- **PostHog** → product analytics

---

# 🧪 Testing Strategy

Testing is implemented at multiple levels.

## Frontend Testing

Tools:

- Vitest
- React Testing Library

Coverage includes:

- Component behavior
- Form interactions
- UI state changes

---

## Backend Testing

Tools:

- Pytest
- FastAPI test client

Coverage includes:

- API endpoints
- validation logic
- database operations

---

# 🚀 CI/CD Pipeline

Continuous integration is handled through **GitHub Actions**.

Pipeline tasks include:

- Linting
- Type checking
- Running tests
- Build verification

Deployment:

- **Frontend:** Vercel
- **Backend:** Railway / Render

---

# 📁 Project Structure

Example structure:

```
frontend/
  app/
  components/
  features/
  hooks/
  lib/
  store/

backend/
  app/
    api/
    models/
    services/
    schemas/
    db/

infra/
  github-actions/
```

Principles:

- Feature-based frontend organization
- Clear backend service boundaries
- Shared types when possible

---

# 🧠 Learning Goals

This project demonstrates real-world engineering skills including:

- Modern React architecture
- State management patterns
- API design
- Database modeling
- Offline-first applications
- CI/CD workflows
- Testing strategies

It is intentionally designed to help developers progress from **junior → mid-level engineer**.

---

# 🗺 Development Roadmap

The project is built incrementally.

### Phase 1 — Core App

- Cafe CRUD
- Basic UI
- Database schema
- API endpoints

### Phase 2 — Map Integration

- Cafe map view
- Location markers
- Geolocation support

### Phase 3 — Media Features

- Photo uploads
- Image previews
- Color palette extraction

### Phase 4 — Offline-first

- IndexedDB caching
- Service workers
- Background sync

### Phase 5 — AI Features

- Cafe vibe summaries
- Tag suggestions
- Recommendation engine

### Phase 6 — Production Features

- Authentication
- Monitoring
- CI/CD improvements

---

# 🧑‍💻 Local Development

## Frontend

```
npm install
npm run dev
```

## Backend

```
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

# 📦 Environment Variables

Example `.env` configuration:

```
DATABASE_URL=postgresql://...
OPENAI_API_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# 🤝 Contributing

This project is structured as a **learning-focused repository**.

Contributions should:

- follow linting rules
- include tests where appropriate
- maintain clear commit messages

---

# 📜 License

MIT License

---
