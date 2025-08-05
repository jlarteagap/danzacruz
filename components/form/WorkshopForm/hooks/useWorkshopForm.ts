import { useState } from "react";
import { FormikHelpers } from "formik";
import { createWorkShop, updateWorkshop } from "@/services/workshopService";
import { toast } from "sonner";
import { workshops, WorkshopFormData } from "@/types/workshops.types";

export const useWorkshopForm = (
  editingWorkshop: workshops | null,
  onSuccess?: (workshop: workshops) => void,
  onClose?: () => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    values: WorkshopFormData,
    formikHelpers: FormikHelpers<WorkshopFormData>
  ) => {
    setIsSubmitting(true);

    try {
      let result: workshops;
      if (editingWorkshop) {
        result = await updateWorkshop(String(editingWorkshop.id), values);
        toast.success("Taller actualizado correctamente");
      } else {
        result = await createWorkShop(values);
        toast.success("Taller agregado correctamente");
      }
      onSuccess?.(result);
      onClose?.();
      formikHelpers.resetForm();
    } catch (error) {
      toast.error("Error al guardar el taller");
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
