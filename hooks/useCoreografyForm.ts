"use client";

import { useState } from "react";
import * as Yup from "yup";
import { apiSave, apiUpdate } from "@/lib/api";
import { stat } from "fs";

export const useChoreographyForm = (choreography?: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = choreography || {
    name: "",
    // participantId: "",
    modality: "",
    teacher: "",
    music: "",
    clarification: "",
    extra: "",
    status: false,
  };

  const validate = Yup.object().shape({
    name: Yup.string().required("El nombre de la coreografía es obligatorio"),
    // participantId: Yup.string().required("El participante es obligatorio"),
    modality: Yup.string().required("La modalidad es obligatoria"),
    teacher: Yup.string().required("El nombre del profesor es obligatorio"),
    music: Yup.string().required("La canción/música es obligatoria"),
    clarification: Yup.string().optional(),
    extra: Yup.string().optional(),
  });

  const handleSubmit = async (
    values: any,
    { resetForm }: any,
    user: any,
    onClose: () => void
  ) => {
    console.log("Submitting choreography:", values);
    try {
      setIsLoading(true);
      const currentYear = new Date().getFullYear();
      const payload = {
        ...values,
        year: currentYear,
        status: false,
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
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initialValues,
    validate,
    handleSubmit,
    isLoading,
  };
};
