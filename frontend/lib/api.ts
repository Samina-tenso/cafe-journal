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

export const api = {
  listCafes: () => request<import("../types/cafe").Cafe[]>("/cafes"),
  getCafe: (id: string) => request<import("../types/cafe").Cafe>(`/cafes/${id}`),
  createCafe: (payload: import("../types/cafe").CafeCreate) =>
    request<import("../types/cafe").Cafe>("/cafes", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateCafe: (id: string, payload: import("../types/cafe").CafeUpdate) =>
    request<import("../types/cafe").Cafe>(`/cafes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  deleteCafe: (id: string) =>
    request<{ detail: string }>(`/cafes/${id}`, {
      method: "DELETE",
    }),
};
