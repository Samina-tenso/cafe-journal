"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // No automatic polling. Refetch on focus is off so the app doesn't
      // re-hit the backend every time the tab regains focus.
      refetchOnWindowFocus: false,
      // Cap retries so a failing/slow backend can't fan out into a storm.
      retry: 1,
      // Treat data as fresh for 30s to avoid redundant refetches.
      staleTime: 30_000,
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
