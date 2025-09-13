export interface Participant {
  id: string;
  name: string;
  choreography: string;
  category: string;
  division: string;
  subDivision?: string;
  modality: string;
  teacher: string;
  music: string;
  notes?: string;
  userId: any;
  year: number;
}

export interface Choreography {
  id: string;
  name: string;
  category: string;
  division: string;
  modality: string;
  teacher: string;
  music: string;
  notes?: string;
}
