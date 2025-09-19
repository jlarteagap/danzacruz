export interface Participant {
  id: string;
  name: string;
  category: string;
  division: string;
  subDivision?: string;
  userId: any;
  year: number;
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
}
