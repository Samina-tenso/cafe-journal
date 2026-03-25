This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Cafe Journal 🏠☕

A mobile-first web app to log, rate, and explore cafes you’ve visited, with offline support, AI-generated vibes, and interactive maps. Built with **Next.js, TypeScript, TailwindCSS, React Leaflet, and FastAPI**.

This project demonstrates full-stack frontend skills including **state management, offline-first design, PWA, file handling, color extraction, AI integration, and CI/CD workflows**.

---

## 🌟 Features

### Core Cafe Features

- **Add / Edit / Delete cafes** with notes, ratings, and photos
- **Cafe list view** for quick browsing
- **Offline support**: add and view cafes without internet, sync later

### Map & Visualization

- **Map view** of cafes with interactive markers
- Click marker to open **CafeCard**
- Automatic **map-based cafe suggestion** based on user location

### Media & UI Enhancements

- **File uploads** with live image preview
- **Color extraction** from uploaded photos
- **Animated mesh gradients** to capture cafe vibe

### Developer & Testing Features

- **TypeScript + React + Zustand** for state management
- **Next.js + next-pwa** for offline caching & PWA support
- **FastAPI + SQLite** backend (optional local development)
- **ESLint + Prettier** for code quality
- **Husky + lint-staged** for pre-commit hooks
- **Vitest + React Testing Library** for frontend testing
- **CI/CD pipeline** with GitHub Actions

## 🛠 Tech Stack

| Layer              | Technology                                                  |
| ------------------ | ----------------------------------------------------------- |
| Frontend           | Next.js + TypeScript, TailwindCSS, Zustand, TanStack Query  |
| Maps & Geolocation | React Leaflet, Leaflet, OpenStreetMap tiles                 |
| Image Processing   | colorthief / node-vibrant, Canvas API                       |
| Offline / PWA      | next-pwa, idb (IndexedDB wrapper)                           |
| Backend            | FastAPI + SQLite                                            |
| AI Integration     | OpenAI API                                                  |
| Testing            | Vitest, React Testing Library                               |
| CI/CD              | GitHub Actions, Vercel (frontend), Railway/Render (backend) |

---

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 9
- Optional: Python 3.10+ (for FastAPI backend)

### Frontend Setup

```bash
# Clone repository
git clone <repo-url>
cd cafe-journal

# Install dependencies
npm install

# Start development server
npm run dev


## Backend setup
cd backend
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn main:app --reload

src/
├─ components/       # Reusable UI components (Button, Card, Modal)
├─ features/         # Feature-specific components + hooks + services
├─ hooks/            # Generic reusable hooks
├─ lib/              # Utilities / libraries (API wrapper, gradient generator)
├─ state/            # Global state (Zustand stores)
├─ pages/            # Next.js pages
├─ styles/           # Global Tailwind + CSS
├─ utils/            # Generic helper functions
└─ types/            # Global TypeScript types
```
