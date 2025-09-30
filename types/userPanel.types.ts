export interface Participant {
  id: string;
  name: string;
  category: string;
  division: string;
  subDivision?: string;
  userId: any;
  year: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
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
