// API client. Talks to the FastAPI backend by default; set
// NEXT_PUBLIC_USE_MOCK_API=true to run fully offline against lib/api.mock.ts.
//
// Path note: the backend mounts list/create at "/cafes/" and item routes at
// "/cafes/{id}". We match those exactly. Calling "/cafes" (no trailing slash)
// triggers a 307 redirect from FastAPI, doubling every request — so don't.

import type { Cafe, CafeCreate, CafeUpdate } from "../types/cafe";
import { mockApi } from "./api.mock";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return (await res.json()) as T;
}

const realApi = {
  listCafes: () => request<Cafe[]>("/cafes/"),
  getCafe: (id: string) => request<Cafe>(`/cafes/${id}`),
  createCafe: (payload: CafeCreate) =>
    request<Cafe>("/cafes/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateCafe: (id: string, payload: CafeUpdate) =>
    request<Cafe>(`/cafes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  deleteCafe: (id: string) =>
    request<{ detail: string }>(`/cafes/${id}`, {
      method: "DELETE",
    }),
};

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export const api = USE_MOCK ? mockApi : realApi;
