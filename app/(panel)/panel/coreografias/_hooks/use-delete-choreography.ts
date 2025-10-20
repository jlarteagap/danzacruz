import { useMutation, useQueryClient } from "@tanstack/react-query";
import { choreographyService } from "@/services/choreographiesService";
import type { Registration } from "../_types";
import { toast } from "sonner"; // Asumiendo que usas sonner para toasts

interface DeleteChoreographyParams {
  participantId: string;
  choreographyId: string;
}

/**
 * Hook para eliminar una coreografía con optimistic update
 * Si es la última coreografía del participante, elimina todo el registro
 */
export const useDeleteChoreography = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      participantId,
      choreographyId,
    }: DeleteChoreographyParams) => {
      // Obtener el estado actual
      const registrations = queryClient.getQueryData<Registration[]>([
        "registrations",
      ]);

      const registration = registrations?.find((r) => r.id === participantId);

      if (!registration) {
        throw new Error("Participante no encontrado");
      }

      // Determinar si eliminar el participante completo o solo la coreografía
      const isLastChoreography = registration.choreographies.length === 1;

      if (isLastChoreography) {
        // Eliminar registro completo
        await choreographyService.deleteRegistration(participantId);
        return { type: "registration", participantId };
      } else {
        // Eliminar solo la coreografía
        await choreographyService.deleteChoreography(
          participantId,
          choreographyId
        );
        return { type: "choreography", participantId, choreographyId };
      }
    },

    // Optimistic update
    onMutate: async ({ participantId, choreographyId }) => {
      // Cancelar queries en progreso
      await queryClient.cancelQueries({ queryKey: ["registrations"] });

      // Snapshot del estado anterior
      const previousRegistrations = queryClient.getQueryData<Registration[]>([
        "registrations",
      ]);

      // Update optimista
      queryClient.setQueryData<Registration[]>(
        ["registrations"],
        (old = []) => {
          return old
            .map((registration) => {
              if (registration.id !== participantId) return registration;

              // Filtrar la coreografía
              const updatedChoreographies = registration.choreographies.filter(
                (c) => c.id !== choreographyId
              );

              // Si no quedan coreografías, retornar null para filtrar después
              if (updatedChoreographies.length === 0) return null;

              return {
                ...registration,
                choreographies: updatedChoreographies,
              };
            })
            .filter((r): r is Registration => r !== null);
        }
      );

      return { previousRegistrations };
    },

    // Rollback en caso de error
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["registrations"],
        context?.previousRegistrations
      );

      toast.error("Error al eliminar la coreografía", {
        description:
          error instanceof Error ? error.message : "Intenta de nuevo",
      });
    },

    // Revalidar después de éxito
    onSuccess: (data) => {
      if (data.type === "registration") {
        toast.success("Participante eliminado", {
          description: "Era su última coreografía registrada",
        });
      } else {
        toast.success("Coreografía eliminada exitosamente");
      }
    },

    // Siempre revalidar al finalizar
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });
};
