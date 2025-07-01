import { useState } from "react";
import { Judge, JudgesFormData } from "../types/judges.types";

const INITIAL_FORM_DATA: JudgesFormData = {
  nombre: "",
  apellido: "",
  nacionalidad: "",
  trayectoria: "",
  fotoPerfil: "",
};

export const useJudgeForm = () => {
  const [formData, setFormData] = useState<JudgesFormData>(INITIAL_FORM_DATA);
  const [editingJudge, setEditingJudge] = useState<Judge | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (name: string, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openEditMode = (judge: Judge): void => {
    setEditingJudge(judge);
    setFormData({
      nombre: judge.nombre,
      apellido: judge.apellido,
      nacionalidad: judge.nacionalidad,
      trayectoria: judge.trayectoria,
      fotoPerfil: judge.fotoPerfil,
    });
    setIsDialogOpen(true);
  };

  const openCreateMode = (): void => {
    setEditingJudge(null);
    setFormData(INITIAL_FORM_DATA);
    setIsDialogOpen(true);
  };

  const resetForm = (): void => {
    setFormData(INITIAL_FORM_DATA);
    setEditingJudge(null);
    setIsDialogOpen(false);
  };

  const validateForm = (): boolean => {
    return !!(
      formData.nombre &&
      formData.apellido &&
      formData.nacionalidad &&
      formData.trayectoria
    );
  };

  return {
    formData,
    editingJudge,
    isDialogOpen,
    setIsDialogOpen,
    handleInputChange,
    openEditMode,
    openCreateMode,
    resetForm,
    validateForm,
  };
};
