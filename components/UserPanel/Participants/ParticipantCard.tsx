"use client";

import { FC } from "react";
import { Trash2 } from "lucide-react";
import { Participant } from "../types";

interface ParticipantCardProps {
  participant: Participant;
  onDelete: (id: string) => void;
}

const ParticipantCard: FC<ParticipantCardProps> = ({
  participant,
  onDelete,
}) => {
  return (
    <div className='bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4'>
      <div className='flex-1'>
        <h3 className='text-lg font-semibold'>{participant.name}</h3>
        <p className='text-gray-500 text-sm'>{participant.choreography}</p>
        <p className='text-gray-400 text-sm'>
          {participant.category} | {participant.division} |{" "}
          {participant.subDivision}
        </p>
      </div>
      <div className='flex gap-2 mt-4 md:mt-0'>
        <button
          onClick={() => onDelete(participant.id)}
          className='flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg'
        >
          <Trash2 className='w-4 h-4' /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default ParticipantCard;
