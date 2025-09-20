// ParticipantsList.tsx
"use client";

import { useState } from "react";
import ParticipantCard from "./ParticipantCard";
import { Participant } from "@/types/userPanel.types";
import ParticipantForm from "./ParticipantForm";
import { useParticipants } from "@/hooks/useDataContext";
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
import { Plus, Users } from "lucide-react";

interface ParticipantsListProps {
  user: any;
}

const ParticipantsList = ({ user }: ParticipantsListProps) => {
  const {
    participants,
    isLoadingParticipants,
    fetchParticipants,
    deleteParticipant,
    canDeleteParticipant,
  } = useParticipants();

  const [editingParticipant, setEditingParticipant] =
    useState<Participant | null>(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (participant: Participant) => {
    setEditingParticipant(participant);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const success = await deleteParticipant(id);
    // No need to update local state, context handles it
    return success;
  };

  const handleAdd = () => {
    setEditingParticipant(null);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingParticipant(null);
    setOpen(false);
    // Refresh participants after form submission
    fetchParticipants();
  };

  if (isLoadingParticipants) {
    return (
      <div className='flex items-center justify-center py-20'>
        <LoadingSpinner size='large' />
        <span className='ml-2 text-gray-600'>Cargando participantes...</span>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {/* Header with Add button */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Users className='h-5 w-5 text-blue-600' />
          <h2 className='text-xl font-semibold text-gray-900'>
            Participantes ({participants.length})
          </h2>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAdd}
              className='bg-green-600 hover:bg-green-700 text-white'
              size='sm'
            >
              <Plus className='h-4 w-4 mr-2' />
              Agregar Participante
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-lg'>
            <DialogHeader>
              <DialogTitle>
                {editingParticipant
                  ? "Editar Participante"
                  : "Agregar Participante"}
              </DialogTitle>
            </DialogHeader>
            <ParticipantForm
              participant={editingParticipant}
              onClose={handleClose}
              user={user}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Empty state */}
      {participants.length === 0 && (
        <div className='text-center py-20 bg-white rounded-lg border border-gray-200'>
          <Users className='mx-auto h-12 w-12 text-gray-400 mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            No hay participantes registrados
          </h3>
          <p className='text-gray-500 mb-4'>
            Comienza agregando tu primer participante
          </p>
          <Button
            onClick={handleAdd}
            className='bg-green-600 hover:bg-green-700 text-white'
          >
            <Plus className='h-4 w-4 mr-2' />
            Agregar Participante
          </Button>
        </div>
      )}

      {/* Participants grid */}

      {participants.map((participant) => (
        <ParticipantCard
          key={participant.id}
          participant={participant}
          onDelete={handleDelete}
          onEdit={handleEdit}
          canDelete={canDeleteParticipant(participant.id)}
        />
      ))}
    </div>
  );
};

export default ParticipantsList;
