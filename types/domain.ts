export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;
}

export interface Cafe {
  id: string;
  name: string;
  locationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Visit {
  id: string;
  cafeId: string;
  rating: number;
  notes: string;
  visitedAt: Date;
  createdAt: Date;
}

export interface Photo {
  id: string;
  visitId: string;
  filePath: string;
  dominantColor: string;
  createdAt: Date;
  palette: string[];
}

export type SyncStatus = 'pending' | 'synced' | 'deleted' | 'conflict';

export interface SyncMetadata {
  id: string;
  entityType: string;
  entityId: string;
  syncStatus: SyncStatus;
  lastSyncedAt: Date;
  version: number;
}
