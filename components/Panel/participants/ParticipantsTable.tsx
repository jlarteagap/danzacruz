"use client";

import { Participant } from "@/types/userPanel.types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface Props {
  participants: Participant[];
}

export function ParticipantsTable({ participants }: Props) {
  return (
    <Table>
      <TableCaption>Lista de participantes registrados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Foto</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>División</TableHead>
          <TableHead>Año</TableHead>
          <TableHead>Usuario</TableHead>
          <TableHead>Fecha de registro</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants.map((p) => (
          <TableRow key={p.id}>
            <TableCell>
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  width={40}
                  height={40}
                  className='rounded-full object-cover'
                />
              ) : (
                <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500'>
                  N/A
                </div>
              )}
            </TableCell>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.category}</TableCell>
            <TableCell>
              {p.division}
              {p.subDivision ? ` - ${p.subDivision}` : ""}
            </TableCell>
            <TableCell>{p.year}</TableCell>
            <TableCell>{p.userId}</TableCell>
            <TableCell>
              {new Date(p.createdAt).toLocaleDateString("es-BO")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
