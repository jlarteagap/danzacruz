import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Judge, JudgesFormData } from "../../types/judges.types";
import { InputField } from "src/components/form/Fileds";

interface JudgeFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: JudgesFormData;
  editingJudge: Judge | null;
  onInputChange: (name: string, value: string) => void;
  onSubmit: () => void;
  isValid: boolean;
}

export const PanelJudgeForm: React.FC<JudgeFormProps> = ({
  isOpen,
  onClose,
  formData,
  editingJudge,
  onInputChange,
  onSubmit,
  isValid,
}) => {
  const handleSubmit = () => {
    if (isValid) {
      onSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>
            {editingJudge ? "Editar Jurado" : "Agregar Nuevo Jurado"}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <InputField
                id='nombre'
                name='nombre'
                value={formData.nombre}
                onChange={(e) => onInputChange("nombre", e.target.value)}
                placeholder='Nombre del jurado'
                label='Nombre *'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='apellido'>Apellido *</Label>
              <Input
                id='apellido'
                name='apellido'
                value={formData.apellido}
                onChange={(e) => onInputChange("apellido", e.target.value)}
                placeholder='Apellido del jurado'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='nacionalidad'>Nacionalidad *</Label>
            <Input
              id='nacionalidad'
              name='nacionalidad'
              value={formData.nacionalidad}
              onChange={(e) => onInputChange("nacionalidad", e.target.value)}
              placeholder='Nacionalidad del jurado'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='fotoPerfil'>URL Foto de Perfil</Label>
            <Input
              id='fotoPerfil'
              name='fotoPerfil'
              type='url'
              value={formData.fotoPerfil}
              onChange={(e) => onInputChange("fotoPerfil", e.target.value)}
              placeholder='https://ejemplo.com/foto.jpg'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='trayectoria'>Trayectoria *</Label>
            <Textarea
              id='trayectoria'
              name='trayectoria'
              value={formData.trayectoria}
              onChange={(e) => onInputChange("trayectoria", e.target.value)}
              placeholder='Describe la trayectoria profesional del jurado...'
              rows={4}
            />
          </div>

          <div className='flex justify-end space-x-2 pt-4'>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className='bg-slate-600 hover:bg-slate-700'
              disabled={!isValid}
            >
              {editingJudge ? "Actualizar" : "Agregar"} Jurado
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
