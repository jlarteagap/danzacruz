// hooks/useDataContext.ts
"use client";

import { useEffect } from "react";
import { useDataContext } from "@/contexts/DataContext";

/**
 * Hook personalizado para manejar la carga inicial de datos
 * Sigue el principio de Single Responsibility
 */
export const useDataInitializer = (userId?: string) => {
  const context = useDataContext();
  const { refreshData } = context;

  useEffect(() => {
    if (!userId) return; // Esperar a que exista
    refreshData();
  }, [userId, refreshData]);

  return context;
};

/**
 * Hook para operaciones específicas de participantes
 * Principio de Interface Segregation - solo expone lo que necesita
 */
export const useParticipants = () => {
  const {
    participants,
    isLoadingParticipants,
    fetchParticipants,
    deleteParticipant,
    canDeleteParticipant,
  } = useDataContext();

  return {
    participants,
    isLoadingParticipants,
    fetchParticipants,
    deleteParticipant,
    canDeleteParticipant,
  };
};

/**
 * Hook para operaciones específicas de coreografías
 * Principio de Interface Segregation
 */
export const useChoreographies = () => {
  const {
    choreographies,
    isLoadingChoreographies,
    fetchChoreographies,
    deleteChoreography,
    getChoreographiesByParticipant,
  } = useDataContext();

  return {
    choreographies,
    isLoadingChoreographies,
    fetchChoreographies,
    deleteChoreography,
    getChoreographiesByParticipant,
  };
};

/**
 * Hook para estadísticas y análisis
 * Principio de Open/Closed - extendible sin modificar el contexto
 */
export const useDataAnalytics = () => {
  const { participants, choreographies } = useDataContext();

  const getParticipantStats = () => {
    const totalParticipants = participants.length;
    const participantsWithChoreographies = participants.filter((participant) =>
      choreographies.some((c) => c.participantId === participant.id)
    ).length;

    return {
      total: totalParticipants,
      withChoreographies: participantsWithChoreographies,
      withoutChoreographies: totalParticipants - participantsWithChoreographies,
    };
  };

  const getChoreographyStats = () => {
    const total = choreographies.length;
    const active = choreographies.filter((c) => c.status).length;
    const inactive = total - active;

    return { total, active, inactive };
  };

  return {
    getParticipantStats,
    getChoreographyStats,
  };
};
