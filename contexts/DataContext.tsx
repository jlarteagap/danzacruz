// contexts/DataContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  DataContextType,
  Participant,
  Choreography,
} from "@/types/userPanel.types";
import { ParticipantService } from "@/services/participantService";
import { ChoreographyService } from "@/services/choreographyService";
import { toast } from "sonner";

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: React.ReactNode;
  userId: string;
}

export const DataProvider: React.FC<DataProviderProps> = ({
  children,
  userId,
}) => {
  // State
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [choreographies, setChoreographies] = useState<Choreography[]>([]);
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);
  const [isLoadingChoreographies, setIsLoadingChoreographies] = useState(false);

  // Fetch Participants
  const fetchParticipants = useCallback(async () => {
    if (!userId) return;

    setIsLoadingParticipants(true);
    try {
      const data = await ParticipantService.fetchParticipants(userId);
      console.log("Fetched participants:", data);
      setParticipants(data);
    } catch (error) {
      console.error("Error loading participants:", error);
      toast.error("Error al cargar los participantes");
    } finally {
      setIsLoadingParticipants(false);
    }
  }, [userId]);

  // Fetch Choreographies
  const fetchChoreographies = useCallback(async () => {
    if (!userId) return;

    setIsLoadingChoreographies(true);
    try {
      const data = await ChoreographyService.fetchChoreographies(userId);
      setChoreographies(data);
    } catch (error) {
      console.error("Error loading choreographies:", error);
      toast.error("Error al cargar las coreografías");
    } finally {
      setIsLoadingChoreographies(false);
    }
  }, [userId]);

  // Delete Participant with validation
  const deleteParticipant = useCallback(
    async (participantId: string): Promise<boolean> => {
      try {
        // Validate if participant can be deleted
        if (
          !ParticipantService.canDeleteParticipant(
            participantId,
            choreographies
          )
        ) {
          toast.error(
            "No se puede eliminar este participante porque tiene coreografías asignadas"
          );
          return false;
        }

        // Show confirmation
        if (!window.confirm("¿Deseas eliminar este participante?")) {
          return false;
        }

        await ParticipantService.deleteParticipant(participantId);

        // Update local state
        setParticipants((prev) =>
          prev.filter((participant) => participant.id !== participantId)
        );

        toast.success("El participante se eliminó correctamente");
        return true;
      } catch (error) {
        console.error("Error deleting participant:", error);
        toast.error("No se pudo eliminar el participante");
        return false;
      }
    },
    [choreographies]
  );

  // Delete Choreography
  const deleteChoreography = useCallback(
    async (choreographyId: string): Promise<boolean> => {
      try {
        if (!window.confirm("¿Deseas eliminar esta coreografía?")) {
          return false;
        }

        await ChoreographyService.deleteChoreography(choreographyId);

        // Update local state
        setChoreographies((prev) =>
          prev.filter((choreography) => choreography.id !== choreographyId)
        );

        toast.success("La coreografía se eliminó correctamente");
        return true;
      } catch (error) {
        console.error("Error deleting choreography:", error);
        toast.error("No se pudo eliminar la coreografía");
        return false;
      }
    },
    []
  );

  // Utility functions
  const canDeleteParticipant = useCallback(
    (participantId: string): boolean => {
      return ParticipantService.canDeleteParticipant(
        participantId,
        choreographies
      );
    },
    [choreographies]
  );

  const getChoreographiesByParticipant = useCallback(
    (participantId: string): Choreography[] => {
      return ChoreographyService.getChoreographiesByParticipant(
        participantId,
        choreographies
      );
    },
    [choreographies]
  );

  // Refresh all data
  const refreshData = useCallback(async () => {
    await Promise.all([fetchParticipants(), fetchChoreographies()]);
  }, [fetchParticipants, fetchChoreographies]);

  const contextValue: DataContextType = {
    // Data
    participants,
    choreographies,
    isLoadingParticipants,
    isLoadingChoreographies,
    // Actions
    fetchParticipants,
    fetchChoreographies,
    deleteParticipant,
    deleteChoreography,
    canDeleteParticipant,
    getChoreographiesByParticipant,
    refreshData,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
