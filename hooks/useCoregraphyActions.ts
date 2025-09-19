import { toast } from "sonner";

export const useCoregraphyActions = () => {
  const handleViewDetails = (choreographyName: string) => {
    toast.warning(`Funcionalidad en desarrollo: ${choreographyName}`);
    // Aquí irían las acciones reales para ver detalles
  };
  return { handleViewDetails };
};
