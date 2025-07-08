import { JudgesFormData, Judge } from "@/types/judges.types";

class JudgeService {
  async createJudge(data: JudgesFormData): Promise<Judge> {
    // Implementa tu lógica de creación
    const response = await fetch("/api/judges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al crear el jurado");
    }

    return response.json();
  }

  async updateJudge(id: string, data: JudgesFormData): Promise<Judge> {
    // Implementa tu lógica de actualización
    const response = await fetch(`/api/judges/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el jurado");
    }

    return response.json();
  }
}

export const judgeService = new JudgeService();
