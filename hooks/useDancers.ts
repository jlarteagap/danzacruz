// hooks/useDancers.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addDancerToChoreography,
  getDancersByChoreography,
  DancerPayload,
  Dancer,
} from "@/services/dancersService";
import { toast } from "sonner"; // asumiendo hook shadcn
import { v4 as uuidv4 } from "uuid";

export const dancersKeys = {
  all: ["dancers"] as const,
  list: (choreographyId: string) =>
    [...dancersKeys.all, "list", choreographyId] as const,
};

export function useDancers(choreographyId: string) {
  return useQuery({
    queryKey: dancersKeys.list(choreographyId),
    queryFn: async () => {
      const { dancers } = await getDancersByChoreography(choreographyId);
      return dancers;
    },
    enabled: !!choreographyId,
    staleTime: 1000 * 60 * 1,
  });
}

export function useAddDancer(choreographyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DancerPayload) =>
      addDancerToChoreography(choreographyId, payload),
    onMutate: async (newDancerPayload) => {
      // Cancelar queries en curso y snapshot
      await queryClient.cancelQueries({
        queryKey: dancersKeys.list(choreographyId),
      });
      const previous = queryClient.getQueryData<Dancer[] | undefined>(
        dancersKeys.list(choreographyId)
      );

      // Optimistic dancer (temp id)
      const tempDancer: Dancer = {
        id: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        fullName: newDancerPayload.fullName,
        document: newDancerPayload.document,
        createdAt: new Date().toISOString(),
      };

      // Actualizar cache inmediatamente
      queryClient.setQueryData<Dancer[]>(
        dancersKeys.list(choreographyId),
        (old = []) => [...old, tempDancer]
      );

      return { previous, tempId: tempDancer.id };
    },
    onError: (_err, _newDancer, context: any) => {
      // Revertir
      if (context?.previous) {
        queryClient.setQueryData(
          dancersKeys.list(choreographyId),
          context.previous
        );
      }
      toast.error("Error al agregar bailarín. Intenta nuevamente.");
    },
    onSettled: () => {
      // Refrescar siempre para obtener ids reales y consistencia
      queryClient.invalidateQueries({
        queryKey: dancersKeys.list(choreographyId),
      });
    },
    onSuccess: (_data, _variables, _context) => {
      toast.success("Bailarín agregado correctamente.");
    },
  });
}
