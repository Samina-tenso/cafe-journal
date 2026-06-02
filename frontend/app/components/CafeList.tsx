"use client";

import { useCafes } from "../../hooks/useCafes";

export default function CafeList() {
  const { data: cafes, isLoading, isError, error } = useCafes();

  if (isLoading) return <p>Loading cafes…</p>;
  if (isError) return <p>Failed to load cafes: {error.message}</p>;
  if (!cafes || cafes.length === 0) return <p>No cafes yet.</p>;

  return (
    <ul>
      {cafes.map((cafe) => (
        <li key={cafe.id}>{cafe.name}</li>
      ))}
    </ul>
  );
}
