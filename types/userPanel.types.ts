export interface Participant {
  id: string;
  name: string;
  category: string;
  division: string;
  subDivision?: string;
  userId: string;
  year: number;
  image?: string;
  status?: "active" | "inactive";
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParticipantsFilters {
  search: string;
  category: string[];
  division: string[];
  year: number[];
  status: string[];
}

export interface ParticipantsStats {
  total: number;
  active: number;
  inactive: number;
  byCategory: Record<string, number>;
  byDivision: Record<string, number>;
}

export interface ParticipantUpdateDTO {
  name?: string;
  category?: string;
  division?: string;
  subDivision?: string;
  status?: "active" | "inactive";
  year?: number;
}

export interface BulkActionPayload {
  participantIds: string[];
  action: "activate" | "deactivate" | "delete";
}

export interface Choreography {
  id: string;
  name: string;
  modality: string;
  teacher: string;
  music: string;
  notes?: string;
  clarification?: string;
  extra?: string;
  participantId: string;
  userId: any;
  year: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DataContextType {
  // Participants
  participants: Participant[];
  isLoadingParticipants: boolean;
  // Choreographies
  choreographies: Choreography[];
  isLoadingChoreographies: boolean;
  // Actions
  fetchParticipants: () => Promise<void>;
  fetchChoreographies: () => Promise<void>;
  deleteParticipant: (id: string) => Promise<boolean>;
  deleteChoreography: (id: string) => Promise<boolean>;
  canDeleteParticipant: (participantId: string) => boolean;
  getChoreographiesByParticipant: (participantId: string) => Choreography[];
  refreshData: () => Promise<void>;
}
