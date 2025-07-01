// components/EmptyState.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Camera } from "lucide-react";

interface EmptyStateProps {
  onAddClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddClick }) => {
  return (
    <Card className='text-center py-12'>
      <CardContent>
        <div className='mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
          <Camera className='h-8 w-8 text-gray-400' />
        </div>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
          No hay jurados registrados
        </h3>
        <p className='text-gray-600 mb-4'>
          Comienza agregando el primer jurado al festival
        </p>
        <Button onClick={onAddClick} className='bg-blue-600 hover:bg-blue-700'>
          <Plus className='h-4 w-4 mr-2' />
          Agregar Primer Jurado
        </Button>
      </CardContent>
    </Card>
  );
};
