export type Cafe = {
  id: string;
  name: string;
  location_id?: string | null;
  created_at: string; // ISO
  updated_at: string; // ISO
};

export type CafeCreate = {
  name: string;
  location_id?: string | null;
};

export type CafeUpdate = Partial<CafeCreate>;
