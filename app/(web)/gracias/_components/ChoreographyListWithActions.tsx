// app/(web)/gracias/components/ChoreographyListWithActions.tsx
"use client";

import React, { useState } from "react";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChoreographyCard } from "./ChoreographyCard";
import type { Choreography } from "@/types/registration.types";

interface ChoreographyListWithActionsProps {
  choreographies: Choreography[];
  totalCoreografias: number;
  participantName: string;
}

export function ChoreographyListWithActions({
  choreographies,
  totalCoreografias,
  participantName,
}: ChoreographyListWithActionsProps) {
  const [expandedList, setExpandedList] = useState(totalCoreografias <= 3);

  const choreographiesToShow = expandedList
    ? choreographies
    : choreographies.slice(0, 3);
  const hasMore = choreographies.length > 3;

  if (choreographies.length === 0) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <h3 className='text-sm font-semibold text-slate-700 flex items-center gap-2'>
        <Music className='w-4 h-4' aria-hidden='true' />
        {totalCoreografias === 1 ? "Tu coreografía" : "Tus coreografías"}
      </h3>

      <div
        className='space-y-4'
        role='list'
        aria-label='Coreografías registradas'
      >
        {choreographiesToShow.map((choreo, index) => (
          <ChoreographyCard
            key={choreo.id}
            choreo={choreo}
            index={index}
            participantName={participantName}
          />
        ))}
      </div>

      {hasMore && (
        <Button
          onClick={() => setExpandedList(!expandedList)}
          variant='ghost'
          size='sm'
          className='w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50'
        >
          {expandedList ? (
            <>Ver menos</>
          ) : (
            <>Ver todas ({choreographies.length})</>
          )}
        </Button>
      )}
    </div>
  );
}
