"use client";
import React from "react";
import { useJurados } from "@/hooks/useJudges";
import { useJudgeForm } from "@/hooks/useJudgesForm";
import { PanelJudgesHeader } from "@/components/Judges/PanelJudgesHeader";
import { PanelJudgeList } from "@/components/Judges/PanelJudgesList";
// import { PanelJudgeForm } from "@/components/Judges/PanelJudgeForm";
import { PanelJudgeForm } from "@/components/form/JudgeForm";
("@/components/Judges/PanelJudgesHeader");
export default function Jurados() {
  const { jurados, addJurado, updateJurado, deleteJurado, toggleJuradoStatus } =
    useJurados();
  const {
    formData,
    editingJudge,
    isDialogOpen,
    setIsDialogOpen,
    handleInputChange,
    openEditMode,
    openCreateMode,
    resetForm,
    validateForm,
  } = useJudgeForm();

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingJudge) {
      updateJurado(editingJudge.id, formData);
    } else {
      addJurado(formData);
    }

    resetForm();
  };

  const handleCloseDialog = () => {
    resetForm();
    setIsDialogOpen(false);
  };
  return (
    <section className='max-w-7xl mx-auto p-6 space-y-8'>
      <PanelJudgesHeader onAddClick={openCreateMode} />

      <PanelJudgeList
        judges={jurados}
        onEdit={openEditMode}
        onDelete={deleteJurado}
        onToggleStatus={toggleJuradoStatus}
        onAddClick={openCreateMode}
      />

      <PanelJudgeForm
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        editingJudge={editingJudge}
        // onInputChange={handleInputChange}
        // onSubmit={handleSubmit}
        // isValid={validateForm()}
      />
    </section>
  );
}
