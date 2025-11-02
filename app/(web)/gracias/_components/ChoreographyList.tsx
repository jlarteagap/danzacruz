// app/(web)/gracias/components/ChoreographyList.tsx
"use client";

import React, { useState } from "react";
import { Music, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Choreography } from "@/types/registration.types";

interface ChoreographyListProps {
  choreographies: Choreography[];
  totalCoreografias: number;
}

export function ChoreographyList({
  choreographies,
  totalCoreografias,
}: ChoreographyListProps) {
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
        className='space-y-2'
        role='list'
        aria-label='Coreografías registradas'
      >
        {choreographiesToShow.map((choreo, index) => (
          <ChoreographyItem key={choreo.id} choreo={choreo} index={index} />
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

interface ChoreographyItemProps {
  choreo: Choreography;
  index: number;
}

function ChoreographyItem({ choreo, index }: ChoreographyItemProps) {
  return (
    <div
      role='listitem'
      className='flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200'
    >
      <div className='flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
        <Music className='w-4 h-4 text-blue-600' aria-hidden='true' />
      </div>
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium text-slate-900 truncate'>
          {choreo.name}
        </p>
        <p className='text-xs text-slate-500'>Coreografía #{index + 1}</p>
      </div>
      <ChevronRight className='w-4 h-4 text-slate-400' aria-hidden='true' />
    </div>
  );
}
