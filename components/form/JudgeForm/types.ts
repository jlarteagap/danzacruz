import { Judge } from "@/types/judges.types";

export interface JudgeFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingJudge: Judge | null;
  onSuccess?: (judge: Judge) => void;
}
