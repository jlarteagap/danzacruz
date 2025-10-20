// ============================================================================
// app/admin/choreographies/_components/table-columns.tsx
// ============================================================================
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { FlattenedChoreography } from "../_types";

interface ColumnActionsProps {
  choreography: FlattenedChoreography;
  onView: (choreography: FlattenedChoreography) => void;
  onEdit: (choreography: FlattenedChoreography) => void;
  onDelete: (choreography: FlattenedChoreography) => void;
}

const ColumnActions = ({
  choreography,
  onView,
  onEdit,
  onDelete,
}: ColumnActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 p-0 hover:bg-slate-100 transition-colors'
        >
          <span className='sr-only'>Abrir menú</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40 bg-white'>
        <DropdownMenuLabel className='text-xs font-medium text-slate-500'>
          Acciones
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onView(choreography)}
          className='cursor-pointer'
        >
          <Eye className='mr-2 h-4 w-4' />
          Ver detalles
        </DropdownMenuItem>
        {/* <DropdownMenuItem
          onClick={() => onEdit(choreography)}
          className='cursor-pointer'
        >
          <Pencil className='mr-2 h-4 w-4' />
          Editar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDelete(choreography)}
          className='cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50'
        >
          <Trash2 className='mr-2 h-4 w-4' />
          Eliminar
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Colores por categoría (puedes ajustar según tus categorías reales)
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    Solo: "bg-blue-100 text-blue-700 border-blue-200",
    Duo: "bg-purple-100 text-purple-700 border-purple-200",
    "Grupo Pequeño": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Grupo Grande": "bg-orange-100 text-orange-700 border-orange-200",
  };
  return colors[category] || "bg-slate-100 text-slate-700 border-slate-200";
};

export const createColumns = (
  onView: (choreography: FlattenedChoreography) => void,
  onEdit: (choreography: FlattenedChoreography) => void,
  onDelete: (choreography: FlattenedChoreography) => void
): ColumnDef<FlattenedChoreography>[] => [
  {
    accessorKey: "participantName",
    header: "Participante",
    cell: ({ row }) => {
      const name = row.getValue("participantName") as string;
      return (
        <div className='flex flex-col'>
          <span className='font-medium text-slate-900'>{name}</span>
          <span className='text-xs text-slate-500'>
            {row.original.participantCity}, {row.original.participantCountry}
          </span>
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "choreographyName",
    header: "Coreografía",
    cell: ({ row }) => {
      const name = row.getValue("choreographyName") as string;
      return (
        <div className='flex flex-col max-w-[200px]'>
          <span className='font-medium text-slate-900 truncate'>{name}</span>
          <span className='text-xs text-slate-500 truncate'>
            Música: {row.original.musicName}
          </span>
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return (
        <Badge
          variant='outline'
          className={`${getCategoryColor(category)} border font-medium`}
        >
          {category}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "division",
    header: "División",
    cell: ({ row }) => (
      <span className='text-sm text-slate-700'>{row.getValue("division")}</span>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "subdivision",
    header: "Subdivisión",
    cell: ({ row }) => (
      <span className='text-sm text-slate-600'>
        {row.getValue("subdivision")}
      </span>
    ),
  },
  {
    accessorKey: "modality",
    header: "Modalidad",
    cell: ({ row }) => (
      <Badge variant='secondary' className='font-normal'>
        {row.getValue("modality")}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: () => <div className='text-right'>Acciones</div>,
    cell: ({ row }) => (
      <div className='flex justify-end'>
        <ColumnActions
          choreography={row.original}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    ),
  },
];
