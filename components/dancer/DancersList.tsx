// components/DancersList.tsx
"use client";

import React from "react";
import { useDancers } from "@/hooks/useDancers";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Calendar, FileText, AlertCircle } from "lucide-react";

interface Dancer {
  id?: string;
  fullName: string;
  document: string;
  createdAt?: string;
}

interface DancersListProps {
  choreographyId: string;
}

/**
 * Formatea la fecha de manera elegante
 */
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("es-BO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return "";
  }
};

/**
 * Obtiene las iniciales del nombre
 */
const getInitials = (name: string): string => {
  if (!name?.trim()) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Genera color único basado en el nombre
 */
const getAvatarColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

/**
 * Estado de carga con skeleton elegante
 */
const LoadingState: React.FC = () => (
  <div className='space-y-3' role='status' aria-label='Cargando bailarines'>
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className='flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 bg-white'
      >
        <Skeleton className='h-12 w-12 rounded-full shrink-0' />
        <div className='flex-1 space-y-2'>
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-4 w-28' />
        </div>
        <Skeleton className='h-4 w-24' />
      </div>
    ))}
  </div>
);

/**
 * Estado de error
 */
const ErrorState: React.FC = () => (
  <div
    role='alert'
    className='flex items-center gap-3 p-4 rounded-2xl bg-red-50/50 border border-red-100'
  >
    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100'>
      <AlertCircle className='h-5 w-5 text-red-600' />
    </div>
    <div className='flex-1'>
      <p className='text-sm font-medium text-red-900'>
        Error al cargar bailarines
      </p>
      <p className='text-xs text-red-700 mt-0.5'>
        Por favor, intenta nuevamente más tarde
      </p>
    </div>
  </div>
);

/**
 * Estado vacío
 */
const EmptyState: React.FC = () => (
  <div className='flex flex-col items-center justify-center py-12 px-4'>
    <div className='flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 mb-4'>
      <Users className='h-8 w-8 text-neutral-400' />
    </div>
    <h3 className='text-base font-semibold text-neutral-900 mb-1'>
      Sin bailarines aún
    </h3>
    <p className='text-sm text-neutral-500 text-center max-w-sm'>
      Agrega el primer bailarín a esta coreografía para comenzar
    </p>
  </div>
);

/**
 * Item individual de bailarín
 */
const DancerItem: React.FC<{ dancer: Dancer }> = ({ dancer }) => {
  const initials = getInitials(dancer.fullName);
  const avatarColor = getAvatarColor(dancer.fullName);

  return (
    <li className='group relative'>
      <div className='flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 bg-white transition-all duration-200 hover:border-neutral-200 hover:shadow-sm'>
        {/* Avatar con iniciales */}
        <div
          className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white font-semibold text-sm shadow-sm'
          style={{ backgroundColor: avatarColor }}
          aria-hidden='true'
        >
          {initials}
        </div>

        {/* Información principal */}
        <div className='flex-1 min-w-0'>
          <h4 className='text-sm font-semibold text-neutral-900 truncate'>
            {dancer.fullName}
          </h4>
          <div className='flex items-center gap-1.5 mt-1'>
            <FileText className='h-3.5 w-3.5 text-neutral-400 shrink-0' />
            <span className='text-xs text-neutral-600'>{dancer.document}</span>
          </div>
        </div>

        {/* Fecha de creación */}
        {dancer.createdAt && (
          <div className='hidden sm:flex items-center gap-1.5 text-xs text-neutral-500'>
            <Calendar className='h-3.5 w-3.5' />
            <time dateTime={dancer.createdAt}>
              {formatDate(dancer.createdAt)}
            </time>
          </div>
        )}
      </div>
    </li>
  );
};

/**
 * Componente principal: Lista de bailarines
 */
export default function DancersList({ choreographyId }: DancersListProps) {
  const { data, isLoading, isError } = useDancers(choreographyId);

  // Estado de carga
  if (isLoading) {
    return <LoadingState />;
  }

  // Estado de error
  if (isError) {
    return <ErrorState />;
  }

  const dancers = data ?? [];

  // Estado vacío
  if (dancers.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className='space-y-3'>
      {/* Header opcional con contador */}
      <div className='flex items-center justify-between px-1'>
        <p className='text-sm font-medium text-neutral-700'>
          {dancers.length} {dancers.length === 1 ? "bailarín" : "bailarines"}
        </p>
      </div>

      {/* Lista de bailarines */}
      <ul role='list' className='space-y-2.5'>
        {dancers.map((dancer: Dancer) => (
          <DancerItem
            key={dancer.id ?? dancer.createdAt ?? dancer.fullName}
            dancer={dancer}
          />
        ))}
      </ul>
    </div>
  );
}
