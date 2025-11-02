// types/registration.ts

export interface Choreography {
  id: string;
  name: string;
  shareLink?: string;
}

export interface FinalizarRegistroMultipleProps {
  participantId: string;
  participantName: string;
  choreographies: Choreography[];
  totalCoreografias: number;
  registrados: number;
}

export interface PageSearchParams {
  participantId?: string;
  participantName?: string;
  choreographyIds?: string;
  choreographyNames?: string;
  totalCoreografias?: string;
  registrados?: string;
}
