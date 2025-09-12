"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { initialValues, validate } from "@/components/AddParticipant/utils";
import { apiSave } from "@/lib/api";

export const useParticipantForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      setIsLoading(true);
      const currentYear = new Date().getFullYear();
      values.year = currentYear;

      const data = await await apiSave("coreografias", values);

      resetForm();
      // router.push(`completo/${data.id}`); // puedes activarlo luego si quieres redirección
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
