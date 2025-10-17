// lib/types/choreography.types.ts

export interface Category {
  id: string;
  name: string;
}

export interface Division {
  id: string;
  categoryId: string;
  name: string;
}

export interface Subdivision {
  id: string;
  divisionId: string;
  name: string;
}

export type Modality = "solo" | "duo" | "trio" | "group" | "formation";

export interface ChoreographyData {
  id: string; // UUID temporal para el frontend
  category: string;
  division: string;
  subdivision: string;
  modality: Modality;
  musicName: string;
  musicFile?: File;
  choreographer: string;
  styleDetails: string;
  additionalInfo?: string;
}

export interface ParticipantData {
  participantName: string;
  choreographies: ChoreographyData[];
}

export interface RegistrationFormData extends ParticipantData {}

export interface RegistrationResponse {
  success: boolean;
  registrationId: string;
  message: string;
}
