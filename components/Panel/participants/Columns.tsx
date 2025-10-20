// app/dashboard/participantes/_components/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Participant } from "@/types/userPanel.types";
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
import { ArrowUpDown, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const createColumns = (
  onEdit: (participant: Participant) => void,
  onDelete: (participant: Participant) => void
): ColumnDef<Participant>[] => [
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
    accessorKey: "image",
    header: "Foto",
    cell: ({ row }) => {
      const participant = row.original;
      const initials = participant.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      return (
        <Avatar className='h-10 w-10'>
          <AvatarImage src={participant.image} alt={participant.name} />
          <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm'>
            {initials}
          </AvatarFallback>
        </Avatar>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-4 h-8 data-[state=open]:bg-accent'
        >
          Nombre
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <div className='flex flex-col'>
          <span className='font-medium'>{name}</span>
          {row.original.email && (
            <span className='text-xs text-muted-foreground'>
              {row.original.email}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-4 h-8'
        >
          Categoría
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return (
        <Badge variant='outline' className='font-normal'>
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
    cell: ({ row }) => {
      const division = row.getValue("division") as string;
      const subDivision = row.original.subDivision;
      return (
        <div className='flex flex-col'>
          <span className='text-sm'>{division}</span>
          {subDivision && (
            <span className='text-xs text-muted-foreground'>{subDivision}</span>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const participant = row.original;

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

            <DropdownMenuItem onClick={() => onEdit(participant)}>
              <Pencil className='mr-2 h-4 w-4' />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator className='border-gray-50' />
            <DropdownMenuItem
              onClick={() => onDelete(participant)}
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
