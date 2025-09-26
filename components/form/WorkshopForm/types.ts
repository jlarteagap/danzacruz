import { workshops } from "@/types/workshops.types";

export interface WorkshopFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingWorkshop: workshops | null;
  onSuccess?: (workshop: workshops) => void;
}
