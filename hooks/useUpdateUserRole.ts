// hooks/useUpdateUserRole.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "@/services/usersService";
import { UpdateUserRoleDto, User } from "@/types/user.types";
import { USERS_QUERY_KEY } from "@/hooks/useUser";
import { toast } from "sonner"; // Asumiendo que usas sonner para toasts

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRoleDto) => usersService.updateUserRole(data),

    // Optimistic update
    onMutate: async (variables) => {
      // Cancelar queries en progreso
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

      // Guardar snapshot del estado anterior
      const previousUsers = queryClient.getQueryData<User[]>(USERS_QUERY_KEY);

      // Actualizar optimistamente
      queryClient.setQueryData<User[]>(USERS_QUERY_KEY, (old) =>
        old?.map((user) =>
          user.id === variables.userId
            ? { ...user, role: variables.newRole }
            : user
        )
      );

      return { previousUsers };
    },

    // En caso de error, revertir
    onError: (error, variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USERS_QUERY_KEY, context.previousUsers);
      }
      toast.error("Error al actualizar rol", {
        description: error.message,
      });
    },

    // Siempre refetch después de success o error
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },

    onSuccess: (data) => {
      toast.success("Rol actualizado exitosamente", {
        description: `El usuario ahora es ${data.user.role}`,
      });
    },
  });
}
