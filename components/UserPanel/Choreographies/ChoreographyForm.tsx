"use client";

import { FC } from "react";
import { Form, Formik } from "formik";

import { Choreography } from "../types";

import { InputField, SelectField } from "@/components/form/Fields";
import { useChoreographyForm } from "@/hooks/useCoreografyForm";

import { modalidad, validate } from "@/components/AddParticipant/utils";

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
  const { initialValues, validate, handleSubmit, isLoading } =
    useChoreographyForm(choreography);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-3xl'>
        <h2 className='text-xl font-semibold mb-4'>
          {choreography ? "Editar Coreografía" : "Agregar Coreografía"}
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, helpers) =>
            handleSubmit(values, helpers, user, onClose)
          }
          validationSchema={validate}
          enableReinitialize
        >
          {() => (
            <Form className='space-y-4'>
              {/* Grid en dos columnas */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-1'>
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
                  placeholder='Ej. Jazz, Ballet...'
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
                placeholder='Cualquier necesidad logística o técnica (espacio, acrobacias, sonido especial, vestuario)'
              />

              <div className='flex justify-end space-x-2 pt-4 border-t'>
                <button
                  type='button'
                  onClick={onClose}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                >
                  {choreography ? "Guardar Cambios" : "Agregar Coreografía"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChoreographyForm;
