"use client";

import { useState, useEffect } from "react";
import ChoreographyCard from "./ChoreographyCard";
import { Choreography } from "../types";
import { apiGet, apiDelete } from "@/lib/api";
// import ChoreographyForm from "./ChoreographyForm";

// Shadcn Modal
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ChoreographiesList = ({ user }) => {
  const [choreographies, setChoreographies] = useState<Choreography[]>([]);
  const [editingChoreography, setEditingChoreography] =
    useState<Choreography | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchChoreographies();
  }, []);

  const fetchChoreographies = async () => {
    try {
      const data = await apiGet("choreographies");
      setChoreographies(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (c: Choreography) => {
    setEditingChoreography(c);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Deseas eliminar esta coreografía?")) return;
    try {
      await apiDelete("choreographies", id);
      setChoreographies(choreographies.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = () => {
    setEditingChoreography(null);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingChoreography(null);
    setOpen(false);
    fetchChoreographies();
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            onClick={handleAdd}
            className='mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
          >
            + Agregar Coreografía
          </button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>
              {editingChoreography
                ? "Editar Coreografía"
                : "Agregar Coreografía"}
            </DialogTitle>
          </DialogHeader>
          {/* <ChoreographyForm
            choreography={editingChoreography}
            onClose={handleClose}
          /> */}
        </DialogContent>
      </Dialog>

      {choreographies.length === 0 && (
        <p className='text-gray-400 text-center py-20'>No hay coreografías.</p>
      )}

      {choreographies.map((c) => (
        <ChoreographyCard
          key={c.id}
          choreography={c}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ChoreographiesList;
