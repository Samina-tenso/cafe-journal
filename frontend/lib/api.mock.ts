// Mock API — lets the frontend run with no backend.
//
// Opt in by setting NEXT_PUBLIC_USE_MOCK_API=true. Otherwise lib/api.ts uses
// the real fetch-based client. Same surface as the real client so hooks and
// components don't change.

import type { Cafe, CafeCreate, CafeUpdate, MockPlaceResult } from "../types/cafe";

const now = () => new Date().toISOString();

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Seed data so the UI has something to show on first load.
const cafes: Cafe[] = [
  {
    id: uuid(),
    name: "Blue Bottle Coffee",
    location_id: null,
    created_at: now(),
    updated_at: now(),
  },
  {
    id: uuid(),
    name: "Verve Coffee Roasters",
    location_id: null,
    created_at: now(),
    updated_at: now(),
  },
  {
    id: uuid(),
    name: "Stumptown",
    location_id: null,
    created_at: now(),
    updated_at: now(),
  },
];

const locations = [
  {
    id: uuid(),
    address: "Huddingevägen 14245",
    city: "Älvsjö",
    country: "Sweden",
    latitude: 59.2753,
    longitude: 17.9914
  }, 
  {
    id: uuid(),
    address: "Wollmar Yxkullsgatan 10",
    city: "Stockholm",
    country: "Sweden",
    latitude: 59.3177,
    longitude: 18.0604
  },
  {
    id: uuid(),
    address: "Krukmakargatan 24",
    city: "Stockholm",
    country: "Sweden",
    latitude: 59.3162,
    longitude: 18.0544
  },
  {
    id: uuid(),
    address: "Swedenborgsgatan 7",
    city: "Stockholm",
    country: "Sweden",
    latitude: 59.3171,
    longitude: 18.0654
  },

];

const places: MockPlaceResult[] = [
  {
    name: "Älvdalens Café",
    address: "Huddingevägen 14245",
    city: "Älvsjö",
    country: "Sweden",
    latitude: 59.2753,
    longitude: 17.9914
  },
  {
    name: "Drop Coffee",
    address: "Wollmar Yxkullsgatan 10",
    city: "Stockholm",
    country: "Sweden",
    latitude: 59.3177,
      longitude: 18.0604
  },
  {
    name: "Cafe Ritual",
    address: "Krukmakargatan 24",
    city: "Stockholm",
    country: "Sweden",
    latitude: 59.3162,
    longitude: 18.0544
  },
  {
    name: "Johan & Nyström",
    address: "Swedenborgsgatan 7",
    city: "Stockholm",
    country: "Sweden",
    latitude: 59.3171,
    longitude: 18.0654
  },
];

// Simulate network latency so loading states are exercised.
const LATENCY_MS = 200;
const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));

const clone = <T>(value: T): T =>
  typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));

export const mockApi = {


  listCafes: () => delay(clone(cafes)),

  getCafe: (id: string) => {
    const cafe = cafes.find((c) => c.id === id);
    if (!cafe) {
      return Promise.reject(new Error(`404 Not Found: cafe ${id}`));
    }
    return delay(clone(cafe));
  },

  createCafe: (payload: CafeCreate, place: MockPlaceResult) => {
    const cafe: Cafe = {
      id: uuid(),
      name: payload.name,
      created_at: now(),
      updated_at: now(),
      vibes: payload.vibes ?? []
    };
    const {name, ...locationData} = place 
    const newLocation = {id:uuid(), ...locationData};
    locations.push(newLocation);
    cafe.location_id = newLocation.id;
    cafes.push(cafe);
    return delay(clone(cafe));
  },

  updateCafe: (id: string, payload: CafeUpdate) => {
    const cafe = cafes.find((c) => c.id === id);
    if (!cafe) {
      return Promise.reject(new Error(`404 Not Found: cafe ${id}`));
    }
    if (payload.name !== undefined) cafe.name = payload.name;
    cafe.updated_at = now();
    return delay(clone(cafe));
  },

  deleteCafe: (id: string) => {
    const idx = cafes.findIndex((c) => c.id === id);
    if (idx === -1) {
      return Promise.reject(new Error(`404 Not Found: cafe ${id}`));
    }
    cafes.splice(idx, 1);
    return delay({ detail: "deleted" });
  },

  searchPlaces: (query: string): Promise<MockPlaceResult[]> => {
    const lower = query.toLowerCase();
    const results = places.filter((p) => p.name.toLowerCase().includes(lower));
    return delay(clone(results));
  }
};
