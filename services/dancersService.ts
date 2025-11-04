// services/dancersService.ts
import { choreographyService } from "@/services/choreographiesService";

export interface DancerPayload {
  fullName: string;
  document: string; // CI o telefono
}

export interface Dancer extends DancerPayload {
  id?: string; // generado por backend
  createdAt?: string;
}

export interface ChoreographyWithRegistration {
  registrationId: string;
  choreography: any; // usa el tipo real si lo tienes
}

/**
 * Buscar la coreografía y su registration padre a partir del choreographyId.
 * Usa choreographyService.fetchAll() (legacy) que aplana registrations -> coreografías.
 */
export async function findChoreographyWithRegistrationById(
  choreographyId: string
): Promise<ChoreographyWithRegistration | null> {
  const flat = await choreographyService.fetchAll(); // devuelve array aplanado con registrationId
  const found = flat.find((item: any) => item.id === choreographyId);

  if (!found) return null;

  return {
    registrationId: found.registrationId,
    choreography: found,
  };
}

/**
 * Obtener lista de bailarines para una coreografía específica.
 * Retorna el objeto choreography completo (incluyendo campo dancers si existe).
 */
export async function getDancersByChoreography(
  choreographyId: string
): Promise<{ registrationId: string; choreography: any; dancers: Dancer[] }> {
  const found = await findChoreographyWithRegistrationById(choreographyId);

  if (!found) {
    throw new Error(`Coreografía ${choreographyId} no encontrada`);
  }

  const { registrationId } = found;
  // Obtener el registro completo para leer la coreografía actualizada
  const registration = await choreographyService.getById(registrationId);

  const choreography = registration.choreographies.find(
    (c) => c.id === choreographyId
  );

  if (!choreography) {
    throw new Error("Coreografía no encontrada dentro del registro");
  }

  // Normalizar dancers array
  const dancers: Dancer[] = choreography.dancers ?? [];

  return { registrationId, choreography, dancers };
}

/**
 * Agregar dancer a la coreografía.
 * - Busca registration padre
 * - Inserta el dancer en choreography.dancers (backend genera id)
 * - Actualiza el registration completo con choreographyService.updateRegistration
 * - Retorna la choreography actualizada (o su array de dancers)
 */
export async function addDancerToChoreography(
  choreographyId: string,
  payload: DancerPayload
): Promise<{ registrationId: string; choreography: any; dancers: Dancer[] }> {
  // Encontrar registro padre y coreografía actual
  const found = await findChoreographyWithRegistrationById(choreographyId);

  if (!found) {
    throw new Error(`Coreografía ${choreographyId} no encontrada`);
  }

  const { registrationId } = found;

  // Obtener registro completo
  const registration = await choreographyService.getById(registrationId);

  // Mapear coreografías y agregar dancers en la coreografía objetivo
  const updatedChoreographies = registration.choreographies.map((c) =>
    c.id === choreographyId
      ? {
          ...c,
          dancers: [
            ...(c.dancers ?? []),
            {
              // no enviamos id (backend lo generará)
              fullName: payload.fullName,
              document: payload.document,
              createdAt: new Date().toISOString(), // ayuda a match en cliente
            },
          ],
        }
      : c
  );

  // Enviar PATCH al backend (updateRegistration)
  const updatedRegistration = await choreographyService.updateRegistration(
    registrationId,
    { choreographies: updatedChoreographies }
  );

  // Buscar la coreografía actualizada
  const updatedChoreography = updatedRegistration.choreographies.find(
    (c) => c.id === choreographyId
  );

  if (!updatedChoreography) {
    throw new Error("Coreografía no encontrada tras actualizar registro");
  }

  return {
    registrationId,
    choreography: updatedChoreography,
    dancers: updatedChoreography.dancers ?? [],
  };
}
