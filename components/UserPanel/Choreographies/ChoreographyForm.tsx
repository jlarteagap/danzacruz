"use client";

import { FC } from "react";
import { Form, Formik } from "formik";

import { Choreography } from "@/types/userPanel.types";

import { InputField, SelectField } from "@/components/form/Fields";
import { useChoreographyForm } from "@/hooks/useCoreografyForm";
import { Button } from "@/components/ui/button";
import { modalidad } from "@/components/AddParticipant/utils";
import { AlertCircle, Loader2 } from "lucide-react";
import { useDataContext } from "@/contexts/DataContext";

interface ChoreographyFormProps {
  user: any;
  choreography?: Choreography | null;
  onClose: () => void;
}

const ChoreographyForm: FC<ChoreographyFormProps> = ({
  user,
  choreography,
  onClose,
}) => {
  const { initialValues, validationSchema, handleSubmit, isLoading } =
    useChoreographyForm(choreography);
  const { participants, isLoadingParticipants } = useDataContext();

  return (
    <div className='space-y-4'>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, helpers) =>
          handleSubmit(values, helpers, user, onClose)
        }
        validationSchema={validationSchema} // Usar validationSchema
        enableReinitialize
      >
        {({ isSubmitting, status, values, errors, touched }) => (
          <Form className='space-y-4'>
            {/* Mostrar errores globales */}
            {status?.type === "error" && (
              <div className='flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg'>
                <AlertCircle className='h-4 w-4' />
                <span className='text-sm'>{status.message}</span>
              </div>
            )}

            {!isLoadingParticipants && participants.length > 0 ? (
              <SelectField
                name='participantId'
                label='Participante'
                options={participants.map((p) => ({
                  value: p.id,
                  name: `${p.name} - ${p.category} - ${p.division}`,
                }))}
                type='select'
              />
            ) : (
              <div className='p-3 bg-yellow-50 text-yellow-700 rounded-lg'>
                <span className='text-sm'>
                  {isLoadingParticipants
                    ? "Cargando participantes..."
                    : "No hay participantes disponibles"}
                </span>
              </div>
            )}

            {/* Grid en dos columnas */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <InputField
                label='Nombre de la coreografía'
                name='name'
                type='text'
                placeholder='Ej. Fusión de Ritmos'
              />
              <SelectField
                label='Modalidad'
                name='modality'
                type='select'
                options={modalidad}
                placeholder='Selecciona una modalidad'
              />
              <InputField
                label='Profesor/Coreógrafo'
                name='teacher'
                type='text'
                placeholder='Nombre del profesor'
              />
              <InputField
                label='Canción/Música'
                name='music'
                type='text'
                placeholder='Nombre de la canción'
              />
            </div>

            {/* Campos largos ocupan ancho completo */}
            <InputField
              label='Detalles del estilo/modalidad'
              name='clarification'
              placeholder='ej. con elementos, puntas, accesorios, etc'
            />
            <InputField
              label='Información adicional'
              name='extra'
              placeholder='Cualquier necesidad logística o técnica'
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
                disabled={isSubmitting || isLoading || isLoadingParticipants}
                className='bg-indigo-600 hover:bg-indigo-700'
              >
                {(isSubmitting || isLoading) && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                {choreography ? "Guardar Cambios" : "Agregar Coreografía"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChoreographyForm;
