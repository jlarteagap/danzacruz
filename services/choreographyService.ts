// services/choreographyService.ts
import { apiGet, apiDelete } from "@/lib/api";
import { Choreography } from "@/types/userPanel.types";

export class ChoreographyService {
  static async fetchChoreographies(userId: string): Promise<Choreography[]> {
    try {
      const data = await apiGet("choreographies", userId);
      return data || [];
    } catch (error) {
      console.error("Error fetching choreographies:", error);
      throw new Error("No se pudieron cargar las coreografías");
    }
  }

  static async deleteChoreography(choreographyId: string): Promise<void> {
    try {
      await apiDelete("choreographies", choreographyId);
    } catch (error) {
      console.error("Error deleting choreography:", error);
      throw new Error("No se pudo eliminar la coreografía");
    }
  }

  static getChoreographiesByParticipant(
    participantId: string,
    choreographies: Choreography[]
  ): Choreography[] {
    return choreographies.filter(
      (choreography) => choreography.participantId === participantId
    );
  }

  static getChoreographiesStats(choreographies: Choreography[]) {
    const active = choreographies.filter((c) => c.status).length;
    const inactive = choreographies.filter((c) => !c.status).length;

    return {
      total: choreographies.length,
      active,
      inactive,
    };
  }
}
