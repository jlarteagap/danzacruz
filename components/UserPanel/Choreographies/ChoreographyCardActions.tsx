import { FC } from "react";
import { Eye, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChoreographyCardActionsProps {
  choreographyId: string;
  choreographyName: string;
  isApproved: boolean;
  onDelete: () => Promise<void>;
  onEdit?: () => void;
  onViewDetails?: (name: string) => void;
}

export const ChoreographyCardActions: FC<ChoreographyCardActionsProps> = ({
  choreographyId,
  choreographyName,
  isApproved,
  onDelete,
  onEdit,
  onViewDetails,
}) => {
  const handleDelete = async () => {
    try {
      await onDelete();
    } catch (error) {
      console.error("Error deleting choreography:", error);
    }
  };

  return (
    <div className='flex gap-3 mt-6 md:mt-0 md:flex-col md:items-end'>
      {/* Botón Ver Detalles */}
      {onViewDetails && (
        <Button
          onClick={() => onViewDetails(choreographyName)}
          variant='outline'
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
            transition-all duration-300 hover:scale-105 hover:-translate-y-0.5
            ${
              isApproved
                ? "border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }
          `}
        >
          <Eye className='w-4 h-4' />
          <span>Ver detalles</span>
        </Button>
      )}

      {/* Botón Editar - Siempre disponible */}
      {onEdit && (
        <Button
          onClick={onEdit}
          variant='outline'
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
            transition-all duration-300 hover:scale-105 hover:-translate-y-0.5
            ${
              isApproved
                ? "border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
            }
          `}
        >
          <Edit className='w-4 h-4' />
          <span>Editar</span>
        </Button>
      )}

      {/* Botón Eliminar - Solo si NO está aprobado */}
      {!isApproved && (
        <Button
          onClick={handleDelete}
          variant='destructive'
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
            transition-all duration-300 relative overflow-hidden
            hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0
          `}
        >
          <Trash2 className='w-4 h-4' />
          <span>Eliminar</span>
        </Button>
      )}
    </div>
  );
};
