//services/participantsService.ts
import { Participant } from "@/types/userPanel.types";

export async function fetchParticipants(): Promise<Participant[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/participants`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Error al cargar participantes");
  }

  return res.json();
}
