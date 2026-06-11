export type Cafe = {
  id: string;
  name: string;
  location_id?: string | null;
  created_at: string; // ISO
  updated_at: string; // ISO
  vibes?: string[]; // Optional array of vibe tags
};

export type CafeCreate = {
  name: string;
  vibes?: string[]; // Optional array of vibe tags
};
export type MockPlaceResult = {
  name: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type CafeUpdate = Partial<CafeCreate>;
