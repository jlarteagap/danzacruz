// types/registration.ts

export interface Choreography {
  id: string;
  name: string;
}

export interface FinalizarRegistroMultipleProps {
  participantId: string;
  participantName: string;
  choreographies: Choreography[];
  totalCoreografias: number;
  registrados: number;
  shareLink?: string;
  onVerCoreografias?: () => void;
  onAgregarIntegrantes?: () => void;
}

export interface PageSearchParams {
  participantId?: string;
  participantName?: string;
  choreographyIds?: string;
  choreographyNames?: string;
  totalCoreografias?: string;
  registrados?: string;
}
