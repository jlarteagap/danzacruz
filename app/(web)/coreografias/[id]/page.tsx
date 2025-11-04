// app/coreografias/[id]/page.tsx
"use client";

import React, { useMemo } from "react";
import { choreographyService } from "@/services/choreographiesService";
import DancerForm from "@/components/dancer/DancerForm";
import DancersList from "@/components/dancer/DancersList";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Music,
  Users,
  UserPlus,
  Award,
  Grid3x3,
  Layers,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface ChoreographyPageProps {
  params: { id: string };
}

interface ChoreographyData {
  id: string;
  choreographyName: string;
  modality: string;
  category: string;
  division: string;
  subdivision: string;
  choreographer: string;
}

/**
 * Badge para metadatos de coreografía
 */
const InfoBadge: React.FC<{ icon: React.ReactNode; label: string }> = ({
  icon,
  label,
}) => (
  <div className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-100'>
    <span className='text-neutral-500'>{icon}</span>
    <span className='text-xs font-medium text-neutral-700'>{label}</span>
  </div>
);

/**
 * Header con título y metadata
 */
const ChoreographyHeader: React.FC<{ choreography: ChoreographyData }> = ({
  choreography,
}) => (
  <div className='space-y-4'>
    {/* Título */}
    <div className='space-y-3'>
      <div className='flex items-start gap-3'>
        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg'>
          <Music className='h-6 w-6 text-white' />
        </div>
        <div className='flex-1 min-w-0'>
          <h1 className='text-3xl font-bold text-neutral-900 tracking-tight'>
            {choreography.choreographyName}
          </h1>
          <div className='flex items-center gap-2 mt-2'>
            <Users className='h-4 w-4 text-neutral-400' />
            <p className='text-sm text-neutral-600'>
              Coreógrafo:{" "}
              <span className='font-semibold text-neutral-900'>
                {choreography.choreographer}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Badges de metadata */}
      <div className='flex flex-wrap gap-2'>
        <InfoBadge
          icon={<Grid3x3 className='h-3.5 w-3.5' />}
          label={choreography.modality}
        />
        <InfoBadge
          icon={<Award className='h-3.5 w-3.5' />}
          label={choreography.category}
        />
        <InfoBadge
          icon={<Layers className='h-3.5 w-3.5' />}
          label={choreography.division}
        />
        <InfoBadge
          icon={<Layers className='h-3.5 w-3.5' />}
          label={choreography.subdivision}
        />
      </div>
    </div>
  </div>
);

/**
 * Sección con título y contenido
 */
const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <section className='space-y-4'>
    <div className='flex items-center gap-2'>
      <span className='text-neutral-700'>{icon}</span>
      <h2 className='text-lg font-semibold text-neutral-900'>{title}</h2>
    </div>
    {children}
  </section>
);

/**
 * Estado de carga
 */
const LoadingState: React.FC = () => (
  <div className='min-h-screen bg-gradient-to-b from-neutral-50 to-white'>
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <div className='space-y-6'>
        {/* Header skeleton */}
        <div className='space-y-4'>
          <Skeleton className='h-4 w-32' />
          <div className='flex items-start gap-3'>
            <Skeleton className='h-12 w-12 rounded-2xl shrink-0' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-8 w-2/3' />
              <Skeleton className='h-4 w-1/3' />
            </div>
          </div>
          <div className='flex gap-2'>
            <Skeleton className='h-8 w-24 rounded-full' />
            <Skeleton className='h-8 w-24 rounded-full' />
            <Skeleton className='h-8 w-24 rounded-full' />
          </div>
        </div>

        {/* Sections skeleton */}
        <div className='space-y-6 mt-8'>
          <div className='bg-white rounded-3xl border border-neutral-100 p-6'>
            <Skeleton className='h-6 w-32 mb-4' />
            <div className='space-y-3'>
              <Skeleton className='h-16 w-full rounded-2xl' />
              <Skeleton className='h-16 w-full rounded-2xl' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Estado de error 404
 */
const NotFoundState: React.FC = () => (
  <div className='min-h-screen bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center px-4'>
    <div className='text-center space-y-4 max-w-md'>
      <div className='flex justify-center'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
          <AlertCircle className='h-8 w-8 text-red-600' />
        </div>
      </div>
      <h1 className='text-2xl font-bold text-neutral-900'>
        Coreografía no encontrada
      </h1>
      <p className='text-neutral-600'>
        La coreografía que buscas no existe o ha sido eliminada.
      </p>
    </div>
  </div>
);

/**
 * Página principal de coreografía
 */
export default function ChoreographyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: choreographyId } = React.use(params);

  const { data: flat, isLoading } = useQuery({
    queryKey: ["choreographies", "flat"],
    queryFn: () => choreographyService.fetchAll(),
    staleTime: 1000 * 60 * 2,
  });

  const found = useMemo(() => {
    if (!flat) return null;
    return flat.find((c: ChoreographyData) => c.id === choreographyId) ?? null;
  }, [flat, choreographyId]);

  // Estado de carga
  if (isLoading) {
    return <LoadingState />;
  }

  // Estado 404
  if (!found) {
    return <NotFoundState />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-neutral-50 to-white'>
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        <div className='space-y-8'>
          {/* Header */}
          <ChoreographyHeader choreography={found} />

          {/* Sección: Lista de bailarines */}
          <div className='bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm'>
            <Section icon={<Users className='h-5 w-5' />} title='Bailarines'>
              <DancersList choreographyId={choreographyId} />
            </Section>
          </div>

          {/* Sección: Agregar bailarín */}
          <div className='bg-gradient-to-br from-white to-neutral-50 rounded-3xl border border-neutral-100 p-6 shadow-sm'>
            <Section
              icon={<UserPlus className='h-5 w-5' />}
              title='Agregar nuevo bailarín'
            >
              <DancerForm choreographyId={choreographyId} />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
