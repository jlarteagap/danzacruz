"use client";

import { useState } from "react";
import * as Yup from "yup";
import { apiSave, apiUpdate } from "@/lib/api";

export const useChoreographyForm = (choreography?: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: choreography?.name || "",
    participantId: choreography?.participantId || "",
    modality: choreography?.modality || "",
    teacher: choreography?.teacher || "",
    music: choreography?.music || "",
    clarification: choreography?.clarification || "",
    extra: choreography?.extra || "",
    status: choreography?.status || false,
  };

  // Cambiar 'validate' por 'validationSchema'
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Mínimo 2 caracteres")
      .required("El nombre de la coreografía es obligatorio"),
    participantId: Yup.string().required("El participante es obligatorio"),
    modality: Yup.string().required("La modalidad es obligatoria"),
    teacher: Yup.string()
      .min(2, "Mínimo 2 caracteres")
      .required("El nombre del profesor es obligatorio"),
    music: Yup.string()
      .min(2, "Mínimo 2 caracteres")
      .required("La canción/música es obligatoria"),
    clarification: Yup.string().optional(),
    extra: Yup.string().optional(),
  });

  const handleSubmit = async (
    values: any,
    { resetForm, setSubmitting, setStatus }: any,
    user: any,
    onClose: () => void
  ) => {
    console.log("Submitting choreography:", values);
    try {
      setIsLoading(true);
      setSubmitting(true);
      setStatus(null);

      const currentYear = new Date().getFullYear();
      const payload = {
        ...values,
        year: currentYear,
        status: choreography?.status || false, // Preservar status actual
        userId: user.id,
      };

      if (choreography?.id) {
        await apiUpdate("choreographies", choreography.id, payload);
      } else {
        await apiSave("choreographies", payload);
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al guardar coreografía:", error);
      setStatus({ type: "error", message: "Error al guardar la coreografía" });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return {
    initialValues,
    validationSchema, // Cambio aquí
    handleSubmit,
    isLoading,
  };
};
