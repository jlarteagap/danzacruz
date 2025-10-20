"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RegistrationResponse } from "@/services/api/choreography.service";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  Music,
  User,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const createColumns = (
  onEdit: (choreography: RegistrationResponse) => void,
  onDelete: (choreography: RegistrationResponse) => void
): ColumnDef<RegistrationResponse>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Seleccionar todo'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Seleccionar fila'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className='-ml-4 h-8 data-[state=open]:bg-accent'
      >
        Nombre
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;

      return (
        <div className='flex flex-col'>
          <span className='font-medium'>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "modality",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className='-ml-4 h-8'
      >
        Modalidad
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const modality = row.getValue("modality") as string;
      return (
        <Badge variant='outline' className='font-normal'>
          {modality}
        </Badge>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "teacher",
    header: "Profesor",
    cell: ({ row }) => {
      const teacher = row.getValue("teacher") as string;
      return (
        <div className='flex items-center gap-2'>
          <User className='h-4 w-4 text-muted-foreground' />
          <span className='text-sm'>{teacher}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "music",
    header: "Música",
    cell: ({ row }) => {
      const music = row.getValue("music") as string;
      return (
        <div className='flex items-center gap-2'>
          <Music className='h-4 w-4 text-muted-foreground' />
          <span className='text-sm truncate max-w-[180px]'>{music}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "year",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className='-ml-4 h-8'
      >
        Año
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const year = row.getValue("year") as number;
      return <span className='text-sm'>{year}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return (
        <Badge
          variant={status ? "default" : "secondary"}
          className={`capitalize ${
            status
              ? "bg-emerald-100 text-emerald-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {status ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: "createdAt",
    header: "Creación",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const choreography = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
              aria-label='Abrir menú de acciones'
            >
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56 bg-white'>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => onEdit(choreography)}>
              <Pencil className='mr-2 h-4 w-4' />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator className='border-gray-50' />
            <DropdownMenuItem
              onClick={() => onDelete(choreography)}
              className='text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
