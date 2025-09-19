"use client";

import { useState, useEffect } from "react";
import ParticipantCard from "./ParticipantCard";
import { Participant } from "../types";
import { apiGet, apiDelete } from "@/lib/api";
import ParticipantForm from "./ParticipantForm";

// Shadcn Modal
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const ParticipantsList = ({ user }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [editingParticipant, setEditingParticipant] =
    useState<Participant | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const data = await apiGet("participants", user.id);
      setParticipants(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (p: Participant) => {
    setEditingParticipant(p);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Deseas eliminar este participante?")) return;
    try {
      await apiDelete("participants", id);
      setParticipants(participants.filter((p) => p.id !== id));
      toast.success("El participante se eliminó correctamente");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo eliminar el participante");
    }
  };

  const handleAdd = () => {
    setEditingParticipant(null);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingParticipant(null);
    setOpen(false);
    fetchParticipants();
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            onClick={handleAdd}
            className='mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
          >
            + Agregar Participante
          </button>
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

      {participants.length === 0 && (
        <p className='text-gray-400 text-center py-20'>No hay participantes.</p>
      )}

      {participants.map((p) => (
        <ParticipantCard
          key={p.id}
          participant={p}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default ParticipantsList;
