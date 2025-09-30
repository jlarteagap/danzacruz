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
import { Music } from "lucide-react";
import { Choreography } from "@/types/userPanel.types"; // ⚡ Ajusta la ruta de tus tipos

interface Props {
  choreographies: Choreography[];
}

export default function LastChoreographiesCard({ choreographies }: Props) {
  const lastFive = [...choreographies]
    .sort((a, b) => b.createdAt - a.createdAt) // ⚡ Cambia por createdAt si lo agregas
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Music className='w-5 h-5 text-primary' />
          Últimas Coreografías
        </CardTitle>
      </CardHeader>
      <CardContent>
        {lastFive.length > 0 ? (
          <ul className='space-y-2'>
            {lastFive.map((c) => (
              <li
                key={c.id}
                className='flex justify-between items-center border-b pb-1'
              >
                <span className='font-medium'>{c.name}</span>
                <span className='text-sm text-muted-foreground'>
                  {c.modality}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm text-muted-foreground'>
            No hay coreografías registradas
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant='outline' asChild className='w-full'>
          <Link href='/panel/coreografias'>Ver todas</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
