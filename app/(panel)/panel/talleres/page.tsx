"use client";
import React from "react";
import { useWorkshops } from "@/hooks/useWorkshops";
import PanelWorkshopHeader from "@/components/Workshops/PanelWorkshopHeader";
import { PanelWorkshopForm } from "@/components/form/WorkshopForm";

export default function Talleres() {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingWorkshop, setEditingWorkshop] = React.useState(null);

  const {
    workshops,
    addWorkshop,
    updateWorkshop,
    deleteWorkshop,
    toggleWorkshopStatus,
    loadWorkshops,
    error,
    loading,
  } = useWorkshops();

  const handleOpenCreateMode = () => {
    setEditingWorkshop(null);
    setIsFormOpen(true);
  };
  const handleOpenEditMode = (workshop) => {
    setEditingWorkshop(workshop);
    setIsFormOpen(true);
  };
  const handleFormSuccess = async (workshop) => {
    if (editingWorkshop) {
      // Actualizar taller existente
      // updateWorkshop(editingWorkshop.id, workshop);
    } else {
      // Agregar nuevo taller
      // addWorkshop(workshop);
    }

    // Recargar datos desde Firebase después de agregar/actualizar
    // await loadWorkshops();

    // Cerrar el formulario
    setIsFormOpen(false);
    setEditingWorkshop(null);
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingWorkshop(null);
  };
  const handleDelete = async (id) => {};
  const handleToggleStatus = async (id) => {};

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
            onClick={loadWorkshops}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <PanelWorkshopHeader onOpen={handleOpenCreateMode} />
      <PanelWorkshopForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        editingWorkshop={editingWorkshop}
        onSuccess={handleFormSuccess}
      />
    </>
  );
}
