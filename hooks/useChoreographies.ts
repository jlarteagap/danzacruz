// app/dashboard/coreografias/hooks/useChoreographies.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchChoreographies } from "@/services/choreographiesService";
import { Choreography } from "@/types/userPanel.types";

export function useChoreographies() {
  return useQuery<Choreography[], Error>({
    queryKey: ["choreographies"],
    queryFn: fetchChoreographies,
    staleTime: 1000 * 60, // 1 min
  });
}
