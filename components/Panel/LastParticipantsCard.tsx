"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users } from "lucide-react";
import { Participant } from "@/types/userPanel.types"; // ⚡ Ajusta la ruta de tus tipos

interface Props {
  participants: Participant[];
}

export default function LastParticipantsCard({ participants }: Props) {
  const lastFive = [...participants]
    .sort((a, b) => b.year - a.year) // ⚡ Cambia por createdAt si lo agregas
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Users className='w-5 h-5 text-primary' />
          Últimos Participantes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {lastFive.length > 0 ? (
          <ul className='space-y-2'>
            {lastFive.map((p) => (
              <li
                key={p.id}
                className='flex justify-between items-center border-b pb-1'
              >
                <span className='font-medium'>{p.name}</span>
                <span className='text-sm text-muted-foreground'>
                  {p.category}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm text-muted-foreground'>
            No hay participantes registrados
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant='outline' asChild className='w-full'>
          <Link href='/panel/participantes'>Ver todos</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
