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
import { ImageUploadField } from "@/components/form/UploadImage";
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
        <Formik
          initialValues={getInitialValues()}
          validationSchema={judgeValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isValid, dirty, setFieldValue, values }) => (
            <Form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='md:col-span-1 flex flex-col items-center justify-start'>
                  {/* Sección de imagen */}
                  <div className='md:col-span-1 flex flex-col items-center justify-start'>
                    <ImageUploadField
                      name='fotoPerfil'
                      label='Foto de Perfil'
                      currentImageUrl={values.fotoPerfil as string}
                      onImageUpload={(imageUrl: string) => {
                        setFieldValue("fotoPerfil", imageUrl);
                      }}
                      folder='judges' // Carpeta específica para jueces
                    />
                    <p className='text-sm text-gray-500 mt-2 text-center'>
                      Sube una imagen JPG, PNG o WebP (máx. 5MB)
                    </p>
                  </div>
                </div>
                <div className='md:col-span-2 space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-0'>
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
                    name='trayectoria'
                    label='Trayectoria'
                    type='textarea'
                    placeholder='Describe la trayectoria profesional del jurado...'
                    required
                  />
                </div>
              </div>
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
