import { useMutation, useQueryClient } from "@tanstack/react-query";
import { choreographyService } from "@/services/choreographiesService";
import type { Registration } from "../_types";
import { toast } from "sonner";

interface DeleteChoreographyParams {
  participantId: string;
  choreographyId: string;
}

type DeleteChoreographyContext = {
  previousRegistrations?: Registration[];
  targetRegistration?: Registration;
  shouldDeleteRegistration: boolean;
};

/**
 * Hook para eliminar una coreografía con optimistic update
 * Si es la última coreografía del participante, elimina todo el registro
 */
export const useDeleteChoreography = () => {
  const queryClient = useQueryClient();

  return useMutation<
    {
      type: "registration" | "choreography";
      participantId: string;
      choreographyId?: string;
    },
    Error,
    DeleteChoreographyParams,
    DeleteChoreographyContext
  >({
    onMutate: async ({ participantId, choreographyId }) => {
      await queryClient.cancelQueries({ queryKey: ["registrations"] });

      const previousRegistrations = queryClient.getQueryData<Registration[]>([
        "registrations",
      ]);

      const targetRegistration = previousRegistrations?.find(
        (r) => r.id === participantId
      );

      if (!targetRegistration) {
        toast.error("Participante no encontrado");
        throw new Error("Participante no encontrado en el caché");
      }

      // Determinar si eliminar el participante completo ANTES del update optimista
      const shouldDeleteRegistration =
        targetRegistration.choreographies.length === 1;

      // Update optimista
      queryClient.setQueryData<Registration[]>(["registrations"], (old = []) =>
        old
          .map((registration) => {
            if (registration.id !== participantId) return registration;

            const updatedChoreographies = registration.choreographies.filter(
              (c) => c.id !== choreographyId
            );

            if (updatedChoreographies.length === 0) return null;

            return {
              ...registration,
              choreographies: updatedChoreographies,
            };
          })
          .filter((r): r is Registration => r !== null)
      );

      return {
        previousRegistrations,
        targetRegistration,
        shouldDeleteRegistration,
      };
    },

    mutationFn: async ({ participantId, choreographyId }) => {
      // Obtener el contexto desde el cache de mutaciones
      const mutationCache = queryClient.getMutationCache();
      const mutations = mutationCache.getAll();
      const currentMutation = mutations[mutations.length - 1];
      const context = currentMutation?.state.context as
        | DeleteChoreographyContext
        | undefined;

      if (!context || typeof context.shouldDeleteRegistration === "undefined") {
        throw new Error("No se pudo obtener el contexto de la mutación");
      }

      const { shouldDeleteRegistration } = context;

      if (shouldDeleteRegistration) {
        // Eliminar el registro completo (participante + todas sus coreografías)
        await choreographyService.deleteRegistration(participantId);
        return { type: "registration" as const, participantId };
      }

      // Eliminar solo la coreografía específica
      // Como tu backend no tiene endpoint específico, hacemos la actualización manual
      const previousRegistrations = context?.previousRegistrations;
      const targetRegistration = previousRegistrations?.find(
        (r) => r.id === participantId
      );

      if (!targetRegistration) {
        throw new Error("No se encontró el participante en el contexto");
      }

      // Filtrar la coreografía que queremos eliminar
      const updatedChoreographies = targetRegistration.choreographies.filter(
        (c) => c.id !== choreographyId
      );

      // Actualizar el registro con las coreografías restantes
      await choreographyService.updateRegistration(participantId, {
        choreographies: updatedChoreographies,
      });

      return {
        type: "choreography" as const,
        participantId,
        choreographyId,
      };
    },

    onError: (error, _vars, context) => {
      if (context?.previousRegistrations) {
        queryClient.setQueryData(
          ["registrations"],
          context.previousRegistrations
        );
      }

      toast.error("Error al eliminar la coreografía", {
        description: error.message || "Intenta de nuevo más tarde",
      });
    },

    onSuccess: (data) => {
      if (data.type === "registration") {
        toast.success("Participante eliminado", {
          description: "Era su última coreografía registrada",
        });
      } else {
        toast.success("Coreografía eliminada exitosamente");
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });
};
