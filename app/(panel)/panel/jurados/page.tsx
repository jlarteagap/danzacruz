"use client";
import React, { useState } from "react";
import { useJurados } from "@/hooks/useJudges";
import { PanelJudgesHeader } from "@/components/Judges/PanelJudgesHeader";
import { PanelJudgeList } from "@/components/Judges/PanelJudgesList";
import { Judge } from "@/types/judges.types";

import { PanelJudgeForm } from "@/components/form/JudgeForm";
("@/components/Judges/PanelJudgesHeader");

export default function Jurados() {
  const {
    jurados,
    addJurado,
    updateJurado,
    deleteJurado,
    toggleJuradoStatus,
    loadJudges,
    error,
    loading,
  } = useJurados();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJudge, setEditingJudge] = useState<Judge | null>(null);

  const handleOpenCreateMode = () => {
    setEditingJudge(null);
    setIsFormOpen(true);
  };
  const handleOpenEditMode = (judge: Judge) => {
    setEditingJudge(judge);
    setIsFormOpen(true);
  };
  const handleFormSuccess = async (judge: Judge) => {
    if (editingJudge) {
      // Actualizar jurado existente
      updateJurado(editingJudge.id, judge);
    } else {
      // Agregar nuevo jurado
      addJurado(judge);
    }

    await loadJudges();

    // Cerrar el formulario
    setIsFormOpen(false);
    setEditingJudge(null);
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingJudge(null);
  };

  const handleDelete = async (id: string) => {
    deleteJurado(id);
    // Recargar datos desde Firebase después de eliminar
    await loadJudges();
  };
  const handleToggleStatus = async (id: string) => {
    toggleJuradoStatus(id);
    // Recargar datos desde Firebase después de cambiar status
    await loadJudges();
  };

  if (loading) {
    return (
      <section className='max-w-7xl mx-auto p-6 space-y-8'>
        <div className='flex justify-center items-center min-h-[400px]'>
          <div className='text-lg'>Cargando jurados...</div>
        </div>
      </section>
    );
  }

  // Mostrar error si falla la carga
  if (error) {
    return (
      <section className='max-w-7xl mx-auto p-6 space-y-8'>
        <div className='flex flex-col justify-center items-center min-h-[400px] space-y-4'>
          <div className='text-red-500 text-lg'>Error: {error}</div>
          <button
            onClick={loadJudges}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }
  return (
    <section className='max-w-7xl mx-auto p-6 space-y-8'>
      <PanelJudgesHeader onAddClick={handleOpenCreateMode} />

      <PanelJudgeList
        judges={jurados}
        onEdit={handleOpenEditMode}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onAddClick={handleOpenCreateMode}
      />

      <PanelJudgeForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        editingJudge={editingJudge}
        onSuccess={handleFormSuccess}
      />
    </section>
  );
}
