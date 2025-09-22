"use client";

import { FC, useEffect } from "react";
import { Form, Formik } from "formik";

import { Participant } from "@/types/userPanel.types";
import { InputField, RadioFields, SelectField } from "@/components/form/Fields";
import { colegios, general, category, subDivision } from "../utils";
import { useParticipantForm } from "@/hooks/useParticipantForm";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";

interface ParticipantFormProps {
  user: any;
  participant?: Participant | null;
  onClose: () => void;
}

const ParticipantForm: FC<ParticipantFormProps> = ({
  user,
  participant,
  onClose,
}) => {
  const {
    initialValues,
    validationSchema,
    handleSubmit,
    isLoading,
    category: categoryState,
    setCategory,
  } = useParticipantForm(user.id, participant); // Pasamos el participant al hook

  return (
    <div className='space-y-4'>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, helpers) =>
          handleSubmit(values, helpers, user, onClose)
        }
        validationSchema={validationSchema}
        enableReinitialize // Importante para la edición
      >
        {({ values, setFieldValue, isSubmitting, status, errors, touched }) => {
          // Efecto para manejar cambios de categoría
          useEffect(() => {
            if (values.category !== categoryState) {
              setCategory(values.category);
              // Reset division when category changes
              if (
                values.division &&
                values.category !== participant?.category
              ) {
                setFieldValue("division", "");
              }
            }
          }, [
            values.category,
            categoryState,
            setCategory,
            setFieldValue,
            participant?.category,
          ]);

          return (
            <Form className='space-y-4'>
              {/* Mostrar errores globales */}
              {status?.type === "error" && (
                <div className='flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg'>
                  <AlertCircle className='h-4 w-4' />
                  <span className='text-sm'>{status.message}</span>
                </div>
              )}

              <InputField
                label='Nombre del participante'
                name='name'
                type='text'
                placeholder='Grupo / Academia / Persona'
              />

              <RadioFields
                options={category}
                name='category'
                label='Categoría'
              />

              <SelectField
                label='División'
                name='division'
                type='select'
                options={values.category === "General" ? general : colegios}
                placeholder='Selecciona una división'
                key={`division-${values.category}`} // Force re-render when category changes
              />

              <SelectField
                options={subDivision}
                type='select'
                name='subDivision'
                label='Subdivisión'
                placeholder='Selecciona una subdivisión'
              />

              {/* Botones */}
              <div className='flex justify-end space-x-3 pt-6 border-t'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={onClose}
                  disabled={isSubmitting || isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type='submit'
                  disabled={isSubmitting || isLoading}
                  className='bg-green-600 hover:bg-green-700'
                >
                  {(isSubmitting || isLoading) && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  {participant ? "Guardar Cambios" : "Agregar Participante"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ParticipantForm;
