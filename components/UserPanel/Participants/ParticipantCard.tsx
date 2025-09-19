"use client";

import { FC } from "react";
import { Trash2, Pencil, UserCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Participant } from "../types";
import Image from "next/image";

interface ParticipantCardProps {
  participant: Participant;
  onDelete: (id: string) => void;
  onEdit: (participant: Participant) => void;
}

const ParticipantCard: FC<ParticipantCardProps> = ({
  participant,
  onDelete,
  onEdit,
}) => {
  return (
    <Card
      className='
        w-full
        flex items-center justify-between
        p-4
        border border-white/20
        bg-white/40 dark:bg-zinc-900/40
        transition-all duration-500 ease-out
      hover:scale-[1.02] hover:shadow-2xl rounded-2xl mb-6 group
      '
    >
      {/* Imagen de perfil */}
      <div className='flex-shrink-0'>
        {participant.image ? (
          <Image
            src={participant.image}
            alt={participant.name}
            width={64}
            height={64}
            className='rounded-xl object-cover w-16 h-16'
          />
        ) : (
          <UserCircle className='w-16 h-16 text-gray-400' />
        )}
      </div>

      {/* Información */}
      <div className='flex-1 px-4'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-50'>
          {participant.name}
        </h3>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {participant.category} | {participant.division} |{" "}
          {participant.subDivision}
        </p>
      </div>

      {/* Acciones */}
      <div className='flex gap-2'>
        <Button
          onClick={() => onEdit(participant)}
          variant='outline'
          size='sm'
          className='rounded-xl'
        >
          <Pencil className='w-4 h-4' />
        </Button>
        <Button
          onClick={() => onDelete(participant.id)}
          variant='destructive'
          size='sm'
          className='rounded-xl'
        >
          <Trash2 className='w-4 h-4' />
        </Button>
      </div>
    </Card>
  );
};

export default ParticipantCard;
