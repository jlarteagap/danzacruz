///hooks/useUsers.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/services/usersService";
import { User } from "@/types/user.types";

export const USERS_QUERY_KEY = ["users"] as const;

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: USERS_QUERY_KEY,
    queryFn: () => usersService.fetchUsers(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: true,
    retry: 2,
  });
}
