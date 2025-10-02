// hooks/use-participants.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // o tu librería de toast preferida
import {
  Participant,
  ParticipantsStats,
  ParticipantUpdateDTO,
  BulkActionPayload,
} from "@/types/userPanel.types";
import { participantsService } from "@/services/participantsService";

// Query Keys para mejor organización
export const participantsKeys = {
  all: ["participants"] as const,
  lists: () => [...participantsKeys.all, "list"] as const,
  list: (filters?: string) => [...participantsKeys.lists(), filters] as const,
  details: () => [...participantsKeys.all, "detail"] as const,
  detail: (id: string) => [...participantsKeys.details(), id] as const,
  stats: () => [...participantsKeys.all, "stats"] as const,
};

// Hook principal para lista de participantes
export function useParticipants() {
  return useQuery<Participant[], Error>({
    queryKey: participantsKeys.lists(),
    queryFn: () => participantsService.fetchAll(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos (antes cacheTime)
  });
}

// Hook para participante individual
export function useParticipant(id: string) {
  return useQuery<Participant, Error>({
    queryKey: participantsKeys.detail(id),
    queryFn: () => participantsService.fetchById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 3,
  });
}

// Hook para estadísticas
export function useParticipantsStats() {
  return useQuery<ParticipantsStats, Error>({
    queryKey: participantsKeys.stats(),
    queryFn: () => participantsService.fetchStats(),
    staleTime: 1000 * 60 * 2,
  });
}

// Hook para actualizar participante
export function useUpdateParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ParticipantUpdateDTO }) =>
      participantsService.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancelar queries en progreso
      await queryClient.cancelQueries({
        queryKey: participantsKeys.detail(id),
      });
      await queryClient.cancelQueries({ queryKey: participantsKeys.lists() });

      // Snapshot del estado anterior
      const previousParticipant = queryClient.getQueryData(
        participantsKeys.detail(id)
      );
      const previousList = queryClient.getQueryData(participantsKeys.lists());

      // Optimistic update
      queryClient.setQueryData(
        participantsKeys.detail(id),
        (old: Participant | undefined) => (old ? { ...old, ...data } : old)
      );

      queryClient.setQueryData(
        participantsKeys.lists(),
        (old: Participant[] | undefined) =>
          old?.map((p) => (p.id === id ? { ...p, ...data } : p))
      );

      return { previousParticipant, previousList };
    },
    onError: (err, variables, context) => {
      // Rollback en caso de error
      if (context?.previousParticipant) {
        queryClient.setQueryData(
          participantsKeys.detail(variables.id),
          context.previousParticipant
        );
      }
      if (context?.previousList) {
        queryClient.setQueryData(
          participantsKeys.lists(),
          context.previousList
        );
      }
      toast.error("Error al actualizar participante");
    },
    onSuccess: () => {
      toast.success("Participante actualizado correctamente");
    },
    onSettled: (data, error, { id }) => {
      // Refetch para sincronizar con el servidor
      queryClient.invalidateQueries({ queryKey: participantsKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: participantsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: participantsKeys.stats() });
    },
  });
}

// Hook para eliminar participante
export function useDeleteParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => participantsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: participantsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: participantsKeys.stats() });
      toast.success("Participante eliminado correctamente");
    },
    onError: () => {
      toast.error("Error al eliminar participante");
    },
  });
}
