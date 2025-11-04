import type {
  Registration,
  FlattenedChoreography,
  ChoreographyStats,
} from "../_types";

/**
 * Transforma la estructura anidada de registrations a un array plano
 * Cada coreografía se convierte en una fila independiente con datos del participante
 */

export const flattenChoreographies = (
  registrations: Registration[]
): FlattenedChoreography[] => {
  return registrations.flatMap((registration) =>
    registration.choreographies.map((choreography) => ({
      // Participant data
      participantId: registration.id,
      participantName: registration.participantName,
      participantEmail: registration.participantEmail,
      participantPhone: registration.participantPhone,
      participantCity: registration.participantCity,
      participantCountry: registration.participantCountry,

      // Choreography data
      choreographyId: choreography.id,
      choreographyName: choreography.choreographyName,
      category: choreography.category,
      division: choreography.division,
      subdivision: choreography.subdivision,
      modality: choreography.modality,
      musicName: choreography.musicName,
      choreographer: choreography.choreographer,
      styleDetails: choreography.styleDetails,
      additionalInfo: choreography.additionalInfo,

      //dancers

      dancers: choreography.dancers ?? [],
    }))
  );
};

/**
 * Obtiene valores únicos para los filtros
 */
export const getUniqueFilterValues = (
  choreographies: FlattenedChoreography[]
) => {
  const categories = Array.from(
    new Set(choreographies.map((c) => c.category))
  ).sort();

  const divisions = Array.from(
    new Set(choreographies.map((c) => c.division))
  ).sort();

  const modalities = Array.from(
    new Set(choreographies.map((c) => c.modality))
  ).sort();

  return { categories, divisions, modalities };
};

/**
 * Calcula estadísticas de las coreografías
 */
export const calculateStats = (
  choreographies: FlattenedChoreography[]
): ChoreographyStats => {
  const uniqueParticipants = new Set(
    choreographies.map((c) => c.participantId)
  );

  // Conteo por categoría
  const categoriesCount = choreographies.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Conteo por división
  const divisionsCount = choreographies.reduce((acc, c) => {
    acc[c.division] = (acc[c.division] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Conteo por modalidad
  const modalitiesCount = choreographies.reduce((acc, c) => {
    acc[c.modality] = (acc[c.modality] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Encontrar los más populares
  const topCategory =
    Object.entries(categoriesCount).sort(([, a], [, b]) => b - a)[0]?.[0] ||
    "N/A";

  const topDivision =
    Object.entries(divisionsCount).sort(([, a], [, b]) => b - a)[0]?.[0] ||
    "N/A";

  const topModality =
    Object.entries(modalitiesCount).sort(([, a], [, b]) => b - a)[0]?.[0] ||
    "N/A";

  return {
    totalParticipants: uniqueParticipants.size,
    totalChoreographies: choreographies.length,
    categoriesCount,
    divisionsCount,
    modalitiesCount,
    topCategory,
    topDivision,
    topModality,
  };
};
