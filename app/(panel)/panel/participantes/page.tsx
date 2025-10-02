// app/dashboard/participantes/page.tsx
"use client";

import { useState } from "react";
import { useParticipants } from "@/hooks/useParticipants";
import { DataTable } from "@/components/Panel/participants/data-table";
import { createColumns } from "@/components/Panel/participants/Columns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import { Participant } from "@/types/userPanel.types";
import { toast } from "sonner";

export default function ParticipantsPage() {
  const {
    data: participants,
    isLoading,
    isError,
    error,
    refetch,
  } = useParticipants();

  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);

  const handleView = (participant: Participant) => {
    setSelectedParticipant(participant);
    setDetailSheetOpen(true);
  };

  const handleEdit = (participant: Participant) => {
    // Aquí podrías abrir un modal de edición o redirigir
    toast.info("Funcionalidad de edición próximamente");
    console.log("Editar:", participant);
  };

  const handleDelete = (participant: Participant) => {
    // Aquí podrías implementar la eliminación individual
    toast.info("Funcionalidad de eliminación próximamente");
    console.log("Eliminar:", participant);
  };

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-[calc(100vh-200px)] space-y-4'>
        <Loader2 className='h-10 w-10 animate-spin text-primary' />
        <div className='text-center space-y-2'>
          <p className='text-lg font-medium'>Cargando participantes</p>
          <p className='text-sm text-muted-foreground'>
            Esto puede tardar unos segundos...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-200px)]'>
        <Card className='max-w-md w-full'>
          <CardHeader>
            <CardTitle className='text-red-600'>
              Error al cargar datos
            </CardTitle>
            <CardDescription>
              Ha ocurrido un problema al intentar cargar los participantes
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm text-muted-foreground'>{error?.message}</p>
            <Button onClick={() => refetch()} className='w-full'>
              <RefreshCcw className='mr-2 h-4 w-4' />
              Intentar nuevamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const columns = createColumns(handleEdit, handleDelete);

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Participantes</h1>
          <p className='text-muted-foreground mt-1'>
            Administra y monitorea todos los participantes del sistema
          </p>
        </div>

        {/* <Button size='sm' className='gap-2'>
          <Plus className='h-4 w-4' />
          Nuevo Participante
        </Button> */}
      </div>

      {/* Data Table */}
      <Card className='bg-white'>
        <CardHeader>
          <CardTitle>Lista de Participantes</CardTitle>
          <CardDescription>
            Visualiza, filtra y administra todos los participantes registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={participants ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}
