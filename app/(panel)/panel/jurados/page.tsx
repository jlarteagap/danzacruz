"use client";
import React, { useState } from "react";
import { useJurados } from "@/hooks/useJudges";
import { PanelJudgesHeader } from "@/components/Judges/PanelJudgesHeader";
import { PanelJudgeList } from "@/components/Judges/PanelJudgesList";
import { Judge } from "@/types/judges.types";

import { PanelJudgeForm } from "@/components/form/JudgeForm";
("@/components/Judges/PanelJudgesHeader");

export default function Jurados() {
  const { jurados, addJurado, updateJurado, deleteJurado, toggleJuradoStatus } =
    useJurados();

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
  const handleFormSuccess = (judge: Judge) => {
    if (editingJudge) {
      // Actualizar jurado existente
      updateJurado(editingJudge.id, judge);
    } else {
      // Agregar nuevo jurado
      addJurado(judge);
    }

    // Cerrar el formulario
    setIsFormOpen(false);
    setEditingJudge(null);
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingJudge(null);
  };

  return (
    <section className='max-w-7xl mx-auto p-6 space-y-8'>
      <PanelJudgesHeader onAddClick={handleOpenCreateMode} />

      <PanelJudgeList
        judges={jurados}
        onEdit={handleOpenEditMode}
        onDelete={deleteJurado}
        onToggleStatus={toggleJuradoStatus}
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
