export type Operation = 'CREATE' | 'UPDATE' | 'DELETE';

export interface ChangeEvent {
  id: string;
  entityType: string;
  entityId: string;
  operation: Operation;
  payload: unknown;
  createdAt: number;
  status: 'pending' | 'synced' | 'failed';
}
