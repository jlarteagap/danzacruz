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
    <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
      <Button
        onClick={onVerCoreografias}
        size='lg'
        className='w-full gap-2 bg-[#63f7df] hover:bg-teal-600 hover:text-white text-neutral shadow-sm'
      >
        <Eye className='w-5 h-5' aria-hidden='true' />
        Ver {totalCoreografias === 1 ? "coreografía" : "coreografías"}
      </Button>
    </div>
  );
}
