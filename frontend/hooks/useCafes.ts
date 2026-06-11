"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Cafe, CafeCreate, CafeUpdate, MockPlaceResult } from "../types/cafe";

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
  return useMutation<Cafe, Error, { place:MockPlaceResult; vibes: string[] } & CafeCreate>({
    mutationFn:({place, vibes}) => api.createCafe({name: place.name, vibes}, place),
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

export function useSearchPlaces(query:string) {
  return useQuery({
    queryKey:["places", query],
    queryFn: () => api.searchPlaces(query),
    enabled: query.trim().length > 0
  });
}
