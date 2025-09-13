"use client";

import { useState } from "react";
import { initialValues, validate } from "@/components/UserPanel/utils";
import { apiSave } from "@/lib/api";

export const useParticipantForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");

  const handleSubmit = async (
    values: any,
    { resetForm }: any,
    user: any,
    onClose: () => void
  ) => {
    try {
      setIsLoading(true);
      const currentYear = new Date().getFullYear();
      const payload = {
        ...values,
        year: currentYear,
        userId: user.id, // assuming user object has an id property
      };

      const data = await apiSave("participants", payload);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al registrar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initialValues,
    validate,
    handleSubmit,
    isLoading,
    category,
    setCategory,
  };
};
