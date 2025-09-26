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
import { InputField, TextareaField } from "@/components/form/Fields";
import { ImageUploadField } from "@/components/form/UploadImage";
import { workshopValidationSchema, initialValues } from "./validation";
import { WorkshopFormProps } from "./types";
import { useWorkshopForm } from "./hooks/useWorkshopForm";
import { WorkshopFormData } from "@/types/workshops.types";

export const PanelWorkshopForm = ({
  isOpen,
  onClose,
  editingWorkshop,
  onSuccess,
}: WorkshopFormProps) => {
  const { isSubmitting, handleSubmit } = useWorkshopForm(
    editingWorkshop,
    onSuccess,
    onClose
  );

  const getInitialValues = (): WorkshopFormData => {
    if (editingWorkshop) {
      return {
        title: editingWorkshop.title || "",
        description: editingWorkshop.description || "",
        time: editingWorkshop.time || "",
        location: editingWorkshop.location || "",
        date: editingWorkshop.date || "",
        image: editingWorkshop.image || "",
        judge: editingWorkshop.judge || "",
      };
    }
    return initialValues;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>
            {editingWorkshop ? "Editar Taller" : "Agregar Nuevo Taller"}
          </DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={getInitialValues()}
          validationSchema={workshopValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isValid, dirty, setFieldValue, values }) => (
            <Form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='md:col-span-1 flex flex-col items-center justify-start'>
                  <ImageUploadField
                    name='image'
                    label='Imagen del Taller'
                    currentImageUrl={values.image as string}
                    onImageUpload={(imageUrl: string) => {
                      setFieldValue("image", imageUrl);
                    }}
                    folder='workshops'
                  />
                </div>
                <div className='md:col-span-2 space-y-4'>
                  <InputField
                    id='title'
                    name='title'
                    placeholder='Título del taller'
                    label='Título *'
                  />
                  <InputField
                    id='date'
                    name='date'
                    type='date'
                    label='Fecha *'
                  />
                  <InputField
                    id='time'
                    name='time'
                    type='time'
                    label='Hora *'
                  />
                  <InputField
                    id='location'
                    name='location'
                    placeholder='Ubicación del taller'
                    label='Ubicación *'
                  />
                  <TextareaField
                    id='description'
                    name='description'
                    placeholder='Descripción del taller'
                    label='Descripción *'
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
                    : editingWorkshop
                    ? "Actualizar"
                    : "Agregar"}{" "}
                  Taller
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
