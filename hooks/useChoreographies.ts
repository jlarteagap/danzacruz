"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Choreography,
  ChoreographyUpdateDTO,
  ChoreographiesStats,
} from "@/types/userPanel.types";
import { choreographiesService } from "@/services/choreographiesService";

// ✅ Query Keys para mejor organización y consistencia
export const choreographiesKeys = {
  all: ["choreographies"] as const,
  lists: () => [...choreographiesKeys.all, "list"] as const,
  list: (filters?: string) => [...choreographiesKeys.lists(), filters] as const,
  details: () => [...choreographiesKeys.all, "detail"] as const,
  detail: (id: string) => [...choreographiesKeys.details(), id] as const,
  stats: () => [...choreographiesKeys.all, "stats"] as const,
};

// ✅ Hook principal para listar coreografías
export function useChoreographies() {
  return useQuery<Choreography[], Error>({
    queryKey: choreographiesKeys.lists(),
    queryFn: () => choreographiesService.fetchAll(),
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 10, // 10 min
  });
}

// ✅ Hook para una coreografía individual
export function useChoreography(id: string) {
  return useQuery<Choreography, Error>({
    queryKey: choreographiesKeys.detail(id),
    queryFn: () => choreographiesService.fetchById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 3,
  });
}

// ✅ Hook para estadísticas (si las hubiera)
export function useChoreographiesStats() {
  return useQuery<ChoreographiesStats, Error>({
    queryKey: choreographiesKeys.stats(),
    queryFn: () => choreographiesService.fetchStats(),
    staleTime: 1000 * 60 * 2,
  });
}

// ✅ Hook para actualizar una coreografía
export function useUpdateChoreography() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ChoreographyUpdateDTO }) =>
      choreographiesService.update(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: choreographiesKeys.detail(id),
      });
      await queryClient.cancelQueries({
        queryKey: choreographiesKeys.lists(),
      });

      const previousChoreography = queryClient.getQueryData(
        choreographiesKeys.detail(id)
      );
      const previousList = queryClient.getQueryData(choreographiesKeys.lists());

      // Optimistic update
      queryClient.setQueryData(
        choreographiesKeys.detail(id),
        (old: Choreography | undefined) => (old ? { ...old, ...data } : old)
      );

      queryClient.setQueryData(
        choreographiesKeys.lists(),
        (old: Choreography[] | undefined) =>
          old?.map((c) => (c.id === id ? { ...c, ...data } : c))
      );

      return { previousChoreography, previousList };
    },

    onError: (err, variables, context) => {
      // Rollback en caso de error
      if (context?.previousChoreography) {
        queryClient.setQueryData(
          choreographiesKeys.detail(variables.id),
          context.previousChoreography
        );
      }
      if (context?.previousList) {
        queryClient.setQueryData(
          choreographiesKeys.lists(),
          context.previousList
        );
      }
      toast.error("Error al actualizar coreografía");
    },

    onSuccess: () => {
      toast.success("Coreografía actualizada correctamente");
    },

    onSettled: (data, error, { id }) => {
      queryClient.invalidateQueries({
        queryKey: choreographiesKeys.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: choreographiesKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: choreographiesKeys.stats(),
      });
    },
  });
}

// ✅ Hook para eliminar una coreografía
export function useDeleteChoreography() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => choreographiesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: choreographiesKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: choreographiesKeys.stats(),
      });
      toast.success("Coreografía eliminada correctamente");
    },
    onError: () => {
      toast.error("Error al eliminar coreografía");
    },
  });
}
