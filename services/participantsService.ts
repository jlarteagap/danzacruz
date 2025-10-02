//services/participantsService.ts
import {
  Participant,
  ParticipantsStats,
  ParticipantUpdateDTO,
  BulkActionPayload,
} from "@/types/userPanel.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class ParticipantsService {
  private baseUrl = `${API_BASE_URL}/participants`;

  async fetchAll(): Promise<Participant[]> {
    const response = await fetch(this.baseUrl, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al cargar participantes: ${response.statusText}`);
    }

    return response.json();
  }

  async fetchById(id: string): Promise<Participant> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error al cargar participante: ${response.statusText}`);
    }

    return response.json();
  }

  async update(id: string, data: ParticipantUpdateDTO): Promise<Participant> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Error al actualizar participante: ${response.statusText}`
      );
    }

    return response.json();
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar participante: ${response.statusText}`);
    }
  }

  async bulkAction(payload: BulkActionPayload): Promise<void> {
    const response = await fetch(`${this.baseUrl}/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error en acción masiva: ${response.statusText}`);
    }
  }

  async fetchStats(): Promise<ParticipantsStats> {
    const response = await fetch(`${this.baseUrl}/stats`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error al cargar estadísticas: ${response.statusText}`);
    }

    return response.json();
  }
}

export const participantsService = new ParticipantsService();
