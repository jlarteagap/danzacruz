"use client";

import { FC } from "react";
import { Trash2, Pencil, UserCircle, Music, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Participant } from "@/types/userPanel.types";
import { useDataContext } from "@/contexts/DataContext";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ParticipantCardProps {
  participant: Participant;
  onDelete: (id: string) => Promise<boolean>;
  onEdit: (participant: Participant) => void;
  canDelete: boolean;
}

const ParticipantCard: FC<ParticipantCardProps> = ({
  participant,
  onDelete,
  onEdit,
  canDelete,
}) => {
  const { getChoreographiesByParticipant } = useDataContext();

  const participantChoreographies = getChoreographiesByParticipant(
    participant.id
  );
  const choreographiesCount = participantChoreographies.length;

  const handleDelete = async () => {
    await onDelete(participant.id);
  };

  const handleEdit = () => {
    onEdit(participant);
  };

  return (
    <Card
      className='
        w-full
        flex items-center justify-between
        p-4
        border border-white/20
        bg-white/40
        transition-all duration-500 ease-out
        hover:scale-[1.02] hover:shadow-2xl rounded-2xl mb-6 group
        relative
      '
    >
      {/* Badge de coreografías (top-right corner) */}
      {choreographiesCount > 0 && (
        <div className='absolute -top-2 -right-2 z-10'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant='default'
                  className='bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg'
                >
                  <Music className='h-3 w-3' />
                  {choreographiesCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{choreographiesCount} coreografía(s) asignada(s)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Imagen de perfil */}
      <div className='flex-shrink-0 relative'>
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

        {/* Indicador de protección contra eliminación */}
        {!canDelete && (
          <div className='absolute -bottom-1 -right-1'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className='bg-red-500 rounded-full p-1 shadow-md'>
                    <AlertTriangle className='h-3 w-3 text-white' />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Protegido: tiene coreografías asignadas</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      {/* Información */}
      <div className='flex-1 px-4'>
        <h3 className='text-lg font-semibold text-gray-900'>
          {participant.name}
        </h3>
        <div className='flex flex-wrap items-center gap-2 mt-1'>
          <p className='text-sm text-gray-500'>
            {participant.category} | {participant.division}
            {participant.subDivision && ` | ${participant.subDivision}`}
          </p>
        </div>

        {/* Info adicional en una segunda línea */}
        <div className='flex items-center gap-3 mt-2 text-xs text-gray-600'>
          <span>Año: {participant.year}</span>
          {choreographiesCount > 0 && (
            <span className='flex items-center gap-1'>
              <Music className='h-3 w-3' />
              {choreographiesCount} coreografía
              {choreographiesCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className='flex gap-2'>
        <Button
          onClick={handleEdit}
          variant='outline'
          size='sm'
          className='rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-colors'
        >
          <Pencil className='w-4 h-4' />
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  onClick={handleDelete}
                  variant='destructive'
                  size='sm'
                  disabled={!canDelete}
                  className={`rounded-xl transition-all ${
                    !canDelete
                      ? "opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400"
                      : "hover:bg-red-600"
                  }`}
                >
                  {!canDelete && <AlertTriangle className='w-3 h-3 mr-1' />}
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
            </TooltipTrigger>
            {!canDelete && (
              <TooltipContent>
                <p className='text-center'>
                  No se puede eliminar
                  <br />
                  Tiene {choreographiesCount} coreografía(s) asignada(s)
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  );
};

export default ParticipantCard;
