import type { Registration } from "@/services/choreographiesService";
export type { Registration };
export interface FlattenedChoreography {
  // Participant Info
  participantId: string;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  participantCity: string;
  participantCountry: string;

  // Choreography Info
  choreographyId: string;
  choreographyName: string;
  category: string;
  division: string;
  subdivision: string;
  modality: string;
  musicName: string;
  choreographer: string;
  styleDetails: string;
  additionalInfo: string | null;

  dancers?: Array<{
    fullName: string;
    document: string;
  }>;
}
export interface ChoreographyFilters {
  category: string[];
  division: string[];
  modality: string[];
}
export interface ChoreographyStats {
  totalParticipants: number;
  totalChoreographies: number;
  categoriesCount: Record<string, number>;
  divisionsCount: Record<string, number>;
  modalitiesCount: Record<string, number>;
  topCategory: string;
  topDivision: string;
  topModality: string;
}

export interface ChoreographyEditFormValues {
  choreographyName: string;
  category: string;
  division: string;
  subdivision: string;
  modality: string;
  musicName: string;
  choreographer: string;
  styleDetails: string;
  additionalInfo?: string;
}
