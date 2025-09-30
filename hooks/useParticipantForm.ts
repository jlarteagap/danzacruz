"use client";

import { useState } from "react";
import * as Yup from "yup";
import { apiSave, apiUpdate } from "@/lib/api";
import { Participant } from "@/types/userPanel.types";

export const useParticipantForm = (
  userId: string,
  participant?: Participant | null
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(participant?.category || "General");

  // Initial values que se actualizan con el participante a editar
  const initialValues = {
    name: participant?.name || "",
    category: participant?.category || "General",
    division: participant?.division || "",
    subDivision: participant?.subDivision || "Grupo pequeño",
  };

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Mínimo 2 caracteres")
      .required("Introduzca un nombre del participante o grupo"),
    category: Yup.string().required("Seleccione una categoría"),
    division: Yup.string().required("Seleccione una división"),
    subDivision: Yup.string().required("Seleccione una subdivisión"),
  });

  const handleSubmit = async (
    values: any,
    { resetForm, setSubmitting, setStatus }: any,
    user: any,
    onClose: () => void
  ) => {
    try {
      setIsLoading(true);
      setSubmitting(true);
      setStatus(null);

      const payload = {
        ...values,
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (participant?.id) {
        // Editando participante existente
        await apiUpdate("participants", participant.id, payload);
      } else {
        // Creando nuevo participante
        await apiSave("participants", payload);
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al guardar participante:", error);
      setStatus({
        type: "error",
        message: "Error al guardar el participante. Intente nuevamente.",
      });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    isLoading,
    category,
    setCategory,
  };
};
