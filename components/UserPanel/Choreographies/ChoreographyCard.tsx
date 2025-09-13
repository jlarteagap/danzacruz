"use client";

import { FC } from "react";
import { Edit3, Trash2 } from "lucide-react";
import { Choreography } from "../types";

interface ChoreographyCardProps {
  choreography: Choreography;
  onEdit: (c: Choreography) => void;
  onDelete: (id: string) => void;
}

const ChoreographyCard: FC<ChoreographyCardProps> = ({
  choreography,
  onEdit,
  onDelete,
}) => {
  return (
    <div className='bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4'>
      <div className='flex-1'>
        <h3 className='text-lg font-semibold'>{choreography.name}</h3>
        <p className='text-gray-500 text-sm'>{choreography.teacher}</p>
        <p className='text-gray-400 text-sm'>
          {choreography.category} | {choreography.division} |{" "}
          {choreography.modality}
        </p>
      </div>
      <div className='flex gap-2 mt-4 md:mt-0'>
        <button
          onClick={() => onEdit(choreography)}
          className='flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg'
        >
          <Edit3 className='w-4 h-4' /> Editar
        </button>
        <button
          onClick={() => onDelete(choreography.id)}
          className='flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg'
        >
          <Trash2 className='w-4 h-4' /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default ChoreographyCard;
