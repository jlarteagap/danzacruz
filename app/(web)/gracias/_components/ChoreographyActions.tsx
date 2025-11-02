// app/(web)/gracias/components/ChoreographyActions.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareSection } from "./ShareSection";
import { useClipboard } from "@/hooks/useClipboard";
import type { Choreography } from "@/types/registration.types";

interface ChoreographyActionsProps {
  choreography: Choreography;
  participantName: string;
}

export function ChoreographyActions({
  choreography,
  participantName,
}: ChoreographyActionsProps) {
  const router = useRouter();
  const { copied, copyToClipboard } = useClipboard();
  const [showShare, setShowShare] = useState(false);

  const handleVerCoreografia = () => {
    // Navegar directamente a esta coreografía específica
    router.push(`/coreografias/${choreography.id}`);
  };

  return (
    <div className='space-y-3'>
      {/* Botones de acción */}
      <div className='flex gap-2'>
        <Button
          onClick={handleVerCoreografia}
          size='sm'
          className='flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white'
        >
          <Eye className='w-4 h-4' aria-hidden='true' />
          Ver coreografía
        </Button>

        {choreography.shareLink && (
          <Button
            onClick={() => setShowShare(!showShare)}
            size='sm'
            variant='outline'
            className='flex-1 gap-2 border-slate-300 hover:bg-slate-50'
          >
            <Share2 className='w-4 h-4' aria-hidden='true' />
            {showShare ? "Ocultar" : "Compartir"}
          </Button>
        )}
      </div>

      {/* Sección de compartir (condicional) */}
      {showShare && choreography.shareLink && (
        <ShareSection
          shareLink={choreography.shareLink}
          participantName={participantName}
          choreographyName={choreography.name}
          onCopy={copyToClipboard}
          copied={copied}
        />
      )}
    </div>
  );
}
