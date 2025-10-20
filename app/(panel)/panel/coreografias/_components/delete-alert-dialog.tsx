"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, AlertTriangle } from "lucide-react";
import { useDeleteChoreography } from "../_hooks/use-delete-choreography";
import type { FlattenedChoreography } from "../_types";

interface DeleteAlertDialogProps {
  choreography: FlattenedChoreography;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAlertDialog = ({
  choreography,
  isOpen,
  onClose,
}: DeleteAlertDialogProps) => {
  const { mutate: deleteChoreography, isPending } = useDeleteChoreography();

  const handleDelete = () => {
    deleteChoreography(
      {
        participantId: choreography.participantId,
        choreographyId: choreography.choreographyId,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className='max-w-md'>
        <AlertDialogHeader>
          <div className='flex items-center gap-3 mb-2'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-red-100'>
              <AlertTriangle className='h-5 w-5 text-red-600' />
            </div>
            <AlertDialogTitle className='text-xl font-semibold'>
              Confirmar eliminación
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className='text-base text-slate-600 leading-relaxed'>
            Estás a punto de eliminar la coreografía{" "}
            <span className='font-semibold text-slate-900'>
              "{choreography.choreographyName}"
            </span>{" "}
            del participante{" "}
            <span className='font-semibold text-slate-900'>
              {choreography.participantName}
            </span>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Información adicional */}
        <div className='rounded-lg border border-amber-200 bg-amber-50 p-4'>
          <p className='text-sm text-amber-900'>
            <span className='font-semibold'>Nota importante:</span> Si esta es
            la única coreografía registrada del participante, se eliminará
            también toda su información del sistema.
          </p>
        </div>

        <AlertDialogFooter className='flex-col-reverse gap-2 sm:flex-row'>
          <AlertDialogCancel disabled={isPending} className='w-full sm:w-auto'>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className='w-full sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-red-600'
          >
            {isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Eliminando...
              </>
            ) : (
              "Sí, eliminar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
