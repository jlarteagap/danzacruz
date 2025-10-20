import { useMutation, useQueryClient } from "@tanstack/react-query";
import { choreographyService } from "@/services/choreographiesService";
import type { Registration } from "../_types";
import type { ChoreographyEditFormValues } from "../_lib/schemas";
import { toast } from "sonner";

interface UpdateChoreographyParams {
  participantId: string;
  choreographyId: string;
  data: ChoreographyEditFormValues;
}

/**
 * Hook para actualizar una coreografía con optimistic update
 */
export const useUpdateChoreography = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      participantId,
      choreographyId,
      data,
    }: UpdateChoreographyParams) => {
      return await choreographyService.updateChoreography(
        participantId,
        choreographyId,
        data
      );
    },

    // Optimistic update
    onMutate: async ({ participantId, choreographyId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["registrations"] });

      const previousRegistrations = queryClient.getQueryData<Registration[]>([
        "registrations",
      ]);

      // Update optimista
      queryClient.setQueryData<Registration[]>(
        ["registrations"],
        (old = []) => {
          return old.map((registration) => {
            if (registration.id !== participantId) return registration;

            return {
              ...registration,
              choreographies: registration.choreographies.map((choreo) => {
                if (choreo.id !== choreographyId) return choreo;

                return {
                  ...choreo,
                  ...data,
                };
              }),
            };
          });
        }
      );

      return { previousRegistrations };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["registrations"],
        context?.previousRegistrations
      );

      toast.error("Error al actualizar la coreografía", {
        description:
          error instanceof Error ? error.message : "Intenta de nuevo",
      });
    },

    onSuccess: () => {
      toast.success("Coreografía actualizada exitosamente");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });
};
