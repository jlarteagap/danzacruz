//ChoreographiesTable.tsx
"use client";

import { Choreography } from "@/types/userPanel.types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  choreographies: Choreography[];
}

export function ChoreographiesTable({ choreographies }: Props) {
  return (
    <Table>
      <TableCaption>Lista de coreografías registradas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Modalidad</TableHead>
          <TableHead>Profesor</TableHead>
          <TableHead>Música</TableHead>
          <TableHead>Fecha de creación</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {choreographies.map((choreo) => (
          <TableRow key={choreo.id}>
            <TableCell>{choreo.name}</TableCell>
            <TableCell>{choreo.modality}</TableCell>
            <TableCell>{choreo.teacher}</TableCell>
            <TableCell>{choreo.music}</TableCell>
            <TableCell>
              {new Date(choreo.createdAt).toLocaleDateString("es-BO")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
