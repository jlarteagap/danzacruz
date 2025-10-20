"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface PageHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const PageHeader = ({
  onRefresh,
  isRefreshing = false,
}: PageHeaderProps) => {
  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
          Coreografías
        </h1>
        <p className='mt-1 text-sm text-slate-500'>
          Gestiona todas las coreografías y participantes registrados
        </p>
      </div>

      {onRefresh && (
        <Button
          variant='outline'
          size='sm'
          onClick={onRefresh}
          disabled={isRefreshing}
          className='w-fit'
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Actualizar
        </Button>
      )}
    </div>
  );
};
