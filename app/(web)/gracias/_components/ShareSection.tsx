// app/(web)/gracias/components/ShareSection.tsx
"use client";

import React from "react";
import { Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ShareSectionProps {
  shareLink: string;
  participantName: string;
  totalCoreografias: number;
  onCopy: (text: string) => void;
  copied: boolean;
}

export function ShareSection({
  shareLink,
  participantName,
  totalCoreografias,
  onCopy,
  copied,
}: ShareSectionProps) {
  const shareMessage = `¡${participantName} ha registrado ${totalCoreografias} ${
    totalCoreografias === 1 ? "coreografía" : "coreografías"
  }! 🎭\n\nRevisa los detalles aquí:\n${shareLink}`;

  return (
    <Card className='border-slate-200 bg-slate-50'>
      <CardContent className='p-4 space-y-3'>
        <div className='flex items-center gap-2 text-slate-700'>
          <Share2 className='w-4 h-4' aria-hidden='true' />
          <h3 className='text-sm font-semibold'>Compartir registro</h3>
        </div>

        <p className='text-xs text-slate-600 leading-relaxed'>
          Comparte este enlace para que otros vean las coreografías registradas
        </p>

        <div className='flex gap-2'>
          <input
            type='text'
            readOnly
            value={shareLink}
            className='flex-1 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            aria-label='Enlace para compartir'
          />
          <Button
            onClick={() => onCopy(shareMessage)}
            variant='outline'
            size='sm'
            className='gap-2 min-w-[100px]'
            aria-label={copied ? "Enlace copiado" : "Copiar enlace"}
          >
            {copied ? (
              <>
                <Check className='w-4 h-4' aria-hidden='true' />
                Copiado
              </>
            ) : (
              <>
                <Copy className='w-4 h-4' aria-hidden='true' />
                Copiar
              </>
            )}
          </Button>
        </div>

        <div className='pt-2 border-t border-slate-200'>
          <p className='text-xs text-slate-500 italic'>
            💬 Se copiará un mensaje listo para WhatsApp o email
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
