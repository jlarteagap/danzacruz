///hooks/useUsers.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/services/usersService";
import { User } from "@/types/user.types";

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60, // 1 minuto antes de considerarlo stale
  });
}
