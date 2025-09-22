// ChoreographiesList.tsx
"use client";

import { useState } from "react";
import ChoreographyCard from "./ChoreographyCard";
import { Choreography } from "@/types/userPanel.types";
import ChoreographyForm from "./ChoreographyForm";
import { useChoreographies } from "@/hooks/useDataContext";
import { useDataContext } from "@/contexts/DataContext";
import LoadingSpinner from "@/components/ui/commons/LoadingSpinner";

// Shadcn Modal
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Music, Activity } from "lucide-react";

interface ChoreographiesListProps {
  user: any;
}

const ChoreographiesList = ({ user }: ChoreographiesListProps) => {
  const {
    choreographies,
    isLoadingChoreographies,
    fetchChoreographies,
    deleteChoreography,
  } = useChoreographies();

  // Necesitamos acceso a participants para obtener los nombres
  const { participants } = useDataContext();

  const [editingChoreography, setEditingChoreography] =
    useState<Choreography | null>(null);
  const [open, setOpen] = useState(false);

  // Función para obtener el nombre del participante
  const getParticipantName = (participantId: string): string => {
    const participant = participants.find((p) => p.id === participantId);
    return participant ? participant.name : "Participante no encontrado";
  };

  // Ordenar coreografías: primero las aprobadas (status: true), luego las no aprobadas
  const sortedChoreographies = [...choreographies].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status ? -1 : 1; // true primero (-1), false después (1)
  });

  // Calculate stats using original choreographies array
  const activeChoreographies = choreographies.filter((c) => c.status).length;
  const inactiveChoreographies = choreographies.length - activeChoreographies;

  const handleEdit = (choreography: Choreography) => {
    setEditingChoreography(choreography);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const success = await deleteChoreography(id);
    // No need to update local state, context handles it
    return success;
  };

  const handleAdd = () => {
    setEditingChoreography(null);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingChoreography(null);
    setOpen(false);
    // Refresh choreographies after form submission
    fetchChoreographies();
  };

  if (isLoadingChoreographies) {
    return (
      <div className='flex items-center justify-center py-20'>
        <LoadingSpinner size='large' />
        <span className='ml-2 text-gray-600'>Cargando coreografías...</span>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {/* Header with stats and Add button */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Music className='h-5 w-5 text-indigo-600' />
            <h2 className='text-xl font-semibold text-gray-900'>
              Coreografías ({choreographies.length})
            </h2>
          </div>

          {choreographies.length > 0 && (
            <div className='flex gap-4 text-sm'>
              <div className='flex items-center gap-1'>
                <Activity className='h-4 w-4 text-green-500' />
                <span className='text-green-700 font-medium'>
                  {activeChoreographies} Activas
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <Activity className='h-4 w-4 text-gray-400' />
                <span className='text-gray-600 font-medium'>
                  {inactiveChoreographies} Inactivas
                </span>
              </div>
            </div>
          )}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAdd}
              className='bg-indigo-600 hover:bg-indigo-700 text-white'
              size='sm'
            >
              <Plus className='h-4 w-4 mr-2' />
              Agregar Coreografía
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-3xl max-w-4xl bg-white'>
            <DialogHeader>
              <DialogTitle>
                {editingChoreography
                  ? "Editar Coreografía"
                  : "Agregar Coreografía"}
              </DialogTitle>
            </DialogHeader>
            <ChoreographyForm
              choreography={editingChoreography}
              onClose={handleClose}
              user={user}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Empty state */}
      {choreographies.length === 0 && (
        <div className='text-center py-20 bg-white rounded-lg border border-gray-200'>
          <Music className='mx-auto h-12 w-12 text-gray-400 mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            No hay coreografías registradas
          </h3>
          <p className='text-gray-500 mb-4'>
            Comienza creando tu primera coreografía
          </p>
          <Button
            onClick={handleAdd}
            className='bg-indigo-600 hover:bg-indigo-700 text-white'
          >
            <Plus className='h-4 w-4 mr-2' />
            Agregar Coreografía
          </Button>
        </div>
      )}

      {/* Choreographies grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-1'>
        {sortedChoreographies.map((choreography) => (
          <ChoreographyCard
            key={choreography.id}
            choreography={choreography}
            participantName={getParticipantName(choreography.participantId)}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default ChoreographiesList;
