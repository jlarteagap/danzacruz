// ============================================================================
// service/api/choreography.service.ts
// Servicio adaptado para usar Fetch API nativo
// ============================================================================

/**
 * Tipos de datos del servicio
 */
export interface Registration {
  id: string;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  participantCity: string;
  participantCountry: string;
  choreographies: Choreography[];
}

export interface Choreography {
  id: string;
  choreographyName: string;
  category: string;
  division: string;
  subdivision: string;
  modality: string;
  musicName: string;
  choreographer: string;
  styleDetails: string;
  additionalInfo: string | null;
}

// Alias para compatibilidad con el código existente
export type RegistrationResponse = Registration;

/**
 * Tipos para formularios de edición
 */
export interface ChoreographyEditFormValues {
  choreographyName: string;
  category: string;
  division: string;
  subdivision: string;
  modality: string;
  musicName: string;
  choreographer: string;
  styleDetails: string;
  additionalInfo?: string | null;
}

/**
 * Configuración de la API
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Helper para manejar errores de Fetch
 */
const handleFetchError = async (response: Response, context: string) => {
  if (!response.ok) {
    let errorMessage = `${context}: ${response.statusText}`;

    // Intentar extraer mensaje del body si existe
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Si no hay JSON, usar el statusText
    }

    // Logging específico por código de error
    switch (response.status) {
      case 401:
        console.error("[API] No autorizado - Token inválido o expirado");
        break;
      case 403:
        console.error("[API] Acceso prohibido");
        break;
      case 404:
        console.error("[API] Recurso no encontrado");
        break;
      case 422:
        console.error("[API] Error de validación");
        break;
      case 500:
        console.error("[API] Error interno del servidor");
        break;
    }

    throw new Error(errorMessage);
  }
};

/**
 * Helper para obtener headers con autenticación
 */
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Agregar token de autenticación si existe
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * Clase del servicio de coreografías
 * Implementa todas las operaciones CRUD necesarias
 */
class ChoreographyService {
  private baseUrl = `${API_BASE_URL}/registrations`;

  /**
   * GET: Obtener todas las registrations
   * @returns Promise<Registration[]>
   * @throws Error
   */
  async getAll(): Promise<Registration[]> {
    try {
      const response = await fetch(this.baseUrl, {
        cache: "no-store",
        headers: getHeaders(),
      });

      await handleFetchError(response, "Error al cargar registrations");

      const registrations: Registration[] = await response.json();

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[choreographyService.getAll] ${registrations.length} registrations obtenidas`
        );
      }

      return registrations;
    } catch (error) {
      console.error("[choreographyService.getAll] Error:", error);
      throw error;
    }
  }

  /**
   * GET: Obtener una registration específica por ID
   * @param participantId - ID del participante
   * @returns Promise<Registration>
   * @throws Error
   */
  async getById(participantId: string): Promise<Registration> {
    try {
      const response = await fetch(`${this.baseUrl}/${participantId}`, {
        cache: "no-store",
        headers: getHeaders(),
      });

      await handleFetchError(
        response,
        `Error al cargar participante ${participantId}`
      );

      const registration: Registration = await response.json();

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[choreographyService.getById] Participante ${participantId} obtenido`
        );
      }

      return registration;
    } catch (error) {
      console.error(
        `[choreographyService.getById] Error obteniendo ${participantId}:`,
        error
      );
      throw error;
    }
  }

  /**
   * DELETE: Eliminar registro completo (participante + todas sus coreografías)
   * @param participantId - ID del participante
   * @returns Promise<void>
   * @throws Error
   */
  async deleteRegistration(participantId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${participantId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      await handleFetchError(
        response,
        `Error al eliminar participante ${participantId}`
      );

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[choreographyService.deleteRegistration] Participante ${participantId} eliminado`
        );
      }
    } catch (error) {
      console.error(
        `[choreographyService.deleteRegistration] Error eliminando ${participantId}:`,
        error
      );
      throw error;
    }
  }

  /**
   * DELETE: Eliminar solo una coreografía específica
   * Este método ahora solo maneja la eliminación via PATCH
   *
   * @param participantId - ID del participante
   * @param choreographyId - ID de la coreografía
   * @returns Promise<void>
   * @throws Error
   */
  async deleteChoreography(
    participantId: string,
    choreographyId: string
  ): Promise<void> {
    try {
      // Obtener el registro actual
      const registration = await this.getById(participantId);

      // Validar que el participante existe
      if (!registration) {
        throw new Error(`Participante ${participantId} no encontrado`);
      }

      // Validar que tiene más de una coreografía
      if (registration.choreographies.length <= 1) {
        throw new Error(
          "No se puede eliminar la única coreografía. Use deleteRegistration() en su lugar."
        );
      }

      // Filtrar la coreografía a eliminar
      const updatedChoreographies = registration.choreographies.filter(
        (c) => c.id !== choreographyId
      );

      // Validar que la coreografía existía
      if (updatedChoreographies.length === registration.choreographies.length) {
        throw new Error(`Coreografía ${choreographyId} no encontrada`);
      }

      // Actualizar el registro con las coreografías restantes
      await this.updateRegistration(participantId, {
        choreographies: updatedChoreographies,
      });

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[choreographyService.deleteChoreography] Coreografía ${choreographyId} eliminada`
        );
      }
    } catch (error) {
      console.error(
        `[choreographyService.deleteChoreography] Error eliminando coreografía ${choreographyId}:`,
        error
      );
      throw error;
    }
  }

  /**
   * PATCH: Actualizar una registration completa
   * Nota: Tu endpoint actual actualiza el registro completo.
   *
   * @param participantId - ID del participante
   * @param data - Datos actualizados
   * @returns Promise<Registration>
   * @throws Error
   */
  async updateRegistration(
    participantId: string,
    data: Partial<Registration>
  ): Promise<Registration> {
    try {
      const response = await fetch(`${this.baseUrl}/${participantId}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      await handleFetchError(
        response,
        `Error al actualizar participante ${participantId}`
      );

      const updatedRegistration: Registration = await response.json();

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[choreographyService.updateRegistration] Participante ${participantId} actualizado`
        );
      }

      return updatedRegistration;
    } catch (error) {
      console.error(
        `[choreographyService.updateRegistration] Error actualizando ${participantId}:`,
        error
      );
      throw error;
    }
  }

  /**
   * PATCH: Actualizar una coreografía específica
   * Nota: Este método construye el payload completo con la coreografía actualizada.
   *
   * @param participantId - ID del participante
   * @param choreographyId - ID de la coreografía
   * @param data - Datos actualizados de la coreografía
   * @returns Promise<Choreography>
   * @throws Error
   */
  async updateChoreography(
    participantId: string,
    choreographyId: string,
    data: ChoreographyEditFormValues
  ): Promise<Choreography> {
    try {
      // Obtener el registro actual
      const registration = await this.getById(participantId);

      // Encontrar y actualizar la coreografía específica
      const updatedChoreographies = registration.choreographies.map((choreo) =>
        choreo.id === choreographyId ? { ...choreo, ...data } : choreo
      );

      // Actualizar el registro completo con las coreografías modificadas
      const updatedRegistration = await this.updateRegistration(participantId, {
        choreographies: updatedChoreographies,
      });

      // Encontrar y retornar la coreografía actualizada
      const updatedChoreography = updatedRegistration.choreographies.find(
        (c) => c.id === choreographyId
      );

      if (!updatedChoreography) {
        throw new Error("Coreografía no encontrada después de actualizar");
      }

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[choreographyService.updateChoreography] Coreografía ${choreographyId} actualizada`
        );
      }

      return updatedChoreography;
    } catch (error) {
      console.error(
        `[choreographyService.updateChoreography] Error actualizando coreografía ${choreographyId}:`,
        error
      );
      throw error;
    }
  }

  /**
   * POST: Crear una nueva coreografía para un participante existente
   *
   * @param participantId - ID del participante
   * @param data - Datos de la nueva coreografía
   * @returns Promise<Choreography>
   * @throws Error
   */
  async createChoreography(
    participantId: string,
    data: ChoreographyEditFormValues
  ): Promise<Choreography> {
    try {
      // Obtener el registro actual
      const registration = await this.getById(participantId);

      // Generar ID temporal para la nueva coreografía
      const newChoreography: Choreography = {
        id: `temp-${Date.now()}`, // ID temporal, el backend debería generar uno real
        ...data,
        additionalInfo: data.additionalInfo || null,
      };

      // Agregar la nueva coreografía al array
      const updatedChoreographies = [
        ...registration.choreographies,
        newChoreography,
      ];

      // Actualizar el registro completo
      await this.updateRegistration(participantId, {
        choreographies: updatedChoreographies,
      });

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[choreographyService.createChoreography] Nueva coreografía creada para ${participantId}`
        );
      }

      return newChoreography;
    } catch (error) {
      console.error(
        `[choreographyService.createChoreography] Error creando coreografía:`,
        error
      );
      throw error;
    }
  }

  /**
   * MÉTODO LEGACY: fetchAll (mantener compatibilidad)
   * Obtiene todas las coreografías en formato aplanado
   * @deprecated Usa getAll() y flatten-data.ts en su lugar
   */
  async fetchAll(): Promise<any[]> {
    const registrations = await this.getAll();

    // Aplanar las coreografías para compatibilidad con código existente
    return registrations.flatMap((reg) =>
      reg.choreographies.map((choreo) => ({
        registrationId: reg.id,
        participantName: reg.participantName,
        participantEmail: reg.participantEmail,
        participantPhone: reg.participantPhone,
        participantCity: reg.participantCity,
        participantCountry: reg.participantCountry,
        ...choreo,
      }))
    );
  }

  /**
   * MÉTODO LEGACY: fetchById (mantener compatibilidad)
   * @deprecated Usa getById() en su lugar
   */
  async fetchById(id: string): Promise<any> {
    return this.getById(id);
  }

  /**
   * MÉTODO LEGACY: update (mantener compatibilidad)
   * @deprecated Usa updateRegistration() o updateChoreography() en su lugar
   */
  async update(registrationId: string, data: any): Promise<any> {
    return this.updateRegistration(registrationId, data);
  }

  /**
   * MÉTODO LEGACY: delete (mantener compatibilidad)
   * @deprecated Usa deleteRegistration() en su lugar
   */
  async delete(registrationId: string): Promise<void> {
    return this.deleteRegistration(registrationId);
  }
}

// Exportar instancia única del servicio (Singleton)
export const choreographyService = new ChoreographyService();

// También exportar la clase para testing si es necesario
export { ChoreographyService };

// ============================================================================
// EJEMPLO DE USO EN HOOKS (Ya adaptado en los artifacts anteriores)
// ============================================================================
/*
import { choreographyService } from '@/service/api/choreography.service';

// En useRegistrations.ts
const { data } = useQuery({
  queryKey: ['registrations'],
  queryFn: choreographyService.getAll,
});

// En useUpdateChoreography.ts
const { mutate } = useMutation({
  mutationFn: ({ participantId, choreographyId, data }) =>
    choreographyService.updateChoreography(participantId, choreographyId, data),
});

// En useDeleteChoreography.ts
const { mutate } = useMutation({
  mutationFn: async ({ participantId, choreographyId }) => {
    const registration = await choreographyService.getById(participantId);
    
    if (registration.choreographies.length === 1) {
      await choreographyService.deleteRegistration(participantId);
    } else {
      await choreographyService.deleteChoreography(participantId, choreographyId);
    }
  },
});
*/

// ============================================================================
// VARIABLES DE ENTORNO REQUERIDAS
// ============================================================================
/*
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

# O en producción:
# NEXT_PUBLIC_API_BASE_URL=https://api.tupdominio.com/api
*/
