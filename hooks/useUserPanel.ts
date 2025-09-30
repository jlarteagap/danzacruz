"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUserPanel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al actualizar usuario");
      return res.json();
    },
    onSuccess: () => {
      // 🔄 Invalida y refresca los datos
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
    },
  });
}
