"use client";

import React from "react";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form/Fields";
import { useJudgeForm } from "./hooks/useJudgeForm";
import { judgeValidationSchema, initialValues } from "./validation";
import { JudgeFormProps } from "./types";
import { JudgesFormData } from "@/types/judges.types";

export const PanelJudgeForm: React.FC<JudgeFormProps> = ({
  isOpen,
  onClose,
  editingJudge,
  onSuccess,
}) => {
  const { isSubmitting, handleSubmit } = useJudgeForm(
    editingJudge,
    onSuccess,
    onClose
  );
  const getInitialValues = (): JudgesFormData => {
    if (editingJudge) {
      return {
        nombre: editingJudge.nombre || "",
        apellido: editingJudge.apellido || "",
        nacionalidad: editingJudge.nacionalidad || "",
        fotoPerfil: editingJudge.fotoPerfil || "",
        trayectoria: editingJudge.trayectoria || "",
      };
    }
    return initialValues;
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>
            {editingJudge ? "Editar Jurado" : "Agregar Nuevo Jurado"}
          </DialogTitle>
        </DialogHeader>
        ;
        <Formik
          initialValues={getInitialValues()}
          validationSchema={judgeValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isValid, dirty }) => (
            <Form className='space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <InputField
                  name='nombre'
                  label='Nombre'
                  placeholder='Nombre del jurado'
                  required
                />
                <InputField
                  name='apellido'
                  label='Apellido'
                  placeholder='Apellido del jurado'
                  required
                />
              </div>

              <InputField
                name='nacionalidad'
                label='Nacionalidad'
                placeholder='Nacionalidad del jurado'
                required
              />

              <InputField
                name='fotoPerfil'
                label='URL Foto de Perfil'
                type='url'
                placeholder='https://ejemplo.com/foto.jpg'
              />
              <InputField
                name='trayectoria'
                label='Trayectoria'
                type='textarea'
                placeholder='Describe la trayectoria profesional del jurado...'
                required
              />

              <div className='flex justify-end space-x-2 pt-4'>
                <Button type='button' variant='outline' onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  type='submit'
                  className='bg-slate-600 hover:bg-slate-700'
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  {isSubmitting
                    ? "Guardando..."
                    : editingJudge
                    ? "Actualizar"
                    : "Agregar"}{" "}
                  Jurado
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
