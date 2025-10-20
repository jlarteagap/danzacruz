import {
  Choreography,
  ChoreographiesStats,
  ChoreographyUpdateDTO,
} from "@/types/userPanel.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class ChoreographiesService {
  private baseUrl = `${API_BASE_URL}/choreographies`;

  // ✅ Obtener todas las coreografías
  async fetchAll(): Promise<Choreography[]> {
    const response = await fetch(this.baseUrl, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al cargar coreografías: ${response.statusText}`);
    }

    return response.json();
  }

  // ✅ Obtener una coreografía por ID
  async fetchById(id: string): Promise<Choreography> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error al cargar coreografía: ${response.statusText}`);
    }

    return response.json();
  }

  // ✅ Actualizar una coreografía existente
  async update(id: string, data: ChoreographyUpdateDTO): Promise<Choreography> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Error al actualizar coreografía: ${response.statusText}`
      );
    }

    return response.json();
  }

  // ✅ Eliminar una coreografía
  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar coreografía: ${response.statusText}`);
    }
  }

  // ✅ Obtener estadísticas de coreografías (opcional)
  async fetchStats(): Promise<ChoreographiesStats> {
    const response = await fetch(`${this.baseUrl}/stats`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Error al cargar estadísticas de coreografías: ${response.statusText}`
      );
    }

    return response.json();
  }
}

export const choreographiesService = new ChoreographiesService();
