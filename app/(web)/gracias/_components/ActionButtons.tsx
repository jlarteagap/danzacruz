// app/(web)/gracias/components/ActionButtons.tsx
"use client";

import React from "react";
import { Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  totalCoreografias: number;
  onVerCoreografias?: () => void;
  onAgregarIntegrantes?: () => void;
}

export function ActionButtons({
  totalCoreografias,
  onVerCoreografias,
  onAgregarIntegrantes,
}: ActionButtonsProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
      <Button
        onClick={onVerCoreografias}
        size='lg'
        className='w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
      >
        <Eye className='w-5 h-5' aria-hidden='true' />
        Ver {totalCoreografias === 1 ? "coreografía" : "coreografías"}
      </Button>

      <Button
        onClick={onAgregarIntegrantes}
        size='lg'
        variant='outline'
        className='w-full gap-2 border-slate-300 hover:bg-slate-50'
      >
        <Users className='w-5 h-5' aria-hidden='true' />
        Agregar integrantes
      </Button>
    </div>
  );
}
