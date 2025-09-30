// app/dashboard/participantes/hooks/useParticipants.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { Participant } from "@/types/userPanel.types";
import { fetchParticipants } from "@/services/participantsService";

export function useParticipants() {
  return useQuery<Participant[], Error>({
    queryKey: ["participants"],
    queryFn: fetchParticipants,
    staleTime: 1000 * 60, // 1 min
  });
}
