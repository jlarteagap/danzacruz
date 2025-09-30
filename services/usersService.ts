import { User } from "@/types/user.types";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
    cache: "no-store", // evita cacheado en build, React Query maneja el cache
  });

  if (!res.ok) {
    throw new Error("Error al cargar usuarios");
  }

  return res.json();
}
