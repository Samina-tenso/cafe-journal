"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Cafe, CafeCreate, CafeUpdate } from "../types/cafe";

export function useCafes() {
  return useQuery<Cafe[], Error>({ queryKey: ["cafes"], queryFn: api.listCafes });
}

export function useCafe(id?: string) {
  return useQuery<Cafe, Error>({
    queryKey: ["cafes", id],
    queryFn: () => api.getCafe(id!),
    enabled: !!id,
  });
}

export function useCreateCafe() {
  const qc = useQueryClient();
  return useMutation<Cafe, Error, CafeCreate>({
    mutationFn: api.createCafe,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cafes"] }),
  });
}

export function useUpdateCafe() {
  const qc = useQueryClient();
  return useMutation<Cafe, Error, { id: string; payload: CafeUpdate }>({
    mutationFn: ({ id, payload }) => api.updateCafe(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cafes"] }),
  });
}

export function useDeleteCafe() {
  const qc = useQueryClient();
  return useMutation<{ detail: string }, Error, string>({
    mutationFn: api.deleteCafe,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cafes"] }),
  });
}
