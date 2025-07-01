import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface PanelJudgesHeaderProps {
  onAddClick: () => void;
}

export const PanelJudgesHeader: React.FC<PanelJudgesHeaderProps> = ({
  onAddClick,
}) => {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Gestión de Jurados</h1>
        <p className='text-gray-600 mt-2'>
          Administra los jurados del festival
        </p>
      </div>

      <Button onClick={onAddClick} className='bg-blue-600 hover:bg-blue-700'>
        <Plus className='h-4 w-4 mr-2' />
        Agregar Jurado
      </Button>
    </div>
  );
};
