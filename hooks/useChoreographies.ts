"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { RegistrationResponse } from "@/services/api/choreography.service";
import { choreographyService } from "@/services/choreographiesService";

export const registrationsKeys = {
  all: ["registrations"] as const,
  lists: () => [...registrationsKeys.all, "list"] as const,
  list: (filters?: string) => [...registrationsKeys.lists(), filters] as const,
  detail: (id: string) => [...registrationsKeys.all, "detail", id] as const,
};

// ✅ Hook para listar registros
export function useRegistrations() {
  return useQuery<RegistrationResponse[], Error>({
    queryKey: registrationsKeys.lists(),
    queryFn: () => choreographyService.getAll(),
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

// ✅ Hook para un registro individual
export function useRegistration(id: string) {
  return useQuery<RegistrationResponse, Error>({
    queryKey: registrationsKeys.detail(id),
    queryFn: () => choreographyService.getById(id),
    enabled: !!id,
  });
}

// ✅ Hook para eliminar un registro
export function useDeleteRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => choreographyService.deleteRegistration(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: registrationsKeys.lists() });
      toast.success("Registro eliminado correctamente");
    },
    onError: () => {
      toast.error("Error al eliminar registro");
    },
  });
}
