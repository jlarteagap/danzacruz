"use client";

import { FC } from "react";
import { Trash2 } from "lucide-react";
import { Choreography } from "../types";

interface ChoreographyCardProps {
  choreography: Choreography;
  onDelete: (id: string) => void;
}

const ChoreographyCard: FC<ChoreographyCardProps> = ({
  choreography,
  onDelete,
}) => {
  return (
    <div className='bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4'>
      <div className='flex-1'>
        <h3 className='text-lg font-semibold'>{choreography.name}</h3>
        <p className='text-gray-500 text-sm'>
          Profesor: {choreography.teacher}
        </p>
        <p className='text-gray-500 text-sm'>Música: {choreography.music}</p>
        <p className='text-gray-400 text-sm'>{choreography.modality}</p>
        {choreography.clarification && (
          <p className='text-gray-400 text-xs italic'>
            <span className='font-medium'>Aclaración:</span>{" "}
            {choreography.clarification}
          </p>
        )}
        {choreography.extra && (
          <p className='text-gray-400 text-xs italic'>
            <span className='font-medium'>Información adicional:</span>{" "}
            {choreography.extra}
          </p>
        )}
      </div>
      <div className='flex gap-2 mt-4 md:mt-0'>
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
