// lib/hooks/use-choreography-registration.ts
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  choreographyApi,
  MOCK_CATEGORIES,
  MOCK_DIVISIONS,
  MOCK_SUBDIVISIONS,
  CATEGORY_OPTIONS,
  DIVISION_OPTIONS,
  SUBDIVISION_OPTIONS,
} from "@/services/api/choreography.service";
import type { RegistrationFormValues } from "@/lib/validation/choreography-schema";
import { toast } from "sonner"; // o tu sistema de notificaciones preferido

/**
 * Query Keys para React Query
 * Facilita la invalidación y gestión de caché
 */
export const QUERY_KEYS = {
  categories: ["categories"] as const,
  divisions: (categoryId: string) => ["divisions", categoryId] as const,
  subdivisions: (divisionId: string) => ["subdivisions", divisionId] as const,
  availability: (categoryId: string, divisionId: string) =>
    ["availability", categoryId, divisionId] as const,
};

/**
 * Hook para obtener categorías
 */
export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: async () => {
      // En desarrollo, usar mock data
      if (process.env.NODE_ENV === "development") {
        return new Promise((resolve) => {
          setTimeout(() => resolve(CATEGORY_OPTIONS), 500);
        });
      }
      return choreographyApi.getCategories();
    },
    staleTime: 5 * 60 * 1000, // 5 minutos - las categorías no cambian frecuentemente
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
}

/**
 * Hook para obtener divisiones por categoría
 */
export function useDivisions(categoryId: string | null) {
  return useQuery({
    queryKey: QUERY_KEYS.divisions(categoryId || ""),
    queryFn: async () => {
      if (!categoryId) return [];

      // Mock data en desarrollo
      if (process.env.NODE_ENV === "development") {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(DIVISION_OPTIONS[categoryId] || []);
          }, 400);
        });
      }

      return choreographyApi.getDivisionsByCategory(categoryId);
    },
    enabled: !!categoryId, // Solo ejecutar si hay categoryId
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook para obtener subdivisiones por división
 */
export function useSubdivisions(divisionId: string | null) {
  return useQuery({
    queryKey: QUERY_KEYS.subdivisions(divisionId || ""),
    queryFn: async () => {
      if (!divisionId) return [];

      // Mock data en desarrollo
      if (process.env.NODE_ENV === "development") {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(SUBDIVISION_OPTIONS[divisionId] || []);
          }, 400);
        });
      }

      return choreographyApi.getSubdivisionsByDivision(divisionId);
    },
    enabled: !!divisionId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook para verificar disponibilidad
 */
export function useAvailability(
  categoryId: string | null,
  divisionId: string | null
) {
  return useQuery({
    queryKey: QUERY_KEYS.availability(categoryId || "", divisionId || ""),
    queryFn: () => choreographyApi.checkAvailability(categoryId!, divisionId!),
    enabled: !!categoryId && !!divisionId,
    staleTime: 30 * 1000, // 30 segundos - info más dinámica
    refetchInterval: 60 * 1000, // Refetch cada minuto
  });
}

/**
 * Hook principal para el registro
 */
export function useChoreographyRegistration() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: RegistrationFormValues) => {
      // Simular delay de red en desarrollo
      // if (process.env.NODE_ENV === "development") {
      //   await new Promise((resolve) => setTimeout(resolve, 2000));

      //   // Simular respuesta exitosa
      //   return {
      //     registrationId: `REG-${Date.now()}`,
      //     participantId: `PART-${Date.now()}`,
      //     choreographyIds: data.choreographies.map(
      //       (_, i) => `CHOREO-${Date.now()}-${i}`
      //     ),
      //     confirmationCode: `CONF-${Math.random()
      //       .toString(36)
      //       .substring(2, 8)
      //       .toUpperCase()}`,
      //     timestamp: new Date().toISOString(),
      //   };
      // }

      return choreographyApi.registerParticipant(data);
    },
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({
        queryKey: ["registrations"],
      });

      // Toast de éxito
      toast.success("¡Registro exitoso!", {
        description: `Código de confirmación: ${data.confirmationCode}`,
        duration: 5000,
      });

      // Limpiar localStorage si existe draft
      if (typeof window !== "undefined") {
        localStorage.removeItem("choreography-registration-draft");
      }

      console.log("Registro completado:", {
        participant: variables.participantName,
        choreographies: variables.choreographies.length,
        confirmationCode: data.confirmationCode,
      });
    },
    onError: (error: Error) => {
      console.error("Error en registro:", error);

      toast.error("Error al registrar", {
        description: error.message || "Por favor, intenta nuevamente",
        duration: 4000,
      });
    },
  });

  return {
    register: mutation.mutate,
    registerAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}

// IDs según tus mocks
const GENERAL_CATEGORY_ID = "cat-01"; // General
const COLEGIOS_CATEGORY_ID = "cat-02"; // Colegios
// 🔹 Función para inicializar coreografía con categoría y división correctas
const defaultCategory = CATEGORY_OPTIONS.find((c) => c.value === "general");
if (!defaultCategory) throw new Error("No se encontró la categoría General");

const defaultDivision = DIVISION_OPTIONS[defaultCategory.value][0];
if (!defaultDivision)
  throw new Error("No se encontró la división para General");

export const getDefaultChoreography = () => ({
  id: `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  choreographyName: "",
  category: defaultCategory.value, // "general"
  division: defaultDivision.value, // "pre-infantil"
  subdivision: "solo",
  modality: "solo",
  musicName: "",
  choreographer: "",
  styleDetails: "",
  additionalInfo: null,
});

/**
 * Hook para auto-guardado en localStorage (draft)
 */
export function useDraftRecovery(values: RegistrationFormValues) {
  const saveDraft = () => {
    if (typeof window === "undefined") return;

    try {
      const draft = {
        values,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(
        "choreography-registration-draft",
        JSON.stringify(draft)
      );
    } catch (error) {
      console.error("Error al guardar borrador:", error);
    }
  };

  const loadDraft = (): RegistrationFormValues | null => {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem("choreography-registration-draft");
      if (!stored) return null;

      const draft = JSON.parse(stored);
      const draftDate = new Date(draft.timestamp);
      const hoursSinceDraft =
        (Date.now() - draftDate.getTime()) / (1000 * 60 * 60);

      // Borrador válido por 24 horas
      if (hoursSinceDraft > 24) {
        localStorage.removeItem("choreography-registration-draft");
        return null;
      }

      return draft.values;
    } catch (error) {
      console.error("Error al cargar borrador:", error);
      return null;
    }
  };

  const clearDraft = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("choreography-registration-draft");
  };

  return { saveDraft, loadDraft, clearDraft };
}
