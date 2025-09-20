// services/participantService.ts
import { apiGet, apiDelete } from "@/lib/api";
import { Choreography, Participant } from "@/types/userPanel.types";

export class ParticipantService {
  static async fetchParticipants(userId: string): Promise<Participant[]> {
    try {
      const data = await apiGet("participants", userId);
      return data || [];
    } catch (error) {
      console.error("Error fetching participants:", error);
      throw new Error("No se pudieron cargar los participantes");
    }
  }

  static async deleteParticipant(participantId: string): Promise<void> {
    try {
      await apiDelete("participants", participantId);
    } catch (error) {
      console.error("Error deleting participant:", error);
      throw new Error("No se pudo eliminar el participante");
    }
  }

  static canDeleteParticipant(
    participantId: string,
    choreographies: Choreography[]
  ): boolean {
    return !choreographies.some(
      (choreography) => choreography.participantId === participantId
    );
  }

  static getParticipantWithChoreographies(
    participantId: string,
    choreographies: Choreography[]
  ): { hasChoreographies: boolean; choreographiesCount: number } {
    const participantChoreographies = choreographies.filter(
      (choreography) => choreography.participantId === participantId
    );

    return {
      hasChoreographies: participantChoreographies.length > 0,
      choreographiesCount: participantChoreographies.length,
    };
  }
}
