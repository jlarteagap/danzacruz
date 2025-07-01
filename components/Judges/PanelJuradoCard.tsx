import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { Judge } from "../../types/judges.types";

interface JuradoCardProps {
  judge: Judge;
  onEdit: (jurado: Judge) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export const PanelJudgeCard: React.FC<JuradoCardProps> = ({
  judge,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const getInitials = (nombre: string, apellido: string): string => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-lg ${
        !judge.habilitado ? "opacity-60 bg-gray-50" : ""
      }`}
    >
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center space-x-3'>
            <Avatar className='h-12 w-12'>
              <AvatarImage
                src={judge.fotoPerfil}
                alt={`${judge.nombre} ${judge.apellido}`}
              />
              <AvatarFallback className='bg-blue-100 text-blue-600'>
                {getInitials(judge.nombre, judge.apellido)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className='text-lg'>
                {judge.nombre} {judge.apellido}
              </CardTitle>
              <Badge variant='secondary' className='mt-1'>
                {judge.nacionalidad}
              </Badge>
            </div>
          </div>

          <Badge
            variant={judge.habilitado ? "default" : "destructive"}
            className='ml-2'
          >
            {judge.habilitado ? "Activo" : "Inactivo"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div>
          <h4 className='font-semibold text-sm text-gray-700 mb-2'>
            Trayectoria
          </h4>
          <p className='text-sm text-gray-600 line-clamp-3'>
            {judge.trayectoria}
          </p>
        </div>

        <div className='flex space-x-2 pt-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => onEdit(judge)}
            className='flex-1'
          >
            <Edit className='h-4 w-4 mr-1' />
            Editar
          </Button>

          <Button
            size='sm'
            variant={judge.habilitado ? "destructive" : "default"}
            onClick={() => onToggleStatus(judge.id)}
            className='flex-1'
          >
            {judge.habilitado ? (
              <>
                <UserX className='h-4 w-4 mr-1' />
                Deshabilitar
              </>
            ) : (
              <>
                <UserCheck className='h-4 w-4 mr-1' />
                Habilitar
              </>
            )}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size='sm' variant='destructive'>
                <Trash2 className='h-4 w-4' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Se eliminará permanentemente
                  a
                  <strong>
                    {" "}
                    {judge.nombre} {judge.apellido}
                  </strong>{" "}
                  de la lista de judges.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(judge.id)}
                  className='bg-red-600 hover:bg-red-700'
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};
