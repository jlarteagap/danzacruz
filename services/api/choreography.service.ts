// services/api/choreography.service.ts

import type { RegistrationFormValues } from "@/lib/validation/choreography-schema";

/**
 * Tipos de respuesta de la API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  errors?: Record<string, string[]>;
}

export interface RegistrationResponse {
  id: string;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  participantCity: string;
  participantCountry: string;
  choreographies: Array<{
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
  }>;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Division {
  id: string;
  categoryId: string;
  name: string;
  minAge?: number;
  maxAge?: number;
}

export interface Subdivision {
  id: string;
  divisionId: string;
  name: string;
  level?: string;
}

/**
 * Cliente API con configuración base
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

class ChoreographyApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en la petición");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  /**
   * Obtener todas las categorías disponibles
   */
  async getCategories(): Promise<Category[]> {
    const response = await this.request<Category[]>("/categories");
    return response.data || [];
  }

  /**
   * Obtener divisiones por categoría
   */
  async getDivisionsByCategory(categoryId: string): Promise<Division[]> {
    const response = await this.request<Division[]>(
      `/categories/${categoryId}/divisions`
    );
    return response.data || [];
  }

  /**
   * Obtener subdivisiones por división
   */
  async getSubdivisionsByDivision(divisionId: string): Promise<Subdivision[]> {
    const response = await this.request<Subdivision[]>(
      `/divisions/${divisionId}/subdivisions`
    );
    return response.data || [];
  }

  /**
   * Registrar participante con coreografías
   */

  async registerParticipant(
    data: RegistrationFormValues
  ): Promise<RegistrationResponse> {
    try {
      console.log("📤 Enviando datos:", data); // Debug

      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("📡 Response status:", response.status); // Debug

      if (!response.ok) {
        let errorMessage = `Error ${response.status}`;

        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }

        console.error("❌ Error del servidor:", errorMessage);
        throw new Error(errorMessage);
      }

      const result: RegistrationResponse = await response.json();

      if (!result || !result.id) {
        throw new Error("Respuesta inválida del servidor");
      }

      console.log("✅ Registro exitoso:", result); // Debug
      return result;
    } catch (error: any) {
      console.error("❌ Error en registerParticipant:", error);
      throw new Error(error.message || "Error al registrar participante");
    }
  }

  /**
   * Registrar con archivos usando FormData
   */
  private async registerWithFiles(
    data: RegistrationFormValues
  ): Promise<RegistrationResponse> {
    const formData = new FormData();

    formData.append("participantName", data.participantName);

    data.choreographies.forEach((choreo, index) => {
      formData.append(`choreographies[${index}][category]`, choreo.category);
      formData.append(`choreographies[${index}][division]`, choreo.division);
      formData.append(
        `choreographies[${index}][subdivision]`,
        choreo.subdivision
      );
      formData.append(`choreographies[${index}][modality]`, choreo.modality);
      formData.append(`choreographies[${index}][musicName]`, choreo.musicName);
      formData.append(
        `choreographies[${index}][choreographer]`,
        choreo.choreographer
      );
      formData.append(
        `choreographies[${index}][styleDetails]`,
        choreo.styleDetails ?? ""
      );

      if (choreo.additionalInfo) {
        formData.append(
          `choreographies[${index}][additionalInfo]`,
          choreo.additionalInfo
        );
      }
    });

    const response = await fetch(`${API_BASE_URL}/registrations`, {
      method: "POST",
      body: formData,
      // No establecer Content-Type, el navegador lo hará automáticamente con boundary
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al registrar");
    }

    return result.data;
  }

  /**
   * Validar disponibilidad de cupo en una categoría/división
   */
  async checkAvailability(
    categoryId: string,
    divisionId: string
  ): Promise<{ available: boolean; remainingSlots: number }> {
    const response = await this.request<{
      available: boolean;
      remainingSlots: number;
    }>(`/availability?category=${categoryId}&division=${divisionId}`);

    return response.data || { available: false, remainingSlots: 0 };
  }
}

// Singleton
export const choreographyApi = new ChoreographyApiService();

/**
 * Mock data para desarrollo (eliminar en producción)
 */
export const MOCK_CATEGORIES: Category[] = [
  { id: "cat-01", name: "Ballet", description: "Danza clásica" },
  { id: "cat-02", name: "Jazz", description: "Jazz contemporáneo" },
  { id: "cat-03", name: "Hip Hop", description: "Urbano" },
  { id: "cat-04", name: "Contemporáneo", description: "Danza moderna" },
];

export const MOCK_DIVISIONS: Record<string, Division[]> = {
  "cat-01": [
    {
      id: "div-01",
      categoryId: "cat-01",
      name: "Infantil",
      minAge: 6,
      maxAge: 10,
    },
    {
      id: "div-02",
      categoryId: "cat-01",
      name: "Junior",
      minAge: 11,
      maxAge: 14,
    },
    {
      id: "div-03",
      categoryId: "cat-01",
      name: "Senior",
      minAge: 15,
      maxAge: 99,
    },
  ],
  "cat-02": [
    {
      id: "div-04",
      categoryId: "cat-02",
      name: "Infantil",
      minAge: 6,
      maxAge: 10,
    },
    {
      id: "div-05",
      categoryId: "cat-02",
      name: "Junior",
      minAge: 11,
      maxAge: 14,
    },
  ],
};

export const MOCK_SUBDIVISIONS: Record<string, Subdivision[]> = {
  "div-01": [
    {
      id: "sub-01",
      divisionId: "div-01",
      name: "Principiante",
      level: "beginner",
    },
    {
      id: "sub-02",
      divisionId: "div-01",
      name: "Intermedio",
      level: "intermediate",
    },
  ],
  "div-02": [
    {
      id: "sub-03",
      divisionId: "div-02",
      name: "Intermedio",
      level: "intermediate",
    },
    { id: "sub-04", divisionId: "div-02", name: "Avanzado", level: "advanced" },
  ],
};
// 🔽 Categorías
export const CATEGORY_OPTIONS = [
  { value: "general", name: "General" },
  { value: "colegios", name: "Colegios o Universidad" },
];

// 🔽 Divisiones por categoría
export const DIVISION_OPTIONS = {
  general: [
    { value: "pre-infantil", name: "Pre-infantil" },
    { value: "infantil", name: "Infantil" },
    { value: "juvenil", name: "Juvenil" },
    { value: "mayores", name: "Mayores" },
  ],
  colegios: [
    { value: "pre-infantil", name: "Pre-infantil" },
    { value: "infantil", name: "Infantil" },
    { value: "juvenil", name: "Juvenil" },
  ],
};

export const SUBDIVISION_OPTIONS = [
  { value: "solo", name: "Solo" },
  { value: "duo", name: "Dúo" },
  { value: "trio", name: "Trío" },
  { value: "grupo-pequeno", name: "Grupo pequeño" },
  { value: "grupo-grande", name: "Grupo grande" },
];

export const MODALITIES = [
  { value: "Ballet Clásico", name: "Ballet Clásico" },
  {
    value: "Danza Moderna y Contemporánea",
    name: "Danza Moderna y Contemporánea",
  },
  { value: "Jazz", name: "Jazz" },
  { value: "Musical", name: "Musical" },
  { value: "Tap Dance", name: "Tap Dance" },
  { value: "Street Dance", name: "Street Dance" },
  {
    value: "Bailes Tropicales y Salón  (Amateur)",
    name: "Bailes Tropicales y Salón (Amateur)",
  },
  {
    value: "Bailes Tropicales y Salón  (Profesional)",
    name: "Bailes Tropicales y Salón (Profesional)",
  },
  { value: "Folk de Raíz", name: "Folklore de Raíz" },
  { value: "Modalidad Libre", name: "Modalidad Libre" },
  {
    value: "Folk Nacional e Internacinal",
    name: "Folklore Nacional e Internacinal",
  },
  {
    value: "Folk Nacional e Internacinal de Proyección",
    name: "Folklore Nacional e Internacinal de Proyección",
  },
  { value: "Danzas populares", name: "Danzas populares" },
  { value: "K Pop", name: "K Pop" },
  { value: "Retro Dance", name: "Retro Dance" },
  { value: "Cosplay", name: "Cosplay" },
];
