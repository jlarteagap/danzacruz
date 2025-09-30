import { Choreography } from "@/types/userPanel.types";
export async function fetchChoreographies(): Promise<Choreography[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/choreographies`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Error al cargar coreografías");
  }

  return res.json();
}
