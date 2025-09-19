"use client";

import { FC } from "react";
import { Trash2, Check, Clock } from "lucide-react";
import { Choreography } from "../types";

interface ChoreographyCardProps {
  choreography: Choreography & { status: boolean };
  onDelete: (id: string) => void;
}

const ChoreographyCard: FC<ChoreographyCardProps> = ({
  choreography,
  onDelete,
}) => {
  const isApproved = choreography.status;

  return (
    <div
      className={`
      relative overflow-hidden backdrop-blur-xl border transition-all duration-500 ease-out
      hover:scale-[1.02] hover:shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row 
      md:justify-between items-start md:items-center mb-6 group
      ${
        isApproved
          ? "bg-white/90 border-white/20 shadow-lg hover:shadow-blue-500/10"
          : "bg-gray-50/80 border-gray-200/50 shadow-sm text-gray-500"
      }
    `}
    >
      {/* Status Badge */}
      <div className='absolute top-4 right-4 md:top-6 md:right-6'>
        <div
          className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
          backdrop-blur-sm border transition-all duration-300
          ${
            isApproved
              ? "bg-emerald-500/90 text-white border-emerald-400/30 shadow-lg shadow-emerald-500/20"
              : "bg-gray-300/90 text-gray-600 border-gray-200/30"
          }
        `}
        >
          {isApproved ? (
            <>
              <Check className='w-3 h-3' />
              <span>APROBADO</span>
            </>
          ) : (
            <>
              <Clock className='w-3 h-3' />
              <span>PENDIENTE</span>
            </>
          )}
        </div>
      </div>

      <div className='flex-1 pr-32 md:pr-40'>
        {/* Title */}
        <h3
          className={`
          text-xl md:text-2xl font-bold mb-3 transition-colors duration-300
          ${isApproved ? "text-gray-900" : "text-gray-500"}
        `}
        >
          {choreography.name}
        </h3>

        {/* Info Grid */}
        <div className='space-y-2 mb-4'>
          <div className='flex items-start gap-3'>
            <span
              className={`
              text-xs font-medium uppercase tracking-wider min-w-20
              ${isApproved ? "text-gray-400" : "text-gray-400"}
            `}
            >
              Profesor
            </span>
            <span
              className={`
              text-sm font-medium
              ${isApproved ? "text-gray-700" : "text-gray-500"}
            `}
            >
              {choreography.teacher}
            </span>
          </div>

          <div className='flex items-start gap-3'>
            <span
              className={`
              text-xs font-medium uppercase tracking-wider min-w-20
              ${isApproved ? "text-gray-400" : "text-gray-400"}
            `}
            >
              Música
            </span>
            <span
              className={`
              text-sm font-medium
              ${isApproved ? "text-gray-700" : "text-gray-500"}
            `}
            >
              {choreography.music}
            </span>
          </div>

          <div className='flex items-start gap-3'>
            <span
              className={`
              text-xs font-medium uppercase tracking-wider min-w-20
              ${isApproved ? "text-gray-400" : "text-gray-400"}
            `}
            >
              Modalidad
            </span>
            <span
              className={`
              text-sm font-medium
              ${isApproved ? "text-gray-700" : "text-gray-500"}
            `}
            >
              {choreography.modality}
            </span>
          </div>
        </div>

        {/* Additional Information */}
        {choreography.clarification && (
          <div
            className={`
            rounded-xl p-4 mb-3 transition-colors duration-300
            ${
              isApproved
                ? "bg-blue-50/70 border border-blue-100/50"
                : "bg-gray-100/50 border border-gray-200/30"
            }
          `}
          >
            <p
              className={`
              text-xs font-medium uppercase tracking-wider mb-1
              ${isApproved ? "text-blue-600" : "text-gray-500"}
            `}
            >
              Aclaración
            </p>
            <p
              className={`
              text-sm leading-relaxed
              ${isApproved ? "text-blue-800" : "text-gray-600"}
            `}
            >
              {choreography.clarification}
            </p>
          </div>
        )}

        {choreography.extra && (
          <div
            className={`
            rounded-xl p-4 mb-3 transition-colors duration-300
            ${
              isApproved
                ? "bg-purple-50/70 border border-purple-100/50"
                : "bg-gray-100/50 border border-gray-200/30"
            }
          `}
          >
            <p
              className={`
              text-xs font-medium uppercase tracking-wider mb-1
              ${isApproved ? "text-purple-600" : "text-gray-500"}
            `}
            >
              Información adicional
            </p>
            <p
              className={`
              text-sm leading-relaxed
              ${isApproved ? "text-purple-800" : "text-gray-600"}
            `}
            >
              {choreography.extra}
            </p>
          </div>
        )}

        {/* Status Message */}
        <div
          className={`
          flex items-center gap-3 p-4 rounded-xl transition-all duration-300
          ${
            isApproved
              ? "bg-emerald-50/80 border border-emerald-200/50"
              : "bg-amber-50/80 border border-amber-200/50"
          }
        `}
        >
          {isApproved ? (
            <>
              <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></div>
              <p className='text-emerald-800 text-sm font-medium'>
                Esta coreografía ha sido aprobada y está lista para su
                presentación
              </p>
            </>
          ) : (
            <>
              <div className='w-2 h-2 bg-amber-500 rounded-full animate-pulse'></div>
              <p className='text-amber-800 text-sm font-medium'>
                Esta coreografía está pendiente de aprobación por el comité
                artístico
              </p>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className='flex gap-3 mt-6 md:mt-0 md:flex-col md:items-end'>
        {/* Solo mostrar botón eliminar si NO está aprobado */}
        {!isApproved && (
          <button
            onClick={() => onDelete(choreography.id)}
            className={`
              group/btn flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
              transition-all duration-300 relative overflow-hidden
              bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
              text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40
              hover:scale-105 hover:-translate-y-0.5
              active:scale-95 active:translate-y-0
            `}
          >
            <div
              className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                          transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full 
                          transition-transform duration-700'
            ></div>
            <Trash2 className='w-4 h-4 transition-transform group-hover/btn:scale-110' />
            <span className='relative'>Eliminar</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ChoreographyCard;
