// components/ChoreographyCardContent.tsx
import { FC } from "react";
import { User, Music, Palette, UserCheck } from "lucide-react";
import { Choreography } from "@/types/userPanel.types";

interface ChoreographyCardContentProps {
  choreography: Choreography & { status: boolean };
  participantName: string;
}

export const ChoreographyCardContent: FC<ChoreographyCardContentProps> = ({
  choreography,
  participantName,
}) => {
  const isApproved = choreography.status;

  return (
    <div className='flex-1 pr-16 md:pr-32'>
      {/* Title - Prominente en la parte superior */}
      <h3
        className={`
        text-xl md:text-2xl font-bold mb-2 leading-tight transition-colors duration-300
        ${isApproved ? "text-gray-900" : "text-gray-500"}
      `}
      >
        {choreography.name}
      </h3>

      {/* Nombre del participante - Justo debajo del título en letras pequeñas */}
      <div className='flex items-center gap-2 mb-4'>
        <UserCheck
          className={`w-3 h-3 ${
            isApproved ? "text-blue-500" : "text-gray-400"
          }`}
        />
        <p
          className={`
          text-xs font-medium uppercase tracking-wider transition-colors duration-300
          ${isApproved ? "text-blue-600" : "text-gray-400"}
        `}
        >
          {participantName}
        </p>
      </div>

      {/* 3 Elementos principales - Una sola línea horizontal */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mb-6'>
        {/* Profesor */}
        <div className='flex items-center gap-2'>
          <div
            className={`
            p-2 rounded-lg shadow-sm transition-all duration-300 flex-shrink-0
            ${
              isApproved
                ? "bg-blue-500 text-white shadow-blue-500/20"
                : "bg-gray-300 text-gray-600 shadow-gray-300/20"
            }
          `}
          >
            <User className='w-4 h-4' />
          </div>
          <div className='min-w-0 flex-1'>
            <p
              className={`
              text-xs font-semibold uppercase tracking-wider
              ${isApproved ? "text-blue-600" : "text-gray-400"}
            `}
            >
              Profesor
            </p>
            <p
              className={`
              text-sm font-bold truncate
              ${isApproved ? "text-gray-800" : "text-gray-500"}
            `}
            >
              {choreography.teacher}
            </p>
          </div>
        </div>

        {/* Música */}
        <div className='flex items-center gap-2'>
          <div
            className={`
            p-2 rounded-lg shadow-sm transition-all duration-300 flex-shrink-0
            ${
              isApproved
                ? "bg-emerald-500 text-white shadow-emerald-500/20"
                : "bg-gray-300 text-gray-600 shadow-gray-300/20"
            }
          `}
          >
            <Music className='w-4 h-4' />
          </div>
          <div className='min-w-0 flex-1'>
            <p
              className={`
              text-xs font-semibold uppercase tracking-wider
              ${isApproved ? "text-emerald-600" : "text-gray-400"}
            `}
            >
              Música
            </p>
            <p
              className={`
              text-sm font-bold truncate
              ${isApproved ? "text-gray-800" : "text-gray-500"}
            `}
            >
              {choreography.music}
            </p>
          </div>
        </div>

        {/* Modalidad */}
        <div className='flex items-center gap-2'>
          <div
            className={`
            p-2 rounded-lg shadow-sm transition-all duration-300 flex-shrink-0
            ${
              isApproved
                ? "bg-purple-500 text-white shadow-purple-500/20"
                : "bg-gray-300 text-gray-600 shadow-gray-300/20"
            }
          `}
          >
            <Palette className='w-4 h-4' />
          </div>
          <div className='min-w-0 flex-1'>
            <p
              className={`
              text-xs font-semibold uppercase tracking-wider
              ${isApproved ? "text-purple-600" : "text-gray-400"}
            `}
            >
              Modalidad
            </p>
            <p
              className={`
              text-sm font-bold truncate
              ${isApproved ? "text-gray-800" : "text-gray-500"}
            `}
            >
              {choreography.modality}
            </p>
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div
        className={`
        flex items-center gap-3 p-4 rounded-xl transition-all duration-300 mb-4
        ${
          isApproved
            ? "bg-emerald-50 border border-emerald-200/60"
            : "bg-amber-50 border border-amber-200/60"
        }
      `}
      >
        <div
          className={`
          w-2 h-2 rounded-full animate-pulse shadow-sm
          ${isApproved ? "bg-emerald-500" : "bg-amber-500"}
        `}
        ></div>
        <p
          className={`
          text-sm font-medium leading-relaxed
          ${isApproved ? "text-emerald-800" : "text-amber-800"}
        `}
        >
          {isApproved
            ? "Esta coreografía ha sido aprobada y está lista para su presentación"
            : "Esta coreografía está pendiente de aprobación por el comité artístico"}
        </p>
      </div>
    </div>
  );
};
