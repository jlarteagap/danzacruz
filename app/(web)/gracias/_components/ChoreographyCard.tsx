// app/(web)/gracias/components/ChoreographyCard.tsx
"use client";

import React from "react";
import { Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ChoreographyActions } from "./ChoreographyActions";
import type { Choreography } from "@/types/registration.types";

interface ChoreographyCardProps {
  choreo: Choreography;
  index: number;
  participantName: string;
}

export function ChoreographyCard({
  choreo,
  index,
  participantName,
}: ChoreographyCardProps) {
  return (
    <Card className='border-slate-200 hover:border-blue-200 transition-colors duration-200'>
      <CardContent className='p-4 space-y-3'>
        {/* Header de la coreografía */}
        <div className='flex items-center gap-3'>
          <div className='flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
            <Music className='w-5 h-5 text-blue-600' aria-hidden='true' />
          </div>
          <div className='flex-1 min-w-0'>
            <h4 className='text-base font-semibold text-slate-900 truncate'>
              {choreo.name}
            </h4>
            <p className='text-xs text-slate-500'>Coreografía #{index + 1}</p>
          </div>
        </div>

        {/* Botones de acción para esta coreografía */}
        <ChoreographyActions
          choreography={choreo}
          participantName={participantName}
        />
      </CardContent>
    </Card>
  );
}
