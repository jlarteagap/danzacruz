import { useState } from "react";
import { FormikHelpers } from "formik";
import { JudgesFormData, Judge } from "@/types/judges.types";
import { createJudge, updateJudge } from "@/services/judgeService";
import { toast } from "sonner";

export const useJudgeForm = (
  editingJudge: Judge | null,
  onSuccess?: (judge: Judge) => void,
  onClose?: () => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    values: JudgesFormData,
    formikHelpers: FormikHelpers<JudgesFormData>
  ) => {
    setIsSubmitting(true);

    try {
      let result: Judge;

      if (editingJudge) {
        result = await updateJudge(String(editingJudge.id), values);
        toast.success("Jurado actualizado correctamente");
      } else {
        result = await createJudge(values);
        toast.success("Jurado agregado correctamente");
      }

      onSuccess?.(result);
      onClose?.();
      formikHelpers.resetForm();
    } catch (error) {
      toast.error("Error al guardar el jurado");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
};
